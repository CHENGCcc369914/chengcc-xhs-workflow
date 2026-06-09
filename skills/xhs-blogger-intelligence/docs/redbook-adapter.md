# Redbook Adapter Contract

Use redbook as the preferred Xiaohongshu public collection adapter after it passes a one-account smoke test in the current environment.

This file defines the adapter contract. It is not proof that redbook is installed or authenticated.

## Before First Use

Run a smoke test on one low-risk public account:

1. Verify the CLI or package is installed.
2. Verify authentication or public access mode.
3. Confirm whether the watchlist id is an internal `xhs_user_id` or public `xhs_red_id`.
4. Fetch one account's recent public posts, or use search fallback if user-posts fails.
5. Read one public post detail.
6. Save the raw output locally.
7. Confirm the output can be normalized.

Do not run a full watchlist batch until the smoke test works.

## Expected Capabilities

The preferred adapter should support:

- user profile lookup
- user public posts
- single post detail by URL or id
- optional comments when public and needed
- JSON output or machine-readable output
- clear error messages

Known command families to verify during smoke test:

```bash
redbook user-posts <xhs_user_id> --json
redbook read <post_url> --json
redbook comments <post_url> --all --json
redbook search "<query>" --json
```

If the installed redbook version uses different flags, update this file after verification.

## ID Semantics

Do not confuse these two fields:

- `xhs_red_id`: public Xiaohongshu number shown on profile, often numeric.
- `xhs_user_id`: internal user id exposed by API/search results and used by redbook `user` / `user-posts`.

If only `xhs_red_id` is known, first use search by display name or profile lookup to discover the internal `xhs_user_id`.

In smoke testing on 2026-06-09 with redbook `0.7.2` and `0.8.0`, `user` and `user-posts` returned `code:-1` for both the public red id and discovered internal user id on the tested account, while `search` plus `read` succeeded. Treat `search -> filter author -> read detail` as the current fallback route until a later adapter test proves user-posts reliable.

## Adapter Output Requirements

For each account collection, capture:

- command run
- account id
- collection timestamp
- raw output file path
- exit status
- error text if any
- number of items returned
- whether pagination appeared incomplete

For each post detail, capture:

- post URL or id
- title
- author id / name
- visible publish time
- visible engagement snapshot
- media count / type
- text excerpt or parsed text if allowed
- collection timestamp

## Fallbacks

Use fallbacks when redbook fails, returns incomplete data, or is not installed:

1. Search by display name, filter by author nickname/user id, then read returned note URLs.
2. User-provided public post URLs.
3. Browser-visible public page notes.
4. Previously collected raw snapshots.
5. Manual copy of short excerpts provided by the user.

Record fallback use in the collection run. Do not silently mix failed adapter output with complete data.

## Risk Controls

- Keep collection low frequency.
- Use public content only.
- Do not store cookies, account tokens, or private auth files in this repo.
- Do not auto-like, auto-comment, auto-follow, or manipulate engagement.
- Do not bypass access controls.
- Do not publish raw copied post text into shareable outputs.

## Step 3 Handoff

The next implementation step should test redbook on one watchlist account and then add a small adapter script or runbook only after the output shape is confirmed.
