// 抽样验证：手写正确答案，实测判定为 passed
import { courseData } from '../src/shared/course-data/index';
import { pythonCourseData } from '../src/shared/course-data-python/index';
import { runCode } from '../src/services/runner/service';
import { validateLessonOutput } from '../src/renderer/utils/lessonValidation';
import type { CourseData, Section } from '../src/shared/types/course';

interface SampleCase {
  course: string;
  id: string;
  title: string;
  correctCode: string;
}

const cases: SampleCase[] = [
  // ── TypeScript ──
  {
    course: 'TypeScript',
    id: '2.1',
    title: '变量 — let 和 const',
    correctCode: `let city = "上海"\n\nconsole.log("我学习的城市：" + city)`,
  },
  {
    course: 'TypeScript',
    id: '5.1',
    title: 'for 循环 — 重复执行的魔法',
    correctCode: `for (let i = 1; i <= 3; i++) {\n  console.log(i)\n}`,
  },
  {
    course: 'TypeScript',
    id: '7.3',
    title: '函数 — 参数与返回值',
    correctCode: `function multiply(a: number, b: number): number {\n  return a * b\n}\n\nconsole.log("结果：" + multiply(3, 4))`,
  },
  {
    course: 'TypeScript',
    id: '8.5',
    title: '对象方法 — this 与行为',
    correctCode: `const counter = {\n  value: 0,\n  increase() {\n    this.value += 1\n    return this.value\n  },\n}\n\nconsole.log("当前值：" + counter.increase())`,
  },
  // ── Python ──
  {
    course: 'Python',
    id: '5.1',
    title: '字符串拼接',
    correctCode: `name = "Python"\n\nprint("你好，" + name)`,
  },
  {
    course: 'Python',
    id: '6.3',
    title: '列表排序',
    correctCode: `numbers = [3, 1, 2]\nnumbers.sort()\n\nprint(numbers)`,
  },
  {
    course: 'Python',
    id: '8.3',
    title: '函数返回值',
    correctCode: `def add(a, b):\n    return a + b\n\nprint("和：" + str(add(3, 4)))`,
  },
  {
    course: 'Python',
    id: '9b.2',
    title: '类型注解',
    correctCode: `name: str = "小红"\nage: int = 18\n\nprint(name + "，" + str(age) + " 岁")`,
  },
];

function findSection(data: CourseData, id: string): Section | undefined {
  return data.chapters.flatMap(ch => ch.sections).find(s => s.id === id);
}

async function main() {
  console.log('抽样验证 8 节（TS 4 + Python 4）解题正确性\n');

  let passed = 0;
  let failed = 0;

  for (const c of cases) {
    const data = c.course === 'TypeScript' ? courseData : pythonCourseData;
    const language = c.course === 'TypeScript' ? 'typescript' as const : 'python' as const;
    const section = findSection(data, c.id);

    if (!section) {
      console.log(`  ❌ ${c.course} ${c.id} — 未找到此节`);
      failed++;
      continue;
    }

    const run = await runCode(c.correctCode, language);
    if (!run.success) {
      console.log(`  ❌ ${c.course} ${c.id} ${c.title} — 代码执行失败: ${(run.error ?? '').split('\n')[0]}`);
      failed++;
      continue;
    }

    const verdict = validateLessonOutput(section, run.output ?? '', c.correctCode);
    if (verdict.status === 'passed') {
      console.log(`  ✅ ${c.course} ${c.id} ${c.title} — passed`);
      passed++;
    } else {
      console.log(`  ❌ ${c.course} ${c.id} ${c.title} — ${verdict.status}: ${verdict.message}`);
      if (verdict.details) console.log(`     ${verdict.details.split('\n').join('\n     ')}`);
      failed++;
    }
  }

  console.log(`\n结果：${passed} 通过 / ${failed} 失败 / ${cases.length} 总计`);
  if (failed > 0) process.exit(1);
}

main();
