import type { Section, SectionOutputRule, SectionTextRule, SectionValidation } from '../../shared/types/course';

/**
 * 判定结果三态：
 * - passed  学生改动了代码并且输出符合要求 —— 真正完成了练习
 * - demo    起始代码原样运行且输出符合要求 —— 这是演示节，不该伪装成"练习通过"
 * - failed  输出或关键代码要求未满足
 *
 * 引入 demo 态之前，两态模型让「示例代码点一下运行」也报"练习通过"，
 * 抽样显示 TS 88%、Python 67% 的小节属于这种情况。
 */
export type LessonStatus = 'passed' | 'demo' | 'failed';

export interface LessonValidationResult {
  status: LessonStatus;
  /** status !== 'failed'，供既有调用方判断本节是否可以标记完成 */
  passed: boolean;
  message: string;
  expectedHint: string;
  details?: string;
}

function normalizeLines(value: string): string[] {
  if (!value) return [];
  return value.trim().split(/\r?\n/).map(line => line.trim());
}

function normalizeText(value: string): string {
  return value
    .split(/\r?\n/)
    .map(line => line.trim())
    .join('\n')
    .trim();
}

function formatDiffLine(value: string | undefined): string {
  return value && value.length > 0 ? value : '(无输出)';
}

function buildOutputMismatchDetails(expected: string, actual: string): string {
  const expectedLines = normalizeLines(expected);
  const actualLines = normalizeLines(actual);
  const maxLines = Math.max(expectedLines.length, actualLines.length);

  for (let i = 0; i < maxLines; i++) {
    if ((expectedLines[i] ?? '') !== (actualLines[i] ?? '')) {
      return `第 ${i + 1} 行不一致\n期望：${formatDiffLine(expectedLines[i])}\n实际：${formatDiffLine(actualLines[i])}`;
    }
  }

  return `期望输出共 ${expectedLines.length} 行，实际输出共 ${actualLines.length} 行。请检查是否多输出或少输出了内容。`;
}

// ─── 正则安全编译 ────────────────────────────────────────
// 教材里的正则是纯字符串，写错一个字符原先会直接抛异常并让整个判题崩溃。

function safeRegExp(pattern: string, flags?: string): RegExp | null {
  try {
    return new RegExp(pattern, flags);
  } catch {
    return null;
  }
}

/** 收集本节校验规则里所有无法编译的正则，供暴露配置错误使用 */
function collectInvalidPatterns(validation: SectionValidation): string[] {
  const invalid: string[] = [];

  for (const rule of validation.codeRules ?? []) {
    if ((rule.type === 'regex' || rule.type === 'not_regex') && !safeRegExp(rule.value, 'm')) {
      invalid.push(rule.value);
    }
  }
  for (const rule of validation.outputRules ?? []) {
    if (rule.type === 'regex' && !safeRegExp(rule.value)) {
      invalid.push(rule.value);
    }
  }
  return invalid;
}

function matchTextRule(rule: SectionTextRule, value: string): boolean {
  switch (rule.type) {
    case 'includes':
      return value.includes(rule.value);
    case 'not_includes':
      return !value.includes(rule.value);
    case 'regex': {
      const re = safeRegExp(rule.value, 'm');
      return re ? re.test(value) : false;
    }
    case 'not_regex': {
      const re = safeRegExp(rule.value, 'm');
      // 正则无效时无法判断"不包含"，按不通过处理，避免静默放行
      return re ? !re.test(value) : false;
    }
    default:
      return false;
  }
}

function matchOutputRule(rule: SectionOutputRule, actualLine: string): boolean {
  const normalizedRuleValue = rule.value.trim();

  switch (rule.type) {
    case 'exact':
      return actualLine === normalizedRuleValue;
    case 'prefix':
      return actualLine.startsWith(normalizedRuleValue);
    case 'contains':
      return actualLine.includes(normalizedRuleValue);
    case 'regex': {
      const re = safeRegExp(rule.value);
      return re ? re.test(actualLine) : false;
    }
    default:
      return false;
  }
}

function matchOutputRules(rules: SectionOutputRule[], output: string): boolean {
  const actualLines = normalizeLines(output);
  let cursor = 0;

  for (const rule of rules) {
    let matched = false;
    for (let i = cursor; i < actualLines.length; i++) {
      if (matchOutputRule(rule, actualLines[i])) {
        matched = true;
        cursor = i + 1;
        break;
      }
    }

    if (!matched && !rule.optional) {
      return false;
    }
  }

  return true;
}

// ─── 判定 ────────────────────────────────────────────────

const DEFAULT_MESSAGES: Record<SectionValidation['mode'], { success: string; failure: string }> = {
  exact_output: {
    success: '输出匹配，练习通过。',
    failure: '输出不匹配，请对照要求检查。',
  },
  edit_required: {
    success: '很好，你已经完成了本节要求的代码修改。',
    failure: '请按本节要求修改代码后再运行。',
  },
  dynamic_lines: {
    success: '核心输出已匹配，本节通过。',
    failure: '环境相关输出允许变化，但核心输出仍需匹配。',
  },
  regex_pattern: {
    success: '关键输出结构已匹配，本节通过。',
    failure: '输出结构不符合要求，请对照预期检查。',
  },
};

const DEMO_MESSAGE = '示例已按预期运行。想真正掌握，试着自己改改代码再运行一次。';

/**
 * 是否要求学生必须改动起始代码。
 * 显式标注 kind='exercise' 或配置了 requireCodeChangeFromStarter 时成立。
 */
function requiresEdit(section: Section, validation?: SectionValidation): boolean {
  return section.kind === 'exercise' || validation?.requireCodeChangeFromStarter === true;
}

/**
 * 判断学生代码是否相对起始代码有实质改动。
 * 返回 undefined 表示调用方没有提供代码，无从判断。
 */
function detectCodeChange(section: Section, code?: string): boolean | undefined {
  if (typeof code !== 'string' || code.trim() === '') return undefined;
  return normalizeText(code) !== normalizeText(section.starterCode || '');
}

function buildResult(
  status: LessonStatus,
  message: string,
  expectedHint: string,
  details?: string,
): LessonValidationResult {
  return { status, passed: status !== 'failed', message, expectedHint, details };
}

export function validateLessonOutput(section: Section, output: string, code?: string): LessonValidationResult {
  const validation = section.validation;
  const expectedHint = validation?.expectedHint ?? section.expectedOutput;

  // 教材配置错误要显式暴露，不能静默放行或崩溃
  if (validation) {
    const invalid = collectInvalidPatterns(validation);
    if (invalid.length > 0) {
      return buildResult(
        'failed',
        '本节的校验规则配置有误，无法判题。',
        expectedHint,
        `以下正则无法编译，请反馈给课程维护者：\n${invalid.map(p => `- ${p}`).join('\n')}`,
      );
    }
  }

  const normalizedCode = normalizeText(code ?? '');
  const codeChanged = detectCodeChange(section, code);
  const mustEdit = requiresEdit(section, validation);

  // 1) 关键代码要求
  const codeRulesPassed = validation?.codeRules?.every(rule => matchTextRule(rule, normalizedCode)) ?? true;

  // 2) 输出要求
  const outputPassed = validation?.outputRules
    ? matchOutputRules(validation.outputRules, output)
    : normalizeText(output) === normalizeText(section.expectedOutput || '');

  const failureMessage = validation
    ? (validation.failureMessage ?? DEFAULT_MESSAGES[validation.mode].failure)
    : '输出不匹配，请对照预期。';
  const successMessage = validation
    ? (validation.successMessage ?? DEFAULT_MESSAGES[validation.mode].success)
    : '输出匹配，练习通过。';

  // 要求改动却没动，直接判失败（不落到 demo 态）
  if (mustEdit && codeChanged === false) {
    return buildResult(
      'failed',
      failureMessage,
      expectedHint,
      '你还没有修改起始代码。请先按题目要求改动代码，再重新运行。',
    );
  }

  if (!codeRulesPassed) {
    return buildResult(
      'failed',
      failureMessage,
      expectedHint,
      '代码已经改动，但还没有满足本节要求的关键修改点。请结合题目提示继续检查变量名、关键逻辑或指定文本。',
    );
  }

  if (!outputPassed) {
    return buildResult(
      'failed',
      failureMessage,
      expectedHint,
      buildOutputMismatchDetails(expectedHint, output),
    );
  }

  // 输出已满足要求，再区分「真练习」与「跑了个示例」
  if (section.kind === 'demo' || codeChanged === false) {
    return buildResult('demo', DEMO_MESSAGE, expectedHint);
  }

  return buildResult('passed', successMessage, expectedHint);
}
