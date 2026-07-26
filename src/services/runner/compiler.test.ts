import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
  mockTransform,
  mockExecFileSync,
  mockWriteFileSync,
  mockMkdtempSync,
  mockRmSync,
  mockTmpdir,
} = vi.hoisted(() => ({
  mockTransform: vi.fn(),
  mockExecFileSync: vi.fn(),
  mockWriteFileSync: vi.fn(),
  mockMkdtempSync: vi.fn(),
  mockRmSync: vi.fn(),
  mockTmpdir: vi.fn(),
}));

vi.mock('esbuild', () => ({
  default: {
    transform: mockTransform,
  },
  transform: mockTransform,
}));

vi.mock('child_process', () => ({
  execFileSync: mockExecFileSync,
}));

vi.mock('fs', () => ({
  default: {
    writeFileSync: mockWriteFileSync,
    mkdtempSync: mockMkdtempSync,
    rmSync: mockRmSync,
  },
}));

vi.mock('os', () => ({
  default: {
    tmpdir: mockTmpdir,
  },
}));

import { compileAndRun } from './compiler';

describe('compileAndRun', () => {
  beforeEach(() => {
    mockTransform.mockReset();
    mockExecFileSync.mockReset();
    mockWriteFileSync.mockReset();
    mockMkdtempSync.mockReset();
    mockRmSync.mockReset();
    mockTmpdir.mockReset();

    mockTmpdir.mockReturnValue('C:\\temp');
    mockExecFileSync.mockReturnValue('ok');
    mockTransform.mockResolvedValue({ code: 'console.log("ts")' });

    // 模拟 mkdtempSync：每次返回互不相同的目录
    let counter = 0;
    mockMkdtempSync.mockImplementation((prefix: string) => `${prefix}${counter++}`);
  });

  it('运行 Python 时强制启用 UTF-8 输出环境', async () => {
    await compileAndRun('print("💡 中文")', 'python');

    expect(mockExecFileSync).toHaveBeenCalledWith(
      'python',
      [expect.stringMatching(/main\.py$/)],
      expect.objectContaining({
        encoding: 'utf-8',
        env: expect.objectContaining({
          PYTHONIOENCODING: 'utf-8',
          PYTHONUTF8: '1',
        }),
      }),
    );
  });

  it('允许验收环境显式指定 Python 解释器路径', async () => {
    const previous = process.env.SNAIL_PYTHON_EXECUTABLE;
    process.env.SNAIL_PYTHON_EXECUTABLE = 'C:\\tools\\python.exe';

    try {
      await compileAndRun('print(1)', 'python');
      expect(mockExecFileSync).toHaveBeenCalledWith(
        'C:\\tools\\python.exe',
        [expect.stringMatching(/main\.py$/)],
        expect.any(Object),
      );
    } finally {
      if (previous === undefined) delete process.env.SNAIL_PYTHON_EXECUTABLE;
      else process.env.SNAIL_PYTHON_EXECUTABLE = previous;
    }
  });

  it('每次执行都使用独立的临时目录，路径不可预测', async () => {
    await compileAndRun('print(1)', 'python');
    await compileAndRun('print(2)', 'python');

    const [firstFile] = mockWriteFileSync.mock.calls[0];
    const [secondFile] = mockWriteFileSync.mock.calls[1];

    expect(mockMkdtempSync).toHaveBeenCalledTimes(2);
    expect(firstFile).not.toBe(secondFile);
  });

  it('在临时目录内执行，避免学生代码写到应用目录', async () => {
    await compileAndRun('console.log(1)', 'typescript');

    const [, , options] = mockExecFileSync.mock.calls[0];
    expect(options.cwd).toBe(mockMkdtempSync.mock.results[0].value);
    expect(options.timeout).toBe(5000);
  });

  it('执行失败也会清理临时目录', async () => {
    mockExecFileSync.mockImplementation(() => {
      throw new Error('boom');
    });

    await expect(compileAndRun('print(1)', 'python')).rejects.toThrow('boom');
    expect(mockRmSync).toHaveBeenCalledWith(
      mockMkdtempSync.mock.results[0].value,
      { recursive: true, force: true },
    );
  });
});
