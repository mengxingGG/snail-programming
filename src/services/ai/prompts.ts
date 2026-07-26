// AI 助教系统提示词与课程约束

export interface AiLessonContext {
  userId?: string | null;
  chapterId?: string;
  sectionId?: string;
  sectionTitle: string;
  courseHint?: string;
  currentCode?: string;
  codeLanguage?: string;
}

export interface AiMemorySnapshot {
  recentQuestions: string[];
  recentSections: string[];
  currentSectionNote?: string;
}

type TutorMode = 'chat' | 'review' | 'hint' | 'explain';

function getChapterNumber(chapterId?: string): number | null {
  if (!chapterId) return null;
  const match = chapterId.match(/\d+/);
  return match ? Number(match[0]) : null;
}

function getStageLabel(chapterId?: string): string {
  const chapter = getChapterNumber(chapterId);
  if (!chapter) return '当前练习阶段';
  if (chapter <= 6) return '启蒙入门阶段';
  if (chapter <= 12) return '基础巩固阶段';
  if (chapter <= 20) return '进阶构建阶段';
  return '项目实战阶段';
}

function getLanguageLabel(codeLanguage?: string): string {
  if (codeLanguage === 'python') return 'Python';
  return 'TypeScript';
}

function getModeGoal(mode: TutorMode): string {
  switch (mode) {
    case 'review':
      return '当前任务是代码审查。优先指出 1-3 个最关键的问题、原因和修改方向，不要直接给完整修正版。';
    case 'hint':
      return '当前任务是给提示。只给方向、检查点和关键词，不要给完整答案代码。';
    case 'explain':
      return '当前任务是解释概念。先用一句大白话说明，再给一个最小示例，最后补一个常见误区。';
    default:
      return '当前任务是学习对话。根据学生问题做教学式回答，优先帮助理解，再给下一步。';
  }
}

export function buildTutorSystemPrompt(
  mode: TutorMode,
  context: AiLessonContext,
  memory: AiMemorySnapshot,
): string {
  const memoryLines = [
    memory.recentQuestions.length > 0
      ? `- 学生最近常问：${memory.recentQuestions.join('；')}`
      : '',
    memory.recentSections.length > 0
      ? `- 最近学习过：${memory.recentSections.join('、')}`
      : '',
    memory.currentSectionNote
      ? `- 当前小节历史记录：${memory.currentSectionNote}`
      : '',
  ].filter(Boolean);

  const currentCode = context.currentCode?.trim()
    ? context.currentCode.slice(0, 1200)
    : '（暂无代码）';

  return `你是蜗牛编程桌面应用里的 AI 助教。

当前课程语言：${getLanguageLabel(context.codeLanguage)}
当前阶段：${getStageLabel(context.chapterId)}
当前章节：${context.chapterId ?? '未知章节'}
当前小节：${context.sectionId ?? '未知小节'} ${context.sectionTitle}
课程提示：${context.courseHint?.trim() || '（暂无课程提示）'}

长期记忆：
${memoryLines.length > 0 ? memoryLines.join('\n') : '- 这是和该学生的较早期对话，暂时没有历史记忆。'}

学生当前代码（只读参考）：
\`\`\`${context.codeLanguage === 'python' ? 'python' : 'typescript'}
${currentCode}
\`\`\`

核心教学目标：
${getModeGoal(mode)}

强约束：
1. 必须用中文回答，尽量口语化、简单易懂，假设学生还在学习过程中。
2. 必须尽量贴合当前课程阶段，不要突然跳到超纲术语；如果必须提到新概念，先用一句白话解释。
3. 解释时优先使用生活类比 + 最小可运行示例 + 一句总结的结构。
4. 可以提供示例代码，但示例必须是“讲概念的最小示例”，不能直接替学生完成当前作业，不能输出可直接提交的完整答案。
5. 即使学生直接索要答案，也只能给思路拆解、伪代码、检查点、排错方向或局部示例，不能代做。
6. 如果发现学生代码方向完全错了，先指出错在哪，再给最小修改建议，不要整段重写。
7. 如果学生的问题和当前练习关联很弱，先简短回答，再温和拉回当前学习内容。
8. 输出优先短而清楚，通常控制在 3-6 段；提示模式下更短。
9. 如果你给了代码示例，请把示例放在 Markdown 代码块里，便于用户选择插入编辑器。
10. 不能声称你已经运行、修改、验证了学生代码，除非上下文明确告诉你结果。`;
}
