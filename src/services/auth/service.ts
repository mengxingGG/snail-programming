// M03: 账号服务
import crypto from 'crypto';
import { ipcMain } from 'electron';
import { getDb } from '../database/init';
import { User, UserSession } from '../../shared/types/user';

const FUN_NICKNAMES = [
  '会写代码的蜗牛',
  '凌晨三点的变量猎人',
  'Bug 驯兽师',
  '类型体操练习生',
  '全栈小宇航员',
  'Console 魔法师',
  '函数山谷旅人',
  '像素炼金术士',
];

// PBKDF2 参数。哈希串格式为 salt:iterations:hash，
// 旧版本只有 salt:hash 两段，按当时固定的 10000 次迭代校验。
const PBKDF2_ITERATIONS = 210_000;
const PBKDF2_KEY_LENGTH = 64;
const PBKDF2_DIGEST = 'sha512';
const LEGACY_ITERATIONS = 10_000;

const USERNAME_MAX_LENGTH = 32;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 128;

function derive(password: string, salt: string, iterations: number): Buffer {
  return crypto.pbkdf2Sync(password, salt, iterations, PBKDF2_KEY_LENGTH, PBKDF2_DIGEST);
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = derive(password, salt, PBKDF2_ITERATIONS).toString('hex');
  return `${salt}:${PBKDF2_ITERATIONS}:${hash}`;
}

interface ParsedHash {
  salt: string;
  iterations: number;
  hash: string;
}

function parseStoredHash(stored: unknown): ParsedHash | null {
  if (typeof stored !== 'string') return null;
  const parts = stored.split(':');

  let salt: string;
  let hash: string;
  let iterations: number;

  if (parts.length === 3) {
    [salt, , hash] = parts;
    iterations = Number(parts[1]);
  } else if (parts.length === 2) {
    [salt, hash] = parts;
    iterations = LEGACY_ITERATIONS;
  } else {
    return null;
  }

  if (!salt || !hash) return null;
  if (!Number.isInteger(iterations) || iterations <= 0) return null;
  return { salt, iterations, hash };
}

export function verifyPassword(password: string, stored: unknown): boolean {
  const parsed = parseStoredHash(stored);
  if (!parsed) return false;

  const expected = Buffer.from(parsed.hash, 'hex');
  // 长度不符时 timingSafeEqual 会抛异常，先挡掉损坏的记录
  if (expected.length !== PBKDF2_KEY_LENGTH) return false;

  const actual = derive(password, parsed.salt, parsed.iterations);
  return crypto.timingSafeEqual(expected, actual);
}

/** 旧格式或低迭代次数的哈希需要在下次登录成功后升级 */
export function needsRehash(stored: unknown): boolean {
  const parsed = parseStoredHash(stored);
  if (!parsed) return false;
  return parsed.iterations < PBKDF2_ITERATIONS;
}

function normalizeUsername(username: unknown): string {
  if (typeof username !== 'string') throw new Error('用户名不能为空');
  const value = username.trim();
  if (!value) throw new Error('用户名不能为空');
  if (value.length > USERNAME_MAX_LENGTH) throw new Error(`用户名最多${USERNAME_MAX_LENGTH}个字符`);
  return value;
}

function assertPassword(password: unknown): string {
  if (typeof password !== 'string' || !password) throw new Error('密码不能为空');
  if (password.length < PASSWORD_MIN_LENGTH) throw new Error(`密码至少${PASSWORD_MIN_LENGTH}个字符`);
  if (password.length > PASSWORD_MAX_LENGTH) throw new Error(`密码最多${PASSWORD_MAX_LENGTH}个字符`);
  return password;
}

/** 清理过期会话，避免 sessions 表无限增长 */
export function purgeExpiredSessions(): number {
  const result = getDb().prepare('DELETE FROM sessions WHERE expires_at < ?').run(Date.now());
  return result.changes;
}

function makeNickname(userId: string): string {
  const index = userId.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % FUN_NICKNAMES.length;
  return FUN_NICKNAMES[index];
}

export function register(username: string, password: string): User {
  const name = normalizeUsername(username);
  assertPassword(password);

  const db = getDb();
  const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(name);
  if (existing) throw new Error('用户名已存在');
  const id = crypto.randomUUID();
  const passwordHash = hashPassword(password);
  const createdAt = Date.now();
  db.prepare('INSERT INTO users (id, username, password_hash, created_at) VALUES (?,?,?,?)')
    .run(id, name, passwordHash, createdAt);
  ensureProfile(id);
  return { id, username: name, passwordHash, createdAt };
}

export function login(username: string, password: string): UserSession {
  const name = normalizeUsername(username);
  // 登录只要求非空：老用户的密码可能不满足当前的长度规则
  if (typeof password !== 'string' || !password) throw new Error('密码不能为空');

  const db = getDb();
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(name) as any;
  if (!user) throw new Error('用户名不存在');
  if (!verifyPassword(password, user.password_hash)) throw new Error('密码错误');

  // 登录成功后把旧格式/低迭代的哈希升级到当前强度
  if (needsRehash(user.password_hash)) {
    db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(hashPassword(password), user.id);
  }

  ensureProfile(user.id);
  purgeExpiredSessions();
  const token = crypto.randomUUID();
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
  db.prepare('INSERT OR REPLACE INTO sessions (user_id, token, expires_at) VALUES (?,?,?)')
    .run(user.id, token, expiresAt);
  return { userId: user.id, token, expiresAt };
}

export function validateSession(token: string): string | null {
  if (typeof token !== 'string' || !token) return null;
  const db = getDb();
  const session = db.prepare('SELECT * FROM sessions WHERE token = ?').get(token) as any;
  if (!session) return null;
  if (session.expires_at < Date.now()) {
    db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
    return null;
  }
  return session.user_id;
}

export function ensureProfile(userId: string): { userId: string; nickname: string } {
  const db = getDb();
  const row = db.prepare('SELECT nickname FROM user_profiles WHERE user_id = ?').get(userId) as { nickname: string } | undefined;
  if (row) return { userId, nickname: row.nickname };
  const nickname = makeNickname(userId);
  db.prepare('INSERT INTO user_profiles (user_id, nickname, updated_at) VALUES (?, ?, ?)')
    .run(userId, nickname, Date.now());
  return { userId, nickname };
}

export function saveProfile(userId: string, nickname: string): { userId: string; nickname: string } {
  const value = typeof nickname === 'string' ? nickname.trim() : '';
  if (!userId) throw new Error('请先登录');
  if (!value) throw new Error('昵称不能为空');
  if (value.length > 20) throw new Error('昵称最多20个字符');
  getDb().prepare(`
    INSERT INTO user_profiles (user_id, nickname, updated_at)
    VALUES (?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET nickname = excluded.nickname, updated_at = excluded.updated_at
  `).run(userId, value, Date.now());
  return { userId, nickname: value };
}

export function registerIpcHandlers(): void {
  ipcMain.handle('auth:register', async (_event, { username, password }) => {
    register(username, password);
    return login(username, password);
  });

  ipcMain.handle('auth:login', async (_event, { username, password }) => {
    return login(username, password);
  });

  ipcMain.handle('auth:logout', async (_event, { token }) => {
    if (token) {
      getDb().prepare('DELETE FROM sessions WHERE token = ?').run(token);
    }
    return { success: true };
  });

  ipcMain.handle('auth:get-session', async (_event, { token }) => {
    const userId = validateSession(token);
    return { userId };
  });

  ipcMain.handle('profile:get', async (_event, { userId }) => {
    return ensureProfile(userId);
  });

  ipcMain.handle('profile:save', async (_event, { userId, nickname }) => {
    return saveProfile(userId, nickname);
  });
}
