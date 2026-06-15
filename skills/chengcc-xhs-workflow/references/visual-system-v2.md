# Xiaohongshu Visual System V2

This file turns the creator's visual preference into an executable editorial
engine. Use it with `visual-adapter-rules.md`; do not replace creator-specific
voice, IP, palette, or platform rules.

Core rule: this is not "make a pretty card". It is a computable magazine
editing system:

```text
Content input -> Meaning -> Emotion -> Layout -> Editorial visual -> Output -> Feedback -> Rule update
```

## 1. Content Input

Before drafting Image 2 prompts, capture the input as structured material:

```json
{
  "raw_content": "",
  "source_type": "life_record | work_feedback | emotion_fragment | ai_chat | topic_card | user_comment",
  "context": "",
  "time": "",
  "related_people": "",
  "sensitivity": "low | medium | high"
}
```

Rules:

- If the input is only a broad theme, turn it into one visible scene before designing.
- If sensitivity is `medium` or `high`, mask private names, screenshots, locations, workplace details, and identifiable chat content.
- Do not invent a real screenshot or real platform metric. Use a blank frame when the real asset will be inserted later.

## 2. Meaning Layer

Convert the raw input into designable meaning units:

```json
{
  "core_event": "",
  "user_problem": "",
  "hidden_emotion": "",
  "key_conflict": "",
  "insight": ""
}
```

Quality bar:

- Weak: "I was tired" or "I felt bad".
- Usable: "After feedback, I started treating one imperfect draft as proof that I am not good enough."
- Each card should express one of these meaning units. Do not let all four pages repeat the same sentence.

## 3. Emotion Layer

Choose exactly one primary emotion type for the whole post, then allow page-level
variation.

Allowed emotion types:

| Type | Meaning | Visual implication |
|---|---|---|
| `clarity` | seeing the thing clearly | grid, clean alignment |
| `confusion` | not knowing what is true | slight misalignment, scattered but readable blocks |
| `anxiety` | overthinking, urgency | compact rhythm, diagonal pressure, tighter spacing |
| `reflection` | looking back and understanding | more whitespace, calmer pacing |
| `calm` | settled, safe, slowed down | symmetry, low contrast, balanced composition |
| `tension` | emotional conflict or contrast | strong contrast, large headline, split structure |

Output format:

```json
{
  "emotion_type": "clarity | confusion | anxiety | reflection | calm | tension",
  "emotion_intensity": 1,
  "visual_implication": ""
}
```

Use intensity 1-5:

- `1-2`: quiet, reflective, more whitespace.
- `3`: everyday emotional tension, default for 澄Cc.
- `4-5`: strong-emotion topic; consider Style A only if the hook is also strong.

## 4. Layout Engine

Every page must have these four zones, even when one zone is intentionally quiet:

```text
[HEADER] title / section label
[MAIN] primary visual subject
[SIDE] support note / quote / method cue / page number
[FOOTER] whitespace / weak signal / navigation
```

Allowed layout types:

| Layout type | Use for | Structure |
|---|---|---|
| `HERO` | emotional cover or strong character/action page | large subject + large title + minimal support |
| `GRID` | method, AI breakdown, reusable structure | modular blocks + strict alignment |
| `SPLIT` | contrast, decision, before/after | left/right or top/bottom contrast |
| `EDITORIAL` | standard magazine-style Xiaohongshu page | title + subject + support note + whitespace |

Default 4-page route:

| Page | Role | Default layout | Main job |
|---|---|---|---|
| P1 | Editorial Cover | `HERO` or `EDITORIAL` | stop the scroll with one concrete conflict |
| P2 | Emotion Page | `EDITORIAL` | show the real behavior / felt state |
| P3 | System Page | `GRID` or `SPLIT` | separate event, thought, emotion, or next step |
| P4 | Insight Page | `GRID` or `EDITORIAL` | show AI/helpful evidence and one small action |

## 5. Editorial Visual Engine

Use this prompt spine, then adapt the palette/IP/copy from
`visual-adapter-rules.md`:

```text
Editorial magazine layout, high-end Japanese lifestyle editorial style,
clean grid system, strong typographic hierarchy, large readable Chinese headline,
one primary visual subject, minimal clutter, high white space ratio,
soft neutral warm palette with controlled orange/blue accents,
designed composition, not a generic social media post
```

Emotion enhancer, when needed:

```text
add subtle emotional distortion: slight asymmetry in layout,
intentional spacing imbalance, to express internal emotional state,
while preserving readability and hierarchy
```

Hard avoid:

- sticker style as the default
- scrapbook collage chaos
- random decoration
- equal visual weight elements
- no-hierarchy layouts
- generic social template look
- fake screenshots, borrowed IP, unrelated characters, or misleading app UI

## 6. Four-Page V2 Standard

P1 Cover:

- strong title
- one main visual subject
- high-contrast whitespace
- one obvious first-read sentence

P2 Emotion Page:

- raw state
- emotional behavior
- readable but less structured than P3
- the scene should show what the creator did or felt

P3 System Page:

- AI / reflection / method
- modular structure
- quietly separates fact, interpretation, emotion, and next step
- avoid lecturing with method terms too early

P4 Insight Page:

- AI answer, screenshot frame, or distilled next action
- light conclusion
- one small action or question
- screenshot area must be real, blank, or clearly marked as placeholder

## 7. Visual Validation Gate

Run this before accepting Image 2 prompts or generated cards.

Structure:

- Does every page have HEADER, MAIN, SIDE, and FOOTER zones?
- Is there one primary visual subject per page?
- Is the first-read sentence obvious at mobile size?

Emotion:

- Is the emotion type selected and consistent?
- Does the layout match the selected emotion implication?
- Does intensity match Style A/B choice?

Editorial:

- Does the card feel like a magazine/editorial page rather than a generic social template?
- Is typography a designed hierarchy rather than system-font blocks?
- Is whitespace intentional rather than empty by accident?

Information density:

- Is the page overloaded?
- Are card text and body copy non-duplicative?
- Are decorative labels, IP, and icons secondary?

Reject and revise if:

- all elements have equal visual weight
- emotion is only written as text but not reflected in layout
- the card is pretty but the structure is unclear
- decoration breaks the magazine logic
- Chinese core text is unreadable, overlapped, or too small

## 8. Feedback Data

After publishing, record visual performance as structured feedback:

```json
{
  "post_id": "",
  "performance": {
    "views": "",
    "saves": "",
    "comments": "",
    "engagement_rate": ""
  },
  "visual_feedback": "",
  "what_worked": "",
  "what_failed": "",
  "rule_update": ""
}
```

Only update the visual rules when the signal is repeated or clearly tied to
the visual system. One post can create a hypothesis; repeated performance can
change the rubric.
