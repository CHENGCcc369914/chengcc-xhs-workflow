#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(__filename), "..");

function parseArgs(argv) {
  const args = { _: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const item = argv[index];
    if (!item.startsWith("--")) {
      args._.push(item);
      continue;
    }
    const key = item.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = next;
      index += 1;
    }
  }
  return args;
}

function usage() {
  return `Usage:
  node scripts/setup-creator.mjs --id peyson --name "Peyson" \\
    --positioning "..." --voice "..." --visual "..."

Required:
  --id             stable lowercase creator id, e.g. peyson
  --name           creator display name

Optional:
  --account        public account name, defaults to --name
  --positioning    social media positioning and target audience
  --voice          writing voice and boundaries
  --visual         visual system and image-generation constraints
  --out            profile path, defaults to profiles/<id>.creator-profile.json

After setup:
  export CONTENT_LOOP_PROFILE="<printed profile path>"
  node skills/chengcc-content-loop-runtime/scripts/content-loop-runtime.mjs new-run --intent "..."
`;
}

function slugify(input) {
  return String(input || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "creator";
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function ensureProjectDirs() {
  const dirs = [
    "runtime",
    "knowledge/xhs-case-library",
    "knowledge/benchmark-watchlist",
    "assets/creator",
    "outputs/images",
    "outputs/publish-packages",
    "workbench/data"
  ];
  for (const dir of dirs) {
    fs.mkdirSync(path.join(repoRoot, dir), { recursive: true });
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || args.h) {
    console.log(usage());
    return;
  }

  const id = slugify(args.id || args.name);
  const name = String(args.name || "").trim();
  if (!id || !name) {
    console.error(usage());
    process.exit(2);
  }

  const templatePath = path.join(repoRoot, "profiles", "creator-profile.template.json");
  const profile = readJson(templatePath);

  profile.creator.id = id;
  profile.creator.displayName = name;
  profile.creator.accountName = String(args.account || name);

  if (args.positioning) profile.writing.positioning = String(args.positioning);
  if (args.voice) profile.writing.voice = String(args.voice);
  if (args.visual) profile.writing.visualSystem = String(args.visual);

  const outPath = path.resolve(repoRoot, String(args.out || path.join("profiles", `${id}.creator-profile.json`)));
  writeJson(outPath, profile);
  ensureProjectDirs();

  const init = spawnSync(process.execPath, [
    path.join(repoRoot, "skills", "chengcc-content-loop-runtime", "scripts", "content-loop-runtime.mjs"),
    "init",
    "--profile",
    outPath
  ], {
    cwd: repoRoot,
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024
  });

  if (init.status !== 0) {
    console.error(init.stderr || init.stdout);
    process.exit(init.status || 1);
  }

  console.log(JSON.stringify({
    ok: true,
    repoRoot,
    profile: outPath,
    runtimeInitialized: true,
    nextCommands: [
      `export CONTENT_LOOP_PROFILE="${outPath}"`,
      `node skills/chengcc-content-loop-runtime/scripts/content-loop-runtime.mjs new-run --intent "今天想做的内容方向"`
    ]
  }, null, 2));
}

main();
