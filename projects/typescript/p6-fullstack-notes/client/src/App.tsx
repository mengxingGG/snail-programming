/**
 * App.tsx — React 前端入口
 *
 * 所属项目：全栈在线笔记 (p6-fullstack-notes)
 *
 * 功能说明：
 * 前端根组件。配置路由（登录页、笔记页），
 * 用 AuthContext 管理登录状态，封装 fetch 调用后端 API。
 *
 * 你需要实现：
 * 1. AuthProvider 包裹整个应用
 * 2. BrowserRouter + Routes 配置路由
 * 3. 封装 fetch 调用 http://localhost:4000/api/*
 *
 * 相关文件：
 * - server/src/index.ts：后端 API
 * - server/src/middleware/auth.ts：认证中间件
 *
 * 运行方式：
 * cd client && npm run dev → http://localhost:5173
 *
 * 关键 API：
 * - react-router-dom：BrowserRouter, Routes, Route
 * - React Context：跨组件共享认证状态
 * - fetch API：调用后端接口
 */

import React from 'react';
// TODO: import { BrowserRouter, Routes, Route } from 'react-router-dom';
// TODO: import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    // TODO: 用 AuthProvider 包裹
    // TODO: BrowserRouter > Routes > Route path="/" 和 "/login"
    <div>
      <h1>全栈在线笔记</h1>
      <p>请实现路由和认证逻辑</p>
    </div>
  );
}
