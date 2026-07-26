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
});
