import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockSafeStorage } = vi.hoisted(() => ({
  mockSafeStorage: {
    isEncryptionAvailable: vi.fn(),
    encryptString: vi.fn(),
    decryptString: vi.fn(),
  },
}));

vi.mock('electron', () => ({ safeStorage: mockSafeStorage }));

import { decodeApiKey, encodeApiKey, hasLegacyPlaintext, isEncryptionAvailable } from './key-store';

// 用可逆的假"加密"验证编解码链路，真实加密由 Electron 负责
function fakeEncrypt(text: string): Buffer {
  return Buffer.from(`enc:${text}`, 'utf-8');
}

describe('钥匙串可用时', () => {
  beforeEach(() => {
    mockSafeStorage.isEncryptionAvailable.mockReturnValue(true);
    mockSafeStorage.encryptString.mockImplementation(fakeEncrypt);
    mockSafeStorage.decryptString.mockImplementation((buf: Buffer) =>
      buf.toString('utf-8').replace(/^enc:/, ''));
  });

  it('密钥以密文落盘，明文字段不出现', () => {
    const fields = encodeApiKey('sk-secret-value');

    expect(fields.apiKey).toBeUndefined();
    expect(fields.apiKeyEnc).toBeTruthy();
    expect(JSON.stringify(fields)).not.toContain('sk-secret-value');
  });

  it('密文可以还原成原始密钥', () => {
    expect(decodeApiKey(encodeApiKey('sk-secret-value'))).toBe('sk-secret-value');
  });

  it('解密失败时返回空串，让用户重新填写而不是崩溃', () => {
    mockSafeStorage.decryptString.mockImplementation(() => {
      throw new Error('钥匙串已重置');
    });

    expect(decodeApiKey({ apiKeyEnc: 'bm9uc2Vuc2U=' })).toBe('');
  });

  it('加密过程抛错时退回明文而不是丢失密钥', () => {
    mockSafeStorage.encryptString.mockImplementation(() => {
      throw new Error('后端不可用');
    });

    expect(encodeApiKey('sk-x')).toEqual({ apiKey: 'sk-x' });
  });
});

describe('钥匙串不可用时', () => {
  beforeEach(() => {
    mockSafeStorage.isEncryptionAvailable.mockReturnValue(false);
  });

  it('如实退回明文存储', () => {
    expect(isEncryptionAvailable()).toBe(false);
    expect(encodeApiKey('sk-x')).toEqual({ apiKey: 'sk-x' });
  });

  it('空密钥不写入任何字段', () => {
    expect(encodeApiKey('')).toEqual({});
  });
});

describe('旧版明文配置的迁移', () => {
  beforeEach(() => {
    mockSafeStorage.isEncryptionAvailable.mockReturnValue(true);
    mockSafeStorage.encryptString.mockImplementation(fakeEncrypt);
    mockSafeStorage.decryptString.mockImplementation((buf: Buffer) =>
      buf.toString('utf-8').replace(/^enc:/, ''));
  });

  it('旧的明文密钥仍能读出', () => {
    expect(decodeApiKey({ apiKey: 'sk-legacy' })).toBe('sk-legacy');
  });

  it('识别出需要迁移的明文配置', () => {
    expect(hasLegacyPlaintext({ apiKey: 'sk-legacy' })).toBe(true);
    expect(hasLegacyPlaintext({ apiKeyEnc: 'abc' })).toBe(false);
    expect(hasLegacyPlaintext({ apiKey: 'sk-legacy', apiKeyEnc: 'abc' })).toBe(false);
    expect(hasLegacyPlaintext({})).toBe(false);
  });

  it('密文优先于残留的明文字段', () => {
    expect(decodeApiKey({ apiKey: 'sk-old', apiKeyEnc: fakeEncrypt('sk-new').toString('base64') }))
      .toBe('sk-new');
  });
});
