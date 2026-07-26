/**
 * db.ts — SQLite 数据库初始化与操作
 *
 * 所属项目：p3-express-api
 *
 * 功能说明：
 * 使用 better-sqlite3 管理 SQLite 数据库。在应用启动时创建表结构，
 * 并提供项目的 CRUD 操作函数供路由层调用。
 *
 * 你需要实现：
 * 1. initDatabase() — 创建 items 表（如果不存在）
 *    CREATE TABLE IF NOT EXISTS items (
 *      id INTEGER PRIMARY KEY AUTOINCREMENT,
 *      name TEXT NOT NULL,
 *      description TEXT DEFAULT '',
 *      price REAL NOT NULL DEFAULT 0,
 *      createdAt TEXT NOT NULL
 *    );
 * 2. getAllItems(): Item[] — 查询所有项目
 * 3. getItemById(id: number): Item | undefined — 按 id 查询单个项目
 * 4. createItem(item: Omit<Item, 'id' | 'createdAt'>): Item — 插入新项目并返回
 * 5. updateItem(id: number, item: Partial<Omit<Item, 'id' | 'createdAt'>>): Item | undefined — 更新并返回
 * 6. deleteItem(id: number): boolean — 删除项目，返回是否成功
 * 7. Item 接口定义（导出供路由使用）
 *
 * 相关文件：
 * - server.ts：调用 initDatabase() 初始化
 * - routes/items.ts：使用这些函数处理请求
 *
 * 运行方式：
 * 此文件由 server.ts 导入，随应用一起启动。数据库文件 data.db 自动创建。
 *
 * 关键 API：
 * - better-sqlite3：同步 SQLite 驱动
 * - Node.js path：数据库文件路径
 */

import Database from 'better-sqlite3';
import * as path from 'path';

// TODO: 定义并导出 Item 接口
// export interface Item {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   createdAt: string;
// }

// 数据库文件路径
const DB_PATH = path.join(__dirname, '..', 'data.db');

// 数据库连接（惰性初始化）
let db: Database.Database;


/**
 * 初始化数据库连接和表结构。
 * 在应用启动时调用一次。
 */
export function initDatabase(): void {
    // TODO: 创建 Database 实例
    // TODO: 执行 CREATE TABLE IF NOT EXISTS 语句
}


/**
 * 获取所有项目。
 */
export function getAllItems(): any[] /* TODO: Item[] */ {
    // TODO: db.prepare('SELECT * FROM items').all()
    return [];
}


/**
 * 按 id 获取单个项目。
 */
export function getItemById(id: number): any | undefined /* TODO: Item | undefined */ {
    // TODO: db.prepare('SELECT * FROM items WHERE id = ?').get(id)
    return undefined;
}


/**
 * 创建新项目。
 * @param item 不包含 id 和 createdAt 的项目数据
 * @returns 包含 id 和 createdAt 的完整项目
 */
export function createItem(item: { name: string; description?: string; price?: number }): any /* TODO: Item */ {
    // TODO: 生成 createdAt → INSERT → 查询并返回新记录
    return {} as any;
}


/**
 * 更新项目（部分更新）。
 * @param id 项目 id
 * @param updates 要更新的字段（可空）
 * @returns 更新后的完整项目，不存在返回 undefined
 */
export function updateItem(id: number, updates: { name?: string; description?: string; price?: number }): any | undefined /* TODO: Item | undefined */ {
    // TODO: 动态构建 UPDATE 语句 → 执行 → 查询并返回
    return undefined;
}


/**
 * 删除项目。
 * @returns 是否成功删除（影响了至少一行）
 */
export function deleteItem(id: number): boolean {
    // TODO: db.prepare('DELETE FROM items WHERE id = ?').run(id)
    return false;
}
