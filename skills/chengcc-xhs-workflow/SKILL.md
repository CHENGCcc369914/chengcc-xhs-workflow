---
name: chengcc-xhs-workflow
description: "Use this skill when the user wants a complete Xiaohongshu-first image-text workflow from creator defaults / media console to topic options, carousel copy, Image 2 full-card prompts, platform publish-safety review, and WorkBuddy draft handoff. Triggers include 澄Cc默认资料, 中控台确认版, 10个选题, 4页图文, Image 2完整卡片, 小红书工作流, 2026发布审核, WorkBuddy发布草稿, or shareable skill for friends."
---

# ChengCc Xiaohongshu Workflow Skill

This is a shareable orchestration skill:

Creator defaults -> confirmed console -> 10 topics -> user picks one -> carousel plan -> content approval -> Image 2 full-card generation -> platform publish review -> WorkBuddy draft handoff.

It ships with 澄Cc defaults, but must be customizable for other creators.
All referenced `docs/`, `references/`, `templates/`, and `examples/` paths are
relative to this skill folder.

## 0. Replaceable Creator Slots

Before creating content, identify these slots:

| Slot | 澄Cc default | Friend replacement |
|---|---|---|
| Creator profile | `references/brand-profile-chengcc.md` | own profile |
| Confirmed console | 澄Cc self-media console / default资料 | own creator console |
| Visual style | `references/visual-adapter-rules.md` | own visual rules |
| Topic map | graduation / relationships / early career / self-doubt / AI sharing | own content pillars |
| Image mode | Image 2 full-card | own image model/style |
| Image export folder | `/Users/ccc/Pictures/小红书运营图片` for 澄Cc | own local publishing-image folder |
| Publishing handoff | WorkBuddy draft for Xiaohongshu by default | own target platform and operator/manual flow |

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

If the active environment also has `cc-xhs-personal-growth-writer`, use it for 澄Cc content voice and local console lookup.

For another creator:

1. `docs/customize-for-friends.md`
2. the creator's own profile / console / visual reference
3. `references/workflow-pipeline.md`
4. `references/publish-safety.md`
5. `docs/publish-review-2026.md`
6. `docs/platform-publish-rules-2026.md`

## 2. Workflow Phases

### Phase A: Topic Options

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

### Phase B: Carousel Draft

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

### Phase C: Content Approval Gate

Ask the user to confirm:

- card copy
- body copy
- visual route
- whether AI chat screenshot is needed
- whether image generation should run now

If edits are requested, revise copy first. Then regenerate Image 2 prompts.

### Phase D: Image 2 Full-Card Production

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
- If only prompts were produced, do not mark the workflow as ready for WorkBuddy image upload.
- After images are generated, copy the final publish-ready images to the creator's image export folder and use those copied paths in the WorkBuddy handoff. Keep the original generated files in place.

If the user changes card text after images are generated, regenerate the affected image. Do not patch text by default.

### Phase E: Publish Review

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

If clean, continue to WorkBuddy handoff.

### Phase F: WorkBuddy Draft Handoff

Output a precise WorkBuddy instruction using `templates/workbuddy-handoff.md`.

The instruction should say:

- target platform and draft surface
- upload images in order
- fill title/body/tags
- mark AI-generated/AI-assisted content according to the target platform rules when final cards were generated by Image 2 or other AI tools
- if no platform AI label field is visible, include the disclosure text required by the review in the body/caption
- save as draft or stop before publish
- do not click final publish unless the current user explicitly says so

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

## WorkBuddy 草稿指令
...
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
- Does WorkBuddy stop at draft / pre-publish unless explicitly told to publish?
