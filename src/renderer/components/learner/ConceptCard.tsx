// M09: 概念卡片 — 渲染教学内容
import React from 'react';
import { theme } from '../../theme';
import type { Difficulty } from '../../../shared/types/course';

interface ConceptCardProps {
  title: string;
  content: string;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  completed: boolean;
  difficulty?: Difficulty;
  estimatedMinutes?: number;
  /** 尚未完成的前置小节；为空表示可以直接学本节 */
  unmetPrerequisites?: { sectionId: string; chapterId: string; title: string }[];
  onJumpToPrerequisite?: (chapterId: string, sectionId: string) => void;
}

function navButtonStyle(primary = false): React.CSSProperties {
  return {
    border: primary ? '1px solid rgba(100,210,255,0.48)' : '1px solid ' + theme.colors.border,
    background: primary
      ? 'linear-gradient(135deg, rgba(100,210,255,0.95), rgba(139,224,255,0.78))'
      : 'rgba(255,255,255,0.045)',
    color: primary ? '#04131C' : theme.colors.text,
    borderRadius: 999,
    padding: '8px 14px',
    cursor: 'pointer',
    fontWeight: 700,
    boxShadow: primary ? `0 6px 14px ${theme.colors.glow}` : 'none',
  };
}

function difficultyLabel(difficulty?: Difficulty): string {
  if (difficulty === 'advanced') return '高级';
  if (difficulty === 'intermediate') return '中级';
  return '入门';
}

function metaChipStyle(): React.CSSProperties {
  return {
    color: theme.colors.text,
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid ' + theme.colors.border,
    borderRadius: 999,
    padding: '4px 10px',
    fontSize: 11.5,
    fontWeight: 700,
    whiteSpace: 'nowrap',
  };
}

export function ConceptCard({
  title,
  content,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  completed,
  difficulty,
  estimatedMinutes,
  unmetPrerequisites = [],
  onJumpToPrerequisite,
}: ConceptCardProps) {
  return (
    <article style={{
      position: 'relative',
      background: `linear-gradient(180deg, ${theme.colors.glassStrong}, ${theme.colors.bgCard})`,
      border: '1px solid ' + theme.colors.border,
      borderRadius: 28,
      padding: '24px 26px',
      minHeight: '100%',
      boxShadow: '0 6px 16px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.08)',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: -80,
        right: -80,
        width: 220,
        height: 220,
        background: `radial-gradient(circle, ${theme.colors.glow}, transparent 62%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start' }}>
        <div>
          <div style={{ color: theme.colors.accent, fontSize: 10.5, fontWeight: 800, letterSpacing: 2.8, marginBottom: 10 }}>
            LESSON NOTE
          </div>
          <h2 style={{ color: theme.colors.textBright, margin: 0, fontSize: 21, lineHeight: 1.28, fontWeight: 760 }}>{title}</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
            <span style={metaChipStyle()}>{difficultyLabel(difficulty)}</span>
            {typeof estimatedMinutes === 'number' && <span style={metaChipStyle()}>{`预计 ${estimatedMinutes} 分钟`}</span>}
          </div>
        </div>
        {completed && (
          <span style={{
            color: theme.colors.success,
            background: theme.colors.success + '14',
            border: '1px solid ' + theme.colors.success + '66',
            borderRadius: 999,
            padding: '5px 10px',
            fontSize: 11,
            fontWeight: 800,
            whiteSpace: 'nowrap',
          }}>
            已完成
          </span>
        )}
      </div>

      {unmetPrerequisites.length > 0 && (
        <div style={{
          position: 'relative',
          marginTop: 16,
          padding: '10px 14px',
          borderRadius: 14,
          background: theme.colors.accent + '12',
          border: '1px solid ' + theme.colors.accent + '44',
          fontSize: 12,
          lineHeight: 1.7,
        }}>
          <span style={{ color: theme.colors.textBright, fontWeight: 700 }}>建议先完成前置内容</span>
          <span style={{ color: theme.colors.textDim }}>
            {' '}— 本节会用到下面这些还没学完的内容，跳着学容易卡住：
          </span>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
            {unmetPrerequisites.map(item => (
              <button
                key={item.sectionId}
                onClick={() => onJumpToPrerequisite?.(item.chapterId, item.sectionId)}
                style={{
                  background: 'transparent',
                  color: theme.colors.accent,
                  border: '1px solid ' + theme.colors.accent + '66',
                  borderRadius: 999,
                  padding: '4px 12px',
                  fontSize: 11.5,
                  cursor: 'pointer',
                }}
              >
                {`去学 ${item.title}`}
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{
        position: 'relative',
        color: theme.colors.text,
        lineHeight: 1.72,
        marginTop: 18,
        fontSize: 13,
        letterSpacing: '0.01em',
      }}>
        <pre style={{
          whiteSpace: 'pre-wrap',
          fontFamily: 'inherit',
          opacity: 0.94,
        }}>{content}</pre>
      </div>

      <footer style={{
        position: 'relative',
        marginTop: theme.spacing(3),
        paddingTop: theme.spacing(2),
        borderTop: '1px solid ' + theme.colors.border,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        flexWrap: 'wrap',
      }}>
        <span style={{ color: theme.colors.textDim, fontSize: 11.5 }}>
          阅读概念 → 修改代码 → 运行验证 → 自动记录进度
        </span>
        <div style={{ display: 'flex', gap: theme.spacing(1) }}>
          {hasPrev && <button onClick={onPrev} style={navButtonStyle(false)}>上一节</button>}
          {hasNext && <button onClick={onNext} style={navButtonStyle(true)}>下一节</button>}
        </div>
      </footer>
    </article>
  );
}
