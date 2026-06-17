#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const DEFAULT_RUNTIME_ROOT =
  "/Users/ccc/Library/Mobile Documents/iCloud~md~obsidian/Documents/CC-Obsidian/Obsidian Vault/Wiki/Output/80-通用资产/小红书个人运营/content-loop-runtime";

const REQUIRED_RUN_FILES = [
  "run-status.json",
  "00-intent.md",
  "01-bootstrap-context.md",
  "02-rag-brief.md",
  "03-topic-options.md",
  "04-selected-hypothesis.md",
  "05-carousel-draft.md",
  "06-image-manifest.json",
  "07-publish-checklist.md",
  "08-prediction.md",
  "09-metrics-24h.md",
  "10-metrics-72h.md",
  "11-retro.md",
  "12-memory-update-proposal.md"
];

const REQUIRED_RUNTIME_DIRS = ["runs", "state", "rules", "indexes"];

const INITIAL_RULE_FILES = {
  "rules/topic-rubric.md": `# Topic Rubric

Status: active

## Current Signals

- Keep topics concrete: real scene, actual stuck point, one useful method.
- Avoid generic AI-tool sharing without lived context.
- Treat one post as a hypothesis; update this file only after repeated or strong evidence.

## Rejected Or Weak Signals

- Concept-first topics with no real scene.
- Topics that repeat the same opening conflict from recent runs.
`,
  "rules/title-lessons.md": `# Title Lessons

Status: active

## Working Rules

- Prefer concrete conflict over abstract self-improvement.
- Make the reader recognize a real moment before offering a method.

## Watchlist

- Check recent run titles before reusing a similar hook.
`,
  "rules/visual-failure-rules.md": `# Visual Failure Rules

Status: active

## Hard Blocks

- Current post text on an old image.
- Image path from a previous run used as final output.
- Missing ChengCc IP locks when avatar appears.
- Semi-realistic collage or unrelated infographic when the approved route is healing hand-drawn IP.
- Unreadable Chinese card text.

## Recovery

Mark the candidate as failed in \`06-image-manifest.json\`, exclude it from \`07-publish-checklist.md\`, then regenerate or stop at Gate 1.
`,
  "rules/publish-risk-rules.md": `# Publish Risk Rules

Status: active

## Gate 1 Blocks

- Missing AI-generated or AI-assisted disclosure when required.
- Unmasked private chat, workplace, school, phone, face, address, ID, or platform account details.
- Unsupported factual claims, fake metrics, or invented platform data.
- Final publish action without human confirmation.

## Gate 2 Blocks

- Updating long-term strategy from one weak post.
- Treating low exposure as proof the idea is bad without checking title, cover, timing, and sample size.
`
};

const INITIAL_STATE_FILES = {
  "state/next-run-context.md": `# Next Run Context

Status: active

This file is the memory that should be read before starting a new Xiaohongshu content loop.

## Last Accepted Lessons

- No accepted lessons yet.

## Current Avoids

- Do not reuse previous post folders or images as final output.
- Do not update long-term rules without Gate 2 approval.
`,
  "state/loop-config.json": JSON.stringify(
    {
      version: "1.0.0",
      mode: "L4.5-supervised-L5",
      defaultCreator: "chengcc",
      publishGate: "human_required",
      memoryUpdateGate: "human_required",
      defaultRecentRunCount: 5,
      requiredSiblingSkills: [
        "xhs-blogger-intelligence",
        "chengcc-xhs-workflow",
        "cc-xhs-personal-growth-writer",
        "xiaohongshu-ops"
      ]
    },
    null,
    2
  ) + "\n",
  "indexes/run-index.json": JSON.stringify({ runs: [] }, null, 2) + "\n"
};

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) {
      args._.push(arg);
      continue;
    }
    const key = arg.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = next;
      i += 1;
    }
  }
  return args;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeIfMissing(filePath, content) {
  if (fs.existsSync(filePath)) return false;
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf8");
  return true;
}

function readText(filePath, fallback = "") {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return fallback;
  }
}

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function writeJson(filePath, value) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function nowIso() {
  return new Date().toISOString();
}

function slugify(input) {
  const value = String(input || "untitled")
    .trim()
    .toLowerCase()
    .replace(/[^\p{Script=Han}a-z0-9]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return value || "untitled";
}

function hashText(text) {
  return `sha256:${crypto.createHash("sha256").update(text || "").digest("hex")}`;
}

function runtimeRoot(args) {
  return path.resolve(String(args["runtime-root"] || process.env.CHENGCC_CONTENT_LOOP_ROOT || DEFAULT_RUNTIME_ROOT));
}

function initRuntime(root) {
  for (const dir of REQUIRED_RUNTIME_DIRS) ensureDir(path.join(root, dir));

  const writes = [];
  for (const [relative, content] of Object.entries(INITIAL_RULE_FILES)) {
    if (writeIfMissing(path.join(root, relative), content)) writes.push(relative);
  }
  for (const [relative, content] of Object.entries(INITIAL_STATE_FILES)) {
    if (writeIfMissing(path.join(root, relative), content)) writes.push(relative);
  }

  const readme = `# ChengCc Content Loop Runtime

Mode: L4.5 / supervised L5

This runtime stores content-loop state. It does not replace the Xiaohongshu Skills.

## Human Gates

- Gate 1: human approval before final publish.
- Gate 2: human approval before long-term memory/rule updates.

## Structure

- \`runs/\`: one folder per content loop run.
- \`state/next-run-context.md\`: read before every new run.
- \`rules/\`: durable lessons used by future runs.
- \`indexes/run-index.json\`: machine-readable run index.
`;
  if (writeIfMissing(path.join(root, "README.md"), readme)) writes.push("README.md");

  return writes;
}

function listRuns(root) {
  const runsDir = path.join(root, "runs");
  if (!fs.existsSync(runsDir)) return [];
  return fs
    .readdirSync(runsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const runDir = path.join(runsDir, entry.name);
      const status = readJson(path.join(runDir, "run-status.json"), {});
      return {
        id: entry.name,
        runDir,
        createdAt: status.createdAt || "",
        status: status.status || "unknown",
        gate1: status.gates?.publish?.status || "unknown",
        gate2: status.gates?.memoryUpdate?.status || "unknown",
        intent: status.intent || ""
      };
    })
    .sort((a, b) => String(b.createdAt || b.id).localeCompare(String(a.createdAt || a.id)));
}

function recentContext(root, count) {
  const runs = listRuns(root).slice(0, count);
  const sections = [];
  for (const run of runs) {
    const retro = readText(path.join(run.runDir, "11-retro.md")).trim();
    const memory = readText(path.join(run.runDir, "12-memory-update-proposal.md")).trim();
    sections.push(`## ${run.id}

- Status: ${run.status}
- Gate 1: ${run.gate1}
- Gate 2: ${run.gate2}
- Intent: ${run.intent || "(missing)"}

### Retro Excerpt

${excerpt(retro, 1200)}

### Memory Proposal Excerpt

${excerpt(memory, 900)}
`);
  }
  return sections.join("\n");
}

function excerpt(text, max) {
  if (!text) return "(empty)";
  return text.length > max ? `${text.slice(0, max)}\n...[truncated]` : text;
}

function createRun(root, args) {
  initRuntime(root);

  const intent = String(args.intent || "").trim();
  if (!intent) {
    throw new Error("Missing --intent. Example: --intent \"我想做一篇刚上班精神内耗选题\"");
  }
  const creator = String(args.creator || "chengcc");
  const topicSlug = slugify(args["topic-slug"] || intent);
  let runId = `${today()}-${topicSlug}`;
  let runDir = path.join(root, "runs", runId);
  let suffix = 2;
  while (fs.existsSync(runDir)) {
    runId = `${today()}-${topicSlug}-${suffix}`;
    runDir = path.join(root, "runs", runId);
    suffix += 1;
  }
  ensureDir(runDir);

  const status = {
    runId,
    creator,
    mode: "L4.5-supervised-L5",
    status: "initialized",
    intent,
    intentHash: hashText(intent),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    gates: {
      publish: {
        status: "pending",
        required: true,
        file: "07-publish-checklist.md",
        meaning: "Human approval before final publish or platform upload action."
      },
      memoryUpdate: {
        status: "pending",
        required: true,
        file: "12-memory-update-proposal.md",
        meaning: "Human approval before updating next-run-context or durable rules."
      }
    },
    requiredSiblingSkills: [
      "xhs-blogger-intelligence",
      "chengcc-xhs-workflow",
      "cc-xhs-personal-growth-writer",
      "xiaohongshu-ops"
    ],
    phaseFiles: REQUIRED_RUN_FILES
  };

  writeJson(path.join(runDir, "run-status.json"), status);
  writeIfMissing(path.join(runDir, "00-intent.md"), `# 00 Intent

- Run ID: ${runId}
- Creator: ${creator}
- Mode: L4.5 / supervised L5
- Created: ${status.createdAt}
- Intent hash: ${status.intentHash}

## User Intent

${intent}

## Success Definition

- Produce a complete Xiaohongshu publish package.
- Keep final publish under Gate 1 human approval.
- Create a post-publish retro and memory update proposal.
- Do not update durable rules until Gate 2 is approved.
`);

  const bootstrap = buildBootstrap(root, runId, intent, Number(args.recent || 5));
  writeIfMissing(path.join(runDir, "01-bootstrap-context.md"), bootstrap);

  writeIfMissing(path.join(runDir, "02-rag-brief.md"), placeholder("02 RAG Brief", "Use xhs-blogger-intelligence. Record source files, reusable patterns, and do-not-copy notes."));
  writeIfMissing(path.join(runDir, "03-topic-options.md"), placeholder("03 Topic Options", "Use chengcc-xhs-workflow Phase B. Include 10 topic options and selected candidate rationale."));
  writeIfMissing(path.join(runDir, "04-selected-hypothesis.md"), placeholder("04 Selected Hypothesis", "State the selected topic, target reader, content hypothesis, visual hypothesis, and metric prediction idea."));
  writeIfMissing(path.join(runDir, "05-carousel-draft.md"), placeholder("05 Carousel Draft", "Use chengcc-xhs-workflow Phase C-E. Paste final card copy, body, tags, Image 2 prompt, and generated image status."));
  writeJson(path.join(runDir, "06-image-manifest.json"), {
    runId,
    status: "draft",
    cardCopyHash: null,
    pages: [],
    rejectedAttempts: [],
    publishReady: false
  });
  writeIfMissing(path.join(runDir, "07-publish-checklist.md"), gateTemplate("07 Publish Checklist", "Gate 1", "pending"));
  writeIfMissing(path.join(runDir, "08-prediction.md"), placeholder("08 Prediction", "Write pre-publish score and prediction before seeing real data."));
  writeIfMissing(path.join(runDir, "09-metrics-24h.md"), metricsTemplate("24h"));
  writeIfMissing(path.join(runDir, "10-metrics-72h.md"), metricsTemplate("72h"));
  writeIfMissing(path.join(runDir, "11-retro.md"), placeholder("11 Retro", "Compare prediction against actual metrics. Separate title, cover, topic, timing, and sample-size causes."));
  writeIfMissing(path.join(runDir, "12-memory-update-proposal.md"), gateTemplate("12 Memory Update Proposal", "Gate 2", "pending"));

  updateIndex(root, status);
  return { runId, runDir };
}

function placeholder(title, instruction) {
  return `# ${title}

Status: draft

## Instruction

${instruction}

## Content

`;
}

function gateTemplate(title, gate, status) {
  return `# ${title}

Status: ${status}
Human gate: required
Approved by Cc: no

## ${gate}

- Decision: pending
- Approved at:
- Approved by:

## Checklist

- [ ] Required files are present.
- [ ] No stale image or previous run folder is used as final output.
- [ ] AI-generated/AI-assisted content labeling is handled.
- [ ] Privacy and platform risk review is clean.

## Proposal

`;
}

function metricsTemplate(label) {
  return `# ${label} Metrics

Status: waiting-for-data

## Source

- Manual input / creator dashboard screenshot / xiaohongshu-ops read:
- Captured at:

## Metrics

- Impressions:
- Reads/views:
- Likes:
- Saves:
- Comments:
- Follows:
- Cover CTR:
- Completion / read depth:

## Notes

`;
}

function buildBootstrap(root, runId, intent, count) {
  const nextContext = readText(path.join(root, "state", "next-run-context.md")).trim();
  const ruleFiles = [
    "rules/topic-rubric.md",
    "rules/title-lessons.md",
    "rules/visual-failure-rules.md",
    "rules/publish-risk-rules.md"
  ];
  const rules = ruleFiles
    .map((relative) => `## ${relative}\n\n${readText(path.join(root, relative)).trim() || "(missing)"}`)
    .join("\n\n");
  const recent = recentContext(root, count);
  return `# 01 Bootstrap Context

Status: ready
Run ID: ${runId}
Intent hash: ${hashText(intent)}

## Current Intent

${intent}

## Next Run Context

${nextContext || "(empty)"}

## Durable Rules

${rules}

## Recent Runs

${recent || "(no previous runs)"}

## Runtime Instruction

Use this file before running RAG, topic selection, carousel production, Image 2 generation, publish review, prediction, metrics review, and memory update proposal.
`;
}

function updateIndex(root, status) {
  const indexPath = path.join(root, "indexes", "run-index.json");
  const index = readJson(indexPath, { runs: [] });
  const next = index.runs.filter((item) => item.runId !== status.runId);
  next.unshift({
    runId: status.runId,
    creator: status.creator,
    status: status.status,
    intent: status.intent,
    createdAt: status.createdAt,
    updatedAt: status.updatedAt,
    gate1: status.gates.publish.status,
    gate2: status.gates.memoryUpdate.status
  });
  writeJson(indexPath, { runs: next });
}

function validateRun(runDir) {
  const result = {
    runDir,
    ok: true,
    missing: [],
    warnings: [],
    gates: {},
    checkedAt: nowIso()
  };
  for (const relative of REQUIRED_RUN_FILES) {
    if (!fs.existsSync(path.join(runDir, relative))) {
      result.ok = false;
      result.missing.push(relative);
    }
  }
  const status = readJson(path.join(runDir, "run-status.json"), null);
  if (!status) {
    result.ok = false;
    result.warnings.push("run-status.json is missing or invalid JSON");
  } else {
    result.gates = status.gates || {};
    if (status.gates?.publish?.status !== "approved") {
      result.warnings.push("Gate 1 publish approval is not approved");
    }
    if (status.gates?.memoryUpdate?.status !== "approved") {
      result.warnings.push("Gate 2 memory update approval is not approved");
    }
  }
  const manifest = readJson(path.join(runDir, "06-image-manifest.json"), null);
  if (!manifest) {
    result.ok = false;
    result.warnings.push("06-image-manifest.json is missing or invalid JSON");
  } else if (manifest.publishReady !== true) {
    result.warnings.push("Image manifest is not publishReady");
  }
  return result;
}

function approveGate(runDir, gateName) {
  const statusPath = path.join(runDir, "run-status.json");
  const status = readJson(statusPath, null);
  if (!status) throw new Error(`Invalid run status: ${statusPath}`);
  const key = gateName === "memory" || gateName === "memoryUpdate" ? "memoryUpdate" : "publish";
  if (!status.gates?.[key]) throw new Error(`Unknown gate: ${gateName}`);
  status.gates[key].status = "approved";
  status.gates[key].approvedAt = nowIso();
  status.gates[key].approvedBy = "Cc";
  status.updatedAt = nowIso();
  writeJson(statusPath, status);
  return status.gates[key];
}

function promoteMemory(root, runDir, args) {
  if (!args.approve) {
    throw new Error("Refusing to promote memory without --approve. Gate 2 must be human-approved.");
  }
  approveGate(runDir, "memoryUpdate");
  const proposalPath = path.join(runDir, "12-memory-update-proposal.md");
  const proposal = readText(proposalPath).trim();
  if (!proposal) throw new Error(`Empty memory proposal: ${proposalPath}`);
  const contextPath = path.join(root, "state", "next-run-context.md");
  const append = `\n\n## Accepted Update - ${path.basename(runDir)} - ${nowIso()}\n\n${proposal}\n`;
  fs.appendFileSync(contextPath, append, "utf8");
  return contextPath;
}

function statusReport(root) {
  initRuntime(root);
  const runs = listRuns(root);
  return {
    runtimeRoot: root,
    mode: "L4.5-supervised-L5",
    runCount: runs.length,
    latestRuns: runs.slice(0, 8)
  };
}

function usage() {
  return `Usage:
  content-loop-runtime.mjs init [--runtime-root <path>]
  content-loop-runtime.mjs new-run --intent <text> [--creator chengcc] [--topic-slug slug] [--recent 5] [--runtime-root <path>]
  content-loop-runtime.mjs validate-run --run-dir <path>
  content-loop-runtime.mjs approve-gate --run-dir <path> --gate publish|memory
  content-loop-runtime.mjs promote-memory --run-dir <path> --approve [--runtime-root <path>]
  content-loop-runtime.mjs status [--runtime-root <path>]
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const command = args._[0];
  const root = runtimeRoot(args);

  try {
    if (command === "init") {
      const writes = initRuntime(root);
      console.log(JSON.stringify({ runtimeRoot: root, createdOrUpdated: writes }, null, 2));
      return;
    }
    if (command === "new-run") {
      const run = createRun(root, args);
      console.log(JSON.stringify({ runtimeRoot: root, ...run }, null, 2));
      return;
    }
    if (command === "validate-run") {
      if (!args["run-dir"]) throw new Error("Missing --run-dir");
      console.log(JSON.stringify(validateRun(path.resolve(String(args["run-dir"]))), null, 2));
      return;
    }
    if (command === "approve-gate") {
      if (!args["run-dir"]) throw new Error("Missing --run-dir");
      if (!args.gate) throw new Error("Missing --gate publish|memory");
      console.log(JSON.stringify(approveGate(path.resolve(String(args["run-dir"])), String(args.gate)), null, 2));
      return;
    }
    if (command === "promote-memory") {
      if (!args["run-dir"]) throw new Error("Missing --run-dir");
      const contextPath = promoteMemory(root, path.resolve(String(args["run-dir"])), args);
      console.log(JSON.stringify({ promotedTo: contextPath }, null, 2));
      return;
    }
    if (command === "status") {
      console.log(JSON.stringify(statusReport(root), null, 2));
      return;
    }
    console.error(usage());
    process.exitCode = 2;
  } catch (error) {
    console.error(JSON.stringify({ error: error.message }, null, 2));
    process.exitCode = 1;
  }
}

main();
