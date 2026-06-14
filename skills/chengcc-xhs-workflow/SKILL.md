---
name: chengcc-xhs-workflow
description: "Use this as the primary router for a complete Xiaohongshu-first image-text workflow: creator defaults / media console -> topic options -> carousel copy -> Image 2 full-card prompts or generation -> platform publish-safety review -> manual publish checklist -> post-publish performance loop. Prefer this over cc-xhs-personal-growth-writer when the request includes 完整工作流, 中控台确认版, 10个选题, 4页图文, Image 2完整卡片, 2026发布审核, 手动发布清单, 发布后复盘, score/predict/retro/rubric, or shareable skill for friends. Coordinate with xhs-blogger-intelligence for RAG briefs, cc-xhs-personal-growth-writer for 澄Cc voice/copy, and xiaohongshu-ops only when the user explicitly asks for real platform browsing/upload/comment actions."
---

# ChengCc Xiaohongshu Workflow Skill

This is a shareable orchestration skill:

Creator defaults -> confirmed console -> 10 topics -> user picks one -> carousel plan -> content approval -> Image 2 full-card generation -> platform publish review -> manual publish checklist -> performance loop.

It ships with 澄Cc and Peyson starter defaults, but must remain customizable for other creators.
All referenced `docs/`, `references/`, `templates/`, and `examples/` paths are
relative to this skill folder.

## Suite Routing With XHS Skills

When several Xiaohongshu skills could apply, route by the user's job:

| User job | Primary skill | Handoff |
|---|---|---|
| Benchmark monitoring, watchlist refresh, blogger note-cards, RAG brief | `xhs-blogger-intelligence` | Pass only the compact RAG brief into this workflow or the writer. |
| Writing-only task: title, body, cover copy, one selected topic, rewrite, comments | `cc-xhs-personal-growth-writer` | Use this workflow only if the user later asks for cards, images, publish review, manual publish checklist, or performance loop. |
| Complete package: 10 topics, 4-page carousel, Image 2, publish review, manual publish checklist, performance loop | `chengcc-xhs-workflow` | Use `cc-xhs-personal-growth-writer` for 澄Cc voice and local console lookup. |
| Explicit platform automation: browse/search Xiaohongshu, upload images, fill creator page, comment/reply | `xiaohongshu-ops` | Use only when the user explicitly asks for platform automation. The default publish flow is manual upload/paste by the creator. |

Priority rules:

1. If the user explicitly asks for real browsing, searching, uploading, creator-center filling, commenting, or publishing automation, use `xiaohongshu-ops` for those platform actions. Otherwise, keep publishing manual.
2. If the request asks how benchmark bloggers recently posted, run `xhs-blogger-intelligence` first, then use its RAG brief as context.
3. If the request includes full carousel production, Image 2, publish review, manual publish checklist, or post-publish scoring, this skill is the main workflow even when the user also says "澄Cc默认资料".
4. If the request only asks for copy, title options, cover wording, or a single writing draft, `cc-xhs-personal-growth-writer` is the main skill.

## 0. Replaceable Creator Slots

Before creating content, identify these slots:

| Slot | 澄Cc default | Friend replacement |
|---|---|---|
| Creator profile | `references/brand-profile-chengcc.md` | own profile, or `references/brand-profile-peyson.md` for Peyson |
| Confirmed console | 澄Cc self-media console / default资料 | own creator console |
| Visual style | `references/visual-adapter-rules.md` | own visual rules |
| Topic map | graduation / relationships / early career / self-doubt / AI sharing | own content pillars |
| Image mode | Image 2 full-card | own image model/style |
| Image export folder | creator's local publishing-image folder | own local publishing-image folder |
| Publishing handoff | manual Xiaohongshu publish checklist by default | own target platform and manual flow |
| Performance loop | score / predict / retro / rubric with Xiaohongshu metrics | own metrics, scoring weights, and rubric |

If a friend has no console yet, ask for or infer a minimal profile:

- account name
- target reader
- persona
- 3-5 content pillars
- visual references
- AI/tool boundary
- hard avoids

Do not hard-code Cc's private local paths into shareable output.

## 1. Required Reads

For 澄Cc:

1. `references/brand-profile-chengcc.md`
2. `references/workflow-pipeline.md`
3. `references/visual-adapter-rules.md`
4. `references/publish-safety.md`
5. `docs/workflow-phases.md`
6. `docs/publish-review-2026.md`
7. `docs/platform-publish-rules-2026.md`
8. `docs/performance-loop.md`

If the active environment also has `cc-xhs-personal-growth-writer`, use it for 澄Cc content voice and local console lookup.

For Peyson:

1. `references/brand-profile-peyson.md`
2. `references/workflow-pipeline.md`
3. `references/publish-safety.md`
4. `docs/publish-review-2026.md`
5. `docs/platform-publish-rules-2026.md`
6. `docs/performance-loop.md`
7. `examples/peyson-start-prompts.md` when the user needs copyable launch prompts

For another creator:

1. `docs/customize-for-friends.md`
2. the creator's own profile / console / visual reference
3. `references/workflow-pipeline.md`
4. `references/publish-safety.md`
5. `docs/publish-review-2026.md`
6. `docs/platform-publish-rules-2026.md`
7. `docs/performance-loop.md`

## 2. Workflow Phases

### Phase A: Creator Defaults

Confirm the creator profile and replaceable slots before generating ideas.

For 澄Cc, use the bundled brand profile and confirmed console rules.
For Peyson, use the bundled Peyson starter profile unless the user provides a newer console.
For friends, use their own profile, positioning, visual system, topic map, image export folder, and publishing operator.

If the user has not selected a creator profile, infer a minimal profile only when the input is enough. Otherwise ask for the missing creator basics.

### Phase B: Topic Options

First output 10 topics suitable for the creator. Do not jump straight into a finished article unless the user has already picked a topic.

Each topic must include:

- title / hook
- scene
- target reader
- why it fits the creator
- suggested carousel angle
- visual route: Style B default or Style A strong-emotion backup

Use `templates/topic-options.md`.

Then wait for the user to pick one.

### Phase C: Carousel Draft

After topic selection, produce:

- final title
- 4-page carousel structure by default
- per-page card text
- body copy
- tags
- comment CTA
- Image 2 prompt for each complete card
- privacy and risk notes

Do not generate images before the user confirms the card copy.

### Phase D: Content Approval Gate

Ask the user to confirm:

- card copy
- body copy
- visual route
- whether AI chat screenshot is needed
- whether image generation should run now

If edits are requested, revise copy first. Then regenerate Image 2 prompts.

### Phase E: Image 2 Full-Card Production

Default for 澄Cc:

- 3:4 vertical card
- final Chinese text baked in
- Style B as default visual
- Style A only for strong-emotion topics
- original orange IP only, small and secondary
- no other characters / borrowed IP / fake screenshots

Execution rule:

- After the user approves card copy, actually call the available image generation / Image 2 tool to create the cards.
- Do not stop at prompts when the image tool is available.
- If image generation fails, retry with a shorter prompt once.
- Only fall back to a prompt pack when the tool is unavailable or repeated generation attempts fail.
- State clearly whether images were generated or only prompts were produced.
- If only prompts were produced, do not mark the workflow as ready for manual image upload.
- After images are generated, copy the final publish-ready images to the creator's image export folder and use those copied paths in the manual publish checklist. Keep the original generated files in place.

If the user changes card text after images are generated, regenerate the affected image. Do not patch text by default.

### Phase F: Publish Review

Choose the target platform before review:

- default to `xiaohongshu` when the user is making a Xiaohongshu post and no other platform is named
- use `douyin`, `wechat_channels`, or `wechat_official_account` when the user names those platforms
- if cross-posting, run one review for each platform

Run `references/publish-safety.md`, `docs/publish-review-2026.md`, and `docs/platform-publish-rules-2026.md`.

If issues exist:

1. list the issue
2. explain risk
3. revise the affected card/body/tag/prompt
4. rerun the check

If clean, continue to the manual publish checklist.

### Phase G: Manual Publish Checklist

Output a precise manual publish checklist using `templates/manual-publish-checklist.md`.

The checklist should say:

- target platform and draft surface
- image paths and upload order
- title/body/tags to copy manually
- mark AI-generated/AI-assisted content according to the target platform rules when final cards were generated by Image 2 or other AI tools
- if no platform AI label field is visible, include the disclosure text required by the review in the body/caption
- final human checks before clicking publish: image order, typo, tags, privacy masking, AI disclosure
- the creator clicks final publish manually

### Phase H: Performance Loop

Use `docs/performance-loop.md` and `templates/performance-loop.md`.

This phase closes the loop after a final package is ready and after the platform post has real data. It borrows the score / predict / retro / rubric mechanism, but it must not depend on a specific external skill or fabricate platform data.

Run it in two moments:

1. Pre-publish or pre-final-click: score the final package and record a prediction.
2. Post-publish: compare actual metrics against the prediction, then update the creator rubric.

Rules:

- If no platform metrics are available yet, create the prediction and an empty retro template instead of inventing numbers.
- Predictions must be written before looking at actual results.
- Use actual platform data supplied by the user, screenshots, platform analytics, or an approved analytics source.
- Treat one post as a hypothesis, not a permanent rule. Update the rubric only when a signal is strong or repeated.
- Keep the loop creator-specific and replaceable. A friend can use their own targets, metrics, and scoring weights.
- Do not use the performance loop to justify fake engagement, bait, fake comments, fake purchases, or misleading growth tactics.

## 3. 澄Cc Defaults

Persona:

- 00后应届生 / 初入职场新手.
- Writes to peers still in school, close to graduation, or just entering work.
- Uses real personal confusion to create same-circle resonance.

Tone:

- friend-like, young, clear, not teacher-like.
- no hard preaching.
- AI is a shared method, not a course or tool pitch.

Content pillars:

- graduation and early-career confusion
- friend relationships
- self-doubt
- emotional stuck points
- AI as a subtle method share

Visual:

- Style B default: young lifestyle-aesthetic magazine, abstract, trendy, healing, premium, dopamine but controlled.
- Style A backup: Gen-Z emotional sticker poster, only for strong-emotion hooks.

## 3.1 Peyson Defaults

When the user says `Peyson 默认资料`, read `references/brand-profile-peyson.md` and use Peyson as the active creator.

Default direction:

- product-minded founder/operator.
- more analytical and system-oriented than 澄Cc, but still human and friend-like.
- writes about work clarity, AI-assisted practical problem solving, personal operating systems, product/founder thinking, emotion and relationship analysis.
- AI appears as a helper near the end: sorting facts, extracting next actions, or turning records into clarity.
- default platform is Xiaohongshu image-text.
- default publish mode is manual upload / paste / final human publish decision.

Do not use 澄Cc's orange IP, fresh-graduate voice, or exact topic map for Peyson unless the user explicitly asks for a shared account style.

## 4. Default Output Contract

Use this structure unless the user asks otherwise:

```markdown
## 读取和定位
- 使用资料：
- 可替换 slot：
- 账号定位：
- 默认视觉：

## 10 个选题
| # | 选题 | 场景 | 适配理由 | 图文角度 | 视觉路线 |
|---|---|---|---|---|---|

## 等待选择
请从 10 个里选 1 个；选完我再做 4 页图文、正文和 Image 2 prompt。
```

After the user picks:

```markdown
## 图文方案
- 标题：
- 页数：
- 视觉路线：

## 4 页卡片
1.
2.
3.
4.

## 正文

## Image 2 完整卡片 Prompt
- Page 1:
- Page 2:
- Page 3:
- Page 4:

## Image 2 生成状态
- 结果：已生成 / 仅输出 prompt / 失败
- 图片顺序：
- 导出目录：
- 失败原因与下一步：

## 发布文案
- 标题：
- 正文：
- 标签：

## 发布审核
- 目标平台：
- AI 标识：
- 原创/侵权：
- 隐私：
- 真实性：
- 商业/导流/活动：
- 平台专项风险：
- 结论：

## 手动发布清单
...

## Phase H 发布后复盘
- Pre-publish score:
- Prediction:
- Actual metrics:
- Retro:
- Rubric update:
```

## 5. Quality Gate

Before finishing, verify:

- Did the workflow start from creator defaults / confirmed console?
- Did it offer 10 topics before drafting if no topic was selected?
- Did it wait for content approval before image generation?
- Did it actually generate images when the image tool was available?
- Are all creator-specific parts replaceable?
- Is the body additive rather than a duplicate of card text?
- Is AI framed as a method share rather than hard-sold teaching?
- Was the target platform selected?
- Did the 2026 platform publish review run for every target platform?
- Does the checklist leave final upload/paste/publish control to the creator?
- Was a pre-publish score and prediction recorded when the user wants a performance loop?
- Did the post-publish retro use real metrics rather than invented data?
- Did the rubric update avoid overfitting to one weak signal?
