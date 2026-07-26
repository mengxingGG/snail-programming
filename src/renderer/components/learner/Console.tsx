// M09: 运行控制台
import React from 'react';
import { theme } from '../../theme';
import type { RunResult } from '../../../services/runner/service';

interface ConsoleProps {
  result: RunResult | null;
  isRunning: boolean;
  onRun: () => void;
  expectedOutput?: string;
  completed: boolean;
  validationMessage?: string;
  validationPassed?: boolean;
  validationDetails?: string;
}

export function Console({
  result,
  isRunning,
  onRun,
  expectedOutput,
  completed,
  validationMessage,
  validationPassed,
  validationDetails,
}: ConsoleProps) {
  const passed = validationPassed ?? (result?.success && expectedOutput
    ? result.output.trim() === expectedOutput.trim()
    : undefined);

  return (
    <div style={{
      background: 'rgba(7, 10, 16, 0.84)',
      borderTop: '1px solid ' + theme.colors.border,
      height: 170,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 -6px 18px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.04)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 14px',
        borderBottom: '1px solid ' + theme.colors.border,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <strong style={{ color: theme.colors.text, fontSize: theme.fontSize.small, letterSpacing: 0.2 }}>Console</strong>
          {completed && <span style={{ color: theme.colors.success, fontSize: 11.5 }}>Completed</span>}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {result && (
            <span style={{ color: theme.colors.textDim, fontSize: theme.fontSize.small }}>
              {result.executionTimeMs}ms
            </span>
          )}
          <button
            onClick={onRun}
            disabled={isRunning}
            style={{
              background: isRunning ? 'rgba(255,255,255,0.08)' : `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentHover})`,
              color: isRunning ? theme.colors.textDim : '#03131D',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 999,
              padding: '7px 18px',
              cursor: isRunning ? 'not-allowed' : 'pointer',
              fontWeight: 820,
              boxShadow: isRunning ? 'none' : `0 6px 14px ${theme.colors.glow}`,
            }}
          >
            {isRunning ? '运行中...' : '运行代码'}
          </button>
        </div>
      </div>
      <div style={{ flex: 1, padding: 12, overflowY: 'auto', fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace', fontSize: theme.fontSize.code }}>
        {!result && (
          <div style={{ color: theme.colors.textDim, lineHeight: 1.72 }}>
            点击“运行代码”查看输出。若输出符合要求，本节会自动标记完成。
            {expectedOutput && <div style={{ marginTop: 6, whiteSpace: 'pre-wrap' }}>要求：<span style={{ color: theme.colors.accent }}>{expectedOutput}</span></div>}
          </div>
        )}
        {result && (
          <div style={{ display: 'grid', gap: 8 }}>
            {result.output && (
              <div style={{ color: result.success ? theme.colors.success : theme.colors.text, whiteSpace: 'pre-wrap' }}>
                输出：{result.output}
              </div>
            )}
            {result.success && !result.output && (
              <div style={{ color: theme.colors.success, whiteSpace: 'pre-wrap' }}>输出：(无输出)</div>
            )}
            {!result.success && (
              <div style={{ color: theme.colors.error, whiteSpace: 'pre-wrap' }}>错误：{result.error}</div>
            )}
            {!result.success && result.stderr && (
              <div style={{ color: theme.colors.error, whiteSpace: 'pre-wrap' }}>错误详情：{result.stderr}</div>
            )}
            {!result.success && result.details && (
              <div style={{ color: theme.colors.textDim, whiteSpace: 'pre-wrap' }}>诊断：{result.details}</div>
            )}
            {passed !== undefined && (
              <div style={{ color: passed ? theme.colors.success : theme.colors.error, whiteSpace: 'pre-wrap' }}>
                {validationMessage ?? (passed ? '输出匹配，练习通过。' : `输出不匹配，请对照要求：${expectedOutput}`)}
              </div>
            )}
            {!passed && validationDetails && (
              <div style={{ color: theme.colors.textDim, whiteSpace: 'pre-wrap' }}>
                定位：{validationDetails}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
