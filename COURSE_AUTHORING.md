# 课程内容改造指南 — 把「演示节」改造成「练习节」

这份文档是给**执行批量内容改造的人或模型**看的施工规范。照着做即可，不需要理解整个应用。

---

## 1. 要解决什么问题

这个应用的定位是「边学边写」，但抽样实测发现：

| 课程 | 抽样 | 起始代码原样运行就判定通过 |
|------|------|---------------------------|
| TypeScript | 24 节 | 21 节（88%） |
| Python | 24 节 | 16 节（67%） |

原因是绝大多数小节的 `starterCode` 写的是**完整可运行的示例代码**，运行输出正好等于 `expectedOutput`。学生一个字都不用改，点一下「运行代码」就被标记为完成。

判题逻辑已经修好，现在会如实区分三种状态（见第 2 节），演示节不再冒充「练习通过」。**剩下的工作是内容层面的：把适合动手的小节，从「演示」改造成「练习」。**

---

## 2. 判题机制（必须先理解这一节）

判题代码在 [`src/renderer/utils/lessonValidation.ts`](src/renderer/utils/lessonValidation.ts)，返回三种状态：

| 状态 | 触发条件 | 学生看到 |
|------|----------|----------|
| `passed` | 输出满足要求 **且** 学生代码相对 `starterCode` 有实质改动 | 绿色「练习通过」 |
| `demo` | 输出满足要求 **但** 代码一字未改 | 中性色「示例已按预期运行，试着自己改改代码再运行一次」 |
| `failed` | 输出不满足要求，或未满足 `codeRules`，或该改却没改 | 红色 + 逐行差异定位 |

判定顺序（简化）：

```
1. validation 里的正则编译不了      → failed（暴露教材配置错误）
2. 要求必须改动、但代码没动          → failed
3. codeRules 没全部满足             → failed
4. 输出不满足要求                   → failed
5. kind === 'demo' 或 代码没动      → demo
6. 其余                             → passed
```

**关键点**：只要 `starterCode` 原样运行就能满足输出要求，这一节永远只能拿到 `demo`。要让它成为真练习，必须让 `starterCode` **跑不出** `expectedOutput`。

---

## 3. 先拿到工作清单

```bash
npx tsx scripts/list-demo-sections.ts --json demo-sections.json
```

会真实执行每一节的起始代码（几分钟），输出分类：

- `demo` — **改造候选**，就是要处理的对象
- `failed` — 起始代码跑不出预期输出，已经是练习形态，**不用动**
- `error` — 起始代码直接报错，多数是缺第三方库（flask / pandas / pygame 等）的讲解节，**不用动**
- `passed` — 异常，需要人工看

---

## 4. 哪些节该改，哪些保持演示

**保持 `demo`，不要改造**（强行加练习反而破坏教学节奏）：

- 纯概念讲解，没有可操作的代码练习
  例：`-1.1 计算机是什么？—— 硬件与软件`、`17a.1 Flask 是什么`
- 「运行并观察输出」本身就是教学目的
  例：展示某个语法的行为差异、演示报错长什么样
- 依赖外部环境或第三方库、本地跑不起来的
- 章节的开篇导览、总结回顾

给这类小节显式加上 `kind: 'demo'`，表示「这是有意为之的演示节」，而不是漏改的：

```ts
{
  id: '-1.1',
  kind: 'demo',
  // ...其余不变
}
```

**应当改造成 `exercise`**：

- 讲了某个语法/API，学生照着写一遍就能掌握的
- 可以设计成「补全空缺」「修复 bug」「按要求改造输出」的
- 有明确、可判定输出的

---

## 5. 改造规范

一次改造要同时动四个地方，缺一不可。

### 5.1 `starterCode` — 挖空

把完整答案改成**留有明确空缺**的骨架。三种常用形态：

**A. 填空型**（最常用）

```ts
// 改造前（完整可运行，学生不用动）
starterCode: `const name = "小明"
console.log("你好，" + name)`,

// 改造后
starterCode: `// TODO: 声明一个常量 name，值为你自己的名字
const name = ""

console.log("你好，" + name)`,
```

**B. 修 bug 型**（教学效果好，参考 TS `4.2`）

```ts
starterCode: `// 这三行代码各演示一种常见错误，修复后应能正确输出

const userName = "小明"
console.log("用户名：" + userNmae)   // 变量名拼错了`,
```

**C. 补实现型**（参考 Python `9a.4`）

```ts
starterCode: `def median(numbers):
    """返回列表中位数——这个函数有个 bug！"""
    sorted_nums = sorted(numbers)
    mid = len(sorted_nums) // 2
    result = sorted_nums[mid - 1]   # ← 这里不对
    return result`,
```

**硬性要求**：

1. 挖空后的 `starterCode` **必须跑不出** `expectedOutput`（否则改了等于没改）
2. `starterCode` 本身**不能语法报错**——学生要能先跑一次看到当前行为。
   若必须留下语法错误（如「修语法错」类练习），题干要写清楚。
3. 空缺处必须有 `// TODO:` 或 `# TODO:` 注释说明要做什么，不能让学生猜

### 5.2 `content` — 题干要说清楚要做什么

概念卡片正文末尾补一段明确的任务说明：

```markdown
---

### 动手练习

把 `name` 改成你自己的名字，让程序输出「你好，<你的名字>」。
```

没有题干的挖空 = 学生对着一个 TODO 发呆。

### 5.3 `hint` — 给方向，不给答案

```ts
hint: '字符串要用引号包起来，比如 "小红"。',
```

### 5.4 `validation` — 判定规则

类型定义在 [`src/shared/types/course.ts`](src/shared/types/course.ts)。

```ts
validation: {
  mode: 'edit_required',                 // 见下表
  requireCodeChangeFromStarter: true,    // 练习节几乎总是 true
  codeRules: [...],                      // 对学生代码的要求（可选）
  outputRules: [...],                    // 对输出的要求（可选，缺省则与 expectedOutput 全等比对）
  successMessage: '...',                 // 可选
  failureMessage: '...',                 // 可选
  expectedHint: '...',                   // 可选，展示给学生的「期望输出」文案
}
```

**`mode` 取值**（只影响默认提示文案，不影响判定逻辑）：

| mode | 用于 |
|------|------|
| `exact_output` | 输出固定、逐字比对 |
| `edit_required` | 必须改代码才算过（改造后最常用） |
| `dynamic_lines` | 输出含环境相关内容（版本号、路径、时间） |
| `regex_pattern` | 输出结构固定但具体值会变 |

**`codeRules` 规则类型**（作用于学生代码文本）：

| type | 含义 |
|------|------|
| `includes` | 代码必须包含某段文本 |
| `not_includes` | 代码不得包含某段文本（常用于「必须改掉原来的错误写法」） |
| `regex` | 匹配正则（多行模式 `m`） |
| `not_regex` | 不得匹配正则 |

**`outputRules` 规则类型**（逐条按顺序在输出行中向后匹配）：

| type | 含义 |
|------|------|
| `exact` | 某一行与该值完全相等 |
| `prefix` | 某一行以该值开头 |
| `contains` | 某一行包含该值 |
| `regex` | 某一行匹配该正则 |

每条规则可加 `optional: true` 表示允许缺失（用于环境相关的可选输出行）。

**输出比对已做的归一化**：每行首尾空白会被去掉，`\r\n` 与 `\n` 等价。不需要为空格问题写正则。

### 5.5 优先用「不写死答案」的规则

要允许学生填入自己的内容时，别用 `exact`：

```ts
// ✗ 只有填「小明」才算对
outputRules: [{ type: 'exact', value: '你好，小明' }],

// ✓ 填任何非空名字都算对，但不能原样留着占位符
codeRules: [{ type: 'not_includes', value: 'const name = ""' }],
outputRules: [{ type: 'regex', value: '^你好，.+$' }],
```

---

## 6. 完整范例

改造前（`demo`，学生点运行就过）：

```ts
{
  id: '2.1',
  chapterId: 'ch2',
  title: '变量 — 给数据起个名字',
  content: '## 变量\n\n用 let 声明可变的变量...',
  starterCode: `let score = 90
console.log("你的分数是：" + score)`,
  expectedOutput: '你的分数是：90',
  hint: '用 let 声明变量',
}
```

改造后（`exercise`，必须动手）：

```ts
{
  id: '2.1',
  chapterId: 'ch2',
  kind: 'exercise',
  title: '变量 — 给数据起个名字',
  content: '## 变量\n\n用 let 声明可变的变量...\n\n---\n\n### 动手练习\n\n'
    + '声明一个变量 `score`，把它的值设为 `90`，然后让程序输出「你的分数是：90」。',
  starterCode: `// TODO: 用 let 声明变量 score，值为 90
let score = 0

console.log("你的分数是：" + score)`,
  expectedOutput: '你的分数是：90',
  hint: 'let 变量名 = 值，注意等号右边不要加引号，90 是数字不是字符串。',
  validation: {
    mode: 'edit_required',
    requireCodeChangeFromStarter: true,
    codeRules: [
      { type: 'not_includes', value: 'let score = 0' },
    ],
    outputRules: [
      { type: 'exact', value: '你的分数是：90' },
    ],
    successMessage: '很好，变量已经正确赋值了。',
    failureMessage: '请把 score 的值改成 90，再重新运行。',
  },
}
```

---

## 7. 验收标准

每改完一批，**必须**跑完下面全部命令且全绿：

```bash
npm run verify
```

等价于 `typecheck` + `lint` + 单元测试。其中 [`src/shared/course-content.test.ts`](src/shared/course-content.test.ts) 会检查：

- section / question / chapter 的 id 不重复
- 每个 section 都有非空 `starterCode` 与 `expectedOutput`
- `validation` 里的正则都能编译
- 每章都有题库
- `totalSections` 与实际一致

然后重新扫一遍，确认目标小节已经从 `demo` 变成 `failed`（起始代码跑不出预期输出 = 真练习）：

```bash
npx tsx scripts/list-demo-sections.ts
```

**逐节自检清单**：

- [ ] `starterCode` 原样运行**跑不出** `expectedOutput`
- [ ] `starterCode` 本身不报语法错（除非题目就是修语法错）
- [ ] 有 `// TODO:` / `# TODO:` 标明空缺
- [ ] `content` 末尾有明确的「动手练习」题干
- [ ] `hint` 给方向不给答案
- [ ] 填对之后确实能通过（自己按题干写一遍验证）
- [ ] `npm run verify` 全绿

---

## 8. 常见错误

| 错误 | 后果 |
|------|------|
| 挖空了但 `expectedOutput` 忘了同步 | 学生永远做不对 |
| `codeRules` 写死了标准答案文本 | 换个等价写法就判错，学生困惑 |
| `outputRules` 用 `exact` 匹配含随机值/时间的输出 | 永远判不过 |
| 正则里的反斜杠没转义（TS 字符串里要写 `\\d`） | 规则编译失败，整节判题报「配置有误」 |
| 只改了 `starterCode`，没写 `validation` | 会走全等比对兜底，通常仍能判对，但提示信息很弱 |
| 给概念讲解节强行加练习 | 破坏教学节奏，不如标 `kind: 'demo'` |

---

## 9. 另一项内容缺口：编程题题库

考试支持三种题型，但**编程题几乎没有内容**：TypeScript 只有 1 道，Python 一道也没有。

判分链路已经修好——编程题会真正把学生代码跑起来再比对输出（见 [`src/services/exam/service.ts`](src/services/exam/service.ts) 的 `isCodeAnswerCorrect`），缺的只是题目。

题目结构：

```ts
{
  id: 'ch2-q4',
  chapterId: 'ch2',
  type: 'code',
  text: '声明一个变量 score 并赋值 90，输出「你的分数是：90」',
  starterCode: '// 在这里写代码\n',
  expectedOutput: '你的分数是：90',
  answer: '',            // 编程题用 expectedOutput 判定，answer 留空即可
}
```

要点：

- `expectedOutput` 必须是**确定性**输出，不能含时间、随机数、路径
- 判定是「运行学生代码 → 输出与 `expectedOutput` 去首尾空白后全等」，所以输出要简短明确
- 代码会以对应课程的语言执行（`typescript` 课程用 node，`python` 课程用 python），不能引用第三方库
- 加题后该章会变成 4 道题，及格线自动变为「答对 3 道」（规则见 `requiredCorrect`），无需额外改动

另有两条填空题的大小写约定：填空题**默认大小写敏感**（`toFixed` / `StopIteration` 这类标识符大小写有语义）；确实不区分大小写的题目（SQL 关键字等）显式加 `caseInsensitive: true`。

---

## 10. 文件位置速查

| 内容 | 路径 |
|------|------|
| TypeScript 课程 | `src/shared/course-data/part1-basics.ts` ~ `part6-fullstack.ts` |
| Python 课程 | `src/shared/course-data-python/part1-basics.ts` ~ `part5-advanced.ts` |
| 两套题库 | 各自目录下的 `exams.ts` |
| 类型定义 | `src/shared/types/course.ts` |
| 判题逻辑 | `src/renderer/utils/lessonValidation.ts` |
| 教材体检测试 | `src/shared/course-content.test.ts` |
| 工作清单脚本 | `scripts/list-demo-sections.ts` |
