# 2026 Platform Publish Review

This file is a practical review gate, not legal advice. It should be run after final card prompts/images and before the manual publish checklist.

## Current Baseline

As of 2026-06-08, the review combines:

1. China's AI generated/synthetic content labeling requirements.
2. The creator-provided 2026 platform norm documents.
3. General publishing hygiene for image-text, video, article, and short-video drafts.

For platform details, read `docs/platform-publish-rules-2026.md`.

## Required Platform Selection

Before review, set one or more target platforms:

- `xiaohongshu`: 小红书
- `douyin`: 抖音
- `wechat_channels`: 微信视频号
- `wechat_official_account`: 微信公众号

Default to `xiaohongshu` only when the user is clearly making a Xiaohongshu post and no other platform is named.

If cross-posting, review each platform separately.

## Common Rules

### AI Generated / Synthetic Content

If the post uses Image 2 or another AI tool to generate final cards, images, videos, voice, virtual people, or synthetic materials:

- mark AI-generated / AI-assisted content in the target platform's label field when available
- do not remove or falsify AI labels / metadata
- do not make AI-generated content look like a real photo, real screenshot, real person, real event, or real proof unless it is clearly framed as generated or illustrative
- keep the creator's real expression and human involvement, especially for 微信公众号

### AI Abuse

Reject:

- AI托管账号
- AI 自动模拟真人互动
- AI 编造个人经历
- fake AI chat screenshots
- fake comments, endorsements, data, outcomes, or before/after proof
- batch-generated low-quality template posts

### Rights

Reject:

- copied creator images, scripts, captions, card layouts, or cover structures
- borrowed IP, copyrighted characters, celebrity likeness, unauthorized brand/logo use, or unlicensed artwork
- unauthorized music, video, fonts, reposted content, chat records, user cases, reviews, or third-party screenshots

### Personal-Growth Claims

Revise:

- mental-health treatment or diagnosis language
- medical, legal, tax, finance, investment, or career guarantees
- shame-based or manipulative wording
- absolute claims such as `一定有效`, `保证`, `100%`, `彻底`, `全网最低`

### Commercial / Activity / Diversion Risk

Revise or block:

- unclear ads, sponsorships, cooperation, product placement, affiliate, gift, lottery, welfare, or activity rules
- false urgency, fake scarcity, fake price advantage, or unsupported comparison
- private-domain diversion, external transaction guidance, or contact-method bait that conflicts with the target platform
- personal information collection without privacy purpose clarity

## Platform-Specific Review

After the common rules, apply the matching section in `docs/platform-publish-rules-2026.md`:

- 小红书: real sharing, AI declaration, fake marketing note risk, body not duplicating card text, privacy and IP hygiene.
- 抖音: short-video/image-text labels, AI label, no false urgency, no illegal private-domain diversion, rights and commercial claim checks.
- 微信视频号: prominent AI/source label, finance convention, WeChat ecosystem risk, privacy in chats/orders/nicknames/avatars.
- 微信公众号: human substantive involvement, no AI full replacement, source marking, copyright authorization, no non-compliant inducement, privacy policy for collection.

## Review Decision

Use three outcomes:

- `pass`: ready for manual upload/paste/publish checklist
- `revise`: fix listed issues, then rerun review
- `block`: do not create a platform draft without creator/legal/platform review

## Output

```markdown
## 2026 发布审核
- 目标平台：
- AI / 合成内容标识：
- 真实性 / 人设：
- 原创与版权：
- 隐私：
- 内容承诺：
- 商业 / 导流 / 活动：
- 平台专项风险：
- 结论：pass / revise / block
- 需要修改：
```

## Refresh Sources

- CAC AI generated/synthetic content labeling rules: https://www.cac.gov.cn/2025-03/14/c_1743654684782215.htm
- CAC Q&A on labeling requirements: https://www.cac.gov.cn/2025-03/14/c_1743654685896173.htm
- Creator-provided 2026 platform norm documents for 小红书, 抖音, 微信视频号, and 微信公众号.
