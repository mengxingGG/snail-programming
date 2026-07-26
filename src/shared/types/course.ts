// 课程数据类型 — 章节、节、内容
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type SectionValidationMode =
  | 'exact_output'
  | 'edit_required'
  | 'dynamic_lines'
  | 'regex_pattern';

export interface SectionTextRule {
  type: 'includes' | 'not_includes' | 'regex' | 'not_regex';
  value: string;
}

export interface SectionOutputRule {
  type: 'exact' | 'prefix' | 'contains' | 'regex';
  value: string;
  optional?: boolean;
}

export interface SectionValidation {
  mode: SectionValidationMode;
  requireCodeChangeFromStarter?: boolean;
  codeRules?: SectionTextRule[];
  outputRules?: SectionOutputRule[];
  successMessage?: string;
  failureMessage?: string;
  expectedHint?: string;
}

export interface Section {
  id: string;
  chapterId: string;
  title: string;
  content: string;        // Markdown 概念卡片
  starterCode: string;     // 初始代码模板
  expectedOutput: string;  // 预期输出（用于验证）
  hint?: string;
  /** 难度等级，用于课程导航和用户进度反馈 */
  difficulty?: Difficulty;
  /** 预计学习分钟数，用于帮助用户安排时间 */
  estimatedMinutes?: number;
  /** 前置知识：需要先完成的 Section ID 列表（跨章节依赖） */
  prerequisites?: string[];
  /** 显式课程校验规则，避免依赖硬编码章节 ID 或文案猜测 */
  validation?: SectionValidation;
}
export interface Chapter {
  id: string;
  title: string;
  description: string;
  sections: Section[];
}
export interface Question {
  id: string;
  chapterId: string;
  type: 'choice' | 'fill' | 'code';
  text: string;
  options?: string[];
  answer: string;
  starterCode?: string;
  expectedOutput?: string;
}

export interface ExamResult {
  score: number;
  passed: boolean;
  correct: number;
  total: number;
}

export interface CourseProgress {
  userId: string;
  courseId?: 'typescript' | 'python';
  completedSections: string[];
  completedChapters: string[];
  currentSectionId: string;
}

export interface CourseData {
  chapters: Chapter[];
  questions: Record<string, Question[]>;
  totalSections: number;
}
