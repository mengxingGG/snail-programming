// 窗口框架 — 一体化窗口外观
// 透明标题栏悬浮于内容之上，无分割
import React from 'react';
import { TitleBar } from './TitleBar';

export function WindowFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden',
      background: 'var(--bg)',
    }}>
      <TitleBar />
      <div style={{
        flex: 1,
        minHeight: 0,
        overflow: 'hidden',
      }}>
        {children}
      </div>
    </div>
  );
}
