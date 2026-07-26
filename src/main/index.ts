import { app, BrowserWindow, dialog } from 'electron';
import { createWindow } from './window';
import { setupMenu } from './menu';
import { registerIpcHandlers } from './ipc';
import { initDatabase } from '../services/database/init';
import { purgeExpiredSessions } from '../services/auth/service';

function main() {
  app.whenReady().then(() => {
    try {
      initDatabase();
      purgeExpiredSessions();
    } catch (err) {
      console.error('数据库初始化失败:', err);
      dialog.showErrorBox('启动失败', `数据库初始化失败：${err}`);
      app.quit();
      return;
    }

    registerIpcHandlers();
    setupMenu();
    createWindow();
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
}

main();
