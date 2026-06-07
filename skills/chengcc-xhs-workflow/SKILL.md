---
name: chengcc-xhs-workflow
description: "Use this skill whenever the user wants to turn a topic, personal scene, draft, screenshot, product idea, or rough thought into a Xiaohongshu image-text carousel package, especially when they say 一键配置图文, 小红书图文工作流, 澄Cc, 生成封面和轮播页, Image 2 出图, or 推进到发布页. This skill orchestrates content writing, xhs-visual-director-style visual planning, default Image 2/image_gen visual generation, publish-ready copy, and a safety-gated Xiaohongshu publish handoff."
---

# ChengCc Xiaohongshu Image-Text Workflow

This is an orchestration skill. It does not replace visual design or publishing skills. It coordinates them into one reliable workflow:

Topic or scene -> content core -> carousel visual plan -> image prompts/assets -> publish package -> optional semi-automated posting.

## 0. Default Image Generation

Default mode is `image_gen hybrid`.

Unless the user explicitly says not to generate images, assume the workflow should call Codex image generation / Image 2 after the content core and visual direction are ready. If the `image_gen` tool is available, use it directly.

Use image generation for:

- cover background or symbolic visual
- inner-page backgrounds
- orange/Cc visual motifs
- diary, paper, desk, note, chat, light, shadow, and emotional atmosphere

Do not rely on image generation for exact Chinese text. Generate clean backgrounds or symbolic visuals first, then provide exact Chinese text as overlay copy for Xiaohongshu, Figma, Canva, HTML, or another design layer.

If the image generation tool is unavailable, degrade to a prompt pack and say that images were not generated in this run.

If the user provides no visual preference, generate 1 cover background and 3 reusable inner-page background directions rather than asking first.

## 1. Dependency Awareness

Prefer the available local skills when they exist:

- Use `xhs-visual-director` or `xhs-visual-director-skill` for page-by-page visual direction, cover hierarchy, 3:4 carousel design, and visual review.
- Use `xiaohongshu-ops` for Xiaohongshu browser operations, uploads, publish-page navigation, and the final pre-publish checkpoint.
- Use a content writer skill if present. If not present, use the content rules in this skill and the templates in this repo.

If a dependency is unavailable, do not fail. Degrade gracefully:

- Without visual-director: still produce the carousel plan and prompts.
- Without browser/publishing tool: output a manual copy-paste publishing package.
- Without image generation: output image prompts and text-image layout instructions.

## 2. Read Only What Is Needed

For `澄Cc`, read:

1. `references/brand-profile-chengcc.md`
2. `references/workflow-pipeline.md`
3. `references/visual-adapter-rules.md`
4. `references/publish-safety.md`

For another creator, read `docs/customize-for-friends.md` and ask for or infer a replacement brand profile.

For output formatting, use:

- `templates/post-brief.md`
- `templates/carousel-plan.md`

## 3. Brand Default: 澄Cc

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

## 4. Workflow

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

Use `image_gen hybrid` as the default asset mode. Other modes are fallbacks:

1. Platform text-image mode: best when words must be precise.
2. Generated-image mode: best for atmosphere or symbolic backgrounds.
3. Hybrid mode: generated background + platform or design-tool text overlay.

Default to hybrid mode. For Xiaohongshu covers, keep precise Chinese text outside the image model when the title must be exact.

When image generation is available, generate:

- 1 cover background
- 2-4 reusable inner-page backgrounds
- optional ending-page background if the CTA needs a different mood

Name each generated asset by intended page use. If files cannot be emitted or saved, still output the prompts and overlay text clearly.

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

## 5. Default Output Contract

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
- Image 2 生成状态：
- 文字叠加说明：

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

## 6. Quality Gate

Before finishing, check:

- Is the account voice friend-like rather than teacher-like?
- Does the carousel have a save-worthy structure?
- Is the cover readable on a phone?
- Is orange used as a symbol, not as noisy decoration?
- Is AI a small helper, not the protagonist?
- Were images generated by default when the tool was available?
- Is all exact Chinese text handled as overlay copy rather than baked into generated images?
- Is there no medical, mental-health treatment, legal, financial, or guaranteed-outcome claim?
- If publishing was attempted, did the workflow stop before the final publish click?
