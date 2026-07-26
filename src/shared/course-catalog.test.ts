import { describe, expect, it } from 'vitest';
import { LEARNING_PLANS } from './course-catalog';
import { courseData } from './course-data';
import { pythonCourseData } from './course-data-python';

function countSections(chapters: { sections: { id: string }[] }[]): number {
  return chapters.reduce((total, chapter) => total + chapter.sections.length, 0);
}

describe('课程目录配置', () => {
  it('TypeScript 学习路线从第一章第一节开始', () => {
    const plan = LEARNING_PLANS.find(item => item.courseId === 'typescript');

    expect(plan).toBeDefined();
    expect(plan?.startChapterId).toBe(courseData.chapters[0].id);
    expect(plan?.startSectionId).toBe(courseData.chapters[0].sections[0].id);
  });

  it('Python 学习路线从第一章第一节开始', () => {
    const plan = LEARNING_PLANS.find(item => item.courseId === 'python');

    expect(plan).toBeDefined();
    expect(plan?.startChapterId).toBe(pythonCourseData.chapters[0].id);
    expect(plan?.startSectionId).toBe(pythonCourseData.chapters[0].sections[0].id);
  });

  it('课程总节数和真实章节数据一致', () => {
    expect(courseData.totalSections).toBe(countSections(courseData.chapters));
    expect(pythonCourseData.totalSections).toBe(countSections(pythonCourseData.chapters));
  });
});
