// M06: 考试验证服务
import { ipcMain } from 'electron';
import { getDb } from '../database/init';
import { Question, ExamResult } from '../../shared/types/course';
import type { CourseId } from '../../shared/course-catalog';
import { getCourseDataById } from '../../shared/course-catalog';
import { verifyOutput } from '../runner/service';

function toStoredChapterId(courseId: CourseId, chapterId: string): string {
  return `${courseId}:${chapterId}`;
}

export function getQuestions(courseId: CourseId, chapterId: string): Question[] {
  if (!chapterId) return [];
  return getCourseDataById(courseId).questions[chapterId] ?? [];
}

export function submitAnswers(
  userId: string,
  courseId: CourseId,
  chapterId: string,
  answers: Record<string, string>
): ExamResult {
  const questions = getQuestions(courseId, chapterId);
  const total = questions.length;

  if (total === 0) {
    return { score: 0, passed: false, correct: 0, total: 0 };
  }

  let correct = 0;
  questions.forEach(q => {
    const userAnswer = (answers[q.id] || '').trim();
    const expected = (q.answer || '').trim();

    if (q.type === 'choice' || q.type === 'fill') {
      if (normalizeAnswer(userAnswer) === normalizeAnswer(expected)) correct++;
    } else if (q.type === 'code') {
      // 编程题优先比较 expectedOutput，其次回退到 answer 字段
      if (verifyOutput(userAnswer, q.expectedOutput || expected)) correct++;
    }
  });

  const score = Math.round((correct / total) * 100);
  const passed = score >= 70;

  if (userId) {
    const db = getDb();
    db.prepare('INSERT INTO exam_records (user_id, chapter_id, score, passed, correct, total, taken_at) VALUES (?,?,?,?,?,?,?)')
      .run(userId, toStoredChapterId(courseId, chapterId), score, passed ? 1 : 0, correct, total, Date.now());
  }

  return { score, passed, correct, total };
}

export function getExamHistory(userId: string): ExamResult[] {
  const db = getDb();
  const rows = db.prepare(
    'SELECT score, passed, correct, total FROM exam_records WHERE user_id = ? ORDER BY taken_at DESC'
  ).all(userId) as { score: number; passed: number; correct: number; total: number }[];
  return rows.map(r => ({
    score: r.score,
    passed: !!r.passed,
    correct: r.correct ?? 0,
    total: r.total ?? 0,
  }));
}

function normalizeAnswer(s: string): string {
  return (s || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

export function registerIpcHandlers(): void {
  ipcMain.handle('exam:get-questions', async (_event, { courseId, chapterId }) => {
    return getQuestions(courseId, chapterId);
  });

  ipcMain.handle('exam:submit', async (_event, { answers, courseId, chapterId, userId }) => {
    return submitAnswers(userId ?? '', courseId, chapterId, answers ?? {});
  });
}
