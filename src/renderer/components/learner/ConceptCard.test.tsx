/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ConceptCard } from './ConceptCard';

describe('ConceptCard', () => {
  it('会展示课程难度和预计时长', () => {
    render(
      <ConceptCard
        title="测试课程"
        content="这里是内容"
        hasPrev={false}
        hasNext={false}
        completed={false}
        difficulty="intermediate"
        estimatedMinutes={18}
      />,
    );

    expect(screen.getByText('中级')).toBeInTheDocument();
    expect(screen.getByText('预计 18 分钟')).toBeInTheDocument();
  });

  it('前置都完成时不显示提示', () => {
    render(
      <ConceptCard
        title="测试课程"
        content="这里是内容"
        hasPrev={false}
        hasNext={false}
        completed={false}
        unmetPrerequisites={[]}
      />,
    );

    expect(screen.queryByText(/建议先完成前置内容/)).not.toBeInTheDocument();
  });

  it('存在未完成的前置时给出提示并可跳转', () => {
    const onJump = vi.fn();
    render(
      <ConceptCard
        title="测试课程"
        content="这里是内容"
        hasPrev={false}
        hasNext={false}
        completed={false}
        unmetPrerequisites={[
          { sectionId: '1.2', chapterId: 'ch1', title: '变量与常量' },
          { sectionId: '1.3', chapterId: 'ch1', title: '基本类型' },
        ]}
        onJumpToPrerequisite={onJump}
      />,
    );

    expect(screen.getByText(/建议先完成前置内容/)).toBeInTheDocument();

    fireEvent.click(screen.getByText('去学 变量与常量'));
    expect(onJump).toHaveBeenCalledWith('ch1', '1.2');

    fireEvent.click(screen.getByText('去学 基本类型'));
    expect(onJump).toHaveBeenCalledWith('ch1', '1.3');
  });
});
