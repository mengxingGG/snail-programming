// M05: 代码执行服务
import { ipcMain } from 'electron';
import { compileAndRun } from './compiler';
import { validateCode } from './sandbox';

export interface RunResult {
  success: boolean;
  output: string;
  error?: string;
  stderr?: string;
  details?: string;
  executionTimeMs: number;
}

function normalizeProcessText(value: unknown): string {
  if (typeof value === 'string') return value.trim();
  if (Buffer.isBuffer(value)) return value.toString('utf-8').trim();
  return '';
}

function buildErrorSuggestion(summary: string, stderr: string): string | undefined {
  const text = `${summary}\n${stderr}`;
  if (/ReferenceError/i.test(text)) {
    return '建议：检查变量名是否拼写正确，并确认变量已经声明后再使用。';
  }
  if (/SyntaxError/i.test(text)) {
    return '建议：检查括号、引号、逗号以及关键字拼写，语法错误通常就出在这些位置。';
  }
  if (/TypeError/i.test(text)) {
    return '建议：检查变量类型，以及对象是否为 undefined 或 null。';
  }
  if (/IndentationError/i.test(text)) {
    return '建议：检查缩进层级是否一致，Python 对缩进非常敏感。';
  }
  return undefined;
}

function formatRunnerFailure(err: any) {
  const summary = err?.message || String(err);
  const output = normalizeProcessText(err?.stdout);
  const stderr = normalizeProcessText(err?.stderr);
  const details: string[] = [];

  if (Array.isArray(err?.errors) && err.errors.length > 0) {
    details.push('编译诊断：');
    for (const diagnostic of err.errors) {
      const location = diagnostic.location
        ? `${diagnostic.location.line}:${diagnostic.location.column}`
        : '未知位置';
      details.push(`- ${location} ${diagnostic.text}`);
    }
  }

  if (typeof err?.status === 'number') {
    details.push(`退出码：${err.status}`);
  }
  if (err?.signal) {
    details.push(`终止信号：${err.signal}`);
  }
  if (stderr) {
    details.push(stderr);
  }

  const suggestion = buildErrorSuggestion(summary, stderr);
  if (suggestion) {
    details.push(suggestion);
  }

  return {
    error: summary,
    output,
    stderr: stderr || undefined,
    details: details.length > 0 ? details.join('\n') : undefined,
  };
}

export async function runCode(code: string, language: 'typescript' | 'python' = 'typescript'): Promise<RunResult> {
  // 先安全检查
  const validationError = validateCode(code, language);
  if (validationError) {
    return {
      success: false,
      output: '',
      error: validationError,
      details: '代码未通过安全校验，请根据提示修改后再运行。',
      executionTimeMs: 0,
    };
  }

  const start = Date.now();
  try {
    const output = await compileAndRun(code, language);
    return {
      success: true,
      output: output.trim(),
      executionTimeMs: Date.now() - start,
    };
  } catch (err: any) {
    const failure = formatRunnerFailure(err);
    return {
      success: false,
      output: failure.output,
      error: failure.error,
      stderr: failure.stderr,
      details: failure.details,
      executionTimeMs: Date.now() - start,
    };
  }
}

export function verifyOutput(actual: string, expected: string): boolean {
  return actual.trim() === expected.trim();
}

export function registerIpcHandlers(): void {
  ipcMain.handle('code:run', async (_event, { code, language }) => {
    return runCode(code, language);
  });
}
