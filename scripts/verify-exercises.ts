// 练习节真实性验证：堵住「假练习」漏洞
//
// 对每个 kind === 'exercise' 的小节执行：
//   1. starterCode 原样执行必须成功
//   2. starterCode 输出（首尾空白归一化后）必须 ≠ expectedOutput
//   3. starterCode 仅追加一行注释后重新判题，结果必须仍是 failed
//
// 用法：
//   npx tsx scripts/verify-exercises.ts
//
// 不达标时以非零码退出。

import { courseData } from '../src/shared/course-data/index';
import { pythonCourseData } from '../src/shared/course-data-python/index';
import { runCode } from '../src/services/runner/service';
import { validateLessonOutput } from '../src/renderer/utils/lessonValidation';
import type { CourseData, Section } from '../src/shared/types/course';

// ─── 输出归一化（与 lessonValidation 中的 normalizeText 保持一致）───

function normalizeOutput(value: string): string {
  return value
    .split(/\r?\n/)
    .map(line => line.trim())
    .join('\n')
    .trim();
}

// ─── 单节分类 ────────────────────────────────────────────

type CheckResult =
  | 'real_exercise'      // 起始输出 ≠ 预期 → 真练习
  | 'fake_exercise'       // 起始输出 = 预期 → 假练习
  | 'starter_error'       // 起始代码报错
  | 'comment_bypass';     // 加一行注释即可通过

interface SectionReport {
  course: string;
  chapterId: string;
  chapterTitle: string;
  sectionId: string;
  title: string;
  result: CheckResult;
  detail: string;
}

async function classify(section: Section, language: 'typescript' | 'python'): Promise<{
  result: CheckResult;
  detail: string;
}> {
  const comment = language === 'typescript' ? '\n// x' : '\n# x';

  // ── 检查 1：starterCode 原样执行必须成功 ──
  const starterRun = await runCode(section.starterCode, language);
  if (!starterRun.success) {
    return {
      result: 'starter_error',
      detail: (starterRun.error ?? '').split('\n')[0].slice(0, 200),
    };
  }

  // ── 检查 2：输出归一化后必须 ≠ expectedOutput ──
  const starterNormalized = normalizeOutput(starterRun.output ?? '');
  const expectedNormalized = normalizeOutput(section.expectedOutput ?? '');

  if (starterNormalized === expectedNormalized) {
    return {
      result: 'fake_exercise',
      detail: `起始输出已经等于预期输出：「${starterNormalized.slice(0, 80)}」`,
    };
  }

  // ── 检查 3：仅追加注释后判题必须仍是 failed ──
  const commentedCode = section.starterCode + comment;
  const commentRun = await runCode(commentedCode, language);
  if (!commentRun.success) {
    // 注释导致语法错误（极少见），也算 bypass 失败
    return {
      result: 'comment_bypass',
      detail: `追加注释后代码报错：${(commentRun.error ?? '').split('\n')[0].slice(0, 200)}`,
    };
  }

  const verdict = validateLessonOutput(section, commentRun.output ?? '', commentedCode);
  if (verdict.status !== 'failed') {
    return {
      result: 'comment_bypass',
      detail: `追加注释后判题结果为 ${verdict.status}，预期 failed`,
    };
  }

  // ── 全部通过 → 真练习 ──
  return { result: 'real_exercise', detail: '' };
}

// ─── 扫描 ────────────────────────────────────────────────

async function scan(courseName: string, data: CourseData, language: 'typescript' | 'python'): Promise<SectionReport[]> {
  const reports: SectionReport[] = [];

  for (const chapter of data.chapters) {
    for (const section of chapter.sections) {
      if (section.kind !== 'exercise') continue;

      const { result, detail } = await classify(section, language);
      reports.push({
        course: courseName,
        chapterId: chapter.id,
        chapterTitle: chapter.title,
        sectionId: section.id,
        title: section.title,
        result,
        detail,
      });
    }
    process.stderr.write(`  已扫描 ${courseName} ${chapter.id}\n`);
  }

  return reports;
}

// ─── 汇总输出 ─────────────────────────────────────────────

function summarize(reports: SectionReport[]): void {
  const real = reports.filter(r => r.result === 'real_exercise');
  const fake = reports.filter(r => r.result === 'fake_exercise');
  const errors = reports.filter(r => r.result === 'starter_error');
  const bypass = reports.filter(r => r.result === 'comment_bypass');

  console.log(`\n══════════════════════════════════════════`);
  console.log(`  真练习（起始输出 ≠ 预期）: ${real.length}`);
  console.log(`  假练习（起始输出已达标）: ${fake.length}   ← 必须为 0`);
  console.log(`  起始代码报错            : ${errors.length}   ← 必须为 0`);
  console.log(`  加注释即可通过          : ${bypass.length}   ← 必须为 0`);
  console.log(`══════════════════════════════════════════`);

  // 打印不达标小节
  const problems = [...fake, ...errors, ...bypass];
  if (problems.length > 0) {
    console.log(`\n不达标小节（共 ${problems.length} 节）：\n`);
    for (const row of problems) {
      const tag = row.result === 'fake_exercise' ? '假练习'
        : row.result === 'starter_error' ? '报错'
        : '注释绕过';
      console.log(`  [${tag}] ${row.course} | ${row.sectionId} | ${row.title}`);
      console.log(`          ${row.detail}\n`);
    }
  }
}

// ─── main ─────────────────────────────────────────────────

async function main() {
  console.error('验证练习节真实性（exercise 节会真实运行）...\n');

  const tsReports = await scan('TypeScript', courseData, 'typescript');
  const pyReports = await scan('Python', pythonCourseData, 'python');
  const all = [...tsReports, ...pyReports];

  summarize(all);

  const fake = all.filter(r => r.result === 'fake_exercise').length;
  const errors = all.filter(r => r.result === 'starter_error').length;
  const bypass = all.filter(r => r.result === 'comment_bypass').length;

  const total = all.length;
  console.log(`\n共验证 ${total} 个练习节（TS ${tsReports.length} + Python ${pyReports.length}）`);

  // 没有练习节可查时不能算"通过"：否则把练习统统改成 kind: 'demo'
  // 就能让这道闸门绿灯放行。数量下限另由 course-content.test.ts 把守。
  if (tsReports.length === 0 || pyReports.length === 0) {
    console.error('\n❌ 验证未通过：某一门课程没有任何练习节，疑似练习被整体降级为演示。');
    process.exit(1);
  }

  if (fake > 0 || errors > 0 || bypass > 0) {
    console.error('\n❌ 验证未通过：存在不达标的练习节。');
    process.exit(1);
  }

  console.log('\n✅ 所有练习节均通过真实性验证。');
}

main();
