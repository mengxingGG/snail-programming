import { ipcMain, app, shell } from 'electron';
import { IPC_CHANNELS } from '../shared/types/ipc';
import { isSafeExternalUrl } from '../shared/url-safety';
import { registerIpcHandlers as registerAuthHandlers } from '../services/auth/service';
import { registerIpcHandlers as registerProgressHandlers } from '../services/progress/service';
import { registerIpcHandlers as registerCodeHandlers } from '../services/runner/service';
import { registerIpcHandlers as registerExamHandlers } from '../services/exam/service';
import { registerIpcHandlers as registerAiHandlers } from '../services/ai/client';
import { registerWindowIpcHandlers } from './window';
import { registerProjectIpcHandlers } from '../services/project-service';
import { registerProjectAgentIpcHandlers } from '../services/project-agent';

/**
 * 注册所有 IPC 处理器
 * 由 index.ts 在启动流程中调用
 */
export function registerIpcHandlers(): void {
  registerBuiltinHandlers();
  registerAuthHandlers();
  registerProgressHandlers();
  registerCodeHandlers();
  registerExamHandlers();
  registerAiHandlers();
  registerWindowIpcHandlers();
  registerProjectIpcHandlers();
  registerProjectAgentIpcHandlers();
}

// ─── 内置处理器 ───────────────────────────────────────

function registerBuiltinHandlers(): void {
  ipcMain.handle('about-snail', async () => ({
    name: 'Snail',
    version: app.getVersion(),
    platform: process.platform,
    arch: process.arch,
  }));

  ipcMain.handle('get-version', async () => app.getVersion());

  ipcMain.handle('get-preload-script-path', async () => ({
    packaged: app.isPackaged
      ? `${process.resourcesPath}/preload.js`
      : `${app.getAppPath()}/preload.js`,
  }));

  // 打开外部链接：只放行 http/https
  ipcMain.handle(IPC_CHANNELS.SYSTEM_OPEN_EXTERNAL, async (_event, url: unknown) => {
    if (!isSafeExternalUrl(url)) {
      return { success: false, error: '不支持的链接协议' };
    }
    await shell.openExternal(url);
    return { success: true };
  });
}
