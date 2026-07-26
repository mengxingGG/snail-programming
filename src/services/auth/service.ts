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

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return salt + ':' + hash;
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':');
  const verify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === verify;
}

function makeNickname(userId: string): string {
  const index = userId.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % FUN_NICKNAMES.length;
  return FUN_NICKNAMES[index];
}

export function register(username: string, password: string): User {
  if (!username) throw new Error('用户名不能为空');
  if (!password) throw new Error('密码不能为空');

  const db = getDb();
  const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
  if (existing) throw new Error('用户名已存在');
  const id = crypto.randomUUID();
  const passwordHash = hashPassword(password);
  db.prepare('INSERT INTO users (id, username, password_hash, created_at) VALUES (?,?,?,?)')
    .run(id, username, passwordHash, Date.now());
  ensureProfile(id);
  return { id, username, passwordHash, createdAt: Date.now() };
}

export function login(username: string, password: string): UserSession {
  if (!username) throw new Error('用户名不能为空');
  if (!password) throw new Error('密码不能为空');

  const db = getDb();
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as any;
  if (!user) throw new Error('用户名不存在');
  if (!verifyPassword(password, user.password_hash)) throw new Error('密码错误');
  ensureProfile(user.id);
  const token = crypto.randomUUID();
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
  db.prepare('INSERT OR REPLACE INTO sessions (user_id, token, expires_at) VALUES (?,?,?)')
    .run(user.id, token, expiresAt);
  return { userId: user.id, token, expiresAt };
}

export function validateSession(token: string): string | null {
  if (!token) return null;
  const db = getDb();
  const session = db.prepare('SELECT * FROM sessions WHERE token = ?').get(token) as any;
  if (!session || session.expires_at < Date.now()) return null;
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
  const value = nickname.trim();
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
