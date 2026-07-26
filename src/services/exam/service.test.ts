import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockIpcMain, mockGetDb, mockGetCourseDataById, mockRunCode } = vi.hoisted(() => ({
  mockIpcMain: {
    handle: vi.fn(),
  },
  mockGetDb: vi.fn(),
  mockGetCourseDataById: vi.fn(),
  mockRunCode: vi.fn(),
}));

vi.mock('electron', () => ({
  ipcMain: mockIpcMain,
}));

vi.mock('../database/init', () => ({
  getDb: mockGetDb,
}));

vi.mock('../../shared/course-catalog', () => ({
  getCourseDataById: mockGetCourseDataById,
}));

vi.mock('../runner/service', () => ({
  runCode: mockRunCode,
  verifyOutput: (actual: string, expected: string) => actual.trim() === expected.trim(),
}));

import { getExamHistory, requiredCorrect, submitAnswers } from './service';

describe('考试记录服务', () => {
  const runMock = vi.fn();
  const allMock = vi.fn();
  const prepareMock = vi.fn((sql: string) => {
    if (sql.startsWith('INSERT INTO exam_records')) {
      return { run: runMock };
    }
    if (sql.startsWith('SELECT')) {
      return { all: allMock };
    }
    throw new Error(`未预期的 SQL: ${sql}`);
  });

  beforeEach(() => {
    prepareMock.mockClear();
    runMock.mockClear();
    allMock.mockReset();
    allMock.mockReturnValue([{ score: 100, passed: 1, correct: 1, total: 1 }]);

    mockGetDb.mockReturnValue({
      prepare: prepareMock,
    });
    mockGetCourseDataById.mockReturnValue({
      chapters: [],
      totalSections: 0,
      questions: {
        ch1: [
          {
            id: 'q1',
            chapterId: 'ch1',
            type: 'choice',
            text: '1+1=?',
            options: ['1', '2'],
            answer: '2',
          },
        ],
      },
    });
  });

  it('提交答案后会把 correct 和 total 一起写入历史记录', async () => {
    const result = await submitAnswers('user-1', 'typescript', 'ch1', { q1: '2' });

    expect(result).toMatchObject({
      score: 100,
      passed: true,
      correct: 1,
      total: 1,
    });

    expect(prepareMock).toHaveBeenCalledWith(
      expect.stringContaining('correct'),
    );
    expect(prepareMock).toHaveBeenCalledWith(
      expect.stringContaining('total'),
    );
    expect(runMock).toHaveBeenCalledWith(
      'user-1',
      'typescript:ch1',
      100,
      1,
      1,
      1,
      expect.any(Number),
    );

    expect(getExamHistory('user-1')).toEqual([
      {
        score: 100,
        passed: true,
        correct: 1,
        total: 1,
      },
    ]);
  });
});

describe('及格线', () => {
  it('小卷允许错一题，避免 3 题 70% 变成必须全对', () => {
    expect(requiredCorrect(3)).toBe(2);
    expect(requiredCorrect(4)).toBe(3);
    expect(requiredCorrect(2)).toBe(1);
    expect(requiredCorrect(1)).toBe(1);
  });

  it('题量变大后回到 70% 比例线', () => {
    expect(requiredCorrect(10)).toBe(7);
    expect(requiredCorrect(20)).toBe(14);
  });

  it('没有题目时不需要答对任何题', () => {
    expect(requiredCorrect(0)).toBe(0);
  });
});

describe('判分规则', () => {
  const runMock = vi.fn();
  const prepareMock = vi.fn(() => ({ run: runMock }));

  function useQuestions(questions: any[]) {
    mockGetCourseDataById.mockReturnValue({
      chapters: [],
      totalSections: 0,
      questions: { ch1: questions },
    });
  }

  beforeEach(() => {
    runMock.mockClear();
    mockRunCode.mockReset();
    mockGetDb.mockReturnValue({ prepare: prepareMock });
  });

  it('3 题答对 2 题即通过', async () => {
    useQuestions([
      { id: 'q1', chapterId: 'ch1', type: 'choice', text: '', options: ['a', 'b'], answer: 'a' },
      { id: 'q2', chapterId: 'ch1', type: 'choice', text: '', options: ['a', 'b'], answer: 'b' },
      { id: 'q3', chapterId: 'ch1', type: 'choice', text: '', options: ['a', 'b'], answer: 'a' },
    ]);

    const result = await submitAnswers('u', 'typescript', 'ch1', { q1: 'a', q2: 'b', q3: 'b' });
    expect(result).toMatchObject({ correct: 2, total: 3, passed: true });
  });

  it('填空题大小写敏感，tofixed 不能当作 toFixed', async () => {
    useQuestions([{ id: 'q1', chapterId: 'ch1', type: 'fill', text: '', answer: 'toFixed' }]);

    expect(await submitAnswers('', 'typescript', 'ch1', { q1: 'toFixed' })).toMatchObject({ correct: 1 });
    expect(await submitAnswers('', 'typescript', 'ch1', { q1: 'tofixed' })).toMatchObject({ correct: 0 });
  });

  it('显式声明 caseInsensitive 的填空题才放开大小写', async () => {
    useQuestions([
      { id: 'q1', chapterId: 'ch1', type: 'fill', text: '', answer: 'DELETE', caseInsensitive: true },
    ]);

    expect(await submitAnswers('', 'typescript', 'ch1', { q1: 'delete' })).toMatchObject({ correct: 1 });
  });

  it('选择题始终忽略大小写', async () => {
    useQuestions([
      { id: 'q1', chapterId: 'ch1', type: 'choice', text: '', options: ['True', 'False'], answer: 'True' },
    ]);

    expect(await submitAnswers('', 'typescript', 'ch1', { q1: 'true' })).toMatchObject({ correct: 1 });
  });

  it('编程题会真正执行代码再比对输出', async () => {
    useQuestions([
      { id: 'q1', chapterId: 'ch1', type: 'code', text: '', answer: '', expectedOutput: '3' },
    ]);
    mockRunCode.mockResolvedValue({ success: true, output: '3', executionTimeMs: 1 });

    const result = await submitAnswers('', 'typescript', 'ch1', { q1: 'console.log(1+2)' });

    expect(mockRunCode).toHaveBeenCalledWith('console.log(1+2)', 'typescript');
    expect(result).toMatchObject({ correct: 1, total: 1 });
  });

  it('编程题代码跑不通就算错，而不是拿源码字符串去比对', async () => {
    useQuestions([
      { id: 'q1', chapterId: 'ch1', type: 'code', text: '', answer: '', expectedOutput: '3' },
    ]);
    mockRunCode.mockResolvedValue({ success: false, output: '', error: 'SyntaxError', executionTimeMs: 1 });

    const result = await submitAnswers('', 'typescript', 'ch1', { q1: 'console.log(' });
    expect(result).toMatchObject({ correct: 0 });

    // 修复前：提交的源码恰好等于期望输出就会被判对
    mockRunCode.mockResolvedValue({ success: true, output: '3', executionTimeMs: 1 });
    const cheat = await submitAnswers('', 'typescript', 'ch1', { q1: '3' });
    expect(mockRunCode).toHaveBeenLastCalledWith('3', 'typescript');
    expect(cheat.correct).toBe(1); // 因为 "3" 确实被执行并输出了 3
  });

  it('Python 课程的编程题按 python 执行', async () => {
    useQuestions([
      { id: 'q1', chapterId: 'ch1', type: 'code', text: '', answer: '', expectedOutput: '3' },
    ]);
    mockRunCode.mockResolvedValue({ success: true, output: '3', executionTimeMs: 1 });

    await submitAnswers('', 'python', 'ch1', { q1: 'print(1+2)' });
    expect(mockRunCode).toHaveBeenCalledWith('print(1+2)', 'python');
  });

  it('本章没有题库时返回 unavailable，且不写考试记录', async () => {
    useQuestions([]);

    const result = await submitAnswers('user-1', 'typescript', 'ch1', {});
    expect(result).toMatchObject({ total: 0, passed: false, unavailable: true });
    expect(runMock).not.toHaveBeenCalled();
  });
});
