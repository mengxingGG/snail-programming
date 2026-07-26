/**
 * App.tsx — React 博客主组件
 *
 * 所属项目：React 个人博客 (p5-react-blog)
 *
 * 功能说明：
 * 应用的根组件。管理搜索关键词和暗色模式状态，
 * 根据搜索词过滤文章列表，渲染 SearchBar 和 PostList。
 *
 * 你需要实现：
 * 1. useState 管理 search（string）和 dark（boolean）
 * 2. 根据 search 过滤 mockPosts（匹配 title、excerpt、tags）
 * 3. 条件渲染：dark 时添加 'dark' className
 * 4. 传递 filteredPosts 给 PostList
 *
 * 相关文件：
 * - src/types.ts：Post 类型
 * - src/components/PostList.tsx：接收 posts 渲染列表
 * - src/components/SearchBar.tsx：受控输入框
 *
 * 运行方式：
 * 在项目根目录执行 npm run dev，浏览器打开 http://localhost:5173
 *
 * 关键 API：
 * - React useState：状态管理
 * - Array.filter：过滤文章
 * - JSX 条件渲染：{condition && <Component />}
 */

import React, { useState } from 'react';
import { PostList } from './components/PostList';
import { SearchBar } from './components/SearchBar';
import type { Post } from './types';

// 模拟数据 — 你可以修改或从 API 获取
const mockPosts: Post[] = [
  { id: 1, title: 'React 入门指南', excerpt: 'React 是一个用于构建用户界面的 JavaScript 库...', tags: ['React', '前端'], date: '2026-01-15' },
  { id: 2, title: 'TypeScript 类型体操', excerpt: '掌握 TypeScript 高级类型能让你的代码更安全...', tags: ['TypeScript', '类型'], date: '2026-02-20' },
  { id: 3, title: 'CSS Grid 完全指南', excerpt: 'Grid 是现代 CSS 最强大的布局工具...', tags: ['CSS', '布局'], date: '2026-03-10' },
];

export default function App() {
  // TODO: 用 useState 管理 search 和 dark 状态
  const [search, setSearch] = useState('');
  const [dark, setDark] = useState(true);

  // TODO: 根据 search 过滤 posts（模糊匹配 title、excerpt、tags）
  const filteredPosts = mockPosts; // ← 替换为过滤逻辑

  return (
    <div className={dark ? 'dark' : 'light'}>
      {/* TODO: 添加 header、SearchBar、PostList */}
    </div>
  );
}
