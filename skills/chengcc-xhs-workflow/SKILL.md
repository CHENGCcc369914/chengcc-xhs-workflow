---
name: chengcc-xhs-workflow
description: "Single-post Xiaohongshu image-text production router used under ChengCc's L4.5 runtime, or directly for non-ChengCc/shareable creator workflows. For ChengCc, if the user says 做一篇澄Cc小红书, 用澄Cc默认资料做一篇/写一篇, 做一个澄Cc选题, or otherwise asks for normal ChengCc post production, route upward to chengcc-content-loop-runtime first unless the user explicitly says 只写文案, 不建 run, 不跑流程, or 轻量草稿. Use this skill for the single-post package itself: creator defaults / media console -> local case-library RAG when relevant -> topic options -> carousel copy -> Image 2 full-card prompts or generation -> platform publish-safety review -> manual publish checklist -> post-publish performance loop. Prefer this over cc-xhs-personal-growth-writer when the request includes 完整工作流, 中控台确认版, 10个选题, 4页图文, Image 2完整卡片, 2026发布审核, 手动发布清单, 发布后复盘, score/predict/retro/rubric, 低粉高爆案例参考, or shareable skill for friends. For 澄Cc, automatically apply the ChengCc IP Visual System V2.0 for avatar, mini-illustration, sticker, outfit, and Image 2 card prompts; the user should not need to mention it. Coordinate with xhs-blogger-intelligence for RAG briefs, cc-xhs-personal-growth-writer for 澄Cc voice/copy, and xiaohongshu-ops only when the user explicitly asks for real platform browsing/upload/comment actions."
---

# ChengCc Xiaohongshu Workflow Skill

This is a shareable orchestration skill:

Creator defaults -> confirmed console -> local case-library RAG when relevant -> 10 topics -> user picks one -> carousel plan -> Visual System V2 design brief -> content approval -> Image 2 full-card generation -> platform publish review -> manual publish checklist -> performance loop.

It ships with 澄Cc and Peyson starter defaults, but must remain customizable for other creators.
All referenced `docs/`, `references/`, `templates/`, and `examples/` paths are
relative to this skill folder.

## Suite Routing With XHS Skills

When several Xiaohongshu skills could apply, route by the user's job:

| User job | Primary skill | Handoff |
|---|---|---|
| Default ChengCc post production: "做一篇澄Cc小红书", "用澄Cc默认资料做一篇/写一篇", "做一个澄Cc选题" | `chengcc-content-loop-runtime` | This workflow becomes the single-post production child inside the run folder. |
| Benchmark monitoring, watchlist refresh, blogger note-cards, local low-follower/high-performing case RAG brief | `xhs-blogger-intelligence` | Pass only the compact RAG brief into this workflow or the writer. |
| Explicit lightweight writing-only task: title, body, cover copy, one selected topic, rewrite, comments, with "只写文案 / 不建 run / 不跑流程 / 轻量草稿" | `cc-xhs-personal-growth-writer` | Use this workflow only if the user later asks for cards, images, publish review, manual publish checklist, or performance loop. |
| Complete package: 10 topics, 4-page carousel, Image 2, publish review, manual publish checklist, performance loop | `chengcc-xhs-workflow` | Use `cc-xhs-personal-growth-writer` for 澄Cc voice and local console lookup. |
| Explicit platform automation: browse/search Xiaohongshu, upload images, fill creator page, comment/reply | `xiaohongshu-ops` | Use only when the user explicitly asks for platform automation. The default publish flow is manual upload/paste by the creator. |

This skill is the orchestration truth source for 澄Cc complete single-post Xiaohongshu production. Other XHS skills provide bounded services; they should not independently complete or override this workflow.

For ChengCc, `chengcc-content-loop-runtime` is the default parent runtime for normal post production, not only when the user says "L4.5". In that mode, this skill writes the single-post package into the current run folder and does not own long-term memory updates.

For GitHub/template use, the current run's `01-bootstrap-context.md` is the active creator contract. If it contains `## Creator Profile`, use that profile's creator identity, positioning, voice, visual system, RAG case library, asset paths, output image folder, and workbench path before any ChengCc defaults. Do not silently fall back to Cc local paths when the profile is missing or still a placeholder; report the missing profile field and pause.

Priority rules:

1. If the user explicitly asks for real browsing, searching, uploading, creator-center filling, commenting, or publishing automation, use `xiaohongshu-ops` for those platform actions. Otherwise, keep publishing manual.
2. If the request is normal ChengCc post production, start or continue a `chengcc-content-loop-runtime` run first unless the user explicitly asks for lightweight writing-only output.
3. If the request asks how benchmark bloggers recently posted, how low-follower/high-performing notes are written, or asks for similar-case RAG, run `xhs-blogger-intelligence` first, then use its RAG brief as context.
4. For runtime/template work, use the active creator profile's RAG case library. For Cc's own local work only, the Cc private corpus may be used as a fallback. Retrieve only topic-relevant files/sections; do not bulk-read the whole corpus unless the user asks for a full audit.
5. If the request includes full carousel production, Image 2, publish review, manual publish checklist, or post-publish scoring, this skill is the main single-post workflow even when the parent runtime owns the run.
6. If the request explicitly asks only for copy, title options, cover wording, or a single lightweight writing draft with no run/workflow/images, `cc-xhs-personal-growth-writer` is the main skill.
7. Do not route to `xiaohongshu-ops` for offline content strategy, copywriting, Image 2, run-manifest validation, or performance interpretation. It is a platform UI executor only.

## 0. Replaceable Creator Slots

Before creating content, identify these slots:

| Slot | 澄Cc default | Friend replacement |
|---|---|---|
| Creator profile | `references/brand-profile-chengcc.md` | own profile, or `references/brand-profile-peyson.md` for Peyson |
| Confirmed console | 澄Cc self-media console / default资料 | own creator console |
| Visual style | `references/visual-adapter-rules.md` + `references/visual-system-v2.md` | own visual rules and validation gates |
| IP visual spec | ChengCc local visual spec when running Cc's own profile | own IP spec or no character system |
| IP clothing asset reference | ChengCc local clothing reference when running Cc's own profile | own clothing / outfit reference, or none |
| Benchmark / RAG corpus | 澄Cc local low-follower/high-performing case library | own case library folder, export, database, or no corpus |
| Topic map | graduation / relationships / early career / self-doubt / AI sharing | own content pillars |
| Image mode | Image 2 full-card | own image model/style |
| Image export folder | creator's local publishing-image folder | own local publishing-image folder |
| Publishing handoff | manual Xiaohongshu publish checklist by default | own target platform and manual flow |
| Performance loop | score / predict / retro / rubric with Xiaohongshu metrics | own metrics, scoring weights, and rubric |
| Loop runtime | `chengcc-content-loop-runtime` run folder by default for normal ChengCc post production | own runtime root and gates |

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

For runtime/template runs:

1. Current run `01-bootstrap-context.md`
2. Active creator profile paths from that bootstrap
3. `references/workflow-pipeline.md`
4. `references/publish-safety.md`
5. `references/visual-system-v2.md`, adapted to the creator profile
6. `docs/workflow-phases.md`
7. `docs/publish-review-2026.md`
8. `docs/platform-publish-rules-2026.md`
9. `docs/performance-loop.md`

For 澄Cc without a runtime profile:

1. `references/brand-profile-chengcc.md`
2. `references/workflow-pipeline.md`
3. `references/visual-adapter-rules.md`
4. `references/chengcc-ip-extension-rules.md`
5. `references/visual-system-v2.md`
6. ChengCc local IP visual spec when available
7. ChengCc local clothing asset reference when available and avatar outfit / action / scene illustration / avatar cover / three-view generation is involved
8. `references/publish-safety.md`
9. `docs/workflow-phases.md`
10. `docs/publish-review-2026.md`
11. `docs/platform-publish-rules-2026.md`
12. `docs/performance-loop.md`

If the active environment also has `cc-xhs-personal-growth-writer`, use it for 澄Cc content voice and local console lookup.

The ChengCc IP Visual System V2.0 is a default 澄Cc visual source, not an optional user-triggered add-on. In normal 澄Cc Xiaohongshu workflow runs, apply it automatically before visual route selection, Image 2 prompt writing, avatar action planning, sticker/mini-scene generation, and final image validation.

The ChengCc clothing asset reference is also default when the avatar appears. Treat clothing as an original scene-variable asset system: keep the fixed face/hair/features/earrings/C necklace, then create page-specific outfits with orange elements, C-shaped structure, citrus motifs, orange recognition color, retro loose silhouettes, and clean healing life-aesthetic details. Do not reduce the avatar to ordinary basic clothes or a simple orange recolor.

For requests involving topic research, low-follower/high-performing cases, similar-note references, title improvement, body structure learning, or "先看看别人怎么写", retrieve from the active creator profile's RAG case library first through `xhs-blogger-intelligence`.

Use the RAG result as a compact benchmark brief. Do not copy source paragraphs; extract reusable patterns such as opening setup, brain-voice lines, AI turning question, method names, collection CTA, and anti-patterns.

If the active request comes from `chengcc-content-loop-runtime`, also read the current run's `01-bootstrap-context.md` and write outputs back into that run folder:

- RAG brief: `02-rag-brief.md`
- topic options: `03-topic-options.md`
- selected hypothesis: `04-selected-hypothesis.md`
- carousel package: `05-carousel-draft.md`
- image manifest: `06-image-manifest.json`
- publish checklist: `07-publish-checklist.md`
- prediction: `08-prediction.md`

Do not update long-term loop memory or durable rules from this skill. The parent runtime handles Gate 2.

For Peyson:

1. `references/brand-profile-peyson.md`
2. `references/workflow-pipeline.md`
3. `references/publish-safety.md`
4. `references/visual-system-v2.md`
5. `docs/publish-review-2026.md`
6. `docs/platform-publish-rules-2026.md`
7. `docs/performance-loop.md`
8. `examples/peyson-start-prompts.md` when the user needs copyable launch prompts

For another creator:

1. `docs/customize-for-friends.md`
2. the creator's own profile / console / visual reference
3. `references/workflow-pipeline.md`
4. `references/visual-system-v2.md` as the reusable V2 engine, replacing only the style specifics with the creator's own visual system
5. `references/publish-safety.md`
6. `docs/publish-review-2026.md`
7. `docs/platform-publish-rules-2026.md`
8. `docs/performance-loop.md`

## 2. Workflow Phases

### Phase A: Creator Defaults

Confirm the creator profile and replaceable slots before generating ideas.

For 澄Cc, use the bundled brand profile and confirmed console rules.
For 澄Cc, also load and apply the ChengCc IP Visual System V2.0 during this phase. Do not wait for the user to say "按橙Cc IP 2.0"; the default visual identity already includes it.
For Peyson, use the bundled Peyson starter profile unless the user provides a newer console.
For friends, use their own profile, positioning, visual system, topic map, image export folder, and publishing operator.

If the user has not selected a creator profile, infer a minimal profile only when the input is enough. Otherwise ask for the missing creator basics.

### Phase B: Topic Options

First output 10 topics suitable for the creator. Do not jump straight into a finished article unless the user has already picked a topic.

If the request mentions traffic, benchmark, low-follower/high-performing notes, similar notes, RAG, "爆款", "怎么写", or content optimization, first run a bounded local corpus retrieval:

- source folder: active creator profile `paths.ragCaseLibrary`
- retrieve 3-8 topic-relevant cases
- summarize title hook, true opening setup, emotional brain-voice, AI turning question, method list, CTA/save logic
- mark which parts can be adapted by the active creator and which parts must not be copied

Each topic must include:

- title / hook
- scene
- target reader
- why it fits the creator
- suggested carousel angle
- visual route: Style B default, Style A strong-emotion backup, or Style C Japanese editorial backup when explicitly requested

Use `templates/topic-options.md`.

Then wait for the user to pick one.

### Phase C: Carousel Draft

After topic selection, produce:

- local RAG brief used, if any
- final title
- 4-page carousel structure by default
- Visual System V2 design brief: content input, meaning layer, emotion layer, page layout types, and validation notes
- per-page card text
- body copy
- tags
- comment CTA
- Image 2 prompt for each complete card
- privacy and risk notes

For 澄Cc, absorb the local case-library patterns into the draft:

- the opening must have a real scene and true emotional setup, not only a concept
- the AI part must contain a useful turning question or analysis role, not a thin "AI says" decoration
- the method section should give 2-3 usable actions or a small checklist
- image text and body text must not repeat; image carries hierarchy, body carries lived detail and payoff

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
- ChengCc standard avatar IP by default when a character/action/sticker/scene is useful
- preserve the avatar locks from `references/chengcc-ip-extension-rules.md` and the V2.0 spec: same face, same 4/6 black short hair, slightly round chin, subtle orange iris ring, left ear exactly 2 silver earlobe earrings, right ear exactly 1 silver earlobe earring, visible orange C necklace, orange/C/orange-fruit outfit system, healing hand-drawn paper-grain illustration style
- treat the standard avatar as an identity lock, not a reusable pose asset: for every final card where the avatar appears, design a fresh page-specific action, expression, outfit, prop, and mini-scene from that page's meaning layer; existing avatar images may be used only for rough layout tests unless the user explicitly asks to reuse them
- treat the clothing reference as an outfit-design lock, not a fixed costume: every visible outfit should keep ChengCc's orange/C/citrus/retro-healing language while changing by scene, such as work/design, commute/outdoor, home/healing, night/rest, or content-creation looks
- before Image 2 generation, output or internally decide an `IP action brief` for each page: page meaning -> avatar action -> facial expression -> body posture -> props -> scene relation -> how the avatar supports the headline without stealing hierarchy
- orange is a character-system color through C necklace, clothing, orange icons/slices, C-shaped symbols, props, and controlled accents; do not revert to an orange fruit mascot unless the user explicitly asks for legacy orange mascot styling
- no other characters / borrowed IP / fake screenshots
- every page must pass the Visual System V2 validation gate before being accepted: HEADER / MAIN / SIDE / FOOTER zones, one primary visual subject, clear hierarchy, emotion-layout match, editorial feel, and controlled density

Execution rule:

- After the user approves card copy, actually call the available image generation / Image 2 tool to create the cards.
- Do not stop at prompts when the image tool is available.
- If image generation fails, retry with a shorter prompt once.
- Only fall back to a prompt pack when the tool is unavailable or repeated generation attempts fail.
- State clearly whether images were generated or only prompts were produced.
- If only prompts were produced, do not mark the workflow as ready for manual image upload.
- After images are generated, copy the final publish-ready images to the creator's image export folder and use those copied paths in the manual publish checklist. Keep the original generated files in place.
- Before copying anything into the creator's image export folder, create a per-post `run_id` and a `run-manifest.json` in the target export folder. Use a date + topic slug, such as `2026-06-17-xiabanqian-3-lines`, and never reuse a previous post folder for a new post.
- The manifest must record the topic, final card copy hash, page count, visual route, required IP source, generated source paths, copied export paths, validation status, and rejected attempts.
- `card_copy_hash` must be a real `sha256:` copy lock, not a placeholder. `export_path` must point inside the current run's export folder. `source_generated_path` must point to the original generated candidate and differ from the copied `export_path`.
- Treat generated files as candidates until validation passes. Do not list a candidate image in the manual publish checklist, copy it over an approved file, or call it publish-ready until the manifest marks that page `pass`.
- If an image has the current post's text but the wrong visual route, stale local asset, semi-realistic collage, old mascot direction, unrelated diagram/infographic, missing ChengCc IP locks, unreadable Chinese, or any mismatch with the approved card copy, mark it `fail`, keep it out of the publish checklist, and regenerate or stop with a blocked image step.
- Older generated images and local avatar assets may be used only as `reference_only` inputs. They must never be patched with new text and saved as final output unless the user explicitly asks to reuse that exact visual.

If the user changes card text after images are generated, regenerate the affected image. Do not patch text by default.

Before generation, transform the carousel into the V2 prompt chain:

1. Content input: source type, context, time, related people, sensitivity.
2. Meaning layer: core event, user problem, hidden emotion, key conflict, insight.
3. Emotion layer: `clarity`, `confusion`, `anxiety`, `reflection`, `calm`, or `tension`, with intensity 1-5.
4. Layout engine: P1 cover, P2 emotion page, P3 system page, P4 insight page, each assigned `HERO`, `GRID`, `SPLIT`, or `EDITORIAL`.
5. Editorial prompt: use the creator visual rules plus the V2 editorial spine from `references/visual-system-v2.md`.
6. Validation gate: reject flat hierarchy, random decoration, scrapbook chaos, unreadable Chinese text, fake screenshots, or equal visual weight.

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

### Phase I: Runtime Handoff

Use this phase only when the request is running under `chengcc-content-loop-runtime`.

Rules:

- Treat the current run folder as the file boundary for this post.
- Do not create a second unrelated run folder from inside this skill.
- Keep final publish under the parent runtime's Gate 1.
- Keep long-term rule or memory updates under the parent runtime's Gate 2.
- If a post-publish retro discovers a durable lesson, write it as a proposal in `12-memory-update-proposal.md`, not directly into `state/next-run-context.md`.
- If the current image set fails because it uses a stale visual, old run folder, wrong IP style, or mismatched copy hash, mark the image manifest as not publish-ready and return control to the parent runtime.

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

- Style B default: XHS-friendly healing hand-drawn IP illustration system: warm paper background, soft therapeutic mood, playful young illustration, clear hierarchy, Cc avatar mini-scene, orange C necklace / orange-fruit icon / C-shaped symbols / controlled blue accent as memory symbols.
- Style C backup: Japanese Editorial Magazine System, only when the user explicitly wants high-end magazine, fashion lookbook, or strong typography-led pages.
- Style A backup: Gen-Z emotional sticker poster, only for strong-emotion hooks.
- Visual System V2: content input -> meaning -> emotion -> layout -> visual prompt -> feedback.
- ChengCc standard avatar IP: use the healing hand-drawn young male designer IP as the default character system. The old orange-fruit mascot is not the default. Orange should live in the C necklace, outfit system, orange/citrus icons, C-shaped details, props, and small accents.
- ChengCc outfit default: follow the clothing asset reference. Outfits should feel like original IP clothing assets with design density, not normal T-shirts, plain pants, random brand-like streetwear, or simple orange recolors.

## 3.1 Peyson Defaults

When the user says `Peyson 默认资料`, read `references/brand-profile-peyson.md` and use Peyson as the active creator.

Default direction:

- product-minded founder/operator.
- more analytical and system-oriented than 澄Cc, but still human and friend-like.
- writes about work clarity, AI-assisted practical problem solving, personal operating systems, product/founder thinking, emotion and relationship analysis.
- AI appears as a helper near the end: sorting facts, extracting next actions, or turning records into clarity.
- default platform is Xiaohongshu image-text.
- default publish mode is manual upload / paste / final human publish decision.

Do not use 澄Cc's ChengCc avatar IP, C necklace/orange-citrus symbol system, fresh-graduate voice, or exact topic map for Peyson unless the user explicitly asks for a shared account style.

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

## Visual System V2 设计简报
- Content Input：
- Meaning Layer：
- Emotion Layer：
- Layout Engine：
- Visual Validation：

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
- Run ID：
- 结果：已生成 / 仅输出 prompt / 失败
- 图片顺序：
- 导出目录：
- Manifest：
- Card copy hash：
- Publish ready：true / false
- 通过验收：
- 拒绝/废弃尝试：
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

## Runtime Handoff
- Parent runtime: none / chengcc-content-loop-runtime
- Run folder:
- Files updated:
- Gate 1 publish status:
- Gate 2 memory status:
- Next runtime action:
```

## 5. Quality Gate

Before finishing, verify:

- Did the workflow start from creator defaults / confirmed console?
- Did the workflow remain the primary orchestrator instead of letting `xiaohongshu-ops` or the writer skill independently finish a complete package?
- Did it offer 10 topics before drafting if no topic was selected?
- Did it wait for content approval before image generation?
- Did it actually generate images when the image tool was available?
- If images were generated, did the export folder contain `run-manifest.json` with every final page marked `pass`?
- Were failed, stale, wrong-style, or reference-only images excluded from the manual publish checklist?
- Are all creator-specific parts replaceable?
- If 澄Cc visual character appears, did it follow `references/chengcc-ip-extension-rules.md` rather than a generic 3D boy or old orange mascot?
- If 澄Cc visual character appears in final cards, did each page create a topic-specific action/expression/scene instead of merely pasting a standing pose or previously generated asset?
- Is the body additive rather than a duplicate of card text?
- Is AI framed as a method share rather than hard-sold teaching?
- Was the target platform selected?
- Did the 2026 platform publish review run for every target platform?
- Does the checklist leave final upload/paste/publish control to the creator?
- Was a pre-publish score and prediction recorded when the user wants a performance loop?
- Did the post-publish retro use real metrics rather than invented data?
- Did the rubric update avoid overfitting to one weak signal?
- If running under `chengcc-content-loop-runtime`, were outputs written into the current run folder and were long-term updates left to Gate 2?
