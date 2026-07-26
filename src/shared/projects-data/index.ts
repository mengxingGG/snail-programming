// 实战项目数据类型 + 12 个项目定义
// 每个项目是一个独立文件夹，包含多个文件、里程碑、提示
import type { CourseId } from '../course-catalog';

// ─── 类型 ──────────────────────────────────────────────

export type ProjectLevel = 'entry' | 'intermediate' | 'expert';

export interface ProjectFile {
  name: string;
  language: 'typescript' | 'python' | 'json' | 'html' | 'css' | 'markdown';
  content: string;
  readOnly?: boolean;
  description?: string; // 文件用途说明
}

export interface ProjectMilestone {
  id: string;
  label: string;
  description: string;
  hint?: string;
}

export interface ProjectDef {
  id: string;
  courseId: CourseId;
  title: string;
  subtitle: string;
  description: string;
  level: ProjectLevel;
  icon: string;
  tags: string[];
  files: ProjectFile[];
  milestones: ProjectMilestone[];
  /** 喂给 AI 的知识库上下文 */
  knowledgeBase: string;
  /** 初始要打开的文件名 */
  mainFile: string;
  /** 运行命令提示 */
  runCommand?: string;
}

// ─── TypeScript 项目 ─────────────────────────────────────

const p1TsTodo: ProjectDef = {
  id: 'p1-cli-todo',
  courseId: 'typescript',
  title: 'CLI 待办事项',
  subtitle: 'TypeScript 命令行工具',
  description: '用 TypeScript 做一个终端里的待办事项管理器，支持增删查改和文件持久化。学会接口设计、文件读写、命令行交互。',
  level: 'entry',
  icon: '✅',
  tags: ['CLI', '接口', '文件IO', 'JSON'],
  mainFile: 'src/todo.ts',
  files: [
    { name: 'README.md', language: 'markdown', readOnly: true,
      description: '项目说明',
      content: `# CLI 待办事项\n\n用 TypeScript 做一个终端待办事项管理器。\n\n## 功能要求\n- 添加待办事项（标题 + 优先级）\n- 列出所有待办事项\n- 标记为已完成\n- 删除待办事项\n- 保存到 JSON 文件，启动时自动加载\n\n## 学习目标\n- interface 定义数据结构\n- fs 模块读写文件\n- 数组的 CRUD 操作\n` },
    { name: 'src/todo.ts', language: 'typescript',
      description: '主程序文件',
      content: `// 待办事项管理器 — 从这里开始写
import * as fs from 'fs';
import * as readline from 'readline';

// 1. 定义 Todo 接口
interface Todo {
  id: number;
  title: string;
  priority: 'high' | 'medium' | 'low';
  done: boolean;
}

// 2. 数据存储
let todos: Todo[] = [];
let nextId = 1;
const DATA_FILE = './todos.json';

// 3. 加载已保存的数据（如果存在）
function loadTodos(): void {
  // TODO: 用 fs.existsSync 检查文件是否存在
  // TODO: 用 fs.readFileSync 读取并用 JSON.parse 解析
}

// 4. 保存数据
function saveTodos(): void {
  // TODO: 用 JSON.stringify 序列化，用 fs.writeFileSync 写入
}

// 5. 添加事项
function addTodo(title: string, priority: 'high' | 'medium' | 'low'): void {
  // TODO: push 到 todos 数组
}

// 6. 列出所有事项
function listTodos(): void {
  // TODO: 遍历 todos，格式化输出
}

// 7. 标记完成
function markDone(id: number): void {
  // TODO: find 对应 id，设置 done = true
}

// 8. 删除事项
function deleteTodo(id: number): void {
  // TODO: filter 掉对应 id 的事项
}

// 9. 主循环 — 读取用户输入
function main(): void {
  // TODO: 用 readline 读取用户命令
  // 支持命令：add, list, done, delete, exit
}

main();
` },
    { name: 'src/types.ts', language: 'typescript',
      description: '类型定义',
      content: `// 项目类型定义
// 在这里定义所有共享的 interface 和 type

export interface Todo {
  id: number;
  title: string;
  priority: 'high' | 'medium' | 'low';
  done: boolean;
  createdAt: string;
}

export type Command = 'add' | 'list' | 'done' | 'delete' | 'help' | 'exit';
` },
    { name: 'package.json', language: 'json', readOnly: true,
      description: '项目配置',
      content: `{
  "name": "cli-todo",
  "version": "1.0.0",
  "scripts": {
    "start": "ts-node src/todo.ts"
  },
  "devDependencies": {
    "ts-node": "^10.9.0",
    "typescript": "^5.0.0"
  }
}
` },
  ],
  milestones: [
    { id: 'm1', label: '数据结构定义', description: '定义 Todo interface 和相关类型', hint: '用 interface 定义 Todo，包含 id, title, priority, done 字段' },
    { id: 'm2', label: '文件读写', description: '实现 loadTodos 和 saveTodos', hint: '用 fs.existsSync 检查文件，fs.readFileSync/fs.writeFileSync 读写' },
    { id: 'm3', label: 'CRUD 操作', description: '实现增删查改功能', hint: '用 push 添加，filter 删除，find 查找' },
    { id: 'm4', label: '命令行交互', description: '实现 main 函数和用户输入循环', hint: '用 readline.createInterface 读取用户输入，switch 分发命令' },
  ],
  knowledgeBase: `这是一个 TypeScript CLI 项目，目标是做一个终端待办事项管理器。
关键知识点：
- interface 定义数据结构
- Node.js fs 模块（existsSync, readFileSync, writeFileSync）
- JSON.parse / JSON.stringify 序列化
- 数组方法：push, filter, find, forEach
- readline 模块读取命令行输入
- switch 语句分发命令
教学要点：先引导学生定义 interface，再实现文件读写，最后做命令行交互。鼓励学生逐步完成每个 milestone。`,
};

const p2TsTypes: ProjectDef = {
  id: 'p2-type-utils',
  courseId: 'typescript',
  title: '类型工具库',
  subtitle: 'TypeScript 类型体操',
  description: '实现常用的 TypeScript 工具类型（DeepReadonly、Pick、Omit 等），理解条件类型、infer、映射类型等高级特性。',
  level: 'intermediate',
  icon: '🔧',
  tags: ['泛型', '条件类型', 'infer', '映射类型'],
  mainFile: 'src/utilities.ts',
  files: [
    { name: 'README.md', language: 'markdown', readOnly: true, description: '项目说明', content: `# TypeScript 类型工具库\n\n实现常用的 TypeScript 工具类型。\n\n## 目标\n- 实现 DeepReadonly<T>\n- 实现 DeepPick<T, K>\n- 实现 ReturnType<F>（不用内置的）\n- 实现 Parameters<F>\n` },
    { name: 'src/utilities.ts', language: 'typescript', description: '类型实现', content: `// TypeScript 类型工具库
// 请实现以下类型工具

// 1. DeepReadonly — 递归地将所有属性设为 readonly
type DeepReadonly<T> = {
  // TODO: 如果 T extends object，递归处理
  // readonly [P in keyof T]: DeepReadonly<T[P]>
};

// 2. PickByValue — 挑选值类型匹配的属性
// type PickByValue<T, V> = ...

// 3. OmitByValue — 排除值类型匹配的属性
// type OmitByValue<T, V> = ...

// 4. 自己实现 ReturnType
// type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// 5. 自己实现 Parameters
// type MyParameters<T> = T extends (...args: infer P) => any ? P : never;

// ─── 测试 ───
interface User {
  id: number;
  name: string;
  address: {
    city: string;
    zip: string;
  };
}

// 测试 DeepReadonly
const user: DeepReadonly<User> = {
  id: 1,
  name: 'test',
  address: { city: 'NYC', zip: '10001' },
};
// user.name = 'other'; // 应该是类型错误
` },
    { name: 'src/event-system.ts', language: 'typescript', description: '类型安全事件系统', content: `// 类型安全的事件系统 — 用泛型约束事件类型

// 定义事件映射表
interface EventMap {
  click: { x: number; y: number };
  keydown: { key: string; ctrl: boolean };
  submit: { data: string };
}

// TODO: 实现类型安全的 EventEmitter
class TypedEmitter<T extends Record<string, any>> {
  // on<K extends keyof T>(event: K, handler: (payload: T[K]) => void): void {}
  // emit<K extends keyof T>(event: K, payload: T[K]): void {}
}

// 测试
const emitter = new TypedEmitter<EventMap>();
// emitter.on('click', (payload) => { ... }); // payload 应该自动推断为 { x: number; y: number }
// emitter.emit('keydown', { key: 'Enter', ctrl: true }); // ✅
// emitter.emit('keydown', { x: 1 }); // ❌ 类型错误
` },
  ],
  milestones: [
    { id: 'm1', label: '基础映射类型', description: '实现 DeepReadonly', hint: '用 mapped type + 条件类型递归' },
    { id: 'm2', label: '条件类型', description: '实现 PickByValue / OmitByValue', hint: '用 extends 判断值类型' },
    { id: 'm3', label: 'infer 推断', description: '实现 ReturnType / Parameters', hint: '用 infer 关键字推断函数签名' },
    { id: 'm4', label: '泛型约束', description: '实现类型安全的事件系统', hint: '用泛型约束事件映射表' },
  ],
  knowledgeBase: `TypeScript 高级类型教学项目。
关键概念：mapped types, conditional types, infer keyword, generic constraints。
让学生逐步实现常见工具类型，理解 TS 类型系统的表达能力。`,
};

const p3TsExpress: ProjectDef = {
  id: 'p3-express-api',
  courseId: 'typescript',
  title: 'Express REST API',
  subtitle: 'Node.js 后端实战',
  description: '用 Express + TypeScript 搭建一个 RESTful API 服务，连接 SQLite 数据库，实现完整的 CRUD 和中间件。',
  level: 'intermediate',
  icon: '🚀',
  tags: ['Express', 'REST', 'SQLite', '中间件'],
  mainFile: 'src/server.ts',
  files: [
    { name: 'README.md', language: 'markdown', readOnly: true, description: '项目说明',
      content: `# Express REST API\n\n用 Express + TypeScript 搭建 RESTful API。\n\n## API 设计\n- GET /api/items — 列表\n- GET /api/items/:id — 详情\n- POST /api/items — 创建\n- PUT /api/items/:id — 更新\n- DELETE /api/items/:id — 删除\n` },
    { name: 'src/server.ts', language: 'typescript', description: 'Express 服务入口',
      content: `import express, { Request, Response, NextFunction } from 'express';
import { itemRouter } from './routes/items';

const app = express();
const PORT = 3000;

// 中间件
app.use(express.json());

// TODO: 添加日志中间件 — 打印每个请求的方法和路径
// app.use((req: Request, res: Response, next: NextFunction) => { ... });

// 路由
app.use('/api/items', itemRouter);

// TODO: 错误处理中间件
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => { ... });

app.listen(PORT, () => {
  console.log(\`服务器运行在 http://localhost:\${PORT}\`);
});
` },
    { name: 'src/routes/items.ts', language: 'typescript', description: '路由处理',
      content: `import { Router, Request, Response } from 'express';

export const itemRouter = Router();

interface Item {
  id: number;
  name: string;
  price: number;
}

let items: Item[] = [];
let nextId = 1;

// TODO: GET / — 获取所有 items，支持 ?page=1&size=10 分页
// itemRouter.get('/', (req, res) => { ... });

// TODO: GET /:id — 获取单个 item
// TODO: POST / — 创建新 item
// TODO: PUT /:id — 更新 item
// TODO: DELETE /:id — 删除 item
` },
    { name: 'src/db.ts', language: 'typescript', description: '数据库操作',
      content: `// SQLite 数据库操作（可选 — 替换内存数组）
// import Database from 'better-sqlite3';

// TODO: 初始化数据库和表
// TODO: 实现 CRUD 函数：getAll, getById, create, update, remove
` },
    { name: 'package.json', language: 'json', readOnly: true, description: '项目配置',
      content: `{
  "name": "express-api",
  "scripts": { "dev": "ts-node src/server.ts" },
  "dependencies": { "express": "^4.18.0" },
  "devDependencies": { "@types/express": "^4.17.0", "typescript": "^5.0.0", "ts-node": "^10.9.0" }
}` },
  ],
  milestones: [
    { id: 'm1', label: 'Express 服务器', description: '创建 Express 应用并监听端口', hint: '用 express() 创建 app，app.listen() 启动' },
    { id: 'm2', label: '路由与 CRUD', description: '实现完整的 RESTful 路由', hint: 'Router 分组路由，/:id 获取路径参数' },
    { id: 'm3', label: '中间件', description: '添加日志和错误处理中间件', hint: '中间件接收 (req, res, next)，最后调用 next()' },
    { id: 'm4', label: '数据库集成', description: '用 SQLite 替换内存数组', hint: 'better-sqlite3 是同步 API，适合学习' },
  ],
  knowledgeBase: `Express + TypeScript REST API 教学项目。
关键概念：Express 路由、中间件模式、RESTful 设计、SQLite 集成。
教学生理解请求-响应生命周期，中间件的洋葱模型。`,
};

const p4TsDashboard: ProjectDef = {
  id: 'p4-dashboard',
  courseId: 'typescript',
  title: '交互式仪表盘',
  subtitle: '前端实战项目',
  description: '用原生 HTML/CSS/TypeScript 做一个数据仪表盘，包含图表、响应式布局、暗色模式切换。',
  level: 'entry',
  icon: '📊',
  tags: ['HTML', 'CSS', 'DOM', '响应式'],
  mainFile: 'src/main.ts',
  files: [
    { name: 'index.html', language: 'html', readOnly: true, description: '主页面',
      content: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>数据仪表盘</title>
  <link rel="stylesheet" href="src/styles.css">
</head>
<body>
  <header class="header">
    <h1>📊 数据仪表盘</h1>
    <button id="themeToggle">切换主题</button>
  </header>
  <main class="dashboard" id="dashboard">
    <!-- 卡片将由 JS 动态生成 -->
  </main>
  <script type="module" src="src/main.ts"></script>
</body>
</html>` },
    { name: 'src/main.ts', language: 'typescript', description: '主逻辑', content: `// 仪表盘主逻辑

interface DashboardCard {
  title: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

// TODO: 模拟数据
const mockData: DashboardCard[] = [
  // 填充 4-6 条模拟数据
];

// TODO: 渲染卡片
function renderCards(data: DashboardCard[]): void {
  // 用 createElement 或 innerHTML 生成卡片 DOM
}

// TODO: 主题切换
function setupThemeToggle(): void {
  // 点击按钮切换 data-theme 属性
}

// TODO: 响应式处理
function setupResponsive(): void {
  // 监听 window resize，调整卡片列数
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  renderCards(mockData);
  setupThemeToggle();
  setupResponsive();
});
` },
    { name: 'src/styles.css', language: 'css', description: '样式', content: `/* 仪表盘样式 — 支持暗色/亮色主题 */
:root, [data-theme="dark"] {
  --bg: #0D1117;
  --card-bg: #161B22;
  --text: #C9D1D9;
  --accent: #58A6FF;
  --up: #3FB950;
  --down: #F85149;
  --border: #30363D;
}

[data-theme="light"] {
  --bg: #FFFFFF;
  --card-bg: #F6F8FA;
  --text: #24292F;
  --accent: #0969DA;
  --up: #1A7F37;
  --down: #CF222E;
  --border: #D0D7DE;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: system-ui, sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
}

/* TODO: 完成以下样式 */
.header {
  /* flex 布局，两端对齐 */
}

.dashboard {
  /* CSS Grid 响应式布局 */
  /* grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); */
}

.card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
}
` },
  ],
  milestones: [
    { id: 'm1', label: 'HTML 结构', description: '完成页面 HTML 结构和语义化标签', hint: '使用 header/main/footer 语义标签' },
    { id: 'm2', label: 'CSS 布局', description: '实现 Grid 响应式卡片布局', hint: 'grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))' },
    { id: 'm3', label: 'DOM 渲染', description: '用 TypeScript 动态生成卡片', hint: '使用 createElement 或 innerHTML，注意类型安全' },
    { id: 'm4', label: '主题切换', description: '实现暗色/亮色主题切换', hint: 'CSS 变量 + data-theme 属性切换' },
  ],
  knowledgeBase: `前端仪表盘教学项目。
关键概念：CSS Grid 响应式布局、CSS 变量主题切换、DOM 操作、TypeScript 类型安全。
教学生理解前端三件套（HTML/CSS/TS）如何协作。`,
};

const p5TsReact: ProjectDef = {
  id: 'p5-react-blog',
  courseId: 'typescript',
  title: 'React 个人博客',
  subtitle: 'React 入门实战',
  description: '用 React + TypeScript 搭建个人博客，包含文章列表、详情页、搜索过滤和 Markdown 渲染。',
  level: 'intermediate',
  icon: '📝',
  tags: ['React', '组件', 'Hooks', '路由'],
  mainFile: 'src/App.tsx',
  files: [
    { name: 'README.md', language: 'markdown', readOnly: true, description: '项目说明', content: `# React 个人博客\n\n用 React + TypeScript 搭建个人博客。\n\n## 功能\n- 文章列表（卡片展示）\n- 文章详情（Markdown 渲染）\n- 搜索过滤\n- 暗色模式\n` },
    { name: 'src/App.tsx', language: 'typescript', description: '应用入口', content: `import React, { useState } from 'react';
import { PostList } from './components/PostList';
import { SearchBar } from './components/SearchBar';
import type { Post } from './types';

const mockPosts: Post[] = [
  { id: 1, title: 'React 入门指南', excerpt: 'React 是一个用于构建用户界面的 JavaScript 库...', tags: ['React', '前端'], date: '2026-01-15' },
  { id: 2, title: 'TypeScript 类型体操', excerpt: '掌握 TypeScript 高级类型能让你的代码更安全...', tags: ['TypeScript', '类型'], date: '2026-02-20' },
  { id: 3, title: 'CSS Grid 完全指南', excerpt: 'Grid 是现代 CSS 最强大的布局工具...', tags: ['CSS', '布局'], date: '2026-03-10' },
];

export default function App() {
  const [search, setSearch] = useState('');
  const [dark, setDark] = useState(true);

  // TODO: 根据 search 过滤 posts（模糊匹配标题、标签、摘要）
  const filteredPosts = mockPosts;

  return (
    <div className={dark ? 'dark' : 'light'}>
      <header>
        <h1>📝 我的博客</h1>
        <button onClick={() => setDark(!dark)}>
          {dark ? '☀️ 浅色' : '🌙 暗色'}
        </button>
      </header>
      <SearchBar value={search} onChange={setSearch} />
      <PostList posts={filteredPosts} />
    </div>
  );
}
` },
    { name: 'src/types.ts', language: 'typescript', description: '类型定义', content: `export interface Post {
  id: number;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
  content?: string; // Markdown 内容
}
` },
    { name: 'src/components/PostList.tsx', language: 'typescript', description: '文章列表', content: `import React from 'react';
import type { Post } from '../types';

interface Props {
  posts: Post[];
}

export function PostList({ posts }: Props) {
  // TODO: 渲染文章卡片列表
  // 每个卡片显示：标题、摘要、标签、日期
  return (
    <div className="post-list">
      {/* 用 posts.map 渲染卡片 */}
      {posts.length === 0 && <p>没有找到文章</p>}
    </div>
  );
}
` },
    { name: 'src/components/SearchBar.tsx', language: 'typescript', description: '搜索栏', content: `import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  // TODO: 实现搜索输入框
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="搜索文章..."
      />
    </div>
  );
}
` },
  ],
  milestones: [
    { id: 'm1', label: '组件拆分', description: '拆分为 PostList、SearchBar、PostCard', hint: '每个组件一个文件，用 interface 定义 Props' },
    { id: 'm2', label: '状态管理', description: '实现搜索过滤逻辑', hint: 'useState 管理 search，filter 过滤 posts' },
    { id: 'm3', label: '条件渲染', description: '处理空搜索结果', hint: 'posts.length === 0 时显示提示' },
    { id: 'm4', label: '暗色模式', description: '实现主题切换', hint: 'useState 管理 dark，className 切换' },
  ],
  knowledgeBase: `React + TypeScript 博客教学项目。
关键概念：函数组件、Props 类型、useState、条件渲染、列表渲染。
教学生从零搭建 React 应用，理解组件化思维。`,
};

const p6TsFullstack: ProjectDef = {
  id: 'p6-fullstack-notes',
  courseId: 'typescript',
  title: '全栈在线笔记',
  subtitle: '全栈应用实战',
  description: '用 React + Express + PostgreSQL 搭建完整的在线笔记应用，含用户认证、笔记 CRUD、部署配置。',
  level: 'expert',
  icon: '🏔️',
  tags: ['全栈', 'React', 'Express', 'Prisma'],
  mainFile: 'README.md',
  files: [
    { name: 'README.md', language: 'markdown', readOnly: true, description: '项目说明',
      content: `# 全栈在线笔记\n\n## 架构\n- 前端：React + TypeScript + Tailwind\n- 后端：Express + TypeScript + Prisma\n- 数据库：SQLite（开发）/ PostgreSQL（生产）\n- 认证：JWT\n\n## 功能\n- 用户注册/登录\n- 笔记 CRUD\n- 笔记搜索\n- Markdown 支持\n` },
    { name: 'server/src/index.ts', language: 'typescript', description: '后端入口', content: `import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth';
import { notesRouter } from './routes/notes';

const app = express();
app.use(cors());
app.use(express.json());

// TODO: 路由
app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(\`Server on :\${PORT}\`));
` },
    { name: 'server/src/middleware/auth.ts', language: 'typescript', description: 'JWT 认证中间件', content: `import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// TODO: 扩展 Request 类型，添加 user 字段
// declare global { namespace Express { interface Request { user?: { id: number } } } }

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // TODO: 从 Authorization header 提取 token
  // TODO: 验证 JWT token
  // TODO: 将用户信息注入 req.user
  next();
}
` },
    { name: 'client/src/App.tsx', language: 'typescript', description: '前端入口', content: `import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { NotesPage } from './pages/NotesPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NotesPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
` },
  ],
  milestones: [
    { id: 'm1', label: '数据库设计', description: '设计 User 和 Note 的 Prisma Schema', hint: '用 Prisma Schema 定义模型和关系' },
    { id: 'm2', label: '认证系统', description: '实现注册/登录/JWT 中间件', hint: 'bcrypt 哈希密码，jsonwebtoken 签发验证' },
    { id: 'm3', label: '笔记 API', description: '实现笔记 CRUD API', hint: 'RESTful 路由，关联用户 ID' },
    { id: 'm4', label: '前后端联调', description: 'React 前端对接 API', hint: 'fetch 封装，错误处理，loading 状态' },
  ],
  knowledgeBase: `全栈应用教学项目。教学生理解前后端分离架构、JWT 认证流程、ORM 使用。
强调安全实践：密码哈希、JWT 过期、SQL 注入防护（参数化查询）。`,
};

// ─── Python 项目 ──────────────────────────────────────────

const p1PyMemo: ProjectDef = {
  id: 'p1-cli-memo',
  courseId: 'python',
  title: 'CLI 备忘录',
  subtitle: 'Python 命令行工具',
  description: '用 Python 做一个终端备忘录，支持增删查改和 JSON 文件持久化。学会字典操作、文件 IO、命令行交互。',
  level: 'entry',
  icon: '📋',
  tags: ['CLI', 'dict', '文件IO', 'JSON'],
  mainFile: 'memo.py',
  files: [
    { name: 'README.md', language: 'markdown', readOnly: true, description: '项目说明',
      content: `# CLI 备忘录\n\n用 Python 做一个终端备忘录工具。\n\n## 功能\n- 添加备忘（标题 + 内容）\n- 列出所有备忘\n- 搜索备忘\n- 删除备忘\n- 保存到 JSON 文件，启动自动加载\n` },
    { name: 'memo.py', language: 'python', description: '主程序',
      content: `# CLI 备忘录 — Python 实战项目
import json
import os

DATA_FILE = "memos.json"

# 1. 加载数据
def load_memos() -> list[dict]:
    """从 JSON 文件加载备忘录列表"""
    # TODO: 用 os.path.exists 检查文件是否存在
    # TODO: 用 json.load 读取文件
    pass

# 2. 保存数据
def save_memos(memos: list[dict]) -> None:
    """将备忘录列表保存到 JSON 文件"""
    # TODO: 用 json.dump 写入文件
    pass

# 3. 添加备忘
def add_memo(memos: list[dict], title: str, content: str) -> None:
    """添加一条新备忘录"""
    # TODO: 创建 dict，append 到列表
    pass

# 4. 列出备忘
def list_memos(memos: list[dict]) -> None:
    """打印所有备忘录"""
    # TODO: 用 enumerate 遍历，格式化输出
    pass

# 5. 搜索备忘
def search_memos(memos: list[dict], keyword: str) -> None:
    """搜索标题或内容包含关键字的备忘"""
    # TODO: 用列表推导式过滤
    pass

# 6. 删除备忘
def delete_memo(memos: list[dict], index: int) -> None:
    """删除指定索引的备忘"""
    # TODO: 用 del 或 pop 删除
    pass

# 7. 主循环
def main() -> None:
    """主程序 — 读取用户命令并分发"""
    memos = load_memos()
    print("📋 备忘录已就绪，输入 help 查看命令")
    
    # TODO: while True 循环读取 input()
    # 支持命令：add, list, search, delete, help, exit
    pass

if __name__ == "__main__":
    main()
` },
  ],
  milestones: [
    { id: 'm1', label: '数据加载', description: '实现 load_memos 和 save_memos', hint: '用 json.load/json.dump 配合 with open()' },
    { id: 'm2', label: 'CRUD 操作', description: '实现增删查改功能', hint: '用 append 添加，del 删除，列表推导式搜索' },
    { id: 'm3', label: '命令行交互', description: '实现 main 函数和输入循环', hint: 'while True + input() + if/elif 分发' },
  ],
  knowledgeBase: `Python CLI 入门项目。
关键知识：dict 操作、json 模块、文件 IO（with open）、input() 交互、while 循环、列表推导式。
教学要点：先让学生实现数据层，再做交互层。鼓励用类型注解（list[dict]）。`,
};

const p2PyLog: ProjectDef = {
  id: 'p2-log-analyzer',
  courseId: 'python',
  title: '日志分析脚本',
  subtitle: 'Python 数据处理',
  description: '分析服务器日志文件，统计 IP 访问量、状态码分布、错误率，输出分析报告。',
  level: 'intermediate',
  icon: '📊',
  tags: ['文件处理', 'Counter', '正则', '统计'],
  mainFile: 'analyzer.py',
  files: [
    { name: 'README.md', language: 'markdown', readOnly: true, description: '项目说明',
      content: `# 日志分析脚本\n\n分析 Nginx/Apache 格式的服务器日志。\n\n## 分析维度\n- IP 访问量 Top 10\n- 状态码分布\n- 错误率（4xx + 5xx）\n- 最热门的请求路径\n` },
    { name: 'analyzer.py', language: 'python', description: '主分析脚本',
      content: `# 日志分析脚本 — Python 实战项目
from collections import Counter
import re
from typing import TextIO

# 模拟日志数据（实际项目会从文件读取）
SAMPLE_LOG = [
    '192.168.1.1 - - [15/Jan/2026:10:30:00 +0800] "GET /index.html HTTP/1.1" 200 1234',
    '10.0.0.1 - - [15/Jan/2026:10:30:01 +0800] "POST /api/login HTTP/1.1" 401 56',
    '192.168.1.1 - - [15/Jan/2026:10:30:02 +0800] "GET /style.css HTTP/1.1" 200 567',
    '172.16.0.1 - - [15/Jan/2026:10:30:03 +0800] "GET /api/data HTTP/1.1" 500 89',
    '192.168.1.2 - - [15/Jan/2026:10:30:04 +0800] "GET /index.html HTTP/1.1" 200 1234',
    '192.168.1.1 - - [15/Jan/2026:10:30:05 +0800] "GET /about.html HTTP/1.1" 404 45',
]

# 1. 解析日志行
def parse_line(line: str) -> dict | None:
    """从一行日志中提取 IP、方法、路径、状态码"""
    # TODO: 用正则或 split 解析
    # 格式: IP - - [时间] "方法 路径 协议" 状态码 大小
    pass

# 2. 统计 IP 访问量
def count_ips(lines: list[str]) -> Counter:
    """统计每个 IP 的访问次数"""
    # TODO: 用 Counter 统计
    pass

# 3. 统计状态码分布
def count_status(lines: list[str]) -> Counter:
    """统计各状态码出现次数"""
    pass

# 4. 计算错误率
def error_rate(status_counter: Counter) -> float:
    """计算 4xx + 5xx 占比"""
    pass

# 5. 最热门路径 Top N
def top_paths(lines: list[str], n: int = 5) -> list[tuple[str, int]]:
    """返回访问最多的 N 个路径"""
    pass

# 6. 生成报告
def generate_report(lines: list[str]) -> str:
    """生成完整的分析报告文本"""
    # TODO: 调用上面的函数，格式化输出
    pass

# 7. 主程序
def main() -> None:
    lines = SAMPLE_LOG  # 实际项目改为从文件读取
    report = generate_report(lines)
    print(report)
    
    # TODO: 可选 — 将报告写入文件
    # with open("report.txt", "w", encoding="utf-8") as f:
    #     f.write(report)

if __name__ == "__main__":
    main()
` },
    { name: 'sample.log', language: 'markdown', readOnly: true, description: '示例日志数据',
      content: `192.168.1.1 - - [15/Jan/2026:10:30:00 +0800] "GET /index.html HTTP/1.1" 200 1234
10.0.0.1 - - [15/Jan/2026:10:30:01 +0800] "POST /api/login HTTP/1.1" 401 56
192.168.1.1 - - [15/Jan/2026:10:30:02 +0800] "GET /style.css HTTP/1.1" 200 567
172.16.0.1 - - [15/Jan/2026:10:30:03 +0800] "GET /api/data HTTP/1.1" 500 89
192.168.1.2 - - [15/Jan/2026:10:30:04 +0800] "GET /index.html HTTP/1.1" 200 1234
192.168.1.1 - - [15/Jan/2026:10:30:05 +0800] "GET /about.html HTTP/1.1" 404 45
10.0.0.2 - - [15/Jan/2026:10:30:06 +0800] "GET /api/users HTTP/1.1" 200 892
192.168.1.3 - - [15/Jan/2026:10:30:07 +0800] "GET /index.html HTTP/1.1" 200 1234
172.16.0.1 - - [15/Jan/2026:10:30:08 +0800] "POST /api/upload HTTP/1.1" 201 234
192.168.1.1 - - [15/Jan/2026:10:30:09 +0800] "GET /favicon.ico HTTP/1.1" 200 1150
` },
  ],
  milestones: [
    { id: 'm1', label: '日志解析', description: '用正则解析日志行', hint: 're.match(r\'...\', line) 提取各组' },
    { id: 'm2', label: 'Counter 统计', description: '统计 IP 和状态码', hint: 'from collections import Counter; Counter.most_common(10)' },
    { id: 'm3', label: '报告生成', description: '格式化输出分析报告', hint: '用 f-string 格式化百分比和排行' },
  ],
  knowledgeBase: `Python 数据处理项目。
关键知识：正则表达式（re 模块）、collections.Counter、字符串处理、文件 IO。
教学生理解数据管道的概念：解析 → 统计 → 输出。`,
};

const p3PyMonitor: ProjectDef = {
  id: 'p3-price-monitor',
  courseId: 'python',
  title: '电商价格监控',
  subtitle: '爬虫自动化实战',
  description: '定时爬取商品页面，监控价格变化，检测降价后发送提醒。',
  level: 'intermediate',
  icon: '🕸️',
  tags: ['爬虫', 'BS4', 'CSV', '定时任务'],
  mainFile: 'monitor.py',
  files: [
    { name: 'README.md', language: 'markdown', readOnly: true, description: '项目说明',
      content: `# 电商价格监控\n\n定时监控商品价格，降价时提醒。\n\n## 功能\n- 爬取商品名称和价格\n- 记录历史价格到 CSV\n- 检测降价\n- 定时检查\n` },
    { name: 'monitor.py', language: 'python', description: '监控主程序',
      content: `# 电商价格监控 — Python 实战项目
import csv
import time
import os
from datetime import datetime
from dataclasses import dataclass
from typing import Optional

# 注意：实际使用时需要 import requests 和 BeautifulSoup
# 这里用模拟数据演示核心逻辑

@dataclass
class ProductPrice:
    """商品价格记录"""
    name: str
    price: float
    timestamp: str

# 1. 抓取价格（模拟）
def fetch_price(url: str) -> Optional[ProductPrice]:
    """从商品页面抓取名称和价格"""
    # TODO: 实际用 requests.get(url) + BeautifulSoup
    # 这里用模拟数据
    pass

# 2. 读取历史价格
def load_history(csv_file: str) -> list[ProductPrice]:
    """从 CSV 文件读取历史价格记录"""
    # TODO: 用 csv.DictReader 读取
    pass

# 3. 保存价格记录
def save_price(csv_file: str, record: ProductPrice) -> None:
    """追加一条价格记录到 CSV"""
    # TODO: 用 csv.writer 追加写入
    pass

# 4. 检测降价
def check_price_drop(current: float, history: list[ProductPrice]) -> Optional[float]:
    """比较当前价格与历史最低价，返回降幅"""
    # TODO: 找历史最低价，计算降幅
    pass

# 5. 发送提醒
def send_alert(product: str, old_price: float, new_price: float) -> None:
    """打印降价提醒"""
    # TODO: 格式化输出降价信息
    pass

# 6. 定时监控
def monitor(url: str, interval: int = 3600) -> None:
    """每隔 interval 秒检查一次价格"""
    # TODO: while True + time.sleep(interval)
    pass

if __name__ == "__main__":
    # 监控示例商品
    # monitor("https://example.com/product/123", interval=60)
    print("价格监控系统已就绪")
` },
    { name: 'prices.csv', language: 'markdown', description: '价格历史 CSV',
      content: `name,price,timestamp
Python编程书,79.00,2026-01-15 10:00:00
Python编程书,75.50,2026-01-16 10:00:00
Python编程书,82.00,2026-01-17 10:00:00
` },
  ],
  milestones: [
    { id: 'm1', label: '数据类定义', description: '用 dataclass 定义 ProductPrice', hint: '@dataclass 自动生成 __init__' },
    { id: 'm2', label: 'CSV 读写', description: '实现历史价格的读写', hint: '用 csv.DictReader / csv.writer' },
    { id: 'm3', label: '降价检测', description: '实现价格比对逻辑', hint: 'min(history, key=lambda p: p.price)' },
    { id: 'm4', label: '定时循环', description: '实现定时监控主循环', hint: 'while True + time.sleep(interval)' },
  ],
  knowledgeBase: `Python 爬虫 + 数据处理项目。
关键知识：dataclass、csv 模块、time 模块、BeautifulSoup（外部库）。
教学生理解自动化脚本的设计模式：抓取→记录→比对→提醒。`,
};

const p4PyBlog: ProjectDef = {
  id: 'p4-blog',
  courseId: 'python',
  title: '个人博客',
  subtitle: 'Flask Web 实战',
  description: '用 Flask 搭建个人博客系统，包含文章管理、用户认证、评论功能和模板渲染。',
  level: 'intermediate',
  icon: '🎨',
  tags: ['Flask', 'SQLite', 'Jinja2', '认证'],
  mainFile: 'app.py',
  files: [
    { name: 'README.md', language: 'markdown', readOnly: true, description: '项目说明',
      content: `# Flask 个人博客\n\n用 Flask + SQLite 搭建的博客系统。\n\n## 功能\n- 文章列表和详情\n- 用户注册和登录\n- 发布文章（需登录）\n- 评论功能\n` },
    { name: 'app.py', language: 'python', description: 'Flask 应用入口',
      content: `# Flask 个人博客 — Python Web 实战
from flask import Flask, render_template, request, redirect, url_for, session, flash
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps

app = Flask(__name__)
app.secret_key = 'dev-secret-key-change-in-production'

# ─── 数据库初始化 ───
def init_db() -> None:
    """创建数据库表"""
    conn = sqlite3.connect('blog.db')
    conn.execute('''
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            author TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# ─── 辅助函数 ───
def get_db():
    """获取数据库连接"""
    conn = sqlite3.connect('blog.db')
    conn.row_factory = sqlite3.Row  # 让结果可以用列名访问
    return conn

# ─── 认证装饰器 ───
def login_required(f):
    """要求登录的装饰器"""
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'user_id' not in session:
            flash('请先登录')
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated

# ─── 路由（待实现） ───

@app.route('/')
def index():
    """首页 — 显示文章列表"""
    # TODO: 查询所有文章，按时间倒序
    return render_template('index.html', posts=[])

@app.route('/post/<int:post_id>')
def view_post(post_id: int):
    """文章详情页"""
    # TODO: 查询单篇文章
    return render_template('post.html')

@app.route('/create', methods=['GET', 'POST'])
@login_required
def create_post():
    """创建新文章"""
    # TODO: GET 显示表单，POST 保存文章
    pass

@app.route('/register', methods=['GET', 'POST'])
def register():
    """用户注册"""
    # TODO: 创建用户
    pass

@app.route('/login', methods=['GET', 'POST'])
def login():
    """用户登录"""
    # TODO: 验证用户，设置 session
    pass

@app.route('/logout')
def logout():
    """登出"""
    session.clear()
    return redirect(url_for('index'))

# ─── 启动 ───
if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)
` },
    { name: 'templates/base.html', language: 'html', description: '基础模板',
      content: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}个人博客{% endblock %}</title>
    <style>
        body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        nav { margin-bottom: 20px; }
        nav a { margin-right: 15px; }
        .flash { padding: 10px; background: #e8f5e9; border-radius: 8px; margin-bottom: 15px; }
        .post { border-bottom: 1px solid #eee; padding: 15px 0; }
    </style>
</head>
<body>
    <nav>
        <a href="{{ url_for('index') }}">首页</a>
        {% if session.user_id %}
            <a href="{{ url_for('create_post') }}">写文章</a>
            <a href="{{ url_for('logout') }}">登出 ({{ session.username }})</a>
        {% else %}
            <a href="{{ url_for('login') }}">登录</a>
            <a href="{{ url_for('register') }}">注册</a>
        {% endif %}
    </nav>

    {% for message in get_flashed_messages() %}
        <div class="flash">{{ message }}</div>
    {% endfor %}

    {% block content %}{% endblock %}
</body>
</html>
` },
    { name: 'templates/index.html', language: 'html', description: '首页模板', content: `{% extends "base.html" %}
{% block title %}首页 — 个人博客{% endblock %}
{% block content %}
<h1>📝 文章列表</h1>
{% for post in posts %}
    <div class="post">
        <h2><a href="{{ url_for('view_post', post_id=post.id) }}">{{ post.title }}</a></h2>
        <p>{{ post.content[:200] }}...</p>
        <small>{{ post.author }} · {{ post.created_at }}</small>
    </div>
{% else %}
    <p>还没有文章，<a href="{{ url_for('create_post') }}">写一篇吧</a></p>
{% endfor %}
{% endblock %}
` },
  ],
  milestones: [
    { id: 'm1', label: '数据库设计', description: '设计 posts 和 users 表', hint: 'SQLite，用 sqlite3.Row 方便访问' },
    { id: 'm2', label: '认证系统', description: '实现注册和登录', hint: 'werkzeug.security 哈希密码，session 存储登录状态' },
    { id: 'm3', label: '文章 CRUD', description: '实现文章的增删查改', hint: 'login_required 装饰器保护创建路由' },
    { id: 'm4', label: '模板渲染', description: '用 Jinja2 模板展示数据', hint: '模板继承 base.html，{% for %} 遍历' },
  ],
  knowledgeBase: `Flask Web 开发教学项目。
关键知识：Flask 路由、Jinja2 模板、SQLite、session 认证、装饰器。
教学生理解 MVC 模式：Model（数据库）、View（模板）、Controller（路由）。`,
};

const p5PySnake: ProjectDef = {
  id: 'p5-snake-game',
  courseId: 'python',
  title: '贪吃蛇游戏',
  subtitle: 'Pygame 游戏实战',
  description: '用 Pygame 从零开发贪吃蛇游戏，包含移动逻辑、碰撞检测、分数系统、游戏状态管理。',
  level: 'intermediate',
  icon: '🐍',
  tags: ['Pygame', '游戏循环', '碰撞检测', '状态机'],
  mainFile: 'snake.py',
  files: [
    { name: 'README.md', language: 'markdown', readOnly: true, description: '项目说明',
      content: `# 贪吃蛇游戏\n\n用 Pygame 实现的经典贪吃蛇。\n\n## 功能\n- 蛇的移动控制\n- 食物生成\n- 碰撞检测（墙壁 + 自身）\n- 分数系统\n- 游戏结束 + 重玩\n` },
    { name: 'snake.py', language: 'python', description: '游戏主程序',
      content: `# 贪吃蛇游戏 — Python Pygame 实战
import pygame
import random
from collections import deque
from enum import Enum

# 初始化
pygame.init()

# 常量
CELL_SIZE = 20
GRID_W, GRID_H = 30, 20
WIDTH = CELL_SIZE * GRID_W
HEIGHT = CELL_SIZE * GRID_H
FPS = 10

# 颜色
BLACK = (0, 0, 0)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
WHITE = (255, 255, 255)
GRAY = (40, 40, 40)

# 方向
class Direction(Enum):
    UP = (0, -1)
    DOWN = (0, 1)
    LEFT = (-1, 0)
    RIGHT = (1, 0)

# ─── 游戏类 ───
class Snake:
    """蛇的类"""
    def __init__(self):
        # TODO: 初始化蛇身（deque），初始方向
        self.body = deque([(GRID_W // 2, GRID_H // 2)])
        self.direction = Direction.RIGHT
        self.grow_flag = False

    def move(self) -> bool:
        """移动蛇，返回 False 表示碰撞"""
        # TODO: 计算新头部位置
        # TODO: 检测墙壁碰撞
        # TODO: 检测自身碰撞
        # TODO: 添加新头部，如果不增长则去掉尾部
        pass

    def grow(self):
        """标记下一次移动时增长"""
        self.grow_flag = True

    def draw(self, screen: pygame.Surface):
        """绘制蛇"""
        # TODO: 遍历 body，用 pygame.draw.rect 画每一节
        pass

class Food:
    """食物类"""
    def __init__(self):
        self.position = (0, 0)
        self.randomize()

    def randomize(self):
        """随机生成新位置"""
        # TODO: 在网格范围内随机生成坐标
        pass

    def draw(self, screen: pygame.Surface):
        """绘制食物"""
        # TODO: 用 pygame.draw.rect 画红色方块
        pass

# ─── 游戏状态 ───
class GameState(Enum):
    PLAYING = "playing"
    GAME_OVER = "game_over"

# ─── 主循环 ───
def main():
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    pygame.display.set_caption("贪吃蛇 🐍")
    clock = pygame.time.Clock()
    
    snake = Snake()
    food = Food()
    score = 0
    state = GameState.PLAYING
    font = pygame.font.Font(None, 36)
    
    # TODO: 游戏主循环
    # while True:
    #     处理事件（键盘输入、退出）
    #     更新游戏状态
    #     绘制画面
    
    pygame.quit()

if __name__ == "__main__":
    main()
` },
  ],
  milestones: [
    { id: 'm1', label: '窗口和网格', description: '创建 Pygame 窗口，绘制网格', hint: 'pygame.display.set_mode() 创建窗口' },
    { id: 'm2', label: '蛇的移动', description: '实现 Snake 类的移动逻辑', hint: '用 deque 管理蛇身，appendleft + pop' },
    { id: 'm3', label: '食物和碰撞', description: '实现食物生成和碰撞检测', hint: '检测蛇头坐标是否与食物重合' },
    { id: 'm4', label: '分数和状态', description: '添加分数系统和游戏状态', hint: 'GameState enum，game_over 时显示重玩提示' },
  ],
  knowledgeBase: `Pygame 游戏开发教学项目。
关键知识：pygame 初始化、游戏循环、事件处理、碰撞检测、deque 数据结构。
教学生理解游戏开发的核心概念：主循环、状态更新、渲染分离。`,
};

const p6PyDjango: ProjectDef = {
  id: 'p6-django-manager',
  courseId: 'python',
  title: 'Django 管理系统',
  subtitle: 'Django 全栈实战',
  description: '用 Django 搭建员工管理系统，包含 Admin 后台、CBV 视图、模板渲染和部署配置。',
  level: 'expert',
  icon: '🏢',
  tags: ['Django', 'ORM', 'Admin', '部署'],
  mainFile: 'README.md',
  files: [
    { name: 'README.md', language: 'markdown', readOnly: true, description: '项目说明',
      content: `# Django 员工管理系统\n\n## 功能\n- 部门和员工管理\n- Django Admin 自定义\n- 列表和详情视图\n- CSV 导出\n- 部署配置\n` },
    { name: 'manage.py', language: 'python', readOnly: true, description: 'Django 管理脚本', content: `#!/usr/bin/env python\n"""Django's command-line utility for administrative tasks."""\nimport os\nimport sys\n\ndef main():\n    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')\n    try:\n        from django.core.management import execute_from_command_line\n    except ImportError as exc:\n        raise ImportError("Couldn't import Django.") from exc\n    execute_from_command_line(sys.argv)\n\nif __name__ == '__main__':\n    main()\n` },
    { name: 'employees/models.py', language: 'python', description: '数据模型',
      content: `from django.db import models

class Department(models.Model):
    """部门"""
    name = models.CharField(max_length=100, unique=True, verbose_name='部门名称')
    code = models.CharField(max_length=10, unique=True, verbose_name='部门代码')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')

    class Meta:
        verbose_name = '部门'
        verbose_name_plural = '部门'
        ordering = ['name']

    def __str__(self) -> str:
        return self.name


class Employee(models.Model):
    """员工"""
    GENDER_CHOICES = [
        ('M', '男'),
        ('F', '女'),
    ]

    name = models.CharField(max_length=50, verbose_name='姓名')
    employee_id = models.CharField(max_length=20, unique=True, verbose_name='工号')
    department = models.ForeignKey(
        Department, on_delete=models.CASCADE,
        related_name='employees', verbose_name='部门'
    )
    position = models.CharField(max_length=100, verbose_name='职位')
    salary = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='薪资')
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, verbose_name='性别')
    hire_date = models.DateField(verbose_name='入职日期')
    is_active = models.BooleanField(default=True, verbose_name='在职')

    class Meta:
        verbose_name = '员工'
        verbose_name_plural = '员工'
        ordering = ['department', 'name']

    def __str__(self) -> str:
        return f'{self.name} ({self.employee_id})'
` },
    { name: 'employees/admin.py', language: 'python', description: 'Admin 配置',
      content: `from django.contrib import admin
from .models import Department, Employee

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ['name', 'code', 'created_at', 'employee_count']
    search_fields = ['name', 'code']

    def employee_count(self, obj):
        """显示部门人数"""
        return obj.employees.count()
    employee_count.short_description = '员工数'


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ['name', 'employee_id', 'department', 'position', 'salary', 'is_active']
    list_filter = ['department', 'gender', 'is_active']
    search_fields = ['name', 'employee_id', 'position']
    list_editable = ['is_active']
` },
    { name: 'employees/views.py', language: 'python', description: '视图',
      content: `from django.views.generic import ListView, DetailView, CreateView, UpdateView
from django.urls import reverse_lazy
from .models import Employee, Department

class EmployeeListView(ListView):
    """员工列表"""
    model = Employee
    template_name = 'employees/employee_list.html'
    context_object_name = 'employees'
    paginate_by = 20

    def get_queryset(self):
        qs = super().get_queryset().select_related('department')
        dept = self.request.GET.get('department')
        if dept:
            qs = qs.filter(department__code=dept)
        return qs


class EmployeeDetailView(DetailView):
    """员工详情"""
    model = Employee
    template_name = 'employees/employee_detail.html'
    context_object_name = 'employee'


class EmployeeCreateView(CreateView):
    """添加员工"""
    model = Employee
    template_name = 'employees/employee_form.html'
    fields = ['name', 'employee_id', 'department', 'position', 'salary', 'gender', 'hire_date']
    success_url = reverse_lazy('employee_list')
` },
  ],
  milestones: [
    { id: 'm1', label: '模型设计', description: '定义 Department 和 Employee 模型', hint: 'ForeignKey 建立关联，related_name 方便反向查询' },
    { id: 'm2', label: 'Admin 配置', description: '自定义 Django Admin', hint: 'list_display, list_filter, search_fields' },
    { id: 'm3', label: 'CBV 视图', description: '用 ListView/DetailView/CreateView', hint: 'CBV 减少重复代码，select_related 优化查询' },
    { id: 'm4', label: '部署准备', description: '配置生产环境', hint: 'settings.py 拆分，collectstatic，Gunicorn' },
  ],
  knowledgeBase: `Django 全栈教学项目。
关键知识：Django ORM、MTV 模式、Class-Based Views、Admin 定制。
教学生理解 Django 的" batteries included" 哲学——自带认证、Admin、ORM。`,
};

// ─── 汇总导出 ──────────────────────────────────────────

export const ALL_PROJECTS: Record<string, ProjectDef> = {
  'p1-cli-todo': p1TsTodo,
  'p2-type-utils': p2TsTypes,
  'p3-express-api': p3TsExpress,
  'p4-dashboard': p4TsDashboard,
  'p5-react-blog': p5TsReact,
  'p6-fullstack-notes': p6TsFullstack,
  'p1-cli-memo': p1PyMemo,
  'p2-log-analyzer': p2PyLog,
  'p3-price-monitor': p3PyMonitor,
  'p4-blog': p4PyBlog,
  'p5-snake-game': p5PySnake,
  'p6-django-manager': p6PyDjango,
};

export function getProjectsByCourse(courseId: CourseId): ProjectDef[] {
  return Object.values(ALL_PROJECTS).filter(p => p.courseId === courseId);
}

export function getProject(id: string): ProjectDef | undefined {
  return ALL_PROJECTS[id];
}
