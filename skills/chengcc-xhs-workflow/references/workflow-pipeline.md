# Workflow Pipeline

## Phase A: Read Creator Defaults

Goal: understand the creator before generating ideas.

Inputs:

- creator profile
- confirmed media console / positioning doc
- visual rules
- content pillars
- hard avoids
- publishing operator
- image export folder

For 澄Cc, use:

- 00后应届生 / 初入职场新手
- target readers: in-school, soon-to-graduate, fresh workplace peers
- Style B default, Style A backup
- AI as method sharing, not teaching
- image export folder: `/Users/ccc/Pictures/小红书运营图片`

For friends, replace those defaults with their own.

## Phase B: Generate 10 Topics

Goal: help the creator choose, not force one direction.

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

- final title
- 4-page carousel plan
- page-by-page card copy
- body copy
- tags
- comment CTA
- Image 2 full-card prompts
- risk notes

Default 4 pages:

1. Cover.
2. Real feeling / brain-theater.
3. Reframe / hidden method.
4. AI answer / screenshot-frame.

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
- call the available image generation / Image 2 tool after copy approval
- generate complete 3:4 cards
- include final Chinese text directly in the image
- use screenshot-frame mode when a real AI chat image should be inserted
- copy final publish-ready images into the creator's image export folder
- keep original generated files in their default generation directory

Fallback:

- prompt pack only
- editable hybrid mode if the user explicitly wants design-layer text
- manual image production handoff

Prompt-only output is a fallback, not the normal path. Use it only when Image 2 is unavailable or repeated generation attempts fail.

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
- use image paths from the creator's image export folder
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
- Update the rubric only when the signal is strong or repeated across posts.
- Never recommend fake engagement, fake comments, fake purchases, or misleading growth tactics.
