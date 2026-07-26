import type { CourseId } from '../../shared/course-catalog';

function hashStarterCode(value: string): string {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

export function buildLessonCodeFilename(courseId: CourseId, sectionId?: string, starterCode?: string): string {
  const extension = courseId === 'python' ? 'py' : 'ts';
  if (!sectionId) return `untitled.${extension}`;
  const version = starterCode ? `-${hashStarterCode(starterCode)}` : '';
  return `${courseId}-section-${sectionId}${version}.${extension}`;
}
