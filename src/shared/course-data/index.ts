// 课程数据 — 总入口
// 汇总 Part1-6 的章节内容 + 考试题库

import { part1Chapters } from './part1-basics';
import { part2Chapters } from './part2-ts-advanced';
import { part3Chapters } from './part3-backend';
import { part4Chapters } from './part4-frontend';
import { part5Chapters } from './part5-react';
import { part6Chapters } from './part6-fullstack';
import { allQuestions } from './exams';
import type { CourseData } from '../types/course';
import { enrichCourseChapters } from '../course-metadata';

const chapters = enrichCourseChapters([
  ...part1Chapters,
  ...part2Chapters,
  ...part3Chapters,
  ...part4Chapters,
  ...part5Chapters,
  ...part6Chapters,
]);

export const courseData: CourseData = {
  chapters,
  questions: allQuestions,
  totalSections: chapters.reduce((total, chapter) => total + chapter.sections.length, 0),
};

export { part1Chapters } from './part1-basics';
export { part2Chapters } from './part2-ts-advanced';
export { part3Chapters } from './part3-backend';
export { part4Chapters } from './part4-frontend';
export { part5Chapters } from './part5-react';
export { part6Chapters } from './part6-fullstack';
export { allQuestions } from './exams';
