import type { Section, SectionOutputRule, SectionTextRule, SectionValidation } from '../../shared/types/course';

export interface LessonValidationResult {
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

function matchTextRule(rule: SectionTextRule, value: string): boolean {
  switch (rule.type) {
    case 'includes':
      return value.includes(rule.value);
    case 'not_includes':
      return !value.includes(rule.value);
    case 'regex':
      return new RegExp(rule.value, 'm').test(value);
    case 'not_regex':
      return !new RegExp(rule.value, 'm').test(value);
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
    case 'regex':
      return new RegExp(rule.value).test(actualLine);
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

function validateByRules(section: Section, output: string, code: string, validation: SectionValidation): LessonValidationResult {
  const normalizedCode = normalizeText(code);
  const codeChanged = !validation.requireCodeChangeFromStarter
    || normalizedCode !== normalizeText(section.starterCode || '');
  const codeRulesPassed = validation.codeRules?.every(rule => matchTextRule(rule, normalizedCode)) ?? true;
  const codePassed = codeChanged && codeRulesPassed;
  const outputPassed = validation.outputRules
    ? matchOutputRules(validation.outputRules, output)
    : normalizeText(output) === normalizeText(section.expectedOutput || '');
  const passed = codePassed && outputPassed;

  const defaultMessages: Record<SectionValidation['mode'], { success: string; failure: string }> = {
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

  const message = passed
    ? (validation.successMessage ?? defaultMessages[validation.mode].success)
    : (validation.failureMessage ?? defaultMessages[validation.mode].failure);

  let details: string | undefined;
  if (!passed) {
    if (!codeChanged) {
      details = '你还没有修改起始代码。请先按题目要求改动代码，再重新运行。';
    } else if (!codeRulesPassed) {
      details = '代码已经改动，但还没有满足本节要求的关键修改点。请结合题目提示继续检查变量名、关键逻辑或指定文本。';
    } else if (!outputPassed) {
      details = buildOutputMismatchDetails(validation.expectedHint ?? section.expectedOutput, output);
    }
  }

  return {
    passed,
    message,
    expectedHint: validation.expectedHint ?? section.expectedOutput,
    details,
  };
}

export function validateLessonOutput(section: Section, output: string, code = ''): LessonValidationResult {
  if (section.validation) {
    return validateByRules(section, output, code, section.validation);
  }

  const passed = normalizeText(output) === normalizeText(section.expectedOutput || '');
  return {
    passed,
    message: passed ? '输出匹配，练习通过。' : '输出不匹配，请对照预期。',
    expectedHint: section.expectedOutput,
    details: passed ? undefined : buildOutputMismatchDetails(section.expectedOutput, output),
  };
}
