// M04: 进度存储
import { ipcMain } from 'electron';
import { getDb } from '../database/init';
import { CourseProgress } from '../../shared/types/course';
import type { CourseId } from '../../shared/course-catalog';
import { getCourseIdFromPlanId } from '../../shared/course-catalog';
import { requireUserId } from '../auth/session';

export interface UserPlan {
  userId: string;
  planId: string;
  courseId: CourseId;
  startChapterId: string;
  startSectionId: string;
}

function assertUserId(userId: string): void {
  if (!userId) throw new Error('请先登录');
}

export function savePlan(userId: string, planId: string, startChapterId: string, startSectionId: string): UserPlan {
  assertUserId(userId);
  const courseId = getCourseIdFromPlanId(planId);
  const now = Date.now();
  const db = getDb();
  db.prepare(`
    INSERT INTO user_plans (user_id, plan_id, start_chapter_id, start_section_id, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET
      plan_id = excluded.plan_id,
      start_chapter_id = excluded.start_chapter_id,
      start_section_id = excluded.start_section_id,
      updated_at = excluded.updated_at
  `).run(userId, planId, startChapterId, startSectionId, now, now);
  return { userId, planId, courseId, startChapterId, startSectionId };
}

export function loadPlan(userId: string): UserPlan | null {
  assertUserId(userId);
  const row = getDb().prepare('SELECT * FROM user_plans WHERE user_id = ?').get(userId) as any;
  if (!row) return null;
  return {
    userId: row.user_id,
    planId: row.plan_id,
    courseId: getCourseIdFromPlanId(row.plan_id),
    startChapterId: row.start_chapter_id,
    startSectionId: row.start_section_id,
  };
}

function toStoredSectionId(courseId: CourseId, sectionId: string): string {
  return `${courseId}:${sectionId}`;
}

function fromStoredSectionId(courseId: CourseId, storedSectionId: string): string | null {
  const prefix = `${courseId}:`;
  if (storedSectionId.startsWith(prefix)) {
    return storedSectionId.slice(prefix.length);
  }
  if (courseId === 'typescript' && !storedSectionId.includes(':')) {
    return storedSectionId;
  }
  return null;
}

export function saveProgress(userId: string, sectionId: string, courseId: CourseId = 'typescript'): void {
  assertUserId(userId);
  const db = getDb();
  const storedSectionId = toStoredSectionId(courseId, sectionId);
  db.prepare('INSERT OR IGNORE INTO progress (user_id, section_id, completed_at) VALUES (?,?,?)')
    .run(userId, storedSectionId, Date.now());
}

export function loadProgress(userId: string, courseId: CourseId = 'typescript'): CourseProgress {
  assertUserId(userId);
  const db = getDb();
  const sections = db.prepare('SELECT section_id FROM progress WHERE user_id = ? ORDER BY completed_at')
    .all(userId) as { section_id: string }[];
  const completedSections = Array.from(new Set(sections
    .map(item => fromStoredSectionId(courseId, item.section_id))
    .filter((sectionId): sectionId is string => Boolean(sectionId))));
  return {
    userId,
    courseId,
    completedSections,
    completedChapters: [],
    currentSectionId: completedSections.length > 0 ? completedSections[completedSections.length - 1] : '',
  };
}

export function isSectionCompleted(userId: string, sectionId: string, courseId: CourseId = 'typescript'): boolean {
  assertUserId(userId);
  const db = getDb();
  const storedSectionId = toStoredSectionId(courseId, sectionId);
  const row = db.prepare('SELECT 1 FROM progress WHERE user_id = ? AND section_id = ?')
    .get(userId, storedSectionId)
    ?? (courseId === 'typescript'
      ? db.prepare('SELECT 1 FROM progress WHERE user_id = ? AND section_id = ?').get(userId, sectionId)
      : null);
  return !!row;
}

export function saveCodeFile(userId: string, filename: string, content: string): void {
  assertUserId(userId);
  if (Buffer.byteLength(content, 'utf-8') > 1024 * 1024) {
    throw new Error('文件过大');
  }
  const db = getDb();
  db.prepare('INSERT OR REPLACE INTO code_files (user_id, filename, content, updated_at) VALUES (?,?,?,?)')
    .run(userId, filename, content, Date.now());
}

export function loadCodeFile(userId: string, filename: string): string | null {
  assertUserId(userId);
  const db = getDb();
  const row = db.prepare('SELECT content FROM code_files WHERE user_id = ? AND filename = ?')
    .get(userId, filename) as { content: string } | undefined;
  return row?.content ?? null;
}

export function listCodeFiles(userId: string): string[] {
  assertUserId(userId);
  const db = getDb();
  const rows = db.prepare('SELECT filename FROM code_files WHERE user_id = ?')
    .all(userId) as { filename: string }[];
  return rows.map(r => r.filename);
}

// 所有 handler 的 userId 一律取自主进程会话，渲染层传入的值不作数
export function registerIpcHandlers(): void {
  ipcMain.handle('plan:get', async () => {
    return loadPlan(requireUserId());
  });

  ipcMain.handle('plan:save', async (_event, { planId, startChapterId, startSectionId }) => {
    return savePlan(requireUserId(), planId, startChapterId, startSectionId);
  });

  ipcMain.handle('progress:save', async (_event, { sectionId, courseId }) => {
    saveProgress(requireUserId(), sectionId, courseId);
    return { success: true };
  });

  ipcMain.handle('progress:load', async (_event, { courseId }) => {
    return loadProgress(requireUserId(), courseId);
  });

  ipcMain.handle('progress:complete-section', async (_event, { sectionId, courseId }) => {
    const userId = requireUserId();
    saveProgress(userId, sectionId, courseId);
    return loadProgress(userId, courseId);
  });

  ipcMain.handle('code:save', async (_event, { filename, code }) => {
    saveCodeFile(requireUserId(), filename, code);
    return { success: true };
  });

  ipcMain.handle('code:load', async (_event, { filename }) => {
    const content = loadCodeFile(requireUserId(), filename);
    return { content };
  });

  ipcMain.handle('code:list', async () => {
    return { files: listCodeFiles(requireUserId()) };
  });
}
