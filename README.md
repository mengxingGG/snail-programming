# 🐌 蜗牛编程

> TypeScript 初级到全栈的桌面学习应用 — Electron + React + SQLite

22 章 · 96 节 · 66 道练习题 · 内置 AI 助教

---

## 功能

- **边学边写**：概念卡片 + Monaco 编辑器 + 实时运行，写完 3-10 行代码即时验证
- **完整路线**：TypeScript 基础 → Node.js 后端 → React 前端 → 全栈实战
- **章节考试**：选择、填空、编程三种题型，通过才解锁下一章
- **学习进度**：本地 SQLite 存储，重启不丢失
- **AI 助教**：OpenAI 兼容接口，支持代码审查、概念解释、方向性提示；只读学生数据，不写编辑器

---

## 快速开始

**环境要求**：Node.js ≥ 18，npm ≥ 9

```bash
# 安装依赖
npm install

# 开发模式（Vite + Electron 热重载）
npm run dev

# 类型检查
npm run typecheck

# 生产构建
npm run build

# 打包安装包（win: .exe / mac: .dmg / linux: .AppImage）
npm run electron:build
```

---

## AI 助教配置

AI 助教默认关闭，支持任何 OpenAI 兼容的服务。

启动应用 → 右上角 **⚙️ 设置** → **AI 助教** → 填写配置后保存并开启。

| 服务 | API 地址 | 模型示例 |
|------|----------|----------|
| OpenAI | `https://api.openai.com/v1` | `gpt-4o-mini` |
| DeepSeek | `https://api.deepseek.com/v1` | `deepseek-chat` |
| Ollama（本地） | `http://localhost:11434/v1` | `qwen2.5:7b` |

配置文件存储在系统 userData 目录（`ai-config.json`），密钥不上传任何服务器。

> **设计原则**：当前版本 AI 只能读取学生代码和课程内容，输出纯文本建议。未来版本可扩展为允许 AI 直接修改编辑器。

---

## 架构

```
Electron 三进程分层
┌─────────────────────────────┐
│  渲染进程 (React + Zustand)  │
│  window.snailAPI.*          │
├──────── contextBridge ──────┤
│  预加载层 (preload/index.ts) │
│  ipcRenderer.invoke()       │
├──────────── IPC ────────────┤
│  主进程 (main/)              │
│  ├─ services/auth/          │
│  ├─ services/runner/        │  esbuild 编译 → Node 执行
│  ├─ services/progress/      │  SQLite CRUD
│  ├─ services/exam/          │
│  └─ services/ai/            │  OpenAI 兼容 HTTP
└─────────────────────────────┘
```

渲染进程无法直接访问 Node.js API，必须通过 `snailAPI` → IPC 通信。

课程内容（22 章 96 节）定义在 `src/shared/course-data/`，纯静态 TypeScript 数据，无网络依赖。

---

## 目录结构

```
src/
├── main/           Electron 主进程入口
├── preload/        contextBridge 桥接（API 白名单）
├── services/       业务服务（仅主进程）
│   ├── ai/         AI 助教客户端
│   ├── auth/       注册/登录/会话
│   ├── database/   SQLite 初始化与迁移
│   ├── exam/       考试出题与评分
│   ├── progress/   进度与代码文件存储
│   └── runner/     TypeScript 编译执行
├── renderer/       React 前端
│   ├── components/ 
│   ├── hooks/      
│   ├── pages/      
│   ├── stores/     Zustand (auth / course / ui)
│   └── theme/      暗色主题常量
└── shared/         主进程与渲染进程共用
    ├── course-data/ 96 节课程内容（part1~part6 + exams）
    └── types/       TypeScript 类型定义
```

---

## 文档

详细设计文档见 [`docs/`](docs/)：

- [`docs/README.md`](docs/README.md) — 模块清单与开发顺序
- [`docs/TypeScript学习路线.md`](docs/TypeScript学习路线.md) — 完整课程大纲
- [`docs/modules/`](docs/modules/) — 各模块规格（M01–M13）

---

*Electron · React · TypeScript · SQLite · Monaco · esbuild*
