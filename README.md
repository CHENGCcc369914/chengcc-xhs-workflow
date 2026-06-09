# ChengCc XHS Workflow

A shareable Xiaohongshu-first image-text workflow skill for turning creator-specific positioning into publish-ready carousel drafts, with 2026 platform review support for Xiaohongshu, Douyin, WeChat Channels, and WeChat Official Account, plus a post-publish performance loop.

The repo ships with `澄Cc` as the default example, but the workflow is designed to be replaced by a friend's own creator console, visual system, topic map, and publishing handoff.

## What This Workflow Does

The complete route is:

1. Read creator defaults and the confirmed creator console.
2. Generate 10 suitable topic options.
3. Wait for the creator to pick one topic.
4. Build the carousel plan, card copy, body copy, tags, and Image 2 full-card prompts.
5. Wait for content approval before image generation.
6. Actually call Image 2 / image generation to create complete cards. Output prompts only if image generation is unavailable or repeatedly fails.
7. Select the target platform and run the 2026 platform publish safety review.
8. If clean, output a WorkBuddy handoff instruction to upload images, fill title/body/tags, save as draft, and wait for human confirmation.
9. After the package is ready or the post is published, run the performance loop: score, predict, retro, and update the rubric with real data.

## Default Trigger

```text
用澄Cc默认资料，按中控台确认版，做 4 页图文 + Image 2 完整卡片 prompt + 发布文案。
```

For friends, replace the first clause:

```text
用{账号名}默认资料，按{账号名}中控台确认版，先给我 10 个适合我的选题。
```

## Replaceable Slots

The workflow is reusable because these parts are replaceable:

| Slot | 澄Cc default | Friend replacement |
|---|---|---|
| Creator profile | `references/brand-profile-chengcc.md` | own creator profile |
| Confirmed console | creator's local/cloud media console | own media console / positioning doc |
| Visual system | `references/visual-adapter-rules.md` | own visual style and Image 2 rules |
| Topic sources | emotion / graduation / workplace newcomer | own content pillars |
| Image export folder | `/Users/ccc/Pictures/小红书运营图片` for 澄Cc | own local publishing-image folder |
| Publishing operator | WorkBuddy | WorkBuddy / manual / browser automation |
| Target platform | `xiaohongshu` by default | `xiaohongshu` / `douyin` / `wechat_channels` / `wechat_official_account` |
| Safety rules | `references/publish-safety.md` + `docs/platform-publish-rules-2026.md` | keep platform rules, add niche-specific rules |
| Performance loop | score / predict / retro / rubric with Xiaohongshu metrics | own metrics, scoring weights, and rubric |

## Current 澄Cc Defaults

- Persona: `00后应届生 / 初入职场新手`.
- Audience: students close to graduation, fresh graduates, and early-career peers with similar confusion.
- Tone: friend-like, real, reflective, not teacher-like.
- AI role: share a method that worked in a real scene; no hard-selling prompts, no AI tool teaching posture.
- Visual default: Style B, young lifestyle-aesthetic magazine cover.
- Visual backup: Style A, Gen-Z emotional sticker poster for strong-emotion topics only.
- Image mode: `image_gen full-card`; final Chinese text is baked into the card after copy lock.

## 2026 Platform Publish Review

The review gate is platform-aware. Supported target platform codes:

- `xiaohongshu`: 小红书图文 / 视频
- `douyin`: 抖音图文 / 视频
- `wechat_channels`: 微信视频号图文 / 视频
- `wechat_official_account`: 微信公众号文章 / 图文 / 短视频

The gate checks AI/synthetic content labeling, authenticity, originality, privacy, copyright, claims, commercial/activity disclosure, external diversion, and platform-specific requirements.

Before high-risk publishing, refresh platform rules because policies can change.

## Performance Loop

The final phase borrows the score / predict / retro / rubric mechanism and makes each post reusable as learning data.

Use it in two moments:

- Before final publish: score the final package and record a prediction.
- After publish: compare real platform metrics against the prediction and update the creator rubric.

The loop does not invent metrics and does not require a specific analytics tool. Use creator-provided screenshots, WorkBuddy output, platform analytics, or another approved data source.

## Recommended Skill Stack

This repo is the orchestration layer. It can work alone, but works best with:

- A creator-specific writing skill, such as `cc-xhs-personal-growth-writer`.
- Image generation / Image 2.
- WorkBuddy for Creator Center operations.
- Optional Xiaohongshu browser/publishing skill for manual fallback checks.

## Install

Manual install:

```bash
mkdir -p ~/.agents/skills
cp -R skills/chengcc-xhs-workflow ~/.agents/skills/
```

The `skills/chengcc-xhs-workflow/` folder is self-contained. Do not copy only
`SKILL.md`; the skill also needs its bundled `references/`, `docs/`,
`templates/`, and `examples/` folders.

Then invoke it with a creator profile and console:

```text
用澄Cc默认资料，按中控台确认版，先给我 10 个适合我的选题。
```

## Repo Structure

```text
skills/chengcc-xhs-workflow/SKILL.md
skills/chengcc-xhs-workflow/references/brand-profile-chengcc.md
skills/chengcc-xhs-workflow/references/workflow-pipeline.md
skills/chengcc-xhs-workflow/references/visual-adapter-rules.md
skills/chengcc-xhs-workflow/references/publish-safety.md
skills/chengcc-xhs-workflow/docs/customize-for-friends.md
skills/chengcc-xhs-workflow/docs/workflow-phases.md
skills/chengcc-xhs-workflow/docs/publish-review-2026.md
skills/chengcc-xhs-workflow/docs/platform-publish-rules-2026.md
skills/chengcc-xhs-workflow/docs/performance-loop.md
skills/chengcc-xhs-workflow/templates/topic-options.md
skills/chengcc-xhs-workflow/templates/post-brief.md
skills/chengcc-xhs-workflow/templates/carousel-plan.md
skills/chengcc-xhs-workflow/templates/platform-review.md
skills/chengcc-xhs-workflow/templates/workbuddy-handoff.md
skills/chengcc-xhs-workflow/templates/performance-loop.md
skills/chengcc-xhs-workflow/examples/sample-input.md
skills/chengcc-xhs-workflow/examples/sample-output.md
```

## Safety Boundary

The skill may prepare a WorkBuddy handoff. It should not silently publish. WorkBuddy should upload/fill/save draft and wait for the creator's confirmation unless the current-turn instruction explicitly asks to publish.
