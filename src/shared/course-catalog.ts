import { courseData } from './course-data';
import { pythonCourseData } from './course-data-python';
import type { CourseData } from './types/course';

export type CourseId = 'typescript' | 'python';

export interface CourseBundle {
  id: CourseId;
  label: string;
  appLabel: string;
  editorLanguage: 'typescript' | 'python';
  data: CourseData;
}

export interface LearningPlanDefinition {
  id: string;
  courseId: CourseId;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  startChapterId: string;
  startSectionId: string;
  chapterRange: [number, number];
  status: 'available' | 'soon';
}

function getCourseStart(data: CourseData): { chapterId: string; sectionId: string } {
  const firstChapter = data.chapters[0];
  const firstSection = firstChapter?.sections[0];

  if (!firstChapter || !firstSection) {
    throw new Error('课程数据为空，无法生成学习入口');
  }

  return {
    chapterId: firstChapter.id,
    sectionId: firstSection.id,
  };
}

export function findSectionLocation(courseId: CourseId, sectionId: string): { chapterId: string; sectionId: string } | null {
  const chapter = getCourseDataById(courseId).chapters.find(item =>
    item.sections.some(section => section.id === sectionId),
  );

  return chapter ? { chapterId: chapter.id, sectionId } : null;
}

const tsCourseStart = getCourseStart(courseData);
const pythonCourseStart = getCourseStart(pythonCourseData);

export const COURSE_BUNDLES: Record<CourseId, CourseBundle> = {
  typescript: {
    id: 'typescript',
    label: 'TypeScript',
    appLabel: 'TypeScript Learning OS',
    editorLanguage: 'typescript',
    data: courseData,
  },
  python: {
    id: 'python',
    label: 'Python',
    appLabel: 'Python Learning OS',
    editorLanguage: 'python',
    data: pythonCourseData,
  },
};

export const LEARNING_PLANS: LearningPlanDefinition[] = [
  {
    id: 'ts-learning',
    courseId: 'typescript',
    title: 'TypeScript 学习',
    shortTitle: 'TypeScript',
    subtitle: '从零基础到全栈',
    description: '从第一行代码到全栈应用，覆盖变量、类型、Node、React、项目实战。',
    startChapterId: tsCourseStart.chapterId,
    startSectionId: tsCourseStart.sectionId,
    chapterRange: [0, courseData.chapters.length - 1],
    status: 'available',
  },
  {
    id: 'python-learning',
    courseId: 'python',
    title: 'Python 学习',
    shortTitle: 'Python',
    subtitle: '从零基础到高级',
    description: '从语法、爬虫、Web到工程化应用，覆盖 Python 多方向能力。',
    startChapterId: pythonCourseStart.chapterId,
    startSectionId: pythonCourseStart.sectionId,
    chapterRange: [0, pythonCourseData.chapters.length - 1],
    status: 'available',
  },
];

export function getCourseBundle(courseId: CourseId | undefined): CourseBundle {
  return COURSE_BUNDLES[courseId ?? 'typescript'] ?? COURSE_BUNDLES.typescript;
}

export function getCourseDataById(courseId: CourseId | undefined): CourseData {
  return getCourseBundle(courseId).data;
}

export function getCourseIdFromPlanId(planId: string | undefined): CourseId {
  if (!planId) return 'typescript';
  if (planId.startsWith('python')) return 'python';
  return 'typescript';
}

export function getPlanById(planId: string | undefined): LearningPlanDefinition | undefined {
  return LEARNING_PLANS.find(plan => plan.id === planId);
}

export function getPlanSectionIds(planId: string): string[] {
  const plan = getPlanById(planId);
  if (!plan) return [];
  const chapters = getCourseDataById(plan.courseId).chapters.slice(plan.chapterRange[0], plan.chapterRange[1] + 1);
  return chapters.flatMap(chapter => chapter.sections.map(section => section.id));
}

export function buildLearnPath(courseId: CourseId, chapterId: string, sectionId: string): string {
  return `/learn/${courseId}/${chapterId}/${sectionId}`;
}

export function buildExamPath(courseId: CourseId, chapterId: string): string {
  return `/exam/${courseId}/${chapterId}`;
}
