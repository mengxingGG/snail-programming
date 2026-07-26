/**
 * server.ts — Express 应用入口
 *
 * 所属项目：p3-express-api
 *
 * 功能说明：
 * 创建 Express 应用实例，配置中间件、挂载路由、全局错误处理，
 * 并启动 HTTP 服务器监听指定端口。
 *
 * 你需要实现：
 * 1. 创建 Express app 实例
 * 2. 挂载中间件：
 *    - express.json() — 解析 JSON 请求体
 *    - 请求日志中间件（打印 method + url + 时间戳）
 * 3. 挂载路由：
 *    - /api/items → itemsRouter（从 routes/items.ts 导入）
 * 4. 404 处理：对未匹配的路由返回 { error: 'Not Found' }
 * 5. 全局错误处理中间件（4 参数形式）：
 *    - 打印错误堆栈
 *    - 返回 500 { error: 'Internal Server Error' }
 * 6. 调用 initDatabase() 初始化数据库
 * 7. app.listen(port, callback) 启动服务器
 *    - 端口从环境变量 PORT 或默认 3000
 *
 * 相关文件：
 * - db.ts：initDatabase()
 * - routes/items.ts：itemsRouter
 * - package.json：依赖定义
 *
 * 运行方式：
 * npx ts-node src/server.ts
 * 服务运行在 http://localhost:3000
 *
 * 关键 API：
 * - express：Web 框架
 */

import express, { Request, Response, NextFunction } from 'express';
import { initDatabase } from './db';
// TODO: 导入路由
// import { itemsRouter } from './routes/items';

const app = express();
const PORT = process.env.PORT || 3000;

// TODO: 挂载中间件
// - express.json()
// - 请求日志

// TODO: 挂载路由
// app.use('/api/items', itemsRouter);

// TODO: 404 处理

// TODO: 全局错误处理中间件

// 初始化数据库并启动服务器
initDatabase();

// TODO: 启动监听
// app.listen(PORT, () => { ... });

export default app;
