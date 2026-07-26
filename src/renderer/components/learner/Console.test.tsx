/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Console } from './Console';

vi.mock('../../theme', () => ({
  theme: {
    colors: {
      text: '#fff',
      textDim: '#999',
      success: '#0f0',
      error: '#f00',
      accent: '#0af',
      accentHover: '#09f',
      border: '#333',
      glow: 'rgba(0,0,0,0.2)',
    },
    fontSize: {
      small: 12,
      code: 12,
    },
  },
}));

describe('Console', () => {
  it('运行失败时应该展示更具体的错误详情，而不只是一句错误', () => {
    render(
      <Console
        result={{
          success: false,
          output: '开始执行',
          error: 'ReferenceError: scroe is not defined',
          executionTimeMs: 18,
          stderr: 'ReferenceError: scroe is not defined\n    at main.ts:3:1',
          details: '运行失败\n退出码：1\n建议：检查变量名是否拼写正确',
        } as any}
        isRunning={false}
        onRun={() => {}}
        completed={false}
      />,
    );

    expect(screen.getByText(/输出：开始执行/)).toBeInTheDocument();
    expect(screen.getByText(/错误：ReferenceError: scroe is not defined/)).toBeInTheDocument();
    expect(screen.getByText(/错误详情：ReferenceError: scroe is not defined/)).toBeInTheDocument();
    expect(screen.getByText(/退出码：1/)).toBeInTheDocument();
    expect(screen.getByText(/检查变量名是否拼写正确/)).toBeInTheDocument();
  });

  it('输出不匹配时应该展示具体差异提示', () => {
    render(
      <Console
        result={{
          success: true,
          output: '你的分数是：90',
          executionTimeMs: 6,
        } as any}
        isRunning={false}
        onRun={() => {}}
        completed={false}
        expectedOutput="你的分数是：100"
        validationPassed={false}
        validationMessage="输出不匹配，请对照要求检查。"
        validationDetails="第 1 行不一致\n期望：你的分数是：100\n实际：你的分数是：90"
      />,
    );

    expect(screen.getByText(/第 1 行不一致/)).toBeInTheDocument();
    expect(screen.getByText(/期望：你的分数是：100/)).toBeInTheDocument();
    expect(screen.getByText(/实际：你的分数是：90/)).toBeInTheDocument();
  });
});
