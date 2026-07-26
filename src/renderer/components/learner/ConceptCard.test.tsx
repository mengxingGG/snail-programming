/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ConceptCard } from './ConceptCard';

describe('ConceptCard', () => {
  it('会展示课程难度、预计时长和前置要求数量', () => {
    render(
      <ConceptCard
        title="测试课程"
        content="这里是内容"
        hasPrev={false}
        hasNext={false}
        completed={false}
        difficulty="intermediate"
        estimatedMinutes={18}
        prerequisitesCount={2}
      />,
    );

    expect(screen.getByText('中级')).toBeInTheDocument();
    expect(screen.getByText('预计 18 分钟')).toBeInTheDocument();
    expect(screen.getByText('前置 2 节')).toBeInTheDocument();
  });
});
