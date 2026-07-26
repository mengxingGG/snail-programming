// 🔧 第三部分：Node.js 后端 — Ch12 ~ Ch15a + P3（26 节）
// 参考：alsotang/node-lessons、able8/hello-express

import type { Chapter, SectionValidation } from '../types/course';

const nodeEnvironmentValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'prefix', value: 'Node.js 版本：' },
    { type: 'prefix', value: '操作系统：' },
    { type: 'prefix', value: '当前目录：' },
    { type: 'prefix', value: '百万次循环耗时：' },
  ],
};

const tempFileValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'prefix', value: '文件已写入：' },
    { type: 'exact', value: '读取内容：' },
    { type: 'exact', value: '蜗牛编程' },
    { type: 'exact', value: '学 TypeScript 很有趣！' },
    { type: 'exact', value: '临时文件已清理' },
  ],
};

const randomArticleIdValidation: SectionValidation = {
  mode: 'regex_pattern',
  outputRules: [
    { type: 'regex', value: "^状态: 201 \\{ id: \\d+, title: 'TypeScript 入门', content: '这是文章正文，内容超过十个字', createdAt: '2026-06-26' \\}$" },
    { type: 'exact', value: "状态: 400 { error: '缺少 title 字段' }" },
    { type: 'exact', value: "状态: 400 { error: 'content 至少需要 10 个字' }" },
  ],
};

const passwordHashValidation: SectionValidation = {
  mode: 'regex_pattern',
  outputRules: [
    { type: 'exact', value: '原始密码： 我的密码123' },
    { type: 'regex', value: '^哈希结果：.+…$' },
    { type: 'regex', value: '^用的 salt：random_salt_[a-z0-9]+$' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '正确密码验证：✅ 通过' },
    { type: 'exact', value: '错误密码验证：✅ 被拒绝' },
  ],
};

const jwtPreviewValidation: SectionValidation = {
  mode: 'regex_pattern',
  outputRules: [
    { type: 'exact', value: '生成的 JWT：' },
    { type: 'regex', value: '^[A-Za-z0-9+/=]+…$' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '用户 ID：1' },
    { type: 'exact', value: '角色：admin' },
    { type: 'exact', value: '是否过期：否' },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch12 — Node.js 初探（4 节）
// ─────────────────────────────────────────────────────────────
const ch12: Chapter = {
  id: 'ch12',
  title: 'Node.js 初探',
  description: 'Node.js 是什么、文件系统、路径操作、环境变量',
  sections: [
    {
      id: '12.1',
      kind: 'demo',
      chapterId: 'ch12',
      title: 'Node.js 是什么',
      content: `## Node.js：在浏览器之外运行 JavaScript

> 🔍 **这个能解决什么问题？** 你写的 TS 代码一直在蜗牛编程的在线环境里运行——但如果你想写一个"真正的服务器"，能让全世界的人访问，怎么办？**Node.js 让 JavaScript 像 Python/Java 一样在服务器上运行**，而不只是浏览器里。

### 更直观的理解

\`\`\`
浏览器中的 JS          Node.js 中的 JS
┌──────────────┐      ┌──────────────┐
│ 操作网页DOM   │      │ 读写文件      │
│ 响应用户点击  │      │ 操作数据库    │
│ 发送网络请求  │      │ 搭建 Web 服务器│
│ ❌不能读写文件 │      │ ✅ 都能做！  │
└──────────────┘      └──────────────┘
\`\`\`

之前我们说 JavaScript 是"在浏览器里运行的语言"。

**Node.js** 改变了这一切——它让 JavaScript 可以在**服务器**上运行，就像 Python、Java 一样。

---

### Node.js 能做什么？

\`\`\`
✅ 搭建 Web 服务器（比如你喜欢的 API）
✅ 读写文件（fs 模块）
✅ 操作数据库
✅ 运行命令行脚本
✅ 处理网络请求
\`\`\`

---

### 和浏览器 JS 的区别

| 特性 | 浏览器 JS | Node.js |
|------|-----------|---------|
| 操作文件 | ❌ | ✅ |
| 操作 DOM | ✅ | ❌ |
| 网络请求 | fetch | http/https 模块 |
| 全局对象 | window | global/process |

---

蜗牛编程里你写的代码，就是在 Node.js 里运行的！`,
      starterCode: `// process 是 Node.js 的内置对象，包含进程信息
console.log("Node.js 版本：" + process.version)
console.log("操作系统：" + process.platform)
console.log("当前目录：" + process.cwd())

// 计算时间
const start = Date.now()
for (let i = 0; i < 1000000; i++) {}
const elapsed = Date.now() - start
console.log(\`百万次循环耗时：\${elapsed}ms\`)`,
      expectedOutput: `Node.js 版本：v22.12.0
操作系统：win32
当前目录：C:\\Users\\11611\\AppData\\Local\\Temp
百万次循环耗时：2ms`,
      hint: '你的 Node.js 版本和系统路径可能不同，这两行的输出会有差异——这完全正常！',
      validation: nodeEnvironmentValidation,
    },
    {
      id: '12.2',
      kind: 'demo',
      chapterId: 'ch12',
      title: '读写文件 — fs 模块',
      content: `## fs 模块：和文件系统打交道

Node.js 内置的 \`fs\` 模块让你可以读取和写入文件。

---

### 同步读取（简单直接）

\`\`\`typescript
import fs from 'fs'

// 读取文件（同步）
const content = fs.readFileSync('data.txt', 'utf-8')
console.log(content)

// 写入文件（同步）
fs.writeFileSync('output.txt', '写入的内容', 'utf-8')
\`\`\`

---

### 异步读取（推荐，不阻塞）

\`\`\`typescript
import { readFile, writeFile } from 'fs/promises'

async function readData() {
  const content = await readFile('data.txt', 'utf-8')
  return content
}
\`\`\`

---

### 检查文件是否存在

\`\`\`typescript
import { existsSync } from 'fs'
existsSync('data.txt')   // true / false
\`\`\``,
      starterCode: `import fs from 'fs'
import os from 'os'
import path from 'path'

// 在临时目录写一个文件，再读回来
const tmpFile = path.join(os.tmpdir(), 'snail_test.txt')
const content = "蜗牛编程\\n学 TypeScript 很有趣！"

fs.writeFileSync(tmpFile, content, 'utf-8')
console.log("文件已写入：" + tmpFile)

const readBack = fs.readFileSync(tmpFile, 'utf-8')
console.log("读取内容：")
console.log(readBack)

fs.unlinkSync(tmpFile)  // 删除临时文件
console.log("临时文件已清理")`,
      expectedOutput: `文件已写入：C:\\Users\\ADMINI~1\\AppData\\Local\\Temp\\snail_test.txt
读取内容：
蜗牛编程
学 TypeScript 很有趣！
临时文件已清理`,
      hint: '文件路径在你的系统上会不同——这是正常的。关注写入和读取的逻辑是否正确',
      validation: tempFileValidation,
    },
    {
      id: '12.3',
      kind: 'exercise',
      chapterId: 'ch12',
      title: '路径操作 — path 模块',
      content: `## path 模块：处理文件路径的利器

不同操作系统的路径分隔符不同（Windows 用 \`\\\`，Mac/Linux 用 \`/\`）。\`path\` 模块帮你处理这些差异。

---

### 常用方法

\`\`\`typescript
import path from 'path'

// 拼接路径（跨平台）
path.join('/usr', 'local', 'bin')    // '/usr/local/bin'

// 获取文件名
path.basename('/path/to/file.txt')  // 'file.txt'

// 获取目录
path.dirname('/path/to/file.txt')   // '/path/to'

// 获取扩展名
path.extname('file.ts')             // '.ts'

// 解析为绝对路径
path.resolve('src', 'utils.ts')     // '/项目根目录/src/utils.ts'
\`\`\`

---

**永远用 \`path.join\` 拼接路径**，不要用字符串直接拼！`,
      starterCode: `import path from 'path'

const filePath = "/project/src/components/Button.tsx"

console.log("目录：", path.dirname(filePath))
console.log("文件名：", path.basename(filePath))
console.log("扩展名：", path.extname(filePath))
console.log("不含扩展名：", path.basename(filePath, path.extname(filePath)))

// 拼接路径
const joined = path.join("src", "shared", "types", "course.ts")
console.log("拼接结果：", joined)`,
      expectedOutput: `目录： /project/src/components
文件名： Button.tsx
扩展名： .tsx
不含扩展名： Button
拼接结果： src\shared\types\course.ts`,
      hint: 'path.join 会自动用当前系统的分隔符，Windows 下是 \\，Mac/Linux 下是 /',
    },
    {
      id: '12.4',
      kind: 'demo',
      chapterId: 'ch12',
      title: '环境变量 — process.env',
      content: `## 环境变量：配置和秘密的存储地

**环境变量**是在程序外部定义的配置，不写死在代码里——特别适合存放：

- 数据库密码（不能提交到 Git！）
- API 密钥
- 不同环境的配置（开发 vs 生产）

---

### 读取环境变量

\`\`\`typescript
// process.env 包含所有环境变量
const port = process.env.PORT
const dbUrl = process.env.DATABASE_URL
\`\`\`

---

### 设置默认值（防止 undefined）

\`\`\`typescript
const port = process.env.PORT ?? '3000'
// ?? 是"空值合并运算符"：如果左边是 null/undefined，用右边的值
\`\`\`

---

### .env 文件

项目根目录放一个 \`.env\` 文件：
\`\`\`
PORT=3000
DB_HOST=localhost
SECRET_KEY=my-secret
\`\`\`

用 \`dotenv\` 库加载：\`import 'dotenv/config'\``,
      starterCode: `// 模拟环境变量使用
const env = {
  NODE_ENV: "development",
  PORT: "3000",
  APP_NAME: "蜗牛编程",
}

// 在实际 Node.js 中会用 process.env.PORT
const port = env.PORT ?? "8080"
const appName = env.APP_NAME ?? "My App"
const isDev = env.NODE_ENV === "development"

console.log(\`应用名称：\${appName}\`)
console.log(\`运行端口：\${port}\`)
console.log(\`开发模式：\${isDev}\`)
console.log(\`服务器地址：http://localhost:\${port}\`)`,
      expectedOutput: `应用名称：蜗牛编程
运行端口：3000
开发模式：true
服务器地址：http://localhost:3000`,
      hint: '?? 是空值合并运算符：只有左边是 null 或 undefined 时才用右边的默认值（0 和 "" 不触发）',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch13 — Express：Web 服务器（7 节）
// ─────────────────────────────────────────────────────────────
const ch13: Chapter = {
  id: 'ch13',
  title: 'Express：Web 服务器',
  description: 'HTTP 基础、Express 路由、请求响应、中间件、JSON 接口',
  sections: [
    {
      id: '13.1',
      kind: 'demo',
      chapterId: 'ch13',
      title: 'HTTP 是什么 — 浏览器怎么和服务器说话',
      content: `## HTTP：浏览器和服务器的对话方式

当你在浏览器里访问一个网站，背后发生的事情：

\`\`\`
浏览器                              服务器
  |                                  |
  |  GET /articles HTTP/1.1          |
  |  Host: example.com               |
  | ─────────────────────────────→  |
  |                                  |
  |  HTTP/1.1 200 OK                 |
  |  Content-Type: application/json  |
  |  [{"id":1,"title":"..."}]        |
  | ←─────────────────────────────  |
\`\`\`

---

### URL 的结构

访问网页时，地址栏里输入的是 URL：

\`\`\`
https://www.example.com:8080/path/to/page?name=小明&age=18#section
└─┬──┘ └──────┬──────┘ └─┬┘ └─────┬──────┘ └──────┬───────┘ └──┬──┘
  协议          域名      端口       路径           查询参数      锚点
\`\`\`

| 部分 | 说明 | 例子 |
|------|------|------|
| **协议** | 通信规则，通常是 http 或 https（s 代表加密） | \`https://\` |
| **域名** | 服务器的地址，人类可读的名字 | \`example.com\` |
| **端口** | 服务器上的"门牌号"，默认 http=80, https=443 | \`:8080\` |
| **路径** | 你要访问的具体资源 | \`/articles/123\` |
| **查询参数** | 额外信息，用 \`?\` 开头，\`&\` 分隔多个 | \`?page=1&limit=10\` |

---

### HTTP 方法

每种方法对应不同的操作意图：

| 方法 | 用途 | 比喻 |
|------|------|------|
| GET | 获取数据（不改变服务器状态） | 查看菜单 |
| POST | 创建新数据 | 点菜 |
| PUT | 整体更新数据 | 换菜 |
| PATCH | 部分更新数据 | 加辣 |
| DELETE | 删除数据 | 退菜 |

> 💡 **GET 和 POST 最重要**，初学者先掌握这两个就够了。

---

### HTTP 状态码

服务器通过状态码告诉你请求的结果：

\`\`\`
1xx 信息        → 服务器还在处理（很少见）
2xx 成功 🟢     → 一切都好
3xx 重定向 🟡   → 资源搬家了，自动跳转
4xx 客户端错误 🔴 → 你发的请求有问题
5xx 服务端错误 🔴→ 服务器出问题了
\`\`\`

**最常见的状态码：**

| 状态码 | 含义 | 场景 |
|--------|------|------|
| **200** OK | 成功 | 获取文章列表 |
| **201** Created | 创建成功 | 提交新文章后 |
| **301/302** | 重定向到另一个地址 | 网页换地址了 |
| **400** Bad Request | 请求格式不对 | 少传了必填字段 |
| **401** Unauthorized | 未登录 | 需要先登录 |
| **403** Forbidden | 没有权限 | 你不是管理员 |
| **404** Not Found | 资源不存在 | 访问不存在的页面 |
| **500** Internal Server Error | 服务器错误 | 服务器代码崩了 |

> 📌 **记住 200、404、500 这三个最常用的**，其他的遇到了再查。`,
      starterCode: `// 模拟 HTTP 请求/响应的数据结构
interface HttpRequest {
  method: "GET" | "POST" | "PUT" | "DELETE"
  path: string
  body?: Record<string, unknown>
}

interface HttpResponse {
  status: number
  data: unknown
}

function handleRequest(req: HttpRequest): HttpResponse {
  if (req.method === "GET" && req.path === "/articles") {
    return { status: 200, data: [{ id: 1, title: "Hello" }] }
  }
  if (req.method === "POST" && req.path === "/articles") {
    return { status: 201, data: { message: "创建成功", id: 2 } }
  }
  return { status: 404, data: { message: "Not Found" } }
}

const res1 = handleRequest({ method: "GET", path: "/articles" })
console.log(\`GET /articles → \${res1.status}\`, res1.data)

const res2 = handleRequest({ method: "POST", path: "/articles" })
console.log(\`POST /articles → \${res2.status}\`, res2.data)

const res3 = handleRequest({ method: "GET", path: "/users" })
console.log(\`GET /users → \${res3.status}\`, res3.data)`,
      expectedOutput: `GET /articles → 200 [ { id: 1, title: 'Hello' } ]
POST /articles → 201 { message: '创建成功', id: 2 }
GET /users → 404 { message: 'Not Found' }`,
      hint: 'REST API 就是按照这个模式设计的——路径表示资源，HTTP 方法表示操作',
    },
    {
      id: '13.2',
      kind: 'demo',
      chapterId: 'ch13',
      title: 'Express 最小应用 — 3 行启动',
      content: `## Express：最流行的 Node.js Web 框架

Express 让搭建服务器变得极其简单：

\`\`\`typescript
import express from 'express'

const app = express()
app.use(express.json())  // 解析 JSON 请求体（详见 13.5 中间件）

// 定义路由
app.get('/', (req, res) => {
  res.json({ message: '你好，世界！' })
})

// 监听端口
app.listen(3000, () => {
  console.log('服务器启动在 http://localhost:3000')
})
\`\`\`

就这几行，一个 HTTP 服务器就跑起来了！

---

### req 和 res

| 对象 | 含义 | 常用属性/方法 |
|------|------|-----------|
| \`req\` | 请求（Request） | \`req.params\`, \`req.body\`, \`req.query\` |
| \`res\` | 响应（Response） | \`res.json()\`, \`res.send()\`, \`res.status()\` |`,
      starterCode: `// 模拟 Express 路由处理器的逻辑（不实际启动服务器）
interface Req { params: Record<string, string>; body: any }
interface Res {
  json: (data: any) => void
  status: (code: number) => Res
}

function createRes(): Res & { output: any } {
  const r = {
    output: null as any,
    currentStatus: 200,
    json(data: any) { r.output = { status: r.currentStatus, data }; return r },
    status(code: number) { r.currentStatus = code; return r },
  }
  return r
}

// 模拟路由处理器
function getArticles(req: Req, res: Res) {
  res.json([{ id: 1, title: "TypeScript 入门" }])
}

function getArticle(req: Req, res: Res) {
  const { id } = req.params
  res.json({ id: Number(id), title: \`文章 \${id}\` })
}

const res1 = createRes()
getArticles({ params: {}, body: null }, res1)
console.log("GET /articles →", res1.output)

const res2 = createRes()
getArticle({ params: { id: "5" }, body: null }, res2)
console.log("GET /articles/5 →", res2.output)`,
      expectedOutput: `GET /articles → { status: 200, data: [ { id: 1, title: 'TypeScript 入门' } ] }
GET /articles/5 → { status: 200, data: { id: 5, title: '文章 5' } }`,
      hint: 'req.params 包含 URL 中的动态参数，如 /articles/:id 中的 id',
    },
    {
      id: '13.3',
      kind: 'demo',
      chapterId: 'ch13',
      title: '路由 — 不同路径不同回应',
      content: `## 路由：根据请求路径，决定做什么

路由就是"看路牌，走不同的路"。

---

### 路由语法

\`\`\`typescript
// 静态路由
app.get('/articles', handler)        // GET /articles
app.post('/articles', handler)       // POST /articles

// 动态路由（:id 是参数）
app.get('/articles/:id', handler)    // GET /articles/1

// 嵌套路径
app.get('/users/:userId/posts', handler)
\`\`\`

---

### 获取路由参数

\`\`\`typescript
app.get('/articles/:id', (req, res) => {
  const id = req.params.id        // URL 参数
  const page = req.query.page     // 查询字符串 ?page=1
  const body = req.body           // POST 请求体
})
\`\`\`

---

### 路由分组（Router）

\`\`\`typescript
const router = express.Router()
router.get('/', listArticles)
router.post('/', createArticle)
router.get('/:id', getArticle)

app.use('/articles', router)
\`\`\``,
      starterCode: `// 模拟路由匹配系统
type Handler = (params: Record<string, string>) => string

interface Route {
  method: string
  pattern: string
  handler: Handler
}

function matchRoute(routes: Route[], method: string, path: string): string {
  for (const route of routes) {
    if (route.method !== method) continue
    const paramNames: string[] = []
    const regexStr = route.pattern.replace(/:(\w+)/g, (_, name) => {
      paramNames.push(name)
      return "([^/]+)"
    })
    const match = path.match(new RegExp("^" + regexStr + "$"))
    if (match) {
      const params: Record<string, string> = {}
      paramNames.forEach((name, i) => (params[name] = match[i + 1]))
      return route.handler(params)
    }
  }
  return "404 Not Found"
}

const routes: Route[] = [
  { method: "GET", pattern: "/articles", handler: () => "文章列表" },
  { method: "GET", pattern: "/articles/:id", handler: (p) => \`文章 #\${p.id}\` },
  { method: "GET", pattern: "/users/:uid/posts", handler: (p) => \`用户 \${p.uid} 的帖子\` },
]

console.log(matchRoute(routes, "GET", "/articles"))
console.log(matchRoute(routes, "GET", "/articles/42"))
console.log(matchRoute(routes, "GET", "/users/7/posts"))
console.log(matchRoute(routes, "GET", "/notfound"))`,
      expectedOutput: `文章列表
404 Not Found
404 Not Found
404 Not Found`,
      hint: '动态路由用 :name 标记参数，通过正则表达式匹配实际路径',
    },
    {
      id: '13.4',
      kind: 'exercise',
      chapterId: 'ch13',
      title: '请求和响应 — 收数据、发数据',
      content: `## req 和 res：收发数据的两个对象

---

### 从请求中获取数据

\`\`\`typescript
app.post('/articles', (req, res) => {
  const { title, content } = req.body   // POST 请求体（JSON）
  const page = req.query.page           // URL 查询参数 ?page=2
  const token = req.headers.authorization // 请求头
})
\`\`\`

---

### 发送响应

\`\`\`typescript
// 发送 JSON
res.json({ id: 1, title: "..." })

// 发送状态 + JSON
res.status(201).json({ message: "创建成功" })

// 发送纯文本
res.send("Hello World")

// 发送错误
res.status(404).json({ error: "Not Found" })
\`\`\`

---

### 链式调用

\`\`\`typescript
res.status(400)
   .json({ error: "缺少必填字段", field: "title" })
\`\`\``,
      starterCode: `// 模拟一个完整的文章创建流程
interface ArticleInput {
  title?: string
  content?: string
}

function createArticle(body: ArticleInput): { status: number; data: object } {
  // 验证必填字段
  if (!body.title) {
    return { status: 400, data: { error: "缺少 title 字段" } }
  }
  if (!body.content || body.content.length < 10) {
    return { status: 400, data: { error: "content 至少需要 10 个字" } }
  }

  const newArticle = {
    id: Math.floor(Math.random() * 1000),
    title: body.title,
    content: body.content,
    createdAt: "2026-06-26",
  }
  return { status: 201, data: newArticle }
}

const r1 = createArticle({ title: "TypeScript 入门", content: "这是文章正文，内容超过十个字" })
console.log(\`状态: \${r1.status}\`, r1.data)

const r2 = createArticle({ content: "有内容但没标题" })
console.log(\`状态: \${r2.status}\`, r2.data)

const r3 = createArticle({ title: "有标题", content: "太短" })
console.log(\`状态: \${r3.status}\`, r3.data)`,
      expectedOutput: `状态: 201 {
  id: 836,
  title: 'TypeScript 入门',
  content: '这是文章正文，内容超过十个字',
  createdAt: '2026-06-26'
}
状态: 400 { error: '缺少 title 字段' }
状态: 400 { error: 'content 至少需要 10 个字' }`,
      hint: '第一行的 id 是随机数，你的输出中这个数字会不同——这是正常的',
      validation: randomArticleIdValidation,
    },
    {
      id: '13.5',
      kind: 'demo',
      chapterId: 'ch13',
      title: '中间件 — 请求的流水线',
      content: `## 中间件：请求经过的每一道关卡

在 Express 中，请求从进来到响应返回，会经过一系列"中间件"处理。

\`\`\`
请求 → 日志中间件 → 认证中间件 → 路由处理器 → 响应
\`\`\`

---

### 中间件的写法

\`\`\`typescript
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.path}\`)
  next()   // 调用 next() 才会继续到下一个中间件
})
\`\`\`

- **不调用 next()** → 请求被"卡住"，不继续处理
- **调用 next(error)** → 触发错误处理中间件

---

### 常见内置中间件

\`\`\`typescript
app.use(express.json())           // 解析 JSON 请求体
app.use(express.static('public')) // 提供静态文件
app.use(cors())                   // 允许跨域（需要 cors 包）
\`\`\``,
      starterCode: `// 模拟中间件流水线
type Middleware = (ctx: Context, next: () => void) => void

interface Context {
  method: string
  path: string
  user?: string
  logs: string[]
}

function compose(middlewares: Middleware[]) {
  return (ctx: Context) => {
    let i = 0
    function next() {
      if (i < middlewares.length) {
        middlewares[i++](ctx, next)
      }
    }
    next()
  }
}

const logMiddleware: Middleware = (ctx, next) => {
  ctx.logs.push(\`[LOG] \${ctx.method} \${ctx.path}\`)
  next()
}

const authMiddleware: Middleware = (ctx, next) => {
  ctx.user = "小明"
  ctx.logs.push(\`[AUTH] 用户: \${ctx.user}\`)
  next()
}

const handler: Middleware = (ctx, next) => {
  ctx.logs.push(\`[HANDLER] 处理完毕\`)
}

const pipeline = compose([logMiddleware, authMiddleware, handler])
const ctx: Context = { method: "GET", path: "/articles", logs: [] }
pipeline(ctx)
ctx.logs.forEach(log => console.log(log))`,
      expectedOutput: `[LOG] GET /articles
[AUTH] 用户: 小明
[HANDLER] 处理完毕`,
      hint: '中间件的核心是 next()——调用它才会走到下一个，不调用就停在这一步',
    },
    {
      id: '13.5a',
      kind: 'demo',
      chapterId: 'ch13',
      title: 'CORS — 跨域请求',
      content: `## CORS：浏览器的安全检查

> \U0001f50d **这个能解决什么问题？** 前端在 localhost:5173，后端在 localhost:3000——浏览器会阻止前端发请求，说"跨域了！"**CORS 就是告诉浏览器"这个请求是安全的"。**

### 为什么会跨域？

浏览器有**同源策略**：协议、域名、端口任一不同，就跨域。

\`\`\`
http://localhost:5173  ← 前端
http://localhost:3000   ← 后端
         ↑↑↑ 端口不同，跨域！
\`\`\`

### 解决方案：cors 中间件

\`\`\`typescript
import cors from 'cors'
app.use(cors())  // 允许所有来源（开发环境）
\`\`\`

### 生产环境配置

\`\`\`typescript
app.use(cors({
  origin: 'https://myapp.com',  // 只允许你的前端
  methods: ['GET', 'POST'],
}))
\`\`\`

> \U0001f4a5 **新手常踩的坑：** 开发时忘了装 cors——后端有数据但前端拿不到，控制台报 CORS 错误。先 \`npm install cors\`，再加 \`app.use(cors())\`！`,
      starterCode: `// 模拟 CORS 检查
interface CorsConfig { allowedOrigins: string[] }

function checkCors(config: CorsConfig, origin: string): boolean {
  if (config.allowedOrigins.includes('*')) return true
  return config.allowedOrigins.includes(origin)
}

const dev = { allowedOrigins: ['*'] }
const prod = { allowedOrigins: ['http://localhost:5173'] }

console.log("开发环境：")
console.log("  本机: " + (checkCors(dev, "http://localhost:5173") ? "\u2705 允许" : "\u274c 阻止"))
console.log("  外部: " + (checkCors(dev, "https://evil.com") ? "\u2705 允许" : "\u274c 阻止"))
console.log("\\n生产环境：")
console.log("  本机: " + (checkCors(prod, "http://localhost:5173") ? "\u2705 允许" : "\u274c 阻止"))
console.log("  外部: " + (checkCors(prod, "https://evil.com") ? "\u2705 允许" : "\u274c 阻止"))`,
      expectedOutput: `开发环境：
  本机: ✅ 允许
  外部: ✅ 允许

生产环境：
  本机: ✅ 允许
  外部: ❌ 阻止`,
      hint: '开发环境用 app.use(cors()) 全部放行；上线前务必配置具体的 allowedOrigins 白名单！',
      difficulty: 'beginner',
      estimatedMinutes: 8,
    },
    {
      id: '13.6',
      kind: 'demo',
      chapterId: 'ch13',
      title: '静态文件 + JSON 接口',
      content: `## 两种最常见的服务器响应

---

### 1. 静态文件服务

\`\`\`typescript
// 把 public 目录里的文件直接对外提供
app.use(express.static('public'))

// 用户访问 /index.html → 返回 public/index.html 文件
// 用户访问 /style.css  → 返回 public/style.css 文件
\`\`\`

---

### 2. JSON API 接口

\`\`\`typescript
app.get('/api/articles', (req, res) => {
  const articles = db.prepare('SELECT * FROM articles').all()
  res.json(articles)
})
\`\`\`

---

### 完整的项目结构

\`\`\`
project/
├── public/         ← 静态文件（HTML/CSS/JS）
│   ├── index.html
│   └── style.css
├── src/
│   ├── server.ts   ← Express 服务器
│   └── routes/     ← API 路由
└── package.json
\`\`\``,
      starterCode: `// 模拟一个完整的 API 服务
interface Article {
  id: number
  title: string
  content: string
  views: number
}

// 模拟数据库中的数据
const articles: Article[] = [
  { id: 1, title: "TypeScript 入门", content: "TypeScript 是 JS 的超集...", views: 1024 },
  { id: 2, title: "Node.js 后端", content: "Node.js 让 JS 跑在服务端...", views: 856 },
  { id: 3, title: "React 实战", content: "React 是一个前端框架...", views: 2048 },
]

// GET /api/articles — 列表（按浏览量排序）
function listArticles(): Article[] {
  return [...articles].sort((a, b) => b.views - a.views)
}

// GET /api/articles/:id — 单篇
function getArticle(id: number): Article | null {
  return articles.find(a => a.id === id) ?? null
}

const list = listArticles()
console.log("文章列表（按热度）：")
list.forEach(a => console.log(\`  [\${a.id}] \${a.title} (\${a.views}次)\`))

const found = getArticle(2)
console.log("\\n查询 id=2：")
console.log(found ? \`  标题：\${found.title}\` : "  未找到")`,
      expectedOutput: `文章列表（按热度）：
  [3] React 实战 (2048次)
  [1] TypeScript 入门 (1024次)
  [2] Node.js 后端 (856次)

查询 id=2：
  标题：Node.js 后端`,
      hint: '展开运算符 [...articles] 先复制数组，再 .sort()，避免修改原始数据',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch14 — 数据库入门：SQLite（5 节）
// ─────────────────────────────────────────────────────────────
const ch14: Chapter = {
  id: 'ch14',
  title: '数据库入门：SQLite',
  description: '建表、插入、查询、更新、删除——掌握数据库基础操作',
  sections: [
    {
      id: '14.1',
      kind: 'demo',
      chapterId: 'ch14',
      title: '数据库是什么 — 比文件好在哪',
      content: `## 为什么用数据库？

你可能想到：数据不是可以存在文件里吗？

\`\`\`typescript
// 用文件存数据
fs.writeFileSync('users.json', JSON.stringify(users))
\`\`\`

文件可以用，但有问题：

| 场景 | 文件 | 数据库 |
|------|------|--------|
| 按条件查询 | 手动遍历 | SQL 一行搞定 |
| 多人同时写 | 文件损坏风险 | 事务保护 |
| 大量数据 | 全部加载内存 | 按需读取 |
| 排序/统计 | 手写算法 | SQL 内置 |

---

### SQLite：嵌入式轻量数据库

SQLite 把整个数据库存在**单个文件**里，不需要安装服务器，非常适合桌面应用和小型项目。

蜗牛编程就用 SQLite 存储用户数据和学习进度！`,
      starterCode: `// 用 TypeScript 模拟数据库的增删改查操作
interface Row {
  id: number
  [key: string]: any
}

class SimpleDB {
  private tables: Record<string, Row[]> = {}
  private nextId = 1

  createTable(name: string) {
    this.tables[name] = []
    return this
  }

  insert(table: string, data: Omit<Row, 'id'>): Row {
    const row = { id: this.nextId++, ...data }
    this.tables[table].push(row)
    return row
  }

  select(table: string, where?: (row: Row) => boolean): Row[] {
    const rows = this.tables[table] ?? []
    return where ? rows.filter(where) : rows
  }
}

const db = new SimpleDB()
db.createTable("users")

db.insert("users", { name: "小明", age: 18 })
db.insert("users", { name: "小红", age: 22 })
db.insert("users", { name: "小刚", age: 18 })

const all = db.select("users")
console.log("所有用户：", all.length, "人")

const young = db.select("users", r => r.age === 18)
console.log("18岁用户：")
young.forEach(u => console.log(\`  \${u.id}. \${u.name}\`))`,
      expectedOutput: `所有用户： 3 人
18岁用户：
  1. 小明
  3. 小刚`,
      hint: '真实的 SQLite 操作用 SQL 语句，原理和这个模拟完全一样——只是语法不同',
    },
    {
      id: '14.2',
      kind: 'demo',
      chapterId: 'ch14',
      title: '创建表 — 设计数据格式',
      content: `## CREATE TABLE：定义数据结构

在数据库里，**表（Table）** 就像一个电子表格，每列有固定的名字和类型。

---

### SQL 建表语句

\`\`\`sql
CREATE TABLE IF NOT EXISTS articles (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  title   TEXT    NOT NULL,
  content TEXT    NOT NULL,
  views   INTEGER DEFAULT 0,
  created_at INTEGER DEFAULT (unixepoch())
);
\`\`\`

---

### 常见列类型

| SQL 类型 | 存储内容 |
|----------|--------|
| INTEGER | 整数（包括 id） |
| TEXT | 字符串 |
| REAL | 小数 |
| BLOB | 二进制数据（图片等） |

---

### 约束

- \`NOT NULL\`：不允许为空
- \`PRIMARY KEY\`：主键，唯一标识每行
- \`AUTOINCREMENT\`：id 自动递增
- \`DEFAULT 0\`：不传时的默认值`,
      starterCode: `// 模拟 SQL 建表：用 TypeScript interface 描述表结构

interface UsersTable {
  id: number          // INTEGER PRIMARY KEY AUTOINCREMENT
  username: string    // TEXT NOT NULL UNIQUE
  email: string       // TEXT NOT NULL UNIQUE
  age: number         // INTEGER
  createdAt: number   // INTEGER DEFAULT (unixepoch())
}

interface ArticlesTable {
  id: number
  title: string       // TEXT NOT NULL
  content: string     // TEXT NOT NULL
  authorId: number    // INTEGER (外键 → users.id)
  views: number       // INTEGER DEFAULT 0
}

// 创建测试数据
const users: UsersTable[] = [
  { id: 1, username: "xiaoming", email: "xm@test.com", age: 18, createdAt: 1700000000 },
  { id: 2, username: "xiaohong", email: "xh@test.com", age: 20, createdAt: 1700000100 },
]

console.log("users 表结构字段：")
Object.keys(users[0]).forEach(k => console.log(\`  - \${k}\`))
console.log(\`共 \${users.length} 条记录\`)`,
      expectedOutput: `users 表结构字段：
  - id
  - username
  - email
  - age
  - createdAt
共 2 条记录`,
      hint: '数据库表的设计和 TypeScript 接口设计思路完全一致——先想好有哪些字段和类型',
    },
    {
      id: '14.3',
      kind: 'demo',
      chapterId: 'ch14',
      title: '插入数据 — 往表里加记录',
      content: `## INSERT：插入一行数据

---

### SQL 语法

\`\`\`sql
INSERT INTO articles (title, content, author_id)
VALUES ('TypeScript 入门', '这是正文...', 1);
\`\`\`

---

### better-sqlite3 的写法

\`\`\`typescript
const insert = db.prepare(
  'INSERT INTO articles (title, content) VALUES (?, ?)'
)
const result = insert.run('TypeScript 入门', '正文内容')
console.log(result.lastInsertRowid)  // 新记录的 id
\`\`\`

**用 \`?\` 占位符**，不要用字符串拼接！

字符串拼接会导致 **SQL 注入攻击**：

\`\`\`sql
-- ❌ 危险！用户输入 "'; DROP TABLE articles; --" 就完了
"INSERT INTO articles VALUES ('" + userInput + "')"
\`\`\``,
      starterCode: `// 模拟数据库 INSERT 操作
interface Article {
  id?: number
  title: string
  content: string
  views: number
}

class ArticleRepo {
  private articles: Article[] = []
  private nextId = 1

  // 模拟 db.prepare('INSERT INTO articles...').run(title, content)
  insert(title: string, content: string): number {
    const id = this.nextId++
    this.articles.push({ id, title, content, views: 0 })
    return id
  }

  count(): number {
    return this.articles.length
  }

  all(): Article[] {
    return this.articles
  }
}

const repo = new ArticleRepo()

const id1 = repo.insert("TypeScript 入门", "TypeScript 是 JavaScript 的超集")
const id2 = repo.insert("Node.js 后端", "Node.js 让 JS 运行在服务器上")
const id3 = repo.insert("React 实战", "React 是流行的前端框架")

console.log(\`插入了 \${repo.count()} 篇文章\`)
console.log("文章 ID：", id1, id2, id3)
repo.all().forEach(a => console.log(\`  [\${a.id}] \${a.title}\`))`,
      expectedOutput: `插入了 3 篇文章
文章 ID： 1 2 3
  [1] TypeScript 入门
  [2] Node.js 后端
  [3] React 实战`,
      hint: '? 占位符是防止 SQL 注入的关键——永远不要把用户输入直接拼进 SQL 字符串',
    },
    {
      id: '14.4',
      kind: 'demo',
      chapterId: 'ch14',
      title: '查询数据 — 把想要的找出来',
      content: `## SELECT：查询数据

SELECT 是数据库最重要的操作，语法非常强大：

---

### 基本查询

\`\`\`sql
SELECT * FROM articles;              -- 所有列
SELECT id, title FROM articles;      -- 指定列
SELECT * FROM articles WHERE id = 1; -- 按条件筛选
\`\`\`

---

### 排序和分页

\`\`\`sql
SELECT * FROM articles
ORDER BY views DESC     -- 按浏览量降序
LIMIT 10                -- 只取 10 条
OFFSET 20;              -- 跳过前 20 条（第 3 页）
\`\`\`

---

### 聚合函数

\`\`\`sql
SELECT COUNT(*) as total FROM articles;           -- 总数
SELECT AVG(views) as avg_views FROM articles;     -- 平均浏览量
SELECT MAX(views) as max_views FROM articles;     -- 最高浏览量
\`\`\`

---

### better-sqlite3

\`\`\`typescript
db.prepare('SELECT * FROM articles WHERE views > ?').all(100)
db.prepare('SELECT * FROM articles WHERE id = ?').get(id)
\`\`\``,
      starterCode: `// 模拟 SQL 查询操作
interface Article {
  id: number; title: string; category: string; views: number
}

const articles: Article[] = [
  { id: 1, title: "TypeScript 入门", category: "ts", views: 1024 },
  { id: 2, title: "Node.js 后端", category: "node", views: 856 },
  { id: 3, title: "TypeScript 进阶", category: "ts", views: 2048 },
  { id: 4, title: "React 实战", category: "react", views: 1536 },
  { id: 5, title: "Express 路由", category: "node", views: 420 },
]

// WHERE category = 'ts' ORDER BY views DESC
const tsArticles = articles
  .filter(a => a.category === "ts")
  .sort((a, b) => b.views - a.views)

console.log("TypeScript 分类文章（按热度）：")
tsArticles.forEach(a => console.log(\`  \${a.title}: \${a.views} 次\`))

// 统计：COUNT(*), AVG(views)
const total = articles.length
const avg = Math.round(articles.reduce((s, a) => s + a.views, 0) / total)
console.log(\`\\n共 \${total} 篇，平均浏览 \${avg} 次\`)`,
      expectedOutput: `TypeScript 分类文章（按热度）：
  TypeScript 进阶: 2048 次
  TypeScript 入门: 1024 次

共 5 篇，平均浏览 1177 次`,
      hint: 'filter + sort 的组合等价于 SQL 的 WHERE + ORDER BY，两者思路完全一致',
    },
    {
      id: '14.5',
      kind: 'demo',
      chapterId: 'ch14',
      title: '更新和删除',
      content: `## UPDATE 和 DELETE：修改和删除数据

---

### UPDATE：修改现有数据

\`\`\`sql
UPDATE articles
SET title = '新标题', views = views + 1
WHERE id = 1;
\`\`\`

\`\`\`typescript
db.prepare('UPDATE articles SET views = views + 1 WHERE id = ?')
  .run(articleId)
\`\`\`

---

### DELETE：删除数据

\`\`\`sql
DELETE FROM articles WHERE id = 1;
DELETE FROM articles WHERE views = 0;  -- 删除无浏览量的文章
\`\`\`

\`\`\`typescript
db.prepare('DELETE FROM articles WHERE id = ?').run(id)
\`\`\`

---

### ⚠️ 危险操作

\`\`\`sql
DELETE FROM articles;  -- 不加 WHERE！删除所有文章！
UPDATE articles SET views = 0;  -- 不加 WHERE！清零所有！
\`\`\`

**UPDATE 和 DELETE 一定要加 WHERE 条件**，除非你确实想操作所有行。`,
      starterCode: `interface Article {
  id: number; title: string; views: number; deleted: boolean
}

const articles: Article[] = [
  { id: 1, title: "老文章", views: 10, deleted: false },
  { id: 2, title: "热门文章", views: 5000, deleted: false },
  { id: 3, title: "无人问津", views: 0, deleted: false },
  { id: 4, title: "好文章", views: 200, deleted: false },
]

// UPDATE: 给 id=2 的文章浏览量加 100
articles.find(a => a.id === 2)!.views += 100
console.log("更新后 id=2：", articles[1].views, "次浏览")

// DELETE: 删除浏览量为 0 的文章（软删除）
const before = articles.filter(a => !a.deleted).length
articles.forEach(a => { if (a.views === 0) a.deleted = true })
const after = articles.filter(a => !a.deleted).length

console.log(\`删除前 \${before} 篇，删除后 \${after} 篇\`)
articles.filter(a => !a.deleted).forEach(a =>
  console.log(\`  [\${a.id}] \${a.title}: \${a.views} 次\`)
)`,
      expectedOutput: `更新后 id=2： 5100 次浏览
删除前 4 篇，删除后 3 篇
  [1] 老文章: 10 次
  [2] 热门文章: 5100 次
  [4] 好文章: 200 次`,
      hint: '软删除（设置 deleted=true）比直接 DELETE 更安全——误删了还能恢复',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch15 — RESTful API（4 节）
// ─────────────────────────────────────────────────────────────
const ch15: Chapter = {
  id: 'ch15',
  title: 'RESTful API',
  description: 'REST 约定、GET/POST/PUT/DELETE、数据验证和错误响应',
  sections: [
    {
      id: '15.1',
      kind: 'demo',
      chapterId: 'ch15',
      title: 'REST 是什么 — 一套约定',
      content: `## REST：让 API 更有规律

REST（Representational State Transfer）是一套设计 API 的**约定**，不是强制标准，但大家都这么用。

---

### 核心思想：资源 + HTTP 方法

\`\`\`
资源：articles（文章）、users（用户）、comments（评论）

GET    /articles        → 获取所有文章
GET    /articles/1      → 获取 id=1 的文章
POST   /articles        → 创建新文章
PUT    /articles/1      → 更新 id=1 的文章（完整替换）
PATCH  /articles/1      → 更新 id=1 的文章（部分修改）
DELETE /articles/1      → 删除 id=1 的文章
\`\`\`

---

### 嵌套资源

\`\`\`
GET /articles/1/comments     → 文章 1 的所有评论
POST /articles/1/comments    → 给文章 1 添加评论
\`\`\`

---

### 好的 API 设计

✅ /articles（复数名词）
❌ /getArticles（动词）
❌ /article_list（下划线）`,
      starterCode: `// 模拟一套完整的 REST API 端点设计
interface ApiEndpoint {
  method: string
  path: string
  description: string
}

const articleApi: ApiEndpoint[] = [
  { method: "GET",    path: "/articles",      description: "获取文章列表" },
  { method: "GET",    path: "/articles/:id",  description: "获取单篇文章" },
  { method: "POST",   path: "/articles",      description: "创建新文章" },
  { method: "PUT",    path: "/articles/:id",  description: "更新文章" },
  { method: "DELETE", path: "/articles/:id",  description: "删除文章" },
]

const padding = (s: string, len: number) => s.padEnd(len, " ")

console.log("文章模块 API 设计：")
console.log(padding("方法", 8) + padding("路径", 20) + "描述")
console.log("-".repeat(50))
articleApi.forEach(e =>
  console.log(padding(e.method, 8) + padding(e.path, 20) + e.description)
)`,
      expectedOutput: `文章模块 API 设计：
方法      路径                  描述
--------------------------------------------------
GET     /articles           获取文章列表
GET     /articles/:id       获取单篇文章
POST    /articles           创建新文章
PUT     /articles/:id       更新文章
DELETE  /articles/:id       删除文章`,
      hint: 'padEnd 方法让字符串右侧填充空格到指定长度，用于对齐输出',
    },
    {
      id: '15.2',
      kind: 'demo',
      chapterId: 'ch15',
      title: 'GET — 获取资源',
      content: `## GET：最常用的 HTTP 方法

GET 请求用于**获取数据**，不会修改服务器上的任何东西。

---

### Express 实现

\`\`\`typescript
// 获取列表（支持分页、排序、搜索）
app.get('/articles', (req, res) => {
  const { page = '1', limit = '10', q } = req.query

  let query = db.prepare('SELECT * FROM articles')
  let articles = query.all()

  if (q) articles = articles.filter(a => a.title.includes(q))

  const pageNum = Number(page)
  const limitNum = Number(limit)
  const start = (pageNum - 1) * limitNum

  res.json({
    data: articles.slice(start, start + limitNum),
    total: articles.length,
    page: pageNum,
    totalPages: Math.ceil(articles.length / limitNum),
  })
})
\`\`\``,
      starterCode: `// 实现一个带分页和搜索的 getArticles 函数
interface Article { id: number; title: string; category: string }

const articles: Article[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: ["TypeScript", "Node.js", "React", "Express", "SQLite"][i % 5] + \` 教程 \${i + 1}\`,
  category: ["ts", "node", "react", "express", "db"][i % 5],
}))

function getArticles(page: number, limit: number, q?: string): object {
  let result = q ? articles.filter(a => a.title.includes(q)) : articles
  const total = result.length
  const start = (page - 1) * limit
  return {
    data: result.slice(start, start + limit),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  }
}

const r1 = getArticles(1, 3) as any
console.log(\`第1页（每页3条）：\${r1.data.length} 条，共 \${r1.total} 条\`)
r1.data.forEach((a: Article) => console.log(\`  [\${a.id}] \${a.title}\`))

const r2 = getArticles(1, 10, "TypeScript") as any
console.log(\`搜索"TypeScript"：\${r2.total} 条\`)`,
      expectedOutput: `第1页（每页3条）：3 条，共 20 条
  [1] TypeScript 教程 1
  [2] Node.js 教程 2
  [3] React 教程 3
搜索"TypeScript"：4 条`,
      hint: 'slice(start, start+limit) 实现分页——start 是起始位置，limit 是每页数量',
    },
    {
      id: '15.3',
      kind: 'demo',
      chapterId: 'ch15',
      title: 'POST — 创建资源',
      content: `## POST：提交数据，创建新记录

---

### Express 实现

\`\`\`typescript
app.post('/articles', (req, res) => {
  const { title, content } = req.body

  // 1. 验证输入
  if (!title || !content) {
    return res.status(400).json({ error: "title 和 content 不能为空" })
  }

  // 2. 写入数据库
  const stmt = db.prepare('INSERT INTO articles (title, content) VALUES (?, ?)')
  const result = stmt.run(title, content)

  // 3. 返回新创建的资源
  res.status(201).json({
    id: result.lastInsertRowid,
    title,
    content,
  })
})
\`\`\`

---

### 约定

- 成功创建 → 返回 **201 Created**（不是 200）
- 缺少必填字段 → 返回 **400 Bad Request**
- 返回刚创建的资源（包含新 id）`,
      starterCode: `interface ArticleInput { title?: string; content?: string }
interface Article { id: number; title: string; content: string }

const db: Article[] = []
let nextId = 1

function createArticle(input: ArticleInput): { status: number; body: any } {
  // 验证
  if (!input.title?.trim()) {
    return { status: 400, body: { error: "title 不能为空" } }
  }
  if (!input.content || input.content.length < 20) {
    return { status: 400, body: { error: "content 至少 20 个字" } }
  }

  // 插入
  const article: Article = {
    id: nextId++,
    title: input.title.trim(),
    content: input.content,
  }
  db.push(article)

  return { status: 201, body: article }
}

const r1 = createArticle({ title: "TypeScript 入门", content: "TypeScript 是 JavaScript 的超集，添加了类型系统" })
console.log(\`状态 \${r1.status}:\`, r1.body)

const r2 = createArticle({ title: "" })
console.log(\`状态 \${r2.status}:\`, r2.body)

console.log(\`数据库共 \${db.length} 篇文章\`)`,
      expectedOutput: `状态 201: {
  id: 1,
  title: 'TypeScript 入门',
  content: 'TypeScript 是 JavaScript 的超集，添加了类型系统'
}
状态 400: { error: 'title 不能为空' }
数据库共 1 篇文章`,
      hint: '创建成功返回 201，而不是 200——这是 REST 规范，代表"资源已被创建"',
    },
    {
      id: '15.4',
      kind: 'demo',
      chapterId: 'ch15',
      title: '数据验证 + 错误响应规范',
      content: `## 统一的数据验证和错误格式

好的 API 应该有一致的错误响应格式，让前端容易处理：

---

### 统一错误格式

\`\`\`typescript
// 错误响应结构
interface ErrorResponse {
  error: string        // 错误描述
  field?: string       // 哪个字段出问题（可选）
  code?: string        // 错误代码（可选）
}

// 成功响应结构
interface SuccessResponse<T> {
  data: T
  message?: string
}
\`\`\`

---

### 分层验证

\`\`\`typescript
// 第 1 层：类型检查（TypeScript 编译时）
// 第 2 层：格式验证（业务规则）
// 第 3 层：数据库约束（最后一道防线）
\`\`\``,
      starterCode: `interface ValidationResult {
  valid: boolean
  errors: { field: string; message: string }[]
}

function validateArticle(data: any): ValidationResult {
  const errors: { field: string; message: string }[] = []

  if (!data.title?.trim()) {
    errors.push({ field: "title", message: "标题不能为空" })
  } else if (data.title.length > 100) {
    errors.push({ field: "title", message: "标题不超过 100 个字" })
  }

  if (!data.content?.trim()) {
    errors.push({ field: "content", message: "正文不能为空" })
  } else if (data.content.length < 20) {
    errors.push({ field: "content", message: "正文至少 20 个字" })
  }

  return { valid: errors.length === 0, errors }
}

const cases = [
  { title: "好文章", content: "这是一篇很精彩的技术文章，内容详实，讲解清晰" },
  { title: "", content: "有内容没标题" },
  { title: "有标题", content: "太短" },
]

cases.forEach((c, i) => {
  const result = validateArticle(c)
  if (result.valid) {
    console.log(\`Case \${i+1}: ✅ 验证通过\`)
  } else {
    console.log(\`Case \${i+1}: ❌ \${result.errors.map(e => e.message).join(", ")}\`)
  }
})`,
      expectedOutput: `Case 1: ✅ 验证通过
Case 2: ❌ 标题不能为空, 正文至少 20 个字
Case 3: ❌ 正文至少 20 个字`,
      hint: '把验证逻辑抽成独立函数，路由处理器只需调用它——这是关注点分离的原则',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch15a — 用户认证与JWT（3 节）
// ─────────────────────────────────────────────────────────────
const ch15a: Chapter = {
  id: 'ch15a',
  title: '用户认证与 JWT',
  description: '理解认证流程、密码哈希、JWT 令牌的原理与实现',
  sections: [
    {
      id: '15a.1',
      kind: 'demo',
      chapterId: 'ch15a',
      title: '认证 vs 授权 — 你是谁？你能做什么？',
      content: `## 认证 (Authentication) vs 授权 (Authorization)

> 🔍 **这个能解决什么问题？** 没有认证的 API 就像没锁的门——任何人都能访问任何功能。你需要一种机制来确认"你是谁"（认证），并决定"你能做什么"（授权）。

---

### 两个容易混淆的概念

| 概念 | 英文 | 问题 | 例子 |
|------|------|------|------|
| **认证** | Authentication | 你是谁？ | 输入用户名+密码登录 |
| **授权** | Authorization | 你能做什么？ | 管理员才能删除文章 |

**认证在前，授权在后**——先确认你是谁，再判断你能做什么。

---

### 常见的认证方式

\`\`\`mermaid
认证方式
├── Session-Cookie（传统 Web）
│   ├── 服务器存 session
│   └── 客户端存 cookie ID
├── JWT（现代 API）
│   ├── 无状态：服务器不存 session
│   └── 令牌里包含用户信息
└── OAuth（第三方登录）
    ├── 用 Google/GitHub 账号登录
    └── 不暴露密码
\`\`\`

**JWT 是目前 REST API 最流行的认证方式**，也是本节的重点。

---

### 一个完整的认证流程

\`\`\`
1. 用户注册 → 服务器存哈希后的密码到数据库
2. 用户登录 → 服务器验证密码 → 生成 JWT → 返回给客户端
3. 客户端存 JWT（localStorage / cookie）
4. 客户端发请求时带上 JWT（放在 Authorization header）
5. 服务器验证 JWT → 如果有效，放行请求
\`\`\``,
      starterCode: `// 模拟一个简单的认证系统
interface User {
  id: number
  username: string
  passwordHash: string  // 实际中不存明文密码！
  role: "admin" | "user"
}

// 模拟"数据库"
const users: User[] = [
  { id: 1, username: "admin", passwordHash: "hashed_password_123", role: "admin" },
  { id: 2, username: "xiaoming", passwordHash: "hashed_password_456", role: "user" },
]

function authenticate(username: string, password: string): User | null {
  // 实际工作中：查数据库 + bcrypt.compare()
  const user = users.find(u => u.username === username)
  if (!user) return null
  // 这里模拟密码验证通过
  return user
}

function authorize(user: User, requiredRole: "admin" | "user"): boolean {
  if (requiredRole === "admin" && user.role !== "admin") {
    return false  // 权限不足
  }
  return true
}

// 用户登录
const user = authenticate("admin", "hashed_password_123")
if (user) {
  console.log(\`用户 \${user.username} 认证成功\`)
  console.log(\`角色：\${user.role}\`)
  
  const canDelete = authorize(user, "admin")
  console.log(\`可以删除文章？\${canDelete ? "✅ 是" : "❌ 否"}\`)
} else {
  console.log("认证失败：用户名或密码错误")
}`,
      expectedOutput: `用户 admin 认证成功
角色：admin
可以删除文章？✅ 是`,
      hint: '认证和授权要分开处理：先确认身份（authenticate），再检查权限（authorize）',
    },
    {
      id: '15a.2',
      kind: 'demo',
      chapterId: 'ch15a',
      title: '密码安全 — 为什么不能存明文？',
      content: `## 密码哈希：你永远不知道用户的密码

> ⚠️ **最严重的安全隐患：明文存密码！** 一旦数据库泄露，所有用户的密码就全暴露了。

---

### 哈希 (Hash) 是什么？

哈希是一种**单向**转换——你把密码转成"指纹"，但无法从指纹反推出密码。

\`\`\`
"mypassword123"  →  哈希算法  →  "a1b2c3d4e5f6..."
                    ↓
             无法反推出原密码！
\`\`\`

---

### bcrypt：专门为密码设计的哈希算法

普通的哈希（如 MD5、SHA256）**太快了**——攻击者可以每秒尝试数十亿个密码。

**bcrypt** 故意设计得很慢（可以调整"工作因子"），让暴力破解变得不现实：

\`\`\`typescript
import bcrypt from 'bcrypt'

// 注册时：哈希密码
const saltRounds = 12
const hashedPassword = await bcrypt.hash("mypassword123", saltRounds)

// 登录时：比较密码
const isMatch = await bcrypt.compare("mypassword123", hashedPassword)
// true → 密码正确！
\`\`\`

| 方法 | 用途 | 说明 |
|------|------|------|
| \`bcrypt.hash(password, rounds)\` | 哈希密码 | rounds 越大越安全（也越慢），推荐 10-12 |
| \`bcrypt.compare(password, hash)\` | 验证密码 | 自动从 hash 中提取 salt |

---

### 不要做的事 🚫

- ❌ **不要存明文密码** — 数据库泄露 = 所有账号全丢
- ❌ **不要用 MD5/SHA1 哈希密码** — 太容易破解
- ❌ **不要自己造哈希算法** — 专业的事交给 bcrypt
- ❌ **不要限制密码长度** — 允许长密码（密码管理器用户会用很长的随机密码）`,
      starterCode: `// 模拟 bcrypt 的工作原理
interface PasswordRecord {
  hash: string
  salt: string
}

// 模拟哈希：实际工作中用 bcrypt
function simulateHash(password: string): PasswordRecord {
  // 真实 bcrypt 会自动生成随机的 salt
  const salt = "random_salt_" + Math.random().toString(36).slice(2, 8)
  // 模拟哈希过程：密码 + salt 组合后"混洗"
  const combined = password + salt
  const hash = Array.from(combined)
    .map(c => c.charCodeAt(0).toString(16))
    .join("")
    .slice(0, 32)
  return { hash, salt }
}

function simulateCompare(
  password: string,
  record: PasswordRecord
): boolean {
  const combined = password + record.salt
  const hash = Array.from(combined)
    .map(c => c.charCodeAt(0).toString(16))
    .join("")
    .slice(0, 32)
  return hash === record.hash
}

const password = "我的密码123"
const record = simulateHash(password)

console.log("原始密码：", password)
console.log("哈希结果：" + record.hash.slice(0, 20) + "…")
console.log("用的 salt：" + record.salt)

// 验证密码
const correct = simulateCompare("我的密码123", record)
const wrong = simulateCompare("错误密码", record)
console.log("\\n正确密码验证：" + (correct ? "✅ 通过" : "❌ 失败"))
console.log("错误密码验证：" + (wrong ? "⛔ 通过了(问题！)" : "✅ 被拒绝"))`,
      expectedOutput: `原始密码： 我的密码123
哈希结果：e68891e79a84e5af86…
用的 salt：random_salt_xxxxx

正确密码验证：✅ 通过
错误密码验证：✅ 被拒绝`,
      hint: 'salt（随机字符串）确保即使两人用相同密码，哈希结果也不一样——防止攻击者通过"彩虹表"批量破解',
      validation: passwordHashValidation,
    },
    {
      id: '15a.3',
      kind: 'demo',
      chapterId: 'ch15a',
      title: 'JWT — JSON Web Token',
      content: `## JWT：一张"数字身份证"

> 🔍 **这个能解决什么问题？** HTTP 是"无状态"的——服务器处理完一个请求就忘记你是谁了。每次请求你都要重新证明身份。**JWT 就是一张"一次性签发、多次使用"的数字身份证。**

---

### JWT 的结构

JWT 长这样：\`xxxxx.yyyyy.zzzzz\`，由三部分组成：

\`\`\`
header.payload.signature

header（头部）：     { "alg": "HS256", "typ": "JWT" }
payload（载荷）：    { "userId": 1, "role": "admin", "iat": 1700000000 }
signature（签名）：  验证令牌没有被篡改
\`\`\`

---

### JWT 的工作流程

\`\`\`typescript
// 登录成功后生成 JWT
import jwt from 'jsonwebtoken'

const token = jwt.sign(
  { userId: 1, role: 'admin' },   // payload：你想存在令牌里的信息
  'your-secret-key',               // secret：只有服务器知道的密钥
  { expiresIn: '7d' }              // 过期时间：7 天后令牌自动失效
)

// 后续请求中验证 JWT
try {
  const decoded = jwt.verify(token, 'your-secret-key')
  // decoded = { userId: 1, role: 'admin', iat: ..., exp: ... }
} catch (err) {
  // 令牌无效或已过期
}
\`\`\`

---

### 前端怎么用？

\`\`\`typescript
// 登录成功后，存 token
const token = await login(username, password)
localStorage.setItem('token', token)

// 每次请求带上 token
fetch('/api/articles', {
  headers: {
    'Authorization': \`Bearer \${token}\`  // ← 标准格式
  }
})
\`\`\`

> 💥 **新手常踩的坑：**
> 1. **secret 泄露** — secret 是 JWT 安全的核心，绝对不能提交到 Git！
> 2. **token 过期没处理** — 前端需要检测 401 响应，跳转到登录页
> 3. **payload 存敏感信息** — payload 只是 base64 编码，不是加密！别存密码`,
      starterCode: `// 模拟 JWT 的生成和验证
interface JwtPayload {
  userId: number
  role: string
  exp: number  // 过期时间戳
}

// 模拟 JWT 签名（实际用 jsonwebtoken 库）
function createToken(payload: Omit<JwtPayload, 'exp'>): string {
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000  // 7天后过期
  const tokenData = { ...payload, exp }
  // base64 编码模拟签名（实际中是 HMAC-SHA256 签名）
  return btoa(JSON.stringify(tokenData)) + "." + "fake_signature"
}

function verifyToken(token: string): JwtPayload | null {
  try {
    const [encoded] = token.split(".")
    const decoded = JSON.parse(atob(encoded))
    
    if (decoded.exp < Date.now()) {
      console.log("❌ Token 已过期")
      return null
    }
    return decoded as JwtPayload
  } catch {
    console.log("❌ Token 无效")
    return null
  }
}

// 模拟登录：生成 token
const token = createToken({ userId: 1, role: "admin" })
console.log("生成的 JWT：")
console.log(token.slice(0, 30) + "…")

// 模拟后续请求：验证 token
const decoded = verifyToken(token)
if (decoded) {
  console.log(\`\\n用户 ID：\${decoded.userId}\`)
  console.log(\`角色：\${decoded.role}\`)
  console.log(\`是否过期：\${decoded.exp < Date.now() ? "是" : "否"}\`)
}`,
      expectedOutput: `生成的 JWT：
eyJ1c2VySWQiOjEsInJvbGUiOiJh…

用户 ID：1
角色：admin
是否过期：否`,
      hint: '生产环境一定要用成熟的 JWT 库（jsonwebtoken），不要自己实现签名算法！',
      validation: jwtPreviewValidation,
      difficulty: 'intermediate',
      estimatedMinutes: 15,
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  导出
// ─────────────────────────────────────────────────────────────
export const part3Chapters: Chapter[] = [ch12, ch13, ch14, ch15, ch15a,
  // ─── 实战项目 P3 ───
  {
    id: 'p3',
    title: '实战：Express REST API',
    description: '用 Express + SQLite 构建完整的 RESTful API，含数据库、中间件、测试',
    sections: [
      {
        id: 'p3.1',
        kind: 'demo',
        chapterId: 'p3',
        title: '项目搭建 + 路由设计',
        content: `## 搭建 Express REST API 项目

---

### 初始化

\`\`\`bash
mkdir notes-api && cd notes-api
npm init -y
npm install express better-sqlite3
npm install -D typescript @types/express @types/better-sqlite3 ts-node
\`\`\`

---

### 路由设计（RESTful）

\`\`\`
GET    /api/notes          → 获取所有笔记
GET    /api/notes/:id      → 获取单条笔记
POST   /api/notes           → 创建笔记
PUT    /api/notes/:id      → 更新笔记
DELETE /api/notes/:id      → 删除笔记
\`\`\`

---

### 项目结构

\`\`\`
notes-api/
├── src/
│   ├── index.ts          ← 入口：启动服务器
│   ├── db.ts             ← 数据库初始化和连接
│   ├── routes/
│   │   └── notes.ts      ← 笔记路由
│   └── middleware/
│       └── errorHandler.ts
└── notes.db              ← SQLite 数据库文件
\`\`\`

---

### 启动代码

\`\`\`typescript
import express from 'express'
import { initDb } from './db'
import notesRouter from './routes/notes'

const app = express()
app.use(express.json())  // 解析 JSON 请求体（详见 13.5 中间件）

initDb()  // 初始化数据库表

app.use('/api/notes', notesRouter)

app.listen(3000, () => console.log('🚀 http://localhost:3000'))
\`\`\``,
        starterCode: `// 设计 REST API 的路由和类型
interface Note {
  id: number; title: string; content: string; createdAt: string
}
type NoteInput = Pick<Note, 'title' | 'content'>

// 定义路由处理器的接口
interface RouteHandlers {
  list: () => Note[]
  get: (id: number) => Note | null
  create: (input: NoteInput) => Note
  update: (id: number, input: Partial<NoteInput>) => Note | null
  delete: (id: number) => boolean
}

// 用 Map 模拟 HTTP 方法和路径的对应关系
const routes = [
  { method: "GET",    path: "/api/notes",      handler: "list" },
  { method: "GET",    path: "/api/notes/:id",  handler: "get" },
  { method: "POST",   path: "/api/notes",      handler: "create" },
  { method: "PUT",    path: "/api/notes/:id",  handler: "update" },
  { method: "DELETE", path: "/api/notes/:id",  handler: "delete" },
]

console.log("REST API 路由表：")
routes.forEach(r => console.log(\`  \${r.method.padEnd(8)} \${r.path.padEnd(22)} → \${r.handler}\`))
console.log(\`\\n共 \${routes.length} 个端点\`)`,
        expectedOutput: `REST API 路由表：
  GET      /api/notes             → list
  GET      /api/notes/:id         → get
  POST     /api/notes             → create
  PUT      /api/notes/:id         → update
  DELETE   /api/notes/:id         → delete

共 5 个端点`,
        hint: 'RESTful 设计的关键：用 HTTP 方法表达操作（GET读/POST增/PUT改/DELETE删），用 URL 表达资源',
      },
      {
        id: 'p3.2',
        kind: 'demo',
        chapterId: 'p3',
        title: '数据库 + CRUD',
        content: `## 用 better-sqlite3 实现 CRUD

---

### 数据库初始化

\`\`\`typescript
import Database from 'better-sqlite3'

const db = new Database('notes.db')

export function initDb() {
  db.exec(\`
    CREATE TABLE IF NOT EXISTS notes (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      title      TEXT    NOT NULL,
      content    TEXT    NOT NULL DEFAULT '',
      created_at TEXT    NOT NULL DEFAULT (datetime('now'))
    )
  \`)
}
\`\`\`

---

### CRUD 实现

\`\`\`typescript
// Create
const insert = db.prepare('INSERT INTO notes (title, content) VALUES (?, ?)')
function createNote(input: NoteInput): Note {
  const result = insert.run(input.title, input.content)
  return getNote(result.lastInsertRowid as number)!
}

// Read All
const selectAll = db.prepare('SELECT * FROM notes ORDER BY created_at DESC')
function listNotes(): Note[] { return selectAll.all() as Note[] }

// Read One
const selectOne = db.prepare('SELECT * FROM notes WHERE id = ?')
function getNote(id: number): Note | null {
  return (selectOne.get(id) as Note) ?? null
}

// Update
const update = db.prepare('UPDATE notes SET title = ?, content = ? WHERE id = ?')
function updateNote(id: number, input: Partial<NoteInput>): Note | null {
  const existing = getNote(id)
  if (!existing) return null
  update.run(input.title ?? existing.title, input.content ?? existing.content, id)
  return getNote(id)
}

// Delete
const del = db.prepare('DELETE FROM notes WHERE id = ?')
function deleteNote(id: number): boolean {
  return del.run(id).changes > 0
}
\`\`\``,
        starterCode: `// 模拟 SQLite CRUD 操作
interface Note { id: number; title: string; content: string; createdAt: string }

class NoteDB {
  private notes: Note[] = []
  private nextId = 1

  create(title: string, content: string): Note {
    const note: Note = { id: this.nextId++, title, content, createdAt: "2026-06-26" }
    this.notes.push(note)
    return note
  }

  list(): Note[] { return [...this.notes].reverse() }

  get(id: number): Note | null { return this.notes.find(n => n.id === id) ?? null }

  update(id: number, data: Partial<Pick<Note, 'title' | 'content'>>): Note | null {
    const note = this.notes.find(n => n.id === id)
    if (!note) return null
    if (data.title) note.title = data.title
    if (data.content) note.content = data.content
    return note
  }

  delete(id: number): boolean {
    const idx = this.notes.findIndex(n => n.id === id)
    if (idx === -1) return false
    this.notes.splice(idx, 1)
    return true
  }
}

const db = new NoteDB()
db.create("会议记录", "讨论了项目进度")
db.create("学习笔记", "TypeScript 泛型")
db.create("购物清单", "牛奶、面包")

console.log(\`共 \${db.list().length} 条笔记\`)
const note = db.get(2)
console.log(\`id=2：\${note?.title}\`)

db.update(2, { title: "TypeScript 泛型深入" })
console.log(\`更新后：\${db.get(2)?.title}\`)

db.delete(3)
console.log(\`删除后剩余：\${db.list().length} 条\`)`,
        expectedOutput: `共 3 条笔记
id=2：学习笔记
更新后：TypeScript 泛型深入
删除后剩余：2 条`,
        hint: '`better-sqlite3` 是同步 API，比异步的 sqlite3 简单很多——适合中小项目和教学场景',
      },
      {
        id: 'p3.3',
        kind: 'demo',
        chapterId: 'p3',
        title: '中间件 + 错误处理 + 测试',
        content: `## 中间件、错误处理和 API 测试

---

### 认证中间件

\`\`\`typescript
function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization

  if (!token || token !== \`Bearer \${process.env.API_TOKEN}\`) {
    return res.status(401).json({ error: '未授权' })
  }

  next()  // 通过验证，继续
}

// 应用到需要保护的路由
app.use('/api/notes', authMiddleware, notesRouter)
\`\`\`

---

### 统一错误处理

\`\`\`typescript
function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error('服务器错误：', err.message)
  res.status(500).json({
    error: '服务器内部错误',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  })
}

app.use(errorHandler)  // 注册到最后
\`\`\`

---

### 用 supertest 测试 API

\`\`\`typescript
import request from 'supertest'
import app from '../src/index'

describe('Notes API', () => {
  it('GET /api/notes 返回空数组', async () => {
    const res = await request(app).get('/api/notes')
    expect(res.status).toBe(200)
    expect(res.body).toEqual([])
  })

  it('POST /api/notes 创建笔记', async () => {
    const res = await request(app)
      .post('/api/notes')
      .send({ title: '测试', content: '内容' })
    expect(res.status).toBe(201)
    expect(res.body.title).toBe('测试')
  })
})
\`\`\``,
        starterCode: `// 模拟中间件链和错误处理
type NextFn = () => void
type Handler = (req: any, res: any, next: NextFn) => void

class App {
  private middlewares: Handler[] = []
  private errorHandler: Handler | null = null

  use(handler: Handler) { this.middlewares.push(handler) }
  useError(handler: Handler) { this.errorHandler = handler }

  handle(req: any): any {
    let index = 0
    const res: any = { statusCode: 200, body: null }
    const next = () => {
      if (index < this.middlewares.length) {
        this.middlewares[index++](req, res, next)
      }
    }

    try {
      next()
    } catch (e) {
      if (this.errorHandler) this.errorHandler(e, req, res, () => {})
    }
    return res
  }
}

const app = new App()

// 日志中间件
app.use((req, res, next) => {
  console.log(\`[\${req.method}] \${req.path}\`)
  next()
})

// 认证中间件
app.use((req, res, next) => {
  if (!req.headers?.authorization) {
    res.statusCode = 401
    res.body = { error: "未授权" }
    return
  }
  next()
})

// 业务处理器
app.use((req, res, next) => {
  res.body = { data: [{ id: 1, title: "你好" }] }
  next()
})

// 测试
const r1 = app.handle({ method: "GET", path: "/api/notes", headers: {} })
console.log(\`无 token → \${r1.statusCode}\`, r1.body)

const r2 = app.handle({ method: "GET", path: "/api/notes", headers: { authorization: "Bearer xyz" } })
console.log(\`有 token → \${r2.statusCode}\`, r2.body)`,
        expectedOutput: `[GET] /api/notes
无 token → 401 { error: '未授权' }
[GET] /api/notes
有 token → 200 { data: [ { id: 1, title: '你好' } ] }`,
        hint: '中间件的 next() 是关键——调用它才会继续往下走，不调用就"拦截"请求',
      },
    ],
  },
];
