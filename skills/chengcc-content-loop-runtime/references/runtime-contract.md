# Runtime Contract

## Purpose

`chengcc-content-loop-runtime` turns the Xiaohongshu workflow into a supervised loop across posts.

The runtime stores state. Sibling skills perform bounded work.

## Runtime State

Default runtime root:

```text
./runtime
```

The default root is only ChengCc's local state. For another creator, use a profile file instead of editing the Skill:

```bash
node scripts/content-loop-runtime.mjs init --profile /ABSOLUTE/PATH/TO/creator-profile.json
node scripts/content-loop-runtime.mjs new-run --profile /ABSOLUTE/PATH/TO/creator-profile.json --intent "..."
```

See `profiles/creator-profile.example.json` and `references/shareable-profile-and-paths.md`.

Required structure:

```text
content-loop-runtime/
  README.md
  state/
    loop-config.json
    creator-profile.json
    next-run-context.md
  rules/
    topic-rubric.md
    title-lessons.md
    friend-gossip-diagnosis-view.md
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
      evidence/post-publish-metrics/
```

## Phase Ownership

| Phase | Owner |
| --- | --- |
| Runtime init, run creation, bootstrap, validation, memory promotion | `chengcc-content-loop-runtime` |
| RAG / case retrieval / benchmark brief | `xhs-blogger-intelligence` |
| Single-post package from topic to publish checklist | `chengcc-xhs-workflow` |
| Voice/copy refinement | `cc-xhs-personal-growth-writer` |
| Platform browsing/upload/data read/comment | `xiaohongshu-ops`, only with explicit user authorization |

## Post-Publish Metrics Bridge

Published runs can be bound to the real creator backend through:

```bash
node scripts/post-publish-metrics-bridge.mjs scan --always-update-workbench
```

The bridge scans published runs, calls the `xiaohongshu-ops` read-only backend reader, writes per-run evidence, updates the local Growth Control workbench, and fills due metric files.

`run-status.json` may contain:

```json
{
  "publishedAt": "2026-06-21 18:03:15 CST",
  "publishMode": "manual-by-Cc",
  "postPublishMetrics": {
    "version": 1,
    "source": "xiaohongshu-creator-dashboard",
    "readerScript": "",
    "noteDetailUrl": "https://creator.xiaohongshu.com/statistics/note-detail?noteId=...",
    "stages": {
      "24h": {
        "status": "captured",
        "capturedAtLocal": "2026-06-22 19:30:00 CST",
        "evidenceDir": "evidence/post-publish-metrics/24h-..."
      },
      "72h": {
        "status": "captured",
        "capturedAtLocal": "2026-06-24 19:30:00 CST",
        "evidenceDir": "evidence/post-publish-metrics/72h-..."
      }
    }
  }
}
```

Early snapshots are allowed for smoke tests, but they are evidence only and must not be used as 24h/72h conclusions.

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

## Default Creator Content View

Every new run should use the creator profile plus the friend-gossip diagnosis view unless the user explicitly asks for tutorial-style content.

The topic should be transformed into:

```text
gossipable scene -> wrong first explanation -> reversal / real problem -> AI as sidekick -> tiny reusable action -> comment opening
```

Gate topic/title selection on these checks:

- The first card or title contains a small scene, embarrassment, contradiction, or "I thought A but B" reversal.
- The reader can recognize themselves before receiving a method.
- The AI appears as a sidekick for sorting, not as the public identity or teacher.
- The ending gives a concrete comment opening: choice, story, or "which one are you", not a generic "did this help".
