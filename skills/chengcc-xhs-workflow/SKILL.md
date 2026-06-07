---
name: chengcc-xhs-workflow
description: "Use this skill whenever the user wants to turn a topic, personal scene, draft, screenshot, product idea, or rough thought into a Xiaohongshu image-text carousel package, especially when they say 一键配置图文, 小红书图文工作流, 澄Cc, 生成封面和轮播页, or 推进到发布页. This skill orchestrates content writing, xhs-visual-director-style visual planning, image prompt generation, publish-ready copy, and a safety-gated Xiaohongshu publish handoff."
---

# ChengCc Xiaohongshu Image-Text Workflow

This is an orchestration skill. It does not replace visual design or publishing skills. It coordinates them into one reliable workflow:

Topic or scene -> content core -> carousel visual plan -> image prompts/assets -> publish package -> optional semi-automated posting.

## 0. Dependency Awareness

Prefer the available local skills when they exist:

- Use `xhs-visual-director` or `xhs-visual-director-skill` for page-by-page visual direction, cover hierarchy, 3:4 carousel design, and visual review.
- Use `xiaohongshu-ops` for Xiaohongshu browser operations, uploads, publish-page navigation, and the final pre-publish checkpoint.
- Use a content writer skill if present. If not present, use the content rules in this skill and the templates in this repo.

If a dependency is unavailable, do not fail. Degrade gracefully:

- Without visual-director: still produce the carousel plan and prompts.
- Without browser/publishing tool: output a manual copy-paste publishing package.
- Without image generation: output image prompts and text-image layout instructions.

## 1. Read Only What Is Needed

For `澄Cc`, read:

1. `references/brand-profile-chengcc.md`
2. `references/workflow-pipeline.md`
3. `references/visual-adapter-rules.md`
4. `references/publish-safety.md`

For another creator, read `docs/customize-for-friends.md` and ask for or infer a replacement brand profile.

For output formatting, use:

- `templates/post-brief.md`
- `templates/carousel-plan.md`

## 2. Brand Default: 澄Cc

Default identity:

- Account name: `澄Cc`
- Avatar/visual symbol: `Cc`, orange, diary/recording feeling.
- Persona: a newly working friend who reflects carefully.
- Audience: workplace newcomers, people who want to become clearer, personal-growth readers, AI beginners.
- Content: relationships, self-doubt, emotion stuck points, diary/recording, AI as a small next-step helper.
- Tone: friend-like, real, reflective, not preachy.

Default visual:

- Warm cream paper.
- Orange as energy accent.
- Diary, notes, light, paper texture, small real-life traces.
- Clean but not sterile.
- Human and natural before "tech".

Avoid:

- Cold AI tech style.
- Glossy app-icon style.
- Overly childish orange mascot.
- Guru language.
- Heavy sales pitch.

## 3. Workflow

### Step 1: Intake

Classify the input:

- Topic only.
- Personal scene.
- Full draft.
- Screenshot/reference image.
- Product or AI workflow idea.
- Existing note that needs visual packaging.

Extract:

- Core message.
- Target reader.
- Reader emotion.
- Desired action: collect, comment, save, DM, or publish.
- Risk level: private story, relationship, workplace, emotional health, product hint.

If input is thin, do not ask many questions first. Produce a usable v1 and list what extra details would improve it.

### Step 2: Content Core

Produce a compact content brief:

- One-sentence point.
- Real or simulated scene.
- Wrong interpretation or stuck point.
- New angle.
- AI next-step action, only if it genuinely helps.
- One small action readers can do today.

### Step 3: Visual Direction

Use the visual director layer if available. Apply `references/visual-adapter-rules.md` before asking it for output.

The visual plan must include:

- Recommended style.
- Styles to reject.
- Cover hierarchy.
- Page count, usually 6-8 pages.
- Page-by-page layout.
- Per-page visual prompt or text-image instruction.
- Readability checks for mobile.

### Step 4: Asset Plan

Choose one of three asset modes:

1. Platform text-image mode: best when words must be precise.
2. Generated-image mode: best for atmosphere or symbolic backgrounds.
3. Hybrid mode: generated background + platform or design-tool text overlay.

For Xiaohongshu covers, prefer precise text overlays outside the image model when the title must be exact.

### Step 5: Publish Package

Output:

- Title options, at least one under 20 Chinese characters.
- Final selected title.
- Cover copy.
- Page-by-page carousel copy.
- Body text.
- Tags, 5-8.
- Comment CTA.
- Publish notes and privacy edits.

### Step 6: Optional Publish Handoff

If `xiaohongshu-ops` and browser automation are available:

1. Confirm image files exist or choose text-image mode.
2. Open Xiaohongshu publishing page.
3. Enter image-text flow.
4. Upload or create cover/images.
5. Fill title and body.
6. Append tags.
7. Validate cover/title/body.
8. Stop before the final publish click.

Never click the final publish button unless the user explicitly confirms in the current turn.

## 4. Default Output Contract

Use this structure unless the user asks for another format:

```markdown
## 任务判断
- 输入类型：
- 目标读者：
- 传播目标：
- 推荐图文模式：

## 内容内核
- 一句话观点：
- 场景：
- 卡住点：
- 换个角度：
- AI 小动作：
- 读者行动：

## 视觉方向
- 推荐风格：
- 不建议风格：
- 封面结构：
- 画幅：
- 色彩与材质：

## 图文配置
1. 封面：
2. 第 2 页：
3. 第 3 页：
4. 第 4 页：
5. 第 5 页：
6. 第 6 页：
7. 结尾页：

## 图像 / 版式 Prompt
- 封面：
- 内页通用：
- 关键页：

## 发布文案
- 标题：
- 正文：
- 标签：
- 评论区引导：

## 发布前检查
- 字数：
- 隐私：
- 误导承诺：
- AI 是否过度：
- 是否停在发布前：
```

## 5. Quality Gate

Before finishing, check:

- Is the account voice friend-like rather than teacher-like?
- Does the carousel have a save-worthy structure?
- Is the cover readable on a phone?
- Is orange used as a symbol, not as noisy decoration?
- Is AI a small helper, not the protagonist?
- Is there no medical, mental-health treatment, legal, financial, or guaranteed-outcome claim?
- If publishing was attempted, did the workflow stop before the final publish click?

