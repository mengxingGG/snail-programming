import crypto from 'crypto';
import { describe, expect, it, vi } from 'vitest';

vi.mock('electron', () => ({
  ipcMain: { handle: vi.fn() },
}));

vi.mock('../database/init', () => ({
  getDb: () => {
    throw new Error('这些用例不触碰数据库');
  },
}));

import { hashPassword, needsRehash, verifyPassword } from './service';

/** 复现旧版本的哈希格式：salt:hash，固定 10000 次迭代 */
function legacyHash(password: string, salt = 'a'.repeat(32)): string {
  const hash = crypto.pbkdf2Sync(password, salt, 10_000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

describe('密码哈希', () => {
  it('同一密码每次生成不同的哈希（随机盐）', () => {
    expect(hashPassword('snail-2026')).not.toBe(hashPassword('snail-2026'));
  });

  it('哈希串包含迭代次数，便于日后升级参数', () => {
    const [salt, iterations, hash] = hashPassword('snail-2026').split(':');
    expect(salt).toHaveLength(32);
    expect(Number(iterations)).toBe(210_000);
    expect(hash).toHaveLength(128);
  });

  it('校验正确密码通过、错误密码不通过', () => {
    const stored = hashPassword('snail-2026');
    expect(verifyPassword('snail-2026', stored)).toBe(true);
    expect(verifyPassword('snail-2027', stored)).toBe(false);
    expect(verifyPassword('', stored)).toBe(false);
  });

  it('仍然兼容旧的两段式哈希', () => {
    const stored = legacyHash('old-password');
    expect(verifyPassword('old-password', stored)).toBe(true);
    expect(verifyPassword('wrong', stored)).toBe(false);
  });

  it('损坏或非法的哈希记录一律判定为失败，而不是抛异常', () => {
    expect(verifyPassword('x', '')).toBe(false);
    expect(verifyPassword('x', 'no-separator')).toBe(false);
    expect(verifyPassword('x', 'salt:not-a-number:abcd')).toBe(false);
    expect(verifyPassword('x', 'salt:0:abcd')).toBe(false);
    // 长度不足的哈希曾经会让 timingSafeEqual 抛出异常
    expect(verifyPassword('x', 'salt:210000:dead')).toBe(false);
    expect(verifyPassword('x', 'a:b:c:d')).toBe(false);
    expect(verifyPassword('x', undefined)).toBe(false);
    expect(verifyPassword('x', null)).toBe(false);
    expect(verifyPassword('x', 12345)).toBe(false);
  });
});

describe('needsRehash', () => {
  it('旧格式哈希需要升级', () => {
    expect(needsRehash(legacyHash('old-password'))).toBe(true);
  });

  it('当前强度的哈希不需要升级', () => {
    expect(needsRehash(hashPassword('snail-2026'))).toBe(false);
  });

  it('无法解析的哈希不触发升级', () => {
    expect(needsRehash('garbage')).toBe(false);
    expect(needsRehash(null)).toBe(false);
  });
});
