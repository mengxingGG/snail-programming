/**
 * utilities.ts — TypeScript 工具类型实现
 *
 * 所属项目：p2-type-utils
 *
 * 功能说明：
 * 实现常用的高级 TypeScript 工具类型，加深对类型系统的理解。
 * 每个类型都附带测试用例（注释形式），可通过 tsc --noEmit 验证。
 *
 * 你需要实现：
 * 1. DeepReadonly<T> — 递归版本 Readonly，将所有嵌套属性也标记为 readonly
 * 2. PickByValue<T, ValueType> — 从 T 中挑选值类型可赋值给 ValueType 的属性
 * 3. MyReturnType<T> — 使用 infer 提取函数类型的返回值类型
 * 4. MyParameters<T> — 使用 infer 提取函数类型的参数元组类型
 * 5. NonNullable<T> — 从 T 中排除 null 和 undefined
 * 6. ReadonlyKeys<T> — 提取 T 中所有 readonly 键的联合类型
 *
 * 相关文件：
 * - event-system.ts：使用这些工具类型构建类型安全事件系统
 * - tsconfig.json：strict 模式编译配置
 *
 * 运行方式：
 * npx tsc --noEmit  （仅类型检查，不生成文件）
 *
 * 关键 API：
 * - keyof：索引类型查询
 * - extends：条件类型
 * - infer：类型推断
 * - keyof in：映射类型
 * - as：键重映射（TypeScript 4.1+）
 */

// ============================================================
// 1. DeepReadonly<T>
// 将对象类型的所有属性（递归地）标记为 readonly
// ============================================================

// TODO: 实现 DeepReadonly<T>
// type DeepReadonly<T> = ...

// 测试用例（取消注释验证）：
// type TestDeep = DeepReadonly<{ a: { b: { c: number } } }>;
// // 期望：{ readonly a: { readonly b: { readonly c: number } } }
// const obj: TestDeep = { a: { b: { c: 1 } } };
// obj.a.b.c = 2; // ❌ 应报错：Cannot assign to 'c' because it is a read-only property


// ============================================================
// 2. PickByValue<T, ValueType>
// 从 T 中挑选值类型能够赋值给 ValueType 的属性
// ============================================================

// TODO: 实现 PickByValue<T, ValueType>
// type PickByValue<T, ValueType> = ...

// 测试用例：
// type OnlyStrings = PickByValue<{ a: string; b: number; c: string; d: boolean }, string>;
// // 期望：{ a: string; c: string }


// ============================================================
// 3. MyReturnType<T>
// 使用 infer 提取函数类型的返回值类型（不借助内置 ReturnType）
// ============================================================

// TODO: 实现 MyReturnType<T>
// type MyReturnType<T> = ...

// 测试用例：
// type R1 = MyReturnType<() => string>;           // 期望：string
// type R2 = MyReturnType<(x: number) => boolean>; // 期望：boolean
// type R3 = MyReturnType<typeof Math.max>;         // 期望：number


// ============================================================
// 4. MyParameters<T>
// 使用 infer 提取函数类型的参数元组类型（不借助内置 Parameters）
// ============================================================

// TODO: 实现 MyParameters<T>
// type MyParameters<T> = ...

// 测试用例：
// type P1 = MyParameters<(a: string, b: number) => void>; // 期望：[string, number]
// type P2 = MyParameters<() => void>;                      // 期望：[]


// ============================================================
// 5. NonNullable<T>
// 从联合类型 T 中排除 null 和 undefined
// ============================================================

// TODO: 实现 NonNullable<T>
// type NonNullable<T> = ...

// 测试用例：
// type T1 = NonNullable<string | null | undefined>; // 期望：string


// ============================================================
// 6. ReadonlyKeys<T>
// 提取 T 中所有 readonly 属性的键名联合类型
// ============================================================

// TODO: 实现 ReadonlyKeys<T>
// type ReadonlyKeys<T> = ...

// 测试用例：
// interface Todo {
//   readonly id: number;
//   title: string;
//   readonly createdAt: string;
// }
// type RK = ReadonlyKeys<Todo>; // 期望：'id' | 'createdAt'
