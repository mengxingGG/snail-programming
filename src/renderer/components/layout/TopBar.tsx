// 顶部栏 — 返回首页 + 进度 + AI助教开关 + 主题 + 账户 + 设置
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../theme';
import { useUIStore } from '../../stores/uiStore';
import { useProgress } from '../../hooks/useProgress';
import { useAuth } from '../../hooks/useAuth';
import { useThemeMode } from '../../hooks/useThemeMode';
import type { CourseId } from '../../../shared/course-catalog';
import { getCourseBundle } from '../../../shared/course-catalog';

const themeLabel = {
  auto: '自动',
  light: '浅色',
  dark: '深色',
};

export function TopBar({ courseId = 'typescript' }: { courseId?: CourseId }) {
  const navigate = useNavigate();
  const { aiPanelOpen, toggleAiPanel } = useUIStore();
  const { userId } = useAuth();
  const { progress } = useProgress(userId, courseId);
  const { mode, cycleMode } = useThemeMode();
  const [aiEnabled, setAiEnabled] = useState(false);
  const course = getCourseBundle(courseId);

  useEffect(() => {
    (window as any).snailAPI?.ai?.getConfig()
      .then((cfg: { enabled: boolean }) => setAiEnabled(cfg.enabled))
      .catch(() => {});
  }, []);

  const totalSections = course.data.totalSections;
  const completedCount = progress?.completedSections?.length ?? 0;
  const percent = totalSections > 0
    ? Math.round((completedCount / totalSections) * 100)
    : 0;

  return (
    <header style={{
      height: 52,
      background: 'color-mix(in srgb, var(--bg) 76%, transparent)',
      borderBottom: '1px solid ' + theme.colors.border,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('/')} title="返回首页" style={barButtonStyle(true)}>
          首页
        </button>

        <span style={{ color: theme.colors.textDim, fontSize: theme.fontSize.small }}>
          {course.label} Progress · {percent}%
          <span style={{
            display: 'inline-block',
            marginLeft: 10,
            width: 96, height: 5,
            background: 'color-mix(in srgb, var(--text-dim) 12%, transparent)',
            borderRadius: 999,
            verticalAlign: 'middle',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <span style={{
              position: 'absolute', inset: 0,
              width: percent + '%',
              background: `linear-gradient(90deg, ${theme.colors.accent}, ${theme.colors.accentHover})`,
              borderRadius: 999,
              boxShadow: `0 0 8px ${theme.colors.glow}`,
              transition: 'width 0.3s',
            }} />
          </span>
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <button
          onClick={toggleAiPanel}
          title={aiEnabled ? (aiPanelOpen ? '关闭 AI 助教' : '打开 AI 助教') : '请先在设置中启用 AI 助教'}
          style={{
            ...barButtonStyle(aiPanelOpen),
            color: aiEnabled ? (aiPanelOpen ? theme.colors.accent : theme.colors.text) : theme.colors.textDim,
          }}>
          AI 助教
        </button>
        <button onClick={cycleMode} title="自动/浅色/深色" style={barButtonStyle(false)}>
          {themeLabel[mode]}
        </button>
        <button onClick={() => navigate('/projects')} style={barButtonStyle(false)}>🛠️ 实战</button>
        <button onClick={() => navigate('/settings')} title="设置" style={barButtonStyle(false)}>设置</button>
        <button onClick={() => navigate('/account')} style={barButtonStyle(false)}>账户</button>
      </div>
    </header>
  );
}

function barButtonStyle(active: boolean): React.CSSProperties {
  return {
    background: active ? 'color-mix(in srgb, var(--accent) 14%, transparent)' : 'var(--glass)',
    border: '1px solid ' + (active ? 'color-mix(in srgb, var(--accent) 32%, transparent)' : theme.colors.border),
    color: active ? theme.colors.accent : theme.colors.text,
    cursor: 'pointer',
    borderRadius: 999,
    padding: '6px 12px',
    fontSize: theme.fontSize.small,
    fontWeight: 720,
  };
}
