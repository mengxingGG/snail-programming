// monaco-editor 的测试替身
//
// monaco-editor 的 package.json 只声明了 module 字段（没有 main / exports），
// vitest 走 node 解析时无法定位入口。测试里从不需要真实的编辑器实现，
// 这里提供最小结构供 vitest.config.ts 做别名，具体行为由各测试用 vi.mock 覆盖。

export const editor = {
  create: () => {
    throw new Error('测试中请用 vi.mock("monaco-editor") 提供实现');
  },
  setModelLanguage: () => {},
};
