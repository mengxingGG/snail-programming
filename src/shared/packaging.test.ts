// 打包配置守卫
//
// getProjectsRoot() 在打包模式下从 process.resourcesPath/projects 读取实战项目。
// 如果 electron-builder 的 extraResources 漏掉 projects，应用仍能正常构建、
// 正常启动，只有点进「实战项目」时才会报「项目目录不存在」——属于静默失效，
// 因此用测试把这条约束固定下来。
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

interface ExtraResource {
  from?: string;
  to?: string;
}

const config = JSON.parse(
  readFileSync(path.resolve(__dirname, '../../electron-builder.json'), 'utf-8'),
) as {
  files?: string[];
  extraResources?: Array<string | ExtraResource>;
};

describe('electron-builder 配置', () => {
  it('把 projects 目录作为 extraResources 打进 resources/projects', () => {
    const entries = config.extraResources ?? [];

    const hasProjects = entries.some(entry =>
      typeof entry === 'string'
        ? entry === 'projects'
        : entry.from === 'projects' && entry.to === 'projects');

    expect(
      hasProjects,
      'electron-builder.json 的 extraResources 必须包含 projects，否则打包后实战项目全部失效',
    ).toBe(true);
  });

  it('构建产物 dist 会被打进应用包', () => {
    expect(config.files ?? []).toContain('dist/**/*');
  });
});
