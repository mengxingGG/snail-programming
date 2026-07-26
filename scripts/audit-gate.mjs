// 依赖漏洞闸门
//
// npm audit 本身没有"已评估豁免"的概念，直接用 --audit-level 要么过于宽松，
// 要么被不适用的告警长期卡住。这里只豁免逐条评估过的 advisory。
//
// 两种严格程度：
//   生产依赖 — 会随安装包分发给用户，未经评估的 high/critical 直接让 CI 失败
//   开发依赖 — 只在本机和 CI 上构建时使用，不进安装包，因此只报告不阻断，
//              但未经评估的条目会明确列出，提醒有人去看
//
// 用法：node scripts/audit-gate.mjs

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
  {
    id: 'GHSA-mh99-v99m-4gvg',
    package: 'brace-expansion',
    reason:
      '构建期 DoS：需要喂入恶意 glob 模式才会触发无界展开 OOM，'
      + '而这些包（minimatch/glob/filelist 链路）处理的是 electron-builder.json 里我们自己写的 filter 模式，'
      + '攻击者无法控制。且不随安装包分发（打包产物中仅有 @esbuild 与 better-sqlite3）。'
      + '唯一修复版 5.0.8 把 CJS 导出从函数改成了对象（module.exports = expand → { expand }），'
      + '强制 override 会让 minimatch 3.x/5.x/9.x 抛 "expand is not a function"，实测打断 electron:build，'
      + '而 1.x/2.x 均无修复版本。等上游 electron-builder 把 @electron/asar 的 minimatch 提到 9+。',
    reviewedOn: '2026-07-26',
  },
];

const EXCEPTION_IDS = new Set(REVIEWED_EXCEPTIONS.map(item => item.id));
const BLOCKING_SEVERITIES = new Set(['high', 'critical']);

async function npmAudit(extraArgs) {
  const args = ['audit', ...extraArgs, '--json'];
  try {
    // Windows 上 npm 是 .cmd，新版 Node 不允许直接 spawn，必须经 shell。
    // 这里的参数全是字面量常量，不含外部输入，没有拼接注入面。
    const { stdout } = await run('npm', args, {
      shell: process.platform === 'win32',
      maxBuffer: 32 * 1024 * 1024,
    });
    return stdout;
  } catch (err) {
    // 有漏洞时 npm audit 以非零码退出，但仍会输出完整 JSON
    if (err.stdout) return err.stdout;
    console.error(`无法执行 npm ${args.join(' ')}：`, err.message);
    process.exit(2);
  }
}

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

function printWaived(advisories, label) {
  const waived = advisories.filter(item => EXCEPTION_IDS.has(item.id));
  if (waived.length === 0) return;

  console.log(`  已评估豁免（${label}）：`);
  for (const item of waived) {
    const note = REVIEWED_EXCEPTIONS.find(e => e.id === item.id);
    console.log(`    · [${item.severity}] ${item.package} ${item.id}（复核于 ${note.reviewedOn}）`);
    console.log(`      ${note.reason}`);
  }
  console.log('');
}

function unreviewed(advisories) {
  return advisories.filter(
    item => BLOCKING_SEVERITIES.has(item.severity) && !EXCEPTION_IDS.has(item.id),
  );
}

async function main() {
  const prodReport = JSON.parse(await npmAudit(['--omit=dev']));
  const allReport = JSON.parse(await npmAudit([]));

  const prodAdvisories = collectAdvisories(prodReport.vulnerabilities ?? {});
  const allAdvisories = collectAdvisories(allReport.vulnerabilities ?? {});

  const prodIds = new Set(prodAdvisories.map(a => a.id));
  const devAdvisories = allAdvisories.filter(a => !prodIds.has(a.id));

  // ── 生产依赖：未经评估的 high/critical 阻断 ──
  console.log('── 生产依赖（随安装包分发）──');
  printWaived(prodAdvisories, '生产');
  const prodBlocking = unreviewed(prodAdvisories);

  if (prodBlocking.length === 0) {
    console.log('  ✓ 没有未经评估的 high/critical 漏洞\n');
  } else {
    console.error(`  ✗ 发现 ${prodBlocking.length} 条未经评估的 high/critical 漏洞：`);
    for (const item of prodBlocking) {
      console.error(`    · [${item.severity}] ${item.package} — ${item.title}`);
      console.error(`      ${item.url}`);
    }
    console.error('');
  }

  // ── 开发依赖：只报告，不阻断 ──
  console.log('── 开发依赖（仅构建期使用，不进安装包）──');
  printWaived(devAdvisories, '开发');
  const devUnreviewed = unreviewed(devAdvisories);

  if (devUnreviewed.length === 0) {
    console.log('  ✓ 没有未经评估的 high/critical 漏洞\n');
  } else {
    console.log(`  ⚠ 有 ${devUnreviewed.length} 条未经评估的 high/critical 漏洞，请人工复核后登记：`);
    for (const item of devUnreviewed) {
      console.log(`    · [${item.severity}] ${item.package} — ${item.title}`);
      console.log(`      ${item.url}`);
    }
    console.log('    （不阻断 CI：这些包不随安装包分发）\n');
  }

  // ── 豁免清单维护提醒 ──
  const stale = REVIEWED_EXCEPTIONS.filter(e => !allAdvisories.some(a => a.id === e.id));
  if (stale.length > 0) {
    console.log('以下豁免已不再需要，可从 scripts/audit-gate.mjs 移除：');
    stale.forEach(e => console.log(`  · ${e.package} ${e.id}`));
    console.log('');
  }

  if (prodBlocking.length > 0) {
    console.error('请升级依赖；确认不适用时，把 advisory ID 连同理由加入 REVIEWED_EXCEPTIONS。');
    process.exit(1);
  }
}

main();
