// 课程数据（Python） — 总入口
// 汇总 Part1-5 的章节内容 + 考试题库

import type { CourseData } from '../types/course';
import { part1Chapters } from './part1-basics';
import { part2Chapters } from './part2-advanced';
import { part3Chapters } from './part3-scraping';
import { part4Chapters } from './part4-web';
import { part5Chapters } from './part5-advanced';
import { allQuestions } from './exams';
import { applyCourseAuthoring } from '../course-authoring';
import { enrichCourseChapters } from '../course-metadata';

const chapters = enrichCourseChapters(
  applyCourseAuthoring([
    ...part1Chapters,
    ...part2Chapters,
    ...part3Chapters,
    ...part4Chapters,
    ...part5Chapters,
  ], 'python'),
);

export const pythonCourseData: CourseData = {
  chapters,
  questions: allQuestions,
  totalSections: chapters.reduce((total, chapter) => total + chapter.sections.length, 0),
};

// Re-exports for direct imports
export { part1Chapters } from './part1-basics';
export { part2Chapters } from './part2-advanced';
export { part3Chapters } from './part3-scraping';
export { part4Chapters } from './part4-web';
export { part5Chapters } from './part5-advanced';
export { allQuestions } from './exams';
