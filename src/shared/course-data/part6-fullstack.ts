// 🏔️ 第六部分：全栈实战 — Ch21 ~ Ch22 + P6（12 节）
// 个人博客项目 + 在线笔记全栈应用

import type { Chapter, SectionValidation } from '../types/course';

const notebookTokenValidation: SectionValidation = {
  mode: 'regex_pattern',
  outputRules: [
    { type: 'regex', value: '^注册成功：小明，token=jwt_1_\\d+\\.\\.\\.$' },
    { type: 'exact', value: 'Token 验证：userId=1' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '笔记列表（2 条）：' },
    { type: 'exact', value: '  [1] 学习 Prisma' },
    { type: 'exact', value: '  [2] Docker 部署' },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch21 — 项目搭建（3 节）
// ─────────────────────────────────────────────────────────────
const ch21: Chapter = {
  id: 'ch21',
  title: '项目搭建',
  description: '个人博客：需求分析、项目初始化、数据库设计',
  sections: [
    {
      id: '21.1',
      kind: 'demo',
      chapterId: 'ch21',
      title: '项目规划 — 我们要做什么',
      content: `## 全栈实战：个人博客

恭喜你！从第 1 章到现在，你已经掌握了全栈开发的所有基础技能。

现在，把它们全部用上，做一个**完整的个人博客**。

---

### 功能需求

\`\`\`
文章管理：
  ✅ 查看文章列表
  ✅ 阅读单篇文章
  ✅ 创建新文章（Markdown 编辑器）
  ✅ 编辑文章
  ✅ 删除文章

用户体验：
  ✅ 按分类筛选
  ✅ 搜索文章
  ✅ 响应式布局（手机/桌面都能用）
\`\`\`

---

### 技术选型

\`\`\`
前端：React + TypeScript
后端：Node.js + Express
数据库：SQLite（better-sqlite3）
样式：CSS（手写）
\`\`\`

---

### 项目结构

\`\`\`
blog/
├── server/        ← 后端代码
│   ├── index.ts
│   └── routes/
├── client/        ← 前端代码
│   ├── App.tsx
│   └── components/
├── shared/        ← 前后端共享的类型
└── package.json
\`\`\``,
      starterCode: `// 定义项目的核心数据类型（shared/types.ts）

interface Article {
  id: number
  title: string
  content: string
  summary: string    // 文章摘要（前 100 字）
  category: string
  views: number
  createdAt: string  // ISO 日期字符串
}

interface ArticleInput {
  title: string
  content: string
  category: string
}

// 生成摘要
function generateSummary(content: string, maxLen = 100): string {
  return content.length <= maxLen ? content : content.slice(0, maxLen) + "..."
}

// 模拟创建文章
const input: ArticleInput = {
  title: "我的第一篇博客",
  content: "欢迎来到我的博客！这里记录我学习 TypeScript 和全栈开发的点点滴滴。从最基础的变量，到完整的全栈项目，每一步都很有意义。",
  category: "学习笔记",
}

const article: Article = {
  id: 1,
  ...input,
  summary: generateSummary(input.content),
  views: 0,
  createdAt: "2026-06-26",
}

console.log(\`标题：\${article.title}\`)
console.log(\`分类：\${article.category}\`)
console.log(\`摘要：\${article.summary}\`)
console.log(\`字数：\${article.content.length} 字\`)`,
      expectedOutput: `标题：我的第一篇博客
分类：学习笔记
摘要：欢迎来到我的博客！这里记录我学习 TypeScript 和全栈开发的点点滴滴。从最基础的变量，到完整的全栈项目，每一步都很有意义。
字数：65 字`,
      hint: '在动手写代码前，先想清楚数据类型——类型定义是整个项目的"合同"',
    },
    {
      id: '21.2',
      kind: 'demo',
      chapterId: 'ch21',
      title: '初始化项目结构与配置',
      content: `## 搭建项目脚手架

---

### 初始化步骤

\`\`\`bash
mkdir my-blog && cd my-blog
npm init -y

# 安装依赖
npm install express better-sqlite3
npm install -D typescript ts-node @types/express @types/node

# 前端
npm install react react-dom
npm install -D vite @vitejs/plugin-react @types/react
\`\`\`

---

### tsconfig.json

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"]
}
\`\`\`

---

### package.json scripts

\`\`\`json
{
  "scripts": {
    "dev:server": "ts-node src/server/index.ts",
    "dev:client": "vite",
    "build": "tsc && vite build"
  }
}
\`\`\`

---

良好的项目结构让协作和维护更轻松。`,
      starterCode: `// 模拟项目配置验证
interface ProjectConfig {
  name: string
  version: string
  scripts: Record<string, string>
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}

function validateConfig(config: ProjectConfig): void {
  const required = ["dev:server", "dev:client", "build"]
  const missing = required.filter(s => !config.scripts[s])

  console.log(\`项目：\${config.name} v\${config.version}\`)
  console.log("\\n生产依赖：")
  Object.entries(config.dependencies).forEach(([pkg, ver]) =>
    console.log(\`  ✅ \${pkg}@\${ver}\`)
  )
  if (missing.length > 0) {
    console.log("\\n缺少脚本：" + missing.join(", "))
  } else {
    console.log("\\n所有脚本：✅ 完整")
  }
}

validateConfig({
  name: "my-blog",
  version: "1.0.0",
  scripts: {
    "dev:server": "ts-node src/server/index.ts",
    "dev:client": "vite",
    "build": "tsc && vite build",
  },
  dependencies: {
    "express": "^4.18.0",
    "better-sqlite3": "^9.0.0",
  },
  devDependencies: {
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
  },
})`,
      expectedOutput: `项目：my-blog v1.0.0

生产依赖：
  ✅ express@^4.18.0
  ✅ better-sqlite3@^9.0.0

所有脚本：✅ 完整`,
      hint: '项目配置看似无聊，但良好的配置能减少很多麻烦——特别是团队协作时',
    },
    {
      id: '21.3',
      kind: 'demo',
      chapterId: 'ch21',
      title: '数据库设计 — 文章和分类',
      content: `## 数据库设计

博客需要什么表？

---

### 表设计

\`\`\`sql
CREATE TABLE articles (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  title      TEXT    NOT NULL,
  content    TEXT    NOT NULL,
  category   TEXT    NOT NULL DEFAULT '未分类',
  views      INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE categories (
  id   INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);
\`\`\`

---

### 索引优化

\`\`\`sql
-- 按分类查询时用到
CREATE INDEX idx_articles_category ON articles(category);

-- 按时间排序时用到
CREATE INDEX idx_articles_created ON articles(created_at DESC);
\`\`\`

---

### 关系

\`\`\`
articles.category → categories.name（软外键）
\`\`\`

---

**数据库设计原则**：先考虑清楚，后期改表结构比较麻烦。`,
      starterCode: `// 模拟博客数据库的初始化和基本操作

interface Article {
  id: number; title: string; category: string
  views: number; createdAt: string
}

class BlogDB {
  private articles: Article[] = []
  private nextId = 1

  seed() {
    const data = [
      { title: "TypeScript 入门", category: "技术" },
      { title: "我的 2026 年度总结", category: "随笔" },
      { title: "React Hooks 深入", category: "技术" },
      { title: "关于坚持写作", category: "随笔" },
    ]
    data.forEach(d => {
      this.articles.push({
        id: this.nextId++, ...d,
        views: Math.floor(Math.random() * 1000 + 100),
        createdAt: "2026-06-26",
      })
    })
  }

  getByCategory(cat: string) {
    return this.articles.filter(a => a.category === cat)
  }

  getStats() {
    const cats = [...new Set(this.articles.map(a => a.category))]
    return cats.map(cat => ({
      category: cat,
      count: this.articles.filter(a => a.category === cat).length,
    }))
  }
}

const db = new BlogDB()
db.seed()

console.log("数据库统计：")
db.getStats().forEach(s => console.log(\`  \${s.category}：\${s.count} 篇\`))

console.log("\\n技术类文章：")
db.getByCategory("技术").forEach(a => console.log(\`  \${a.id}. \${a.title}\`))`,
      expectedOutput: `数据库统计：
  技术：2 篇
  随笔：2 篇

技术类文章：
  1. TypeScript 入门
  3. React Hooks 深入`,
      hint: 'new Set() 可以快速去重——把数组转成 Set 再转回数组，就得到去重后的数组',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch22 — 全栈实现（5 节）
// ─────────────────────────────────────────────────────────────
const ch22: Chapter = {
  id: 'ch22',
  title: '全栈实现',
  description: '后端 API + 前端页面 + 联调 + 完善，完成个人博客项目',
  sections: [
    {
      id: '22.1',
      kind: 'demo',
      chapterId: 'ch22',
      title: '后端 API — 文章的增删改查',
      content: `## 实现文章 CRUD API

把之前学过的所有后端知识整合起来，实现完整的文章管理 API。

---

### 路由结构

\`\`\`typescript
// server/routes/articles.ts
import { Router } from 'express'
const router = Router()

router.get('/',      listArticles)    // GET  /api/articles
router.get('/:id',   getArticle)      // GET  /api/articles/:id
router.post('/',     createArticle)   // POST /api/articles
router.put('/:id',   updateArticle)   // PUT  /api/articles/:id
router.delete('/:id', deleteArticle) // DELETE /api/articles/:id

export default router

// server/index.ts
app.use('/api/articles', router)
\`\`\`

---

### 完整的路由处理器

\`\`\`typescript
function listArticles(req: Request, res: Response) {
  const { category, q, page = '1' } = req.query
  const stmt = db.prepare(\`
    SELECT * FROM articles
    WHERE (? IS NULL OR category = ?)
    AND   (? IS NULL OR title LIKE ?)
    ORDER BY created_at DESC
    LIMIT 10 OFFSET ?
  \`)
  const articles = stmt.all(category, category, q, q ? \`%\${q}%\` : null, (Number(page)-1)*10)
  res.json({ data: articles, page: Number(page) })
}
\`\`\``,
      starterCode: `// 实现一个完整的文章 CRUD 模块
interface Article { id: number; title: string; content: string; category: string; views: number }
type ArticleInput = Omit<Article, 'id' | 'views'>

class ArticleService {
  private articles: Article[] = []
  private nextId = 1

  list(category?: string): Article[] {
    return category ? this.articles.filter(a => a.category === category) : this.articles
  }

  get(id: number): Article | null {
    return this.articles.find(a => a.id === id) ?? null
  }

  create(input: ArticleInput): Article {
    const article = { id: this.nextId++, views: 0, ...input }
    this.articles.push(article)
    return article
  }

  update(id: number, input: Partial<ArticleInput>): Article | null {
    const article = this.articles.find(a => a.id === id)
    if (!article) return null
    Object.assign(article, input)
    return article
  }

  delete(id: number): boolean {
    const idx = this.articles.findIndex(a => a.id === id)
    if (idx === -1) return false
    this.articles.splice(idx, 1)
    return true
  }
}

const svc = new ArticleService()
svc.create({ title: "TypeScript 入门", content: "...", category: "技术" })
svc.create({ title: "React 实战", content: "...", category: "技术" })
svc.create({ title: "我的日记", content: "...", category: "随笔" })

console.log(\`总文章：\${svc.list().length} 篇\`)
console.log(\`技术类：\${svc.list("技术").length} 篇\`)

svc.update(1, { title: "TypeScript 完全入门" })
console.log(\`更新后：\${svc.get(1)?.title}\`)

svc.delete(3)
console.log(\`删除后总数：\${svc.list().length} 篇\`)`,
      expectedOutput: `总文章：3 篇
技术类：2 篇
更新后：TypeScript 完全入门
删除后总数：2 篇`,
      hint: 'Object.assign(target, source) 把 source 的属性合并到 target——实现部分更新',
    },
    {
      id: '22.2',
      kind: 'demo',
      chapterId: 'ch22',
      title: '前端页面 — 文章列表',
      content: `## 文章列表页：展示 + 筛选 + 分页

---

### 组件结构

\`\`\`
ArticleListPage
├── SearchBar（搜索框）
├── CategoryFilter（分类筛选）
├── ArticleCard × N（文章卡片）
└── Pagination（分页）
\`\`\`

---

### 完整代码

\`\`\`tsx
export function ArticleListPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [category, setCategory] = useState<string>('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (search) params.set('q', search)

    fetch(\`/api/articles?\${params}\`)
      .then(r => r.json())
      .then(data => {
        setArticles(data.data)
        setLoading(false)
      })
  }, [category, search])

  return (
    <main>
      <SearchBar value={search} onChange={setSearch} />
      <CategoryFilter value={category} onChange={setCategory} />
      {loading ? <Spinner /> : articles.map(a => <ArticleCard key={a.id} article={a} />)}
    </main>
  )
}
\`\`\``,
      starterCode: `// 实现文章列表的过滤逻辑（前端侧）
interface Article {
  id: number; title: string; category: string; views: number; createdAt: string
}

function filterAndSort(
  articles: Article[],
  category: string,
  search: string,
  sortBy: "newest" | "popular"
): Article[] {
  let result = articles

  if (category) result = result.filter(a => a.category === category)
  if (search) result = result.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase())
  )

  result = [...result].sort((a, b) =>
    sortBy === "popular" ? b.views - a.views : b.createdAt.localeCompare(a.createdAt)
  )

  return result
}

const articles: Article[] = [
  { id: 1, title: "TypeScript 入门指南", category: "技术", views: 1024, createdAt: "2026-01-01" },
  { id: 2, title: "React 进阶技巧", category: "技术", views: 856, createdAt: "2026-03-15" },
  { id: 3, title: "旅行日记", category: "生活", views: 2048, createdAt: "2026-06-01" },
  { id: 4, title: "TypeScript 泛型深入", category: "技术", views: 1536, createdAt: "2026-05-20" },
]

const result = filterAndSort(articles, "技术", "TypeScript", "popular")
console.log(\`筛选结果（\${result.length} 篇）：\`)
result.forEach(a => console.log(\`  \${a.title} (\${a.views} 次浏览)\`))`,
      expectedOutput: `筛选结果（2 篇）：
  TypeScript 泛型深入 (1536 次浏览)
  TypeScript 入门指南 (1024 次浏览)`,
      hint: '前端过滤 + 后端 API 过滤都要做：前端过滤本地已加载的数据，后端过滤数据库数据',
    },
    {
      id: '22.3',
      kind: 'demo',
      chapterId: 'ch22',
      title: '前端页面 — 写文章（Markdown）',
      content: `## 文章编辑器：Markdown 支持

---

### Markdown 编辑器组件

\`\`\`tsx
function ArticleEditor() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [preview, setPreview] = useState(false)

  const wordCount = content.length

  return (
    <div className="editor">
      <input
        placeholder="文章标题..."
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <div className="toolbar">
        <button onClick={() => setPreview(!preview)}>
          {preview ? '编辑' : '预览'}
        </button>
        <span>{wordCount} 字</span>
      </div>

      {preview ? (
        <div
          className="markdown-preview"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
        />
      ) : (
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="开始写作..."
        />
      )}
    </div>
  )
}
\`\`\``,
      starterCode: `// 实现一个简单的 Markdown 解析器
function parseMarkdown(md: string): string {
  return md
    .split("\\n")
    .map(line => {
      if (line.startsWith("# "))   return \`<h1>\${line.slice(2)}</h1>\`
      if (line.startsWith("## "))  return \`<h2>\${line.slice(3)}</h2>\`
      if (line.startsWith("### ")) return \`<h3>\${line.slice(4)}</h3>\`
      if (line.startsWith("- "))   return \`<li>\${line.slice(2)}</li>\`
      if (line === "")             return "<br>"
      return \`<p>\${line
        .replace(/\\*\\*(.+?)\\*\\*/g, "<strong>$1</strong>")
        .replace(/\\*(.+?)\\*/g, "<em>$1</em>")
        .replace(/\\\`(.+?)\\\`/g, "<code>$1</code>")
      }</p>\`
    })
    .join("\\n")
}

const article = \`# 我的博客

这是一段**重要**的文字，还有一些*斜体*和\\\`代码\\\`。

## 我学到的东西

- TypeScript 类型系统
- React 组件化开发
- Node.js 后端开发\`

const html = parseMarkdown(article)
const lines = html.split("\\n").filter(l => l !== "<br>").slice(0, 8)
lines.forEach(l => console.log(l))`,
      expectedOutput: `<h1>我的博客</h1>
<p>这是一段<strong>重要</strong>的文字，还有一些<em>斜体</em>和<code>代码</code>。</p>
<h2>我学到的东西</h2>
<li>TypeScript 类型系统</li>
<li>React 组件化开发</li>
<li>Node.js 后端开发</li>`,
      hint: '正则 /\\*\\*(.+?)\\*\\*/g 匹配 **内容** 并替换为 <strong>内容</strong>',
    },
    {
      id: '22.4',
      kind: 'demo',
      chapterId: 'ch22',
      title: '前后端联调 — 全部跑通',
      content: `## 联调：让前端和后端握手成功

联调（Integration Testing）是验证前后端能正确配合的过程。

---

### 联调清单

\`\`\`
□ 启动后端 → 确认 API 可以访问
□ 启动前端 → 确认页面正常显示

□ 文章列表：GET /api/articles 返回数据
□ 文章详情：GET /api/articles/:id 返回单篇
□ 创建文章：POST /api/articles 写入并返回
□ 更新文章：PUT /api/articles/:id 修改成功
□ 删除文章：DELETE /api/articles/:id 删除成功

□ 错误情况：
  - 请求不存在的文章 → 404
  - 提交空标题 → 400 错误提示
  - 网络断开 → 友好提示
\`\`\`

---

### 常见联调问题

| 问题 | 原因 | 解决 |
|------|------|------|
| CORS 跨域错误 | 前后端不同端口 | 后端加 cors 中间件 |
| 接收到 undefined | JSON 字段名不匹配 | 对齐前后端字段名 |
| 页面不更新 | 状态没有触发重渲染 | 用 setter 函数更新 state |`,
      starterCode: `// 模拟前后端联调：测试完整的数据流
interface Article { id: number; title: string; content: string }

// 模拟后端 API
const db: Article[] = [
  { id: 1, title: "TypeScript 入门", content: "..." },
]
let nextId = 2

const api = {
  list: async () => ({ data: db }),
  get: async (id: number) => db.find(a => a.id === id) ?? null,
  create: async (input: Omit<Article, "id">) => {
    const a = { id: nextId++, ...input }
    db.push(a); return a
  },
  delete: async (id: number) => {
    const idx = db.findIndex(a => a.id === id)
    if (idx === -1) return false
    db.splice(idx, 1); return true
  },
}

// 模拟前端操作
async function runIntegrationTest() {
  const list1 = await api.list()
  console.log(\`初始文章数：\${list1.data.length}\`)

  const newArticle = await api.create({ title: "React 实战", content: "..." })
  console.log(\`创建成功：[\${newArticle.id}] \${newArticle.title}\`)

  const list2 = await api.list()
  console.log(\`添加后文章数：\${list2.data.length}\`)

  const deleted = await api.delete(1)
  console.log(\`删除 id=1：\${deleted ? "成功" : "失败"}\`)

  const list3 = await api.list()
  console.log(\`删除后文章数：\${list3.data.length}\`)
  list3.data.forEach(a => console.log(\`  [\${a.id}] \${a.title}\`))
}

runIntegrationTest()`,
      expectedOutput: `初始文章数：1
创建成功：[2] React 实战
添加后文章数：2
删除 id=1：成功
删除后文章数：1
  [2] React 实战`,
      hint: '联调测试要覆盖完整的操作流程：增 → 查 → 改 → 删，不能只测单个接口',
    },
    {
      id: '22.5',
      kind: 'demo',
      chapterId: 'ch22',
      title: '课程数据模块',
      content: `## 课程数据模块：用类型定义结构化内容

恭喜你走到了**第 96 节**——整个初级路线的终点站！🎉🐌

你已经用 TypeScript 构建了一个完整的全栈博客。现在来学最后一块：**课程数据模块**。

---

### 什么是数据模块？

一个纯 TypeScript 文件，职责是：

1. 用 \`interface\` 定义数据的"形状"
2. 用 \`const\` 按接口声明静态数据
3. 用 \`export\` 把数据暴露给其他模块

---

### 为什么比 JSON 好？

| 方式 | 类型检查 | IDE 补全 | 动态计算 |
|------|----------|----------|----------|
| \`.json\` 文件 | ❌ | 弱 | ❌ |
| \`.ts\` 数据模块 | ✅ 编译期 | ✅ 强 | ✅ |

---

### 完整示例

\`\`\`typescript
// courseData.ts
interface Section {
  id: string
  title: string
  expectedOutput: string
}

interface Chapter {
  id: string
  title: string
  sections: Section[]
}

export const chapters: Chapter[] = [
  {
    id: 'ch1',
    title: 'Ch1 — 你好，编程世界',
    sections: [
      { id: '1.1', title: '什么是编程？', expectedOutput: '第 1 步：打开微波炉' },
    ],
  },
]

// 其他文件使用：
// import { chapters } from './courseData'
// const total = chapters.reduce((s, c) => s + c.sections.length, 0)
\`\`\`

**目标**：定义一个简化的课程数据结构，打印章节目录。`,
      starterCode: `interface Section {
  id: string
  title: string
}

interface Chapter {
  id: string
  title: string
  sections: Section[]
}

const chapters: Chapter[] = [
  {
    id: 'ch1',
    title: 'Ch1 — 你好，编程世界',
    sections: [
      { id: '1.1', title: '什么是编程？' },
      { id: '1.2', title: '认识 TypeScript' },
      { id: '1.3', title: 'Hello, World!' },
    ],
  },
  {
    id: 'ch22',
    title: 'Ch22 — 全栈实现',
    sections: [
      { id: '22.1', title: '后端 API — 增删改查' },
      { id: '22.5', title: '课程数据模块' },
    ],
  },
]

chapters.forEach(ch => {
  console.log(\`\${ch.title}（\${ch.sections.length} 节）\`)
  ch.sections.forEach(s => console.log(\`  \${s.id} \${s.title}\`))
})`,
      expectedOutput: `Ch1 — 你好，编程世界（3 节）
  1.1 什么是编程？
  1.2 认识 TypeScript
  1.3 Hello, World!
Ch22 — 全栈实现（2 节）
  22.1 后端 API — 增删改查
  22.5 课程数据模块`,
      hint: '你刚刚学到的这个"课程数据模块"，正是蜗牛编程 App 自己用来管理课程内容的方式——这就是元编程的乐趣 🐌',
    },
  ],
};
export const part6Chapters: Chapter[] = [ch21, ch22,
  // ─── 实战项目 P6 ───
  {
    id: 'p6',
    title: '实战：在线笔记全栈应用',
    description: '从零构建完整的在线笔记应用：PostgreSQL + Express + React + Tailwind + Docker 部署',
    sections: [
      {
        id: 'p6.1',
        kind: 'demo',
        chapterId: 'p6',
        title: '架构设计 + 数据库',
        content: `## 全栈在线笔记：从设计开始

这是终极项目——把前面学到的**所有知识**整合成一个完整的全栈应用。

---

### 功能需求

\`\`\`
✅ 用户注册/登录（JWT 认证）
✅ 创建/编辑/删除笔记
✅ Markdown 编辑器
✅ 笔记分类和标签
✅ 搜索笔记
✅ 响应式设计
\`\`\`

---

### 技术栈

\`\`\`
前端：React + TypeScript + Tailwind CSS
后端：Express + Prisma ORM
数据库：PostgreSQL
认证：JWT + bcrypt
部署：Docker + Nginx
\`\`\`

---

### 数据库 Schema（Prisma）

\`\`\`prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String
  notes     Note[]
}

model Note {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  tags      Tag[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Tag {
  id    Int    @id @default(autoincrement())
  name  String @unique
  notes Note[]
}
\`\`\`

---

### 项目结构（Monorepo）

\`\`\`
notes-app/
├── server/          ← Express + Prisma
├── client/          ← React + Tailwind
├── docker-compose.yml
└── README.md
\`\`\``,
        starterCode: `// 定义在线笔记的完整数据模型和 API 设计
interface User { id: number; email: string; name: string }
interface Note { id: number; title: string; content: string; userId: number; tags: string[]; createdAt: string }
interface NoteInput { title: string; content: string; tags?: string[] }

// API 端点设计
const apiEndpoints = [
  { method: "POST",   path: "/api/auth/register", desc: "注册" },
  { method: "POST",   path: "/api/auth/login",    desc: "登录 → 返回 JWT" },
  { method: "GET",    path: "/api/notes",         desc: "获取我的笔记" },
  { method: "POST",   path: "/api/notes",         desc: "创建笔记" },
  { method: "PUT",    path: "/api/notes/:id",     desc: "更新笔记" },
  { method: "DELETE", path: "/api/notes/:id",     desc: "删除笔记" },
  { method: "GET",    path: "/api/notes/search?q=", desc: "搜索笔记" },
]

console.log("在线笔记 API 设计：")
apiEndpoints.forEach(e =>
  console.log(\`  \${e.method.padEnd(8)} \${e.path.padEnd(28)} \${e.desc}\`)
)

// 数据库关系
const relations = [
  "User 1 ──── N Note",
  "Note N ──── N Tag",
]
console.log("\\n数据关系：")
relations.forEach(r => console.log("  " + r))`,
        expectedOutput: `在线笔记 API 设计：
  POST     /api/auth/register           注册
  POST     /api/auth/login              登录 → 返回 JWT
  GET      /api/notes                   获取我的笔记
  POST     /api/notes                   创建笔记
  PUT      /api/notes/:id               更新笔记
  DELETE   /api/notes/:id               删除笔记
  GET      /api/notes/search?q=         搜索笔记

数据关系：
  User 1 ──── N Note
  Note N ──── N Tag`,
        hint: '先设计数据模型和 API，再写代码——这是全栈开发的黄金法则："数据先行"',
      },
      {
        id: 'p6.2',
        kind: 'demo',
        chapterId: 'p6',
        title: '后端 API — Express + Prisma + JWT',
        content: `## 实现后端核心功能

---

### Prisma 集成

\`\`\`typescript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// 获取用户的所有笔记
async function getUserNotes(userId: number) {
  return prisma.note.findMany({
    where: { userId },
    include: { tags: true },
    orderBy: { updatedAt: 'desc' },
  })
}
\`\`\`

---

### JWT 认证流程

\`\`\`typescript
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// 注册
async function register(email: string, password: string, name: string) {
  const hashed = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { email, password: hashed, name }
  })
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!)
  return { user, token }
}

// 认证中间件
function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: '请先登录' })

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number }
    req.userId = payload.userId
    next()
  } catch {
    res.status(401).json({ error: 'Token 无效或已过期' })
  }
}
\`\`\``,
        starterCode: `// 模拟 JWT 认证和 Prisma 查询
class AuthService {
  private users: { id: number; email: string; passwordHash: string; name: string }[] = []
  private nextId = 1

  // 模拟 bcrypt.hash
  private hash(pw: string) { return "hashed_" + pw }

  register(email: string, password: string, name: string) {
    const user = { id: this.nextId++, email, passwordHash: this.hash(password), name }
    this.users.push(user)
    const token = \`jwt_\${user.id}_\${Date.now()}\`
    return { user: { id: user.id, email: user.email, name: user.name }, token }
  }

  // 模拟 JWT verify
  verifyToken(token: string): number | null {
    const match = token.match(/^jwt_(\\d+)_/)
    return match ? parseInt(match[1]) : null
  }
}

class NoteService {
  private notes: { id: number; title: string; content: string; userId: number }[] = []
  private nextId = 1

  create(userId: number, title: string, content: string) {
    const note = { id: this.nextId++, title, content, userId }
    this.notes.push(note)
    return note
  }

  listByUser(userId: number) { return this.notes.filter(n => n.userId === userId) }
}

const auth = new AuthService()
const notes = new NoteService()

// 注册用户
const { user, token } = auth.register("test@example.com", "123456", "小明")
console.log(\`注册成功：\${user.name}，token=\${token.slice(0, 15)}...\`)

// 验证 token
const userId = auth.verifyToken(token)
console.log(\`Token 验证：userId=\${userId}\`)

// 创建笔记
if (userId) {
  notes.create(userId, "学习 Prisma", "Prisma 是 Node.js 的 ORM...")
  notes.create(userId, "Docker 部署", "用 Docker 打包应用...")
  console.log(\`\\n笔记列表（\${notes.listByUser(userId).length} 条）：\`)
  notes.listByUser(userId).forEach(n => console.log(\`  [\${n.id}] \${n.title}\`))
}`,
        expectedOutput: `注册成功：小明，token=jwt_1_176...
Token 验证：userId=1

笔记列表（2 条）：
  [1] 学习 Prisma
  [2] Docker 部署`,
        hint: 'JWT 是无状态的——服务器不需要存 session，token 本身包含了用户信息（签名保证不被篡改）',
        validation: notebookTokenValidation,
      },
      {
        id: 'p6.3',
        kind: 'demo',
        chapterId: 'p6',
        title: '前端 — React + Tailwind + API 集成',
        content: `## 前端实现

---

### Tailwind CSS 快速样式

\`\`\`tsx
// 无需写 CSS 文件，用类名直接写样式
function NoteCard({ note }: { note: Note }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
      <p className="text-gray-600 mt-2 line-clamp-3">{note.content}</p>
      <div className="flex gap-2 mt-3">
        {note.tags.map(tag => (
          <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
\`\`\`

---

### API 集成

\`\`\`tsx
function useNotes() {
  const [notes, setNotes] = useState<Note[]>([])
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetch('/api/notes', {
      headers: { Authorization: \`Bearer \${token}\` }
    })
      .then(r => r.json())
      .then(setNotes)
  }, [token])

  return { notes }
}
\`\`\`

---

### 页面组件

\`\`\`tsx
function NotesPage() {
  const { notes } = useNotes()
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">我的笔记</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map(note => <NoteCard key={note.id} note={note} />)}
      </div>
    </main>
  )
}
\`\`\``,
        starterCode: `// 模拟 React + Tailwind 的笔记卡片渲染
interface Note { id: number; title: string; content: string; tags: string[] }

function renderNoteCard(note: Note): string {
  const tags = note.tags.map(t => \`[#\${t}]\`).join(" ")
  return [
    \`┌──────────────────────────────┐\`,
    \`│ \${note.title.padEnd(27)}│\`,
    \`│ \${note.content.slice(0, 26).padEnd(27)}│\`,
    \`│ \${tags.padEnd(27)}│\`,
    \`└──────────────────────────────┘\`,
  ].join("\\n")
}

function renderNoteGrid(notes: Note[], columns: number): string {
  const rows: string[][] = []
  for (let i = 0; i < notes.length; i += columns) {
    rows.push(notes.slice(i, i + columns).map(n => renderNoteCard(n).split("\\n")[0]).map(l => l.slice(0, 18)))
  }
  return rows.map(r => r.join("  ")).join("\\n")
}

const notes: Note[] = [
  { id: 1, title: "Prisma 入门", content: "Prisma 是现代化的 Node.js ORM", tags: ["backend", "prisma"] },
  { id: 2, title: "Tailwind 技巧", content: "用 utility class 快速开发", tags: ["frontend", "css"] },
  { id: 3, title: "Docker 部署", content: "容器化你的全栈应用", tags: ["devops", "docker"] },
]

console.log("我的笔记：")
notes.forEach(n => console.log(renderNoteCard(n)))
console.log(\`\\n共 \${notes.length} 条笔记\`)`,
        expectedOutput: `我的笔记：
┌──────────────────────────────┐
│ Prisma 入门                  │
│ Prisma 是现代化的 Node.js ORM   │
│ [#backend] [#prisma]       │
└──────────────────────────────┘
┌──────────────────────────────┐
│ Tailwind 技巧                │
│ 用 utility class 快速开发       │
│ [#frontend] [#css]         │
└──────────────────────────────┘
┌──────────────────────────────┐
│ Docker 部署                  │
│ 容器化你的全栈应用                  │
│ [#devops] [#docker]        │
└──────────────────────────────┘

共 3 条笔记`,
        hint: 'Tailwind 的 utility-first 理念：不用给元素起名字，直接用组合好的工具类描述样式',
      },
      {
        id: 'p6.4',
        kind: 'exercise',
        chapterId: 'p6',
        title: '部署 — Docker + 环境变量',
        content: `## 用 Docker 部署全栈应用

---

### Dockerfile（后端）

\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/server/index.js"]
\`\`\`

---

### docker-compose.yml

\`\`\`yaml
version: '3.8'
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: notes
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data

  server:
    build: ./server
    environment:
      DATABASE_URL: postgresql://postgres:secret@db:5432/notes
      JWT_SECRET: \${JWT_SECRET}
    ports:
      - "3000:3000"
    depends_on:
      - db

  client:
    build: ./client
    ports:
      - "80:80"

volumes:
  pgdata:
\`\`\`

---

### CI/CD 流程

\`\`\`
Git Push → GitHub Actions
  → 运行测试（Jest + supertest）
  → 构建 Docker 镜像
  → 推送到 Docker Hub
  → SSH 到服务器 pull & restart
\`\`\`

---

### 环境变量管理

\`\`\`bash
# .env（不提交到 Git！）
JWT_SECRET=my-super-secret-key
DATABASE_URL=postgresql://...

# .env.example（提交到 Git，作为模板）
JWT_SECRET=change-me
DATABASE_URL=postgresql://user:pass@localhost:5432/db
\`\`\``,
        starterCode: `// 模拟部署配置和环境变量校验
interface DeployConfig {
  databaseUrl: string
  jwtSecret: string
  port: number
  nodeEnv: "development" | "production"
}

function validateDeployConfig(config: DeployConfig): string[] {
  const errors: string[] = []

  if (!config.databaseUrl) errors.push("DATABASE_URL 未设置")
  if (!config.jwtSecret || config.jwtSecret === "change-me") errors.push("JWT_SECRET 需要更换默认值")
  if (config.jwtSecret && config.jwtSecret.length < 16) errors.push("JWT_SECRET 至少 16 个字符")
  if (config.nodeEnv === "production" && config.jwtSecret === "dev-secret") errors.push("生产环境不能用弱密钥")

  return errors
}

const devConfig: DeployConfig = {
  databaseUrl: "postgresql://localhost:5432/notes",
  jwtSecret: "dev-secret-12345",
  port: 3000,
  nodeEnv: "development",
}

const prodConfig: DeployConfig = {
  databaseUrl: "postgresql://prod-db:5432/notes",
  jwtSecret: "change-me",
  port: 3000,
  nodeEnv: "production",
}

console.log("开发环境配置检查：")
const devErrors = validateDeployConfig(devConfig)
console.log(devErrors.length === 0 ? "✅ 通过" : "❌ " + devErrors.join("；"))

console.log("\\n生产环境配置检查：")
const prodErrors = validateDeployConfig(prodConfig)
console.log(prodErrors.length === 0 ? "✅ 通过" : "❌ " + prodErrors.join("；"))`,
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
  [✅] DEBUG=False ✅
  [⚠️  需设置] SECRET_KEY 已设置 ✅

📋 部署命令汇总：
  $ pip install -r requirements.txt
  $ python manage.py collectstatic --noinput
  $ python manage.py migrate
  $ gunicorn company.wsgi:application -w 4 -b 0.0.0.0:8000

🎉 部署准备完成！你的管理系统可以上线了！`,
        hint: '.env 文件绝对不能提交到 Git——用 .gitignore 排除，提供 .env.example 作为模板',
      },
    ],
  },
];
