import { BrowserWindow, app, dialog, ipcMain, shell } from 'electron';
import * as path from 'path';
import { isSafeExternalUrl } from '../shared/url-safety';

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

    attachNavigationGuards(mainWindow);
    attachMaximizeListeners(mainWindow);

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

// ─── 导航护栏 ───────────────────────────────────────────

/** 应用自身页面的合法来源：开发期为 Vite 服务器，打包后为 file:// */
function isInternalUrl(target: string): boolean {
  try {
    const parsed = new URL(target);
    if (app.isPackaged) return parsed.protocol === 'file:';
    const devServer = new URL(process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173');
    return parsed.origin === devServer.origin;
  } catch {
    return false;
  }
}

/**
 * 阻止渲染进程离开应用自身页面。
 * 否则外部站点会继承 preload 暴露的 snailAPI，等同于把文件读写和命令执行权限交出去。
 */
function attachNavigationGuards(win: BrowserWindow): void {
  win.webContents.on('will-navigate', (event, url) => {
    if (!isInternalUrl(url)) {
      event.preventDefault();
      if (isSafeExternalUrl(url)) void shell.openExternal(url);
    }
  });

  // 一律不开新窗口；http/https 交给系统浏览器
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (isSafeExternalUrl(url)) void shell.openExternal(url);
    return { action: 'deny' };
  });

  // 拒绝渲染进程申请摄像头/麦克风等权限
  win.webContents.session.setPermissionRequestHandler((_wc, _permission, callback) => {
    callback(false);
  });
}

// ─── 窗口控制 IPC ───────────────────────────────────────

/** 最大化状态变化时通知渲染进程（必须在窗口创建后绑定） */
function attachMaximizeListeners(win: BrowserWindow): void {
  win.on('maximize', () => {
    win.webContents.send('win:maximize-changed', true);
  });
  win.on('unmaximize', () => {
    win.webContents.send('win:maximize-changed', false);
  });
}

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
}

function getPreloadPath(): string {
  if (app.isPackaged) {
    return path.join(__dirname, '../preload/index.js');
  }
  return path.join(app.getAppPath(), 'dist/preload/index.js');
}
