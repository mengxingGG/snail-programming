import { describe, expect, it } from 'vitest';
import { courseData } from './course-data';
import { pythonCourseData } from './course-data-python';

describe('课程元数据增强', () => {
  it('会为 TypeScript 课程自动补齐难度、预计时长和前置依赖', () => {
    const sections = courseData.chapters.flatMap(chapter => chapter.sections);

    expect(sections.every(section => !!section.difficulty)).toBe(true);
    expect(sections.every(section => (section.estimatedMinutes ?? 0) >= 8)).toBe(true);
    expect(sections[0].prerequisites ?? []).toEqual([]);
    expect(sections[1].prerequisites).toEqual([sections[0].id]);
  });

  it('会为 Python 课程自动生成跨章节的学习顺序', () => {
    const sections = pythonCourseData.chapters.flatMap(chapter => chapter.sections);
    const ch1FirstSection = pythonCourseData.chapters[1].sections[0];
    const chMinus1LastSection = pythonCourseData.chapters[0].sections.at(-1);

    expect(ch1FirstSection.prerequisites).toEqual([chMinus1LastSection?.id]);
    expect(sections.at(-1)?.difficulty).toBe('advanced');
  });
});
