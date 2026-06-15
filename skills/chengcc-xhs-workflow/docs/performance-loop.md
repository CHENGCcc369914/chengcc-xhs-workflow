# Performance Loop

Run this after the content package is locked and again after the post has real platform data.

The loop is inspired by score / predict / retro / rubric thinking:

1. Score the draft before final publish.
2. Predict what will happen before looking at actual data.
3. Compare actual results against the prediction.
4. Update the creator rubric only when the signal is useful.

This is not a scraping or automation layer. It is a decision and learning layer. Use platform screenshots, creator-provided data, platform analytics, or an approved analytics source for actual numbers.

## When To Run

Run before final publish when:

- cards, body, title, tags, and platform review are final
- the manual publish checklist is ready or the creator is about to publish
- the user asks for `score`, `predict`, `发布前打分`, or `发布前评估`

Run after publish when:

- the user says the post is published
- 24-hour / 72-hour / 7-day data is available
- the user provides analytics screenshots or platform data exports
- the user asks for `复盘`, `retro`, `数据怎么样`, or `更新 rubric`

If data is not available, do not invent numbers. Output a blank retro template and list the data needed.

## Score

Use a 100-point score. Keep scoring practical, not academic.

Default dimensions:

| Dimension | Points | What To Check |
|---|---:|---|
| Creator fit | 15 | Fits persona, audience, topic pillars, and current console |
| Hook strength | 15 | One-glance readable, concrete, same-circle resonance |
| Carousel clarity | 15 | 4 pages have clear hierarchy and no repeated filler |
| Body value | 10 | Body adds lived feeling or context instead of repeating cards |
| Visual distinctiveness | 15 | Looks like the creator's system, not generic template output |
| Visual System V2 execution | Included in visual distinctiveness | Meaning is clear, emotion maps to layout, layout zones exist, editorial feel is present, density is controlled |
| AI role | 10 | AI appears naturally as a helper, not a sales pitch or tutorial |
| Save/comment potential | 10 | Gives readers something to collect, reflect on, or comment about |
| Platform safety | 10 | Passes platform review, privacy, AI label, originality, claims |

Decision guide:

- `85-100`: publish-ready; only minor polish if needed
- `70-84`: usable, but revise the weakest dimension before publishing if time allows
- `50-69`: hold and revise; one core part is probably unclear
- `<50`: do not publish as-is

## Predict

Predictions are useful only if they are written before seeing actual data.

Predict:

- 24-hour views / likes / saves / comments / follows
- 72-hour views / likes / saves / comments / follows
- likely comment themes
- likely strongest page
- likely weakest page
- highest-risk assumption

For a new or changing account, use ranges instead of precise numbers.

## Retro

Use real data only.

Compare:

- prediction vs actual
- hook performance vs body/card value
- save rate vs comment rate
- follower conversion vs topic fit
- visual performance vs content performance
- timing/distribution noise vs content-quality signal
- Visual System V2 hypothesis vs actual signal: which page role, layout type, visual subject, or hierarchy choice likely helped or hurt

Then answer:

- What did we learn?
- What should repeat?
- What should change next time?
- What should not be copied again?

## Rubric Update

Rubric updates should be small and evidence-bound.

Allowed updates:

- title pattern to try again
- topic angle to continue / pause
- visual move to reuse / avoid
- Visual System V2 rule to test next: page role, emotion-layout mapping, layout type, visual subject, typography hierarchy, whitespace ratio, or density control
- body length or CTA adjustment
- AI appearance level
- publish timing hypothesis

Avoid:

- rewriting the whole strategy after one post
- chasing vanity metrics without save/comment/follow context
- using fake engagement or bait tactics
- treating platform distribution noise as content truth

If the signal is weak, write `no rubric change; keep observing`.
