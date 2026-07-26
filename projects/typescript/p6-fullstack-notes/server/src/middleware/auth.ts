/**
 * auth.ts — JWT 认证中间件
 *
 * 所属项目：全栈在线笔记 (p6-fullstack-notes)
 *
 * 功能说明：
 * 从请求头 Authorization 提取 Bearer token，
 * 验证 JWT，将解析出的用户信息注入 req.user。
 * 如果 token 无效或过期，返回 401。
 *
 * 你需要实现：
 * 1. 从 req.headers.authorization 提取 token
 * 2. 用 jsonwebtoken.verify() 验证
 * 3. 将 decoded 用户信息挂到 req.user
 * 4. 错误时返回 401 { error: 'Unauthorized' }
 *
 * 相关文件：
 * - server/src/index.ts：在此挂载到需要认证的路由
 *
 * 关键 API：
 * - jsonwebtoken.verify(token, secret)
 * - Express Request 类型扩展
 * - next() 传递控制权
 */

import { Request, Response, NextFunction } from 'express';
// TODO: import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

// 扩展 Express Request 类型
declare global {
  namespace Express {
    interface Request {
      user?: { id: number; username: string };
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  // TODO: 从 Authorization header 提取 token
  // TODO: 验证 JWT，提取用户信息
  // TODO: 注入 req.user
  // TODO: 出错返回 401
  next();
}
