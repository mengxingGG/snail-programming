// 生成「演示课改造成练习课」的工作清单
//
// 判定方式：练习节会把 starterCode 原样跑一遍，再走真实的判题逻辑。
//   demo   → 显式演示节，或尚未标注且起始代码不用改就满足输出要求
//   passed → 起始代码有改动才可能通过（理论上不会出现，因为这里就是原样提交）
//   failed → 起始代码跑不出预期输出，通常是需要补全的练习，或本身有问题
//   error  → 起始代码直接报错（多为缺少第三方库的演示节）
//
// 用法：
//   npx tsx scripts/list-demo-sections.ts            # 打印汇总
//   npx tsx scripts/list-demo-sections.ts --json out.json
//
// 注意：显式 demo 会跳过执行；exercise 会真实启动 node / python 子进程。

import { writeFileSync } from 'node:fs';
import { courseData } from '../src/shared/course-data/index';
import { pythonCourseData } from '../src/shared/course-data-python/index';
import { runCode } from '../src/services/runner/service';
import { validateLessonOutput } from '../src/renderer/utils/lessonValidation';
import type { CourseData, Section } from '../src/shared/types/course';

type Status = 'demo' | 'passed' | 'failed' | 'error';

interface Row {
  course: string;
  chapterId: string;
  chapterTitle: string;
  sectionId: string;
  title: string;
  status: Status;
  hasValidation: boolean;
  needsAuthoring: boolean;
  kind?: string;
  note?: string;
}

async function classify(section: Section, language: 'typescript' | 'python'): Promise<{ status: Status; note?: string }> {
  if (section.kind === 'demo') {
    return { status: 'demo', note: '显式演示节，跳过执行' };
  }
  const run = await runCode(section.starterCode, language);
  if (!run.success) {
    return { status: 'error', note: (run.error ?? '').split('\n')[0].slice(0, 120) };
  }
  const verdict = validateLessonOutput(section, run.output ?? '', section.starterCode);
  return { status: verdict.status };
}

async function scan(courseName: string, data: CourseData, language: 'typescript' | 'python'): Promise<Row[]> {
  const rows: Row[] = [];
  for (const chapter of data.chapters) {
    for (const section of chapter.sections) {
      const { status, note } = await classify(section, language);
      rows.push({
        course: courseName,
        chapterId: chapter.id,
        chapterTitle: chapter.title,
        sectionId: section.id,
        title: section.title,
        status,
        hasValidation: !!section.validation,
        needsAuthoring: status === 'demo' && section.kind !== 'demo',
        kind: section.kind,
        note,
      });
    }
    process.stderr.write(`  已扫描 ${courseName} ${chapter.id}\n`);
  }
  return rows;
}

function summarize(rows: Row[], courseName: string): void {
  const of = (s: Status) => rows.filter(r => r.status === s).length;
  const intentionalDemos = rows.filter(r => r.status === 'demo' && r.kind === 'demo').length;
  const candidates = rows.filter(r => r.needsAuthoring);
  console.log(`\n════ ${courseName}（共 ${rows.length} 节）════`);
  console.log(`  demo   已明确为有意演示             : ${intentionalDemos}`);
  console.log(`  pending 未标注的演示改造候选        : ${candidates.length}`);
  console.log(`  failed 需要补全，已经是练习形态     : ${of('failed')}`);
  console.log(`  error  起始代码报错（多为缺依赖）   : ${of('error')}`);
  console.log(`  passed 异常情况，需人工确认         : ${of('passed')}`);

  if (candidates.length === 0) return;

  console.log('\n  改造候选（按章节）:');
  let currentChapter = '';
  for (const row of candidates) {
    if (row.chapterId !== currentChapter) {
      currentChapter = row.chapterId;
      console.log(`\n    ── ${row.chapterId} ${row.chapterTitle}`);
    }
    const flag = row.hasValidation ? '有规则' : '无规则';
    console.log(`       ${row.sectionId.padEnd(8)} [${flag}] ${row.title}`);
  }
}

async function main() {
  console.error('开始扫描（显式 demo 跳过执行，exercise 会真实运行）...');
  const tsRows = await scan('TypeScript', courseData, 'typescript');
  const pyRows = await scan('Python', pythonCourseData, 'python');
  const all = [...tsRows, ...pyRows];

  summarize(tsRows, 'TypeScript');
  summarize(pyRows, 'Python');

  const jsonFlagIndex = process.argv.indexOf('--json');
  if (jsonFlagIndex !== -1) {
    const target = process.argv[jsonFlagIndex + 1] ?? 'demo-sections.json';
    writeFileSync(target, JSON.stringify(all, null, 2), 'utf-8');
    console.log(`\n完整结果已写入 ${target}`);
  }

  const total = all.filter(r => r.needsAuthoring).length;
  console.log(`\n合计改造候选：${total} 节 / 共 ${all.length} 节`);
}

main();
