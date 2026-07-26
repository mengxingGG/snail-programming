import { Menu, shell, app, BrowserWindow, dialog } from 'electron';

const REPO_URL = 'https://github.com/mengxingGG/snail-programming';

/**
 * 关于对话框。
 * 原先是向渲染层 send('about-snail')，但 preload 没有暴露对应的监听接口，
 * 渲染层收不到，点「关于」没有任何反应。这里直接用主进程原生对话框。
 */
function showAboutDialog(): void {
  const detail = [
    `版本：${app.getVersion()}`,
    `Electron：${process.versions.electron}`,
    `Chromium：${process.versions.chrome}`,
    `Node：${process.versions.node}`,
    `平台：${process.platform} ${process.arch}`,
  ].join('\n');

  const options: Electron.MessageBoxOptions = {
    type: 'info',
    title: '关于蜗牛编程',
    message: '🐌 蜗牛编程',
    detail,
    buttons: ['确定'],
  };

  const focused = BrowserWindow.getFocusedWindow();
  if (focused) {
    dialog.showMessageBox(focused, options);
  } else {
    dialog.showMessageBox(options);
  }
}

export function setupMenu() {
  const isDev = !app.isPackaged;

  const template: Electron.MenuItemConstructorOptions[] = [];

  if (isDev) {
    // 开发模式 — 完整菜单便于调试
    template.push(
      {
        label: '文件',
        submenu: [
          { label: '退出', accelerator: 'CmdOrCtrl+Q', click: () => app.quit() },
        ],
      },
      {
        label: '编辑',
        submenu: [
          { role: 'undo', label: '撤销', accelerator: 'CmdOrCtrl+Z' },
          { role: 'redo', label: '重做', accelerator: 'Shift+CmdOrCtrl+Z' },
          { type: 'separator' },
          { role: 'cut', label: '剪切', accelerator: 'CmdOrCtrl+X' },
          { role: 'copy', label: '复制', accelerator: 'CmdOrCtrl+C' },
          { role: 'paste', label: '粘贴', accelerator: 'CmdOrCtrl+V' },
        ],
      },
      {
        label: '查看',
        submenu: [
          {
            label: '开发者工具',
            accelerator: 'F12',
            click: () => BrowserWindow.getFocusedWindow()?.webContents.openDevTools(),
          },
          { type: 'separator' },
          { role: 'reload', label: '重新加载', accelerator: 'CmdOrCtrl+R' },
        ],
      },
      {
        label: '帮助',
        submenu: [
          {
            label: '关于 Snail',
            click: () => showAboutDialog(),
          },
          { type: 'separator' },
          {
            label: '查看文档',
            click: () => shell.openExternal(REPO_URL),
          },
          {
            label: '提交问题',
            click: () => shell.openExternal(`${REPO_URL}/issues`),
          },
        ],
      },
    );
  } else {
    // 生产模式 — 仅保留退出和关于
    template.push(
      {
        label: 'Snail',
        submenu: [
          {
            label: '关于 Snail',
            click: () => showAboutDialog(),
          },
          { type: 'separator' },
          { label: '退出', accelerator: 'CmdOrCtrl+Q', click: () => app.quit() },
        ],
      },
      {
        label: '编辑',
        submenu: [
          { role: 'undo', label: '撤销', accelerator: 'CmdOrCtrl+Z' },
          { role: 'redo', label: '重做', accelerator: 'Shift+CmdOrCtrl+Z' },
          { type: 'separator' },
          { role: 'cut', label: '剪切', accelerator: 'CmdOrCtrl+X' },
          { role: 'copy', label: '复制', accelerator: 'CmdOrCtrl+C' },
          { role: 'paste', label: '粘贴', accelerator: 'CmdOrCtrl+V' },
        ],
      },
    );
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}
