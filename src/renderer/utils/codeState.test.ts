import { describe, expect, it } from 'vitest';
import { buildLessonCodeFilename } from './codeState';

describe('buildLessonCodeFilename', () => {
  it('同一节课的 starterCode 变化后，保存文件名也应该变化，避免加载旧缓存', () => {
    const oldFilename = buildLessonCodeFilename('python', '-1.1', 'print("旧版本")');
    const newFilename = buildLessonCodeFilename('python', '-1.1', 'print("新版本")');

    expect(oldFilename).not.toBe(newFilename);
    expect(newFilename).toMatch(/^python-section--1\.1-[0-9a-f]{8}\.py$/);
  });

  it('相同 starterCode 应该得到稳定的文件名', () => {
    const filename1 = buildLessonCodeFilename('typescript', '1.4', 'console.log("demo")');
    const filename2 = buildLessonCodeFilename('typescript', '1.4', 'console.log("demo")');

    expect(filename1).toBe(filename2);
  });
});
