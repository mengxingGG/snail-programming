// 🌱 第一部分：编程启蒙 — Ch0 ~ Ch9a + P1（53 节）
// 注：Ch7.7（高阶函数）和 Ch7.8（闭包）已移至 Part2
// 参考：xcatliu/typescript-tutorial，结合蜗牛教学理念改写
// 规范：每节一个概念 | content ≤ 700字 | starterCode 3-10行 | expectedOutput 精确匹配

import type { Chapter, SectionValidation } from '../types/course';

const tsIntroRenameValidation: SectionValidation = {
  mode: 'edit_required',
  requireCodeChangeFromStarter: true,
  codeRules: [
    { type: 'not_includes', value: '我的名字叫：小明' },
  ],
  outputRules: [
    { type: 'exact', value: 'Hello, World!' },
    { type: 'exact', value: '你好，蜗牛编程！' },
    { type: 'regex', value: '^我的名字叫：(?!小明$).+' },
  ],
  successMessage: '很好，你已经把名字改成自己的了。',
  failureMessage: '请保留前两行，并把第三行的“小明”改成你自己的名字。',
  expectedHint: 'Hello, World!\n你好，蜗牛编程！\n我的名字叫：你的名字（不能还是小明）',
};

const tsFirstBugfixValidation: SectionValidation = {
  mode: 'edit_required',
  requireCodeChangeFromStarter: true,
  codeRules: [
    { type: 'includes', value: 'score' },
    { type: 'not_includes', value: 'scroe' },
  ],
  outputRules: [
    { type: 'exact', value: '你的分数是：100' },
  ],
  successMessage: '很好，你已经修复了第一个 Bug。',
  failureMessage: '请先修复 starter code 里的拼写错误，再让输出变成“你的分数是：100”。',
};

const tsErrorReadingValidation: SectionValidation = {
  mode: 'edit_required',
  requireCodeChangeFromStarter: true,
  codeRules: [
    { type: 'not_includes', value: 'userNmae' },
    { type: 'not_includes', value: 'ctiy' },
    { type: 'not_includes', value: 'a + bb' },
  ],
  outputRules: [
    { type: 'exact', value: '用户名：小明' },
    { type: 'exact', value: '城市：北京' },
    { type: 'exact', value: '合计：30' },
  ],
  successMessage: '很好，你已经把这三处常见错误都修好了。',
  failureMessage: '请先修复变量名错误，再让程序输出正确的用户名、城市和合计。',
};

const tsJsonParseValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'exact', value: '解析成功！数据：{"name":"小明","score":95}' },
    { type: 'regex', value: '^解析失败：.+$' },
    { type: 'regex', value: '^解析失败：.+$' },
    { type: 'exact', value: '所有输入处理完毕 ✅' },
  ],
  expectedHint: `解析成功！数据：{"name":"小明","score":95}
解析失败：不同 Node 版本的 JSON 语法错误提示可能略有差异
解析失败：Unexpected end of JSON input
所有输入处理完毕 ✅`,
};

const tsDebugTraceValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'exact', value: '计算结果：170' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '调试追踪记录：' },
    { type: 'contains', value: '输入' },
    { type: 'contains', value: '初始金额' },
    { type: 'contains', value: '折扣后' },
    { type: 'contains', value: '最终结果' },
  ],
  expectedHint: `计算结果：170

调试追踪记录：
表格里的时间戳和列宽可能因运行环境不同而变化，但应该能看到“输入 / 初始金额 / 折扣后 / 最终结果”这几个关键步骤。`,
};

// ─────────────────────────────────────────────────────────────
//  Ch0 — 起步（5 节）：先写代码 → 再学概念 → 环境搭建/Git可选
// ─────────────────────────────────────────────────────────────
const ch0: Chapter = {
  id: 'ch0',
  title: '开发环境与基础',
  description: '写第一行代码、理解编程本质、学会求助，以及搭建本地开发环境',
  sections: [
    {
      id: '0.1',
      kind: 'exercise',
      chapterId: 'ch0',
      title: '第一个程序：Hello World 与程序运行原理',
      content: `## Hello World：程序员的成人礼

---

### 从源代码到输出，发生了什么？

\`\`\`
你写的 TypeScript 源码 (.ts)
        ↓  [编译器：esbuild / tsc]
JavaScript 代码 (.js)  
        ↓  [运行时：Node.js / 浏览器]
机器指令
        ↓  [CPU 执行]
屏幕上的输出 ✨
\`\`\`

---

### 为什么选 TypeScript 而不是直接写 JavaScript？

\`\`\`typescript
// JavaScript（没有类型）：
function add(a, b) {
  return a + b
}
add(1, "2")  // 结果："12" —— 可能不是你想要的！

// TypeScript（有类型保护）：
function add(a: number, b: number): number {
  return a + b
}
// add(1, "2")  ← 这里在写代码时就会报错，不会等到运行才发现！
\`\`\`

---

### console.log：你最好的朋友

\`console.log()\` 将内容打印到**控制台**（终端或浏览器 DevTools 的 Console 面板）。

整个课程中你会无数次用到它——它也是调试的第一工具。`,
      starterCode: `// 程序的执行是"从上到下，逐行执行"
console.log("🐌 蜗牛编程启动...")
console.log("")

const language = "TypeScript"
const goal = "成为一名优秀的程序员"
const days = 100

console.log("我在学：" + language)
console.log("我的目标：" + goal)
console.log("计划用时：" + days + " 天")

console.log("")
console.log("🚀 开始旅程！")`,
      expectedOutput: `🐌 蜗牛编程启动...

我在学：TypeScript
我的目标：成为一名优秀的程序员
计划用时：100 天

🚀 开始旅程！`,
      hint: '试着修改 goal 和 days 的值——程序每次运行都会按最新的值输出',
    },
    {
      id: '0.2',
      kind: 'exercise',
      chapterId: 'ch0',
      title: '什么是编程？计算思维入门',
      content: `## 编程 ≠ 写代码

> 🔍 **这个能解决什么问题？** 你是不是觉得编程就是"敲英文单词"？其实编程最核心的不是写代码，而是**学会用一种新的方式思考问题**——把模糊的想法变成计算机能执行的精确步骤。

编程的本质是**用计算机能理解的方式描述解决问题的步骤**。代码只是工具，**计算思维**才是核心。

---

### 计算思维的四个步骤

1. **分解**：把大问题拆成小问题
   - 比如"做一个电商网站"→ 用户系统、商品展示、购物车、支付……
2. **模式识别**：找到重复出现的规律
   - "用户登录"和"管理员登录"结构相似，可以复用思路
3. **抽象**：忽略细节，抓住核心
   - 不管用户叫什么，登录流程都一样
4. **算法**：设计一步一步的执行方案
   - 就像写菜谱：先做什么、再做什么、遇到特殊情况怎么办

---

### 一个生活中的例子

> 问题：如何从家到公司？

\`\`\`
1. 出门
2. 如果下雨 → 带伞
3. 走到地铁站（约 8 分钟）
4. 乘坐 1 号线（往 A 方向）
5. 第 3 站下车
6. 从 B 出口出站，步行 3 分钟
\`\`\`

这就是一个"程序"——精确、有序、有分支判断。编程就是把这个思路应用到计算机上。

> 💡 **编程学的不只是语法，更是一种严谨、结构化的思维方式。**

---

🔥 **学了就能做：** 学完这一节，你已经能用"计算思维"分析生活中的任何问题——点一杯奶茶、规划一次旅行、做一顿饭。把每一步写下来，就是"编程"的第一步！`,
      starterCode: `// 用计算思维解决一个问题：判断一个年份是否是闰年
// 闰年规则：能被 4 整除但不能被 100 整除，或者能被 400 整除

const year = 2024

// 步骤 1：能被 4 整除吗？
const divisibleBy4 = year % 4 === 0
// 步骤 2：能被 100 整除吗？
const divisibleBy100 = year % 100 === 0
// 步骤 3：能被 400 整除吗？
const divisibleBy400 = year % 400 === 0

// 步骤 4：综合判断
const isLeap = (divisibleBy4 && !divisibleBy100) || divisibleBy400

console.log(year + " 年是闰年吗？" + isLeap)`,
      expectedOutput: `2024 年是闰年吗？true`,
      hint: '试试把 year 改成 1900（不是闰年）或 2000（是闰年），验证逻辑是否正确',
    },
    {
      id: '0.3',
      kind: 'demo',
      chapterId: 'ch0',
      title: '学会求助：阅读文档、搜索错误、使用 AI',
      content: `## 编程最重要的能力：学会如何学习

没有任何程序员能记住所有东西。**知道怎么找到答案，比知道答案本身更重要。**

---

### 三种求助方式（按优先级排序）

#### 1. 阅读官方文档 📖
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [MDN Web Docs](https://developer.mozilla.org/zh-CN/) — JavaScript/Web 开发圣经
- 官方文档最权威、最准确，学会读文档是程序员的必修课

#### 2. 搜索错误信息 🔍
- **直接复制粘贴错误信息到 Google / 百度**
- 加上关键词：\`TypeScript\`、\`Node.js\`
- 优先看 Stack Overflow、GitHub Issues
- 搜索技巧：用英文搜通常结果更准确

#### 3. 使用 AI 助手 🤖
- ChatGPT、Claude、GitHub Copilot 是强大的编程助手
- **好的提问方式**：
  - ❌ "我的代码报错了怎么办"
  - ✅ "我的 TypeScript 代码报错 \`Type 'string' is not assignable to type 'number'\`，代码是 \`let x: number = 'hello'\`，怎么修？"
- AI 给出的答案**需要验证**，不能盲目相信

---

### 提问的智慧

无论是问 AI、搜索引擎还是前辈，带上这三点：
1. **你的代码是什么**（贴出来）
2. **期望的结果是什么**（说清楚）
3. **实际发生了什么**（错误信息完整贴出）

> 💡 **记住：优秀的程序员不是不犯错，而是犯错后能快速找到解决方案。**`,
      starterCode: `// 模拟一个你可能会遇到的错误场景
// 这段代码有一个类型错误，试试看能不能通过错误信息找到问题

function calculateTotal(price: number, quantity: number): number {
  return price * quantity
}

const price = 99.9
const quantity = 3
const total = calculateTotal(price, quantity)

console.log("商品价格：" + price)
console.log("购买数量：" + quantity)
console.log("总价：" + total)

// 搜索技巧练习：如果上面有错误，复制错误信息到搜索引擎
// 加上 "TypeScript" 关键词，看看能找到什么`,
      expectedOutput: `商品价格：99.9
购买数量：3
总价：299.70000000000005`,
      hint: '如果真的遇到错误，第一步：完整阅读错误信息。第二步：复制 + 搜索。这就是职业程序员的日常。',
    },
    {
      id: '0.4',
      kind: 'demo',
      chapterId: 'ch0',
      title: '开发环境搭建：VS Code、终端、Node.js',
      content: `## 搭建你的编程工作台

虽然蜗牛编程提供了在线编辑器，但学会在**本地搭建开发环境**是成为专业程序员的必经之路。

---

### 三大核心工具

| 工具 | 是什么 | 为什么要装 |
|------|--------|------------|
| **VS Code** | 代码编辑器 | 写代码、看代码、调试代码的主战场 |
| **Node.js** | JavaScript 运行时 | 不靠浏览器也能运行 JS/TS 代码 |
| **终端** | 命令行界面 | 执行命令、运行程序、管理文件 |

---

### 安装步骤（Windows / macOS / Linux）

#### 1. 安装 Node.js
- 访问 [nodejs.org](https://nodejs.org)
- 下载 **LTS 版本**（长期支持版，最稳定）
- 一路 Next 安装
- 验证：打开终端，输入 \`node --version\`，看到版本号即成功

#### 2. 安装 VS Code
- 访问 [code.visualstudio.com](https://code.visualstudio.com)
- 下载对应系统版本，安装
- 推荐安装插件：**Chinese (Simplified)** 语言包

#### 3. 打开终端
- **Windows**：Win + R，输入 \`cmd\` 回车；或用 PowerShell
- **macOS**：Command + 空格，搜索"终端"
- **Linux**：Ctrl + Alt + T

---

### 在 VS Code 中写第一个 TypeScript 文件

\`\`\`bash
# 在终端中：
mkdir my-first-project
cd my-first-project
code .              # 用 VS Code 打开当前目录
\`\`\`

然后新建 \`hello.ts\` 文件，开始写代码！

> 💡 蜗牛编程已经内置了完整环境，你可以随时在这里练习。但学会本地搭建，你就拥有了"在任何电脑上都能编程"的自由。`,
      starterCode: `// 这段代码在你的本地 VS Code + Node.js 环境下也能运行
// 试试看：复制到本地 hello.ts 文件，在终端执行 ` + "`npx ts-node hello.ts`" + `

const os = "Windows"  // 改成你的操作系统
const editor = "VS Code"
const runtime = "Node.js"

console.log("🎉 我的开发环境：")
console.log("  操作系统：" + os)
console.log("  编辑器：" + editor)
console.log("  运行时：" + runtime)
console.log("  状态：一切就绪！")`,
      expectedOutput: `🎉 我的开发环境：
  操作系统：Windows
  编辑器：VS Code
  运行时：Node.js
  状态：一切就绪！`,
      hint: 'npx ts-node hello.ts 可以直接运行 TypeScript 文件，无需先编译成 JS',
    },
    {
      id: '0.5',
      kind: 'demo',
      chapterId: 'ch0',
      title: 'Git 基础：版本控制入门',
      content: `## Git：代码的"时光机"

Git 是世界上最流行的**版本控制系统**。它能记录代码的每一次变化，让你随时回到过去的任意版本。

---

### 为什么需要 Git？

- 📝 **记录历史**：每次修改都有记录，谁改的、什么时候、改了什么
- ⏪ **回退版本**：改坏了？一键回到之前的版本
- 👥 **多人协作**：多人同时改代码不冲突（用 GitHub / Gitee）
- 💾 **备份**：代码推送到远程仓库，不怕电脑坏

---

### 四个核心操作

\`\`\`bash
# 1. 初始化：让 Git 开始跟踪这个目录
git init

# 2. 暂存：告诉 Git "这些文件我下次要保存"
git add hello.ts
git add .              # 暂存所有文件

# 3. 提交：正式保存一个版本（快照）
git commit -m "完成 Hello World 程序"

# 4. 查看历史
git log --oneline      # 简洁版历史
\`\`\`

---

### 工作流程

\`\`\`
写代码 → git add → git commit → 继续写代码 → git add → git commit → ...
\`\`\`

每个 commit 就像游戏存档——随时可以读档重来。`,
      starterCode: `// 模拟 Git 的版本记录
interface Commit {
  id: string
  message: string
  files: string[]
}

const gitHistory: Commit[] = []

function gitAdd(files: string[]) {
  console.log("📦 暂存文件：" + files.join(", "))
}

function gitCommit(message: string, files: string[]) {
  const commit: Commit = {
    id: "a" + (gitHistory.length + 1).toString(16).padStart(3, "0"),
    message,
    files,
  }
  gitHistory.push(commit)
}

function gitLog() {
  if (gitHistory.length === 0) {
    console.log("（还没有提交记录）")
    return
  }
  gitHistory.forEach(c => {
    console.log(c.id + " — " + c.message + " (" + c.files.length + " 个文件)")
  })
}

// 模拟一次开发流程
gitAdd(["hello.ts"])
gitCommit("初始化项目", ["hello.ts"])

gitAdd(["hello.ts", "utils.ts"])
gitCommit("添加工具函数", ["hello.ts", "utils.ts"])

gitAdd(["hello.ts"])
gitCommit("修复 bug", ["hello.ts"])

console.log("\\nGit 提交历史：")
gitLog()`,
      expectedOutput: `=== 当前环境已安装的包（前15个·示例）===
   1. __future__
   2. _ast
   3. _csv
   4. _io
   5. _json
   6. abc
   7. ast
   8. atexit
   9. base64
  10. bdb
  11. binascii
  12. bisect
  13. calendar
  14. collections
  15. copy
  ... 共 200+ 个模块（实际数量取决于环境）

=== 常用 pip 命令 ===
  $ pip install requests                     # 安装 requests 库
  $ pip list                                 # 列出已安装的包
  $ pip freeze > requirements.txt            # 导出依赖列表
  $ pip install -r requirements.txt          # 从文件批量安装
  $ pip uninstall requests                   # 卸载 requests

🐍 Python 版本取决于运行环境
📦 pip 路径也取决于运行环境`,
      hint: '试试自己添加几个 commit，然后用 gitLog 查看历史——就像真正的 Git 一样',
    },
  ],
};
const ch1: Chapter = {
  id: 'ch1',
  title: '你好，编程世界',
  description: '迈出第一步：理解编程是什么，写出人生第一行代码',
  sections: [
    {
      id: '1.1',
      kind: 'demo',
      chapterId: 'ch1',
      title: '什么是编程？程序如何运行',
      content: `## 什么是编程？

> 🔍 **这个能解决什么问题？** 你有没有想过——手机上的 App、网页、游戏里的角色，它们是怎么"活"起来的？答案就是：有人用编程语言给它们写了"操作手册"。

想象你在给一个**从不偷懒、但完全听不懂人话**的助手下指令。

它不会理解"帮我热个饭"——你必须写清楚：
1. 打开微波炉门
2. 把饭放进去
3. 设置 2 分钟
4. 按开始按钮
5. 等提示音，取出来

这就是编程：**把你想做的事，翻译成计算机能一步一步执行的精确指令。**

---

### 程序是怎么跑起来的？

\`\`\`
你写的 TypeScript 代码
  ↓ 编译器翻译
JavaScript（浏览器/Node.js 能读懂）
  ↓ 执行
屏幕上出现结果 ✨
\`\`\`

---

### 顺序执行：程序是"老实人"

程序有一个重要的特点：**它会严格按顺序执行，一句接一句，绝不打乱顺序。**

就像做菜：你不可能"先吃再炒"——第 1 步做完才能做第 2 步。

> 💥 **新手常踩的坑：** 你以为程序会"聪明地"猜到你想做什么——但它不会！如果你把第 3 步写在前面，它就真的先做第 3 步。写代码，就是把你的思路"翻译"成程序能理解的顺序。

---

🔥 **学了就能做：** 运行下面的代码，看看程序怎么"一步一步"地做事。然后试着调换两行的顺序，看看输出怎么变化！`,
      starterCode: `// 程序从第一行开始，一行一行往下执行
// 就像食谱：第 1 步做完才能做第 2 步

console.log("第 1 步：打开微波炉")
console.log("第 2 步：放入食物")
console.log("第 3 步：设置 2 分钟")
console.log("第 4 步：取出享用 🍱")`,
      expectedOutput: `第 1 步：打开微波炉
第 2 步：放入食物
第 3 步：设置 2 分钟
第 4 步：取出享用 🍱`,
      hint: '试着调换两行代码的顺序，看看输出会怎么变——程序严格按顺序执行！',
    },
    {
      id: '1.2',
      kind: 'demo',
      chapterId: 'ch1',
      title: '认识 TypeScript 和我们的工具',
      content: `## 认识 TypeScript

你可能听说过 **JavaScript**，它是浏览器里运行的语言。

**TypeScript** 是 JavaScript 的"升级版"——在它的基础上加了**类型系统**，相当于给代码戴上了安全帽 🪖

\`\`\`
JavaScript：我有一个变量 x
TypeScript：我有一个【数字类型】的变量 x
\`\`\`

类型能让你在**写代码时**就发现错误，而不是等程序崩了才知道出问题了。

---

### 今天我们用到的工具

| 工具 | 用途 |
|------|------|
| Monaco 编辑器 | 右边写代码的地方（VS Code 同款！） |
| esbuild | 把你写的 TypeScript 翻译一下 |
| Node.js | 执行翻译后的代码，打印结果 |

你不需要安装任何东西，蜗牛编程已经全部准备好了 🐌`,
      starterCode: `// : string 就是"类型注解"，告诉 TypeScript 这是文字类型
const language: string = "TypeScript"
const version: number = 5

console.log("我在学：" + language)
console.log("当前版本：" + version)`,
      expectedOutput: `我在学：TypeScript
当前版本：5`,
      hint: '`: string` 和 `: number` 是类型注解，分别表示"文字"和"数字"类型',
    },
    {
      id: '1.3',
      kind: 'exercise',
      chapterId: 'ch1',
      title: 'Hello, World! — 第一行代码',
      content: `## Hello, World!

全世界程序员都有一个传统：学一门新语言，第一件事就是让计算机说 "Hello, World!" 🌍

这个传统从 1972 年 C 语言教材流传下来，已经 50 多年了。今天，轮到你了！

---

### console.log 是什么？

\`console.log\` 是你最常用的工具，作用是：**在控制台输出一行内容**。

\`\`\`typescript
console.log("你想打印的内容")
\`\`\`

- \`console\` 是控制台对象
- \`.log\` 是它的"打印"功能
- 括号里用**引号**把文字包起来（单引号 \`'\` 或双引号 \`"\` 都可以）

---

来吧，运行一下，然后把"小明"改成你自己的名字！`,
      starterCode: `console.log("Hello, World!")
console.log("你好，蜗牛编程！")
console.log("我的名字叫：小明")`,
      expectedOutput: `Hello, World!
你好，蜗牛编程！
我的名字叫：你的名字`,
      hint: '把"小明"换成你的名字，再点运行——只要第三行不是小明，就算通过。',
      validation: tsIntroRenameValidation,
    },
    {
      id: '1.4',
      kind: 'exercise',
      chapterId: 'ch1',
      title: '第一个 Bug — 学会读错误信息',
      content: `## 遇见你的第一个 Bug 🐛

"Bug"这个词来自 1947 年：计算机先驱葛蕾丝·霍普发现一只**真正的飞蛾**卡在了计算机的继电器里，导致程序出错。

**好消息**：所有程序员都会遇到 bug，这完全正常！学会读懂错误信息，是编程最重要的技能之一。

---

### 如何读懂错误信息

当程序出错，你会看到类似：
\`\`\`
ReferenceError: scroe is not defined
\`\`\`

三步解读法：
1. **看类型**：\`ReferenceError\` = 引用了不存在的东西
2. **看描述**：\`scroe is not defined\` = "scroe"没有定义
3. **找原因**：哦！把 \`score\` 拼错成 \`scroe\` 了

---

下面有一个拼写错误，找到它并修复，让程序输出"你的分数是：100"：`,
      starterCode: `let score = 100
let scroe = 0

// 下面这行有一个 bug——用错了变量，找到它！
console.log("你的分数是：" + scroe)`,
      expectedOutput: `你的分数是：100`,
      hint: '对比一下：上面声明的变量名是什么？下面 console.log 里用的是什么？',
      validation: tsFirstBugfixValidation,
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch2 — 会说话的变量（5 节）
// ─────────────────────────────────────────────────────────────
const ch2: Chapter = {
  id: 'ch2',
  title: '会说话的变量',
  description: '用变量存储数据：字符串、数字、布尔值，以及类型注解',
  sections: [
    {
      id: '2.1',
      kind: 'exercise',
      chapterId: 'ch2',
      title: '变量是什么 — let 和 const',
      content: `## 变量：给数据起个名字

> 🔍 **这个能解决什么问题？** 写程序时你总需要"记住"一些东西——用户的年龄、购物车的商品、游戏的分数——以后再拿出来用。变量就是给这些数据起个"名字"，让你随时存、随时取。

变量就像一个**贴了标签的盒子**——你可以往里放东西，也可以随时取出来看看里面是什么。

---

### 更直观的理解

\`\`\`
┌─────────────────┐
│                 │
│  标签：score     │  ← 变量名（标签）
│                 │
│  里面：88        │  ← 变量值（内容）
│                 │
└─────────────────┘
\`\`\`

你可以用标签找到盒子，打开看看里面是什么，或者打开盒盖换一个新的放进去。

---

### let vs const

| 关键字 | 比喻 | 能改吗 |
|--------|------|--------|
| \`let\` | 普通盒子 | ✅ 可以换新内容 |
| \`const\` | 上了锁的盒子 | ❌ 不能换 |

\`\`\`typescript
let age = 18
age = 19        // ✅ 可以改

const name = "小明"
// name = "小红"  // ❌ 报错！const 不能改
\`\`\`

---

### 推荐原则

**默认用 \`const\`**，只有当你确实需要修改值时才用 \`let\`。

这是业界最佳实践——能减少很多意外错误，代码也更容易读懂。

---

### 变量命名的"潜规则"

给变量起名字不是随便写的，好的名字让别人（和以后的你）一看就懂：

\`\`\`typescript
// ❌ 不好的名字
const a = 18
const x = "小明"

// ✅ 好的名字（一看就知道是啥）
const age = 18
const userName = "小明"
\`\`\`

> 💥 **新手常踩的坑：**
> 1. **忘了 const 不能改** — 声明了 const 又试图改它，程序会报错。不确定时先用 \`let\`。
> 2. **拼写不一致** — 声明 \`userName\` 却写 \`username\`（大小写不同），TS 会当作两个不同变量！
> 3. **名字太短** — \`a\`、\`b\`、\`x\` 一天后就不知道代表什么了。

---

> 🔥 **学了就能做：** 运行下面的代码，试试把 \`score\` 改成不同的值再运行，看看输出怎么变。然后创建一个你自己的变量！`,
      starterCode: `let score = 60
console.log("初始分数：" + score)

score = 85
console.log("更新后：" + score)

const appName = "蜗牛编程"
console.log("应用名：" + appName)`,
      expectedOutput: `初始分数：60
更新后：85
应用名：蜗牛编程`,
      hint: '试试把第一行 let 改成 const，然后再给 score 赋值，看看会报什么错',
    },
    {
      id: '2.2',
      kind: 'exercise',
      chapterId: 'ch2',
      title: '字符串 — 处理文字',
      content: `## 字符串：装文字的容器

一段文字在 TypeScript 里叫**字符串（string）**，用引号包裹：

\`\`\`typescript
"你好世界"    // 双引号
'hello'       // 单引号，完全等效
\`你好，\${name}\`  // 反引号（模板字符串）
\`\`\`

三种方式都可以，但模板字符串最强大——继续往下看 👇

---

### 模板字符串 ✨（强烈推荐！）

**模板字符串**用反引号 \`\` 包裹（键盘左上角【Esc 下面】那个键）。

它最大的好处是：**可以直接在字符串里嵌入变量**。

对比一下：

\`\`\`typescript
const name = "小明"
const age = 18

// ❌ 拼接法：+号多，容易乱
console.log("你好，" + name + "！你今年 " + age + " 岁。")

// ✅ 模板字符串：\${变量名} 直接嵌入 ✨
console.log(\`你好，\${name}！你今年 \${age} 岁。\`)
\`\`\`

> 💡 **\${} 是模板字符串的灵魂**——花括号里写变量名，运行时会自动替换成变量的值。

**另一个好处：支持换行！**

\`\`\`typescript
const msg = \`
亲爱的 \${name}：
  欢迎加入蜗牛编程！
  你的学号是 \${studentId}
\`
// 不需要 \\n，直接按回车换行
\`\`\`

---

### 常用字符串方法

\`\`\`typescript
"hello".length         // 5  字符数
"hello".toUpperCase()  // "HELLO"  变大写
"  hi  ".trim()        // "hi"  去掉两端空格
"a,b,c".split(",")     // ["a","b","c"]  分割成数组
\`\`\``,
      starterCode: `const firstName = "小"
const lastName = "明"
const fullName = firstName + lastName

const age = 20
const greeting = \`你好，\${fullName}！你今年 \${age} 岁。\`

console.log(greeting)
console.log("名字长度：" + fullName.length)
console.log("大写版：" + fullName.toUpperCase())`,
      expectedOutput: `全名： 小明
长度： 2
重复： 小明小明小明
首字： 小
取[0:1]： 小`,
      hint: '模板字符串用反引号（键盘左上角那个键），不是单引号哦',
    },
    {
      id: '2.3',
      kind: 'exercise',
      chapterId: 'ch2',
      title: '数字 — 加减乘除取余',
      content: `## 数字类型：计算器超级版

TypeScript 的 \`number\` 类型，整数和小数都能装，不用区分。

---

### 基本运算

\`\`\`typescript
10 + 3   // 13   加
10 - 3   // 7    减
10 * 3   // 30   乘
10 / 3   // 3.33 除（结果可以是小数）
10 % 3   // 1    取余（10 ÷ 3 余 1）
2 ** 3   // 8    幂（2 的 3 次方）
\`\`\`

**取余 \`%\` 非常常用**：
- \`n % 2 === 0\` → n 是偶数
- \`n % 7 === 0\` → n 是 7 的倍数

---

### Math 工具箱

\`\`\`typescript
Math.round(3.7)     // 4   四舍五入
Math.floor(3.9)     // 3   向下取整
Math.abs(-5)        // 5   绝对值
Math.max(1, 5, 3)   // 5   最大值
\`\`\``,
      starterCode: `const price = 99.5
const count = 3
const total = price * count

console.log(\`单价：\${price}\`)
console.log(\`数量：\${count}\`)
console.log(\`总价：\${total}\`)
console.log(\`取整：\${Math.round(total)}\`)
console.log(\`是偶数？\${count % 2 === 0}\`)`,
      expectedOutput: `单价：99.5
数量：3
总价：298.5
取整：299
是偶数？false`,
      hint: '% 是取余运算，count % 2 === 0 就是"count 能被 2 整除"，也就是偶数',
    },
    {
      id: '2.4',
      kind: 'exercise',
      chapterId: 'ch2',
      title: '布尔值 — 对与错的判断',
      content: `## 布尔值：只有两个答案

布尔值（\`boolean\`）只有 \`true\`（真）和 \`false\`（假）两种状态，就像开关的"开"和"关"。

---

### 比较运算符 → 产生布尔值

\`\`\`typescript
5 > 3      // true   大于
5 < 3      // false  小于
5 >= 5     // true   大于等于
5 === 5    // true   严格相等 ✅ 推荐
5 !== 3    // true   不相等
\`\`\`

**永远用 \`===\`，不用 \`==\`**。\`===\` 同时检查值和类型，更安全。

---

### 逻辑运算符 → 组合条件

\`\`\`typescript
true && false   // false  与（两个都 true 才 true）
true || false   // true   或（有一个 true 就 true）
!true           // false  非（取反）
\`\`\``,
      starterCode: `const age = 20
const hasTicket = true

const isAdult = age >= 18
const canEnter = isAdult && hasTicket

console.log("是成年人：" + isAdult)
console.log("有票：" + hasTicket)
console.log("可以入场：" + canEnter)
console.log("不是成年人：" + !isAdult)`,
      expectedOutput: `是成年人：true
有票：true
可以入场：true
不是成年人：false`,
      hint: '试试把 age 改成 16，或 hasTicket 改成 false，看 canEnter 怎么变',
    },
    {
      id: '2.5',
      kind: 'exercise',
      chapterId: 'ch2',
      title: '给变量贴标签 — 类型注解初识',
      content: `## 类型注解：给变量贴上"标签"

TypeScript 最有特色的功能就是**类型注解**——告诉程序每个变量是什么类型。

---

### 基础写法

\`\`\`typescript
let name: string = "小明"       // : string 表示"这是字符串"
let age: number = 18            // : number 表示"这是数字"
let isStudent: boolean = true   // : boolean 表示"这是布尔值"
\`\`\`

格式就是：**变量名 : 类型 = 值**

---

### 其实大多数时候不用写

TypeScript 很聪明，能**自动推断**类型：

\`\`\`typescript
let name = "小明"   // TypeScript 自动知道是 string
let age = 18        // 自动知道是 number
\`\`\`

但手动写上类型注解能让代码**更清晰**——不用猜就知道这个变量该存什么。

---

### 三种最基本类型

| 类型 | 写法 | 装什么 |
|------|------|--------|
| string | \`: string\` | 文字 |
| number | \`: number\` | 数字 |
| boolean | \`: boolean\` | 对/错 |`,
      starterCode: `let name: string = "小明"
let age: number = 18
let isStudent: boolean = true
let gpa: number = 3.8

console.log(\`姓名：\${name}\`)
console.log(\`年龄：\${age}\`)
console.log(\`是学生：\${isStudent}\`)
console.log(\`绩点：\${gpa}\`)`,
      expectedOutput: `姓名：小明
年龄：18
是学生：true
绩点：3.8`,
      hint: '把 age: number 的值改成字符串（如 "十八"），TypeScript 会立刻提示类型不匹配',
      difficulty: 'beginner',
      estimatedMinutes: 5,
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch3 — 让程序做选择（4 节）
// ─────────────────────────────────────────────────────────────
const ch3: Chapter = {
  id: 'ch3',
  title: '让程序做选择',
  description: '用 if / else if / else 和三元运算符让程序根据条件走不同的路',
  sections: [
    {
      id: '3.1',
      kind: 'exercise',
      chapterId: 'ch3',
      title: 'if — 如果条件成立...',
      content: `## if：给程序加一个"如果..."

> 🔍 **这个能解决什么问题？** 生活中的每个决定都是"如果…就…"——如果下雨就带伞，如果饿了就吃饭。程序也一样！**if 让程序根据条件"决定"做什么**，而不是傻傻地从头跑到尾。

之前程序都是从上到下直走，不会拐弯。\`if\` 让程序能**做决定**——如果某个条件成立，才执行某段代码。

---

### 生活中的类比 🚦

想象你走到一个路口：

\`\`\`
          ┌─ 绿灯 ─→ 直接走
    走到 ─┤
    路口   └─ 红灯 ─→ 停下来等
\`\`\`

\`if\` 就是程序里的"交通信号灯"。它检查条件（红/绿），然后决定走哪条路。

---

### 语法

\`\`\`typescript
if (条件) {
  // 条件为 true 时才执行这里
}
\`\`\`

- 圆括号 \`()\` 里是条件，必须是布尔值（\`true\` 或 \`false\`）
- 花括号 \`{}\` 包裹条件成立时的代码
- **缩进不是必须的，但强烈建议**——让别人（和以后的你）好读

---

### 例子

\`\`\`typescript
const temperature = 35
if (temperature > 30) {
  console.log("天气好热，开空调！")
}
\`\`\`

如果 temperature 是 20，这行 log **不会执行**，什么都不输出。

---

> 💥 **新手常踩的坑：**
> 1. **忘写花括号** — \`if (条件) console.log("hi")\` 虽然可以一行写完，但不加花括号只会执行紧跟着的第一句。**养成加花括号的习惯！**
> 2. **用 = 代替 ===** — \`if (score = 60)\` 是把 60 赋值给 score，不是比较！条件判断永远用 \`===\`。
> 3. **分号放错位置** — \`if (条件); { }\` 多了一个分号会让 if 失效。

> 🔥 **学了就能做：** 运行下面的代码，试试改 \`score\` 的值看不同结果。然后想想你今天做的哪个决定可以用 \`if\` 来描述！`,
      starterCode: `const score = 85

if (score >= 60) {
  console.log("恭喜，通过了！")
}

if (score >= 90) {
  console.log("优秀！")
}

console.log("检测完毕")`,
      expectedOutput: `恭喜，通过了！
检测完毕`,
      hint: '把 score 改成 92，两个 if 都会成立，看看输出会变成什么',
    },
    {
      id: '3.2',
      kind: 'exercise',
      chapterId: 'ch3',
      title: 'else — 否则走另一条路',
      content: `## if...else：两条路选一条

\`if\` 只处理"条件成立"的情况。加上 \`else\`，就能同时处理"成立"和"不成立"两种情况。

---

### 语法

\`\`\`typescript
if (条件) {
  // 条件为 true，走这里
} else {
  // 条件为 false，走这里
}
\`\`\`

**两个分支必有一个执行，也只有一个执行。**

---

### 例子

\`\`\`typescript
const hour = 14

if (hour < 12) {
  console.log("上午好！")
} else {
  console.log("下午好！")
}
// hour = 14，输出：下午好！
\`\`\`

把 hour 改成 9，程序就"拐弯"了，输出"上午好！"`,
      starterCode: `const score = 55

if (score >= 60) {
  console.log("及格了 ✅")
} else {
  console.log("没及格，继续加油 💪")
}

const isWeekend = false

if (isWeekend) {
  console.log("今天休息！")
} else {
  console.log("今天上班/上学")
}`,
      expectedOutput: `没及格，继续加油 💪
今天上班/上学`,
      hint: '把 score 改成 60，或把 isWeekend 改成 true，看看输出怎么变',
    },
    {
      id: '3.3',
      kind: 'exercise',
      chapterId: 'ch3',
      title: 'else if — 多条件判断',
      content: `## else if：三岔路口、四岔路口……

\`if...else\` 只有两个分支。当有多种情况时，用 \`else if\` 链接更多：

---

### 语法

\`\`\`typescript
if (条件1) {
  // 条件1 成立
} else if (条件2) {
  // 条件1 不成立，条件2 成立
} else if (条件3) {
  // 前两个都不成立，条件3 成立
} else {
  // 全不成立
}
\`\`\`

**程序从上往下依次检查，一旦某个条件成立，执行完就跳过后面所有的。**

---

### 成绩评级示例

\`\`\`typescript
if (score >= 90)      grade = "A"
else if (score >= 80) grade = "B"
else if (score >= 70) grade = "C"
else if (score >= 60) grade = "D"
else                  grade = "F"
\`\`\``,
      starterCode: `const score = 78
let grade: string

if (score >= 90) {
  grade = "A - 优秀"
} else if (score >= 80) {
  grade = "B - 良好"
} else if (score >= 70) {
  grade = "C - 中等"
} else if (score >= 60) {
  grade = "D - 及格"
} else {
  grade = "F - 不及格"
}

console.log(\`分数 \${score} → 等级：\${grade}\`)`,
      expectedOutput: `分数 78 → 等级：C - 中等`,
      hint: '把 score 换成 92、65、45，验证每个分支都能正确执行',
    },
    {
      id: '3.4',
      kind: 'exercise',
      chapterId: 'ch3',
      title: '三元运算符 — 一行搞定两种情况',
      content: `## 三元运算符：if...else 的简洁版

当 \`if...else\` 每个分支只有一句话时，可以压缩成一行：

---

### 语法

\`\`\`typescript
条件 ? 真时的值 : 假时的值
\`\`\`

---

### 对比

\`\`\`typescript
// 普通写法（4行）
let label
if (score >= 60) {
  label = "及格"
} else {
  label = "不及格"
}

// 三元运算符（1行）✨
const label = score >= 60 ? "及格" : "不及格"
\`\`\`

---

### 使用建议

三元运算符只适合**简单的两种情况**。如果逻辑稍微复杂，还是用 if...else 更清晰——可读性比简洁更重要！`,
      starterCode: `const age = 20
const status = age >= 18 ? "成年人" : "未成年人"
console.log(\`年龄 \${age}：\${status}\`)

const score = 85
const result = score >= 60 ? "通过 ✅" : "未通过 ❌"
console.log(\`分数 \${score}：\${result}\`)

const hour = 9
const greeting = hour < 12 ? "早上好" : "下午好"
console.log(greeting)`,
      expectedOutput: `年龄 20：成年人
分数 85：通过 ✅
早上好`,
      hint: '三元运算符：条件 ? 真值 : 假值 ——问号左边是条件，冒号分隔两种结果',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch4 — 调试术（3 节）
// ─────────────────────────────────────────────────────────────
const ch4: Chapter = {
  id: 'ch4',
  title: '调试术',
  description: '用 console.log 找 bug、读懂错误信息，不再害怕报错',
  sections: [
    {
      id: '4.1',
      kind: 'exercise',
      chapterId: 'ch4',
      title: 'console.log — 你的眼睛',
      content: `## console.log：程序员的手电筒

调试的本质就是：**在你迷惑的地方插一盏灯，看看当时的情况**。

\`console.log\` 就是那盏灯。

---

### 打印多个值

\`\`\`typescript
const price = 99
console.log("price =", price)      // price = 99
console.log(\`price 是：\${price}\`)  // price 是：99
\`\`\`

用逗号分隔多个值，自动加空格，非常好用。

---

### 调试技巧：追踪变量的变化

\`\`\`typescript
let x = 10
console.log("初始值：", x)     // 看初始状态

x = x * 2
console.log("乘以 2 后：", x)  // 看变化后的状态
\`\`\`

**每一步之后都打印一次变量**，比死盯代码猜测有效 10 倍！`,
      starterCode: `let total = 0
console.log("开始，total =", total)

total = total + 10
console.log("加 10 后，total =", total)

total = total * 2
console.log("乘以 2 后，total =", total)

total = total - 5
console.log("减 5 后，total =", total)`,
      expectedOutput: `开始，total = 0
加 10 后，total = 10
乘以 2 后，total = 20
减 5 后，total = 15`,
      hint: '调试时永远带上标签："total =" 这样的前缀，不然看到一个数字不知道它是啥',
    },
    {
      id: '4.2',
      kind: 'exercise',
      chapterId: 'ch4',
      title: '读懂错误信息三步法',
      content: `## 错误信息不是敌人，是朋友 ❤️

很多初学者看到红色报错就慌了。其实，错误信息是 TypeScript 在**帮你**——它在告诉你哪里不对。

---

### 常见错误类型

| 错误类型 | 含义 | 常见原因 |
|----------|------|----------|
| \`ReferenceError\` | 用了没声明的变量 | 变量名拼错 |
| \`TypeError\` | 类型用错了 | 对 undefined 调方法 |
| \`SyntaxError\` | 语法写错了 | 括号没关闭 |

---

### 三步读懂错误

例：\`TypeError: Cannot read properties of undefined (reading 'length')\`

1. **看类型**：\`TypeError\` = 类型错误
2. **看描述**：读取了 undefined 的 \`length\` 属性
3. **找原因**：某个变量是 undefined，以为它有值

---

**大声把错误信息读出来**，往往一读就能理解了！`,
      starterCode: `// 这三行代码各演示一种常见错误，修复后应能正确输出

const userName = "小明"
const userNmae = ""
console.log("用户名：" + userNmae)

const city = "北京"
const ctiy = ""
console.log("城市：" + ctiy)

const a = 10
const b = 20
const bb = 0
console.log("合计：" + (a + bb))`,
      expectedOutput: `用户名：小明
城市：北京
合计：30`,
      hint: '如果程序报错，把错误信息完整地读一遍，错误信息本身就是最好的提示',
      validation: tsErrorReadingValidation,
    },
    {
      id: '4.3',
      kind: 'exercise',
      chapterId: 'ch4',
      title: '定位 bug 的排除法',
      content: `## 排除法：像侦探一样找 bug 🔍

当程序出现问题，不知道 bug 在哪时，用**排除法**：

---

### 四步排除法

1. **缩小范围**：哪一段代码可能有问题？
2. **打印中间值**：每一步之后打印状态
3. **验证假设**：你以为变量是 X，先打印确认
4. **一次只改一处**：改完立刻运行，不要一次改多处

---

### 实战演示

\`\`\`typescript
let result = 10
console.log("步骤1后：", result)   // 在这里追踪

result = result * 2
console.log("步骤2后：", result)   // 继续追踪

result = result - 3
console.log("最终：", result)      // 确认结果
\`\`\`

**找到 bug 在哪一步，就解决了 80% 的问题。**`,
      starterCode: `// 计算圆的面积，用 console.log 追踪每一步

const pi = 3.14159
const radius = 5

console.log("半径：", radius)

const area = pi * radius * radius
console.log("面积：", area)

console.log(\`半径为 \${radius} 的圆，面积是 \${area.toFixed(2)}\`)`,
      expectedOutput: `半径： 5
面积： 78.53975
半径为 5 的圆，面积是 78.54`,
      hint: '.toFixed(2) 保留 2 位小数，是数字的实用方法',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch5 — 重复的力量：循环（4 节）
// ─────────────────────────────────────────────────────────────
const ch5: Chapter = {
  id: 'ch5',
  title: '重复的力量：循环',
  description: '用 for / while / for...of 让程序自动重复执行任务',
  sections: [
    {
      id: '5.1',
      kind: 'exercise',
      chapterId: 'ch5',
      title: 'for — 精确控制次数',
      content: `## for 循环：当你知道要重复几次

> 🔍 **这个能解决什么问题？** 如果你要打印"你好"100遍，难道要写100行 \`console.log\`？累死！**for 循环就是让代码"自动重复"执行**——你告诉它"重复几次、怎么重复"，它自己搞定。

### 更直观的理解

\`\`\`
┌────────────────────────────────────────────┐
│  for 循环 = 计数器 + 条件 + 步进    │
│                                      │
│  (1) 初始化: i = 0                   │
│        ↓                             │
│  (2) 检查条件: i < 5 ?              │
│     ├─ 是 → 执行循环体 → (3) i++ →  │
│     └─ 否 → 退出循环                 │
└────────────────────────────────────────────┘
\`\`\`

想打印 100 行"你好"？不可能写 100 个 \`console.log\`。**for 循环**让代码自动重复：

---

### 语法

\`\`\`typescript
for (初始化; 条件; 每次更新) {
  // 重复执行的代码
}
\`\`\`

\`\`\`typescript
for (let i = 1; i <= 5; i++) {
  console.log("第 " + i + " 次")
}
\`\`\`

执行过程：
1. \`let i = 1\` → 初始化，只执行一次
2. 检查 \`i <= 5\`，为 true 就执行循环体
3. 执行完后 \`i++\`（i 加 1）
4. 回到第 2 步，直到条件为 false

---

**\`i++\` 是 \`i = i + 1\` 的缩写**，每次循环 i 增加 1。`,
      starterCode: `for (let i = 1; i <= 5; i++) {
  console.log(i)
}`,
      expectedOutput: `1
2
3
4
5`,
      hint: '试着改成 i <= 10 或步长改成 i += 2，看看输出怎么变',
    },
    {
      id: '5.2',
      kind: 'exercise',
      chapterId: 'ch5',
      title: 'while — 不知道几次时用',
      content: `## while 循环：循环到条件不成立为止

\`for\` 适合"明确知道循环几次"的场景。\`while\` 适合"循环到某个状态改变"的场景。

---

### 语法

\`\`\`typescript
while (条件) {
  // 只要条件为 true，就一直执行
  // 记得在这里改变条件，否则会死循环！
}
\`\`\`

---

### 例子：不断翻倍，直到超过 100

\`\`\`typescript
let n = 1
while (n <= 100) {
  n = n * 2
}
console.log(n) // 128
\`\`\`

---

### ⚠️ 死循环陷阱

\`\`\`typescript
while (true) {  // 永远不停！
  console.log("停不下来了")
}
\`\`\`

**一定要在循环体里有改变条件的操作**，不然程序会卡死。`,
      starterCode: `let n = 1
let steps = 0

while (n <= 50) {
  n = n * 2
  steps++
}

console.log(\`最终结果：\${n}\`)
console.log(\`经过了 \${steps} 步\`)`,
      expectedOutput: `原始： '  Hello, Python World!  '
strip： 'Hello, Python World!'
upper： HELLO, PYTHON WORLD!
lower： hello, python world!
replace： Hello, Python 蜗牛!
split： ['Hello,', 'Python', 'World!']
join： Hello, | Python | World!`,
      hint: 'steps++ 是计步器，每次循环加 1，最后就知道循环了多少次',
    },
    {
      id: '5.3',
      kind: 'exercise',
      chapterId: 'ch5',
      title: 'for...of — 逐个取值的优雅循环',
      content: `## for...of：把容器里的东西"一个一个拿出来"

> 💡 **先学概念**：\`for...of\` 用于遍历"可迭代"的东西（字符串、数组等）。
> 这里先用字符串举例，等 Ch6 学完数组后，你会看到它更强大的用法！

---

### 语法

\`\`\`typescript
for (const item of 容器) {
  // item 就是容器里的当前项
}
\`\`\`

---

### 字符串也可以逐个取值

\`\`\`typescript
const name = "小明"

// 普通 for（需要索引时用）
for (let i = 0; i < name.length; i++) {
  console.log(name[i])
}

// for...of（只关心值时用）✨
for (const char of name) {
  console.log(char)
}
// 输出：
// 小
// 明
\`\`\`

---

### 怎么选？

- **需要知道在第几个位置（索引）** → 用普通 \`for\`
- **只关心每个值本身** → 用 \`for...of\`（更清晰）

> 📌 等学到 Ch6 的数组时，\`for...of\` 才是真正发光的地方！`,
      starterCode: `// 遍历字符串里的每个字
const greeting = "蜗牛"

for (const char of greeting) {
  console.log("字符：" + char)
}

console.log("---")

// 遍历另一个字符串
const course = "TS"
for (const letter of course) {
  console.log(letter)
}`,
      expectedOutput: `字符：蜗
字符：牛
---
T
S`,
      hint: 'total += score 是 total = total + score 的缩写，是累加的标准写法',
    },
    {
      id: '5.4',
      kind: 'exercise',
      chapterId: 'ch5',
      title: 'break 和 continue — 控制循环节奏',
      content: `## 不一定要走完全程

默认情况下，循环会把所有轮次都跑完。有时候你想提前退出，或者跳过某一轮。

---

### break：立刻停止整个循环

\`\`\`typescript
for (let i = 1; i <= 10; i++) {
  if (i === 5) break       // 遇到 5，立刻停
  console.log(i)           // 只输出 1 2 3 4
}
\`\`\`

常用场景：在数组里找到目标后立刻停止搜索。

---

### continue：跳过这一轮，继续下一轮

\`\`\`typescript
for (let i = 1; i <= 5; i++) {
  if (i === 3) continue    // 跳过 3
  console.log(i)           // 输出 1 2 4 5
}
\`\`\`

常用场景：跳过不满足条件的元素。

---

**记忆方法**：break = 刹车，continue = 跳过这一站继续开车`,
      starterCode: `// 打印 1-10，跳过 3 和 7，遇到 9 就停
for (let i = 1; i <= 10; i++) {
  if (i === 9) break
  if (i === 3 || i === 7) continue
  console.log(i)
}`,
      expectedOutput: `1
2
4
5
6
8`,
      hint: '注意 break 和 continue 的 if 顺序——先判断 break 还是先判断 continue 会影响结果',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch6 — 收纳箱：数组（8 节）
// ─────────────────────────────────────────────────────────────
const ch6: Chapter = {
  id: 'ch6',
  title: '收纳箱：数组',
  description: '用数组存放一组数据，学会增删改查、map 和 filter',
  sections: [
    {
      id: '6.1',
      kind: 'exercise',
      chapterId: 'ch6',
      title: '什么是数组 — 一个装很多数据的盒子',
      content: `## 数组：有序的数据集合

> 🔍 **这个能解决什么问题？** 一个变量只能存一个值——但现实中你经常需要存"一堆"东西：一周七天的温度、购物车里的商品、一个班的学生名单。**数组就是装"一堆数据"的容器**。

### 更直观的理解：有编号的储物柜

\`\`\`
┌────┬────┬────┬────┬────┐
│ 0  │ 1  │ 2  │ 3  │ 4  │  ← 索引（位置编号）
├────┼────┼────┼────┼────┤
│ 苹 │ 香 │ 橙 │ 草 │ 西 │
│ 果 │ 蕉 │ 子 │ 莓 │ 瓜 │
└────┴────┴────┴────┴────┘
\`\`\`

每个格子都有一个**编号（索引）**，从 **0** 开始数——不是从 1！

第 1 个元素是 \`[0]\`，第 2 个是 \`[1]\`，最后一个是 \`[length - 1]\`。

---

### 创建数组

\`\`\`typescript
const fruits = ["苹果", "香蕉", "橙子"]
//               ↑ 0    ↑ 1    ↑ 2      ← 索引从 0 开始！
\`\`\`

---

### 访问元素：用编号取东西

\`\`\`typescript
fruits[0]   // "苹果"（第 1 个）
fruits[1]   // "香蕉"（第 2 个）
fruits[9]   // undefined（不存在，因为没有第 10 个）
\`\`\`

---

### 常用属性

\`\`\`typescript
fruits.length   // 3 —— 数组有几个元素
\`\`\`

---

> 💥 **新手常踩的坑：**
> 1. **数组索引从 0 开始，不是 1！** — 这是初学者犯错最多的地方。\`arr[0]\` 是第一个。
> 2. **访问不存在的索引** — \`arr[100]\` 不报错，但返回 \`undefined\`。
> 3. **const 数组的内容可以改** — \`const arr = [1, 2, 3]\` 后 \`arr[0] = 99\` 是允许的！

> 🔥 **学了就能做：** 运行下面的代码，看看如何用数组存一组数据。试着加一个新城市，看看数组长度怎么变！`,
      starterCode: `const cities = ["北京", "上海", "广州", "深圳"]

console.log("第一个城市：" + cities[0])
console.log("最后一个城市：" + cities[cities.length - 1])
console.log("共有城市数：" + cities.length)
console.log("所有城市：" + cities)`,
      expectedOutput: `第一个城市：北京
最后一个城市：深圳
共有城市数：4
所有城市：北京,上海,广州,深圳`,
      hint: 'cities.length - 1 是最后一个元素的索引，因为索引从 0 开始',
    },
    {
      id: '6.2',
      kind: 'exercise',
      chapterId: 'ch6',
      title: '增删改查 — push / pop / includes',
      content: `## 操作数组的常用方法

---

### 增加元素

\`\`\`typescript
const arr = [1, 2, 3]
arr.push(4)      // 末尾加一个 → [1, 2, 3, 4]
arr.push(5, 6)   // 末尾加多个 → [1, 2, 3, 4, 5, 6]
\`\`\`

---

### 删除元素

\`\`\`typescript
arr.pop()    // 删除最后一个，并返回它的值
arr.shift()  // 删除第一个，并返回它的值
\`\`\`

---

### 修改元素

\`\`\`typescript
arr[0] = 99  // 用索引直接改
\`\`\`

---

### 查找元素

\`\`\`typescript
arr.indexOf(3)   // 返回元素 3 的索引，找不到返回 -1
arr.includes(3)  // 是否包含元素 3，返回 true/false
\`\`\``,
      starterCode: `const todo = ["写代码", "喝咖啡", "写文档"]
console.log("初始：", todo)

todo.push("代码复查")
console.log("push 后：", todo)

const removed = todo.pop()
console.log("pop 删掉了：", removed)
console.log("pop 后：", todo)

console.log("包含'喝咖啡'？", todo.includes("喝咖啡"))
console.log("'写代码'在哪：", todo.indexOf("写代码"))`,
      expectedOutput: `初始： [ '写代码', '喝咖啡', '写文档' ]
push 后： [ '写代码', '喝咖啡', '写文档', '代码复查' ]
pop 删掉了： 代码复查
pop 后： [ '写代码', '喝咖啡', '写文档' ]
包含'喝咖啡'？ true
'写代码'在哪： 0`,
      hint: 'push 在末尾加，pop 从末尾删——想象一摞盘子，只从最上面放和拿',
    },
    {
      id: '6.3',
      kind: 'exercise',
      chapterId: 'ch6',
      title: 'map — 每个元素都变一下',
      content: `## map：批量转换数组里的每个元素

\`map\` 遍历数组，对每个元素应用一个函数，**返回一个全新的数组**（原数组不变！）。

---

### 语法

\`\`\`typescript
const 新数组 = 原数组.map(item => 对item的操作)
\`\`\`

---

### 例子

\`\`\`typescript
const prices = [10, 20, 30]

// 每个价格打八折
const discounted = prices.map(p => p * 0.8)
console.log(discounted) // [8, 16, 24]

// 原数组没变
console.log(prices)     // [10, 20, 30]
\`\`\`

---

\`map\` 的本质是**数据形状转换**：把一种形状的数组变成另一种形状。这在实际开发中极其常用！`,
      starterCode: `const names = ["alice", "bob", "charlie"]

// 把每个名字首字母大写
const capitalized = names.map(name => {
  return name[0].toUpperCase() + name.slice(1)
})
console.log(capitalized)

// 计算每个名字的长度
const lengths = names.map(name => name.length)
console.log(lengths)`,
      expectedOutput: `[ 'Alice', 'Bob', 'Charlie' ]
[ 5, 3, 7 ]`,
      hint: 'name[0] 取第一个字符，.toUpperCase() 变大写，.slice(1) 取从第 2 个字符开始的剩余部分',
    },
    {
      id: '6.4',
      kind: 'exercise',
      chapterId: 'ch6',
      title: 'filter — 只挑出想要的',
      content: `## filter：筛选满足条件的元素

\`filter\` 遍历数组，保留使函数返回 \`true\` 的元素，**返回一个新数组**。

---

### 语法

\`\`\`typescript
const 筛选结果 = 原数组.filter(item => 保留的条件)
\`\`\`

---

### 例子

\`\`\`typescript
const scores = [45, 88, 60, 73, 30, 95]

const passed = scores.filter(s => s >= 60)
// [88, 60, 73, 95]

const evens = scores.filter(s => s % 2 === 0)
// [88, 60, 30]
\`\`\`

---

### map vs filter

| 方法 | 结果数组长度 | 用途 |
|------|-------------|------|
| map | 和原来一样长 | 转换每个元素 |
| filter | 可能更短 | 筛选部分元素 |

**两者可以链式组合**：\`arr.filter(...).map(...)\``,
      starterCode: `const products = [
  { name: "苹果", price: 5 },
  { name: "西瓜", price: 30 },
  { name: "香蕉", price: 8 },
  { name: "榴莲", price: 80 },
  { name: "葡萄", price: 15 },
]

const affordable = products.filter(p => p.price <= 15)
console.log(\`平价商品（\${affordable.length} 个）：\`)
affordable.forEach(p => console.log(\`  \${p.name}: ¥\${p.price}\`))`,
      expectedOutput: `平价商品（3 个）：
  苹果: ¥5
  香蕉: ¥8
  葡萄: ¥15`,
      hint: 'filter 不改变原数组，只是从中挑出满足条件的元素，组成新数组',
    },
    {
      id: '6.5',
      kind: 'exercise',
      chapterId: 'ch6',
      title: '数组的类型标注',
      content: `## 给数组标注元素类型

TypeScript 可以指定数组里元素的类型：

\`\`\`typescript
// 写法一：类型后加 []（推荐，简洁）
const numbers: number[] = [1, 2, 3]
const names: string[] = ["小明", "小红"]

// 写法二：泛型写法（效果相同，后面 Ch9 会详细讲泛型）
const numbers: Array<number> = [1, 2, 3]
\`\`\`

---

### 好处：类型检查

\`\`\`typescript
const scores: number[] = [88, 92, 75]
scores.push("优秀")  // ❌ 报错！字符串不能放进 number 数组
\`\`\`

---

### 对象数组

\`\`\`typescript
interface User {
  name: string
  age: number
}

const users: User[] = [
  { name: "小明", age: 18 },
  { name: "小红", age: 20 },
]
\`\`\`

接口 + 数组，是 TypeScript 里最常见的数据结构组合。`,
      starterCode: `interface Student {
  name: string
  score: number
}

const students: Student[] = [
  { name: "小明", score: 88 },
  { name: "小红", score: 95 },
  { name: "小刚", score: 72 },
]

const top = students.filter(s => s.score >= 90)
console.log(\`优秀学生（\${top.length} 人）：\`)
top.forEach(s => console.log(\`  \${s.name}: \${s.score} 分\`))`,
      expectedOutput: `优秀学生（1 人）：
  小红: 95 分`,
      hint: '对象数组 + filter 的组合，在真实项目里非常常用——试着把阈值改成 80 看看',
    },
    {
      id: '6.6',
      kind: 'exercise',
      chapterId: 'ch6',
      title: 'reduce — 把数组"压缩"成一个值',
      content: `## reduce：像滚雪球一样累积

\`map\` 是一变一，\`filter\` 是多选少，\`reduce\` 则是**把整个数组"滚"成一个值**。

---

### 生动的比喻 🎯

想象你有一堆硬币要数总金额：

1. 手里先放 0 元 ← **初始值**
2. 拿起第 1 枚（5 元），手上变成 0+5=5
3. 拿起第 2 枚（10 元），手上变成 5+10=15
4. 拿起第 3 枚（5 元），手上变成 15+5=20
5. 最终手里 20 元 ← **reduce 的结果**

这就是 reduce 的工作方式！**每次拿一个新元素，和上次的结果合并，产生新结果。**

---

### 语法

\`\`\`typescript
数组.reduce((累积值, 当前元素) => 新累积值, 初始值)
\`\`\`

---

### 经典例子：求和

\`\`\`typescript
const scores = [88, 92, 75, 60, 95]

const total = scores.reduce((sum, score) => sum + score, 0)
// sum: 累积值（初始为 0）
// score: 当前遍历的元素
// sum + score: 新的累积值
\`\`\`

执行过程就像这样：
| 轮次 | sum（累积） | score（当前） | 新 sum |
|------|-------------|---------------|--------|
| 1    | 0           | 88            | 88     |
| 2    | 88          | 92            | 180    |
| 3    | 180         | 75            | 255    |
| 4    | 255         | 60            | 315    |
| 5    | 315         | 95            | **410** ✅ |

---

### 还能做什么？

\`\`\`typescript
// 求最大值
const max = scores.reduce((max, s) => s > max ? s : max, 0)

// 求乘积
const product = [1, 2, 3, 4].reduce((p, n) => p * n, 1)
// 1×2×3×4 = 24
\`\`\`

> 💡 **reduce 是数组方法中最灵活的一个**——求和、求积、求最大最小都能用它。
> 不过别着急，先掌握基本用法就够了，更多花式用法以后慢慢学！`,
      starterCode: `const orders = [
  { item: "键盘", price: 299 },
  { item: "鼠标", price: 149 },
  { item: "显示器", price: 1299 },
  { item: "耳机", price: 399 },
]

// 用 reduce 算总价
const total = orders.reduce((sum, o) => sum + o.price, 0)
console.log("订单总额：¥" + total)

// 用 reduce 找最贵的
const mostExpensive = orders.reduce(
  (max, o) => o.price > max.price ? o : max,
  orders[0]
)
console.log("最贵的是：" + mostExpensive.item + "（¥" + mostExpensive.price + "）")

// 平均价
const avg = total / orders.length
console.log("平均价格：¥" + avg.toFixed(0))`,
      expectedOutput: `原始： [1, 2, 3, 2, 4, 2, 5]
2 出现次数： 3
5 出现次数： 1
3 的索引： 2

extend [3,4]：[1, 2, 3, 4]
append [3,4]：[1, 2, [3, 4]]

反转后：['d', 'c', 'b', 'a']
清空后：[]（长度=0）`,
      hint: 'reduce 的第二个参数是初始值——求和从 0 开始，求最大值从第一个元素开始',
    },
    {
      id: '6.7',
      kind: 'exercise',
      chapterId: 'ch6',
      title: 'find / findIndex — 在数组里"找人"',
      content: `## find：找到第一个符合条件的元素

想象你在一排学生中找"第一个成年的人"——你从头扫到尾，找到就停下来。

\`find\` 做的就是这样的事。

---

### find 语法

\`\`\`typescript
const result = 数组.find(item => 条件)
// 返回第一个满足条件的元素
// 如果找不到，返回 undefined
\`\`\`

\`\`\`typescript
const users = [{name:"小明",age:16}, {name:"小红",age:22}, {name:"小刚",age:25}]

const adult = users.find(u => u.age >= 18)
// { name: "小红", age: 22 }  ← 第一个满足条件的
// 小明 16 岁不满足，跳过；小红 22 岁满足，找到了！
\`\`\`

---

### findIndex：找到位置

跟 \`find\` 一样，但返回的是**索引（位置序号）**而不是元素本身：

\`\`\`typescript
const users = [{name:"小明",age:16}, {name:"小红",age:22}, {name:"小刚",age:25}]

const idx = users.findIndex(u => u.name === "小刚")
// 2  ← 小刚在位置 2（从 0 开始数）
// 找不到返回 -1
\`\`\`

> 💡 \`find\` 返回元素，\`findIndex\` 返回位置。找不到时：\`find\` → \`undefined\`，\`findIndex\` → \`-1\`。`,
      starterCode: `const students = [
  { name: "小明", score: 88 },
  { name: "小红", score: 95 },
  { name: "小刚", score: 72 },
  { name: "小丽", score: 91 },
  { name: "小强", score: 55 },
]

// find：第一个 90 分以上的
const topStudent = students.find(s => s.score >= 90)
if (topStudent) {
  console.log("第一个 90+ 的学生是：" + topStudent.name)
} else {
  console.log("没有找到 90 分以上的学生")
}

// findIndex：找到"小强"的位置
const weakIndex = students.findIndex(s => s.name === "小强")
console.log("小强的位置：" + weakIndex)

// 用 findIndex 找到不及格的第一个学生
const failIndex = students.findIndex(s => s.score < 60)
console.log("第一个不及格的位置：" + failIndex)`,
      expectedOutput: `原始 a： [99, 2, 3] （被 b 影响了！）
赋值 b： [99, 2, 3]
拷贝 c： [1, 88, 3]

=== 嵌套列表 ===
原始嵌套： [[99, 2], [3, 4]] （浅拷贝改了内层！）
浅拷贝：   [[99, 2], [3, 4]]
深拷贝：   [[1, 2], [88, 4]]

=== 复制方式 ===
a[:]：      [10, 20, 30]
list(a)：    [10, 20, 30]
a.copy()：   [10, 20, 30]
copy.copy： [10, 20, 30]`,
      hint: '注意看：find 返回的是整个对象（不是名字），所以我们用 topStudent.name 来拿名字',
    },
    {
      id: '6.8',
      kind: 'exercise',
      chapterId: 'ch6',
      title: 'some / every + 链式调用',
      content: `## some 和 every："有没有？"和"是不是都？"

---

### some：至少有一个满足条件？

\`\`\`typescript
const scores = [55, 72, 88, 95]

// 有没有不及格的？
const hasFailed = scores.some(s => s < 60)
// true  ← 55 小于 60，所以有！

// 有没有满分的？
const hasPerfect = scores.some(s => s === 100)
// false  ← 没有人得 100 分
\`\`\`

\`some\` 像在问**"有没有一个……？"**——只要有一个满足就停。

---

### every：所有元素都满足条件？

\`\`\`typescript
const scores = [55, 72, 88, 95]

// 所有人都在 50 分以上？
const allAbove50 = scores.every(s => s >= 50)
// true  ← 是的，最低 55 分

// 所有人都在 60 分以上？
const allPass = scores.every(s => s >= 60)
// false  ← 55 分这个不满足
\`\`\`

\`every\` 像在问**"是不是所有都……？"**——只要有一个不满足就停。

---

### 链式调用：把方法串起来 ✨

这是数组方法最酷的特性之一——方法可以**连在一起写**：

\`\`\`typescript
const result = users
  .filter(u => u.age >= 20)     // 第一步：筛选
  .map(u => u.name)              // 第二步：只取名字
  .join(", ")                    // 第三步：用逗号连成字符串

console.log(result)  // "小红, 小刚"
\`\`\`

**为什么能链式调用？** 因为 \`filter\` 返回新数组，\`map\` 也返回新数组——每个方法的结果正好是下一个方法想要的输入！

就像工厂里的流水线：原材料 → 切割 → 打磨 → 包装 → 成品 🏭`,
      starterCode: `const students = [
  { name: "小明", score: 88, grade: "B" },
  { name: "小红", score: 95, grade: "A" },
  { name: "小刚", score: 72, grade: "C" },
  { name: "小丽", score: 91, grade: "A" },
  { name: "小强", score: 55, grade: "F" },
]

// some：有没有不及格的？
const hasFailed = students.some(s => s.score < 60)
console.log("有不及格？" + hasFailed)

// every：所有人都在 50 分以上吗？
const allPass50 = students.every(s => s.score >= 50)
console.log("都超过50？" + allPass50)

// 链式调用：A级学生的名字，用顿号分隔
const aStudents = students
  .filter(s => s.grade === "A")
  .map(s => s.name)
  .join("、")
console.log("A 级学生：" + aStudents)

// 再来一个：不及格+C级的学生名字
const weakStudents = students
  .filter(s => s.grade === "C" || s.grade === "F")
  .map(s => s.name)
  .join("、")
console.log("需要加油：" + weakStudents)`,
      expectedOutput: `有不及格？true
都超过50？true
A 级学生：小红、小丽
需要加油：小刚、小强`,
      hint: '链式调用时每个方法都返回新数组，所以可以继续 . 下一个方法——操作不会修改原数组',
    },
  ],
};
// ─────────────────────────────────────────────────────────────
//  Ch7 — 函数：你的第一条流水线（6 节）
//  注：7.7（高阶函数）和 7.8（闭包）已移至 Part2 Ch9 后
// ─────────────────────────────────────────────────────────────
const ch7: Chapter = {
  id: 'ch7',
  title: '函数：你的第一条流水线',
  description: '用函数封装可复用逻辑，理解参数、返回值和箭头函数',
  sections: [
    {
      id: '7.1',
      kind: 'exercise',
      chapterId: 'ch7',
      title: '为什么需要函数',
      content: `## 函数：打包你的代码，随时复用

> 🔍 **这个能解决什么问题？** 如果你要计算 10 个圆的面积，难道每次都要写 \`3.14159 * r * r\` 吗？太累了！**函数就是把你常用的代码“打包”起来，起个名字，下次直接用名字调用**。

### 更直观的理解

\`\`\`
┌─────────────────────────────┐
│        函数 = 一台机器              │
│                                      │
│  输入（参数）→ [  函数体  ] → 输出  │
│  radius: 5    │  计算面积  │  78.5   │
│  radius: 8    │  计算面积  │  201.1  │
└─────────────────────────────┘
\`\`\`

每次只要换“原材料”（参数），机器自动产出结果。不用重新造机器！

假设你要计算 3 个圆的面积：

\`\`\`typescript
// ❌ 没有函数：重复代码，改一处要改三处
const area1 = 3.14159 * 5 * 5
const area2 = 3.14159 * 8 * 8
const area3 = 3.14159 * 12 * 12
\`\`\`

\`\`\`typescript
// ✅ 有函数：一次定义，到处调用
function circleArea(r: number) {
  return 3.14159 * r * r
}
const area1 = circleArea(5)
const area2 = circleArea(8)
const area3 = circleArea(12)
\`\`\`

---

### 函数的两大好处

1. **避免重复**（Don't Repeat Yourself 原则）
2. **给逻辑起名字**——代码更容易读懂

就像一条流水线：定义好之后，把原材料扔进去，出来成品。`,
      starterCode: `// 没有函数：每次打折都要重复乘以 0.9
const price1 = 100 * 0.9
const price2 = 200 * 0.9
const price3 = 350 * 0.9

console.log(\`商品1 折后价：\${price1}\`)
console.log(\`商品2 折后价：\${price2}\`)
console.log(\`商品3 折后价：\${price3}\`)`,
      expectedOutput: `商品1 折后价：90
商品2 折后价：180
商品3 折后价：315`,
      hint: '下一节我们就把这段代码改成函数——你会发现清晰多了',
    },
    {
      id: '7.2',
      kind: 'exercise',
      chapterId: 'ch7',
      title: '定义和调用 — 给它一个名字',
      content: `## 定义函数 + 调用函数

---

### 定义函数

\`\`\`typescript
function 函数名() {
  // 函数体：要执行的代码
}
\`\`\`

---

### 调用函数

\`\`\`typescript
函数名()   // 执行函数体里的所有代码
\`\`\`

---

### 关键理解

**定义 ≠ 执行**！

\`\`\`typescript
// 只是"告诉程序有这个函数"，不会执行
function sayHello() {
  console.log("你好！")
}

// 加上 () 才会执行
sayHello()   // 执行！
sayHello()   // 还可以执行第二次——复用！
\`\`\`

函数可以调用任意多次，这就是复用的价值。`,
      starterCode: `function printSeparator() {
  console.log("-------------------")
}

function greet() {
  console.log("欢迎来到蜗牛编程！")
}

printSeparator()
greet()
printSeparator()
greet()
printSeparator()`,
      expectedOutput: `-------------------
欢迎来到蜗牛编程！
-------------------
欢迎来到蜗牛编程！
-------------------`,
      hint: '函数定义的位置不影响调用——你甚至可以把定义写在调用下面',
    },
    {
      id: '7.3',
      kind: 'exercise',
      chapterId: 'ch7',
      title: '参数和返回值 — 输入与输出',
      content: `## 参数：给函数传数据；返回值：从函数拿结果

---

### 参数（输入）

\`\`\`typescript
function greet(name: string) {    // name 是参数
  console.log("你好，" + name)
}
greet("小明")   // "小明" 是传入的实参
greet("小红")   // 每次可以传不同的值
\`\`\`

---

### 返回值（输出）

\`\`\`typescript
function add(a: number, b: number): number {
  return a + b   // return 把结果"吐出来"
}

const result = add(3, 5)   // result = 8
\`\`\`

---

### 函数的输入输出模型

\`\`\`
参数（输入） → [ 函数体处理 ] → return（输出）
\`\`\`

**return 之后的代码不会执行**——return 是函数的出口。`,
      starterCode: `function discount(price: number, rate: number): number {
  return price * rate
}

function describe(name: string, price: number): string {
  return \`\${name} 售价 ¥\${price}\`
}

const finalPrice = discount(200, 0.8)
console.log(describe("耳机", finalPrice))

console.log(describe("键盘", discount(300, 0.7)))`,
      expectedOutput: `耳机 售价 ¥160
键盘 售价 ¥210`,
      hint: '函数可以嵌套调用：discount(300, 0.7) 先计算出结果，再传给 describe',
    },
    {
      id: '7.4',
      kind: 'exercise',
      chapterId: 'ch7',
      title: '箭头函数 — 更简洁的写法',
      content: `## 箭头函数：function 的简洁版 ✨

箭头函数是另一种定义函数的方式，写法更简短：

---

### 三种写法，逐步简化

\`\`\`typescript
// 普通函数
function add(a: number, b: number): number {
  return a + b
}

// 箭头函数（完整版）
const add = (a: number, b: number): number => {
  return a + b
}

// 箭头函数（简洁版——只有一个 return 时可省略花括号和 return）
const add = (a: number, b: number) => a + b
\`\`\`

---

### 什么时候可以省略？

函数体**只有一个表达式**（直接 return 某个值）时，可以省略 \`return\` 和花括号：

\`\`\`typescript
const double = (n: number) => n * 2
const greet = (name: string) => \`你好，\${name}！\`
\`\`\`

**箭头函数在 map / filter 中大量使用**，你已经见过它了！`,
      starterCode: `const square = (n: number) => n * n
const isEven = (n: number) => n % 2 === 0
const greet = (name: string) => \`嗨，\${name}！\`

console.log(square(4))
console.log(square(7))
console.log(isEven(10))
console.log(isEven(7))
console.log(greet("小明"))`,
      expectedOutput: `16
49
true
false
嗨，小明！`,
      hint: '箭头函数只有一个参数时，括号可以省略：n => n * 2 也合法（但加括号更清晰）',
    },
    {
      id: '7.5',
      kind: 'exercise',
      chapterId: 'ch7',
      title: '函数类型标注',
      content: `## 给函数标注类型

TypeScript 可以给函数的**参数**和**返回值**都标注类型：

---

### 写法

\`\`\`typescript
function greet(name: string, age: number): string {
  //                ↑ 参数类型          ↑ 返回值类型
  return \`\${name} 今年 \${age} 岁\`
}

// 箭头函数版
const greet = (name: string, age: number): string =>
  \`\${name} 今年 \${age} 岁\`
\`\`\`

---

### void：不返回值

\`\`\`typescript
function log(msg: string): void {
  console.log(msg)
  // 没有 return
}
\`\`\`

---

### 为什么要写返回值类型？

写了返回值类型，TypeScript 会检查你**是否真的返回了正确类型**——防止忘写 return 或返回了错误的东西。`,
      starterCode: `function formatScore(name: string, score: number): string {
  const grade = score >= 90 ? "优秀" : score >= 60 ? "及格" : "不及格"
  return \`\${name}：\${score} 分（\${grade}）\`
}

function printReport(scores: number[]): void {
  const avg = scores.reduce((s, n) => s + n, 0) / scores.length
  console.log(\`共 \${scores.length} 人，平均分 \${avg.toFixed(1)}\`)
}

console.log(formatScore("小明", 92))
console.log(formatScore("小红", 75))
console.log(formatScore("小刚", 55))
printReport([92, 75, 55])`,
      expectedOutput: `小明：92 分（优秀）
小红：75 分（及格）
小刚：55 分（不及格）
共 3 人，平均分 74.0`,
      hint: 'reduce((sum, n) => sum + n, 0) 是求数组元素之和的标准写法，初始值是最后的 0',
    },
    {
      id: '7.6',
      kind: 'exercise',
      chapterId: 'ch7',
      title: '默认参数与剩余参数 (...rest)',
      content: `## 让函数参数更灵活

---

### 默认参数：调用时不传就用默认值

\`\`\`typescript
// 没有默认参数时
function greet(name: string) {
  console.log("你好，" + name)
}
// greet()  ← 报错！必须传参数

// 有默认参数
function greet(name: string = "陌生人") {
  console.log("你好，" + name)
}
greet()         // "你好，陌生人"
greet("小明")   // "你好，小明"
\`\`\`

---

### 剩余参数 (...rest)：接收任意多个参数

\`\`\`typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((s, n) => s + n, 0)
}

sum(1, 2)          // 3
sum(1, 2, 3, 4, 5) // 15
sum()              // 0
\`\`\`

\`...\` 把传入的所有剩余参数"收集"成一个数组。必须放在**参数列表的最后一位**。

---

### 组合使用

\`\`\`typescript
function log(prefix: string = "[INFO]", ...messages: string[]) {
  console.log(prefix, ...messages)
}

log("[ERROR]", "连接失败", "请重试")
// [ERROR] 连接失败 请重试

log(undefined, "系统启动完成")
// [INFO] 系统启动完成
\`\`\``,
      starterCode: `function createReport(
  title: string = "日报",
  author: string = "匿名",
  ...items: string[]
): string {
  const header = \`📋 \${title}（作者：\${author}）\`
  const body = items.length === 0
    ? "（无内容）"
    : items.map((item, i) => \`  \${i + 1}. \${item}\`).join("\\n")
  return header + "\\n" + body
}

console.log(createReport("周报", "小明", "修复登录bug", "优化首页加载", "更新文档"))
console.log("---")
console.log(createReport(undefined, undefined, "学习 TypeScript"))
console.log("---")
console.log(createReport())`,
      expectedOutput: `📋 周报（作者：小明）
  1. 修复登录bug
  2. 优化首页加载
  3. 更新文档
---
📋 日报（作者：匿名）
  1. 学习 TypeScript
---
📋 日报（作者：匿名）
（无内容）`,
      hint: '传 undefined 给带默认值的参数，会触发默认值——这是一种"跳过"参数的技巧',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch8 — 对象：万物皆描述（8 节）
// ─────────────────────────────────────────────────────────────
const ch8: Chapter = {
  id: 'ch8',
  title: '对象：万物皆描述',
  description: '用对象组织多属性数据，学习 interface 和方法',
  sections: [
    {
      id: '8.1',
      kind: 'exercise',
      chapterId: 'ch8',
      title: '对象是什么 — 描述一个东西的所有属性',
      content: `## 对象：把相关数据打包在一起

> 🔍 **这个能解决什么问题？** 一个人的信息有名字、年龄、分数——用三个独立变量存它们，就像把一个人的东西分三个盒子放。但如果有一百个人呢？**对象就是把这些“属于同一个人/事物的数据”打包在一起。**

### 更直观的理解

\`\`\`
┌─ 学生档案 ────────────────────┐
│  姓名：小明                 │
│  年龄：18                   │
│  分数：88                   │
│  地址：{ 城市: "北京", … } │
└───────────────────────────────────▘
\`\`\`

对象就像一张“档案表”——所有关于同一个事物的信息，整整齐齐放在一起。

之前用单独的变量存数据：
\`\`\`typescript
const name = "小明"
const age = 18
const score = 88
\`\`\`

这三个变量描述的是**同一个人**，放在一起更合理：

\`\`\`typescript
const student = {
  name: "小明",
  age: 18,
  score: 88,
}
\`\`\`

这就是**对象**：用**键值对**（key: value）描述一个事物的多个属性。

---

### 访问属性

\`\`\`typescript
student.name     // "小明"（点号访问，最常用）
student["age"]   // 18（方括号，属性名动态时用）
\`\`\``,
      starterCode: `const book = {
  title: "TypeScript 入门",
  author: "蜗牛老师",
  pages: 256,
  isPublished: true,
}

console.log(\`书名：\${book.title}\`)
console.log(\`作者：\${book.author}\`)
console.log(\`页数：\${book.pages}\`)
console.log(\`已出版：\${book.isPublished}\`)`,
      expectedOutput: `书名：TypeScript 入门
作者：蜗牛老师
页数：256
已出版：true`,
      hint: '对象的属性值可以是任意类型——字符串、数字、布尔值，甚至数组或另一个对象',
    },
    {
      id: '8.2',
      kind: 'exercise',
      chapterId: 'ch8',
      title: '读取和修改属性',
      content: `## 读取和修改对象的属性

---

### 读取

\`\`\`typescript
const user = { name: "小明", age: 18 }
console.log(user.name)   // "小明"
console.log(user.age)    // 18
\`\`\`

---

### 修改属性

\`\`\`typescript
user.age = 19       // 直接赋新值
user.name = "小红"
\`\`\`

---

### const 对象可以改内部属性

\`\`\`typescript
const user = { name: "小明", age: 18 }
user.age = 19  // ✅ 合法！
// user = ...  // ❌ 不行，不能替换整个对象
\`\`\`

\`const\` 锁的是"引用"（不能换一个新对象），但内部属性可以改。

---

### 检查属性是否存在

\`\`\`typescript
"name" in user    // true
"phone" in user   // false
\`\`\``,
      starterCode: `const profile = {
  name: "小明",
  level: 1,
  exp: 0,
}

console.log(\`[\${profile.name}] 等级 \${profile.level}，经验 \${profile.exp}\`)

profile.exp += 100
console.log(\`获得 100 经验，当前经验：\${profile.exp}\`)

profile.level = 2
profile.exp = 0
console.log(\`升级！现在：等级 \${profile.level}，经验 \${profile.exp}\`)`,
      expectedOutput: `[小明] 等级 1，经验 0
获得 100 经验，当前经验：100
升级！现在：等级 2，经验 0`,
      hint: 'const 对象本身不能重新赋值，但对象内部的属性完全可以修改',
    },
    {
      id: '8.3',
      kind: 'exercise',
      chapterId: 'ch8',
      title: '嵌套对象 — 对象里的对象',
      content: `## 嵌套对象：描述更复杂的结构

属性的值也可以是另一个对象，形成**嵌套结构**，用来描述有层次的事物：

\`\`\`typescript
const student = {
  name: "小明",
  address: {
    city: "北京",
    district: "朝阳区",
  },
  scores: {
    math: 95,
    english: 88,
  },
}
\`\`\`

---

### 访问嵌套属性

\`\`\`typescript
student.address.city      // "北京"
student.scores.math       // 95
\`\`\`

用**点号链式**访问，一层一层往里取。

---

### 修改嵌套属性

\`\`\`typescript
student.scores.math = 98   // 直接修改深层属性
\`\`\``,
      starterCode: `const product = {
  name: "无线耳机",
  price: 299,
  specs: {
    battery: "30小时",
    weight: "250g",
    bluetooth: "5.3",
  },
}

console.log(\`商品：\${product.name}\`)
console.log(\`价格：¥\${product.price}\`)
console.log(\`续航：\${product.specs.battery}\`)
console.log(\`重量：\${product.specs.weight}\`)
console.log(\`蓝牙：\${product.specs.bluetooth}\`)`,
      expectedOutput: `商品：无线耳机
价格：¥299
续航：30小时
重量：250g
蓝牙：5.3`,
      hint: '链式访问：product.specs.battery ——先找到 specs 对象，再在里面找 battery',
    },
    {
      id: '8.4',
      kind: 'exercise',
      chapterId: 'ch8',
      title: 'interface — 给对象定型',
      content: `## interface：定义对象的"形状"

当多个地方都会用到相同结构的对象时，用 \`interface\` 统一规定它的形状：

---

### 定义 interface

\`\`\`typescript
interface User {
  name: string
  age: number
  email?: string   // ? 表示可选属性
}
\`\`\`

---

### 使用 interface

\`\`\`typescript
const user1: User = { name: "小明", age: 18 }              // ✅
const user2: User = { name: "小红", age: 20, email: "..." } // ✅
const user3: User = { name: "小刚" }                       // ❌ 缺少 age
\`\`\`

---

### 为什么要用 interface？

1. **一处定义，到处复用**
2. **TypeScript 帮你检查**：少字段、类型写错都报错
3. **IDE 自动补全**：打 \`user.\` 立刻提示所有属性`,
      starterCode: `interface Product {
  id: number
  name: string
  price: number
  inStock: boolean
}

const items: Product[] = [
  { id: 1, name: "键盘", price: 299, inStock: true },
  { id: 2, name: "鼠标", price: 149, inStock: false },
  { id: 3, name: "显示器", price: 1299, inStock: true },
]

const available = items.filter(p => p.inStock)
console.log(\`有货商品（\${available.length} 个）：\`)
available.forEach(p => console.log(\`  [\${p.id}] \${p.name} - ¥\${p.price}\`))`,
      expectedOutput: `有货商品（2 个）：
  [1] 键盘 - ¥299
  [3] 显示器 - ¥1299`,
      hint: 'interface 定义的类型可以用于数组：Product[] 表示"元素都是 Product 的数组"',
    },
    {
      id: '8.5',
      kind: 'exercise',
      chapterId: 'ch8',
      title: '方法 — 对象的行为',
      content: `## 方法：对象不只能存数据，还能做事

对象里的函数类型属性，称为**方法**，描述这个对象"能做什么"：

\`\`\`typescript
const dog = {
  name: "旺财",
  bark() {
    console.log(\`\${this.name} 说：汪汪！\`)
  },
}

dog.bark()   // 旺财 说：汪汪！
\`\`\`

---

### this 关键字

方法里的 \`this\` 指向**调用它的那个对象**（这里是 \`dog\`），用来访问同一对象的其他属性。

---

### 方法的两种写法

\`\`\`typescript
// 写法一（推荐，更简洁）
const obj = {
  greet() { return "你好" }
}

// 写法二
const obj = {
  greet: function() { return "你好" }
}
\`\`\``,
      starterCode: `const counter = {
  count: 0,
  increment() { this.count++ },
  decrement() { this.count-- },
  reset()     { this.count = 0 },
  getValue()  { return this.count },
}

counter.increment()
counter.increment()
counter.increment()
console.log("3次+1后：" + counter.getValue())

counter.decrement()
console.log("1次-1后：" + counter.getValue())

counter.reset()
console.log("重置后：" + counter.getValue())`,
      expectedOutput: `3次+1后：3
1次-1后：2
重置后：0`,
      hint: 'this.count 里的 this 就是 counter 对象本身，方法内部用 this 访问自己的属性',
    },
    {
      id: '8.6',
      kind: 'exercise',
      chapterId: 'ch8',
      title: '展开运算符 (...) 与解构赋值',
      content: `## 展开与解构：操作对象的利器

---

### 展开运算符 (...)：把对象/数组"摊开"

\`\`\`typescript
// 复制对象并覆盖部分属性
const user = { name: "小明", age: 18, city: "北京" }
const updated = { ...user, age: 19 }
// { name: "小明", age: 19, city: "北京" }

// 合并多个对象
const base = { a: 1, b: 2 }
const extra = { c: 3, d: 4 }
const merged = { ...base, ...extra }
// { a: 1, b: 2, c: 3, d: 4 }

// 合并数组
const arr1 = [1, 2]
const arr2 = [3, 4]
const combined = [...arr1, ...arr2]  // [1, 2, 3, 4]
\`\`\`
**后面的同名属性会覆盖前面的**——这非常有用！

---

### 解构赋值：把对象/数组"拆开"

\`\`\`typescript
// 对象解构
const { name, age } = { name: "小明", age: 18, city: "北京" }
console.log(name)  // "小明"
console.log(age)   // 18
// city 没被解构，会被丢弃

// 数组解构
const [first, second] = [10, 20, 30]
console.log(first)   // 10
console.log(second)  // 20
// 30 没被接收

// 重命名 + 默认值
const { name: userName, phone = "无" } = { name: "小明" }
console.log(userName)  // "小明"
console.log(phone)     // "无"
\`\`\`

---

### 函数参数解构（强烈推荐！）

\`\`\`typescript
function showUser({ name, age }: { name: string; age: number }) {
  console.log(\`\${name}，\${age} 岁\`)
}
showUser({ name: "小明", age: 18 })
\`\`\``,
      starterCode: `// 展开运算符 + 解构的实战组合
interface Config {
  host: string
  port: number
  debug: boolean
  retries: number
}

const defaultConfig: Config = {
  host: "localhost",
  port: 3000,
  debug: false,
  retries: 3,
}

function createConfig(overrides: Partial<Config>): Config {
  return { ...defaultConfig, ...overrides }
}

// 不同场景覆盖不同配置
const dev = createConfig({ port: 8080, debug: true })
const prod = createConfig({ host: "api.example.com", debug: false, retries: 5 })

// 解构提取关键信息
function printConfig({ host, port, debug }: Config) {
  console.log(\`服务器：\${host}:\${port}\`)
  console.log(\`调试模式：\${debug ? "开" : "关"}\`)
}

printConfig(dev)
printConfig(prod)`,
      expectedOutput: `服务器：localhost:8080
调试模式：开
服务器：api.example.com:3000
调试模式：关`,
      hint: 'Partial<Config> 让所有属性变为可选——这样 overrides 只需要传要覆盖的字段',
    },
    {
      id: '8.7',
      kind: 'exercise',
      chapterId: 'ch8',
      title: 'this 关键字详解',
      content: `## this：到底指向谁？

\`this\` 的值**不是在定义时决定的，而是在调用时决定的**——谁调用，\`this\` 就指向谁。

---

### 四条规则（优先级从高到低）

#### 1. new 绑定（最高优先级）
\`\`\`typescript
function Person(name: string) {
  this.name = name  // this 指向新创建的对象
}
const p = new Person("小明")
\`\`\`

#### 2. 显式绑定：call / apply / bind
\`\`\`typescript
function greet() { console.log(this.name) }
const user = { name: "小明" }
greet.call(user)  // this 被显式指定为 user → "小明"
\`\`\`

#### 3. 隐式绑定：对象方法调用
\`\`\`typescript
const obj = {
  name: "小红",
  say() { console.log(this.name) }
}
obj.say()  // this → obj → "小红"
\`\`\`

#### 4. 默认绑定（最低优先级）
\`\`\`typescript
function foo() { console.log(this) }
foo()  // 严格模式下 this → undefined
\`\`\`

---

### 箭头函数的 this 不一样！

箭头函数**没有自己的 this**，它捕获定义时外层作用域的 this：
\`\`\`typescript
const obj = {
  name: "小明",
  sayLater() {
    setTimeout(() => {
      console.log(this.name)  // this 指向 obj！
    }, 100)
  }
}
// 如果用普通 function，this 会丢失
\`\`\``,
      starterCode: `// 演示 this 在不同场景下的指向
const classroom = {
  name: "三年二班",
  students: ["小明", "小红", "小刚"],

  // 普通方法：this 指向 classroom
  introduce() {
    console.log(\`班级：\${this.name}\`)
    console.log(\`人数：\${this.students.length}\`)
  },

  // 箭头函数：this 也指向 classroom（捕获外层）
  rollCall() {
    console.log("点名：")
    this.students.forEach((s, i) => {
      // 箭头函数的 this 继承自 rollCall 的 this（classroom）
      console.log(\`  \${i + 1}. \${s}（来自\${this.name}）\`)
    })
  },

  // 普通函数会丢失 this！
  badRollCall() {
    console.log("错误点名：")
    this.students.forEach(function(s) {
      // 普通 function 的 this 丢失了
      // console.log(this.name)  // ❌ 报错！
      console.log("  " + s)
    })
  },
}

classroom.introduce()
console.log("")
classroom.rollCall()`,
      expectedOutput: `班级：三年二班
人数：3

点名：
  1. 小明（来自三年二班）
  2. 小红（来自三年二班）
  3. 小刚（来自三年二班）`,
      hint: '在回调中用箭头函数是最常见的避免 this 丢失的方法——记住这个模式！',
    },
    {
      id: '8.8',
      kind: 'exercise',
      chapterId: 'ch8',
      title: '可选链 (?.) 与空值合并 (??)',
      content: `## 安全地访问深层属性

---

### 可选链 (?.)：优雅处理 null/undefined

访问深层嵌套属性时，中间某一环可能是 \`null\` 或 \`undefined\`。以前需要层层判断：

\`\`\`typescript
// ❌ 旧写法：层层判断
let city
if (user && user.address && user.address.city) {
  city = user.address.city
}

// ✅ 可选链：一行搞定
const city = user?.address?.city
// 如果 user 或 address 是 null/undefined，直接返回 undefined，不报错
\`\`\`

---

### 可选链的三种用法

\`\`\`typescript
// 1. 属性访问
obj?.prop

// 2. 方法调用（方法不存在时跳过）
obj?.method?.()

// 3. 数组索引
arr?.[0]
\`\`\`

---

### 空值合并 (??)：给 null/undefined 设默认值

\`\`\`typescript
// || 的问题：0、""、false 也被当作"假"
const count = 0 || 10     // 10（0 被错误替换了！）

// ?? 只把 null/undefined 当"空"
const count = 0 ?? 10     // 0（正确！）
const name = null ?? "匿名"  // "匿名"
const score = undefined ?? 60  // 60
\`\`\`

---

### 组合使用：?. 和 ?? 是绝配

\`\`\`typescript
const city = user?.address?.city ?? "未知城市"
// 安全访问 + 默认值，一步到位！
\`\`\``,
      starterCode: `// 模拟从 API 获取的不完整数据
interface User {
  name: string
  profile?: {
    avatar?: string
    bio?: string
    social?: {
      github?: string
      twitter?: string
    }
  }
}

const users: User[] = [
  {
    name: "小明",
    profile: {
      avatar: "/img/xm.png",
      bio: "前端开发者",
      social: { github: "xm-dev" },
    },
  },
  { name: "小红" },
  {
    name: "小刚",
    profile: { bio: "全栈工程师" },
  },
]

users.forEach(u => {
  const avatar = u.profile?.avatar ?? "（默认头像）"
  const bio = u.profile?.bio ?? "（暂无简介）"
  const github = u.profile?.social?.github ?? "（未绑定）"

  console.log(\`👤 \${u.name}\`)
  console.log(\`   头像：\${avatar}\`)
  console.log(\`   简介：\${bio}\`)
  console.log(\`   GitHub：\${github}\`)
})`,
      expectedOutput: `👤 小明
   头像：/img/xm.png
   简介：前端开发者
   GitHub：xm-dev
👤 小红
   头像：（默认头像）
   简介：（暂无简介）
   GitHub：（未绑定）
👤 小刚
   头像：（默认头像）
   简介：全栈工程师
   GitHub：（未绑定）`,
      hint: '?. 和 ?? 组合是处理 API 返回的不完整 JSON 数据的标准姿势——安全又简洁',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch9a — 错误处理与调试（3 节）
// ─────────────────────────────────────────────────────────────
const ch9a: Chapter = {
  id: 'ch9a',
  title: '错误处理与调试',
  description: '认识常见错误类型，学会用 try/catch 优雅处理异常，掌握调试技巧',
  sections: [
    {
      id: '9a.1',
      kind: 'demo',
      chapterId: 'ch9a',
      title: '常见错误类型',
      content: `## 认识 TypeScript 的三大错误类型

程序出错不可怕，可怕的是看不懂错误信息。每种错误都有明确的分类：

---

### SyntaxError — 语法错误

代码"不合语法"，编译器连翻译都不想翻译：
\`\`\`typescript
console.log("你好"   // ❌ 少了一个右括号
// SyntaxError: Unexpected token
\`\`\`
**最容易修**：看错误提示指的位置，补上缺失的符号即可。

---

### ReferenceError — 引用错误

用了不存在的变量或函数：
\`\`\`typescript
console.log(userName)
// ReferenceError: userName is not defined
// 原因：拼写错误或忘记声明变量
\`\`\`

---

### TypeError — 类型错误

对不合适的类型做了不合适的操作：
\`\`\`typescript
const user = null
console.log(user.name)
// TypeError: Cannot read properties of null (reading 'name')
// 原因：user 是 null，不能读它的属性
\`\`\`

---

### 错误的三个关键信息

每个错误都包含：
1. **错误类型**（SyntaxError / ReferenceError / TypeError）
2. **错误描述**（具体出了什么问题）
3. **出错位置**（行号和列号）

**先看类型定位方向，再看描述了解详情，最后根据位置找到代码。**`,
      starterCode: `// 下面的代码有一段会出错，试着读懂错误信息
// 注：这里演示的是"如何识别错误"，实际运行会抛出异常并被捕获

function demonstrateErrors() {
  // 示例 1：正常的代码
  const name = "小明"
  console.log("1. 正常输出：" + name)

  // 示例 2：我们用 try/catch 来优雅地展示错误信息
  try {
    const obj: any = null
    console.log(obj.property)
  } catch (e) {
    if (e instanceof TypeError) {
      console.log("2. 捕获到 TypeError：不能读取 null 的属性")
    }
  }
}

demonstrateErrors()
console.log("3. 程序继续运行 — 没有被错误中断！")`,
      expectedOutput: `1. 正常输出：小明
2. 捕获到 TypeError：不能读取 null 的属性
3. 程序继续运行 — 没有被错误中断！`,
      hint: 'instanceof 可以判断错误的类型——你可以根据不同类型作出不同的处理',
    },
    {
      id: '9a.2',
      kind: 'demo',
      chapterId: 'ch9a',
      title: 'try/catch/finally — 优雅处理错误',
      content: `## 不要让一个错误毁了整个程序

---

### 基本语法

\`\`\`typescript
try {
  // 尝试执行的代码（可能出错）
} catch (error) {
  // 出错时执行（error 包含错误信息）
} finally {
  // 不管成功还是失败，都会执行（可选）
}
\`\`\`

---

### 执行流程

\`\`\`
没有错误：try 全部执行 → catch 跳过 → finally 执行
有错误：  try 出错的那行停止 → catch 执行 → finally 执行
\`\`\`

**try 中出错行之后的代码不会执行**，直接跳到 catch。

---

### 什么时候用 try/catch？

- **网络请求**：服务器可能挂、网可能断
- **文件读写**：文件可能不存在、权限可能不够
- **JSON 解析**：字符串格式可能不对
- **第三方库调用**：你不知道它内部会抛出什么错

---

### 最佳实践

\`\`\`typescript
// ✅ 好的做法：捕获具体的操作
try {
  const data = JSON.parse(rawString)
  processData(data)
} catch (e) {
  console.error("数据解析失败：", e)
}

// ❌ 不好的做法：把整个程序包在 try 里
try {
  // 100 行代码……问题在于不知道哪行会出错
} catch (e) {
  console.log(e)
}
\`\`\`

**try 块越小越好——只包裹真正可能出错的操作。**`,
      starterCode: `function safeParse(json: string): { success: true; data: any } | { success: false; error: string } {
  try {
    const data = JSON.parse(json)
    return { success: true, data }
  } catch (e) {
    return { success: false, error: (e as Error).message }
  }
}

function processInput(input: string): string {
  const result = safeParse(input)
  if (result.success) {
    return \`解析成功！数据：\${JSON.stringify(result.data)}\`
  }
  return \`解析失败：\${result.error}\`
}

// 正常 JSON
console.log(processInput('{"name":"小明","score":95}'))

// 格式错误的 JSON（少了一个引号）
console.log(processInput('{"name":"小明,"score":95}'))

// 空字符串
console.log(processInput(""))
console.log("所有输入处理完毕 ✅")`,
      expectedOutput: `解析成功！数据：{"name":"小明","score":95}
解析失败：Expected ',' or '}' after property value in JSON at position 22
解析失败：Unexpected end of JSON input
所有输入处理完毕 ✅`,
      hint: 'safeParse 的返回类型是一个"结果类型"——成功返回数据，失败返回错误信息。这是 Rust 风格的错误处理模式',
      validation: tsJsonParseValidation,
    },
    {
      id: '9a.3',
      kind: 'demo',
      chapterId: 'ch9a',
      title: '调试技巧：console.log 进阶、debugger 语句、断点',
      content: `## 从"打印调试"到"专业调试"

---

### console.log 的进阶用法

\`\`\`typescript
// 1. 带标签打印 — 一看就知道是什么变量
console.log("用户名：", userName)

// 2. console.table — 表格化显示数组/对象
console.table([{name:"小明",score:88}, {name:"小红",score:95}])

// 3. console.group — 分组缩进
console.group("用户信息")
console.log("姓名：小明")
console.log("年龄：18")
console.groupEnd()

// 4. 计时器
console.time("加载数据")
// ... 代码 ...
console.timeEnd("加载数据")  // 输出：加载数据：123.45ms
\`\`\`

---

### debugger 语句

在代码中直接插入 \`debugger;\`，如果浏览器或 VS Code 调试模式打开，程序会在这里**自动暂停**：

\`\`\`typescript
function calculate(a: number, b: number) {
  debugger  // 程序会在这里停住，你可以检查 a 和 b 的值
  return a * b
}
\`\`\`

---

### VS Code 断点调试（最强大）

1. 在行号左边点击，出现红点（断点）
2. 按 F5 启动调试
3. 程序运行到断点会自动暂停
4. 此时可以：查看变量值、单步执行、修改变量……

**专业开发中，断点调试比 console.log 高效 10 倍**——你可以"让时间暂停"，仔细检查程序的每一个状态。`,
      starterCode: `// 演示进阶调试技巧
interface DebugInfo {
  step: string
  value: any
  timestamp: string
}

const debugLog: DebugInfo[] = []

function debugTrace(step: string, value: any) {
  debugLog.push({
    step,
    value,
    timestamp: new Date().toISOString().slice(11, 19),
  })
}

function processOrder(orderId: number, amount: number, discount: number): number {
  debugTrace("输入", { orderId, amount, discount })

  // 假设这里有复杂的计算逻辑
  let final = amount
  debugTrace("初始金额", final)

  final = final * (1 - discount)
  debugTrace("折扣后", final)

  if (final < 0) {
    debugTrace("异常", "金额为负数！")
    return 0
  }

  debugTrace("最终结果", final)
  return final
}

console.log("计算结果：" + processOrder(1001, 200, 0.15))
console.log("")
console.log("调试追踪记录：")
console.table(debugLog)`,
      expectedOutput: `计算结果：170

调试追踪记录：
┌─────────┬──────────┬─────────────────────┬──────────┐
│ (index) │ step     │ value               │ timestamp│
├─────────┼──────────┼─────────────────────┼──────────┤
│ 0       │ '输入'   │ { orderId: 1001, ...}│ '...'   │
│ 1       │ '初始金额'│ 200                │ '...'   │
│ 2       │ '折扣后' │ 170                │ '...'   │
│ 3       │ '最终结果'│ 170                │ '...'   │
└─────────┴──────────┴─────────────────────┴──────────┘`,
      hint: '构建自己的 debugTrace 函数是"打印调试"的升级版——把所有关键步骤记录下来，出问题时一目了然',
      validation: tsDebugTraceValidation,
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  导出
// ─────────────────────────────────────────────────────────────
export const part1Chapters: Chapter[] = [
  ch0, ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9a,
  // ─── 实战项目 P1 ───
  {
    id: 'p1',
    title: '实战：CLI 待办事项',
    description: '用 TypeScript 构建命令行待办事项工具，综合运用变量/数组/函数/文件操作',
    sections: [
      {
        id: 'p1.1',
        kind: 'demo',
        chapterId: 'p1',
        title: '设计 + 数据结构',
        content: `## CLI 待办事项：设计思路

终于要做一个完整的项目了！把第 1-8 章的知识全部用上。

---

### 需求

\`\`\`
✅ 添加待办：add 买牛奶
✅ 查看列表：list
✅ 标记完成：done 1
✅ 删除待办：delete 2
✅ 退出程序：quit
\`\`\`

---

### 数据结构

\`\`\`typescript
interface Todo {
  id: number
  task: string         // 任务描述
  done: boolean        // 是否完成
  createdAt: string    // 创建时间
}
\`\`\`

---

### 程序流程

\`\`\`
启动 → 加载已有数据 → 等待用户输入 → 执行命令 → 保存数据 → 回到等待
\`\`\`

---

这个项目虽然运行在命令行，但涵盖了**类型定义、数组操作、文件读写、程序流程控制**——和真正的全栈应用思路完全一样！`,
        starterCode: `// 定义待办事项的数据结构和初始数据
interface Todo {
  id: number
  task: string
  done: boolean
  createdAt: string
}

// 模拟待办列表（实际 CLI 中从文件加载）
const todos: Todo[] = [
  { id: 1, task: "学习 TypeScript 基础", done: true, createdAt: "2026-06-01" },
  { id: 2, task: "完成 CLI 项目", done: false, createdAt: "2026-06-15" },
]

function showTodos(list: Todo[]) {
  if (list.length === 0) {
    console.log("📭 待办列表为空")
    return
  }
  console.log(\`待办列表（共 \${list.length} 项）：\`)
  list.forEach(t => {
    const status = t.done ? "✅" : "⬜"
    console.log(\`  \${status} [\${t.id}] \${t.task}\`)
  })
}

showTodos(todos)`,
        expectedOutput: `待办列表（共 2 项）：
  ✅ [1] 学习 TypeScript 基础
  ⬜ [2] 完成 CLI 项目`,
        hint: 'interface 定义数据结构是项目的第一步——好的类型设计让后续编码事半功倍',
      },
      {
        id: 'p1.2',
        kind: 'demo',
        chapterId: 'p1',
        title: '核心功能 — add / list / done / delete',
        content: `## 实现待办事项的四个核心操作

---

### add — 添加任务

\`\`\`typescript
function addTodo(task: string): Todo {
  const todo: Todo = {
    id: nextId++,
    task,
    done: false,
    createdAt: new Date().toISOString().split('T')[0],
  }
  todos.push(todo)
  console.log(\`✅ 已添加：\${task}\`)
  return todo
}
\`\`\`

---

### list — 查看列表

\`\`\`typescript
function listTodos(filter?: 'all' | 'done' | 'pending') {
  const list = filter === 'done'
    ? todos.filter(t => t.done)
    : filter === 'pending'
      ? todos.filter(t => !t.done)
      : todos
  showTodos(list)
}
\`\`\`

---

### done — 标记完成

\`\`\`typescript
function markDone(id: number) {
  const todo = todos.find(t => t.id === id)
  if (!todo) { console.log(\`❌ 找不到 id=\${id}\`); return }
  todo.done = true
  console.log(\`✅ 已完成：\${todo.task}\`)
}
\`\`\`

---

### delete — 删除

\`\`\`typescript
function deleteTodo(id: number) {
  const idx = todos.findIndex(t => t.id === id)
  if (idx === -1) { console.log(\`❌ 找不到 id=\${id}\`); return }
  const removed = todos.splice(idx, 1)[0]
  console.log(\`🗑️ 已删除：\${removed.task}\`)
}
\`\`\``,
        starterCode: `// 实现待办事项的完整操作
interface Todo { id: number; task: string; done: boolean }

class TodoApp {
  private todos: Todo[] = []
  private nextId = 1

  add(task: string) {
    this.todos.push({ id: this.nextId++, task, done: false })
  }

  list() { return this.todos }

  done(id: number): boolean {
    const t = this.todos.find(t => t.id === id)
    if (t) { t.done = true; return true }
    return false
  }

  delete(id: number): boolean {
    const idx = this.todos.findIndex(t => t.id === id)
    if (idx === -1) return false
    this.todos.splice(idx, 1)
    return true
  }
}

const app = new TodoApp()
app.add("学 TypeScript")
app.add("写项目")
app.add("复习")

console.log("初始列表：" + app.list().length + " 项")
app.done(1)
app.delete(3)

app.list().forEach(t => {
  const s = t.done ? "✅" : "⬜"
  console.log(\`\${s} [\${t.id}] \${t.task}\`)
})`,
        expectedOutput: `初始列表：3 项
✅ [1] 学 TypeScript
⬜ [2] 写项目`,
        hint: 'splice(idx, 1) 从数组中删除 1 个元素，返回被删除元素的数组——非常适合 delete 操作',
      },
      {
        id: 'p1.3',
        kind: 'demo',
        chapterId: 'p1',
        title: '持久化 — 读写 JSON 文件',
        content: `## 让数据在程序重启后还在

目前为止，数据只存在内存中——程序退出就没了。用文件来持久化！

---

### 保存到 JSON 文件

\`\`\`typescript
import fs from 'fs'

function saveTodos(todos: Todo[], filePath: string) {
  const json = JSON.stringify(todos, null, 2)  // 格式化 JSON
  fs.writeFileSync(filePath, json, 'utf-8')
  console.log(\`💾 已保存 \${todos.length} 项到 \${filePath}\`)
}
\`\`\`

---

### 启动时加载

\`\`\`typescript
function loadTodos(filePath: string): Todo[] {
  if (!fs.existsSync(filePath)) {
    console.log('📂 没有找到保存文件，从空列表开始')
    return []
  }
  const json = fs.readFileSync(filePath, 'utf-8')
  const todos = JSON.parse(json) as Todo[]
  console.log(\`📂 已加载 \${todos.length} 项待办\`)
  return todos
}
\`\`\`

---

### 程序生命周期

\`\`\`
启动 → loadTodos() → 循环处理命令 → saveTodos() → 退出
\`\`\`

---

### 完整工作流

\`\`\`typescript
function main() {
  const filePath = './todos.json'
  const todos = loadTodos(filePath)
  // ... 处理用户输入（add/list/done/delete）
  saveTodos(todos, filePath)
}
\`\`\``,
        starterCode: `// 模拟 JSON 文件的序列化和反序列化
interface Todo { id: number; task: string; done: boolean }

class TodoStorage {
  // 模拟文件内容（实际项目用 fs.readFileSync）
  private fileContent: string = "[]"

  save(todos: Todo[]): string {
    this.fileContent = JSON.stringify(todos, null, 2)
    return this.fileContent
  }

  load(): Todo[] {
    try {
      const parsed = JSON.parse(this.fileContent)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
}

const storage = new TodoStorage()

// 模拟保存
const todos: Todo[] = [
  { id: 1, task: "学 TypeScript", done: true },
  { id: 2, task: "写 CLI 工具", done: false },
]
const saved = storage.save(todos)
console.log("保存的 JSON：")
console.log(saved)

// 模拟加载
const loaded = storage.load()
console.log(\`\\n加载结果：\${loaded.length} 项\`)
loaded.forEach(t => console.log(\`  [\${t.id}] \${t.task} (\${t.done ? "完成" : "未完成"})\`))`,
        expectedOutput: `保存的 JSON：
[
  {
    "id": 1,
    "task": "学 TypeScript",
    "done": true
  },
  {
    "id": 2,
    "task": "写 CLI 工具",
    "done": false
  }
]

加载结果：2 项
  [1] 学 TypeScript (完成)
  [2] 写 CLI 工具 (未完成)`,
        hint: 'JSON.stringify(obj, null, 2) 的第三个参数是缩进空格数——让 JSON 文件人类可读',
      },
    ],
  },
];
