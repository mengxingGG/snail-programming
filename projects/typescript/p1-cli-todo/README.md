# p1-cli-todo — CLI 待办事项

## 功能列表
- 添加待办事项（标题 + 优先级）
- 列出所有待办事项（含完成状态）
- 标记事项为已完成
- 删除待办事项

## 学习目标
- TypeScript 基础类型与接口定义
- Node.js 文件 I/O（fs 模块）
- 命令行交互（readline）
- JSON 数据持久化

## 项目结构
```
p1-cli-todo/
├── README.md       ← 你在这里
├── package.json    ← 项目配置与依赖
├── tsconfig.json   ← TypeScript 编译配置
└── src/
    ├── types.ts    ← 类型定义
    └── todo.ts     ← 主程序
```

## 如何运行
```bash
# 安装依赖
npm install
# 运行
npx ts-node src/todo.ts
```
