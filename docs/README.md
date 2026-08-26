# 🐌 蜗牛编程 — 开发主控文档

> Electron 桌面应用 | React + TypeScript | SQLite 本地存储 | Monaco 编辑器 | esbuild 实时编译

---

## 架构设计

### 分层结构

```
┌─────────────────────────────────────────────────┐
│           渲染进程 (Renderer)                     │
│  React App → 页面 → 组件 → Hooks → Stores        │
│  [Chrome DevTools / 热重载]                       │
├─────────────────────────────────────────────────┤
│          预加载桥接 (Preload)                      │
│  contextBridge → snailAPI → ipcRenderer.invoke   │
├─────────────────────────────────────────────────┤
│           主进程 (Main)                            │
│  Electron窗口 / IPC处理器 / 服务层                 │
│  ┌──────────┬──────────┬──────────┬───────────┐ │
│  │ 账号服务  │ 进度存储  │ 代码执行  │ 考试验证  │ │
│  └──────────┴──────────┴──────────┴───────────┘ │
│               │                                  │
│          SQLite (better-sqlite3)                 │
└─────────────────────────────────────────────────┘
```

### 数据流

```
用户写代码 → CodeEditor组件 → snailAPI.runner.run()
  → IPC → 主进程 Runner服务 → esbuild编译 → Node执行
  → 捕获输出 → IPC返回 → Console组件显示
  → 与expectedOutput比对 → ✅/❌ 验证
```

---

## 模块清单

| 编号 | 模块名 | 职责 | 依赖 | 预估行 | 优先级 | 状态 |
|------|--------|------|------|:---:|:---:|:---:|
| M01 | Electron主进程 | 窗口管理、IPC枢纽、生命周期 | 无 | 200 | P0 | ⏳ |
| M02 | 数据库初始化 | SQLite建表、迁移、连接管理 | 无 | 120 | P0 | ⏳ |
| M03 | 账号服务 | 注册、登录、密码哈希、会话 | M02 | 180 | P0 | ⏳ |
| M04 | 进度存储 | 学习进度CRUD、代码文件存储 | M02 | 150 | P0 | ⏳ |
| M05 | 代码执行服务 | TS编译(esbuild)、沙箱执行、输出验证 | 无 | 180 | P0 | ⏳ |
| M06 | 考试验证服务 | 出题、答案比对、评分 | M02 | 150 | P1 | ⏳ |
| M07 | 应用壳与路由 | 布局框架、HashRouter、主题系统 | 无 | 150 | P0 | ⏳ |
| M08 | 侧边栏导航 | 章节树渲染、进度图标、折叠 | M07 | 200 | P0 | ⏳ |
| M09 | 学习工作台 | 概念卡片+Monaco编辑器+Console | M05 M07 M08 | 400 | P0 | ⏳ |
| M10 | 考试界面 | 选择题/填空题/编程题三种题型 | M06 M07 | 250 | P1 | ⏳ |
| M11 | 账户页面 | 登录/注册表单、个人信息 | M03 M07 | 200 | P0 | ⏳ |
| M12 | AI助教接口 | OpenAI兼容API客户端（预留） | 无 | 100 | P2 | ⏳ |
| M13 | 课程数据模块 | 22章96节教学内容+66道考题 | 类型定义 | 7300 | P0 | ✅ |

---

## 依赖关系

```
M02(数据库) ──→ M03(账号)
            ──→ M04(进度)
            ──→ M06(考试)

M05(代码执行) ──→ M09(学习工作台)

M07(应用壳) ──→ M08(导航)
           ──→ M09(工作台)
           ──→ M10(考试)
           ──→ M11(账户)

M03 ──→ M11(账户页需要账号服务)
```

---

## 开发顺序

### Phase 1：基础设施（先跑通 Electron 空壳）🔴 最高优先级
```
M01 → M02 → M07
```
目标：Electron 窗口能启动，SQLite 能初始化，React 页面能渲染。

### Phase 2：核心功能 🔴
```
M03 → M05 → M04 → M09 → M11
```
目标：能注册登录、能写代码并运行、能保存进度——核心闭环。

### Phase 3：学习体验 🟡
```
M08 → M06 → M10
```
目标：侧边栏导航可用、章节考试可用——完整学习体验。

### Phase 4：增强 🟢
```
M12（AI助教预留接口）
```

### Phase 5：课程数据 ✅
```
M13 → 内容填充完成（本地模型）
→ 8 个文件，7300+ 行，96 节 + 66 题
```

---

## 目录结构

```
snail-programming/
├── docs/                          # 开发文档
│   ├── README.md                  # ← 本文件
│   ├── modules/                   # 模块子文档
│   │   ├── M01-Electron主进程.md
│   │   ├── M02-数据库初始化.md
│   │   ├── M03-账号服务.md
│   │   ├── M04-进度存储.md
│   │   ├── M05-代码执行服务.md
│   │   ├── M06-考试验证服务.md
│   │   ├── M07-应用壳与路由.md
│   │   ├── M08-侧边栏导航.md
│   │   ├── M09-学习工作台.md
│   │   ├── M10-考试界面.md
│   │   ├── M11-账户页面.md
│   │   └── M12-AI助教接口.md
│   ├── 分层协作开发流水线.md
│   ├── 教学书籍研究.md
│   └── TypeScript学习路线.md
├── src/
│   ├── main/                      # Electron 主进程
│   ├── preload/                   # 预加载桥接
│   ├── services/                  # 服务层
│   │   ├── database/
│   │   ├── auth/
│   │   ├── progress/
│   │   ├── runner/
│   │   └── exam/
│   ├── renderer/                  # React 前端
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── stores/
│   │   └── styles/
│   └── shared/types/
├── scripts/
│   └── init-src.js
├── package.json                   # ← 需创建
├── tsconfig.json                  # ← 需创建
├── electron-builder.json          # ← 需创建
└── vite.config.ts                 # ← 需创建
```

---

## 技术栈

| 层级 | 技术 | 版本要求 |
|------|------|---------|
| 桌面框架 | Electron | ≥ 28 |
| 前端框架 | React | 18 |
| 路由 | react-router-dom | 6 (HashRouter) |
| 编辑器 | monaco-editor | latest |
| 打包 | Vite | 5 (主进程+渲染进程) |
| TS编译 | esbuild | latest |
| 数据库 | better-sqlite3 | latest |
| 状态管理 | Zustand | 4 |
| 语言 | TypeScript | 5.x |

---

## 包依赖

```json
{
  "dependencies": {
    "better-sqlite3": "^11.0.0",
    "esbuild": "^0.20.0"
  },
  "devDependencies": {
    "electron": "^28.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "monaco-editor": "^0.44.0",
    "zustand": "^4.4.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "vite-plugin-electron": "^0.28.0",
    "electron-builder": "^24.0.0"
  }
}
```

---

## 子文档索引

- [M01 - Electron主进程](./modules/M01-Electron主进程.md)
- [M02 - 数据库初始化](./modules/M02-数据库初始化.md)
- [M03 - 账号服务](./modules/M03-账号服务.md)
- [M04 - 进度存储](./modules/M04-进度存储.md)
- [M05 - 代码执行服务](./modules/M05-代码执行服务.md)
- [M06 - 考试验证服务](./modules/M06-考试验证服务.md)
- [M07 - 应用壳与路由](./modules/M07-应用壳与路由.md)
- [M08 - 侧边栏导航](./modules/M08-侧边栏导航.md)
- [M09 - 学习工作台](./modules/M09-学习工作台.md)
- [M10 - 考试界面](./modules/M10-考试界面.md)
- [M11 - 账户页面](./modules/M11-账户页面.md)
- [M12 - AI助教接口](./modules/M12-AI助教接口.md)

---

*创建日期：2026-06-26 | 基于分层协作开发流水线方法*
