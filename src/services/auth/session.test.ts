import { beforeEach, describe, expect, it } from 'vitest';
import {
  clearActiveSession,
  clearActiveSessionByToken,
  getActiveUserId,
  requireUserId,
  setActiveSession,
} from './session';

describe('主进程活动会话', () => {
  beforeEach(() => {
    clearActiveSession();
  });

  it('未登录时 requireUserId 抛出而不是返回空串', () => {
    expect(getActiveUserId()).toBeNull();
    expect(() => requireUserId()).toThrow('请先登录');
  });

  it('登录后返回会话中的 userId', () => {
    setActiveSession('user-1', 'token-1');
    expect(requireUserId()).toBe('user-1');
    expect(getActiveUserId()).toBe('user-1');
  });

  it('登出只清理令牌匹配的会话', () => {
    setActiveSession('user-1', 'token-1');

    clearActiveSessionByToken('别人的令牌');
    expect(getActiveUserId()).toBe('user-1');

    clearActiveSessionByToken('token-1');
    expect(getActiveUserId()).toBeNull();
  });

  it('切换账号会整体替换活动会话', () => {
    setActiveSession('user-1', 'token-1');
    setActiveSession('user-2', 'token-2');

    expect(requireUserId()).toBe('user-2');
    // 旧令牌不再能清掉新会话
    clearActiveSessionByToken('token-1');
    expect(getActiveUserId()).toBe('user-2');
  });
});
