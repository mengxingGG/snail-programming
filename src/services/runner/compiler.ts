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

function buildExecutionOptions(language: 'typescript' | 'python') {
  const baseOptions = {
    timeout: 5000,
    encoding: 'utf-8' as BufferEncoding,
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
  const tmpDir = os.tmpdir();
  const timestamp = Date.now();
  const extension = language === 'python' ? 'py' : 'js';
  const tmpFile = path.join(tmpDir, `snail_tmp_${timestamp}.${extension}`);
  const executableCode = language === 'python' ? code : await compileTypeScript(code);
  fs.writeFileSync(tmpFile, executableCode, 'utf-8');
  try {
    const output = language === 'python'
      ? execFileSync('python', [tmpFile], buildExecutionOptions('python'))
      : execFileSync('node', [tmpFile], buildExecutionOptions('typescript'));
    return output;
  } finally {
    try { fs.unlinkSync(tmpFile); } catch {}
  }
}
