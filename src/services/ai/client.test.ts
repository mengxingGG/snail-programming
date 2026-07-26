import { describe, expect, it, vi } from 'vitest';

vi.mock('electron', () => ({
  ipcMain: { handle: vi.fn() },
  app: { getPath: () => 'C:\\temp' },
}));

import { buildChatEndpoint, normalizeBaseUrl } from './client';

describe('normalizeBaseUrl', () => {
  it('去掉结尾多余的斜杠', () => {
    expect(normalizeBaseUrl('https://api.openai.com/v1/')).toBe('https://api.openai.com/v1');
    expect(normalizeBaseUrl('https://api.openai.com/v1///')).toBe('https://api.openai.com/v1');
    expect(normalizeBaseUrl('  https://api.deepseek.com/v1  ')).toBe('https://api.deepseek.com/v1');
  });

  it('允许本地 http 服务（Ollama 等）', () => {
    expect(normalizeBaseUrl('http://localhost:11434/v1')).toBe('http://localhost:11434/v1');
  });

  it('留空时回落到默认地址', () => {
    expect(normalizeBaseUrl('')).toBe('https://api.openai.com/v1');
    expect(normalizeBaseUrl('   ')).toBe('https://api.openai.com/v1');
    expect(normalizeBaseUrl(undefined)).toBe('https://api.openai.com/v1');
  });

  it('拒绝非 http/https 的地址，避免密钥被发往异常协议', () => {
    expect(() => normalizeBaseUrl('file:///C:/keys')).toThrow('http');
    expect(() => normalizeBaseUrl('javascript:alert(1)')).toThrow('http');
    expect(() => normalizeBaseUrl('api.openai.com/v1')).toThrow('http');
  });
});

describe('buildChatEndpoint', () => {
  it('拼接 chat/completions 时不会出现双斜杠', () => {
    expect(buildChatEndpoint('https://api.openai.com/v1')).toBe('https://api.openai.com/v1/chat/completions');
    expect(buildChatEndpoint('https://api.openai.com/v1/')).toBe('https://api.openai.com/v1/chat/completions');
  });
});
