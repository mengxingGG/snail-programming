// 自定义标题栏 — 一体化设计：透明悬浮，融入页面
// 无分割线、无背景块，窗口控件轻轻浮在内容之上
import React, { useEffect, useState, useCallback } from 'react';
import { theme } from '../../theme';

// ─── 类型 ──────────────────────────────────────────────

interface WindowAPI {
  minimize: () => Promise<void>;
  maximize: () => Promise<void>;
  close: () => Promise<void>;
  isMaximized: () => Promise<boolean>;
  onMaximizeChanged: (cb: (maximized: boolean) => void) => () => void;
}

function getWindowAPI(): WindowAPI | null {
  return (window as any).snailAPI?.window ?? null;
}

// ─── 标题栏 ──────────────────────────────────────────────

export function TitleBar() {
  const api = getWindowAPI();
  const [maximized, setMaximized] = useState(false);

  useEffect(() => {
    if (!api) return;
    api.isMaximized().then(setMaximized).catch(() => {});
    const unsub = api.onMaximizeChanged(setMaximized);
    return unsub;
  }, [api]);

  const minimize = useCallback(() => api?.minimize(), [api]);
  const toggleMaximize = useCallback(() => api?.maximize(), [api]);
  const closeWindow = useCallback(() => api?.close(), [api]);

  // 按钮共用样式
  const btnBase = {
    width: 36,
    height: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: 'transparent',
    cursor: 'default',
    WebkitAppRegion: 'no-drag',
    color: theme.colors.textDim,
    fontSize: 13,
    lineHeight: 1,
    transition: 'background 0.15s, color 0.15s',
    outline: 'none',
    padding: 0,
    borderRadius: 6,
    fontFamily: 'system-ui, -apple-system, sans-serif',
  } as React.CSSProperties;

  return (
    <div style={{
      height: 32,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      WebkitAppRegion: 'drag',
      userSelect: 'none',
      flexShrink: 0,
      position: 'relative',
      zIndex: 1000,
    } as React.CSSProperties}>
      {/* 左：品牌标识 — 淡到几乎融进背景 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        paddingLeft: 14,
        height: '100%',
        WebkitAppRegion: 'no-drag',
      } as React.CSSProperties}>
        <span style={{ fontSize: 13, lineHeight: 1, opacity: 0.55 }}>🐌</span>
        <span style={{
          fontSize: 11,
          fontWeight: 580,
          color: theme.colors.textDim,
          opacity: 0.48,
          letterSpacing: '0.4px',
        }}>
          蜗牛编程
        </span>
      </div>

      {/* 右：窗口控件 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        height: '100%',
        paddingRight: 4,
        WebkitAppRegion: 'no-drag',
      } as React.CSSProperties}>
        {/* 最小化 */}
        <button
          onClick={minimize}
          title="最小化"
          style={btnBase}
          onMouseEnter={e => {
            const t = e.currentTarget as HTMLElement;
            t.style.background = 'var(--glass)';
            t.style.color = 'var(--text)';
          }}
          onMouseLeave={e => {
            const t = e.currentTarget as HTMLElement;
            t.style.background = 'transparent';
            t.style.color = theme.colors.textDim;
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" style={{ display: 'block', opacity: 0.6 }}>
            <rect x="1.5" y="5" width="7" height="1" rx="0.5" fill="currentColor" />
          </svg>
        </button>

        {/* 最大化 / 还原 */}
        <button
          onClick={toggleMaximize}
          title={maximized ? '还原' : '最大化'}
          style={btnBase}
          onMouseEnter={e => {
            const t = e.currentTarget as HTMLElement;
            t.style.background = 'var(--glass)';
            t.style.color = 'var(--text)';
          }}
          onMouseLeave={e => {
            const t = e.currentTarget as HTMLElement;
            t.style.background = 'transparent';
            t.style.color = theme.colors.textDim;
          }}
        >
          {maximized ? (
            <svg width="10" height="10" viewBox="0 0 10 10" style={{ display: 'block', opacity: 0.6 }}>
              <rect x="2" y="0" width="8" height="8" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.1" />
              <rect x="0" y="2" width="8" height="8" rx="1.2" fill="var(--bg)" stroke="currentColor" strokeWidth="1.1" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 10 10" style={{ display: 'block', opacity: 0.6 }}>
              <rect x="1.5" y="1.5" width="7" height="7" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.1" />
            </svg>
          )}
        </button>

        {/* 关闭 */}
        <button
          onClick={closeWindow}
          title="关闭"
          style={btnBase}
          onMouseEnter={e => {
            const t = e.currentTarget as HTMLElement;
            t.style.background = '#E81123';
            t.style.color = '#fff';
          }}
          onMouseLeave={e => {
            const t = e.currentTarget as HTMLElement;
            t.style.background = 'transparent';
            t.style.color = theme.colors.textDim;
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" style={{ display: 'block', opacity: 0.6 }}>
            <line x1="1.5" y1="1.5" x2="8.5" y2="8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="8.5" y1="1.5" x2="1.5" y2="8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
