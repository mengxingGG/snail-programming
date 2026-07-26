/**
 * PostList.tsx — 文章列表组件
 * 接收 Post[] 作为 Props，渲染文章卡片。
 * 空数组时显示"没有找到文章"。
 * 相关：src/types.ts (Post), src/App.tsx (调用方)
 * 关键 API：React.FC, Props 类型, .map(), 条件渲染
 */
import React from 'react';
import type { Post } from '../types';

interface Props { posts: Post[]; }

export function PostList({ posts }: Props) {
  if (posts.length === 0) return <p>没有找到文章</p>;
  return (
    <div className="post-list">
      {posts.map(post => (
        <article key={post.id} className="post-card">
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <div className="post-meta">
            {post.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
            <time>{post.date}</time>
          </div>
        </article>
      ))}
    </div>
  );
}
