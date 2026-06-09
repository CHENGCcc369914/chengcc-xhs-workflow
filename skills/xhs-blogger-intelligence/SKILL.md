---
name: xhs-blogger-intelligence
description: "Use this skill whenever the user wants Xiaohongshu benchmark blogger monitoring, watchlist maintenance, redbook-based public post collection, note-card distillation, blogger-profile updates, or a RAG brief for a writing workflow. Triggers include 对标博主, 博主动态采集, 监测最新动态, watchlist, redbook采集, note-card, blogger-profile, RAG brief, 给 cc-xhs-personal-growth-writer 提供参考, or 小红书博主情报层."
---

# XHS Blogger Intelligence Skill

This is an upstream intelligence skill for Xiaohongshu content creation.

It does not write final posts, generate Image 2 cards, or publish drafts. It collects and distills public benchmark-blogger signals, then outputs a RAG brief that a writer skill can use.

Default integration:

Public benchmark posts -> note-cards -> blogger-profiles -> RAG brief -> `cc-xhs-personal-growth-writer` -> `chengcc-xhs-workflow`.

## 0. Boundary

This skill should:

- maintain a replaceable watchlist
- collect public Xiaohongshu post metadata and text through an approved adapter
- normalize collection results
- distill each useful note into a note-card
- update each blogger's profile
- output topic-specific RAG briefs

This skill should not:

- copy large amounts of original post text into shareable output
- publish, like, follow, comment, scrape private content, or bypass access controls
- store cookies, tokens, or private credentials in this repo
- invent latest-post data when collection fails
- replace `cc-xhs-personal-growth-writer` or `chengcc-xhs-workflow`

## 1. Required Reads

For every run, read only the files needed for the request:

1. `docs/data-flow.md`
2. `docs/redbook-adapter.md`
3. `templates/watchlist.schema.json`

For distillation or RAG work, also read:

4. `templates/note-card.md`
5. `templates/blogger-profile.md`
6. `templates/rag-brief.md`

For 澄Cc default watchlist, read:

7. `examples/watchlist-chengcc.example.json`

## 2. Replaceable Slots

| Slot | 澄Cc default | Friend replacement |
|---|---|---|
| Watchlist | `examples/watchlist-chengcc.example.json` | own benchmark accounts |
| Creator niche | 00后应届生 / 情绪成长 / AI复盘分享 | own niche |
| Adapter | redbook CLI after smoke test | own collector / manual URLs |
| Storage root | local private Raw / Output folders | own local folder |
| Distillation schema | note-card + blogger-profile | own fields if needed |
| RAG consumer | `cc-xhs-personal-growth-writer` | own writer skill |

## 3. Workflow

### Phase A: Load Watchlist

Validate the watchlist against `templates/watchlist.schema.json`.

Before collecting, check:

- account id or profile URL exists
- account status is `active`, `paused`, `pending_id_confirmation`, or `needs_name_confirmation`
- collection cadence is reasonable
- duplicate accounts are merged
- private notes and public examples are kept separate

If account identity is uncertain, do not collect under a guessed id. Mark it `pending_id_confirmation`.

### Phase B: Collect Public Notes

Use `docs/redbook-adapter.md` as the adapter contract.

Collection order:

1. One-account smoke test before the first real batch.
2. Daily or manual low-frequency collection.
3. Store raw adapter output in a private/local collection folder.
4. Keep raw outputs append-only.
5. Record errors and fallbacks.

If redbook is unavailable or returns incomplete data, use fallback modes:

- manual post URLs supplied by the user
- browser-visible public page summary
- previously collected raw data

Do not pretend collection succeeded if the adapter failed.

### Phase C: Normalize

Normalize each collected item into a stable post record:

- platform
- account id
- account display name
- post id / URL
- title
- publish time if visible
- engagement snapshot if visible
- media count / format
- short excerpt or paraphrase
- collection source
- collection timestamp

Keep exact long original text in private raw storage only when allowed and needed. Long-term shareable summaries should be paraphrased.

### Phase D: Build Note-Cards

Use `templates/note-card.md`.

Distill the reusable structure, not the blogger's wording.

Each note-card should capture:

- surface topic
- underlying emotional job
- hook mechanism
- structure
- visual / format pattern
- comment trigger
- what 澄Cc can borrow
- what 澄Cc must not copy

### Phase E: Update Blogger-Profiles

Use `templates/blogger-profile.md`.

Update a blogger-profile when there are enough recent posts or a strong new pattern.

Track:

- repeated topics
- title habits
- opening habits
- structure habits
- visual habits
- average body/card split
- audience resonance mechanism
- current 7-day signal
- stable 30-day signal

Do not over-update a profile from one weak post.

### Phase F: Produce RAG Brief

Use `templates/rag-brief.md`.

For a specific writing topic, retrieve:

- relevant recent note-cards
- stable blogger-profile patterns
- title/hook options to learn from
- structure options to learn from
- visual/page logic references
- risks and do-not-copy notes

The RAG brief should be short enough to paste into a writing workflow.

### Phase G: Handoff To Writer

Pass only the useful brief to the writer skill.

For 澄Cc, the downstream handoff should say:

```text
Use this RAG brief as benchmark context. Learn structure and rhythm only. Do not copy phrases, private stories, or creator-specific experiences.
Then use cc-xhs-personal-growth-writer and chengcc-xhs-workflow to produce the selected post.
```

## 4. Default Output Contract

Use this structure unless the user asks for a specific file or template:

```markdown
## Watchlist Status
- Watchlist source:
- Accounts checked:
- Accounts active:
- Accounts needing confirmation:
- Collection mode:

## Collection Result
- Adapter:
- Time window:
- New public notes found:
- Failed accounts:
- Raw storage:

## Distillation Result
- Note-cards created:
- Blogger-profiles updated:
- Duplicates skipped:

## RAG Brief
- Topic:
- Best references:
- Reusable structures:
- Title/hook lessons:
- Visual/page lessons:
- Do-not-copy:
- Handoff to writer:

## Next Step
- Ready for writer: yes / no
- Missing data:
- Suggested next action:
```

## 5. Quality Gate

Before finishing, verify:

- Did the run use a valid watchlist?
- Were duplicate or uncertain accounts handled explicitly?
- Was collection status reported honestly?
- Were public raw outputs kept local/private?
- Were note-cards paraphrased rather than copied?
- Did blogger-profile updates avoid overfitting one weak signal?
- Did the RAG brief explain what to borrow and what not to copy?
- Did the handoff avoid replacing the writing workflow?
