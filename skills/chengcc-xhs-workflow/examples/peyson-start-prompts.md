# Peyson Start Prompts

## 1. Start With Topic Options

```text
用 Peyson 默认资料，按 Peyson 中控台确认版，主题是「刚工作的人如何减少精神内耗」。
先给我 10 个适合小红书的选题，不要直接写正文。
```

## 2. Continue After Choosing A Topic

```text
我选第 3 个。继续按 Peyson 默认资料做 4 页小红书图文、正文、标题、标签和评论引导。
先给我确认文案，不要急着出图。
```

## 3. Generate Cards After Copy Approval

```text
文案确认。目标平台是小红书。
默认调用 Image 2 生成完整 3:4 图文卡片；如果你当前环境没有 Image 2，就输出可直接复制使用的完整图片 prompt。
出图后创建本次 `run-manifest.json`，只把 manifest 标记 pass 的导出图放进上传顺序。
然后按 2026 小红书发布规范审核一遍，最后给我手动发布清单。
```

## 4. One Prompt For The Full Workflow

```text
用 Peyson 默认资料，跑完整小红书图文工作流。主题是「刚工作的人际关系内耗」。
流程必须是：先给 10 个选题，等我选；选完后写 4 页图文和正文，等我确认；确认后默认调用 Image 2 出图，并创建 run-manifest.json；最后只用 manifest pass 的导出图做发布审核和手动发布清单。
```

## 5. Add Intelligence Before Writing

```text
先用 xhs-blogger-intelligence 帮我整理这个方向的低粉高赞和可参考案例，主题是「刚工作的人际关系内耗」。
只给我 RAG brief，不要复制原文。
然后用 Peyson 默认资料，基于这个 brief 给我 10 个选题。
```
