# ChengCc XHS Workflow

A shareable Xiaohongshu-first content system.

If you are Peyson, start here:

- Read `QUICKSTART-FOR-PEYSON.md`.
- Install `skills/chengcc-xhs-workflow` and `skills/xhs-blogger-intelligence`.
- Start your robot with: `用 Peyson 默认资料，按 Peyson 中控台确认版，先给我 10 个适合我的小红书选题。`

It currently contains three skills:

- `chengcc-xhs-workflow`: turns creator positioning into publish-ready carousel packages, with Image 2, platform review, manual publish checklist, and performance loop.
- `xhs-blogger-intelligence`: maintains benchmark blogger watchlists, collects public post signals through an adapter such as redbook, distills note-cards and blogger-profiles, and provides RAG briefs for the writer workflow.
- `chengcc-content-loop-runtime`: runs the L4.5 / supervised L5 loop across posts: creates run records, reads recent lessons, orchestrates RAG and the single-post workflow, enforces publish and memory-update gates, and prepares the next run.

The main publishing workflow supports Xiaohongshu-first image-text drafts, with 2026 platform review support for Xiaohongshu, Douyin, WeChat Channels, and WeChat Official Account, plus a post-publish performance loop.

The repo ships with `澄Cc` and `Peyson` starter profiles, but the workflow is designed to be replaced by any creator's own console, visual system, topic map, and manual publishing flow.

## What This Workflow Does

The complete route is:

1. Read creator defaults and the confirmed creator console.
2. Generate 10 suitable topic options.
3. Wait for the creator to pick one topic.
4. Build the carousel plan, card copy, body copy, tags, and Image 2 full-card prompts.
5. Add the Visual System V2 design brief: content input -> meaning -> emotion -> layout -> editorial visual -> validation.
6. Wait for content approval before image generation.
7. Actually call Image 2 / image generation to create complete cards. Output prompts only if image generation is unavailable or repeatedly fails.
8. Select the target platform and run the 2026 platform publish safety review.
9. If clean, output a manual publish checklist for the creator to upload images, paste title/body/tags, check labels, and decide whether to publish.
10. After the package is ready or the post is published, run the performance loop: score, predict, retro, and update the rubric with real data.

For L4.5 / supervised L5, use `chengcc-content-loop-runtime` above this workflow. It creates a durable run folder, reads previous run lessons, calls the RAG and workflow skills, stops before final publish, and stops again before long-term memory updates.

## Default Trigger

```text
用澄Cc默认资料，按中控台确认版，做 4 页图文 + Image 2 完整卡片 prompt + 发布文案。
```

For friends, replace the first clause:

```text
用{账号名}默认资料，按{账号名}中控台确认版，先给我 10 个适合我的选题。
```

For Peyson:

```text
用 Peyson 默认资料，按 Peyson 中控台确认版，先给我 10 个适合我的小红书选题。
```

## Replaceable Slots

The workflow is reusable because these parts are replaceable:

| Slot | 澄Cc default | Friend replacement |
|---|---|---|
| Creator profile | `references/brand-profile-chengcc.md` | `references/brand-profile-peyson.md` or own creator profile |
| Confirmed console | creator's local/cloud media console | own media console / positioning doc |
| Visual system | `references/visual-adapter-rules.md` + `references/visual-system-v2.md` | own visual style, Image 2 rules, and validation gates |
| Topic sources | emotion / graduation / workplace newcomer | own content pillars |
| Image export folder | creator's local publishing-image folder | own local publishing-image folder |
| Publishing flow | manual Xiaohongshu upload/paste/publish checklist | own manual platform workflow |
| Target platform | `xiaohongshu` by default | `xiaohongshu` / `douyin` / `wechat_channels` / `wechat_official_account` |
| Safety rules | `references/publish-safety.md` + `docs/platform-publish-rules-2026.md` | keep platform rules, add niche-specific rules |
| Performance loop | score / predict / retro / rubric with Xiaohongshu metrics | own metrics, scoring weights, and rubric |

## Current 澄Cc Defaults

- Persona: `00后应届生 / 初入职场新手`.
- Audience: students close to graduation, fresh graduates, and early-career peers with similar confusion.
- Tone: friend-like, real, reflective, not teacher-like.
- AI role: share a method that worked in a real scene; no hard-selling prompts, no AI tool teaching posture.
- Visual default: Style B, young lifestyle-aesthetic magazine cover.
- Visual backup: Style A, Gen-Z emotional sticker poster for strong-emotion topics only.
- Visual engine: V2 editorial system, turning content input into meaning, emotion, layout, prompt, validation, and feedback.
- Image mode: `image_gen full-card`; final Chinese text is baked into the card after copy lock.

## Current Peyson Defaults

- Persona: reflective product-minded founder/operator.
- Audience: workplace newcomers, AI beginners, side-project builders, and people who want practical clarity.
- Tone: calm, direct, analytical, friend-like, not teacher-like.
- AI role: a helper for sorting facts, records, review, and next actions; not a hard-sold tool.
- Content pillars: work clarity, AI-assisted problem solving, personal operating system, product/founder thinking, emotion and relationship analysis.
- Visual default: clean, warm, structured, human; avoid cold tech and generic AI dashboards.
- Profile file: `skills/chengcc-xhs-workflow/references/brand-profile-peyson.md`.

## 2026 Platform Publish Review

The review gate is platform-aware. Supported target platform codes:

- `xiaohongshu`: 小红书图文 / 视频
- `douyin`: 抖音图文 / 视频
- `wechat_channels`: 微信视频号图文 / 视频
- `wechat_official_account`: 微信公众号文章 / 图文 / 短视频

The gate checks AI/synthetic content labeling, authenticity, originality, privacy, copyright, claims, commercial/activity disclosure, external diversion, and platform-specific requirements.

Before high-risk publishing, refresh platform rules because policies can change.

## Performance Loop

The final phase borrows the score / predict / retro / rubric mechanism and makes each post reusable as learning data.

Use it in two moments:

- Before final publish: score the final package and record a prediction.
- After publish: compare real platform metrics against the prediction and update the creator rubric.

The loop does not invent metrics and does not require a specific analytics tool. Use creator-provided screenshots, platform analytics, or another approved data source.

## L4.5 / Supervised L5 Runtime

Use this when you want the system to keep memory across posts instead of only producing one post.

Default runtime root:

```text
/Users/ccc/Library/Mobile Documents/iCloud~md~obsidian/Documents/CC-Obsidian/Obsidian Vault/Wiki/Output/80-通用资产/小红书个人运营/content-loop-runtime
```

Initialize and create a run:

```bash
node skills/chengcc-content-loop-runtime/scripts/content-loop-runtime.mjs init
node skills/chengcc-content-loop-runtime/scripts/content-loop-runtime.mjs new-run \
  --intent "我想做一篇刚上班精神内耗的小红书" \
  --creator chengcc
```

The runtime creates:

```text
runs/YYYY-MM-DD-topic/
  00-intent.md
  01-bootstrap-context.md
  02-rag-brief.md
  03-topic-options.md
  04-selected-hypothesis.md
  05-carousel-draft.md
  06-image-manifest.json
  07-publish-checklist.md
  08-prediction.md
  09-metrics-24h.md
  10-metrics-72h.md
  11-retro.md
  12-memory-update-proposal.md
```

Human gates:

- Gate 1: final publish/upload action requires explicit Cc approval.
- Gate 2: updating long-term memory/rules requires explicit Cc approval.

## Recommended Skill Stack

This repo is the orchestration and intelligence layer. It can work alone, but works best with:

- `xhs-blogger-intelligence` for benchmark monitoring and RAG briefs.
- A creator-specific writing skill, such as `cc-xhs-personal-growth-writer`.
- Image generation / Image 2.
- Optional Xiaohongshu browser/publishing skill only when the creator explicitly wants browser help.

The intended route is:

```text
chengcc-content-loop-runtime
-> next-run bootstrap
xhs-blogger-intelligence
-> RAG brief
-> cc-xhs-personal-growth-writer
-> chengcc-xhs-workflow
-> manual publish checklist
-> metrics / retro / memory proposal
-> next-run context
```

For the current Xiaohongshu collection adapter, use the search/read fallback script when `user-posts` is unstable:

```bash
node skills/xhs-blogger-intelligence/scripts/collect-search-read.mjs \
  --watchlist skills/xhs-blogger-intelligence/examples/watchlist-chengcc.example.json \
  --account "小柴人不纠结" \
  --out-dir "/path/to/private/raw/xhs-blogger-intelligence/YYYY-MM-DD/run-id" \
  --limit 3
```

Keep `--out-dir` outside this shareable repo.

For watchlist batches and writer-ready briefs:

```bash
node skills/xhs-blogger-intelligence/scripts/collect-watchlist.mjs \
  --watchlist skills/xhs-blogger-intelligence/examples/watchlist-chengcc.example.json \
  --out-root "/path/to/private/raw/xhs-blogger-intelligence/YYYY-MM-DD" \
  --statuses search_only,active \
  --limit 2

node skills/xhs-blogger-intelligence/scripts/build-rag-brief.mjs \
  --input-dir "/path/to/private/raw/xhs-blogger-intelligence/YYYY-MM-DD/watchlist-run" \
  --topic "情绪内耗" \
  --out-file "/path/to/private/output/rag-brief.md"
```

## Install

Manual install:

```bash
mkdir -p ~/.agents/skills
cp -R skills/chengcc-xhs-workflow ~/.agents/skills/
cp -R skills/xhs-blogger-intelligence ~/.agents/skills/
cp -R skills/chengcc-content-loop-runtime ~/.agents/skills/
```

Each folder under `skills/` is self-contained. Do not copy only `SKILL.md`;
each skill also needs its bundled `references/`, `docs/`, `templates/`, and
`examples/` folders when present.

Then invoke it with a creator profile and console:

```text
用澄Cc默认资料，按中控台确认版，先给我 10 个适合我的选题。
```

For Peyson:

```text
用 Peyson 默认资料，按 Peyson 中控台确认版，先给我 10 个适合我的小红书选题。
```

## Repo Structure

```text
skills/chengcc-xhs-workflow/SKILL.md
skills/chengcc-xhs-workflow/references/brand-profile-chengcc.md
skills/chengcc-xhs-workflow/references/brand-profile-peyson.md
skills/chengcc-xhs-workflow/references/workflow-pipeline.md
skills/chengcc-xhs-workflow/references/visual-adapter-rules.md
skills/chengcc-xhs-workflow/references/visual-system-v2.md
skills/chengcc-xhs-workflow/references/publish-safety.md
skills/chengcc-xhs-workflow/docs/customize-for-friends.md
skills/chengcc-xhs-workflow/docs/workflow-phases.md
skills/chengcc-xhs-workflow/docs/publish-review-2026.md
skills/chengcc-xhs-workflow/docs/platform-publish-rules-2026.md
skills/chengcc-xhs-workflow/docs/performance-loop.md
skills/chengcc-xhs-workflow/templates/topic-options.md
skills/chengcc-xhs-workflow/templates/post-brief.md
skills/chengcc-xhs-workflow/templates/carousel-plan.md
skills/chengcc-xhs-workflow/templates/platform-review.md
skills/chengcc-xhs-workflow/templates/manual-publish-checklist.md
skills/chengcc-xhs-workflow/templates/performance-loop.md
skills/chengcc-xhs-workflow/scripts/verify-visual-v2.mjs
skills/chengcc-xhs-workflow/examples/sample-input.md
skills/chengcc-xhs-workflow/examples/sample-output.md
skills/chengcc-content-loop-runtime/SKILL.md
skills/chengcc-content-loop-runtime/references/runtime-contract.md
skills/chengcc-content-loop-runtime/references/gates-and-failure-modes.md
skills/chengcc-content-loop-runtime/scripts/content-loop-runtime.mjs
skills/chengcc-content-loop-runtime/test-prompts.json
skills/chengcc-xhs-workflow/examples/peyson-start-prompts.md
skills/xhs-blogger-intelligence/SKILL.md
skills/xhs-blogger-intelligence/docs/data-flow.md
skills/xhs-blogger-intelligence/docs/redbook-adapter.md
skills/xhs-blogger-intelligence/scripts/collect-search-read.mjs
skills/xhs-blogger-intelligence/scripts/collect-watchlist.mjs
skills/xhs-blogger-intelligence/scripts/build-rag-brief.mjs
skills/xhs-blogger-intelligence/templates/watchlist.schema.json
skills/xhs-blogger-intelligence/templates/note-card.md
skills/xhs-blogger-intelligence/templates/blogger-profile.md
skills/xhs-blogger-intelligence/templates/rag-brief.md
skills/xhs-blogger-intelligence/templates/collection-run.md
skills/xhs-blogger-intelligence/examples/watchlist-chengcc.example.json
```

## Safety Boundary

The publishing workflow prepares a manual publish checklist. It should not silently publish or assume a platform operator. The creator uploads images, pastes copy, checks labels, and clicks publish manually.

The blogger intelligence workflow should only use public benchmark content, keep raw collection data local/private, avoid storing credentials in the repo, and pass paraphrased learning briefs downstream instead of copied original posts.
