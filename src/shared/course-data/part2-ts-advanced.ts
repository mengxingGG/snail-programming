// 🌿 第二部分：TypeScript 进阶 — Ch9 ~ Ch11a + P2（31 节）
// 参考：kunlunjs/typescript-tutorial，深入类型系统和异步编程

import type { Chapter } from '../types/course';

// ─────────────────────────────────────────────────────────────
//  Ch9 — 类型系统的奥秘（11 节）
// ─────────────────────────────────────────────────────────────
const ch9: Chapter = {
  id: 'ch9',
  title: '类型系统的奥秘',
  description: '深入 TypeScript 类型：联合类型、type别名、interface vs type、泛型入门',
  sections: [
    {
      id: '9.1',
      chapterId: 'ch9',
      title: '基础类型回顾 + null 和 undefined',
      content: `## 类型系统进阶

你已经认识了 \`string\`、\`number\`、\`boolean\`。TypeScript 还有两个特殊类型：

---

### null 和 undefined

\`\`\`typescript
let a: null = null          // 故意设为"空"
let b: undefined = undefined // 声明了但没赋值
\`\`\`

- \`null\`：**故意设置的空值**（"这里什么都没有"）
- \`undefined\`：**还没有值**（变量声明了但没赋值，或函数没有 return）

---

### 联合可选类型

\`\`\`typescript
let userId: number | null = null   // 可以是数字，也可以是 null
userId = 123   // ✅
userId = null  // ✅
\`\`\`

---

### 使用前先检查

\`\`\`typescript
function greet(name: string | null) {
  if (name === null) {
    console.log("你好，陌生人！")
  } else {
    console.log(\`你好，\${name}！\`)
  }
}
\`\`\``,
      starterCode: `function printLength(text: string | null): void {
  if (text === null) {
    console.log("文本为空")
  } else {
    console.log(\`文本长度：\${text.length}\`)
  }
}

printLength("Hello TypeScript")
printLength(null)
printLength("蜗牛编程")`,
      expectedOutput: `文本长度：16
文本为空
文本长度：4`,
      hint: '使用 string | null 之前，必须先用 if 检查是否为 null，TypeScript 强制要求这一点',
    },
    {
      id: '9.2',
      chapterId: 'ch9',
      title: '联合类型 — 可以是 A 或 B',
      content: `## 联合类型：一个值可以有多种类型

用 \`|\` 分隔多个类型，表示"可以是这些类型中的任意一个"：

\`\`\`typescript
let id: number | string

id = 123         // ✅ 数字
id = "abc-456"   // ✅ 字符串
id = true        // ❌ boolean 不在联合类型里
\`\`\`

---

### 实际应用

\`\`\`typescript
type Status = "pending" | "success" | "error"
// 只能是这三个字符串之一

let state: Status = "pending"
state = "success"   // ✅
state = "loading"   // ❌ 不在范围内
\`\`\`

这叫**字面量联合类型**，比用普通 string 更安全——只允许固定的几个值。

---

### 缩窄类型（Narrowing）

\`\`\`typescript
function format(value: number | string): string {
  if (typeof value === "number") {
    return value.toFixed(2)   // 这里 TypeScript 知道 value 是 number
  }
  return value.toUpperCase()  // 这里知道是 string
}
\`\`\``,
      starterCode: `type Direction = "north" | "south" | "east" | "west"

function move(dir: Direction, steps: number): string {
  return \`向\${dir}走了 \${steps} 步\`
}

function describe(value: number | string): string {
  if (typeof value === "number") {
    return \`数字：\${value.toFixed(1)}\`
  }
  return \`字符串："\${value.toUpperCase()}"\`
}

console.log(move("north", 3))
console.log(move("east", 5))
console.log(describe(3.14))
console.log(describe("hello"))`,
      expectedOutput: `向north走了 3 步
向east走了 5 步
数字：3.1
字符串："HELLO"`,
      hint: 'typeof 可以检查变量的运行时类型，TypeScript 用它来"缩窄"类型范围',
      difficulty: 'beginner',
      estimatedMinutes: 8,
    },
    {
      id: '9.3',
      chapterId: 'ch9',
      title: 'type 别名 — 给类型起名字',
      content: `## type 别名：给复杂类型起一个简短的名字

当类型定义比较长时，可以用 \`type\` 给它起个名字，方便复用：

\`\`\`typescript
// 不用别名：到处写这一大串
let a: number | string | boolean
let b: number | string | boolean

// 用 type 别名：定义一次，到处用
type Primitive = number | string | boolean
let a: Primitive
let b: Primitive
\`\`\`

---

### 对象类型别名

\`\`\`typescript
type Point = {
  x: number
  y: number
}

const origin: Point = { x: 0, y: 0 }
\`\`\`

---

### type vs interface

| 特性 | type | interface |
|------|------|-----------|
| 对象类型 | ✅ | ✅ |
| 联合类型 | ✅ | ❌ |
| 类型扩展 | 用 \`&\` | 用 \`extends\` |

**建议**：对象结构用 \`interface\`，其他用 \`type\`。`,
      starterCode: `type Point = { x: number; y: number }
type Color = "red" | "green" | "blue"

function distance(a: Point, b: Point): number {
  const dx = b.x - a.x
  const dy = b.y - a.y
  return Math.sqrt(dx * dx + dy * dy)
}

function colorLabel(c: Color): string {
  const map: Record<Color, string> = {
    red: "红色",
    green: "绿色",
    blue: "蓝色",
  }
  return map[c]
}

const p1: Point = { x: 0, y: 0 }
const p2: Point = { x: 3, y: 4 }
console.log(\`距离：\${distance(p1, p2)}\`)
console.log(colorLabel("red"))
console.log(colorLabel("blue"))`,
      expectedOutput: `距离：5
红色
蓝色`,
      hint: 'Record<Color, string> 是 TypeScript 内置工具类型，表示"以 Color 的值为键、string 为值的对象"',
    },
    {
      id: '9.4',
      chapterId: 'ch9',
      title: 'interface vs type — 什么时候用哪个',
      content: `## interface 可以扩展和合并

\`interface\` 支持两个特性，\`type\` 不行：

---

### 1. 继承（extends）

\`\`\`typescript
interface Animal {
  name: string
}

interface Dog extends Animal {  // Dog 包含 Animal 的所有属性
  breed: string
}

const dog: Dog = { name: "旺财", breed: "金毛" }
\`\`\`

---

### 2. 声明合并

\`\`\`typescript
interface User { name: string }
interface User { age: number }
// 两个同名 interface 自动合并！

const user: User = { name: "小明", age: 18 }  // ✅
\`\`\`

\`type\` 不能重复声明，会报错。

---

### 经验法则

- **描述对象结构** → 用 \`interface\`（可扩展、可继承）
- **联合类型、函数类型、字面量** → 用 \`type\``,
      starterCode: `interface Shape {
  color: string
  area(): number
}

interface Circle extends Shape {
  radius: number
}

interface Rectangle extends Shape {
  width: number
  height: number
}

const circle: Circle = {
  color: "red",
  radius: 5,
  area() { return Math.PI * this.radius * this.radius }
}

const rect: Rectangle = {
  color: "blue",
  width: 4,
  height: 6,
  area() { return this.width * this.height }
}

console.log(\`圆形面积：\${circle.area().toFixed(2)}\`)
console.log(\`矩形面积：\${rect.area()}\`)`,
      expectedOutput: `圆形面积：78.54
矩形面积：24`,
      hint: 'extends 让子接口"继承"父接口的所有属性，不用重复写',
    },
    {
      id: '9.5',
      chapterId: 'ch9',
      title: '泛型入门 — 会变形的类型',
      content: `## 泛型：让类型"自适应"

> 🔍 **这个能解决什么问题？** 想象你做了一个"取快递"的机器——它应该能取任何大小的包裹，而不是只能取鞋盒。
>
> **泛型就是让函数/接口能适配任意类型**，同时不丢失类型检查。

### 为什么要泛型？

假设你要写一个"返回输入值"的函数：

\`\`\`typescript
// ❌ 用 any：丢失了类型信息
function identity(value: any): any {
  return value
}
const result = identity(42)
// result 的类型是 any，不是 number！
result.toUpperCase()  // 运行时报错！数字没有 toUpperCase
\`\`\`

\`any\` 就像"扔掉说明书"——你得到了值，但不知道它是什么，TypeScript 也无法保护你。

\`\`\`typescript
// ✅ 用泛型：保留类型信息
function identity<T>(value: T): T {
  return value
}

identity(42)        // T 是 number，返回类型是 number ✅
identity("hello")   // T 是 string，返回类型是 string ✅
\`\`\`

\`<T>\` 像是一个"占位符"——你在调用时传什么类型，\`T\` 就变成什么类型。

| 调用 | T 被推断为 | 返回类型 |
|------|-----------|---------|
| \`identity(42)\` | \`number\` | \`number\` |
| \`identity("hi")\` | \`string\` | \`string\` |
| \`identity(true)\` | \`boolean\` | \`boolean\` |

---

### 泛型接口：需要什么类型，自己"塞"进去

\`\`\`typescript
interface ApiResponse<T> {
  data: T        // data 的类型由调用者决定
  success: boolean
  message: string
}

// 调用时指定 User 类型
const userResponse: ApiResponse<User> = {
  data: { name: "小明", age: 18 },
  success: true,
  message: "OK",
}

// 也可以用于其他类型
const listResponse: ApiResponse<Article[]> = {
  data: [{ title: "第一篇文章" }],
  success: true,
  message: "获取成功",
}
\`\`\`

> 💥 **新手常踩的坑：**
> 1. **忘了泛型不是 any** — \`T\` 是"未知但确定的类型"，不是"随便什么都可以"。一旦传了 \`number\`，后面就按 \`number\` 检查。
> 2. **T 只是一个名字** — 你可以用 \`U\`、\`Item\`、\`Data\`，但约定俗成：单个类型参数用 \`T\`。
> 3. **泛型只在编译时存在** — 编译成 JS 后，\`<T>\` 全部消失。

> 🔥 **学了就能做：** 下面用泛型写"取数组第一个/最后一个"的工具函数——不管数组里装什么类型，它都能保持类型安全！`,
      starterCode: `function first<T>(arr: T[]): T | undefined {
  return arr[0]
}

function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1]
}

function wrap<T>(value: T): { value: T } {
  return { value }
}

console.log(first([1, 2, 3]))
console.log(last(["a", "b", "c"]))
console.log(first<string>([]))

const wrapped = wrap(42)
console.log(wrapped.value)`,
      expectedOutput: `1
c
undefined
42`,
      hint: 'T 只是一个名字，你可以叫它任何名字，但约定上用 T（Type）、K（Key）、V（Value）等',
    },
    {
      id: '9.6',
      chapterId: 'ch9',
      title: '类型断言与类型守卫',
      content: `## 告诉 TypeScript "相信我，我知道这是什么类型"

---

### 类型断言 (as)

当你比 TypeScript 更清楚一个值的类型时，用 \`as\` 断言：

\`\`\`typescript
// 场景：从 DOM 获取元素，TypeScript 只知道是 HTMLElement
const canvas = document.getElementById("myCanvas") as HTMLCanvasElement
// 现在可以用 canvas 的专属方法了

// 场景：从 API 获取的数据，你知道它的形状
const data = await fetch("/api/user").then(r => r.json())
const user = data as { name: string; age: number }
\`\`\`

⚠️ **类型断言不会做任何运行时检查**——如果断言错了，运行时照样报错。只在确定比 TS 知道更多时才用。

---

### 类型守卫 (Type Guard)

**类型守卫在运行时检查类型，并让 TypeScript 在检查后自动缩窄类型。**

\`\`\`typescript
// typeof 守卫
function format(value: number | string): string {
  if (typeof value === "number") {
    return value.toFixed(2)  // 这里 value 被缩窄为 number
  }
  return value.toUpperCase()  // 这里 value 被缩窄为 string
}

// instanceof 守卫
function handleError(e: Error | string) {
  if (e instanceof Error) {
    console.log(e.message)   // e 是 Error
  } else {
    console.log(e)           // e 是 string
  }
}

// in 守卫
function move(animal: Bird | Fish) {
  if ("fly" in animal) {
    animal.fly()   // animal 是 Bird
  } else {
    animal.swim()  // animal 是 Fish
  }
}
\`\`\``,
      starterCode: `// 类型断言 + 类型守卫综合示例
interface Cat { type: "cat"; meow(): string }
interface Dog { type: "dog"; bark(): string }

type Pet = Cat | Dog

function handlePet(pet: Pet): string {
  // in 守卫：检查方法是否存在
  if ("meow" in pet) {
    return "猫：" + pet.meow()
  }
  return "狗：" + pet.bark()
}

// 类型断言：告诉 TS 这个对象符合 Cat 类型
const myCat = {
  type: "cat" as const,
  meow() { return "喵喵！" },
} as Cat

const myDog: Dog = {
  type: "dog",
  bark() { return "汪汪！" },
}

console.log(handlePet(myCat))
console.log(handlePet(myDog))

// typeof 守卫
function describe(value: number | string | boolean): string {
  if (typeof value === "number") return "数字：" + value.toFixed(1)
  if (typeof value === "string") return "字符串：" + value.toUpperCase()
  return "布尔：" + value
}

console.log(describe(3.14159))
console.log(describe("hello"))
console.log(describe(true))`,
      expectedOutput: `猫：喵喵！
狗：汪汪！
数字：3.1
字符串：HELLO
布尔：true`,
      hint: '"meow" in pet 是 TypeScript 识别的类型守卫——检查后 pet 自动缩窄为 Cat 类型',
    },
    {
      id: '9.7',
      chapterId: 'ch9',
      title: 'unknown vs any — 安全 vs 灵活',
      content: `## unknown：安全的"未知类型"

### 先看对比

\`\`\`typescript
let a: any = "hello"       // any：关闭了所有类型检查
let u: unknown = "hello"   // unknown：知道"有个值"，但不知道是什么类型

a.toUpperCase()        // ✅ any 可以做任何操作
u.toUpperCase()        // ❌ unknown 不能直接操作！
// 必须先确认类型才能用
\`\`\`

---

### 为什么需要 unknown？

\`any\` 是 TypeScript 的"紧急出口"——用了它，类型检查彻底失效。而 \`unknown\` 保持了类型安全：

\`\`\`typescript
function processValue(value: unknown) {
  // 必须先检查类型，才能操作
  if (typeof value === "string") {
    console.log(value.toUpperCase())  // ✅ 检查后可用
  }
  if (typeof value === "number") {
    console.log(value.toFixed(2))     // ✅ 检查后可用
  }
}
\`\`\`

| 特性 | any | unknown |
|------|-----|---------|
| 可以赋值给任何变量 | ✅ | ❌ 必须缩窄类型 |
| 可以对它做任何操作 | ✅ | ❌ 必须缩窄类型 |
| 有类型检查 | ❌ 关闭了 | ✅ 仍然有效 |

---

### 最佳实践

- ❌ 不要滥用 \`any\`
- ✅ 不知道类型时，先用 \`unknown\`
- ✅ 用类型守卫（\`typeof\`、\`instanceof\`）来缩窄 \`unknown\`
- ✅ API 返回值或用户输入用 \`unknown\` 更安全

> 💡 **记住：\`unknown\` 是类型安全的 \`any\`**——能用 unknown 就别用 any！`,
      starterCode: `function safeLength(value: unknown): number {
  // 只有 string 或 数组 才有 length
  if (typeof value === "string") {
    return value.length
  }
  if (Array.isArray(value)) {
    return value.length
  }
  return 0
}

console.log("字符串长度：" + safeLength("Hello TypeScript"))
console.log("数组长度：" + safeLength([1, 2, 3, 4, 5]))
console.log("数字（无 length）：" + safeLength(42))
console.log("null：" + safeLength(null))`,
      expectedOutput: `字符串长度：16
数组长度：5
数字（无 length）：0
null：0`,
      hint: 'typeof 检查后，unknown 类型的变量在对应分支里会自动变成确定类型——这就是"类型缩窄"',
    },
    {
      id: '9.8',
      chapterId: 'ch9',
      title: '泛型进阶 — 约束与多类型参数',
      content: `## 泛型不只是 <T>，还可以约束它

---

### 泛型约束 (extends)

有时你希望泛型参数**必须满足某个条件**：

\`\`\`typescript
// 约束 T 必须有 length 属性
function logLength<T extends { length: number }>(item: T): T {
  console.log("长度：" + item.length)
  return item  // 返回原值，类型不变
}

logLength("hello")       // ✅ 5
logLength([1, 2, 3])     // ✅ 3
// logLength(123)        // ❌ number 没有 length 属性
\`\`\`

---

### 多类型参数

\`\`\`typescript
// 两个泛型参数，第二个受第一个约束
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const user = { name: "小明", age: 18 }
getProperty(user, "name")  // ✅ 返回 string
getProperty(user, "age")   // ✅ 返回 number
// getProperty(user, "email")  // ❌ 'email' 不是 user 的键！
\`\`\`

---

### 泛型默认值

\`\`\`typescript
interface ApiResponse<T = any> {
  data: T
  success: boolean
}

const r1: ApiResponse<string> = { data: "ok", success: true }
const r2: ApiResponse = { data: 123, success: true }  // T 默认为 any
\`\`\`

---

### 泛型参数命名约定

| 字母 | 含义 | 常见场景 |
|------|------|----------|
| T | Type | 通用类型 |
| K | Key | 对象的键 |
| V | Value | 对象的值 |
| E | Element | 数组元素 |
| R | Return | 返回值 |`,
      starterCode: `// 泛型约束 + 多类型参数实战
interface Identifiable {
  id: number
}

// 约束 T 必须有 id 属性
function findById<T extends Identifiable>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id)
}

// 多类型参数：安全地从对象取值
function safeGet<T, K extends keyof T>(obj: T, key: K, defaultValue: T[K]): T[K] {
  return obj[key] !== undefined ? obj[key] : defaultValue
}

interface Product {
  id: number
  name: string
  price: number
  inStock: boolean
}

const products: Product[] = [
  { id: 1, name: "键盘", price: 299, inStock: true },
  { id: 2, name: "鼠标", price: 149, inStock: false },
]

const found = findById(products, 2)
if (found) {
  console.log(\`找到：\${found.name}，¥\${found.price}\`)
}

const product = products[0]
console.log(\`名称：\${safeGet(product, "name", "未知")}\`)
console.log(\`库存：\${safeGet(product, "inStock", false)}\`)

// 这个会在编译时报错（key 必须是 Product 的键）
// safeGet(product, "color", "red")`,
      expectedOutput: `找到：鼠标，¥149
名称：键盘
库存：true`,
      hint: 'K extends keyof T 约束 K 必须是 T 的键名——TypeScript 会帮你检查拼写错误',
    },
    {
      id: '9.9',
      chapterId: 'ch9',
      title: '常用工具类型 (Utility Types)',
      content: `## TypeScript 内置的"类型变换器"

> 🧠 **WHY：** 真实项目里，你经常需要基于已有类型"变出"新类型。
> 比如"编辑用户时只需要部分字段"、"创建用户预览时只挑几个字段"——
> 每次都重新定义完整接口太麻烦，工具类型就是帮你做这些"类型变换"的利器。

---

### Partial<T> — 所有属性变可选

\`\`\`typescript
interface User { name: string; age: number; email: string }

// 更新用户时，只需要传要改的字段
function updateUser(id: number, changes: Partial<User>) { /* ... */ }

updateUser(1, { age: 20 })               // ✅ 只改年龄
updateUser(1, { name: "小红", age: 19 }) // ✅ 改多个
\`\`\`

---

### Pick<T, K> — 从类型中挑选部分属性

\`\`\`typescript
type UserPreview = Pick<User, "name" | "age">
// { name: string; age: number }
\`\`\`

---

### Omit<T, K> — 排除某些属性

\`\`\`typescript
type UserWithoutEmail = Omit<User, "email">
// { name: string; age: number }
\`\`\`

---

### Record<K, V> — 创建键值对映射

\`\`\`typescript
type Role = "admin" | "user" | "guest"
type Permissions = Record<Role, string[]>
// { admin: string[]; user: string[]; guest: string[] }

const perms: Permissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"],
}
\`\`\`

---

### Readonly<T> — 所有属性变只读

\`\`\`typescript
const user: Readonly<User> = { name: "小明", age: 18, email: "x@test.com" }
// user.name = "小红"  // ❌ 报错！只读
\`\`\`

---

### 速查表

| 工具类型 | 作用 | 方向 |
|----------|------|------|
| Partial&lt;T&gt; | 所有属性变可选 | 收紧 → 放宽 |
| Required&lt;T&gt; | 所有属性变必填 | 放宽 → 收紧 |
| Pick&lt;T,K&gt; | 选取部分属性 | 大 → 小 |
| Omit&lt;T,K&gt; | 排除部分属性 | 大 → 小 |
| Record&lt;K,V&gt; | 构造键值对类型 | 从无到有 |
| Readonly&lt;T&gt; | 属性只读 | 可变 → 不可变 |`,
      starterCode: `interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  createdAt: string
}

// Partial: 更新时只需传要改的字段
function updateTask(id: number, changes: Partial<Task>) {
  console.log(\`更新任务 \${id}：\`, changes)
}

// Pick: 列表展示只需要这几个字段
type TaskSummary = Pick<Task, "id" | "title" | "completed">

// Record: 状态映射表
type TaskStatus = "all" | "active" | "completed"
const statusLabels: Record<TaskStatus, string> = {
  all: "全部",
  active: "进行中",
  completed: "已完成",
}

// Omit: 创建任务时不需要 id 和 createdAt
type CreateTaskInput = Omit<Task, "id" | "createdAt">

updateTask(1, { completed: true })
updateTask(2, { title: "新标题", description: "新描述" })

const summary: TaskSummary = { id: 1, title: "学 TypeScript", completed: false }
console.log(\`任务摘要：[\${summary.id}] \${summary.title}\`)
console.log("状态标签：", statusLabels)`,
      expectedOutput: `更新任务 1： { completed: true }
更新任务 2： { title: '新标题', description: '新描述' }
任务摘要：[1] 学 TypeScript
状态标签： { all: '全部', active: '进行中', completed: '已完成' }`,
      hint: '这些工具类型在真实项目中几乎每天都会用到——它们让类型定义又简洁又安全',
    },
    {
      id: '9.10',
      chapterId: 'ch9',
      title: '类型窄化 — 可辨识联合与穷尽检查',
      content: `## 让 TypeScript 帮你覆盖所有情况

---

### 可辨识联合 (Discriminated Union)

给联合类型的每个成员加一个**共同的字面量字段**（tag），TypeScript 就能根据它自动判断具体类型：

\`\`\`typescript
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number }

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2  // shape 被窄化为 circle
    case "rectangle":
      return shape.width * shape.height    // shape 被窄化为 rectangle
    case "triangle":
      return (shape.base * shape.height) / 2
  }
}
\`\`\`

---

### 穷尽检查 (Exhaustiveness Checking)

用 \`never\` 类型确保 switch 覆盖了所有情况：

\`\`\`typescript
function assertNever(value: never): never {
  throw new Error(\`Unexpected value: \${value}\`)
}

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":    return Math.PI * shape.radius ** 2
    case "rectangle": return shape.width * shape.height
    case "triangle":  return (shape.base * shape.height) / 2
    default:
      // 如果将来有人给 Shape 添加了新类型但忘了更新 area，
      // TypeScript 会在这里报错！
      return assertNever(shape)
  }
}
\`\`\`

这是 TypeScript 最强大的模式之一——**编译时保证你不会遗漏任何情况**。`,
      starterCode: `// 可辨识联合 + 穷尽检查实战
type ApiState =
  | { status: "idle" }
  | { status: "loading"; progress: number }
  | { status: "success"; data: string }
  | { status: "error"; message: string }

function renderState(state: ApiState): string {
  switch (state.status) {
    case "idle":
      return "等待请求..."
    case "loading":
      return \`加载中（\${state.progress}%）\`
    case "success":
      return \`数据：\${state.data}\`
    case "error":
      return \`错误：\${state.message}\`
    default: {
      // 穷尽检查：如果状态已全部覆盖，这里 state 类型是 never
      const _exhaustive: never = state
      return "未知状态"
    }
  }
}

const states: ApiState[] = [
  { status: "idle" },
  { status: "loading", progress: 45 },
  { status: "success", data: "{\\"name\\":\\"小明\\"}" },
  { status: "error", message: "网络超时" },
]

states.forEach(s => console.log(renderState(s)))`,
      expectedOutput: `等待请求...
加载中（45%）
数据：{"name":"小明"}
错误：网络超时`,
      hint: '如果给 ApiState 添加 { status: "cached" } 但不更新 renderState，default 分支的 never 赋值就会编译报错',
    },
    {
      id: '9.11',
      chapterId: 'ch9',
      title: 'keyof — 获取对象的键',
      content: `## keyof：把对象的键变成联合类型

\`keyof\` 操作符可以**提取一个类型的所有键**，组成联合类型：

\`\`\`typescript
interface User {
  name: string
  age: number
  email: string
}

type UserKeys = keyof User
// 相当于 "name" | "age" | "email"
\`\`\`

---

### 实际应用

#### 安全地访问对象属性

\`\`\`typescript
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]  // ✅ 类型安全！
}

const user = { name: "小明", age: 18 }
getProp(user, "name")  // ✅ string 类型
getProp(user, "age")   // ✅ number 类型
// getProp(user, "phone")  // ❌ 编译报错！"phone" 不在 keyof User 中
\`\`\`

#### 动态更新对象

\`\`\`typescript
function updateProp<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
  obj[key] = value  // ✅ value 的类型自动匹配
}
\`\`\`

---

### 和 typeof 组合：从实际对象提取键

\`\`\`typescript
const config = {
  host: "localhost",
  port: 3000,
  debug: true,
}

type ConfigKeys = keyof typeof config
// "host" | "port" | "debug"
\`\`\`

> 💡 **\`keyof\` 在泛型中极为常用**——它让你写出"知道对象结构"的通用函数。`,
      starterCode: `interface Product {
  id: number
  name: string
  price: number
  inStock: boolean
}

// 用 keyof 实现安全的"取值"函数
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const product: Product = {
  id: 1,
  name: "无线键盘",
  price: 299,
  inStock: true,
}

// 安全地获取任意属性
const id = getValue(product, "id")
const name = getValue(product, "name")
const price = getValue(product, "price")

console.log(\`商品 ID：\${id}\`)
console.log(\`商品名：\${name}\`)
console.log(\`价格：¥\${price}\`)
console.log(\`类型：\${typeof price}\`)`,
      expectedOutput: `商品 ID：1
商品名：无线键盘
价格：¥299
类型：number`,
      hint: 'keyof T 返回 T 的所有键名，K extends keyof T 限制了 K 必须是 T 的键之一——这样 obj[key] 就是安全的',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch10 — 模块化编程（5 节）
// ─────────────────────────────────────────────────────────────
const ch10: Chapter = {
  id: 'ch10',
  title: '模块化编程',
  description: '用 import / export 拆分代码，学习模块化思维',
  sections: [
    {
      id: '10.1',
      chapterId: 'ch10',
      title: '为什么需要模块',
      content: `## 模块：把大文件拆成小文件

如果把所有代码都塞进一个文件，会出现什么问题？

- 文件变得很长，难以阅读
- 多人协作时容易冲突
- 很难找到特定功能在哪里
- 一处报错可能影响全局

---

### 模块化的好处

**一个文件，负责一件事**：

\`\`\`
utils.ts     ← 工具函数
types.ts     ← 类型定义
api.ts       ← API 请求
config.ts    ← 配置常量
\`\`\`

每个文件只关注自己的职责，彼此通过 \`import/export\` 通信。

---

### Node.js 的模块系统

TypeScript/JavaScript 使用 ES Modules 标准：

\`\`\`typescript
// math.ts ← 导出
export function add(a: number, b: number) {
  return a + b
}

// main.ts ← 使用
import { add } from './math'
console.log(add(1, 2))
\`\`\``,
      starterCode: `// 模拟模块化：把工具函数和主逻辑分开定义

// === 假设这是 utils.ts 里的内容 ===
function formatCurrency(amount: number): string {
  return \`¥\${amount.toFixed(2)}\`
}

function calculateTax(price: number, rate = 0.1): number {
  return price * rate
}

// === 假设这是 main.ts 里使用它们 ===
const price = 199
const tax = calculateTax(price)
const total = price + tax

console.log(\`原价：\${formatCurrency(price)}\`)
console.log(\`税费：\${formatCurrency(tax)}\`)
console.log(\`总计：\${formatCurrency(total)}\`)`,
      expectedOutput: `原价：¥199.00
税费：¥19.90
总计：¥218.90`,
      hint: '实际项目中这两段代码会在不同的文件里，通过 import/export 连接',
    },
    {
      id: '10.2',
      chapterId: 'ch10',
      title: 'export — 把东西分享出去',
      content: `## export：把函数、变量、类型对外开放

文件里的东西默认是私有的，想让别人使用，就用 \`export\` 导出：

---

### 命名导出（Named Export）

\`\`\`typescript
// math.ts
export const PI = 3.14159

export function add(a: number, b: number) {
  return a + b
}

export interface Point {
  x: number
  y: number
}
\`\`\`

或者统一在末尾导出：

\`\`\`typescript
const PI = 3.14159
function add(a: number, b: number) { return a + b }

export { PI, add }   // 统一导出
\`\`\`

---

**命名导出可以有多个**，每个都有自己的名字。`,
      starterCode: `// 模拟导出模块（实际开发中会放在单独文件）
// 以下是 string-utils.ts 应该导出的内容

function capitalize(str: string): string {
  return str[0].toUpperCase() + str.slice(1)
}

function truncate(str: string, maxLen: number): string {
  return str.length <= maxLen ? str : str.slice(0, maxLen) + "..."
}

function countWords(str: string): number {
  return str.trim().split(/\s+/).length
}

// 使用（模拟 import { capitalize, truncate } from './string-utils'）
console.log(capitalize("hello world"))
console.log(truncate("这是一段很长很长的文字内容", 8))
console.log(countWords("hello world foo"))`,
      expectedOutput: `Hello world
这是一段很长很长...
1`,
      hint: '正则表达式 /\\s+/ 匹配一个或多个空白字符，用于按空格分割单词',
    },
    {
      id: '10.3',
      chapterId: 'ch10',
      title: 'import — 把别人的拿来用',
      content: `## import：引入其他模块导出的东西

---

### 命名导入

\`\`\`typescript
import { add, PI } from './math'

console.log(add(1, 2))   // 3
console.log(PI)           // 3.14159
\`\`\`

---

### 重命名导入

如果导入的名字和本地已有的变量冲突，可以重命名：

\`\`\`typescript
import { add as mathAdd } from './math'
\`\`\`

---

### 导入所有

\`\`\`typescript
import * as MathUtils from './math'

MathUtils.add(1, 2)
MathUtils.PI
\`\`\`

---

### 路径规则

\`\`\`typescript
import { x } from './utils'     // 同目录
import { x } from '../shared'   // 上级目录
import { x } from 'lodash'      // npm 包（绝对路径）
\`\`\``,
      starterCode: `// 模拟两个模块互相配合

// === 模拟 validators.ts ===
function isEmail(email: string): boolean {
  return email.includes("@") && email.includes(".")
}

function isPhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone)
}

// === 模拟 main.ts 使用 validators ===
const testEmails = ["user@example.com", "invalid-email", "test@test.cn"]
const testPhones = ["13812345678", "12345", "19988887777"]

console.log("邮箱验证：")
testEmails.forEach(e => console.log(\`  \${e}: \${isEmail(e)}\`))

console.log("手机验证：")
testPhones.forEach(p => console.log(\`  \${p}: \${isPhone(p)}\`))`,
      expectedOutput: `测试： 120
测试： True
5! = 120
7 是质数？True
10 是质数？False`,
      hint: '正则表达式 /^1[3-9]\\d{9}$/ 匹配以 1 开头、第 2 位是 3-9、后 9 位是数字的手机号',
    },
    {
      id: '10.4',
      chapterId: 'ch10',
      title: '默认导出 vs 命名导出',
      content: `## 两种导出方式的对比

---

### 默认导出（Default Export）

每个文件**只能有一个**默认导出：

\`\`\`typescript
// calculator.ts
export default function calculate(a: number, b: number) {
  return a + b
}

// 引入时不用花括号，可以起任意名字
import calculate from './calculator'
import myCalc from './calculator'    // ✅ 名字随意
\`\`\`

---

### 对比

| 特性 | 命名导出 | 默认导出 |
|------|----------|----------|
| 数量 | 多个 | 一个 |
| 引入语法 | \`{ name }\` | 直接写名字 |
| 重命名 | 用 \`as\` | 直接起名 |
| 适合场景 | 工具函数集合 | 主要导出（类/组件） |

---

**建议**：在一个文件里，如果你只想导出一个"核心东西"，用默认导出；导出多个工具函数时，用命名导出。`,
      starterCode: `// 模拟默认导出（一个类/主要功能）
class EventEmitter {
  private handlers: Record<string, Function[]> = {}

  on(event: string, handler: Function) {
    if (!this.handlers[event]) this.handlers[event] = []
    this.handlers[event].push(handler)
  }

  emit(event: string, ...args: any[]) {
    (this.handlers[event] || []).forEach(h => h(...args))
  }
}

// 模拟 import EventEmitter from './event-emitter'
const emitter = new EventEmitter()

emitter.on("message", (msg: string) => console.log(\`收到消息：\${msg}\`))
emitter.on("message", (msg: string) => console.log(\`长度：\${msg.length}\`))

emitter.emit("message", "你好！")
emitter.emit("message", "蜗牛编程")`,
      expectedOutput: `收到消息：你好！
长度：3
收到消息：蜗牛编程
长度：4`,
      hint: '事件发射器（EventEmitter）是一个经典的设计模式，Node.js 内置了这个机制',
    },
    {
      id: '10.5',
      chapterId: 'ch10',
      title: 'ES Modules vs CommonJS + 动态导入',
      content: `## 两套模块系统的对比

TypeScript/JavaScript 有两种模块系统：

---

### CommonJS（Node.js 传统）

\`\`\`typescript
// 导出
module.exports = { add, PI }

// 导入
const { add } = require('./math')
\`\`\`

---

### ES Modules（现代标准）

\`\`\`typescript
// 导出
export { add, PI }

// 导入
import { add } from './math'
\`\`\`

---

### 关键区别

| 特性 | CommonJS | ES Modules |
|------|----------|------------|
| 加载时机 | 运行时 | 编译时（可静态分析） |
| 语法 | require/module.exports | import/export |
| 导入值 | 值的拷贝 | 值的**只读引用** |
| Tree Shaking | ❌ | ✅ |
| 动态导入 | require 即可 | import() 函数 |

---

### 动态导入（Dynamic Import）

ES Modules 支持**按需加载**：

\`\`\`typescript
// 只在需要时才加载模块（返回 Promise）
const { heavyFunction } = await import('./heavy-module')
heavyFunction()
\`\`\`

这在**代码分割**中非常重要——首屏只加载必需代码，其余按需加载。`,
      starterCode: `// 模拟两种模块系统的行为差异

// CommonJS 风格：值的拷贝
function simulateCJS() {
  let counter = 0
  const module = { exports: { counter, increment() { counter++ } } }
  const { counter: c1, increment } = module.exports
  increment()
  increment()
  console.log("CJS 拷贝值：" + c1 + "（实际 counter=" + counter + "）")
}

// ES Modules 风格：值的引用（模拟）
function simulateESM() {
  const state = { counter: 0 }
  const getCounter = () => state.counter
  const increment = () => state.counter++

  increment()
  increment()
  console.log("ESM 引用值：" + getCounter())
}

simulateCJS()
simulateESM()

// 动态导入（运行时按需加载）
async function loadModule(moduleName: string) {
  console.log("开始加载 " + moduleName + "...")
  // 模拟异步加载
  await new Promise(r => setTimeout(r, 0))
  return { name: moduleName, loaded: true }
}

loadModule("heavy-chart").then(m => console.log("加载完成：" + m.name))`,
      expectedOutput: `CJS 拷贝值：0（实际 counter=2）
ESM 引用值：2
开始加载 heavy-chart...
加载完成：heavy-chart`,
      hint: 'CommonJS 导出的是值的拷贝（拿到瞬间的值），ESM 导出的是只读引用（始终指向最新值）',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch10a — 高阶函数与闭包（2 节）
//  从 Part1 Ch7 迁移至此：适合在学完模块化和类型系统后学习
// ─────────────────────────────────────────────────────────────
const ch10a: Chapter = {
  id: 'ch10a',
  title: '高阶函数与闭包',
  description: '理解"函数是一等公民"，掌握回调、高阶函数和闭包的工作原理',
  sections: [
    {
      id: '10a.1',
      chapterId: 'ch10a',
      title: '回调函数与高阶函数',
      content: `## 函数也可以当参数传

在 Part1 你已经见过这样的代码：

\`\`\`typescript
const result = [1, 2, 3].map(n => n * 2)   // 传给 map 的是一个函数
const even = [1, 2, 3].filter(n => n % 2 === 0)
\`\`\`

你有没有想过：**为什么可以把一个函数塞进另一个函数里？**

---

### 函数是一等公民 (First-class Citizen)

在 TypeScript/JavaScript 中，函数和数字、字符串、对象一样——你可以：
1. 把它赋值给变量：\`const fn = () => {}\`
2. 把它放进数组：\`[fn1, fn2]\`
3. **把它当作参数传给另一个函数** ← 这就是回调！
4. **把它从一个函数里返回** ← 这就是高阶函数！

---

### 回调函数 (Callback)

**把一个函数 A 当作参数传给函数 B，让 B 在合适的时机调用 A**——这个 A 就是回调（callback）。

\`\`\`typescript
function processData(data: string, callback: (result: string) => void) {
  const result = data.toUpperCase()
  callback(result)  // 处理完后"回调"传入的函数
}

processData("hello", (result) => {
  console.log("处理结果：" + result)
})
// 处理结果：HELLO
\`\`\`

**回调的应用场景**（后面会一一学到）：
- **异步操作**：网络请求完成时回调（Ch11）
- **事件处理**：用户点击时回调（Ch19 React）
- **数组方法**：\`map\`、\`filter\`、\`forEach\` 的回调

---

### 高阶函数 (Higher-Order Function)

满足**任一条件**的函数就是高阶函数：
1. **接受函数作为参数**（如 \`map\`、\`filter\`）
2. **返回一个函数**

\`\`\`typescript
// 高阶函数：返回一个新函数
function createMultiplier(factor: number) {
  return (n: number) => n * factor  // 返回一个函数！
}

const double = createMultiplier(2)
const triple = createMultiplier(3)

double(5)   // 10
triple(5)   // 15
\`\`\`

> 💡 **为什么需要高阶函数？** 因为"把行为参数化"是编程中非常强大的思想——你告诉函数"你要做什么"，而不是"你怎么做"。`,
      starterCode: `// 高阶函数示例：创建一个带前后缀的格式化函数
function createFormatter(prefix: string, suffix: string) {
  return (text: string) => prefix + text + suffix
}

const quote = createFormatter("「", "」")
const bracket = createFormatter("[", "]")
const emphasize = createFormatter("**", "**")

console.log(quote("千里之行，始于足下"))
console.log(bracket("重要通知"))
console.log(emphasize("重点标记"))

// 回调函数示例：对数组的每个元素执行自定义操作
function forEach<T>(arr: T[], action: (item: T, index: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    action(arr[i], i)
  }
}

const result: string[] = []
forEach(["HTML", "CSS", "TypeScript"], (skill, i) => {
  result.push((i + 1) + ". " + skill)
})
console.log("\\n技能列表：")
console.log(result.join("\\n"))`,
      expectedOutput: `「千里之行，始于足下」
[重要通知]
**重点标记**

技能列表：
1. HTML
2. CSS
3. TypeScript`,
      hint: 'createFormatter 返回的函数"记住"了 prefix 和 suffix——这就是"闭包"，下一节详细讲！',
    },
    {
      id: '10a.2',
      chapterId: 'ch10a',
      title: '作用域与闭包 (Scope & Closure)',
      content: `## 变量能"活"在哪里？

### 作用域 (Scope)：变量的"活动范围"

TypeScript 有三种作用域：

\`\`\`typescript
const global = "全局"  // 全局作用域：任何地方都能访问

function demo() {
  const local = "局部"  // 函数作用域：只在函数内能访问

  if (true) {
    const block = "块级"  // 块级作用域：只在 {} 内能访问
  }
  // console.log(block) ❌ 已超出作用域
}
// console.log(local) ❌ 已超出作用域
\`\`\`

**作用域链**：内层可以访问外层，外层不能访问内层。就像单向玻璃——从里往外看可以，从外往里看不行。

---

### 闭包 (Closure)：会"记住"的函数

这是 JavaScript/TypeScript **最难也最优雅**的概念之一。请集中注意力 👇

\`\`\`typescript
function createCounter() {
  let count = 0   // 这个变量属于 createCounter 的作用域

  return function() {
    count++       // 内部函数"记住"了外部的 count
    return count
  }
}

const counter = createCounter()
console.log(counter())  // 1
console.log(counter())  // 2
console.log(counter())  // 3
\`\`\`

**为什么 count 没有被销毁？**

正常来说，\`createCounter()\` 执行完毕后，里面的 \`count\` 应该被回收。但事实是：**返回的内部函数"打包"了 count 变量，把它带在了身上**——这就是闭包。

就像你搬家时带走了一个旧盒子——虽然原来的房子拆了（函数执行完毕），但盒子还在你手里（闭包保留引用）。

---

### 闭包的应用

- **数据私有化**：闭包里的变量外部无法直接修改
- **工厂函数**：创建带"记忆"的函数（如上一节的 \`createFormatter\`）`,
      starterCode: `// 闭包实战：创建一个带访问控制的计数器
function createProtectedCounter(initial = 0) {
  let count = initial    // 这个 count 被闭包"保护"了
  let accessCount = 0

  return {
    increment() {
      accessCount++
      return ++count
    },
    decrement() {
      accessCount++
      return --count
    },
    getValue() { return count },
    getAccessCount() { return accessCount },
    // 注意：没有直接修改 count 的方法！
  }
}

const counter = createProtectedCounter(10)

console.log("初始值：" + counter.getValue())
console.log("+1：" + counter.increment())
console.log("+1：" + counter.increment())
console.log("-1：" + counter.decrement())
console.log("当前值：" + counter.getValue())
console.log("共访问 " + counter.getAccessCount() + " 次")
// count 变量无法从外部直接修改，只能通过 increment/decrement 操作`,
      expectedOutput: `初始值：10
+1：11
+1：12
-1：11
当前值：11
共访问 3 次`,
      hint: '闭包让 count 变成了"私有变量"——外部代码无法直接 count = 999，只能通过暴露的方法操作。这也是很多设计模式的基础！',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch11 — 异步编程（6 节）
// ─────────────────────────────────────────────────────────────
const ch11: Chapter = {
  id: 'ch11',
  title: '异步编程',
  description: '理解同步与异步的区别，掌握 Promise 和 async/await',
  sections: [
    {
      id: '11.1',
      chapterId: 'ch11',
      title: '同步 vs 异步 — 等菜 vs 先做别的',
      content: `## 同步与异步：等待的哲学

---

### 同步（Synchronous）：等结果再继续

就像去银行**排队**——等前面的人办完，才轮到你。

\`\`\`typescript
// 每一行都要等上一行执行完
const a = calculate()   // 等它算完
const b = process(a)    // 再处理
console.log(b)
\`\`\`

---

### 异步（Asynchronous）：发出请求，先做别的

就像去饭馆**点菜**——点完菜不用站在那等，可以先和朋友聊天，菜好了服务员会叫你。

\`\`\`typescript
fetch('/api/data')       // 发请求，不等
  .then(data => {        // "菜好了"才执行这里
    console.log(data)
  })
console.log("我先做别的事")  // 这行先执行！
\`\`\`

---

### 为什么需要异步？

网络请求、文件读写、数据库查询——这些操作要等很久。如果同步等待，页面就会"卡住"，什么都做不了。`,
      starterCode: `// 用 setTimeout 模拟异步操作（真正的异步在浏览器/Node.js 中）
console.log("1. 开始")

// setTimeout 是异步的——1秒后执行，但不会阻塞后面的代码
setTimeout(() => {
  console.log("3. 异步操作完成（1秒后）")
}, 0)   // 0毫秒，但还是异步的！

console.log("2. 继续执行（不等 setTimeout）")`,
      expectedOutput: `1. 开始
2. 继续执行（不等 setTimeout）
3. 异步操作完成（1秒后）`,
      hint: '注意输出顺序：即使 setTimeout 设置 0 毫秒，它依然在同步代码执行完后才运行',
    },
    {
      id: '11.2',
      chapterId: 'ch11',
      title: '回调函数 — 最早的异步方式',
      content: `## 回调函数：把"做完之后"的逻辑传进去

回调（callback）就是：**把一个函数作为参数传给另一个函数**，等到某件事完成时再调用它。

\`\`\`typescript
function doAsync(callback: (result: string) => void) {
  // 模拟异步操作...
  callback("操作完成！")  // 完成时调用回调
}

doAsync((result) => {
  console.log(result)   // "操作完成！"
})
\`\`\`

---

### 回调地狱（Callback Hell）

当异步操作需要嵌套时，代码变得难以阅读：

\`\`\`typescript
getUser(id, (user) => {
  getOrders(user, (orders) => {
    getProducts(orders, (products) => {
      // 越来越深...
    })
  })
})
\`\`\`

这就是为什么后来有了 Promise 和 async/await。`,
      starterCode: `// 模拟带回调的异步操作
function fetchUser(id: number, callback: (user: string) => void): void {
  // 模拟延迟（实际是网络请求）
  callback(\`用户#\${id}：小明\`)
}

function fetchScore(userName: string, callback: (score: number) => void): void {
  callback(88)
}

// 嵌套回调：先获取用户，再获取用户的分数
fetchUser(1, (user) => {
  console.log("获取到用户：" + user)
  fetchScore(user, (score) => {
    console.log("获取到分数：" + score)
    console.log("完成！")
  })
})`,
      expectedOutput: `获取到用户：用户#1：小明
获取到分数：88
完成！`,
      hint: '回调函数的缺点就是嵌套太深时代码很难读，Promise 解决了这个问题',
    },
    {
      id: '11.3',
      chapterId: 'ch11',
      title: 'Promise — 一个承诺',
      content: `## Promise：代表"未来的一个值"

Promise 是对"将来某个时候会有一个结果"的承诺。它有三种状态：

\`\`\`
pending（等待中）→ fulfilled（成功）
                 → rejected（失败）
\`\`\`

---

### 创建 Promise

\`\`\`typescript
const promise = new Promise<string>((resolve, reject) => {
  // 异步操作...
  if (成功) {
    resolve("结果")
  } else {
    reject(new Error("出错了"))
  }
})
\`\`\`

---

### 使用 .then() 和 .catch()

\`\`\`typescript
promise
  .then(result => console.log("成功：" + result))
  .catch(err => console.log("失败：" + err.message))
\`\`\`

---

### 链式调用（解决回调地狱）

\`\`\`typescript
fetchUser(1)
  .then(user => fetchScore(user))    // 上一步的结果传给下一步
  .then(score => console.log(score))
  .catch(err => console.log(err))
\`\`\``,
      starterCode: `function delay(ms: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(\`等待了 \${ms}ms\`), ms)
  })
}

function failMaybe(shouldFail: boolean): Promise<number> {
  return new Promise((resolve, reject) => {
    if (shouldFail) {
      reject(new Error("操作失败了"))
    } else {
      resolve(42)
    }
  })
}

delay(0).then(msg => console.log(msg))

failMaybe(false)
  .then(n => console.log("成功，值是：" + n))
  .catch(err => console.log("捕获错误：" + err.message))

failMaybe(true)
  .then(n => console.log("这行不会执行"))
  .catch(err => console.log("捕获错误：" + err.message))`,
      expectedOutput: `成功，值是：42
捕获错误：操作失败了
等待了 0ms`,
      hint: '.then() 处理成功，.catch() 处理失败——两者可以链式调用',
    },
    {
      id: '11.4',
      chapterId: 'ch11',
      title: 'async/await — 写起来像同步',
      content: `## async/await：让异步代码看起来像同步

\`async/await\` 是 Promise 的语法糖，让异步代码更直观易读：

---

### 对比

\`\`\`typescript
// Promise 写法
function loadData() {
  return fetchUser()
    .then(user => fetchPosts(user))
    .then(posts => console.log(posts))
}

// async/await 写法（更直观）
async function loadData() {
  const user = await fetchUser()      // 等待，但不阻塞其他操作
  const posts = await fetchPosts(user)
  console.log(posts)
}
\`\`\`

---

### 关键规则

1. \`await\` 只能在 \`async\` 函数里用
2. \`await\` 暂停当前函数，但不阻塞其他代码
3. \`async\` 函数始终返回一个 Promise

---

**async/await 就是 Promise 的"美化版"，底层完全一样。**`,
      starterCode: `async function fetchUserName(id: number): Promise<string> {
  // 模拟网络请求
  return new Promise(resolve => setTimeout(() => resolve(\`用户\${id}\`), 0))
}

async function fetchUserScore(name: string): Promise<number> {
  return new Promise(resolve => setTimeout(() => resolve(85 + name.length), 0))
}

async function main() {
  const name = await fetchUserName(1)
  console.log("获取到用户：" + name)

  const score = await fetchUserScore(name)
  console.log("获取到分数：" + score)

  console.log("全部完成！")
}

main()`,
      expectedOutput: `获取到用户：用户1
获取到分数：88
全部完成！`,
      hint: 'await 会等待 Promise 完成，然后把结果赋给变量——比 .then() 链式调用更直观',
    },
    {
      id: '11.5',
      chapterId: 'ch11',
      title: '错误处理 — try/catch',
      content: `## try/catch：捕获异步错误

在 async/await 中，用 \`try/catch\` 处理错误——就像同步代码一样！

---

### 语法

\`\`\`typescript
async function loadData() {
  try {
    const data = await fetchSomething()  // 可能会失败
    console.log(data)
  } catch (error) {
    console.log("出错了：", error)        // 失败时走这里
  } finally {
    console.log("不管成功失败，都会执行")  // 可选
  }
}
\`\`\`

---

### try/catch vs .catch()

\`\`\`typescript
// 两种写法等效
async function a() {
  try { await fetch() } catch(e) { ... }
}

async function b() {
  await fetch().catch(e => ...)
}
\`\`\`

**try/catch 更适合需要统一处理多个 await 的情况。**`,
      starterCode: `async function riskyOperation(shouldFail: boolean): Promise<string> {
  if (shouldFail) throw new Error("网络超时")
  return "数据加载成功"
}

async function safeLoad(id: number) {
  try {
    const result = await riskyOperation(id % 2 === 0)
    console.log(\`[\${id}] 成功：\${result}\`)
  } catch (error) {
    console.log(\`[\${id}] 失败：\${(error as Error).message}\`)
  } finally {
    console.log(\`[\${id}] 请求结束\`)
  }
}

async function main() {
  await safeLoad(1)   // shouldFail = false
  await safeLoad(2)   // shouldFail = true
}

main()`,
      expectedOutput: `[1] 成功：数据加载成功
[1] 请求结束
[2] 失败：网络超时
[2] 请求结束`,
      hint: 'finally 块不管成功还是失败都会执行，常用于关闭连接、停止加载动画等清理操作',
    },
    {
      id: '11.6',
      chapterId: 'ch11',
      title: 'Promise.all/race + 错误处理模式',
      content: `## 并发和错误处理的高级模式

单个 await 够用，但多个异步操作怎么高效处理？

---

### Promise.all：全部成功才算成功

\`\`\`typescript
// 同时发起多个请求，等所有完成
const [user, posts, settings] = await Promise.all([
  fetchUser(1),
  fetchPosts(1),
  fetchSettings(),
])
// 任何一个失败，整个 Promise.all 就失败
\`\`\`

---

### Promise.allSettled：全部完成（不管成败）

\`\`\`typescript
const results = await Promise.allSettled([
  fetchUser(1),
  fetchPosts(1),
  fetchSettings(),
])
// results[0] = { status: "fulfilled", value: user }
// results[1] = { status: "rejected", reason: Error }
\`\`\`

---

### Promise.race：最快完成的那个

\`\`\`typescript
// 请求超时：如果 3 秒没返回，就用 timeout
const result = await Promise.race([
  fetch('/api/data'),
  timeout(3000),  // 3 秒后 reject
])
\`\`\`

---

### 错误处理模式

\`\`\`typescript
// 模式 1：统一 try/catch
async function loadData() {
  try {
    const [a, b] = await Promise.all([fetchA(), fetchB()])
    return { a, b }
  } catch (e) {
    return { error: e.message, a: null, b: null }
  }
}

// 模式 2：每个请求单独 catch
const [a, b] = await Promise.all([
  fetchA().catch(e => null),
  fetchB().catch(e => null),
])
\`\`\``,
      starterCode: `// 模拟并发请求和错误处理模式
async function fetchSafe(name: string, delay: number, shouldFail: boolean): Promise<string> {
  await new Promise(r => setTimeout(r, delay))
  if (shouldFail) throw new Error(name + " 加载失败")
  return name + " 数据"
}

async function loadAll() {
  // 模式 1：Promise.allSettled — 不因单个失败而崩溃
  const results = await Promise.allSettled([
    fetchSafe("用户", 0, false),
    fetchSafe("文章", 0, true),
    fetchSafe("配置", 0, false),
  ])

  results.forEach((r, i) => {
    if (r.status === "fulfilled") {
      console.log(\`✅ 请求\${i+1}：\${r.value}\`)
    } else {
      console.log(\`❌ 请求\${i+1}：\${r.reason.message}\`)
    }
  })
  console.log("所有请求处理完毕")
}

loadAll()`,
      expectedOutput: `✅ 请求1：用户 数据
❌ 请求2：文章 加载失败
✅ 请求3：配置 数据
所有请求处理完毕`,
      hint: '`Promise.allSettled` 永远不会 reject——它等所有 Promise 完成（不管成败），返回结果数组',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch11a — 测试基础（4 节）
// ─────────────────────────────────────────────────────────────
const ch11a: Chapter = {
  id: 'ch11a',
  title: '测试基础',
  description: '理解测试的价值，用 Jest 编写单元测试，掌握异步测试技巧',
  sections: [
    {
      id: '11a.1',
      chapterId: 'ch11a',
      title: '为什么要写测试？',
      content: `## 测试不是负担，是保险

很多初学者觉得"测试是额外工作"。但真正的问题是：**你改了代码，怎么知道没把别的东西改坏？**

---

### 没有测试的开发流程

\`\`\`
写代码 → 手动运行 → 看起来没问题 → 上线 → 用户发现 bug → 修 → 又出新 bug → ...
\`\`\`

---

### 有测试的开发流程

\`\`\`
写代码 → 写测试 → 跑测试 → 全通过 ✅ → 上线
                ↓
              失败 → 修代码 → 再跑 → 通过 ✅
\`\`\`

---

### 测试的价值

1. **防止回退**：改 A 功能不会意外破坏 B 功能
2. **文档作用**：测试描述了函数"应该怎么用"
3. **重构勇气**：有测试保护，大胆优化内部实现
4. **节省时间**：自动检查比手动验证快 100 倍

---

### 测试金字塔

\`\`\`
      /\\     E2E 测试（少）
     /  \\    集成测试（适中）
    /____\\    单元测试（多）
\`\`\`

- **单元测试**：测试单个函数（最快、最多）
- **集成测试**：测试几个模块的交互
- **端到端测试**：测试整个应用流程（最慢、最少）

**我们先从单元测试学起——它是最基础也最重要的测试类型。**`,
      starterCode: `// 一个没有测试的"开发场景"模拟
// 你写了一个计算总价的函数，然后改了它…
// 怎么知道改完还能用？

function calculateTotal(prices: number[], discount = 0): number {
  const sum = prices.reduce((s, p) => s + p, 0)
  return sum * (1 - discount)
}

// 手动测试（每次改代码都要跑一遍，累！）
function manualTest() {
  const test1 = calculateTotal([10, 20, 30], 0)
  console.log("测试1（无折扣）：" + (test1 === 60 ? "✅" : "❌"))

  const test2 = calculateTotal([10, 20, 30], 0.1)
  console.log("测试2（9折）：" + (test2 === 54 ? "✅" : "❌"))

  const test3 = calculateTotal([], 0)
  console.log("测试3（空数组）：" + (test3 === 0 ? "✅" : "❌"))

  const test4 = calculateTotal([100], 0.5)
  console.log("测试4（半价）：" + (test4 === 50 ? "✅" : "❌"))
}

manualTest()
console.log("\\n手动测试很麻烦！下一节用 Jest 自动化这个过程")`,
      expectedOutput: `测试1（无折扣）：✅
测试2（9折）：✅
测试3（空数组）：✅
测试4（半价）：✅

手动测试很麻烦！下一节用 Jest 自动化这个过程`,
      hint: '真实项目中可能有几十上百个测试用例——不可能每次改动都手动跑一遍',
    },
    {
      id: '11a.2',
      chapterId: 'ch11a',
      title: 'Jest 入门：安装、配置、第一个测试',
      content: `## Jest：最流行的 JavaScript/TypeScript 测试框架

---

### 安装 Jest

\`\`\`bash
# 在项目目录下
npm init -y                              # 初始化项目
npm install --save-dev jest ts-jest @types/jest typescript

# 生成 Jest 配置
npx ts-jest config:init
\`\`\`

---

### 第一个测试文件

\`\`\`typescript
// math.ts
export function add(a: number, b: number): number {
  return a + b
}
\`\`\`

\`\`\`typescript
// math.test.ts
import { add } from './math'

test('add 函数：1 + 2 应该等于 3', () => {
  expect(add(1, 2)).toBe(3)
})

test('add 函数：负数也能算', () => {
  expect(add(-1, -2)).toBe(-3)
})
\`\`\`

---

### 运行测试

\`\`\`bash
npx jest
# 或加到 package.json：
# "scripts": { "test": "jest" }
# npm test
\`\`\`

---

### 基本结构

\`\`\`typescript
test('测试名称（描述这个测试的目的）', () => {
  // 1. 准备数据（Arrange）
  // 2. 执行操作（Act）
  // 3. 验证结果（Assert）
  expect(实际结果).toBe(期望结果)
})
\`\`\`

这就是 **AAA 模式**：Arrange → Act → Assert。`,
      starterCode: `// 🐌 在蜗牛编程中模拟 Jest 的测试体验
// 这是一个轻量测试运行器，让你感受测试的流程

interface TestResult { name: string; passed: boolean; error?: string }
const results: TestResult[] = []

function test(name: string, fn: () => void) {
  try {
    fn()
    results.push({ name, passed: true })
    console.log(\`  ✅ \${name}\`)
  } catch (e) {
    results.push({ name, passed: false, error: (e as Error).message })
    console.log(\`  ❌ \${name}: \${(e as Error).message}\`)
  }
}

function expect<T>(actual: T) {
  return {
    toBe(expected: T) {
      if (actual !== expected) {
        throw new Error(\`期望 \${JSON.stringify(expected)}，实际 \${JSON.stringify(actual)}\`)
      }
    },
    toEqual(expected: T) {
      const a = JSON.stringify(actual)
      const e = JSON.stringify(expected)
      if (a !== e) {
        throw new Error(\`期望 \${e}，实际 \${a}\`)
      }
    },
  }
}

// ===== 被测试的函数 =====
function add(a: number, b: number): number { return a + b }
function isEven(n: number): boolean { return n % 2 === 0 }
function greet(name: string): string { return \`你好，\${name}！\` }

// ===== 测试用例 =====
console.log("运行测试：\\n")

test("add(1, 2) = 3", () => expect(add(1, 2)).toBe(3))
test("add(-1, -2) = -3", () => expect(add(-1, -2)).toBe(-3))
test("isEven(4) = true", () => expect(isEven(4)).toBe(true))
test("isEven(7) = false", () => expect(isEven(7)).toBe(false))
test("greet 返回正确格式", () => expect(greet("小明")).toEqual("你好，小明！"))

console.log(\`\\n结果：\${results.filter(r => r.passed).length}/\${results.length} 通过\`)`,
      expectedOutput: `运行测试：

  ✅ add(1, 2) = 3
  ✅ add(-1, -2) = -3
  ✅ isEven(4) = true
  ✅ isEven(7) = false
  ✅ greet 返回正确格式

结果：5/5 通过`,
      hint: 'test() 和 expect().toBe() 就是 Jest 最核心的 API——理解了它们就理解了 Jest',
    },
    {
      id: '11a.3',
      chapterId: 'ch11a',
      title: '测试函数：expect 匹配器',
      content: `## Jest 的 expect 匹配器大全

\`expect(value)\` 返回一个对象，上面有各种"匹配器"方法。以下是常用的：

---

### 常用匹配器

\`\`\`typescript
// 精确相等（基本类型）
expect(2 + 2).toBe(4)
expect("hello").toBe("hello")

// 深度相等（对象、数组）
expect({ name: "小明", age: 18 }).toEqual({ name: "小明", age: 18 })
expect([1, 2, 3]).toEqual([1, 2, 3])

// 真值判断
expect(null).toBeNull()
expect(undefined).toBeUndefined()
expect(0).toBeDefined()
expect(true).toBeTruthy()
expect(false).toBeFalsy()

// 数字比较
expect(10).toBeGreaterThan(5)
expect(3.14).toBeCloseTo(3.14, 2)  // 浮点数比较用这个

// 字符串
expect("hello world").toMatch(/world/)      // 正则匹配
expect("hello").toContain("ell")            // 包含子串

// 数组 / 可迭代对象
expect([1, 2, 3]).toContain(2)
expect([1, 2, 3]).toHaveLength(3)

// 异常
expect(() => { throw new Error("出错了") }).toThrow()
expect(() => { throw new Error("出错了") }).toThrow("出错了")
\`\`\`

---

### toBe vs toEqual

| 匹配器 | 比较方式 | 适用场景 |
|--------|----------|----------|
| \`.toBe()\` | === 严格相等 | 基本类型（数字、字符串、布尔） |
| \`.toEqual()\` | 递归比较属性值 | 对象、数组 |

**记住：对象和数组用 toEqual，基本类型用 toBe。**`,
      starterCode: `// 在蜗牛编程中测试更多 expect 匹配器
function test(name: string, fn: () => void) {
  try { fn(); console.log(\`  ✅ \${name}\`) }
  catch (e) { console.log(\`  ❌ \${name}: \${(e as Error).message}\`) }
}

function expect<T>(actual: T) {
  const throwErr = (msg: string) => { throw new Error(msg) }
  return {
    toBe(e: T) { if (actual !== e) throwErr(\`期望 \${JSON.stringify(e)}，实际 \${JSON.stringify(actual)}\`) },
    toEqual(e: T) { if (JSON.stringify(actual) !== JSON.stringify(e)) throwErr(\`深度不相等\`) },
    toBeGreaterThan(n: number) { if ((actual as any) <= n) throwErr(\`期望 > \${n}，实际 \${actual}\`) },
    toBeNull() { if (actual !== null) throwErr(\`期望 null，实际 \${actual}\`) },
    toHaveLength(n: number) { if ((actual as any).length !== n) throwErr(\`期望长度 \${n}，实际 \${(actual as any).length}\`) },
    toContain(item: any) { if (!(actual as any).includes(item)) throwErr(\`不包含 \${item}\`) },
    toThrow(msg?: string) {
      try { (actual as () => void)(); throwErr("期望抛出异常但未抛出") }
      catch (e) { if (msg && !(e as Error).message.includes(msg)) throwErr(\`错误信息不匹配\`) }
    },
  }
}

// ===== 测试用例 =====
console.log("匹配器测试：\\n")

function divide(a: number, b: number): number {
  if (b === 0) throw new Error("除数不能为零")
  return a / b
}

function getUsers() {
  return [
    { id: 1, name: "小明", active: true },
    { id: 2, name: "小红", active: false },
  ]
}

test("toBe 精确比较", () => expect(3 * 4).toBe(12))
test("toEqual 深度比较", () => expect({ a: 1, b: 2 }).toEqual({ b: 2, a: 1 }))
test("toBeGreaterThan 比较大小", () => expect(100).toBeGreaterThan(50))
test("toBeNull 检查 null", () => expect(null).toBeNull())
test("toHaveLength 检查长度", () => expect([1, 2, 3]).toHaveLength(3))
test("toContain 包含元素", () => expect(["a", "b", "c"]).toContain("b"))
test("toThrow 检测异常", () => expect(() => divide(10, 0)).toThrow("除数不能为零"))

console.log("\\n全部匹配器测试完成！")`,
      expectedOutput: `匹配器测试：

  ✅ toBe 精确比较
  ❌ toEqual 深度比较: 深度不相等
  ✅ toBeGreaterThan 比较大小
  ✅ toBeNull 检查 null
  ✅ toHaveLength 检查长度
  ✅ toContain 包含元素
  ✅ toThrow 检测异常

全部匹配器测试完成！`,
      hint: 'toEqual 不关心对象属性的顺序——{a:1,b:2} 和 {b:2,a:1} 被认为是相等的',
    },
    {
      id: '11a.4',
      chapterId: 'ch11a',
      title: '测试异步代码',
      content: `## 异步测试：Promise 和 async/await

真实项目中大部分函数都是异步的（网络请求、文件读写、数据库查询）。Jest 支持三种异步测试方式：

---

### 方式一：async/await（推荐 ✨）

\`\`\`typescript
test('获取用户数据', async () => {
  const user = await fetchUser(1)
  expect(user.name).toBe('小明')
})
\`\`\`

---

### 方式二：resolves / rejects

\`\`\`typescript
// 测试 Promise resolve
test('请求成功', () => {
  return expect(fetchUser(1)).resolves.toEqual({ name: '小明' })
})

// 测试 Promise reject
test('请求失败', () => {
  return expect(fetchUser(-1)).rejects.toThrow('用户不存在')
})
\`\`\`

---

### 方式三：done 回调（老式风格）

\`\`\`typescript
test('回调式异步', (done) => {
  setTimeout(() => {
    expect(1 + 1).toBe(2)
    done()  // 调用 done() 告诉 Jest 测试结束
  }, 100)
})
\`\`\`

---

### 异步测试的注意事项

1. **必须 await 或用 return**：否则 Jest 不会等待异步操作
2. **别忘记 try/catch**：async 函数中错误需要手动捕获
3. **定时器用 jest.useFakeTimers()**：避免测试因为 setTimeout 等太久而变慢`,
      starterCode: `// 在蜗牛编程中模拟异步测试
function test(name: string, fn: () => void | Promise<void>) {
  const result = fn()
  if (result instanceof Promise) {
    result
      .then(() => console.log(\`  ✅ \${name}\`))
      .catch(e => console.log(\`  ❌ \${name}: \${e.message}\`))
  }
}

function expect<T>(actual: T) {
  const throwErr = (msg: string) => { throw new Error(msg) }
  return {
    toBe(e: T) { if (actual !== e) throwErr(\`期望 \${JSON.stringify(e)}，实际 \${JSON.stringify(actual)}\`) },
    toEqual(e: T) { if (JSON.stringify(actual) !== JSON.stringify(e)) throwErr(\`深度不相等\`) },
  }
}

// ===== 被测试的异步函数 =====
type User = { id: number; name: string }
const fakeDb: User[] = [{ id: 1, name: "小明" }, { id: 2, name: "小红" }]

async function fetchUser(id: number): Promise<User> {
  if (id <= 0) throw new Error("无效的用户ID")
  const user = fakeDb.find(u => u.id === id)
  if (!user) throw new Error(\`用户\${id}不存在\`)
  return user
}

async function fetchWithTimeout(id: number, delay: number): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = fakeDb.find(u => u.id === id)
      if (user) resolve(user)
      else reject(new Error(\`用户\${id}不存在\`))
    }, delay)
  })
}

// ===== 异步测试 =====
console.log("异步测试：\\n")

// 方式1：async/await
test("async/await 获取用户", async () => {
  const user = await fetchUser(1)
  expect(user).toEqual({ id: 1, name: "小明" })
})

// 方式2：测试 reject
test("用户不存在应抛出异常", async () => {
  try {
    await fetchUser(999)
    throw new Error("应该抛出异常但没有")
  } catch (e) {
    expect((e as Error).message).toBe("用户999不存在")
  }
})

// 方式3：超时获取
test("延迟获取用户", async () => {
  const user = await fetchWithTimeout(2, 0)
  expect(user.name).toBe("小红")
})

// 稍等让异步输出
setTimeout(() => console.log("\\n所有异步测试完成！"), 10)`,
      expectedOutput: `异步测试：

  ✅ async/await 获取用户
  ✅ 用户不存在应抛出异常
  ✅ 延迟获取用户

所有异步测试完成！`,
      hint: '在真实 Jest 中，如果 test 回调返回 Promise，Jest 会自动等待它完成——不用手动 setTimeout',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  实战项目 P2 — 类型工具库实战（3 节）
// ─────────────────────────────────────────────────────────────
const p2: Chapter = {
  id: 'p2',
  title: '实战：类型工具库',
  description: '动手实现 TypeScript 高级类型工具，深入理解类型系统',
  sections: [
    {
      id: 'p2.1',
      chapterId: 'p2',
      title: '设计实用类型 — DeepReadonly、Pick、Omit',
      content: `## 从零设计类型工具

你已经用过 \`Partial\`、\`Required\`、\`Pick\`。现在来理解它们是怎么实现的！

---

### Pick 的实现

\`\`\`typescript
// Pick 从对象类型中选取指定键
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

// 用法
interface User { name: string; age: number; email: string }
type NameOnly = MyPick<User, 'name' | 'age'>
// { name: string; age: number }
\`\`\`

---

### Omit 的实现

\`\`\`typescript
// Omit 排除指定键
type MyOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P]
}
\`\`\`

---

### DeepReadonly 的挑战

普通的 \`Readonly\` 只冻结第一层。**DeepReadonly** 递归冻结所有层：
\`\`\`typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>
    : T[K]
}
\`\`\`

这就是**递归类型**——类型也可以像函数一样递归！`,
      starterCode: `// 实现类型工具并用例子验证（类型在编译时检查，这里用运行时模拟）
type MyPick<T, K extends keyof T> = { [P in K]: T[P] }
type MyOmit<T, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P] }

interface User { id: number; name: string; age: number; email: string }

// 用辅助函数模拟类型约束的行为
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as any
  keys.forEach(k => result[k] = obj[k])
  return result
}

function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj }
  keys.forEach(k => delete result[k])
  return result
}

const user: User = { id: 1, name: "小明", age: 18, email: "xm@test.com" }

const picked = pick(user, ["name", "age"])
console.log("Pick 结果：", picked)

const omitted = omit(user, ["email"])
console.log("Omit 结果：", omitted)`,
      expectedOutput: `📂 读取了 7 行日志

前 3 行预览：
  192.168.1.1 - - [15/Jan/2025:10:30:00] "GET /index.html HTTP/1.1" 200 5120...
  192.168.1.2 - - [15/Jan/2025:10:30:01] "POST /api/login HTTP/1.1" 302 0...
  192.168.1.1 - - [15/Jan/2025:10:30:02] "GET /images/logo.png HTTP/1.1" 200 8192...

总字符数：513
平均行长：73 字符`,
      hint: '`keyof T` 获取类型 T 的所有键，`K extends keyof T` 约束 K 必须是 T 的键之一',
    },
    {
      id: 'p2.2',
      chapterId: 'p2',
      title: '条件类型 + infer — 实现 ReturnType 和 Parameters',
      content: `## 条件类型：类型世界的 if/else

TypeScript 的类型系统有"条件判断"：

\`\`\`typescript
type IsString<T> = T extends string ? "yes" : "no"

type A = IsString<"hello">  // "yes"
type B = IsString<42>       // "no"
\`\`\`

---

### infer：从类型中"提取"子类型

\`infer\` 用于在条件类型中声明一个**待推断的类型变量**：

\`\`\`typescript
// 提取函数的返回值类型
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never

// 提取函数的参数类型（元组）
type MyParameters<T> = T extends (...args: infer P) => any ? P : never
\`\`\`

---

### 用法示例

\`\`\`typescript
function greet(name: string, age: number): string {
  return \`\${name}, \${age} 岁\`
}

type R = MyReturnType<typeof greet>   // string
type P = MyParameters<typeof greet>   // [string, number]
\`\`\`

**infer 只能用在条件类型的 extends 子句中**——这是它的铁律。`,
      starterCode: `// 用运行时函数模拟 ReturnType 和 Parameters 的概念

// 获取函数返回值类型（运行时模拟）
function getReturnType(fn: (...args: any[]) => any): string {
  const result = fn(42, "test")
  return typeof result
}

// 获取函数参数数量（运行时模拟）
function getParamCount(fn: (...args: any[]) => any): number {
  return fn.length
}

// 泛型包装函数：保留原函数的类型签名
function wrap<F extends (...args: any[]) => any>(fn: F): F {
  const wrapper = ((...args: any[]) => {
    console.log("调用前...")
    const result = fn(...args)
    console.log("调用后...")
    return result
  }) as F
  return wrapper
}

function add(a: number, b: number): number { return a + b }
function greet(name: string): string { return "你好，" + name }

console.log("add 参数个数：" + getParamCount(add))
console.log("add 返回值类型：" + getReturnType(add))
console.log("greet 返回值类型：" + getReturnType(greet))

const wrappedAdd = wrap(add)
console.log("包装后调用：" + wrappedAdd(3, 5))`,
      expectedOutput: `add 参数个数：2
add 返回值类型：string
greet 返回值类型：string
调用前...
调用后...
包装后调用：8`,
      hint: '`fn.length` 返回函数声明的参数个数——TypeScript 的 `Parameters<T>` 在编译时做类似的事',
    },
    {
      id: 'p2.3',
      chapterId: 'p2',
      title: '类型安全的事件系统 — 用泛型约束 event map',
      content: `## 用泛型构建类型安全的事件系统

没有类型约束时，事件系统是这样的：

\`\`\`typescript
// ❌ 不安全的版本
class EventBus {
  on(event: string, handler: Function) {}
  emit(event: string, ...args: any[]) {}
}

bus.on("click", (x: number) => {})  // 但 emit 可能传 string！
\`\`\`

---

### 用泛型约束事件 map

\`\`\`typescript
// ✅ 类型安全的版本
type EventMap = {
  click: [x: number, y: number]
  input: [value: string]
  submit: []
}

class TypedEventBus<T extends Record<string, any[]>> {
  private handlers = new Map<string, Function[]>()

  on<K extends keyof T>(event: K, handler: (...args: T[K]) => void) {
    const list = this.handlers.get(event as string) || []
    list.push(handler)
    this.handlers.set(event as string, list)
  }

  emit<K extends keyof T>(event: K, ...args: T[K]) {
    (this.handlers.get(event as string) || []).forEach(h => h(...args))
  }
}
\`\`\`

现在 TypeScript 会检查每个事件的参数类型是否匹配！`,
      starterCode: `// 实现类型安全的事件系统
type MyEventMap = {
  login: [userId: number, name: string]
  logout: []
  message: [text: string]
}

class EventBus<T extends Record<string, any[]>> {
  private handlers: Record<string, Function[]> = {}

  on<K extends string>(event: K & string, handler: (...args: any[]) => void) {
    (this.handlers[event] ??= []).push(handler)
  }

  emit<K extends string>(event: K & string, ...args: any[]) {
    (this.handlers[event] || []).forEach(h => h(...args))
  }
}

const bus = new EventBus<MyEventMap>()

// 注册事件
bus.on("login", (userId, name) => {
  console.log(\`用户 \${name}（ID:\${userId}）登录了\`)
})
bus.on("message", (text) => {
  console.log("收到消息：" + text)
})

// 触发事件
bus.emit("login", 1, "小明")
bus.emit("message", "欢迎回来！")
bus.emit("logout")`,
      expectedOutput: `==================================================
📊 Web 服务器日志分析报告
==================================================
生成时间：2026-01-15 10:30:00  # 固定时间
总请求数：7
总流量：23,552 字节

🏆 IP 访问量 Top 3：
  192.168.1.1          3 次 ###
  192.168.1.2          2 次 ##
  192.168.1.3          1 次 #

📋 状态码分布：
  200:   4 次 (57.1%)
  302:   1 次 (14.3%)
  404:   1 次 (14.3%)
  500:   1 次 (14.3%)

💾 报告已保存到 report.txt`,
      hint: '`??=` 是"空值合并赋值"：如果左边是 null/undefined 就赋右边的值，等价于 if (!x) x = []',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  导出
// ─────────────────────────────────────────────────────────────
export const part2Chapters: Chapter[] = [ch9, ch10, ch10a, ch11, ch11a, p2];
