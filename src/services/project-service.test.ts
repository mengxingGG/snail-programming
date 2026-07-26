import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const {
  handlers,
  mockIpcMain,
  mockApp,
} = vi.hoisted(() => ({
  handlers: new Map<string, (...args: any[]) => Promise<any>>(),
  mockIpcMain: {
    handle: vi.fn((channel: string, handler: (...args: any[]) => Promise<any>) => {
      handlers.set(channel, handler);
    }),
  },
  mockApp: {
    isPackaged: false,
    getAppPath: vi.fn(),
  },
}));

vi.mock('electron', () => ({
  ipcMain: mockIpcMain,
  app: mockApp,
  dialog: {},
}));

import { registerProjectIpcHandlers } from './project-service';

describe('项目服务安全限制', () => {
  let tempRoot: string;

  beforeEach(() => {
    handlers.clear();
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'snail-project-service-'));
    mockApp.getAppPath.mockReturnValue(tempRoot);

    fs.mkdirSync(path.join(tempRoot, 'projects', 'typescript', 'demo'), { recursive: true });
    fs.mkdirSync(path.join(tempRoot, 'projects', 'typescript', 'demo-evil'), { recursive: true });
    fs.writeFileSync(path.join(tempRoot, 'projects', 'typescript', 'demo', 'index.ts'), 'console.log("safe")');
    fs.writeFileSync(path.join(tempRoot, 'projects', 'typescript', 'demo-evil', 'secret.txt'), 'hacked');

    registerProjectIpcHandlers();
  });

  afterEach(() => {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it('拒绝通过相邻目录前缀进行路径越界读取', async () => {
    const handler = handlers.get('project:read-file');
    const result = await handler?.({}, 'demo', '../demo-evil/secret.txt');

    expect(result?.success).toBe(false);
    expect(result?.error).toContain('路径越界');
  });

  it('拒绝包含 shell 拼接符的命令', async () => {
    const handler = handlers.get('project:exec');
    const result = await handler?.({}, 'demo', 'echo safe && echo hacked');

    expect(result?.success).toBe(false);
    expect(result?.error).toContain('不支持');
  });

  it('拒绝用 projectId 跳出 projects 根目录读取任意文件', async () => {
    // tempRoot 之外放一个"机密"文件，模拟应用目录以外的数据
    const outsideFile = path.join(tempRoot, '..', `snail-outside-${path.basename(tempRoot)}.txt`);
    fs.writeFileSync(outsideFile, 'top-secret');

    try {
      const handler = handlers.get('project:read-file');
      // 未修复前：projectId 未校验 → projectDir 已经越界，
      // 后续按 projectDir 做的相对路径校验自然全部通过
      const result = await handler?.({}, '../../..', path.basename(outsideFile));

      expect(result?.success).toBe(false);
      expect(result?.error).toContain('非法项目标识');
    } finally {
      fs.rmSync(outsideFile, { force: true });
    }
  });

  it('拒绝用 projectId 跳出根目录写入文件', async () => {
    const handler = handlers.get('project:write-file');
    const result = await handler?.({}, '../../..', 'pwned.txt', 'x');

    expect(result?.success).toBe(false);
    expect(result?.error).toContain('非法项目标识');
    expect(fs.existsSync(path.join(tempRoot, '..', 'pwned.txt'))).toBe(false);
  });

  it('拒绝用绝对路径作为 projectId', async () => {
    const handler = handlers.get('project:get-path');
    const result = await handler?.({}, 'C:\\Windows\\System32');

    expect(result?.success).toBe(false);
    expect(result?.error).toContain('非法项目标识');
  });

  it('正常的 projectId 仍然可以读取项目文件', async () => {
    const handler = handlers.get('project:read-file');
    const result = await handler?.({}, 'demo', 'index.ts');

    expect(result?.success).toBe(true);
    expect(result?.data).toBe('console.log("safe")');
  });
});
