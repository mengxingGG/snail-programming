import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@renderer': path.resolve(__dirname, 'src/renderer'),
      '@services': path.resolve(__dirname, 'src/services'),
      // monaco-editor 只有 module 字段，vitest 的 node 解析找不到入口
      'monaco-editor': path.resolve(__dirname, 'src/test/stubs/monaco-editor.ts'),
    },
  },
  test: {
    environment: 'node',
    exclude: ['dist/**', 'node_modules/**'],
  },
});
