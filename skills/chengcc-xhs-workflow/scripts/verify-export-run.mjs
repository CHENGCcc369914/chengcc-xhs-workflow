#!/usr/bin/env node

import { access, readFile } from "node:fs/promises";
import { relative, resolve } from "node:path";

const exportDir = process.argv[2];

if (!exportDir) {
  console.error("Usage: node scripts/verify-export-run.mjs <export-folder>");
  process.exit(2);
}

const manifestPath = resolve(exportDir, "run-manifest.json");
const actualExportDir = resolve(exportDir);
let manifest;

try {
  manifest = JSON.parse(await readFile(manifestPath, "utf8"));
} catch (error) {
  console.error(`missing or invalid manifest: ${manifestPath}`);
  process.exit(1);
}

const failures = [];

function requireField(path, value) {
  if (value === undefined || value === null || value === "") {
    failures.push(`missing required field: ${path}`);
  }
}

function isInside(parent, child) {
  const rel = relative(parent, child);
  return rel === "" || (!rel.startsWith("..") && !rel.startsWith("/"));
}

requireField("run_id", manifest.run_id);
requireField("creator", manifest.creator);
requireField("topic", manifest.topic);
requireField("page_count", manifest.page_count);
requireField("export_folder", manifest.export_folder);
requireField("visual_route", manifest.visual_route);
requireField("card_copy_hash", manifest.card_copy_hash);
requireField("required_sources.ip_spec", manifest.required_sources?.ip_spec);
requireField("required_sources.clothing_reference", manifest.required_sources?.clothing_reference);
requireField("required_sources.visual_rules", manifest.required_sources?.visual_rules);
requireField("required_sources.ip_extension_rules", manifest.required_sources?.ip_extension_rules);

if (manifest.export_folder && resolve(manifest.export_folder) !== actualExportDir) {
  failures.push(`manifest.export_folder must equal verified export folder: ${actualExportDir}`);
}

if (manifest.card_copy_hash && !String(manifest.card_copy_hash).startsWith("sha256:")) {
  failures.push("manifest.card_copy_hash must start with sha256:");
}

if (manifest.card_copy_hash && /example|test|placeholder|unverified/i.test(String(manifest.card_copy_hash))) {
  failures.push("manifest.card_copy_hash must not be a placeholder value");
}

if (manifest.visual_route && /failed|wrong visual|stale|semi-realistic|collage|local-asset/i.test(String(manifest.visual_route))) {
  failures.push("manifest.visual_route contains failure or stale-asset wording");
}

if (!Array.isArray(manifest.pages) || manifest.pages.length === 0) {
  failures.push("manifest.pages must be a non-empty array");
}

if (Number.isInteger(manifest.page_count) && Array.isArray(manifest.pages) && manifest.page_count !== manifest.pages.length) {
  failures.push(`manifest.page_count must equal pages.length, got ${manifest.page_count} vs ${manifest.pages.length}`);
}

if (manifest.publish_ready !== true) {
  failures.push("manifest.publish_ready must be true before manual publish checklist");
}

const seenPages = new Set();
const seenExportPaths = new Set();

for (const [index, page] of (manifest.pages ?? []).entries()) {
  const label = `pages[${index}]`;
  requireField(`${label}.page`, page.page);
  requireField(`${label}.approved_copy`, page.approved_copy);
  requireField(`${label}.source_generated_path`, page.source_generated_path);
  requireField(`${label}.export_path`, page.export_path);

  if (page.page !== index + 1) {
    failures.push(`${label}.page must be sequential starting at 1`);
  }

  if (seenPages.has(page.page)) {
    failures.push(`${label}.page is duplicated: ${page.page}`);
  }
  seenPages.add(page.page);

  if (page.status !== "pass") {
    failures.push(`${label}.status must be pass, got ${JSON.stringify(page.status)}`);
  }

  const validation = page.validation ?? {};
  for (const key of [
    "current_topic_text",
    "visual_system_v2",
    "chengcc_ip_v2",
    "readable_chinese",
    "no_stale_or_wrong_asset",
  ]) {
    if (validation[key] !== "pass") {
      failures.push(`${label}.validation.${key} must be pass`);
    }
  }

  if (page.export_path) {
    const abs = page.export_path.startsWith("/") ? resolve(page.export_path) : resolve(exportDir, page.export_path);
    if (!isInside(actualExportDir, abs)) {
      failures.push(`${label}.export_path must be inside export folder: ${abs}`);
    }
    if (seenExportPaths.has(abs)) {
      failures.push(`${label}.export_path is duplicated: ${abs}`);
    }
    seenExportPaths.add(abs);
    try {
      await access(abs);
    } catch {
      failures.push(`${label}.export_path does not exist: ${abs}`);
    }
  }

  if (page.source_generated_path) {
    const abs = page.source_generated_path.startsWith("/")
      ? resolve(page.source_generated_path)
      : resolve(exportDir, page.source_generated_path);
    const exportAbs = page.export_path
      ? page.export_path.startsWith("/")
        ? resolve(page.export_path)
        : resolve(exportDir, page.export_path)
      : "";
    if (exportAbs && abs === exportAbs) {
      failures.push(`${label}.source_generated_path must differ from export_path`);
    }
    try {
      await access(abs);
    } catch {
      failures.push(`${label}.source_generated_path does not exist: ${abs}`);
    }
  }
}

for (const [index, rejected] of (manifest.rejected_attempts ?? []).entries()) {
  if (!rejected.reason) {
    failures.push(`rejected_attempts[${index}].reason is required`);
  }
}

if (failures.length > 0) {
  console.error(`Export run verification failed: ${failures.length} issue(s).`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Export run verification passed.");
