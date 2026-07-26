# 🐌 蜗牛编程

> 从零基础到全栈的桌面学习应用 — Electron + React + SQLite

两条学习路线，共 78 章 · 356 节 · 225 道题 · 12 个实战项目 · 内置 AI 助教

| 路线 | 章节 | 小节 | 题目 |
|------|------|------|------|
| TypeScript | 34 | 158 | 93 |
| Python | 44 | 198 | 132 |

---

## 功能

- **边学边写**：概念卡片 + Monaco 编辑器 + 实时运行，写完 3-10 行代码即时验证
- **两条路线**：
  - TypeScript：语言基础 → 类型进阶 → Node.js 后端 → 前端 → React → 全栈实战
  - Python：语言基础 → 进阶特性 → 爬虫 → Web 开发 → 高级主题
- **演示节与练习节分开判定**：起始代码原样跑通的节标记为「演示」，提示你动手改；
  标记为练习的节必须代码有实质改动且输出匹配才算通过，不会点一下运行就算完成
- **章节考试**：选择题与填空题（编程题类型已支持并会真正执行代码，但目前题库中仅 1 道）。
  题量少于 5 题时允许错 1 题，否则按 70% 划线
- **学习进度**：本地 SQLite 存储，重启不丢失
- **AI 助教**：OpenAI 兼容接口，支持代码审查、概念解释、方向性提示；只读学生数据，不写编辑器

> 说明：章节之间目前**不做解锁门禁**，任何章节都可以直接进入学习。考试结果只作记录与反馈。

---

## 快速开始

**环境要求**：Node.js ≥ 22.12，npm ≥ 10
（better-sqlite3 要求 Node ≥ 22，Electron 43 要求 ≥ 22.12）

`better-sqlite3` 是原生模块，需要本机具备 C++ 构建工具链，否则 `npm install` 会以 `node-gyp` 报错结束：

| 平台 | 需要安装 |
|------|----------|
| Windows | [Visual Studio 生成工具](https://visualstudio.microsoft.com/downloads/)，勾选「使用 C++ 的桌面开发」 |
| macOS | `xcode-select --install` |
| Linux | `build-essential` 与 `python3` |

```bash
# 安装依赖
npm install

# 切换 Electron 版本后重建原生模块（better-sqlite3 13 起走 N-API，通常无需手动执行）
npm run rebuild:native

# 开发模式（Vite + Electron 热重载）
npm run dev

# 类型检查 + Lint + 单元测试
npm run verify

# 生产依赖漏洞闸门（已评估豁免项见 scripts/audit-gate.mjs）
npm run audit:prod

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

配置存储在系统 userData 目录（`ai-config.json`），密钥不上传任何服务器。
密钥由 Electron `safeStorage` 交给系统钥匙串加密后落盘（Windows DPAPI / macOS Keychain / Linux libsecret），
不以明文写入文件；旧版本留下的明文密钥会在首次读取时自动迁移。
若系统没有可用的钥匙串后端，会退回明文保存并在设置页明确提示。

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
渲染进程不允许导航到外部站点，外部链接只接受 http/https 并交给系统浏览器打开。

课程内容定义在 `src/shared/course-data/`（TypeScript）与 `src/shared/course-data-python/`（Python），
纯静态 TypeScript 数据，无网络依赖。`src/shared/course-content.test.ts` 会对教材做结构体检
（ID 重复、选项与答案不一致、校验正则无法编译等），随 `npm test` 一起运行。

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
    ├── course-data/        TypeScript 路线（part1~part6 + exams）
    ├── course-data-python/ Python 路线（part1~part5 + exams）
    ├── projects-data/      实战项目清单
    ├── url-safety.ts       外部链接协议白名单
    └── types/              TypeScript 类型定义
```

---

## 文档

- [`COURSE_AUTHORING.md`](COURSE_AUTHORING.md) — 课程内容改造指南（演示节 → 练习节、编程题题库、验收标准）

详细设计文档见 [`docs/`](docs/)：

- [`docs/README.md`](docs/README.md) — 模块清单与开发顺序
- [`docs/TypeScript学习路线.md`](docs/TypeScript学习路线.md) — 完整课程大纲
- [`docs/modules/`](docs/modules/) — 各模块规格（M01–M13）

---

*Electron · React · TypeScript · SQLite · Monaco · esbuild*
