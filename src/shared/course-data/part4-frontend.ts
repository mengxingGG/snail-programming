// 🎨 第四部分：前端世界 — Ch16 ~ Ch17a + P4（17 节）
// 概念卡片讲解 HTML/CSS/DOM，代码练习用 TypeScript 建模前端概念

import type { Chapter } from '../types/course';

// ─────────────────────────────────────────────────────────────
//  Ch16 — HTML：网页的骨架（5 节）
// ─────────────────────────────────────────────────────────────
const ch16: Chapter = {
  id: 'ch16',
  title: 'HTML：网页的骨架',
  description: 'HTML 标签结构、常用元素、表单设计',
  sections: [
    {
      id: '16.1',
      kind: 'demo',
      chapterId: 'ch16',
      title: 'HTML 结构 — 标签、属性',
      content: `## HTML：网页的骨架

HTML（超文本标记语言）用**标签（tag）**来描述网页的结构。

---

### 基本结构

\`\`\`html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8">
    <title>蜗牛编程</title>
  </head>
  <body>
    <h1>你好，世界！</h1>
    <p>这是一个段落。</p>
  </body>
</html>
\`\`\`

---

### 标签的组成

\`\`\`html
<a href="https://example.com" class="link">点我</a>
↑        ↑ 属性名  ↑ 属性值                ↑ 内容  ↑ 结束标签
开始标签
\`\`\`

- 标签成对出现：\`<h1>\` 和 \`</h1>\`
- 属性写在开始标签里
- 有些标签自闭合：\`<img />\`、\`<br />\`

---

### 语义化标签

\`<header>\`、\`<nav>\`、\`<main>\`、\`<footer>\` 让 HTML 有意义，而不只是 \`<div>\`。`,
      starterCode: `// 用 TypeScript 模拟 HTML 标签生成器
function tag(name: string, content: string, attrs: Record<string, string> = {}): string {
  const attrStr = Object.entries(attrs)
    .map(([k, v]) => \` \${k}="\${v}"\`)
    .join("")
  return \`<\${name}\${attrStr}>\${content}</\${name}>\`
}

const h1 = tag("h1", "蜗牛编程")
const p = tag("p", "学 TypeScript 好轻松！", { class: "intro" })
const a = tag("a", "访问官网", { href: "https://example.com", target: "_blank" })

console.log(h1)
console.log(p)
console.log(a)`,
      expectedOutput: `<h1>蜗牛编程</h1>
<p class="intro">学 TypeScript 好轻松！</p>
<a href="https://example.com" target="_blank">访问官网</a>`,
      hint: 'Object.entries 把对象的键值对变成数组，.map 再把每对转成 key="value" 字符串',
    },
    {
      id: '16.2',
      kind: 'demo',
      chapterId: 'ch16',
      title: '常用标签 — 标题/段落/链接/图片',
      content: `## 最常用的 HTML 标签

---

### 文本类

\`\`\`html
<h1>最大标题</h1>  <h6>最小标题</h6>
<p>段落文字</p>
<strong>粗体</strong>  <em>斜体</em>
<span>行内文字</span>
\`\`\`

---

### 链接和图片

\`\`\`html
<a href="https://example.com">链接文字</a>
<img src="photo.jpg" alt="照片描述" width="200">
\`\`\`

---

### 列表

\`\`\`html
<!-- 无序列表 -->
<ul>
  <li>苹果</li>
  <li>香蕉</li>
</ul>

<!-- 有序列表 -->
<ol>
  <li>第一步</li>
  <li>第二步</li>
</ol>
\`\`\`

---

### 容器

\`\`\`html
<div>块级容器（独占一行）</div>
<span>行内容器（不换行）</span>
\`\`\``,
      starterCode: `// 模拟生成 HTML 列表
function ul(items: string[]): string {
  const listItems = items.map(item => \`  <li>\${item}</li>\`).join("\\n")
  return \`<ul>\\n\${listItems}\\n</ul>\`
}

function ol(items: string[]): string {
  const listItems = items.map(item => \`  <li>\${item}</li>\`).join("\\n")
  return \`<ol>\\n\${listItems}\\n</ol>\`
}

const fruits = ["苹果 🍎", "香蕉 🍌", "橙子 🍊"]
const steps = ["安装 Node.js", "创建项目", "写第一行代码"]

console.log(ul(fruits))
console.log("")
console.log(ol(steps))`,
      expectedOutput: `<ul>
  <li>苹果 🍎</li>
  <li>香蕉 🍌</li>
  <li>橙子 🍊</li>
</ul>

<ol>
  <li>安装 Node.js</li>
  <li>创建项目</li>
  <li>写第一行代码</li>
</ol>`,
      hint: '.join("\\n") 把数组元素用换行符连起来——记得 \\n 在字符串里代表换行',
    },
    {
      id: '16.3',
      kind: 'demo',
      chapterId: 'ch16',
      title: '表单 — 让用户输入',
      content: `## 表单：收集用户输入

表单（\`<form>\`）是网页和用户交互最重要的方式：

\`\`\`html
<form action="/login" method="POST">
  <label for="username">用户名：</label>
  <input type="text" id="username" name="username" required>

  <label for="password">密码：</label>
  <input type="password" id="password" name="password">

  <button type="submit">登录</button>
</form>
\`\`\`

---

### 常用 input 类型

| type | 用途 |
|------|------|
| text | 文本输入 |
| password | 密码（隐藏显示） |
| email | 邮箱（自动验证格式） |
| number | 数字 |
| checkbox | 复选框 |
| radio | 单选框 |
| submit | 提交按钮 |

---

**\`name\` 属性是关键**——表单提交时，服务器用 \`name\` 来识别每个字段。`,
      starterCode: `// 模拟表单数据的收集和验证
interface FormField {
  name: string
  type: string
  required: boolean
  value?: string
}

interface FormSchema {
  fields: FormField[]
  action: string
  method: string
}

function validateForm(schema: FormSchema, data: Record<string, string>): string[] {
  const errors: string[] = []
  for (const field of schema.fields) {
    if (field.required && !data[field.name]?.trim()) {
      errors.push(\`\${field.name} 是必填项\`)
    }
    if (field.type === "email" && data[field.name] && !data[field.name].includes("@")) {
      errors.push(\`\${field.name} 格式不正确\`)
    }
  }
  return errors
}

const loginForm: FormSchema = {
  action: "/login",
  method: "POST",
  fields: [
    { name: "username", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "password", type: "password", required: true },
  ],
}

const validData = { username: "xiaoming", email: "xm@test.com", password: "123456" }
const invalidData = { username: "", email: "notanemail", password: "123456" }

const e1 = validateForm(loginForm, validData)
console.log("合法数据：", e1.length === 0 ? "✅ 通过" : e1)

const e2 = validateForm(loginForm, invalidData)
console.log("非法数据：", e2)`,
      expectedOutput: `合法数据： ✅ 通过
非法数据： [ 'username 是必填项', 'email 格式不正确' ]`,
      hint: '表单验证在前端和后端都要做——前端验证提升体验，后端验证保证安全',
    },
    {
      id: '16.4',
      kind: 'demo',
      chapterId: 'ch16',
      title: 'CSS Grid — 二维布局利器',
      content: `## CSS Grid：比 Flexbox 更强的布局

Flexbox 是**一维**布局（要么横排，要么竖排）。Grid 是**二维**布局——同时控制行和列。

---

### 基本用法

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;  /* 3 等分列 */
  gap: 16px;
}
\`\`\`

---

### fr 单位

\`fr\` 代表"一份剩余空间"，类似 Flexbox 的 \`flex\` 比例：

\`\`\`css
grid-template-columns: 200px 1fr 1fr;
/* 第一列 200px，剩余空间 1:1 分配 */
\`\`\`

---

### Grid + Flexbox 对比

| 特性 | Flexbox | Grid |
|------|---------|------|
| 维度 | 一维（行**或**列） | 二维（行**和**列） |
| 使用场景 | 导航栏、列表、卡片排 | 页面布局、仪表盘 |
| 对齐控制 | justify-content | justify/align + place-items |

**原则**：小范围用 Flexbox，整体页面结构用 Grid。`,
      starterCode: `// 模拟 CSS Grid 的列宽计算
interface GridConfig {
  totalWidth: number
  columns: (number | string)[]  // 数字是固定 px，如 "1fr" 是比例
  gap: number
}

function calcGridColumns(config: GridConfig): number[] {
  const fixedTotal = config.columns
    .filter(c => typeof c === "number")
    .reduce((s, c) => s + (c as number), 0)

  const frTotal = config.columns
    .filter(c => c === "1fr" || c === "2fr")
    .reduce((s, c) => s + (c === "1fr" ? 1 : 2), 0)

  const gapTotal = config.gap * (config.columns.length - 1)
  const remaining = config.totalWidth - fixedTotal - gapTotal

  return config.columns.map(c => {
    if (typeof c === "number") return c
    const fr = c === "1fr" ? 1 : 2
    return Math.round((fr / frTotal) * remaining)
  })
}

const grid = { totalWidth: 960, columns: [200, "1fr", "1fr"] as any[], gap: 20 }
const widths = calcGridColumns(grid)
console.log("Grid 列宽分配：")
widths.forEach((w, i) => console.log(\`  第\${i+1}列：\${w}px\`))`,
      expectedOutput: `Grid 列宽分配：
  第1列：200px
  第2列：360px
  第3列：360px`,
      hint: 'fr 单位表示"份数"——1fr 1fr 就是 1:1，算出剩余空间后按比例分配',
    },
    {
      id: '16.5',
      kind: 'demo',
      chapterId: 'ch16',
      title: '响应式设计 — 适配手机到桌面',
      content: `## 响应式设计：一套代码，适配所有屏幕

用户可能在手机、平板、桌面浏览器上打开你的网页——响应式设计让它在所有设备上都好看。

---

### 核心工具：媒体查询（Media Query）

\`\`\`css
/* 默认样式（手机） */
.card { width: 100%; }

/* 平板及以上（≥768px） */
@media (min-width: 768px) {
  .card { width: 50%; }
}

/* 桌面（≥1024px） */
@media (min-width: 1024px) {
  .card { width: 33.33%; }
}
\`\`\`

---

### 移动优先（Mobile First）

先写手机版样式（最简），再用 \`@media (min-width)\` 逐步增强大屏样式——这叫**渐进增强**。

---

### 响应式图片

\`\`\`css
img { max-width: 100%; height: auto; }
/* 图片不会超出容器宽度 */
\`\`\`

---

### 常用断点

| 断点 | 设备 |
|------|------|
| 480px | 大屏手机 |
| 768px | 平板 |
| 1024px | 小桌面 |
| 1280px | 标准桌面 |`,
      starterCode: `// 模拟响应式断点系统
type Breakpoint = "mobile" | "tablet" | "desktop"

function getBreakpoint(width: number): Breakpoint {
  if (width >= 1024) return "desktop"
  if (width >= 768) return "tablet"
  return "mobile"
}

function responsiveLayout(screenWidth: number, columns: number): void {
  const bp = getBreakpoint(screenWidth)
  const cols = bp === "mobile" ? 1 : bp === "tablet" ? Math.min(2, columns) : columns

  console.log(\`屏幕 \${screenWidth}px → \${bp} → \${cols} 列布局\`)
}

const widths = [375, 768, 1024, 1440]
widths.forEach(w => responsiveLayout(w, 3))

// 响应式字体大小
function responsiveFontSize(baseSize: number, screenWidth: number): number {
  const scale = Math.min(screenWidth / 375, 1.5)  // 最多放大 1.5 倍
  return Math.round(baseSize * scale * 10) / 10
}

console.log("")
console.log("响应式字体（基础16px）：")
widths.forEach(w => console.log(\`  \${w}px → \${responsiveFontSize(16, w)}px\`))`,
      expectedOutput: `屏幕 375px → mobile → 1 列布局
屏幕 768px → tablet → 2 列布局
屏幕 1024px → desktop → 3 列布局
屏幕 1440px → desktop → 3 列布局

响应式字体（基础16px）：
  375px → 16px
  768px → 24px
  1024px → 24px
  1440px → 24px`,
      hint: '移动优先：先写小屏样式作为默认，再用 min-width 逐步增强——而不是反过来',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch17 — CSS与DOM：网页的样式与交互（7 节）
// ─────────────────────────────────────────────────────────────
const ch17: Chapter = {
  id: 'ch17',
  title: 'CSS与DOM：网页的样式与交互',
  description: 'CSS选择器/颜色/盒模型/Flexbox，以及DOM事件/表单/存储',
  sections: [
    {
      id: '17.1',
      kind: 'demo',
      chapterId: 'ch17',
      title: '选择器 — 想改谁',
      content: `## CSS：控制网页样式的语言

CSS（层叠样式表）决定网页元素**看起来是什么样子**。

基本格式：
\`\`\`css
选择器 {
  属性名: 属性值;
}
\`\`\`

---

### 三种基本选择器

\`\`\`css
/* 标签选择器：所有 p 标签 */
p { color: blue; }

/* 类选择器：class="title" 的元素 */
.title { font-size: 24px; }

/* ID 选择器：id="header" 的元素（唯一） */
#header { background: black; }
\`\`\`

---

### 组合选择器

\`\`\`css
/* 后代选择器：.card 内部的所有 p */
.card p { font-size: 14px; }

/* 子元素选择器：.nav 的直接 li 子元素 */
.nav > li { display: inline; }

/* 伪类：鼠标悬停 */
button:hover { background: #ddd; }
\`\`\``,
      starterCode: `// 模拟 CSS 选择器和规则系统
interface CssRule {
  selector: string
  properties: Record<string, string>
}

function applyStyles(rules: CssRule[]): string {
  return rules.map(rule => {
    const props = Object.entries(rule.properties)
      .map(([k, v]) => \`  \${k}: \${v};\`)
      .join("\\n")
    return \`\${rule.selector} {\\n\${props}\\n}\`
  }).join("\\n\\n")
}

const stylesheet: CssRule[] = [
  { selector: "body", properties: { "font-family": "sans-serif", "margin": "0" } },
  { selector: ".title", properties: { "font-size": "24px", "color": "#333" } },
  { selector: "button:hover", properties: { "background": "#007bff", "color": "white" } },
]

console.log(applyStyles(stylesheet))`,
      expectedOutput: `body {
  font-family: sans-serif;
  margin: 0;
}

.title {
  font-size: 24px;
  color: #333;
}

button:hover {
  background: #007bff;
  color: white;
}`,
      hint: 'CSS 规则的格式就是"选择器 { 属性: 值; }"，TypeScript 模拟时用对象来表示这个结构',
    },
    {
      id: '17.2',
      kind: 'demo',
      chapterId: 'ch17',
      title: '颜色、字体、间距',
      content: `## 最基础的三类 CSS 属性

---

### 颜色

\`\`\`css
color: red;                /* 文字颜色 */
background-color: #f0f0f0; /* 背景颜色 */

/* 颜色写法 */
color: red;              /* 颜色名 */
color: #FF5733;          /* 十六进制 */
color: rgb(255, 87, 51); /* RGB */
color: rgba(0,0,0,0.5);  /* RGBA（带透明度） */
\`\`\`

---

### 字体

\`\`\`css
font-size: 16px;        /* 字体大小 */
font-weight: bold;      /* 粗体 */
font-family: sans-serif;/* 字体族 */
line-height: 1.6;       /* 行高 */
text-align: center;     /* 对齐方式 */
\`\`\`

---

### 间距（盒模型的外层）

\`\`\`css
margin: 16px;           /* 外边距（元素外部） */
padding: 12px;          /* 内边距（元素内部） */
margin: 8px 16px;       /* 上下8 左右16 */
margin: 4px 8px 4px 8px;/* 上 右 下 左 */
\`\`\``,
      starterCode: `// 计算颜色亮度（用于决定文字颜色是黑还是白）
function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b]
}

function getLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255
}

function getTextColor(bgColor: string): string {
  return getLuminance(bgColor) > 0.5 ? "#000000" : "#ffffff"
}

const colors = ["#FFFFFF", "#000000", "#007BFF", "#FFC107", "#28A745"]

colors.forEach(bg => {
  const text = getTextColor(bg)
  console.log(\`背景 \${bg} → 文字用 \${text}\`)
})`,
      expectedOutput: `背景 #FFFFFF → 文字用 #000000
背景 #000000 → 文字用 #ffffff
背景 #007BFF → 文字用 #ffffff
背景 #FFC107 → 文字用 #000000
背景 #28A745 → 文字用 #ffffff`,
      hint: '亮度公式：0.299R + 0.587G + 0.114B，这三个系数是人眼对颜色感知的权重',
    },
    {
      id: '17.3',
      kind: 'demo',
      chapterId: 'ch17',
      title: '盒模型 — 每个元素都是一个盒子',
      content: `## 盒模型：CSS 布局的基础

每个 HTML 元素都是一个**矩形盒子**，从内到外有四层：

\`\`\`
┌─────────────────────────────┐
│         margin（外边距）      │
│  ┌───────────────────────┐  │
│  │      border（边框）    │  │
│  │  ┌─────────────────┐  │  │
│  │  │  padding（内边距）│  │  │
│  │  │  ┌───────────┐  │  │  │
│  │  │  │  content  │  │  │  │
│  │  │  └───────────┘  │  │  │
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
\`\`\`

---

### CSS 写法

\`\`\`css
.box {
  width: 200px;
  height: 100px;
  padding: 16px;
  border: 2px solid #ccc;
  margin: 8px;
  box-sizing: border-box;  /* 推荐！让 width 包含 padding 和 border */
}
\`\`\``,
      starterCode: `// 计算盒模型各层尺寸
interface BoxModel {
  contentWidth: number
  contentHeight: number
  paddingTop: number; paddingRight: number; paddingBottom: number; paddingLeft: number
  borderWidth: number
  marginTop: number; marginRight: number; marginBottom: number; marginLeft: number
}

function calcBoxSize(box: BoxModel) {
  const totalWidth = box.contentWidth
    + box.paddingLeft + box.paddingRight
    + box.borderWidth * 2
    + box.marginLeft + box.marginRight

  const totalHeight = box.contentHeight
    + box.paddingTop + box.paddingBottom
    + box.borderWidth * 2
    + box.marginTop + box.marginBottom

  return { totalWidth, totalHeight }
}

const card: BoxModel = {
  contentWidth: 200, contentHeight: 150,
  paddingTop: 16, paddingRight: 20, paddingBottom: 16, paddingLeft: 20,
  borderWidth: 2,
  marginTop: 8, marginRight: 8, marginBottom: 8, marginLeft: 8,
}

const { totalWidth, totalHeight } = calcBoxSize(card)
console.log(\`内容区：\${card.contentWidth} × \${card.contentHeight}px\`)
console.log(\`含 padding：\${card.contentWidth + card.paddingLeft + card.paddingRight} × \${card.contentHeight + card.paddingTop + card.paddingBottom}px\`)
console.log(\`含 border：\${card.contentWidth + card.paddingLeft + card.paddingRight + card.borderWidth * 2} × \${card.contentHeight + card.paddingTop + card.paddingBottom + card.borderWidth * 2}px\`)
console.log(\`总占用空间（含 margin）：\${totalWidth} × \${totalHeight}px\`)`,
      expectedOutput: `内容区：200 × 150px
含 padding：240 × 182px
含 border：244 × 186px
总占用空间（含 margin）：260 × 202px`,
      hint: 'box-sizing: border-box 让 width/height 包含 padding 和 border，是现代 CSS 的推荐设置',
    },
    {
      id: '17.4',
      kind: 'demo',
      chapterId: 'ch17',
      title: 'Flexbox — 布局不用愁',
      content: `## Flexbox：现代 CSS 布局利器

传统的 CSS 布局（float、position）很麻烦。**Flexbox** 让布局变得简单直观：

---

### 基本用法

\`\`\`css
.container {
  display: flex;           /* 启用 Flexbox */
  flex-direction: row;     /* 横向排列（默认） */
  justify-content: center; /* 主轴对齐：水平居中 */
  align-items: center;     /* 交叉轴对齐：垂直居中 */
  gap: 16px;               /* 子元素间距 */
}
\`\`\`

---

### 常用属性

| 属性 | 常用值 | 效果 |
|------|--------|------|
| \`flex-direction\` | row / column | 横排/竖排 |
| \`justify-content\` | center / space-between / flex-end | 主轴对齐 |
| \`align-items\` | center / flex-start / stretch | 交叉轴对齐 |
| \`flex-wrap\` | wrap / nowrap | 是否换行 |

---

### 子元素

\`\`\`css
.item { flex: 1; }  /* 平均分配剩余空间 */
\`\`\``,
      starterCode: `// 模拟 Flexbox 布局的空间分配
interface FlexItem {
  name: string
  flex: number    // flex-grow 比例
  minWidth: number
}

function calcFlexLayout(containerWidth: number, items: FlexItem[], gap: number): void {
  const totalGap = gap * (items.length - 1)
  const totalFlex = items.reduce((s, i) => s + i.flex, 0)
  const remaining = containerWidth - totalGap - items.reduce((s, i) => s + i.minWidth, 0)

  console.log(\`容器宽度：\${containerWidth}px，间距总计：\${totalGap}px\`)
  console.log("各元素宽度：")

  items.forEach(item => {
    const extra = (item.flex / totalFlex) * remaining
    const width = Math.round(item.minWidth + extra)
    console.log(\`  \${item.name.padEnd(10)}: \${width}px (flex=\${item.flex})\`)
  })
}

calcFlexLayout(800, [
  { name: "侧边栏", flex: 1, minWidth: 0 },
  { name: "主内容", flex: 3, minWidth: 0 },
  { name: "右侧栏", flex: 1, minWidth: 0 },
], 16)`,
      expectedOutput: `容器宽度：800px，间距总计：32px
各元素宽度：
  侧边栏       : 154px (flex=1)
  主内容       : 461px (flex=3)
  右侧栏       : 154px (flex=1)`,
      hint: 'flex: 1 2 1 的比例就是 1:3:1，剩余空间按这个比例分配——这是 Flexbox 的核心',
    },
    {
      id: '17.5',
      kind: 'demo',
      chapterId: 'ch17',
      title: '事件委托 — 高效的事件处理',
      content: `## 事件委托：一个监听器管理多个元素

假设有一个列表，每个 \`<li>\` 都需要点击处理。如果给每个 \`<li>\` 单独绑定事件——太浪费！

---

### 事件冒泡（Event Bubbling）

子元素的事件会**向上冒泡**到父元素：

\`\`\`
<div onclick="...">         ← 事件冒泡到这里
  <ul>
    <li>项目 1</li>          ← 点击发生在这里
    <li>项目 2</li>
  </ul>
</div>
\`\`\`

---

### 委托模式

在**父元素**上绑一个监听器，用 \`event.target\` 判断具体是哪个子元素：

\`\`\`typescript
// ❌ 给每个 li 绑定（性能差，新元素需要重新绑定）
document.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', handleClick)
})

// ✅ 事件委托（在 ul 上绑一个）
document.querySelector('ul')!.addEventListener('click', (e) => {
  const li = (e.target as HTMLElement).closest('li')
  if (li) handleClick(li)
})
\`\`\`

**优势**：新动态添加的元素也会自动生效，无需重新绑定！`,
      starterCode: `// 模拟事件委托系统
interface ClickEvent { target: { id: string; tag: string } }

class EventDelegator {
  private handlers: Record<string, (e: ClickEvent) => void> = {}

  on(selector: string, handler: (e: ClickEvent) => void) {
    this.handlers[selector] = handler
  }

  // 模拟事件冒泡：从 target 逐层匹配选择器
  dispatch(e: ClickEvent) {
    const id = e.target.id
    // 检查是否匹配任意选择器（这里简化：id 匹配就触发）
    for (const [selector, handler] of Object.entries(this.handlers)) {
      if (id === selector || id.startsWith(selector.replace("#", ""))) {
        handler(e)
      }
    }
  }
}

const delegator = new EventDelegator()

// 在父元素上统一绑定
delegator.on("#list", (e) => {
  console.log(\`列表项被点击：\${e.target.id}\`)
})

// 模拟点击不同子元素
const clicks: ClickEvent[] = [
  { target: { id: "item-1", tag: "li" } },
  { target: { id: "item-2", tag: "li" } },
  { target: { id: "item-3", tag: "li" } },
]

clicks.forEach(c => {
  console.log("点击 " + c.target.id)
  delegator.dispatch(c)
})`,
      expectedOutput: `点击 item-1
点击 item-2
点击 item-3`,
      hint: 'closest("li") 方法向上查找最近的匹配祖先——事件委托中用它判断点击的是哪个子元素',
    },
    {
      id: '17.6',
      kind: 'demo',
      chapterId: 'ch17',
      title: '表单验证 — 前端实时校验',
      content: `## 前端表单验证：让用户少犯错

好的表单验证应该在用户**输入时就**给出反馈，而不是等提交后才报一堆错。

---

### 验证时机

| 时机 | 适合场景 |
|------|----------|
| 失去焦点（blur）| 用户名是否存在 |
| 实时输入（input）| 密码强度指示 |
| 提交时（submit）| 最终全面检查 |

---

### 常见验证规则

\`\`\`typescript
const rules = {
  required: (v: string) => v.trim() !== '' || '此项必填',
  minLength: (n: number) => (v: string) => v.length >= n || \`至少 \${n} 个字符\`,
  isEmail: (v: string) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v) || '邮箱格式不正确',
  isPhone: (v: string) => /^1[3-9]\\d{9}$/.test(v) || '手机号格式不正确',
}
\`\`\`

---

### 错误展示

每个字段旁边显示错误信息，用红色文字提示——不要用 alert 弹窗打断用户。`,
      starterCode: `// 构建一个可组合的表单验证系统
type Rule = (value: string) => string | null  // null 表示通过

const rules: Record<string, Rule> = {
  required: (v) => v.trim() ? null : "此项必填",
  min3: (v) => v.length >= 3 ? null : "至少 3 个字符",
  isEmail: (v) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v) ? null : "邮箱格式不正确",
}

function validate(value: string, fieldRules: Rule[]): string[] {
  return fieldRules.map(r => r(value)).filter((m): m is string => m !== null)
}

interface Field { name: string; value: string; rules: Rule[] }

function validateForm(fields: Field[]): void {
  console.log("表单验证结果：")
  fields.forEach(f => {
    const errors = validate(f.value, f.rules)
    if (errors.length === 0) {
      console.log(\`  ✅ \${f.name}：通过\`)
    } else {
      console.log(\`  ❌ \${f.name}：\${errors.join("；")}\`)
    }
  })
}

validateForm([
  { name: "用户名", value: "xm", rules: [rules.required, rules.min3] },
  { name: "邮箱", value: "not-email", rules: [rules.required, rules.isEmail] },
  { name: "备注", value: "", rules: [rules.required] },
])`,
      expectedOutput: `表单验证结果：
  ❌ 用户名：至少 3 个字符
  ❌ 邮箱：邮箱格式不正确
  ❌ 备注：此项必填`,
      hint: '每个验证规则返回 null（通过）或错误信息（不通过），组合多个规则就能灵活校验',
    },
    {
      id: '17.7',
      kind: 'demo',
      chapterId: 'ch17',
      title: '本地存储 — localStorage',
      content: `## localStorage：把数据留在浏览器里

\`localStorage\` 是浏览器提供的**本地键值存储**，数据不会随着页面刷新而丢失。

---

### 基本操作

\`\`\`typescript
// 写入（只能存字符串！）
localStorage.setItem('theme', 'dark')

// 读取
const theme = localStorage.getItem('theme')  // 'dark'

// 删除
localStorage.removeItem('theme')

// 清空所有
localStorage.clear()
\`\`\`

---

### 存对象要用 JSON

\`\`\`typescript
// 存对象
const user = { name: '小明', age: 18 }
localStorage.setItem('user', JSON.stringify(user))

// 读对象
const saved = JSON.parse(localStorage.getItem('user') || '{}')
\`\`\`

---

### 典型用途

| 场景 | 例子 |
|------|------|
| 主题偏好 | 深色/浅色模式 |
| 草稿保存 | 表单未提交的内容 |
| 用户设置 | 语言、字体大小 |
| 登录状态 | token（注意安全！） |

---

### 注意事项

- 容量约 **5MB**（不同浏览器有差别）
- **不能存敏感信息**（token 应该用 httpOnly cookie）
- 同源策略：每个域名有自己的 localStorage`,
      starterCode: `// 模拟 localStorage 的存取操作
class LocalStorage {
  private store: Record<string, string> = {}

  setItem(key: string, value: string) { this.store[key] = value }
  getItem(key: string): string | null { return this.store[key] ?? null }
  removeItem(key: string) { delete this.store[key] }
  getAllKeys(): string[] { return Object.keys(this.store) }
}

const storage = new LocalStorage()

// 保存用户偏好
storage.setItem("theme", "dark")
storage.setItem("fontSize", "16")

// 保存对象（JSON 序列化）
const preferences = { language: "zh", autoSave: true, draftTitle: "我的文章" }
storage.setItem("preferences", JSON.stringify(preferences))

// 读取
console.log("主题：" + storage.getItem("theme"))
console.log("字体大小：" + storage.getItem("fontSize"))

const savedPrefs = JSON.parse(storage.getItem("preferences")!)
console.log("偏好设置：", savedPrefs)
console.log("存储键：" + storage.getAllKeys().join(", "))`,
      expectedOutput: `主题：dark
字体大小：16
偏好设置： { language: 'zh', autoSave: true, draftTitle: '我的文章' }
存储键：theme, fontSize, preferences`,
      hint: 'localStorage 只能存字符串——存对象时先用 JSON.stringify 序列化，取出时用 JSON.parse 还原',
    },
  ],
};


//  Ch17b — 从 Playground 到真实项目（3 节）
//  这一章教你离开在线编辑器，在本地搭建真实项目
// ─────────────────────────────────────────────────────────────
//  Ch17a — Fetch API：与后端交互（2 节）
// ─────────────────────────────────────────────────────────────
const ch17a: Chapter = {
  id: 'ch17a',
  title: 'Fetch API：与后端交互',
  description: '用 fetch 发送 HTTP 请求，解析 JSON，更新 DOM',
  sections: [
    {
      id: '17a.1',
      kind: 'demo',
      chapterId: 'ch17a',
      title: 'fetch 基础 — GET 和 POST',
      content: `## fetch：前端发起 HTTP 请求的标准方式

之前我们在 React 里用过 fetch，现在深入理解它的每一个步骤。

---

### GET 请求（获取数据）

\`\`\`typescript
// 1. 发起请求
const response = await fetch('/api/data')

// 2. 检查状态
if (!response.ok) {
  throw new Error(\`HTTP Error: \${response.status}\`)
}

// 3. 解析响应
const data = await response.json()
\`\`\`

---

### POST 请求（提交数据）

\`\`\`typescript
const response = await fetch('/api/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: '新文章', content: '...' }),
})

const result = await response.json()
console.log('创建成功，ID：', result.id)
\`\`\`

---

### fetch 的四个关键属性

| 属性 | 说明 |
|------|------|
| \`response.ok\` | 状态码 200-299 → true |
| \`response.status\` | HTTP 状态码数字 |
| \`response.json()\` | 解析 JSON 响应体（返回 Promise） |
| \`response.text()\` | 解析为纯文本 |`,
      starterCode: `// 模拟 fetch 的完整请求生命周期
interface FetchResponse {
  ok: boolean; status: number
  json: () => Promise<any>
  text: () => Promise<string>
}

async function mockFetch(url: string, options?: { method?: string; body?: string }): Promise<FetchResponse> {
  await new Promise(r => setTimeout(r, 0))  // 模拟网络延迟
  const method = options?.method || "GET"

  if (url === "/api/status" && method === "GET") {
    return { ok: true, status: 200, json: async () => ({ server: "running" }), text: async () => "OK" }
  }
  if (url === "/api/echo" && method === "POST") {
    const body = JSON.parse(options?.body || "{}")
    return { ok: true, status: 201, json: async () => ({ received: body }), text: async () => JSON.stringify(body) }
  }
  return { ok: false, status: 404, json: async () => ({ error: "Not Found" }), text: async () => "Not Found" }
}

async function getStatus() {
  const res = await mockFetch("/api/status")
  console.log(\`GET /api/status → \${res.status} \${res.ok ? "✅" : "❌"}\`)
  if (res.ok) console.log("  数据：", await res.json())
}

async function postEcho(data: object) {
  const res = await mockFetch("/api/echo", {
    method: "POST",
    body: JSON.stringify(data),
  })
  console.log(\`POST /api/echo → \${res.status}\`)
  console.log("  返回：", await res.json())
}

getStatus().then(() => postEcho({ message: "你好，后端！" }))`,
      expectedOutput: `GET /api/status → 200 ✅
  数据： { server: 'running' }
POST /api/echo → 201
  返回： { received: { message: '你好，后端！' } }`,
      hint: 'response.json() 本身也返回 Promise——所以必须 await 两次：先 await fetch，再 await .json()',
    },
    {
      id: '17a.2',
      kind: 'demo',
      chapterId: 'ch17a',
      title: '与 DOM 结合 — 请求数据并渲染',
      content: `## 从 API 拿数据，动态更新网页

这是前端最核心的模式：**获取数据 → 渲染到 DOM**。

---

### 完整流程

\`\`\`typescript
async function loadAndRender() {
  // 1. 显示加载状态
  showSpinner()

  try {
    // 2. 获取数据
    const res = await fetch('/api/articles')
    if (!res.ok) throw new Error('加载失败')
    const articles = await res.json()

    // 3. 清空旧内容，渲染新数据
    const container = document.getElementById('list')!
    container.innerHTML = articles.map(a =>
      \`<article><h3>\${a.title}</h3><p>\${a.summary}</p></article>\`
    ).join('')
  } catch (e) {
    // 4. 显示错误
    showError(e.message)
  } finally {
    hideSpinner()
  }
}
\`\`\`

---

### 三种状态始终要处理

\`\`\`
加载中（loading）→ 成功（有数据）→ 失败（错误提示）
                → 成功（空数据）→ 空状态提示
\`\`\`

这是前端开发中最重要的 UX 模式之一。`,
      starterCode: `// 模拟"获取数据 → 渲染 DOM"的完整流程
interface Article { id: number; title: string; summary: string }
type State = "loading" | "loaded" | "error" | "empty"

class ArticleRenderer {
  private articles: Article[] = []
  private state: State = "loading"

  async fetchArticles(): Promise<Article[]> {
    // 模拟 API 请求
    await new Promise(r => setTimeout(r, 0))
    return [
      { id: 1, title: "TypeScript 入门", summary: "从零开始学 TS" },
      { id: 2, title: "DOM 操作实战", summary: "掌握前端交互" },
      { id: 3, title: "Fetch API 指南", summary: "与后端通信" },
    ]
  }

  async load() {
    this.state = "loading"
    this.render()

    try {
      this.articles = await this.fetchArticles()
      this.state = this.articles.length === 0 ? "empty" : "loaded"
    } catch {
      this.state = "error"
    }

    this.render()
  }

  render() {
    const messages: Record<State, string> = {
      loading: "⏳ 加载中...",
      error: "❌ 加载失败，请重试",
      empty: "📭 暂无内容",
      loaded: \`✅ 共 \${this.articles.length} 篇文章：\\n\${this.articles.map(a => \`  [\${a.id}] \${a.title}\`).join("\\n")}\`,
    }
    console.log(messages[this.state])
  }
}

const renderer = new ArticleRenderer()
renderer.load()`,
      expectedOutput: `⏳ 加载中...
✅ 共 3 篇文章：
  [1] TypeScript 入门
  [2] DOM 操作实战
  [3] Fetch API 指南`,
      hint: '渲染函数只负责"根据状态输出 HTML"，不关心数据从哪来——这就是关注点分离',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  实战项目 P4 — 前端交互式仪表盘（3 节）
// ─────────────────────────────────────────────────────────────
const p4: Chapter = {
  id: 'p4',
  title: '实战：交互式仪表盘',
  description: '综合运用 HTML/CSS/DOM/Chart.js，构建数据可视化仪表盘',
  sections: [
    {
      id: 'p4.1',
      kind: 'demo',
      chapterId: 'p4',
      title: 'HTML 结构 + CSS Grid 布局',
      content: `## 仪表盘的整体布局

用 CSS Grid 搭建一个典型的仪表盘布局：

---

### 布局设计

\`\`\`
┌──────────────────────────────────┐
│           顶部导航栏              │
├──────────┬──────────┬────────────┤
│          │          │            │
│  统计卡片 │  统计卡片 │  统计卡片  │
│          │          │            │
├──────────┴──────────┼────────────┤
│                     │            │
│     主图表区         │  侧边面板   │
│                     │            │
└─────────────────────┴────────────┘
\`\`\`

---

### Grid 实现

\`\`\`css
.dashboard {
  display: grid;
  grid-template-areas:
    "header  header  header"
    "cards   cards   cards"
    "chart   chart   sidebar";
  grid-template-columns: 1fr 1fr 300px;
  gap: 16px;
}
\`\`\`

\`grid-template-areas\` 让你用**可视化命名**的方式定义布局，比数字坐标直观得多。`,
      starterCode: `// 用 TypeScript 模拟仪表盘的 Grid 布局计算
interface GridArea {
  name: string
  row: number      // 起始行
  col: number      // 起始列
  rowSpan: number  // 跨行数
  colSpan: number  // 跨列数
}

interface DashboardLayout {
  width: number
  columns: number[]
  areas: GridArea[]
}

function renderLayout(layout: DashboardLayout): string[] {
  const lines: string[] = []
  const cols = layout.columns
  const colNames = cols.map((w, i) => \`\${w}px\`).join(" | ")

  lines.push(\`仪表盘布局（总宽 \${cols.reduce((s, w) => s + w, 0)}px）\`)
  lines.push("列宽：" + colNames)
  lines.push("")

  layout.areas.forEach(area => {
    const x = cols.slice(0, area.col).reduce((s, w) => s + w, 0)
    const w = cols.slice(area.col, area.col + area.colSpan).reduce((s, c) => s + c, 0)
    lines.push(\`[\${area.name}] 起始列\${area.col+1}，宽\${w}px，跨\${area.colSpan}列\`)
  })
  return lines
}

const layout: DashboardLayout = {
  width: 1200,
  columns: [400, 400, 400],
  areas: [
    { name: "导航栏", row: 1, col: 0, rowSpan: 1, colSpan: 3 },
    { name: "卡片1", row: 2, col: 0, rowSpan: 1, colSpan: 1 },
    { name: "卡片2", row: 2, col: 1, rowSpan: 1, colSpan: 1 },
    { name: "卡片3", row: 2, col: 2, rowSpan: 1, colSpan: 1 },
    { name: "主图表", row: 3, col: 0, rowSpan: 1, colSpan: 2 },
    { name: "侧边栏", row: 3, col: 2, rowSpan: 1, colSpan: 1 },
  ],
}

renderLayout(layout).forEach(l => console.log(l))`,
      expectedOutput: `📊 已创建的表: articles, comments, sqlite_sequence, users
  articles: id(INTEGER), title(TEXT), content(TEXT), author(TEXT), created_at(TIMESTAMP)
  comments: id(INTEGER), article_id(INTEGER), author(TEXT), content(TEXT), created_at(TIMESTAMP)
  sqlite_sequence: name(), seq()
  users: id(INTEGER), username(TEXT), password_hash(TEXT)`,
      hint: 'grid-template-areas 用命名区域布局，每个区域用 grid-area 指定起始行列和跨度',
    },
    {
      id: 'p4.2',
      kind: 'demo',
      chapterId: 'p4',
      title: 'DOM 交互 + 数据可视化',
      content: `## 动态更新仪表盘数据

仪表盘的核心：**数据变化 → 自动更新显示**。

---

### 数据流

\`\`\`
原始数据 → 计算统计指标 → 更新卡片数值 → 更新图表
\`\`\`

---

### 与 Chart.js 集成

\`\`\`typescript
// 初始化图表
const ctx = document.getElementById('chart') as HTMLCanvasElement
const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['1月', '2月', '3月'],
    datasets: [{ label: '访问量', data: [120, 200, 150] }],
  },
})

// 数据更新时，修改 data 并重新渲染
function updateChart(newData: number[]) {
  chart.data.datasets[0].data = newData
  chart.update()  // 只需调用 update() —— 动画过渡
}
\`\`\`

---

### 统计卡片更新

\`\`\`typescript
function updateStats(data: number[]) {
  document.getElementById('total')!.textContent = String(data.reduce((s, n) => s + n, 0))
  document.getElementById('avg')!.textContent = String(Math.round(avg(data)))
  document.getElementById('max')!.textContent = String(Math.max(...data))
}
\`\`\``,
      starterCode: `// 模拟仪表盘数据更新和统计计算
interface DashboardData {
  labels: string[]
  values: number[]
}

function computeStats(data: number[]) {
  const total = data.reduce((s, n) => s + n, 0)
  const avg = Math.round(total / data.length)
  const max = Math.max(...data)
  const min = Math.min(...data)
  return { total, avg, max, min }
}

function renderDashboard(d: DashboardData) {
  const stats = computeStats(d.values)
  console.log(\`== 仪表盘 ==\`)
  console.log(\`总计：\${stats.total}  平均：\${stats.avg}  最高：\${stats.max}  最低：\${stats.min}\`)
  console.log("")
  console.log("图表数据：")
  d.labels.forEach((label, i) => {
    const bar = "█".repeat(Math.round(d.values[i] / 20))
    console.log(\`  \${label.padEnd(6)} |\${bar} \${d.values[i]}\`)
  })
}

// 初始数据
renderDashboard({
  labels: ["1月", "2月", "3月", "4月", "5月"],
  values: [120, 200, 150, 80, 230],
})

console.log("")
console.log("--- 数据更新 ---")

// 模拟新数据
renderDashboard({
  labels: ["1月", "2月", "3月", "4月", "5月"],
  values: [180, 250, 190, 120, 300],
})`,
      expectedOutput: `== 仪表盘 ==
总计：780  平均：156  最高：230  最低：80

图表数据：
  1月     |██████ 120
  2月     |██████████ 200
  3月     |████████ 150
  4月     |████ 80
  5月     |████████████ 230

--- 数据更新 ---
== 仪表盘 ==
总计：1040  平均：208  最高：300  最低：120

图表数据：
  1月     |█████████ 180
  2月     |█████████████ 250
  3月     |██████████ 190
  4月     |██████ 120
  5月     |███████████████ 300`,
      hint: '仪表盘的关键设计模式：数据层和视图层分离——数据变了，视图自动更新（和 React 思想一致）',
    },
    {
      id: 'p4.3',
      kind: 'demo',
      chapterId: 'p4',
      title: '响应式 + 暗色模式',
      content: `## 响应式仪表盘 + 主题切换

仪表盘要在不同屏幕上都好用，还要支持暗色模式——这两件事都和 CSS 变量有关。

---

### CSS 变量（Custom Properties）

\`\`\`css
:root {
  --bg-primary: #ffffff;
  --text-primary: #333333;
  --card-bg: #f5f5f5;
}

[data-theme="dark"] {
  --bg-primary: #1a1a2e;
  --text-primary: #e0e0e0;
  --card-bg: #16213e;
}

/* 使用变量 */
body { background: var(--bg-primary); color: var(--text-primary); }
.card { background: var(--card-bg); }
\`\`\`

---

### 切换主题只需一行

\`\`\`typescript
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme')
  const next = current === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', next)
  localStorage.setItem('theme', next)  // 记住用户选择
}
\`\`\`

---

### 响应式 Grid 布局

\`\`\`css
@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr;           /* 手机：单列 */
    grid-template-areas:
      "header"
      "cards"
      "chart"
      "sidebar";
  }
}
\`\`\``,
      starterCode: `// 模拟主题系统和响应式布局切换
type Theme = "light" | "dark"

interface ThemeColors {
  bg: string; text: string; cardBg: string; accent: string
}

const themes: Record<Theme, ThemeColors> = {
  light: { bg: "#ffffff", text: "#333333", cardBg: "#f5f5f5", accent: "#007bff" },
  dark:  { bg: "#1a1a2e", text: "#e0e0e0", cardBg: "#16213e", accent: "#4da6ff" },
}

function applyTheme(theme: Theme): void {
  const c = themes[theme]
  console.log(\`主题：\${theme === "dark" ? "🌙 暗色" : "☀️ 浅色"}\`)
  console.log(\`  背景：\${c.bg}\`)
  console.log(\`  文字：\${c.text}\`)
  console.log(\`  卡片：\${c.cardBg}\`)
  console.log(\`  强调：\${c.accent}\`)
}

function responsiveColumns(width: number): number {
  if (width >= 1024) return 3
  if (width >= 768) return 2
  return 1
}

// 测试主题切换
applyTheme("light")
console.log("")
applyTheme("dark")

// 测试响应式
console.log("")
console.log("响应式列数：")
[375, 768, 1024, 1440].forEach(w =>
  console.log(\`  \${w}px → \${responsiveColumns(w)} 列\`)
)`,
      expectedOutput: `主题：☀️ 浅色
  背景：#ffffff
  文字：#333333
  卡片：#f5f5f5
  强调：#007bff

主题：🌙 暗色
  背景：#1a1a2e
  文字：#e0e0e0
  卡片：#16213e
  强调：#4da6ff

响应式列数：
  375px → 1 列
  768px → 2 列
  1024px → 3 列
  1440px → 3 列`,
      hint: 'CSS 变量 + data-theme 属性是现代化主题切换的标准方案，比切换 class 更优雅',
    },
    {
      id: '17.8',
      kind: 'demo',
      chapterId: 'ch17',
      title: 'CSS 定位 — 把元素放在想放的位置',
      content: `## 定位：突破文档流

> 🔍 **这个能解决什么问题？** 默认情况下元素从上往下排——但你想让"返回顶部"按钮固定在右下角、或者让导航栏贴在屏幕顶部，就需要定位。

### 四种定位模式

| 定位 | 相对于谁 | 效果 |
|------|---------|------|
| \`relative\` | 元素原本的位置 | 原地偏移，不占新坑 |
| \`absolute\` | 最近的已定位祖先 | 完全脱离文档流 |
| \`fixed\` | 浏览器窗口 | 固定在屏幕的一个位置 |
| \`sticky\` | 父容器 + 视口 | 滚动到某个位置后固定 |
`,
      starterCode: `// 模拟 CSS 定位
interface Pos {
  id: string
  pos: 'static'|'relative'|'absolute'|'fixed'|'sticky'
  top?: number; left?: number
}

function desc(e: Pos): string {
  if (e.pos === 'static') return e.id + ': 正常流'
  if (e.pos === 'fixed') return e.id + ': 固定在视口'
  if (e.pos === 'sticky') return e.id + ': 滚动吸住'
  return e.id + ': 偏移(' + (e.top||0) + ',' + (e.left||0) + ')'
}

const list: Pos[] = [
  { id: 'nav', pos: 'sticky', top: 0 },
  { id: 'modal', pos: 'absolute', top: 100, left: 200 },
  { id: 'btn', pos: 'fixed' },
]
list.forEach(function(e) { console.log(desc(e)) })`,
      expectedOutput: `nav: 滚动吸住
modal: 偏移(100,200)
btn: 固定在视口`,
      hint: 'absolute 找最近的已定位祖先；fixed 只看浏览器窗口',
      difficulty: 'beginner',
      estimatedMinutes: 10,
    },
  ],
};

export const part4Chapters: Chapter[] = [ch16, ch17, ch17a, p4];
