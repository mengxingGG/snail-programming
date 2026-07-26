/**
 * todo.ts — CLI 待办事项主程序
 *
 * 所属项目：p1-cli-todo
 *
 * 功能说明：
 * 基于命令行的待办事项管理工具。使用 JSON 文件持久化数据，
 * 通过 readline 接口与用户交互，支持添加、列出、完成、删除等操作。
 *
 * 你需要实现：
 * 1. loadTodos(): Todo[] — 从 todos.json 读取待办事项列表
 * 2. saveTodos(todos: Todo[]): void — 将列表保存到 todos.json
 * 3. addTodo(title: string, priority: Todo['priority']): void — 添加新事项
 * 4. listTodos(): void — 格式化打印所有事项
 * 5. markDone(id: number): void — 标记指定事项为已完成
 * 6. deleteTodo(id: number): void — 删除指定事项
 * 7. main(): void — 显示菜单并处理用户输入（readline 交互循环）
 *
 * 交互菜单：
 *   1. 添加待办事项
 *   2. 查看所有事项
 *   3. 标记完成
 *   4. 删除事项
 *   5. 退出
 *
 * 相关文件：
 * - types.ts：Todo 类型定义
 * - todos.json：数据持久化文件（自动创建）
 * - README.md：项目说明
 *
 * 运行方式：
 * npx ts-node src/todo.ts
 *
 * 关键 API：
 * - fs (Node.js)：文件读写
 * - readline (Node.js)：命令行交互
 * - path (Node.js)：路径处理
 */

import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
// TODO: 从 types.ts 导入 Todo 类型
// import { Todo } from './types';

const DATA_FILE = path.join(__dirname, '..', 'todos.json');


function loadTodos(): any[] /* TODO: 替换 any[] 为 Todo[] */ {
    /** 从 JSON 文件加载待办事项列表。
     * 文件不存在时返回空数组。
     */
    // TODO: fs.readFileSync 读取 → JSON.parse → 类型断言
    // 处理 ENOENT 错误（文件不存在）
    return [];
}


function saveTodos(todos: any[] /* Todo[] */): void {
    /** 将待办事项列表保存到 JSON 文件。 */
    // TODO: JSON.stringify(todos, null, 2) → fs.writeFileSync
}


function addTodo(title: string, priority: any /* TODO: Todo['priority'] */): void {
    /** 添加新的待办事项。
     * 自动生成自增 id 和 ISO 格式 createdAt。
     */
    // TODO: loadTodos → 生成新 Todo → push → saveTodos
}


function listTodos(): void {
    /** 打印所有待办事项的格式化列表。 */
    // TODO: loadTodos → 遍历打印（id, 状态标记, 标题, 优先级, 日期）
}


function markDone(id: number): void {
    /** 将指定 id 的事项标记为已完成。 */
    // TODO: loadTodos → 查找 → 设置 done = true → saveTodos
}


function deleteTodo(id: number): void {
    /** 删除指定 id 的事项。 */
    // TODO: loadTodos → 过滤掉目标项 → saveTodos
}


function main(): void {
    /** 程序入口：显示菜单，循环接受用户输入。
     * 使用 readline.createInterface 创建交互界面。
     */
    // TODO: 创建 readline interface
    // TODO: 显示菜单选项
    // TODO: 监听 'line' 事件，根据输入分发到对应函数
    // TODO: 输入 '5' 时关闭 interface 并退出
}

main();
