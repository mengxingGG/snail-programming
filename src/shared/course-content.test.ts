// 教材数据体检 —— 把作者层面的错误挡在提交之前
// 这些问题在运行时只会表现为"某一节判题莫名其妙不通过"，很难排查
import { describe, expect, it } from 'vitest';
import { courseData, rawCourseChapters } from './course-data';
import { pythonCourseData, rawPythonCourseChapters } from './course-data-python';
import type { Chapter, CourseData, Question, Section } from './types/course';

/**
 * 已知缺少题库的章节。这里显式列出而不是直接放行，
 * 新增的缺口会让测试失败。补齐题库后从列表里删掉即可。
 */
const KNOWN_CHAPTERS_WITHOUT_QUESTIONS: Record<string, string[]> = {
  TypeScript: [],
  Python: [],
};

/** 练习节数量下限，防止把练习改成演示来规避真实性检查 */
const MIN_EXERCISE_COUNT: Record<string, number> = {
  TypeScript: 56,
  Python: 48,
};

const COURSES: Array<[string, CourseData]> = [
  ['TypeScript', courseData],
  ['Python', pythonCourseData],
];

const RAW_COURSES: Array<[string, Chapter[]]> = [
  ['TypeScript', rawCourseChapters],
  ['Python', rawPythonCourseChapters],
];

function allSections(data: CourseData): Section[] {
  return data.chapters.flatMap(chapter => chapter.sections);
}

function allQuestions(data: CourseData): Question[] {
  return Object.values(data.questions).flat();
}

function findDuplicates(values: string[]): string[] {
  return [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
}

describe.each(RAW_COURSES)('%s 原始教材分类', (_courseName, chapters) => {
  it('每个 section 都在 Part 文件中显式声明 demo 或 exercise', () => {
    const missing = chapters
      .flatMap(chapter => chapter.sections)
      .filter(section => section.kind !== 'demo' && section.kind !== 'exercise')
      .map(section => section.id);

    expect(missing).toEqual([]);
  });
});

describe.each(COURSES)('%s 教材数据完整性', (courseName, data) => {
  it('section id 不重复', () => {
    expect(findDuplicates(allSections(data).map(s => s.id))).toEqual([]);
  });

  it('question id 不重复', () => {
    expect(findDuplicates(allQuestions(data).map(q => q.id))).toEqual([]);
  });

  it('chapter id 不重复', () => {
    expect(findDuplicates(data.chapters.map(c => c.id))).toEqual([]);
  });

  it('每个 section 都有 starterCode 和 expectedOutput', () => {
    const missing = allSections(data)
      .filter(s => !s.starterCode?.trim() || !s.expectedOutput?.trim())
      .map(s => s.id);
    expect(missing).toEqual([]);
  });

  it('section 的 chapterId 指向真实存在的章节', () => {
    const chapterIds = new Set(data.chapters.map(c => c.id));
    const orphans = allSections(data).filter(s => !chapterIds.has(s.chapterId)).map(s => s.id);
    expect(orphans).toEqual([]);
  });

  it('题库的键都对应真实章节，且题目的 chapterId 与之一致', () => {
    const chapterIds = new Set(data.chapters.map(c => c.id));
    const problems: string[] = [];

    for (const [key, questions] of Object.entries(data.questions)) {
      if (!chapterIds.has(key)) problems.push(`题库键 ${key} 没有对应章节`);
      for (const q of questions) {
        if (q.chapterId !== key) {
          problems.push(`题目 ${q.id} 的 chapterId=${q.chapterId} 与归属键 ${key} 不一致`);
        }
      }
    }
    expect(problems).toEqual([]);
  });

  it('选择题的正确答案必须出现在选项里', () => {
    const broken = allQuestions(data)
      .filter(q => q.type === 'choice')
      .filter(q => !q.options?.includes(q.answer))
      .map(q => `${q.id}: answer=${q.answer}`);
    expect(broken).toEqual([]);
  });

  it('每道题都有非空的正确答案（编程题可用 expectedOutput 代替）', () => {
    const broken = allQuestions(data)
      .filter(q => !q.answer?.trim() && !q.expectedOutput?.trim())
      .map(q => q.id);
    expect(broken).toEqual([]);
  });

  it('validation 里的正则都能编译', () => {
    const broken: string[] = [];

    for (const section of allSections(data)) {
      for (const rule of section.validation?.codeRules ?? []) {
        if (rule.type !== 'regex' && rule.type !== 'not_regex') continue;
        try {
          new RegExp(rule.value, 'm');
        } catch {
          broken.push(`${section.id} codeRule: ${rule.value}`);
        }
      }
      for (const rule of section.validation?.outputRules ?? []) {
        if (rule.type !== 'regex') continue;
        try {
          new RegExp(rule.value);
        } catch {
          broken.push(`${section.id} outputRule: ${rule.value}`);
        }
      }
    }
    expect(broken).toEqual([]);
  });

  it('显式练习节都有题干、TODO 和必须改动的校验', () => {
    const broken = allSections(data)
      .filter(section => section.kind === 'exercise')
      .filter(section => (
        !section.content.includes('### 动手练习')
        || !/(?:\/\/|#) TODO:/.test(section.starterCode)
        || section.validation?.mode !== 'edit_required'
        || section.validation.requireCodeChangeFromStarter !== true
      ))
      .map(section => section.id);

    expect(broken).toEqual([]);
  });

  it('练习节数量不低于当前水平', () => {
    // verify-exercises.ts 只检查现有练习节是否合格，本身不关心数量。
    // 若把不合格的练习统统改成 kind: 'demo'，那个脚本会因为"没有练习节可查"
    // 而绿灯放行。这里设下限，堵住这条退化路径。
    // 有意下调时需连同这个数字一起改，并在评审中说明理由。
    const exercises = allSections(data).filter(section => section.kind === 'exercise');
    expect(exercises.length).toBeGreaterThanOrEqual(MIN_EXERCISE_COUNT[courseName]);
  });

  it('基础章节提供可执行的编程题', () => {
    const codeQuestions = allQuestions(data).filter(question => question.type === 'code');
    const broken = codeQuestions
      .filter(question => !question.starterCode?.trim() || !question.expectedOutput?.trim())
      .map(question => question.id);

    expect(broken).toEqual([]);
    expect(codeQuestions.length).toBeGreaterThanOrEqual(courseName === 'TypeScript' ? 10 : 8);
  });

  it('缺少题库的章节没有超出已知清单', () => {
    const without = data.chapters
      .filter(chapter => !data.questions[chapter.id]?.length)
      .map(chapter => chapter.id);
    expect(without).toEqual(KNOWN_CHAPTERS_WITHOUT_QUESTIONS[courseName]);
  });

  it('totalSections 与实际小节数一致', () => {
    expect(data.totalSections).toBe(allSections(data).length);
  });
});
