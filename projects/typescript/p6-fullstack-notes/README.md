# 全栈在线笔记

React + Express + Prisma + SQLite 全栈应用。

## 架构
```
p6-fullstack-notes/
├── server/          ← Express 后端 (port 4000)
│   └── src/
│       ├── index.ts
│       └── middleware/auth.ts
└── client/          ← React 前端 (port 5173)
    └── src/
        └── App.tsx
```

## 启动方式
```bash
# 后端
cd server && npm install && npm run dev
# 前端
cd client && npm install && npm run dev
```

## 学习目标
- 前后端分离架构
- JWT 认证流程
- Prisma ORM 使用
- CORS 跨域处理
