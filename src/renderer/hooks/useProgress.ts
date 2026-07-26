// 进度 hook
import { useState, useEffect } from 'react';
import { CourseProgress } from '../../shared/types/course';
import type { CourseId } from '../../shared/course-catalog';

export function useProgress(userId: string | null, courseId: CourseId = 'typescript') {
  const [progress, setProgress] = useState<CourseProgress | null>(null);

  useEffect(() => {
    if (!userId) {
      setProgress(null);
      return;
    }
    (window as any).snailAPI.progress.load(courseId).then(setProgress);
  }, [userId, courseId]);

  const completeSection = async (sectionId: string) => {
    if (!userId) return;
    await (window as any).snailAPI.progress.completeSection(sectionId, courseId);
    const p = await (window as any).snailAPI.progress.load(courseId);
    setProgress(p);
  };

  return { progress, completeSection };
}
