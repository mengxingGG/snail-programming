// 课程内容改造：把适合动手的讲解节转成可验证的练习节。
//
// 原始教材分散在多个大型 Part 文件中；这里集中维护练习补丁，既能让每道练习
// 有完整的题干、TODO 和判题规则，也不会淹没原有的概念讲解内容。

import type {
  Chapter,
  Section,
  SectionTextRule,
  SectionValidation,
} from './types/course';

export type CourseLanguage = 'typescript' | 'python';

interface ExerciseDefinition {
  task: string;
  starterCode: string;
  expectedOutput: string;
  hint: string;
  codeRules?: SectionTextRule[];
  successMessage?: string;
  failureMessage?: string;
}

function changed(...starterFragments: string[]): SectionTextRule[] {
  return starterFragments.map(value => ({ type: 'not_includes', value }));
}

function exercise(
  task: string,
  starterCode: string,
  expectedOutput: string,
  hint: string,
  codeRules?: SectionTextRule[],
): ExerciseDefinition {
  return { task, starterCode, expectedOutput, hint, codeRules };
}

const typeScriptExercises: Record<string, ExerciseDefinition> = {
  '0.1': exercise(
    '把学习目标改为「完成 TypeScript 入门」，并把计划天数改为 30，让程序输出新的目标和计划。',
    `// TODO: 填写你的学习目标和计划天数
const goal = ""
const days = 0

console.log("我的目标：" + goal)
console.log("计划用时：" + days + " 天")`,
    '我的目标：完成 TypeScript 入门\n计划用时：30 天',
    '字符串要用引号包起来；30 是数字，不需要引号。',
    changed('const goal = ""', 'const days = 0'),
  ),
  '0.2': exercise(
    '把年份改成 2000，观察闰年判断逻辑的结果。',
    `// TODO: 把 year 改成 2000
const year = 0
const divisibleBy4 = year % 4 === 0
const divisibleBy100 = year % 100 === 0
const divisibleBy400 = year % 400 === 0
const isLeap = (divisibleBy4 && !divisibleBy100) || divisibleBy400

console.log(year + " 年是闰年吗？" + isLeap)`,
    '2000 年是闰年吗？true',
    '2000 能被 400 整除，所以它是闰年。',
    changed('const year = 0'),
  ),
  '2.1': exercise(
    '用 let 声明变量 city，把它的值设为「上海」，并输出学习城市。',
    `// TODO: 把 city 的值改成 "上海"
let city = ""

console.log("我学习的城市：" + city)`,
    '我学习的城市：上海',
    'city 是文字，值要放在双引号里。',
    changed('let city = ""'),
  ),
  '2.3': exercise(
    '把 quantity 改成 3，让程序计算 3 件商品的总价。',
    `const price = 12
// TODO: 把购买数量改成 3
const quantity = 0

console.log("总价：" + price * quantity)`,
    '总价：36',
    '总价等于单价乘以数量，quantity 应该是数字。',
    changed('const quantity = 0'),
  ),
  '2.4': exercise(
    '把 isLoggedIn 改为 true，让程序显示用户可以进入。',
    `// TODO: 把登录状态改成 true
const isLoggedIn = false

console.log("可以进入吗？" + isLoggedIn)`,
    '可以进入吗？true',
    '布尔值只有 true 和 false，不能加引号。',
    changed('const isLoggedIn = false'),
  ),
  '2.5': exercise(
    '保留 number 类型注解，把 score 的值设为 95。',
    `// TODO: 保留 : number，把分数改成 95
const score: number = 0

console.log("分数：" + score)`,
    '分数：95',
    '类型注解写在变量名后面，95 是 number。',
    changed('const score: number = 0'),
  ),
  '3.1': exercise(
    '把 temperature 改成 32，让 if 分支输出「需要开空调」。',
    `// TODO: 把温度改成 32
const temperature = 0

if (temperature >= 30) {
  console.log("需要开空调")
} else {
  console.log("天气舒适")
}`,
    '需要开空调',
    '当温度大于或等于 30 时，会进入第一个分支。',
    changed('const temperature = 0'),
  ),
  '3.2': exercise(
    '把 isMember 改为 true，让会员价格显示为 80。',
    `// TODO: 把会员状态改成 true
const isMember = false
const price = 100

if (isMember) {
  console.log("会员价：" + price * 0.8)
} else {
  console.log("普通价：" + price)
}`,
    '会员价：80',
    '只有 true 才会进入 if 的会员分支。',
    changed('const isMember = false'),
  ),
  '3.3': exercise(
    '把 score 改为 85，让多条件判断输出 B。',
    `// TODO: 把分数改成 85
const score = 0

if (score >= 90) {
  console.log("等级：A")
} else if (score >= 80) {
  console.log("等级：B")
} else {
  console.log("等级：C")
}`,
    '等级：B',
    '85 不到 90，但已经大于等于 80。',
    changed('const score = 0'),
  ),
  '3.4': exercise(
    '把 isWeekend 改为 true，使用三元运算符输出「今天可以休息」。',
    `// TODO: 把周末状态改成 true
const isWeekend = false
const plan = isWeekend ? "今天可以休息" : "今天要学习"

console.log(plan)`,
    '今天可以休息',
    '三元运算符中，条件为 true 时会选择问号后的第一个值。',
    changed('const isWeekend = false'),
  ),
  '4.1': exercise(
    '填写名字和学习进度，用 console.log 输出两条调试信息。',
    `// TODO: 填写名字“小明”和进度 60
const name = ""
const progress = 0

console.log("姓名：" + name)
console.log("学习进度：" + progress + "%")`,
    '姓名：小明\n学习进度：60%',
    '分别修改两个变量；百分号已经在输出语句里。',
    changed('const name = ""', 'const progress = 0'),
  ),
  '4.3': exercise(
    '修复折扣值，让 100 元商品的最终价格变成 80。',
    `const total = 100
// TODO: 把折扣改成 0.8，表示打八折
const discount = 0
const finalPrice = total * discount

console.log("最终价格：" + finalPrice)`,
    '最终价格：80',
    '八折等于原价的 0.8 倍。',
    changed('const discount = 0'),
  ),
  '5.1': exercise(
    '修正 for 循环的结束条件，让它依次输出 1、2、3。',
    `// TODO: 把循环条件改成能执行到 3
for (let i = 1; i <= 0; i++) {
  console.log(i)
}`,
    '1\n2\n3',
    '循环从 1 开始，条件应允许 i 取到 3。',
    changed('i <= 0'),
  ),
  '5.3': exercise(
    '在数组中放入「苹果」和「香蕉」，让 for...of 逐个输出水果。',
    `// TODO: 在数组里填入 "苹果" 和 "香蕉"
const fruits: string[] = []

for (const fruit of fruits) {
  console.log("水果：" + fruit)
}`,
    '水果：苹果\n水果：香蕉',
    '数组元素用逗号分隔，并用方括号包起来。',
    changed('const fruits: string[] = []'),
  ),
  '5.4': exercise(
    '把 continue 的条件改成跳过数字 3，其余数字仍要输出。',
    `for (let number = 1; number <= 5; number++) {
  // TODO: 当 number 等于 3 时跳过本轮
  if (number === 0) {
    continue
  }
  console.log(number)
}`,
    '1\n2\n4\n5',
    'continue 会跳过当前这一轮；只需要修改比较的数字。',
    changed('number === 0'),
  ),
  '6.1': exercise(
    '创建包含红色、绿色、蓝色的数组，让程序输出第一个颜色和数量。',
    `// TODO: 填入 "红色"、"绿色"、"蓝色"
const colors: string[] = []

console.log("第一个颜色：" + colors[0])
console.log("颜色数量：" + colors.length)`,
    '第一个颜色：红色\n颜色数量：3',
    '第一个元素在下标 0；数组长度由 length 自动得到。',
    changed('const colors: string[] = []'),
  ),
  '6.2': exercise(
    '把空字符串改成「运动」，使用 push 往待办数组加入新项目。',
    `const tasks = ["学习"]
// TODO: 把空字符串改成 "运动"
tasks.push("")

console.log(tasks.join(","))`,
    '学习,运动',
    'push 的参数是要加入数组末尾的新元素。',
    changed('tasks.push("")'),
  ),
  '6.3': exercise(
    '填写三门原始分数 60、70、80，让 map 为每项加 10 分。',
    `// TODO: 填入 60、70、80
const scores = [0, 0, 0]
const boosted = scores.map(score => score + 10)

console.log(boosted.join(","))`,
    '70,80,90',
    'map 会为数组中的每一项执行一次加 10。',
    changed('const scores = [0, 0, 0]'),
  ),
  '6.4': exercise(
    '把第二个分数改成 65，让 filter 筛出全部及格分数。',
    `// TODO: 把第二个分数 0 改成 65
const scores = [45, 0, 72, 91]
const passed = scores.filter(score => score >= 60)

console.log(passed.join(","))`,
    '65,72,91',
    'filter 会保留大于或等于 60 的元素。',
    changed('const scores = [45, 0, 72, 91]'),
  ),
  '6.5': exercise(
    '声明一个 string[]，填入「小明」和「小红」，并输出数组长度。',
    `// TODO: 在字符串数组里填入 "小明" 和 "小红"
const names: string[] = []

console.log("人数：" + names.length)`,
    '人数：2',
    'string[] 表示数组中只能放字符串。',
    changed('const names: string[] = []'),
  ),
  '6.8': exercise(
    '把占位分数改为 70，让 every 判断所有分数都及格。',
    `// TODO: 把 0 改成 70
const scores = [60, 0, 80]
const allPassed = scores.every(score => score >= 60)

console.log("全部及格：" + allPassed)`,
    '全部及格：true',
    'every 只有在每个元素都满足条件时才会得到 true。',
    changed('const scores = [60, 0, 80]'),
  ),
  '7.1': exercise(
    '补全 welcome 函数的返回值，让它向小明问好。',
    `function welcome(name: string): string {
  // TODO: 返回 "你好，" 加上 name
  return ""
}

console.log(welcome("小明"))`,
    '你好，小明',
    '可以用 + 把两个字符串拼接起来。',
    changed('return ""'),
  ),
  '7.2': exercise(
    '补全 square 函数，让它返回一个数的平方。',
    `function square(number: number): number {
  // TODO: 返回 number 乘以自身
  return 0
}

console.log("平方：" + square(5))`,
    '平方：25',
    '平方可以写成 number * number。',
    changed('return 0'),
  ),
  '7.3': exercise(
    '修复 multiply 的运算符，让 3 和 4 相乘得到 12。',
    `function multiply(a: number, b: number): number {
  // TODO: 这里应该是乘法，不是加法
  return a + b
}

console.log("结果：" + multiply(3, 4))`,
    '结果：12',
    '乘法运算符是 *。',
    changed('return a + b'),
  ),
  '7.4': exercise(
    '补全箭头函数 double，让它返回输入值的两倍。',
    `// TODO: 返回 value 的两倍
const double = (value: number): number => 0

console.log("两倍：" + double(7))`,
    '两倍：14',
    '箭头右边可以直接写 value * 2。',
    changed('=> 0'),
  ),
  '7.5': exercise(
    '保留函数类型标注，补全 formatScore 的返回值。',
    `const formatScore: (score: number) => string = score => {
  // TODO: 返回 "得分：" 加上 score
  return ""
}

console.log(formatScore(88))`,
    '得分：88',
    '函数的返回类型是 string，因此应返回一段文字。',
    changed('return ""'),
  ),
  '7.6': exercise(
    '把默认名字改成「游客」，不传参数时让 greet 使用这个默认值。',
    `// TODO: 把默认值改成 "游客"
function greet(name = "") {
  return "你好，" + name
}

console.log(greet())`,
    '你好，游客',
    '默认参数写在等号右边。',
    changed('function greet(name = "")'),
  ),
  '8.1': exercise(
    '为 user 对象填写名字「小明」和年龄 18。',
    `// TODO: 填写对象的 name 和 age 属性
const user = {
  name: "",
  age: 0,
}

console.log(user.name + "，" + user.age + " 岁")`,
    '小明，18 岁',
    '对象属性用 key: value 的形式填写。',
    changed('name: ""', 'age: 0'),
  ),
  '8.2': exercise(
    '把 profile.city 改成「上海」，再读取并输出这个属性。',
    `const profile = { name: "小明", city: "" }
// TODO: 把城市改成 "上海"
profile.city = ""

console.log("城市：" + profile.city)`,
    '城市：上海',
    '点号可以读取或修改对象的属性。',
    changed('profile.city = ""'),
  ),
  '8.3': exercise(
    '补全嵌套对象里的姓名和城市。',
    `// TODO: 填写客户姓名“小红”和城市“杭州”
const order = {
  customer: {
    name: "",
    address: { city: "" },
  },
}

console.log(order.customer.name + " 来自 " + order.customer.address.city)`,
    '小红 来自 杭州',
    '嵌套对象仍然使用 key: value；城市在 address 里面。',
    changed('name: ""', 'address: { city: "" }'),
  ),
  '8.4': exercise(
    '按照 Book 接口填写书名「TypeScript 入门」和页数 320。',
    `interface Book {
  title: string
  pages: number
}

// TODO: 填写符合 Book 接口的对象
const book: Book = { title: "", pages: 0 }

console.log(book.title + "：" + book.pages + " 页")`,
    'TypeScript 入门：320 页',
    '接口要求 title 是字符串、pages 是数字。',
    changed('const book: Book = { title: "", pages: 0 }'),
  ),
  '8.5': exercise(
    '修改 increase 方法，让它每次调用把 value 增加 1。',
    `const counter = {
  value: 0,
  increase() {
    // TODO: 每次增加 1
    this.value += 0
    return this.value
  },
}

console.log("当前值：" + counter.increase())`,
    '当前值：1',
    '在对象方法里，this.value 指向对象自己的 value 属性。',
    changed('this.value += 0'),
  ),
  '8.6': exercise(
    '填写 user 对象后，用解构赋值取出 name 和 city。',
    `// TODO: 填入名字“小明”和城市“北京”
const user = { name: "", city: "" }
const { name, city } = user

console.log(name + "-" + city)`,
    '小明-北京',
    '解构赋值已经写好，只要补全对象的属性值。',
    changed('const user = { name: "", city: "" }'),
  ),
  '8.7': exercise(
    '给 Person 的 name 属性赋值「小明」，让 this 在方法中读取它。',
    `class Person {
  // TODO: 把名字改成 "小明"
  name = ""

  introduce() {
    return "我是" + this.name
  }
}

console.log(new Person().introduce())`,
    '我是小明',
    'this.name 会读取当前 Person 实例的 name 属性。',
    changed('name = ""'),
  ),
  '8.8': exercise(
    '给空值合并运算符提供默认昵称「匿名用户」。',
    `const user: { profile?: { nickname?: string } } = {}
// TODO: 填写没有昵称时的默认值
const nickname = user.profile?.nickname ?? ""

console.log("昵称：" + nickname)`,
    '昵称：匿名用户',
    '当左边是 undefined 时，?? 会使用右边的默认值。',
    changed('?? ""'),
  ),
  '9.2': exercise(
    '为联合类型变量 id 赋数字 1001。',
    `// TODO: string | number 可以放字符串或数字；这里填 1001
let id: string | number = ""

console.log("用户 ID：" + id)`,
    '用户 ID：1001',
    '1001 是 number，不要用引号包起来。',
    changed('let id: string | number = ""'),
  ),
  '9.5': exercise(
    '为泛型 first 函数传入包含 7 和 9 的数字数组。',
    `function first<T>(items: T[]): T {
  return items[0]
}

// TODO: 把空数组改成包含 7、9 的数组
const result = first<number>([])
console.log("第一个数：" + result)`,
    '第一个数：7',
    '泛型 <number> 表示数组元素应当是数字。',
    changed('first<number>([])'),
  ),
  '9.6': exercise(
    '给类型守卫函数传入「蜗牛」，让它计算字符串长度。',
    `function displayLength(value: string | number): number {
  if (typeof value === "string") {
    return value.length
  }
  return 0
}

// TODO: 把空字符串改成 "蜗牛"
console.log("字符串长度：" + displayLength(""))`,
    '字符串长度：2',
    'typeof value === "string" 后，TypeScript 知道 value 有 length 属性。',
    changed('displayLength("")'),
  ),
  '9.10': exercise(
    '补全成功结果的数据，让可辨识联合输出「成功：完成」。',
    `type Result =
  | { kind: "success"; data: string }
  | { kind: "error"; message: string }

// TODO: 填写成功结果的数据
const result: Result = { kind: "success", data: "" }

if (result.kind === "success") {
  console.log("成功：" + result.data)
} else {
  console.log("失败：" + result.message)
}`,
    '成功：完成',
    '检查 kind 后，TypeScript 会自动缩小到 success 分支。',
    changed('data: ""'),
  ),
  '10a.1': exercise(
    '把传给高阶函数的回调改成“每次乘 2”，观察它连续执行两次。',
    `function applyTwice(value: number, transform: (item: number) => number): number {
  return transform(transform(value))
}

// TODO: 把 n + 0 改成每次乘 2
const result = applyTwice(2, n => n + 0)
console.log("结果：" + result)`,
    '结果：8',
    '2 先变成 4，再变成 8。',
    changed('n => n + 0'),
  ),
  '10a.2': exercise(
    '为闭包工厂传入前缀「你好」，再调用返回的函数。',
    `function createGreeting(prefix: string) {
  return (name: string) => prefix + "，" + name
}

// TODO: 把空字符串改成 "你好"
const greet = createGreeting("")
console.log(greet("小明"))`,
    '你好，小明',
    '返回的函数会记住 createGreeting 接收到的 prefix。',
    changed('createGreeting("")'),
  ),
  '11.3': exercise(
    '让 Promise 成功返回「完成」，再在 then 中输出它。',
    `// TODO: 把空字符串改成 "完成"
const message = Promise.resolve("")

message.then(value => {
  console.log("Promise：" + value)
})`,
    'Promise：完成',
    'Promise.resolve 的参数会成为 then 回调里的 value。',
    changed('Promise.resolve("")'),
  ),
  '11.4': exercise(
    '让异步函数返回 100，并等待它的结果后输出。',
    `async function getScore(): Promise<number> {
  // TODO: 返回 100
  return 0
}

async function main() {
  const score = await getScore()
  console.log("分数：" + score)
}

main()`,
    '分数：100',
    'async 函数中直接 return 100，await 会得到这个数字。',
    changed('return 0'),
  ),
  '11.6': exercise(
    '补全两个 Promise 的数字 10 和 20，用 Promise.all 计算总和。',
    `// TODO: 把两个 0 分别改成 10 和 20
Promise.all([Promise.resolve(0), Promise.resolve(0)]).then(values => {
  console.log("总和：" + (values[0] + values[1]))
})`,
    '总和：30',
    'Promise.all 会按原顺序返回两个 Promise 的结果。',
    changed('Promise.resolve(0), Promise.resolve(0)'),
  ),
  // ── ch9 类型系统进阶 ──
  '9.1': exercise(
    '修正 printLength 函数，让它在 text 为 null 时打印 "文本为空"。',
    `// TODO: 当 text 为 null 时应打印 "文本为空"，当前打印的是错误提示
function printLength(text: string | null): void {
  if (text === null) {
    console.log("长度：0")
  } else {
    console.log(\`文本长度：\${text.length}\`)
  }
}

printLength("Hello TypeScript")
printLength(null)
printLength("蜗牛编程")`,
    '文本长度：16\n文本为空\n文本长度：4',
    '把 "长度：0" 改成 "文本为空" 即可。',
    changed('console.log("长度：0")'),
  ),
  '9.3': exercise(
    '修复 colorLabel 函数，让它根据颜色返回对应的中文标签。',
    `type Point = { x: number; y: number }
type Color = "red" | "green" | "blue"

function distance(a: Point, b: Point): number {
  const dx = b.x - a.x
  const dy = b.y - a.y
  return Math.sqrt(dx * dx + dy * dy)
}

// TODO: 这个函数目前永远返回 "未知"，请修复它
function colorLabel(c: Color): string {
  return "未知"
}

const p1: Point = { x: 0, y: 0 }
const p2: Point = { x: 3, y: 4 }
console.log(\`距离：\${distance(p1, p2)}\`)
console.log(colorLabel("red"))
console.log(colorLabel("blue"))`,
    '距离：5\n红色\n蓝色',
    '用 if/switch 或对象映射（Record）根据 c 的值返回 "红色"/"绿色"/"蓝色"。',
    changed('return "未知"'),
  ),
  '9.4': exercise(
    '补全 Circle 和 Rectangle 的 area() 方法实现。',
    `interface Shape {
  color: string
  area(): number
}

interface Circle extends Shape {
  radius: number
}

interface Rectangle extends Shape {
  width: number
  height: number
}

const circle: Circle = {
  color: "red",
  radius: 5,
  // TODO: 补全 area 方法 —— 圆形面积 = π × 半径²
  area() { return 0 }
}

const rect: Rectangle = {
  color: "blue",
  width: 4,
  height: 6,
  // TODO: 补全 area 方法 —— 矩形面积 = 宽 × 高
  area() { return 0 }
}

console.log(\`圆形面积：\${circle.area().toFixed(2)}\`)
console.log(\`矩形面积：\${rect.area()}\`)`,
    '圆形面积：78.54\n矩形面积：24',
    '圆形面积 = Math.PI * radius * radius；矩形面积 = width * height。',
    changed('area() { return 0 }'),
  ),
  '9.7': exercise(
    '补全 Array.isArray 的类型检查分支，让 safeLength 正确处理数组。',
    `// TODO: 补全数组的类型检查分支，让数组也能正确返回 length
function safeLength(value: unknown): number {
  if (typeof value === "string") {
    return value.length
  }
  // 提示：用 Array.isArray 检查数组
  return 0
}

console.log("字符串长度：" + safeLength("Hello TypeScript"))
console.log("数组长度：" + safeLength([1, 2, 3, 4, 5]))
console.log("数字（无 length）：" + safeLength(42))
console.log("null：" + safeLength(null))`,
    '字符串长度：16\n数组长度：5\n数字（无 length）：0\nnull：0',
    '在 return 0 之前加上 if (Array.isArray(value)) return value.length。',
    changed('return 0'),
  ),
  '9.8': exercise(
    '修复 safeGet 函数，让它能正确返回属性值而不是永远返回默认值。',
    `interface Identifiable {
  id: number
}

// 约束 T 必须有 id 属性
function findById<T extends Identifiable>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id)
}

// TODO: 修复 safeGet —— 当前没有读取 obj[key]，永远返回 defaultValue
function safeGet<T, K extends keyof T>(obj: T, key: K, defaultValue: T[K]): T[K] {
  return defaultValue
}

interface Product {
  id: number
  name: string
  price: number
  inStock: boolean
}

const products: Product[] = [
  { id: 1, name: "键盘", price: 299, inStock: true },
  { id: 2, name: "鼠标", price: 149, inStock: false },
]

const found = findById(products, 2)
if (found) {
  console.log(\`找到：\${found.name}，¥\${found.price}\`)
}

const product = products[0]
console.log(\`名称：\${safeGet(product, "name", "未知")}\`)
console.log(\`库存：\${safeGet(product, "inStock", false)}\`)`,
    '找到：鼠标，¥149\n名称：键盘\n库存：true',
    '应该 return obj[key] !== undefined ? obj[key] : defaultValue。',
    changed('return defaultValue'),
  ),
  '9.9': exercise(
    '修正 statusLabels 中 "active" 的标签，当前写成了错误的中文。',
    `interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  createdAt: string
}

function updateTask(id: number, changes: Partial<Task>) {
  console.log(\`更新任务 \${id}：\`, changes)
}

type TaskSummary = Pick<Task, "id" | "title" | "completed">

type TaskStatus = "all" | "active" | "completed"
// TODO: "active" 的标签当前写错了，请改正
const statusLabels: Record<TaskStatus, string> = {
  all: "全部",
  active: "已激活",
  completed: "已完成",
}

type CreateTaskInput = Omit<Task, "id" | "createdAt">

updateTask(1, { completed: true })
updateTask(2, { title: "新标题", description: "新描述" })

const summary: TaskSummary = { id: 1, title: "学 TypeScript", completed: false }
console.log(\`任务摘要：[\${summary.id}] \${summary.title}\`)
console.log("状态标签：", statusLabels)`,
    '更新任务 1： { completed: true }\n更新任务 2： { title: \'新标题\', description: \'新描述\' }\n任务摘要：[1] 学 TypeScript\n状态标签： { all: \'全部\', active: \'进行中\', completed: \'已完成\' }',
    '把 active 的值从 "已激活" 改成 "进行中"。',
    changed('active: "已激活"'),
  ),
  '9.11': exercise(
    '修复 getValue 函数，让它返回 obj[key] 的实际值而非占位字符串。',
    `interface Product {
  id: number
  name: string
  price: number
  inStock: boolean
}

// TODO: 修复函数体，让它返回 obj[key] 的实际值
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return "TODO" as any
}

const product: Product = {
  id: 1,
  name: "无线键盘",
  price: 299,
  inStock: true,
}

const id = getValue(product, "id")
const name = getValue(product, "name")
const price = getValue(product, "price")

console.log(\`商品 ID：\${id}\`)
console.log(\`商品名：\${name}\`)
console.log(\`价格：¥\${price}\`)
console.log(\`类型：\${typeof price}\`)`,
    '商品 ID：1\n商品名：无线键盘\n价格：¥299\n类型：number',
    '把 return "TODO" as any 改成 return obj[key]。keyof 约束保证了 key 一定是 T 的合法键名。',
    changed('return "TODO" as any'),
  ),
};

const pythonExercises: Record<string, ExerciseDefinition> = {
  '2.1': exercise(
    '给变量 name 赋值「小红」，并输出姓名。',
    `# TODO: 把 name 改成 "小红"
name = ""

print("姓名：" + name)`,
    '姓名：小红',
    'Python 变量不需要预先声明类型，字符串要加引号。',
    changed('name = ""'),
  ),
  '2.2': exercise(
    '填写一段字符串「你好，Python」，再用 print 输出它。',
    `# TODO: 填写问候语
message = ""

print(message)`,
    '你好，Python',
    '单引号和双引号都可以表示 Python 字符串。',
    changed('message = ""'),
  ),
  '2.3': exercise(
    '把 quantity 改成 3，计算单价 12 的总价。',
    `price = 12
# TODO: 把数量改成 3
quantity = 0

print("总价：" + str(price * quantity))`,
    '总价：36',
    '数字和文字拼接前，用 str() 把数字转换成字符串。',
    changed('quantity = 0'),
  ),
  '2.4': exercise(
    '把 is_ready 改为 True，让程序显示准备状态。',
    `# TODO: Python 的真值是 True，注意首字母大写
is_ready = False

print("准备好了吗？" + str(is_ready))`,
    '准备好了吗？True',
    'Python 布尔值写作 True 和 False。',
    changed('is_ready = False'),
  ),
  '3.1': exercise(
    '把 score 改成 80，让 if/else 输出「通过」。',
    `# TODO: 把分数改成 80
score = 0

if score >= 60:
    print("通过")
else:
    print("继续努力")`,
    '通过',
    'Python 用缩进表示代码块，80 大于等于 60。',
    changed('score = 0'),
  ),
  '3.2': exercise(
    '把 fruit 改成「苹果」，再用 in 判断列表中是否有苹果。',
    `# TODO: 把 fruit 改成 "苹果"
fruit = ""

print("有苹果吗？" + str(fruit in ["苹果", "香蕉"]))`,
    '有苹果吗？True',
    'in 用于判断一个值是否存在于列表中。',
    changed('fruit = ""'),
  ),
  '3.3': exercise(
    '把 age 改成 18，让 Python 风格的三元表达式输出「成人」。',
    `# TODO: 把年龄改成 18
age = 0
result = "成人" if age >= 18 else "未成年"

print(result)`,
    '成人',
    'Python 三元表达式的顺序是：真值结果 if 条件 else 假值结果。',
    changed('age = 0'),
  ),
  '4.1': exercise(
    '在 names 列表中填入「小明」和「小红」，用 for 遍历输出。',
    `# TODO: 填入两个名字
names = []

for name in names:
    print("同学：" + name)`,
    '同学：小明\n同学：小红',
    'Python 的 for 会直接依次取出列表里的元素。',
    changed('names = []'),
  ),
  '4.2': exercise(
    '把 range 改成从 1 到 3（包含 3）的序列。',
    `# TODO: 让 range 依次产生 1、2、3
for number in range(0):
    print(number)`,
    '1\n2\n3',
    'range 的结束值不包含在结果中，因此结束值要写 4。',
    changed('range(0)'),
  ),
  '4.3': exercise(
    '修正 while 的结束条件，让它输出 1、2、3。',
    `number = 0
# TODO: 把条件改成 number 小于 3
while number < 0:
    number += 1
    print(number)`,
    '1\n2\n3',
    'number 从 0 开始，每轮加 1，条件应允许循环三次。',
    changed('while number < 0'),
  ),
  '4.3a': exercise(
    '把占位分数改成 70，用累加器计算三项分数之和。',
    `total = 0
# TODO: 把中间的 0 改成 70
for score in [60, 0, 80]:
    total += score

print("总分：" + str(total))`,
    '总分：210',
    '累加器先从 0 开始，每轮用 += 加上当前分数。',
    changed('[60, 0, 80]'),
  ),
  '4.4': exercise(
    '补全列表推导式，让它生成 1、2、3 的平方。',
    `numbers = [1, 2, 3]
# TODO: 把 0 改成 number * number
squares = [0 for number in numbers]

print(squares)`,
    '[1, 4, 9]',
    '列表推导式方括号前半部分决定每个新元素的值。',
    changed('[0 for number in numbers]'),
  ),
  '5.1': exercise(
    '给 name 赋值「Python」，练习字符串拼接。',
    `# TODO: 把 name 改成 "Python"
name = ""

print("你好，" + name)`,
    '你好，Python',
    '加号可以拼接两个字符串。',
    changed('name = ""'),
  ),
  '5.2': exercise(
    '填写小写字符串 snail，再用 upper() 输出大写形式。',
    `# TODO: 填入 "snail"
text = ""

print(text.upper())`,
    'SNAIL',
    'upper() 会把英文字母转换为大写。',
    changed('text = ""'),
  ),
  '5.3': exercise(
    '填写名字「小明」和分数 95，用 f-string 生成一句成绩信息。',
    `# TODO: 填写 name 和 score
name = ""
score = 0

print(f"{name} 得分：{score}")`,
    '小明 得分：95',
    'f-string 中花括号里的变量会被替换成它的值。',
    changed('name = ""', 'score = 0'),
  ),
  '5.4': exercise(
    '把切片结束位置改成 3，从 Python 中取出 Pyt。',
    `word = "Python"
# TODO: 把切片结束位置改成 3
print(word[:0])`,
    'Pyt',
    '切片 word[:3] 会取下标 0、1、2，对应前三个字符。',
    changed('word[:0]'),
  ),
  '5.5': exercise(
    '用原始字符串填写 Windows 路径 C:\\code\\main.py。',
    `# TODO: 在 r"" 中填写 Windows 路径
path = r""

print("路径：" + path)`,
    '路径：C:\\code\\main.py',
    'r 前缀让反斜杠保持原样，不会被当作转义字符。',
    changed('path = r""'),
  ),
  '5.6': exercise(
    '把 join 的分隔符改成连字符，让两个语言名称用 - 连接。',
    `words = "Python,Java"
# TODO: 把空字符串改成 "-"
result = "".join(words.split(","))

print(result)`,
    'Python-Java',
    'join 前面的字符串就是每个元素之间的分隔符。',
    changed('result = "".join(words.split(","))'),
  ),
  '6.1': exercise(
    '创建包含「苹果」「香蕉」「梨」的列表，并输出第一个元素和数量。',
    `# TODO: 用“苹果”“香蕉”“梨”替换占位列表
fruits = ["待填写"]

print("第一个：" + fruits[0])
print("数量：" + str(len(fruits)))`,
    '第一个：苹果\n数量：3',
    '列表从下标 0 开始，len() 可以得到长度。',
    changed('fruits = ["待填写"]'),
  ),
  '6.2': exercise(
    '把 append 的空字符串改成「运动」，加入待办事项列表。',
    `items = ["学习"]
# TODO: 把空字符串改成 "运动"
items.append("")

print(",".join(items))`,
    '学习,运动',
    'append 会把一个元素添加到列表末尾。',
    changed('items.append("")'),
  ),
  '6.3': exercise(
    '修复排序方向，让 sort() 按升序输出 1、2、3。',
    `numbers = [3, 1, 2]
# TODO: 不要按降序排序
numbers.sort(reverse=True)

print(numbers)`,
    '[1, 2, 3]',
    '默认就是升序；可删除 reverse=True 或改成 False。',
    changed('numbers.sort(reverse=True)'),
  ),
  '6.4': exercise(
    '补全列表推导式，让列表中的每个数字翻倍。',
    `numbers = [1, 2, 3]
# TODO: 把 0 改成 number * 2
doubled = [0 for number in numbers]

print(doubled)`,
    '[2, 4, 6]',
    '推导式前半部分会为每个 number 计算一个新值。',
    changed('[0 for number in numbers]'),
  ),
  '6.5': exercise(
    '填写坐标元组 (3, 4)，并按 x、y 的顺序输出。',
    `# TODO: 把空字符串和 0 改成 3、4
point = ("", 0)

print("坐标：" + str(point[0]) + "," + str(point[1]))`,
    '坐标：3,4',
    '元组用圆括号包起来；这里两个元素都是数字。',
    changed('point = ("", 0)'),
  ),
  '6.6': exercise(
    '用 extend 把「绿」加入颜色列表。',
    `colors = ["红", "蓝"]
# TODO: 在列表中填入 "绿"
colors.extend([])

print(",".join(colors))`,
    '红,蓝,绿',
    'extend 接收一个列表，可以一次加入多个元素。',
    changed('colors.extend([])'),
  ),
  '6.7': exercise(
    '修复列表复制方式，保证向 copied 添加元素不会改变 original。',
    `original = [1, 2]
# TODO: 使用 original.copy() 创建独立副本
copied = original
copied.append(3)

print("原列表长度：" + str(len(original)))`,
    '原列表长度：2',
    '直接赋值只会让两个变量指向同一个列表；copy() 才会复制列表。',
    changed('copied = original'),
  ),
  '6.8': exercise(
    '补全两个分数 90、95，用 zip 同时遍历名字和分数。',
    `names = ["小明", "小红"]
# TODO: 填入 90 和 95
scores = [0, 0]

for name, score in zip(names, scores):
    print(name + "：" + str(score))`,
    '小明：90\n小红：95',
    'zip 会按相同下标把两个列表的元素配对。',
    changed('scores = [0, 0]'),
  ),
  '7.1': exercise(
    '给字典填写名字「小明」和分数 90。',
    `# TODO: 填写字典的 name 和 score
student = {"name": "", "score": 0}

print(student["name"] + "：" + str(student["score"]))`,
    '小明：90',
    '字典通过键名读取对应的值。',
    changed('student = {"name": "", "score": 0}'),
  ),
  '7.2': exercise(
    '把 get 的默认城市改为「未知」。',
    `user = {"name": "小明"}
# TODO: 没有 city 时返回 "未知"
city = user.get("city", "")

print("城市：" + city)`,
    '城市：未知',
    'get 的第二个参数是在键不存在时返回的默认值。',
    changed('user.get("city", "")'),
  ),
  '7.3': exercise(
    '补全嵌套字典里的书名和作者姓名。',
    `# TODO: 填入书名“Python 入门”和作者“小红”
book = {"title": "", "author": {"name": ""}}

print(book["title"] + " - " + book["author"]["name"])`,
    'Python 入门 - 小红',
    '外层和内层字典都用方括号加键名读取。',
    changed('book = {"title": "", "author": {"name": ""}}'),
  ),
  '7.4': exercise(
    '把集合运算从并集改成交集，找出两个列表共同的数字。',
    `first = {1, 2, 2}
second = {2, 3}
# TODO: 把 | 改成交集运算符
common = first | second

print(common)`,
    '{2}',
    '集合的交集运算符是 &；它只保留共同元素。',
    changed('common = first | second'),
  ),
  '8.1': exercise(
    '补全 greet 函数，让它向小明问好。',
    `def greet(name):
    # TODO: 返回“你好，”加上 name
    return ""

print(greet("小明"))`,
    '你好，小明',
    '函数用 return 把结果交给调用它的地方。',
    changed('return ""'),
  ),
  '8.2': exercise(
    '把 power 的默认指数改成 2，使 power(2) 得到 4。',
    `# TODO: 把 exponent 的默认值改成 2
def power(base, exponent=0):
    return base ** exponent

print("结果：" + str(power(2)))`,
    '结果：4',
    '** 是 Python 的乘方运算符；2 的 2 次方等于 4。',
    changed('def power(base, exponent=0)'),
  ),
  '8.3': exercise(
    '补全 add 的返回值，让它返回两个参数的和。',
    `def add(a, b):
    # TODO: 返回 a 和 b 的和
    return 0

print("和：" + str(add(3, 4)))`,
    '和：7',
    'return a + b 会把计算结果返回给调用者。',
    changed('return 0'),
  ),
  '8.4': exercise(
    '补全 *args 函数，用 sum 计算所有传入数字的总和。',
    `def total(*numbers):
    # TODO: 返回 numbers 的总和
    return 0

print("总和：" + str(total(1, 2, 3)))`,
    '总和：6',
    'numbers 是一个元组，内置函数 sum(numbers) 可以求和。',
    changed('return 0'),
  ),
  '8.5': exercise(
    '把传入 apply 的 lambda 改成“乘以 2”。',
    `def apply(value, transform):
    return transform(value)

# TODO: 把 x + 0 改成 x * 2
result = apply(3, lambda x: x + 0)
print("结果：" + str(result))`,
    '结果：6',
    'lambda x: x * 2 定义了一个把输入翻倍的小函数。',
    changed('lambda x: x + 0'),
  ),
  '8.6': exercise(
    '把全局折扣改成 0.2，让 100 元商品的价格变成 80。',
    `# TODO: 八折表示扣掉 0.2
discount = 0.0

def final_price(price):
    return price * (1 - discount)

print("最终价格：" + str(final_price(100)))`,
    '最终价格：80.0',
    '函数可以读取外层的全局变量；0.2 表示扣掉 20%。',
    changed('discount = 0.0'),
  ),
  '9b.1': exercise(
    '保留函数的类型提示，补全 greet 的返回值。',
    `def greet(name: str) -> str:
    # TODO: 返回“你好，”加上 name
    return ""

print(greet("小明"))`,
    '你好，小明',
    '-> str 表示函数应该返回字符串。',
    changed('return ""'),
  ),
  '9b.2': exercise(
    '在已有的 str 和 int 类型注解后填写名字「小红」与年龄 18。',
    `# TODO: 保留类型注解，填写值
name: str = ""
age: int = 0

print(name + "，" + str(age) + " 岁")`,
    '小红，18 岁',
    '类型提示写在变量名和等号之间。',
    changed('name: str = ""', 'age: int = 0'),
  ),
  '9b.3': exercise(
    '补全 Union 类型函数，把传入的数字 ID 转成字符串。',
    `from typing import Union

def format_id(value: Union[str, int]) -> str:
    # TODO: 返回 value 的字符串形式
    return ""

print("ID：" + format_id(1001))`,
    'ID：1001',
    'str(value) 可以把数字转换为字符串。',
    changed('return ""'),
  ),
  '9b.4': exercise(
    '保留列表和返回值的类型提示，补全 total 函数的求和实现。',
    `def total(prices: list[float]) -> float:
    # TODO: 返回 prices 的总和
    return 0.0

print("总价：" + str(total([1.5, 2.0, 3.0])))`,
    '总价：6.5',
    'sum(prices) 的结果正好符合 float 返回类型。',
    changed('return 0.0'),
  ),
  // ── ch8-ch12 Python 进阶改造 ──
  '8.7': exercise(
    '修复 get_evens_gen 的条件，让它产出偶数而非奇数。',
    `# 普通函数 vs 生成器
def get_evens_list(limit):
    """返回所有偶数——一次性"""
    return [n for n in range(limit) if n % 2 == 0]

# TODO: 条件是 n % 2 == 1（奇数），应改成 n % 2 == 0（偶数）
def get_evens_gen(limit):
    """逐个产出偶数——懒加载"""
    for n in range(limit):
        if n % 2 == 1:
            yield n

print("列表版本：", get_evens_list(12))
print("生成器遍历：", end=" ")
for even in get_evens_gen(12):
    print(even, end=" ")`,
    '列表版本： [0, 2, 4, 6, 8, 10]\n生成器遍历： 0 2 4 6 8 10',
    '把 n % 2 == 1 改成 n % 2 == 0。yield 让函数变成生成器，每次暂停在 yield 处。',
    changed('n % 2 == 1'),
  ),
  '10.4': exercise(
    '修复 square lambda 的错误定义，让它返回 n 的平方而非两倍。',
    `# TODO: 修复 square —— 当前返回 n+n（两倍），应返回 n*n（平方）
square = lambda n: n + n
is_odd = lambda n: n % 2 == 1

print("5的平方：", square(5))
print("7是奇数？", is_odd(7))

pairs = [(1, 3), (4, 1), (2, 5), (3, 2)]
pairs.sort(key=lambda p: p[1])
print("\\n按第二个数排序：", pairs)

nums = [1, 2, 3, 4, 5, 6, 7, 8]
evens = list(filter(lambda n: n % 2 == 0, nums))
print("偶数：", evens)

squares = list(map(lambda x: x**2, [1, 2, 3, 4, 5]))
print("平方：", squares)`,
    '5的平方： 25\n7是奇数？ True\n\n按第二个数排序： [(4, 1), (3, 2), (1, 3), (2, 5)]\n偶数： [2, 4, 6, 8]\n平方： [1, 4, 9, 16, 25]',
    'lambda 的参数是 n，表达式 n * n 才是平方。n + n 是两倍。',
    changed('lambda n: n + n'),
  ),
  '11.1': exercise(
    '修复 Cat 类的 __init__，让名字和年龄使用传入的参数值。',
    `class Cat:
    """猫的蓝图"""
    # TODO: 当前名字和年龄写死了，应该用传入的 name 和 age
    def __init__(self, name, age):
        self.name = "未知"
        self.age = 0

cat1 = Cat("小黑", 3)
cat2 = Cat("小白", 1)

print(f"cat1：{cat1.name}，{cat1.age} 岁")
print(f"cat2：{cat2.name}，{cat2.age} 岁")`,
    'cat1：小黑，3 岁\ncat2：小白，1 岁',
    '把 self.name = "未知" 改成 self.name = name，self.age = 0 改成 self.age = age。',
    changed('self.name = "未知"', 'self.age = 0'),
  ),
  '11.2': exercise(
    '补全 Book.__init__ 中缺失的 self.title，当前书名永远是空字符串。',
    `class Book:
    """一本书的蓝图"""
    def __init__(self, title: str, author: str, pages: int):
        # TODO: 把空字符串改成 title
        self.title = ""
        self.author = author
        self.pages = pages
        self.is_long = pages > 300
    def __str__(self) -> str:
        status = "厚书" if self.is_long else "薄书"
        return f"《{self.title}》— {self.author}（{self.pages}页）{status}"

book1 = Book("Python 编程：从入门到实践", "Eric Matthes", 500)
book2 = Book("Python 极简讲义", "张三", 150)
print(book1)
print(book2)`,
    '《Python 编程：从入门到实践》— Eric Matthes（500页）厚书\n《Python 极简讲义》— 张三（150页）薄书',
    '把 self.title = "" 改成 self.title = title。',
    changed('self.title = ""'),
  ),
  '11.3': exercise(
    '修复 increment 方法，让它每次调用增加 1 而不是减少。',
    `class Counter:
    """一个简单的计数器"""

    def __init__(self, name: str):
        self.name = name
        self.count = 0

    # TODO: 这里写成了 -= 1（减少），应该是 += 1（增加）
    def increment(self) -> int:
        self.count -= 1
        return self.count

    def reset(self) -> None:
        self.count = 0

    def status(self) -> str:
        return f"[{self.name}] 当前计数：{self.count}"

c1 = Counter("点赞")
c1.increment()
c1.increment()
c1.increment()
print(c1.status())`,
    '[点赞] 当前计数：3',
    '把 -= 1 改成 += 1。',
    changed('self.count -= 1'),
  ),
  '11.4': exercise(
    '修复 Manager.bonus 方法，让经理的年终奖按正确倍数计算。',
    `class Employee:
    """员工基类"""
    def __init__(self, name: str, salary: float):
        self.name = name
        self.salary = salary

    def describe(self) -> str:
        return f"{self.name} — 月薪 ¥{self.salary:,.0f}"

    def bonus(self) -> float:
        return self.salary

class Manager(Employee):
    """经理——继承 Employee"""
    def __init__(self, name: str, salary: float, team_size: int):
        super().__init__(name, salary)
        self.team_size = team_size

    # TODO: 经理年终奖应该是 3 倍月薪，当前只返回了 1 倍
    def bonus(self) -> float:
        return self.salary

e1 = Employee("张三", 8000)
m1 = Manager("李四", 15000, 8)

print(e1.describe())
print(f"  年终奖：¥{e1.bonus():,}")
print(m1.describe())
print(f"  年终奖：¥{m1.bonus():,}")`,
    '张三 — 月薪 ¥8,000\n  年终奖：¥8,000\n李四 — 月薪 ¥15,000，团队 8 人\n  年终奖：¥45,000',
    'Manager.bonus 应该返回 self.salary * 3（经理 3 倍年终奖）。',
    changed('def bonus(self) -> float:\n        return self.salary'),
  ),
  '11.5': exercise(
    '修复 celsius setter，让它正确更新 self._celsius 的值。',
    `class Temperature:
    """温度类——演示 @property 和 setter"""
    def __init__(self, celsius=0):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        # TODO: 这里忘了更新 self._celsius!
        if value < -273.15:
            raise ValueError("温度不能低于绝对零度！")
        pass

    @property
    def fahrenheit(self):
        return self._celsius * 9 / 5 + 32

t = Temperature(25)
print(f"摄氏度：{t.celsius}°C")
print(f"华氏度：{t.fahrenheit}°F")

t.celsius = 30
print(f"\\n修改后：{t.celsius}°C = {t.fahrenheit}°F")`,
    '摄氏度：25°C\n华氏度：77.0°F\n\n修改后：30°C = 86.0°F',
    '在 setter 中把 pass 改成 self._celsius = value。',
    changed('pass'),
  ),
  '11.9': exercise(
    '补全 Order.total 属性，让它正确计算订单总价。',
    `from dataclasses import dataclass, field
from typing import List

@dataclass
class Product:
    name: str
    price: float
    stock: int = 0

@dataclass
class Order:
    order_id: int
    items: List[Product] = field(default_factory=list)

    @property
    def total(self) -> float:
        # TODO: 返回所有商品价格的总和
        return 0.0

p1 = Product("键盘", 299, 50)
p2 = Product("鼠标", 149, 30)

order = Order(1, [p1, p2])
for item in order.items:
    print(f"  {item.name}：¥{item.price}")
print(f"总价：¥{order.total}")`,
    '  键盘：¥299\n  鼠标：¥149\n总价：¥448',
    '用 sum(item.price for item in self.items) 计算总和。',
    changed('return 0.0'),
  ),
  '11.10': exercise(
    '修复 calculate_stats 的 average 计算，当前永远返回 0。',
    `from typing import List

def calculate_stats(scores: List[int]) -> dict[str, float]:
    """计算分数统计——修复 average 的计算"""
    return {
        # TODO: 用 sum(scores) / len(scores) 计算真实平均分
        "average": 0.0,
        "max": max(scores),
        "min": min(scores),
    }

def format_score(name: str, score: int) -> str:
    return f"{name}: {score}分"

def greet(name: str, title: str | None = None) -> str:
    if title:
        return f"{title} {name}，你好！"
    return f"{name}，你好！"

stats = calculate_stats([88, 95, 76, 92])
print("统计结果：")
print(f"  average: {stats['average']}")
print(f"  max: {stats['max']}")
print(f"  min: {stats['min']}")

print()
print(format_score("小明", stats['max']))
print(greet("小红"))
print(greet("张老师", "教授"))`,
    '统计结果：\n  average: 87.8\n  max: 95.0\n  min: 76.0\n\n小明: 95分\n小红，你好！\n教授 张老师，你好！',
    '把 0.0 改成 sum(scores) / len(scores)。',
    changed('"average": 0.0'),
  ),
  '12.1': exercise(
    '修正 ZeroDivisionError 的错误提示文案。',
    `def safe_divide(a, b):
    try:
        result = a / b
        return f"{a} / {b} = {result:.2f}"
    except ZeroDivisionError:
        # TODO: 修正错误提示为"错误：除数不能为零！"
        return f"{a} / {b} = 除数不能是 0！"
    except TypeError:
        return f"错误：两个参数都必须是数字！"

def safe_get(items, index):
    try:
        return f"items[{index}] = {items[index]}"
    except IndexError:
        return f"items[{index}] = 错误：索引超出范围"
    except TypeError:
        return f"错误：索引必须是整数！"

print(safe_divide(10, 2))
print(safe_divide(10, 0))
print(safe_divide(10, 3))
print(safe_get(["苹果", "香蕉", "橘子"], 1))
print(safe_get(["苹果", "香蕉", "橘子"], 5))
print(safe_get(["苹果", "香蕉", "橘子"], -1))`,
    '10 / 2 = 5.00\n10 / 0 = 错误：除数不能为零！\n10 / 3 = 3.33\nitems[1] = 香蕉\nitems[5] = 错误：索引超出范围\nitems[-1] = 橘子',
    '把 "除数不能是 0！" 改成 "错误：除数不能为零！"。',
    changed('"除数不能是 0！"'),
  ),
  '12.2': exercise(
    '补全 register 函数中缺失的 UnderageError 异常抛出。',
    `class InvalidAgeError(ValueError):
    """年龄不合法异常"""
    pass

class UnderageError(Exception):
    """未成年人异常"""
    def __init__(self, age: int):
        self.age = age
        super().__init__(f"未满 18 岁（当前 {age} 岁）")

def register(name: str, age: int) -> str:
    """注册用户——补全未成年检查"""
    if age < 0 or age > 150:
        raise InvalidAgeError(f"年龄 {age} 不合法，须在 0~150 之间")
    # TODO: 如果 age < 18，抛出 UnderageError(age)
    return f"✅ {name}（{age}岁）注册成功！"

test_cases = [("张三", 25), ("王五", 16), ("赵六", 30)]
for name, age in test_cases:
    try:
        print(register(name, age))
    except InvalidAgeError as e:
        print(f"❌ {name} — 年龄不合法：{e}")
    except UnderageError as e:
        print(f"❌ {name} — 未成年：{e}")`,
    '✅ 张三（25岁）注册成功！\n❌ 王五 — 未成年：未满 18 岁（当前 16 岁）\n✅ 赵六（30岁）注册成功！',
    '在 return 之前加上 if age < 18: raise UnderageError(age)。',
    changed('def register'),
  ),
};

// 原教材中已经具备“补全代码 / 修复 bug”形态的练习。这里补齐题干、TODO 和判题
// 元数据，不替换它们原有的起始代码与预期输出。
const existingExerciseIds: Record<CourseLanguage, ReadonlySet<string>> = {
  typescript: new Set([
    '1.3', '1.4', '2.2', '4.2', '5.2', '6.6', '6.7', '10.3',
    'p2.3', '12.3', '13.4', 'p6.4',
  ]),
  python: new Set([
    '1.3', '5.7', '9a.4', '10.3', '12b.2', '12c.3', '12d.3', 'p2.3',
  ]),
};

function appendPractice(content: string, task: string): string {
  const trimmed = content.trimEnd();
  if (trimmed.includes('### 动手练习')) return trimmed;
  return `${trimmed}\n\n---\n\n### 动手练习\n\n${task}`;
}

function applyExercise(section: Section, definition: ExerciseDefinition): Section {
  const validation: SectionValidation = {
    mode: 'edit_required',
    requireCodeChangeFromStarter: true,
    ...(definition.codeRules?.length ? { codeRules: definition.codeRules } : {}),
    successMessage: definition.successMessage ?? '很好，你已经完成了本节的动手练习。',
    failureMessage: definition.failureMessage ?? '请根据题干和 TODO 修改代码后再运行。',
  };

  return {
    ...section,
    kind: 'exercise',
    content: appendPractice(section.content, definition.task),
    starterCode: definition.starterCode,
    expectedOutput: definition.expectedOutput,
    hint: definition.hint,
    validation,
  };
}

function promoteExistingExercise(section: Section, language: CourseLanguage): Section {
  const todoPrefix = language === 'typescript'
    ? '// TODO: 根据题干修复或补全代码，使输出符合要求\n'
    : '# TODO: 根据题干修复或补全代码，使输出符合要求\n';
  const starterCode = /(?:\/\/|#) TODO:/.test(section.starterCode)
    ? section.starterCode
    : `${todoPrefix}${section.starterCode}`;
  const validation: SectionValidation = {
    ...section.validation,
    mode: 'edit_required',
    requireCodeChangeFromStarter: true,
    successMessage: section.validation?.successMessage
      ?? '很好，你已经完成了本节的动手练习。',
    failureMessage: section.validation?.failureMessage
      ?? '请根据题干和 TODO 修改代码后再运行。',
  };

  return {
    ...section,
    kind: 'exercise',
    content: appendPractice(
      section.content,
      `根据本节讲解修复或补全起始代码，完成「${section.title}」练习，使程序输出与期望一致。`,
    ),
    starterCode,
    hint: section.hint || '先比较起始代码和期望输出，再定位需要补全或修复的位置。',
    validation,
  };
}

/** 在课程入口集中应用课程编写补丁，并确保每节课都有明确形态。 */
export function applyCourseAuthoring(chapters: Chapter[], language: CourseLanguage): Chapter[] {
  const definitions = language === 'typescript' ? typeScriptExercises : pythonExercises;
  const existingExercises = existingExerciseIds[language];

  return chapters.map(chapter => ({
    ...chapter,
    sections: chapter.sections.map(section => {
      const definition = definitions[section.id];
      if (definition) return applyExercise(section, definition);
      if (existingExercises.has(section.id)) return promoteExistingExercise(section, language);
      return section;
    }),
  }));
}
