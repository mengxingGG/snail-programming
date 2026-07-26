// 验证进度类 IPC 一律以主进程会话为准，忽略渲染层传入的 userId
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { handlers, mockIpcMain, prepared } = vi.hoisted(() => ({
  handlers: new Map<string, (...args: any[]) => Promise<any>>(),
  mockIpcMain: {
    handle: vi.fn((channel: string, handler: (...args: any[]) => Promise<any>) => {
      handlers.set(channel, handler);
    }),
  },
  prepared: [] as Array<{ sql: string; args: unknown[] }>,
}));

vi.mock('electron', () => ({ ipcMain: mockIpcMain }));

vi.mock('../database/init', () => ({
  getDb: () => ({
    prepare: (sql: string) => ({
      run: (...args: unknown[]) => { prepared.push({ sql, args }); return { changes: 1 }; },
      get: (...args: unknown[]) => { prepared.push({ sql, args }); return undefined; },
      all: (...args: unknown[]) => { prepared.push({ sql, args }); return []; },
    }),
  }),
}));

import { registerIpcHandlers } from './service';
import { clearActiveSession, setActiveSession } from '../auth/session';

describe('进度 IPC 的会话鉴权', () => {
  beforeEach(() => {
    handlers.clear();
    prepared.length = 0;
    clearActiveSession();
    registerIpcHandlers();
  });

  it('未登录时读写进度直接被拒绝', async () => {
    await expect(handlers.get('progress:load')!({}, { courseId: 'typescript' }))
      .rejects.toThrow('请先登录');
    await expect(handlers.get('code:list')!({}, {}))
      .rejects.toThrow('请先登录');
    expect(prepared).toHaveLength(0);
  });

  it('写入进度时使用会话 userId，而不是调用方传来的值', async () => {
    setActiveSession('real-user', 'token-1');

    // 模拟渲染层伪造他人 userId：新签名已不接收，即使多传也不生效
    await handlers.get('progress:save')!({}, { userId: 'victim', sectionId: '1.1', courseId: 'typescript' });

    const insert = prepared.find(p => p.sql.includes('INSERT OR IGNORE INTO progress'));
    expect(insert).toBeTruthy();
    expect(insert!.args[0]).toBe('real-user');
    expect(insert!.args[0]).not.toBe('victim');
  });

  it('读取代码文件同样只认会话用户', async () => {
    setActiveSession('real-user', 'token-1');

    await handlers.get('code:load')!({}, { userId: 'victim', filename: 'a.ts' });

    const select = prepared.find(p => p.sql.includes('SELECT content FROM code_files'));
    expect(select!.args[0]).toBe('real-user');
  });
});
