#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const DEFAULT_RUNTIME_ROOT =
  path.resolve(process.cwd(), "runtime");
const DEFAULT_WORKBENCH_DIR =
  path.resolve(process.cwd(), "workbench");
const DEFAULT_READER_SCRIPT = "";

const DEFAULT_CREATOR_PROFILE = {
  profileVersion: "1.0.0",
  creator: {
    id: "chengcc",
    displayName: "澄Cc"
  },
  paths: {
    runtimeRoot: DEFAULT_RUNTIME_ROOT,
    workbenchDir: DEFAULT_WORKBENCH_DIR,
    readerScript: DEFAULT_READER_SCRIPT
  }
};

const STAGES = {
  "24h": {
    targetHours: 24,
    dueAfterHours: 23,
    file: "09-metrics-24h.md",
    nextStatus: "published_waiting_for_72h_metrics"
  },
  "72h": {
    targetHours: 72,
    dueAfterHours: 71,
    file: "10-metrics-72h.md",
    nextStatus: "metrics_captured_waiting_for_retro"
  }
};

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
  post-publish-metrics-bridge.mjs scan [--profile <json>] [--runtime-root <path>] [--workbench-dir <path>] [--dry-run] [--always-update-workbench]
  post-publish-metrics-bridge.mjs run --run-dir <path> [--profile <json>] [--force-stage early|24h|72h] [--dry-run]

Purpose:
  Bind Xiaohongshu creator backend reads back into ChengCc content-loop runs.

Notes:
  - Backend reading stays delegated to xiaohongshu-ops.
  - Gate 2 durable memory updates remain human-gated.
  - early snapshots are evidence only and never replace 24h/72h conclusions.

Environment:
  CONTENT_LOOP_PROFILE=<profile.json>
  CONTENT_LOOP_RUNTIME_ROOT=<runtime root>
  CONTENT_LOOP_WORKBENCH_DIR=<workbench dir>
  XHS_CREATOR_READER_SCRIPT=<reader script>
`;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readText(filePath, fallback = "") {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return fallback;
  }
}

function writeText(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf8");
}

function readJson(filePath, fallback = null) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function loadProfile(args) {
  const profilePath = args.profile || process.env.CONTENT_LOOP_PROFILE || "";
  if (!profilePath) return DEFAULT_CREATOR_PROFILE;
  const absoluteProfilePath = path.resolve(String(profilePath));
  const profile = readJson(absoluteProfilePath, null);
  if (!profile || typeof profile !== "object") {
    throw new Error(`Invalid creator profile JSON: ${absoluteProfilePath}`);
  }
  const merged = {
    ...DEFAULT_CREATOR_PROFILE,
    ...profile,
    creator: {
      ...DEFAULT_CREATOR_PROFILE.creator,
      ...(profile.creator || {})
    },
    paths: {
      ...DEFAULT_CREATOR_PROFILE.paths,
      ...(profile.paths || {})
    },
    __profilePath: absoluteProfilePath
  };
  merged.paths = resolveProfilePaths(merged.paths || {}, path.dirname(absoluteProfilePath));
  return merged;
}

function resolveProfilePaths(paths, baseDir) {
  const next = { ...paths };
  for (const key of ["runtimeRoot", "workbenchDir", "readerScript", "ragCaseLibrary", "creatorAssets", "outputImages"]) {
    const value = next[key];
    if (!value || path.isAbsolute(String(value))) continue;
    next[key] = path.resolve(baseDir, String(value));
  }
  return next;
}

function writeJson(filePath, value) {
  writeText(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function nowIso() {
  return new Date().toISOString();
}

function localDateTime(date = new Date()) {
  const parts = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).formatToParts(date).reduce((acc, part) => {
    acc[part.type] = part.value;
    return acc;
  }, {});
  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second} CST`;
}

function stamp(date = new Date()) {
  const parts = localDateTime(date).match(/\d+/g) || [];
  return `${parts[0]}${parts[1]}${parts[2]}-${parts[3]}${parts[4]}${parts[5]}`;
}

function parseLocalCst(value) {
  const match = String(value || "").match(/(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?/);
  if (!match) return null;
  const [, year, month, day, hour, minute, second = "0"] = match;
  return new Date(Date.UTC(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour) - 8,
    Number(minute),
    Number(second)
  ));
}

function runtimeRoot(args, profile = DEFAULT_CREATOR_PROFILE) {
  return path.resolve(String(
    args["runtime-root"] ||
    process.env.CONTENT_LOOP_RUNTIME_ROOT ||
    process.env.CHENGCC_CONTENT_LOOP_ROOT ||
    profile.paths?.runtimeRoot ||
    DEFAULT_RUNTIME_ROOT
  ));
}

function workbenchDir(args, profile = DEFAULT_CREATOR_PROFILE) {
  if (args["no-workbench"]) return "";
  return path.resolve(String(
    args["workbench-dir"] ||
    process.env.CONTENT_LOOP_WORKBENCH_DIR ||
    profile.paths?.workbenchDir ||
    DEFAULT_WORKBENCH_DIR
  ));
}

function readerScriptPath(args, profile = DEFAULT_CREATOR_PROFILE) {
  const value = String(
    args["reader-script"] ||
    process.env.XHS_CREATOR_READER_SCRIPT ||
    profile.paths?.readerScript ||
    DEFAULT_READER_SCRIPT
  );
  return value ? path.resolve(value) : "";
}

function listRunDirs(root, explicitRunDir) {
  if (explicitRunDir) return [path.resolve(String(explicitRunDir))];
  const runsDir = path.join(root, "runs");
  if (!fs.existsSync(runsDir)) return [];
  return fs
    .readdirSync(runsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(runsDir, entry.name))
    .sort();
}

function noteDetailUrl(status) {
  return (
    status?.postPublish?.noteDetailUrl ||
    status?.postPublishMetrics?.noteDetailUrl ||
    status?.creatorDashboardReadTest?.latestNoteDetailUrl ||
    status?.latestNoteDetailUrl ||
    ""
  );
}

function eligibleStatus(status) {
  return [
    "published_waiting_for_metrics",
    "published_waiting_for_24h_metrics",
    "published_waiting_for_72h_metrics",
    "metrics_captured_waiting_for_retro"
  ].includes(status?.status);
}

function stageCaptured(status, stage) {
  return status?.postPublishMetrics?.stages?.[stage]?.status === "captured";
}

function dueStages(status, args, now = new Date()) {
  const forced = args["force-stage"] ? String(args["force-stage"]) : "";
  if (forced) return [forced];

  const publishedAt = parseLocalCst(status?.publishedAt || status?.postPublish?.publishedAt);
  if (!publishedAt) return [];

  const ageHours = (now.getTime() - publishedAt.getTime()) / 36e5;
  const stages = [];
  if (!stageCaptured(status, "24h") && ageHours >= STAGES["24h"].dueAfterHours) stages.push("24h");
  if (!stageCaptured(status, "72h") && ageHours >= STAGES["72h"].dueAfterHours) stages.push("72h");
  return stages;
}

function parseNumber(value) {
  if (value === null || value === undefined) return null;
  const text = String(value).replace(/,/g, "").replace(/%$/, "").trim();
  if (!text || text === "-" || text === "--") return null;
  const number = Number(text);
  return Number.isFinite(number) ? number : null;
}

function findRecord(result, label) {
  return (result.records || []).find((record) => record.label === label) || {};
}

function normalizedMetrics(result, stage, runDir) {
  const detail = findRecord(result, "note-detail");
  const home = findRecord(result, "home");
  const metrics = detail.metrics || {};
  const noteInfo = detail.noteInfo || {};
  const expectedTitle = expectedTitleForRun(runDir);
  const backendTitle = noteInfo.title || "";
  const titleCheck = compareTitles(expectedTitle, backendTitle);
  return {
    stage,
    runDir,
    ok: Boolean(result.ok),
    status: result.status || (result.ok ? "ok" : "error"),
    generatedAt: result.generatedAt || nowIso(),
    capturedAtLocal: localDateTime(new Date(result.generatedAt || Date.now())),
    evidenceDir: result.outDir || "",
    sourceUrl: detail.url || "",
    title: backendTitle,
    expectedTitle,
    titleCheck,
    publishedAtVisible: noteInfo.publishedAtVisible || "",
    analysisUnavailable: noteInfo.analysisUnavailable || {},
    values: {
      exposure: parseNumber(metrics["曝光数"]),
      views: parseNumber(metrics["观看数"]),
      likes: parseNumber(metrics["点赞数"]),
      saves: parseNumber(metrics["收藏数"]),
      comments: parseNumber(metrics["评论数"]),
      shares: parseNumber(metrics["分享数"]),
      follows: parseNumber(metrics["涨粉数"] || metrics["新增关注"]),
      ctr: parseNumber(metrics["封面点击率"]),
      avgWatchTime: parseNumber(metrics["平均观看时长"])
    },
    rawLabels: {
      noteDetail: metrics,
      home: home.metrics || {}
    },
    screenshots: (result.records || [])
      .map((record) => record.screenshot)
      .filter(Boolean)
  };
}

function expectedTitleForRun(runDir) {
  const status = readJson(path.join(runDir, "run-status.json"), {});
  const explicit = status?.postPublish?.title || status?.publishTitle || status?.title || "";
  if (explicit) return String(explicit).trim();

  const checklist = readText(path.join(runDir, "07-publish-checklist.md"));
  const checklistTitle = headingValue(checklist, "Title");
  if (checklistTitle) return checklistTitle;

  const draft = readText(path.join(runDir, "05-carousel-draft.md"));
  return headingValue(draft, "Final Title");
}

function headingValue(text, heading) {
  const lines = String(text || "").split(/\r?\n/);
  const target = `## ${heading}`;
  const index = lines.findIndex((line) => line.trim() === target);
  if (index === -1) return "";
  for (let lineIndex = index + 1; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex].trim();
    if (!line) continue;
    if (line.startsWith("#")) return "";
    return line.replace(/^[-*]\s+/, "").trim();
  }
  return "";
}

function normalizeTitle(value) {
  return String(value || "")
    .replace(/[，。！？、：:；;「」“”"'`《》\s]/g, "")
    .trim();
}

function compareTitles(expectedTitle, backendTitle) {
  const expected = normalizeTitle(expectedTitle);
  const backend = normalizeTitle(backendTitle);
  if (!expected || !backend) {
    return {
      status: "unknown",
      expectedTitle: expectedTitle || "",
      backendTitle: backendTitle || "",
      warning: "Missing expected or backend title; verify note mapping manually."
    };
  }
  const matched = expected === backend || expected.includes(backend) || backend.includes(expected);
  return {
    status: matched ? "matched" : "mismatch",
    expectedTitle,
    backendTitle,
    warning: matched ? "" : "Local run title differs from creator backend title; do not draw title-performance conclusions until this is explained."
  };
}

function metricLine(label, value, suffix = "") {
  return `- ${label}: ${value === null || value === undefined ? "-" : `${value}${suffix}`}`;
}

function stageLabel(stage) {
  if (stage === "early") return "Early Backend Snapshot";
  return `${stage} Metrics`;
}

function renderMetricsSection(snapshot) {
  const values = snapshot.values || {};
  const sourceKind = snapshot.stage === "early"
    ? "early backend snapshot, not a formal 24h/72h conclusion"
    : "formal post-publish capture";
  return [
    `## Automated ${stageLabel(snapshot.stage)}`,
    "",
    `- Status: ${snapshot.ok ? "captured-from-creator-dashboard" : snapshot.status}`,
    `- Capture type: ${sourceKind}`,
    `- Captured at: ${snapshot.capturedAtLocal}`,
    `- Source: Xiaohongshu creator backend, note detail page`,
    `- Source URL: ${snapshot.sourceUrl || "-"}`,
    `- Evidence dir: ${snapshot.evidenceDir || "-"}`,
    `- Expected local title: ${snapshot.expectedTitle || "-"}`,
    `- Backend title: ${snapshot.title || "-"}`,
    `- Title check: ${snapshot.titleCheck?.status || "unknown"}`,
    snapshot.titleCheck?.warning ? `- Title warning: ${snapshot.titleCheck.warning}` : "",
    `- Backend published time: ${snapshot.publishedAtVisible || "-"}`,
    "",
    "### Metrics",
    "",
    metricLine("Exposure", values.exposure),
    metricLine("Reads/views", values.views),
    metricLine("Likes", values.likes),
    metricLine("Saves", values.saves),
    metricLine("Comments", values.comments),
    metricLine("Shares", values.shares),
    metricLine("Follows", values.follows),
    metricLine("Cover CTR", values.ctr, values.ctr === null || values.ctr === undefined ? "" : "%"),
    metricLine("Average watch/read time", values.avgWatchTime),
    "",
    "### Platform Limitations",
    "",
    `- Viewing-source unavailable: ${snapshot.analysisUnavailable?.source ? "yes" : "no"}`,
    `- Audience-analysis unavailable: ${snapshot.analysisUnavailable?.audience ? "yes" : "no"}`,
    `- Too little data notice: ${snapshot.analysisUnavailable?.tooLittleData ? "yes" : "no"}`,
    "",
    "### Raw Backend Labels",
    "",
    "```json",
    JSON.stringify(snapshot.rawLabels?.noteDetail || {}, null, 2),
    "```",
    ""
  ].join("\n");
}

function replaceMarkedSection(text, key, section) {
  const start = `<!-- post-publish-bridge:${key}:start -->`;
  const end = `<!-- post-publish-bridge:${key}:end -->`;
  const block = `${start}\n${section.trim()}\n${end}`;
  const pattern = new RegExp(`${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}`);
  if (pattern.test(text)) return text.replace(pattern, block);
  return `${text.trim()}\n\n${block}\n`;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function upsertMetricsFile(runDir, snapshot) {
  const stage = snapshot.stage === "early" ? "early" : snapshot.stage;
  const targetFile = snapshot.stage === "72h" ? STAGES["72h"].file : STAGES["24h"].file;
  const filePath = path.join(runDir, targetFile);
  let text = readText(filePath, `# ${stageLabel(snapshot.stage)}\n\nStatus: waiting-for-data\n`);
  if (snapshot.stage !== "early" && snapshot.ok) {
    text = text.replace(/^Status:.*$/m, "Status: captured-from-creator-dashboard");
  }
  text = replaceMarkedSection(text, stage, renderMetricsSection(snapshot));
  writeText(filePath, `${text.trim()}\n`);
  return filePath;
}

function readStageSnapshot(runDir, stage) {
  const status = readJson(path.join(runDir, "run-status.json"), {});
  return status?.postPublishMetrics?.stages?.[stage] || null;
}

function renderRetro(runDir, currentSnapshot) {
  const status = readJson(path.join(runDir, "run-status.json"), {});
  const stage24 = readStageSnapshot(runDir, "24h");
  const stage72 = readStageSnapshot(runDir, "72h");
  const prediction = readText(path.join(runDir, "08-prediction.md")).trim();
  const titleCheck = stage72?.titleCheck || stage24?.titleCheck || currentSnapshot?.titleCheck || null;
  const statusText = stage72?.status === "captured"
    ? "retro-ready-gate-2-pending"
    : stage24?.status === "captured"
      ? "draft-after-24h-waiting-for-72h"
      : "waiting-for-24h-and-72h-metrics";
  const values24 = stage24?.values || {};
  const values72 = stage72?.values || {};
  return `# 11 Retro

Status: ${statusText}
Run ID: ${status.runId || path.basename(runDir)}

## Publish Record

- Published manually by Cc: ${status.publishMode === "manual-by-Cc" ? "yes" : "unknown"}
- Publish confirmation time: ${status.publishedAt || status.postPublish?.publishedAt || "-"}
- Gate 1: ${status.gates?.publish?.status || "unknown"}
- Metrics source: Xiaohongshu creator backend via xiaohongshu-ops read-only script
- Last bridge capture: ${currentSnapshot?.capturedAtLocal || "-"}

## Prediction Source

Use \`08-prediction.md\`.

<details>
<summary>Prediction excerpt</summary>

${prediction.slice(0, 1800) || "(empty)"}

</details>

## Actual Metrics

### 24h

- Status: ${stage24?.status || "waiting-for-data"}
${metricLine("Exposure", values24.exposure)}
${metricLine("Reads/views", values24.views)}
${metricLine("Likes", values24.likes)}
${metricLine("Saves", values24.saves)}
${metricLine("Comments", values24.comments)}
${metricLine("Shares", values24.shares)}
${metricLine("Follows", values24.follows)}
${metricLine("Cover CTR", values24.ctr, values24.ctr === null || values24.ctr === undefined ? "" : "%")}
- Evidence: ${stage24?.evidenceDir || "-"}

### 72h

- Status: ${stage72?.status || "waiting-for-data"}
${metricLine("Exposure", values72.exposure)}
${metricLine("Reads/views", values72.views)}
${metricLine("Likes", values72.likes)}
${metricLine("Saves", values72.saves)}
${metricLine("Comments", values72.comments)}
${metricLine("Shares", values72.shares)}
${metricLine("Follows", values72.follows)}
${metricLine("Cover CTR", values72.ctr, values72.ctr === null || values72.ctr === undefined ? "" : "%")}
- Evidence: ${stage72?.evidenceDir || "-"}

## Retro Draft

### Data Integrity Check

- Title check: ${titleCheck?.status || "waiting-for-data"}
- Expected local title: ${titleCheck?.expectedTitle || "-"}
- Backend title: ${titleCheck?.backendTitle || "-"}
- Warning: ${titleCheck?.warning || "none"}

### Prediction vs Actual

- Prediction: pending manual comparison with \`08-prediction.md\`.
- Actual: use the metric blocks above; do not infer missing fields.
- Result: ${stage72?.status === "captured" ? "ready for Cc review" : "wait for 72h before final judgment"}.

### Title Analysis

- Check whether “AI没教我暴富，只让我看清钱的结构” created enough click intent after comparing exposure, views, and CTR.
- If the title check is \`mismatch\`, do not attribute performance to the local title until the actual published title is confirmed.
- If CTR is missing or sample is low, mark title judgment as inconclusive.

### Cover / Image Analysis

- Compare P1 title-first cover against exposure-to-view conversion.
- Do not attribute weak data to image style alone before checking sample size and publish timing.

### Content Structure Analysis

- Check whether the real-scene opening and active/passive income structure produced saves or comments.
- If saves are stronger than likes/comments, treat the post as possible collection-value content, not necessarily emotion-discussion content.

### What To Repeat

- Pending Cc review after 72h metrics.

### What To Avoid

- Do not turn one weak or early sample into a durable rule.

### Rule Update Evidence

Gate 2 remains required. No durable rule update has been applied by this bridge.
`;
}

function updateRetro(runDir, snapshot) {
  const filePath = path.join(runDir, "11-retro.md");
  writeText(filePath, renderRetro(runDir, snapshot));
  return filePath;
}

function renderMemoryProposal(runDir) {
  const status = readJson(path.join(runDir, "run-status.json"), {});
  const stage24 = readStageSnapshot(runDir, "24h");
  const stage72 = readStageSnapshot(runDir, "72h");
  return `# 12 Memory Update Proposal

Status: pending-gate-2
Human gate: required
Approved by Cc: no
Run ID: ${status.runId || path.basename(runDir)}

## Gate 2

- Decision: pending
- Approved at:
- Approved by:

## Evidence Available

- 24h captured: ${stage24?.status === "captured" ? "yes" : "no"}
- 72h captured: ${stage72?.status === "captured" ? "yes" : "no"}
- 24h evidence: ${stage24?.evidenceDir || "-"}
- 72h evidence: ${stage72?.evidenceDir || "-"}

## Proposal

Do not update durable rules automatically. After Cc reviews \`11-retro.md\`, decide whether this run supports:

- keeping title-first warm-white covers for finance/AI structure topics;
- repeating “real story first, structure second” for abstract finance themes;
- changing the first-page hook if exposure-to-view conversion is weak;
- creating a watch item instead of a rule if sample size is low.

## Confidence

Low until Cc reviews the data context and confirms whether the sample is representative.
`;
}

function updateMemoryProposalIfReady(runDir) {
  const stage72 = readStageSnapshot(runDir, "72h");
  if (stage72?.status !== "captured") return null;
  const filePath = path.join(runDir, "12-memory-update-proposal.md");
  writeText(filePath, renderMemoryProposal(runDir));
  return filePath;
}

function updateRunStatus(runDir, snapshot, args) {
  const statusPath = path.join(runDir, "run-status.json");
  const status = readJson(statusPath, {});
  const stage = snapshot.stage;
  status.postPublishMetrics = status.postPublishMetrics || {
    version: 1,
    source: "xiaohongshu-creator-dashboard",
    readerScript: readerScriptPath(args, args.__profile),
    stages: {}
  };
  status.postPublishMetrics.lastCheckedAt = nowIso();
  status.postPublishMetrics.lastCheckedAtLocal = localDateTime();
  status.postPublishMetrics.noteDetailUrl = snapshot.sourceUrl || noteDetailUrl(status);
  if (stage !== "early") {
    status.postPublishMetrics.stages[stage] = {
      status: snapshot.ok ? "captured" : snapshot.status,
      capturedAt: snapshot.generatedAt,
      capturedAtLocal: snapshot.capturedAtLocal,
      evidenceDir: snapshot.evidenceDir,
      sourceUrl: snapshot.sourceUrl,
      title: snapshot.title,
      expectedTitle: snapshot.expectedTitle,
      titleCheck: snapshot.titleCheck,
      publishedAtVisible: snapshot.publishedAtVisible,
      values: snapshot.values,
      analysisUnavailable: snapshot.analysisUnavailable
    };
    if (snapshot.ok && STAGES[stage]?.nextStatus) status.status = STAGES[stage].nextStatus;
  } else {
    status.postPublishMetrics.earlySnapshot = {
      status: snapshot.ok ? "captured" : snapshot.status,
      capturedAt: snapshot.generatedAt,
      capturedAtLocal: snapshot.capturedAtLocal,
      evidenceDir: snapshot.evidenceDir,
      sourceUrl: snapshot.sourceUrl,
      title: snapshot.title,
      expectedTitle: snapshot.expectedTitle,
      titleCheck: snapshot.titleCheck,
      publishedAtVisible: snapshot.publishedAtVisible,
      values: snapshot.values,
      note: "Early backend snapshot only; not a formal 24h/72h conclusion."
    };
  }
  status.updatedAt = nowIso();
  writeJson(statusPath, status);
  return status;
}

function updateIndex(root, status) {
  const indexPath = path.join(root, "indexes", "run-index.json");
  const index = readJson(indexPath, { runs: [] });
  const runs = Array.isArray(index.runs) ? index.runs : [];
  const next = runs.map((item) => {
    if (item.runId !== status.runId) return item;
    return {
      ...item,
      status: status.status,
      updatedAt: status.updatedAt,
      gate1: status.gates?.publish?.status || item.gate1,
      gate2: status.gates?.memoryUpdate?.status || item.gate2
    };
  });
  writeJson(indexPath, { ...index, runs: next });
}

function runReader(runDir, stage, args) {
  const status = readJson(path.join(runDir, "run-status.json"), {});
  const url = noteDetailUrl(status);
  if (!url && !args["allow-latest-note-fallback"]) {
    return {
      ok: false,
      skipped: true,
      reason: "missing-note-detail-url",
      runDir,
      stage
    };
  }

  const outDir = path.join(runDir, "evidence", "post-publish-metrics", `${stage}-${stamp()}`);
  const readerScript = readerScriptPath(args, args.__profile);
  if (!readerScript) {
    return {
      ok: false,
      skipped: true,
      reason: "missing-reader-script",
      runDir,
      stage,
      note: "Set paths.readerScript in the creator profile or fill metrics manually."
    };
  }
  const command = [
    readerScript,
    "--run-dir",
    runDir,
    "--out-dir",
    outDir
  ];
  if (url) command.push("--note-detail-url", url);
  const wbDir = workbenchDir(args, args.__profile);
  if (wbDir) {
    command.push("--workbench-dir", wbDir);
  } else {
    command.push("--no-workbench");
  }
  if (args["no-screenshots"]) command.push("--no-screenshots");

  const child = spawnSync(process.execPath, command, {
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024
  });
  const evidencePath = path.join(outDir, "creator-dashboard-metrics.json");
  const result = readJson(evidencePath, null);
  if (!result) {
    return {
      ok: false,
      stage,
      runDir,
      outDir,
      reason: "reader-did-not-write-evidence",
      exitCode: child.status,
      stderr: child.stderr?.slice(0, 2000) || "",
      stdout: child.stdout?.slice(0, 2000) || ""
    };
  }
  return { result, outDir };
}

function processRun(root, runDir, args) {
  const status = readJson(path.join(runDir, "run-status.json"), null);
  if (!status) return { runDir, skipped: true, reason: "missing-run-status" };
  if (!eligibleStatus(status) && !args["force-stage"]) {
    return { runDir, runId: status.runId, skipped: true, reason: `status-${status.status || "unknown"}` };
  }

  const stages = dueStages(status, args);
  if (stages.length === 0) {
    return { runDir, runId: status.runId, skipped: true, reason: "no-due-stage" };
  }

  const planned = stages.map((stage) => ({ stage, runDir, noteDetailUrl: noteDetailUrl(status) || null }));
  if (args["dry-run"]) {
    return { runDir, runId: status.runId, dryRun: true, planned };
  }

  const outputs = [];
  for (const stage of stages) {
    if (!["early", "24h", "72h"].includes(stage)) {
      outputs.push({ stage, ok: false, reason: "unknown-stage" });
      continue;
    }
    const reader = runReader(runDir, stage, args);
    if (reader.skipped || !reader.result) {
      outputs.push(reader);
      continue;
    }
    const snapshot = normalizedMetrics(reader.result, stage, runDir);
    const metricsFile = upsertMetricsFile(runDir, snapshot);
    const updatedStatus = updateRunStatus(runDir, snapshot, args);
    updateIndex(root, updatedStatus);
    const retroFile = stage === "early" ? null : updateRetro(runDir, snapshot);
    const memoryProposalFile = stage === "72h" ? updateMemoryProposalIfReady(runDir) : null;
    outputs.push({
      stage,
      ok: snapshot.ok,
      metricsFile,
      retroFile,
      memoryProposalFile,
      evidenceDir: snapshot.evidenceDir,
      capturedAtLocal: snapshot.capturedAtLocal,
      values: snapshot.values
    });
  }
  return { runDir, runId: status.runId, processed: outputs };
}

function updateWorkbenchOnly(args) {
  if (args["dry-run"] || !args["always-update-workbench"]) return null;
  const wbDir = workbenchDir(args, args.__profile);
  if (!wbDir) return null;
  const outDir = path.join(wbDir, "data", "creator-dashboard-evidence", stamp());
  const readerScript = readerScriptPath(args, args.__profile);
  if (!readerScript) {
    return {
      ok: false,
      skipped: true,
      reason: "missing-reader-script",
      note: "Set paths.readerScript in the creator profile or disable automatic workbench metric updates."
    };
  }
  const child = spawnSync(process.execPath, [
    readerScript,
    "--out-dir",
    outDir,
    "--workbench-dir",
    wbDir
  ], {
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024
  });
  const evidencePath = path.join(outDir, "creator-dashboard-metrics.json");
  return {
    ok: child.status === 0 && fs.existsSync(evidencePath),
    outDir,
    evidence: evidencePath,
    exitCode: child.status,
    stderr: child.stderr?.slice(0, 1000) || ""
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const command = args._[0] || "scan";
  if (args.help || command === "help") {
    console.log(usage());
    return;
  }

  const profile = loadProfile(args);
  args.__profile = profile;
  const root = runtimeRoot(args, profile);
  const runDirs = command === "run"
    ? listRunDirs(root, args["run-dir"])
    : listRunDirs(root, null);

  if (command === "run" && !args["run-dir"]) {
    throw new Error("Missing --run-dir for run command");
  }

  const results = runDirs.map((runDir) => processRun(root, runDir, args));
  const processedCount = results.filter((result) => result.processed?.length).length;
  const workbenchUpdate = processedCount === 0 ? updateWorkbenchOnly(args) : null;
  console.log(JSON.stringify({
    ok: results.every((result) => result.skipped || result.dryRun || result.processed?.every((item) => item.ok || item.skipped)),
    command,
    runtimeRoot: root,
    checkedRunCount: runDirs.length,
    processedRunCount: processedCount,
    results,
    workbenchUpdate
  }, null, 2));
}

try {
  main();
} catch (error) {
  console.error(JSON.stringify({ ok: false, error: String(error?.stack || error).slice(0, 2000) }, null, 2));
  process.exit(1);
}
