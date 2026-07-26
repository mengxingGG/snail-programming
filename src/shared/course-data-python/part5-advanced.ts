// 🚀 Part 5: 高级进阶 — Ch21 ~ Ch27 + P5 + P6（39节）
// 参考：Tkinter docs, Pygame docs, pandas docs, Django tutorial, FastAPI docs, Scrapy docs
import type { Chapter, SectionValidation } from '../types/course';

const windowSummaryValidation = (line1: string, line2: string): SectionValidation => ({
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'exact', value: line1 },
    { type: 'exact', value: line2 },
  ],
});

const pygameVersionValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'prefix', value: 'Pygame 版本：' },
    { type: 'exact', value: 'Pygame 已就绪！' },
  ],
};

const djangoVersionValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'prefix', value: 'Django 版本：' },
    { type: 'exact', value: 'Django = 全栈框架（精装房）' },
    { type: 'exact', value: 'Flask = 微框架（自己拼积木）' },
  ],
};

const raceConditionValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'regex', value: '^无锁结果：\\d+（期望 50000，但很可能不同！）$' },
    { type: 'exact', value: '加锁结果：50000（期望 50000，每次都是这个值）' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '线程池批量处理：' },
    { type: 'exact', value: '数据 0 已获取' },
    { type: 'exact', value: '数据 1 已获取' },
    { type: 'exact', value: '数据 2 已获取' },
    { type: 'exact', value: '数据 3 已获取' },
    { type: 'exact', value: '数据 4 已获取' },
    { type: 'exact', value: '数据 5 已获取' },
  ],
};

const asyncAwaitTimingValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'exact', value: '⏳ 同步执行：' },
    { type: 'regex', value: '^同步耗时：\\d+\\.\\d+s$' },
    { type: 'exact', value: '任务A 完成（同步）' },
    { type: 'exact', value: '任务B 完成（同步）' },
    { type: 'exact', value: '任务C 完成（同步）' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '⚡ 异步执行：' },
    { type: 'regex', value: '^异步耗时：\\d+\\.\\d+s$' },
    { type: 'exact', value: '任务A 完成（异步）' },
    { type: 'exact', value: '任务B 完成（异步）' },
    { type: 'exact', value: '任务C 完成（异步）' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '💡 同步 3s（串行），异步 1s（并行）—— 3倍差距！' },
  ],
};

const threadingTimingValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'exact', value: '=== 同步执行（串行）===' },
    { type: 'exact', value: '[任务 A] 开始（将耗时 1.5 秒）' },
    { type: 'exact', value: '[任务 A] 完成' },
    { type: 'exact', value: '[任务 B] 开始（将耗时 1.0 秒）' },
    { type: 'exact', value: '[任务 B] 完成' },
    { type: 'regex', value: '^同步总耗时：\\d+\\.\\d 秒$' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '=== 多线程执行（并发）===' },
    { type: 'exact', value: '[任务 A] 开始（将耗时 1.5 秒）' },
    { type: 'exact', value: '[任务 B] 开始（将耗时 1.0 秒）' },
    { type: 'exact', value: '[任务 B] 完成' },
    { type: 'exact', value: '[任务 A] 完成' },
    { type: 'exact', value: '' },
    { type: 'regex', value: '^多线程总耗时：\\d+\\.\\d 秒$' },
    { type: 'regex', value: '^加速比：\\d+\\.\\dx（多线程让等待时间重叠）$' },
  ],
};

const asyncioConcurrencyValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'exact', value: '=== 异步并发执行 ===' },
    { type: 'exact', value: '[开始] API-1（等待 2.0 秒）' },
    { type: 'exact', value: '[开始] API-2（等待 1.0 秒）' },
    { type: 'exact', value: '[开始] API-3（等待 1.5 秒）' },
    { type: 'exact', value: '[开始] API-4（等待 0.5 秒）' },
    { type: 'exact', value: '[完成] API-4' },
    { type: 'exact', value: '[完成] API-2' },
    { type: 'exact', value: '[完成] API-3' },
    { type: 'exact', value: '[完成] API-1' },
    { type: 'exact', value: '' },
    { type: 'regex', value: '^所有任务完成！总耗时：\\d+\\.\\d 秒$' },
    { type: 'exact', value: '（如果是同步执行，需要 2.0+1.0+1.5+0.5 = 5.0 秒）' },
    { type: 'regex', value: '^异步加速比：\\d+\\.\\dx$' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '结果：' },
    { type: 'exact', value: 'API-1 的结果' },
    { type: 'exact', value: 'API-2 的结果' },
    { type: 'exact', value: 'API-3 的结果' },
    { type: 'exact', value: 'API-4 的结果' },
  ],
};

const concurrentCrawlerValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'exact', value: '=== 方案 1：同步（串行）===' },
    { type: 'exact', value: '已获取：http://example.com/page0' },
    { type: 'exact', value: '已获取：http://example.com/page1' },
    { type: 'exact', value: '已获取：http://example.com/page2' },
    { type: 'exact', value: '已获取：http://example.com/page3' },
    { type: 'exact', value: '已获取：http://example.com/page4' },
    { type: 'exact', value: '已获取：http://example.com/page5' },
    { type: 'exact', value: '已获取：http://example.com/page6' },
    { type: 'exact', value: '已获取：http://example.com/page7' },
    { type: 'regex', value: '^耗时：\\d+\\.\\d 秒$' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '=== 方案 2：多线程（8 个并发）===' },
    { type: 'exact', value: '已获取：http://example.com/page0' },
    { type: 'exact', value: '已获取：http://example.com/page1' },
    { type: 'exact', value: '已获取：http://example.com/page2' },
    { type: 'exact', value: '已获取：http://example.com/page3' },
    { type: 'exact', value: '已获取：http://example.com/page4' },
    { type: 'exact', value: '已获取：http://example.com/page5' },
    { type: 'exact', value: '已获取：http://example.com/page6' },
    { type: 'exact', value: '已获取：http://example.com/page7' },
    { type: 'regex', value: '^耗时：\\d+\\.\\d 秒$' },
    { type: 'exact', value: '' },
    { type: 'regex', value: '^加速比：\\d+x 🚀$' },
    { type: 'exact', value: '结论：对于 I/O 密集型任务，多线程让等待时间完全重叠！' },
  ],
};

const bigOComplexityValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'regex', value: '^n=\\s*10:\\s+O\\(1\\)=\\d+\\.\\d{6}s \\| O\\(n\\)=\\d+\\.\\d{6}s \\| O\\(n²\\)=\\d+\\.\\d{6}s$' },
    { type: 'regex', value: '^n=\\s*100:\\s+O\\(1\\)=\\d+\\.\\d{6}s \\| O\\(n\\)=\\d+\\.\\d{6}s \\| O\\(n²\\)=\\d+\\.\\d{6}s$' },
    { type: 'regex', value: '^n=\\s*1000:\\s+O\\(1\\)=\\d+\\.\\d{6}s \\| O\\(n\\)=\\d+\\.\\d{6}s \\| O\\(n²\\)=\\d+\\.\\d{6}s$' },
  ],
};

const dataStructurePerformanceValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'exact', value: '在 100,000 个元素中查找：' },
    { type: 'regex', value: '^列表（list）：\\d+\\.\\d{4} 秒  — O\\(n\\)$' },
    { type: 'regex', value: '^集合（set）：\\s+\\d+\\.\\d{6} 秒  — O\\(1\\)$' },
    { type: 'regex', value: '^集合比列表快 \\d+ 倍！$' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '列表操作对比（100 次）：' },
    { type: 'regex', value: '^头部插入（insert\\(0\\)）：\\d+\\.\\d{4} 秒 — O\\(n\\)$' },
    { type: 'regex', value: '^尾部追加（append）：\\d+\\.\\d{6} 秒 — O\\(1\\)$' },
  ],
};

const binarySearchPerformanceValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'exact', value: '有序数组：[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]' },
    { type: 'exact', value: '查找 7 的位置：线性=7，二分=7' },
    { type: 'exact', value: '查找 99 的位置：线性=-1，二分=-1' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '在 1,000,000 个数据中查找最后一个元素：' },
    { type: 'regex', value: '^线性查找：\\d+\\.\\d{4} 秒 — O\\(n\\)$' },
    { type: 'regex', value: '^二分查找：\\d+\\.\\d{6} 秒 — O\\(log n\\)$' },
    { type: 'regex', value: '^二分查找快 \\d+ 倍！$' },
  ],
};

const quicksortPerformanceValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'exact', value: '原始数据：[3, 6, 8, 10, 1, 2, 1, 5]' },
    { type: 'exact', value: '快排结果：[1, 1, 2, 3, 5, 6, 8, 10]' },
    { type: 'exact', value: '内置 sort：[1, 1, 2, 3, 5, 6, 8, 10]' },
    { type: 'exact', value: '结果一致：True' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '在 1000 个数据上测试：' },
    { type: 'regex', value: '^快速排序：\\d+\\.\\d{4} 秒 — O\\(n log n\\)$' },
    { type: 'regex', value: '^冒泡排序：\\d+\\.\\d{4} 秒 — O\\(n²\\)$' },
    { type: 'exact', value: '内置 sort：True（结果一致）' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '✅ 排序验证通过！' },
  ],
};

const ch21: Chapter = {
  id: 'ch21',
  title: '图形界面：Tkinter',
  description: '窗口、按钮、输入框、事件绑定、布局、实战计算器',
  sections: [
    {
      id: '21.1',
      kind: 'demo',
      chapterId: 'ch21',
      title: 'Tkinter 是什么 — Python 自带的 GUI 库',
      content: `## 🖼️ Tkinter：Python 自带的图形界面库

你写的程序不再只能活在黑框框里了！Tkinter 是 Python **标准库**的一部分——不需要 \`pip install\`，装好 Python 就能用。

### 什么是 GUI？
**GUI**（Graphical User Interface，图形用户界面）就是有窗口、按钮、输入框的程序。对比一下：

| 类型 | 例子 | 交互方式 |
|------|------|----------|
| CLI（命令行） | 之前的 \`input()\` / \`print()\` | 纯文字 |
| GUI（图形界面） | 计算器、记事本 | 鼠标 + 键盘 + 窗口 |

### Tkinter 的核心概念

GUI 程序是一个**树状结构**——最外层是窗口，里面塞各种**控件**（Widget）：

\`\`\`
窗口 (Tk)
├── 标签 (Label)      — 显示文字
├── 按钮 (Button)     — 点击触发动作
├── 输入框 (Entry)    — 用户打字
└── 框架 (Frame)      — 把控件分组
\`\`\`

### 为什么学 Tkinter？
- **零依赖**：Python 装好就能用
- **够简单**：几行代码就有窗口
- **够用**：做个小工具、计算器、待办清单绰绰有余

> 💡 下一节我们就来创建人生中第一个 GUI 窗口！`,
      starterCode: `# Tkinter 是 Python 标准库，直接导入即可
import tkinter as tk

# 检查是否可用（不会报错就说明装好了）
print("Tkinter 已就绪！")`,
      expectedOutput: `Tkinter 已就绪！`,
      hint: 'Tkinter 在 Windows/macOS 上默认自带；Linux 如果没有，运行 \`sudo apt install python3-tk\`。',
    },
    {
      id: '21.2',
      kind: 'demo',
      chapterId: 'ch21',
      title: '窗口 + 按钮 + 标签 — 第一个 GUI 程序',
      content: `## 🪟 第一个 GUI 程序：窗口 + 按钮 + 标签

一个最简单的 Tkinter 程序只需要三步：

1. **创建窗口** — \`tk.Tk()\`
2. **放控件** — Button、Label 等
3. **启动循环** — \`mainloop()\`

### 代码拆解

\`\`\`python
import tkinter as tk

root = tk.Tk()                    # ① 创建主窗口
root.title("我的第一个GUI")        # ② 设置标题
root.geometry("300x200")          # ③ 设置大小（宽x高）

label = tk.Label(root, text="你好，GUI世界！")  # ④ 创建标签
label.pack()                      # ⑤ 把标签放进窗口

btn = tk.Button(root, text="点我！")            # ⑥ 创建按钮
btn.pack()                        # ⑦ 把按钮放进窗口

root.mainloop()                   # ⑧ 启动事件循环
\`\`\`

### 关键点

| 方法 | 作用 |
|------|------|
| \`tk.Tk()\` | 主窗口，一切控件的"根" |
| \`.title("xxx")\` | 窗口标题栏文字 |
| \`.geometry("WxH")\` | 窗口宽高，如 \`"400x300"\` |
| \`.pack()\` | 自动排版（最简单的布局方式） |
| \`.mainloop()\` | **必须调用**——让窗口一直显示，等待用户操作 |

> ⚠️ **mainloop() 不会自动结束**：它会一直运行直到你关闭窗口。写在它后面的代码不会执行，直到窗口关闭。`,
      starterCode: `import tkinter as tk

# 创建窗口
root = tk.Tk()
root.title("我的第一个GUI")
root.geometry("300x200")

# 标签
label = tk.Label(root, text="你好，GUI世界！")
label.pack()

# 按钮
btn = tk.Button(root, text="点我！")
btn.pack()

# 启动
root.mainloop()`,
      expectedOutput: `窗口已创建（300x200，标题"我的第一个GUI"）
包含一个标签"你好，GUI世界！"和一个按钮"点我！"`,
      hint: '如果你在 Jupyter 或某些 IDE 里运行，可能需要手动关闭窗口程序才会结束。',
      validation: windowSummaryValidation('窗口已创建（300x200，标题"我的第一个GUI"）', '包含一个标签"你好，GUI世界！"和一个按钮"点我！"'),
    },
    {
      id: '21.3',
      kind: 'demo',
      chapterId: 'ch21',
      title: '输入框 + 事件绑定 — 和用户交互',
      content: `## ⌨️ 输入框 + 事件绑定：真正和用户互动

光有按钮不够——我们需要**输入框**让用户打字，以及**事件绑定**让按钮做事情。

### 核心控件

| 控件 | 类名 | 作用 |
|------|------|------|
| 输入框 | \`tk.Entry\` | 单行文字输入 |
| 多行文本 | \`tk.Text\` | 多行文字输入 |
| 按钮 | \`tk.Button\` | 点击触发函数 |

### 事件绑定

按钮用 \`command=\` 参数绑定一个**函数名**（不要加括号）：

\`\`\`python
def say_hello():
    name = entry.get()           # 获取输入框内容
    label.config(text=f"你好，{name}！")  # 修改标签文字

btn = tk.Button(root, text="打招呼", command=say_hello)
\`\`\`

### 关键方法

| 方法 | 作用 |
|------|------|
| \`entry.get()\` | 获取输入框里的文字 |
| \`entry.delete(0, tk.END)\` | 清空输入框 |
| \`label.config(text="...")\` | 动态修改标签文字 |

> 💡 **command 传参技巧**：如果需要传参数，用 \`lambda\`：\`command=lambda: my_func(arg)\`。`,
      starterCode: `import tkinter as tk

def say_hello():
    name = entry.get()
    if name.strip():
        label.config(text=f"你好，{name}！")
    else:
        label.config(text="请先输入名字！")

root = tk.Tk()
root.title("打招呼程序")
root.geometry("350x180")

label = tk.Label(root, text="请输入你的名字：")
label.pack(pady=5)

entry = tk.Entry(root, width=30)
entry.pack(pady=5)

btn = tk.Button(root, text="打招呼", command=say_hello)
btn.pack(pady=5)

root.mainloop()`,
      expectedOutput: `窗口已创建（350x180，标题"打招呼程序"）
输入名字后点击按钮，标签显示"你好，xxx！"`,
      hint: '`entry.get()` 永远返回字符串，即使输入的是数字——需要的话用 `int()` 或 `float()` 转换。',
      validation: windowSummaryValidation('窗口已创建（350x180，标题"打招呼程序"）', '输入名字后点击按钮，标签显示"你好，xxx！"'),
    },
    {
      id: '21.4',
      kind: 'demo',
      chapterId: 'ch21',
      title: '布局 — pack / grid / place',
      content: `## 📐 Tkinter 三大布局方式

GUI 不是把所有控件堆在一起就行——你需要**布局**。Tkinter 有三种布局管理器：

### 1. pack() — 顺序堆放

最简单，按顺序从上到下（或从左到右）：

\`\`\`python
btn1.pack(side=tk.TOP)     # 从上到下（默认）
btn2.pack(side=tk.LEFT)    # 从左到右
btn3.pack(side=tk.BOTTOM)  # 从下到上
btn4.pack(side=tk.RIGHT)   # 从右到左
\`\`\`

### 2. grid() — 表格布局 ⭐推荐

像 Excel 一样，用行（row）和列（column）定位：

\`\`\`python
label.grid(row=0, column=0)
entry.grid(row=0, column=1)
btn.grid(row=1, column=0, columnspan=2)  # 跨两列
\`\`\`

### 3. place() — 精确坐标

用像素坐标放置（不推荐，不同屏幕大小会乱）：

\`\`\`python
btn.place(x=100, y=50)
\`\`\`

### 对比总结

| 方式 | 适用场景 | 优点 | 缺点 |
|------|----------|------|------|
| \`pack\` | 简单纵向/横向排列 | 最简单 | 复杂布局难控制 |
| \`grid\` | 表单、矩阵布局 | 灵活、直观 | 需要规划行列 |
| \`place\` | 精确像素定位 | 绝对控制 | 不响应窗口缩放 |

> 🏆 **推荐用 grid**——90% 的场景都能胜任，而且代码清晰。`,
      starterCode: `import tkinter as tk

root = tk.Tk()
root.title("登录窗口")
root.geometry("300x150")

# 使用 grid 布局
tk.Label(root, text="用户名：").grid(row=0, column=0, padx=10, pady=10, sticky="e")
tk.Entry(root, width=20).grid(row=0, column=1, padx=10, pady=10)

tk.Label(root, text="密码：").grid(row=1, column=0, padx=10, pady=5, sticky="e")
tk.Entry(root, width=20, show="*").grid(row=1, column=1, padx=10, pady=5)

tk.Button(root, text="登录", width=15).grid(row=2, column=0, columnspan=2, pady=10)

root.mainloop()`,
      expectedOutput: `窗口已创建（300x150，标题"登录窗口"）
包含用户名输入、密码输入（显示为*）、登录按钮，使用grid整齐排列`,
      hint: '`padx`/`pady` 给控件加外边距；`sticky="e"` 让标签右对齐；`columnspan=2` 让按钮跨两列居中。',
      validation: windowSummaryValidation('窗口已创建（300x150，标题"登录窗口"）', '包含用户名输入、密码输入（显示为*）、登录按钮，使用grid整齐排列'),
    },
    {
      id: '21.5',
      kind: 'demo',
      chapterId: 'ch21',
      title: '实战：做一个计算器 — 综合应用',
      content: `## 🔢 实战：用 Tkinter 做一个计算器

现在把按钮、输入框、grid 布局和事件绑定全部用上，做一个真正的计算器！

### 设计思路

计算器 = 显示区（Entry） + 按钮网格（4x4 grid）

\`\`\`
┌──────────────────────┐
│    显示区 (Entry)     │
├───┬───┬───┬───────┤
│ 7 │ 8 │ 9 │   C   │
├───┼───┼───┼───────┤
│ 4 │ 5 │ 6 │   +   │
├───┼───┼───┼───────┤
│ 1 │ 2 │ 3 │   -   │
├───┼───┼───┼───────┤
│ 0 │ . │ = │   *   │
└───┴───┴───┴───────┘
\`\`\`

### 核心逻辑

- **数字按钮**：把数字追加到显示区
- **运算符按钮**：记录第一个数和运算符，清空等待第二个数
- **等号按钮**：执行计算，显示结果
- **C 按钮**：清空一切

\`\`\`python
def click(num):
    current = entry.get()
    entry.delete(0, tk.END)
    entry.insert(0, current + str(num))

def calculate():
    result = float(entry.get()) if entry.get().isdigit() else 0  # 安全处理
    entry.delete(0, tk.END)
    entry.insert(0, str(result))
\`\`\`

### 按钮统一风格

每个按钮用 \`lambda\` 传参，统一处理数字/运算符：
- 数字 0-9 → \`click(num)\`
- 运算符 + - * → \`click(op)\`
- = → \`calculate()\`
- C → \`clear()\`

> 🔢 这个计算器虽小，但涵盖了 GUI 编程的核心：**控件布局 + 事件绑定 + 状态管理**。`,
      starterCode: `import tkinter as tk

root = tk.Tk()
root.title("简易计算器")
root.geometry("280x350")
root.resizable(False, False)

# 显示区
entry = tk.Entry(root, font=("Arial", 20), justify="right", bd=5)
entry.grid(row=0, column=0, columnspan=4, padx=5, pady=5, sticky="nsew")

# 按钮数据
buttons = [
    ('7', 1, 0), ('8', 1, 1), ('9', 1, 2), ('C', 1, 3),
    ('4', 2, 0), ('5', 2, 1), ('6', 2, 2), ('+', 2, 3),
    ('1', 3, 0), ('2', 3, 1), ('3', 3, 2), ('-', 3, 3),
    ('0', 4, 0), ('.', 4, 1), ('=', 4, 2), ('*', 4, 3),
]

first_num = None
operator = None
reset_next = False

def click(text):
    global reset_next, first_num, operator
    if text in '0123456789.':
        if reset_next:
            entry.delete(0, tk.END)
            reset_next = False
        entry.insert(tk.END, text)
    elif text in '+-*':
        first_num = float(entry.get())
        operator = text
        reset_next = True
    elif text == '=':
        if operator and first_num is not None:
            second = float(entry.get())
            if operator == '+': result = first_num + second
            elif operator == '-': result = first_num - second
            elif operator == '*': result = first_num * second
            entry.delete(0, tk.END)
            entry.insert(0, str(result))
            first_num = None
            operator = None
    elif text == 'C':
        entry.delete(0, tk.END)
        first_num = None
        operator = None

for (text, r, c) in buttons:
    btn = tk.Button(root, text=text, font=("Arial", 14),
                    width=5, height=2,
                    command=lambda t=text: click(t))
    btn.grid(row=r, column=c, padx=2, pady=2, sticky="nsew")

# 让行列自适应拉伸
for i in range(5):
    root.grid_rowconfigure(i, weight=1)
for i in range(4):
    root.grid_columnconfigure(i, weight=1)

root.mainloop()`,
      expectedOutput: `窗口已创建（280x350，标题"简易计算器"）
4x5 grid 布局的计算器，支持 + - * 运算，C 键清空，等号显示结果`,
      hint: '计算器采用安全的数字解析方式。如果用户输入的不是数字，程序会返回 0，不会执行任意代码。`resizable(False, False)` 禁止窗口缩放。',
      validation: windowSummaryValidation('窗口已创建（280x350，标题"简易计算器"）', '4x5 grid 布局的计算器，支持 + - * 运算，C 键清空，等号显示结果'),
    },
  ],
};

const ch22: Chapter = {
  id: 'ch22',
  title: '游戏开发：Pygame',
  description: '游戏循环、精灵、键盘事件、碰撞检测、音效、状态管理',
  sections: [
    {
      id: '22.1',
      kind: 'demo',
      chapterId: 'ch22',
      title: 'Pygame 是什么 — 游戏循环与精灵',
      content: `## 🎮 Pygame：用 Python 写真正的游戏

Pygame 是 Python 最流行的 2D 游戏开发库。你需要先安装它：

\`\`\`bash
pip install pygame
\`\`\`

### 游戏程序 vs 普通程序

普通程序是"线性的"——做完一件事再做下一件。游戏是**循环**的：

\`\`\`
┌──────────────────────────────┐
│  游戏循环（Game Loop）        │
│                              │
│  ① 处理事件（按键、鼠标）     │
│       ↓                     │
│  ② 更新状态（移动角色、碰撞） │
│       ↓                     │
│  ③ 渲染画面（画背景、画角色） │
│       ↓                     │
│  回到 ①                      │
└──────────────────────────────┘
\`\`\`

### 核心概念

| 概念 | 说明 |
|------|------|
| **Surface（表面）** | 可以画东西的"画布"，窗口本身就是一个 Surface |
| **Sprite（精灵）** | 游戏中可独立控制的"角色"（玩家、敌人、子弹） |
| **Event（事件）** | 键盘按下、鼠标点击、窗口关闭等 |
| **Clock（时钟）** | 控制帧率（FPS），让游戏在不同电脑上跑一样快 |

### 帧率（FPS）

FPS = Frames Per Second = 每秒画面更新次数。

- **30 FPS** — 基础流畅
- **60 FPS** — 丝滑体验（推荐）
- **游戏循环每帧做一次**：处理输入 → 更新 → 绘制

> 🎯 下一节我们创建第一个 Pygame 窗口！`,
      starterCode: `# 先确保安装 Pygame
# pip install pygame

import pygame
print(f"Pygame 版本：{pygame.version.ver}")
print("Pygame 已就绪！")`,
      expectedOutput: `Pygame 版本：2.x.x
Pygame 已就绪！`,
      hint: '如果 `pip install pygame` 报错，试试 `pip3 install pygame` 或 `python -m pip install pygame`。',
      validation: pygameVersionValidation,
    },
    {
      id: '22.2',
      kind: 'demo',
      chapterId: 'ch22',
      title: '创建窗口 + 画形状 — 第一帧画面',
      content: `## 🖼️ 创建 Pygame 窗口并画形状

### Pygame 最小程序结构

\`\`\`python
import pygame

pygame.init()                          # ① 初始化所有模块
screen = pygame.display.set_mode((800, 600))  # ② 创建窗口
pygame.display.set_caption("我的游戏")   # ③ 设置标题

running = True
while running:                         # ④ 游戏主循环
    for event in pygame.event.get():   # ⑤ 处理事件
        if event.type == pygame.QUIT:
            running = False

    screen.fill((255, 255, 255))       # ⑥ 填充背景色（白色）

    # 👇 在这里画东西
    pygame.draw.rect(screen, (255, 0, 0), (100, 100, 200, 150))  # 红色矩形
    pygame.draw.circle(screen, (0, 0, 255), (400, 300), 50)       # 蓝色圆形

    pygame.display.flip()              # ⑦ 更新画面

pygame.quit()                          # ⑧ 退出
\`\`\`

### 颜色在 Pygame 中

颜色用 \`(R, G, B)\` 元组表示，每个值 0-255：

| 颜色 | RGB 值 |
|------|--------|
| 红色 | \`(255, 0, 0)\` |
| 绿色 | \`(0, 255, 0)\` |
| 蓝色 | \`(0, 0, 255)\` |
| 白色 | \`(255, 255, 255)\` |
| 黑色 | \`(0, 0, 0)\` |

### 画形状常用函数

\`\`\`python
pygame.draw.rect(表面, 颜色, (x, y, 宽, 高))
pygame.draw.circle(表面, 颜色, (x, y), 半径)
pygame.draw.line(表面, 颜色, (x1, y1), (x2, y2), 线宽)
\`\`\`

> ⚠️ **别忘了 \`pygame.display.flip()\`**——没有它，你画的东西不会显示在屏幕上！`,
      starterCode: `import pygame

pygame.init()
screen = pygame.display.set_mode((400, 300))
pygame.display.set_caption("我的第一个Pygame窗口")

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # 白色背景
    screen.fill((255, 255, 255))

    # 画一个红色矩形
    pygame.draw.rect(screen, (255, 0, 0), (50, 50, 100, 80))
    # 画一个蓝色圆形
    pygame.draw.circle(screen, (0, 0, 255), (300, 150), 60)
    # 画一条绿色线段
    pygame.draw.line(screen, (0, 255, 0), (50, 250), (350, 250), 5)

    pygame.display.flip()

pygame.quit()`,
      expectedOutput: `窗口已创建（400x300，标题"我的第一个Pygame窗口"）
白色背景上显示红色矩形、蓝色圆形和绿色线段`,
      hint: '坐标原点 (0, 0) 在窗口**左上角**，x 向右增加，y 向下增加——和数学课不一样哦！',
      validation: windowSummaryValidation('窗口已创建（400x300，标题"我的第一个Pygame窗口"）', '白色背景上显示红色矩形、蓝色圆形和绿色线段'),
    },
    {
      id: '22.3',
      kind: 'demo',
      chapterId: 'ch22',
      title: '键盘事件 — 让角色动起来',
      content: `## ⌨️ 键盘事件：让角色动起来

### 事件处理基础

Pygame 把键盘输入分为两种：

| 事件类型 | 含义 | 何时触发 |
|----------|------|----------|
| \`pygame.KEYDOWN\` | 按键按下 | 手指按下那一刻 |
| \`pygame.KEYUP\` | 按键松开 | 手指抬起那一刻 |

### 检测具体按键

\`\`\`python
for event in pygame.event.get():
    if event.type == pygame.KEYDOWN:
        if event.key == pygame.K_LEFT:
            x -= 5   # 左移
        elif event.key == pygame.K_RIGHT:
            x += 5   # 右移
\`\`\`

### 更流畅的方式：\`pygame.key.get_pressed()\`

上面的方式每次按键只移动一次。想要"按住不放持续移动"，用这个：

\`\`\`python
keys = pygame.key.get_pressed()
if keys[pygame.K_LEFT]:
    x -= 5
if keys[pygame.K_RIGHT]:
    x += 5
\`\`\`

### 常用按键常量

| 常量 | 按键 |
|------|------|
| \`K_LEFT\`, \`K_RIGHT\`, \`K_UP\`, \`K_DOWN\` | 方向键 |
| \`K_SPACE\` | 空格键 |
| \`K_RETURN\` | 回车键 |
| \`K_a\` ~ \`K_z\` | 字母键 |
| \`K_0\` ~ \`K_9\` | 数字键 |

> 💡 用 \`get_pressed()\` 做移动，用 \`KEYDOWN\` 做单次触发（比如发射子弹、跳跃）。`,
      starterCode: `import pygame

pygame.init()
screen = pygame.display.set_mode((500, 400))
pygame.display.set_caption("移动方块")
clock = pygame.time.Clock()

x, y = 250, 200  # 方块初始位置（中心）
speed = 5

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # 持续检测按键状态
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:
        x -= speed
    if keys[pygame.K_RIGHT]:
        x += speed
    if keys[pygame.K_UP]:
        y -= speed
    if keys[pygame.K_DOWN]:
        y += speed

    # 绘制
    screen.fill((255, 255, 255))
    pygame.draw.rect(screen, (255, 100, 0), (x, y, 40, 40))
    pygame.display.flip()
    clock.tick(60)  # 60 FPS

pygame.quit()`,
      expectedOutput: `窗口已创建（500x400，标题"移动方块"）
橙色方块随方向键移动，按住不放持续移动，60FPS 流畅`,
      hint: '`clock.tick(60)` 限制帧率为 60 FPS，让游戏在不同性能的电脑上跑一样快。',
      validation: windowSummaryValidation('窗口已创建（500x400，标题"移动方块"）', '橙色方块随方向键移动，按住不放持续移动，60FPS 流畅'),
    },
    {
      id: '22.4',
      kind: 'demo',
      chapterId: 'ch22',
      title: '碰撞检测 + 分数 — 游戏的核心',
      content: `## 💥 碰撞检测 + 分数：游戏有输赢了

### 碰撞检测

在 2D 游戏中，碰撞检测本质是**判断两个矩形是否重叠**。Pygame 提供了现成的方法：

\`\`\`python
# 用 Rect 对象
player_rect = pygame.Rect(x1, y1, w1, h1)
enemy_rect = pygame.Rect(x2, y2, w2, h2)

if player_rect.colliderect(enemy_rect):
    print("碰撞！")
\`\`\`

### \`pygame.Rect\` 是什么

一个矩形对象，有 \`x, y, width, height\` 属性，还自带碰撞方法：

| 方法 | 作用 |
|------|------|
| \`rect.colliderect(other_rect)\` | 两个矩形是否重叠 |
| \`rect.collidepoint(x, y)\` | 点 (x, y) 是否在矩形内 |
| \`rect.move(dx, dy)\` | 返回移动后的新 Rect |

### 分数的实现

用变量记录分数，然后在画面上绘制文字：

\`\`\`python
font = pygame.font.Font(None, 36)  # 创建字体（None = 默认字体, 36 = 字号）
score_text = font.render(f"分数：{score}", True, (0, 0, 0))  # 渲染文字为图像
screen.blit(score_text, (10, 10))  # 贴到画面上
\`\`\`

### render 参数说明

\`\`\`python
font.render(文字, 抗锯齿, 颜色, 背景色(可选))
#            ↓      ↓        ↓
#          字符串  True     RGB元组
\`\`\`

> 🎯 碰撞检测 + 分数 = 游戏灵魂。从简单的"吃豆子"到复杂的射击游戏，核心都是这两样。`,
      starterCode: `import pygame
import random

pygame.init()
screen = pygame.display.set_mode((500, 400))
pygame.display.set_caption("接苹果")
clock = pygame.time.Clock()

# 玩家
player = pygame.Rect(200, 350, 80, 20)
# 苹果
apple = pygame.Rect(random.randint(0, 470), 0, 30, 30)
score = 0
font = pygame.font.Font(None, 36)

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # 键盘移动玩家
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT] and player.x > 0:
        player.x -= 7
    if keys[pygame.K_RIGHT] and player.x < 420:
        player.x += 7

    # 苹果下落
    apple.y += 4
    if apple.y > 400:  # 苹果掉出屏幕——重置
        apple.y = 0
        apple.x = random.randint(0, 470)

    # 碰撞检测
    if player.colliderect(apple):
        score += 1
        apple.y = 0
        apple.x = random.randint(0, 470)

    # 绘制
    screen.fill((255, 255, 255))
    pygame.draw.rect(screen, (0, 100, 200), player)  # 蓝色玩家
    pygame.draw.ellipse(screen, (255, 50, 50), apple)  # 红色苹果
    score_text = font.render(f"分数：{score}", True, (0, 0, 0))
    screen.blit(score_text, (10, 10))
    pygame.display.flip()
    clock.tick(60)

pygame.quit()`,
      expectedOutput: `窗口已创建（500x400，标题"接苹果"）
用方向键移动蓝色挡板接红色苹果，接住得分+1，分数显示在左上角`,
      hint: '用 `random.randint(a, b)` 每次重置苹果的 x 坐标，让游戏有变化；范围要根据窗口宽度和苹果大小计算。',
      validation: windowSummaryValidation('窗口已创建（500x400，标题"接苹果"）', '用方向键移动蓝色挡板接红色苹果，接住得分+1，分数显示在左上角'),
    },
    {
      id: '22.5',
      kind: 'demo',
      chapterId: 'ch22',
      title: '音效 + 动画 — 让游戏活起来',
      content: `## 🔊 音效 + 动画：给游戏注入灵魂

### 播放音效

Pygame 有两个音频模块：

| 模块 | 用途 | 特点 |
|------|------|------|
| \`pygame.mixer.Sound\` | 短音效（爆炸、跳跃） | 延迟小，可同时播放多个 |
| \`pygame.mixer.music\` | 背景音乐（长音频） | 只能同时播放一首 |

\`\`\`python
# 音效
jump_sound = pygame.mixer.Sound("jump.wav")
jump_sound.play()           # 播放一次
jump_sound.set_volume(0.5)  # 音量 0.0 ~ 1.0

# 背景音乐
pygame.mixer.music.load("bgm.mp3")
pygame.mixer.music.play(-1)  # -1 = 循环播放
pygame.mixer.music.set_volume(0.3)
\`\`\`

### 简单动画原理

动画 = 快速切换图片（帧）。Pygame 里你用代码控制的任何视觉变化都是动画：

\`\`\`python
# 例子：颜色渐变（最简单的动画）
color_value = (color_value + 1) % 256
color = (color_value, 100, 200)
\`\`\`

### 精灵动画（多帧切换）

真正的角色动画需要多张图片：

\`\`\`python
# 加载一组图片帧
frames = [pygame.image.load(f"run_{i}.png") for i in range(4)]
current_frame = (current_frame + 1) % len(frames)
screen.blit(frames[current_frame], (x, y))
\`\`\`

### 你的游戏检查清单

开发一个完整小游戏，确保有这些要素：

- [x] 游戏循环 + FPS 控制
- [x] 键盘/鼠标输入
- [x] 碰撞检测
- [x] 分数系统
- [x] 音效/背景音乐
- [x] 开始/结束画面

> 🏆 到这里你已经掌握了 Pygame 的核心！可以做一个完整的"飞机大战"或"贪吃蛇"了。`,
      starterCode: `import pygame

pygame.init()
pygame.mixer.init()  # 初始化音频模块
screen = pygame.display.set_mode((400, 300))
pygame.display.set_caption("音效+动画")
clock = pygame.time.Clock()

# 创建简单的"弹跳"音效（如果没有音频文件，用这个生成）
import math
# 这里用颜色动画代替音效演示
hue = 0

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE:
                print("🔊 播放音效！（实际项目中用pygame.mixer.Sound）")

    # 颜色动画：变色圆
    hue = (hue + 2) % 360
    color = pygame.Color(0, 0, 0)
    color.hsva = (hue, 100, 100, 100)  # HSV 颜色模式

    screen.fill((30, 30, 30))
    pygame.draw.circle(screen, color, (200, 150), 80)
    pygame.display.flip()
    clock.tick(60)

pygame.quit()`,
      expectedOutput: `窗口已创建（400x300，标题"音效+动画"）
圆形颜色随时间平滑变化（HSV色环），按空格键触发音效提示`,
      hint: '没有音频文件？用 [sfxr](https://sfxr.me/) 在线生成8-bit风格音效，或从 [freesound.org](https://freesound.org/) 下载免费音效。',
      validation: windowSummaryValidation('窗口已创建（400x300，标题"音效+动画"）', '圆形颜色随时间平滑变化（HSV色环），按空格键触发音效提示'),
    },
    {
      id: '22.6',
      kind: 'demo',
      chapterId: 'ch22',
      title: '精灵与精灵组 — 批量管理游戏角色',
      content: `## 👾 精灵与精灵组：批量管理游戏角色

当游戏中有很多角色（玩家、敌人、子弹、道具），一个一个手动管理就太累了。Pygame 提供了 **Sprite（精灵）** 和 **Group（精灵组）** 来批量管理。

### Sprite 精灵

精灵是游戏中有独立行为的对象。你需要继承 \`pygame.sprite.Sprite\`：

\`\`\`python
class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((40, 40))
        self.image.fill((0, 200, 100))
        self.rect = self.image.get_rect()  # rect 是精灵的位置+大小
        self.rect.center = (400, 300)

    def update(self):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]: self.rect.x -= 5
        if keys[pygame.K_RIGHT]: self.rect.x += 5
\`\`\`

### Group 精灵组

精灵组可以同时管理多个精灵——统一更新、统一绘制：

\`\`\`python
all_sprites = pygame.sprite.Group()  # 创建精灵组

player = Player()
enemy = Enemy()
all_sprites.add(player, enemy)       # 添加精灵

# 在游戏循环中：
all_sprites.update()    # 调用每个精灵的 update()
all_sprites.draw(screen) # 把每个精灵画到屏幕上
\`\`\`

### Group 的妙用

| 方法 | 作用 |
|------|------|
| \`group.update()\` | 调用组内所有精灵的 update() |
| \`group.draw(screen)\` | 在 screen 上画出所有精灵 |
| \`group.add(sprite)\` | 添加精灵 |
| \`group.remove(sprite)\` | 移除精灵 |
| \`group.empty()\` | 清空所有精灵 |
| \`pygame.sprite.groupcollide()\` | 检测两组精灵间的碰撞！ |

### 碰撞检测 — Group 级别

\`\`\`python
# 检测子弹组和敌人组的碰撞
hits = pygame.sprite.groupcollide(bullets, enemies, True, True)
#                                 ↓        ↓      ↓     ↓
#                               子弹组  敌人组 碰撞后 碰撞后
#                                            删子弹 删敌人
\`\`\`

> 👾 Sprite + Group = 游戏的对象管理系统。代码从"每个角色手动管理"变成"只调 update/draw 就够了"。`,
      starterCode: `import pygame
import random

pygame.init()
screen = pygame.display.set_mode((600, 400))
pygame.display.set_caption("精灵与精灵组")
clock = pygame.time.Clock()

class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((30, 30))
        self.image.fill((0, 200, 0))
        self.rect = self.image.get_rect()
        self.rect.center = (300, 350)

    def update(self):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT] and self.rect.left > 0:
            self.rect.x -= 5
        if keys[pygame.K_RIGHT] and self.rect.right < 600:
            self.rect.x += 5

class Star(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((15, 15))
        self.image.fill((255, 200, 0))
        self.rect = self.image.get_rect()
        self.rect.x = random.randint(0, 585)
        self.rect.y = random.randint(-100, -20)

    def update(self):
        self.rect.y += 3
        if self.rect.top > 400:
            self.rect.x = random.randint(0, 585)
            self.rect.y = random.randint(-100, -20)
            return True
        return False

player = Player()
stars = pygame.sprite.Group()
all_sprites = pygame.sprite.Group()
all_sprites.add(player)
score = 0
font = pygame.font.Font(None, 36)

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # 随机生成星星
    if random.random() < 0.02:
        star = Star()
        stars.add(star)
        all_sprites.add(star)

    all_sprites.update()

    # 碰撞检测：玩家 vs 星星
    hits = pygame.sprite.spritecollide(player, stars, True)
    score += len(hits)

    screen.fill((20, 20, 40))
    all_sprites.draw(screen)
    score_text = font.render(f"收集：{score}", True, (255, 255, 255))
    screen.blit(score_text, (10, 10))
    pygame.display.flip()
    clock.tick(60)

pygame.quit()`,
      expectedOutput: `窗口已创建（600x400，标题"精灵与精灵组"）
绿色玩家用方向键移动，收集金色星星得分。星星由精灵组统一管理update/draw`,
      hint: '`pygame.sprite.spritecollide(player, stars, True)` 第三个参数 True 表示碰撞后从组中删除精灵；False 表示只检测不删除。',
      validation: windowSummaryValidation('窗口已创建（600x400，标题"精灵与精灵组"）', '绿色玩家用方向键移动，收集金色星星得分。星星由精灵组统一管理update/draw'),
    },
    {
      id: '22.7',
      kind: 'demo',
      chapterId: 'ch22',
      title: '游戏状态管理 — 标题/游玩/结束',
      content: `## 🔄 游戏状态管理：标题 → 游玩 → 结束

真正的游戏不止一种画面——有标题画面、游戏画面、结束画面。管理这些画面切换的模式叫**状态机（State Machine）**。

### 状态机模型

\`\`\`
   ┌─────────┐  按空格   ┌─────────┐  死亡   ┌─────────┐
   │  TITLE  │ ───────→ │ PLAYING │ ─────→ │GAME_OVER│
   │ 标题画面 │          │ 游戏画面 │        │ 结束画面 │
   └─────────┘          └─────────┘        └────┬────┘
        ↑                                       │
        └──────────── 按 R 重玩 ←────────────────┘
\`\`\`

### 核心实现

用一个变量 \`state\` 表示当前状态，每帧根据状态执行不同逻辑：

\`\`\`python
# 定义状态
TITLE, PLAYING, GAME_OVER = "title", "playing", "game_over"
state = TITLE

while running:
    if state == TITLE:
        # 画标题文字，等待按空格
        if key_pressed == K_SPACE:
            state = PLAYING
    elif state == PLAYING:
        # 正常游戏逻辑
        if player_dead:
            state = GAME_OVER
    elif state == GAME_OVER:
        # 画结束文字，等待按 R
        if key_pressed == K_r:
            reset_game()
            state = TITLE
\`\`\`

### 为什么用状态机？

- **逻辑清晰**：每个状态只管自己的事
- **易扩展**：加新状态不改旧代码（选关、暂停、商店…）
- **防 Bug**：不会出现"死了还能移动"这种问题
- **标准模式**：几乎所有游戏引擎都用状态机

### 状态设计原则

| 原则 | 说明 |
|------|------|
| 状态独立 | 每个状态的代码不互相干扰 |
| 转换明确 | 每个状态只在特定条件下切换到特定状态 |
| 重置干净 | 切换状态时把变量重置到初始值 |

> 🔄 状态机 = 游戏的控制中心。从 Flappy Bird 到塞尔达，状态机是游戏开发必须掌握的思维模型。`,
      starterCode: `import pygame

pygame.init()
screen = pygame.display.set_mode((500, 400))
pygame.display.set_caption("游戏状态管理")
clock = pygame.time.Clock()
font_big = pygame.font.Font(None, 60)
font_small = pygame.font.Font(None, 30)

TITLE, PLAYING, GAME_OVER = "title", "playing", "game_over"
state = TITLE
player_x, player_y = 250, 200
score = 0
lives = 3

def reset_game():
    global player_x, player_y, score, lives
    player_x, player_y = 250, 200
    score = 0
    lives = 3

def draw_title():
    screen.fill((20, 30, 50))
    title = font_big.render("我的游戏", True, (255, 255, 255))
    hint = font_small.render("按 SPACE 开始", True, (180, 180, 180))
    screen.blit(title, (150, 150))
    screen.blit(hint, (160, 220))

def draw_game():
    screen.fill((255, 255, 255))
    pygame.draw.rect(screen, (0, 100, 200), (player_x, player_y, 30, 30))
    info = font_small.render(f"分数: {score}  生命: {lives}", True, (0, 0, 0))
    screen.blit(info, (10, 10))

def draw_game_over():
    screen.fill((40, 10, 10))
    over = font_big.render("GAME OVER", True, (255, 80, 80))
    hint = font_small.render(f"最终分数: {score}  按 R 重玩", True, (200, 200, 200))
    screen.blit(over, (100, 150))
    screen.blit(hint, (120, 220))

running = True
while running:
    keys = pygame.key.get_pressed()
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            if state == TITLE and event.key == pygame.K_SPACE:
                state = PLAYING
            elif state == GAME_OVER and event.key == pygame.K_r:
                reset_game()
                state = TITLE

    if state == PLAYING:
        if keys[pygame.K_LEFT]: player_x -= 4
        if keys[pygame.K_RIGHT]: player_x += 4
        if keys[pygame.K_UP]: player_y -= 4
        if keys[pygame.K_DOWN]: player_y += 4
        # 模拟扣生命
        if player_x < 0 or player_x > 470 or player_y < 0 or player_y > 370:
            lives -= 1
            player_x, player_y = 250, 200
            if lives <= 0:
                state = GAME_OVER

    if state == TITLE:
        draw_title()
    elif state == PLAYING:
        draw_game()
    elif state == GAME_OVER:
        draw_game_over()

    pygame.display.flip()
    clock.tick(60)

pygame.quit()`,
      expectedOutput: `窗口已创建（500x400，标题"游戏状态管理"）
三种状态：TITLE（按空格开始）→ PLAYING（移动方块，出界扣命）→ GAME_OVER（按R重玩）`,
      hint: '用枚举（Enum）或字符串常量管理状态名；Python 3.4+ 推荐 `from enum import Enum`，可读性更好。',
      validation: windowSummaryValidation('窗口已创建（500x400，标题"游戏状态管理"）', '三种状态：TITLE（按空格开始）→ PLAYING（移动方块，出界扣命）→ GAME_OVER（按R重玩）'),
    },
  ],
};

const p5: Chapter = {
  id: 'p5',
  title: '实战项目：贪吃蛇游戏',
  description: '综合运用 Pygame：蛇的移动、食物生成、碰撞检测、分数系统、状态管理',
  sections: [
    {
      id: 'p5.1',
      kind: 'demo',
      chapterId: 'p5',
      title: '设计蛇的移动逻辑 + 食物生成',
      content: `## 🐍 贪吃蛇（一）：蛇的移动 + 食物生成

贪吃蛇是经典游戏——你控制一条蛇吃食物，越吃越长，碰到自己或墙壁就结束。

### 蛇的数据结构

蛇的身体用**列表**表示，每个元素是 (x, y) 坐标。蛇头在列表末尾：

\`\`\`python
snake = [(5, 5), (5, 6), (5, 7)]  # 三节：尾→头
# 蛇头是 snake[-1]，即 (5, 7)
\`\`\`

### 移动逻辑

每次移动 = 在蛇头方向新增一节 + 移除尾部一节（长度不变）：

\`\`\`python
def move_snake(snake, direction):
    head_x, head_y = snake[-1]
    if direction == 'UP':    new_head = (head_x, head_y - 1)
    elif direction == 'DOWN':  new_head = (head_x, head_y + 1)
    elif direction == 'LEFT':  new_head = (head_x - 1, head_y)
    elif direction == 'RIGHT': new_head = (head_x + 1, head_y)
    snake.append(new_head)   # 加新头
    snake.pop(0)             # 去旧尾
\`\`\`

### 吃到食物的处理

蛇头碰到食物时：**不删尾部**，这样蛇就变长了一节。

### 食物生成

食物随机出现在网格上，且不能在蛇身上：

\`\`\`python
def spawn_food(snake, grid_w, grid_h):
    while True:
        food = (random.randint(0, grid_w-1), random.randint(0, grid_h-1))
        if food not in snake:
            return food
\`\`\`

### 网格系统

把窗口划分为固定大小的格子（如 20x20 像素），蛇和食物都在格子坐标上：

\`\`\`
窗口 600x400 → 划分为 30x20 个格子（每格 20px）
蛇的坐标是 (格子列, 格子行)，画的时候 ×20 得到像素坐标
\`\`\`

> 🐍 网格系统让移动和碰撞检测变得极其简单——坐标都是整数，对齐完美。`,
      starterCode: `import pygame
import random

pygame.init()
W, H = 600, 400
GRID = 20  # 每格像素
COLS, ROWS = W // GRID, H // GRID
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("贪吃蛇 — 移动+食物")
clock = pygame.time.Clock()

# 蛇初始：3节，向右移动
snake = [(10, 10), (11, 10), (12, 10)]
direction = 'RIGHT'
food = None

def spawn_food():
    while True:
        f = (random.randint(0, COLS-1), random.randint(0, ROWS-1))
        if f not in snake:
            return f

food = spawn_food()

def draw():
    screen.fill((20, 20, 20))
    # 画食物
    fx, fy = food
    pygame.draw.rect(screen, (255, 50, 50),
                     (fx*GRID, fy*GRID, GRID, GRID))
    # 画蛇
    for i, (sx, sy) in enumerate(snake):
        color = (0, 200, 0) if i < len(snake)-1 else (0, 255, 0)
        pygame.draw.rect(screen, color,
                         (sx*GRID, sy*GRID, GRID, GRID))
    pygame.display.flip()

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_UP and direction != 'DOWN':
                direction = 'UP'
            elif event.key == pygame.K_DOWN and direction != 'UP':
                direction = 'DOWN'
            elif event.key == pygame.K_LEFT and direction != 'RIGHT':
                direction = 'LEFT'
            elif event.key == pygame.K_RIGHT and direction != 'LEFT':
                direction = 'RIGHT'

    # 移动蛇
    hx, hy = snake[-1]
    if direction == 'UP':    new_head = (hx, hy - 1)
    elif direction == 'DOWN':  new_head = (hx, hy + 1)
    elif direction == 'LEFT':  new_head = (hx - 1, hy)
    elif direction == 'RIGHT': new_head = (hx + 1, hy)
    else: new_head = (hx, hy)

    snake.append(new_head)
    if new_head == food:
        food = spawn_food()  # 吃到食物，不删尾（变长）
    else:
        snake.pop(0)         # 没吃到，删尾

    draw()
    clock.tick(8)  # 8格/秒

pygame.quit()`,
      expectedOutput: `窗口已创建（600x400，标题"贪吃蛇 — 移动+食物"）
绿色蛇在30x20网格上移动，红色食物随机出现，吃到后蛇变长一节`,
      hint: '方向键加了"不能反向"的判断（向上时不能按下，向左时不能按右），防止蛇直接掉头撞到自己。',
      validation: windowSummaryValidation('窗口已创建（600x400，标题"贪吃蛇 — 移动+食物"）', '绿色蛇在30x20网格上移动，红色食物随机出现，吃到后蛇变长一节'),
    },
    {
      id: 'p5.2',
      kind: 'demo',
      chapterId: 'p5',
      title: '碰撞检测 + 分数面板',
      content: `## 🐍 贪吃蛇（二）：碰撞检测 + 分数面板

有了移动和食物，接下来加上**碰撞检测**和**分数显示**，游戏就有输赢和目标了。

### 两种死亡方式

1. **撞墙**：蛇头坐标超出网格范围
2. **撞自己**：蛇头坐标和身体其他部分重合

\`\`\`python
def check_collision(snake, cols, rows):
    head = snake[-1]
    hx, hy = head
    # 撞墙
    if hx < 0 or hx >= cols or hy < 0 or hy >= rows:
        return True
    # 撞自己（蛇头坐标在身体中出现过）
    if head in snake[:-1]:
        return True
    return False
\`\`\`

### 分数系统

- 每吃一个食物 +10 分
- 分数用 Pygame 字体渲染在屏幕左上角
- 可以加一个最高分（存到变量或文件）

\`\`\`python
font = pygame.font.Font(None, 36)
score_text = font.render(f"分数：{score}", True, (255, 255, 255))
screen.blit(score_text, (10, 10))
\`\`\`

### 显示面板设计

\`\`\`
┌─────────────────────────┐
│ 分数：120   最高：200    │ ← 信息面板区
├─────────────────────────┤
│                         │
│       🐍 游戏区域        │
│                         │
└─────────────────────────┘
\`\`\`

### 游戏循环加入碰撞检测

\`\`\`python
if check_collision(snake, COLS, ROWS):
    print("游戏结束！")
    running = False
\`\`\`

> 💥 碰撞检测让贪吃蛇从"演示"变成了"游戏"——有失败才有挑战，有分数才有目标。`,
      starterCode: `import pygame
import random

pygame.init()
W, H = 600, 400
GRID = 20
COLS, ROWS = W // GRID, H // GRID
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("贪吃蛇 — 碰撞+分数")
clock = pygame.time.Clock()
font = pygame.font.Font(None, 36)

snake = [(10, 10), (11, 10), (12, 10)]
direction = 'RIGHT'
food = None
score = 0
game_over = False

def spawn_food():
    while True:
        f = (random.randint(0, COLS-1), random.randint(0, ROWS-1))
        if f not in snake: return f

food = spawn_food()

def check_collision(s):
    hx, hy = s[-1]
    if hx < 0 or hx >= COLS or hy < 0 or hy >= ROWS:
        return True
    if s[-1] in s[:-1]:
        return True
    return False

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN and not game_over:
            if event.key == pygame.K_UP and direction != 'DOWN':
                direction = 'UP'
            elif event.key == pygame.K_DOWN and direction != 'UP':
                direction = 'DOWN'
            elif event.key == pygame.K_LEFT and direction != 'RIGHT':
                direction = 'LEFT'
            elif event.key == pygame.K_RIGHT and direction != 'LEFT':
                direction = 'RIGHT'

    if not game_over:
        hx, hy = snake[-1]
        if direction == 'UP': new_head = (hx, hy - 1)
        elif direction == 'DOWN': new_head = (hx, hy + 1)
        elif direction == 'LEFT': new_head = (hx - 1, hy)
        elif direction == 'RIGHT': new_head = (hx + 1, hy)
        else: new_head = (hx, hy)

        snake.append(new_head)
        if new_head == food:
            score += 10
            food = spawn_food()
        else:
            snake.pop(0)

        if check_collision(snake):
            game_over = True

    # 绘制
    screen.fill((20, 20, 20))
    # 食物
    fx, fy = food
    pygame.draw.rect(screen, (255, 50, 50), (fx*GRID, fy*GRID, GRID, GRID))
    # 蛇
    for i, (sx, sy) in enumerate(snake):
        color = (0, 200, 0) if i < len(snake)-1 else (0, 255, 0)
        pygame.draw.rect(screen, color, (sx*GRID, sy*GRID, GRID, GRID))
    # 分数
    score_text = font.render(f"分数：{score}", True, (255, 255, 255))
    screen.blit(score_text, (10, 5))
    if game_over:
        over_text = font.render("游戏结束！", True, (255, 80, 80))
        screen.blit(over_text, (230, 180))

    pygame.display.flip()
    clock.tick(8)

pygame.quit()`,
      expectedOutput: `窗口已创建（600x400，标题"贪吃蛇 — 碰撞+分数"）
左上角显示实时分数，撞墙或撞到自己时画面显示"游戏结束！"`,
      hint: '`head in snake[:-1]` 判断蛇头是否和身体重合。`snake[:-1]` 是除了最后一个元素（蛇头）之外的所有身体部分。',
      validation: windowSummaryValidation('窗口已创建（600x400，标题"贪吃蛇 — 碰撞+分数"）', '左上角显示实时分数，撞墙或撞到自己时画面显示"游戏结束！"'),
    },
    {
      id: 'p5.3',
      kind: 'demo',
      chapterId: 'p5',
      title: '完善：加速 + 结束画面 + 重玩',
      content: `## 🐍 贪吃蛇（三）：加速 + 结束画面 + 重玩

最后一步，把贪吃蛇变成一个**完整的游戏**——有难度曲线、有结束画面、能重新开始。

### 动态加速

每吃 N 个食物，蛇的速度提升一点。速度用 FPS 控制：

\`\`\`python
base_speed = 8      # 初始：每秒8格
speed_increment = 1  # 每吃5个食物+1速
max_speed = 20       # 最快20格/秒

# 计算当前速度
level = score // 50   # 每50分升一级
current_speed = min(base_speed + level * speed_increment, max_speed)
\`\`\`

### 结束画面

游戏结束时不要直接退出——显示一个结束画面，让玩家看到自己的分数：

\`\`\`python
def draw_game_over(screen, font, score):
    screen.fill((10, 10, 30))
    texts = [
        ("游戏结束", 60, (255, 80, 80), (150, 120)),
        (f"最终得分：{score}", 36, (255, 255, 255), (180, 200)),
        ("按 R 键重新开始", 24, (180, 180, 180), (170, 260)),
    ]
    for text, size, color, pos in texts:
        f = pygame.font.Font(None, size)
        surf = f.render(text, True, color)
        screen.blit(surf, pos)
\`\`\`

### 重玩机制

按 R 键重置所有变量回到初始状态：

\`\`\`python
if event.key == pygame.K_r and game_over:
    snake = [(10, 10), (11, 10), (12, 10)]
    direction = 'RIGHT'
    score = 0
    game_over = False
    food = spawn_food()
\`\`\`

### 最终效果

现在你的贪吃蛇具备了：
- ✅ 蛇的移动 + 食物生成
- ✅ 碰撞检测（撞墙 + 撞自己）
- ✅ 分数面板 + 实时显示
- ✅ 动态加速（越吃越快）
- ✅ 结束画面 + 重玩按钮

> 🐍 恭喜！你完成了一个完整的 Pygame 游戏。现在你可以把它发给朋友玩了——或者继续加功能：障碍物、道具、排行榜…创意无限！`,
      starterCode: `import pygame
import random

pygame.init()
W, H = 600, 400
GRID = 20
COLS, ROWS = W // GRID, H // GRID
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("🐍 贪吃蛇 — 完整版")
clock = pygame.time.Clock()
font = pygame.font.Font(None, 36)

def spawn_food(snake):
    while True:
        f = (random.randint(0, COLS-1), random.randint(0, ROWS-1))
        if f not in snake: return f

def reset():
    return [(10, 10), (11, 10), (12, 10)], 'RIGHT', 0, False

snake, direction, score, game_over = reset()
food = spawn_food(snake)
best_score = 0

def draw_game_over():
    screen.fill((10, 10, 30))
    over = pygame.font.Font(None, 64).render("游戏结束", True, (255, 80, 80))
    final = font.render(f"得分：{score}  最高：{best_score}", True, (255, 255, 255))
    hint = font.render("按 R 重新开始", True, (180, 180, 180))
    screen.blit(over, (160, 120))
    screen.blit(final, (160, 190))
    screen.blit(hint, (180, 250))

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            if not game_over:
                if event.key == pygame.K_UP and direction != 'DOWN': direction = 'UP'
                elif event.key == pygame.K_DOWN and direction != 'UP': direction = 'DOWN'
                elif event.key == pygame.K_LEFT and direction != 'RIGHT': direction = 'LEFT'
                elif event.key == pygame.K_RIGHT and direction != 'LEFT': direction = 'RIGHT'
            else:
                if event.key == pygame.K_r:
                    snake, direction, score, game_over = reset()
                    food = spawn_food(snake)

    if not game_over:
        hx, hy = snake[-1]
        if direction == 'UP': new_head = (hx, hy - 1)
        elif direction == 'DOWN': new_head = (hx, hy + 1)
        elif direction == 'LEFT': new_head = (hx - 1, hy)
        elif direction == 'RIGHT': new_head = (hx + 1, hy)
        else: new_head = (hx, hy)

        snake.append(new_head)
        if new_head == food:
            score += 10
            if score > best_score: best_score = score
            food = spawn_food(snake)
        else:
            snake.pop(0)

        hx, hy = snake[-1]
        if hx < 0 or hx >= COLS or hy < 0 or hy >= ROWS or snake[-1] in snake[:-1]:
            game_over = True

        level = score // 50
        speed = min(8 + level, 20)  # 初始8，每50分+1，最快20

    if game_over:
        draw_game_over()
    else:
        screen.fill((20, 20, 20))
        fx, fy = food
        pygame.draw.rect(screen, (255, 50, 50), (fx*GRID, fy*GRID, GRID, GRID))
        for i, (sx, sy) in enumerate(snake):
            color = (0, 200, 0) if i < len(snake)-1 else (0, 255, 0)
            pygame.draw.rect(screen, color, (sx*GRID, sy*GRID, GRID, GRID))
        score_text = font.render(f"分数：{score}  Lv.{score//50}", True, (255, 255, 255))
        screen.blit(score_text, (10, 5))

    pygame.display.flip()
    clock.tick(speed if not game_over else 10)

pygame.quit()`,
      expectedOutput: `游戏窗口已创建（600x400）
完整的贪吃蛇游戏：方向键控制，吃食物得分+加速，撞墙或撞自己进入结束画面，按R重玩，显示最高分`,
      hint: '游戏速度用 `clock.tick(speed)` 动态控制。最高分只在当前运行期间保存——要持久化可以用 `json` 存到文件，每次启动读取。',
      validation: windowSummaryValidation('游戏窗口已创建（600x400）', '完整的贪吃蛇游戏：方向键控制，吃食物得分+加速，撞墙或撞自己进入结束画面，按R重玩，显示最高分'),
    },
  ],
};

const ch23: Chapter = {
  id: 'ch23',
  title: '数据分析：pandas + matplotlib',
  description: 'DataFrame、数据读取、清洗、可视化',
  sections: [
    {
      id: '23.1',
      kind: 'demo',
      chapterId: 'ch23',
      title: 'pandas 是什么 — DataFrame 的世界',
      content: `## 🐼 pandas：Python 数据分析的王者

pandas 是 Python 最强大的数据分析库。先安装：

\`\`\`bash
pip install pandas
\`\`\`

### 核心数据结构

pandas 有两个核心结构：

| 结构 | 类比 | 说明 |
|------|------|------|
| **Series** | 一列数据 | 带标签的一维数组 |
| **DataFrame** | 一张 Excel 表 | 由多个 Series 组成的二维表格 |

### DataFrame 的样子

\`\`\`
     姓名    年龄    城市
0    张三     25    北京
1    李四     30    上海
2    王五     28    广州
\`\`\`

- **行索引**（左侧 0, 1, 2...）
- **列名**（上方姓名、年龄、城市）
- **数据**（中间的值）

### 创建 DataFrame

\`\`\`python
import pandas as pd

# 方法一：从字典创建
df = pd.DataFrame({
    '姓名': ['张三', '李四', '王五'],
    '年龄': [25, 30, 28],
    '城市': ['北京', '上海', '广州']
})

# 方法二：从列表+列表创建
df = pd.DataFrame([
    ['张三', 25, '北京'],
    ['李四', 30, '上海'],
    ['王五', 28, '广州']
], columns=['姓名', '年龄', '城市'])
\`\`\`

### 快速查看数据

\`\`\`python
df.head()      # 前 5 行
df.tail()      # 后 5 行
df.shape       # (行数, 列数)
df.info()      # 每列的数据类型和缺失情况
df.describe()  # 数值列的统计摘要（均值、标准差等）
\`\`\`

> 📊 pandas 让 Python 成了 Excel 的超级替代品——处理百万行数据也不卡！`,
      starterCode: `import pandas as pd

# 创建第一个 DataFrame
df = pd.DataFrame({
    '姓名': ['张三', '李四', '王五', '赵六'],
    '年龄': [25, 30, 28, 22],
    '分数': [88, 95, 72, 85]
})

print("📊 我的第一个 DataFrame：")
print(df)
print(f"\\n形状：{df.shape[0]} 行 × {df.shape[1]} 列")
print(f"平均年龄：{df['年龄'].mean():.1f}")
print(f"平均分数：{df['分数'].mean():.1f}")`,
      expectedOutput: `📊 我的第一个 DataFrame：
   姓名  年龄  分数
0  张三  25  88
1  李四  30  95
2  王五  28  72
3  赵六  22  85

形状：4 行 × 3 列
平均年龄：26.3
平均分数：85.0`,
      hint: '`df[列名]` 取出一列作为 Series，然后可以 `.mean()`、`.sum()`、`.max()`、`.min()` 等。',
    },
    {
      id: '23.2',
      kind: 'demo',
      chapterId: 'ch23',
      title: '读取数据 — CSV / Excel / JSON 一把梭',
      content: `## 📂 读取数据：CSV / Excel / JSON 全搞定

真实数据不在代码里，在文件里。pandas 支持几乎所有数据格式：

### 读取各种格式

\`\`\`python
import pandas as pd

# CSV — 最常用
df = pd.read_csv('data.csv')

# Excel
df = pd.read_excel('data.xlsx', sheet_name='Sheet1')

# JSON
df = pd.read_json('data.json')

# 网页表格（HTML）
dfs = pd.read_html('https://...')  # 返回所有表格的列表
\`\`\`

### read_csv 常用参数

\`\`\`python
pd.read_csv(
    'data.csv',
    encoding='utf-8',        # 编码（中文有时用 gbk）
    sep=',',                 # 分隔符（默认逗号，TSV 用 \t）
    header=0,                # 哪一行做列名（0 = 第一行）
    index_col=0,             # 哪一列做行索引
    usecols=['姓名', '年龄'], # 只读指定列
    nrows=100,               # 只读前 100 行
)
\`\`\`

### 写出数据

\`\`\`python
df.to_csv('output.csv', index=False)     # index=False 不写行号
df.to_excel('output.xlsx', sheet_name='数据')
df.to_json('output.json', orient='records')  # 每行一个对象
\`\`\`

### 快速检查读取结果

\`\`\`python
df.head()        # 瞥一眼前几行，确认读对了
df.columns       # 列出所有列名
df.dtypes        # 每列的数据类型
len(df)          # 一共有多少行
\`\`\`

> 💡 **编码问题**：中文 CSV 乱码？试试 \`encoding='gbk'\` 或 \`encoding='utf-8-sig'\`。`,
      starterCode: `import pandas as pd
import io  # 模拟文件读取

# 模拟一个 CSV 文件内容
csv_data = '''姓名,年龄,城市,工资
张三,25,北京,8000
李四,30,上海,12000
王五,28,广州,9500
赵六,22,深圳,7000
孙七,35,北京,15000'''

# 从字符串读取（实际中用 pd.read_csv('文件.csv')）
df = pd.read_csv(io.StringIO(csv_data))

print("📂 读取到的数据：")
print(df)
print(f"\\n共 {len(df)} 行数据")
print(f"平均工资：{df['工资'].mean():.0f} 元")
print(f"最高工资：{df['工资'].max()} 元")`,
      expectedOutput: `📂 读取到的数据：
   姓名  年龄  城市     工资
0  张三  25  北京   8000
1  李四  30  上海  12000
2  王五  28  广州   9500
3  赵六  22  深圳   7000
4  孙七  35  北京  15000

共 5 行数据
平均工资：10300 元
最高工资：15000 元`,
      hint: '`io.StringIO` 可以把字符串伪装成文件对象，方便测试；实际项目用 `pd.read_csv("真实文件.csv")`。',
    },
    {
      id: '23.3',
      kind: 'demo',
      chapterId: 'ch23',
      title: '数据清洗 — 去重 / 填空 / 筛选',
      content: `## 🧹 数据清洗：把"脏数据"变干净

真实数据永远是脏的——有缺失值、重复行、格式不统一。数据分析 80% 的时间都在清洗数据。

### 常见问题 & 解决方法

#### 1. 缺失值（NaN）

\`\`\`python
df.isnull().sum()              # 统计每列有多少空值
df.dropna()                    # 删除有空值的行
df.fillna(0)                   # 用 0 填充空值
df['年龄'].fillna(df['年龄'].mean())  # 用平均值填充
\`\`\`

#### 2. 重复行

\`\`\`python
df.duplicated()                # 哪些行是重复的
df.drop_duplicates()           # 删除重复行
df.drop_duplicates(subset=['姓名'])  # 按姓名去重
\`\`\`

#### 3. 筛选数据

\`\`\`python
# 条件筛选
df[df['年龄'] > 25]            # 年龄大于 25
df[df['城市'] == '北京']       # 城市是北京

# 多条件（用 & 和 |，加括号！）
df[(df['年龄'] > 25) & (df['工资'] > 10000)]

# 用 query（更可读）
df.query('年龄 > 25 and 工资 > 10000')
\`\`\`

#### 4. 数据类型转换

\`\`\`python
df['年龄'] = df['年龄'].astype(int)        # 转整数
df['日期'] = pd.to_datetime(df['日期'])    # 转日期类型
\`\`\`

### 清洗检查清单

\`\`\`python
df.info()          # 类型 + 缺失
df.describe()      # 统计摘要（看有无异常值）
df.isnull().sum()  # 空值统计
df.duplicated().sum()  # 重复统计
\`\`\`

> 🧹 数据清洗就像做饭前的择菜——不能跳过，但 pandas 让这事轻松很多。`,
      starterCode: `import pandas as pd
import io

# 模拟"脏数据"
csv_data = '''姓名,年龄,城市,工资
张三,25,北京,8000
李四,,上海,12000
王五,28,广州,
张三,25,北京,8000
赵六,999,深圳,7000'''

df = pd.read_csv(io.StringIO(csv_data))
print("🔍 清洗前的数据：")
print(df)

# 清洗流程
print("\\n📊 缺失值统计：")
print(df.isnull().sum())

# 1. 去重
df = df.drop_duplicates()

# 2. 填充缺失
df['年龄'] = df['年龄'].fillna(df['年龄'].median())
df['工资'] = df['工资'].fillna(df['工资'].mean())

# 3. 筛选异常值（年龄 > 100 不合理）
df = df[df['年龄'] < 100]

print("\\n✅ 清洗后的数据：")
print(df)`,
      expectedOutput: `🔍 清洗前的数据：
   姓名     年龄  城市       工资
0  张三   25.0  北京   8000.0
1  李四    NaN  上海  12000.0
2  王五   28.0  广州      NaN
3  张三   25.0  北京   8000.0
4  赵六  999.0  深圳   7000.0

📊 缺失值统计：
姓名    0
年龄    1
城市    0
工资    1
dtype: int64

✅ 清洗后的数据：
   姓名    年龄  城市       工资
0  张三  25.0  北京   8000.0
1  李四  26.5  上海  12000.0
2  王五  28.0  广州   9000.0`,
      hint: '`median()`（中位数）通常比 `mean()`（均值）更适合填充——不容易被极端值拉偏。',
    },
    {
      id: '23.4',
      kind: 'demo',
      chapterId: 'ch23',
      title: '数据可视化 — matplotlib 画图',
      content: `## 📈 数据可视化：让数字会说话

一张好图胜过千行数据。Python 的可视化王者是 **matplotlib**：

\`\`\`bash
pip install matplotlib
\`\`\`

### 常用图表类型

| 图表 | 函数 | 适合场景 |
|------|------|----------|
| 折线图 | \`plt.plot()\` | 趋势、时间序列 |
| 柱状图 | \`plt.bar()\` | 类别对比 |
| 饼图 | \`plt.pie()\` | 占比 |
| 散点图 | \`plt.scatter()\` | 相关性 |
| 直方图 | \`plt.hist()\` | 分布 |

### 基本画图流程

\`\`\`python
import matplotlib.pyplot as plt

# 1. 准备数据
x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]

# 2. 画图
plt.plot(x, y, marker='o', color='red', linewidth=2)

# 3. 装饰
plt.title('我的图表')
plt.xlabel('X 轴')
plt.ylabel('Y 轴')
plt.grid(True)

# 4. 显示
plt.show()
\`\`\`

### pandas 直接画图（更快！）

pandas 的 DataFrame 自带 \`.plot()\`，底层就是 matplotlib：

\`\`\`python
df.plot(x='月份', y='销售额', kind='bar')
df['年龄'].plot(kind='hist', bins=20)
df.plot(kind='scatter', x='年龄', y='工资')
\`\`\`

### 中文显示问题

matplotlib 默认不支持中文，需要设置字体：

\`\`\`python
plt.rcParams['font.sans-serif'] = ['SimHei']  # 用黑体
plt.rcParams['axes.unicode_minus'] = False    # 解决负号显示
\`\`\`

> 📊 pandas + matplotlib 是数据分析师的"双手"——左手整理数据，右手画图展示。`,
      starterCode: `import pandas as pd
import matplotlib
matplotlib.use('Agg')  # 无 GUI 后端（服务器环境）
import matplotlib.pyplot as plt

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei']
plt.rcParams['axes.unicode_minus'] = False

# 数据
df = pd.DataFrame({
    '月份': ['1月', '2月', '3月', '4月', '5月', '6月'],
    '销售额': [12000, 15000, 11000, 18000, 20000, 17000],
    '利润': [3000, 4000, 2500, 5000, 6000, 4500]
})

# 画柱状图
df.plot(x='月份', y=['销售额', '利润'], kind='bar', figsize=(8, 5))
plt.title('📊 上半年销售数据')
plt.xlabel('月份')
plt.ylabel('金额（元）')
plt.grid(axis='y', alpha=0.5)
plt.tight_layout()

# 保存图片（无 GUI 时用这个代替 plt.show()）
plt.savefig('sales_chart.png', dpi=150)
print("✅ 图表已保存为 sales_chart.png")
print(f"总销售额：{df['销售额'].sum()} 元")
print(f"总利润：{df['利润'].sum()} 元")`,
      expectedOutput: `✅ 图表已保存为 sales_chart.png
总销售额：93000 元
总利润：25500 元`,
      hint: '在 Jupyter Notebook 中，加一行 `%matplotlib inline` 就能直接在 cell 下方显示图表。',
    },
    {
      id: '23.5',
      kind: 'demo',
      chapterId: 'ch23',
      title: '实战：分析一份天气数据',
      content: `## 🌤️ 实战：用 pandas 分析天气数据

现在把读取、清洗、分组、可视化全部串起来——分析一份真实的天气 CSV 数据，回答几个具体问题。

### 分析流程

\`\`\`
读取 CSV → 查看数据 → 清洗缺失 → 分组统计 → 画图展示
\`\`\`

### 常见分析问题

| 问题 | pandas 方法 |
|------|-------------|
| 每月平均温度？ | \`df.groupby('月份')['温度'].mean()\` |
| 最高温出现在哪天？ | \`df.loc[df['最高温'].idxmax()]\` |
| 下雨天数？ | \`df[df['天气']=='雨'].shape[0]\` |
| 温度变化趋势？ | \`df.plot(x='日期', y='温度', kind='line')\` |
| 各风向占比？ | \`df['风向'].value_counts().plot(kind='pie')\` |

### groupby — 分组聚合的瑞士军刀

\`\`\`python
# 按月份分组，计算平均温度
monthly = df.groupby('月份')['平均温度'].mean()

# 多列聚合
df.groupby('月份').agg({
    '最高温': 'max',
    '最低温': 'min',
    '降水量': 'sum'
})
\`\`\`

### 画趋势图

\`\`\`python
# 温度走势
plt.figure(figsize=(12, 5))
plt.plot(df['日期'], df['最高温'], label='最高温', color='red')
plt.plot(df['日期'], df['最低温'], label='最低温', color='blue')
plt.fill_between(range(len(df)), df['最低温'], df['最高温'], alpha=0.2)
plt.legend()
plt.title('温度变化趋势')
plt.show()
\`\`\`

> 🌤️ 从"一堆数字"到"一张趋势图"——这就是数据分析的核心价值：从数据中提取洞察。`,
      starterCode: `import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

plt.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei']
plt.rcParams['axes.unicode_minus'] = False

# 模拟30天天气数据
np.random.seed(42)
dates = pd.date_range('2024-01-01', periods=30, freq='D')
df = pd.DataFrame({
    '日期': dates,
    '最高温': np.random.randint(5, 16, 30),
    '最低温': np.random.randint(-5, 5, 30),
    '天气': np.random.choice(['晴', '多云', '雨', '雪'], 30, p=[0.4, 0.3, 0.2, 0.1]),
    '风速': np.random.randint(1, 8, 30),
    '月份': [d.month for d in dates],
})

# 模拟某天缺失
df.loc[5, '最高温'] = np.nan
df.loc[12, '最低温'] = np.nan

print("🌤️ 天气数据分析报告")
print("=" * 40)

# 1. 清洗
df['最高温'] = df['最高温'].fillna(df['最高温'].mean())
df['最低温'] = df['最低温'].fillna(df['最低温'].mean())

# 2. 基本统计
print(f"\\n📊 基本统计：")
print(f"平均最高温：{df['最高温'].mean():.1f}°C")
print(f"平均最低温：{df['最低温'].mean():.1f}°C")
print(f"极端最高温：{df['最高温'].max():.0f}°C")
print(f"极端最低温：{df['最低温'].min():.0f}°C")

# 3. 天气分布
print(f"\\n☁️ 天气分布：")
weather_counts = df['天气'].value_counts()
for w, c in weather_counts.items():
    print(f"  {w}：{c} 天")

# 4. 风速分析
print(f"\\n💨 风速：平均 {df['风速'].mean():.1f} 级，最大 {df['风速'].max()} 级")

# 5. 画图
fig, axes = plt.subplots(1, 2, figsize=(12, 4))

# 温度趋势
axes[0].plot(df['日期'], df['最高温'], 'r-o', label='最高温', markersize=4)
axes[0].plot(df['日期'], df['最低温'], 'b-o', label='最低温', markersize=4)
axes[0].fill_between(df['日期'], df['最低温'], df['最高温'], alpha=0.15)
axes[0].set_title('30天温度趋势')
axes[0].legend()
axes[0].tick_params(axis='x', rotation=45)

# 天气分布饼图
weather_counts.plot(kind='pie', ax=axes[1], autopct='%1.1f%%',
                     colors=['orange', 'skyblue', 'gray', 'lightblue'])
axes[1].set_title('天气分布')
axes[1].set_ylabel('')

plt.tight_layout()
plt.savefig('weather_report.png', dpi=120)
print("\\n✅ 分析报告已保存为 weather_report.png")`,
      expectedOutput: `🌤️ 天气数据分析报告
========================================

📊 基本统计：
平均最高温：10.1°C
平均最低温：-0.1°C
极端最高温：15°C
极端最低温：-4°C

☁️ 天气分布：
  晴：X 天
  多云：X 天
  雨：X 天
  雪：X 天

💨 风速：平均 X.X 级，最大 X 级

✅ 分析报告已保存为 weather_report.png`,
      hint: '`np.random.seed(42)` 保证每次运行生成的随机数据一致——方便调试和分享。`fill_between` 画温度区间阴影很直观。',
    },
  ],
};

const ch24: Chapter = {
  id: 'ch24',
  title: 'Django 全栈',
  description: 'MTV架构、Admin后台、ORM、用户认证、中间件与信号',
  sections: [
    {
      id: '24.1',
      kind: 'demo',
      chapterId: 'ch24',
      title: 'Django vs Flask — 什么时候用重量级',
      content: `## 🏗️ Django vs Flask：选大还是选小？

你已经学过 Flask（微框架），现在来认识 Django（全栈框架）。

### 对比一览

| 特性 | Flask | Django |
|------|-------|--------|
| 定位 | 微框架 | 全栈框架 |
| 自带功能 | 路由、模板 | 路由、模板、ORM、Admin、认证、表单... |
| 数据库 | 自己选（SQLAlchemy等） | 自带 ORM |
| 后台管理 | 需要自己写 | 自带 Admin 后台 |
| 用户系统 | 需要自己集成 | 自带登录/注册/权限 |
| 学习曲线 | 低 → 高 | 高 → 更高 |
| 适合项目 | 小型 API、微服务 | 大型 Web 应用、CMS |

### Django 的 MTV 架构

Django 不是 MVC，是 **MTV**：

\`\`\`
用户请求 → URL 路由 → View（视图）→ Model（模型）→ 数据库
                        ↓
                   Template（模板）→ HTML 响应
\`\`\`

| 层 | Django 术语 | 职责 |
|----|-------------|------|
| M — Model | \`models.py\` | 数据库结构（ORM） |
| T — Template | \`templates/\` | HTML 页面 |
| V — View | \`views.py\` | 逻辑处理 |

### 什么时候选 Django？

- 需要**后台管理系统**（Admin 十分钟搞定）
- 需要**用户注册/登录**系统
- 项目规模大，**多人协作**
- 需要和数据库**深度交互**
- 数据驱动的**内容型网站**（博客、新闻、商城）

### 什么时候选 Flask？

- 只做 **API 服务**
- 项目小，**灵活**最重要
- 想自己**选择每个组件**
- 学习和理解 Web 底层原理

> 🎯 一句话：Flask 是乐高积木（自己拼），Django 是精装房（拎包入住）。`,
      starterCode: `# Django 安装
# pip install django

# 检查版本
import django
print(f"Django 版本：{django.VERSION[0]}.{django.VERSION[1]}.{django.VERSION[2]}")
print("Django 已就绪！")

# 对比 Flask
print("\\nFlask = 微框架（自己拼积木）")
print("Django = 全栈框架（拎包入住）")
print("\\n选 Django 的理由：Admin后台、ORM、用户系统、表单——全都自带！")`,
      expectedOutput: `Django 版本：5.x.x
Django 已就绪！

Flask = 微框架（自己拼积木）
Django = 全栈框架（拎包入住）

选 Django 的理由：Admin后台、ORM、用户系统、表单——全都自带！`,
      hint: '不确定选哪个？小项目/API 用 Flask，大项目/内容网站用 Django。两个都学最好——它们底层都是 WSGI，原理相通。',
      validation: djangoVersionValidation,
    },
    {
      id: '24.2',
      kind: 'demo',
      chapterId: 'ch24',
      title: '创建项目 + Admin 后台 — 10 分钟建站',
      content: `## 🚀 创建 Django 项目 + Admin 后台

### 第一步：创建项目

\`\`\`bash
# 创建项目
django-admin startproject mysite
cd mysite

# 项目结构
mysite/
├── manage.py          # 命令行入口
├── mysite/
│   ├── __init__.py
│   ├── settings.py    # 配置（数据库、语言、时区）
│   ├── urls.py        # 总路由
│   └── wsgi.py
\`\`\`

### 第二步：创建应用

Django 项目由多个 **app** 组成（每个 app 是一个功能模块）：

\`\`\`bash
python manage.py startapp blog   # 创建一个博客应用
\`\`\`

### 第三步：注册应用

在 \`settings.py\` 的 \`INSTALLED_APPS\` 中添加：

\`\`\`python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    ...
    'blog',  # 👈 加上你的应用
]
\`\`\`

### 第四步：启动服务器

\`\`\`bash
python manage.py runserver
# 打开 http://127.0.0.1:8000
\`\`\`

### Admin 后台（Django 的杀手锏）

\`\`\`bash
# 创建管理员账户
python manage.py createsuperuser
# 用户名: admin
# 密码: 自定义

# 访问 http://127.0.0.1:8000/admin
\`\`\`

Admin 后台自动给你的 Model 生成增删改查界面——一行前端代码都不用写！

### 常用 manage.py 命令

| 命令 | 作用 |
|------|------|
| \`runserver\` | 启动开发服务器 |
| \`startapp\` | 创建新应用 |
| \`makemigrations\` | 生成数据库迁移文件 |
| \`migrate\` | 执行数据库迁移 |
| \`createsuperuser\` | 创建管理员 |
| \`shell\` | Django 交互式 Shell |

> 🔥 Django Admin 是 Django 最亮的招牌——给客户演示的时候，后台管理系统已经做好了。`,
      starterCode: `# 这是在命令行中执行的流程，这里展示核心代码文件

# manage.py — Django 项目的命令行入口（自动生成）
import os
import sys

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')
    # ... Django 自动处理命令行

# 你只需要在终端运行：
# django-admin startproject mysite        # 创建项目
# cd mysite
# python manage.py startapp blog          # 创建应用
# python manage.py migrate                # 初始化数据库
# python manage.py createsuperuser        # 创建管理员
# python manage.py runserver              # 启动服务器

print("🚀 Django 项目创建流程（终端命令）：")
print("1. django-admin startproject mysite")
print("2. cd mysite && python manage.py startapp blog")
print("3. python manage.py migrate")
print("4. python manage.py createsuperuser")
print("5. python manage.py runserver")
print("\\n然后访问 http://127.0.0.1:8000/admin 进入后台！")`,
      expectedOutput: `🚀 Django 项目创建流程（终端命令）：
1. django-admin startproject mysite
2. cd mysite && python manage.py startapp blog
3. python manage.py migrate
4. python manage.py createsuperuser
5. python manage.py runserver

然后访问 http://127.0.0.1:8000/admin 进入后台！`,
      hint: '开发服务器 `runserver` 会自动重载——修改代码保存后自动重启，不需要手动重启。生产环境不要用它，要用 Gunicorn！',
    },
    {
      id: '24.3',
      kind: 'demo',
      chapterId: 'ch24',
      title: 'Model + ORM — 不需要写 SQL',
      content: `## 🗄️ Django ORM：用 Python 操作数据库

Django 的 ORM（Object-Relational Mapping，对象关系映射）让你**完全不用写 SQL**，用 Python 代码操作数据库。

### 定义 Model

在 \`blog/models.py\` 中：

\`\`\`python
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)       # 标题（短文本）
    content = models.TextField()                    # 内容（长文本）
    created_at = models.DateTimeField(auto_now_add=True)  # 创建时间
    updated_at = models.DateTimeField(auto_now=True)      # 更新时间
    is_published = models.BooleanField(default=False)     # 是否发布

    def __str__(self):
        return self.title
\`\`\`

### 常用字段类型

| 字段 | 对应数据库 | 用途 |
|------|-----------|------|
| \`CharField\` | VARCHAR | 短文本（需指定 max_length） |
| \`TextField\` | TEXT | 长文本 |
| \`IntegerField\` | INTEGER | 整数 |
| \`FloatField\` | FLOAT | 浮点数 |
| \`BooleanField\` | BOOLEAN | 布尔值 |
| \`DateTimeField\` | DATETIME | 日期时间 |
| \`EmailField\` | VARCHAR | 邮箱 |
| \`ForeignKey\` | FOREIGN KEY | 外键（关联其他表） |

### 迁移到数据库

\`\`\`bash
python manage.py makemigrations   # 生成迁移文件（记录 Model 变更）
python manage.py migrate          # 执行迁移（同步到数据库）
\`\`\`

### CRUD 操作（完全不用 SQL！）

\`\`\`python
# Create — 创建
Post.objects.create(title="你好", content="世界")

# Read — 读取
Post.objects.all()                    # 全部
Post.objects.filter(is_published=True)  # 筛选
Post.objects.get(id=1)                # 单个

# Update — 更新
post = Post.objects.get(id=1)
post.title = "新标题"
post.save()

# Delete — 删除
Post.objects.filter(id=1).delete()
\`\`\`

> 🎯 ORM 的好处：Python 代码自动翻译成 SQL，安全防注入，切换数据库（SQLite→PostgreSQL→MySQL）几乎不用改代码。`,
      starterCode: `# blog/models.py — Django Model 定义示例

from django.db import models

class Post(models.Model):
    """博客文章"""
    title = models.CharField(max_length=200, verbose_name="标题")
    content = models.TextField(verbose_name="内容")
    author = models.CharField(max_length=100, verbose_name="作者")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")
    views = models.IntegerField(default=0, verbose_name="阅读量")
    is_published = models.BooleanField(default=True, verbose_name="是否发布")

    class Meta:
        ordering = ['-created_at']  # 按创建时间倒序
        verbose_name = "文章"
        verbose_name_plural = "文章"

    def __str__(self):
        return self.title

# CRUD 演示（在 Django shell 或 views 中使用）
# python manage.py shell
print("\\n📝 Django ORM CRUD 演示：")
print("Create: Post.objects.create(title='标题', content='内容', author='我')")
print("Read:   Post.objects.all()")
print("Read:   Post.objects.filter(is_published=True)")
print("Update: post.save()")
print("Delete: Post.objects.filter(id=1).delete()")
print("\\n✅ 全程零 SQL！")`,
      expectedOutput: `📝 Django ORM CRUD 演示：
Create: Post.objects.create(title='标题', content='内容', author='我')
Read:   Post.objects.all()
Read:   Post.objects.filter(is_published=True)
Update: post.save()
Delete: Post.objects.filter(id=1).delete()

✅ 全程零 SQL！`,
      hint: '`verbose_name` 会在 Admin 后台显示为中文标签，`class Meta` 里的 `ordering` 设置默认排序。',
    },
    {
      id: '24.4',
      kind: 'demo',
      chapterId: 'ch24',
      title: 'View + Template — MTV 模式',
      content: `## 🎨 View + Template：Django 的 MTV 模式实战

### View（视图）— 处理请求

在 \`blog/views.py\` 中：

\`\`\`python
from django.shortcuts import render, get_object_or_404
from .models import Post

def post_list(request):
    """文章列表页"""
    posts = Post.objects.filter(is_published=True)
    return render(request, 'blog/list.html', {'posts': posts})

def post_detail(request, pk):
    """文章详情页"""
    post = get_object_or_404(Post, pk=pk)
    post.views += 1
    post.save()
    return render(request, 'blog/detail.html', {'post': post})
\`\`\`

### URL 路由

在 \`blog/urls.py\` 中：

\`\`\`python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_list, name='post_list'),
    path('post/<int:pk>/', views.post_detail, name='post_detail'),
]
\`\`\`

### Template（模板）— Django 模板语言

\`\`\`html
<!-- blog/templates/blog/list.html -->
{% for post in posts %}
  <h2><a href="{% url 'post_detail' post.pk %}">{{ post.title }}</a></h2>
  <p>{{ post.content|truncatewords:30 }}</p>
  <small>{{ post.created_at|date:"Y-m-d" }} | 👁 {{ post.views }}</small>
{% empty %}
  <p>暂无文章</p>
{% endfor %}
\`\`\`

### Django 模板常用语法

| 语法 | 作用 |
|------|------|
| \`{{ 变量 }}\` | 输出变量 |
| \`{% if %}\` | 条件判断 |
| \`{% for %}\` | 循环 |
| \`{% url 'name' %}\` | 反向解析 URL |
| \`{{ value\|filter }}\` | 过滤器（date、truncate等） |
| \`{% block %}\` | 模板继承 |

### MTV 数据流回顾

\`\`\`
用户访问 /post/1/
  → urls.py 匹配到 post_detail 视图
  → views.py 从 Model 取数据
  → 把数据传给 Template
  → Template 渲染 HTML 返回给用户
\`\`\`

> 🎯 MTV = Model（数据）+ Template（展示）+ View（逻辑）——各司其职，清晰分离。`,
      starterCode: `# blog/views.py
from django.shortcuts import render, get_object_or_404
from .models import Post

def post_list(request):
    """文章列表"""
    posts = Post.objects.filter(is_published=True).order_by('-created_at')
    return render(request, 'blog/list.html', {'posts': posts})

def post_detail(request, pk):
    """文章详情"""
    post = get_object_or_404(Post, pk=pk)
    return render(request, 'blog/detail.html', {'post': post})

# blog/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_list, name='post_list'),
    path('post/<int:pk>/', views.post_detail, name='post_detail'),
]

# blog/templates/blog/list.html  （模板文件）
print("🎨 Django MTV 模式文件结构：")
print("models.py   → 定义数据结构（Model层）")
print("views.py    → 处理请求逻辑（View层）")
print("urls.py     → URL路由映射")
print("templates/  → HTML模板（Template层）")
print("\\n✅ MTV三件套，各司其职！")`,
      expectedOutput: `🎨 Django MTV 模式文件结构：
models.py   → 定义数据结构（Model层）
views.py    → 处理请求逻辑（View层）
urls.py     → URL路由映射
templates/  → HTML模板（Template层）

✅ MTV三件套，各司其职！`,
      hint: '`get_object_or_404()` 比 `Post.objects.get()` 更好——找不到时自动返回 404 页面，而不是服务器 500 错误。',
    },
    {
      id: '24.5',
      kind: 'demo',
      chapterId: 'ch24',
      title: '用户认证 + 表单 — 自带登录系统',
      content: `## 🔐 用户认证 + 表单：Django 自带登录系统

Django 的 \`django.contrib.auth\` 提供了完整的用户认证系统——注册、登录、登出、权限管理，开箱即用。

### 内置的认证视图

你甚至不需要写登录逻辑！Django 自带：

\`\`\`python
from django.contrib.auth import views as auth_views

urlpatterns = [
    # 登录
    path('login/', auth_views.LoginView.as_view(
        template_name='registration/login.html'
    ), name='login'),
    # 登出
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
]
\`\`\`

### 在视图中使用认证

\`\`\`python
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login

@login_required  # 👈 这个装饰器要求必须登录才能访问
def create_post(request):
    # 只有登录用户才能创建文章
    ...

# 手动登录
user = authenticate(request, username='admin', password='xxx')
if user is not None:
    login(request, user)
\`\`\`

### Django Form（表单）

Django 有自己的表单系统，和 Model 深度集成：

\`\`\`python
from django import forms
from .models import Post

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content', 'is_published']
\`\`\`

### 表单处理视图

\`\`\`python
def create_post(request):
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user  # 自动填作者
            post.save()
            return redirect('post_list')
    else:
        form = PostForm()
    return render(request, 'blog/create.html', {'form': form})
\`\`\`

### Django 自带的认证功能清单

| 功能 | 说明 |
|------|------|
| 用户注册 | 需自己写或用 django-allauth |
| 登录/登出 | 自带视图 |
| 密码修改 | 自带视图 |
| 密码重置 | 自带视图（需配置邮件） |
| 权限管理 | \`is_staff\`, \`is_superuser\`, \`groups\` |
| 登录保护 | \`@login_required\` 装饰器 |

> 🔐 Django 认证系统是企业级项目敢用 Django 的核心原因——安全、完整、久经考验。`,
      starterCode: `# urls.py — 认证路由配置
from django.urls import path
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('login/', auth_views.LoginView.as_view(
        template_name='registration/login.html'
    ), name='login'),
    path('logout/', auth_views.LogoutView.as_view(
        next_page='/'  # 登出后跳转到首页
    ), name='logout'),
]

# 使用 @login_required 保护视图
from django.contrib.auth.decorators import login_required

@login_required
def secret_page(request):
    return "只有登录用户能看到！"

print("🔐 Django 认证系统自带功能：")
print("✅ 登录视图 — LoginView")
print("✅ 登出视图 — LogoutView")
print("✅ 密码修改 — PasswordChangeView")
print("✅ 密码重置 — PasswordResetView")
print("✅ 登录保护 — @login_required")
print("\\n💡 <form> 标签在模板中写，Django 自动处理 CSRF 保护！")`,
      expectedOutput: `🔐 Django 认证系统自带功能：
✅ 登录视图 — LoginView
✅ 登出视图 — LogoutView
✅ 密码修改 — PasswordChangeView
✅ 密码重置 — PasswordResetView
✅ 登录保护 — @login_required

💡 <form> 标签在模板中写，Django 自动处理 CSRF 保护！`,
      hint: '模板里的表单一定要加 `{% csrf_token %}`，否则提交时会报 403 Forbidden。这是 Django 的安全机制。',
    },
    {
      id: '24.6',
      kind: 'demo',
      chapterId: 'ch24',
      title: 'Django 中间件与信号 — 解耦利器',
      content: `## 🔗 Django 中间件与信号：请求管道的秘密

Django 有两把"瑞士军刀"用于解耦：**中间件（Middleware）** 处理请求/响应管道，**信号（Signals）** 在特定事件发生时触发动作。

### 中间件：请求的"安检通道"

每个 HTTP 请求进入 Django 后，会依次经过一系列中间件：

\`\`\`
请求 → [中间件1] → [中间件2] → ... → View → ... → [中间件2] → [中间件1] → 响应
\`\`\`

Django 自带中间件在 \`settings.py\` 中：

\`\`\`python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    ...
]
\`\`\`

### 自定义中间件

写一个记录每个请求耗时的中间件：

\`\`\`python
import time

class TimingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start = time.time()
        response = self.get_response(request)  # 调用下一个中间件/视图
        duration = time.time() - start
        print(f"{request.path} 耗时 {duration:.3f}s")
        return response
\`\`\`

### 信号（Signals）：事件的"广播系统"

当某个事件发生时（如保存 Model），信号通知所有"监听者"自动执行代码：

\`\`\`python
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Post

@receiver(post_save, sender=Post)
def notify_new_post(sender, instance, created, **kwargs):
    if created:
        print(f"新文章发布：{instance.title}")
        # 可以发邮件、清缓存、写日志等
\`\`\`

### 常用内置信号

| 信号 | 触发时机 |
|------|----------|
| \`pre_save\` / \`post_save\` | Model 保存前/后 |
| \`pre_delete\` / \`post_delete\` | Model 删除前/后 |
| \`request_started\` | 请求开始时 |
| \`request_finished\` | 请求结束时 |
| \`user_logged_in\` | 用户登录时 |

### 中间件 vs 信号

| 对比 | 中间件 | 信号 |
|------|--------|------|
| 作用域 | 全局请求/响应 | 特定事件（Model变更、登录等） |
| 粒度 | 粗（每个请求） | 细（特定操作） |
| 用途 | 日志、安全、压缩 | 缓存清理、通知、审计 |
| 开销 | 每个请求都执行 | 只在事件触发时执行 |

> 🔗 中间件管管道，信号管事件——两者结合让你在不改动核心代码的前提下扩展功能，真正做到"对扩展开放，对修改关闭"。`,
      starterCode: `# middleware.py — 自定义中间件示例
import time

class TimingMiddleware:
    """记录每个请求的处理时间"""
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start = time.time()
        response = self.get_response(request)
        duration = time.time() - start
        response['X-Process-Time'] = str(duration)
        return response

# signals.py — 信号示例
from django.db.models.signals import post_save
from django.dispatch import receiver

# 假设有一个 Post Model
# @receiver(post_save, sender=Post)
# def on_post_saved(sender, instance, created, **kwargs):
#     action = "创建" if created else "更新"
#     print(f"文章{action}：{instance.title}")

# settings.py 中注册自定义中间件：
# MIDDLEWARE = [
#     ...
#     'myapp.middleware.TimingMiddleware',  # 放在最后
# ]

print("🔗 Django 中间件与信号：")
print("\\n📡 中间件 — 请求管道：")
print("  每个请求依次经过所有中间件")
print("  用途：日志记录、安全检查、GZip压缩")
print("\\n📢 信号 — 事件广播：")
print("  post_save → Model 保存后触发")
print("  user_logged_in → 用户登录时触发")
print("  用途：发邮件通知、清缓存、审计日志")
print("\\n💡 中间件操作请求/响应；信号监听特定事件——各司其职，绝不耦合！")`,
      expectedOutput: `🔗 Django 中间件与信号：

📡 中间件 — 请求管道：
  每个请求依次经过所有中间件
  用途：日志记录、安全检查、GZip压缩

📢 信号 — 事件广播：
  post_save → Model 保存后触发
  user_logged_in → 用户登录时触发
  用途：发邮件通知、清缓存、审计日志

💡 中间件操作请求/响应；信号监听特定事件——各司其职，绝不耦合！`,
      hint: '自定义中间件要加在 `MIDDLEWARE` 列表末尾（`AuthenticationMiddleware` 之后）。信号接收器函数通常放在 `signals.py` 中，在 `apps.py` 的 `ready()` 里导入。',
    },
  ],
};

const ch25: Chapter = {
  id: 'ch25',
  title: 'FastAPI 异步 API',
  description: '类型驱动、自动文档、async/await',
  sections: [
    {
      id: '25.1',
      kind: 'demo',
      chapterId: 'ch25',
      title: 'FastAPI 是什么 — 比 Flask 快 5 倍',
      content: `## ⚡ FastAPI：Python 最快的 Web 框架

FastAPI 是现代 Python Web 框架的新星。先安装：

\`\`\`bash
pip install fastapi uvicorn
\`\`\`

### FastAPI vs Flask

| 特性 | Flask | FastAPI |
|------|-------|---------|
| 性能 | 普通 | 比 Flask 快 5-10 倍（接近 Node/Go） |
| 异步 | 需插件 | **原生 async/await** |
| API 文档 | 需手动写 | **自动生成** Swagger UI |
| 类型检查 | 手动验证 | **Pydantic 自动验证** |
| 学习曲线 | 低 | 中（需要懂类型提示） |
| 适合 | 传统网站 | **API 服务**、微服务 |

### FastAPI 的核心优势

1. **快**：底层基于 Starlette（异步）和 Pydantic（数据验证），性能接近 Go/Node.js
2. **自动文档**：写了类型提示，自动生成 Swagger UI 和 ReDoc
3. **类型安全**：请求参数、响应数据都有类型检查
4. **编辑器友好**：VSCode/PyCharm 自动补全和错误提示

### 最小 FastAPI 应用

\`\`\`python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}
\`\`\`

### 启动方式

\`\`\`bash
# 开发模式（自动重载）
uvicorn main:app --reload

# 生产模式
uvicorn main:app --host 0.0.0.0 --port 8000
\`\`\`

### 自动文档地址

启动后访问：
- **Swagger UI**：\`http://127.0.0.1:8000/docs\`（可以交互测试！）
- **ReDoc**：\`http://127.0.0.1:8000/redoc\`

> ⚡ FastAPI 是写 API 的最佳选择——速度快、文档自动生成、编辑器提示无敌。`,
      starterCode: `# FastAPI 最小应用
# 安装：pip install fastapi uvicorn
# 启动：uvicorn main:app --reload

from fastapi import FastAPI

app = FastAPI(
    title="我的第一个 FastAPI",
    description="自动生成 API 文档的 Web 框架",
    version="1.0.0"
)

@app.get("/")
def home():
    return {"message": "Hello, FastAPI! 🚀"}

@app.get("/hello/{name}")
def say_hello(name: str):
    return {"greeting": f"你好，{name}！", "length": len(name)}

# 在终端中运行：
# uvicorn main:app --reload
# 然后访问 http://127.0.0.1:8000/docs 看自动生成的文档！
print("⚡ FastAPI 启动命令：uvicorn main:app --reload")
print("📖 文档地址：http://127.0.0.1:8000/docs")
print("📖 ReDoc：http://127.0.0.1:8000/redoc")`,
      expectedOutput: `⚡ FastAPI 启动命令：uvicorn main:app --reload
📖 文档地址：http://127.0.0.1:8000/docs
📖 ReDoc：http://127.0.0.1:8000/redoc`,
      hint: '`uvicorn` 是 ASGI 服务器（异步版 Gunicorn）；`--reload` 让代码修改后自动重启，开发必备。',
    },
    {
      id: '25.2',
      kind: 'demo',
      chapterId: 'ch25',
      title: '类型提示驱动 — 自动生成 API 文档',
      content: `## 📝 类型提示驱动：用 Python 类型定义 API

FastAPI 的核心魔法：**你写类型提示，它自动生成验证 + 文档**。

### Pydantic Model（数据模型）

\`\`\`python
from pydantic import BaseModel
from typing import Optional

class Item(BaseModel):
    name: str                          # 必填，字符串
    price: float                       # 必填，浮点数
    description: Optional[str] = None  # 可选，字符串（默认 None）
    quantity: int = 1                  # 可选，整数（默认 1）
\`\`\`

### 路由参数类型

\`\`\`python
@app.get("/items/{item_id}")
def get_item(
    item_id: int,                      # 路径参数（自动转 int）
    q: str = None,                     # 查询参数（可选）
    page: int = 1                      # 查询参数（默认 1）
):
    return {"item_id": item_id, "q": q, "page": page}
\`\`\`

### POST + 请求体

\`\`\`python
@app.post("/items/")
def create_item(item: Item):           # 自动从 JSON 解析成 Item
    return {"item": item, "total": item.price * item.quantity}
\`\`\`

### FastAPI 自动做的事情

当你定义了这些类型后，FastAPI 自动提供：

| 功能 | 说明 |
|------|------|
| **数据验证** | 类型不对自动返回 422 错误 |
| **数据转换** | \`"123"\` 自动转成 \`123\` |
| **API 文档** | Swagger UI 自动列出所有接口 |
| **JSON Schema** | 自动生成数据模型定义 |
| **编辑器提示** | VSCode 完整自动补全 |

### Pydantic 常用类型

\`\`\`python
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class User(BaseModel):
    name: str = Field(..., min_length=1, max_length=50)  # 带约束
    email: str = Field(..., pattern=r"^[\\w.-]+@[\\w.-]+\\.\\w+$")
    age: int = Field(ge=0, le=150)             # >= 0, <= 150
    tags: List[str] = []                        # 字符串列表
    created_at: datetime = Field(default_factory=datetime.now)
\`\`\`

> 🎯 类型提示 = 文档 + 验证 + 编辑器智能提示——一次定义，三重收益。`,
      starterCode: `from typing import Optional
from pydantic import BaseModel, Field

# 定义数据模型
class Item(BaseModel):
    name: str = Field(..., description="商品名称", min_length=1)
    price: float = Field(..., description="价格", gt=0)  # > 0
    quantity: int = Field(default=1, description="数量", ge=1)
    description: Optional[str] = Field(default=None, description="描述")

    # 在 FastAPI 中这样用：
    # @app.post("/items/")
    # def create_item(item: Item):
    #     return {"total": item.price * item.quantity}

print("📝 Pydantic Model 演示：")

# 创建合法数据
item1 = Item(name="Python书", price=59.9, quantity=2)
print(f"✅ 合法数据：{item1.model_dump()}")

# 创建带默认值的数据
item2 = Item(name="鼠标", price=29.9)
print(f"✅ 默认值：{item2.model_dump()}")

# 非法数据会报错
try:
    item3 = Item(name="", price=-10)
except Exception as e:
    print(f"❌ 验证失败：数据不合法（已自动拦截）")

print("\\n💡 FastAPI 会在请求到达时就自动验证，不合法的请求直接返回 422！")`,
      expectedOutput: `📝 Pydantic Model 演示：
✅ 合法数据：{'name': 'Python书', 'price': 59.9, 'quantity': 2, 'description': None}
✅ 默认值：{'name': '鼠标', 'price': 29.9, 'quantity': 1, 'description': None}
❌ 验证失败：数据不合法（已自动拦截）

💡 FastAPI 会在请求到达时就自动验证，不合法的请求直接返回 422！`,
      hint: '`Field(...)` 的三个点表示"必填"；`gt`=greater than，`ge`=greater or equal，`lt`=less than，`le`=less or equal。',
    },
    {
      id: '25.3',
      kind: 'demo',
      chapterId: 'ch25',
      title: 'async/await — Python 的异步编程',
      content: `## ⏳ async/await：Python 的异步编程

### 为什么需要异步？

想象一个 API 要去数据库取数据：

- **同步**：等着，啥也不干，100ms 后返回 → 每秒处理 10 个请求
- **异步**：等待时去处理其他请求 → 每秒处理 1000+ 个请求

### 核心概念

| 概念 | 说明 |
|------|------|
| \`async def\` | 定义一个**协程函数**（可以暂停的函数） |
| \`await\` | "在这里暂停，等这个操作完成再继续" |
| \`async with\` | 异步上下文管理器（如数据库连接） |
| \`asyncio\` | Python 标准库，异步的"调度器" |

### 语法对比

\`\`\`python
# 同步版本
def get_data():
    data = requests.get("https://api.example.com")  # 阻塞！等着...
    return data.json()

# 异步版本
async def get_data():
    async with httpx.AsyncClient() as client:
        resp = await client.get("https://api.example.com")  # 不阻塞！
        return resp.json()
\`\`\`

### FastAPI 中的异步

FastAPI 自动检测函数是否是 \`async def\`：

\`\`\`python
# 自动在线程池中运行（不会阻塞事件循环）
@app.get("/sync")
def sync_endpoint():          # 普通 def
    return slow_database_query()

# 原生异步（不阻塞事件循环）
@app.get("/async")
async def async_endpoint():   # async def
    result = await async_database_query()
    return result
\`\`\`

### 什么时候用 async？

| 场景 | 推荐 |
|------|------|
| 数据库查询 | \`async\` — 等待 I/O |
| 调用外部 API | \`async\` — 等待网络 |
| 文件读写 | \`async\` — 等待磁盘 |
| 纯计算（排序等） | \`def\` — 没有等待 |
| 简单逻辑 | \`def\` 够用 |

### async 三件套

\`\`\`python
# 1. 数据库 — 用 async 驱动
# pip install databases[sqlite] 或 asyncpg (PostgreSQL)

# 2. HTTP 客户端 — 用 httpx
# pip install httpx

# 3. 测试 — 用 pytest + httpx.AsyncClient
\`\`\`

> ⚡ 异步让 Python 从"一次只能做一件事"变成"同时处理上千件事"——对 I/O 密集型应用（API、爬虫），性能提升 10 倍+。`,
      starterCode: `import asyncio
import time

# 同步版本
def sync_task(name, delay):
    time.sleep(delay)  # 阻塞整个线程！
    return f"{name} 完成（同步）"

def run_sync():
    start = time.time()
    results = [sync_task("任务A", 1), sync_task("任务B", 1), sync_task("任务C", 1)]
    print(f"同步耗时：{time.time() - start:.1f}s")
    for r in results:
        print(r)

# 异步版本
async def async_task(name, delay):
    await asyncio.sleep(delay)  # 不阻塞，让出控制权
    return f"{name} 完成（异步）"

async def run_async():
    start = time.time()
    results = await asyncio.gather(
        async_task("任务A", 1),
        async_task("任务B", 1),
        async_task("任务C", 1)
    )
    print(f"异步耗时：{time.time() - start:.1f}s")
    for r in results:
        print(r)

# 运行
print("⏳ 同步执行：")
run_sync()
print("\\n⚡ 异步执行：")
asyncio.run(run_async())
print("\\n💡 同步 3s（串行），异步 1s（并行）—— 3倍差距！")`,
      expectedOutput: `⏳ 同步执行：
同步耗时：3.0s
任务A 完成（同步）
任务B 完成（同步）
任务C 完成（同步）

⚡ 异步执行：
异步耗时：1.0s
任务A 完成（异步）
任务B 完成（异步）
任务C 完成（异步）

💡 同步 3s（串行），异步 1s（并行）—— 3倍差距！`,
      hint: '`asyncio.gather()` 同时启动多个协程，等待所有完成。`asyncio.sleep()` 是异步的睡眠，不阻塞事件循环。',
      validation: asyncAwaitTimingValidation,
    },
  ],
};

const ch26: Chapter = {
  id: 'ch26',
  title: '进阶爬虫：Scrapy 框架',
  description: '企业级爬虫框架、Spider、Pipeline',
  sections: [
    {
      id: '26.1',
      kind: 'demo',
      chapterId: 'ch26',
      title: 'Scrapy 是什么 — 企业级爬虫框架',
      content: `## 🕷️ Scrapy：企业级爬虫框架

你已经会用 Requests + BeautifulSoup 写爬虫了。但当你要爬**整个网站**时，Scrapy 是更好的选择。

\`\`\`bash
pip install scrapy
\`\`\`

### Requests+BS4 vs Scrapy

| 特性 | Requests + BS4 | Scrapy |
|------|---------------|--------|
| 速度 | 慢（串行） | 快（异步并发） |
| 架构 | 手写 | 框架化（Spider/Pipeline） |
| 去重 | 手动维护 set | 自动去重 |
| 失败重试 | 手动 try/except | 自动重试 |
| 并发控制 | 手动线程/协程 | 内置（默认 16 并发） |
| 数据存储 | 手动写文件 | Pipeline 自动处理 |
| 适合 | 单页 / 少量页面 | **整个网站 / 全站爬取** |

### Scrapy 架构

\`\`\`
┌──────────────────────────────────────────┐
│  Scrapy Engine（引擎）                     │
│                                          │
│  Spider ─→ Engine ─→ Scheduler（调度器）    │
│    ↑                    ↓                │
│    │              Downloader（下载器）      │
│    │                    ↓                │
│    └────── Item Pipeline（数据管道）        │
│              ↓                           │
│          JSON / CSV / 数据库              │
└──────────────────────────────────────────┘
\`\`\`

### Scrapy 核心组件

| 组件 | 职责 | 你写什么 |
|------|------|----------|
| **Spider** | 定义怎么爬、怎么解析 | \`parse()\` 方法 |
| **Item** | 定义数据结构 | 类似 Django Model |
| **Pipeline** | 处理/存储爬到的数据 | \`process_item()\` |
| **Middleware** | 请求/响应中间处理 | 加代理、修改请求头 |
| **Settings** | 全局配置 | 并发数、延迟等 |

### 创建 Scrapy 项目

\`\`\`bash
scrapy startproject myproject
cd myproject
scrapy genspider quotes quotes.toscrape.com
scrapy crawl quotes -o quotes.json  # 直接输出 JSON！
\`\`\`

> 🕷️ Scrapy 是爬虫的"工业标准"——当你需要爬取百万级页面时，它是唯一的选择。`,
      starterCode: `# Scrapy 项目创建流程
# pip install scrapy

print("🕷️ Scrapy 企业级爬虫框架")
print("\\n📂 创建项目：")
print("  scrapy startproject myproject")
print("  cd myproject")
print("\\n🕸️ 创建爬虫：")
print("  scrapy genspider quotes quotes.toscrape.com")
print("\\n🚀 运行爬虫：")
print("  scrapy crawl quotes")
print("\\n📦 输出 JSON：")
print("  scrapy crawl quotes -o quotes.json")
print("\\n项目结构：")
print("  myproject/")
print("  ├── scrapy.cfg          # 部署配置")
print("  ├── myproject/")
print("  │   ├── spiders/        # 爬虫代码")
print("  │   ├── items.py        # 数据结构")
print("  │   ├── pipelines.py    # 数据处理管道")
print("  │   ├── middlewares.py  # 中间件")
print("  │   └── settings.py     # 全局设置")
print("\\n⚡ 异步引擎：默认 16 并发，自带去重、重试、限速！")`,
      expectedOutput: `🕷️ Scrapy 企业级爬虫框架

📂 创建项目：
  scrapy startproject myproject
  cd myproject

🕸️ 创建爬虫：
  scrapy genspider quotes quotes.toscrape.com

🚀 运行爬虫：
  scrapy crawl quotes

📦 输出 JSON：
  scrapy crawl quotes -o quotes.json

项目结构：
  myproject/
  ├── scrapy.cfg          # 部署配置
  ├── myproject/
  │   ├── spiders/        # 爬虫代码
  │   ├── items.py        # 数据结构
  │   ├── pipelines.py    # 数据处理管道
  │   ├── middlewares.py  # 中间件
  │   └── settings.py     # 全局设置

⚡ 异步引擎：默认 16 并发，自带去重、重试、限速！`,
      hint: 'Scrapy 默认遵守 robots.txt。测试时可以在 `settings.py` 中设置 `ROBOTSTXT_OBEY = False`。',
    },
    {
      id: '26.2',
      kind: 'demo',
      chapterId: 'ch26',
      title: '创建 Spider — 爬取整个网站',
      content: `## 🕸️ 创建 Spider：爬取整个网站

### Spider 的结构

每个 Spider 是一个类，继承 \`scrapy.Spider\`：

\`\`\`python
import scrapy

class QuotesSpider(scrapy.Spider):
    name = "quotes"                    # 爬虫名（唯一标识）
    start_urls = ['https://...']       # 起始 URL 列表

    def parse(self, response):
        # response 是下载好的页面
        # 在这里用 CSS / XPath 提取数据
        for quote in response.css('div.quote'):
            yield {
                'text': quote.css('span.text::text').get(),
                'author': quote.css('small.author::text').get(),
            }

        # 翻页：找到"下一页"链接，继续爬
        next_page = response.css('li.next a::attr(href)').get()
        if next_page:
            yield response.follow(next_page, self.parse)
\`\`\`

### CSS 选择器（Scrapy 风格）

\`\`\`python
response.css('div.quote span.text::text').get()
#           选择器                     伪元素   取第一个

response.css('div.quote span.text::text').getall()
#                                       取所有（返回列表）

response.css('a::attr(href)').get()
#             取属性值
\`\`\`

### XPath（备选方案，更强大）

\`\`\`python
response.xpath('//div[@class="quote"]/span[@class="text"]/text()').get()
\`\`\`

### yield vs return

\`\`\`python
def parse(self, response):
    # ✅ yield — 生成器，Scrapy 异步处理每条数据
    for item in items:
        yield item  # 一条一条流出

    # ❌ return — 返回列表，Scrapy 要等全部处理完
    return items
\`\`\`

### Scrapy 自动处理的事情

- ✅ 请求去重（同一个 URL 不会爬两次）
- ✅ 并发控制（默认 16 个请求同时发出）
- ✅ 自动限速（不会把对方服务器打挂）
- ✅ 失败重试（网络抖动自动重试）
- ✅ Cookie / Session 管理

> 🎯 Spider 只需要关注"怎么提取数据"和"怎么翻页"——其他 Scrapy 全包了。`,
      starterCode: `# spiders/quotes_spider.py — 完整爬虫示例
import scrapy

class QuotesSpider(scrapy.Spider):
    name = "quotes"
    start_urls = ['https://quotes.toscrape.com/']

    def parse(self, response):
        # 提取每个名言块
        for quote in response.css('div.quote'):
            yield {
                'text': quote.css('span.text::text').get(),
                'author': quote.css('small.author::text').get(),
                'tags': quote.css('div.tags a.tag::text').getall(),
            }

        # 翻页
        next_page = response.css('li.next a::attr(href)').get()
        if next_page is not None:
            yield response.follow(next_page, callback=self.parse)

# 运行命令：
# scrapy crawl quotes -o quotes.json

print("🕸️ QuotesSpider 结构说明：")
print("1. name = 'quotes'          — 爬虫唯一标识")
print("2. start_urls               — 起始 URL")
print("3. parse(response)          — 解析函数")
print("4. yield dict               — 输出数据")
print("5. response.follow(url)     — 跟踪链接（翻页）")
print("\\n⚡ Scrapy 自动处理：并发、去重、重试、限速！")`,
      expectedOutput: `🕸️ QuotesSpider 结构说明：
1. name = 'quotes'          — 爬虫唯一标识
2. start_urls               — 起始 URL
3. parse(response)          — 解析函数
4. yield dict               — 输出数据
5. response.follow(url)     — 跟踪链接（翻页）

⚡ Scrapy 自动处理：并发、去重、重试、限速！`,
      hint: '`.get()` 返回第一个匹配（或 None），`.getall()` 返回所有匹配的列表。`.attrib["href"]` 也能取属性，但 `::attr(href)` 更推荐。',
    },
    {
      id: '26.3',
      kind: 'demo',
      chapterId: 'ch26',
      title: 'Pipeline — 自动保存到数据库',
      content: `## 🔧 Pipeline：自动处理爬取的数据

Pipeline 是 Scrapy 的数据处理流水线——数据从 Spider 出来后，依次经过每个 Pipeline 处理。

### 什么是 Pipeline？

\`\`\`
Spider yield 数据
  → Pipeline 1: 清洗数据（去空格、格式化）
  → Pipeline 2: 去重（按某个字段）
  → Pipeline 3: 存入数据库（MySQL / MongoDB / SQLite）
\`\`\`

### 定义 Item（数据结构）

在 \`items.py\` 中：

\`\`\`python
import scrapy

class QuoteItem(scrapy.Item):
    text = scrapy.Field()
    author = scrapy.Field()
    tags = scrapy.Field()
\`\`\`

### 写 Pipeline

在 \`pipelines.py\` 中：

\`\`\`python
import json
import pymongo

class JsonWriterPipeline:
    """保存到 JSON 文件"""
    def open_spider(self, spider):
        self.file = open('output.json', 'w', encoding='utf-8')

    def process_item(self, item, spider):
        line = json.dumps(dict(item), ensure_ascii=False) + "\\n"
        self.file.write(line)
        return item

    def close_spider(self, spider):
        self.file.close()


class MongoPipeline:
    """保存到 MongoDB"""
    def open_spider(self, spider):
        self.client = pymongo.MongoClient('mongodb://localhost:27017/')
        self.db = self.client['scrapy_db']

    def process_item(self, item, spider):
        self.db['quotes'].insert_one(dict(item))
        return item

    def close_spider(self, spider):
        self.client.close()
\`\`\`

### 启用 Pipeline

在 \`settings.py\` 中：

\`\`\`python
ITEM_PIPELINES = {
    'myproject.pipelines.JsonWriterPipeline': 300,  # 数字越小优先级越高
    'myproject.pipelines.MongoPipeline': 500,
}
\`\`\`

### Pipeline 的生命周期

| 方法 | 调用时机 |
|------|----------|
| \`open_spider(spider)\` | 爬虫启动时（打开连接） |
| \`process_item(item, spider)\` | 每条数据都调用 |
| \`close_spider(spider)\` | 爬虫关闭时（关闭连接） |

> 🔧 Pipeline 让你把"爬数据"和"存数据"彻底分离——爬虫只负责产出，Pipeline 负责处理。改存储方式不需要改爬虫代码。`,
      starterCode: `# items.py — 定义数据结构
import scrapy

class QuoteItem(scrapy.Item):
    text = scrapy.Field()
    author = scrapy.Field()
    tags = scrapy.Field()

# pipelines.py — 保存到 SQLite 的 Pipeline
import sqlite3

class SQLitePipeline:
    def open_spider(self, spider):
        self.conn = sqlite3.connect('quotes.db')
        self.cursor = self.conn.cursor()
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS quotes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                text TEXT,
                author TEXT,
                tags TEXT
            )
        ''')
        self.conn.commit()

    def process_item(self, item, spider):
        self.cursor.execute(
            'INSERT INTO quotes (text, author, tags) VALUES (?, ?, ?)',
            (item.get('text'), item.get('author'), ','.join(item.get('tags', [])))
        )
        self.conn.commit()
        return item  # ⚠️ 必须 return item，传给下一个 Pipeline

    def close_spider(self, spider):
        self.conn.close()

# settings.py — 启用 Pipeline
# ITEM_PIPELINES = {
#     'myproject.pipelines.SQLitePipeline': 300,
# }

print("🔧 Pipeline 工作流程：")
print("1. open_spider()   — 打开文件/数据库连接")
print("2. process_item()  — 处理每条数据（清洗、存储）")
print("3. close_spider()  — 关闭连接")
print("\\n💡 优先级数字越小越先执行（范围 0-1000）")
print("💡 必须 return item，否则下一个 Pipeline 收不到数据！")`,
      expectedOutput: `🔧 Pipeline 工作流程：
1. open_spider()   — 打开文件/数据库连接
2. process_item()  — 处理每条数据（清洗、存储）
3. close_spider()  — 关闭连接

💡 优先级数字越小越先执行（范围 0-1000）
💡 必须 return item，否则下一个 Pipeline 收不到数据！`,
      hint: 'Pipeline 中如果 `raise DropItem("原因")`（需 `from scrapy.exceptions import DropItem`），这条数据会被丢弃且不报错。',
    },
  ],
};

const ch27: Chapter = {
  id: 'ch27',
  title: '部署上线',
  description: 'Linux/Nginx/Gunicorn/Docker、云部署',
  sections: [
    {
      id: '27.1',
      kind: 'demo',
      chapterId: 'ch27',
      title: '服务器基础 — Linux / Nginx / Gunicorn',
      content: `## 🖥️ 服务器基础：让你的应用被全世界访问

写好的 Web 应用在 \`localhost:5000\` 上跑，只有你能看到。部署就是把它放到云服务器上，让**任何人都能访问**。

### 典型部署架构

\`\`\`
用户浏览器
    ↓  (HTTPS 请求)
Nginx（反向代理）
    ├── 静态文件（CSS/JS/图片）—— Nginx 直接返回
    └── 动态请求 → Gunicorn → Flask/Django 应用
\`\`\`

### 核心组件

| 组件 | 角色 | 类比 |
|------|------|------|
| **Linux 服务器** | 操作系统 | 房子的地基 |
| **Nginx** | Web 服务器 / 反向代理 | 前台接待（分发请求） |
| **Gunicorn** | WSGI 应用服务器 | 后厨（运行 Python） |
| **Supervisor** | 进程管理 | 大管家（挂了自动重启） |
| **PostgreSQL** | 数据库 | 仓库（存数据） |

### Flask + Gunicorn 启动

\`\`\`bash
# 开发环境（Flask 自带服务器，单线程）
flask run

# 生产环境（Gunicorn，多 worker）
gunicorn -w 4 -b 0.0.0.0:8000 app:app
#         │    │            │
#         4进程 所有网卡     模块:Flask实例
\`\`\`

### Nginx 反向代理配置

\`\`\`nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://127.0.0.1:8000;  # 转发给 Gunicorn
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /static/ {
        alias /var/www/myapp/static/;  # 静态文件直接返回
    }
}
\`\`\`

### 部署检查清单

- [ ] 关闭 DEBUG 模式（\`DEBUG=False\`）
- [ ] 设置 SECRET_KEY（随机长字符串）
- [ ] 配置 ALLOWED_HOSTS
- [ ] 数据库从 SQLite 换成 PostgreSQL
- [ ] 静态文件用 Nginx 直接服务
- [ ] 配置 HTTPS（Let's Encrypt 免费证书）

> 🖥️ 部署是把"玩具"变成"产品"的关键一步——写得好但没人能用，等于没写。`,
      starterCode: `# Flask 应用 (app.py)
from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, 生产环境！"

# 开发启动（单线程，仅调试用）
# flask run

# 生产启动（Gunicorn）
# gunicorn -w 4 -b 0.0.0.0:8000 app:app

print("🖥️ 生产环境部署架构：")
print("\\n用户 → Nginx(:80) → Gunicorn(:8000) → Flask/Django")
print("                  → /static/* 直接返回静态文件")
print("\\n📋 关键命令：")
print("  gunicorn -w 4 -b 0.0.0.0:8000 app:app")
print("  sudo systemctl restart nginx")
print("  sudo systemctl restart myapp")
print("\\n⚠️ 生产环境必须：DEBUG=False, 更换 SECRET_KEY, 设置 ALLOWED_HOSTS")`,
      expectedOutput: `🖥️ 生产环境部署架构：

用户 → Nginx(:80) → Gunicorn(:8000) → Flask/Django
                  → /static/* 直接返回静态文件

📋 关键命令：
  gunicorn -w 4 -b 0.0.0.0:8000 app:app
  sudo systemctl restart nginx
  sudo systemctl restart myapp

⚠️ 生产环境必须：DEBUG=False, 更换 SECRET_KEY, 设置 ALLOWED_HOSTS`,
      hint: 'Gunicorn 的 `-w` 参数一般设为 `CPU核心数 × 2 + 1`。`gunicorn --bind unix:app.sock` 用 Unix Socket 比 TCP 端口更快。',
    },
    {
      id: '27.2',
      kind: 'demo',
      chapterId: 'ch27',
      title: 'Docker — 一次打包到处运行',
      content: `## 🐳 Docker：一次打包，到处运行

### 部署的痛点

"在我电脑上能跑啊！"——这是开发者和运维之间最常见的对话。原因：
- Python 版本不同
- 依赖库版本不同
- 操作系统不同
- 环境变量不同

Docker 解决这个问题：**把应用和它的环境一起打包**。

### Docker 核心概念

| 概念 | 说明 | 类比 |
|------|------|------|
| **Image（镜像）** | 打包好的应用+环境（只读） | 安装光盘 |
| **Container（容器）** | 运行中的镜像实例 | 运行中的程序 |
| **Dockerfile** | 镜像的"配方" | 安装说明 |
| **Docker Compose** | 管理多容器应用 | 编排脚本 |

### Dockerfile 示例（Python 应用）

\`\`\`dockerfile
FROM python:3.12-slim           # 基于官方 Python 镜像

WORKDIR /app                     # 设置工作目录
COPY requirements.txt .          # 先复制依赖文件
RUN pip install -r requirements.txt  # 安装依赖

COPY . .                         # 复制应用代码
EXPOSE 8000                      # 声明端口

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8000", "app:app"]
\`\`\`

### 常用 Docker 命令

\`\`\`bash
# 构建镜像
docker build -t myapp:v1 .

# 运行容器
docker run -d -p 80:8000 --name myapp myapp:v1
#          │  │       │
#          后台 端口映射 容器名

# 查看运行中的容器
docker ps

# 查看日志
docker logs myapp

# 进入容器
docker exec -it myapp bash

# 停止 / 删除
docker stop myapp
docker rm myapp
\`\`\`

### Docker Compose（多服务编排）

\`\`\`yaml
# docker-compose.yml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "80:8000"
    depends_on:
      - db
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret
\`\`\`

\`\`\`bash
docker compose up -d      # 一键启动所有服务
docker compose down       # 一键停止
\`\`\`

> 🐳 Docker = 环境一致性 + 快速部署 + 易于扩展。现代部署的标配。`,
      starterCode: `# Dockerfile — Python 应用的标准 Dockerfile
dockerfile_content = '''FROM python:3.12-slim

WORKDIR /app

# 先安装依赖（利用 Docker 缓存层）
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 再复制代码
COPY . .

EXPOSE 8000

# 生产启动命令
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8000", "app:app"]
'''

print("🐳 Docker 部署流程：")
print("\\n1️⃣  编写 Dockerfile")
print("2️⃣  docker build -t myapp:v1 .")
print("3️⃣  docker run -d -p 80:8000 --name myapp myapp:v1")
print("\\n📋 docker-compose.yml 一键管理多服务：")
print("  services:")
print("    web:    # Flask/Django 应用")
print("    db:     # PostgreSQL 数据库")
print("    redis:  # Redis 缓存")
print("\\n🚀 docker compose up -d  # 一键启动全部！")
print("\\n💡 Docker Hub 上有官方 Python、PostgreSQL、Redis 等镜像")`,
      expectedOutput: `🐳 Docker 部署流程：

1️⃣  编写 Dockerfile
2️⃣  docker build -t myapp:v1 .
3️⃣  docker run -d -p 80:8000 --name myapp myapp:v1

📋 docker-compose.yml 一键管理多服务：
  services:
    web:    # Flask/Django 应用
    db:     # PostgreSQL 数据库
    redis:  # Redis 缓存

🚀 docker compose up -d  # 一键启动全部！

💡 Docker Hub 上有官方 Python、PostgreSQL、Redis 等镜像`,
      hint: '`--no-cache-dir` 减小镜像体积；先 `COPY requirements.txt` 再 `COPY . .` 利用 Docker 的层缓存——依赖没变就不用重新安装。',
    },
    {
      id: '27.3',
      kind: 'demo',
      chapterId: 'ch27',
      title: '部署你的 Flask / Django 应用',
      content: `## 🚀 实战：把你的应用部署到云端

### 部署方案选择

| 方案 | 难度 | 费用 | 适合 |
|------|------|------|------|
| **VPS（云服务器）** | ⭐⭐⭐ | ¥30-100/月 | 学习、小项目 |
| **PaaS（Railway/Render）** | ⭐ | 免费额度 | 快速上线、Demo |
| **云函数（Vercel 等）** | ⭐⭐ | 免费额度 | 无状态 API |
| **K8s 集群** | ⭐⭐⭐⭐⭐ | 贵 | 大型企业 |

### VPS 部署完整流程（以 Ubuntu 为例）

\`\`\`bash
# 1. 登录服务器
ssh root@your-server-ip

# 2. 更新系统 + 安装基础软件
apt update && apt upgrade -y
apt install python3-pip nginx git -y

# 3. 拉取代码
git clone https://github.com/you/myapp.git
cd myapp

# 4. 创建虚拟环境 + 安装依赖
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn

# 5. 配置 Gunicorn（systemd 服务）
# 创建 /etc/systemd/system/myapp.service

# 6. 配置 Nginx
# 创建 /etc/nginx/sites-available/myapp

# 7. 启动！
sudo systemctl start myapp
sudo systemctl enable myapp   # 开机自启
sudo systemctl restart nginx
\`\`\`

### systemd 服务文件（让应用后台运行）

\`\`\`ini
[Unit]
Description=My Flask App
After=network.target

[Service]
User=www-data
WorkingDirectory=/home/ubuntu/myapp
ExecStart=/home/ubuntu/myapp/venv/bin/gunicorn -w 4 -b 127.0.0.1:8000 app:app
Restart=always

[Install]
WantedBy=multi-user.target
\`\`\`

### 推荐：Docker 一键部署（更简单！）

\`\`\`bash
# 在服务器上安装 Docker 后
git clone https://github.com/you/myapp.git
cd myapp
docker compose up -d
# 搞定！
\`\`\`

### PaaS 部署（最简单）

在 Railway / Render 上：
1. 连接 GitHub 仓库
2. 自动检测 Python 项目
3. 设置启动命令：\`gunicorn app:app\`
4. 点 Deploy → 几分钟后拿到公网 URL

### 部署最终检查清单

- [x] \`DEBUG = False\`
- [x] \`SECRET_KEY\` 换成环境变量
- [x] \`ALLOWED_HOSTS\` 包含域名
- [x] 数据库换成 PostgreSQL（不是 SQLite）
- [x] HTTPS 证书配置（Let's Encrypt / Certbot）
- [x] 静态文件由 Nginx 直接服务
- [x] 进程守护（systemd 或 Supervisor）
- [x] 日志配置 + 监控告警

> 🚀 部署是程序员的"成人礼"——你的代码终于能被全世界看到了！从今天起，你写的每一个应用都可以上线。`,
      starterCode: `# 完整的部署准备清单（Python Web 应用）

print("🚀 Flask/Django 应用上线检查清单：")
print("\\n📝 代码层面：")
print("  ✅ DEBUG = False")
print("  ✅ SECRET_KEY = os.environ.get('SECRET_KEY')")
print("  ✅ ALLOWED_HOSTS = ['your-domain.com', 'IP']")
print("  ✅ 数据库用 PostgreSQL（pip install psycopg2）")
print("  ✅ requirements.txt 完整（含 gunicorn）")
print("  ✅ .env 文件加入 .gitignore")
print("\\n🖥️ 服务器层面：")
print("  ✅ pip install gunicorn")
print("  ✅ gunicorn -w 4 -b 127.0.0.1:8000 app:app")
print("  ✅ Nginx 反向代理到 Gunicorn")
print("  ✅ systemd 服务保证进程存活")
print("  ✅ certbot 配置免费 HTTPS 证书")
print("\\n🐳 或者用 Docker（推荐！）：")
print("  ✅ Dockerfile + docker-compose.yml")
print("  ✅ docker compose up -d")
print("\\n🌐 推荐 PaaS 平台（免费试用）：")
print("  - Railway.app      （连 GitHub 即部署）")
print("  - Render.com       （免费 PostgreSQL）")
print("  - Fly.io           （全球分布式）")`,
      expectedOutput: `🚀 Flask/Django 应用上线检查清单：

📝 代码层面：
  ✅ DEBUG = False
  ✅ SECRET_KEY = os.environ.get('SECRET_KEY')
  ✅ ALLOWED_HOSTS = ['your-domain.com', 'IP']
  ✅ 数据库用 PostgreSQL（pip install psycopg2）
  ✅ requirements.txt 完整（含 gunicorn）
  ✅ .env 文件加入 .gitignore

🖥️ 服务器层面：
  ✅ pip install gunicorn
  ✅ gunicorn -w 4 -b 127.0.0.1:8000 app:app
  ✅ Nginx 反向代理到 Gunicorn
  ✅ systemd 服务保证进程存活
  ✅ certbot 配置免费 HTTPS 证书

🐳 或者用 Docker（推荐！）：
  ✅ Dockerfile + docker-compose.yml
  ✅ docker compose up -d

🌐 推荐 PaaS 平台（免费试用）：
  - Railway.app      （连 GitHub 即部署）
  - Render.com       （免费 PostgreSQL）
  - Fly.io           （全球分布式）`,
      hint: '用 `python-decouple` 或 `python-dotenv` 管理环境变量；生产环境的 SECRET_KEY 可以用 `python -c "import secrets; print(secrets.token_hex(32))"` 生成。',
    },
  ],
};

const p6: Chapter = {
  id: 'p6',
  title: '实战项目：Django 全栈管理系统',
  description: '综合运用 Django：Model设计、Admin定制、CBV视图、Bootstrap前端、生产部署',
  sections: [
    {
      id: 'p6.1',
      kind: 'demo',
      chapterId: 'p6',
      title: '需求分析 + 数据库设计',
      content: `## 📋 全栈管理系统（一）：需求分析 + 数据库设计

我们要做一个**员工管理系统**——公司用来管理员工和部门信息。先用 Django ORM 设计数据模型。

### 需求分析

| 功能 | 说明 |
|------|------|
| 部门管理 | 增删改查部门（名称、编号、创建时间） |
| 员工管理 | 增删改查员工（姓名、邮箱、手机、工资、所属部门） |
| 列表展示 | 分页展示员工列表，支持按部门筛选 |
| Admin 后台 | 通过 Django Admin 直接管理数据 |
| 前端页面 | Bootstrap 美化，响应式布局 |

### 数据库关系设计（ER 图）

\`\`\`
┌─────────────┐       ┌──────────────────┐
│ Department   │ 1───n │ Employee          │
├─────────────┤       ├──────────────────┤
│ name        │       │ name              │
│ code        │       │ email             │
│ created_at  │       │ phone             │
└─────────────┘       │ salary            │
                      │ department ← FK   │
                      │ hire_date         │
                      │ is_active         │
                      └──────────────────┘
\`\`\`

### 外键设计要点

- 一个部门有多个员工 → **一对多关系**（ForeignKey）
- 删除部门时保护员工数据 → \`on_delete=models.PROTECT\`
- 员工列表按部门筛选 → \`related_name='employees'\`

\`\`\`python
class Department(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Employee(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    department = models.ForeignKey(
        Department, on_delete=models.PROTECT, related_name='employees'
    )
\`\`\`

> 📋 先设计 Model 再写代码——数据库结构对了，后面的 View 和 Template 水到渠成。`,
      starterCode: `# models.py — 员工管理系统数据模型

from django.db import models

class Department(models.Model):
    """部门"""
    name = models.CharField(max_length=100, verbose_name="部门名称")
    code = models.CharField(max_length=10, unique=True, verbose_name="部门编号")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")

    class Meta:
        verbose_name = "部门"
        verbose_name_plural = "部门"
        ordering = ['code']

    def __str__(self):
        return f"{self.code} - {self.name}"

class Employee(models.Model):
    """员工"""
    name = models.CharField(max_length=50, verbose_name="姓名")
    email = models.EmailField(unique=True, verbose_name="邮箱")
    phone = models.CharField(max_length=20, verbose_name="手机号")
    salary = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="工资")
    department = models.ForeignKey(
        Department,
        on_delete=models.PROTECT,
        related_name='employees',
        verbose_name="所属部门"
    )
    hire_date = models.DateField(verbose_name="入职日期")
    is_active = models.BooleanField(default=True, verbose_name="在职")

    class Meta:
        verbose_name = "员工"
        verbose_name_plural = "员工"
        ordering = ['-hire_date']

    def __str__(self):
        return f"{self.name} ({self.department.code})"

print("📋 数据模型设计完成：")
print("\\nDepartment（部门）  ← 1对多 →  Employee（员工）")
print("  name, code, created_at")
print("  name, email, phone, salary, department(FK), hire_date")
print("\\n✅ on_delete=PROTECT — 有员工的部门不能删除")
print("✅ related_name='employees' — department.employees.all() 反向查询")`,
      expectedOutput: `📋 数据模型设计完成：

Department（部门）  ← 1对多 →  Employee（员工）
  name, code, created_at
  name, email, phone, salary, department(FK), hire_date

✅ on_delete=PROTECT — 有员工的部门不能删除
✅ related_name='employees' — department.employees.all() 反向查询`,
      hint: '`on_delete=models.PROTECT` 保护数据不被误删；`CASCADE` 会级联删除；`SET_NULL` 设为空；`DO_NOTHING` 什么都不做。',
    },
    {
      id: 'p6.2',
      kind: 'demo',
      chapterId: 'p6',
      title: 'Django 项目搭建 + Admin 定制',
      content: `## 🏗️ 全栈管理系统（二）：项目搭建 + Admin 定制

现在把 Model 变成能跑的 Django 项目，并定制 Admin 后台——让管理员操作更友好。

### 项目创建流程

\`\`\`bash
django-admin startproject company
cd company
python manage.py startapp employees
\`\`\`

### 配置 settings.py

\`\`\`python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'employees',  # ← 注册应用
]

# 中文配置
LANGUAGE_CODE = 'zh-hans'
TIME_ZONE = 'Asia/Shanghai'
\`\`\`

### 注册 Model 到 Admin

在 \`employees/admin.py\` 中：

\`\`\`python
from django.contrib import admin
from .models import Department, Employee

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'created_at', 'employee_count']
    search_fields = ['name', 'code']

    def employee_count(self, obj):
        return obj.employees.count()
    employee_count.short_description = '员工数'

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'department', 'salary', 'hire_date', 'is_active']
    list_filter = ['department', 'is_active', 'hire_date']
    search_fields = ['name', 'email']
    list_editable = ['is_active']  # 列表页直接编辑
\`\`\`

### Admin 定制技巧

| 功能 | 配置项 |
|------|--------|
| 列表显示的列 | \`list_display\` |
| 右侧筛选栏 | \`list_filter\` |
| 搜索框 | \`search_fields\` |
| 列表页直接编辑 | \`list_editable\` |
| 自定义方法列 | 在 ModelAdmin 中定义方法 |

> 🏗️ Admin 定制让后台从"够用"变成"好用"——花 10 分钟配置，客户体验提升 10 倍。`,
      starterCode: `# employees/admin.py — Admin 定制

from django.contrib import admin
from .models import Department, Employee

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'created_at', 'employee_count']
    search_fields = ['name', 'code']
    ordering = ['code']

    def employee_count(self, obj):
        return obj.employees.count()
    employee_count.short_description = '员工人数'

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'department',
                    'salary', 'hire_date', 'is_active']
    list_filter = ['department', 'is_active']
    search_fields = ['name', 'email', 'phone']
    list_editable = ['is_active']
    list_per_page = 20
    date_hierarchy = 'hire_date'

    fieldsets = (
        ('基本信息', {'fields': ('name', 'email', 'phone')}),
        ('工作信息', {'fields': ('department', 'salary', 'hire_date', 'is_active')}),
    )

# settings.py 关键配置
print("🏗️ Django 项目搭建完成：")
print("\\n📁 项目结构：")
print("  company/          # 项目配置")
print("  ├── settings.py   # LANGUAGE_CODE='zh-hans'")
print("  ├── urls.py       # 总路由")
print("  └── wsgi.py")
print("  employees/        # 员工应用")
print("  ├── models.py     # Department + Employee")
print("  └── admin.py      # Admin 定制")
print("\\n✅ 运行命令：")
print("  python manage.py makemigrations && migrate")
print("  python manage.py createsuperuser")
print("  python manage.py runserver")`,
      expectedOutput: `🏗️ Django 项目搭建完成：

📁 项目结构：
  company/          # 项目配置
  ├── settings.py   # LANGUAGE_CODE='zh-hans'
  ├── urls.py       # 总路由
  └── wsgi.py
  employees/        # 员工应用
  ├── models.py     # Department + Employee
  └── admin.py      # Admin 定制

✅ 运行命令：
  python manage.py makemigrations && migrate
  python manage.py createsuperuser
  python manage.py runserver`,
      hint: '`list_editable` 让管理员直接在列表页修改字段（如"在职"状态），不用点进详情页——适合布尔值、下拉选择等简单字段。',
    },
    {
      id: 'p6.3',
      kind: 'demo',
      chapterId: 'p6',
      title: '业务逻辑 + 前端页面',
      content: `## 🎨 全栈管理系统（三）：CBV 视图 + Bootstrap 前端

用 Django 的**类视图（CBV）**快速实现增删改查，配合 Bootstrap CDN 做出专业的前端。

### 类视图（Class-Based Views）

Django 内置了常用视图类，继承即可：

\`\`\`python
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView

class EmployeeListView(ListView):
    model = Employee
    template_name = 'employees/employee_list.html'
    context_object_name = 'employees'
    paginate_by = 10  # 每页10条

    def get_queryset(self):
        qs = super().get_queryset()
        dept = self.request.GET.get('department')
        if dept:
            qs = qs.filter(department_id=dept)
        return qs
\`\`\`

### CBV 常用类

| CBV | 作用 | 关键属性 |
|-----|------|----------|
| \`ListView\` | 列表页 | \`model\`, \`paginate_by\` |
| \`DetailView\` | 详情页 | \`model\`, \`pk_url_kwarg\` |
| \`CreateView\` | 创建表单 | \`model\`, \`fields\`, \`success_url\` |
| \`UpdateView\` | 编辑表单 | 同 CreateView |
| \`DeleteView\` | 删除确认 | \`model\`, \`success_url\` |

### Bootstrap 模板（CDN 引入）

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>员工管理系统</title>
    <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-dark bg-primary mb-4">
        <div class="container">
            <span class="navbar-brand">🏢 员工管理系统</span>
        </div>
    </nav>
    <div class="container">
        <table class="table table-striped table-hover">
            <thead class="table-dark">
                <tr><th>姓名</th><th>部门</th><th>工资</th><th>操作</th></tr>
            </thead>
            <tbody>
                {% for emp in employees %}
                <tr>
                    <td>{{ emp.name }}</td>
                    <td>{{ emp.department.name }}</td>
                    <td>¥{{ emp.salary }}</td>
                    <td>
                        <a href="{% url 'employee_detail' emp.pk %}" class="btn btn-sm btn-info">详情</a>
                    </td>
                </tr>
                {% endfor %}
            </tbody>
        </table>
    </div>
</body>
</html>
\`\`\`

### URL 路由

\`\`\`python
urlpatterns = [
    path('', EmployeeListView.as_view(), name='employee_list'),
    path('<int:pk>/', EmployeeDetailView.as_view(), name='employee_detail'),
    path('create/', EmployeeCreateView.as_view(), name='employee_create'),
    path('<int:pk>/edit/', EmployeeUpdateView.as_view(), name='employee_update'),
    path('<int:pk>/delete/', EmployeeDeleteView.as_view(), name='employee_delete'),
]
\`\`\`

> 🎨 CBV 省去大量重复代码，Bootstrap CDN 让你零配置拥有专业外观——全栈就是这么高效。`,
      starterCode: `# employees/views.py — 使用 CBV 的完整示例
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import Employee, Department

class EmployeeListView(ListView):
    model = Employee
    template_name = 'employees/employee_list.html'
    context_object_name = 'employees'
    paginate_by = 10

    def get_queryset(self):
        qs = super().get_queryset().select_related('department')
        dept_id = self.request.GET.get('department')
        if dept_id:
            qs = qs.filter(department_id=dept_id)
        return qs

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['departments'] = Department.objects.all()
        return context

class EmployeeDetailView(DetailView):
    model = Employee
    template_name = 'employees/employee_detail.html'

class EmployeeCreateView(CreateView):
    model = Employee
    template_name = 'employees/employee_form.html'
    fields = ['name', 'email', 'phone', 'salary', 'department', 'hire_date']
    success_url = reverse_lazy('employee_list')

class EmployeeUpdateView(UpdateView):
    model = Employee
    template_name = 'employees/employee_form.html'
    fields = ['name', 'email', 'phone', 'salary', 'department', 'hire_date', 'is_active']
    success_url = reverse_lazy('employee_list')

class EmployeeDeleteView(DeleteView):
    model = Employee
    template_name = 'employees/employee_confirm_delete.html'
    success_url = reverse_lazy('employee_list')

print("🎨 业务逻辑层完成：")
print("\\n📋 CBV 视图类：")
print("  ListView   — 员工列表（分页+按部门筛选）")
print("  DetailView — 员工详情")
print("  CreateView — 添加员工")
print("  UpdateView — 编辑员工")
print("  DeleteView — 删除员工")
print("\\n🎨 前端：Bootstrap 5 CDN + Django 模板")
print("  导航栏 + 表格 + 分页 + 表单 + 响应式")`,
      expectedOutput: `🎨 业务逻辑层完成：

📋 CBV 视图类：
  ListView   — 员工列表（分页+按部门筛选）
  DetailView — 员工详情
  CreateView — 添加员工
  UpdateView — 编辑员工
  DeleteView — 删除员工

🎨 前端：Bootstrap 5 CDN + Django 模板
  导航栏 + 表格 + 分页 + 表单 + 响应式`,
      hint: '`select_related(\'department\')` 用 JOIN 一次性查出部门数据，避免 N+1 查询。`paginate_by` 自动处理分页，模板中用 `{% for emp in page_obj %}`。',
    },
    {
      id: 'p6.4',
      kind: 'demo',
      chapterId: 'p6',
      title: '部署准备 — 生产配置 + Gunicorn',
      content: `## 🚀 全栈管理系统（四）：部署准备

项目写完了，最后一步是把它部署到服务器上让用户真正使用。这里做完整的部署准备。

### settings.py 生产配置

区分开发和生产环境的配置：

\`\`\`python
# settings.py 生产安全配置
import os

DEBUG = os.environ.get('DJANGO_DEBUG', 'False') == 'True'
SECRET_KEY = os.environ.get('SECRET_KEY')  # 从环境变量读取！
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '*').split(',')

# 静态文件收集
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# 数据库用 PostgreSQL（生产）
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME', 'company_db'),
        'USER': os.environ.get('DB_USER', 'postgres'),
        'PASSWORD': os.environ.get('DB_PASSWORD', ''),
        'HOST': os.environ.get('DB_HOST', 'localhost'),
    }
}
\`\`\`

### requirements.txt

\`\`\`
django>=5.0
gunicorn>=21.2
psycopg2-binary>=2.9
python-decouple>=3.8
whitenoise>=6.5
\`\`\`

### Gunicorn 启动

\`\`\`bash
# 收集静态文件
python manage.py collectstatic --noinput

# Gunicorn 启动
gunicorn company.wsgi:application \\
    -w 4 \\
    -b 0.0.0.0:8000 \\
    --access-logfile /var/log/gunicorn/access.log \\
    --error-logfile /var/log/gunicorn/error.log
\`\`\`

### systemd 服务文件

\`\`\`ini
[Unit]
Description=Company Management System
After=network.target

[Service]
User=www-data
WorkingDirectory=/opt/company
ExecStart=/opt/company/venv/bin/gunicorn company.wsgi:application -w 4 -b 127.0.0.1:8000
Restart=always
EnvironmentFile=/opt/company/.env

[Install]
WantedBy=multi-user.target
\`\`\`

### 部署检查清单

- [x] \`DEBUG = False\`（从环境变量读取）
- [x] \`SECRET_KEY\` 从环境变量读取
- [x] 数据库换成 PostgreSQL
- [x] \`python manage.py collectstatic\` 收集静态文件
- [x] \`requirements.txt\` 包含所有依赖
- [x] Gunicorn + systemd 守护进程
- [x] Nginx 反向代理 + HTTPS

> 🚀 部署完成——你的 Django 全栈管理系统现在可以通过域名访问了！这是你第一个全栈项目，从数据库设计到上线部署，全部自己搞定。`,
      starterCode: `# 部署准备脚本 - deploy.py
# 演示部署前的关键步骤

import os

print("🚀 Django 全栈管理系统 — 部署准备")
print("=" * 50)

# 1. 收集静态文件
print("\\n📦 Step 1: 收集静态文件")
print("  python manage.py collectstatic --noinput")
print("  → 所有静态文件复制到 staticfiles/ 目录")

# 2. 检查数据库迁移
print("\\n🗄️  Step 2: 数据库迁移")
print("  python manage.py migrate")
print("  → 应用所有数据库变更")

# 3. 创建管理员（一键脚本）
print("\\n👤 Step 3: 创建管理员（如需要）")
print("  python manage.py createsuperuser")

# 4. Gunicorn 启动
print("\\n⚡ Step 4: Gunicorn 启动")
print("  gunicorn company.wsgi:application -w 4 -b 0.0.0.0:8000")

# 5. 环境检查
checks = {
    "DEBUG=False ✅": os.environ.get('DJANGO_DEBUG') != 'True',
    "SECRET_KEY 已设置 ✅": bool(os.environ.get('SECRET_KEY')),
}
for check, status in checks.items():
    print(f"  [{('✅' if status else '⚠️  需设置')}] {check}")

print("\\n📋 部署命令汇总：")
commands = [
    "pip install -r requirements.txt",
    "python manage.py collectstatic --noinput",
    "python manage.py migrate",
    "gunicorn company.wsgi:application -w 4 -b 0.0.0.0:8000",
]
for cmd in commands:
    print(f"  $ {cmd}")

print("\\n🎉 部署准备完成！你的管理系统可以上线了！")`,
      expectedOutput: `🚀 Django 全栈管理系统 — 部署准备
==================================================

📦 Step 1: 收集静态文件
  python manage.py collectstatic --noinput
  → 所有静态文件复制到 staticfiles/ 目录

🗄️  Step 2: 数据库迁移
  python manage.py migrate
  → 应用所有数据库变更

👤 Step 3: 创建管理员（如需要）
  python manage.py createsuperuser

⚡ Step 4: Gunicorn 启动
  gunicorn company.wsgi:application -w 4 -b 0.0.0.0:8000

📋 部署命令汇总：
  $ pip install -r requirements.txt
  $ python manage.py collectstatic --noinput
  $ python manage.py migrate
  $ gunicorn company.wsgi:application -w 4 -b 0.0.0.0:8000

🎉 部署准备完成！你的管理系统可以上线了！`,
      hint: '生产环境用 `python-decouple` 管理配置：创建 `.env` 文件（加入 `.gitignore`），用 `config("SECRET_KEY")` 读取。`collectstatic` 会收集所有 app 的静态文件到一个目录，方便 Nginx 直接服务。',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch25a — Python 并发编程（4 节）
// ─────────────────────────────────────────────────────────────
const ch25a: Chapter = {
  id: 'ch25a',
  title: 'Python 并发编程',
  description: '掌握多线程、多进程和异步编程，让 Python 程序同时做多件事，大幅提升性能',
  sections: [
    {
      id: '25a.1',
      kind: 'demo',
      chapterId: 'ch25a',
      title: '为什么需要并发？—— 同步 vs 并发',
      content: `## 并发：让程序"一心多用"

想象你在做饭：
- **同步**：先烧水（干等水开），再切菜，再炒菜 → 总时间 = 所有步骤之和
- **并发**：烧水的同时切菜，水开了立刻炒菜 → 总时间大幅缩短

程序也是一样——很多任务是"等待型"的（等网络响应、等文件读写、等数据库查询），并发让这些等待时间重叠起来。

---

### 三种并发方式

| 方式 | 适合场景 | 特点 |
|------|---------|------|
| **多线程（threading）** | I/O 密集型（网络请求、文件读写） | 轻量级，共享内存，有 GIL 限制 |
| **多进程（multiprocessing）** | CPU 密集型（计算、图像处理） | 重量级，独立内存，无 GIL 限制 |
| **异步（asyncio）** | 高并发 I/O（Web 服务器、爬虫） | 单线程协作式，极高并发 |

---

### 关键概念：GIL（全局解释器锁）

Python 的 GIL 使得同一时刻只有一个线程执行 Python 字节码。这意味着：
- **多线程不能加速 CPU 密集型任务**（计算 1+1=2 这样的任务）
- **多线程可以加速 I/O 密集型任务**（因为等待时不占用 GIL）

> 为什么有 GIL？为了内存管理简单。如果去掉 GIL，Python 的每个对象操作都要加锁，单线程性能会下降 30%。`,
      starterCode: `import threading
import time

# 演示：多线程 vs 同步执行
def task(name, seconds):
    print(f"  [任务 {name}] 开始（将耗时 {seconds} 秒）")
    time.sleep(seconds)  # 模拟 I/O 等待
    print(f"  [任务 {name}] 完成")
    return f"{name} 结果"

start = time.time()

# 同步执行：一个一个来
print("=== 同步执行（串行）===")
task("A", 1.5)
task("B", 1.0)
sync_time = time.time() - start
print(f"同步总耗时：{sync_time:.1f} 秒\\n")

# 多线程执行：同时进行
print("=== 多线程执行（并发）===")
start = time.time()
t1 = threading.Thread(target=task, args=("A", 1.5))
t2 = threading.Thread(target=task, args=("B", 1.0))
t1.start()
t2.start()
t1.join()
t2.join()
thread_time = time.time() - start
print(f"\\n多线程总耗时：{thread_time:.1f} 秒")
print(f"加速比：{sync_time/thread_time:.1f}x（多线程让等待时间重叠）")`,
      expectedOutput: `=== 同步执行（串行）===
  [任务 A] 开始（将耗时 1.5 秒）
  [任务 A] 完成
  [任务 B] 开始（将耗时 1.0 秒）
  [任务 B] 完成
同步总耗时：2.5 秒

=== 多线程执行（并发）===
  [任务 A] 开始（将耗时 1.5 秒）
  [任务 B] 开始（将耗时 1.0 秒）
  [任务 B] 完成
  [任务 A] 完成

多线程总耗时：1.5 秒
加速比：1.7x（多线程让等待时间重叠）`,
      hint: '多线程让 I/O 等待时间重叠，总耗时 = 最慢的那个任务，而不是所有任务之和。这就是"并发"的核心价值。',
      validation: threadingTimingValidation,
    },
    {
      id: '25a.2',
      kind: 'demo',
      chapterId: 'ch25a',
      title: 'threading 模块 — 多线程实战',
      content: `## 用 threading 实现并发

---

### 创建线程的两种方式

\`\`\`python
import threading
import time

# 方式 1：直接传入函数（推荐）
def worker(name):
    print(f"{name} 工作中...")
    time.sleep(1)

t = threading.Thread(target=worker, args=("线程1",))
t.start()
t.join()  # 等待线程结束

# 方式 2：继承 Thread 类
class MyThread(threading.Thread):
    def run(self):
        print(f"{self.name} 工作中...")

t = MyThread()
t.start()
\`\`\`

---

### 线程安全问题

多个线程同时修改同一个变量 → 数据混乱！

\`\`\`python
# ❌ 线程不安全的写法
counter = 0
def increment():
    global counter
    for _ in range(100000):
        counter += 1  # 这行不是原子操作！

# ✅ 用锁保护
lock = threading.Lock()
def safe_increment():
    global counter
    for _ in range(100000):
        with lock:   # 同一时间只有一个线程能进入
            counter += 1
\`\`\`

---

### 线程池：不要手动创建太多线程

\`\`\`python
from concurrent.futures import ThreadPoolExecutor

with ThreadPoolExecutor(max_workers=4) as executor:
    # 批量提交任务
    futures = [executor.submit(fetch_url, url) for url in urls]
    # 收集结果
    results = [f.result() for f in futures]
\`\`\`

> 开线程不是免费的——每个线程约占用 8MB 内存。用线程池控制并发数量。`,
      starterCode: `import threading
from concurrent.futures import ThreadPoolExecutor
import time

# 线程不安全的示例
counter = 0
def unsafe_add():
    global counter
    for _ in range(10000):
        counter += 1

# 线程安全的示例
safe_counter = 0
lock = threading.Lock()
def safe_add():
    global safe_counter
    for _ in range(10000):
        with lock:
            safe_counter += 1

# 启动 5 个线程同时累加
threads = []
for i in range(5):
    t = threading.Thread(target=unsafe_add)
    t.start()
    threads.append(t)
for t in threads:
    t.join()
print(f"无锁结果：{counter}（期望 50000，但很可能不同！）")

threads = []
for i in range(5):
    t = threading.Thread(target=safe_add)
    t.start()
    threads.append(t)
for t in threads:
    t.join()
print(f"加锁结果：{safe_counter}（期望 50000，每次都是这个值）")

# 线程池演示
print("\\n线程池批量处理：")
def fetch_data(item):
    time.sleep(0.3)
    return f"数据 {item} 已获取"

with ThreadPoolExecutor(max_workers=4) as ex:
    results = list(ex.map(fetch_data, range(6)))
    for r in results:
        print(f"  {r}")`,
      expectedOutput: `无锁结果：38291（期望 50000，但很可能不同！）
加锁结果：50000（期望 50000，每次都是这个值）

线程池批量处理：
  数据 0 已获取
  数据 1 已获取
  数据 2 已获取
  数据 3 已获取
  数据 4 已获取
  数据 5 已获取`,
      hint: '无锁时 counter 每次结果不同——这就是"竞态条件"（race condition）。一个线程读到 counter=10 的同时另一个线程也读到 10，各自加 1 写回 11，丢掉了一次递增。',
      validation: raceConditionValidation,
    },
    {
      id: '25a.3',
      kind: 'demo',
      chapterId: 'ch25a',
      title: 'asyncio — 异步编程入门',
      content: `## async/await：单线程高并发

asyncio 是 Python 的异步编程库，**单线程**实现高并发——适合大量 I/O 密集型任务。

---

### async/await 基础

\`\`\`python
import asyncio

# async 定义异步函数
async def fetch_data(url):
    print(f"开始抓取 {url}")
    await asyncio.sleep(1)  # await 让出控制权
    print(f"完成抓取 {url}")
    return f"数据来自 {url}"

# 运行异步函数
async def main():
    result = await fetch_data("http://example.com")
    print(result)

asyncio.run(main())
\`\`\`

---

### await 的含义

\`await\` 的意思是："这个操作需要等待，在等待期间，让其他任务执行"。

就像你排队打饭时让朋友先去占座位——你不是干等，而是利用等待时间做别的事。

---

### 并发执行多个任务

\`\`\`python
async def main():
    # 同时启动多个任务
    tasks = [
        fetch_data("http://site1.com"),
        fetch_data("http://site2.com"),
        fetch_data("http://site3.com"),
    ]
    # 等待所有任务完成
    results = await asyncio.gather(*tasks)
    print(results)
\`\`\`

> asyncio 最适合：Web 服务器（FastAPI）、爬虫、API 客户端——大量并发 I/O 但几乎不涉及 CPU 计算。`,
      starterCode: `import asyncio
import time

async def fetch_data(name, delay):
    """模拟异步获取数据"""
    print(f"  [开始] {name}（等待 {delay} 秒）")
    await asyncio.sleep(delay)  # 模拟网络延迟
    print(f"  [完成] {name}")
    return f"{name} 的结果"

async def main():
    print("=== 异步并发执行 ===")
    start = time.time()
    
    # 同时启动 4 个任务
    results = await asyncio.gather(
        fetch_data("API-1", 2.0),
        fetch_data("API-2", 1.0),
        fetch_data("API-3", 1.5),
        fetch_data("API-4", 0.5),
    )
    
    elapsed = time.time() - start
    print(f"\\n所有任务完成！总耗时：{elapsed:.1f} 秒")
    print(f"（如果是同步执行，需要 2.0+1.0+1.5+0.5 = 5.0 秒）")
    print(f"异步加速比：{5.0/elapsed:.1f}x")
    
    print(f"\\n结果：")
    for r in results:
        print(f"  {r}")

# 运行异步主函数
asyncio.run(main())`,
      expectedOutput: `=== 异步并发执行 ===
  [开始] API-1（等待 2.0 秒）
  [开始] API-2（等待 1.0 秒）
  [开始] API-3（等待 1.5 秒）
  [开始] API-4（等待 0.5 秒）
  [完成] API-4
  [完成] API-2
  [完成] API-3
  [完成] API-1

所有任务完成！总耗时：2.0 秒
（如果是同步执行，需要 2.0+1.0+1.5+0.5 = 5.0 秒）
异步加速比：2.5x

结果：
  API-1 的结果
  API-2 的结果
  API-3 的结果
  API-4 的结果`,
      hint: '注意输出顺序——先完成的先返回（API-4 虽然最后提交但最先完成）。asyncio.gather() 同时启动所有任务，总耗时 = 最慢的任务耗时。',
      validation: asyncioConcurrencyValidation,
    },
    {
      id: '25a.4',
      kind: 'demo',
      chapterId: 'ch25a',
      title: '实战：并发爬虫 + 三种方案对比',
      content: `## 实战：用并发加速爬虫

抓取 10 个网页——对比三种方案的性能。

---

### 方案对比

| 方案 | 总耗时 | 适用场景 |
|------|--------|---------|
| 同步（串行） | 10 × 延迟 | 简单脚本 |
| 多线程 | 1 × 延迟 | I/O 密集型，第三方库不支持 async |
| 异步 | 1 × 延迟 | 高并发 I/O，自己控制代码 |

---

### concurrent.futures — 高级并发工具

\`\`\`python
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

# 线程池（I/O 密集型）
with ThreadPoolExecutor(max_workers=10) as ex:
    results = list(ex.map(fetch, urls))

# 进程池（CPU 密集型）
with ProcessPoolExecutor(max_workers=4) as ex:
    results = list(ex.map(compute, big_numbers))
\`\`\`

---

### 选择指南

1. **网络请求/爬虫/API 调用** → 多线程 或 asyncio
2. **文件读写/数据库查询** → 多线程
3. **数学计算/图像处理** → 多进程
4. **Web 服务器/聊天应用** → asyncio（FastAPI、aiohttp）

> 并发不是万能的——如果任务是纯 CPU 计算，多线程反而更慢（GIL + 线程切换开销）。用多进程或换个语言（C/Rust）。`,
      starterCode: `import time
from concurrent.futures import ThreadPoolExecutor

# 模拟 HTTP 请求（等待 0.5 秒）
def fetch_url(url):
    time.sleep(0.5)
    return f"  已获取：{url}"

# 要抓取的网址列表
urls = [f"http://example.com/page{i}" for i in range(8)]

# 方案 1：同步（一个一个来）
print("=== 方案 1：同步（串行）===")
start = time.time()
for url in urls:
    result = fetch_url(url)
    print(result)
sync_time = time.time() - start
print(f"耗时：{sync_time:.1f} 秒\\n")

# 方案 2：多线程（同时进行）
print(f"=== 方案 2：多线程（{len(urls)} 个并发）===")
start = time.time()
with ThreadPoolExecutor(max_workers=8) as executor:
    results = list(executor.map(fetch_url, urls))
for r in results:
    print(r)
thread_time = time.time() - start
print(f"耗时：{thread_time:.1f} 秒")
print(f"\\n加速比：{sync_time/thread_time:.0f}x 🚀")
print("结论：对于 I/O 密集型任务，多线程让等待时间完全重叠！")`,
      expectedOutput: `=== 方案 1：同步（串行）===
  已获取：http://example.com/page0
  已获取：http://example.com/page1
  已获取：http://example.com/page2
  已获取：http://example.com/page3
  已获取：http://example.com/page4
  已获取：http://example.com/page5
  已获取：http://example.com/page6
  已获取：http://example.com/page7
耗时：4.0 秒

=== 方案 2：多线程（8 个并发）===
  已获取：http://example.com/page0
  已获取：http://example.com/page1
  已获取：http://example.com/page2
  已获取：http://example.com/page3
  已获取：http://example.com/page4
  已获取：http://example.com/page5
  已获取：http://example.com/page6
  已获取：http://example.com/page7
耗时：0.5 秒

加速比：8x 🚀
结论：对于 I/O 密集型任务，多线程让等待时间完全重叠！`,
      hint: '多线程的加速比理论上 = 任务数量（每个 0.5 秒 × 8 个 = 4 秒 → 0.5 秒），实际会略低（线程创建和切换有开销）。',
      validation: concurrentCrawlerValidation,
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch27a — 算法与数据结构基础（4 节）
// ─────────────────────────────────────────────────────────────
const ch27a: Chapter = {
  id: 'ch27a',
  title: '算法与数据结构基础',
  description: '理解算法复杂度分析、常用数据结构和经典算法，为面试和深入编程打下基础',
  sections: [
    {
      id: '27a.1',
      kind: 'demo',
      chapterId: 'ch27a',
      title: '算法复杂度：大 O 表示法',
      content: `## 算法快不快？大 O 告诉你

**大 O 表示法**描述算法运行时间随输入规模增长的速度。

---

### 常见复杂度

\`\`\`python
# O(1) — 常数时间：不管数据多大，都是一步搞定
def get_first(arr):
    return arr[0]  # 不管 arr 有多长，一步到位

# O(n) — 线性时间：数据翻倍，时间也翻倍
def find_max(arr):
    max_val = arr[0]
    for x in arr:     # 每个元素检查一次
        if x > max_val:
            max_val = x
    return max_val

# O(n²) — 平方时间：数据翻倍，时间变 4 倍
def has_duplicate(arr):
    for i in range(len(arr)):
        for j in range(len(arr)):  # 双层循环！
            if i != j and arr[i] == arr[j]:
                return True
    return False
\`\`\`

---

### 复杂度对比图

| 大 O | 名称 | n=10 | n=100 | n=1000 |
|------|------|:----:|:-----:|:------:|
| O(1) | 常数 | 1 | 1 | 1 |
| O(log n) | 对数 | 3 | 7 | 10 |
| O(n) | 线性 | 10 | 100 | 1000 |
| O(n log n) | 线性对数 | 30 | 700 | 10000 |
| O(n²) | 平方 | 100 | 10000 | 1,000,000 |
| O(2ⁿ) | 指数 | 1024 | 天文数字 | 不可行 |

> 写代码前先想复杂度！\`for 里套 for\` \=\= O(n²)——数据量大了会慢到你怀疑人生。`,
      starterCode: `import time

# 演示不同复杂度的性能差异
def constant_time(arr):
    """O(1) — 直接访问"""
    return arr[0] if arr else None

def linear_time(arr):
    """O(n) — 遍历一次"""
    total = 0
    for x in arr:
        total += x
    return total

def quadratic_time(arr):
    """O(n²) — 双层循环（慢！）"""
    count = 0
    for i in arr:
        for j in arr:
            count += 1
    return count

# 用不同的数据量测试
for n in [10, 100, 1000]:
    data = list(range(n))
    
    t1 = time.time()
    constant_time(data)
    dt1 = time.time() - t1
    
    t2 = time.time()
    linear_time(data)
    dt2 = time.time() - t2
    
    t3 = time.time()
    quadratic_time(data)
    dt3 = time.time() - t3
    
    print(f"n={n:>5}:  O(1)={dt1:.6f}s | O(n)={dt2:.6f}s | O(n²)={dt3:.6f}s")`,
      expectedOutput: `n=   10:  O(1)=0.000001s | O(n)=0.000002s | O(n²)=0.000005s
n=  100:  O(1)=0.000001s | O(n)=0.000003s | O(n²)=0.000400s
n= 1000:  O(1)=0.000001s | O(n)=0.000020s | O(n²)=0.040000s`,
      hint: '注意 O(n²) 在 n=1000 时已经明显变慢。如果 n=10000，O(n²) 需要约 4 秒，而 O(n) 只需 0.0002 秒——差距 20000 倍！',
      validation: bigOComplexityValidation,
    },
    {
      id: '27a.2',
      kind: 'demo',
      chapterId: 'ch27a',
      title: '常用数据结构速览',
      content: `## Python 内置数据结构的性能

Python 的内置数据结构在不同的操作上有不同的复杂度：

---

### 列表（list）

| 操作 | 复杂度 | 说明 |
|------|:------:|------|
| 索引访问 \`arr[i]\` | O(1) | 直接通过地址访问 |
| 末尾添加 \`append\` | O(1) | 偶尔需要扩容 |
| 任意位置插入 \`insert\` | O(n) | 后面的元素要移位 |
| 查找 \`in\` | O(n) | 逐个检查 |
| 排序 \`sort()\` | O(n log n) | Timsort 算法 |

---

### 字典（dict）

| 操作 | 复杂度 | 说明 |
|------|:------:|------|
| 键查找 \`d[key]\` | O(1) | 哈希表，直接定位 |
| 键赋值 \`d[key]=v\` | O(1) | |
| 遍历 \`for k in d\` | O(n) | |

---

### 集合（set）

| 操作 | 复杂度 | 说明 |
|------|:------:|------|
| 成员检查 \`x in s\` | O(1) | 哈希表 |
| 添加 | O(1) | |
| 并集/交集 | O(n) | |

---

### 选择指南

\`\`\`python
# ❌ 频繁在列表头部插入 → O(n)
data.insert(0, x)

# ✅ 改用 collections.deque → O(1)
from collections import deque
data = deque()
data.appendleft(x)  # 头部插入，O(1)！

# ❌ 频繁在列表中查找 → O(n)
if x in long_list: ...

# ✅ 改用集合 → O(1)
if x in fast_set: ...
\`\`\`

> 选对数据结构比写出优雅的代码更重要——错误的数据结构在数据量大时会让你怀疑人生。`,
      starterCode: `# 演示不同数据结构的性能差异
import time

# 创建 10 万个元素的列表和集合
n = 100000
data_list = list(range(n))
data_set = set(range(n))

# 测试成员查找（列表）
target = n - 1
start = time.time()
result = target in data_list
list_time = time.time() - start

# 测试成员查找（集合）
start = time.time()
result = target in data_set
set_time = time.time() - start

print(f"在 {n:,} 个元素中查找：")
print(f"  列表（list）：{list_time:.4f} 秒  — O(n)")
print(f"  集合（set）： {set_time:.6f} 秒  — O(1)")
print(f"集合比列表快 {list_time/set_time:.0f} 倍！")

# 测试列表头部插入 vs 尾部插入
data = list(range(10000))

start = time.time()
for i in range(100):
    data.insert(0, i)
head_insert = time.time() - start

start = time.time()
for i in range(100):
    data.append(i)
tail_append = time.time() - start

print(f"\\n列表操作对比（100 次）：")
print(f"  头部插入（insert(0)）：{head_insert:.4f} 秒 — O(n)")
print(f"  尾部追加（append）：{tail_append:.6f} 秒 — O(1)")`,
      expectedOutput: `在 100,000 个元素中查找：
  列表（list）：0.0020 秒  — O(n)
  集合（set）： 0.000001 秒  — O(1)
集合比列表快 2000 倍！

列表操作对比（100 次）：
  头部插入（insert(0)）：0.0004 秒 — O(n)
  尾部追加（append）：0.000010 秒 — O(1)`,
      hint: '集合和字典的 O(1) 查找是 Python 最强大的特性之一。当需要频繁检查"某个东西在不在"时，永远用集合而不是列表。',
      validation: dataStructurePerformanceValidation,
    },
    {
      id: '27a.3',
      kind: 'demo',
      chapterId: 'ch27a',
      title: '二分查找 — 从 O(n) 到 O(log n)',
      content: `## 二分查找：每次排除一半

在**已排序**的数组中查找一个数——二分查找是 O(log n)，普通查找是 O(n)。

---

### 算法原理

\`\`\`python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid          # 找到了！
        elif arr[mid] < target:
            left = mid + 1      # 目标在右半部分
        else:
            right = mid - 1     # 目标在左半部分
    
    return -1  # 没找到
\`\`\`

**关键前提**：数组必须已排序！

---

### 直观理解

猜数字游戏——我心里想一个 1-100 之间的数：
- **线性查找**："是 1 吗？是 2 吗？是 3 吗？..." → 最坏 100 次
- **二分查找**："比 50 大吗？" "比 75 小吗？" "是 62 吗？" → 最多 7 次

---

### 对数增长的威力

| n | 线性查找（最坏） | 二分查找（最坏） |
|:--:|:---:|:---:|
| 100 | 100 步 | 7 步 |
| 10,000 | 10,000 步 | 14 步 |
| 1,000,000 | 1,000,000 步 | 20 步 |
| 1,000,000,000 | 10 亿步 | 30 步 |

> 40 亿个数据中找一个数——线性查找要 40 亿步（约 40 秒），二分查找只需 32 步（约 0.00003 秒）。`,
      starterCode: `# 二分查找 vs 线性查找
import time

def linear_search(arr, target):
    """线性查找 O(n)"""
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1

def binary_search(arr, target):
    """二分查找 O(log n)"""
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# 测试
data = sorted([3, 7, 1, 9, 4, 6, 8, 2, 5, 0])
print(f"有序数组：{data}")
print(f"查找 7 的位置：线性={linear_search(data, 7)}，二分={binary_search(data, 7)}")
print(f"查找 99 的位置：线性={linear_search(data, 99)}，二分={binary_search(data, 99)}")

# 性能对比（大数据量）
big_data = list(range(1000000))
target = 999999

start = time.time()
linear_search(big_data, target)
linear_time = time.time() - start

start = time.time()
binary_search(big_data, target)
binary_time = time.time() - start

print(f"\\n在 1,000,000 个数据中查找最后一个元素：")
print(f"  线性查找：{linear_time:.4f} 秒 — O(n)")
print(f"  二分查找：{binary_time:.6f} 秒 — O(log n)")
print(f"二分查找快 {linear_time/binary_time:.0f} 倍！")`,
      expectedOutput: `有序数组：[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
查找 7 的位置：线性=7，二分=7
查找 99 的位置：线性=-1，二分=-1

在 1,000,000 个数据中查找最后一个元素：
  线性查找：0.0200 秒 — O(n)
  二分查找：0.000002 秒 — O(log n)
二分查找快 10000 倍！`,
      hint: '二分查找是"分治思想"的代表——每次把问题减半。在线刷题时看到"有序数组"+"查找"的题目，第一时间想到二分查找！',
      validation: binarySearchPerformanceValidation,
    },
    {
      id: '27a.4',
      kind: 'demo',
      chapterId: 'ch27a',
      title: '冒泡排序与选择排序 — 理解排序原理',
      content: `## 排序算法入门

排序是编程中最基本的问题。理解和动手实现简单排序，能帮你建立算法思维。

---

### 冒泡排序（Bubble Sort）

\`\`\`python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n - 1 - i):  # 每轮少检查一个
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]  # 交换
    return arr
\`\`\`

**原理**：像气泡一样，大的数慢慢"浮"到末尾。

复杂度：O(n²) — 面试让你手写排序时最常用。

---

### 选择排序（Selection Sort）

\`\`\`python
def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):  # 找最小的
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]  # 放到前面
    return arr
\`\`\`

**原理**：每次选最小的放到前面。

复杂度：也是 O(n²)，但比冒泡少一半的交换操作。

---

### Python 的排序

实际上你**不需要手动实现排序**——Python 内置的 sort() 使用 Timsort 算法（O(n log n)），综合了归并排序和插入排序的优点。但理解排序原理能帮你：

1. 面试中应对"手写排序"题目
2. 理解算法设计思想（交换、选择、分治）
3. 为学习更高级算法（快速排序、归并排序）打基础`,
      starterCode: `# 手动实现排序 vs Python 内置排序
def bubble_sort(arr):
    """冒泡排序 O(n²)"""
    arr = arr.copy()
    n = len(arr)
    for i in range(n):
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

def selection_sort(arr):
    """选择排序 O(n²)"""
    arr = arr.copy()
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

# 测试
data = [64, 34, 25, 12, 22, 11, 90]
print(f"原始数据：{data}")
print(f"冒泡排序：{bubble_sort(data)}")
print(f"选择排序：{selection_sort(data)}")
print(f"内置 sort：{sorted(data)}")
print(f"\\n结果都一样！但内置 sort() 是最快的（O(n log n)）")

# 面试常见题：按字符串长度排序
words = ["python", "go", "rust", "c", "javascript", "swift"]
words.sort(key=len)  # 按长度排序
print(f"\\n按长度排序：{words}")

# 按最后一个字母排序
words.sort(key=lambda w: w[-1])
print(f"按末字母排序：{words}")`,
      expectedOutput: `原始数据：[64, 34, 25, 12, 22, 11, 90]
冒泡排序：[11, 12, 22, 25, 34, 64, 90]
选择排序：[11, 12, 22, 25, 34, 64, 90]
内置 sort：[11, 12, 22, 25, 34, 64, 90]

结果都一样！但内置 sort() 是最快的（O(n log n)）

按长度排序：['c', 'go', 'rust', 'swift', 'python', 'javascript']
按末字母排序：['c', 'python', 'go', 'rust', 'swift', 'javascript']`,
      hint: '面试中如果需要排序，永远先问自己：Python 内置的 sort() 能用吗？除非面试官明确要求"手写排序"，否则用内置的就够了。Timsort 又快又稳定。',
    },
    {
      id: '27a.5',
      kind: 'demo',
      chapterId: 'ch27a',
      title: '快速排序 — 分治思想实战',
      content: `## 快速排序：面试最常考的排序

快速排序（Quicksort）是实践中**最快的排序算法之一**，也是"分治思想"的经典代表。

---

### 分治思想

**分治（Divide and Conquer）** = 分而治之：
1. **分解**：把大问题拆成小问题
2. **解决**：解决每个小问题
3. **合并**：把小问题的解合并成大问题的解

---

### 快排原理

\`\`\`python
def quicksort(arr):
    if len(arr) <= 1:
        return arr  # 基线条件：空或只有一个元素，已经有序
    
    pivot = arr[len(arr) // 2]  # 选中间的数作为"基准"
    left = [x for x in arr if x < pivot]     # 比基准小的放左边
    middle = [x for x in arr if x == pivot]  # 和基准相等的放中间
    right = [x for x in arr if x > pivot]    # 比基准大的放右边
    
    return quicksort(left) + middle + quicksort(right)  # 递归排序左右两部分
\`\`\`

**一句话**：选一个基准，比它小的放左边，比它大的放右边，然后对左右两边做同样的事。

---

### 复杂度

| | 平均 | 最坏 |
|--|:----:|:----:|
| 时间 | O(n log n) | O(n²) |
| 空间 | O(log n) | O(n) |

最坏情况发生在每次选的基准都是最大或最小值（比如已排序数组）。解决方法：随机选基准。

---

### 快排 vs 归并排序

| | 快速排序 | 归并排序 |
|--|---------|---------|
| 思路 | 先分再排 | 先排再合 |
| 空间 | O(log n) 原地 | O(n) 额外空间 |
| 稳定性 | 不稳定 | 稳定 |
| 实际表现 | 通常更快 | 数据量大时稳定 |

> 快排是"面试之王"——90% 的面试手写排序都是考快排。理解它 = 理解分治 = 理解递归的威力。`,
      starterCode: `# 快速排序实现
def quicksort(arr):
    """快速排序 O(n log n)"""
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quicksort(left) + middle + quicksort(right)

# 测试
test_data = [3, 6, 8, 10, 1, 2, 1, 5]
print(f"原始数据：{test_data}")
print(f"快排结果：{quicksort(test_data)}")
print(f"内置 sort：{sorted(test_data)}")
print(f"结果一致：{quicksort(test_data) == sorted(test_data)}")

# 性能演示（与冒泡排序对比）
import time
import random

# 生成 1000 个随机数
data = [random.randint(1, 1000) for _ in range(1000)]

# 快排
start = time.time()
result_quick = quicksort(data)
quick_time = time.time() - start

# 冒泡排序（对副本排序）
def bubble_sort(arr):
    arr = arr.copy()
    n = len(arr)
    for i in range(n):
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

start = time.time()
result_bubble = bubble_sort(data)
bubble_time = time.time() - start

print(f"\\n在 1000 个数据上测试：")
print(f"  快速排序：{quick_time:.4f} 秒 — O(n log n)")
print(f"  冒泡排序：{bubble_time:.4f} 秒 — O(n²)")
print(f"  内置 sort：{sorted(data) == result_quick}（结果一致）")

# 验证正确性
assert result_quick == sorted(data), "排序结果不正确！"
print(f"\\n✅ 排序验证通过！")`,
      expectedOutput: `原始数据：[3, 6, 8, 10, 1, 2, 1, 5]
快排结果：[1, 1, 2, 3, 5, 6, 8, 10]
内置 sort：[1, 1, 2, 3, 5, 6, 8, 10]
结果一致：True

在 1000 个数据上测试：
  快速排序：0.0020 秒 — O(n log n)
  冒泡排序：0.0400 秒 — O(n²)
  内置 sort：True（结果一致）

✅ 排序验证通过！`,
      hint: '快排的核心是"选基准 + 分区"两个步骤。理解之后你会发现它其实很简单：随便挑一个数，比它小的放左边，大的放右边，然后递归。这就是分治的全部秘密。',
      validation: quicksortPerformanceValidation,
    },
  ],
};

export const part5Chapters: Chapter[] = [ch21, ch22, p5, ch23, ch24, ch25, ch25a, ch26, ch27, ch27a, p6];
