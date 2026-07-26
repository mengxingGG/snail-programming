/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockCreate, mockSetModelLanguage, editorInstance, contentListeners } = vi.hoisted(() => {
  const contentListeners: Array<() => void> = [];
  const model = { id: 'model-1' };
  const editorInstance = {
    getValue: vi.fn(() => 'current-code'),
    setValue: vi.fn(),
    getModel: vi.fn(() => model),
    updateOptions: vi.fn(),
    dispose: vi.fn(),
    onDidChangeModelContent: vi.fn((cb: () => void) => {
      contentListeners.push(cb);
      return { dispose: vi.fn() };
    }),
  };
  return {
    mockCreate: vi.fn(() => editorInstance),
    mockSetModelLanguage: vi.fn(),
    editorInstance,
    contentListeners,
  };
});

vi.mock('monaco-editor', () => ({
  editor: {
    create: mockCreate,
    setModelLanguage: mockSetModelLanguage,
  },
}));

import { CodeEditor } from './CodeEditor';

describe('CodeEditor', () => {
  beforeEach(() => {
    mockCreate.mockClear();
    mockSetModelLanguage.mockClear();
    editorInstance.updateOptions.mockClear();
    editorInstance.setValue.mockClear();
    contentListeners.length = 0;
  });

  it('切换语言时同步模型语言，而不是停留在创建时的语言', () => {
    const { rerender } = render(
      <CodeEditor value="print(1)" onChange={() => {}} language="typescript" />,
    );
    expect(mockCreate).toHaveBeenCalledTimes(1);

    rerender(<CodeEditor value="print(1)" onChange={() => {}} language="python" />);

    expect(mockSetModelLanguage).toHaveBeenCalledWith({ id: 'model-1' }, 'python');
    // 不应该为了换语言而重建整个编辑器
    expect(mockCreate).toHaveBeenCalledTimes(1);
  });

  it('内容变更调用最新的 onChange，而不是首次渲染时的旧闭包', () => {
    const first = vi.fn();
    const second = vi.fn();

    const { rerender } = render(<CodeEditor value="a" onChange={first} />);
    rerender(<CodeEditor value="a" onChange={second} />);

    contentListeners.forEach(cb => cb());

    expect(second).toHaveBeenCalledWith('current-code');
    expect(first).not.toHaveBeenCalled();
  });

  it('readOnly 变化会同步到编辑器选项', () => {
    const { rerender } = render(<CodeEditor value="a" onChange={() => {}} readOnly={false} />);
    rerender(<CodeEditor value="a" onChange={() => {}} readOnly />);

    expect(editorInstance.updateOptions).toHaveBeenCalledWith({ readOnly: true });
  });

  it('卸载时释放编辑器实例', () => {
    const { unmount } = render(<CodeEditor value="a" onChange={() => {}} />);
    unmount();
    expect(editorInstance.dispose).toHaveBeenCalled();
  });
});
