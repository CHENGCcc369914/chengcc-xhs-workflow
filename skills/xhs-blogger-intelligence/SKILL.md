---
name: xhs-blogger-intelligence
description: "Xiaohongshu benchmark and RAG intelligence layer. Use when the user wants 对标博主, 博主动态采集, watchlist maintenance, redbook/public post collection, local low-follower/high-performing case retrieval, note-card distillation, blogger-profile updates, or a compact RAG brief for cc-xhs-personal-growth-writer / chengcc-xhs-workflow. Do not use this skill to write final posts, generate Image 2 cards, create publish checklists, operate the platform UI, or publish/comment; those belong to cc-xhs-personal-growth-writer, chengcc-xhs-workflow, and xiaohongshu-ops."
---

# XHS Blogger Intelligence Skill

This is an upstream intelligence skill for Xiaohongshu content creation.

It does not write final posts, generate Image 2 cards, or publish drafts. It collects and distills public benchmark-blogger signals, then outputs a RAG brief that a writer skill can use.

Default integration:

Public benchmark posts -> note-cards -> blogger-profiles -> RAG brief -> `cc-xhs-personal-growth-writer` -> `chengcc-xhs-workflow`.

For Cc, the default manual low-follower/high-performing case corpus lives at:

```text
/Users/ccc/Library/Mobile Documents/iCloud~md~obsidian/Documents/CC-Obsidian/Obsidian Vault/Wiki/WiKi/来源/小红书案例库/小红书搜集文章
```

When Cc asks for Xiaohongshu RAG retrieval, low-follower/high-performing case analysis, pre-writing benchmark lookup, or similar-topic examples, read this folder first. Treat it as Cc's private growing corpus, not as shareable Skill content.

## 0. Boundary

This skill should:

- maintain a replaceable watchlist
- collect public Xiaohongshu post metadata and text through an approved adapter
- normalize collection results
- distill each useful note into a note-card
- update each blogger's profile
- output topic-specific RAG briefs
- hand off only a compact benchmark brief to downstream writing/workflow skills

This skill should not:

- copy large amounts of original post text into shareable output
- publish, like, follow, comment, scrape private content, or bypass access controls
- store cookies, tokens, or private credentials in this repo
- invent latest-post data when collection fails
- replace `cc-xhs-personal-growth-writer` or `chengcc-xhs-workflow`
- decide final card copy, Image 2 prompts, publish checklist order, or post-publish retro conclusions

## 1. Required Reads

For every run, read only the files needed for the request:

1. `docs/data-flow.md`
2. `docs/redbook-adapter.md`
3. `templates/watchlist.schema.json`
4. `scripts/collect-search-read.mjs` only when running the search/read adapter
5. `scripts/collect-watchlist.mjs` only when running watchlist batch collection
6. `scripts/build-rag-brief.mjs` only when building a RAG brief from collected outputs

For distillation or RAG work, also read:

7. `templates/note-card.md`
8. `templates/blogger-profile.md`
9. `templates/rag-brief.md`

For 澄Cc default watchlist, read:

10. `examples/watchlist-chengcc.example.json`

For Cc local low-follower/high-performing case RAG, also inspect the private corpus folder above and retrieve only the topic-relevant files or sections. Do not bulk-read the whole corpus unless the user asks for a full audit.

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
- public `xhs_red_id` and internal `xhs_user_id` are not confused
- account status is `active`, `search_only`, `paused`, `pending_internal_id_lookup`, `pending_id_confirmation`, or `needs_name_confirmation`
- collection cadence is reasonable
- duplicate accounts are merged
- private notes and public examples are kept separate

Use `xhs_red_id` for the public Xiaohongshu number shown on profile. Use `xhs_user_id` for the internal id that redbook may require for `user` and `user-posts`.

If account identity is uncertain, do not collect under a guessed id. Mark it `pending_id_confirmation`.

If only the public red id is known, mark it `pending_internal_id_lookup`.

If search/read works but `user` and `user-posts` fail, mark it `search_only` and collect through the search fallback until the adapter improves.

### Phase B: Collect Public Notes

Use `docs/redbook-adapter.md` as the adapter contract.

Collection order:

1. One-account smoke test before the first real batch.
2. Daily or manual low-frequency collection.
3. Store raw adapter output in a private/local collection folder.
4. Keep raw outputs append-only.
5. Record errors and fallbacks.

If redbook is unavailable or returns incomplete data, use fallback modes:

- `scripts/collect-search-read.mjs` for search -> filter author -> read detail
- `scripts/collect-watchlist.mjs` for low-frequency batch collection over eligible watchlist accounts
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

For Cc writing work, first retrieve from the local case corpus folder:

- similar topic lane, such as 情绪内耗 / AI个人成长 / 职场成长 / 第二大脑 / 读书复盘
- 3-8 relevant cases by title, hook, reader scene, method list, and CTA
- reusable expression patterns: opening pain, brain-voice lines, AI turning question, method names, collection CTA
- do-not-copy notes: avoid copying original paragraphs, creator-specific stories, and unsupported metrics

When collected outputs already exist, use `scripts/build-rag-brief.mjs` to build a compact scaffold brief from normalized records and note-cards.

For a specific writing topic, retrieve:

- relevant recent note-cards
- stable blogger-profile patterns
- title/hook options to learn from
- structure options to learn from
- visual/page logic references
- risks and do-not-copy notes

The RAG brief should be short enough to paste into a writing workflow.

Automatic RAG briefs are retrieval scaffolds. If the final content decision is important, review the retrieved note-cards before handing the brief to the writer.

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
- Did the output stay compact enough for downstream writer/workflow use?
- Did the run avoid claiming "latest" when collection was a local or stale snapshot?
