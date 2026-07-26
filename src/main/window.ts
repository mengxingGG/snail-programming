import { BrowserWindow, app, dialog, ipcMain } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow | null = null;

export function createWindow(): BrowserWindow {
  try {
    mainWindow = new BrowserWindow({
      width: 1400,
      height: 900,
      minWidth: 1100,
      minHeight: 700,
      frame: false,
      webPreferences: {
        preload: getPreloadPath(),
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: false, // 需要 preload 访问 Node.js API
        webSecurity: true,
      },
      backgroundColor: '#1a1e2b',
      show: false, // 等待 ready-to-show 再显示，避免白屏
    });

    // 开发模式加载 Vite 开发服务器，生产加载打包文件
    if (app.isPackaged) {
      mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
    } else {
      mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173');
    }

    // 准备好后显示窗口，避免白屏闪烁
    mainWindow.once('ready-to-show', () => {
      mainWindow?.show();
    });

    mainWindow.on('closed', () => {
      mainWindow = null;
    });

    return mainWindow;
  } catch (err) {
    console.error('窗口创建失败:', err);
    dialog.showErrorBox('严重错误', `窗口创建失败：${err}\n\n应用即将退出。`);
    app.quit();
    throw err;
  }
}

export function getMainWindow(): BrowserWindow | null {
  return mainWindow;
}

// ─── 窗口控制 IPC ───────────────────────────────────────

export function registerWindowIpcHandlers(): void {
  ipcMain.handle('win:minimize', () => mainWindow?.minimize());
  ipcMain.handle('win:maximize', () => {
    if (mainWindow?.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow?.maximize();
    }
  });
  ipcMain.handle('win:close', () => mainWindow?.close());
  ipcMain.handle('win:is-maximized', () => mainWindow?.isMaximized() ?? false);

  // 最大化状态变化时通知渲染进程
  mainWindow?.on('maximize', () => {
    mainWindow?.webContents.send('win:maximize-changed', true);
  });
  mainWindow?.on('unmaximize', () => {
    mainWindow?.webContents.send('win:maximize-changed', false);
  });
}

function getPreloadPath(): string {
  if (app.isPackaged) {
    return path.join(__dirname, '../preload/index.js');
  }
  return path.join(app.getAppPath(), 'dist/preload/index.js');
}
