/**
 * event-system.ts — 类型安全的事件系统
 *
 * 所属项目：p2-type-utils
 *
 * 功能说明：
 * 实现一个泛型 TypedEmitter 类，提供类型安全的事件发布-订阅机制。
 * 事件名称及其对应的参数类型在编译期确定，避免运行时类型错误。
 *
 * 你需要实现：
 * 1. 定义 EventMap 类型：事件名 → 参数类型的映射（例如 { click: [x: number, y: number]; load: [] }）
 * 2. TypedEmitter<T extends EventMap> 泛型类：
 *    - private events: Map<keyof T, Array<(...args: any[]) => void>>
 *    - on<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void
 *      注册事件监听器，listener 参数类型与事件严格匹配
 *    - off<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void
 *      移除事件监听器
 *    - emit<K extends keyof T>(event: K, ...args: T[K]): void
 *      触发事件，传参类型与事件严格匹配
 *    - once<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void
 *      注册一次性监听器
 *    - removeAllListeners(event?: keyof T): void
 *      移除指定事件的所有监听器（不传参则移除全部）
 *
 * 相关文件：
 * - utilities.ts：可配合工具类型使用
 * - tsconfig.json：strict 模式验证类型安全
 *
 * 运行方式：
 * 此文件可被其他模块导入使用。类型正确性通过 tsc --noEmit 验证。
 * 末尾的示例代码展示了如何使用 TypedEmitter。
 *
 * 关键 API：
 * - TypeScript Generics：泛型类与约束
 * - keyof：索引类型查询
 * - Mapped types：事件映射
 */

// TODO: 定义 EventMap 基础类型
// type EventMap = Record<string, any[]>;

// TODO: 实现 TypedEmitter 泛型类
// class TypedEmitter<T extends EventMap> {
//   private events: Map<keyof T, Array<(...args: any[]) => void>>;
//
//   constructor() { ... }
//   on<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void { ... }
//   off<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void { ... }
//   emit<K extends keyof T>(event: K, ...args: T[K]): void { ... }
//   once<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void { ... }
//   removeAllListeners(event?: keyof T): void { ... }
// }


// ==============================================================
// 使用示例（取消注释验证类型安全）
// ==============================================================

// interface MyEvents {
//   click: [x: number, y: number];
//   load: [];
//   error: [message: string, code: number];
// }
//
// const emitter = new TypedEmitter<MyEvents>();
//
// emitter.on('click', (x, y) => {
//   console.log(`Clicked at (${x}, ${y})`);
//   // x 和 y 自动推断为 number
// });
//
// emitter.emit('click', 10, 20);     // ✅ OK
// emitter.emit('click', 'a', 'b');   // ❌ 类型错误：参数应为 number
// emitter.emit('load');              // ✅ OK
// emitter.emit('load', 123);         // ❌ 类型错误：不接受参数

export {};
