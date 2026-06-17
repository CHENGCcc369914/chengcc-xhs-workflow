# Customize For Friends

This workflow is shareable because it separates the fixed pipeline from creator-specific defaults.

The repo includes two starter creator profiles:

- `references/brand-profile-chengcc.md` for 澄Cc.
- `references/brand-profile-peyson.md` for Peyson.

For a third creator, copy one of those files and replace the slots below.

## Replace These Slots

Ask the friend to provide:

- Account name:
- Confirmed creator console / positioning doc:
- Target readers:
- Persona:
- Content pillars:
- Common real scenes:
- Visual references:
- Main colors:
- Typography preference:
- IP / avatar / symbol / mascot rules:
- Standard character reference image, if any:
- Non-negotiable identity locks, if any:
- AI/tool boundary:
- Hard avoid list:
- Target platform(s):
- Publishing operator:

## Keep These Pipeline Rules

- Read creator defaults before writing.
- Generate 10 topic options first.
- Wait for the creator to pick one topic.
- Draft carousel copy and body copy.
- Wait for content approval before image generation.
- Use Image 2 full-card mode only after copy is locked.
- After image generation, create a fresh per-post `run-manifest.json`.
- Only images with manifest status `pass` and `publish_ready: true` may enter
  the manual upload order.
- Reject stale visuals, old local assets, wrong style routes, copied old
  mascot directions, unreadable text, or copy mismatches before the checklist.
- Select target platform and run publish safety review before the manual publish checklist.
- If cross-posting, review each platform separately.
- The creator manually uploads images, pastes copy, checks labels, and decides whether to publish.

## Replace 澄Cc Defaults

Replace:

- `澄Cc`
- 00后应届生 / 初入职场新手
- ChengCc standard avatar IP
- orange C necklace / orange-C-citrus memory symbols
- Style B healing hand-drawn IP visual
- Style A emotional sticker visual
- graduation / workplace newcomer topics
- Xiaohongshu as the default target platform, if the friend mainly publishes elsewhere
- platform-specific manual publishing instructions

If the friend is Peyson, start from `references/brand-profile-peyson.md` instead of rebuilding from zero.

Keep:

- creator-defaults first
- topic-selection gate
- content-approval gate
- run manifest gate after image generation
- target-platform publish-review gate
- final human publish confirmation

## Minimal Friend Profile Template

```markdown
# Creator Profile

## Positioning

## Target Reader

## Persona

## Content Pillars

## Visual System

## AI / Tool Boundary

## Hard Avoids

## Publishing Handoff

- Image export folder:
- Run manifest required: yes
- Manual upload image source: manifest pass export paths only

## Target Platforms

- xiaohongshu:
- douyin:
- wechat_channels:
- wechat_official_account:
```
