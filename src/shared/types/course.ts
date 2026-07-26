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

/**
 * 小节类型。不填时由判题逻辑在运行时推断：
 * 起始代码原样运行就能满足输出要求的，视为 demo。
 */
export type SectionKind = 'demo' | 'exercise';

export interface Section {
  id: string;
  chapterId: string;
  title: string;
  /** 演示节只要求"运行并观察"，练习节必须有代码改动才算通过 */
  kind?: SectionKind;
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
  /**
   * 填空题默认大小写敏感（编程课里 toFixed / StopIteration 这类标识符大小写有意义）。
   * SQL 关键字等确实不区分大小写的题目可以显式放开。
   */
  caseInsensitive?: boolean;
}

export interface ExamResult {
  score: number;
  passed: boolean;
  correct: number;
  total: number;
  /** 本章没有题库时为 true，用于和"考了但没过"区分开 */
  unavailable?: boolean;
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
