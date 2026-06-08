# ChengCc XHS Workflow

A shareable Xiaohongshu image-text workflow skill for turning creator-specific positioning into publish-ready carousel drafts.

The repo ships with `澄Cc` as the default example, but the workflow is designed to be replaced by a friend's own creator console, visual system, topic map, and publishing handoff.

## What This Workflow Does

The complete route is:

1. Read creator defaults and the confirmed creator console.
2. Generate 10 suitable topic options.
3. Wait for the creator to pick one topic.
4. Build the carousel plan, card copy, body copy, tags, and Image 2 full-card prompts.
5. Wait for content approval before image generation.
6. Actually call Image 2 / image generation to create complete cards. Output prompts only if image generation is unavailable or repeatedly fails.
7. Run the 2026 publish safety review.
8. If clean, output a WorkBuddy handoff instruction to upload images, fill title/body/tags, save as draft, and wait for human confirmation.

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
| Publishing operator | WorkBuddy | WorkBuddy / manual / browser automation |
| Safety rules | `references/publish-safety.md` | keep platform rules, add niche-specific rules |

## Current 澄Cc Defaults

- Persona: `00后应届生 / 初入职场新手`.
- Audience: students close to graduation, fresh graduates, and early-career peers with similar confusion.
- Tone: friend-like, real, reflective, not teacher-like.
- AI role: share a method that worked in a real scene; no hard-selling prompts, no AI tool teaching posture.
- Visual default: Style B, young lifestyle-aesthetic magazine cover.
- Visual backup: Style A, Gen-Z emotional sticker poster for strong-emotion topics only.
- Image mode: `image_gen full-card`; final Chinese text is baked into the card after copy lock.

## 2026 Publish Review

The review gate is based on:

- China AI generated/synthetic content labeling rules effective from 2025-09-01.
- Xiaohongshu 2026 AI governance reporting: active AI labeling, anti-AI-account-hosting, anti-fake-experience, anti-infringement, anti-low-quality batch content.
- Standard Xiaohongshu content safety checks: privacy, originality, no misleading claims, no illegal/sensitive content, no fake engagement, no medical/legal/financial/career guarantees.

Before high-risk publishing, refresh platform rules because Xiaohongshu policies can change.

## Recommended Skill Stack

This repo is the orchestration layer. It can work alone, but works best with:

- A creator-specific writing skill, such as `cc-xhs-personal-growth-writer`.
- Image generation / Image 2.
- WorkBuddy for Creator Center operations.
- Optional Xiaohongshu browser/publishing skill for manual fallback checks.

## Install

Copy this repo's skill folder into your agent skills directory:

```bash
cp -R skills/chengcc-xhs-workflow ~/.agents/skills/
```

Then invoke it with a creator profile and console:

```text
用澄Cc默认资料，按中控台确认版，先给我 10 个适合我的选题。
```

## Repo Structure

```text
skills/chengcc-xhs-workflow/SKILL.md
references/brand-profile-chengcc.md
references/workflow-pipeline.md
references/visual-adapter-rules.md
references/publish-safety.md
docs/customize-for-friends.md
docs/workflow-phases.md
docs/publish-review-2026.md
templates/topic-options.md
templates/post-brief.md
templates/carousel-plan.md
templates/workbuddy-handoff.md
examples/sample-input.md
examples/sample-output.md
```

## Safety Boundary

The skill may prepare a WorkBuddy handoff. It should not silently publish. WorkBuddy should upload/fill/save draft and wait for the creator's confirmation unless the current-turn instruction explicitly asks to publish.
