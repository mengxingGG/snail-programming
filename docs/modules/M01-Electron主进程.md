# M01 - Electron 主进程

## 基本信息
- **职责**：Electron 应用入口，窗口创建与管理，IPC 通信枢纽，应用生命周期控制
- **依赖**：无（基础设施层最底层）
- **被依赖方**：所有其他模块
- **预估代码量**：200 行

## 文件清单

| 文件路径 | 用途 |
|---------|------|
| src/main/index.ts | Electron 入口，启动流程编排 |
| src/main/window.ts | BrowserWindow 创建与配置 |
| src/main/menu.ts | 应用菜单（初期隐藏） |
| src/main/ipc.ts | IPC 处理器注册中心 |

## 对外接口

```typescript
// 无对外接口 — 主进程是入口，通过 IPC 暴露功能
// 模块通过 ipcMain.handle() 注册处理器
// 渲染进程通过 preload 暴露的 snailAPI 调用
```

## 内部数据结构

```typescript
// IPC 注册表
interface IpcHandlerEntry {
  channel: string;
  handler: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any;
}
```

## 函数实现清单

| 函数名 | 签名 | 职责 | 预估行数 |
|--------|------|------|:---:|
| main | app.whenReady → | 启动流程：初始化DB → 注册IPC → 创建窗口 | 15 |
| createWindow | () => BrowserWindow | 创建主窗口，配置尺寸/预加载/安全策略 | 20 |
| setupMenu | () => void | 设置应用菜单（初期隐藏） | 5 |
| registerIpcHandlers | () => void | 调用各模块的注册函数，统一注册 IPC 处理器 | 10 |

## 关键逻辑伪代码

```typescript
// function main():
//   1. app.whenReady() 后执行：
//      a. await initDatabase()          // M02
//      b. registerIpcHandlers()         // 本模块
//      c. setupMenu()                   // 本模块
//      d. createWindow()                // 本模块
//   2. app.on('window-all-closed') → mac 外 quit()

// function createWindow():
//   1. new BrowserWindow({ width:1400, height:900, minWidth:1100, minHeight:700 })
//   2. webPreferences: { preload, contextIsolation:true, nodeIntegration:false }
//   3. backgroundColor: '#1a1e2b' (避免白屏闪烁)
//   4. 开发模式 loadURL('http://localhost:5173') vs 生产 loadFile('index.html')
//   5. 返回窗口实例

// function registerIpcHandlers():
//   1. import 各服务的 register 函数
//   2. 依次调用 registerAuthHandlers(), registerProgressHandlers() 等
//   3. 如果某个注册失败 → console.error 但不阻塞启动
```

## 错误处理

| 错误场景 | 处理方式 |
|---------|---------|
| 数据库初始化失败 | 弹窗提示错误，阻止应用继续启动 |
| IPC 注册冲突 | console.error 记录，不阻塞 |
| 窗口创建失败 | 捕获异常，弹窗 + app.quit() |
| preload 脚本加载失败 | BrowserWindow 创建失败 → 同窗口创建失败处理 |

## 开发状态
- **状态**：✅ 已完成
- **实现文件**：
  - `src/main/index.ts` — 启动流程编排，DB 初始化 → 注册 IPC → 创建窗口
  - `src/main/window.ts` — BrowserWindow 创建与配置，含错误处理和安全策略
  - `src/main/menu.ts` — 应用菜单（开发模式完整菜单，生产模式简约菜单）
  - `src/main/ipc.ts` — IPC 处理器注册中心，模块桩函数就绪
- **开发者备注**：
  - 数据库初始化 `initDatabase()` 为 M02 接入前的桩函数
  - 各模块 IPC 处理器（Auth/Progress/Code/Exam）为桩函数，待对应模块实现
  - 内置 IPC 处理器包括：about-snail、get-version、get-preload-script-path
- **提交时间**：2025 年 7 月
