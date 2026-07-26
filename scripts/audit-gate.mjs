// 生产依赖漏洞闸门
//
// npm audit 本身没有"已评估豁免"的概念，直接用 --audit-level 要么过于宽松，
// 要么被不适用的告警长期卡住。这里只豁免逐条评估过的 advisory，
// 其余一律让 CI 失败，新出现的告警必须有人看过才能加进来。

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);

/**
 * 已评估、确认不适用于本项目的 advisory。
 * 新增条目必须写清楚为什么不适用，以及复核日期。
 */
const REVIEWED_EXCEPTIONS = [
  {
    id: 'GHSA-qwww-vcr4-c8h2',
    package: 'react-router',
    reason:
      '仅影响 React Router 的 RSC(React Server Components) 模式：需要服务端渲染入口并显式启用。'
      + '本项目是纯本地 Electron 应用，使用 HashRouter，不存在服务端，也未引入 RSC。',
    reviewedOn: '2026-07-26',
  },
];

const EXCEPTION_IDS = new Set(REVIEWED_EXCEPTIONS.map(item => item.id));
const BLOCKING_SEVERITIES = new Set(['high', 'critical']);

function collectAdvisories(vulnerabilities) {
  const found = new Map();

  for (const vuln of Object.values(vulnerabilities)) {
    for (const via of vuln.via ?? []) {
      // 字符串形式的 via 表示"经由另一个包间接引入"，源头会另行出现
      if (typeof via !== 'object') continue;
      const id = via.url?.split('/').pop() ?? via.source ?? String(via.title);
      if (!found.has(id)) {
        found.set(id, {
          id,
          package: via.name,
          severity: via.severity,
          title: via.title,
          url: via.url,
        });
      }
    }
  }
  return [...found.values()];
}

async function main() {
  let raw;
  try {
    // Windows 上 npm 是 .cmd，新版 Node 不允许直接 spawn，必须经 shell。
    // 这里的参数全是字面量常量，不含外部输入，没有拼接注入面。
    const { stdout } = await run('npm', ['audit', '--omit=dev', '--json'], {
      shell: process.platform === 'win32',
      maxBuffer: 32 * 1024 * 1024,
    });
    raw = stdout;
  } catch (err) {
    // 有漏洞时 npm audit 以非零码退出，但仍会输出完整 JSON
    raw = err.stdout;
    if (!raw) {
      console.error('无法执行 npm audit：', err.message);
      process.exit(2);
    }
  }

  const report = JSON.parse(raw);
  const advisories = collectAdvisories(report.vulnerabilities ?? {});

  const blocking = advisories.filter(
    item => BLOCKING_SEVERITIES.has(item.severity) && !EXCEPTION_IDS.has(item.id),
  );
  const waived = advisories.filter(item => EXCEPTION_IDS.has(item.id));

  if (waived.length > 0) {
    console.log('已评估豁免的告警：');
    for (const item of waived) {
      const note = REVIEWED_EXCEPTIONS.find(e => e.id === item.id);
      console.log(`  · [${item.severity}] ${item.package} ${item.id}`);
      console.log(`    ${note.reason}（复核于 ${note.reviewedOn}）`);
    }
    console.log('');
  }

  // 豁免清单里已经修掉的条目应及时清理，避免长期挂着无效豁免
  const stale = REVIEWED_EXCEPTIONS.filter(e => !advisories.some(a => a.id === e.id));
  if (stale.length > 0) {
    console.log('以下豁免已不再需要，可从 scripts/audit-gate.mjs 移除：');
    stale.forEach(e => console.log(`  · ${e.package} ${e.id}`));
    console.log('');
  }

  if (blocking.length === 0) {
    console.log('✓ 生产依赖没有未经评估的 high/critical 漏洞');
    return;
  }

  console.error(`✗ 发现 ${blocking.length} 条未经评估的 high/critical 漏洞：`);
  for (const item of blocking) {
    console.error(`  · [${item.severity}] ${item.package} — ${item.title}`);
    console.error(`    ${item.url}`);
  }
  console.error('');
  console.error('请升级依赖；确认不适用时，把 advisory ID 连同理由加入 REVIEWED_EXCEPTIONS。');
  process.exit(1);
}

main();
