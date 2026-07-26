import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'release/**',
      'tmp/**',
      'projects/**', // 学生练习项目，故意留有待补全的代码
      'scripts/**',  // 一次性审计脚本
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      // 教学项目里 any 用得较多，先降级为提示而不是阻断
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrors: 'none',
      }],
      // 主进程大量使用 console 做诊断输出
      'no-console': 'off',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-var': 'error',
      'prefer-const': 'error',
    },
  },

  // 渲染进程：补上 React Hooks 规则
  {
    files: ['src/renderer/**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // 课程数据是纯静态教学内容：讲义里大量出现正则、转义示例的字面量，
  // 按代码规则检查只会产生噪音。结构正确性由 course-content.test.ts 保证。
  {
    files: ['src/shared/course-data/**', 'src/shared/course-data-python/**'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'no-useless-escape': 'off',
    },
  },
);
