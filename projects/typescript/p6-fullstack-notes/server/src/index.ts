/**
 * index.ts — Express 后端入口
 *
 * 所属项目：全栈在线笔记 (p6-fullstack-notes)
 *
 * 功能说明：
 * 创建 Express 应用，配置 CORS、JSON 中间件，
 * 挂载 auth 和 notes 路由，监听 4000 端口。
 *
 * 你需要实现：
 * 1. 导入 express, cors, authRouter, notesRouter
 * 2. app.use(cors()) 允许跨域
 * 3. app.use(express.json()) 解析 JSON body
 * 4. 挂载路由：/api/auth, /api/notes
 * 5. app.listen(4000)
 *
 * 相关文件：
 * - middleware/auth.ts：JWT 认证中间件
 * - client/src/App.tsx：前端调用此 API
 *
 * 运行方式：
 * cd server && npx ts-node src/index.ts
 *
 * 关键 API：
 * - express()：创建应用
 * - cors()：跨域中间件
 * - app.use()：挂载中间件和路由
 * - app.listen()：启动服务器
 */

import express from 'express';
import cors from 'cors';
// TODO: import { authRouter } from './routes/auth';
// TODO: import { notesRouter } from './routes/notes';

const app = express();

// TODO: 添加中间件
// app.use(cors());
// app.use(express.json());

// TODO: 挂载路由
// app.use('/api/auth', authRouter);
// app.use('/api/notes', notesRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
