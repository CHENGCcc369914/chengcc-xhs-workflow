#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const skillDir = dirname(scriptDir);

const usage = `Usage:
  node scripts/build-rag-brief.mjs \\
    --input-dir /path/to/private/raw/batch-run \\
    --topic "情绪内耗" \\
    --out-file /path/to/private/output/rag-brief.md

Required:
  --input-dir <path>  Batch or single-account collection output
  --topic <text>      Writing topic
  --out-file <path>   Output markdown path, outside this shareable repo

Optional:
  --creator <name>    Creator name, default "澄Cc"
  --writer <skill>    Downstream writer, default "cc-xhs-personal-growth-writer"
  --limit <n>         Max references, default 5, max 20
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

function assertPrivateOutFile(outFile) {
  const resolved = resolve(outFile);
  const resolvedSkill = resolve(skillDir);
  if (resolved === resolvedSkill || resolved.startsWith(`${resolvedSkill}/`)) {
    throw new Error(`--out-file must be outside the shareable skill folder: ${outFile}`);
  }
}

function walkFiles(root) {
  const files = [];
  function walk(path) {
    for (const entry of readdirSync(path)) {
      const full = join(path, entry);
      const stat = statSync(full);
      if (stat.isDirectory()) {
        walk(full);
      } else {
        files.push(full);
      }
    }
  }
  walk(root);
  return files;
}

function readJsonl(path) {
  return readFileSync(path, "utf8")
    .split(/\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function extractTerms(topic) {
  const raw = String(topic || "").trim();
  const terms = new Set();
  if (raw) terms.add(raw);
  for (const part of raw.split(/[\s,，、/|]+/).filter(Boolean)) {
    terms.add(part);
  }
  if (raw.length >= 2 && !/\s/.test(raw)) {
    for (let i = 0; i < raw.length - 1; i += 1) {
      terms.add(raw.slice(i, i + 2));
    }
  }
  return [...terms].filter((term) => term.length >= 2);
}

function scoreRecord(record, noteCard, terms) {
  const haystack = [
    record.title,
    record.account_name,
    record.short_excerpt_or_paraphrase,
    ...(record.tag_names || []),
    noteCard?.text || ""
  ].join("\n").toLowerCase();
  let score = 0;
  for (const term of terms) {
    if (haystack.includes(term.toLowerCase())) score += term.length;
  }
  if (record.collection_status?.includes("detail_read_complete")) score += 5;
  if (record.media_count) score += Math.min(record.media_count, 5);
  return score;
}

function parseNoteCard(path) {
  const text = readFileSync(path, "utf8");
  const title = text.match(/- Post title: (.+)/)?.[1]?.trim() || "";
  const postId = text.match(/- Post URL: .*?\/explore\/([^?/\s]+)/)?.[1]?.trim() || "";
  return { path, text, title, postId };
}

function collectInputs(inputDir) {
  const files = walkFiles(inputDir);
  const records = files
    .filter((file) => file.endsWith("normalized-posts.jsonl"))
    .flatMap(readJsonl);
  const noteCards = files
    .filter((file) => /note-card-.*\.md$/.test(file))
    .map(parseNoteCard);
  const noteById = new Map(noteCards.map((card) => [card.postId, card]));
  return { records, noteCards, noteById };
}

function uniqueRecords(records) {
  const byId = new Map();
  for (const record of records) {
    const key = record.post_id || record.post_url || `${record.account_name}-${record.title}`;
    if (!byId.has(key)) byId.set(key, record);
  }
  return [...byId.values()];
}

function formatMetric(value) {
  return value == null || value === "" ? "-" : String(value);
}

function buildBrief({ args, inputDir, records, noteById }) {
  const terms = extractTerms(args.topic);
  const ranked = uniqueRecords(records)
    .map((record) => ({
      record,
      noteCard: noteById.get(record.post_id),
      score: scoreRecord(record, noteById.get(record.post_id), terms)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, args.limit);

  const rows = ranked.map(({ record, score }) => {
    const tags = (record.tag_names || []).slice(0, 5).join(" / ") || "-";
    return `| ${record.account_name || "-"} | ${record.title || "-"} | ${tags} | ${score} | ${record.post_id || "-"} |`;
  }).join("\n") || "| none | none | none | 0 | none |";

  const lessons = ranked.map(({ record }) => {
    const tags = (record.tag_names || []).join(" / ") || "no tags";
    return `- ${record.account_name}: "${record.title}" uses topic lane ${tags}. Learn the hook/topic lane only; review the note-card before adapting structure.`;
  }).join("\n") || "- No usable records found.";

  const sourceList = ranked.map(({ record, noteCard }) => {
    return `- ${record.post_id || record.title}: normalized source \`${record.raw_source || "unknown"}\`${noteCard ? `; note-card \`${noteCard.path}\`` : ""}`;
  }).join("\n") || "- none";

  return `# RAG Brief

## Request

- Creator: ${args.creator}
- Downstream writer: ${args.writer}
- Topic: ${args.topic}
- Writing date: ${new Date().toISOString()}
- Input dir: \`${inputDir}\`
- Retrieval terms: ${terms.join(" / ") || "none"}

## Retrieved Signals

| Blogger | Post / Note-Card | Useful Signal | Match Score | Post ID |
|---|---|---|---:|---|
${rows}

## Topic-Specific Lessons

${lessons}

## For ${args.creator}

- Use: topic lanes, hook shape, page rhythm, and save-worthy emotional promise after review.
- Adjust: add ${args.creator}'s real scene, male 00后 / early-career viewpoint, and AI-as-method share only when natural.
- Avoid: copied wording, generic quote-card output, creator-specific stories, fake screenshots, or visual IP reuse.
- Tone guardrail: friend-like, direct, young, not teacher-like.
- AI role guardrail: AI is a small helper for sorting the issue, not a course or hard tool pitch.
- Visual guardrail: follow the confirmed creator visual system; do not copy benchmark visual identity.

## Do-Not-Copy

- Do not copy original wording from benchmark posts.
- Do not copy private or creator-specific experiences.
- Do not copy visual IP, screenshots, or distinctive design systems.
- Do not overfit one post; use this as retrieval context, not final truth.

## Source Evidence

${sourceList}

## Handoff

\`\`\`text
Use this RAG brief as benchmark context. Learn structure, rhythm, topic angle, and visual/page logic only.
Do not copy phrases, private stories, creator-specific experience, or visual IP.
Now use ${args.writer} and chengcc-xhs-workflow to produce the selected post.
\`\`\`
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage);
    return;
  }
  for (const required of ["input-dir", "topic", "out-file"]) {
    if (!args[required]) {
      throw new Error(`Missing --${required}\n\n${usage}`);
    }
  }
  args.creator = args.creator || "澄Cc";
  args.writer = args.writer || "cc-xhs-personal-growth-writer";
  args.limit = Math.max(1, Math.min(Number(args.limit || 5), 20));

  const inputDir = args["input-dir"];
  const outFile = args["out-file"];
  if (!existsSync(inputDir)) {
    throw new Error(`Input dir not found: ${inputDir}`);
  }
  assertPrivateOutFile(outFile);

  const { records, noteById } = collectInputs(inputDir);
  const brief = buildBrief({ args, inputDir, records, noteById });
  ensureDir(dirname(outFile));
  writeFileSync(outFile, brief);

  console.log(JSON.stringify({
    input_dir: inputDir,
    records: records.length,
    out_file: outFile
  }, null, 2));
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
