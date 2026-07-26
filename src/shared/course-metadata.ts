import type { Chapter, Difficulty, Section } from './types/course';

function deriveDifficulty(index: number, total: number): Difficulty {
  if (total <= 1) return 'beginner';

  const ratio = index / (total - 1);
  if (ratio < 0.45) return 'beginner';
  if (ratio < 0.8) return 'intermediate';
  return 'advanced';
}

function estimateMinutes(section: Section, difficulty: Difficulty): number {
  const contentWeight = Math.ceil(section.content.length / 220);
  const codeLines = Math.max(3, section.starterCode.split(/\r?\n/).filter(line => line.trim()).length);
  const outputLines = Math.max(1, section.expectedOutput.split(/\r?\n/).filter(line => line.trim()).length);
  const difficultyWeight = difficulty === 'advanced' ? 8 : difficulty === 'intermediate' ? 5 : 3;

  return Math.max(8, Math.min(30, contentWeight + codeLines + outputLines + difficultyWeight));
}

function normalizeEstimatedMinutes(section: Section, difficulty: Difficulty): number {
  if (typeof section.estimatedMinutes === 'number') {
    return Math.max(8, section.estimatedMinutes);
  }
  return estimateMinutes(section, difficulty);
}

export function enrichCourseChapters(chapters: Chapter[]): Chapter[] {
  const flatSections = chapters.flatMap(chapter => chapter.sections);

  return chapters.map(chapter => ({
    ...chapter,
    sections: chapter.sections.map(section => {
      const index = flatSections.findIndex(item => item.id === section.id);
      const difficulty = section.difficulty ?? deriveDifficulty(index, flatSections.length);
      const previousSection = index > 0 ? flatSections[index - 1] : null;

      return {
        ...section,
        difficulty,
        estimatedMinutes: normalizeEstimatedMinutes(section, difficulty),
        prerequisites: section.prerequisites ?? (previousSection ? [previousSection.id] : []),
      };
    }),
  }));
}
