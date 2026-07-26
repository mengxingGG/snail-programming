// 项目服务 — 文件系统操作 + 命令执行
// 独立于课程 AI，给教学 Agent 提供控制台和文件读写能力
import { ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import { executeProjectCommand, getProjectDir, resolveProjectFilePath } from './project-utils';

// ─── IPC 注册 ─────────────────────────────────────────

export function registerProjectIpcHandlers(): void {
  // 列出项目所有文件
  ipcMain.handle('project:list-files', async (_event, projectId: string) => {
    try {
      const projectDir = getProjectDir(projectId);
      if (!fs.existsSync(projectDir)) {
        return { success: false, error: `项目目录不存在：${projectId}` };
      }
      const files = listFilesRecursive(projectDir, projectDir);
      return { success: true, data: files };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  });

  // 读取文件
  ipcMain.handle('project:read-file', async (_event, projectId: string, filePath: string) => {
    try {
      const projectDir = getProjectDir(projectId);
      const fullPath = resolveProjectFilePath(projectDir, filePath);
      if (!fs.existsSync(fullPath)) {
        return { success: false, error: `文件不存在：${filePath}` };
      }
      const content = fs.readFileSync(fullPath, 'utf-8');
      return { success: true, data: content };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  });

  // 写入文件
  ipcMain.handle('project:write-file', async (_event, projectId: string, filePath: string, content: string) => {
    try {
      const projectDir = getProjectDir(projectId);
      const fullPath = resolveProjectFilePath(projectDir, filePath);
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(fullPath, content, 'utf-8');
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  });

  // 执行命令（同步，5秒超时）
  ipcMain.handle('project:exec', async (_event, projectId: string, command: string) => {
    try {
      const projectDir = getProjectDir(projectId);
      const output = executeProjectCommand(projectDir, command);
      return { success: true, data: output };
    } catch (e: any) {
      return {
        success: false,
        error: e.stderr || e.stdout || e.message,
        exitCode: e.status,
      };
    }
  });

  // 获取项目路径
  ipcMain.handle('project:get-path', async (_event, projectId: string) => {
    try {
      const projectDir = getProjectDir(projectId);
      return { success: true, data: projectDir };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  });
}

// ─── 辅助 ────────────────────────────────────────────

interface FileEntry {
  name: string;
  path: string;
  language: string;
  size: number;
}

function listFilesRecursive(dir: string, baseDir: string): FileEntry[] {
  const entries: FileEntry[] = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    const relPath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
    if (item.isDirectory()) {
      if (item.name === 'node_modules' || item.name === '__pycache__' || item.name.startsWith('.')) continue;
      entries.push(...listFilesRecursive(fullPath, baseDir));
    } else {
      entries.push({
        name: relPath,
        path: relPath,
        language: detectLanguage(item.name),
        size: fs.statSync(fullPath).size,
      });
    }
  }
  return entries;
}

function detectLanguage(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const map: Record<string, string> = {
    '.ts': 'typescript', '.tsx': 'typescript',
    '.py': 'python',
    '.html': 'html', '.htm': 'html',
    '.css': 'css',
    '.json': 'json',
    '.md': 'markdown', '.log': 'markdown',
    '.csv': 'markdown',
  };
  return map[ext] || 'text';
}
