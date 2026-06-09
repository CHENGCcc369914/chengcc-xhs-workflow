#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const skillDir = dirname(scriptDir);
const collectScript = join(scriptDir, "collect-search-read.mjs");

const usage = `Usage:
  node scripts/collect-watchlist.mjs \\
    --watchlist examples/watchlist-chengcc.example.json \\
    --out-root /path/to/private/raw/xhs-blogger-intelligence/YYYY-MM-DD \\
    --statuses search_only,active \\
    --limit 2

Required:
  --watchlist <path>  Watchlist JSON file
  --out-root <path>   Private/local output root, outside this shareable repo

Optional:
  --accounts <names>  Comma-separated display_name allowlist
  --statuses <list>   Comma-separated statuses, default "search_only,active"
  --limit <n>         Notes to read per account, default 2, max 10
  --redbook <cmd>     redbook command, default "redbook"
`;

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
      continue;
    }
    if (!arg.startsWith("--")) {
      throw new Error(`Unexpected argument: ${arg}`);
    }
    const key = arg.slice(2);
    const value = argv[i + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for --${key}`);
    }
    args[key] = value;
    i += 1;
  }
  return args;
}

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

function writeText(path, text) {
  ensureDir(dirname(path));
  writeFileSync(path, text);
}

function slug(input) {
  return String(input || "unknown")
    .normalize("NFKD")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "unknown";
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function splitList(value, fallback) {
  return String(value || fallback)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function assertPrivateOutRoot(outRoot) {
  const resolved = resolve(outRoot);
  const resolvedSkill = resolve(skillDir);
  if (resolved === resolvedSkill || resolved.startsWith(`${resolvedSkill}/`)) {
    throw new Error(`--out-root must be outside the shareable skill folder: ${outRoot}`);
  }
}

function runAccount({ watchlistPath, accountName, outDir, limit, redbook }) {
  const result = spawnSync(process.execPath, [
    collectScript,
    "--watchlist",
    watchlistPath,
    "--account",
    accountName,
    "--out-dir",
    outDir,
    "--limit",
    String(limit),
    "--redbook",
    redbook
  ], { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 });

  writeText(join(outDir, "runner.stdout"), result.stdout || "");
  writeText(join(outDir, "runner.stderr"), result.stderr || "");
  writeText(join(outDir, "runner.exit"), `${result.status ?? 1}\n`);

  let summary = null;
  if (result.status === 0 && result.stdout) {
    try {
      summary = JSON.parse(result.stdout);
    } catch {
      summary = null;
    }
  }

  return {
    account: accountName,
    out_dir: outDir,
    status: result.status ?? 1,
    stdout_summary: summary,
    stderr: result.stderr || "",
    error: result.error ? String(result.error) : ""
  };
}

function batchMarkdown({ startedAt, finishedAt, args, selected, skipped, results, batchDir }) {
  const resultRows = results.map((item) => {
    const ok = item.status === 0;
    const reads = item.stdout_summary?.detail_reads_ok ?? 0;
    const filtered = item.stdout_summary?.filtered_count ?? 0;
    return `| ${item.account} | ${ok ? "pass" : "fail"} | ${filtered} | ${reads} | ${item.out_dir} |`;
  }).join("\n") || "| none | none | 0 | 0 | |";

  const skippedRows = skipped.map((item) => `| ${item.display_name} | ${item.status} | ${item.reason} |`).join("\n") || "| none | | |";

  return `# Watchlist Collection Run

## Run Metadata

- Started at: ${startedAt}
- Finished at: ${finishedAt}
- Watchlist source: \`${args.watchlist}\`
- Batch directory: \`${batchDir}\`
- Status filter: \`${args.statuses}\`
- Account filter: \`${args.accounts || "none"}\`
- Limit per account: ${args.limit}
- Adapter: \`${args.redbook}\`

## Selected Accounts

- Count: ${selected.length}
- Names: ${selected.map((item) => item.display_name).join(", ") || "none"}

## Results

| Account | Status | Filtered Search Items | Detail Reads | Output |
|---|---|---:|---:|---|
${resultRows}

## Skipped Accounts

| Account | Status | Reason |
|---|---|---|
${skippedRows}

## Next Action

- Build RAG brief from this batch if at least one detail read passed.
- Keep raw outputs local/private.
- Do not treat scaffold note-cards as final distillation without review.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage);
    return;
  }
  for (const required of ["watchlist", "out-root"]) {
    if (!args[required]) {
      throw new Error(`Missing --${required}\n\n${usage}`);
    }
  }

  args.statuses = args.statuses || "search_only,active";
  args.redbook = args.redbook || "redbook";
  args.limit = Math.max(1, Math.min(Number(args.limit || 2), 10));

  if (!existsSync(args.watchlist)) {
    throw new Error(`Watchlist not found: ${args.watchlist}`);
  }
  assertPrivateOutRoot(args["out-root"]);

  const watchlist = readJson(args.watchlist);
  const statuses = new Set(splitList(args.statuses));
  const accountFilter = args.accounts ? new Set(splitList(args.accounts)) : null;
  const startedAt = new Date().toISOString();
  const batchName = `watchlist-${startedAt.replace(/[:.]/g, "-")}`;
  const batchDir = join(args["out-root"], batchName);
  ensureDir(batchDir);

  const selected = [];
  const skipped = [];
  for (const account of watchlist.accounts || []) {
    if (accountFilter && !accountFilter.has(account.display_name)) {
      skipped.push({ ...account, reason: "not in account filter" });
      continue;
    }
    if (!statuses.has(account.status)) {
      skipped.push({ ...account, reason: "status not selected" });
      continue;
    }
    selected.push(account);
  }

  const results = [];
  for (const account of selected) {
    const accountDir = join(batchDir, "accounts", slug(account.display_name));
    results.push(runAccount({
      watchlistPath: args.watchlist,
      accountName: account.display_name,
      outDir: accountDir,
      limit: args.limit,
      redbook: args.redbook
    }));
  }

  const finishedAt = new Date().toISOString();
  const summary = {
    started_at: startedAt,
    finished_at: finishedAt,
    watchlist: args.watchlist,
    batch_dir: batchDir,
    selected_accounts: selected.map((item) => item.display_name),
    skipped_accounts: skipped.map((item) => ({
      display_name: item.display_name,
      status: item.status,
      reason: item.reason
    })),
    results
  };
  writeText(join(batchDir, "batch-summary.json"), JSON.stringify(summary, null, 2));
  writeText(join(batchDir, "collection-run.md"), batchMarkdown({
    startedAt,
    finishedAt,
    args,
    selected,
    skipped,
    results,
    batchDir
  }));

  console.log(JSON.stringify({
    batch_dir: batchDir,
    selected_count: selected.length,
    passed_count: results.filter((item) => item.status === 0).length,
    detail_reads_ok: results.reduce((sum, item) => sum + (item.stdout_summary?.detail_reads_ok || 0), 0)
  }, null, 2));
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
