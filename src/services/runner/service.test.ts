import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
  mockCompileAndRun,
  mockValidateCode,
  mockHandle,
} = vi.hoisted(() => ({
  mockCompileAndRun: vi.fn(),
  mockValidateCode: vi.fn(),
  mockHandle: vi.fn(),
}));

vi.mock('electron', () => ({
  ipcMain: {
    handle: mockHandle,
  },
}));

vi.mock('./compiler', () => ({
  compileAndRun: mockCompileAndRun,
}));

vi.mock('./sandbox', () => ({
  validateCode: mockValidateCode,
}));

import { runCode } from './service';

describe('runCode', () => {
  beforeEach(() => {
    mockCompileAndRun.mockReset();
    mockValidateCode.mockReset();
    mockHandle.mockReset();
    mockValidateCode.mockReturnValue(null);
  });

  it('运行失败时应该保留 stderr、部分 stdout 和更具体的错误详情', async () => {
    const runtimeError = Object.assign(new Error('ReferenceError: scroe is not defined'), {
      stdout: '开始执行\n',
      stderr: 'ReferenceError: scroe is not defined\n    at main.ts:3:1',
      status: 1,
    });

    mockCompileAndRun.mockRejectedValue(runtimeError);

    const result = await runCode('console.log(scroe)', 'typescript');

    expect(result.success).toBe(false);
    expect(result.output).toBe('开始执行');
    expect((result as any).stderr).toContain('ReferenceError');
    expect((result as any).details).toContain('退出码：1');
    expect((result as any).details).toContain('main.ts:3:1');
  });
});
