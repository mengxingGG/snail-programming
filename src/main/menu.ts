import { Menu, shell, app, BrowserWindow } from 'electron';

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
            click: () => BrowserWindow.getFocusedWindow()?.webContents.send('about-snail'),
          },
          { type: 'separator' },
          {
            label: '查看文档',
            click: () => shell.openExternal('https://snail-docs.empero.org'),
          },
          {
            label: '提交问题',
            click: () => shell.openExternal('https://github.com/empero/snail/issues'),
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
            click: () => BrowserWindow.getFocusedWindow()?.webContents.send('about-snail'),
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
