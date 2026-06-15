#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const skillRoot = resolve(__dirname, "..");
const repoRoot = resolve(skillRoot, "..", "..");

const checks = [
  {
    file: "SKILL.md",
    tokens: [
      "Visual System V2 design brief",
      "Visual System V2 validation gate",
      "content input",
      "meaning layer",
      "emotion layer",
      "Layout engine",
    ],
  },
  {
    file: "references/visual-system-v2.md",
    tokens: [
      "Content input -> Meaning -> Emotion -> Layout -> Editorial visual -> Output -> Feedback -> Rule update",
      "clarity",
      "confusion",
      "anxiety",
      "reflection",
      "calm",
      "tension",
      "[HEADER]",
      "[MAIN]",
      "[SIDE]",
      "[FOOTER]",
      "HERO",
      "GRID",
      "SPLIT",
      "EDITORIAL",
      "Visual Validation Gate",
      "sticker style as the default",
    ],
  },
  {
    file: "references/visual-adapter-rules.md",
    tokens: [
      "Visual System V2 Operating Rule",
      "content input",
      "meaning layer",
      "emotion layer",
      "layout engine",
      "validation",
    ],
  },
  {
    file: "references/workflow-pipeline.md",
    tokens: [
      "Visual System V2 design brief",
      "content_input",
      "meaning_layer",
      "emotion_layer",
      "layout_engine",
      "Visual rejection rules",
    ],
  },
  {
    file: "templates/carousel-plan.md",
    tokens: [
      "Visual System V2 Design Brief",
      "content_input",
      "meaning_layer",
      "emotion_layer",
      "Visual Validation",
    ],
  },
  {
    file: "docs/workflow-phases.md",
    tokens: [
      "Visual System V2 engine",
      "Visual System V2 validation gate",
      "record visual feedback",
    ],
  },
  {
    file: "templates/performance-loop.md",
    tokens: [
      "Visual System V2",
      "Visual rule update",
      "Total /100",
    ],
    antiTokens: ["Visual System V2 execution /10"],
  },
  {
    file: "README.md",
    root: repoRoot,
    optional: true,
    tokens: [
      "Visual System V2 design brief",
      "references/visual-system-v2.md",
      "Visual engine: V2 editorial system",
    ],
  },
];

let failures = 0;

for (const check of checks) {
  const root = check.root ?? skillRoot;
  const abs = resolve(root, check.file);
  let text;
  try {
    text = await readFile(abs, "utf8");
  } catch (error) {
    if (check.optional) {
      console.warn(`optional file not found, skipped: ${abs}`);
    } else {
      failures += 1;
      console.error(`missing file: ${abs}`);
    }
    continue;
  }

  const comparableText = text.toLowerCase();

  for (const token of check.tokens ?? []) {
    if (!comparableText.includes(token.toLowerCase())) {
      failures += 1;
      console.error(`missing token in ${check.file}: ${token}`);
    }
  }

  for (const token of check.antiTokens ?? []) {
    if (comparableText.includes(token.toLowerCase())) {
      failures += 1;
      console.error(`forbidden token in ${check.file}: ${token}`);
    }
  }
}

if (failures > 0) {
  console.error(`Visual System V2 verification failed: ${failures} issue(s).`);
  process.exit(1);
}

console.log("Visual System V2 verification passed.");
