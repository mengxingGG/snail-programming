import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
  mockTransform,
  mockExecFileSync,
  mockWriteFileSync,
  mockUnlinkSync,
  mockTmpdir,
} = vi.hoisted(() => ({
  mockTransform: vi.fn(),
  mockExecFileSync: vi.fn(),
  mockWriteFileSync: vi.fn(),
  mockUnlinkSync: vi.fn(),
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
    unlinkSync: mockUnlinkSync,
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
    mockUnlinkSync.mockReset();
    mockTmpdir.mockReset();

    mockTmpdir.mockReturnValue('C:\\temp');
    mockExecFileSync.mockReturnValue('ok');
    mockTransform.mockResolvedValue({ code: 'console.log("ts")' });
  });

  it('运行 Python 时强制启用 UTF-8 输出环境', async () => {
    await compileAndRun('print("💡 中文")', 'python');

    expect(mockExecFileSync).toHaveBeenCalledWith(
      'python',
      [expect.stringMatching(/snail_tmp_\d+\.py$/)],
      expect.objectContaining({
        encoding: 'utf-8',
        env: expect.objectContaining({
          PYTHONIOENCODING: 'utf-8',
          PYTHONUTF8: '1',
        }),
      }),
    );
  });
});
