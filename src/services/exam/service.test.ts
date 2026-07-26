import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockIpcMain, mockGetDb, mockGetCourseDataById } = vi.hoisted(() => ({
  mockIpcMain: {
    handle: vi.fn(),
  },
  mockGetDb: vi.fn(),
  mockGetCourseDataById: vi.fn(),
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

import { getExamHistory, submitAnswers } from './service';

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

  it('提交答案后会把 correct 和 total 一起写入历史记录', () => {
    const result = submitAnswers('user-1', 'typescript', 'ch1', { q1: '2' });

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
