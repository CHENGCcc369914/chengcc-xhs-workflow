# Runtime Contract

## Purpose

`chengcc-content-loop-runtime` turns the Xiaohongshu workflow into a supervised loop across posts.

The runtime stores state. Sibling skills perform bounded work.

## Runtime State

Default runtime root:

```text
/Users/ccc/Library/Mobile Documents/iCloud~md~obsidian/Documents/CC-Obsidian/Obsidian Vault/Wiki/Output/80-通用资产/小红书个人运营/content-loop-runtime
```

Required structure:

```text
content-loop-runtime/
  README.md
  state/
    loop-config.json
    next-run-context.md
  rules/
    topic-rubric.md
    title-lessons.md
    visual-failure-rules.md
    publish-risk-rules.md
  indexes/
    run-index.json
  runs/
    YYYY-MM-DD-topic-slug/
      run-status.json
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

## Phase Ownership

| Phase | Owner |
| --- | --- |
| Runtime init, run creation, bootstrap, validation, memory promotion | `chengcc-content-loop-runtime` |
| RAG / case retrieval / benchmark brief | `xhs-blogger-intelligence` |
| Single-post package from topic to publish checklist | `chengcc-xhs-workflow` |
| Voice/copy refinement | `cc-xhs-personal-growth-writer` |
| Platform browsing/upload/data read/comment | `xiaohongshu-ops`, only with explicit user authorization |

## L4.5 Definition

L4.5 means the system can proceed through the full content loop by default, but pauses at irreversible or long-term-impact points.

Automatic by default:

- runtime init
- run record creation
- recent run bootstrap
- local RAG
- topic options
- single-post production
- image manifest validation
- publish package assembly
- prediction scaffold
- metrics scaffold
- retro draft
- memory update proposal

Human-gated:

- final publish/upload/click action
- long-term memory/rule updates

## Completion Criteria

A run is complete only when:

1. required files exist;
2. Gate 1 has either been approved or explicitly skipped by user;
3. actual metrics are captured or marked unavailable with source reason;
4. retro is written;
5. Gate 2 memory proposal is approved or rejected;
6. `run-index.json` references the run.

## Re-entry Rule

Every new run must read:

1. `state/next-run-context.md`
2. durable rules under `rules/`
3. recent 3-5 run retros and memory proposals
4. current user intent

If this does not happen, the system is a workflow, not a loop.
