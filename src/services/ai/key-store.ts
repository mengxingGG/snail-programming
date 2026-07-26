// AI 密钥的落盘编码
//
// 早期版本把 apiKey 明文写进 userData/ai-config.json。
// 现在优先用 Electron safeStorage 交给系统钥匙串（Windows DPAPI / macOS Keychain /
// Linux libsecret）加密，读取时自动迁移旧的明文配置。

import { safeStorage } from 'electron';

export interface StoredKeyFields {
  /** 旧版明文字段，仅用于迁移 */
  apiKey?: string;
  /** 新版密文（base64） */
  apiKeyEnc?: string;
}

export function isEncryptionAvailable(): boolean {
  try {
    return safeStorage.isEncryptionAvailable();
  } catch {
    // 测试环境或缺少钥匙串后端时不可用
    return false;
  }
}

/** 把明文密钥编码成待落盘的字段；无法加密时退回明文并由调用方提示 */
export function encodeApiKey(plain: string): StoredKeyFields {
  if (!plain) return {};
  if (!isEncryptionAvailable()) return { apiKey: plain };

  try {
    return { apiKeyEnc: safeStorage.encryptString(plain).toString('base64') };
  } catch {
    return { apiKey: plain };
  }
}

/** 从落盘字段还原明文密钥，兼容旧的明文格式 */
export function decodeApiKey(fields: StoredKeyFields): string {
  if (fields.apiKeyEnc) {
    try {
      return safeStorage.decryptString(Buffer.from(fields.apiKeyEnc, 'base64'));
    } catch {
      // 换机器或钥匙串重置后无法解密，视为未配置，让用户重新填写
      return '';
    }
  }
  return fields.apiKey ?? '';
}

/** 磁盘上是否还残留明文密钥，用于触发一次性迁移重写 */
export function hasLegacyPlaintext(fields: StoredKeyFields): boolean {
  return !!fields.apiKey && !fields.apiKeyEnc;
}
