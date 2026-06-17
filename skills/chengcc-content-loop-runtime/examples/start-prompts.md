# Start Prompts

Use these to start a supervised loop.

Default ChengCc post request:

```text
帮我做一篇澄Cc小红书，主题是刚下班脑子还在上班。
```

Expected route: create a runtime run first, then continue through bootstrap, RAG, topic options, single-post package, Gate 1, metrics, retro, and Gate 2. Do not treat this as a writing-only draft unless the prompt explicitly says "只写文案 / 不建 run / 不跑流程".

```text
我想做一篇关于刚上班精神内耗的小红书，按 L4.5 loop 跑：先读最近经验，再 RAG、选题、图文、图片、检测、发布包，最后准备复盘。
```

```text
用澄Cc默认资料，围绕“朋友关系里总是接招”开一个 content loop run，不要直接发布，发布前停在 Gate 1。
```

```text
这篇已经有 72h 数据了，帮我把 metrics、retro、memory update proposal 跑完，长期规则更新前等我确认。
```
