# Peyson Quick Start

这份说明是给 Peyson 直接安装和使用的。目标是：你把仓库下载到本地后，机器人能默认按这套小红书工作流帮你完成选题、图文正文、出图提示或出图、发布审核和手动发布清单。

## 1. 下载仓库

如果你会用 Git：

```bash
git clone https://github.com/CHENGCcc369914/chengcc-xhs-workflow.git
cd chengcc-xhs-workflow
```

如果你不用 Git：

1. 打开 GitHub 仓库页面。
2. 点击 `Code` -> `Download ZIP`。
3. 解压后进入 `chengcc-xhs-workflow` 文件夹。

## 2. 安装到机器人能读取的位置

在终端里进入这个仓库，然后运行：

```bash
mkdir -p ~/.agents/skills
cp -R skills/chengcc-xhs-workflow ~/.agents/skills/
cp -R skills/xhs-blogger-intelligence ~/.agents/skills/
cp -R skills/chengcc-content-loop-runtime ~/.agents/skills/
```

安装后最好重启一次你的机器人 / Codex / Claude Code 会话，让它重新读取 Skill 列表。

## 3. 你需要安装哪些 Skill

必装：

```text
chengcc-xhs-workflow
```

它负责完整小红书图文生产流程：

```text
读账号资料 -> 给 10 个选题 -> 等你选题 -> 写 4 页图文和正文 -> 等你确认 -> Image 2 出图或输出图片 prompt -> 发布审核 -> 手动发布清单 -> 发布后复盘
```

建议一起装：

```text
xhs-blogger-intelligence
```

它负责上游情报：

```text
博主监测 / 低粉高赞 / 案例拆解 / RAG brief
```

如果你只是先做一篇内容，可以先不用情报 Skill，直接用主工作流。

如果你想要 L4.5 / supervised L5 的“跨篇闭环”，也安装：

```text
chengcc-content-loop-runtime
```

它负责保存每篇 run record、读取最近经验、调度 RAG 和单篇工作流、发布前停在 Gate 1、复盘后停在 Gate 2，再把确认后的经验放进下一篇启动上下文。

## 4. 直接复制给机器人的启动话术

### 从 10 个选题开始

```text
用 Peyson 默认资料，按 Peyson 中控台确认版，主题是「刚工作的人如何减少精神内耗」。
先给我 10 个适合小红书的选题，不要直接写正文。
```

### 选中一个题后继续生产

```text
我选第 3 个。继续按 Peyson 默认资料做 4 页小红书图文、正文、标题、标签和评论引导。
先给我确认文案，不要急着出图。
```

### 确认文案后出图和发布检查

```text
文案确认。目标平台是小红书。
默认调用 Image 2 生成完整 3:4 图文卡片；如果你当前环境没有 Image 2，就输出可直接复制使用的完整图片 prompt。
然后按 2026 小红书发布规范审核一遍，最后给我手动发布清单。
```

### 一句话跑完整流程

```text
用 Peyson 默认资料，跑完整小红书图文工作流。主题是「刚工作的人际关系内耗」。
流程必须是：先给 10 个选题，等我选；选完后写 4 页图文和正文，等我确认；确认后默认调用 Image 2 出图；最后做发布审核和手动发布清单。
```

### L4.5 / supervised L5 跨篇闭环

先初始化 runtime：

```bash
node skills/chengcc-content-loop-runtime/scripts/content-loop-runtime.mjs init
```

然后创建一篇内容 run：

```bash
node skills/chengcc-content-loop-runtime/scripts/content-loop-runtime.mjs new-run \
  --intent "我想做一篇刚工作的人际关系内耗的小红书" \
  --creator chengcc
```

也可以直接对机器人说：

```text
按 L4.5 / supervised L5 content loop 跑。
我想做一篇「刚工作的人际关系内耗」的小红书。
先创建 run record，读取最近经验，再 RAG、出 10 个选题、做图文和图片检测。
发布前停在 Gate 1，长期经验更新前停在 Gate 2。
```

## 5. 重要边界

这套 Skill 会帮你准备发布包，但默认不会替你偷偷发布。

默认终点是：

```text
图片路径 + 标题 + 正文 + 标签 + 发布审核 + 手动发布清单
```

你自己上传图片、粘贴文案、检查 AI 标识和隐私信息，然后决定是否点击发布。

L4.5 runtime 仍然保留两个强制人工 gate：

```text
Gate 1：最终发布/上传/点击发布前，需要你确认。
Gate 2：把复盘经验写进长期规则前，需要你确认。
```

如果你的机器人环境没有 Image 2 / image generation 工具，它不能真正生成图片，只会输出完整图片 prompt。这个不是仓库的问题，是运行环境是否有出图工具的问题。

## 6. Peyson 默认资料在哪里

你的账号默认资料在：

```text
skills/chengcc-xhs-workflow/references/brand-profile-peyson.md
```

如果后面你的定位、视觉风格、目标读者变了，优先改这个文件。

不要直接改 `brand-profile-chengcc.md`，那是 Cc 的账号资料。

## 7. 常见问题

### 机器人没有按这个流程跑

先确认你是否把整个文件夹复制进去了，而不是只复制 `SKILL.md`。

正确结构应该像这样：

```text
~/.agents/skills/chengcc-xhs-workflow/SKILL.md
~/.agents/skills/chengcc-xhs-workflow/references/
~/.agents/skills/chengcc-xhs-workflow/docs/
~/.agents/skills/chengcc-xhs-workflow/templates/
~/.agents/skills/chengcc-xhs-workflow/examples/
~/.agents/skills/chengcc-content-loop-runtime/SKILL.md
~/.agents/skills/chengcc-content-loop-runtime/scripts/content-loop-runtime.mjs
```

然后重启机器人会话，再发送：

```text
用 Peyson 默认资料，按 Peyson 中控台确认版，先给我 10 个适合我的小红书选题。
```

### 它只给了 prompt，没有出图

说明当前机器人环境没有可用的 Image 2 / image generation 工具，或者生成失败。你可以把 prompt 复制到可用的出图工具里继续生成。

### 它写得像 Cc，不像 Peyson

让机器人先读这个文件：

```text
skills/chengcc-xhs-workflow/references/brand-profile-peyson.md
```

然后说：

```text
这篇不要用澄Cc口吻，改用 Peyson 默认资料重写。
```
