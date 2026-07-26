// Zustand 课程状态
import { create } from 'zustand';

interface CourseState {
  currentChapterId: string | null;
  currentSectionId: string | null;
  navigate: (chapterId: string, sectionId: string) => void;
}

export const useCourseStore = create<CourseState>((set) => ({
  currentChapterId: null,
  currentSectionId: null,
  navigate: (chapterId, sectionId) => set({ currentChapterId: chapterId, currentSectionId: sectionId }),
}));
