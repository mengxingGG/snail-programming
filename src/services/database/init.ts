// M02: 数据库初始化
import Database from 'better-sqlite3';
import path from 'path';
import { app } from 'electron';
import { DB_PATH } from '../../shared/constants';
import { runMigrations } from './migrations';

let db: Database.Database | null = null;

export function initDatabase(): void {
  try {
    const dbFile = path.join(app.getPath('userData'), DB_PATH);
    db = new Database(dbFile);

    // WAL 模式提升并发读写性能
    db.pragma('journal_mode = WAL');

    createTables();
    runMigrations();
  } catch (err) {
    console.error('[M02] 数据库初始化失败:', err);
    throw new Error(
      `无法初始化数据库：${err instanceof Error ? err.message : String(err)}`,
      { cause: err },
    );
  }
}

function createTables(): void {
  if (!db) throw new Error('Database not initialized');

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS sessions (
      user_id TEXT PRIMARY KEY,
      token TEXT NOT NULL,
      expires_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS user_profiles (
      user_id TEXT PRIMARY KEY,
      nickname TEXT NOT NULL,
      updated_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS user_plans (
      user_id TEXT PRIMARY KEY,
      plan_id TEXT NOT NULL,
      start_chapter_id TEXT NOT NULL,
      start_section_id TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS progress (
      user_id TEXT NOT NULL,
      section_id TEXT NOT NULL,
      completed_at INTEGER NOT NULL,
      PRIMARY KEY (user_id, section_id)
    );
    CREATE TABLE IF NOT EXISTS code_files (
      user_id TEXT NOT NULL,
      filename TEXT NOT NULL,
      content TEXT NOT NULL,
      updated_at INTEGER NOT NULL,
      PRIMARY KEY (user_id, filename)
    );
    CREATE TABLE IF NOT EXISTS exam_records (
      user_id TEXT NOT NULL,
      chapter_id TEXT NOT NULL,
      score INTEGER NOT NULL,
      passed INTEGER NOT NULL,
      correct INTEGER NOT NULL DEFAULT 0,
      total INTEGER NOT NULL DEFAULT 0,
      taken_at INTEGER NOT NULL
    );
  `);
}

export function getDb(): Database.Database {
  if (!db) throw new Error('Database not initialized');
  return db;
}

export { runMigrations };
