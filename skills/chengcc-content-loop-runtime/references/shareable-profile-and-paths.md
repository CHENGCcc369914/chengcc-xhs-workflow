# Shareable Profile And Paths

Use this reference when turning the ChengCc content loop into a friend-usable workflow.

The loop is reusable, but the creator data is not. A friend should not reuse ChengCc local paths, identity files, visual IP assets, or metrics workbench data.

## Portable Mental Model

```text
skill code and rules -> creator profile -> runtime state -> platform/output evidence
```

Only the skill code and generic loop rules are shareable by default.

## What A Friend Must Replace

| Slot | ChengCc local example | Friend replacement |
| --- | --- | --- |
| Creator profile | 澄Cc identity, voice, visual IP | own identity, positioning, tone, visual system |
| Runtime root | `.../content-loop-runtime` | own durable run-record folder |
| RAG case library | ChengCc XHS case library | own collected cases and benchmark posts |
| Creator assets | ChengCc IP/visual files | own avatar/IP/fonts/visual standards |
| Output images | Cc publish image folder | own publish image folder |
| Workbench dir | `P-C-XHS-Growth-Control-V1` | own dashboard/workbench, or empty |
| Platform reader | Cc local xiaohongshu-ops reader | own installed reader script, or manual metrics |

## Recommended Folder Skeleton

```text
social-content-system/
  profiles/
    creator-profile.json
  knowledge/
    xhs-case-library/
    benchmark-watchlist/
  assets/
    visual-system/
    avatar-ip/
    fonts/
  runtime/
    state/
    rules/
    indexes/
    runs/
  outputs/
    images/
    publish-packages/
  workbench/
    data/
```

This skeleton can live anywhere. The only hard requirement is that `profiles/creator-profile.json` points to the actual absolute paths on that machine.

## Minimal Setup For Peyson

1. Copy `profiles/creator-profile.example.json` to Peyson's own folder.
2. Rename it to `creator-profile.json`.
3. Replace:
   - `creator.id`
   - `creator.displayName`
   - `writing.positioning`
   - `writing.voice`
   - `writing.visualSystem`
   - every `paths.*` value
4. Run:

```bash
node scripts/content-loop-runtime.mjs init --profile /ABSOLUTE/PATH/TO/creator-profile.json
node scripts/content-loop-runtime.mjs new-run --profile /ABSOLUTE/PATH/TO/creator-profile.json --intent "today's content intent"
```

## Environment Variable Shortcut

Instead of passing `--profile` every time:

```bash
export CONTENT_LOOP_PROFILE="/ABSOLUTE/PATH/TO/creator-profile.json"
node scripts/content-loop-runtime.mjs new-run --intent "today's content intent"
```

Optional overrides:

```bash
export CONTENT_LOOP_RUNTIME_ROOT="/ABSOLUTE/PATH/TO/runtime"
export CONTENT_LOOP_WORKBENCH_DIR="/ABSOLUTE/PATH/TO/workbench"
export XHS_CREATOR_READER_SCRIPT="/ABSOLUTE/PATH/TO/read-creator-dashboard.mjs"
```

## Shareability Checks

Before sending the loop to a friend, check:

- No private Cc home-directory path is required for their happy path.
- A fresh run can be created with only `--profile`.
- `01-bootstrap-context.md` shows their creator profile, not ChengCc's.
- RAG sources point to their case library or are explicitly marked as not configured.
- Publish metrics either point to their reader script or stay manual.
- The workflow stops at Gate 1 before platform action and Gate 2 before durable rule updates.

## Do Not Share By Default

- ChengCc private run folders.
- Live creator backend evidence.
- Screenshots, chat records, or private Obsidian evidence.
- ChengCc IP visual source files unless explicitly intended as public sample assets.
