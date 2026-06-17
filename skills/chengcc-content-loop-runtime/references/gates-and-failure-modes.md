# Gates And Failure Modes

## Gate 1: Publish Approval

Gate 1 protects irreversible or externally visible actions.

Do not publish, upload, comment, reply, schedule, or trigger a platform-side action before Gate 1 is approved.

Approval checklist:

- `06-image-manifest.json` has `publishReady: true`.
- every final image belongs to the current run folder or the current run export folder.
- failed/rejected image attempts are not listed in `07-publish-checklist.md`.
- AI-generated/AI-assisted disclosure is handled.
- privacy review is clean.
- title/body/tags match final approved card copy.
- Cc explicitly approves the final publish/upload action.

## Gate 2: Memory Update Approval

Gate 2 protects long-term strategy from noisy single-post data.

Do not update durable rules or `state/next-run-context.md` before Gate 2 is approved.

Approval checklist:

- actual metrics source is named, or data is explicitly unavailable.
- retro separates title, cover, topic, timing, and sample-size causes.
- proposal states confidence: `high`, `medium`, or `low`.
- proposal says whether it updates a rule, creates a watch item, or does nothing.
- Cc approves the memory update.

## Failure Modes

| Failure | Required response |
| --- | --- |
| RAG is weak or unrelated | Mark RAG weak, narrow query, or proceed with no-RAG hypothesis. Do not invent benchmark evidence. |
| Topic repeats a recent run | Regenerate topics or explicitly explain why repetition is intentional. |
| Card copy changes after image generation | Regenerate affected image or mark old image rejected. |
| Current text appears on old visual | Block publish, fail the image candidate, regenerate. |
| Image manifest points to previous run folder | Block publish and create a new current run export folder. |
| Platform metrics are missing | Keep metrics file as waiting-for-data. Do not run retro as if numbers exist. |
| Single post performs badly | Do not rewrite long-term rules until checking title, cover, topic, timing, and sample size. |
| User asks for full automation | Keep Gate 1 and Gate 2 unless the user explicitly accepts risk for a scoped test run. |

## Safe Stop Conditions

Stop and report instead of continuing when:

- platform action would occur without approval;
- image validation fails twice on the same page;
- private data appears in card/body/image;
- required sibling skill is missing and no safe fallback exists;
- user asks for fake engagement, fake comments, or deceptive growth behavior.
