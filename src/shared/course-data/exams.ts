// 📝 考试题库 — 基础题 + 代表性编程题
// 章节覆盖完整性由 src/shared/course-content.test.ts 保证：新增章节若没有题库，测试会失败。
import type { Question } from '../types/course';

export const allQuestions: Record<string, Question[]> = {
  ch1: [
    {
      id: 'ch1-q1', chapterId: 'ch1', type: 'choice',
      text: 'TypeScript 文件的扩展名是？',
      options: ['.js', '.ts', '.py', '.java'],
      answer: '.ts',
    },
    {
      id: 'ch1-q2', chapterId: 'ch1', type: 'choice',
      text: 'console.log() 的作用是什么？',
      options: ['创建文件', '在控制台输出内容', '删除数据', '启动服务器'],
      answer: '在控制台输出内容',
    },
    {
      id: 'ch1-q3', chapterId: 'ch1', type: 'fill',
      text: "让控制台打印 'Hello'，应该写：console.____('Hello')",
      answer: 'log',
    },
  ],

  ch2: [
    {
      id: 'ch2-q1', chapterId: 'ch2', type: 'choice',
      text: '哪个关键字声明的变量不能被重新赋值？',
      options: ['let', 'var', 'const', 'mut'],
      answer: 'const',
    },
    {
      id: 'ch2-q2', chapterId: 'ch2', type: 'choice',
      text: '模板字符串用什么符号包裹？',
      options: ['单引号 \'', '双引号 "', '反引号 `', '花括号 {}'],
      answer: '反引号 `',
    },
    {
      id: 'ch2-q3', chapterId: 'ch2', type: 'fill',
      text: '声明一个数字类型的变量 age，应该写：let age: ____ = 18',
      answer: 'number',
    },
    {
      id: 'ch2-q4', chapterId: 'ch2', type: 'code',
      text: '声明变量 score 并赋值 90，输出「分数：90」。',
      starterCode: '// 在这里写代码\n',
      expectedOutput: '分数：90',
      answer: '',
    },
  ],

  ch3: [
    {
      id: 'ch3-q1', chapterId: 'ch3', type: 'choice',
      text: '三元运算符的格式是？',
      options: [
        '条件 : 真值 ? 假值',
        '条件 ? 真值 : 假值',
        '真值 ? 条件 : 假值',
        '条件 ? 假值 : 真值',
      ],
      answer: '条件 ? 真值 : 假值',
    },
    {
      id: 'ch3-q2', chapterId: 'ch3', type: 'choice',
      text: 'if...else if...else 中，当第二个条件成立时，后面的 else 还会执行吗？',
      options: ['会，总是执行', '不会，找到第一个成立的就跳过后面', '只有 else 会执行', '所有分支都执行'],
      answer: '不会，找到第一个成立的就跳过后面',
    },
    {
      id: 'ch3-q3', chapterId: 'ch3', type: 'fill',
      text: '判断 x 是否严格等于 5，应该用：x ____ 5',
      answer: '=== 5',
    },
    {
      id: 'ch3-q4', chapterId: 'ch3', type: 'code',
      text: '声明 score 为 80；分数大于等于 60 时输出「通过」，否则输出「继续努力」。',
      starterCode: '// 在这里写代码\n',
      expectedOutput: '通过',
      answer: '',
    },
  ],

  ch4: [
    {
      id: 'ch4-q1', chapterId: 'ch4', type: 'choice',
      text: '"ReferenceError: x is not defined" 表示什么？',
      options: ['x 的值是 undefined', '使用了未声明的变量 x', 'x 的类型不对', '语法错误'],
      answer: '使用了未声明的变量 x',
    },
    {
      id: 'ch4-q2', chapterId: 'ch4', type: 'choice',
      text: '调试时，在代码中插入 console.log 打印中间值，这种方法叫？',
      options: ['断点调试', '单步调试', '打印调试', '远程调试'],
      answer: '打印调试',
    },
    {
      id: 'ch4-q3', chapterId: 'ch4', type: 'fill',
      text: '数字保留 2 位小数的方法是：num.________(2)',
      answer: 'toFixed',
    },
  ],

  ch5: [
    {
      id: 'ch5-q1', chapterId: 'ch5', type: 'choice',
      text: 'for 循环 "for (let i = 0; i < 5; i++)" 会执行几次？',
      options: ['4 次', '5 次', '6 次', '无限次'],
      answer: '5 次',
    },
    {
      id: 'ch5-q2', chapterId: 'ch5', type: 'choice',
      text: '想在循环中跳过当前这一轮，继续下一轮，应该用？',
      options: ['break', 'return', 'continue', 'skip'],
      answer: 'continue',
    },
    {
      id: 'ch5-q3', chapterId: 'ch5', type: 'fill',
      text: '遍历数组 arr 的每个元素 item，写法：for (const ____ of arr)',
      answer: 'item',
    },
    {
      id: 'ch5-q4', chapterId: 'ch5', type: 'code',
      text: '使用 for 循环依次输出数字 1、2、3，每个数字一行。',
      starterCode: '// 在这里写代码\n',
      expectedOutput: '1\n2\n3',
      answer: '',
    },
  ],

  ch6: [
    {
      id: 'ch6-q1', chapterId: 'ch6', type: 'choice',
      text: '数组的第一个元素的索引是？',
      options: ['1', '0', '-1', '首'],
      answer: '0',
    },
    {
      id: 'ch6-q2', chapterId: 'ch6', type: 'choice',
      text: 'arr.map() 的返回值是什么？',
      options: ['undefined', '修改了的原数组', '一个全新的数组', '布尔值'],
      answer: '一个全新的数组',
    },
    {
      id: 'ch6-q3', chapterId: 'ch6', type: 'fill',
      text: '筛选数组中满足条件的元素，用：arr._______(item => item > 0)',
      answer: 'filter',
    },
    {
      id: 'ch6-q4', chapterId: 'ch6', type: 'code',
      text: '创建数组 [45, 70, 80]，用 filter 筛出及格分数并输出「70,80」。',
      starterCode: '// 在这里写代码\n',
      expectedOutput: '70,80',
      answer: '',
    },
  ],

  ch7: [
    {
      id: 'ch7-q1', chapterId: 'ch7', type: 'choice',
      text: '下面哪种方式正确地"传入函数引用"而不是"调用函数"？',
      options: ['onClick={handleClick()}', 'onClick={handleClick}', 'onClick="handleClick"', 'onClick=handleClick()'],
      answer: 'onClick={handleClick}',
    },
    {
      id: 'ch7-q2', chapterId: 'ch7', type: 'choice',
      text: '箭头函数 (a, b) => a + b 等价于哪种写法？',
      options: [
        'function(a, b) { a + b }',
        'function(a, b) { return a + b }',
        '=> function(a, b) { return a + b }',
        'const f = a + b',
      ],
      answer: 'function(a, b) { return a + b }',
    },
    {
      id: 'ch7-q3', chapterId: 'ch7', type: 'fill',
      text: '函数没有返回值时，返回值类型标注为：function foo(): ____',
      answer: 'void',
    },
    {
      id: 'ch7-q4', chapterId: 'ch7', type: 'code',
      text: '定义 multiply 函数，接收两个数字并返回乘积；调用它计算 3 × 4 并输出结果。',
      starterCode: '// 在这里写代码\n',
      expectedOutput: '12',
      answer: '',
    },
  ],

  ch8: [
    {
      id: 'ch8-q1', chapterId: 'ch8', type: 'choice',
      text: '用 const 声明的对象，可以修改其属性吗？',
      options: ['不可以，const 的任何内容都不能改', '可以，const 只限制不能重新赋值整个对象', '只有数字属性可以改', '取决于属性类型'],
      answer: '可以，const 只限制不能重新赋值整个对象',
    },
    {
      id: 'ch8-q2', chapterId: 'ch8', type: 'choice',
      text: 'interface 中用什么符号表示可选属性？',
      options: ['!', '*', '?', '~'],
      answer: '?',
    },
    {
      id: 'ch8-q3', chapterId: 'ch8', type: 'fill',
      text: '对象方法内用 ____ 引用对象自身的其他属性',
      answer: 'this',
    },
    {
      id: 'ch8-q4', chapterId: 'ch8', type: 'code',
      text: '创建包含 name 属性的对象，name 为「小明」，并输出这个属性。',
      starterCode: '// 在这里写代码\n',
      expectedOutput: '小明',
      answer: '',
    },
  ],

  ch9: [
    {
      id: 'ch9-q1', chapterId: 'ch9', type: 'choice',
      text: '联合类型 string | number 表示什么？',
      options: ['既是 string 又是 number', '可以是 string 或 number 中的任意一个', '只能是字符串数字', '不合法的类型'],
      answer: '可以是 string 或 number 中的任意一个',
    },
    {
      id: 'ch9-q2', chapterId: 'ch9', type: 'choice',
      text: '泛型函数 function identity<T>(v: T): T 中，T 是什么？',
      options: ['固定类型 T', '调用时传入的类型参数', '只能是 string', '任意的 any 类型'],
      answer: '调用时传入的类型参数',
    },
    {
      id: 'ch9-q3', chapterId: 'ch9', type: 'fill',
      text: '检查变量运行时类型的运算符是：____ value === "string"',
      answer: 'typeof',
    },
    {
      id: 'ch9-q4', chapterId: 'ch9', type: 'code',
      text: '声明联合类型变量 id（string | number），赋值 1001，并输出「ID：1001」。',
      starterCode: '// 在这里写代码\n',
      expectedOutput: 'ID：1001',
      answer: '',
    },
  ],

  ch10: [
    {
      id: 'ch10-q1', chapterId: 'ch10', type: 'choice',
      text: '命名导出使用什么语法？',
      options: ['export default name', 'export { name }', 'module.exports = name', 'exports name'],
      answer: 'export { name }',
    },
    {
      id: 'ch10-q2', chapterId: 'ch10', type: 'choice',
      text: '一个文件可以有多少个默认导出（export default）？',
      options: ['无限个', '最多 2 个', '只能 1 个', '0 个'],
      answer: '只能 1 个',
    },
    {
      id: 'ch10-q3', chapterId: 'ch10', type: 'fill',
      text: '从同目录的 utils.ts 导入 formatDate 函数：import { formatDate } ____ \'./utils\'',
      answer: 'from',
    },
  ],

  ch10a: [
    {
      id: 'ch10a-q1', chapterId: 'ch10a', type: 'choice',
      text: '把一个函数当作参数传给另一个函数，被传进去的那个函数叫什么？',
      options: ['回调函数', '构造函数', '匿名函数', '递归函数'],
      answer: '回调函数',
    },
    {
      id: 'ch10a-q2', chapterId: 'ch10a', type: 'choice',
      text: '关于闭包，下面哪种说法是对的？',
      options: [
        '内部函数能够记住并访问它定义时所在的外层作用域的变量',
        '闭包会让所有变量都变成全局变量',
        '闭包只能用在箭头函数里',
        '函数执行结束后，它的局部变量一定立刻被回收',
      ],
      answer: '内部函数能够记住并访问它定义时所在的外层作用域的变量',
    },
    {
      id: 'ch10a-q3', chapterId: 'ch10a', type: 'fill',
      text: '作用域链的方向是：内层可以访问外层，外层________访问内层。（填「不能」或「能」）',
      answer: '不能',
    },
    {
      id: 'ch10a-q4', chapterId: 'ch10a', type: 'code',
      text: '定义 applyTwice(value, fn)，让 fn 对 value 连续执行两次；传入 2 和“乘以 2”的函数，输出 8。',
      starterCode: '// 在这里写代码\n',
      expectedOutput: '8',
      answer: '',
    },
  ],

  ch11: [
    {
      id: 'ch11-q1', chapterId: 'ch11', type: 'choice',
      text: 'async/await 是什么的语法糖？',
      options: ['回调函数', 'setTimeout', 'Promise', 'Generator'],
      answer: 'Promise',
    },
    {
      id: 'ch11-q2', chapterId: 'ch11', type: 'choice',
      text: 'await 关键字只能在什么类型的函数内使用？',
      options: ['普通函数', 'async 函数', '箭头函数', '所有函数'],
      answer: 'async 函数',
    },
    {
      id: 'ch11-q3', chapterId: 'ch11', type: 'fill',
      text: '捕获 async 函数中抛出的错误，使用 try { } ____ { } 结构',
      answer: 'catch',
    },
    {
      id: 'ch11-q4', chapterId: 'ch11', type: 'code',
      text: '创建一个 resolve 为「完成」的 Promise，并在 then 回调中输出它。',
      starterCode: '// 在这里写代码\n',
      expectedOutput: '完成',
      answer: '',
    },
  ],

  ch12: [
    {
      id: 'ch12-q1', chapterId: 'ch12', type: 'choice',
      text: 'Node.js 相比浏览器 JavaScript，多了什么能力？',
      options: ['操作 DOM', '读写文件系统', '处理用户点击', '渲染 CSS'],
      answer: '读写文件系统',
    },
    {
      id: 'ch12-q2', chapterId: 'ch12', type: 'choice',
      text: '路径拼接应该用哪个方法，以保证跨平台兼容？',
      options: ['字符串 + 拼接', 'path.join()', 'path.split()', 'String.concat()'],
      answer: 'path.join()',
    },
    {
      id: 'ch12-q3', chapterId: 'ch12', type: 'fill',
      text: '读取环境变量 PORT 的代码是：process.____.PORT',
      answer: 'env',
    },
  ],

  ch13: [
    {
      id: 'ch13-q1', chapterId: 'ch13', type: 'choice',
      text: 'Express 中定义 GET /articles 路由，正确写法是？',
      options: [
        'app.route("GET", "/articles", handler)',
        'app.get("/articles", handler)',
        'app.request("GET /articles", handler)',
        'router.get["/articles"] = handler',
      ],
      answer: 'app.get("/articles", handler)',
    },
    {
      id: 'ch13-q2', chapterId: 'ch13', type: 'choice',
      text: '中间件函数的第三个参数 next 的作用是？',
      options: ['返回响应给客户端', '调用下一个中间件', '跳过当前路由', '结束请求'],
      answer: '调用下一个中间件',
    },
    {
      id: 'ch13-q3', chapterId: 'ch13', type: 'fill',
      text: '获取 URL 中的动态参数 :id 的代码是：req.______.id',
      answer: 'params',
    },
  ],

  ch14: [
    {
      id: 'ch14-q1', chapterId: 'ch14', type: 'choice',
      text: 'SQL 中，查询所有列使用？',
      options: ['SELECT all FROM', 'SELECT * FROM', 'GET * FROM', 'FETCH * FROM'],
      answer: 'SELECT * FROM',
    },
    {
      id: 'ch14-q2', chapterId: 'ch14', type: 'choice',
      text: '为什么数据库 SQL 要用 ? 占位符而不是字符串拼接？',
      options: ['代码更短', '防止 SQL 注入攻击', '查询更快', '只是习惯'],
      answer: '防止 SQL 注入攻击',
    },
    {
      id: 'ch14-q3', chapterId: 'ch14', type: 'fill',
      text: '删除 id=1 的记录：DELETE FROM articles WHERE ____ = 1',
      answer: 'id',
    },
  ],

  ch15: [
    {
      id: 'ch15-q1', chapterId: 'ch15', type: 'choice',
      text: 'REST API 中，创建新资源应该使用哪个 HTTP 方法？',
      options: ['GET', 'POST', 'PUT', 'DELETE'],
      answer: 'POST',
    },
    {
      id: 'ch15-q2', chapterId: 'ch15', type: 'choice',
      text: 'HTTP 状态码 201 表示什么？',
      options: ['请求成功', '资源已创建', '重定向', '服务器错误'],
      answer: '资源已创建',
    },
    {
      id: 'ch15-q3', chapterId: 'ch15', type: 'fill',
      text: 'REST 设计中，/getArticles 应该改成更规范的 ________',
      answer: '/articles',
    },
  ],

  ch15a: [
    {
      id: 'ch15a-q1', chapterId: 'ch15a', type: 'choice',
      text: '「认证（Authentication）」回答的是下面哪个问题？',
      options: ['你是谁？', '你能做什么？', '你在哪里？', '你什么时候来的？'],
      answer: '你是谁？',
    },
    {
      id: 'ch15a-q2', chapterId: 'ch15a', type: 'choice',
      text: '数据库里应该怎样保存用户密码？',
      options: [
        '保存加盐后的哈希值，登录时比对哈希',
        '直接保存明文，方便找回密码',
        '用 Base64 编码后保存',
        '保存明文但限制数据库访问权限',
      ],
      answer: '保存加盐后的哈希值，登录时比对哈希',
    },
    {
      id: 'ch15a-q3', chapterId: 'ch15a', type: 'fill',
      text: 'JWT 由三部分组成，用点号连接：Header.Payload.________',
      answer: 'Signature',
      caseInsensitive: true,
    },
  ],

  ch16: [
    {
      id: 'ch16-q1', chapterId: 'ch16', type: 'choice',
      text: 'HTML 中，超链接使用哪个标签？',
      options: ['<link>', '<href>', '<a>', '<url>'],
      answer: '<a>',
    },
    {
      id: 'ch16-q2', chapterId: 'ch16', type: 'choice',
      text: '表单提交时，服务器通过什么属性识别各个字段？',
      options: ['id 属性', 'class 属性', 'name 属性', 'type 属性'],
      answer: 'name 属性',
    },
    {
      id: 'ch16-q3', chapterId: 'ch16', type: 'fill',
      text: 'HTML 无序列表的标签是 <ul>，列表项的标签是 <__>',
      answer: 'li',
    },
  ],

  ch17: [
    {
      id: 'ch17-q1', chapterId: 'ch17', type: 'choice',
      text: 'CSS 中，类选择器的写法是？',
      options: ['#className', '.className', 'className', '[className]'],
      answer: '.className',
    },
    {
      id: 'ch17-q2', chapterId: 'ch17', type: 'choice',
      text: 'Flexbox 中，让子元素水平居中应设置？',
      options: ['align-items: center', 'justify-content: center', 'text-align: center', 'margin: auto'],
      answer: 'justify-content: center',
    },
    {
      id: 'ch17-q3', chapterId: 'ch17', type: 'fill',
      text: '盒模型中，元素内部的间距叫 ________，外部间距叫 margin',
      answer: 'padding',
    },
  ],

  ch17a: [
    {
      id: 'ch17a-q1', chapterId: 'ch17a', type: 'choice',
      text: 'fetch() 返回的是什么？',
      options: [
        '一个 Promise，解析后得到 Response 对象',
        '直接返回解析好的 JSON 数据',
        '返回字符串形式的响应体',
        '返回 XMLHttpRequest 对象',
      ],
      answer: '一个 Promise，解析后得到 Response 对象',
    },
    {
      id: 'ch17a-q2', chapterId: 'ch17a', type: 'choice',
      text: '用 fetch 发送 POST 并提交 JSON 时，除了 method 和 body，通常还必须设置什么？',
      options: [
        "请求头 Content-Type: application/json",
        '把 body 写成查询字符串',
        'mode: no-cors',
        '什么都不用设置',
      ],
      answer: "请求头 Content-Type: application/json",
    },
    {
      id: 'ch17a-q3', chapterId: 'ch17a', type: 'fill',
      text: '把 fetch 拿到的响应体按 JSON 解析：const data = await response.________()',
      answer: 'json',
    },
  ],

  ch18: [
    {
      id: 'ch18-q1', chapterId: 'ch18', type: 'choice',
      text: 'React 组件名必须以什么开头？',
      options: ['小写字母', '大写字母', '下划线', 'react_'],
      answer: '大写字母',
    },
    {
      id: 'ch18-q2', chapterId: 'ch18', type: 'choice',
      text: 'JSX 中，在 class 属性应该写成什么？',
      options: ['class', 'className', 'classList', 'cssClass'],
      answer: 'className',
    },
    {
      id: 'ch18-q3', chapterId: 'ch18', type: 'fill',
      text: 'React 中，父组件向子组件传递数据通过 _______ 实现',
      answer: 'props',
    },
  ],

  ch19: [
    {
      id: 'ch19-q1', chapterId: 'ch19', type: 'choice',
      text: '调用 useState 返回的是什么？',
      options: ['只是当前值', '只是 setter 函数', '[当前值, setter 函数] 数组', '一个对象'],
      answer: '[当前值, setter 函数] 数组',
    },
    {
      id: 'ch19-q2', chapterId: 'ch19', type: 'choice',
      text: 'useEffect 的第二个参数 [] 表示什么？',
      options: ['每次渲染都执行', '只在组件挂载时执行一次', '只在组件卸载时执行', '传空数组会报错'],
      answer: '只在组件挂载时执行一次',
    },
    {
      id: 'ch19-q3', chapterId: 'ch19', type: 'fill',
      text: 'React 列表渲染中，每个元素必须有唯一的 _______ 属性',
      answer: 'key',
    },
  ],

  ch20: [
    {
      id: 'ch20-q1', chapterId: 'ch20', type: 'choice',
      text: 'fetch 请求后为什么还要 await response.json()？',
      options: ['只是格式要求', 'response.json() 本身也是异步的', 'json() 会发第二次请求', '直接用 response 就行'],
      answer: 'response.json() 本身也是异步的',
    },
    {
      id: 'ch20-q2', chapterId: 'ch20', type: 'choice',
      text: 'response.ok 在 HTTP 状态码为多少时为 true？',
      options: ['200 只', '200-299', '200-399', '所有状态码'],
      answer: '200-299',
    },
    {
      id: 'ch20-q3', chapterId: 'ch20', type: 'fill',
      text: 'POST 请求时，需要在 body 里传 JSON，要用 JSON._______(data) 序列化',
      answer: 'stringify',
    },
  ],

  ch21: [
    {
      id: 'ch21-q1', chapterId: 'ch21', type: 'choice',
      text: '全栈项目中，shared/ 目录通常存放什么？',
      options: ['只存放图片', '前后端共享的类型定义', '服务器配置', '数据库文件'],
      answer: '前后端共享的类型定义',
    },
    {
      id: 'ch21-q2', chapterId: 'ch21', type: 'choice',
      text: '数据库中，在 views 字段加索引的好处是？',
      options: ['减少存储空间', '加快按 views 排序和查询的速度', '防止数据重复', '不需要索引'],
      answer: '加快按 views 排序和查询的速度',
    },
    {
      id: 'ch21-q3', chapterId: 'ch21', type: 'fill',
      text: 'SQLite 建表中，让 id 自动递增的关键字是 AUTOINCREMENT，主键关键字是 PRIMARY ____',
      answer: 'KEY',
    },
  ],

  ch22: [
    {
      id: 'ch22-q1', chapterId: 'ch22', type: 'choice',
      text: '前后端联调时，出现 CORS 跨域错误，应该在哪里解决？',
      options: ['前端代码', '后端加 cors 中间件', '数据库配置', '修改浏览器设置'],
      answer: '后端加 cors 中间件',
    },
    {
      id: 'ch22-q2', chapterId: 'ch22', type: 'choice',
      text: 'TypeScript 数据模块相比 JSON 文件的优势是？',
      options: ['文件更小', '加载更快', '有类型检查和 IDE 补全', '不需要 import'],
      answer: '有类型检查和 IDE 补全',
    },
    {
      id: 'ch22-q3', chapterId: 'ch22', type: 'code',
      text: '写一个函数，接收 chapters 数组，返回总节数。每个 chapter 有 sections 数组。',
      starterCode: `interface Section { id: string; title: string }
interface Chapter { id: string; title: string; sections: Section[] }

function countSections(chapters: Chapter[]): number {
  // 在这里写代码
}

const chapters: Chapter[] = [
  { id: 'ch1', title: 'Ch1', sections: [{ id: '1.1', title: 'A' }, { id: '1.2', title: 'B' }] },
  { id: 'ch2', title: 'Ch2', sections: [{ id: '2.1', title: 'C' }] },
]

console.log(countSections(chapters))`,
      answer: '3',
      expectedOutput: '3',
    },
  ],

  // ─── 实战项目考题 ───
  p1: [
    {
      id: 'p1-q1', chapterId: 'p1', type: 'choice',
      text: 'CLI 待办事项中，标记任务完成应该修改 Todo 的哪个字段？',
      options: ['id', 'task', 'done', 'createdAt'],
      answer: 'done',
    },
    {
      id: 'p1-q2', chapterId: 'p1', type: 'choice',
      text: '持久化待办数据到文件，使用什么格式最方便？',
      options: ['CSV', 'JSON', 'XML', '纯文本每行一条'],
      answer: 'JSON',
    },
    {
      id: 'p1-q3', chapterId: 'p1', type: 'fill',
      text: '把 Todo 数组转成 JSON 字符串的方法是 JSON._______(todos)',
      answer: 'stringify',
    },
  ],

  p2: [
    {
      id: 'p2-q1', chapterId: 'p2', type: 'choice',
      text: 'TypeScript 中实现 Pick<T, K>，需要用到什么关键字？',
      options: ['keyof', 'typeof', 'instanceof', 'keyin'],
      answer: 'keyof',
    },
    {
      id: 'p2-q2', chapterId: 'p2', type: 'choice',
      text: '`infer` 关键字只能用在什么位置？',
      options: ['函数体内', '条件类型的 extends 子句中', '变量声明中', '任何类型定义中'],
      answer: '条件类型的 extends 子句中',
    },
    {
      id: 'p2-q3', chapterId: 'p2', type: 'fill',
      text: '从函数类型中提取返回值类型的内置工具类型是 ________<T>',
      answer: 'ReturnType',
    },
  ],

  p3: [
    {
      id: 'p3-q1', chapterId: 'p3', type: 'choice',
      text: 'better-sqlite3 相比异步 sqlite3 的优势是？',
      options: ['速度更慢', 'API 是同步的，更简单', '只能在浏览器用', '不需要 SQL'],
      answer: 'API 是同步的，更简单',
    },
    {
      id: 'p3-q2', chapterId: 'p3', type: 'choice',
      text: 'Express 中间件中不调用 next() 会怎样？',
      options: ['自动继续', '请求被"卡住"，不会继续往下走', '报错', '跳过当前中间件'],
      answer: '请求被"卡住"，不会继续往下走',
    },
    {
      id: 'p3-q3', chapterId: 'p3', type: 'fill',
      text: '用 supertest 测试 Express 应用时，测试函数必须是 ____ 函数（因为要用 await）',
      answer: 'async',
    },
  ],

  p4: [
    {
      id: 'p4-q1', chapterId: 'p4', type: 'choice',
      text: 'CSS Grid 中，fr 单位表示什么？',
      options: ['固定像素', '一份剩余空间', '百分比', '相对于父元素'],
      answer: '一份剩余空间',
    },
    {
      id: 'p4-q2', chapterId: 'p4', type: 'choice',
      text: '实现暗色模式切换，最优雅的方式是？',
      options: ['切换 className', '切换 CSS 变量 + data-theme 属性', '写两套 CSS 文件', '用 JavaScript 改每个元素样式'],
      answer: '切换 CSS 变量 + data-theme 属性',
    },
    {
      id: 'p4-q3', chapterId: 'p4', type: 'fill',
      text: '移动优先的响应式设计中，使用 ____-width 断点逐步增强大屏样式',
      answer: 'min',
    },
  ],

  p5: [
    {
      id: 'p5-q1', chapterId: 'p5', type: 'choice',
      text: 'React Router 中，动态路由参数 :id 如何获取？',
      options: ['useParams().id', 'props.id', 'window.location.id', 'req.params.id'],
      answer: 'useParams().id',
    },
    {
      id: 'p5-q2', chapterId: 'p5', type: 'choice',
      text: '自定义 Hook 的命名必须以什么开头？',
      options: ['hook', 'use', 'custom', 'handle'],
      answer: 'use',
    },
    {
      id: 'p5-q3', chapterId: 'p5', type: 'fill',
      text: '在 React 中渲染 Markdown 内容，常用的第三方库是 react-________',
      answer: 'markdown',
    },
  ],

  p6: [
    {
      id: 'p6-q1', chapterId: 'p6', type: 'choice',
      text: 'Prisma 是什么？',
      options: ['一个 CSS 框架', 'Node.js 的 ORM 工具', '一种数据库', '测试框架'],
      answer: 'Node.js 的 ORM 工具',
    },
    {
      id: 'p6-q2', chapterId: 'p6', type: 'choice',
      text: 'Docker Compose 中，depends_on 的作用是？',
      options: ['让容器共享网络', '控制服务启动顺序', '挂载数据卷', '设置环境变量'],
      answer: '控制服务启动顺序',
    },
    {
      id: 'p6-q3', chapterId: 'p6', type: 'fill',
      text: 'JWT 的三个组成部分是：header.payload.________',
      answer: 'signature',
    },
  ],

  // ─── 新增章节题目 ───
  ch0: [
    {
      id: 'ch0-q1', chapterId: 'ch0', type: 'choice',
      text: 'Git 中，将暂存区的文件提交到版本库的命令是？',
      options: ['git add', 'git commit', 'git push', 'git status'],
      answer: 'git commit',
    },
    {
      id: 'ch0-q2', chapterId: 'ch0', type: 'choice',
      text: '计算思维四个步骤的正确顺序是？',
      options: [
        '抽象→分解→算法→模式识别',
        '分解→模式识别→抽象→算法',
        '算法→抽象→分解→模式识别',
        '模式识别→算法→分解→抽象',
      ],
      answer: '分解→模式识别→抽象→算法',
    },
    {
      id: 'ch0-q3', chapterId: 'ch0', type: 'fill',
      text: '在终端中查看 Node.js 版本号的命令是：node ____',
      answer: '--version',
    },
  ],

  ch9a: [
    {
      id: 'ch9a-q1', chapterId: 'ch9a', type: 'choice',
      text: '使用了未声明的变量，TypeScript 会报什么类型的错误？',
      options: ['SyntaxError', 'TypeError', 'ReferenceError', 'RangeError'],
      answer: 'ReferenceError',
    },
    {
      id: 'ch9a-q2', chapterId: 'ch9a', type: 'choice',
      text: 'try/catch/finally 中，finally 块什么时候执行？',
      options: ['只在 try 成功时', '只在 catch 执行时', '无论成功或失败都会执行', '只在程序崩溃时'],
      answer: '无论成功或失败都会执行',
    },
    {
      id: 'ch9a-q3', chapterId: 'ch9a', type: 'fill',
      text: '在代码中插入 ________ 语句可以让程序在执行到该位置时自动暂停（用于调试）',
      answer: 'debugger',
    },
  ],

  ch11a: [
    {
      id: 'ch11a-q1', chapterId: 'ch11a', type: 'choice',
      text: 'Jest 中，深度比较两个对象是否相等的匹配器是？',
      options: ['.toBe()', '.toEqual()', '.toMatch()', '.toContain()'],
      answer: '.toEqual()',
    },
    {
      id: 'ch11a-q2', chapterId: 'ch11a', type: 'choice',
      text: '测试异步代码时，推荐使用哪种方式？',
      options: ['done 回调', 'async/await', 'setTimeout', 'Promise.then 嵌套'],
      answer: 'async/await',
    },
    {
      id: 'ch11a-q3', chapterId: 'ch11a', type: 'fill',
      text: 'Jest 测试文件中，定义一个测试用例的函数是：________("测试描述", () => { ... })',
      answer: 'test',
    },
  ],
};
