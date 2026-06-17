---
name: chengcc-content-loop-runtime
description: "L4.5 / supervised L5 Xiaohongshu Content Loop Runtime for ChengCc. Use when Cc asks for Content Loop OS, L4.5, supervised L5, 全链路小红书循环, 从选题方向自动到 RAG/选题/图文/图片/检测/发布包/真实数据复盘/经验吸收/下一篇准备, or wants the Xiaohongshu workflow to run with memory across posts. This skill creates run records, bootstraps from recent runs, orchestrates xhs-blogger-intelligence and chengcc-xhs-workflow, enforces human Gate 1 before publish and Gate 2 before long-term rule updates, and keeps xiaohongshu-ops limited to explicitly authorized platform actions."
---

# ChengCc Content Loop Runtime

This skill is the runtime layer above the existing Xiaohongshu skills. It does not replace them.

Runtime job:

```text
intent -> next-run bootstrap -> RAG -> topic hypothesis -> single-post workflow -> Gate 1 publish approval -> real metrics -> retro -> Gate 2 memory update -> next-run context
```

## Boundary

Use this skill when the user wants a loop across posts, not just one finished post.

Do not use this skill for a single writing-only task. Route writing-only tasks to `cc-xhs-personal-growth-writer`.
Do not use this skill for standalone platform operation. Route explicit browse/upload/comment/read actions to `xiaohongshu-ops`.
Do not merge the sibling skills into this skill. This runtime coordinates them and stores state.

## Default Runtime Root

```text
/Users/ccc/Library/Mobile Documents/iCloud~md~obsidian/Documents/CC-Obsidian/Obsidian Vault/Wiki/Output/80-通用资产/小红书个人运营/content-loop-runtime
```

This Output location is the durable runtime state. The Skill folder stores rules, scripts, and templates only.

## Required Reads

Read these files before executing a real loop:

1. `references/runtime-contract.md`
2. `references/gates-and-failure-modes.md`
3. `scripts/content-loop-runtime.mjs` usage in this file
4. The selected run's `01-bootstrap-context.md` after creating a run

Then route to sibling skills as needed:

| Job | Skill |
| --- | --- |
| Local case RAG / benchmark brief | `xhs-blogger-intelligence` |
| Complete single-post package | `chengcc-xhs-workflow` |
| Voice/copy details when needed | `cc-xhs-personal-growth-writer` |
| Real platform UI/read/upload/comment, only with explicit authorization | `xiaohongshu-ops` |

## First Move

For a new L4.5 loop request:

1. Initialize the runtime if needed.
2. Create a new run with the user's intent.
3. Read the generated `01-bootstrap-context.md`.
4. Use the bootstrap context to guide RAG, topic options, production, review, and retro.

Commands:

```bash
node scripts/content-loop-runtime.mjs init
node scripts/content-loop-runtime.mjs new-run --intent "<user intent>" --creator chengcc
node scripts/content-loop-runtime.mjs status
```

If the user provides a custom runtime root, pass `--runtime-root <path>`.

## Loop Phases

### Phase 1: Runtime Bootstrap

Run:

```bash
node scripts/content-loop-runtime.mjs new-run --intent "<user intent>" --creator chengcc
```

This creates:

- `00-intent.md`
- `01-bootstrap-context.md`
- `02-rag-brief.md`
- `03-topic-options.md`
- `04-selected-hypothesis.md`
- `05-carousel-draft.md`
- `06-image-manifest.json`
- `07-publish-checklist.md`
- `08-prediction.md`
- `09-metrics-24h.md`
- `10-metrics-72h.md`
- `11-retro.md`
- `12-memory-update-proposal.md`
- `run-status.json`

Read `01-bootstrap-context.md` before generating anything. It contains recent runs, next-run context, and durable rules.

### Phase 2: RAG And Topic Hypothesis

Use `xhs-blogger-intelligence` with the current run intent and bootstrap context.

Write the compact RAG output into:

```text
02-rag-brief.md
```

Then use `chengcc-xhs-workflow` Phase B to create topic options. Write them into:

```text
03-topic-options.md
```

Select or recommend a topic only after checking:

- repeated topic risk from recent runs
- title similarity risk
- whether the topic has a real scene
- whether it can produce P3 structure judgment and P4 action/method output

Write the chosen hypothesis into:

```text
04-selected-hypothesis.md
```

### Phase 3: Single-Post Production

Use `chengcc-xhs-workflow` for the post package:

- carousel draft
- body
- tags
- Image 2 prompts or generated cards
- image manifest
- publish review
- manual publish checklist
- pre-publish prediction

Write the outputs into the current run:

```text
05-carousel-draft.md
06-image-manifest.json
07-publish-checklist.md
08-prediction.md
```

The existing `chengcc-xhs-workflow` remains the truth source for card copy, Image 2, publish safety, and manual checklist rules.

### Phase 4: Gate 1 Publish Approval

Gate 1 is mandatory.

Do not publish, upload, or ask `xiaohongshu-ops` to operate the platform until Gate 1 is approved.

Approve only when:

- final image order is correct
- `06-image-manifest.json` is `publishReady: true`
- no final image comes from a previous run folder
- AI disclosure is handled
- privacy and platform checks pass
- Cc has confirmed final publish/upload action

Record approval:

```bash
node scripts/content-loop-runtime.mjs approve-gate --run-dir "<run dir>" --gate publish
```

### Phase 5: Metrics Capture

After publishing, fill metrics manually or use `xiaohongshu-ops` only when explicitly authorized to read platform data.

Write metrics into:

```text
09-metrics-24h.md
10-metrics-72h.md
```

Never invent platform metrics. If data is missing, keep the file as `waiting-for-data`.

### Phase 6: Retro

Write `11-retro.md` with:

- prediction vs actual
- title analysis
- cover/image analysis
- content structure analysis
- timing/sample-size caveat
- what should repeat
- what should be avoided
- whether evidence is strong enough for a rule update

Treat one post as a hypothesis unless the signal is strong.

### Phase 7: Gate 2 Memory Update

Write proposed durable lessons into:

```text
12-memory-update-proposal.md
```

Gate 2 is mandatory. Do not update `state/next-run-context.md` or durable `rules/` until Cc approves.

After approval:

```bash
node scripts/content-loop-runtime.mjs promote-memory --run-dir "<run dir>" --approve
```

This appends the approved proposal to `state/next-run-context.md`.

## Validation

Run:

```bash
node scripts/content-loop-runtime.mjs validate-run --run-dir "<run dir>"
```

Expected behavior:

- It reports missing required files as errors.
- It warns when Gate 1 or Gate 2 is not approved.
- It warns when `06-image-manifest.json` is not `publishReady`.

Warnings are allowed while a run is in progress. A run is publish-ready only after Gate 1 is approved and image manifest is ready.

## Output Contract

When starting a loop, return:

```text
Runtime root:
Run ID:
Run folder:
Bootstrap read:
Next action:
Human gates:
```

When producing a post package inside a run, return:

```text
Run ID:
Files updated:
Publish readiness:
Gate 1 status:
Next manual action:
```

When closing a loop, return:

```text
Run ID:
Metrics source:
Retro summary:
Memory update proposal:
Gate 2 status:
Next-run context updated: yes/no
```

## Anti-Patterns

- Do not call a generated post a loop if it has no run folder.
- Do not update long-term rules from one weak signal.
- Do not skip `01-bootstrap-context.md`.
- Do not let `xiaohongshu-ops` publish without explicit human approval.
- Do not copy full RAG source paragraphs into final content.
- Do not use a previous run's image folder as the current run's final output.
- Do not treat missing metrics as proof of failure.
