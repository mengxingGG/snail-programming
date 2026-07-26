// M07: 应用壳 — 窗口框架 + 路由
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { WindowFrame } from './components/layout/WindowFrame';

export default function App() {
  return (
    <WindowFrame>
      <RouterProvider router={router} />
    </WindowFrame>
  );
}
