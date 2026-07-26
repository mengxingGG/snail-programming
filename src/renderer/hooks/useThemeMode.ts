// 主题模式 hook：自动 / 浅色 / 深色
import { useEffect, useState } from 'react';

export type ThemeMode = 'auto' | 'light' | 'dark';

const STORAGE_KEY = 'snail:themeMode';

export function applyThemeMode(mode: ThemeMode): void {
  document.documentElement.dataset.theme = mode;
}

export function useThemeMode() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    return saved === 'light' || saved === 'dark' || saved === 'auto' ? saved : 'auto';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
    applyThemeMode(mode);
  }, [mode]);

  function cycleMode() {
    setMode(current => current === 'auto' ? 'light' : current === 'light' ? 'dark' : 'auto');
  }

  return { mode, setMode, cycleMode };
}
