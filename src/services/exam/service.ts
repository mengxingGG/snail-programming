// M06: 考试验证服务
import { ipcMain } from 'electron';
import { getDb } from '../database/init';
import { Question, ExamResult } from '../../shared/types/course';
import type { CourseId } from '../../shared/course-catalog';
import { getCourseDataById } from '../../shared/course-catalog';
import { runCode, verifyOutput } from '../runner/service';
import { getActiveUserId } from '../auth/session';

function toStoredChapterId(courseId: CourseId, chapterId: string): string {
  return `${courseId}:${chapterId}`;
}

export function getQuestions(courseId: CourseId, chapterId: string): Question[] {
  if (!chapterId) return [];
  return getCourseDataById(courseId).questions[chapterId] ?? [];
}

/** 题量少时按百分比划线会失真：3 题 70% 等于必须全对，所以小卷改成"允许错一题" */
const SMALL_EXAM_MAX_QUESTIONS = 4;
const PASS_RATIO = 0.7;

export function requiredCorrect(total: number): number {
  if (total <= 0) return 0;
  if (total <= SMALL_EXAM_MAX_QUESTIONS) return Math.max(1, total - 1);
  return Math.ceil(total * PASS_RATIO);
}

function normalizeAnswer(s: string): string {
  return (s || '').trim().replace(/\s+/g, ' ');
}

/** 选择题比对选项文本，大小写无意义；填空题默认大小写敏感 */
function matchesTextAnswer(question: Question, userAnswer: string, expected: string): boolean {
  const a = normalizeAnswer(userAnswer);
  const b = normalizeAnswer(expected);
  if (question.type === 'choice' || question.caseInsensitive) {
    return a.toLowerCase() === b.toLowerCase();
  }
  return a === b;
}

/**
 * 编程题必须真的把学生代码跑起来再比对输出。
 * 原实现直接拿"学生提交的源码字符串"和 expectedOutput 比，永远不可能相等。
 */
async function isCodeAnswerCorrect(
  question: Question,
  submittedCode: string,
  courseId: CourseId,
): Promise<boolean> {
  const expected = (question.expectedOutput || question.answer || '').trim();
  if (!expected) return false;
  if (!submittedCode.trim()) return false;

  const language = courseId === 'python' ? 'python' : 'typescript';
  const run = await runCode(submittedCode, language);
  if (!run.success) return false;
  return verifyOutput(run.output, expected);
}

export async function submitAnswers(
  userId: string,
  courseId: CourseId,
  chapterId: string,
  answers: Record<string, string>
): Promise<ExamResult> {
  const questions = getQuestions(courseId, chapterId);
  const total = questions.length;

  // 本章没有题库：不写考试记录，也不谎报"没通过"
  if (total === 0) {
    return { score: 0, passed: false, correct: 0, total: 0, unavailable: true };
  }

  let correct = 0;
  for (const q of questions) {
    const userAnswer = (answers[q.id] || '').trim();
    const expected = (q.answer || '').trim();

    if (q.type === 'choice' || q.type === 'fill') {
      if (matchesTextAnswer(q, userAnswer, expected)) correct++;
    } else if (q.type === 'code') {
      if (await isCodeAnswerCorrect(q, userAnswer, courseId)) correct++;
    }
  }

  const score = Math.round((correct / total) * 100);
  const passed = correct >= requiredCorrect(total);

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

export function registerIpcHandlers(): void {
  ipcMain.handle('exam:get-questions', async (_event, { courseId, chapterId }) => {
    return getQuestions(courseId, chapterId);
  });

  // 未登录也允许答题，但成绩不记名；userId 取自会话，不接受渲染层传入
  ipcMain.handle('exam:submit', async (_event, { answers, courseId, chapterId }) => {
    return submitAnswers(getActiveUserId() ?? '', courseId, chapterId, answers ?? {});
  });
}
