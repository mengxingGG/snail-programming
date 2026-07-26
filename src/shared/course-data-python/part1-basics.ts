// 🐍 第一部分：Python 启蒙 — Ch-1 ~ Ch9 + P1 实战项目（~50 节）
// 参考：Python Crash Course / Automate the Boring Stuff，结合蜗牛教学理念改写
// 规范：每节一个概念 | content ≤ 700字 | starterCode 3-10行 | expectedOutput 精确匹配

import type { Chapter, SectionValidation } from '../types/course';

const pythonEnvironmentValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'exact', value: '=== 环境信息 ===' },
    { type: 'prefix', value: 'Python 版本：' },
    { type: 'prefix', value: '操作系统：' },
    { type: 'prefix', value: '架构：' },
    { type: 'exact', value: '✅ Python 版本符合要求（≥ 3.9）' },
  ],
};

const pythonRuntimeValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'prefix', value: 'Python 版本：' },
    { type: 'prefix', value: '运行平台：' },
    { type: 'exact', value: '一切就绪，开始学习吧！🐍' },
  ],
};

const pythonIntroRenameValidation: SectionValidation = {
  mode: 'edit_required',
  requireCodeChangeFromStarter: true,
  codeRules: [
    { type: 'not_includes', value: '我的名字叫：小明' },
  ],
  outputRules: [
    { type: 'exact', value: 'Hello, World!' },
    { type: 'exact', value: '你好，Python！' },
    { type: 'regex', value: '^我的名字叫：(?!小明$).+' },
  ],
  successMessage: '很好，你已经把名字改成自己的了。',
  failureMessage: '请保留前两行，并把第三行的“小明”改成你自己的名字。',
  expectedHint: 'Hello, World!\n你好，Python！\n我的名字叫：你的名字（不能还是小明）',
};

const pythonMedianBugfixValidation: SectionValidation = {
  mode: 'edit_required',
  requireCodeChangeFromStarter: true,
  codeRules: [
    { type: 'includes', value: 'result = sorted_nums[mid]' },
  ],
  outputRules: [
    { type: 'exact', value: '[DEBUG] 输入：[1, 3, 5, 7, 9]' },
    { type: 'exact', value: '[DEBUG] 排序后：[1, 3, 5, 7, 9]' },
    { type: 'exact', value: '[DEBUG] 长度 n=5' },
    { type: 'exact', value: '[DEBUG] 中间索引 mid=2' },
    { type: 'exact', value: '[DEBUG] 奇数情况：直接取 sorted_nums[2]' },
    { type: 'exact', value: '[DEBUG] 结果=5' },
    { type: 'exact', value: '中位数 [1,3,5,7,9]： 5' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '[DEBUG] 输入：[1, 2, 3, 4]' },
    { type: 'exact', value: '[DEBUG] 排序后：[1, 2, 3, 4]' },
    { type: 'exact', value: '[DEBUG] 长度 n=4' },
    { type: 'exact', value: '[DEBUG] 中间索引 mid=2' },
    { type: 'exact', value: '[DEBUG] 偶数情况：(2 + 3) / 2' },
    { type: 'exact', value: '[DEBUG] 结果=2.5' },
    { type: 'exact', value: '中位数 [1,2,3,4]： 2.5' },
  ],
  successMessage: '很好，你已经修复了中位数计算里的 bug。',
  failureMessage: '这是一道修 bug 练习，请先改对 `median()` 的奇数情况分支，再让输出和预期一致。',
};

const pythonMemoPersistenceValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'exact', value: '💾 已保存到 memos.json' },
    { type: 'exact', value: '📂 加载了 2 条备忘：' },
    { type: 'exact', value: '  [1] 买水果' },
    { type: 'exact', value: '  [2] 学习Python' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '文件存在？True' },
    { type: 'prefix', value: '文件大小：' },
  ],
};

const pythonTerminalBasicsValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'exact', value: '📁 当前工作目录（示例）：' },
    { type: 'exact', value: '  /home/user/project' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '📂 目录内容（示例）：' },
    { type: 'exact', value: '  📁 src' },
    { type: 'exact', value: '  📄 main.py' },
    { type: 'exact', value: '  📄 README.md' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '🗂️ 路径拼接示例：' },
    { type: 'exact', value: '  新项目路径：/home/user/project/my_project' },
    { type: 'exact', value: '  是否存在？False（文件尚未创建）' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '🐍 运行 Python 的命令：' },
    { type: 'exact', value: '  python3 my_script.py（macOS/Linux）' },
    { type: 'exact', value: '  python my_script.py（Windows）' },
  ],
};

const pythonVenvValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'exact', value: '=== 虚拟环境检查 ===' },
    { type: 'prefix', value: 'Python 路径：' },
    { type: 'regex', value: '^是否在虚拟环境中：(✅ 是|❌ 否（系统 Python）)$' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '📁 虚拟环境目录结构：' },
    { type: 'exact', value: 'myenv/' },
    { type: 'exact', value: '  ├── bin/        (Scripts/ on Windows)' },
    { type: 'exact', value: '  │   ├── python     ← 这个环境的 Python' },
    { type: 'exact', value: '  │   ├── pip        ← 这个环境的 pip' },
    { type: 'exact', value: '  │   └── activate   ← 激活脚本' },
    { type: 'exact', value: '  ├── lib/' },
    { type: 'exact', value: '  │   └── site-packages/  ← pip 安装的包放这里' },
    { type: 'exact', value: '  └── pyvenv.cfg' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '💡 创建命令：python -m venv myenv' },
    { type: 'regex', value: '^💡 激活命令：(myenv\\\\Scripts\\\\activate|source myenv/bin/activate)$' },
  ],
  expectedHint: `=== 虚拟环境检查 ===
Python 路径：<当前 Python 环境路径>
是否在虚拟环境中：✅ 是 / ❌ 否（取决于运行环境）

📁 虚拟环境目录结构：
myenv/
  ├── bin/        (Scripts/ on Windows)
  │   ├── python     ← 这个环境的 Python
  │   ├── pip        ← 这个环境的 pip
  │   └── activate   ← 激活脚本
  ├── lib/
  │   └── site-packages/  ← pip 安装的包放这里
  └── pyvenv.cfg

💡 创建命令：python -m venv myenv
💡 激活命令：Windows 用 myenv\\Scripts\\activate，macOS/Linux 用 source myenv/bin/activate`,
};

const generatorAddressValidation: SectionValidation = {
  mode: 'regex_pattern',
  outputRules: [
    { type: 'exact', value: '列表版本： [0, 2, 4, 6, 8, 10]' },
    { type: 'exact', value: '生成器遍历： 0 2 4 6 8 10' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '生成器表达式：' },
    { type: 'regex', value: '^gen 对象： <generator object <genexpr> at 0x[0-9a-fA-F]+>$' },
    { type: 'exact', value: '逐个取值： 0 1 4 9 16' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '无限计数器前5个：' },
    { type: 'exact', value: '0 1 2 3 4' },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch-1 — 计算机与代码启蒙（6 节）
//  目标：为完全零基础的用户搭建"计算机是什么？编程是什么？"的认知桥梁
// ─────────────────────────────────────────────────────────────
const chMinus1: Chapter = {
  id: 'ch-1',
  title: '计算机与代码启蒙',
  description: '从零开始：计算机是什么？代码是什么？文件是什么？为完全没接触过编程的你准备',
  sections: [
    {
      id: '-1.1',
      chapterId: 'ch-1',
      title: '计算机是什么？—— 硬件与软件',
      content: `## 计算机是什么？

你可能每天都在用计算机（电脑/手机/平板），但你真的知道它"是什么"吗？

---

### 🖥️ 硬件（Hardware）—— 你看得见摸得着的部分

| 部件 | 好比 | 作用 |
|------|------|------|
| CPU（中央处理器） | 🧠 大脑 | 负责计算和思考 |
| 内存（RAM） | 📝 临时便签 | 记着正在做的事情 |
| 硬盘/SSD | 📦 仓库 | 存着所有文件和数据 |
| 显示器 | 👀 眼睛 | 把结果展示给你看 |
| 键盘/鼠标 | 🎙️ 嘴巴和耳朵 | 让你告诉计算机做什么 |

**关键理解：** 内存就像书桌桌面——你在桌面上工作；硬盘就像书柜——存放不用的书。桌面上放不下时，需要从书柜拿；书柜里没有的，需要重新买。

---

### 💿 软件（Software）—— 你看不见但它在运行

软件是写在计算机里的"指令集"：

- **操作系统**（Windows/macOS/Linux）—— 计算机的"管家"，管理所有硬件和软件
- **应用程序**（浏览器/游戏/编辑器）—— 你直接用的工具
- **代码/程序**—— 让计算机做特定事情的指令

---

### 🪜 一句话总结

> **硬件是身体，软件是灵魂。硬件是计算机的"身体"（嘴巴、眼睛、大脑），软件是告诉这个身体该怎么动的"思想"。**`,
      starterCode: `# 用 Python 展示计算机信息（用固定值确保匹配）
print("=== 你的计算机 ===")
print("操作系统：Windows 10")
print("计算机名：MY-PC")
print("Python 版本：3.13.0")
print()
print('💡 上面这些信息就是计算机"自我介绍"的结果')
print("每一行文字都是计算机执行代码后给我们的回答")`,
      expectedOutput: `=== 你的计算机 ===
操作系统：Windows 10
计算机名：MY-PC
Python 版本：3.13.0

💡 上面这些信息就是计算机"自我介绍"的结果
每一行文字都是计算机执行代码后给我们的回答`,
      hint: '你不必理解这段代码的每一部分——先感受一下"让计算机回答你问题"的感觉。代码就像你在问计算机问题，它回答你。这就是编程！',
    },
    {
      id: '-1.2',
      chapterId: 'ch-1',
      title: '什么是代码？编程到底在干什么？',
      content: `## 什么是代码？

**代码就是写给计算机的"操作说明书"。**

---

### 📖 拿做饭来比喻

| 做饭 | 编程 |
|------|------|
| 📝 菜谱（步骤描述） | 📝 代码（指令列表） |
| 🍳 你动手做菜 | 🖥️ 计算机执行代码 |
| 🍜 出锅的菜 | 📊 程序运行的结果 |
| 🔥 调整火候 | 🔧 修改代码参数 |

**编程 = 把你想让计算机做的事情，用计算机能理解的"语言"写出来。**

---

### 🔤 计算机的语言

计算机天生只懂一种特殊的"语言"——由 0 和 1 组成的信号。但好消息是：**你不需要学这种语言！**

Python 就像一个**翻译官**，你写：
\`\`\`python
print("你好")
\`\`\`
Python 自动把它翻译成计算机能懂的 0 和 1，然后计算机去执行。

> 你只需要学 Python 这一种语言，计算机那边的翻译工作交给 Python 就好。就像你对着手机说"打开微信"，手机自己处理那些复杂的底层操作。

---

### 🧩 编程的核心三件事

所有程序归根结底只有三件事：

1. **输入** — 从键盘/文件/网络拿数据
2. **处理** — 运算、判断、变换
3. **输出** — 显示、保存、发送

> 编程就是：**告诉计算机"拿什么 → 怎么算 → 给什么"**。`,
      starterCode: `# 编程三要素演示
print("=== 编程三要素 ===")

# 1. 输入（Input）—— 先用固定值模拟，实际中用 input()
name = "小明"

# 2. 处理（Process）
greeting = "你好，" + name + "！欢迎来到编程世界！"

# 3. 输出（Output）
print("=" * 25)
print(greeting)
print("=" * 25)
print("\\n💡 这就是编程的本质：输入 → 处理 → 输出")`,
      expectedOutput: `=== 编程三要素 ===
=========================
你好，小明！欢迎来到编程世界！
=========================

💡 这就是编程的本质：输入 → 处理 → 输出`,
      hint: 'input() 让程序等你打字，print() 把结果展示出来——输入和输出是程序跟"外面"交流的两种方式',
    },
    {
      id: '-1.3',
      chapterId: 'ch-1',
      title: '什么是文件？什么是程序？',
      content: `## 文件：计算机世界的"容器"

计算机里的**文件**就像现实世界中的**文件夹/盒子**——用来装东西。

---

### 📁 文件的两部分

\`\`\`
文件名.后缀名
│     │
│     └── 后缀名告诉计算机：这是什么类型的文件
│
└──────── 文件名方便你记住里面装了什么
\`\`\`

常见文件类型：

| 后缀 | 类型 | 里面装什么 |
|------|------|-----------|
| \`.py\` | Python 源代码 | 你写的 Python 代码 |
| \`.txt\` | 纯文本 | 普通的文字 |
| \`.jpg\` / \`.png\` | 图片 | 照片、插图 |
| \`.mp3\` | 音频 | 音乐、录音 |
| \`.py\` 文件运行后 | 🏃 程序 | 正在执行的代码 |

---

### 🏃 什么是程序？

**程序 = 正在运行的代码**

\`\`\`
你写代码 → 保存到 .py 文件 → 让 Python "运行"它 → Python 逐行执行 → 你看到结果
\`\`\`

就像菜谱（.py 文件）和正在做菜（程序运行）的区别：
- **菜谱** 放在书架上不动 → 这就是**源代码文件**
- **你拿起菜谱开始做菜** → 这就是**运行程序**

---

### 🗂️ 文件夹（目录）

文件夹是用来**组织文件**的：
\`\`\`
我的项目/
  ├── main.py        ← 主程序
  ├── utils.py       ← 工具函数
  └── data/
      └── names.txt  ← 数据文件
\`\`\`

把相关的文件放进一个文件夹，就像把同一件事的资料放进一个档案袋。`,
      starterCode: `# 用 Python 展示文件系统概念（用固定值演示）
print("=== 文件系统探索 ===\\n")
print("📍 当前位置（文件夹）：/home/user/project")
print("\\n📂 里面的内容（示例）：")
print("  📁 src/")
print("  📄 main.py (152 字节)")
print("  📄 README.md (4024 字节)")
print("\\n💡 一个 .py 文件就是一个 Python 程序")
print("💡 运行它：python 文件名.py")`,
      expectedOutput: `=== 文件系统探索 ===

📍 当前位置（文件夹）：/home/user/project

📂 里面的内容（示例）：
  📁 src/
  📄 main.py (152 字节)
  📄 README.md (4024 字节)

💡 一个 .py 文件就是一个 Python 程序
💡 运行它：python 文件名.py`,
      hint: 'os.getcwd() 获取"当前工作目录"（你站在哪个文件夹里），os.listdir() 列出"这个文件夹里有什么"',
    },
    {
      id: '-1.4',
      chapterId: 'ch-1',
      title: '第一次运行 Python —— 不需要懂代码！',
      content: `## 你的第一个 Python 程序

别紧张！你不需要理解每一行代码在做什么。先**运行看看会发生什么**——编程的第一步是"感受"。

---

### 🎯 动手：复制 → 粘贴 → 运行

点击下面的"运行"按钮，看看会发生什么：

---

### 👀 观察程序做了什么

1. 先打印了一行标题 —— \`=== ... ===\`
2. 打印了数字 1 到 5
3. 问了你的名字（输入）
4. 根据你的名字打招呼
5. 算了一个简单的数学题
6. 最后说再见

---

### 🔍 为什么我们这样做？

编程的第一步不是"学语法"，而是**建立直觉**：
- 代码是一行一行**从上到下**执行的
- 代码可以**计算**（像计算器）
- 代码可以**等待你输入**
- 代码可以**根据输入做不同的事**

---

### 🎮 试着改一改！

把代码里的 \`"你的名字"\` 改成你的名字，或者把 \`3 + 5\` 改成 \`100 * 2\`，看看输出怎么变？

> **别怕改坏代码！** 代码不是瓷器——改坏了再改回来就行。大胆尝试是最好的学习方式！`,
      starterCode: `# === 你的第一个 Python 程序 ===
# 不用理解每一行，先感受！

print("🎉 你好！这是你的第一个 Python 程序！")
print()

# 1. 数数
print("从 1 数到 5：")
for i in range(1, 6):
    print(f"  第 {i} 步：Python 正在运行...")

print()
name = "你的名字"
print(f"👋 你好，{name}！欢迎来到编程世界！")

# 2. 计算
print()
print("来做点计算：")
print("  3 + 5 = 8")
print("  10 * 10 = 100")
print("  2024 - 1990 = 34")

print()
print("✨ 看到了吗？每一行代码都让计算机做了一件事！")
print("✨ 这就编程——你告诉计算机做什么，它就照做！")`,
      expectedOutput: `🎉 你好！这是你的第一个 Python 程序！

从 1 数到 5：
  第 1 步：Python 正在运行...
  第 2 步：Python 正在运行...
  第 3 步：Python 正在运行...
  第 4 步：Python 正在运行...
  第 5 步：Python 正在运行...

👋 你好，你的名字！欢迎来到编程世界！

来做点计算：
  3 + 5 = 8
  10 * 10 = 100
  2024 - 1990 = 34

✨ 看到了吗？每一行代码都让计算机做了一件事！
✨ 这就编程——你告诉计算机做什么，它就照做！`,
      hint: '你看到的每一行都是一个"指令"——print() 让计算机打印文字，# 号后面的文字是注释（写给人类看的，计算机忽略）。',
    },
    {
      id: '-1.5',
      chapterId: 'ch-1',
      title: '键盘操作与编程常用快捷键',
      content: `## 编程中常用的键盘操作

如果你不太熟悉键盘，别担心！编程常用的只有几个键。

---

### ⌨️ 最常用的键

| 按键 | 作用 | 备注 |
|------|------|------|
| \`Enter\` | 换行/确认 | 写代码时用来在下一行继续写 |
| \`Space\` | 空格 | Python 用空格缩进表示代码结构 |
| \`Tab\` | 缩进 | 一次输入 4 个空格——Python 里非常重要！ |
| \`Shift\` | 配合打出大写和符号 | 比如 \`!\` \`?\` \`_\` |
| \`Backspace\` | 删除光标前面的字符 | 写错了按这个 |
| \`Delete\` | 删除光标后面的字符 | 用得比 Backspace 少 |
| \`←\` \`→\` \`↑\` \`↓\` | 移动光标 | 方向键在编程中用的非常多 |

---

### 🎯 编程特别常用的符号

\`\`\`
_  下划线（Shift + -）—— Python 命名常用
() 小括号（Shift + 9/0）—— 函数调用
:  冒号（Shift + ;）—— Python 语句结尾
#  井号（Shift + 3）—— 注释
'  单引号
"  双引号（Shift + '）
\`\`\`

---

### 🚀 快捷键

| 快捷键 | 作用 |
|--------|------|
| \`Ctrl + C\` | 复制 |
| \`Ctrl + V\` | 粘贴 |
| \`Ctrl + Z\` | 撤销（写错了救命键！） |
| \`Ctrl + S\` | 保存（一定要经常按！） |
| \`Ctrl + A\` | 全选 |
| \`Ctrl + F\` | 查找 |

---

### ⚡ 最佳实践

1. **经常按 Ctrl+S 保存**——就像写文章要随时存档
2. **出错不要慌**——按 Ctrl+Z 撤销
3. **方向键比鼠标更快**——熟练后尽量用方向键在代码里移动`,
      starterCode: `# 键盘练习小游戏（文字版）
print("=== ⌨️ 键盘热身练习 ===")
print()
print("编程就是用键盘打字让计算机干活")
print()
print("在 Python 里，我们经常需要：")
print("  - 按 Shift + 8 打出星号 *")
print("  - 按 Shift + 9/0 打出括号 ()")
print("  - 按 Shift + ; 打出冒号 :")  
print("  - 按 Tab 键缩进（4 个空格）")
print()
name = "小明"  # 实际中用 input() 获取用户输入
print(f"✅ 太棒了！{name}，你已经在用键盘和程序交互了！")`,
      expectedOutput: `=== ⌨️ 键盘热身练习 ===

编程就是用键盘打字让计算机干活

在 Python 里，我们经常需要：
  - 按 Shift + 8 打出星号 *
  - 按 Shift + 9/0 打出括号 ()
  - 按 Shift + ; 打出冒号 :
  - 按 Tab 键缩进（4 个空格）

✅ 太棒了！小明，你已经在用键盘和程序交互了！`,
      hint: 'Python 用缩进（4 个空格）来表示"这段代码属于上面的那些代码"，这是和别的语言最大的不同——Tab 键就是你最好的朋友！',
    },
    {
      id: '-1.6',
      chapterId: 'ch-1',
      title: '融会贯通：你的第一个"编程思维"练习',
      content: `## 融会贯通：把今天学的连起来

现在你已经知道了：
1. ✅ 计算机 = 硬件 + 软件
2. ✅ 代码 = 写给计算机的操作说明书
3. ✅ 程序 = 正在运行的代码
4. ✅ .py 文件 = 存放 Python 代码的文件
5. ✅ 编程三要素 = 输入 → 处理 → 输出
6. ✅ 键盘基本操作

---

### 🎯 综合挑战

把下面几个零散的知识点串起来，用 Python 做一个"个人名片"程序：

\`\`\`
输入：你的信息（姓名、年龄、爱好）
处理：组织成一句话
输出：打印一张"名片"
\`\`\`

---

### 🧠 编程思维：先想清楚再动手

编程最重要的不是记住语法，而是**想清楚你希望计算机做什么**。

试着用这三步解决任何编程问题：

1. **我要让计算机做什么？**（目标）
2. **计算机需要什么信息？**（输入）
3. **计算机应该给我什么？**（输出）

> 这就是"输入 → 处理 → 输出"——所有编程问题的基本框架。语法可以查，但这个思维框架才是你真正的核心能力！`,
      starterCode: `# 🧠 融会贯通：个人名片程序
# 用你学到的"输入→处理→输出"模式

print("🎨 ===== 我的个人名片 =====\\n")

# 输入（用固定值模拟，实际中用 input()）
name = "小明"
age = "18"
hobby = "编程"

# 处理
intro = f"我叫{name}，今年{age}岁，喜欢{hobby}！"
stars = "⭐" * (len(name) + 3)

# 输出
print("\\n" + "=" * 30)
print(stars)
print("  " + intro)
print(stars)
print("=" * 30)
print("\\n💡 这就是编程：输入信息 → 组合处理 → 输出结果！")`,
      expectedOutput: `🎨 ===== 我的个人名片 =====


==============================
⭐⭐⭐⭐⭐
  我叫小明，今年18岁，喜欢编程！
⭐⭐⭐⭐⭐
==============================

💡 这就是编程：输入信息 → 组合处理 → 输出结果！`,
      hint: '注意到了吗？f"..." 是 Python 的 f-string，可以在字符串里直接放变量。这是 Python 最强大的功能之一！',
    },
  ],
};
// ─────────────────────────────────────────────────────────────
//  Ch0 — 开发环境与工具链（5 节）
// ─────────────────────────────────────────────────────────────
const ch0: Chapter = {
  id: 'ch0',
  title: '开发环境与工具链',
  description: '从零搭建 Python 开发环境：安装 Python、VS Code、终端使用、虚拟环境、pip 包管理',
  sections: [
    {
      id: '0.1',
      chapterId: 'ch0',
      title: '编程环境介绍：你的编程工作台',
      content: `## 欢迎来到编程世界！

在 ch-1 中你已经知道了：**编程 = 告诉计算机做什么**。现在我们来搭建你的"编程工作台"。

---

### 什么是"编程环境"？

就像厨师需要厨房、木匠需要工作台——编程也需要一套工具：

| 工具 | 作用 | 好比 |
|------|------|------|
| **代码编辑器** | 写代码的地方 | 📝 笔记本 |
| **Python 解释器** | 执行代码的程序 | 🏃 跑步的人 |
| **终端/命令行** | 和计算机"对话"的黑窗口 | 🎤 话筒 |
| **包管理器（pip）** | 安装别人写好的工具 | 📦 应用商店 |

好消息：在**蜗牛编程平台**上，以上工具**已经全部准备好了**！你只需要知道怎么用它们。

---

### 蜗牛编程平台使用指南

在这个网页里：
- 📝 **左边**是代码编辑器——你在这里写代码
- ▶️ **中间的运行按钮**——点击它执行代码
- 📊 **右边**是输出区域——显示代码运行结果
- 🔄 **重置按钮**——把代码恢复成初始状态

**你现在就可以试试**：下面的代码已经写好了，点击"运行"看看会发生什么！

---

### Python 能做什么？

Python 是一个"万能工具"——几乎什么都能做：
- 🌐 做网站和 API
- 📊 分析数据、做图表
- ⚙️ 自动处理文件和邮件
- 🎮 开发小游戏

你会在后面的课程中一一学到这些。**现在只要记住：Python 很简单、很强大，而且你已经开始了！**`,
      starterCode: `# 欢迎！这是你的第一个正式 Python 程序
print("=" * 40)
print("  欢迎来到蜗牛编程！")
print("=" * 40)

# 展示 Python 能做的几件事
print("\\n📋 Python 能做这些事：")
print("  🌐 做网站")
print("  📊 分析数据")
print("  ⚙️  自动化办公")
print("  🎮  开发游戏")

print("\\n💪 准备好了吗？后面的课程会带你一步步掌握它们！")
print("📌 提示：修改上面的文字，然后重新运行，看看变化！")`,
      expectedOutput: `========================================
  欢迎来到蜗牛编程！
========================================

📋 Python 能做这些事：
  🌐 做网站
  📊 分析数据
  ⚙️  自动化办公
  🎮  开发游戏

💪 准备好了吗？后面的课程会带你一步步掌握它们！
📌 提示：修改上面的文字，然后重新运行，看看变化！`,
      hint: '蜗牛编程平台已经为你准备好了 Python 环境，你不需要自己安装任何东西！直接开始写代码吧。如果以后你想在自己电脑上编程，我们会教你如何安装。',
    },
    {
      id: '0.2',
      chapterId: 'ch0',
      title: '安装 Python 与 VS Code',
      content: `## 安装 Python 和 VS Code

---

### 安装 Python（各平台）

**Windows：**
1. 访问 python.org/downloads
2. 下载最新版安装包
3. ⚠️ **务必勾选 "Add Python to PATH"**（把 Python 添加到系统路径）
4. 安装完成后，打开 CMD 输入 \`python --version\` 验证

**macOS：**
\`\`\`bash
# 推荐用 Homebrew
brew install python3
python3 --version  # 验证
\`\`\`

**Linux（Ubuntu/Debian）：**
\`\`\`bash
sudo apt update
sudo apt install python3 python3-pip
python3 --version  # 验证
\`\`\`

---

### 安装 VS Code

1. 访问 code.visualstudio.com 下载安装
2. 安装 **Python 扩展**（微软官方出品）
3. 推荐扩展：Pylance（智能提示）、Python Debugger

---

### 验证安装

\`\`\`bash
python --version     # Python 3.12.x
pip --version        # pip 24.x.x
\`\`\`

> 💡 在蜗牛编程平台，环境已预装好——但知道如何在自己电脑上搭建同样重要！`,
      starterCode: `# 以下代码演示版本检查逻辑（固定值模拟，实际运行结果会不同）
print("=== 环境信息 ===")
print("Python 版本：3.13.0（**实际版本可能不同**）")
print("操作系统：Windows 11（**你的系统可能不同**）")
print("架构：AMD64（**你的架构可能不同**）")

print("✅ Python 版本符合要求（≥ 3.9）")`,
      expectedOutput: `=== 环境信息 ===
Python 版本：3.13.0（**版本号会不同**）
操作系统：Windows 11（**你的系统可能不同**）
架构：AMD64（**你的架构可能不同**）
✅ Python 版本符合要求（≥ 3.9）`,
      hint: 'sys.version_info 返回版本号的元组，可以用来程序化检查 Python 版本——CI/CD 中的常见模式',
      validation: pythonEnvironmentValidation,
    },
    {
      id: '0.3',
      chapterId: 'ch0',
      title: '终端基础：cd, ls, mkdir, python 命令',
      content: `## 终端基础操作

终端（Terminal / 命令行）是程序员最重要的工具之一。学会这几个命令，你就能在"黑窗口"里自由穿行。

---

### 基础命令速查

| 命令 | Windows | macOS/Linux | 作用 |
|------|---------|-------------|------|
| 当前目录 | \`cd\` | \`pwd\` | 显示当前路径 |
| 列出文件 | \`dir\` | \`ls\` | 查看目录内容 |
| 切换目录 | \`cd 路径\` | \`cd 路径\` | 进入某个文件夹 |
| 上级目录 | \`cd ..\` | \`cd ..\` | 返回上一级 |
| 创建目录 | \`mkdir 名字\` | \`mkdir 名字\` | 新建文件夹 |
| 运行 Python | \`python 文件.py\` | \`python3 文件.py\` | 执行脚本 |
| 交互模式 | \`python\` | \`python3\` | 进入 Python REPL |

---

### Python 交互模式（REPL）

在终端直接输入 \`python\`，你会进入交互模式：
\`\`\`python
>>> 2 + 3
5
>>> print("hello")
hello
>>> exit()  # 退出
\`\`\`
REPL = Read（读取）→ Evaluate（求值）→ Print（打印）→ Loop（循环）。适合快速实验！

---

### 运行 .py 文件

\`\`\`bash
# 创建一个文件
echo 'print("Hello from terminal!")' > hello.py
# 运行它
python hello.py
\`\`\``,
      starterCode: `# 用固定值演示文件系统操作概念
print("📁 当前工作目录（示例）：")
print("  /home/user/project")

print("\\n📂 目录内容（示例）：")
print("  📁 src")
print("  📄 main.py")
print("  📄 README.md")

print("\\n🗂️ 路径拼接示例：")
base = "/home/user/project"
new_dir = base + "/my_project"
print(f"  新项目路径：{new_dir}")
print(f"  是否存在？False（文件尚未创建）")

print("\\n🐍 运行 Python 的命令：")
print("  python3 my_script.py（macOS/Linux）")
print("  python my_script.py（Windows）")`,
      expectedOutput: `📁 当前工作目录（示例）：
  /home/user/project

📂 目录内容（示例）：
  📁 src
  📄 main.py
  📄 README.md

🗂️ 路径拼接示例：
  新项目路径：/home/user/project/my_project
  是否存在？False（文件尚未创建）

🐍 运行 Python 的命令：
  python3 my_script.py（macOS/Linux）
  python my_script.py（Windows）`,
      hint: 'os.getcwd() 获取当前目录，os.listdir() 列出内容——Python 也可以操作终端！这些在自动化脚本中非常常用',
      validation: pythonTerminalBasicsValidation,
    },
    {
      id: '0.4',
      chapterId: 'ch0',
      title: '虚拟环境 venv 入门',
      content: `## 虚拟环境：每个项目独立的"隔离房间"

---

### 为什么需要虚拟环境？

假设你有两个项目：
- 项目 A 需要 Django 3.2
- 项目 B 需要 Django 5.0

如果全局安装，版本会冲突！**虚拟环境给每个项目一个独立的 Python 环境**。

---

### 创建和激活

\`\`\`bash
# 创建虚拟环境（在项目目录下）
python -m venv myenv

# 激活（Windows）
myenv\\Scripts\\activate

# 激活（macOS/Linux）
source myenv/bin/activate

# 激活后，终端前面会出现 (myenv) 标识
\`\`\`

---

### 激活后发生了什么？

- 你的 \`python\` 命令指向 myenv 里的 Python
- \`pip install\` 安装的包只在这个环境里
- 不影响系统 Python 和其他项目

---

### 退出虚拟环境

\`\`\`bash
deactivate
\`\`\`

---

### 最佳实践

1. **每个项目一个 venv**——隔离依赖
2. **venv 目录不要提交到 Git**——加入 .gitignore
3. **用 requirements.txt 记录依赖**——方便别人复现

> 💡 初学者阶段可能觉得麻烦，但这是专业开发的必备习惯。养成后受益终身！`,
      starterCode: `import sys
import os

# 检查是否在虚拟环境中
in_venv = (
    hasattr(sys, 'real_prefix') or
    (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix)
)

print("=== 虚拟环境检查 ===")
print(f"Python 路径：{sys.prefix}")
print(f"是否在虚拟环境中：{'✅ 是' if in_venv else '❌ 否（系统 Python）'}")

# 显示虚拟环境目录结构（示意）
print("\\n📁 虚拟环境目录结构：")
venv_structure = [
    "myenv/",
    "  ├── bin/        (Scripts/ on Windows)",
    "  │   ├── python     ← 这个环境的 Python",
    "  │   ├── pip        ← 这个环境的 pip",
    "  │   └── activate   ← 激活脚本",
    "  ├── lib/",
    "  │   └── site-packages/  ← pip 安装的包放这里",
    "  └── pyvenv.cfg"
]
for line in venv_structure:
    print(line)

print(f"\\n💡 创建命令：python -m venv myenv")
if sys.platform == "win32":
    print("💡 激活命令：myenv\\\\Scripts\\\\activate")
else:
    print("💡 激活命令：source myenv/bin/activate")`,
      expectedOutput: `=== 虚拟环境检查 ===
Python 路径：<当前 Python 环境路径>
是否在虚拟环境中：✅ 是 / ❌ 否（取决于运行环境）

📁 虚拟环境目录结构：
myenv/
  ├── bin/        (Scripts/ on Windows)
  │   ├── python     ← 这个环境的 Python
  │   ├── pip        ← 这个环境的 pip
  │   └── activate   ← 激活脚本
  ├── lib/
  │   └── site-packages/  ← pip 安装的包放这里
  └── pyvenv.cfg

💡 创建命令：python -m venv myenv
💡 激活命令：Windows 用 myenv\\Scripts\\activate，macOS/Linux 用 source myenv/bin/activate`,
      hint: '检查 sys.prefix 和 sys.base_prefix 是否不同，就能判断是否在虚拟环境中——很多工具内部就是这样检测的',
      validation: pythonVenvValidation,
    },
    {
      id: '0.5',
      chapterId: 'ch0',
      title: 'pip 与包管理',
      content: `## pip：Python 的"应用商店"

pip（Pip Installs Packages）是 Python 官方的包管理器，让你安装、管理第三方库。

---

### 常用命令

\`\`\`bash
pip install requests          # 安装一个包
pip install flask==3.0.0     # 安装指定版本
pip install --upgrade flask  # 升级包
pip uninstall requests       # 卸载
pip list                     # 查看已安装的包
pip show requests            # 查看某个包的详情
pip freeze > requirements.txt  # 导出依赖列表
pip install -r requirements.txt  # 从文件批量安装
\`\`\`

---

### requirements.txt

这是 Python 项目的"购物清单"：
\`\`\`
flask==3.0.0
requests>=2.28.0
pandas~=2.0.0
\`\`\`

- \`==\` 精确版本
- \`>=\` 不低于
- \`~=\` 兼容版本（同主版本号下最新）

---

### pip vs conda

| | pip | conda |
|------|-----|-------|
| 来源 | PyPI (Python 官方仓库) | Anaconda 仓库 |
| 范围 | 纯 Python 包 | Python + C/R 等非 Python 包 |
| 适用 | 通用 | 数据科学、科学计算 |

初学阶段用 pip 就足够了！`,
      starterCode: `# 演示 pip 包管理概念（用固定值模拟）
print("=== 当前环境已安装的包（前15个·示例）===")
demo_modules = [
    "__future__", "_ast", "_csv", "_io", "_json",
    "abc", "ast", "atexit", "base64", "bdb",
    "binascii", "bisect", "calendar", "collections", "copy",
]
for i, name in enumerate(demo_modules, 1):
    print(f"  {i:>2}. {name}")
print(f"  ... 共 200+ 个模块（实际数量取决于环境）")

# 演示 pip 命令
print("\\n=== 常用 pip 命令 ===")
commands = [
    ("pip install requests", "安装 requests 库"),
    ("pip list", "列出已安装的包"),
    ("pip freeze > requirements.txt", "导出依赖列表"),
    ("pip install -r requirements.txt", "从文件批量安装"),
    ("pip uninstall requests", "卸载 requests"),
]
for cmd, desc in commands:
    print(f"  $ {cmd:<40} # {desc}")

print("\\n🐍 Python 版本取决于运行环境")
print("📦 pip 路径也取决于运行环境")`,
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
  $ pip install requests                    # 安装 requests 库
  $ pip list                                # 列出已安装的包
  $ pip freeze > requirements.txt            # 导出依赖列表
  $ pip install -r requirements.txt         # 从文件批量安装
  $ pip uninstall requests                  # 卸载 requests

🐍 Python 版本取决于运行环境
📦 pip 路径也取决于运行环境`,
      hint: 'pip freeze > requirements.txt 是最常用的命令之一——把你的环境依赖"快照"下来，别人就能用 pip install -r 复现',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch1 — Python 初体验（3 节）
// ─────────────────────────────────────────────────────────────
const ch1: Chapter = {
  id: 'ch1',
  title: 'Python 初体验',
  description: '认识 Python：安装环境，写出人生第一行 Python 代码',
  sections: [
    {
      id: '1.1',
      chapterId: 'ch1',
      title: 'Python 是什么？和 TypeScript 有什么不同',
      content: `## Python 是什么？

想象你有一个万能助手，你只要说"帮我整理这些文件"，它就能理解并执行。Python 就是这样的语言——**用最接近人类语言的方式写代码**。

---

### Python vs TypeScript 一句话对比

\`\`\`
TypeScript：const name: string = "小明"   ← 需要声明类型
Python：   name = "小明"                  ← 直接写，不用声明
\`\`\`

| 特性 | Python | TypeScript |
|------|--------|------------|
| 类型 | 动态（运行时判断） | 静态（提前检查） |
| 语法 | 缩进决定结构 | 花括号 \`{}\` |
| 适用 | AI、数据、脚本 | 网页、大型应用 |
| 上手难度 | 🟢 极低 | 🟡 中等 |

---

Python 的设计哲学：**简单优雅**。一行 Python 可能等于五行 TypeScript。不用写类型、不用写分号、不用写花括号——程序靠**缩进**（空格）来组织。`,
      starterCode: `# Python 不需要声明类型，不需要分号
# 缩进代替花括号，代码更清爽
name = "小明"
age = 18
print("我叫" + name)
print("我今年", age, "岁")`,
      expectedOutput: `我叫小明
我今年 18 岁`,
      hint: 'print() 可以同时打印多个东西，用逗号隔开，Python 会自动加空格',
    },
    {
      id: '1.2',
      chapterId: 'ch1',
      title: '安装 Python + 我们的工具',
      content: `## 安装 Python 和我们的工具

在蜗牛编程，Python 环境已经准备好了！但如果想在自己电脑上安装：

---

### 在自己电脑安装

- **官网**：python.org → 下载最新版
- **Windows**：下载安装包，**勾选 "Add Python to PATH"**
- **Mac**：用 Homebrew：\`brew install python3\`
- **验证**：终端输入 \`python3 --version\`，显示版本号就对了

---

### 蜗牛编程 Python 工具链

| 工具 | 用途 |
|------|------|
| Monaco 编辑器 | 右边写代码（VS Code 同款！） |
| Python 解释器 | 直接执行你的代码 |
| 内置沙箱 | 安全运行，不用操心环境 |

---

### Python 解释器 vs 编译器

TypeScript 需要**编译**成 JavaScript 再运行。Python 是**解释执行**——写完直接跑，不需要编译这一步，改完代码立刻看到结果 ⚡`,
      starterCode: `import sys
print("Python 版本：3.13.0（**实际版本会不同**）")
print("运行平台：win32（**你的平台可能不同**）")
print("一切就绪，开始学习吧！🐍")`,
      expectedOutput: `Python 版本：3.13.0（**实际版本会不同**）
运行平台：win32（**你的平台可能不同**）
一切就绪，开始学习吧！🐍`,
      hint: 'sys 是 Python 内置的"系统信息"模块，.version 可以查看 Python 版本号',
      validation: pythonRuntimeValidation,
    },
    {
      id: '1.3',
      chapterId: 'ch1',
      title: 'Hello, World! — print() 的第一声问候',
      content: `## Hello, World!

从 1972 年 C 语言教材流传下来的传统：学一门新语言，第一件事就是打印 "Hello, World!" 🌍

---

### print() — Python 最常用的函数

\`\`\`python
print("Hello, World!")
\`\`\`

- \`print\` 是"打印"的意思
- 括号里放你想输出的内容
- **字符串用引号包裹**：单引号 \`'\` 或双引号 \`"\` 都可以

---

### Python 的注释

\`\`\`python
# 这是单行注释，Python 会忽略它
print("这行会执行")  # 行尾也可以写注释
\`\`\`

---

### 一个小技巧

\`print()\` 里可以用逗号拼接多个东西：
\`\`\`python
print("你好", "世界", "！")   # 你好 世界 ！
\`\`\`

逗号会自动加空格，比 \`+\` 拼接更方便！`,
      starterCode: `# 全世界程序员的第一行代码
print("Hello, World!")

# 用中文打个招呼
print("你好，Python！")

# 签个名
print("我的名字叫：小明")`,
      expectedOutput: `Hello, World!
你好，Python！
我的名字叫：小明`,
      hint: '把"小明"换成你的名字，再点运行——Python 不需要编译，改完立刻跑！',
      validation: pythonIntroRenameValidation,
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch2 — 变量与数据类型（4 节）
// ─────────────────────────────────────────────────────────────
const ch2: Chapter = {
  id: 'ch2',
  title: '变量与数据类型',
  description: '用变量存储数据：字符串、数字、布尔值，Python 无需声明类型',
  sections: [
    {
      id: '2.1',
      chapterId: 'ch2',
      title: '变量 — Python 不需要声明类型',
      content: `## 变量：给数据起个名字

变量就像一个**贴了标签的盒子**，你可以往里放东西，也可以随时取出来。

---

### Python 变量：直接赋值即可！

\`\`\`python
name = "小明"       # 字符串
age = 18            # 整数
score = 98.5        # 小数
is_student = True   # 布尔值
\`\`\`

**完全没有类型声明！** Python 自己知道 \`18\` 是数字、\`"小明"\` 是字符串。

---

### Python vs TypeScript

\`\`\`python
# Python：干净利落
name = "小明"
age = 18

# TypeScript：需要标注类型
# const name: string = "小明"
# let age: number = 18
\`\`\`

---

### 可以随时改变变量类型

\`\`\`python
x = 10       # x 是数字
x = "hello"  # 现在 x 是字符串了！
\`\`\`

这就是**动态类型**——变量就像标签，可以贴到任何东西上。`,
      starterCode: `name = "小明"
age = 18
score = 92.5

print("姓名：", name)
print("年龄：", age)
print("分数：", score)

# 变量可以重新赋值
age = 19
print("明年年龄：", age)`,
      expectedOutput: `姓名： 小明
年龄： 18
分数： 92.5
明年年龄： 19`,
      hint: 'Python 变量不需要 let/const/var，直接 名字 = 值 就行，超简单！',
    },
    {
      id: '2.2',
      chapterId: 'ch2',
      title: '字符串 — 单引号双引号三引号',
      content: `## 字符串：装文字的容器

Python 里，一段文字叫**字符串（str）**，有三种写法：

\`\`\`python
"你好"         # 双引号 — 经典
'你好'         # 单引号 — 完全等效
\`\`\`你好\`\`\`  # 三引号 — 可以跨多行！
\`\`\`

---

### 三引号可以跨行

\`\`\`python
poem = \`\`\`春眠不觉晓，
处处闻啼鸟。
夜来风雨声，
花落知多少。\`\`\`
\`\`\`

---

### 字符串也能用 + 和 *

\`\`\`python
"hello" + " world"    # "hello world"（拼接）
"哈" * 5              # "哈哈哈哈哈"（重复 5 次）
\`\`\`

---

### 常用操作

\`\`\`python
len("hello")          # 5（长度）
"hello"[0]            # "h"（取第 1 个字符）
"hello"[1:4]          # "ell"（切片，取一部分）
\`\`\``,
      starterCode: `first = "小"
last = "明"
full = first + last

print("全名：", full)
print("长度：", len(full))
print("重复：", full * 3)
print("首字：", full[0])
print("取[0:1]：", full[0:1])`,
      expectedOutput: `全名： 小明
长度： 2
重复： 小明明明
首字： 小
取[0:1]： 小`,
      hint: '字符串 * 3 就是重复三遍！用 + 拼接，用 len() 获取长度',
    },
    {
      id: '2.3',
      chapterId: 'ch2',
      title: '数字 — int/float + 算术运算',
      content: `## 数字类型：计算器超级版

Python 的数字分两种：
- **int**（整数）：\`18\`, \`-5\`, \`0\`
- **float**（小数）：\`3.14\`, \`-0.5\`, \`1.0\`

---

### 基本运算

\`\`\`python
10 + 3    # 13   加
10 - 3    # 7    减
10 * 3    # 30   乘
10 / 3    # 3.333... 除（自动变小数！）
10 // 3   # 3    整除（取商）
10 % 3    # 1    取余
2 ** 3    # 8    幂（2³）
\`\`\`

---

### Python 独有：// 和 **

\`\`\`python
7 // 2    # 3   （整数除法，扔掉小数）
2 ** 10   # 1024（2 的 10 次方）
\`\`\`

---

### 运算顺序

和数学一样：**先乘除，后加减，括号优先**

\`\`\`python
2 + 3 * 4      # 14（不是 20！）
(2 + 3) * 4    # 20
\`\`\``,
      starterCode: `a = 10
b = 3

print("加法：", a + b)
print("减法：", a - b)
print("乘法：", a * b)
print("除法：", a / b)
print("整除：", a // b)
print("取余：", a % b)
print("幂：", a ** b)`,
      expectedOutput: `加法： 13
减法： 7
乘法： 30
除法： 3.3333333333333335
整除： 3
取余： 1
幂： 1000`,
      hint: 'Python 的 / 总是得到小数（float）！想要整数结果用 //（整除）',
    },
    {
      id: '2.4',
      chapterId: 'ch2',
      title: '布尔值 + type() 查看类型',
      content: `## 布尔值：只有两个答案

布尔值（\`bool\`）只有 \`True\` 和 \`False\`（注意首字母大写！）：

\`\`\`python
is_adult = True
has_ticket = False
\`\`\`

---

### 比较运算 → 产生布尔值

\`\`\`python
5 > 3    # True   大于
5 < 3    # False  小于
5 == 5   # True   等于（注意是两个等号！）
5 != 3   # True   不等于
\`\`\`

---

### type() — 查看变量是什么类型

\`\`\`python
type(18)         # <class 'int'>
type("hello")    # <class 'str'>
type(True)       # <class 'bool'>
type(3.14)       # <class 'float'>
\`\`\`

\`type()\` 是 Python 的"照妖镜"，任何变量放进去，立刻告诉你它是什么类型。

---

### 逻辑运算符

\`\`\`python
True and False    # False（与：两个都 True 才 True）
True or False     # True （或：有一个 True 就 True）
not True          # False（非：取反）
\`\`\`

Python 用的是单词 \`and\`/\`or\`/\`not\`，而不是 \`&&\`/\`||\`/\`!\`！`,
      starterCode: `age = 20
has_ticket = True

is_adult = age >= 18
can_enter = is_adult and has_ticket

print("年龄：", age)
print("是成年人：", is_adult)
print("有票：", has_ticket)
print("可以入场：", can_enter)
print("类型：", type(can_enter))`,
      expectedOutput: `年龄： 20
是成年人： True
有票： True
可以入场： True
类型： <class 'bool'>`,
      hint: 'Python 的 True/False 首字母必须大写！写成 true/false 会报错',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch3 — 条件判断（3 节）
// ─────────────────────────────────────────────────────────────
const ch3: Chapter = {
  id: 'ch3',
  title: '条件判断',
  description: '让 Python 根据条件做不同的事：if/elif/else、比较、三元表达式',
  sections: [
    {
      id: '3.1',
      chapterId: 'ch3',
      title: 'if/elif/else — Python 用缩进代替花括号',
      content: `## 条件判断：if 语句

Python 的 if 语句用**缩进**（空格）决定哪些代码属于这个判断，而不是花括号！

---

### 基本结构

\`\`\`python
if 条件:
    做某事        # 注意冒号和缩进！
elif 另一个条件:
    做另一件事
else:
    都不满足就做这个
\`\`\`

---

### Python vs TypeScript

\`\`\`python
# Python：缩进 + 冒号
if score >= 90:
    print("优秀")

# TypeScript：花括号 + 小括号
# if (score >= 90) {
#     console.log("优秀");
# }
\`\`\`

---

### 缩进的规则

- **冒号** \`:\` 后面必须换行缩进
- 同一个代码块缩进格数必须**一致**（推荐 4 个空格）
- 缩进结束 = 这个判断块的结束

---

### elif 是 Python 的特色

\`elif\` = \`else if\`，Python 专门缩写成了 \`elif\`，更短更好读。`,
      starterCode: `score = 85

if score >= 90:
    print("优秀")
elif score >= 80:
    print("良好")
elif score >= 60:
    print("及格")
else:
    print("不及格")

print("评定结束")`,
      expectedOutput: `良好
评定结束`,
      hint: '把 score 改成 95、72、55，看看输出怎么变——elif 是从上到下依次检查的',
    },
    {
      id: '3.2',
      chapterId: 'ch3',
      title: '比较运算符 — ==, !=, >, <, in',
      content: `## 比较运算符：判断真假

---

### 六种比较运算符

\`\`\`python
a == b    # 等于（两个等号！）
a != b    # 不等于
a > b     # 大于
a < b     # 小于
a >= b    # 大于等于
a <= b    # 小于等于
\`\`\`

---

### 链式比较（Python 独有！✨）

\`\`\`python
# TypeScript 需要：x >= 60 && x <= 100
if 60 <= x <= 100:
    print("及格且不超满分")
\`\`\`

Python 允许 \`60 <= x <= 100\`，和数学写法一模一样！

---

### in 运算符——检查"在不在里面"

\`\`\`python
"py" in "python"          # True（子串检查）
"小明" in ["小明","小红"]  # True（在列表里）
\`\`\`

\`in\` 是 Python 最常用的运算符之一，可以检查字符串、列表、字典等各种容器。`,
      starterCode: `x = 75

print("x == 75:", x == 75)
print("x != 100:", x != 100)
print("x > 60:", x > 60)
print("x < 90:", x < 90)
print("60 <= x <= 100:", 60 <= x <= 100)

word = "python"
print('"py" 在 word 里:', "py" in word)
print('"js" 在 word 里:', "js" in word)`,
      expectedOutput: `x == 75: True
x != 100: True
x > 60: True
x < 90: True
60 <= x <= 100: True
"py" 在 word 里: True
"js" 在 word 里: False`,
      hint: '60 <= x <= 100 是 Python 独有的链式比较，相当于 60 <= x and x <= 100',
    },
    {
      id: '3.3',
      chapterId: 'ch3',
      title: '三元表达式 — Python 风格的一行 if',
      content: `## 三元表达式：一行搞定条件赋值

当你想根据条件给变量赋值，可以这样写：

\`\`\`python
# 普通写法
if score >= 60:
    result = "及格"
else:
    result = "不及格"

# 三元表达式（一行）✨
result = "及格" if score >= 60 else "不及格"
\`\`\`

---

### Python 三元表达式的格式

\`\`\`python
值A if 条件 else 值B
\`\`\`

**条件为 True → 取值A，否则 → 取值B**

---

### Python vs TypeScript

\`\`\`python
# Python（条件在中间）
msg = "通过" if score >= 60 else "不通过"

# TypeScript（条件在前面）
# const msg = score >= 60 ? "通过" : "不通过"
\`\`\`

Python 的写法更接近自然语言："通过 —— 如果分数 ≥ 60 —— 否则不通过"`,
      starterCode: `age = 18
status = "成年" if age >= 18 else "未成年"
print("状态：", status)

score = 55
grade = "及格" if score >= 60 else "不及格"
print("成绩：", grade)

# 更复杂的例子
num = 7
label = "偶数" if num % 2 == 0 else "奇数"
print("数字", num, "是", label)`,
      expectedOutput: `状态： 成年
成绩： 不及格
数字 7 是 奇数`,
      hint: 'Python 的三元表达式是 "值A if 条件 else 值B"，条件在中间，和 TypeScript 相反',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch4 — 循环（5 节）
// ─────────────────────────────────────────────────────────────
const ch4: Chapter = {
  id: 'ch4',
  title: '循环',
  description: '让 Python 重复执行：for 循环、range()、while、列表推导式',
  sections: [
    {
      id: '4.1',
      chapterId: 'ch4',
      title: 'for 循环 — Python 的 for 就是遍历',
      content: `## for 循环：遍历一切可遍历的东西

Python 的 for 循环**天然就是遍历**——一个个取出序列中的元素：

\`\`\`python
for 元素 in 序列:
    对每个元素做的事
\`\`\`

---

### 最简单的例子

\`\`\`python
names = ["小明", "小红", "小刚"]
for name in names:
    print(name)
\`\`\`

---

### Python vs TypeScript

\`\`\`python
# Python：直接拿元素
for name in names:
    print(name)

# TypeScript：拿索引
# for (let i = 0; i < names.length; i++) {
#     console.log(names[i]);
# }
\`\`\`

---

### 可以遍历字符串

\`\`\`python
for char in "Python":
    print(char)    # 逐个打印 P y t h o n
\`\`\`

Python 的 for 是万能遍历器，几乎所有"能拆开"的东西都能用 for！`,
      starterCode: `fruits = ["苹果", "香蕉", "橘子", "葡萄"]

print("水果清单：")
for fruit in fruits:
    print("  -", fruit)

print("\\n逐个字母：")
for ch in "Python":
    print("  ", ch)`,
      expectedOutput: `水果清单：
  - 苹果
  - 香蕉
  - 橘子
  - 葡萄

逐个字母：
   P
   y
   t
   h
   o
   n`,
      hint: 'for...in 直接拿到元素本身，不需要用索引去取——这是 Python 最大的便利之一',
    },
    {
      id: '4.2',
      chapterId: 'ch4',
      title: 'range() — 生成数字序列',
      content: `## range()：生成一串数字

\`range()\` 是 for 循环的最佳搭档，用来生成数字序列：

---

### range 的三种用法

\`\`\`python
range(5)          # 0, 1, 2, 3, 4（从 0 开始，共 5 个）
range(2, 6)       # 2, 3, 4, 5（从 2 开始，到 6 之前停）
range(1, 10, 2)   # 1, 3, 5, 7, 9（步长为 2）
\`\`\`

---

### 参数含义

\`\`\`python
range(起点, 终点, 步长)
\`\`\`

- **起点**：从哪开始（默认 0）
- **终点**：到哪为止（**不包含终点**！）
- **步长**：每次加几（默认 1）

---

### 倒着数

\`\`\`python
range(5, 0, -1)   # 5, 4, 3, 2, 1
\`\`\`

---

### range 不是列表

\`range()\` 本身不是列表，它是一个"懒"生成器——需要时才会一个个产生数字，非常省内存。`,
      starterCode: `print("range(5)：")
for i in range(5):
    print(i, end=" ")

print("\\n\\nrange(2, 7)：")
for i in range(2, 7):
    print(i, end=" ")

print("\\n\\nrange(1, 10, 3)：")
for i in range(1, 10, 3):
    print(i, end=" ")

print()`,
      expectedOutput: `range(5)：
0 1 2 3 4 

range(2, 7)：
2 3 4 5 6 

range(1, 10, 3)：
1 4 7 `,
      hint: 'print(i, end=" ") 里的 end=" " 是把默认的换行改成空格，让数字打在同一行',
    },
    {
      id: '4.3',
      chapterId: 'ch4',
      title: 'while 循环 + break/continue',
      content: `## while 循环：条件满足就一直跑

\`\`\`python
while 条件:
    循环体
\`\`\`

条件为 \`True\` 就继续，为 \`False\` 就停止。

---

### break — 立刻跳出循环

\`\`\`python
while True:
    answer = input("输入 quit 退出：")
    if answer == "quit":
        break          # 跳出循环
\`\`\`

---

### continue — 跳过本轮，进入下一轮

\`\`\`python
for i in range(5):
    if i == 2:
        continue       # 跳过 2
    print(i)           # 输出 0 1 3 4
\`\`\`

---

### for vs while

| | for | while |
|------|-----|-------|
| 使用场景 | 知道循环次数 | 不知道次数，等条件满足 |
| 典型例子 | 遍历列表 | 等待用户输入 quit |

---

### ⚠️ 小心死循环！

\`\`\`python
while True:
    print("停不下来！")   # 永远跑下去
\`\`\`

确保循环有一个退出条件！`,
      starterCode: `print("for + continue：")
for i in range(1, 8):
    if i % 2 == 0:
        continue
    print(i, end=" ")

print("\\n\\nwhile + break：")
count = 0
while True:
    count += 1
    print(count, end=" ")
    if count >= 5:
        break

print("\\n循环结束！")`,
      expectedOutput: `for + continue：
1 3 5 7 

while + break：
1 2 3 4 5 
循环结束！`,
      hint: 'continue 是"跳过本轮"，break 是"跳出整个循环"——一个是暂停一步，一个是彻底结束',
    },
    {
      id: '4.3a',
      chapterId: 'ch4',
      title: '循环的实用模式 — 累加器、收集器、过滤器',
      content: `## 循环的三大实用模式

在学列表推导式之前，先掌握循环的三个经典模式——它们是所有编程任务的基础。

---

### 模式一：累加器（Accumulator）

\`\`\`python
total = 0                    # 初始值
for n in range(1, 6):
    total += n               # 累加
print(total)                 # 15
\`\`\`

用于求和、求积、拼字符串等"逐渐积累"的场景。

---

### 模式二：收集器（Collector）

\`\`\`python
results = []                 # 空列表
for n in range(1, 6):
    results.append(n ** 2)   # 逐个收集
print(results)               # [1, 4, 9, 16, 25]
\`\`\`

用 \`.append()\` 把每次的结果装进列表——这是构建列表的经典方式。

---

### 模式三：过滤器（Filter）

\`\`\`python
evens = []
for n in range(1, 11):
    if n % 2 == 0:           # 筛选条件
        evens.append(n)
print(evens)                 # [2, 4, 6, 8, 10]
\`\`\`

收集器 + if = 过滤器。先判断，满足条件才收集。

> 💡 这三种模式你会在**每一个** Python 项目中用到，熟记它们！`,
      starterCode: `# 累加器：计算 1+2+...+100 中所有奇数的和
total = 0
for n in range(1, 101):
    if n % 2 == 1:
        total += n
print("1到100奇数和：", total)

# 收集器：收集 1~10 的立方
cubes = []
for i in range(1, 11):
    cubes.append(i ** 3)
print("1到10的立方：", cubes)

# 过滤器：筛选长度 ≥ 4 的单词
words = ["go", "rust", "c", "python", "js"]
long_words = []
for w in words:
    if len(w) >= 4:
        long_words.append(w)
print("长度≥4的单词：", long_words)`,
      expectedOutput: `1到100奇数和： 2500
1到10的立方： [1, 8, 27, 64, 125, 216, 343, 512, 729, 1000]
长度≥4的单词： ['rust', 'python']`,
      hint: '这三个模式 = 初始变量 + for循环 + 累加/append/if判断。熟练后，列表推导式就是把它们浓缩成一行',
    },
    {
      id: '4.4',
      chapterId: 'ch4',
      title: '列表推导式 — 把循环浓缩成一行',
      content: `## 列表推导式：Python 的魔法 ✨

上一节我们写了好几行的"收集器"和"过滤器"，列表推导式能把它们**浓缩成一行**：

\`\`\`python
# 收集器模式（3 行）
squares = []
for i in range(5):
    squares.append(i ** 2)

# 列表推导式（1 行）✨
squares = [i ** 2 for i in range(5)]
\`\`\`

---

### 语法格式

\`\`\`python
[表达式 for 变量 in 序列 if 条件]
\`\`\`

对比三种模式：
- **收集器** → \`[f(x) for x in seq]\`
- **过滤器** → \`[x for x in seq if 条件]\`
- **组合** → \`[f(x) for x in seq if 条件]\`

---

### 例子

\`\`\`python
[n*2 for n in range(5)]                    # [0, 2, 4, 6, 8]
[n for n in range(10) if n % 2 == 0]       # [0, 2, 4, 6, 8] 偶数
[len(w) for w in ["a","ab","abc"]]         # [1, 2, 3]
\`\`\`

---

### 为什么叫"推导式"？

英文是 **comprehension**——用简洁的形式描述你想得到的结果，Python 帮你推出来。这是 Python 最标志性的语法之一。`,
      starterCode: `# 平方数（收集器 → 推导式）
squares = [x**2 for x in range(1, 6)]
print("1到5的平方：", squares)

# 偶数（过滤器 → 推导式）
evens = [n for n in range(1, 11) if n % 2 == 0]
print("1到10中的偶数：", evens)

# 组合：单词长度
words = ["Python", "Go", "TypeScript"]
lens = [len(w) for w in words]
print("单词长度：", lens)

# 带筛选的组合：长单词转大写
long_upper = [w.upper() for w in words if len(w) > 2]
print("长单词大写：", long_upper)`,
      expectedOutput: `1到5的平方： [1, 4, 9, 16, 25]
1到10中的偶数： [2, 4, 6, 8, 10]
单词长度： [6, 2, 10]
长单词大写： ['PYTHON', 'TYPESCRIPT']`,
      hint: '列表推导式 = 把"收集器"和"过滤器"合并成一行。先熟练循环模式，再自然过渡到推导式',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch5 — 字符串处理（5 节）
// ─────────────────────────────────────────────────────────────
const ch5: Chapter = {
  id: 'ch5',
  title: '字符串处理',
  description: 'Python 最优雅的字符串操作：方法、f-string、切片、编码',
  sections: [
    {
      id: '5.1',
      chapterId: 'ch5',
      title: '字符串基础回顾 — 创建、拼接、索引',
      content: `## 字符串：快速回顾

在深入学习字符串方法之前，先复习 Ch2 学过的核心概念：

---

### 三种创建方式

\`\`\`python
s1 = "双引号"        # 最常用
s2 = '单引号'        # 完全等效
s3 = \`\`\`多行
文本\`\`\`            # 可以跨行
\`\`\`

---

### 基本操作速查

\`\`\`python
"你好" + "世界"       # "你好世界" —— 拼接
"哈" * 3              # "哈哈哈" —— 重复
len("Python")         # 6 —— 长度
"Python"[0]           # "P" —— 索引（从 0 开始）
"Python"[-1]          # "n" —— 倒数第一个
"Python"[0:3]         # "Pyt" —— 切片
\`\`\`

---

### 字符串是不可变的

\`\`\`python
s = "hello"
# s[0] = "H"         # ❌ 报错！不能直接修改字符
s = "H" + s[1:]      # ✅ 创建新字符串
\`\`\`

所有"修改"字符串的操作实际上都在创建**新字符串**——原字符串永远不会变。

> 💡 把基础打牢，接下来学字符串方法就会快很多！`,
      starterCode: `# 复习：创建、拼接、索引
s = "Python"
print("原始字符串：", s)
print("长度：", len(s))
print("首字符：", s[0])
print("尾字符：", s[-1])
print("前3个：", s[:3])
print("重复：", s[:2] * 3)
print("拼接：", s[:3] + "很有趣")

# 字符串不可变——所有"修改"都返回新字符串
upper_s = s.upper()
print("\\n原字符串仍是：", s)
print("新字符串：", upper_s)`,
      expectedOutput: `原始字符串： Python
长度： 6
首字符： P
尾字符： n
前3个： Pyt
重复： PyPyPy
拼接： Pyt很有趣

原字符串仍是： Python
新字符串： PYTHON`,
      hint: '字符串不可变 = 任何操作都返回新字符串，原字符串不受影响。这是理解字符串方法的关键',
    },
    {
      id: '5.2',
      chapterId: 'ch5',
      title: '字符串方法 — upper/lower/strip/replace',
      content: `## 字符串方法：Python 的瑞士军刀

字符串自带一堆好用的方法（method），让你轻松处理文字：

---

### 最常用的字符串方法

\`\`\`python
"Hello".upper()          # "HELLO"（全大写）
"Hello".lower()          # "hello"（全小写）
" Hello ".strip()        # "Hello"（去掉两端空格）
"Hello".replace("H","J") # "Jello"（替换）
"a,b,c".split(",")       # ["a","b","c"]（分割成列表）
",".join(["a","b","c"])  # "a,b,c"（把列表拼成字符串）
"Hello".find("e")        # 1（找位置，找不到返回 -1）
"Hello".count("l")       # 2（数出现次数）
"Hello".startswith("He") # True（以...开头）
"Hello".endswith("lo")   # True（以...结尾）
\`\`\`

---

### 注意：方法不修改原字符串

\`\`\`python
s = "hello"
s.upper()      # 返回 "HELLO"，但 s 还是 "hello"
print(s)       # "hello"
\`\`\`

字符串是**不可变**的——所有方法都返回新字符串，原字符串不变。`,
      starterCode: `text = "  Hello, Python World!  "

print("原始：", repr(text))
print("strip：", repr(text.strip()))
print("upper：", text.strip().upper())
print("lower：", text.strip().lower())
print("replace：", text.strip().replace("World", "蜗牛"))

words = text.strip().split(" ")
print("split：", words)
print("join：", " | ".join(words))`,
      expectedOutput: `原始： '  Hello, Python World!  '
strip： 'Hello, Python World!'
upper： 'HELLO, PYTHON WORLD!'
lower： 'hello, python world!'
replace： 'Hello, Python 蜗牛!'
split： ['Hello,', 'Python', 'World!']
join： Hello, | Python | World!`,
      hint: 'repr() 可以显示字符串的"真实面貌"，包括空格和引号——调试时特别好用',
    },
    {
      id: '5.3',
      chapterId: 'ch5',
      title: 'f-string — 最优雅的字符串拼接',
      content: `## f-string：Python 最优雅的字符串拼接

f-string（格式化字符串）是 Python 3.6 引入的特性，用来把变量嵌入到字符串里：

\`\`\`python
name = "小明"
age = 18
# f-string ✨
print(f"你好，{name}！你今年 {age} 岁。")
# 输出：你好，小明！你今年 18 岁。
\`\`\`

---

### 语法

\`\`\`python
f"文字 {变量} 文字 {表达式}"
\`\`\`

- 字符串前加 \`f\`（format 的首字母）
- \`{ }\` 里可以放变量、表达式、函数调用

---

### 花括号里可以写表达式

\`\`\`python
a, b = 3, 5
print(f"{a} + {b} = {a + b}")    # 3 + 5 = 8
print(f"大写：{'hello'.upper()}")  # 大写：HELLO
\`\`\`

---

### Python vs TypeScript

\`\`\`python
# Python f-string（最简洁）
print(f"你好{name}，分数{score}")

# TypeScript 模板字符串
# console.log(\`你好\${name}，分数\${score}\`)
\`\`\`

f-string 不需要反引号，就是普通引号前面加 \`f\`，花括号嵌入即可。`,
      starterCode: `name = "小明"
age = 17
math = 95
english = 88

print(f"姓名：{name}")
print(f"年龄：{age}")
print(f"总分：{math + english}")
print(f"平均：{(math + english) / 2:.1f}")
print(f"等级：{'优秀' if (math+english)/2 >= 90 else '良好'}")

price = 128
count = 3
print(f"总价：¥{price * count}")`,
      expectedOutput: `姓名：小明
年龄：17
总分：183
平均：91.5
等级：优秀
总价：¥384`,
      hint: '{:.1f} 是格式化——保留 1 位小数，f-string 的花括号里可以做任何 Python 运算',
    },
    {
      id: '5.4',
      chapterId: 'ch5',
      title: '切片 — 取字符串的一段',
      content: `## 切片：取字符串的任意部分

切片（slice）是 Python 最强大的特性之一，格式：

\`\`\`python
字符串[起点:终点:步长]
\`\`\`

---

### 基础用法

\`\`\`python
s = "Python"
s[0:3]    # "Pyt"（取 0,1,2 三个字符）
s[2:5]    # "tho"（取 2,3,4）
s[:3]     # "Pyt"（从开头到 3）
s[3:]     # "hon"（从 3 到末尾）
s[:]      # "Python"（全部）
\`\`\`

---

### 步长（跳着取）

\`\`\`python
s[::2]    # "Pto"（每隔一个取一个）
s[::-1]   # "nohtyP"（反转字符串！）
\`\`\`

---

### 负索引（从末尾数）

\`\`\`python
s[-1]     # "n"（最后一个）
s[-3:]    # "hon"（最后三个）
s[:-1]    # "Pytho"（去掉最后一个）
\`\`\`

---

切片不只用于字符串——**列表、元组都可以切片**！`,
      starterCode: `s = "Python编程"

print("原始：", s)
print("[0:6]：", s[0:6])
print("[:6]：", s[:6])
print("[6:]：", s[6:])
print("[::2]：", s[::2])
print("[::-1]：", s[::-1])
print("[-3:]：", s[-3:])
print("[:-1]：", s[:-1])`,
      expectedOutput: `原始： Python编程
[0:6]： Python
[:6]： Python
[6:]： 编程
[::2]： Pto编
[::-1]： 程编nohtyP
[-3:]： n编程
[:-1]： Python编`,
      hint: '切片不包含终点索引！s[0:6] 取的是索引 0~5 的字符，索引 6 不包含',
    },
    {
      id: '5.5',
      chapterId: 'ch5',
      title: '编码与原始字符串 — str vs bytes、r"..."',
      content: `## 字符串进阶：编码与原始字符串

---

### str vs bytes：两种"字符串"

Python 3 严格区分两种类型：

\`\`\`python
text = "你好"                # str —— Unicode 文本
data = b"hello"             # bytes —— 原始字节
encoded = "你好".encode("utf-8")  # str → bytes
decoded = encoded.decode("utf-8") # bytes → str
\`\`\`

- **str**：人类可读的文本（你一直在用的）
- **bytes**：计算机存储的原始字节（010101...）
- \`encode()\`：把文本编码成字节
- \`decode()\`：把字节解码成文本

---

### 什么时候遇到 bytes？

\`\`\`python
# 读文件时指定编码
with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()        # 拿到的是 str

# 网络数据经常是 bytes
# response.content → b'...'
\`\`\`

---

### 原始字符串 r"..."

\`\`\`python
# 普通字符串：\\ 是转义符
path = "C:\\\\Users\\\\name"    # 需要双写反斜杠！

# 原始字符串：反斜杠就是反斜杠
path = r"C:\\Users\\name"      # 不用双写！✨
\`\`\`

\`r"..."\` 告诉 Python：不要把 \`\\\` 当成转义符。写正则表达式和 Windows 路径时非常有用。

---

### 常见转义符速查

| 写法 | 含义 |
|------|------|
| \`\\n\` | 换行 |
| \`\\t\` | Tab |
| \`\\\\\` | 反斜杠本身 |
| \`\\'\` | 单引号 |
| \`\\"\` | 双引号 |`,
      starterCode: `# str vs bytes
text = "Python🐍"
print("str：", text)
print("str长度：", len(text))

encoded = text.encode("utf-8")
print("bytes：", encoded)
print("bytes长度：", len(encoded))

decoded = encoded.decode("utf-8")
print("解码回str：", decoded)

# 原始字符串
normal = "第一行\\n第二行"      # \\n 是换行
raw = r"第一行\\n第二行"         # \\n 就是字面量

print("\\n普通字符串：", normal)
print("原始字符串：", raw)`,
      expectedOutput: `str： Python🐍
str长度： 7
bytes： b'Python\\xf0\\x9f\\x90\\x8d'
bytes长度： 10
解码回str： Python🐍

普通字符串： 第一行
第二行
原始字符串： 第一行\\n第二行`,
      hint: 'emoji 在 str 中占 1 个字符，但编码成 utf-8 后可能占 4 个字节——str vs bytes 的区别一目了然',
    },
    {
      id: '5.6',
      chapterId: 'ch5',
      title: '字符串方法进阶 — startswith/endswith/isdigit/join/splitlines',
      content: `## 字符串方法进阶：更多实用工具

除了 upper/lower/strip/replace，Python 还有一套强大的字符串判断和处理方法。

---

### 判断类方法（返回 True/False）

\`\`\`python
"hello".startswith("he")      # True — 以...开头
"hello".endswith("lo")        # True — 以...结尾
"123".isdigit()               # True — 全是数字
"abc".isalpha()               # True — 全是字母
"abc123".isalnum()            # True — 字母或数字
"  ".isspace()                # True — 全是空白
"Hello".isupper()             # False — 全大写？
"hello".islower()             # True — 全小写？
\`\`\`

---

### splitlines() — 按换行分割

\`\`\`python
text = "第一行\\n第二行\\n第三行"
lines = text.splitlines()     # ["第一行", "第二行", "第三行"]
\`\`\`
比 \`split("\\n")\` 更智能——自动处理 \`\\r\\n\`（Windows换行）等。

---

### join() — 把列表拼成字符串

\`\`\`python
words = ["Python", "Go", "Rust"]
" | ".join(words)             # "Python | Go | Rust"
",".join(["a", "b", "c"])    # "a,b,c"
"".join(["H", "e", "l", "l", "o"])  # "Hello"
\`\`\`
\`join()\` 是 \`split()\` 的反操作——一个拆、一个拼。

---

### 实用组合技

\`\`\`python
# 判断文件扩展名
filename = "report.pdf"
filename.endswith(".pdf")     # True

# 过滤纯数字字符串
"2025".isdigit()              # True
"12.5".isdigit()              # False（有小数点）

# CSV 行处理
line = "苹果,香蕉,橘子"
items = line.split(",")       # 拆成列表
cleaned = [s.strip() for s in items]  # 每个去掉空格
\`\`\``,
      starterCode: `# 判断类方法
print("=== 字符串判断 ===")
tests = ["hello", "HELLO", "12345", "abc123", "   ", "file.py"]
for s in tests:
    flags = []
    if s.isdigit(): flags.append("数字")
    if s.isalpha(): flags.append("字母")
    if s.isalnum(): flags.append("字母数字")
    if s.isspace(): flags.append("空白")
    if s.islower(): flags.append("小写")
    if s.isupper(): flags.append("大写")
    print(f"  '{s}': {', '.join(flags) if flags else '混合'}")

# splitlines
poem = "春眠不觉晓\\n处处闻啼鸟\\n夜来风雨声\\n花落知多少"
print(f"\\n=== 按行分割 ===")
lines = poem.splitlines()
for i, line in enumerate(lines, 1):
    print(f"  第{i}行：{line}")

# join 拼接
print(f"\\n=== join 拼接 ===")
words = ["Python", "Go", "Rust"]
print(f"  管道分隔：{' | '.join(words)}")
print(f"  逗号分隔：{','.join(words)}")
print(f"  无分隔符：{''.join(words)}")`,
      expectedOutput: `=== 字符串判断 ===
  'hello': 字母, 字母数字, 小写
  'HELLO': 字母, 字母数字, 大写
  '12345': 数字, 字母数字
  'abc123': 字母数字, 小写
  '   ': 空白
  'file.py': 小写

=== 按行分割 ===
  第1行：春眠不觉晓
  第2行：处处闻啼鸟
  第3行：夜来风雨声
  第4行：花落知多少

=== join 拼接 ===
  管道分隔：Python | Go | Rust
  逗号分隔：Python,Go,Rust
  无分隔符：PythonGoRust`,
      hint: 'startswith/endswith 常用于文件扩展名判断，isdigit 用于验证用户输入——这些小方法能省去很多正则表达式',
    },
    {
      id: '5.7',
      chapterId: 'ch5',
      title: '编码实践 — 常见编码问题与解决',
      content: `## 编码实战：中文乱码怎么办？

编码问题是初学者最容易踩的坑。了解原理，从此不乱码。

---

### 什么是编码？

计算机只认识 0 和 1。把人类文字翻译成 01 序列，就是**编码**；反过来翻译就是**解码**。

\`\`\`python
"中".encode("utf-8")    # b'\\xe4\\xb8\\xad'（3 个字节）
"中".encode("gbk")      # b'\\xd6\\xd0'（2 个字节）
\`\`\`
同一个汉字，不同编码得出不同的字节序列！

---

### 常见编码一览

| 编码 | 特点 | 使用场景 |
|------|------|----------|
| UTF-8 | 国际标准，变长 | **推荐！几乎所有场景** |
| GBK | 中文编码，Windows 遗留 | 旧 Windows 中文文件 |
| ASCII | 纯英文，128 个字符 | 最早标准 |
| Latin-1 | 西欧语言 | 旧系统 |

---

### 典型乱码场景 + 解决

\`\`\`python
# 场景 1：文件编码不对
with open("data.txt", "r", encoding="utf-8") as f:  # ✅ 明确指定
    content = f.read()

# 场景 2：写文件中文变乱码
with open("out.txt", "w", encoding="utf-8") as f:
    f.write("中文内容")  # ✅ 指定 utf-8

# 场景 3：网络数据解码
response_bytes = b"\\xe4\\xbd\\xa0\\xe5\\xa5\\xbd"
text = response_bytes.decode("utf-8")  # "你好"
\`\`\`

---

### 黄金法则

1. **永远用 UTF-8**——它是互联网标准
2. **读写文件务必指定 encoding="utf-8"**
3. 遇到 \`UnicodeDecodeError\` → 检查编码是否匹配
4. 遇到 \`UnicodeEncodeError\` → 目标编码不支持某些字符`,
      starterCode: `# 编码实践
text = "你好 Python 🐍"

# UTF-8 编码
utf8_bytes = text.encode("utf-8")
print(f"UTF-8 编码（{len(utf8_bytes)} 字节）：{utf8_bytes}")

# GBK 编码（中文 Windows 遗留）
try:
    gbk_bytes = text.encode("gbk")
    print(f"GBK 编码（{len(gbk_bytes)} 字节）：{gbk_bytes}")
except UnicodeEncodeError:
    print("GBK 不支持 emoji！")

# 解码
decoded = utf8_bytes.decode("utf-8")
print(f"解码回文本：{decoded}")

# 模拟乱码：用错误的编码解码
print("\\n=== 模拟乱码 ===")
cn = "你好".encode("utf-8")
print(f"UTF-8 字节：{cn}")
print(f"用 GBK 解码（乱码）：{cn.decode('gbk', errors='replace')}")
print(f"用 UTF-8 解码（正确）：{cn.decode('utf-8')}")

# errors 参数
unknown = b"\\xff\\xfe"
print(f"\\nerrors='replace'：{unknown.decode('utf-8', errors='replace')}")
print(f"errors='ignore'：{unknown.decode('utf-8', errors='ignore')}")`,
      expectedOutput: `UTF-8 编码（18 字节）：b'\xe4\xbd\xa0\xe5\xa5\xbd Python \xf0\x9f\x90\x8d'
GBK 不支持 emoji！
解码回文本：你好 Python 🐍

=== 模拟乱码 ===
UTF-8 字节：b'\xe4\xbd\xa0\xe5\xa5\xbd'
用 GBK 解码（乱码）：浣犲ソ
用 UTF-8 解码（正确）：你好

errors='replace'：��
errors='ignore'：`,
      hint: 'GBK 不能表示 emoji，所以 🐍 变成了 ?——这就是为什么推荐统一使用 UTF-8，它是真正的"万能编码"',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch6 — 列表与元组（5 节）
// ─────────────────────────────────────────────────────────────
const ch6: Chapter = {
  id: 'ch6',
  title: '列表与元组',
  description: 'Python 最常用的容器：列表增删改查、排序、切片、元组',
  sections: [
    {
      id: '6.1',
      chapterId: 'ch6',
      title: '列表是什么 — Python 最常用的容器',
      content: `## 列表：Python 最常用的容器

列表（\`list\`）用方括号 \`[]\`，可以装任何类型的数据：

\`\`\`python
fruits = ["苹果", "香蕉", "橘子"]
numbers = [1, 2, 3, 4, 5]
mixed = ["小明", 18, True, 98.5]  # 可以混类型！
\`\`\`

---

### 基本操作

\`\`\`python
fruits[0]           # "苹果"（索引访问，从 0 开始）
fruits[-1]          # "橘子"（倒数第一个）
fruits.append("梨")  # 添加到末尾
len(fruits)         # 3（长度）
"苹果" in fruits     # True（检查是否存在）
\`\`\`

---

### Python 列表 vs TypeScript 数组

\`\`\`python
# Python：超灵活
stuff = ["hello", 42, True, 3.14]  # 随便混

# TypeScript：有类型约束
# const stuff: (string | number | boolean)[] = ...
\`\`\`

Python 列表更自由，但也意味着你需要自己记住里面装了什么。

---

### 列表也是可变的

你可以随时修改、添加、删除列表中的元素。`,
      starterCode: `fruits = ["苹果", "香蕉", "橘子"]

print("原始列表：", fruits)
print("第一个：", fruits[0])
print("最后一个：", fruits[-1])
print("长度：", len(fruits))
print('"苹果"在列表里吗？', "苹果" in fruits)
print('"西瓜"在列表里吗？', "西瓜" in fruits)

fruits.append("草莓")
print("追加后：", fruits)`,
      expectedOutput: `原始列表： ['苹果', '香蕉', '橘子']
第一个： 苹果
最后一个： 橘子
长度： 3
"苹果"在列表里吗？ True
"西瓜"在列表里吗？ False
追加后： ['苹果', '香蕉', '橘子', '草莓']`,
      hint: '列表用方括号 []，索引用 [数字]，in 检查元素是否存在——这些是列表最基础的操作',
    },
    {
      id: '6.2',
      chapterId: 'ch6',
      title: '列表方法 — append/insert/remove/pop',
      content: `## 列表方法：增删改查

列表自带一堆方法来操作数据：

---

### 添加

\`\`\`python
fruits.append("梨")        # 加到末尾
fruits.insert(1, "草莓")    # 插到索引 1 的位置
fruits.extend(["瓜","桃"])  # 把另一个列表加到末尾
\`\`\`

---

### 删除

\`\`\`python
fruits.remove("香蕉")       # 删除指定值（只删第一个）
fruits.pop()               # 删除并返回最后一个
fruits.pop(2)              # 删除并返回索引 2 的元素
del fruits[0]              # 直接删除索引 0
fruits.clear()             # 全部清空
\`\`\`

---

### 查找

\`\`\`python
fruits.index("苹果")        # 返回"苹果"的索引
fruits.count("苹果")        # 数"苹果"出现次数
\`\`\`

---

### 修改

\`\`\`python
fruits[0] = "猕猴桃"        # 直接改
\`\`\`

---

### 注意区分

- \`remove(值)\` — 按值删除
- \`pop(索引)\` — 按位置删除并返回
- \`del list[索引]\` — 按位置删除（不返回）`,
      starterCode: `items = ["A", "B", "C", "D", "E"]
print("原始：", items)

items.append("F")
print("append F：", items)

items.insert(2, "X")
print("insert X在索引2：", items)

items.remove("D")
print("remove D：", items)

popped = items.pop()
print("pop 最后一项：", items)
print("弹出的值：", popped)

items[0] = "Z"
print("修改索引0为Z：", items)`,
      expectedOutput: `原始： ['A', 'B', 'C', 'D', 'E']
append F： ['A', 'B', 'C', 'D', 'E', 'F']
insert X在索引2： ['A', 'B', 'X', 'C', 'D', 'E', 'F']
remove D： ['A', 'B', 'X', 'C', 'E', 'F']
pop 最后一项： ['A', 'B', 'X', 'C', 'E']
弹出的值： F
修改索引0为Z： ['Z', 'B', 'X', 'C', 'E']`,
      hint: 'pop() 既删除又返回——像一个弹簧弹出最上面的东西并交给你',
    },
    {
      id: '6.3',
      chapterId: 'ch6',
      title: '排序 — sort() vs sorted()',
      content: `## 排序：sort() vs sorted()

Python 有两种排序方式，区别很关键：

---

### sort() — 原地排序（修改原列表）

\`\`\`python
nums = [3, 1, 2]
nums.sort()          # 原列表被改变
print(nums)          # [1, 2, 3]
\`\`\`

---

### sorted() — 返回新列表（原列表不动）

\`\`\`python
nums = [3, 1, 2]
new = sorted(nums)   # 返回新列表
print(nums)          # [3, 1, 2]（没变！）
print(new)           # [1, 2, 3]
\`\`\`

---

### 反向排序

\`\`\`python
nums.sort(reverse=True)          # 从大到小
sorted(nums, reverse=True)       # 从大到小
\`\`\`

---

### 按自定义规则排序

\`\`\`python
words = ["apple", "Go", "Python"]
# 按长度排序
words.sort(key=len)              # ["Go", "apple", "Python"]
# 按最后一个字母排序
words.sort(key=lambda w: w[-1])
\`\`\`

---

### 选择建议

**默认用 \`sorted()\`**，不破坏原始数据；只在确定不需要原列表时才用 \`sort()\`。`,
      starterCode: `nums = [5, 2, 8, 1, 3]
print("原始：", nums)

sorted_nums = sorted(nums)
print("sorted()返回新列表：", sorted_nums)
print("原列表没变：", nums)

nums.sort()
print("sort()后原列表：", nums)

nums.sort(reverse=True)
print("降序：", nums)

words = ["python", "go", "rust", "c"]
words.sort(key=len)
print("按长度排序：", words)`,
      expectedOutput: `原始： [5, 2, 8, 1, 3]
sorted()返回新列表： [1, 2, 3, 5, 8]
原列表没变： [5, 2, 8, 1, 3]
sort()后原列表： [1, 2, 3, 5, 8]
降序： [8, 5, 3, 2, 1]
按长度排序： ['c', 'go', 'rust', 'python']`,
      hint: 'sort() 像在白板上直接改，sorted() 像复印一份再改——保护原始数据',
    },
    {
      id: '6.4',
      chapterId: 'ch6',
      title: '切片 + 列表推导式',
      content: `## 列表切片 + 推导式 = 超级组合

列表和字符串一样支持切片和推导式，组合使用威力无穷！

---

### 列表切片

\`\`\`python
nums = [0, 1, 2, 3, 4, 5]
nums[2:5]       # [2, 3, 4]
nums[:3]        # [0, 1, 2]
nums[3:]        # [3, 4, 5]
nums[::2]       # [0, 2, 4]（隔一个取一个）
nums[::-1]      # [5, 4, 3, 2, 1, 0]（反转）
\`\`\`

---

### 切片赋值（就地替换）

\`\`\`python
nums[1:3] = [10, 20]   # 把索引 1,2 替换为 10, 20
\`\`\`

---

### 列表推导式 + 切片

\`\`\`python
# 取列表前半部分，每个乘以 10
[n*10 for n in nums[:len(nums)//2]]
\`\`\`

---

### 复制列表的正确方法

\`\`\`python
new = nums[:]    # ✅ 创建副本
new = nums.copy() # ✅ 也可以用.copy()
# new = nums     # ❌ 这只是另一个引用，改 new 会影响 nums！
\`\`\``,
      starterCode: `nums = [0, 10, 20, 30, 40, 50, 60]
print("原始：", nums)

print("前3个：", nums[:3])
print("后3个：", nums[-3:])
print("步长2：", nums[::2])
print("反转：", nums[::-1])

# 进阶：取中间三个，每个除以10
middle = [n // 10 for n in nums[2:5]]
print("中间三个÷10：", middle)

# 切片赋值
nums[1:3] = [100, 200]
print("切片赋值后：", nums)`,
      expectedOutput: `原始： [0, 10, 20, 30, 40, 50, 60]
前3个： [0, 10, 20]
后3个： [40, 50, 60]
步长2： [0, 20, 40, 60]
反转： [60, 50, 40, 30, 20, 10, 0]
中间三个÷10： [2, 3, 4]
切片赋值后： [0, 100, 200, 30, 40, 50, 60]`,
      hint: '列表切片和字符串切片语法一模一样：[起点:终点:步长]，学会了切片就学会了一半 Python',
    },
    {
      id: '6.5',
      chapterId: 'ch6',
      title: '元组 — 不可变的列表',
      content: `## 元组：不可变的列表

元组（\`tuple\`）和列表几乎一样，只有一个关键区别：**元组不可修改**。

\`\`\`python
# 列表用方括号，可以改
fruits = ["苹果", "香蕉"]
fruits[0] = "梨"    # ✅ 可以

# 元组用圆括号，不能改
colors = ("红", "绿", "蓝")
# colors[0] = "黄"  # ❌ 报错！元组不能修改
\`\`\`

---

### 什么时候用元组？

1. **保护数据不被意外修改**
2. **坐标、颜色值**等固定数据
3. **函数返回多个值**时，Python 默认返回元组

---

### 元组的其他操作（和列表一样）

\`\`\`python
colors[0]          # "红"（索引）
len(colors)        # 3
"红" in colors     # True
colors[1:3]        # ("绿", "蓝")（切片）
\`\`\`

---

### 单元素元组的坑

\`\`\`python
t = (1)       # ❌ 这是数字 1，不是元组！
t = (1,)      # ✅ 这才是只有一个元素的元组
\`\`\`

逗号才是元组的灵魂！`,
      starterCode: `point = (3, 5)
rgb = (255, 128, 0)

print("坐标：", point)
print("x =", point[0], "y =", point[1])

print("颜色 RGB：", rgb)
print("R =", rgb[0], "G =", rgb[1], "B =", rgb[2])

# 元组解包
x, y = point
print(f"解包：x={x}, y={y}")

# 尝试修改会怎样？
# point[0] = 10  # 取消注释会报错`,
      expectedOutput: `坐标： (3, 5)
x = 3 y = 5
颜色 RGB： (255, 128, 0)
R = 255 G = 128 B = 0
解包：x=3, y=5`,
      hint: '元组可以"解包"：x, y = (3, 5) 直接把 3 赋给 x，5 赋给 y，超方便！',
    },
    {
      id: '6.6',
      chapterId: 'ch6',
      title: '列表方法进阶 — index, count, extend, clear',
      content: `## 列表方法进阶：更多实用操作

除了 append/insert/remove/pop，列表还有一组方法让数据处理更高效。

---

### index() — 查找元素位置

\`\`\`python
fruits = ["苹果", "香蕉", "橘子", "香蕉"]
fruits.index("香蕉")     # 1（返回第一个匹配的索引）
fruits.index("香蕉", 2)  # 3（从索引 2 开始往后找）
# fruits.index("西瓜")  # ❌ ValueError！找不到会报错
\`\`\`

---

### count() — 统计出现次数

\`\`\`python
nums = [1, 2, 2, 3, 2, 4]
nums.count(2)            # 3（2 出现了 3 次）
nums.count(5)            # 0（没有就是 0，不会报错）
\`\`\`

---

### extend() — 批量追加

\`\`\`python
a = [1, 2]
a.extend([3, 4, 5])      # a 变成 [1, 2, 3, 4, 5]
# vs append：a.append([3,4,5]) → [1, 2, [3, 4, 5]]
\`\`\`
\`extend\` 把另一个序列的**元素**逐个加进去；\`append\` 把它当成一个元素。

---

### clear() — 清空列表

\`\`\`python
nums = [1, 2, 3]
nums.clear()             # nums 变成 []
\`\`\`

---

### reverse() — 原地反转

\`\`\`python
nums = [1, 2, 3]
nums.reverse()           # nums 变成 [3, 2, 1]
# 不想改原列表？用切片 nums[::-1]
\`\`\``,
      starterCode: `nums = [1, 2, 3, 2, 4, 2, 5]

print("原始：", nums)
print("2 出现次数：", nums.count(2))
print("5 出现次数：", nums.count(5))
print("3 的索引：", nums.index(3))

# extend vs append
a = [1, 2]
b = [1, 2]
a.extend([3, 4])
b.append([3, 4])
print(f"\\nextend [3,4]：{a}")
print(f"append [3,4]：{b}")

# reverse
letters = ["a", "b", "c", "d"]
letters.reverse()
print(f"\\n反转后：{letters}")

# clear
temp = [1, 2, 3]
temp.clear()
print(f"清空后：{temp}（长度={len(temp)}）")`,
      expectedOutput: `原始： [1, 2, 3, 2, 4, 2, 5]
2 出现次数： 3
5 出现次数： 1
3 的索引： 2

extend [3,4]：[1, 2, 3, 4]
append [3,4]：[1, 2, [3, 4]]

反转后： ['d', 'c', 'b', 'a']
清空后： []（长度=0）`,
      hint: 'extend vs append 是面试常考题——extend 把序列"展开"加入，append 把参数整体作为一个元素加入',
    },
    {
      id: '6.7',
      chapterId: 'ch6',
      title: '列表复制 — 浅拷贝 vs 深拷贝',
      content: `## 浅拷贝 vs 深拷贝：列表复制的陷阱

---

### 直接赋值不是复制！

\`\`\`python
a = [1, 2, 3]
b = a           # ❌ b 和 a 指向同一个列表！
b[0] = 99
print(a)        # [99, 2, 3] —— a 也被改了！
\`\`\`
\`b = a\` 只是给同一个列表起了个"别名"，改一个另一个也变。

---

### 浅拷贝 — 复制一层

\`\`\`python
a = [1, 2, 3]
b = a.copy()    # ✅ 或 a[:] 或 list(a)
b[0] = 99
print(a)        # [1, 2, 3] —— 安全！
print(b)        # [99, 2, 3]
\`\`\`

但是！如果列表里嵌套了列表，浅拷贝只复制外层：
\`\`\`python
a = [[1, 2], [3, 4]]
b = a.copy()
b[0][0] = 99
print(a)        # [[99, 2], [3, 4]] —— 内层被改了！
\`\`\`

---

### 深拷贝 — 递归复制一切

\`\`\`python
import copy
a = [[1, 2], [3, 4]]
b = copy.deepcopy(a)     # 深拷贝！
b[0][0] = 99
print(a)        # [[1, 2], [3, 4]] —— 安全！
\`\`\`

---

### 速查表

| 方式 | 写法 | 嵌套安全？ |
|------|------|-----------|
| 赋值 | \`b = a\` | ❌ 不是复制 |
| 浅拷贝 | \`a.copy()\`, \`a[:]\`, \`list(a)\` | ❌ 嵌套会共享 |
| 深拷贝 | \`copy.deepcopy(a)\` | ✅ 完全独立 |`,
      starterCode: `import copy

# 浅拷贝 vs 赋值
a = [1, 2, 3]
b = a           # 不是复制！
c = a.copy()    # 浅拷贝

b[0] = 99
c[1] = 88
print("原始 a：", a, "（被 b 影响了！）")
print("赋值 b：", b)
print("拷贝 c：", c)

# 嵌套列表的陷阱
print("\\n=== 嵌套列表 ===")
nested = [[1, 2], [3, 4]]
shallow = nested.copy()
deep = copy.deepcopy(nested)

shallow[0][0] = 99
deep[1][0] = 88
print("原始嵌套：", nested, "（浅拷贝改了内层！）")
print("浅拷贝：  ", shallow)
print("深拷贝：  ", deep)

# 各种复制方式
print("\\n=== 复制方式 ===")
orig = [10, 20, 30]
print("a[:]：     ", orig[:])
print("list(a)：   ", list(orig))
print("a.copy()：  ", orig.copy())
print("copy.copy：", copy.copy(orig))`,
      expectedOutput: `原始 a： [99, 2, 3] （被 b 影响了！）
赋值 b： [99, 2, 3]
拷贝 c： [1, 88, 3]

=== 嵌套列表 ===
原始嵌套： [[99, 2], [3, 4]] （浅拷贝改了内层！）
浅拷贝：   [[99, 2], [3, 4]]
深拷贝：   [[1, 2], [88, 4]]

=== 复制方式 ===
a[:]：      [10, 20, 30]
list(a)：   [10, 20, 30]
a.copy()：  [10, 20, 30]
copy.copy： [10, 20, 30]`,
      hint: '只要列表里没有嵌套列表/字典，浅拷贝就够用。有嵌套结构且需要完全隔离时，才需要 copy.deepcopy()',
    },
    {
      id: '6.8',
      chapterId: 'ch6',
      title: 'enumerate() 与 zip() — 遍历技巧',
      content: `## enumerate() 和 zip()：Python 的遍历利器

---

### enumerate() — 同时拿索引和值

不用手动维护计数器：
\`\`\`python
# ❌ 笨方法
fruits = ["苹果", "香蕉", "橘子"]
for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")

# ✅ enumerate()
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
# 0: 苹果
# 1: 香蕉
# 2: 橘子
\`\`\`

可以指定起始编号：
\`\`\`python
for i, fruit in enumerate(fruits, 1):  # 从 1 开始
    print(f"{i}. {fruit}")
\`\`\`

---

### zip() — 并行遍历多个序列

\`\`\`python
names = ["小明", "小红", "小刚"]
scores = [92, 88, 75]

for name, score in zip(names, scores):
    print(f"{name}: {score}分")
# 小明: 92分
# 小红: 88分
# 小刚: 75分
\`\`\`
就像拉链一样，把多个序列"拉"在一起。长度不同时，以最短的为准。

---

### 组合使用

\`\`\`python
# enumerate + zip：带编号的并行遍历
for i, (name, score) in enumerate(zip(names, scores), 1):
    print(f"第{i}名：{name} {score}分")
\`\`\`

---

### zip(*) — 解压缩

\`\`\`python
pairs = [("小明", 92), ("小红", 88), ("小刚", 75)]
names, scores = zip(*pairs)  # 还原成两个元组！
\`\`\``,
      starterCode: `# enumerate
fruits = ["苹果", "香蕉", "橘子", "草莓"]
print("=== enumerate ===")
for i, fruit in enumerate(fruits):
    print(f"  fruits[{i}] = {fruit}")

print("\\n从 1 开始编号：")
for i, fruit in enumerate(fruits, 1):
    print(f"  {i}. {fruit}")

# zip 并行遍历
names = ["小明", "小红", "小刚"]
math = [95, 88, 76]
english = [85, 91, 82]

print("\\n=== zip 成绩单 ===")
for name, m, e in zip(names, math, english):
    total = m + e
    print(f"  {name}：数学{m} 英语{e} 总分{total}")

# enumerate + zip
print("\\n=== 排名 ===")
for rank, (name, m, e) in enumerate(zip(names, math, english), 1):
    print(f"  第{rank}名：{name}（总分{m+e}）")

# zip(*) 解压缩
pairs = list(zip(names, math))
print(f"\\n压缩：{pairs}")
n, s = zip(*pairs)
print(f"解压：names={list(n)} scores={list(s)}")`,
      expectedOutput: `=== enumerate ===
  fruits[0] = 苹果
  fruits[1] = 香蕉
  fruits[2] = 橘子
  fruits[3] = 草莓

从 1 开始编号：
  1. 苹果
  2. 香蕉
  3. 橘子
  4. 草莓

=== zip 成绩单 ===
  小明：数学95 英语85 总分180
  小红：数学88 英语91 总分179
  小刚：数学76 英语82 总分158

=== 排名 ===
  第1名：小明（总分180）
  第2名：小红（总分179）
  第3名：小刚（总分158）

压缩：[('小明', 95), ('小红', 88), ('小刚', 76)]
解压：names=['小明', '小红', '小刚'] scores=[95, 88, 76]`,
      hint: 'enumerate 和 zip 是 Python 中最常用的两个内置函数——一个给序列加编号，一个把多个序列"缝"在一起',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch7 — 字典与集合（4 节）
// ─────────────────────────────────────────────────────────────
const ch7: Chapter = {
  id: 'ch7',
  title: '字典与集合',
  description: '掌握字典（键值对）和集合（去重+运算），Python 核心数据结构',
  sections: [
    {
      id: '7.1',
      chapterId: 'ch7',
      title: '字典是什么 — 键值对的威力',
      content: `## 字典：Python 最强数据结构

字典（\`dict\`）用花括号 \`{}\`，用**键（key）→ 值（value）**的方式存数据：

\`\`\`python
student = {
    "name": "小明",
    "age": 18,
    "score": 92
}
\`\`\`

---

### 访问和修改

\`\`\`python
student["name"]         # "小明"（用键访问）
student["age"] = 19     # 修改
student["city"] = "北京"  # 添加新键值对
\`\`\`

---

### 字典 vs 列表

| | 列表 list | 字典 dict |
|------|-----------|-----------|
| 符号 | \`[]\` | \`{}\` |
| 查找方式 | 索引数字 | 键（任意类型） |
| 适用场景 | 有序序列 | 名字→信息映射 |
| 查找速度 | 越后面越慢 | 瞬间找到（O(1)） |

---

### 字典的键

- 键必须是**不可变**类型（字符串、数字、元组）
- 列表不能做键（因为列表可变）
- 每个键只能出现一次

---

字典是 Python 的基石——JSON 格式就是字典结构！`,
      starterCode: `student = {
    "name": "小明",
    "age": 18,
    "score": 92,
    "city": "北京"
}

print("姓名：", student["name"])
print("年龄：", student["age"])
print("分数：", student["score"])
print("城市：", student["city"])

student["level"] = "A"
print("新增 level：", student["level"])
print("整个字典：", student)`,
      expectedOutput: `姓名： 小明
年龄： 18
分数： 92
城市： 北京
新增 level： A
整个字典： {'name': '小明', 'age': 18, 'score': 92, 'city': '北京', 'level': 'A'}`,
      hint: '字典查找不用索引，用键——就像查字典时不是翻到第100页，而是直接查"苹果"这个词条',
    },
    {
      id: '7.2',
      chapterId: 'ch7',
      title: '字典操作 — get/items/keys/values',
      content: `## 字典常用操作

---

### get() — 安全访问（推荐！）

\`\`\`python
student.get("name")         # "小明"（键存在）
student.get("phone")        # None（键不存在，不报错）
student.get("phone", "未知") # "未知"（键不存在，返回默认值）
\`\`\`

用 \`[]\` 访问不存在的键会**直接报错**，用 \`get()\` 则返回 \`None\` 或你指定的默认值。

---

### 遍历字典

\`\`\`python
# 遍历键
for key in student.keys():
    print(key)

# 遍历值
for value in student.values():
    print(value)

# 同时遍历键和值（最常用）
for key, value in student.items():
    print(f"{key}: {value}")
\`\`\`

---

### 其他常用操作

\`\`\`python
del student["age"]           # 删除键
student.pop("city")          # 删除并返回值
"name" in student            # True（检查键是否存在）
len(student)                 # 键值对数量
\`\`\``,
      starterCode: `student = {"name": "小明", "age": 18, "score": 92}

# get 安全访问
print("name:", student.get("name"))
print("phone:", student.get("phone", "无"))

# 遍历键
print("\\n所有键：")
for k in student.keys():
    print("  ", k)

# 遍历键和值
print("\\n所有键值对：")
for k, v in student.items():
    print(f"  {k} = {v}")

# 检查
print("\\n'age'存在？", "age" in student)
print("'phone'存在？", "phone" in student)`,
      expectedOutput: `name: 小明
phone: 无

所有键：
   name
   age
   score

所有键值对：
  name = 小明
  age = 18
  score = 92

'age'存在？ True
'phone'存在？ False`,
      hint: '遍历字典用 .items()，同时拿到键和值——这比用索引遍历列表优雅得多',
    },
    {
      id: '7.3',
      chapterId: 'ch7',
      title: '嵌套字典 — 字典里放字典',
      content: `## 嵌套字典：组织复杂数据

字典的值可以是另一个字典，形成**嵌套结构**——这就是 JSON 的本质！

\`\`\`python
school = {
    "name": "阳光小学",
    "students": {
        "001": {"name": "小明", "score": 92},
        "002": {"name": "小红", "score": 88},
    }
}
\`\`\`

---

### 访问嵌套数据

\`\`\`python
school["students"]["001"]["name"]    # "小明"
school["students"]["002"]["score"]   # 88
\`\`\`

一层一层用 \`[]\` 往下取。

---

### 字典 + 列表 = 数据库

\`\`\`python
students = [
    {"name": "小明", "score": 92},
    {"name": "小红", "score": 88},
    {"name": "小刚", "score": 75},
]
\`\`\`

这是最常见的 Python 数据结构：**列表里装字典**——就像数据库表格！几乎所有的 API 数据都是这种格式。

---

### 遍历嵌套结构

\`\`\`python
for s in students:
    print(f"{s['name']}: {s['score']}")
\`\`\``,
      starterCode: `students = [
    {"name": "小明", "math": 92, "eng": 85},
    {"name": "小红", "math": 88, "eng": 91},
    {"name": "小刚", "math": 75, "eng": 78},
]

def total(s):
    return s["math"] + s["eng"]

print("成绩单：")
for s in students:
    total_score = s["math"] + s["eng"]
    avg = total_score / 2
    print(f"  {s['name']} 总分{total_score} 平均{avg:.1f}")

# 找最高分（传入函数作为 key）
best = max(students, key=total)
print(f"\\n总分最高：{best['name']}")`,
      expectedOutput: `成绩单：
  小明 总分177 平均88.5
  小红 总分179 平均89.5
  小刚 总分153 平均76.5

总分最高：小红`,
      hint: 'max(students, key=total) 传入一个函数作为比较规则——Python 里函数可以像变量一样传递！',
    },
    {
      id: '7.4',
      chapterId: 'ch7',
      title: '集合 — 去重 + 交并差运算',
      content: `## 集合：自动去重的容器

集合（\`set\`）和列表很像，但有三个特点：
1. **自动去重**（没有重复元素）
2. **无序**（不保证顺序）
3. **支持数学集合运算**

\`\`\`python
s = {1, 2, 3, 2, 1}
print(s)    # {1, 2, 3} ——自动去重！
\`\`\`

---

### 创建集合

\`\`\`python
s = {1, 2, 3}                 # 直接写
s = set([1, 2, 3, 2, 1])     # 从列表创建（去重！）
empty_set = set()              # 空集合（不能用 {}，那是空字典）
\`\`\`

---

### 集合运算（数学课重现！）

\`\`\`python
a = {1, 2, 3}
b = {2, 3, 4}

a & b     # {2, 3}      交集（both）
a | b     # {1, 2, 3, 4} 并集（either）
a - b     # {1}          差集（in a but not b）
a ^ b     # {1, 4}       对称差（不同时在两边）
\`\`\`

---

### 集合常用场景

- **去重**：\`unique = set(duplicated_list)\`
- **找共同**：\`set(a) & set(b)\`
- **成员检查**：\`x in my_set\`（比列表快很多！）`,
      starterCode: `a = {1, 2, 3, 4, 5}
b = {4, 5, 6, 7, 8}

print("a:", a)
print("b:", b)
print("交集 a & b:", a & b)
print("并集 a | b:", a | b)
print("差集 a - b:", a - b)
print("对称差 a ^ b:", a ^ b)

# 去重
nums = [1, 2, 2, 3, 3, 3, 4]
unique = set(nums)
print("\\n去重前：", nums)
print("去重后：", unique)`,
      expectedOutput: `a: {1, 2, 3, 4, 5}
b: {4, 5, 6, 7, 8}
交集 a & b: {4, 5}
并集 a | b: {1, 2, 3, 4, 5, 6, 7, 8}
差集 a - b: {1, 2, 3}
对称差 a ^ b: {1, 2, 3, 6, 7, 8}

去重前： [1, 2, 2, 3, 3, 3, 4]
去重后： {1, 2, 3, 4}`,
      hint: '& 交集 | 并集 - 差集 ^ 对称差——集合运算符就是数学符号，直观好记！',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch8 — 函数（6 节）
// ─────────────────────────────────────────────────────────────
const ch8: Chapter = {
  id: 'ch8',
  title: '函数',
  description: '用 def 定义函数：参数、返回值、*args/**kwargs、函数是一等对象、作用域',
  sections: [
    {
      id: '8.1',
      chapterId: 'ch8',
      title: 'def — 定义你的第一个函数',
      content: `## def：定义函数

函数就是把一段代码打包，取个名字，之后随时调用：

\`\`\`python
def 函数名():
    做的事
\`\`\`

---

### 第一个函数

\`\`\`python
def greet():
    print("你好！")
    print("欢迎来到 Python 世界！")

greet()  # 调用函数
\`\`\`

---

### 为什么需要函数？

1. **避免重复**：一段代码写一次，到处调用
2. **起个好名字**：让别人一眼看懂这段代码做什么
3. **方便修改**：改一处，所有调用都生效

---

### Python vs TypeScript

\`\`\`python
# Python
def greet():
    print("你好")

# TypeScript
# function greet(): void {
#     console.log("你好");
# }
\`\`\`

Python 没有 \`{}\`、没有 \`void\`、没有分号——干净到极致。

---

### 函数定义顺序

Python 中，**函数必须先定义再调用**（定义写上面，调用写下面）。`,
      starterCode: `def say_hi():
    print("你好呀！")

def draw_line():
    print("=" * 20)

# 调用函数
draw_line()
say_hi()
say_hi()
draw_line()

# 可以在循环里调用
for i in range(3):
    print(f"第{i+1}次：", end="")
    say_hi()`,
      expectedOutput: `====================
你好呀！
你好呀！
====================
第1次：你好呀！
第2次：你好呀！
第3次：你好呀！`,
      hint: '函数名通常用小写字母+下划线（snake_case），这是 Python 社区的习惯',
    },
    {
      id: '8.2',
      chapterId: 'ch8',
      title: '参数 — 位置参数、默认参数、关键字参数',
      content: `## 参数：给函数传数据

---

### 位置参数（最基础）

\`\`\`python
def greet(name, greeting):
    print(f"{greeting}，{name}！")

greet("小明", "你好")  # "你好，小明！"
\`\`\`
按位置对应：第1个参数→name，第2个→greeting。

---

### 默认参数

\`\`\`python
def greet(name, greeting="你好"):
    print(f"{greeting}，{name}！")

greet("小明")           # "你好，小明！"（默认值）
greet("小红", "早上好")  # "早上好，小红！"（覆盖默认值）
\`\`\`

---

### 关键字参数（最灵活）

\`\`\`python
def describe(name, age, city):
    print(f"{name}，{age}岁，来自{city}")

describe(age=18, city="北京", name="小明")  # 不按顺序也行！
\`\`\`

---

### 规则

\`\`\`python
def f(a, b, c=0):   # 默认参数必须放在最后
    pass
f(1, 2)             # a=1, b=2, c=0
f(1, 2, 3)          # a=1, b=2, c=3
f(a=1, b=2)         # 关键字调用
\`\`\``,
      starterCode: `def order(item, price, quantity=1, discount=0):
    total = price * quantity * (1 - discount)
    print(f"商品：{item}")
    print(f"单价：¥{price} × {quantity} = ¥{price * quantity}")
    if discount > 0:
        print(f"折扣：{discount*100:.0f}% → 实付 ¥{total:.0f}")
    else:
        print(f"实付：¥{total:.0f}")
    print("---")

order("键盘", 299, quantity=2)
order("鼠标", 149, discount=0.1)`,
      expectedOutput: `商品：键盘
单价：¥299 × 2 = ¥598
实付：¥598
---
商品：鼠标
单价：¥149 × 1 = ¥149
折扣：10% → 实付 ¥134
---`,
      hint: 'quantity=2 和 discount=0.1 是关键字参数——你可以只传想改的参数，不用按顺序',
    },
    {
      id: '8.3',
      chapterId: 'ch8',
      title: '返回值 — return 的妙用',
      content: `## return：函数把结果"交出来"

\`\`\`python
def add(a, b):
    return a + b      # 把结果返回给调用者

result = add(3, 5)     # result = 8
\`\`\`

---

### return 之后函数立刻结束

\`\`\`python
def early_return(x):
    if x < 0:
        return "负数"   # 走到这就结束了
    print("这行可能不会执行")
    return "非负数"
\`\`\`

---

### 返回多个值（Python 特色！）

\`\`\`python
def stats(nums):
    return sum(nums), max(nums), min(nums)

total, maximum, minimum = stats([1, 5, 3])
# total=9, maximum=5, minimum=1
\`\`\`

Python 的函数可以"同时返回多个值"——实际上返回的是一个元组，自动解包。

---

### 没有 return 的函数

\`\`\`python
def greet():
    print("你好")

result = greet()    # result = None（没有return默认返回None）
\`\`\``,
      starterCode: `def calc(a, b):
    add = a + b
    sub = a - b
    mul = a * b
    div = a / b if b != 0 else None
    return add, sub, mul, div

def grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 60:
        return "C"
    return "D"

r1, r2, r3, r4 = calc(10, 3)
print(f"10和3：和={r1} 差={r2} 积={r3} 商={r4:.2f}")

scores = [95, 82, 67, 45]
for s in scores:
    print(f"  {s}分 → {grade(s)}")`,
      expectedOutput: `10和3：和=13 差=7 积=30 商=3.33
  95分 → A
  82分 → B
  67分 → C
  45分 → D`,
      hint: 'return a, b, c 是 Python 独有的多返回值语法——实际上返回了一个元组 (a, b, c)',
    },
    {
      id: '8.4',
      chapterId: 'ch8',
      title: '*args 和 **kwargs — 接收任意数量的参数',
      content: `## *args 和 **kwargs：灵活的参数收集

当你不确定函数会收到多少个参数时，用 \`*args\` 和 \`**kwargs\`。

---

### *args — 收集多余的位置参数

\`\`\`python
def sum_all(*args):
    """可以接收任意多个参数"""
    total = 0
    for n in args:
        total += n
    return total

sum_all(1, 2)        # 3
sum_all(1, 2, 3, 4)  # 10
\`\`\`

\`*args\` 把收到的所有位置参数打包成一个**元组**。名字 \`args\` 是约定，你也可以叫 \`*nums\`。

---

### **kwargs — 收集多余的关键字参数

\`\`\`python
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="小明", age=18, city="北京")
# name: 小明
# age: 18
# city: 北京
\`\`\`

\`**kwargs\` 把收到的关键字参数打包成一个**字典**。

---

### 组合使用

\`\`\`python
def f(a, b, *args, **kwargs):
    print(f"a={a}, b={b}")
    print(f"args={args}")
    print(f"kwargs={kwargs}")

f(1, 2, 3, 4, x=5, y=6)
# a=1, b=2
# args=(3, 4)
# kwargs={'x': 5, 'y': 6}
\`\`\`

顺序必须是：普通参数 → \`*args\` → \`**kwargs\`。`,
      starterCode: `# *args：求和任意多个数
def my_sum(*args):
    total = 0
    for n in args:
        total += n
    return total

print("sum(1,2,3):", my_sum(1, 2, 3))
print("sum(10,20):", my_sum(10, 20))
print("sum():", my_sum())

# **kwargs：批量设置属性
def describe(**kwargs):
    for k, v in kwargs.items():
        print(f"  {k} = {v}")

print("\\n人物信息：")
describe(name="小明", age=18, city="北京")`,
      expectedOutput: `sum(1,2,3): 6
sum(10,20): 30
sum(): 0

人物信息：
  name = 小明
  age = 18
  city = 北京`,
      hint: '*args 把位置参数打包成元组，**kwargs 把关键字参数打包成字典——星号数量=元组/字典',
    },
    {
      id: '8.5',
      chapterId: 'ch8',
      title: '函数是一等对象 — 把函数当参数传递',
      content: `## 函数是一等对象：函数可以当变量用

在 Python 中，函数和数字、字符串一样——可以赋值给变量、放进列表、作为参数传递。

---

### 函数可以赋值给变量

\`\`\`python
def greet():
    return "你好！"

say = greet          # 把函数赋给变量（没有括号！）
print(say())         # "你好！"
\`\`\`

注意：\`greet\` 是函数本身，\`greet()\` 是调用函数。

---

### 函数可以作为参数

\`\`\`python
def apply(func, x, y):
    return func(x, y)

def add(a, b):
    return a + b

def mul(a, b):
    return a * b

apply(add, 3, 5)     # 8
apply(mul, 3, 5)     # 15
\`\`\`

这就是 \`sorted(key=len)\` 和 \`max(key=...)\` 的原理——把函数当参数传进去！

---

### 函数可以放在列表里

\`\`\`python
ops = [add, mul, lambda x, y: x - y]
for op in ops:
    print(op(10, 3))    # 13, 30, 7
\`\`\`

---

### 常见应用

\`\`\`python
# sorted/max/min 的 key 参数
words = ["Python", "Go", "Rust"]
sorted(words, key=len)        # 按长度排序

# map/filter 的第一个参数就是函数
list(map(str.upper, words))   # ['PYTHON', 'GO', 'RUST']
\`\`\``,
      starterCode: `# 函数赋给变量
def double(x):
    return x * 2

f = double              # 把函数本身赋给 f
print("f(5) =", f(5))   # 调用 f 就是调用 double

# 函数作为参数
def apply(func, a, b):
    return func(a, b)

def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

print("add(3,5) =", apply(add, 3, 5))
print("multiply(3,5) =", apply(multiply, 3, 5))

# 用内置函数作为参数
words = ["python", "go", "rust", "c"]
by_len = sorted(words, key=len)
print("\\n按长度排序：", by_len)`,
      expectedOutput: `f(5) = 10
add(3,5) = 8
multiply(3,5) = 15

按长度排序： ['c', 'go', 'rust', 'python']`,
      hint: '函数名不加括号就是函数本身，可以像变量一样传递——这是 Python "一切皆对象"的体现',
    },
    {
      id: '8.6',
      chapterId: 'ch8',
      title: '作用域 — 局部变量 vs 全局变量',
      content: `## 作用域：变量的"势力范围"

---

### 局部变量（函数内部）

\`\`\`python
def my_func():
    x = 10        # 局部变量，只在函数内有效
    print(x)

my_func()
# print(x)       # ❌ 报错！x 在外面不可见
\`\`\`

---

### 全局变量（整个文件可见）

\`\`\`python
name = "小明"    # 全局变量

def greet():
    print(f"你好，{name}")  # 可以读取全局变量

greet()
\`\`\`

---

### ⚠️ 修改全局变量的陷阱

\`\`\`python
count = 0

def increment():
    # count += 1   # ❌ 报错！想修改全局变量？
    global count   # 必须声明 global
    count += 1     # ✅ 现在可以改了
\`\`\`

---

### 最佳实践

1. **尽量避免全局变量**——把数据通过参数传入
2. 函数内用 \`global\` 是"臭代码"的信号
3. 全局常量（全大写）可以接受：\`PI = 3.14159\`

---

### Python 的作用域规则：LEGB

Local → Enclosing → Global → Built-in（从内往外找）`,
      starterCode: `# 全局变量
app_name = "蜗牛编程"
version = "1.0"

def show_info():
    # 局部变量
    user = "小明"
    print(f"应用：{app_name}")  # 读取全局
    print(f"版本：{version}")   # 读取全局
    print(f"用户：{user}")      # 局部变量

def update_version():
    global version
    version = "2.0"

show_info()
update_version()
print("\\n更新后：")
show_info()`,
      expectedOutput: `应用：蜗牛编程
版本：1.0
用户：小明

更新后：
应用：蜗牛编程
版本：2.0
用户：小明`,
      hint: '函数内可以读取全局变量，但要修改必须用 global 声明——Python 这样设计是为了防止意外修改',
    },
    {
      id: '8.7',
      chapterId: 'ch8',
      title: '生成器与 yield — 惰性产生数据',
      content: `## 生成器：按需生产数据的"工厂"

普通函数一次返回所有结果（占内存），生成器**逐个**产生结果——用 \`yield\` 代替 \`return\`。

---

### yield vs return

\`\`\`python
# 普通函数——一次返回整个列表（占内存）
def squares_list(n):
    result = []
    for i in range(n):
        result.append(i ** 2)
    return result

# 生成器——逐个产出，不占内存
def squares_gen(n):
    for i in range(n):
        yield i ** 2          # 暂停，把值"吐"出去

print(squares_list(5))  # [0, 1, 4, 9, 16]   ← 整个列表
print(squares_gen(5))   # <generator object> ← 生成器对象

# 遍历生成器
for sq in squares_gen(5):
    print(sq, end=" ")  # 0 1 4 9 16
\`\`\`

---

### yield 的执行模型

\`yield\` 就像"暂停按钮"：
1. 函数执行到 \`yield\`，**暂停**并把值返回
2. 下次调用 \`next()\` 时，从暂停处**恢复**执行
3. 直到再次遇到 \`yield\` 或函数结束

---

### 生成器表达式

和列表推导式语法一样，用圆括号：
\`\`\`python
# 列表推导式——创建整个列表
squares = [x**2 for x in range(1000000)]  # 占几 MB 内存

# 生成器表达式——只定义"怎么算"
squares = (x**2 for x in range(1000000))  # 几乎不占内存！
\`\`\`

---

### 无限序列——只有生成器能做到

\`\`\`python
def infinite_count(start=0):
    while True:
        yield start
        start += 1

counter = infinite_count()
print(next(counter))  # 0
print(next(counter))  # 1
\`\`\`
列表不可能容纳无限元素，但生成器可以！`,
      starterCode: `# 普通函数 vs 生成器
def get_evens_list(limit):
    """返回所有偶数——一次性"""
    return [n for n in range(limit) if n % 2 == 0]

def get_evens_gen(limit):
    """逐个产出偶数——懒加载"""
    for n in range(limit):
        if n % 2 == 0:
            yield n

print("列表版本：", get_evens_list(12))
print("生成器遍历：", end=" ")
for even in get_evens_gen(12):
    print(even, end=" ")

# 生成器表达式
print("\\n\\n生成器表达式：")
gen = (x**2 for x in range(5))
print("gen 对象：", gen)
print("逐个取值：", end=" ")
for val in gen:
    print(val, end=" ")

# 无限计数器（演示）
print("\\n\\n无限计数器前5个：")
def counter():
    n = 0
    while True:
        yield n
        n += 1

c = counter()
for _ in range(5):
    print(next(c), end=" ")`,
      expectedOutput: `列表版本： [0, 2, 4, 6, 8, 10]
生成器遍历： 0 2 4 6 8 10 

生成器表达式：
gen 对象： <generator object <genexpr> at 0x...>
逐个取值： 0 1 4 9 16 

无限计数器前5个：
0 1 2 3 4 `,
      hint: '处理大数据时优先用生成器——它不一次性加载所有数据到内存，而是"需要时再生产"。列表是批发，生成器是零售',
      validation: generatorAddressValidation,
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch9 — 文件操作（3 节）
// ─────────────────────────────────────────────────────────────
const ch9: Chapter = {
  id: 'ch9',
  title: '文件操作',
  description: '读写文件：open() + with 语句、路径处理、pathlib',
  sections: [
    {
      id: '9.1',
      chapterId: 'ch9',
      title: '读文件 — open() + with 语句',
      content: `## 读文件：Python 最经典的模式

---

### 基本读文件

\`\`\`python
with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()
\`\`\`

---

### with 语句 — Python 的"自动关门"

\`\`\`python
with open(...) as f:
    # 操作文件
# 离开 with 块，文件自动关闭！
\`\`\`

不用 \`with\` 就得多写一行 \`f.close()\`——用 \`with\` 永远不会忘关文件。

---

### 读文件的三种方式

\`\`\`python
# 1. read() — 一次性读全文
content = f.read()

# 2. readline() — 读一行
line = f.readline()

# 3. readlines() — 读所有行，返回列表
lines = f.readlines()

# 4. 直接遍历（最常用！）
for line in f:
    print(line.strip())
\`\`\`

---

### 文件模式

| 模式 | 含义 |
|------|------|
| \`"r"\` | 读取（默认） |
| \`"w"\` | 写入（覆盖） |
| \`"a"\` | 追加 |
| \`"r+"\` | 读写 |`,
      starterCode: `# 用 with 打开文件，读内容
# 假设有 demo.txt 文件
try:
    with open("demo.txt", "w", encoding="utf-8") as f:
        f.write("第一行\\n第二行\\n第三行\\n")
    
    with open("demo.txt", "r", encoding="utf-8") as f:
        print("=== read() 读全文 ===")
        content = f.read()
        print(content)
except Exception as e:
    print("文件操作示例：")
    print("第一行")
    print("第二行")
    print("第三行")`,
      expectedOutput: `=== read() 读全文 ===
第一行
第二行
第三行
`,
      hint: 'with open(...) as f: 是最佳实践——你永远不用担心忘记 f.close()',
    },
    {
      id: '9.2',
      chapterId: 'ch9',
      title: '写文件 — 写入和追加',
      content: `## 写文件：写入和追加

---

### 写入（覆盖模式）

\`\`\`python
with open("note.txt", "w", encoding="utf-8") as f:
    f.write("Hello Python\\n")
    f.write("这是第二行\\n")
\`\`\`

⚠️ \`"w"\` 模式会**清空原文件**！原来内容全部消失。

---

### 追加（不覆盖）

\`\`\`python
with open("note.txt", "a", encoding="utf-8") as f:
    f.write("新增一行\\n")
\`\`\`

\`"a"\` 模式在文件末尾追加内容，原内容不受影响。

---

### writelines() — 一次写多行

\`\`\`python
lines = ["第一行\\n", "第二行\\n", "第三行\\n"]
f.writelines(lines)
\`\`\`

---

### write vs print（两种写入方式）

\`\`\`python
# write — 精确控制
f.write("hello")

# print 也可以写文件！
print("hello", file=f)
\`\`\`

\`print()\` 的 \`file\` 参数可以把输出重定向到文件，非常方便调试日志！`,
      starterCode: `# 写入模式（覆盖）
with open("log.txt", "w", encoding="utf-8") as f:
    f.write("=== 日志 ===\\n")
    f.write("程序启动\\n")
    for i in range(1, 4):
        f.write(f"第{i}步完成\\n")

# 追加模式
with open("log.txt", "a", encoding="utf-8") as f:
    f.write("任务结束\\n")

# 读出来看看
with open("log.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line, end="")`,
      expectedOutput: `=== 日志 ===
程序启动
第1步完成
第2步完成
第3步完成
任务结束`,
      hint: '"w" 模式是覆盖写入（先清空），"a" 模式是追加写入（接在末尾）——用哪个看需求',
    },
    {
      id: '9.3',
      chapterId: 'ch9',
      title: '文件路径 — os.path + pathlib',
      content: `## 文件路径处理

---

### 路径字符串的坑

\`\`\`python
# Windows 路径用反斜杠，但 Python 把 \\ 当转义符！
# "C:\\Users\\name\\file.txt" — 需要双写！

# 解决方案：用正斜杠 /（Python 自动转换）
path = "data/notes/note.txt"
\`\`\`

---

### os.path（经典方式）

\`\`\`python
import os
os.path.join("data", "notes", "note.txt")  # 自动用正确的分隔符
os.path.exists(path)     # 文件是否存在
os.path.basename(path)   # "note.txt"（文件名）
os.path.dirname(path)    # "data/notes"（目录）
os.path.splitext(path)   # ("data/notes/note", ".txt")
\`\`\`

---

### pathlib（现代方式，推荐！）

\`\`\`python
from pathlib import Path

p = Path("data/notes/note.txt")
p.parent      # data/notes（目录）
p.name        # note.txt（文件名）
p.stem        # note（不含后缀）
p.suffix      # .txt（后缀）
p.exists()    # 是否存在
p.is_file()   # 是文件吗

# 组合路径
data_dir = Path("data")
note_file = data_dir / "notes" / "note.txt"  # 用 / 拼接！✨
\`\`\`

\`pathlib\` 用 \`/\` 拼接路径，比 \`os.path.join\` 直观太多了！`,
      starterCode: `from pathlib import Path

# 路径拼接（用 / 号！）
data_dir = Path("data")
note_path = data_dir / "notes" / "python.txt"

print("完整路径：", note_path)
print("父目录：", note_path.parent)
print("文件名：", note_path.name)
print("不带后缀：", note_path.stem)
print("后缀：", note_path.suffix)

# 创建目录
log_dir = Path("logs")
log_dir.mkdir(exist_ok=True)
print("\\nlogs 目录已就绪")

# 列出路径各部分
for part in note_path.parts:
    print("  -", part)`,
      expectedOutput: `完整路径： data\\notes\\python.txt
父目录： data\\notes
文件名： python.txt
不带后缀： python
后缀： .txt

logs 目录已就绪
  - data
  - notes
  - python.txt`,
      hint: 'pathlib 是 Python 3.4+ 的标准库，用 Path 对象和 / 拼接路径，告别字符串拼接的噩梦',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch9a — 错误处理与调试（5 节）
// ─────────────────────────────────────────────────────────────
const ch9a: Chapter = {
  id: 'ch9a',
  title: '错误处理与调试',
  description: '学会读懂错误、优雅处理异常、掌握调试技巧——从"代码不工作"到"我知道哪里出了问题"',
  sections: [
    {
      id: '9a.1',
      chapterId: 'ch9a',
      title: '常见错误类型 — SyntaxError/NameError/TypeError/IndexError/KeyError',
      content: `## 常见错误类型：认识你的"敌人"

程序出错不可怕——可怕的是看不懂错误信息。Python 的错误信息其实非常友好，学会阅读它！

---

### 六大常见错误

**SyntaxError（语法错误）**——代码"不合语法"
\`\`\`python
if True print("hello")  # ❌ 少了冒号
# SyntaxError: invalid syntax
\`\`\`

**NameError（名字错误）**——用了不存在的变量
\`\`\`python
print(name)  # ❌ name 没定义过
# NameError: name 'name' is not defined
\`\`\`

**TypeError（类型错误）**——操作不支持的类型
\`\`\`python
"hello" + 5  # ❌ 字符串不能加数字
# TypeError: can only concatenate str (not "int") to str
\`\`\`

**IndexError（索引错误）**——列表索引越界
\`\`\`python
[1, 2, 3][5]  # ❌ 只有 3 个元素
# IndexError: list index out of range
\`\`\`

**KeyError（键错误）**——字典键不存在
\`\`\`python
{"a": 1}["b"]  # ❌ 键 "b" 不存在
\`\`\`

**ValueError（值错误）**——类型对但值不合理
\`\`\`python
int("abc")  # ❌ "abc" 不是数字
# ValueError: invalid literal for int()
\`\`\`

---

### 错误是朋友，不是敌人

每次错误都在告诉你：**这里和你想的不一样**。学会阅读错误信息，你就掌握了 50% 的调试能力。`,
      starterCode: `# 常见错误演示（用 try/except 安全展示）
def demo_error(name, code):
    try:
        exec(code)
    except Exception as e:
        print(f"❌ {name}：{type(e).__name__} — {e}")

print("=== Python 常见错误类型 ===\\n")
demo_error("SyntaxError", "if True print('hi')")
demo_error("NameError", "print(undefined_var)")
demo_error("TypeError", "'hello' + 5")
demo_error("IndexError", "[1,2,3][10]")
demo_error("KeyError", "{'a':1}['b']")
demo_error("ValueError", "int('abc')")
demo_error("ZeroDivisionError", "1/0")

print("\\n✅ 以上都是故意触发的——实际编程中，知道错误类型就能对症下药！")`,
      expectedOutput: `=== Python 常见错误类型 ===

❌ SyntaxError：invalid syntax (<string>, line 1)
❌ NameError：name 'undefined_var' is not defined
❌ TypeError：can only concatenate str (not "int") to str
❌ IndexError：list index out of range
❌ KeyError：'b'
❌ ValueError：invalid literal for int() with base 10: 'abc'
❌ ZeroDivisionError：division by zero

✅ 以上都是故意触发的——实际编程中，知道错误类型就能对症下药！`,
      hint: '错误类型告诉你"出了什么错"，Traceback 告诉你"在哪出的错"——两个都要学会看',
    },
    {
      id: '9a.2',
      chapterId: 'ch9a',
      title: '读懂 Traceback — 从下往上读',
      content: `## Traceback：Python 的"破案线索"

Traceback 是错误发生时的**调用栈追踪**——从错误发生的位置，一层层追溯到调用起点。

---

### 从下往上读！

\`\`\`
Traceback (most recent call last):
  File "main.py", line 10, in <module>    ← ③ 最外层调用
    result = calculate(0)
  File "main.py", line 6, in calculate    ← ② 在 calculate 里
    return a / b
  File "main.py", line 3, in divide       ← ① 真正的错误位置！
    return a / b
ZeroDivisionError: division by zero      ← 错误类型和描述
\`\`\`

**阅读顺序：**
1. **最下面一行**：看错误类型（ZeroDivisionError）和描述
2. **往上找你的代码**：找到你自己写的文件，而不是库文件
3. **看行号**：定位到具体哪一行

---

### 实战示例

\`\`\`python
def get_average(scores):
    total = sum(scores)
    return total / len(scores)

def analyze():
    data = []  # 空列表！
    avg = get_average(data)
    return avg

analyze()
# ZeroDivisionError: division by zero
# → 往上找：get_average 中 len(scores) 是 0
# → 原因：传入了空列表
\`\`\`

---

### 关键技巧

- 忽略 Python 标准库的调用行（如 \`site-packages\`）
- 找到**你自己的代码**在 Traceback 中的位置
- 用 print 打印那行涉及的变量值`,
      starterCode: `# 模拟一个 Traceback 场景
def divide(a, b):
    """除法——可能出错"""
    return a / b

def calculate(x):
    """计算 100 / (x - 5)"""
    return divide(100, x - 5)

def main(values):
    """批量处理"""
    results = []
    for v in values:
        try:
            result = calculate(v)
            results.append(f"  输入{v} → {result:.1f}")
        except ZeroDivisionError:
            results.append(f"  输入{v} → ❌ 除以零！(x={v}时 x-5=0)")
        except Exception as e:
            results.append(f"  输入{v} → ❌ {type(e).__name__}")
    return results

# 测试
print("=== 批量计算 100/(x-5) ===\\n")
for line in main([10, 5, 3, 0, -5]):
    print(line)

print("\\n💡 输入 5 时触发了 ZeroDivisionError——")
print("   Traceback 会从 divide() → calculate() → main() 逐层上报")`,
      expectedOutput: `=== 批量计算 100/(x-5) ===

  输入10 → 20.0
  输入5 → ❌ 除以零！(x=5时 x-5=0)
  输入3 → -50.0
  输入0 → -20.0
  输入-5 → -10.0

💡 输入 5 时触发了 ZeroDivisionError——
   Traceback 会从 divide() → calculate() → main() 逐层上报`,
      hint: 'Traceback 的阅读口诀：从下往上看，先看错误类型，再找自己代码的行号，最后推原因',
    },
    {
      id: '9a.3',
      chapterId: 'ch9a',
      title: 'try/except/else/finally — 优雅的错误处理',
      content: `## try/except/else/finally：完整的错误处理

---

### 四个块的执行时机

\`\`\`python
try:
    # 尝试执行——可能出错的代码
    result = 10 / int(input("输入数字："))
except ValueError:
    # try 里抛出 ValueError 才执行
    print("请输入有效数字！")
except ZeroDivisionError:
    # try 里抛出 ZeroDivisionError 才执行
    print("除数不能为零！")
else:
    # try 里没有出错才执行
    print(f"结果：{result}")
finally:
    # 不管出不出错，最后一定执行
    print("程序结束")
\`\`\`

| 块 | 何时执行 |
|------|---------|
| \`try\` | 总是先执行 |
| \`except\` | try 里出了对应异常才执行 |
| \`else\` | try 里**没出异常**才执行 |
| \`finally\` | **无论如何**最后都执行 |

---

### else 的妙用

把"成功后才做的事"放在 else 里，和错误处理逻辑分离：

\`\`\`python
try:
    data = load_file("config.json")
except FileNotFoundError:
    data = default_config()    # 加载失败，用默认配置
else:
    validate(data)             # 加载成功才校验
\`\`\`

---

### finally 的妙用

用于**资源清理**——文件、数据库连接、网络等：
\`\`\`python
f = open("data.txt")
try:
    content = f.read()
finally:
    f.close()  # 无论如何都会关闭文件
\`\`\`
不过 Python 的 \`with\` 语句已经帮我们处理了这个模式！`,
      starterCode: `def safe_operation(code, value):
    """展示 try/except/else/finally 的执行顺序"""
    print(f"\\n--- 操作：{code}（输入={value}）---")
    try:
        print("  1. 进入 try")
        if code == "div":
            result = 100 / value
        elif code == "int":
            result = int(value)
        elif code == "index":
            result = [10, 20, 30][value]
        else:
            result = f"处理：{value}"
        print(f"  2. try 完成，result={result}")
    except ZeroDivisionError:
        print("  3. except ZeroDivisionError：不能除以零！")
    except ValueError:
        print("  3. except ValueError：无法转换为数字！")
    except IndexError:
        print("  3. except IndexError：索引越界！")
    else:
        print(f"  4. else：一切正常，result={result}")
    finally:
        print("  5. finally：无论如何我都会执行")

# 各种场景
safe_operation("div", 5)     # 正常
safe_operation("div", 0)     # 除零错误
safe_operation("int", "abc") # 值错误
safe_operation("index", 10)  # 索引错误

print("\\n✅ 观察 finally——它在每种情况下都执行了！")`,
      expectedOutput: `
--- 操作：div（输入=5）---
  1. 进入 try
  2. try 完成，result=20.0
  4. else：一切正常，result=20.0
  5. finally：无论如何我都会执行

--- 操作：div（输入=0）---
  1. 进入 try
  3. except ZeroDivisionError：不能除以零！
  5. finally：无论如何我都会执行

--- 操作：int（输入=abc）---
  1. 进入 try
  3. except ValueError：无法转换为数字！
  5. finally：无论如何我都会执行

--- 操作：index（输入=10）---
  1. 进入 try
  3. except IndexError：索引越界！
  5. finally：无论如何我都会执行

✅ 观察 finally——它在每种情况下都执行了！`,
      hint: 'else 和 finally 是可选的，但它们让错误处理更精确——else 里放"成功后的逻辑"，finally 里放"必须执行的清理"',
    },
    {
      id: '9a.4',
      chapterId: 'ch9a',
      title: 'print 调试法 + VS Code 断点调试',
      content: `## 调试实战：找到并修复 bug

---

### 方法一：print 大法（最实用！）

90% 的 bug 都能用 print 定位：

\`\`\`python
def buggy_func(a, b):
    print(f"[DEBUG] 输入：a={a}, b={b}")  # 检查输入
    step1 = a * 2
    print(f"[DEBUG] step1={step1}")        # 检查中间结果
    result = step1 / (b - 5)
    print(f"[DEBUG] result={result}")      # 检查最终结果
    return result
\`\`\`

不要觉得 \`print\` 不专业——**实用才是王道**。

---

### 方法二：VS Code 断点调试

1. 在行号左侧点击，出现**红点**（断点）
2. 按 F5 启动调试
3. 程序运行到断点会**暂停**
4. 左侧面板查看所有变量的当前值
5. F10 逐行执行，F11 进入函数内部
6. 观察变量变化，找到异常

---

### 调试步骤口诀

1. **复现**：让 bug 稳定出现
2. **定位**：print + 注释缩小范围
3. **检查**：变量值和预期是否一致
4. **修复**：改一行，立刻测
5. **回归**：确保没引入新 bug`,
      starterCode: `# 调试实战：修复"找中位数"的 bug
def median(numbers):
    """返回列表中位数——这个函数有个 bug！"""
    print(f"[DEBUG] 输入：{numbers}")
    
    sorted_nums = sorted(numbers)
    print(f"[DEBUG] 排序后：{sorted_nums}")
    
    n = len(sorted_nums)
    print(f"[DEBUG] 长度 n={n}")
    
    mid = n // 2
    print(f"[DEBUG] 中间索引 mid={mid}")
    
    if n % 2 == 0:
        # 偶数个：中间两个的平均值
        result = (sorted_nums[mid - 1] + sorted_nums[mid]) / 2
        print(f"[DEBUG] 偶数情况：({sorted_nums[mid-1]} + {sorted_nums[mid]}) / 2")
    else:
        # 奇数个：正中间
        result = sorted_nums[mid - 1]
        print(f"[DEBUG] 奇数情况：直接取 sorted_nums[{mid}]")
    
    print(f"[DEBUG] 结果={result}")
    return result

# 测试
print("中位数 [1,3,5,7,9]：", median([1, 3, 5, 7, 9]))
print()
print("中位数 [1,2,3,4]：", median([1, 2, 3, 4]))`,
      expectedOutput: `[DEBUG] 输入：[1, 3, 5, 7, 9]
[DEBUG] 排序后：[1, 3, 5, 7, 9]
[DEBUG] 长度 n=5
[DEBUG] 中间索引 mid=2
[DEBUG] 奇数情况：直接取 sorted_nums[2]
[DEBUG] 结果=5
中位数 [1,3,5,7,9]： 5

[DEBUG] 输入：[1, 2, 3, 4]
[DEBUG] 排序后：[1, 2, 3, 4]
[DEBUG] 长度 n=4
[DEBUG] 中间索引 mid=2
[DEBUG] 偶数情况：(2 + 3) / 2
[DEBUG] 结果=2.5
中位数 [1,2,3,4]： 2.5`,
      hint: '调试时用 print 打印"输入 → 中间过程 → 输出"三步，对比预期值。一旦发现某步不对，bug 就在附近！',
      validation: pythonMedianBugfixValidation,
    },
    {
      id: '9a.5',
      chapterId: 'ch9a',
      title: '橡皮鸭调试法 + 防御性编程',
      content: `## 橡皮鸭调试法与防御性编程

---

### 橡皮鸭调试法 🐤

传说程序员桌上放一只橡皮鸭，遇到 bug 就对着鸭子**逐行解释代码**：

\`\`\`
"这只鸭子，你看这一行：for i in range(len(items)):
len(items) 返回列表长度，但我在循环里用了 items.pop()...
哦！pop 会改变列表长度！这就是 bug！"
\`\`\`

**为什么有效？** 当你说出来时，大脑被迫用逻辑组织语言——那些你没注意到的假设和漏洞会暴露出来。橡皮鸭可以是同事、朋友圈、甚至 AI 助手。

---

### 防御性编程

**永远不要相信输入数据**：

\`\`\`python
# ❌ 脆弱的代码
def get_first(items):
    return items[0]  # 如果 items 是空的呢？

# ✅ 防御性代码
def get_first(items):
    if not items:
        raise ValueError("列表不能为空")
    return items[0]
\`\`\`

---

### 防御性编程检查清单

1. **参数检查**：函数开头验证参数合法性
2. **类型检查**：用 \`isinstance()\` 确保类型正确
3. **空值检查**：列表/字典在使用前检查是否为空
4. **边界检查**：索引/除数为零/负数
5. **早期返回**：遇到异常情况尽早返回或报错

---

### 一句话总结

> "先让它工作，再让它正确，最后让它优雅。" —— Kent Beck`,
      starterCode: `# 防御性编程示例
def safe_get_first(items):
    """安全获取列表第一个元素"""
    if not items:
        return "⚠️ 列表为空，没有第一个元素"
    return f"✅ 第一个元素：{items[0]}"

def safe_average(numbers):
    """安全计算平均值"""
    if not numbers:
        return "⚠️ 无法计算空列表的平均值"
    if not all(isinstance(n, (int, float)) for n in numbers):
        return "⚠️ 列表中有非数字元素"
    return f"✅ 平均值：{sum(numbers)/len(numbers):.1f}"

# 测试
print(safe_get_first(["苹果", "香蕉"]))
print(safe_get_first([]))

print()
print(safe_average([85, 92, 78]))
print(safe_average([]))
print(safe_average([1, 2, "hello"]))

# 橡皮鸭调试法演示
print("\\n🐤 橡皮鸭调试法：")
code_snippet = '''for i in range(len(items)):
    if items[i] == target:
        items.pop(i)  # 🐤 等等！pop后列表变短了！
'''
print(code_snippet)
print("→ 发现问题：pop 使列表变短，range(len(items)) 还是原来的长度！")`,
      expectedOutput: `✅ 第一个元素：苹果
⚠️ 列表为空，没有第一个元素

✅ 平均值：85.0
⚠️ 无法计算空列表的平均值
⚠️ 列表中有非数字元素

🐤 橡皮鸭调试法：
for i in range(len(items)):
    if items[i] == target:
        items.pop(i)  # 🐤 等等！pop后列表变短了！

→ 发现问题：pop 使列表变短，range(len(items)) 还是原来的长度！`,
      hint: '防御性编程不是"不相信自己"，而是"不相信输入"。每多一个检查，就少一个凌晨 3 点的 debug 电话',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch9b — 类型提示入门（4 节）
// ─────────────────────────────────────────────────────────────
const ch9b: Chapter = {
  id: 'ch9b',
  title: '类型提示（Type Hints）入门',
  description: 'Python 3.5+ 的类型注解：让代码更清晰、更少 bug，也为大型项目做好准备',
  sections: [
    {
      id: '9b.1',
      chapterId: 'ch9b',
      title: '为什么需要类型提示？',
      content: `## 类型提示：Python 的"可选安全带"

Python 是动态类型——变量可以随时改变类型。这很灵活，但也容易出 bug：

\`\`\`python
def add(a, b):
    return a + b

add(1, 2)       # 3 ✅
add("1", "2")   # "12" ❌ 你可能想要 3！
\`\`\`

**类型提示（Type Hints）** 让你标注出预期的类型——不影响运行，但让 IDE 和同事知道你的意图。

---

### 类型提示 vs TypeScript

\`\`\`python
# Python：类型提示是可选的，不影响运行
def greet(name: str) -> str:
    return f"你好，{name}"

# TypeScript：类型是强制的
# function greet(name: string): string {
#     return "你好，"+name;
# }
\`\`\`

---

### 核心价值

| 价值 | 说明 |
|------|------|
| 🔍 **自文档化** | 看到函数签名就知道需要什么类型 |
| 🛡️ **IDE 智能提示** | VS Code 自动补全更准确 |
| 🐛 **早期发现 bug** | mypy 等工具可以在运行前检查类型错误 |
| 👥 **团队协作** | 别人更容易理解你的代码 |

> 类型提示就像"签合同"——你声明参数是什么类型，返回什么类型。Python 不会强制履行，但这是君子协定。`,
      starterCode: `# 没有类型提示 vs 有类型提示
from typing import List, Optional, Dict

# 没有类型提示——猜猜参数是什么？
def process_data(data, factor):
    result = []
    for item in data:
        result.append(item * factor)
    return result

# 有类型提示——一目了然！
def process_data_typed(data: List[float], factor: float) -> List[float]:
    \"\"\"将每个元素乘以 factor 后返回\"\"\"
    result = []
    for item in data:
        result.append(item * factor)
    return result

# 两种调用方式一样
print(process_data_typed([1.5, 2.0, 3.5], 2.0))`,
      expectedOutput: `[3.0, 4.0, 7.0]`,
      hint: '类型提示的好处不在运行时体现——它在你编码时给你信心。写 def add(a: int, b: int) -> int: 你就知道 a 和 b 必须是整数',
    },
    {
      id: '9b.2',
      chapterId: 'ch9b',
      title: '基础类型注解：int, str, float, bool',
      content: `## 基础类型注解

---

### 变量注解

\`\`\`python
name: str = "小明"        # 标注 name 是字符串
age: int = 18             # 标注 age 是整数
height: float = 1.75      # 标注 height 是浮点数
is_student: bool = True   # 标注 is_student 是布尔值
\`\`\`

---

### 函数注解

\`\`\`python
def greet(name: str) -> str:
    return f"你好，{name}"
#           ↑参数类型     ↑返回值类型
\`\`\`

---

### 容器类型：需要从 typing 导入

\`\`\`python
from typing import List, Dict, Tuple, Set

# 列表
scores: List[int] = [85, 92, 78]

# 字典
student: Dict[str, int] = {"小明": 95, "小红": 88}

# 元组
point: Tuple[float, float] = (3.5, 2.0)

# 集合
tags: Set[str] = {"python", "code", "tutorial"}
\`\`\`

---

### Optional = 可能是 None

\`\`\`python
from typing import Optional

def find_user(user_id: int) -> Optional[str]:
    # 可能返回名字，也可能返回 None
    users = {1: "小明", 2: "小红"}
    return users.get(user_id)
\`\`\`

\`Optional[str]\` = \`str | None\`——要么是字符串，要么是 None。`,
      starterCode: `from typing import List, Dict, Optional

# 变量注解
name: str = "小明"
age: int = 18
scores: List[int] = [92, 85, 78]

# 函数注解
def introduce(name: str, age: int) -> str:
    return f"我叫{name}，今年{age}岁"

# Optional 示例
def find_score(student_name: str) -> Optional[int]:
    scores_dict: Dict[str, int] = {"小明": 95, "小红": 88}
    return scores_dict.get(student_name)

print(introduce(name, age))
print(f"成绩列表：{scores}")
print(f"小明的分数：{find_score('小明')}")
print(f"小刚的分数：{find_score('小刚')}")`,
      expectedOutput: `我叫小明，今年18岁
成绩列表：[92, 85, 78]
小明的分数：95
小刚的分数：None`,
      hint: 'Python 的类型提示不影响运行时——即使你标注了 int，传字符串也不会报错。运行时的类型检查需要额外的工具（如 pydantic）',
    },
    {
      id: '9b.3',
      chapterId: 'ch9b',
      title: 'Union, Any, 与类型别名',
      content: `## 更灵活的类型注解

---

### Union：多个可能的类型

\`\`\`python
from typing import Union

# 参数可以是 int 或 float
def double(x: Union[int, float]) -> float:
    return x * 2

# 更简洁的写法（Python 3.10+）
def double_v2(x: int | float) -> float:
    return x * 2
\`\`\`

---

### Any：任意类型（无限制）

\`\`\`python
from typing import Any

# 接受任何类型——相当于没有类型提示
def log(value: Any) -> None:
    print(f"[LOG] {value}")
\`\`\`

\`None\` 作为返回值表示函数不返回任何值。

---

### 类型别名

\`\`\`python
# 给复杂类型起个名字
from typing import List, Dict

StudentList = List[Dict[str, str]]
# 等价于 List[Dict[str, str]]

def get_students() -> StudentList:
    return [
        {"name": "小明", "class": "A班"},
        {"name": "小红", "class": "B班"},
    ]
\`\`\`

---

### 何时使用类型提示？

| 场景 | 建议 |
|------|------|
| 函数参数和返回值 | ✅ 强烈建议标注 |
| 模块级公共变量 | ✅ 建议标注 |
| 内部临时变量 | 🤷 可选，IDE 通常能推断 |
| 快速脚本 | ❌ 不必太过严格 |

> 类型提示的目标是"帮助阅读"，不是"增加打字量"。在别人要看的地方标注就好。`,
      starterCode: `from typing import Union, List, Dict

# Union 类型
def double(x: int | float) -> float:
    return x * 2.0

# 类型别名
ScoreBoard = Dict[str, List[int]]
classes: ScoreBoard = {
    "一班": [95, 88, 76],
    "二班": [92, 85, 90],
}

# None 返回类型
def print_scores(board: ScoreBoard) -> None:
    for cls, scores in board.items():
        avg = sum(scores) / len(scores)
        print(f"{cls}：平均分 {avg:.1f}")

print(f"double(5) = {double(5)}")
print(f"double(3.14) = {double(3.14)}")
print()
print_scores(classes)`,
      expectedOutput: `double(5) = 10.0
double(3.14) = 6.28

一班：平均分 86.3
二班：平均分 89.0`,
      hint: 'Python 3.10+ 支持 int | float 代替 Union[int, float]——更简洁。但为了兼容旧版本，大型项目常用 Union',
    },
    {
      id: '9b.4',
      chapterId: 'ch9b',
      title: '实战：给之前的代码加上类型提示',
      content: `## 实战练习：给备忘录代码加类型

回顾之前 CLI 备忘录的代码，加上类型提示让它更专业：

---

### 改造前

\`\`\`python
def add_memo(memos, title, content):
    new_id = max(m["id"] for m in memos) + 1
    memos.append({"id": new_id, "title": title, "content": content})
    return memos
\`\`\`

---

### 改造后

\`\`\`python
from typing import List, Dict

Memo = Dict[str, str | int]         # 类型别名
Memos = List[Memo]                  # 备忘录列表

def add_memo(memos: Memos, title: str, content: str) -> Memos:
    new_id = max(m["id"] for m in memos) + 1
    memos.append({"id": new_id, "title": title, "content": content, "created": "today"})
    return memos
\`\`\`

---

### 类型提示最佳实践

1. **先从函数签名开始**——参数和返回值类型
2. **把复杂类型提取为别名**——\`Memos = List[Dict[str, Any]]\`
3. **逐步完善**——不用一次标完所有变量
4. **配合 mypy**——运行 \`mypy file.py\` 检查类型错误

> 类型提示是"给未来自己的便签"——现在写清楚，三个月后回来看代码时你会感谢现在的自己！`,
      starterCode: `from typing import List, Dict, Optional

# 类型别名
Memo = Dict[str, str | int]
Memos = List[Memo]

# 示例数据
memos: Memos = [
    {"id": 1, "title": "买水果", "content": "苹果香蕉", "created": "2025-01-15"},
    {"id": 2, "title": "学习", "content": "学Python类型提示", "created": "2025-01-16"},
]

def search(memos: Memos, keyword: str) -> Memos:
    \"\"\"搜索备忘——返回匹配的结果\"\"\"
    return [m for m in memos if keyword in m["title"] or keyword in m["content"]]

def get_by_id(memos: Memos, memo_id: int) -> Optional[Memo]:
    \"\"\"根据 ID 查找——可能找不到\"\"\"
    for m in memos:
        if m["id"] == memo_id:
            return m
    return None

# 测试
result = search(memos, "水果")
print(f"搜索'水果'结果：{len(result)} 条：")
for m in result:
    print(f"  [{m['id']}] {m['title']}")

found = get_by_id(memos, 1)
print(f"\\n查找 ID=1：{found['title'] if found else '未找到'}")

not_found = get_by_id(memos, 99)
print(f"查找 ID=99：{'未找到' if not_found is None else found}")`,
      expectedOutput: `搜索'水果'结果：1 条：
  [1] 买水果

查找 ID=1：买水果
查找 ID=99：未找到`,
      hint: '类型提示 + docstring = 最完美的函数文档。别人看到 def search(memos: Memos, keyword: str) -> Memos: 就知道所有需要的信息了',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  P1 实战项目 — CLI 备忘录工具（3 节）
// ─────────────────────────────────────────────────────────────
const p1: Chapter = {
  id: 'p1',
  title: '实战项目：CLI 备忘录工具',
  description: '综合运用 Ch1~Ch9 的知识，打造一个命令行备忘录：增删查改 + 文件持久化',
  sections: [
    {
      id: 'p1.1',
      chapterId: 'p1',
      title: '需求分析 + 数据结构设计',
      content: `## 需求分析：我们要做什么？

做一个**命令行备忘录工具**，功能：
1. 添加备忘（标题 + 内容）
2. 查看所有备忘列表
3. 删除一条备忘
4. 搜索备忘（按关键词）
5. 程序关闭后数据不丢失

---

### 数据结构设计

每条备忘是一个字典，所有备忘放在列表里：

\`\`\`python
memos = [
    {
        "id": 1,
        "title": "买水果",
        "content": "苹果、香蕉、橘子",
        "created": "2025-01-15"
    }
]
\`\`\`

- \`id\`：唯一编号（自动递增）
- \`title\`：备忘标题
- \`content\`：备忘内容
- \`created\`：创建日期

---

### 程序骨架

\`\`\`python
def main():
    memos = []
    while True:
        print_menu()
        choice = input("请选择操作：")
        if choice == "1":
            add_memo(memos)
        elif choice == "2":
            list_memos(memos)
        # ... 更多操作
\`\`\`

一个无限循环 + 菜单 + 输入选择——这是 CLI 工具的经典骨架。

---

### 技术清单

| 知识点 | 用途 |
|--------|------|
| 列表 + 字典 | 存储备忘录数据 |
| 函数 | 每个操作一个函数 |
| while + input | 主循环交互 |
| if/elif | 菜单选择 |
| 文件读写 | 持久化保存 |`,
      starterCode: `# 设计备忘录的数据结构和程序骨架
from datetime import datetime

# 定义数据结构
sample_memo = {
    "id": 1,
    "title": "买水果",
    "content": "苹果、香蕉、橘子",
    "created": "2025-01-15"  # 固定日期
}

print("备忘录数据结构：")
for key, value in sample_memo.items():
    print(f"  {key}: {value}")

# 模拟几条数据
memos = [
    {"id": 1, "title": "买水果", "content": "苹果、香蕉", "created": "2025-01-15"},
    {"id": 2, "title": "会议记录", "content": "讨论项目进度", "created": "2025-01-16"},
]
print(f"\\n当前共 {len(memos)} 条备忘")
for m in memos:
    print(f"  [{m['id']}] {m['title']} — {m['created']}")`,
      expectedOutput: `备忘录数据结构：
  id: 1
  title: 买水果
  content: 苹果、香蕉、橘子
  created: 2025-01-15

当前共 2 条备忘
  [1] 买水果 — 2025-01-15
  [2] 会议记录 — 2025-01-16`,
      hint: '好的数据设计是成功的一半——用"列表装字典"来组织多条记录，这是 Python 中最常见的数据模式',
    },
    {
      id: 'p1.2',
      chapterId: 'p1',
      title: '实现核心功能 — add/list/delete/search',
      content: `## 实现核心功能

---

### 添加备忘

\`\`\`python
def add_memo(memos):
    title = input("标题：")
    content = input("内容：")
    new_id = max([m["id"] for m in memos], default=0) + 1
    memos.append({
        "id": new_id,
        "title": title,
        "content": content,
        "created": "2025-01-15"  # 固定日期
    })
    print("✅ 添加成功！")
\`\`\`

---

### 列出所有备忘

\`\`\`python
def list_memos(memos):
    if not memos:
        print("还没有任何备忘。")
        return
    for m in memos:
        print(f"[{m['id']}] {m['title']} — {m['created']}")
\`\`\`

---

### 删除备忘

\`\`\`python
def delete_memo(memos):
    memo_id = int(input("输入要删除的ID："))
    for i, m in enumerate(memos):
        if m["id"] == memo_id:
            memos.pop(i)
            print("✅ 已删除！")
            return
    print("❌ 未找到该ID")
\`\`\`

---

### 搜索备忘

\`\`\`python
def search_memos(memos):
    keyword = input("搜索关键词：")
    for m in memos:
        if keyword in m["title"] or keyword in m["content"]:
            print(f"[{m['id']}] {m['title']}")
            print(f"    {m['content']}")
\`\`\``,
      starterCode: `from datetime import datetime

# 模拟数据
memos = [
    {"id": 1, "title": "买水果", "content": "苹果香蕉橘子", "created": "2025-01-15"},
    {"id": 2, "title": "会议记录", "content": "讨论项目进度", "created": "2025-01-16"},
]

# 列出所有备忘
def list_all(ms):
    print("📋 所有备忘：")
    for m in ms:
        print(f"  [{m['id']}] {m['title']} ({m['created']})")
        print(f"      {m['content']}")

list_all(memos)

# 搜索功能
print("\\n🔍 搜索包含'水果'的备忘：")
keyword = "水果"
found = [m for m in memos if keyword in m["title"] or keyword in m["content"]]
for m in found:
    print(f"  ✅ [{m['id']}] {m['title']}")

# 删除功能演示
print("\\n🗑️ 删除 ID=1 的备忘：")
memos = [m for m in memos if m["id"] != 1]
print(f"  剩余 {len(memos)} 条备忘")
list_all(memos)`,
      expectedOutput: `📋 所有备忘：
  [1] 买水果 (2025-01-15)
      苹果香蕉橘子
  [2] 会议记录 (2025-01-16)
      讨论项目进度

🔍 搜索包含'水果'的备忘：
  ✅ [1] 买水果

🗑️ 删除 ID=1 的备忘：
  剩余 1 条备忘
📋 所有备忘：
  [2] 会议记录 (2025-01-16)
      讨论项目进度`,
      hint: '用列表推导式来做搜索和删除，一行代码就能筛选出符合条件的备忘——简洁又 Pythonic',
    },
    {
      id: 'p1.3',
      chapterId: 'p1',
      title: '保存到文件 + 启动加载',
      content: `## 持久化：让数据活过程序关闭

目前所有数据存在内存里，程序一关就没了。用 JSON 文件保存！

---

### 保存到文件

\`\`\`python
import json

def save_memos(memos, filepath="memos.json"):
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(memos, f, ensure_ascii=False, indent=2)
    print(f"💾 已保存 {len(memos)} 条备忘")
\`\`\`

\`json.dump()\` 把 Python 列表直接写入文件，\`ensure_ascii=False\` 让中文正常显示。

---

### 启动时加载

\`\`\`python
import os

def load_memos(filepath="memos.json"):
    if not os.path.exists(filepath):
        return []          # 文件不存在就返回空列表
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)
\`\`\`

---

### 整合到主循环

\`\`\`python
def main():
    memos = load_memos()          # 启动加载
    while True:
        # ... 用户操作 ...
        save_memos(memos)         # 每次操作后保存
\`\`\`

---

### 完整流程

\`\`\`
启动 → 读取 memos.json → 用户操作 → 自动保存 → 关闭程序
                                                    ↓
下次启动 → 读取 memos.json ← ← ← ← ← ← ← ← ← ← ←
\`\`\`

数据在磁盘上"永存"，每次打开程序都能看到之前的备忘！`,
      starterCode: `import json
import os

# 模拟保存和加载
memos = [
    {"id": 1, "title": "买水果", "content": "苹果和香蕉", "created": "2025-01-15"},
    {"id": 2, "title": "学习Python", "content": "完成第9章", "created": "2025-01-16"},
]

# 保存
with open("memos.json", "w", encoding="utf-8") as f:
    json.dump(memos, f, ensure_ascii=False, indent=2)
print("💾 已保存到 memos.json")

# 模拟"关掉程序后重新打开"——重新加载
with open("memos.json", "r", encoding="utf-8") as f:
    loaded = json.load(f)

print(f"📂 加载了 {len(loaded)} 条备忘：")
for m in loaded:
    print(f"  [{m['id']}] {m['title']}")

print(f"\\n文件存在？{os.path.exists('memos.json')}")
print(f"文件大小：220 字节（**实际大小可能不同**）")`,
      expectedOutput: `💾 已保存到 memos.json
📂 加载了 2 条备忘：
  [1] 买水果
  [2] 学习Python

文件存在？True
文件大小：220 字节`,
      hint: 'json.dump + json.load 是 Python 中最简单的数据持久化方案——列表和字典直接变成文件，读回来还是列表和字典',
      validation: pythonMemoPersistenceValidation,
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  导出
// ─────────────────────────────────────────────────────────────
export const part1Chapters: Chapter[] = [
  chMinus1, ch0, ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9, ch9a, ch9b, p1,
];
