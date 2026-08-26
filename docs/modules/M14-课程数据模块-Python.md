# M14 - 课程数据模块（Python）

## 基本信息
- **职责**：提供全部 27 章 95 节 Python 教学内容数据
- **依赖**：shared/types/course.ts（复用 TS 课程的类型结构）
- **被依赖方**：M09 学习工作台、M08 侧边栏、M06 考试验证
- **预估代码量**：7000+ 行（纯数据）
- **优先级**：P0

---

## 文件清单

| 文件路径 | 用途 | 章节 |
|---------|------|:---:|
| src/shared/course-data-python/index.ts | 总入口 | — |
| src/shared/course-data-python/part1-basics.ts | 🌱 Python 启蒙 | Ch1-9 |
| src/shared/course-data-python/part2-advanced.ts | 🌿 Python 进阶 | Ch10-12 |
| src/shared/course-data-python/part3-scraping.ts | 🕸️ 爬虫与自动化 | Ch13-16 |
| src/shared/course-data-python/part4-web.ts | 🎨 Web 开发 | Ch17-20 |
| src/shared/course-data-python/part5-advanced.ts | 🚀 高级进阶 | Ch21-27 |
| src/shared/course-data-python/exams.ts | 📝 全部章节考题 | Ch1-27 |

---

## 数据类型定义

> 复用 shared/types/course.ts 中的 Section、Chapter、Question 等类型。
> 注意：Python 代码使用 `language: 'python'` 标记。

```typescript
// Section.content 中的 Markdown 示例代码块：
// ```python
// print("Hello, World!")
// ```

// 其他字段与 TS 课程完全一致
```

---

## 内容来源

参考以下经典 Python 教学资源：

| 资源 | 特点 | 适用章节 |
|------|------|:---:|
| **Python Crash Course** (3rd Ed) | 全球最畅销入门书 | Ch1-9 基础 |
| **Automate the Boring Stuff** (3rd Ed) | 零基础实用向 | Ch9-16 文件/爬虫 |
| **Think Python** (3rd Ed) | 面向初学者 | Ch1-11 基础+OOP |
| **Flask 官方文档** | Quickstart + Tutorial | Ch17-20 |
| **BeautifulSoup 官方文档** | 爬虫入门 | Ch14 |
| **Pygame 官方文档** | 游戏开发入门 | Ch22 |
| **Django 官方教程** | 全栈框架 | Ch24 |

---

## 内容编写规范

与 TS 课程一致的格式，唯一的区别是代码示例用 `python` 标记：

```typescript
// 示例：Ch3.1 — if 条件判断（Python 版）
{
  id: "3.1",
  chapterId: "ch3",
  title: "if — 让 Python 做选择",
  content: `## 条件判断：if 语句

Python 用 \`if\` 让程序根据条件做不同的事。

**和 TypeScript 的区别：**
- Python 不需要括号包裹条件：\`if age >= 18:\`
- Python 用**冒号 :** 代替花括号
- Python 用**缩进**（4个空格）表示代码块

\`\`\`python
age = 18
if age >= 18:
    print("成年")
\`\`\`\n
注意第 2 行的缩进！没有缩进 Python 就不知道这是 if 里面的代码。`,
  starterCode: `age = 18
if age >= 18:
    print("成年")`,
  expectedOutput: "成年",
  hint: "把 age 改成 15 试试，记得缩进 print 那行！"
}
```

### 编写规则（与 TS 一致）

| 规则 | 说明 |
|------|------|
| **每节一个概念** | 不要一节讲多个概念 |
| content ≤ 700字 | 1-2 屏 |
| starterCode 3-10行 | 可直接运行 |
| expectedOutput 精确 | trim 后完全匹配 |
| 语言通俗 | 像朋友在教 |
| **Python 特色** | 多用 f-string、列表推导式、with 语句等 Pythonic 写法 |

---

## 各 Part 章节分配

### part1-basics.ts — 🌱 Python 启蒙（9章，32节）

```
ch1:  Python 初体验（3节）
ch2:  变量与数据类型（4节）
ch3:  条件判断（3节）
ch4:  循环（4节）
ch5:  字符串处理（3节）
ch6:  列表与元组（5节）
ch7:  字典与集合（4节）
ch8:  函数（5节）
ch9:  文件操作（3节）
```

### part2-advanced.ts — 🌿 进阶（3章，10节）

```
ch10: 模块与包管理（3节）
ch11: 面向对象入门（4节）
ch12: 错误处理与调试（3节）
```

### part3-scraping.ts — 🕸️ 爬虫（4章，14节）

```
ch13: HTTP 与 Requests（4节）
ch14: 网页解析：BeautifulSoup（4节）
ch15: 浏览器自动化：Selenium（3节）
ch16: 数据存储（4节）
```

### part4-web.ts — 🎨 Web 开发（4章，12节）

### part5-advanced.ts — 🚀 高级进阶（7章，25节）

```
ch21: 图形界面 Tkinter（4节）
ch22: 游戏开发 Pygame（5节）
ch23: 数据分析 pandas+matplotlib（4节）
ch24: Django 全栈（5节）
ch25: FastAPI 异步 API（3节）
ch26: 进阶爬虫 Scrapy（3节）
ch27: 部署上线（3节）
```

```
ch17: Flask 入门（4节）
ch18: 模板与数据库（3节）
ch19: 表单与用户认证（3节）
ch20: REST API（2节）
```

---

## 考题格式

与 TS 课程一致，每章 3-5 题：

```typescript
// exams.ts
export const allQuestions: Record<string, Question[]> = {
  "ch1": [
    {
      id: "ch1-pq1", chapterId: "ch1", type: "choice",
      text: "Python 中输出文字到控制台的函数是什么？",
      options: ["console.log()", "print()", "echo()", "write()"],
      answer: "print()",
    },
    {
      id: "ch1-pq2", chapterId: "ch1", type: "fill",
      text: "Python 用 _____ 符号代替花括号来表示代码块。",
      answer: "缩进",
    },
    {
      id: "ch1-pq3", chapterId: "ch1", type: "choice",
      text: "Python 文件扩展名是什么？",
      options: [".js", ".ts", ".py", ".java"],
      answer: ".py",
    },
  ],
  // ... 每章 3-5 题
};
```

---

## 导出格式

```typescript
// src/shared/course-data-python/index.ts

import { part1Chapters } from './part1-basics';
import { part2Chapters } from './part2-advanced';
import { part3Chapters } from './part3-scraping';
import { part4Chapters } from './part4-web';
import { allQuestions } from './exams';
import type { CourseData } from '../types/course';

export const pythonCourseData: CourseData = {
  chapters: [
    ...part1Chapters,
    ...part2Chapters,
    ...part3Chapters,
    ...part4Chapters,
    ...part5Chapters,
  ],
  questions: allQuestions,
  totalSections: 95,
};
```

---

## 技术注意事项

Python 代码在 Electron 中的执行需要：

1. **编译器**：不需要编译，Python 是解释型语言
2. **运行时**：需要系统安装 Python 3（`python3` 或 `python` 命令）
3. **沙箱**：M05 runner 需要增加 Python 支持：
   ```typescript
   // compiler.ts 新增
   export async function runPython(code: string): Promise<string> {
     const tmpFile = path.join(os.tmpdir(), `snail_py_${Date.now()}.py`);
     fs.writeFileSync(tmpFile, code, 'utf-8');
     try {
       return execSync('python ' + tmpFile, { timeout: 5000, encoding: 'utf-8' });
     } finally {
       try { fs.unlinkSync(tmpFile); } catch {}
     }
   }
   ```
4. **安全**：Python 沙箱需要拦截 `import os`, `import subprocess`, `__import__` 等

---

## 开发顺序

```
1. part1-basics.ts     ← 优先，Python 启蒙
2. part2-advanced.ts
3. part3-scraping.ts
4. part4-web.ts
5. part5-advanced.ts   ← 含游戏和数据科学
6. exams.ts
7. index.ts
```

---

## 当前状态

所有文件已完成 ✅

| 文件 | 节数 | 实际行数 | 状态 |
|------|:---:|:---:|:---:|
| part1-basics.ts | 41 | ~3100 | ✅ |
| part2-advanced.ts | 19 | ~1800 | ✅ |
| part3-scraping.ts | 19 | ~2300 | ✅ |
| part4-web.ts | 17 | ~1900 | ✅ |
| part5-advanced.ts | 39 | ~3600 | ✅ |
| exams.ts | 33章 99题 | ~700 | ✅ |
| index.ts | — | 30 | ✅ |
| **合计** | **135节** | **~13400行** | ✅ |

### 实战项目
| 项目 | 位置 | 节数 |
|------|------|:---:|
| P1 CLI备忘录工具 | part1-basics | 3 |
| P2 日志分析脚本 | part2-advanced | 3 |
| P3 电商价格监控 | part3-scraping | 3 |
| P4 个人博客 | part4-web | 3 |
| P5 贪吃蛇游戏 | part5-advanced | 3 |
| P6 Django全栈管理系统 | part5-advanced | 4 |

---

## 开发状态
- **状态**：✅ 已完成
- **实现文件**：src/shared/course-data-python/*.ts
- **开发者备注**：复用 TS 课程的类型定义。代码块标记为 `python`。Python 不需要编译，但需要系统安装 Python 3
- **提交时间**：2026-06-26
