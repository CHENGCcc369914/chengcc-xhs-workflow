# Complete Workflow Phases

## 1. Creator Defaults

Read creator-specific materials first:

- default profile
- confirmed media console
- visual system
- content pillars
- target readers
- examples of approved style
- hard avoids

For 澄Cc, the current confirmed route is:

- 00后应届生 / 初入职场新手
- peers who are in school, close to graduation, or just started working
- Style B default, Style A backup
- AI as a method share

## 2. Topic Selection

Output 10 candidate topics before drafting.

Each topic must be usable, specific, and tied to the creator's position.

Do not write a finished carousel until the creator picks one.

## 3. Draft And Confirm

For the selected topic:

- create 4-page carousel copy
- body copy
- tags
- comment CTA
- Image 2 prompts

Then ask for approval before generation.

## 4. Image Generation

Use Image 2 full-card prompts after card text is locked.

After content approval, the agent should actually call the image generation / Image 2 tool when it is available.

Do not treat prompt output as completed image generation.

If Image 2 fails, retry once with a shorter prompt. If it still fails, output the prompt pack and mark the image step as blocked by tool failure.

Do not default to post-added text.

If text changes, regenerate.

## 5. Review

Run 2026 publish review after selecting the target platform:

- `xiaohongshu`
- `douyin`
- `wechat_channels`
- `wechat_official_account`

Check:

- AI labeling
- authenticity
- originality
- privacy
- claims
- commercial/diversion/activity risks
- platform-specific rules
- platform hygiene

If cross-posting, run one review per platform. If blocked, revise before publishing.

## 6. Manual Publish Checklist

Output one precise checklist for the creator's manual publishing flow:

- target platform and draft surface
- where to publish
- image order
- title
- body
- tags
- AI label
- platform review result
- final human checks: image order, typo, tags, privacy masking, AI disclosure

The creator manually uploads images, pastes title/body/tags, and decides whether to click publish.

## 7. Performance Loop

After the final package is ready, run the performance loop from `docs/performance-loop.md` and `templates/performance-loop.md`.

This phase exists to make the workflow improve over time:

- score the final content package before publishing
- predict likely performance before looking at data
- record actual platform data after publishing
- compare prediction and reality
- update the creator rubric carefully

Do not fabricate platform metrics. If the post has not been published or no data is available, output only the pre-publish score, prediction, and an empty retro shell.

Do not overfit one post. One post can suggest a hypothesis; repeated signals across posts can update the rubric.
