/**
 * types.ts — 待办事项类型定义
 *
 * 所属项目：p1-cli-todo
 *
 * 功能说明：
 * 定义 Todo 接口，作为整个项目的数据模型基础。
 * 所有对 todo 的读写操作都依赖于这个接口定义。
 *
 * 你需要实现：
 * 1. 定义 Todo interface，包含以下字段：
 *    - id: number（唯一标识）
 *    - title: string（标题）
 *    - priority: 'low' | 'medium' | 'high'（优先级）
 *    - done: boolean（是否完成）
 *    - createdAt: string（ISO 日期字符串）
 * 2. 使用 export 导出 Todo 接口
 *
 * 相关文件：
 * - todo.ts：导入 Todo 类型，用于类型标注和数据操作
 *
 * 运行方式：
 * 此文件仅包含类型定义，由 todo.ts 引用，无需单独运行。
 *
 * 关键 API：
 * - TypeScript interface：类型定义
 * - Union types：字符串字面量联合类型
 */

// TODO: 定义并导出 Todo interface
// interface Todo {
//   id: number;
//   title: string;
//   priority: 'low' | 'medium' | 'high';
//   done: boolean;
//   createdAt: string;
// }
