# Workflow Pipeline

## Layer 1: Content Core

Goal: turn a raw scene into a small point worth saving.

Output:

- topic
- reader pain
- real or simulated scene
- stuck interpretation
- new angle
- AI prompt or next-step action
- title candidates
- body copy
- comment CTA

## Layer 2: Visual Direction

Goal: turn the content into a 3:4 Xiaohongshu carousel.

Use `xhs-visual-director-skill` when available.

Input to visual director:

- content core
- target reader
- save/comment goal
- brand profile
- visual adapter rules
- page count

Output from visual director:

- style judgment
- cover hierarchy
- page-by-page structure
- image prompts
- visual review checklist

## Layer 3: Asset Production

Default to `image_gen hybrid`:

- Generate cover and inner-page background visuals with Codex image generation / Image 2.
- Keep exact Chinese text as overlay copy in Xiaohongshu, Figma, Canva, HTML, or another design layer.
- Do not ask the user to request image generation each time; assume it is part of the workflow.

Fallback modes:

- Text-image mode: use Xiaohongshu platform "文字配图" or a design tool for exact text.
- Generated-background mode: generate background/visuals, add exact text elsewhere.
- Full image generation mode: use only when text accuracy is not critical.

Rule: exact Chinese cover text should not depend entirely on an image generation model.

Default output from this layer:

- 1 generated cover background.
- 2-4 reusable generated inner-page backgrounds.
- exact overlay text for every page.
- prompt pack as fallback if the image tool is unavailable.

## Layer 4: Publish Package

Package everything:

- final title
- cover
- image list or text-image instructions
- body copy
- tags
- comment CTA
- privacy edits

## Layer 5: Publishing Operation

Use `xiaohongshu-ops-skill` when available.

Safe path:

1. Upload image-text note.
2. Add images or generate text image.
3. Fill title.
4. Fill body and tags.
5. Check title length.
6. Check cover/title/body exist.
7. Stop before final publish click.
