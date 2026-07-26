/**
 * types.ts — 博客数据类型定义
 *
 * 所属项目：React 个人博客 (p5-react-blog)
 *
 * 功能说明：
 * 定义 Post 接口，所有组件共享此类型。
 *
 * 你需要实现：
 * 1. Post interface：id, title, excerpt, tags, date, content?
 *
 * 相关文件：
 * - src/App.tsx：使用 Post 类型
 * - src/components/PostList.tsx：接收 Post[] 作为 Props
 *
 * 关键 API：
 * - TypeScript interface：定义对象形状
 */

export interface Post {
  id: number;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
  content?: string; // Markdown 内容，详情页使用
}
