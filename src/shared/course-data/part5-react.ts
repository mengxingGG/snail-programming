// ⚛️ 第五部分：React 入门 — Ch18 ~ Ch20 + P5（18 节）
// 参考：the-road-to-learn-react-chinese

import type { Chapter } from '../types/course';

// ─────────────────────────────────────────────────────────────
//  Ch18 — 组件与 JSX（4 节）
// ─────────────────────────────────────────────────────────────
const ch18: Chapter = {
  id: 'ch18',
  title: '组件与 JSX',
  description: 'React 是什么、JSX 语法、第一个组件、Props 传参',
  sections: [
    {
      id: '18.1',
      chapterId: 'ch18',
      title: 'React 是什么 — 积木式开发',
      content: `## React：用"积木"搭网页

> 🔍 **这个能解决什么问题？** 不用 React 也能做网页——但每次数据变化你都要手动更新页面上的每个元素，改一处可能漏十处。**React 的核心思想就是：你只管描述UI应该长什么样，数据变了，React 自动更新页面。**

### 更直观的理解

\`\`\`
没有 React：                 有了 React：
手动更新                     声明式描述
┌─────────────────┐          ┌─────────────────┐
│ 数据变了 →       │          │ 数据变了 →       │
│   找到那个元素 → │          │   React 自动    │
│   修改它的内容 → │          │   找出差异 →    │
│   再改另一个 →   │          │   只更新变化部分│
│   ……累死了       │          │   ……轻松        │
└─────────────────┘          └─────────────────┘
\`\`\`

React 是 Facebook 开源的前端框架，它的核心思想是：

**把 UI 拆成独立的、可复用的"组件"，像拼积木一样组合它们。**

---

### 没有 React 的时代

\`\`\`javascript
// 每次数据变化，手动更新 DOM
document.getElementById('count').textContent = newCount
document.getElementById('list').innerHTML = items.map(...).join('')
\`\`\`

繁琐、容易出错、难以维护。

---

### 有了 React

\`\`\`tsx
function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c+1)}>{count}</button>
}
\`\`\`

你只需要描述"UI 应该长什么样"，React 负责更新 DOM。

---

### React 的核心哲学

\`\`\`
UI = f(state)
\`\`\`

**UI 是数据（state）的函数**——数据变了，UI 自动更新。这就是声明式编程。`,
      starterCode: `// 用纯 TypeScript 模拟 React 的"声明式"思想
// UI = render(state)

interface AppState {
  count: number
  items: string[]
  darkMode: boolean
}

function render(state: AppState): string {
  const mode = state.darkMode ? "🌙 深色" : "☀️ 浅色"
  const list = state.items.map(i => \`  - \${i}\`).join("\\n")
  return [
    \`计数器：\${state.count}\`,
    \`主题：\${mode}\`,
    \`列表（\${state.items.length}项）：\`,
    list || "  （空）",
  ].join("\\n")
}

// 每次 state 变化，重新"渲染"
const state1: AppState = { count: 0, items: [], darkMode: false }
console.log("初始状态：")
console.log(render(state1))

const state2: AppState = { count: 3, items: ["TypeScript", "React"], darkMode: true }
console.log("\\n更新后：")
console.log(render(state2))`,
      expectedOutput: `初始状态：
计数器：0
主题：☀️ 浅色
列表（0项）：
  （空）

更新后：
计数器：3
主题：🌙 深色
列表（2项）：
  - TypeScript
  - React`,
      hint: '声明式编程：你描述"想要什么结果"，框架处理"怎么做到"——这比命令式代码更直观',
    },
    {
      id: '18.2',
      chapterId: 'ch18',
      title: 'JSX — 在 JavaScript 里写 HTML',
      content: `## JSX：JavaScript 的 HTML 扩展语法

JSX 让你在 TypeScript 里直接写类 HTML 的代码：

\`\`\`tsx
// JSX
const element = <h1>你好，{name}！</h1>

// 编译后变成这样（React.createElement）
const element = React.createElement('h1', null, \`你好，\${name}！\`)
\`\`\`

---

### JSX 关键规则

\`\`\`tsx
// 1. 用 {} 嵌入 JavaScript 表达式
<p>分数：{score}</p>

// 2. 必须有一个根元素（或用 <> 空标签）
return (
  <>
    <h1>标题</h1>
    <p>内容</p>
  </>
)

// 3. class → className，for → htmlFor
<div className="card">
  <label htmlFor="name">姓名</label>
</div>

// 4. 自闭合标签必须加 /
<img src="photo.jpg" />
<input type="text" />
\`\`\``,
      starterCode: `// 用 TypeScript 模拟 JSX 的"模板插值"概念
interface VNode {
  tag: string
  props: Record<string, string>
  children: (string | VNode)[]
}

function jsx(tag: string, props: Record<string, string>, ...children: (string | VNode)[]): VNode {
  return { tag, props, children }
}

function renderToString(node: VNode | string, indent = 0): string {
  if (typeof node === "string") return "  ".repeat(indent) + node
  const pad = "  ".repeat(indent)
  const attrs = Object.entries(node.props).map(([k,v]) => \` \${k}="\${v}"\`).join("")
  if (node.children.length === 0) return \`\${pad}<\${node.tag}\${attrs} />\`
  const kids = node.children.map(c => renderToString(c, indent + 1)).join("\\n")
  return \`\${pad}<\${node.tag}\${attrs}>\\n\${kids}\\n\${pad}</\${node.tag}>\`
}

const name = "小明"
const tree = jsx("div", { className: "card" },
  jsx("h2", {}, \`你好，\${name}！\`),
  jsx("p", { className: "intro" }, "欢迎来到 React 世界"),
  jsx("img", { src: "avatar.png", alt: "头像" }),
)

console.log(renderToString(tree))`,
      expectedOutput: `<div className="card">
  <h2>
    你好，小明！
  </h2>
  <p className="intro">
    欢迎来到 React 世界
  </p>
  <img src="avatar.png" alt="头像" />
</div>`,
      hint: 'JSX 本质上是 React.createElement 的语法糖，这里的 jsx 函数模拟了同样的事情',
    },
    {
      id: '18.3',
      chapterId: 'ch18',
      title: '你的第一个组件',
      content: `## 组件：React 的基本单元

React 组件就是一个**返回 JSX 的函数**：

\`\`\`tsx
// 最简单的组件
function Hello() {
  return <h1>你好，世界！</h1>
}

// 在 JSX 里使用它
function App() {
  return (
    <div>
      <Hello />    {/* 像 HTML 标签一样使用 */}
      <Hello />    {/* 可以复用！ */}
    </div>
  )
}
\`\`\`

---

### 组件命名规则

**必须大写字母开头**！

- \`<Hello />\` → React 认为这是组件
- \`<hello />\` → React 认为这是 HTML 标签

---

### 组件的好处

每个组件只关注自己的 UI，相互独立，可以：
- 单独测试
- 在任何地方复用
- 独立更新（不影响其他组件）`,
      starterCode: `// 用 TypeScript 函数模拟 React 组件（输出字符串而非 JSX）

function Badge(props: { text: string; variant: "success" | "warning" | "error" }): string {
  const symbols = { success: "✅", warning: "⚠️", error: "❌" }
  return \`[\${symbols[props.variant]} \${props.text}]\`
}

function UserCard(props: { name: string; role: string; verified: boolean }): string {
  const badge = Badge({ text: props.role, variant: "success" })
  const verifiedBadge = props.verified ? Badge({ text: "已认证", variant: "success" }) : ""
  return [
    \`用户：\${props.name}\`,
    \`身份：\${badge}\`,
    props.verified ? \`状态：\${verifiedBadge}\` : "状态：未认证",
  ].join("\\n")
}

// 复用同一个组件，传入不同的 props
console.log(UserCard({ name: "小明", role: "学员", verified: true }))
console.log("")
console.log(UserCard({ name: "蜗牛老师", role: "讲师", verified: true }))`,
      expectedOutput: `用户：小明
身份：[✅ 学员]
状态：[✅ 已认证]

用户：蜗牛老师
身份：[✅ 讲师]
状态：[✅ 已认证]`,
      hint: '组件通过 props 接收数据，就像函数通过参数接收数据——React 组件本质上就是一个函数',
    },
    {
      id: '18.4',
      chapterId: 'ch18',
      title: 'Props — 给组件传数据',
      content: `## Props：从父组件向子组件传数据

Props 是 Properties 的缩写，是组件的"外部输入"——父组件传进来的数据。

---

### 使用 Props

\`\`\`tsx
interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
}

// 使用
<Button label="提交" onClick={() => console.log("点击了")} />
<Button label="删除" onClick={handleDelete} disabled={isLoading} />
\`\`\`

---

### Props 是单向流动的

\`\`\`
父组件 → （传 props） → 子组件
\`\`\`

子组件**不能修改** props——只能读取。想改数据，要通过回调函数通知父组件。`,
      starterCode: `// 模拟 Props 类型检查和组件复用

interface CardProps {
  title: string
  description: string
  tags: string[]
  highlighted?: boolean
}

function Card(props: CardProps): string {
  const tagStr = props.tags.map(t => \`#\${t}\`).join(" ")
  const prefix = props.highlighted ? "★ " : "  "
  return [
    \`\${prefix}\${props.title}\`,
    \`  \${props.description}\`,
    \`  \${tagStr}\`,
  ].join("\\n")
}

const articles = [
  { title: "TypeScript 入门", description: "从零开始学 TS", tags: ["ts", "入门"], highlighted: true },
  { title: "Node.js 后端", description: "搭建你的第一个 API", tags: ["node", "后端"], highlighted: false },
  { title: "React 实战", description: "构建现代 Web 应用", tags: ["react", "前端"], highlighted: true },
]

console.log("推荐文章：")
articles.forEach(a => {
  console.log(Card(a))
  console.log("")
})`,
      expectedOutput: `推荐文章：
★ TypeScript 入门
  从零开始学 TS
  #ts #入门

  Node.js 后端
  搭建你的第一个 API
  #node #后端

★ React 实战
  构建现代 Web 应用
  #react #前端
`,
      hint: 'Props 就是函数参数——TypeScript 的 interface 天然适合描述 Props 的类型',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch19 — 状态与事件（5 节）
// ─────────────────────────────────────────────────────────────
const ch19: Chapter = {
  id: 'ch19',
  title: '状态与事件',
  description: 'useState、事件处理、表单绑定、useEffect、列表渲染',
  sections: [
    {
      id: '19.1',
      chapterId: 'ch19',
      title: 'useState — 让组件有记忆',
      content: `## useState：给组件加上"记忆"

普通变量没有记忆——每次组件重新渲染，变量就被重置了。

\`useState\` 让状态**在重渲染之间保持**：

\`\`\`tsx
function Counter() {
  const [count, setCount] = useState(0)
  //       ↑ 当前值  ↑ 修改函数   ↑ 初始值

  return (
    <div>
      <p>计数：{count}</p>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  )
}
\`\`\`

---

### 关键规则

- **不要直接修改 state**：\`count++\` ❌，\`setCount(count + 1)\` ✅
- **每次调用 setter**，组件会**重新渲染**
- **初始值**只在第一次渲染时生效

---

\`useState\` 是 React "Hook" 家族中最基础、最常用的一个。`,
      starterCode: `// 模拟 useState 的行为：状态 + 更新 + 订阅重渲染

function createState<T>(initial: T) {
  let value = initial
  const subscribers: (() => void)[] = []

  return {
    get: () => value,
    set: (newValue: T) => {
      value = typeof newValue === "function"
        ? (newValue as any)(value)
        : newValue
      subscribers.forEach(fn => fn())
    },
    subscribe: (fn: () => void) => subscribers.push(fn),
  }
}

// 模拟 Counter 组件
const count = createState(0)

// 订阅：state 变化时重新"渲染"
count.subscribe(() => console.log(\`计数器更新：\${count.get()}\`))

console.log("初始：" + count.get())
count.set(count.get() + 1)   // +1
count.set(count.get() + 1)   // +1
count.set(count.get() + 1)   // +1
count.set(0)                  // 重置`,
      expectedOutput: `初始：0
计数器更新：1
计数器更新：2
计数器更新：3
计数器更新：0`,
      hint: 'useState 的核心就是：存储值 + 修改时触发重渲染。这个模拟展示了它的本质',
    },
    {
      id: '19.2',
      chapterId: 'ch19',
      title: '事件处理 — 点击、输入',
      content: `## 事件处理：响应用户操作

在 React 中，事件处理函数通过 Props 传给元素：

---

### 常用事件

\`\`\`tsx
// 点击事件
<button onClick={() => console.log("点击了")}>按钮</button>

// 带参数的点击
<button onClick={(e) => handleClick(e, itemId)}>删除</button>

// 输入事件
<input onChange={(e) => setValue(e.target.value)} />

// 表单提交
<form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
\`\`\`

---

### 事件对象 (SyntheticEvent)

\`\`\`tsx
function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
  e.stopPropagation()  // 阻止冒泡
  console.log("按钮被点击了")
}
\`\`\`

---

### 注意：函数引用 vs 函数调用

\`\`\`tsx
onClick={handleClick}     // ✅ 传函数引用
onClick={handleClick()}   // ❌ 立刻调用了！
\`\`\``,
      starterCode: `// 模拟事件处理系统
interface EventMap {
  click: { target: string }
  input: { target: string; value: string }
  submit: { target: string }
}

type EventHandler<K extends keyof EventMap> = (event: EventMap[K]) => void

class EventEmitter {
  private handlers: Partial<Record<keyof EventMap, EventHandler<any>[]>> = {}

  on<K extends keyof EventMap>(event: K, handler: EventHandler<K>) {
    if (!this.handlers[event]) this.handlers[event] = []
    this.handlers[event]!.push(handler)
  }

  emit<K extends keyof EventMap>(event: K, data: EventMap[K]) {
    this.handlers[event]?.forEach(h => h(data))
  }
}

const emitter = new EventEmitter()
let inputValue = ""

emitter.on("click", (e) => console.log(\`[\${e.target}] 被点击\`))
emitter.on("input", (e) => {
  inputValue = e.value
  console.log(\`[\${e.target}] 输入：\${e.value}\`)
})
emitter.on("submit", (e) => console.log(\`[\${e.target}] 提交，值是：\${inputValue}\`))

emitter.emit("input", { target: "用户名输入框", value: "小明" })
emitter.emit("click", { target: "提交按钮" })
emitter.emit("submit", { target: "登录表单" })`,
      expectedOutput: `[用户名输入框] 输入：小明
[提交按钮] 被点击
[登录表单] 提交，值是：小明`,
      hint: '事件处理的本质是"发布-订阅"模式——注册监听函数，事件发生时自动调用',
    },
    {
      id: '19.3',
      chapterId: 'ch19',
      title: '表单 — 受控组件',
      content: `## 受控组件：让 React 掌控表单状态

在 React 中，有两种处理表单的方式：

---

### 受控组件（Controlled）推荐

表单的值由 \`useState\` 管理：

\`\`\`tsx
function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()  // 阻止默认的页面刷新
    console.log({ username, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}              {/* 值来自 state */}
        onChange={e => setUsername(e.target.value)}  {/* 输入时更新 state */}
      />
      <input type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">登录</button>
    </form>
  )
}
\`\`\`

---

**受控的好处**：值永远在你的控制中，随时可以读取、验证、修改。`,
      starterCode: `// 模拟受控表单的状态管理
interface FormState {
  username: string
  email: string
  password: string
}

interface FormErrors {
  username?: string
  email?: string
  password?: string
}

function validateForm(state: FormState): FormErrors {
  const errors: FormErrors = {}
  if (state.username.length < 3) errors.username = "用户名至少 3 个字符"
  if (!state.email.includes("@")) errors.email = "邮箱格式不正确"
  if (state.password.length < 6) errors.password = "密码至少 6 位"
  return errors
}

// 模拟用户输入过程
const form: FormState = { username: "xm", email: "not-email", password: "123" }

const errors = validateForm(form)
console.log("表单验证结果：")

if (Object.keys(errors).length === 0) {
  console.log("✅ 验证通过")
} else {
  Object.entries(errors).forEach(([field, msg]) =>
    console.log(\`  ❌ \${field}: \${msg}\`)
  )
}

// 修复后再验证
form.username = "xiaoming"
form.email = "xm@test.com"
form.password = "123456"
const errors2 = validateForm(form)
console.log("修复后：", Object.keys(errors2).length === 0 ? "✅ 验证通过" : "仍有错误")`,
      expectedOutput: `表单验证结果：
  ❌ username: 用户名至少 3 个字符
  ❌ email: 邮箱格式不正确
  ❌ password: 密码至少 6 位
修复后： ✅ 验证通过`,
      hint: '受控组件 + 实时验证的组合是 React 表单的最佳实践',
    },
    {
      id: '19.4',
      chapterId: 'ch19',
      title: 'useEffect — 在合适的时机做合适的事',
      content: `## useEffect：处理副作用

**副作用（Side Effect）**是指：不直接参与渲染，但需要在特定时机执行的操作，比如：
- 加载数据（fetch）
- 订阅事件
- 修改 document.title
- 设置定时器

\`useEffect\` 让你在组件**渲染后**执行这些操作：

\`\`\`tsx
function ArticleList() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    // 组件加载后执行
    fetch('/api/articles')
      .then(r => r.json())
      .then(data => setArticles(data))
  }, [])  // [] 表示只在挂载时执行一次

  return <ul>{articles.map(a => <li key={a.id}>{a.title}</li>)}</ul>
}
\`\`\`

---

### 依赖数组

\`\`\`tsx
useEffect(() => { /* 每次渲染都执行 */ })
useEffect(() => { /* 只在挂载时执行 */ }, [])
useEffect(() => { /* userId 变化时执行 */ }, [userId])
\`\`\``,
      starterCode: `// 模拟 useEffect 的依赖追踪机制
function createEffect(deps: any[]) {
  let prevDeps: any[] | null = null
  let runCount = 0

  return {
    run(effect: () => void) {
      const changed = prevDeps === null
        || deps.some((dep, i) => dep !== prevDeps![i])

      if (changed) {
        effect()
        prevDeps = [...deps]
        runCount++
      }
      return runCount
    }
  }
}

let userId = 1

const effect = createEffect([userId])

// 第一次渲染（deps 从 null 变化）
console.log("渲染 1：执行次数 =", effect.run(() =>
  console.log(\`  加载用户 \${userId} 的数据\`)
))

// userId 没变，不重新执行
console.log("渲染 2（userId 不变）：执行次数 =", effect.run(() =>
  console.log("  （这不会执行）")
))

// userId 变了，重新执行
userId = 2
const effect2 = createEffect([userId])
console.log("渲染 3（userId 变化）：执行次数 =", effect2.run(() =>
  console.log(\`  加载用户 \${userId} 的数据\`)
))`,
      expectedOutput: `  加载用户 1 的数据
渲染 1：执行次数 = 1
渲染 2（userId 不变）：执行次数 = 1
  加载用户 2 的数据
渲染 3（userId 变化）：执行次数 = 1`,
      hint: 'useEffect 的依赖数组决定"什么时候重新执行"——依赖不变就不执行，是性能优化的关键',
    },
    {
      id: '19.5',
      chapterId: 'ch19',
      title: '列表渲染 — 用 map 显示多个',
      content: `## 列表渲染：用数组 map 生成多个组件

\`\`\`tsx
function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <ul>
      {articles.map(article => (
        <li key={article.id}>          {/* key 是必须的！ */}
          <h3>{article.title}</h3>
          <p>{article.summary}</p>
        </li>
      ))}
    </ul>
  )
}
\`\`\`

---

### key 为什么重要？

\`key\` 帮助 React 识别哪些元素变化了、哪些没变，从而**高效更新**。

\`\`\`tsx
// ❌ 用索引当 key（列表有增删时会出问题）
articles.map((a, index) => <li key={index}>...</li>)

// ✅ 用唯一 id 当 key
articles.map(a => <li key={a.id}>...</li>)
\`\`\`

---

### 条件渲染

\`\`\`tsx
{isLoading && <Spinner />}              {/* 短路运算符 */}
{error ? <ErrorMsg /> : <Content />}    {/* 三元运算符 */}
{articles.length === 0 && <EmptyState />}
\`\`\``,
      starterCode: `// 模拟列表渲染的完整流程：加载 → 渲染 → 空状态

interface Article { id: number; title: string; views: number }

function renderList(articles: Article[], isLoading: boolean): string {
  if (isLoading) return "⏳ 加载中..."
  if (articles.length === 0) return "📭 暂无文章"

  const items = articles
    .sort((a, b) => b.views - a.views)
    .map(a => \`  [\${a.id}] \${a.title} (${"❤️"} \${a.views})\`)
    .join("\\n")

  return \`文章列表（共 \${articles.length} 篇）：\\n\${items}\`
}

const articles: Article[] = [
  { id: 1, title: "TypeScript 入门", views: 1024 },
  { id: 2, title: "React 实战", views: 2048 },
  { id: 3, title: "Node.js 后端", views: 856 },
]

console.log(renderList(articles, true))
console.log("")
console.log(renderList([], false))
console.log("")
console.log(renderList(articles, false))`,
      expectedOutput: `⏳ 加载中...

📭 暂无文章

文章列表（共 3 篇）：
  [2] React 实战 (❤️ 2048)
  [1] TypeScript 入门 (❤️ 1024)
  [3] Node.js 后端 (❤️ 856)`,
      hint: '列表渲染的三种状态：loading、empty、有数据——每种状态都需要处理',
    },
    {
      id: '19.6',
      chapterId: 'ch19',
      title: '自定义 Hook — 复用状态逻辑',
      content: `## 自定义 Hook：把状态逻辑抽成可复用的函数

如果多个组件都有"加载数据"的逻辑，每次都写一遍 useState + useEffect 太麻烦。

**自定义 Hook** 就是把这些逻辑打包成一个函数：

---

### 从组件中提取 Hook

\`\`\`tsx
// ❌ 每个组件都重复这段逻辑
function ArticleList() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { loadData().then(setData).finally(() => setLoading(false)) }, [])
  // ...
}

// ✅ 抽成自定义 Hook
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [url])

  return { data, loading, error }
}

// 使用（超简洁！）
function ArticleList() {
  const { data, loading, error } = useFetch<Article[]>('/api/articles')
  if (loading) return <Spinner />
  if (error) return <Error msg={error} />
  return <ul>{data!.map(a => <li key={a.id}>{a.title}</li>)}</ul>
}
\`\`\`

---

### 命名规则

自定义 Hook 必须以 \`use\` 开头——这是 React 的约定，让 linter 能检查 Hook 规则。`,
      starterCode: `// 用纯 TypeScript 模拟自定义 Hook 的概念
interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

// 模拟 useFetch Hook
function createFetch<T>() {
  const state: FetchState<T> = { data: null, loading: true, error: null }

  return {
    async execute(url: string, mockData: T) {
      state.loading = true
      try {
        await new Promise(r => setTimeout(r, 0))
        state.data = mockData
        state.error = null
      } catch (e) {
        state.error = (e as Error).message
      } finally {
        state.loading = false
      }
      return { ...state }
    },
  }
}

// 模拟 useToggle Hook
function createToggle(initial = false) {
  let value = initial
  return {
    get: () => value,
    toggle: () => { value = !value; return value },
    setTrue: () => { value = true; return value },
    setFalse: () => { value = false; return value },
  }
}

// 使用
const fetch = createFetch<string[]>()
fetch.execute("/api/tags", ["React", "TypeScript", "Node.js"]).then(s => {
  console.log("加载状态：" + s.loading)
  console.log("数据：", s.data)
  console.log("错误：" + s.error)
})

const darkMode = createToggle(false)
console.log("初始：" + darkMode.get())
console.log("切换：" + darkMode.toggle())
console.log("再切换：" + darkMode.toggle())`,
      expectedOutput: `初始：false
切换：true
再切换：false
加载状态：false
数据： [ 'React', 'TypeScript', 'Node.js' ]
错误：null`,
      hint: '自定义 Hook 就是"以 use 开头的函数，内部可以使用其他 Hook"——本质是逻辑复用而非 UI 复用',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch20 — 与后端对话（5 节）
// ─────────────────────────────────────────────────────────────
const ch20: Chapter = {
  id: 'ch20',
  title: '与后端对话',
  description: 'fetch API、加载数据、提交数据、错误处理',
  sections: [
    {
      id: '20.1',
      chapterId: 'ch20',
      title: 'fetch — 前端怎么请求后端',
      content: `## fetch：浏览器内置的 HTTP 请求工具

\`fetch\` 让前端向后端发起 HTTP 请求：

\`\`\`typescript
// GET 请求
const response = await fetch('/api/articles')
const articles = await response.json()

// POST 请求
const response = await fetch('/api/articles', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: '新文章', content: '内容' })
})
const result = await response.json()
\`\`\`

---

### 两步解析

\`\`\`typescript
const response = await fetch('/api/data')
// response 是原始 HTTP 响应（还没拿到数据）

const data = await response.json()
// 把响应体解析为 JSON 对象（这步也是异步的！）
\`\`\`

---

### 检查状态码

\`\`\`typescript
if (!response.ok) {  // response.ok 是 status 200-299 时为 true
  throw new Error(\`HTTP Error: \${response.status}\`)
}
\`\`\``,
      starterCode: `// 模拟 fetch 请求和响应
interface FetchOptions {
  method?: string
  body?: string
  headers?: Record<string, string>
}

async function mockFetch(url: string, options: FetchOptions = {}): Promise<{
  ok: boolean; status: number; json: () => Promise<any>
}> {
  await new Promise(resolve => setTimeout(resolve, 0))

  if (url === "/api/articles" && !options.method) {
    return { ok: true, status: 200, json: async () => [{ id: 1, title: "TypeScript 入门" }] }
  }
  if (url === "/api/articles" && options.method === "POST") {
    return { ok: true, status: 201, json: async () => ({ id: 2, ...JSON.parse(options.body || "{}") }) }
  }
  return { ok: false, status: 404, json: async () => ({ error: "Not Found" }) }
}

async function main() {
  const r1 = await mockFetch("/api/articles")
  const articles = await r1.json()
  console.log("GET /api/articles →", r1.status, articles)

  const r2 = await mockFetch("/api/articles", {
    method: "POST",
    body: JSON.stringify({ title: "新文章" }),
  })
  const created = await r2.json()
  console.log("POST /api/articles →", r2.status, created)
}

main()`,
      expectedOutput: `GET /api/articles → 200 [ { id: 1, title: 'TypeScript 入门' } ]
POST /api/articles → 201 { id: 2, title: '新文章' }`,
      hint: 'fetch 返回的 response.json() 也是一个 Promise，所以也要用 await',
    },
    {
      id: '20.2',
      chapterId: 'ch20',
      title: '加载数据 — 页面启动时获取',
      content: `## 在组件加载时获取数据

最常见的场景：页面打开 → 加载数据 → 显示列表。

\`\`\`tsx
function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadArticles() {
      try {
        const res = await fetch('/api/articles')
        if (!res.ok) throw new Error('加载失败')
        const data = await res.json()
        setArticles(data)
      } catch (e) {
        setError(e instanceof Error ? e.message : '未知错误')
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [])

  if (loading) return <div>加载中...</div>
  if (error) return <div>错误：{error}</div>
  return <ul>{articles.map(a => <li key={a.id}>{a.title}</li>)}</ul>
}
\`\`\`

---

三种状态：loading / error / 有数据——每种都要处理！`,
      starterCode: `interface Article { id: number; title: string }

async function fetchArticles(): Promise<Article[]> {
  return [
    { id: 1, title: "TypeScript 入门" },
    { id: 2, title: "React 实战" },
    { id: 3, title: "全栈开发" },
  ]
}

async function loadAndDisplay() {
  let loading = true
  let error: string | null = null
  let articles: Article[] = []

  console.log(loading ? "⏳ 加载中..." : "")

  try {
    articles = await fetchArticles()
    loading = false
  } catch (e) {
    error = (e as Error).message
    loading = false
  }

  if (error) {
    console.log("❌ 错误：" + error)
    return
  }

  console.log(\`✅ 加载成功，共 \${articles.length} 篇文章：\`)
  articles.forEach(a => console.log(\`  [\${a.id}] \${a.title}\`))
}

loadAndDisplay()`,
      expectedOutput: `⏳ 加载中...
✅ 加载成功，共 3 篇文章：
  [1] TypeScript 入门
  [2] React 实战
  [3] 全栈开发`,
      hint: 'loading/error/data 三个状态变量是 React 数据加载的标准模式，一定要处理三种情况',
    },
    {
      id: '20.3',
      chapterId: 'ch20',
      title: '提交数据 — 表单发送到后端',
      content: `## 表单提交：把数据发给后端

\`\`\`tsx
function CreateArticleForm() {
  const [title, setTitle] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setSubmitting(true)
    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error)
      }

      const newArticle = await res.json()
      console.log('创建成功：', newArticle)
      setTitle('')  // 清空表单
    } catch (e) {
      alert('提交失败：' + e.message)
    } finally {
      setSubmitting(false)
    }
  }

  return <form onSubmit={handleSubmit}>...</form>
}
\`\`\``,
      starterCode: `interface ArticleInput { title: string; content: string }
interface Article extends ArticleInput { id: number; createdAt: string }

// 模拟后端
const articleDb: Article[] = []
let nextId = 1

async function createArticle(input: ArticleInput): Promise<Article> {
  if (!input.title) throw new Error("标题不能为空")
  const article: Article = {
    id: nextId++,
    ...input,
    createdAt: "2026-06-26",
  }
  articleDb.push(article)
  return article
}

// 模拟前端提交流程
async function handleSubmit(input: ArticleInput) {
  let submitting = true
  console.log("⏳ 提交中...")

  try {
    const article = await createArticle(input)
    submitting = false
    console.log(\`✅ 创建成功！ID: \${article.id}, 标题: \${article.title}\`)
  } catch (e) {
    submitting = false
    console.log("❌ 提交失败：" + (e as Error).message)
  }
}

handleSubmit({ title: "TypeScript 入门", content: "详细介绍 TypeScript" })
  .then(() => handleSubmit({ title: "", content: "没有标题" }))`,
      expectedOutput: `⏳ 提交中...
✅ 创建成功！ID: 1, 标题: TypeScript 入门
⏳ 提交中...
❌ 提交失败：标题不能为空`,
      hint: 'e.preventDefault() 阻止表单默认的页面刷新行为——React 表单必须调用这个',
    },
    {
      id: '20.4',
      chapterId: 'ch20',
      title: '错误处理 — 网络失败了怎么办',
      content: `## 前端错误处理：不只是 console.error

好的前端错误处理应该：

1. **捕获错误**：try/catch + .catch()
2. **分类处理**：网络错误 / 服务器错误 / 业务错误
3. **友好提示**：告诉用户发生了什么，不是"出错了"
4. **重试机制**：网络抖动时自动重试

---

### 错误分类

\`\`\`typescript
// 网络错误（无法连接服务器）
// → TypeError: Failed to fetch

// HTTP 错误（服务器返回 4xx/5xx）
if (!response.ok) {
  throw new Error(\`HTTP \${response.status}\`)
}

// 业务错误（服务器返回错误信息）
const { error } = await response.json()
if (error) throw new Error(error)
\`\`\`

---

### 重试机制

\`\`\`typescript
async function fetchWithRetry(url: string, retries = 3): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url).then(r => r.json())
    } catch (e) {
      if (i === retries - 1) throw e
      await new Promise(r => setTimeout(r, 1000 * (i + 1)))  // 延迟重试
    }
  }
}
\`\`\``,
      starterCode: `// 带重试的请求函数
let callCount = 0

async function unreliableFetch(url: string): Promise<string> {
  callCount++
  if (callCount < 3) throw new Error("网络不稳定")
  return \`来自 \${url} 的数据\`
}

async function fetchWithRetry(url: string, maxRetries = 3): Promise<string> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const data = await unreliableFetch(url)
      console.log(\`第 \${attempt} 次尝试成功\`)
      return data
    } catch (e) {
      console.log(\`第 \${attempt} 次失败：\${(e as Error).message}\`)
      if (attempt === maxRetries) throw e
    }
  }
  throw new Error("不可能到这里")
}

fetchWithRetry("/api/articles")
  .then(data => console.log("最终结果：" + data))
  .catch(e => console.log("彻底失败：" + e.message))`,
      expectedOutput: `第 1 次失败：网络不稳定
第 2 次失败：网络不稳定
第 3 次尝试成功
最终结果：来自 /api/articles 的数据`,
      hint: '重试机制是处理网络不稳定的常用模式——真实项目中重试间隔应该递增（指数退避）',
    },
    {
      id: '20.5',
      chapterId: 'ch20',
      title: 'Context API — 全局状态管理',
      content: `## Context：不用层层传 props

当很多组件都需要同一个数据（比如当前用户、主题），props 层层传递很痛苦——这叫 **props drilling**。

---

### 创建 Context

\`\`\`tsx
// 1. 创建 Context
const ThemeContext = createContext('light')

// 2. 在顶层提供值
function App() {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={theme}>
      <Navbar />    {/* 不需要传 props！ */}
      <Content />
    </ThemeContext.Provider>
  )
}

// 3. 在任意子组件消费
function Navbar() {
  const theme = useContext(ThemeContext)
  return <nav className={theme}>...</nav>
}
\`\`\`

---

### Context vs Props

| 方式 | 适合场景 |
|------|----------|
| Props | 父子组件，层级 ≤ 2 |
| Context | 全局数据，多层级共享 |

---

### 常见使用场景

- 当前登录用户信息
- 主题（深色/浅色）
- 语言/国际化
- 购物车数据

**注意**：Context 不是状态管理工具——频繁变化的数据（如表单输入）不适合放 Context，会导致不必要的重渲染。`,
      starterCode: `// 模拟 Context 系统：Provider 提供值，Consumer 消费值
type Theme = "light" | "dark"

class ThemeContext {
  private static current: Theme = "light"

  static provide(theme: Theme) { this.current = theme }
  static consume(): Theme { return this.current }
}

// 模拟组件树
function Navbar() {
  console.log("  Navbar 主题：" + ThemeContext.consume())
}

function Sidebar() {
  console.log("  Sidebar 主题：" + ThemeContext.consume())
}

function Page() {
  Navbar()
  Sidebar()
}

// 设置主题为 dark
console.log("🌙 暗色模式：")
ThemeContext.provide("dark")
Page()

// 设置主题为 light
console.log("\\n☀️ 浅色模式：")
ThemeContext.provide("light")
Page()`,
      expectedOutput: `🌙 暗色模式：
  Navbar 主题：dark
  Sidebar 主题：dark

☀️ 浅色模式：
  Navbar 主题：light
  Sidebar 主题：light`,
      hint: 'Context 让数据"穿透"中间组件——Provider 之下的任何组件都能直接用 useContext 读取',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  实战项目 P5 — React 个人博客（3 节）
// ─────────────────────────────────────────────────────────────
const p5: Chapter = {
  id: 'p5',
  title: '实战：React 个人博客',
  description: '用 Vite + React 搭建个人博客，含路由、Markdown 渲染、搜索',
  sections: [
    {
      id: 'p5.1',
      chapterId: 'p5',
      title: '项目搭建 + 路由',
      content: `## 用 Vite 初始化 React 项目

---

### 创建项目

\`\`\`bash
npm create vite@latest my-blog -- --template react-ts
cd my-blog && npm install
npm install react-router-dom
\`\`\`

---

### 路由配置

\`\`\`tsx
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  )
}
\`\`\`

---

### 页面结构

\`\`\`
/                   → 首页（文章列表）
/article/:id        → 文章详情
/about              → 关于页
\`\`\`

---

### 组件树

\`\`\`
App
├── Navbar（导航栏）
├── Routes
│   ├── HomePage
│   │   └── ArticleCard × N
│   ├── ArticlePage
│   └── AboutPage
└── Footer
\`\`\``,
      starterCode: `// 模拟 React Router 的路由匹配逻辑
interface Route {
  path: string
  component: string
}

class Router {
  private routes: Route[] = []

  add(path: string, component: string) {
    this.routes.push({ path, component })
  }

  match(pathname: string): { component: string; params: Record<string, string> } | null {
    for (const route of this.routes) {
      const pattern = route.path.replace(/:[^/]+/g, "([^/]+)")
      const regex = new RegExp(\`^\${pattern}$\`)
      const match = pathname.match(regex)
      if (match) {
        const paramNames = (route.path.match(/:([^/]+)/g) || []).map(p => p.slice(1))
        const params: Record<string, string> = {}
        paramNames.forEach((name, i) => params[name] = match[i + 1])
        return { component: route.component, params }
      }
    }
    return null
  }
}

const router = new Router()
router.add("/", "HomePage")
router.add("/article/:id", "ArticlePage")
router.add("/about", "AboutPage")

const paths = ["/", "/article/42", "/about", "/not-found"]
paths.forEach(p => {
  const m = router.match(p)
  if (m) {
    console.log(\`\${p} → \${m.component}\`, m.params)
  } else {
    console.log(\`\${p} → 404 Not Found\`)
  }
})`,
      expectedOutput: `/ → HomePage {}
/article/42 → ArticlePage { id: '42' }
/about → AboutPage {}
/not-found → 404 Not Found`,
      hint: '`:id` 是动态路由参数——`/article/42` 匹配后，`id` 的值就是 `42`',
    },
    {
      id: 'p5.2',
      chapterId: 'p5',
      title: '文章列表 + 详情 + Markdown 渲染',
      content: `## 文章展示的核心组件

---

### 文章卡片组件

\`\`\`tsx
interface ArticleCardProps {
  article: Article
}

function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link to={\`/article/\${article.id}\`} className="card">
      <h3>{article.title}</h3>
      <p className="summary">{article.summary}</p>
      <div className="meta">
        <span>{article.category}</span>
        <span>{article.createdAt}</span>
      </div>
    </Link>
  )
}
\`\`\`

---

### Markdown 渲染

用 \`react-markdown\` 库渲染 Markdown：

\`\`\`tsx
import ReactMarkdown from 'react-markdown'

function ArticlePage() {
  const { id } = useParams()
  const { data: article } = useFetch<Article>(\`/api/articles/\${id}\`)

  if (!article) return <Spinner />

  return (
    <article>
      <h1>{article.title}</h1>
      <ReactMarkdown>{article.content}</ReactMarkdown>
    </article>
  )
}
\`\`\`

**Props 向下流，事件向上冒**——这是 React 组件通信的核心原则。`,
      starterCode: `// 模拟文章列表和详情的渲染逻辑
interface Article {
  id: number; title: string; summary: string; content: string; category: string
}

const articles: Article[] = [
  { id: 1, title: "TypeScript 入门", summary: "从零开始学 TS", content: "## 第一章\\nTypeScript 是...", category: "技术" },
  { id: 2, title: "React Hooks", summary: "深入理解 Hooks", content: "## useState\\nuseState 是...", category: "技术" },
  { id: 3, title: "我的旅行日记", summary: "记录美好时光", content: "## Day 1\\n今天去了...", category: "生活" },
]

function renderList(articles: Article[], category?: string): void {
  const filtered = category ? articles.filter(a => a.category === category) : articles
  console.log(\`文章列表（\${filtered.length} 篇）：\`)
  filtered.forEach(a => console.log(\`  [\${a.id}] \${a.title} — \${a.summary}\`))
}

function renderDetail(article: Article): void {
  console.log(\`\\n=== \${article.title} ===\`)
  console.log(\`分类：\${article.category}\`)
  console.log(\`正文：\${article.content}\`)
}

renderList(articles, "技术")
renderDetail(articles[0])`,
      expectedOutput: `文章列表（2 篇）：
  [1] TypeScript 入门 — 从零开始学 TS
  [2] React Hooks — 深入理解 Hooks

=== TypeScript 入门 ===
分类：技术
正文：## 第一章
TypeScript 是...`,
      hint: '列表页显示摘要（不是全文），详情页显示完整内容——这是信息架构的"渐进式披露"',
    },
    {
      id: 'p5.3',
      chapterId: 'p5',
      title: '状态管理 + 搜索过滤',
      content: `## 全局搜索和状态管理

博客需要：搜索文章、按分类筛选、记住用户偏好。

---

### 搜索实现

\`\`\`tsx
function HomePage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const { data: articles } = useFetch<Article[]>('/api/articles')

  const filtered = articles?.filter(a => {
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'all' || a.category === category
    return matchSearch && matchCat
  })

  return (
    <>
      <SearchBar value={search} onChange={setSearch} />
      <CategoryTabs value={category} onChange={setCategory} />
      {filtered?.map(a => <ArticleCard key={a.id} article={a} />)}
    </>
  )
}
\`\`\`

---

### 记住搜索偏好

\`\`\`tsx
// 用 localStorage 记住上次选择的分类
function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : initial
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}
\`\`\`

---

### Context 管理主题

\`\`\`tsx
const ThemeContext = createContext<'light' | 'dark'>('light')

function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  return (
    <ThemeContext.Provider value={theme}>
      <div className={theme}>...</div>
    </ThemeContext.Provider>
  )
}
\`\`\``,
      starterCode: `// 模拟搜索、过滤、排序的完整交互
interface Article { id: number; title: string; category: string; date: string }

const articles: Article[] = [
  { id: 1, title: "TypeScript 入门指南", category: "技术", date: "2026-06-01" },
  { id: 2, title: "React 状态管理", category: "技术", date: "2026-06-10" },
  { id: 3, title: "北海道旅行记", category: "生活", date: "2026-05-20" },
  { id: 4, title: "TypeScript 泛型详解", category: "技术", date: "2026-06-15" },
  { id: 5, title: "读书笔记", category: "生活", date: "2026-06-05" },
]

function searchAndFilter(
  articles: Article[],
  query: string,
  category: string,
  sortBy: "date" | "title"
): Article[] {
  let result = articles

  if (query) {
    const q = query.toLowerCase()
    result = result.filter(a => a.title.toLowerCase().includes(q))
  }
  if (category && category !== "全部") {
    result = result.filter(a => a.category === category)
  }

  return [...result].sort((a, b) =>
    sortBy === "date"
      ? b.date.localeCompare(a.date)
      : a.title.localeCompare(b.title)
  )
}

console.log("搜索 'TypeScript'，分类'技术'，按日期：")
searchAndFilter(articles, "TypeScript", "技术", "date")
  .forEach(a => console.log(\`  [\${a.id}] \${a.title} (\${a.date})\`))

console.log("\\n全部分类，搜索'记'，按标题：")
searchAndFilter(articles, "记", "全部", "title")
  .forEach(a => console.log(\`  [\${a.id}] \${a.title}\`))`,
      expectedOutput: `搜索 'TypeScript'，分类'技术'，按日期：
  [4] TypeScript 泛型详解 (2026-06-15)
  [1] TypeScript 入门指南 (2026-06-01)

全部分类，搜索'记'，按标题：
  [3] 北海道旅行记
  [5] 读书笔记`,
      hint: '搜索 + 过滤 + 排序是前端最常见的组合操作——三者互不影响，可以任意组合',
    },
  ],
};

export const part5Chapters: Chapter[] = [ch18, ch19, ch20, p5];
