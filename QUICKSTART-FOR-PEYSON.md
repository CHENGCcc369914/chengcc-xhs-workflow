# Peyson Quick Start

这不是一组散装 prompt，而是一个可下载的 Xiaohongshu Content Loop 模板。

目标：

```text
下载仓库 -> 替换成 Peyson 自己的社媒定位/声音/视觉/路径 -> 初始化 runtime -> 后面每篇内容都按同一个 Loop 跑
```

## 1. 下载仓库

```bash
git clone https://github.com/CHENGCcc369914/chengcc-xhs-workflow.git
cd chengcc-xhs-workflow
```

如果不用 Git，就在 GitHub 点 `Code -> Download ZIP`，解压后进入这个文件夹。

## 2. 一次性替换成 Peyson 资料

最简单方式：

```bash
node scripts/setup-creator.mjs \
  --id peyson \
  --name "Peyson" \
  --positioning "这里填 Peyson 的账号定位、目标读者、内容边界" \
  --voice "这里填 Peyson 的写作声音、语气、禁区" \
  --visual "这里填 Peyson 的视觉风格、IP/头像、字体、配色、出图规则"
```

这会生成：

```text
profiles/peyson.creator-profile.json
runtime/
knowledge/xhs-case-library/
assets/creator/
outputs/images/
workbench/
```

并自动初始化 runtime。

## 3. 如果让 Agent 替你填

把这份指令发给你的 Agent：

```text
请读取 docs/AGENT-REPLACE-CREATOR.md，
然后把这个仓库从默认模板替换成 Peyson 的社媒 Content Loop。
我的账号定位是：……
我的写作声音是：……
我的视觉风格是：……
我的目标读者是：……
我的内容禁区是：……
完成后创建一条测试 run，并检查 01-bootstrap-context.md 是否已经显示 Peyson 的资料。
```

Agent 应该只改：

```text
profiles/peyson.creator-profile.json
```

不要直接改 Skill 核心代码。

## 4. 后续每次跑内容

先设置环境变量：

```bash
export CONTENT_LOOP_PROFILE="$PWD/profiles/peyson.creator-profile.json"
```

然后创建一篇内容 run：

```bash
node skills/chengcc-content-loop-runtime/scripts/content-loop-runtime.mjs new-run \
  --intent "我想做一篇刚工作的人际关系内耗的小红书"
```

或者直接对 Agent 说：

```text
按这个仓库的 content loop 跑。
用 profiles/peyson.creator-profile.json 作为我的默认资料。
我想做一篇「刚工作的人际关系内耗」的小红书。
先创建 run record，读取 bootstrap，再做 RAG、10 个选题、图文、出图、发布审核和手动发布清单。
发布前停在 Gate 1，长期经验更新前停在 Gate 2。
```

## 5. 这个 Loop 会产出什么

每篇内容都会进入一个 run folder：

```text
runtime/runs/YYYY-MM-DD-topic/
  00-intent.md
  01-bootstrap-context.md
  02-rag-brief.md
  03-topic-options.md
  04-selected-hypothesis.md
  05-carousel-draft.md
  06-image-manifest.json
  07-publish-checklist.md
  08-prediction.md
  09-metrics-24h.md
  10-metrics-72h.md
  11-retro.md
  12-memory-update-proposal.md
```

其中 `01-bootstrap-context.md` 是关键检查点。它必须显示 Peyson 的 profile，而不是澄Cc默认资料。

## 6. 人工 Gate

默认不会偷偷发布。

- Gate 1：最终发布 / 上传 / 点击发布前，需要你确认。
- Gate 2：复盘经验写进长期规则前，需要你确认。

如果你的环境没有 Image 2 / image generation 工具，系统会输出完整图片 prompt，而不是假装已经出图。

## 7. 常见问题

### 它还是写得像 Cc

检查：

```text
runtime/runs/<latest-run>/01-bootstrap-context.md
```

如果里面没有 Peyson 的 positioning / voice / visual system，说明 profile 没接上。

### 它找不到案例库

把低粉爆文、对标博主、历史案例放进：

```text
knowledge/xhs-case-library/
```

或者在 `profiles/peyson.creator-profile.json` 里修改 `paths.ragCaseLibrary`。

### 它没有真实发布数据

先手动填 `09-metrics-24h.md` / `10-metrics-72h.md`，或配置自己的平台数据读取脚本到：

```json
"readerScript": "/your/path/to/read-creator-dashboard.mjs"
```
