# XHS Carousel Plan

## Format

- Ratio: 3:4
- Page count: 4 by default
- Asset mode: Image 2 full-card after copy lock
- Export folder:
- Visual route: Style B default / Style A strong-emotion backup / custom
- IP / character mode: ChengCc standard avatar / none / custom creator IP
- Text handling: final Chinese text baked into generated cards after approval
- Target platform: xiaohongshu / douyin / wechat_channels / wechat_official_account
- Run ID:
- Run manifest: `run-manifest.json`

## Visual System V2 Design Brief

```json
{
  "content_input": {
    "raw_content": "",
    "source_type": "life_record | work_feedback | emotion_fragment | ai_chat | topic_card | user_comment",
    "context": "",
    "time": "",
    "related_people": "",
    "sensitivity": "low | medium | high"
  },
  "meaning_layer": {
    "core_event": "",
    "user_problem": "",
    "hidden_emotion": "",
    "key_conflict": "",
    "insight": ""
  },
  "emotion_layer": {
    "emotion_type": "clarity | confusion | anxiety | reflection | calm | tension",
    "emotion_intensity": 1,
    "visual_implication": ""
  }
}
```

## Cover

- Main copy:
- Sub copy:
- Visual anchor:
- ChengCc avatar action / expression / prop, if used:
- Layout type: HERO / EDITORIAL
- Zones: HEADER / MAIN / SIDE / FOOTER
- Image 2 prompt:
- Risk note:

## Pages

| Page | Role | Meaning Unit | Emotion | Layout Type | Zones | Card Copy | Visual Direction | Image 2 Prompt Notes | Risk |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Editorial Cover |  |  | HERO / EDITORIAL | HEADER / MAIN / SIDE / FOOTER |  |  |  |  |
| 2 | Emotion Page |  |  | EDITORIAL | HEADER / MAIN / SIDE / FOOTER |  |  |  |  |
| 3 | System Page |  |  | GRID / SPLIT | HEADER / MAIN / SIDE / FOOTER |  |  |  |  |
| 4 | Insight Page |  |  | GRID / EDITORIAL | HEADER / MAIN / SIDE / FOOTER |  |  |  |  |

## Visual Validation

- [ ] Structure: each page has HEADER / MAIN / SIDE / FOOTER zones.
- [ ] Hierarchy: one first-read sentence or primary subject per page.
- [ ] Emotion: visual rhythm matches clarity / confusion / anxiety / reflection / calm / tension.
- [ ] Editorial: feels like a magazine page, not a generic social template.
- [ ] Density: not overloaded; no equal-weight element scatter.
- [ ] Text: Chinese core copy is readable, not overlapped, and not duplicated verbatim in body copy.
- [ ] Authenticity: no fake screenshot, fake metric, borrowed IP, or unrelated character.
- [ ] ChengCc IP lock: if avatar appears, same face/hair/proportion, left ear 2 earlobe earrings, right ear 1 earlobe earring, subtle orange iris ring, visible orange C necklace, orange/C/orange-fruit outfit system.

## Body Copy

```text

```

## Tags

```text

```

## Publish Review

- Target platform:
- AI label:
- Authenticity:
- Originality/IP:
- Privacy:
- Claims:
- Commercial/diversion/activity:
- Platform-specific rules:
- Platform hygiene:
- Decision: pass / revise / block

## Manual Publish Checklist Ready

- [ ] Images/prompts ready.
- [ ] `run-manifest.json` exists in the export folder.
- [ ] Every final page has manifest status `pass`.
- [ ] Failed or stale visual attempts are recorded as rejected and are not listed for upload.
- [ ] Final images copied to export folder only after validation.
- [ ] Source generated paths differ from export paths.
- [ ] Export paths are inside this run's export folder.
- [ ] Card copy hash is a real `sha256:` value, not a placeholder.
- [ ] Title/body/tags final.
- [ ] Target platform selected.
- [ ] Platform review passed.
- [ ] Manual upload/paste checklist included.
