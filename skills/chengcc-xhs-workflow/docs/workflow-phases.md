# Complete Workflow Phases

## 1. Creator Defaults

Read creator-specific materials first:

- default profile
- confirmed media console
- visual system
- Visual System V2 engine
- creator IP visual spec
- content pillars
- target readers
- examples of approved style
- local benchmark / RAG corpus
- hard avoids

For 澄Cc, the current confirmed route is:

- 00后应届生 / 初入职场新手
- peers who are in school, close to graduation, or just started working
- Style B default, Style A backup
- Visual System V2: content input -> meaning -> emotion -> layout -> editorial visual -> feedback
- ChengCc IP Visual System V2.0 is automatically applied by default:
  `/Users/ccc/Library/Mobile Documents/iCloud~md~obsidian/Documents/CC-Obsidian/橙Cc 个人IP视觉体系规范2.0.md`
- AI as a method share
- local low-follower/high-performing case corpus:
  `/Users/ccc/Library/Mobile Documents/iCloud~md~obsidian/Documents/CC-Obsidian/Obsidian Vault/Wiki/WiKi/来源/小红书案例库/小红书搜集文章`

## 2. Topic Selection

Output 10 candidate topics before drafting.

Each topic must be usable, specific, and tied to the creator's position.

For 澄Cc, when the request mentions "爆款", "低粉高爆", "类似案例", "RAG", "正文怎么写", "标题怎么取", "流量不好", or "参考别人怎么写", run a bounded local case-library lookup first:

- retrieve 3-8 relevant notes from the local corpus folder
- identify shared structure: title hook, true opening setup, inner monologue, AI turning question, method list, CTA
- state the usable lessons before generating topics or rewriting
- do not bulk-read the whole folder unless the user asks for a full corpus audit

Do not write a finished carousel until the creator picks one.

## 3. Draft And Confirm

For the selected topic:

- include the local RAG brief used, when relevant
- include ChengCc IP V2.0 action/scene direction when a character, sticker, or small illustration appears
- capture the input as content input: raw content, source type, context, time, related people, sensitivity
- extract meaning layer: core event, user problem, hidden emotion, key conflict, insight
- select emotion type: clarity, confusion, anxiety, reflection, calm, or tension
- assign layout type per page: HERO, GRID, SPLIT, or EDITORIAL
- create 4-page carousel copy
- body copy
- tags
- comment CTA
- Image 2 prompts

For 澄Cc drafts influenced by local cases:

- body copy should carry the real story, not repeat the card text
- AI must be a real analysis module: fact split, prediction split, topic ownership, or next-action decision
- methods should be named and usable, usually 2-3 steps
- closing should make readers want to save or try one action tonight/today

Then ask for approval before generation.

## 4. Image Generation

Use Image 2 full-card prompts after card text is locked.

After content approval, the agent should actually call the image generation / Image 2 tool when it is available.

For 澄Cc, Image 2 prompt writing automatically inherits the ChengCc IP Visual System V2.0. Do not wait for the user to request it explicitly. If the card includes the avatar, outfit, sticker, or small illustration, preserve the V2.0 locks and visual language by default.

Do not treat prompt output as completed image generation.

Before accepting a generated card, run the Visual System V2 validation gate:

- Structure: HEADER / MAIN / SIDE / FOOTER zones exist.
- Emotion: visual rhythm matches the selected emotion type and intensity.
- Editorial: it looks like a designed magazine page, not a generic social template.
- Density: hierarchy is clear, Chinese core text is readable, and card/body copy are not duplicates.

If Image 2 fails, retry once with a shorter prompt. If it still fails, output the prompt pack and mark the image step as blocked by tool failure.

Do not default to post-added text.

If text changes, regenerate.

Before copying final images into the creator's export folder, create a fresh
per-topic export folder and `run-manifest.json`. The manifest must include the
run ID, creator, topic, page count, card copy hash, visual route, required IP
sources, generated source paths, copied export paths, rejected attempts, and
per-page validation status.
Use a real `sha256:` card copy hash, keep copied `export_path` values inside
the current run export folder, and keep each `source_generated_path` different
from its copied `export_path`.

Only pages with manifest status `pass` may enter the final upload order. If a
card has the current text but stale visuals, wrong visual route, semi-realistic
collage, old mascot direction, missing ChengCc IP locks, unreadable Chinese, or
copy mismatch, mark it `fail`, exclude it from the publish checklist, and
regenerate or stop the image step.

## 5. Review

Run 2026 publish review after selecting the target platform:

- `xiaohongshu`
- `douyin`
- `wechat_channels`
- `wechat_official_account`

Check:

- AI labeling
- authenticity
- originality
- privacy
- claims
- commercial/diversion/activity risks
- platform-specific rules
- platform hygiene

If cross-posting, run one review per platform. If blocked, revise before publishing.

## 6. Manual Publish Checklist

Output one precise checklist for the creator's manual publishing flow:

- target platform and draft surface
- where to publish
- image order, using only export-folder paths whose `run-manifest.json` entries
  are `pass`
- run ID, manifest path, card copy hash, publish-ready status, and rejected
  attempts excluded from upload
- title
- body
- tags
- AI label
- platform review result
- final human checks: image order, typo, tags, privacy masking, AI disclosure

The creator manually uploads images, pastes title/body/tags, and decides whether to click publish.

## 7. Performance Loop

After the final package is ready, run the performance loop from `docs/performance-loop.md` and `templates/performance-loop.md`.

This phase exists to make the workflow improve over time:

- score the final content package before publishing
- predict likely performance before looking at data
- record actual platform data after publishing
- compare prediction and reality
- record visual feedback: views, saves, comments, engagement rate, what worked, what failed, and proposed visual rule update
- update the creator rubric carefully

Do not fabricate platform metrics. If the post has not been published or no data is available, output only the pre-publish score, prediction, and an empty retro shell.

Do not overfit one post. One post can suggest a hypothesis; repeated signals across posts can update the rubric.
