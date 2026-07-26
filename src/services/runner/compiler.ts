// TS 编译与执行（使用 esbuild）
import * as esbuild from 'esbuild';
import { execFileSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

async function compileTypeScript(code: string): Promise<string> {
  const result = await esbuild.transform(code, {
    loader: 'ts',
    target: 'es2022',
    format: 'cjs',
  });
  return result.code;
}

function buildExecutionOptions(language: 'typescript' | 'python', cwd: string) {
  const baseOptions = {
    timeout: 5000,
    encoding: 'utf-8' as BufferEncoding,
    // 在临时目录内执行，学生代码的相对路径写操作不会落到应用目录
    cwd,
    // 限制输出体积，避免死循环打印撑爆主进程内存
    maxBuffer: 4 * 1024 * 1024,
    env: {
      ...process.env,
    },
  };

  if (language === 'python') {
    return {
      ...baseOptions,
      env: {
        ...baseOptions.env,
        PYTHONIOENCODING: 'utf-8',
        PYTHONUTF8: '1',
      },
    };
  }

  return baseOptions;
}

export async function compileAndRun(code: string, language: 'typescript' | 'python' = 'typescript'): Promise<string> {
  const extension = language === 'python' ? 'py' : 'js';
  const executableCode = language === 'python' ? code : await compileTypeScript(code);

  // 每次执行使用 mkdtemp 创建的私有临时目录。
  // 原先用 snail_tmp_<时间戳> 直接落在共享临时目录里：路径可预测，
  // 同机器的其他用户可以抢先建同名符号链接；多个应用实例也可能撞名。
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'snail-run-'));
  const tmpFile = path.join(tmpDir, `main.${extension}`);
  fs.writeFileSync(tmpFile, executableCode, 'utf-8');

  try {
    const output = language === 'python'
      ? execFileSync('python', [tmpFile], buildExecutionOptions('python', tmpDir))
      : execFileSync('node', [tmpFile], buildExecutionOptions('typescript', tmpDir));
    return output;
  } finally {
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
  }
}
