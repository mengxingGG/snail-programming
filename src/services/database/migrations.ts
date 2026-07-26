// 数据库迁移
import { getDb } from './init';

export function runMigrations(): void {
  const db = getDb();
  const columns = db.prepare(`PRAGMA table_info('exam_records')`).all() as Array<{ name: string }>;
  const columnNames = new Set(columns.map(column => column.name));

  if (!columnNames.has('correct')) {
    db.exec('ALTER TABLE exam_records ADD COLUMN correct INTEGER NOT NULL DEFAULT 0');
  }
  if (!columnNames.has('total')) {
    db.exec('ALTER TABLE exam_records ADD COLUMN total INTEGER NOT NULL DEFAULT 0');
  }
}
