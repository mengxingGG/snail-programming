/**
 * items.ts — /api/items 路由处理
 *
 * 所属项目：p3-express-api
 *
 * 功能说明：
 * 定义 /api/items 路径下的 RESTful 路由，处理项目的 CRUD 请求。
 * 每个路由调用 db.ts 中的对应函数，并进行基本的请求验证。
 *
 * 你需要实现：
 * 1. 创建 Express Router 实例（导出为 itemsRouter）
 * 2. GET / — 获取所有项目
 *    - 返回 { data: Item[] }
 * 3. GET /:id — 获取单个项目
 *    - 验证 id 参数 → 查询 → 找不到返回 404
 *    - 返回 { data: Item }
 * 4. POST / — 创建新项目
 *    - 验证请求体（name 必填，price 必填且 ≥ 0）
 *    - 验证失败返回 400 { error: '...' }
 *    - 成功返回 201 { data: Item }
 * 5. PUT /:id — 更新项目（部分更新）
 *    - 验证 id → 更新 → 找不到返回 404
 *    - 返回 { data: Item }
 * 6. DELETE /:id — 删除项目
 *    - 验证 id → 删除 → 找不到返回 404
 *    - 返回 { message: 'Deleted' }
 *
 * 相关文件：
 * - db.ts：getAllItems, getItemById, createItem, updateItem, deleteItem
 * - server.ts：挂载此 Router
 *
 * 运行方式：
 * 由 server.ts 导入并挂载，随应用一起运行。
 *
 * 关键 API：
 * - express.Router()：模块化路由
 */

import { Router, Request, Response } from 'express';
// TODO: 从 db.ts 导入操作函数
// import { getAllItems, getItemById, createItem, updateItem, deleteItem } from '../db';

export const itemsRouter = Router();

// TODO: GET / — 获取所有项目
itemsRouter.get('/', (_req: Request, res: Response) => {
    // const items = getAllItems();
    // res.json({ data: items });
    res.status(501).json({ error: 'Not implemented' });
});

// TODO: GET /:id — 获取单个项目
itemsRouter.get('/:id', (req: Request, res: Response) => {
    // 解析 req.params.id → 查询 → 找到返回 200，未找到 404
    res.status(501).json({ error: 'Not implemented' });
});

// TODO: POST / — 创建项目
itemsRouter.post('/', (req: Request, res: Response) => {
    // 验证 req.body.name 和 req.body.price → 创建 → 返回 201
    res.status(501).json({ error: 'Not implemented' });
});

// TODO: PUT /:id — 更新项目
itemsRouter.put('/:id', (req: Request, res: Response) => {
    // 解析 id → 更新 → 返回 200 或 404
    res.status(501).json({ error: 'Not implemented' });
});

// TODO: DELETE /:id — 删除项目
itemsRouter.delete('/:id', (req: Request, res: Response) => {
    // 解析 id → 删除 → 返回 200 或 404
    res.status(501).json({ error: 'Not implemented' });
});
