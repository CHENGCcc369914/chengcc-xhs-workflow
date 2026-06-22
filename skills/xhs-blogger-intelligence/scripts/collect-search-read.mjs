#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const usage = `Usage:
  node scripts/collect-search-read.mjs \\
    --watchlist examples/watchlist-chengcc.example.json \\
    --account "小柴人不纠结" \\
    --out-dir /path/to/private/raw/run \\
    --limit 3

Required:
  --watchlist <path>  Watchlist JSON file
  --account <name>   display_name in watchlist
  --out-dir <path>   Private/local output directory, outside this shareable repo

Optional:
  --query <text>     Search query, defaults to account display_name
  --limit <n>        Notes to read after filtering, default 3, max 10
  --comments <bool>  Collect public comment snapshots (off by default). Values: true/false
  --comments-limit <n> Max comment snapshots per note, default 8, max 50
  --comments-sort <mode> Comment snapshot ranking: engagement or source, default engagement
  --redbook <cmd>    redbook command, default "redbook"
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
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      throw new Error(`Missing value for --${key}`);
    }
    args[key] = next;
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

function runCommand(cmd, args, basePath) {
  const result = spawnSync(cmd, args, { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 });
  writeText(`${basePath}.stdout`, result.stdout || "");
  writeText(`${basePath}.stderr`, result.stderr || "");
  writeText(`${basePath}.exit`, `${result.status ?? 1}\n`);
  return {
    command: [cmd, ...args].join(" "),
    status: result.status ?? 1,
    stdout: result.stdout || "",
    stderr: result.stderr || "",
    error: result.error ? String(result.error) : ""
  };
}

function parseJson(text, label) {
  try {
    return JSON.parse(text || "null");
  } catch (error) {
    throw new Error(`Failed to parse ${label} as JSON: ${error.message}`);
  }
}

function toSafeInt(value, fallback, min, max) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  const rounded = Math.floor(parsed);
  return Math.max(min, Math.min(rounded, max));
}

function parseCount(value) {
  if (value == null || value === "") {
    return 0;
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  const text = String(value).trim();
  const multiplier = text.includes("万") ? 10000 : 1;
  const normalized = text.replace(/[^\d.]/g, "");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed * multiplier : 0;
}

function readWatchlist(path) {
  if (!existsSync(path)) {
    throw new Error(`Watchlist not found: ${path}`);
  }
  return parseJson(readFileSync(path, "utf8"), path);
}

function findAccount(watchlist, displayName) {
  const account = (watchlist.accounts || []).find((item) => item.display_name === displayName);
  if (!account) {
    throw new Error(`Account not found in watchlist: ${displayName}`);
  }
  return account;
}

function normalizeSearchItems(data) {
  return data?.items || data?.data?.items || [];
}

function getAuthor(item) {
  return item?.note_card?.user || item?.user || {};
}

function getNoteUrl(item) {
  return item?.webUrl || item?.note_card?.webUrl || item?.url || item?.share_url || "";
}

function getNoteId(item) {
  return item?.id || item?.note_id || item?.noteId || item?.note_card?.note_id || "";
}

function getTitle(item) {
  return item?.note_card?.display_title || item?.display_title || item?.title || "";
}

function filterSearchItems(items, account) {
  const expectedName = account.display_name;
  const expectedUserId = account.xhs_user_id;
  const seen = new Set();
  const filtered = [];

  for (const item of items) {
    const author = getAuthor(item);
    const authorName = author.nickname || author.nick_name || author.name || "";
    const authorId = author.user_id || author.id || "";
    const url = getNoteUrl(item);
    const id = getNoteId(item);
    const matchesName = authorName === expectedName;
    const matchesId = expectedUserId && authorId === expectedUserId;
    if (!url || (!matchesName && !matchesId)) continue;
    const key = id || url;
    if (seen.has(key)) continue;
    seen.add(key);
    filtered.push({
      id,
      url,
      title: getTitle(item),
      author_name: authorName,
      author_id: authorId
    });
  }

  return filtered;
}

function noteTags(detail) {
  return (detail?.tag_list || [])
    .map((tag) => tag?.name || tag?.tag_name || tag?.id || "")
    .filter(Boolean);
}

function epochToIso(value) {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return null;
  }
  const millis = value > 10_000_000_000 ? value : value * 1000;
  const date = new Date(millis);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date.toISOString();
}

function normalizeDetail(detail, account, source, rawPath) {
  return {
    platform: "xiaohongshu",
    account_id: detail?.user?.user_id || source.author_id || account.xhs_user_id || null,
    account_red_id: account.xhs_red_id || null,
    account_name: detail?.user?.nickname || detail?.user?.nick_name || source.author_name || account.display_name,
    post_id: detail?.note_id || source.id || null,
    post_url: detail?.webUrl || source.url,
    title: detail?.title || source.title || "",
    publish_time: epochToIso(detail?.time),
    collected_at: new Date().toISOString(),
    engagement_snapshot: {
      liked_count: detail?.interact_info?.liked_count ?? null,
      collected_count: detail?.interact_info?.collected_count ?? null,
      comment_count: detail?.interact_info?.comment_count ?? null,
      share_count: detail?.interact_info?.share_count ?? null
    },
    media_count: Array.isArray(detail?.image_list) ? detail.image_list.length : null,
    format: detail?.type || null,
    tag_names: noteTags(detail),
    source_adapter: "redbook search fallback + read",
    collection_status: "detail_read_complete_from_search_fallback",
    short_excerpt_or_paraphrase: summarizeWithoutCopying(detail),
    raw_source: rawPath
  };
}

function summarizeWithoutCopying(detail) {
  const title = detail?.title || "";
  const tags = noteTags(detail).slice(0, 6);
  const mediaCount = Array.isArray(detail?.image_list) ? detail.image_list.length : null;
  const topic = tags.length ? tags.join(" / ") : "untagged";
  return `Public note about ${topic}; title-led format${mediaCount ? ` with ${mediaCount} media item(s)` : ""}. Use this as structure signal only.`;
}

function summarizeComments(raw, limit, options = {}) {
  const container = raw?.data || raw || {};
  const comments = Array.isArray(container)
    ? container
    : Array.isArray(container.comments)
    ? container.comments
    : (Array.isArray(container.items) ? container.items : []);
  const total = toSafeInt(
    container.total,
    toSafeInt(
      container.comment_count,
      comments.length,
      0,
      Number.MAX_SAFE_INTEGER
    ),
    0,
    Number.MAX_SAFE_INTEGER
  );

  const normalized = comments.map((item, index) => {
      const author = item?.user_info || item?.user || item?.author || {};
      const text = item?.content || item?.text || item?.comment_content || "";
      const likeCount = item?.interact_info?.liked_count ?? item?.liked_count ?? item?.like_count ?? null;
      const replyCount = item?.sub_comment_count ?? item?.reply_count ?? null;
      const authorReply = (item?.sub_comments || []).find((reply) => {
        const replyAuthor = reply?.user_info || reply?.user || reply?.author || {};
        return (reply.show_tags || []).includes("is_author") || (options.authorUserId && replyAuthor.user_id === options.authorUserId);
      });
      const score = parseCount(likeCount) + parseCount(replyCount) * 2;
      return {
        comment_id: item?.id || item?.comment_id || null,
        user_nickname: author.nickname || author.nick_name || author.name || "unknown",
        user_id: author.user_id || author.id || null,
        text_excerpt: String(text).slice(0, 120),
        like_count: likeCount,
        sub_comment_count: replyCount,
        engagement_score: score,
        ip_location: item?.ip_location || null,
        status: item?.status ?? null,
        author_reply_excerpt: authorReply?.content ? String(authorReply.content).slice(0, 120) : "",
        posted_at: epochToIso(parseCount(item?.time || item?.create_time || item?.created_at)) || item?.time || item?.create_time || item?.created_at || null,
        source_index: index
      };
    })
    .filter((item) => item.text_excerpt);

  const snapshots = (options.sortMode === "source" ? normalized : normalized.sort((a, b) => b.engagement_score - a.engagement_score))
    .slice(0, limit);

  return {
    count: total,
    selection: options.sortMode === "source" ? "source_order" : "top_by_engagement",
    snapshots
  };
}

function noteCardMarkdown(record) {
  const safeTitle = record.title || "(untitled)";
  const topicTags = (record.tag_names || []).slice(0, 8).join(" / ") || "unknown";
  const commentSnapshot = record.comment_snapshot;
  const commentSummary = commentSnapshot
    ? `${commentSnapshot.snapshots.length} public sample(s), ${commentSnapshot.selection || "unknown selection"}`
    : "not requested or unavailable";
  const commentExamples = commentSnapshot?.snapshots?.length
    ? commentSnapshot.snapshots.map((item) => `- ${item.text_excerpt} (score: ${item.engagement_score || 0})`).join("\n")
    : "- none";
  return `# Note-Card

## Identity

- Platform: xiaohongshu
- Blogger: ${record.account_name}
- Account id: ${record.account_id || "unknown"}
- Account red id: ${record.account_red_id || "unknown"}
- Post title: ${safeTitle}
- Post URL: ${record.post_url}
- Publish time: ${record.publish_time || "unknown"}
- Collected at: ${record.collected_at}
- Source raw snapshot: ${record.raw_source}
- Collection status: ${record.collection_status}

## Surface

- Surface topic: ${topicTags}
- Reader scene: infer from title and tags; verify before using in writing
- Reader emotion: infer from title and tags; verify before using in writing
- Visible format: ${record.format || "unknown"}
- Media count: ${record.media_count ?? "unknown"}
- Public comment snapshot: ${commentSummary}

## Underlying Logic

- Emotional job: identify from title, tags, and card structure during manual/LLM review
- Core thesis: pending distillation
- Hook mechanism: title-led promise or scene cue
- Opening move: pending distillation
- Turn / reframe: pending distillation
- Ending move: pending distillation
- Comment trigger: pending distillation
- Actual audience reaction: pending distillation from comment snapshot if available
- High-engagement comment samples:
${commentExamples}

## Structure

1. Title and topic lane captured automatically.
2. Detail JSON is available in the raw source for deeper review.
3. Replace this section with a human/LLM paraphrase before using it as a benchmark.
4. Do not copy the original wording.

## Visual / Page Logic

- Cover hierarchy: pending visual review
- Page rhythm: pending visual review
- Text density: pending visual review
- Visual motifs: pending visual review
- Body vs card relationship: pending visual review

## Borrow / Avoid

- What 澄Cc can borrow: topic lane, hook type, and page rhythm after review
- What 澄Cc can learn from comments: audience language, objections, and resonance only
- What 澄Cc should not copy: exact wording, creator-specific story, visual IP
- Comment wording not to copy: all public comment excerpts are evidence, not final copy
- Risk: automatic note-card is a scaffold, not final distillation
- Fit score for 澄Cc /100: pending

## Tags

- Topic lane: ${topicTags}
- Emotion lane: pending
- Method lane: pending
- Visual lane: pending
`;
}

function collectionRunMarkdown({ args, account, searchResult, filtered, reads, outputPaths }) {
  const commentRows = args.comments
    ? reads
      .filter((read) => read.comment_summary)
      .map((read) => {
        const commentSummary = read.comment_summary || { count: 0 };
        return `| ${read.source.id || read.source.url} | ${commentSummary.count} | ${commentSummary.snapshots.length} |`;
      })
    : [];

  const rows = reads.map((read) => {
    const status = read.status === 0 ? "pass" : "fail";
    return `| ${account.display_name} | \`redbook read ${read.source.id || read.source.url}\` | ${status} | ${read.status === 0 ? 1 : 0} | search-read | ${read.error || read.stderr.split("\n").find(Boolean) || ""} |`;
  }).join("\n");
  const commentFailures = args.comments
    ? reads
      .filter((read) => read.comment_error)
      .map((read) => `- ${read.source.id || read.source.url}: ${read.comment_error}`)
      .join("\n")
    : "";
  return `# Collection Run

## Run Metadata

- Run id: \`${slug(account.display_name)}-${new Date().toISOString()}\`
- Started at: ${outputPaths.startedAt}
- Finished at: ${new Date().toISOString()}
- Operator: collect-search-read.mjs
- Watchlist source: \`${args.watchlist}\`
- Adapter: \`${args.redbook}\`
- Mode: search_read
- Target accounts: ${account.display_name}

## Environment

- Adapter installed: ${searchResult.error ? "no" : "yes"}
- Auth mode: browser_cookie / unknown
- Raw output folder: \`${outputPaths.rawDir}\`
- Normalized output: \`${outputPaths.normalizedFile}\`
- Error log: \`${outputPaths.errorLog}\`

## Account Results

| Account | Status | New Items | Detail Reads | Fallback | Notes |
|---|---|---:|---:|---|---|
| ${account.display_name} | search ${searchResult.status === 0 ? "pass" : "fail"} | ${filtered.length} | ${reads.filter((r) => r.status === 0).length} | search-read | user/user-posts not required |
${rows}

## Errors

${reads.filter((read) => read.status !== 0).map((read) => `- ${read.source.url}: ${read.stderr || read.error}`).join("\n") || "- none"}

## Distillation Outputs

- Note-cards created: ${reads.filter((r) => r.status === 0).length}
- Blogger-profiles updated: 0
- RAG briefs created: 0
${args.comments ? `\n## Comment Snapshots\n\n- Notes with comments captured: ${commentRows.length}\n- Notes with no retrievable comments (after successful read): ${reads.filter((r) => r.status === 0 && !r.comment_summary).length}\n\n| Note / URL | Comments (raw total) | Samples saved |\n|---|---:|---:|\n${commentRows.join("\n")}` : ""}
${args.comments && commentFailures ? `\n### Comment Capture Failures\n\n${commentFailures}` : ""}

## Next Action

- Ready for RAG brief: ${reads.some((r) => r.status === 0) ? "yes" : "no"}
- Needs retry: ${reads.some((r) => r.status !== 0) ? "yes" : "no"}
- Needs account confirmation: ${account.status === "pending_internal_id_lookup" ? "yes" : "no"}
- Needs adapter update: no
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage);
    return;
  }
  for (const required of ["watchlist", "account", "out-dir"]) {
    if (!args[required]) {
      throw new Error(`Missing --${required}\n\n${usage}`);
    }
  }
  args.redbook = args.redbook || "redbook";
  args.limit = Math.max(1, Math.min(Number(args.limit || 3), 10));
  args.comments = String(args.comments || "false").toLowerCase() === "true";
  args.commentsLimit = toSafeInt(args["comments-limit"] || args.commentsLimit || 8, 8, 1, 50);
  args.commentsSort = args["comments-sort"] || args.commentsSort || "engagement";
  args.commentsSort = ["source", "engagement"].includes(args.commentsSort) ? args.commentsSort : "engagement";
  args.query = args.query || args.account;

  const watchlist = readWatchlist(args.watchlist);
  const account = findAccount(watchlist, args.account);
  const outDir = args["out-dir"];
  const rawDir = join(outDir, "raw-adapter-output");
  const normalizedDir = join(outDir, "normalized");
  const distilledDir = join(outDir, "distilled");
  const startedAt = new Date().toISOString();
  ensureDir(rawDir);
  ensureDir(normalizedDir);
  ensureDir(distilledDir);

  const searchBase = join(rawDir, `search-${slug(args.query)}`);
  const searchResult = runCommand(args.redbook, ["search", args.query, "--json"], searchBase);
  if (searchResult.status !== 0) {
    throw new Error(`redbook search failed. See ${searchBase}.stderr`);
  }
  const searchJson = parseJson(searchResult.stdout, "redbook search stdout");
  writeText(`${searchBase}.json`, JSON.stringify(searchJson, null, 2));
  const filtered = filterSearchItems(normalizeSearchItems(searchJson), account).slice(0, args.limit);
  writeText(join(normalizedDir, "filtered-search-results.json"), JSON.stringify(filtered, null, 2));

  const normalizedFile = join(normalizedDir, "normalized-posts.jsonl");
  const errorLog = join(outDir, "errors.jsonl");
  const reads = [];
  const normalizedRecords = [];

  for (const source of filtered) {
    const idSlug = slug(source.id || source.title || source.url);
    const readBase = join(rawDir, `read-${idSlug}`);
    const readResult = runCommand(args.redbook, ["read", source.url, "--json"], readBase);
    const read = { ...readResult, source, comment_summary: null, comment_error: "" };
    if (readResult.status === 0 && args.comments) {
      const commentsBase = join(rawDir, `comments-${idSlug}`);
      const commentsResult = runCommand(args.redbook, ["comments", source.url, "--all", "--json"], commentsBase);
      if (commentsResult.status === 0) {
        const commentsPath = `${commentsBase}.json`;
        const comments = parseJson(commentsResult.stdout, `redbook comments ${source.url}`);
        writeText(commentsPath, JSON.stringify(comments, null, 2));
        const commentSummary = summarizeComments(comments, args.commentsLimit, {
          authorUserId: account.xhs_user_id,
          sortMode: args.commentsSort
        });
        read.comment_summary = { ...commentSummary, raw_comment_path: commentsPath };
      } else {
        read.comment_error = commentsResult.stderr.split("\n").find((line) => line.includes("Error:")) || commentsResult.stderr.split("\n").find(Boolean) || commentsResult.error || "comments command failed";
        appendFileSync(
          errorLog,
          `${JSON.stringify({ source, status: commentsResult.status, command: commentsResult.command, stderr: commentsResult.stderr, error: commentsResult.error })}\n`
        );
      }
    }
    reads.push(read);
    if (readResult.status !== 0) {
      appendFileSync(errorLog, `${JSON.stringify({ source, status: readResult.status, stderr: readResult.stderr, error: readResult.error })}\n`);
      continue;
    }
    const detail = parseJson(readResult.stdout, `redbook read ${source.url}`);
    const rawJsonPath = `${readBase}.json`;
    writeText(rawJsonPath, JSON.stringify(detail, null, 2));
    const record = normalizeDetail(detail, account, source, rawJsonPath);
    if (read.comment_summary) {
      record.comment_snapshot = read.comment_summary;
    }
    normalizedRecords.push(record);
    writeText(join(distilledDir, `note-card-${slug(record.post_id || source.id)}.md`), noteCardMarkdown(record));
  }

  writeText(normalizedFile, normalizedRecords.map((record) => JSON.stringify(record)).join("\n") + (normalizedRecords.length ? "\n" : ""));
  writeText(join(outDir, "collection-run.md"), collectionRunMarkdown({
    args,
    account,
    searchResult,
    filtered,
    reads,
    outputPaths: {
      startedAt,
      rawDir,
      normalizedFile,
      errorLog
    }
  }));

  console.log(JSON.stringify({
    account: account.display_name,
    query: args.query,
    filtered_count: filtered.length,
    detail_reads_ok: reads.filter((read) => read.status === 0).length,
    comments_requested: args.comments,
    comment_snapshots_ok: reads.filter((read) => read.comment_summary).length,
    comment_snapshots_failed: reads.filter((read) => read.comment_error).length,
    out_dir: outDir,
    normalized: normalizedFile
  }, null, 2));
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
