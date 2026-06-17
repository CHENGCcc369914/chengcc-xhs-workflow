#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const skillRoot = resolve(__dirname, "..");
const skillsRoot = resolve(skillRoot, "..");
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
      "run-manifest.json",
      "card copy hash",
      "Publish ready",
      "source_generated_path",
      "differ from the copied `export_path`",
      "reference_only",
      "wrong visual route",
      "semi-realistic collage",
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
      "ChengCc Standard Avatar IP",
    ],
  },
  {
    file: "references/chengcc-ip-extension-rules.md",
    tokens: [
      "ChengCc Standard Avatar IP Extension Rules",
      "subtle orange",
      "left ear: two hoops",
      "right ear: one hoop",
      "orange `C` necklace",
      "orange/C/orange-fruit outfit system",
      "Prompt Block To Insert",
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
      "run-manifest.json",
      "status: \"pass\"",
      "reference_only",
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
      "Run manifest",
      "Every final page has manifest status `pass`",
      "Source generated paths differ from export paths",
    ],
  },
  {
    file: "templates/image-run-manifest.json",
    tokens: [
      "run_id",
      "card_copy_hash",
      "page_count",
      "visual_route",
      "source_generated_path",
      "export_path",
      "sha256:<64-hex-copy-lock>",
      "no_stale_or_wrong_asset",
      "publish_ready",
    ],
  },
  {
    file: "test-prompts.json",
    tokens: [
      "image-generation-manifest-gate",
      "reject-stale-visual-with-current-text",
      "copy-change-regenerate-image",
      "manifest-path-boundary",
      "performance-loop-no-fake-metrics",
    ],
  },
  {
    file: "scripts/verify-export-run.mjs",
    tokens: [
      "run-manifest.json",
      "manifest.publish_ready must be true",
      "manifest.export_folder must equal verified export folder",
      "manifest.card_copy_hash must start with sha256:",
      "manifest.card_copy_hash must not be a placeholder value",
      "source_generated_path must differ from export_path",
      "export_path must be inside export folder",
      "source_generated_path",
      "visual_system_v2",
      "chengcc_ip_v2",
      "no_stale_or_wrong_asset",
      "Export run verification passed.",
    ],
  },
  {
    file: "cc-xhs-personal-growth-writer/references/asset-map.md",
    root: skillsRoot,
    tokens: [
      "当前视觉真相源是 `../knowledge-base/05-visual-and-carousel-style.md`",
      "治愈系手绘 IP 图文风",
      "澄Cc标准人物 IP 是默认角色",
      "run manifest",
    ],
    antiTokens: [
      "年轻生活美学杂志风",
      "橙子 IP 只做小 icon",
      "统一原创橙子 IP",
    ],
  },
  {
    file: "cc-xhs-personal-growth-writer/knowledge-base/03-creation-routing.md",
    root: skillsRoot,
    tokens: [
      "run-manifest.json",
      "publish_ready: true",
      "旧图",
      "半写实拼贴",
      "reference_only",
    ],
  },
  {
    file: "cc-xhs-personal-growth-writer/knowledge-base/04-output-contract.md",
    root: skillsRoot,
    tokens: [
      "Image 2 生成状态",
      "run-manifest.json",
      "Card copy hash",
      "Publish ready",
      "reference_only",
    ],
  },
  {
    file: "cc-xhs-personal-growth-writer/knowledge-base/05-visual-and-carousel-style.md",
    root: skillsRoot,
    tokens: [
      "run-manifest.json",
      "page_count",
      "卡片文案 hash",
      "源生成图路径",
      "publish_ready: true",
      "rejected_attempts",
    ],
  },
  {
    file: "cc-xhs-personal-growth-writer/test-prompts.json",
    root: skillsRoot,
    tokens: [
      "complete-package-routes-to-workflow",
      "writer-visual-manifest-awareness",
      "no-old-orange-ip-default",
    ],
  },
  {
    file: "docs/workflow-phases.md",
    tokens: [
      "Visual System V2 engine",
      "Visual System V2 validation gate",
      "run-manifest.json",
      "manifest status `pass`",
      "source_generated_path",
      "record visual feedback",
    ],
  },
  {
    file: "templates/post-brief.md",
    tokens: [
      "Image Run Gate",
      "Manifest path",
      "Card copy hash",
      "Final upload paths source: manifest pass pages only",
    ],
  },
  {
    file: "templates/platform-review.md",
    tokens: [
      "Image run manifest checked",
      "Publish-ready image paths are manifest pass only",
    ],
  },
  {
    file: "docs/customize-for-friends.md",
    tokens: [
      "run-manifest.json",
      "publish_ready: true",
      "run manifest gate after image generation",
      "Style B healing hand-drawn IP visual",
    ],
  },
  {
    file: "examples/sample-output.md",
    tokens: [
      "Run ID",
      "Manifest",
      "Card copy hash",
      "通过验收",
      "rejected_attempts",
      "publish_ready: true",
      "manifest pass",
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
