// 主题系统：使用 CSS 变量，支持自动/浅色/深色
export const theme = {
  colors: {
    bg: 'var(--bg)',
    bgCard: 'var(--bg-card)',
    bgEditor: 'var(--bg-editor)',
    bgSidebar: 'var(--bg-sidebar)',
    accent: 'var(--accent)',
    accentHover: 'var(--accent-hover)',
    success: 'var(--success)',
    error: 'var(--error)',
    text: 'var(--text)',
    textDim: 'var(--text-dim)',
    textBright: 'var(--text-bright)',
    border: 'var(--border)',
    glass: 'var(--glass)',
    glassStrong: 'var(--glass-strong)',
    glow: 'var(--glow)',
  },
  fontSize: {
    body: '13px',
    code: '12.5px',
    heading: '18px',
    small: '11.5px',
  },
  radius: '18px',
  spacing: (n: number) => n * 8 + 'px',
};
