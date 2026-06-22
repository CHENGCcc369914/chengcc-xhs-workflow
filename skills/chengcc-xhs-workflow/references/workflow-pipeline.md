# Workflow Pipeline

## Phase A: Read Creator Defaults

Goal: understand the creator before generating ideas.

Inputs:

- creator profile
- confirmed media console / positioning doc
- visual rules
- creator IP / avatar extension rules
- creator IP visual spec
- Visual System V2 rules
- benchmark / RAG corpus
- content pillars
- hard avoids
- publishing operator
- image export folder

For runtime/template runs, use the active `Creator Profile` first:

- creator identity, target readers, voice, content pillars, and hard avoids
- profile `paths.ragCaseLibrary` for low-follower/high-performing case retrieval
- profile `paths.creatorAssets` for avatar/IP/spec/reference assets
- profile `paths.outputImages` for export output
- profile visual system as the default Image 2 style contract

For 澄Cc local/private runs without an active profile, use:

- 00后应届生 / 初入职场新手
- target readers: in-school, soon-to-graduate, fresh workplace peers
- Style B default, Style A backup
- ChengCc standard avatar IP V2.0 by default for character actions, expression stickers, outfit variations, and inner-page mini-scenes
- V2.0 source: ChengCc private `ip-visual-system.md` under Cc's local asset folder
- clothing asset reference: ChengCc private clothing reference under Cc's local publishing-image folder
- Apply this V2.0 source automatically in normal 澄Cc Xiaohongshu workflow runs. The user does not need to mention it again.
- orange `C` necklace, orange/C/orange-fruit outfit system, ChengCc/Cc/Ccc marks, and C-shaped symbols as the main memory system; orange phone case is optional when phone use is part of the scene
- clothing is a scene-variable original asset system: do not use ordinary basic T-shirts or simple recolors; use orange/C/citrus details through silhouette, texture, patch, pocket, drawstring, hat, small bag, shoes, pajamas, and retro loose styling
- local low-follower/high-performing case corpus: ChengCc private case-library folder
- Visual System V2 execution engine: content input -> meaning -> emotion -> layout -> editorial visual -> feedback
- AI as method sharing, not teaching
- image export folder: creator's local publishing-image folder

For friends, replace those defaults through `profiles/<creator-id>.creator-profile.json`; do not hard-code Cc private paths into their runnable loop.

## Phase B: Generate 10 Topics

Goal: help the creator choose, not force one direction.

Before generating topics or improving copy, run a bounded case-library retrieval when the task mentions traffic, low-follower/high-performing cases, similar notes, title/body optimization, RAG, "爆款", or "别人怎么写":

- use `xhs-blogger-intelligence`
- source folder: active creator profile `paths.ragCaseLibrary`
- retrieve 3-8 cases close to the topic lane
- extract: title hook, opening true setup, repeated brain-voice lines, AI turning question, practical method list, collection/save CTA
- output a compact RAG brief before the topics or draft
- do not copy source paragraphs; adapt only the structure and logic

Each topic includes:

- hook
- real-scene seed
- target reader
- reason it fits the account
- carousel angle
- visual route

Do not produce final copy until the user picks one topic.

## Phase C: Draft Carousel Package

Goal: turn the chosen topic into a confirmable image-text package.

Default output:

- local RAG brief used, if relevant
- final title
- 4-page carousel plan
- Visual System V2 design brief
- ChengCc IP V2.0 action/scene direction when the avatar, mini-illustration, or sticker appears
- page-by-page card copy
- body copy
- tags
- comment CTA
- Image 2 full-card prompts
- risk notes

Default 4 pages:

1. Cover / Editorial Cover.
2. Emotion Page / real feeling and visible behavior.
3. System Page / reframe, separation, AI thinking, or hidden method.
4. Insight Page / AI answer, screenshot-frame, or one small next action.

Low-follower/high-performing case patterns to absorb for 澄Cc:

- start with a specific lived setup: "我是一个..." / "那天..." / "有一次..." instead of a slogan
- include the inner voice readers recognize, such as "是不是我又没做好"
- make the AI moment a turning point, usually one question or one clear reframe
- give 2-3 small methods with names, not abstract advice
- end with a light save/try CTA that feels useful, not salesy

V2 design brief required before Image 2 prompts:

```json
{
  "content_input": {
    "raw_content": "",
    "source_type": "life_record | work_feedback | emotion_fragment | ai_chat | topic_card | user_comment",
    "context": "",
    "time": "",
    "related_people": "",
    "sensitivity": "low | medium | high"
  },
  "meaning_layer": {
    "core_event": "",
    "user_problem": "",
    "hidden_emotion": "",
    "key_conflict": "",
    "insight": ""
  },
  "emotion_layer": {
    "emotion_type": "clarity | confusion | anxiety | reflection | calm | tension",
    "emotion_intensity": 1,
    "visual_implication": ""
  },
  "layout_engine": [
    {"page": 1, "role": "Editorial Cover", "layout_type": "HERO | EDITORIAL"},
    {"page": 2, "role": "Emotion Page", "layout_type": "EDITORIAL"},
    {"page": 3, "role": "System Page", "layout_type": "GRID | SPLIT"},
    {"page": 4, "role": "Insight Page", "layout_type": "GRID | EDITORIAL"}
  ]
}
```

Every page must define `[HEADER]`, `[MAIN]`, `[SIDE]`, and `[FOOTER]` zones. If a zone is intentionally quiet, mark it as whitespace / weak signal instead of omitting it.

## Phase D: Content Approval

Before image generation, ask for approval of:

- card text
- body text
- visual route
- screenshot requirement
- image generation timing

If copy changes later, regenerate Image 2 prompts and affected images.

## Phase E: Image 2 Full-Card Production

Default to `image_gen full-card`:

- lock exact card copy first
- for 澄Cc, automatically load and apply the V2.0 IP spec before writing any avatar, outfit, mini-scene, sticker, or full-card prompt
- for 澄Cc, automatically apply the clothing asset reference when writing any avatar outfit, action extension, scene illustration, avatar cover, or three-view prompt
- call the available image generation / Image 2 tool after copy approval
- generate complete 3:4 cards
- include final Chinese text directly in the image
- use screenshot-frame mode when a real AI chat image should be inserted
- if a ChengCc character/action/sticker/mini-scene is useful, apply `references/chengcc-ip-extension-rules.md` before writing the Image 2 prompt
- insert the avatar lock block: same face, same black loose 4/6 side-part short hair, slightly round chin, subtle orange iris ring, left ear exactly 2 silver earlobe earrings, right ear exactly 1 silver earlobe earring, visible orange C necklace, orange/C/orange-fruit outfit system, healing hand-drawn paper-grain illustration style
- insert the clothing asset lock when the outfit is visible: original ChengCc outfit system, not plain clothing; orange element + C element + citrus motif + orange recognition color + retro loose designer silhouette + clean healing life-aesthetic details, with scene-appropriate work/outdoor/home/night/content-creation variants
- copy final publish-ready images into the creator's image export folder
- keep original generated files in their default generation directory
- use the V2 editorial prompt spine from `references/visual-system-v2.md`
- validate each card against structure, emotion, editorial feel, and information density before accepting it
- create a per-post `run_id` and `run-manifest.json` before copying any image into the creator's image export folder
- record topic, final card copy hash, page count, visual route, required IP source, generated source paths, copied export paths, validation status, and rejected attempts in the manifest
- use a real `sha256:` card copy hash, not a placeholder; keep `export_path` inside the current run export folder; keep `source_generated_path` as the original generated candidate path and different from `export_path`
- keep every generated image as a candidate until validation passes; only manifest entries with `status: "pass"` may be copied to the final export order or used in the manual publish checklist
- mark images as `fail` and regenerate or stop if they contain current text but stale visuals, semi-realistic collage, old orange mascot direction, unrelated diagrams, missing ChengCc IP locks, unreadable Chinese, or any mismatch with approved copy
- treat older generated images and local avatar assets as `reference_only` inputs unless the user explicitly asks to reuse that exact visual

Fallback:

- prompt pack only
- editable hybrid mode if the user explicitly wants design-layer text
- manual image production handoff

Prompt-only output is a fallback, not the normal path. Use it only when Image 2 is unavailable or repeated generation attempts fail.

Visual rejection rules:

- reject equal-weight page layouts where the reader cannot tell what to see first
- reject random sticker or scrapbook decoration unless Style A was explicitly chosen for a strong-emotion topic
- reject fake screenshots or fake app UI
- reject generic 3D boys, old orange-mascot defaults, changed earrings, sharp V chin, cold eye ring, missing C necklace, or missing orange/C/orange-fruit outfit system when a ChengCc avatar is used
- reject ordinary basic outfits, simple orange recolors, random real-brand streetwear, dark punk/skull styling, dirty textures, or plastic AI material when a ChengCc avatar is used
- reject unreadable or overlapped Chinese core text
- reject inner pages that look like another cover
- reject pretty-but-empty layouts with no meaning layer or no visualized emotion

## Phase F: 2026 Publish Review

Run the review after images/prompts and before the manual publish checklist.

First choose the target platform:

- default `xiaohongshu` for Xiaohongshu-first image-text posts
- `douyin` for Douyin
- `wechat_channels` for WeChat Channels
- `wechat_official_account` for WeChat Official Account
- multiple platform codes for cross-posting

Check:

- AI generated/synthetic content labeling
- no AI account hosting / fake automation
- no fake experiences, fake screenshots, or fake claims
- no IP/portrait/copyright misuse
- no low-quality batch sameness
- no privacy exposure
- no medical/legal/financial/career guarantees
- no misleading external traffic or fake engagement
- no platform-sensitive or illegal content
- platform-specific requirements from `docs/platform-publish-rules-2026.md`

If a problem exists, revise and rerun the affected platform review. Cross-posting requires a separate pass/revise/block decision for each platform.

## Phase G: Manual Publish Checklist

If review passes:

- target platform and draft surface
- image order
- use only manifest-validated image paths from the creator's image export folder
- final title
- final body
- tags
- AI label instruction
- platform-specific risk notes
- final human checks before clicking publish

The creator manually uploads images, pastes title/body/tags, checks AI label and privacy masking, then decides whether to click publish.

## Phase H: Performance Loop

Goal: turn every published post into a measurable learning loop.

Use:

- `docs/performance-loop.md`
- `templates/performance-loop.md`

This phase has two parts:

1. Before final publish: score the final package and record predictions.
2. After publish: compare real platform data with the prediction and update the creator rubric.

Do not invent metrics. If the post is not published yet, create the pre-publish score and prediction only. If the user later provides screenshots, platform analytics, or platform numbers, run the retro section.

Default score dimensions:

- creator fit
- hook strength
- card readability
- body/card non-duplication
- visual distinctiveness
- Visual System V2 execution: meaning clarity, emotion-layout match, layout zones, editorial feel, and controlled density
- AI method-share naturalness
- save/comment potential
- platform safety

Default prediction fields:

- expected 24-hour and 72-hour views / likes / saves / comments / follows
- likely comment themes
- likely weak point
- highest-risk assumption

Retro rules:

- Compare prediction vs actual metrics.
- Separate content-quality problems from distribution/timing noise.
- Capture one next experiment.
- Write visual feedback as a rule hypothesis: what worked, what failed, and what to test next.
- Update the rubric only when the signal is strong or repeated across posts.
- Never recommend fake engagement, fake comments, fake purchases, or misleading growth tactics.
