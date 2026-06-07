# ChengCc XHS Workflow

A shareable Xiaohongshu image-text workflow for creators who want to turn one topic or personal scene into a complete carousel package and a semi-automated publishing flow.

This repo is designed around the account example `澄Cc`, but the workflow is reusable. Friends can replace the brand profile and keep the same pipeline.

## What This Workflow Does

It turns a raw topic, draft, story, screenshot, or idea into:

1. A content brief.
2. Xiaohongshu title options.
3. Cover copy and carousel page structure.
4. Page-by-page visual direction.
5. Image-generation prompts or text-image instructions.
6. Publish-ready body copy, tags, and comment CTA.
7. A publishing checklist.
8. Optional handoff to browser automation, stopping before the final publish click.

## Recommended Skill Stack

This repo is the orchestration layer. It works best with:

- Content writing layer: your own writing skill or the included fallback template.
- Visual direction layer: [`xhs-visual-director-skill`](https://github.com/ziguishian/xhs-visual-director-skill).
- Publishing operation layer: [`xiaohongshu-ops-skill`](https://github.com/Xiangyu-CAS/xiaohongshu-ops-skill).

The workflow does not copy those projects. It references them as dependencies and adds account-specific rules, output contracts, and safety gates.

## Install

Copy this repo's skill folder into your agent skills directory:

```bash
cp -R skills/chengcc-xhs-workflow ~/.agents/skills/
```

Then install or enable the recommended dependencies according to your own agent environment:

```text
Install or enable xhs-visual-director-skill
Install or enable xiaohongshu-ops-skill
```

If the dependencies are not available, the workflow still outputs a complete manual posting package.

## Trigger Examples

```text
用澄Cc小红书工作流，把这个主题做成一篇图文：朋友没回消息，我脑子里演了三集
```

```text
帮我一键配置一篇小红书图文，停在发布前让我确认
```

```text
把这段经历做成小红书 8 页图文，并给我封面和每页提示词
```

## Default Safety Rule

The workflow stops before clicking the final publish button. This is intentional:

- It avoids accidental posting.
- It allows the creator to check personal details.
- It reduces account and compliance risk.

## Repo Structure

```text
skills/chengcc-xhs-workflow/SKILL.md
references/brand-profile-chengcc.md
references/workflow-pipeline.md
references/visual-adapter-rules.md
references/publish-safety.md
templates/post-brief.md
templates/carousel-plan.md
examples/sample-input.md
examples/sample-output.md
docs/customize-for-friends.md
```

## Credits

This workflow is designed to orchestrate existing public skills:

- `xhs-visual-director-skill` by ziguishian, MIT License.
- `xiaohongshu-ops-skill` by Xiangyu-CAS.

