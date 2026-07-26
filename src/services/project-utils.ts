import { execFileSync } from 'child_process';
import { app } from 'electron';
import { buildSync } from 'esbuild';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

const BLOCKED_SHELL_PATTERN = /[|&;><`]/;
const ALLOWED_NPM_SCRIPTS = new Set(['dev', 'build', 'preview', 'test', 'lint', 'start', 'typecheck']);

interface ProjectCommandSpec {
  executable: string;
  args: string[];
  cleanup?: () => void;
}

function toPlatformCommand(command: string): string {
  if (process.platform === 'win32' && ['npm', 'pip'].includes(command)) {
    return `${command}.cmd`;
  }
  return command;
}

export function getProjectsRoot(): string {
  if (!app.isPackaged) {
    return path.join(app.getAppPath(), 'projects');
  }
  return path.join(process.resourcesPath, 'projects');
}

export function getProjectDir(projectId: string): string {
  const root = getProjectsRoot();
  for (const lang of ['typescript', 'python']) {
    const dir = path.join(root, lang, projectId);
    if (fs.existsSync(dir)) return dir;
  }
  return path.join(root, projectId);
}

export function resolveProjectFilePath(projectDir: string, filePath: string): string {
  const resolved = path.resolve(projectDir, filePath);
  const relative = path.relative(projectDir, resolved);

  if (
    relative === ''
    || (!relative.startsWith('..') && !path.isAbsolute(relative))
  ) {
    return resolved;
  }

  throw new Error(`路径越界：${filePath} 不在项目目录内`);
}

function parseProjectCommand(projectDir: string, command: string): ProjectCommandSpec {
  const trimmed = command.trim();
  if (!trimmed) {
    throw new Error('命令不能为空');
  }
  if (BLOCKED_SHELL_PATTERN.test(trimmed)) {
    throw new Error('不支持包含 shell 拼接符的命令');
  }

  const runTypeScriptMatch = trimmed.match(/^run-typescript\s+(.+)$/);
  if (runTypeScriptMatch) {
    const entryFile = resolveProjectFilePath(projectDir, runTypeScriptMatch[1].trim());
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'snail-ts-run-'));
    const outfile = path.join(tempDir, 'entry.mjs');

    buildSync({
      entryPoints: [entryFile],
      outfile,
      bundle: true,
      format: 'esm',
      platform: 'node',
      target: 'node18',
      absWorkingDir: projectDir,
      logLevel: 'silent',
      sourcemap: 'inline',
      packages: 'external',
    });

    return {
      executable: process.execPath,
      args: [outfile],
      cleanup: () => fs.rmSync(tempDir, { recursive: true, force: true }),
    };
  }

  const fileCommandPatterns: Array<{ pattern: RegExp; executable: string }> = [
    { pattern: /^(?:run-python|python)\s+(.+)$/, executable: 'python' },
    { pattern: /^node\s+(.+)$/, executable: process.execPath },
  ];

  for (const item of fileCommandPatterns) {
    const match = trimmed.match(item.pattern);
    if (match) {
      const filePath = resolveProjectFilePath(projectDir, match[1].trim());
      return {
        executable: item.executable,
        args: [filePath],
      };
    }
  }

  if (trimmed === 'npm install') {
    return {
      executable: toPlatformCommand('npm'),
      args: ['install'],
    };
  }

  const npmRunMatch = trimmed.match(/^npm\s+run\s+([a-zA-Z0-9:_-]+)$/);
  if (npmRunMatch) {
    const scriptName = npmRunMatch[1];
    if (!ALLOWED_NPM_SCRIPTS.has(scriptName)) {
      throw new Error(`不支持执行 npm run ${scriptName}`);
    }
    return {
      executable: toPlatformCommand('npm'),
      args: ['run', scriptName],
    };
  }

  const pipInstallMatch = trimmed.match(/^(?:pip|python\s+-m\s+pip)\s+install\s+-r\s+(.+)$/);
  if (pipInstallMatch) {
    const requirementsFile = resolveProjectFilePath(projectDir, pipInstallMatch[1].trim());
    if (trimmed.startsWith('python -m pip')) {
      return {
        executable: 'python',
        args: ['-m', 'pip', 'install', '-r', requirementsFile],
      };
    }
    return {
      executable: toPlatformCommand('pip'),
      args: ['install', '-r', requirementsFile],
    };
  }

  throw new Error(`不支持的命令：${command}`);
}

export function executeProjectCommand(projectDir: string, command: string): string {
  const spec = parseProjectCommand(projectDir, command);

  try {
    return execFileSync(spec.executable, spec.args, {
      cwd: projectDir,
      timeout: 10000,
      encoding: 'utf-8',
      maxBuffer: 1024 * 1024,
      env: { ...process.env, PYTHONIOENCODING: 'utf-8' },
    });
  } finally {
    spec.cleanup?.();
  }
}
