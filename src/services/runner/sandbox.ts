// 沙箱执行（安全隔离）
// 基础版：限制执行时间 + 捕获输出
// 进阶版待实现：vm2/isolated-vm 进程隔离

export const SANDBOX_TIMEOUT_MS = 5000;
export const MAX_CODE_LENGTH = 10000;
export const FORBIDDEN_PATTERNS = [
  /require\s*\(/,
  /import\s+\{/,
  /process\.exit/,
  /child_process/,
  /fs\./,
];

export function validateCode(code: string, language: 'typescript' | 'python' = 'typescript'): string | null {
  if (code.length > MAX_CODE_LENGTH) return '代码过长（最大10000字符）';
  if (language === 'python') {
    if (/\b(os|subprocess|shutil)\b/.test(code) || /__import__\s*\(/.test(code)) {
      return 'Python 代码包含不允许的系统操作';
    }
    return null;
  }
  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(code)) return '代码包含不允许的操作';
  }
  return null;
}
