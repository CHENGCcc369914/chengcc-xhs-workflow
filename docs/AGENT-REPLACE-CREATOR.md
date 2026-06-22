# Agent Instruction: Replace Creator Profile

Copy this instruction to the creator's Agent after cloning this repository.

```text
你现在在一个小红书 Content Loop 模板仓库里。

目标：把这个 Loop 从默认示例账号替换成我的账号，并完成一次初始化，让我之后可以直接说“跑小红书 content loop”，你就能按我的定位、声音、视觉和资料库执行。

请按这个顺序做：

1. 读取仓库根目录的：
   - README.md
   - QUICKSTART-FOR-PEYSON.md
   - profiles/creator-profile.template.json
   - skills/chengcc-content-loop-runtime/references/shareable-profile-and-paths.md

2. 不要改 Skill 核心代码。只创建或修改我的 profile：
   - profiles/<my-id>.creator-profile.json

3. 用我提供的信息替换：
   - creator.id
   - creator.displayName
   - creator.accountName
   - writing.positioning
   - writing.voice
   - writing.contentStandards
   - writing.visualSystem

4. 保留这些默认相对路径，除非我明确说换位置：
   - ../runtime
   - ../knowledge/xhs-case-library
   - ../assets/creator
   - ../outputs/images
   - ../workbench

5. 创建必要目录：
   - runtime/
   - knowledge/xhs-case-library/
   - knowledge/benchmark-watchlist/
   - assets/creator/
   - outputs/images/
   - outputs/publish-packages/
   - workbench/data/

6. 运行初始化：

   node skills/chengcc-content-loop-runtime/scripts/content-loop-runtime.mjs init --profile profiles/<my-id>.creator-profile.json

7. 创建一条测试 run：

   node skills/chengcc-content-loop-runtime/scripts/content-loop-runtime.mjs new-run --profile profiles/<my-id>.creator-profile.json --intent "测试我的账号定位是否已经接入 content loop"

8. 打开测试 run 的 01-bootstrap-context.md，检查里面必须出现：
   - 我的 creator id
   - 我的 display name
   - 我的 positioning
   - 我的 voice
   - 我的 visual system
   - 我的 RAG case library 路径

9. 如果 bootstrap 里还出现“澄Cc默认资料”作为主身份，说明替换失败，请停止并修复 profile 优先级。

完成后告诉我：
- profile 文件路径
- runtime 路径
- 测试 run 路径
- 以后我应该给你的启动命令
```

## Minimal Creator Info To Provide

```text
creator.id:
creator.displayName:
creator.accountName:
target audience:
positioning:
voice:
content pillars:
visual style:
must avoid:
```
