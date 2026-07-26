import { describe, expect, it } from 'vitest';
import { isSafeExternalUrl } from './url-safety';

describe('isSafeExternalUrl', () => {
  it('放行 http 与 https 链接', () => {
    expect(isSafeExternalUrl('https://snail-docs.empero.org')).toBe(true);
    expect(isSafeExternalUrl('http://localhost:5173/docs')).toBe(true);
    expect(isSafeExternalUrl('https://example.com/a?b=c#d')).toBe(true);
  });

  it('拦截 file 协议，避免用系统默认程序打开本地文件', () => {
    expect(isSafeExternalUrl('file:///C:/Windows/System32/calc.exe')).toBe(false);
    expect(isSafeExternalUrl('file:///etc/passwd')).toBe(false);
  });

  it('拦截其他可执行本地程序的协议', () => {
    expect(isSafeExternalUrl('javascript:alert(1)')).toBe(false);
    expect(isSafeExternalUrl('ms-msdt:/id')).toBe(false);
    expect(isSafeExternalUrl('vbscript:msgbox(1)')).toBe(false);
    expect(isSafeExternalUrl('data:text/html,<script>alert(1)</script>')).toBe(false);
  });

  it('拦截非字符串与畸形输入', () => {
    expect(isSafeExternalUrl('')).toBe(false);
    expect(isSafeExternalUrl('   ')).toBe(false);
    expect(isSafeExternalUrl('not a url')).toBe(false);
    expect(isSafeExternalUrl('//example.com')).toBe(false);
    expect(isSafeExternalUrl(undefined)).toBe(false);
    expect(isSafeExternalUrl(null)).toBe(false);
    expect(isSafeExternalUrl(42)).toBe(false);
    expect(isSafeExternalUrl({ toString: () => 'https://evil.com' })).toBe(false);
  });
});
