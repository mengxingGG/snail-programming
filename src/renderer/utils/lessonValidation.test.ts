import { describe, expect, it } from 'vitest';
import { validateLessonOutput } from './lessonValidation';
import type { Section, SectionValidation } from '../../shared/types/course';
import { pythonCourseData } from '../../shared/course-data-python';
import { courseData } from '../../shared/course-data';

function buildSection(overrides: Partial<Section>): Section {
  return {
    id: 'demo',
    chapterId: 'ch-demo',
    title: '演示课程',
    content: '演示内容',
    starterCode: 'console.log("demo")',
    expectedOutput: '固定输出',
    ...overrides,
  };
}

function editRequiredValidation(secondLine: string): SectionValidation {
  return {
    mode: 'edit_required',
    requireCodeChangeFromStarter: true,
    codeRules: [
      { type: 'not_includes', value: '我的名字叫：小明' },
    ],
    outputRules: [
      { type: 'exact', value: 'Hello, World!' },
      { type: 'exact', value: secondLine },
      { type: 'regex', value: '^我的名字叫：(?!小明$).+' },
    ],
  };
}

describe('课程输出校验', () => {
  it('TS 的 Hello World 改名练习允许把默认名字改成自己的名字', () => {
    const section = buildSection({
      id: '1.3',
      starterCode: `console.log("Hello, World!")\nconsole.log("你好，蜗牛编程！")\nconsole.log("我的名字叫：小明")`,
      expectedOutput: `Hello, World!
你好，蜗牛编程！
我的名字叫：你的名字`,
      validation: editRequiredValidation('你好，蜗牛编程！'),
    });

    const result = validateLessonOutput(section, `Hello, World!
你好，蜗牛编程！
我的名字叫：小红`, `console.log("Hello, World!")\nconsole.log("你好，蜗牛编程！")\nconsole.log("我的名字叫：小红")`);

    expect(result.passed).toBe(true);
  });

  it('Python 的 Hello World 改名练习不应误套 TS 的固定第二行规则', () => {
    const section = buildSection({
      id: '1.3',
      starterCode: `print("Hello, World!")\nprint("你好，Python！")\nprint("我的名字叫：小明")`,
      expectedOutput: `Hello, World!
你好，Python！
我的名字叫：小明`,
      hint: '把"小明"换成你的名字，再点运行——Python 不需要编译，改完立刻跑！',
      validation: editRequiredValidation('你好，Python！'),
    });

    const result = validateLessonOutput(section, `Hello, World!
你好，Python！
我的名字叫：小红`, `print("Hello, World!")\nprint("你好，Python！")\nprint("我的名字叫：小红")`);

    expect(result.passed).toBe(true);
  });

  it('对环境相关章节允许动态字段变化，但仍校验核心片段', () => {
    const section = buildSection({
      id: '12.1',
      expectedOutput: `Node.js 版本：v22.12.0
操作系统：win32
当前目录：C:\\Temp
百万次循环耗时：2ms`,
      hint: '你的 Node.js 版本和系统路径可能不同，这两行的输出会有差异——这完全正常！',
      validation: {
        mode: 'dynamic_lines',
        outputRules: [
          { type: 'prefix', value: 'Node.js 版本：' },
          { type: 'prefix', value: '操作系统：' },
          { type: 'prefix', value: '当前目录：' },
          { type: 'prefix', value: '百万次循环耗时：' },
        ],
      },
    });

    const result = validateLessonOutput(section, `Node.js 版本：v24.0.1
操作系统：win32
当前目录：D:\\workspace\\temp
百万次循环耗时：9ms`);

    expect(result.passed).toBe(true);
  });

  it('对 Flask 启动类章节按关键片段校验，而不是要求逐字完全相等', () => {
    const section = buildSection({
      id: '17.3',
      expectedOutput: ` * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!`,
      hint: '试试访问 http://127.0.0.1:5000/hello/小明 和 http://127.0.0.1:5000/article/42，看看动态路由的效果！',
      validation: {
        mode: 'dynamic_lines',
        outputRules: [
          { type: 'contains', value: 'Serving Flask app' },
          { type: 'contains', value: 'Debug mode: on' },
          { type: 'contains', value: 'Running on http://127.0.0.1:' },
          { type: 'contains', value: 'Press CTRL+C to quit' },
          { type: 'contains', value: 'Restarting with stat', optional: true },
          { type: 'contains', value: 'Debugger is active!', optional: true },
          { type: 'contains', value: 'Debugger PIN:', optional: true },
        ],
      },
    });

    const result = validateLessonOutput(section, ` * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5001
Press CTRL+C to quit
 * Debugger PIN: 123-456-789`);

    expect(result.passed).toBe(true);
  });

  it('对 Python 的随机数和时间占位符输出允许动态变化', () => {
    const section = buildSection({
      id: '10.1',
      expectedOutput: `16 的平方根是 4.0
圆周率约等于 3.14
掷骰子：**随机数**
现在时间是 2026-01-15 10:30:00（**实际时间会不同**）`,
      validation: {
        mode: 'dynamic_lines',
        outputRules: [
          { type: 'exact', value: '16 的平方根是 4.0' },
          { type: 'exact', value: '圆周率约等于 3.14' },
          { type: 'regex', value: '^掷骰子：\\d+$' },
          { type: 'prefix', value: '现在时间是 ' },
        ],
      },
    });

    const result = validateLessonOutput(section, `16 的平方根是 4.0
圆周率约等于 3.14
掷骰子：6
现在时间是 2026-07-03 21:15:48`);

    expect(result.passed).toBe(true);
  });

  it('对 TS 课程里随机 id 的输出允许动态变化', () => {
    const section = buildSection({
      id: '13.4',
      expectedOutput: `状态: 201 { id: 537, title: 'TypeScript 入门', content: '这是文章正文，内容超过十个字', createdAt: '2026-06-26' }
状态: 400 { error: '缺少 title 字段' }
状态: 400 { error: 'content 至少需要 10 个字' }`,
      hint: '第一行的 id 是随机数，你的输出中这个数字会不同——这是正常的',
      validation: {
        mode: 'regex_pattern',
        outputRules: [
          { type: 'regex', value: "^状态: 201 \\{ id: \\d+, title: 'TypeScript 入门', content: '这是文章正文，内容超过十个字', createdAt: '2026-06-26' \\}$" },
          { type: 'exact', value: "状态: 400 { error: '缺少 title 字段' }" },
          { type: 'exact', value: "状态: 400 { error: 'content 至少需要 10 个字' }" },
        ],
      },
    });

    const result = validateLessonOutput(section, `状态: 201 { id: 912, title: 'TypeScript 入门', content: '这是文章正文，内容超过十个字', createdAt: '2026-06-26' }
状态: 400 { error: '缺少 title 字段' }
状态: 400 { error: 'content 至少需要 10 个字' }`);

    expect(result.passed).toBe(true);
  });

  it('对哈希值和 salt 这类动态结构输出允许变化', () => {
    const section = buildSection({
      id: '15a.2',
      expectedOutput: `原始密码： 我的密码123
哈希结果：e68891e79a84e5af86…
用的 salt：random_salt_xxxxx

正确密码验证：✅ 通过
错误密码验证：✅ 被拒绝`,
      hint: 'salt（随机字符串）确保即使两人用相同密码，哈希结果也不一样——防止攻击者通过"彩虹表"批量破解',
      validation: {
        mode: 'regex_pattern',
        outputRules: [
          { type: 'exact', value: '原始密码： 我的密码123' },
          { type: 'regex', value: '^哈希结果：.+…$' },
          { type: 'regex', value: '^用的 salt：random_salt_[a-z0-9]+$' },
          { type: 'exact', value: '' },
          { type: 'exact', value: '正确密码验证：✅ 通过' },
          { type: 'exact', value: '错误密码验证：✅ 被拒绝' },
        ],
      },
    });

    const result = validateLessonOutput(section, `原始密码： 我的密码123
哈希结果：aabbccddeeff001122…
用的 salt：random_salt_ab12cd

正确密码验证：✅ 通过
错误密码验证：✅ 被拒绝`);

    expect(result.passed).toBe(true);
  });

  it('对改代码练习要求代码必须真的变化', () => {
    const section = buildSection({
      starterCode: `console.log("Hello, World!")\nconsole.log("你好，蜗牛编程！")\nconsole.log("我的名字叫：小明")`,
      expectedOutput: `Hello, World!
你好，蜗牛编程！
我的名字叫：你的名字`,
      validation: editRequiredValidation('你好，蜗牛编程！'),
    });

    const result = validateLessonOutput(section, `Hello, World!
你好，蜗牛编程！
我的名字叫：小红`, section.starterCode);

    expect(result.passed).toBe(false);
  });

  it('对固定输出章节仍保持严格匹配', () => {
    const section = buildSection({
      expectedOutput: 'Hello\nWorld',
    });

    const result = validateLessonOutput(section, 'Hello\nTrae');

    expect(result.passed).toBe(false);
  });

  it('Python 9a.4 应该是一道真正的修 bug 题，而不是默认就通过', () => {
    const section = pythonCourseData.chapters
      .flatMap(chapter => chapter.sections)
      .find(item => item.id === '9a.4');

    expect(section).toBeTruthy();
    expect(section?.validation?.mode).toBe('edit_required');
    expect(section?.starterCode).toContain('result = sorted_nums[mid - 1]');

    const starterResult = validateLessonOutput(section!, section!.expectedOutput, section!.starterCode);
    expect(starterResult.passed).toBe(false);

    const fixedCode = section!.starterCode.replace('result = sorted_nums[mid - 1]', 'result = sorted_nums[mid]');
    const fixedResult = validateLessonOutput(section!, section!.expectedOutput, fixedCode);
    expect(fixedResult.passed).toBe(true);
  });

  it('关键动态题和教学题都应该显式声明 validation，防止回退到硬编码判题', () => {
    const tsValidatedIds = ['1.3', '1.4', '4.2', '9a.2', '9a.3', '12.1', '12.2', '13.4', '15a.2', '15a.3', 'p6.2'];
    const pythonValidatedIds = ['0.2', '0.3', '0.4', '1.2', '1.3', '8.7', '9a.4', '10.1', '11.6', '12.4', '12.5', '13.2', '13.4', '15.2', '15.3', '15.4', '16.4', '17.1', '17.2', '17.3', '17.4', '19.2', '19.4', '21.2', '21.3', '21.4', '21.5', '22.1', '22.2', '22.3', '22.4', '22.5', '22.6', '22.7', '24.1', '25.3', '25a.1', '25a.2', '25a.3', '25a.4', '27a.1', '27a.2', '27a.3', '27a.5', 'p1.3', 'p3.2', 'p3.3', 'p5.1', 'p5.2', 'p5.3'];

    const tsSections = courseData.chapters.flatMap(chapter => chapter.sections);
    const pythonSections = pythonCourseData.chapters.flatMap(chapter => chapter.sections);

    for (const id of tsValidatedIds) {
      const section = tsSections.find(item => item.id === id);
      expect(section, `未找到 TS 章节 ${id}`).toBeTruthy();
      expect(section?.validation, `TS 章节 ${id} 缺少 validation`).toBeTruthy();
    }

    for (const id of pythonValidatedIds) {
      const section = pythonSections.find(item => item.id === id);
      expect(section, `未找到 Python 章节 ${id}`).toBeTruthy();
      expect(section?.validation, `Python 章节 ${id} 缺少 validation`).toBeTruthy();
    }
  });

  it('Python -1.1 的 starterCode 应该使用合法字符串并能匹配固定输出', () => {
    const section = pythonCourseData.chapters
      .flatMap(chapter => chapter.sections)
      .find(item => item.id === '-1.1');

    expect(section).toBeTruthy();
    expect(section?.starterCode).toContain(`print('💡 上面这些信息就是计算机"自我介绍"的结果')`);

    const result = validateLessonOutput(section!, section!.expectedOutput, section!.starterCode);
    expect(result.passed).toBe(true);
  });

  it('输出匹配时应当容忍行尾空格，并且不应该出现长度相同但无错误详情的诡异提示', () => {
    const section = courseData.chapters
      .flatMap(chapter => chapter.sections)
      .find(item => item.id === '1.1');
      
    if (section) {
      // 在实际输出的行尾加上多余空格
      const outputWithTrailingSpaces = section.expectedOutput.replace(/\n/g, ' \n') + '   ';
      const result = validateLessonOutput(section, outputWithTrailingSpaces, section.starterCode);
      
      expect(result.passed, '应当容忍行尾空格').toBe(true);
      expect(result.details).toBeUndefined();
    }
  });

  it('TS 4.2 应该要求用户真正修复 starterCode，而不是原始示例直接通过', () => {
    const section = courseData.chapters
      .flatMap(chapter => chapter.sections)
      .find(item => item.id === '4.2');

    expect(section).toBeTruthy();
    expect(section?.validation?.mode).toBe('edit_required');

    const starterResult = validateLessonOutput(section!, section!.expectedOutput, section!.starterCode);
    expect(starterResult.passed).toBe(false);

    // 修复所有三处错误：删除拼错的变量声明，修正 console.log 引用
    const fixedCode = section!.starterCode
      .replace("const userNmae = \"\"\n", '')
      .replace("const ctiy = \"\"\n", '')
      .replace("const bb = 0\n", '')
      .replace('userNmae', 'userName')
      .replace('ctiy', 'city')
      .replace('a + bb', 'a + b');
    const fixedResult = validateLessonOutput(section!, section!.expectedOutput, fixedCode);
    expect(fixedResult.passed).toBe(true);
  });

  it('TS 动态报错与调试输出应该接受合理的真实结果', () => {
    const sections = courseData.chapters.flatMap(chapter => chapter.sections);
    const cases = [
      {
        id: '9a.2',
        output: `解析成功！数据：{"name":"小明","score":95}
解析失败：Unterminated string in JSON at position 15 (line 1 column 16)
解析失败：Unexpected end of JSON input
所有输入处理完毕 ✅`,
      },
      {
        id: '9a.3',
        output: `计算结果：170

调试追踪记录：
┌─────────┬────────────┬─────────────────────────────────────────┬────────────┐
│ (index) │ step       │ value                                   │ timestamp  │
├─────────┼────────────┼─────────────────────────────────────────┼────────────┤
│ 0       │ '输入'     │ { orderId: 1001, amount: 200, discount: 0.15 } │ '21:15:48' │
│ 1       │ '初始金额' │ 200                                     │ '21:15:48' │
│ 2       │ '折扣后'   │ 170                                     │ '21:15:48' │
│ 3       │ '最终结果' │ 170                                     │ '21:15:48' │
└─────────┴────────────┴─────────────────────────────────────────┴────────────┘`,
      },
    ];

    for (const testCase of cases) {
      const section = sections.find(item => item.id === testCase.id);
      expect(section, `未找到 TS 章节 ${testCase.id}`).toBeTruthy();
      const result = validateLessonOutput(section!, testCase.output, section!.starterCode);
      expect(result.passed, `TS 章节 ${testCase.id} 仍未接受合理输出`).toBe(true);
    }
  });

  it('Python 高风险动态章节应该接受合理的真实输出，而不是死卡占位文案', () => {
    const sections = pythonCourseData.chapters.flatMap(chapter => chapter.sections);
    const cases = [
      {
        id: '0.3',
        output: `📁 当前工作目录（示例）：
  /home/user/project

📂 目录内容（示例）：
  📁 src
  📄 main.py
  📄 README.md

🗂️ 路径拼接示例：
  新项目路径：/home/user/project/my_project
  是否存在？False（文件尚未创建）

🐍 运行 Python 的命令：
  python3 my_script.py（macOS/Linux）
  python my_script.py（Windows）`,
      },
      {
        id: '0.4',
        output: `=== 虚拟环境检查 ===
Python 路径：C:\\Users\\demo\\Desktop\\workspace\\snail-programming\\.venv
是否在虚拟环境中：✅ 是

📁 虚拟环境目录结构：
myenv/
  ├── bin/        (Scripts/ on Windows)
  │   ├── python     ← 这个环境的 Python
  │   ├── pip        ← 这个环境的 pip
  │   └── activate   ← 激活脚本
  ├── lib/
  │   └── site-packages/  ← pip 安装的包放这里
  └── pyvenv.cfg

💡 创建命令：python -m venv myenv
💡 激活命令：myenv\\Scripts\\activate`,
      },
      {
        id: '13.2',
        output: `状态码: 200
响应内容:
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "User-Agent": "python-requests/2.32.4"
  },
  "origin": "127.0.0.1",
  "url": "https://httpbin.org/get"
}`,
      },
      {
        id: '15.3',
        output: `提交后的 URL: https://httpbin.org/post
返回内容:
{
  "form": {
    "custname": "小明",
    "custtel": "13800138000",
    "size": "medium",
    "topping": "bacon"
  },
  "headers": {
    "User-Agent": "Mozilla/5.0"
  }`,
      },
      {
        id: '15.4',
        output: `✅ 无头模式启动成功
页面标题: httpbin.org
最终 URL: https://httpbin.org/delay/2
页面文本长度: 42 字符
浏览器已关闭（无头模式，全程无窗口弹出）`,
      },
      {
        id: '19.2',
        output: `=== 注册 ===
用户 xiaoming 注册成功
存储的密码哈希：9c9064c8f0e4b1e02f4a...（已脱敏）

=== 登录 ===
✅ 登录成功！session 已设置
   session['user'] = xiaoming

=== 检查登录状态 ===
已登录用户：xiaoming

=== 登出 ===
session 已清除，当前用户：None`,
      },
      {
        id: 'p3.2',
        output: `📋 机械键盘 K8 Pro 价格历史:
  2025-03-20 10:00:00 | ¥349.00
  2026-07-03 21:15:48 | ¥329.00

上次: ¥349.00 → 本次: ¥329.00
🎉 降了 ¥20.00！是时候入手了！`,
      },
      {
        id: 'p3.3',
        output: `🛒 电商价格监控已启动
==================================================

[2026-07-03 21:15:48] 第 1 次检查...
  商品: 机械键盘 K8 Pro
  价格: ¥349.00
  📝 初始记录
  💤 等待 3 秒后下一次检查...

[2026-07-03 21:15:49] 第 2 次检查...
  商品: 机械键盘 K8 Pro
  价格: ¥329.00
  🔔 降价提醒！¥349.00 → ¥329.00 (降 ¥20.00)
  💤 等待 3 秒后下一次检查...

[2026-07-03 21:15:50] 第 3 次检查...
  商品: 机械键盘 K8 Pro
  价格: ¥329.00
  ➡️  价格持平
  💤 等待 3 秒后下一次检查...

[2026-07-03 21:15:51] 第 4 次检查...
  商品: 机械键盘 K8 Pro
  价格: ¥299.00
  🔔 降价提醒！¥329.00 → ¥299.00 (降 ¥30.00)

✅ 监控完成！共检查 4 次`,
      },
      {
        id: '12c.4',
        output: `📁 CLI 文件统计工具

--- 基本模式 ---
========================================
📊 文本统计报告
========================================
生成时间：2026-01-15 10:30:00  # 固定时间（实际应用中用datetime.now()）
行数：5
单词数：6
字符数：61
平均每行单词：1.2
========================================

--- 详细模式 + 输出到文件 ---
========================================
📊 文本统计报告
========================================
生成时间：2026-01-15 10:30:00  # 固定时间（实际应用中用datetime.now()）
行数：5
单词数：6
字符数：61
平均每行单词：1.2
========================================

🔍 详细诊断：
  原始字节数：161
  空行数：0
  最长行：17 字符

💾 报告已保存到：report.txt

📄 report.txt 已创建：308 字节`,
      },
      {
        id: '12.5',
        output: `09:18:32 | INFO    | 程序启动
09:18:32 | INFO    | 开始处理 3 条数据
09:18:32 | INFO    | 处理完成
09:18:32 | WARNING | 内存使用超过 80%
09:18:32 | INFO    | 程序结束`,
      },
      {
        id: '13.4',
        output: `请求的 URL: https://httpbin.org/get?page=1&size=10
服务器看到的 User-Agent:
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0.0.0 Safari/537.36`,
      },
      {
        id: '15.2',
        output: `页面标题: HTML Form Demo
输入框 placeholder: Your full name
按钮文字: Submit`,
      },
      {
        id: '16.4',
        output: `🐼 城市数据分析报告
==================================================
 城市   房价均价  平均薪资  Python岗位数  房价收入比
 杭州  42000  14000        2200    3.0
 广州  38000  12000        1800    3.2
 北京  65000  18000        3500    3.6
 上海  72000  19500        4200    3.7
 深圳  68000  17500        3900    3.9
==================================================

📊 房价均价最高: 上海 (72,000元/㎡)
📊 Python岗位最多: 上海 (4,200个)
📊 平均房价均价: 57,000元/㎡`,
      },
      {
        id: 'p4.1',
        output: `📊 已创建的表: articles, comments, users
  articles: id(INTEGER), title(TEXT), content(TEXT), author(TEXT), created_at(TIMESTAMP)
  comments: id(INTEGER), article_id(INTEGER), author(TEXT), content(TEXT), created_at(TIMESTAMP)
  users: id(INTEGER), username(TEXT), password_hash(TEXT)`,
      },
      {
        id: '25.3',
        output: `⏳ 同步执行：
同步耗时：3.2s
任务A 完成（同步）
任务B 完成（同步）
任务C 完成（同步）

⚡ 异步执行：
异步耗时：1.1s
任务A 完成（异步）
任务B 完成（异步）
任务C 完成（异步）

💡 同步 3s（串行），异步 1s（并行）—— 3倍差距！`,
      },
      {
        id: '25a.1',
        output: `=== 同步执行（串行）===
  [任务 A] 开始（将耗时 1.5 秒）
  [任务 A] 完成
  [任务 B] 开始（将耗时 1.0 秒）
  [任务 B] 完成
同步总耗时：2.6 秒

=== 多线程执行（并发）===
  [任务 A] 开始（将耗时 1.5 秒）
  [任务 B] 开始（将耗时 1.0 秒）
  [任务 B] 完成
  [任务 A] 完成

多线程总耗时：1.6 秒
加速比：1.6x（多线程让等待时间重叠）`,
      },
      {
        id: '25a.3',
        output: `=== 异步并发执行 ===
  [开始] API-1（等待 2.0 秒）
  [开始] API-2（等待 1.0 秒）
  [开始] API-3（等待 1.5 秒）
  [开始] API-4（等待 0.5 秒）
  [完成] API-4
  [完成] API-2
  [完成] API-3
  [完成] API-1

所有任务完成！总耗时：2.1 秒
（如果是同步执行，需要 2.0+1.0+1.5+0.5 = 5.0 秒）
异步加速比：2.4x

结果：
  API-1 的结果
  API-2 的结果
  API-3 的结果
  API-4 的结果`,
      },
      {
        id: '25a.4',
        output: `=== 方案 1：同步（串行）===
  已获取：http://example.com/page0
  已获取：http://example.com/page1
  已获取：http://example.com/page2
  已获取：http://example.com/page3
  已获取：http://example.com/page4
  已获取：http://example.com/page5
  已获取：http://example.com/page6
  已获取：http://example.com/page7
耗时：4.1 秒

=== 方案 2：多线程（8 个并发）===
  已获取：http://example.com/page0
  已获取：http://example.com/page1
  已获取：http://example.com/page2
  已获取：http://example.com/page3
  已获取：http://example.com/page4
  已获取：http://example.com/page5
  已获取：http://example.com/page6
  已获取：http://example.com/page7
耗时：0.6 秒

加速比：7x 🚀
结论：对于 I/O 密集型任务，多线程让等待时间完全重叠！`,
      },
      {
        id: '27a.1',
        output: `n=   10:  O(1)=0.000002s | O(n)=0.000004s | O(n²)=0.000009s
n=  100:  O(1)=0.000001s | O(n)=0.000006s | O(n²)=0.000512s
n= 1000:  O(1)=0.000002s | O(n)=0.000041s | O(n²)=0.052341s`,
      },
      {
        id: '27a.2',
        output: `在 100,000 个元素中查找：
  列表（list）：0.0031 秒  — O(n)
  集合（set）： 0.000002 秒  — O(1)
集合比列表快 1550 倍！

列表操作对比（100 次）：
  头部插入（insert(0)）：0.0005 秒 — O(n)
  尾部追加（append）：0.000012 秒 — O(1)`,
      },
      {
        id: '27a.3',
        output: `有序数组：[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
查找 7 的位置：线性=7，二分=7
查找 99 的位置：线性=-1，二分=-1

在 1,000,000 个数据中查找最后一个元素：
  线性查找：0.0241 秒 — O(n)
  二分查找：0.000003 秒 — O(log n)
二分查找快 8033 倍！`,
      },
      {
        id: '27a.5',
        output: `原始数据：[3, 6, 8, 10, 1, 2, 1, 5]
快排结果：[1, 1, 2, 3, 5, 6, 8, 10]
内置 sort：[1, 1, 2, 3, 5, 6, 8, 10]
结果一致：True

在 1000 个数据上测试：
  快速排序：0.0018 秒 — O(n log n)
  冒泡排序：0.0375 秒 — O(n²)
  内置 sort：True（结果一致）

✅ 排序验证通过！`,
      },
    ];

    for (const testCase of cases) {
      const section = sections.find(item => item.id === testCase.id);
      expect(section, `未找到 Python 章节 ${testCase.id}`).toBeTruthy();
      const result = validateLessonOutput(section!, testCase.output, section!.starterCode);
      expect(result.passed, `Python 章节 ${testCase.id} 仍未接受合理输出`).toBe(true);
    }
  });

  it('Python 概念讲解型 Flask 章节不应真的尝试启动服务', () => {
    const sections = pythonCourseData.chapters.flatMap(chapter => chapter.sections);
    const flaskIntroIds = ['17.1', '17.2'];

    for (const id of flaskIntroIds) {
      const section = sections.find(item => item.id === id);
      expect(section, `未找到 Python 章节 ${id}`).toBeTruthy();
      expect(section?.starterCode).not.toContain('if __name__ == "__main__":');
      expect(section?.starterCode).not.toContain('MiniFlask');
    }
  });

  it('当 TS 章节输出不匹配时，应该告诉用户具体哪一行出了问题', () => {
    const section = courseData.chapters
      .flatMap(chapter => chapter.sections)
      .find(item => item.id === '1.4');

    expect(section).toBeTruthy();

    const result = validateLessonOutput(section!, '你的分数是：90', `let score = 90\nconsole.log("你的分数是：" + score)`);
    expect(result.passed).toBe(false);
    expect((result as any).details).toContain('第 1 行');
    expect((result as any).details).toContain('期望：你的分数是：100');
    expect((result as any).details).toContain('实际：你的分数是：90');
  });
});

describe('三态判定：区分演示节与练习节', () => {
  const section = buildSection({
    starterCode: 'print("hello")',
    expectedOutput: 'hello',
  });

  it('原样运行起始代码只算演示，不谎报"练习通过"', () => {
    const result = validateLessonOutput(section, 'hello', section.starterCode);

    expect(result.status).toBe('demo');
    expect(result.message).toContain('试着自己改改代码');
    // 仍然允许标记为已学，避免演示节永远卡住进度
    expect(result.passed).toBe(true);
  });

  it('学生改动代码且输出正确才算真正通过', () => {
    const result = validateLessonOutput(section, 'hello', 'msg = "hello"\nprint(msg)');

    expect(result.status).toBe('passed');
    expect(result.message).toContain('通过');
  });

  it('输出不对时无论有没有改动都是失败', () => {
    expect(validateLessonOutput(section, 'bye', section.starterCode).status).toBe('failed');
    expect(validateLessonOutput(section, 'bye', 'print("bye")').status).toBe('failed');
  });

  it('显式标为 exercise 的小节，不改代码直接判失败而不是演示', () => {
    const exercise = buildSection({
      kind: 'exercise',
      starterCode: 'print("hello")',
      expectedOutput: 'hello',
    });
    const result = validateLessonOutput(exercise, 'hello', exercise.starterCode);

    expect(result.status).toBe('failed');
    expect(result.details).toContain('还没有修改起始代码');
  });

  it('显式标为 demo 的小节即使改了代码也不冒充练习通过', () => {
    const demo = buildSection({
      kind: 'demo',
      starterCode: 'print("hello")',
      expectedOutput: 'hello',
    });

    expect(validateLessonOutput(demo, 'hello', 'print("hell" + "o")').status).toBe('demo');
  });

  it('调用方没传代码时无从判断改动，按通过处理', () => {
    expect(validateLessonOutput(section, 'hello').status).toBe('passed');
    expect(validateLessonOutput(section, 'hello', '').status).toBe('passed');
  });
});

describe('教材正则写错时的兜底', () => {
  it('无法编译的正则不再抛异常，而是明确报出配置错误', () => {
    const broken = buildSection({
      starterCode: 'print("x")',
      expectedOutput: 'x',
      validation: {
        mode: 'regex_pattern',
        outputRules: [{ type: 'regex', value: '^(未闭合的分组' }],
      },
    });

    expect(() => validateLessonOutput(broken, 'x', 'print("y")')).not.toThrow();
    const result = validateLessonOutput(broken, 'x', 'print("y")');
    expect(result.status).toBe('failed');
    expect(result.message).toContain('校验规则配置有误');
    expect(result.details).toContain('未闭合的分组');
  });

  it('codeRules 里的坏正则同样被拦下', () => {
    const broken = buildSection({
      validation: {
        mode: 'edit_required',
        codeRules: [{ type: 'regex', value: '[a-' }],
      },
    });

    const result = validateLessonOutput(broken, '固定输出', 'console.log("x")');
    expect(result.status).toBe('failed');
    expect(result.details).toContain('[a-');
  });
});
