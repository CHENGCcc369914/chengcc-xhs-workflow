# Redbook Adapter Contract

Use redbook as the preferred Xiaohongshu public collection adapter after it passes a one-account smoke test in the current environment.

This file defines the adapter contract. It is not proof that redbook is installed or authenticated.

## Before First Use

Run a smoke test on one low-risk public account:

1. Verify the CLI or package is installed.
2. Verify authentication or public access mode.
3. Fetch one account's recent public posts.
4. Read one public post detail.
5. Save the raw output locally.
6. Confirm the output can be normalized.

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

1. User-provided public post URLs.
2. Browser-visible public page notes.
3. Previously collected raw snapshots.
4. Manual copy of short excerpts provided by the user.

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
