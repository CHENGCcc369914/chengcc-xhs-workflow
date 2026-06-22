# Data Flow

This skill is the intelligence layer before writing.

## Route

```text
watchlist
-> public collection adapter
-> raw collection snapshot
-> normalized post records
-> optional public comment snapshots
-> note-cards
-> blogger-profiles
-> RAG brief
-> writer skill
```

## Shareable Vs Private

The Skill repo should contain:

- schemas
- templates
- examples with replaceable public identifiers
- adapter contracts
- workflow rules

The Skill repo should not contain:

- login cookies or tokens
- private creator analytics
- large copied post text
- private comments, DMs, or non-public materials
- raw collection dumps from a creator's daily monitoring

## Recommended Local Storage

For 澄Cc, keep long-term/private data outside the shareable repo.

Suggested local layout:

```text
Raw/Agent/xhs-blogger-intelligence/YYYY-MM-DD/
  collection-run.json
  raw-adapter-output/
  normalized-posts.jsonl
  comment-snapshots.jsonl
  errors.jsonl

WiKi/来源/小红书博主/
  blogger-profile-*.md

Output/80-通用资产/小红书个人运营/blogger-intelligence/
  rag-brief-YYYY-MM-DD-*.md
  note-cards-YYYY-MM-DD.jsonl
```

For template/runtime users, the active manual corpus path for low-follower/high-performing Xiaohongshu case materials is configured in:

```text
profile.paths.ragCaseLibrary
```

For Cc's private local install, this may point to her Obsidian case-library folder, for example:

```text
WiKi/来源/小红书案例库/小红书搜集文章/
```

Use the profile corpus folder as the first lookup source when the task is writing-prep RAG, benchmark expression analysis, low-follower/high-performing case comparison, or "how similar posts are written". Store new manually collected case files there unless the creator specifies another location.

For friends, replace these folders with their own local storage. Do not hard-code Cc's paths into a public handoff.

## Collection Cadence

Default cadence:

- daily snapshot for active watchlist accounts
- manual refresh before a writing session if the topic is time-sensitive
- no aggressive repeated requests

Recommended windows:

- latest 3-10 posts per account for daily monitoring
- last 30 days for profile update
- last 7 days for recent signal

## Current Adapter Script

Use `scripts/collect-search-read.mjs` for the current verified fallback route:

```text
redbook search display name
-> filter by author nickname/internal user id
-> redbook read note URL
-> optional redbook comments note URL
-> raw-adapter-output
-> normalized-posts.jsonl
-> scaffold note-card files
```

The script requires an explicit `--out-dir`. Keep that output directory in local/private Raw storage, not in this shareable repo.

Use `scripts/collect-watchlist.mjs` when the search/read route should run across eligible watchlist accounts:

```text
watchlist
-> select statuses such as search_only,active
-> run collect-search-read.mjs per account
-> write one batch directory with per-account outputs
-> write batch-summary.json and collection-run.md
```

Use `scripts/build-rag-brief.mjs` after collection:

```text
batch directory
-> find normalized-posts.jsonl
-> find scaffold note-card files
-> rank records by topic match
-> write concise RAG brief for the writer skill
```

The RAG builder creates a retrieval scaffold. It does not replace human/LLM distillation of note-cards.

## Data Objects

### Raw Snapshot

Raw snapshots are append-only evidence. They can include adapter output, collection timestamps, visible metadata, and errors.

Do not rewrite old raw snapshots. If parsing improves, write a new normalized output that cites the raw source.

### Normalized Post

Normalized post records are stable machine-readable records. They should not contain long copied text by default.

Minimum fields:

- `platform`
- `account_id`
- `account_red_id`
- `account_name`
- `post_id`
- `post_url`
- `title`
- `publish_time`
- `collected_at`
- `engagement_snapshot`
- `source_adapter`
- `collection_status`
- optional `comment_snapshot`

### Comment Snapshot

Comment snapshots are optional audience-language evidence from public comments.

Minimum fields:

- `count`
- `selection`
- `snapshots`
- `raw_comment_path`

Each snapshot should keep only short excerpts plus metadata:

- `comment_id`
- `text_excerpt`
- `like_count`
- `sub_comment_count`
- `engagement_score`
- `author_reply_excerpt`
- `ip_location`
- `posted_at`

Use comment snapshots to infer reader language, objections, save/share reasons, and comment-trigger mechanics. Do not copy comment wording into final writing outputs.

### Note-Card

A note-card is a compact distillation of one public note's reusable logic.

It should explain how the content works without copying the content.

### Blogger-Profile

A blogger-profile is a rolling summary of repeated patterns from one creator.

It should distinguish:

- stable 30-day patterns
- latest 7-day signals
- one-off experiments

### RAG Brief

A RAG brief is the only object that should be passed into the writing workflow by default.

It should be concise, topic-specific, and explicit about what can be learned vs what must not be copied.

For Cc, the RAG brief should include a `Local Corpus Signals` section when using the manual case corpus:

- source files checked
- best 3-8 cases
- title/hook lessons
- opening/story lessons
- AI-turning-question lessons
- method-list lessons
- CTA/collection lessons
- public comment/audience-language lessons when available
- what Cc can directly adapt
- what Cc must not copy
