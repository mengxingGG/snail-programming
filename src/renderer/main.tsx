// React 入口
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/variables.css';
import './styles/global.css';
import { applyThemeMode, type ThemeMode } from './hooks/useThemeMode';

const savedTheme = localStorage.getItem('snail:themeMode') as ThemeMode | null;
applyThemeMode(savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'auto' ? savedTheme : 'auto');

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
