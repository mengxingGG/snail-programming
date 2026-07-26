# p2-type-utils — TypeScript 类型工具库

## 功能列表
- `DeepReadonly<T>` — 递归将所有属性变为 readonly
- `PickByValue<T, ValueType>` — 挑选值类型匹配的属性
- `MyReturnType<T>` — 提取函数返回值类型（不用 built-in ReturnType）
- `MyParameters<T>` — 提取函数参数类型（不用 built-in Parameters）
- `TypedEmitter` — 类型安全的事件发射器泛型类

## 学习目标
- 映射类型（Mapped Types）
- 条件类型（Conditional Types）
- `infer` 关键字
- 模板字面量类型
- 泛型约束

## 项目结构
```
p2-type-utils/
├── README.md           ← 你在这里
├── tsconfig.json       ← TypeScript 配置
└── src/
    ├── utilities.ts    ← 工具类型实现
    └── event-system.ts ← 类型安全事件系统
```

## 如何验证
```bash
# 只做类型检查，不生成输出文件
npx tsc --noEmit
```
