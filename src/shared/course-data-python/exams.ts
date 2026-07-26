// 📝 考试题库（Python）— 基础题 + 代表性编程题
import type { Question } from '../types/course';

export const allQuestions: Record<string, Question[]> = {
  'ch-1': [
    {
      id: 'ch-1-q1', chapterId: 'ch-1', type: 'choice',
      text: '计算机中 CPU 的主要作用是？',
      options: ['存储数据', '进行计算和处理', '显示画面', '连接网络'],
      answer: '进行计算和处理',
    },
    {
      id: 'ch-1-q2', chapterId: 'ch-1', type: 'choice',
      text: '编程三要素是哪三个？',
      options: ['打开、编辑、保存', '输入、处理、输出', '编译、运行、调试', '声明、赋值、打印'],
      answer: '输入、处理、输出',
    },
    {
      id: 'ch-1-q3', chapterId: 'ch-1', type: 'fill',
      text: 'Python 源代码文件的后缀名是 _____',
      answer: '.py',
    },
  ],
  ch0: [
    {
      id: 'ch0-q1', chapterId: 'ch0', type: 'choice',
      text: 'Python 中创建虚拟环境的命令是？',
      options: ['python -m venv myenv', 'python create venv', 'pip install venv', 'python venv new'],
      answer: 'python -m venv myenv',
    },
    {
      id: 'ch0-q2', chapterId: 'ch0', type: 'choice',
      text: 'pip freeze 命令的作用是什么？',
      options: ['安装依赖', '导出已安装包列表', '冻结 Python 版本', '卸载所有包'],
      answer: '导出已安装包列表',
    },
    {
      id: 'ch0-q3', chapterId: 'ch0', type: 'fill',
      text: '终端中切换目录的命令是 _____',
      answer: 'cd',
    },
  ],

  ch1: [
    { id: 'ch1-q1', chapterId: 'ch1', type: 'choice',
      text: 'Python 中输出文字到控制台的函数是什么？',
      options: ['console.log()', 'print()', 'echo()', 'write()'],
      answer: 'print()',
    },
    { id: 'ch1-q2', chapterId: 'ch1', type: 'fill',
      text: 'Python 用 _____ 代替花括号来表示代码块。',
      answer: '缩进',
    },
    { id: 'ch1-q3', chapterId: 'ch1', type: 'choice',
      text: 'Python 的文件扩展名是什么？',
      options: ['.js', '.ts', '.py', '.java'],
      answer: '.py',
    },
  ],

  ch2: [
    {
      id: 'ch2-q1', chapterId: 'ch2', type: 'choice',
      text: 'Python 中不需要声明类型，这种特性叫什么？',
      options: ['静态类型', '动态类型', '强类型', '弱类型'],
      answer: '动态类型',
    },
    {
      id: 'ch2-q2', chapterId: 'ch2', type: 'choice',
      text: 'type() 函数的作用是什么？',
      options: ['转换类型', '检查类型', '定义类型', '删除类型'],
      answer: '检查类型',
    },
    {
      id: 'ch2-q3', chapterId: 'ch2', type: 'fill',
      text: 'Python 用 _____ 来包裹多行字符串。',
      answer: '三引号',
    },
    {
      id: 'ch2-q4', chapterId: 'ch2', type: 'code',
      text: '设置 price 为 12、quantity 为 3，并输出「总价：36」。',
      starterCode: '# 在这里写代码\n',
      expectedOutput: '总价：36',
      answer: '',
    },
  ],

  ch3: [
    {
      id: 'ch3-q1', chapterId: 'ch3', type: 'choice',
      text: 'Python 的 if 语句条件后面必须跟什么符号？',
      options: [';', ':', '{}', '()'],
      answer: ':',
    },
    {
      id: 'ch3-q2', chapterId: 'ch3', type: 'choice',
      text: 'elif 的作用是？',
      options: ['结束 if', '添加一个额外的条件分支', '执行默认操作', '循环'],
      answer: '添加一个额外的条件分支',
    },
    {
      id: 'ch3-q3', chapterId: 'ch3', type: 'fill',
      text: 'Python 的三元表达式格式是：值1 ____ 条件 else 值2',
      answer: 'if',
    },
    {
      id: 'ch3-q4', chapterId: 'ch3', type: 'code',
      text: '设置 score 为 80；分数大于等于 60 时输出「通过」，否则输出「继续努力」。',
      starterCode: '# 在这里写代码\n',
      expectedOutput: '通过',
      answer: '',
    },
  ],

  ch4: [
    {
      id: 'ch4-q1', chapterId: 'ch4', type: 'choice',
      text: 'range(5) 生成的序列是？',
      options: ['1,2,3,4,5', '0,1,2,3,4', '0,1,2,3,4,5', '1,2,3,4'],
      answer: '0,1,2,3,4',
    },
    {
      id: 'ch4-q2', chapterId: 'ch4', type: 'choice',
      text: 'break 语句的作用是？',
      options: ['跳过当前循环', '结束整个循环', '继续下一次循环', '重启循环'],
      answer: '结束整个循环',
    },
    {
      id: 'ch4-q3', chapterId: 'ch4', type: 'fill',
      text: 'Python 中 for 循环直接遍历序列元素，不需要用 _____ 变量。',
      answer: '索引',
    },
    {
      id: 'ch4-q4', chapterId: 'ch4', type: 'code',
      text: '使用 range 和 for 循环依次输出 1、2、3，每个数字一行。',
      starterCode: '# 在这里写代码\n',
      expectedOutput: '1\n2\n3',
      answer: '',
    },
  ],

  ch5: [
    {
      id: 'ch5-q1', chapterId: 'ch5', type: 'choice',
      text: 'f-string 的前缀是什么？',
      options: ['r', 'b', 'f', 'u'],
      answer: 'f',
    },
    {
      id: 'ch5-q2', chapterId: 'ch5', type: 'choice',
      text: "'hello'.upper() 的结果是？",
      options: ['Hello', 'HELLO', 'hello', 'hELLO'],
      answer: 'HELLO',
    },
    {
      id: 'ch5-q3', chapterId: 'ch5', type: 'fill',
      text: '取字符串前三个字符用 s[____]',
      answer: ':3',
    },
    {
      id: 'ch5-q4', chapterId: 'ch5', type: 'code',
      text: '定义字符串 text 为 hello，使用 upper() 输出 HELLO。',
      starterCode: '# 在这里写代码\n',
      expectedOutput: 'HELLO',
      answer: '',
    },
  ],

  ch6: [
    {
      id: 'ch6-q1', chapterId: 'ch6', type: 'choice',
      text: 'list.append(x) 的作用是？',
      options: ['在开头插入', '在末尾添加', '删除元素', '排序'],
      answer: '在末尾添加',
    },
    {
      id: 'ch6-q2', chapterId: 'ch6', type: 'choice',
      text: '元组和列表最大的区别是？',
      options: ['元组更快', '元组不可变', '元组可以哈希', '元组没有方法'],
      answer: '元组不可变',
    },
    {
      id: 'ch6-q3', chapterId: 'ch6', type: 'fill',
      text: '用列表推导式生成 0-9 的平方：`[____ for x in range(10)]`',
      answer: 'x**2',
    },
    {
      id: 'ch6-q4', chapterId: 'ch6', type: 'code',
      text: '创建列表 [3, 1, 2]，按升序排序后输出 [1, 2, 3]。',
      starterCode: '# 在这里写代码\n',
      expectedOutput: '[1, 2, 3]',
      answer: '',
    },
  ],

  ch7: [
    {
      id: 'ch7-q1', chapterId: 'ch7', type: 'choice',
      text: '字典中获取键对应的值，如果键不存在则返回默认值的方法是？',
      options: ['dict["key"]', 'dict.key', 'dict.get("key", default)', 'dict.fetch("key")'],
      answer: 'dict.get("key", default)',
    },
    {
      id: 'ch7-q2', chapterId: 'ch7', type: 'choice',
      text: '集合的交集运算符号是？',
      options: ['|', '&', '-', '^'],
      answer: '&',
    },
    {
      id: 'ch7-q3', chapterId: 'ch7', type: 'fill',
      text: '遍历字典的键和值用 dict.____()',
      answer: 'items',
    },
    {
      id: 'ch7-q4', chapterId: 'ch7', type: 'code',
      text: '创建字典 student，包含 name「小明」和 score 90，输出「小明：90」。',
      starterCode: '# 在这里写代码\n',
      expectedOutput: '小明：90',
      answer: '',
    },
  ],

  ch8: [
    {
      id: 'ch8-q1', chapterId: 'ch8', type: 'choice',
      text: 'Python 定义函数的关键字是？',
      options: ['fn', 'func', 'def', 'function'],
      answer: 'def',
    },
    {
      id: 'ch8-q2', chapterId: 'ch8', type: 'choice',
      text: 'lambda 函数的特点是什么？',
      options: ['可以有多个语句', '一行匿名函数', '必须有名字', '不能有参数'],
      answer: '一行匿名函数',
    },
    {
      id: 'ch8-q3', chapterId: 'ch8', type: 'fill',
      text: '函数内部访问全局变量需要用 _____ 关键字声明。',
      answer: 'global',
    },
    {
      id: 'ch8-q4', chapterId: 'ch8', type: 'code',
      text: '定义 multiply 函数，返回两个参数的乘积；调用它计算 3 × 4 并输出 12。',
      starterCode: '# 在这里写代码\n',
      expectedOutput: '12',
      answer: '',
    },
  ],

  ch9: [
    {
      id: 'ch9-q1', chapterId: 'ch9', type: 'choice',
      text: '打开文件的最佳实践是使用？',
      options: ['open()', 'with open()', 'file()', 'read()'],
      answer: 'with open()',
    },
    {
      id: 'ch9-q2', chapterId: 'ch9', type: 'choice',
      text: "open() 的 'w' 模式表示什么？",
      options: ['只读', '写入（覆盖）', '追加', '读写'],
      answer: '写入（覆盖）',
    },
    {
      id: 'ch9-q3', chapterId: 'ch9', type: 'fill',
      text: '读取文件所有行的代码是：f.____()',
      answer: 'readlines',
    },
  ],

  ch9a: [
    {
      id: 'ch9a-q1', chapterId: 'ch9a', type: 'choice',
      text: 'Python 中，try/except 里无论是否异常都会执行的块是？',
      options: ['try', 'except', 'else', 'finally'],
      answer: 'finally',
    },
    {
      id: 'ch9a-q2', chapterId: 'ch9a', type: 'choice',
      text: '访问不存在的字典键会抛出什么异常？',
      options: ['IndexError', 'KeyError', 'ValueError', 'TypeError'],
      answer: 'KeyError',
    },
    {
      id: 'ch9a-q3', chapterId: 'ch9a', type: 'fill',
      text: '阅读 Traceback 时，应该从 ____ 往 ____ 读。',
      answer: '下 上',
    },
  ],

  ch10: [
    {
      id: 'ch10-q1', chapterId: 'ch10', type: 'choice',
      text: '安装第三方包的 pip 命令是？',
      options: ['pip add', 'pip install', 'pip get', 'pip setup'],
      answer: 'pip install',
    },
    {
      id: 'ch10-q2', chapterId: 'ch10', type: 'choice',
      text: 'if __name__ == "__main__" 的作用是？',
      options: ['定义类', '判断是否直接运行', '导入模块', '定义函数'],
      answer: '判断是否直接运行',
    },
    {
      id: 'ch10-q3', chapterId: 'ch10', type: 'fill',
      text: '导入 math 模块的全部内容：from math ____ *',
      answer: 'import',
    },
  ],

  ch11: [
    {
      id: 'ch11-q1', chapterId: 'ch11', type: 'choice',
      text: '类中 self 代表什么？',
      options: ['类本身', '实例对象', '父类', '模块'],
      answer: '实例对象',
    },
    {
      id: 'ch11-q2', chapterId: 'ch11', type: 'choice',
      text: '初始化方法的名字是？',
      options: ['__init__', '__new__', '__start__', '__create__'],
      answer: '__init__',
    },
    {
      id: 'ch11-q3', chapterId: 'ch11', type: 'fill',
      text: '子类调用父类方法用 _____() 函数。',
      answer: 'super',
    },
  ],

  ch12: [
    {
      id: 'ch12-q1', chapterId: 'ch12', type: 'choice',
      text: 'Python 中 raise 关键字的作用是什么？',
      options: ['捕获异常', '手动触发异常', '忽略异常', '记录异常日志'],
      answer: '手动触发异常',
    },
    {
      id: 'ch12-q2', chapterId: 'ch12', type: 'choice',
      text: '捕获所有异常应该用？',
      options: ['except:', 'except Exception:', 'except Error:', 'except All:'],
      answer: 'except Exception:',
    },
    {
      id: 'ch12-q3', chapterId: 'ch12', type: 'fill',
      text: '手动抛出异常用 _____ 关键字。',
      answer: 'raise',
    },
  ],

  ch12a: [
    {
      id: 'ch12a-q1', chapterId: 'ch12a', type: 'choice',
      text: 'pytest 中测试函数的命名规则是？',
      options: ['以 test 开头', '以 _test 结尾', '以 test_ 开头', '任意名字'],
      answer: '以 test_ 开头',
    },
    {
      id: 'ch12a-q2', chapterId: 'ch12a', type: 'choice',
      text: 'pytest 中测试异常使用哪个方法？',
      options: ['pytest.assert', 'pytest.raises', 'pytest.expect', 'pytest.catch'],
      answer: 'pytest.raises',
    },
    {
      id: 'ch12a-q3', chapterId: 'ch12a', type: 'fill',
      text: 'Python 中用于断言的关键字是 _____',
      answer: 'assert',
    },
  ],

  ch12b: [
    {
      id: 'ch12b-q1', chapterId: 'ch12b', type: 'choice',
      text: '正则表达式中 \\\\d 匹配什么？',
      options: ['字母', '数字', '空白', '任意字符'],
      answer: '数字',
    },
    {
      id: 'ch12b-q2', chapterId: 'ch12b', type: 'choice',
      text: '正则中，量词 * 表示？',
      options: ['1次或多次', '0次或多次', '恰好1次', '0次或1次'],
      answer: '0次或多次',
    },
    {
      id: 'ch12b-q3', chapterId: 'ch12b', type: 'fill',
      text: 're 模块中查找所有匹配用 re._____() 函数。',
      answer: 'findall',
    },
  ],

  ch12c: [
    {
      id: 'ch12c-q1', chapterId: 'ch12c', type: 'choice',
      text: 'Python 中读取命令行参数用哪个模块的 argv？',
      options: ['os', 'sys', 'argparse', 'cli'],
      answer: 'sys',
    },
    {
      id: 'ch12c-q2', chapterId: 'ch12c', type: 'choice',
      text: 'argparse 中，store_true 的作用是？',
      options: ['必须参数', '布尔标志（flag）', '数字参数', '字符串参数'],
      answer: '布尔标志（flag）',
    },
    {
      id: 'ch12c-q3', chapterId: 'ch12c', type: 'fill',
      text: 'logging 模块中，DEBUG 级别的数值是 _____',
      answer: '10',
    },
  ],

  ch13: [
    {
      id: 'ch13-q1', chapterId: 'ch13', type: 'choice',
      text: 'requests 库中发送 GET 请求的函数是？',
      options: ['requests.get()', 'requests.post()', 'requests.fetch()', 'requests.send()'],
      answer: 'requests.get()',
    },
    {
      id: 'ch13-q2', chapterId: 'ch13', type: 'choice',
      text: 'HTTP 状态码 200 表示？',
      options: ['未找到', '服务器错误', '成功', '重定向'],
      answer: '成功',
    },
    {
      id: 'ch13-q3', chapterId: 'ch13', type: 'fill',
      text: '设置请求头需要传递 _____ 参数给 requests.get()。',
      answer: 'headers',
    },
  ],

  ch14: [
    {
      id: 'ch14-q1', chapterId: 'ch14', type: 'choice',
      text: 'BeautifulSoup 解析 HTML 的默认解析器是？',
      options: ['lxml', 'html.parser', 'html5lib', 'xml'],
      answer: 'html.parser',
    },
    {
      id: 'ch14-q2', chapterId: 'ch14', type: 'choice',
      text: 'find_all() 返回什么？',
      options: ['第一个元素', '所有匹配元素的列表', '布尔值', '字符串'],
      answer: '所有匹配元素的列表',
    },
    {
      id: 'ch14-q3', chapterId: 'ch14', type: 'fill',
      text: '获取标签的文字内容用 .____ 属性。',
      answer: 'text',
    },
  ],

  ch15: [
    {
      id: 'ch15-q1', chapterId: 'ch15', type: 'choice',
      text: 'Selenium 中用于等待元素出现的类是？',
      options: ['WebDriverWait', 'ThreadWait', 'PageWait', 'ElementWait'],
      answer: 'WebDriverWait',
    },
    {
      id: 'ch15-q2', chapterId: 'ch15', type: 'choice',
      text: 'Selenium 中通过 CSS 选择器查找元素使用？',
      options: ['By.CSS_SELECTOR', 'By.ID', 'By.TAG', 'By.LINK'],
      answer: 'By.CSS_SELECTOR',
    },
    {
      id: 'ch15-q3', chapterId: 'ch15', type: 'fill',
      text: 'send_keys() 方法的作用是向输入框 _____ 文字。',
      answer: '输入',
    },
  ],

  ch16: [
    {
      id: 'ch16-q1', chapterId: 'ch16', type: 'choice',
      text: 'Python 读写 CSV 文件推荐用哪个模块？',
      options: ['json', 'csv', 'pandas', 'sqlite3'],
      answer: 'csv',
    },
    {
      id: 'ch16-q2', chapterId: 'ch16', type: 'choice',
      text: 'json.dumps() 的作用是？',
      options: ['解析 JSON', '将对象转为 JSON 字符串', '保存到文件', '读取文件'],
      answer: '将对象转为 JSON 字符串',
    },
    {
      id: 'ch16-q3', chapterId: 'ch16', type: 'fill',
      text: 'pandas 读取 CSV 的函数是 pd.____()',
      answer: 'read_csv',
    },
  ],

  ch17: [
    {
      id: 'ch17-q1', chapterId: 'ch17', type: 'choice',
      text: 'Flask 应用的默认运行端口是？',
      options: ['3000', '8080', '5000', '8000'],
      answer: '5000',
    },
    {
      id: 'ch17-q2', chapterId: 'ch17', type: 'choice',
      text: "@app.route('/') 的作用是？",
      options: ['导入模块', '定义路由', '启动服务器', '渲染模板'],
      answer: '定义路由',
    },
    {
      id: 'ch17-q3', chapterId: 'ch17', type: 'fill',
      text: 'Flask 中渲染 HTML 模板用 _____ 函数。',
      answer: 'render_template',
    },
  ],

  ch18: [
    {
      id: 'ch18-q1', chapterId: 'ch18', type: 'choice',
      text: 'Jinja2 中输出变量的语法是？',
      options: ['{}', '{{ }}', '{% %}', '<>'],
      answer: '{{ }}',
    },
    {
      id: 'ch18-q2', chapterId: 'ch18', type: 'choice',
      text: 'Flask 中通过什么对象获取数据库连接？',
      options: ['g', 'app', 'request', 'db'],
      answer: 'g',
    },
    {
      id: 'ch18-q3', chapterId: 'ch18', type: 'fill',
      text: '模板继承时子模板用 {% _____ "base.html" %}。',
      answer: 'extends',
    },
  ],

  ch19: [
    {
      id: 'ch19-q1', chapterId: 'ch19', type: 'choice',
      text: 'Flask 中获取 POST 表单数据用？',
      options: ['request.args', 'request.form', 'request.data', 'request.json'],
      answer: 'request.form',
    },
    {
      id: 'ch19-q2', chapterId: 'ch19', type: 'choice',
      text: 'Flask session 数据存储在哪里？',
      options: ['数据库', '文件', '加密的 Cookie', '内存'],
      answer: '加密的 Cookie',
    },
    {
      id: 'ch19-q3', chapterId: 'ch19', type: 'fill',
      text: 'Flask 中给用户显示一次性消息用 _____() 函数。',
      answer: 'flash',
    },
  ],

  ch20: [
    {
      id: 'ch20-q1', chapterId: 'ch20', type: 'choice',
      text: 'REST 中更新资源的 HTTP 方法是？',
      options: ['GET', 'POST', 'PUT', 'DELETE'],
      answer: 'PUT',
    },
    {
      id: 'ch20-q2', chapterId: 'ch20', type: 'choice',
      text: 'Flask 返回 JSON 响应的函数是？',
      options: ['jsonify()', 'json()', 'to_json()', 'render_json()'],
      answer: 'jsonify()',
    },
    {
      id: 'ch20-q3', chapterId: 'ch20', type: 'fill',
      text: 'REST 中删除资源用 _____ HTTP 方法。',
      answer: 'DELETE',
    },
  ],

  ch21: [
    {
      id: 'ch21-q1', chapterId: 'ch21', type: 'choice',
      text: 'Tkinter 中创建主窗口的类是？',
      options: ['Tk', 'Window', 'Frame', 'App'],
      answer: 'Tk',
    },
    {
      id: 'ch21-q2', chapterId: 'ch21', type: 'choice',
      text: 'pack() 布局方法的特点是？',
      options: ['精确坐标', '网格布局', '自动排列', '绝对定位'],
      answer: '自动排列',
    },
    {
      id: 'ch21-q3', chapterId: 'ch21', type: 'fill',
      text: 'Tkinter 的事件循环方法名是 main____()',
      answer: 'loop',
    },
  ],

  ch22: [
    {
      id: 'ch22-q1', chapterId: 'ch22', type: 'choice',
      text: 'Pygame 的游戏主循环通常用什么？',
      options: ['for 循环', 'while True 循环', '递归', '定时器'],
      answer: 'while True 循环',
    },
    {
      id: 'ch22-q2', chapterId: 'ch22', type: 'choice',
      text: 'Pygame 中检测按键事件用？',
      options: ['pygame.key.get()', 'pygame.event.get()', 'pygame.input.get()', 'pygame.mouse.get()'],
      answer: 'pygame.event.get()',
    },
    {
      id: 'ch22-q3', chapterId: 'ch22', type: 'fill',
      text: 'Pygame 初始化必须调用 pygame.____()',
      answer: 'init',
    },
  ],

  ch23: [
    {
      id: 'ch23-q1', chapterId: 'ch23', type: 'choice',
      text: 'pandas 的核心数据结构是？',
      options: ['Series 和 DataFrame', 'Array 和 List', 'Dict 和 Set', 'Tuple 和 List'],
      answer: 'Series 和 DataFrame',
    },
    {
      id: 'ch23-q2', chapterId: 'ch23', type: 'choice',
      text: 'matplotlib 中画折线图的函数是？',
      options: ['bar()', 'scatter()', 'plot()', 'hist()'],
      answer: 'plot()',
    },
    {
      id: 'ch23-q3', chapterId: 'ch23', type: 'fill',
      text: 'pandas 中删除空值用 drop____() 方法。',
      answer: 'na',
    },
  ],

  ch24: [
    {
      id: 'ch24-q1', chapterId: 'ch24', type: 'choice',
      text: 'Django 的设计模式是？',
      options: ['MVC', 'MTV', 'MVP', 'MVVM'],
      answer: 'MTV',
    },
    {
      id: 'ch24-q2', chapterId: 'ch24', type: 'choice',
      text: 'Django ORM 的作用是？',
      options: ['渲染模板', '处理请求', '数据库操作无需写SQL', '管理静态文件'],
      answer: '数据库操作无需写SQL',
    },
    {
      id: 'ch24-q3', chapterId: 'ch24', type: 'fill',
      text: 'Django 创建管理员账号用 python manage.py _____',
      answer: 'createsuperuser',
    },
  ],

  ch25: [
    {
      id: 'ch25-q1', chapterId: 'ch25', type: 'choice',
      text: 'FastAPI 自动生成什么文档？',
      options: ['Javadoc', 'JSDoc', 'Swagger/OpenAPI', 'Doxygen'],
      answer: 'Swagger/OpenAPI',
    },
    {
      id: 'ch25-q2', chapterId: 'ch25', type: 'choice',
      text: 'Python 异步函数的关键字是？',
      options: ['yield', 'await', 'async def', 'defer'],
      answer: 'async def',
    },
    {
      id: 'ch25-q3', chapterId: 'ch25', type: 'fill',
      text: 'FastAPI 中路径参数的类型用 Python 的 _____ 提示声明。',
      answer: '类型',
    },
  ],

  ch26: [
    {
      id: 'ch26-q1', chapterId: 'ch26', type: 'choice',
      text: 'Scrapy 中爬虫类继承自？',
      options: ['Spider', 'Crawler', 'BaseSpider', 'scrapy.Spider'],
      answer: 'scrapy.Spider',
    },
    {
      id: 'ch26-q2', chapterId: 'ch26', type: 'choice',
      text: 'Scrapy 中处理数据的管道叫什么？',
      options: ['Middleware', 'Pipeline', 'Handler', 'Processor'],
      answer: 'Pipeline',
    },
    {
      id: 'ch26-q3', chapterId: 'ch26', type: 'fill',
      text: 'Scrapy 创建项目用 scrapy _____ project',
      answer: 'startproject',
    },
  ],

  ch27: [
    {
      id: 'ch27-q1', chapterId: 'ch27', type: 'choice',
      text: 'Gunicorn 的作用是？',
      options: ['数据库', 'WSGI 服务器', '模板引擎', '缓存'],
      answer: 'WSGI 服务器',
    },
    {
      id: 'ch27-q2', chapterId: 'ch27', type: 'choice',
      text: 'Dockerfile 中的 FROM 指令表示什么？',
      options: ['目标平台', '基础镜像', '运行命令', '端口映射'],
      answer: '基础镜像',
    },
    {
      id: 'ch27-q3', chapterId: 'ch27', type: 'fill',
      text: 'Docker 构建镜像的命令是 docker _____',
      answer: 'build',
    },
  ],

  // ─── 实战项目考题 ──────────────────────────────────────

  p1: [
    {
      id: 'p1-q1', chapterId: 'p1', type: 'choice',
      text: 'JSON 模块中，将 Python 对象写入文件用哪个函数？',
      options: ['json.load()', 'json.dump()', 'json.write()', 'json.save()'],
      answer: 'json.dump()',
    },
    {
      id: 'p1-q2', chapterId: 'p1', type: 'choice',
      text: 'os.path.exists() 的作用是？',
      options: ['创建目录', '检查路径是否存在', '删除文件', '读取文件大小'],
      answer: '检查路径是否存在',
    },
    {
      id: 'p1-q3', chapterId: 'p1', type: 'fill',
      text: 'Python 中接收用户终端输入用 _____() 函数。',
      answer: 'input',
    },
  ],

  p2: [
    {
      id: 'p2-q1', chapterId: 'p2', type: 'choice',
      text: 'collections.Counter 最常用于？',
      options: ['排序', '计数统计', '文件操作', '网络请求'],
      answer: '计数统计',
    },
    {
      id: 'p2-q2', chapterId: 'p2', type: 'choice',
      text: 'split() 方法默认按什么分割字符串？',
      options: ['逗号', '空格/空白字符', '换行符', '下划线'],
      answer: '空格/空白字符',
    },
    {
      id: 'p2-q3', chapterId: 'p2', type: 'fill',
      text: '打开文件的最佳实践是用 _____ open() as f: 语法。',
      answer: 'with',
    },
  ],

  p3: [
    {
      id: 'p3-q1', chapterId: 'p3', type: 'choice',
      text: '爬虫中检测到商品降价后，最合适的处理方式是？',
      options: ['直接购买', '记录并通知用户', '忽略', '关闭爬虫'],
      answer: '记录并通知用户',
    },
    {
      id: 'p3-q2', chapterId: 'p3', type: 'choice',
      text: 'Python 中定时重复执行任务最常用的方法是？',
      options: ['while True + time.sleep', 'for 循环', 'if 语句', '递归'],
      answer: 'while True + time.sleep',
    },
    {
      id: 'p3-q3', chapterId: 'p3', type: 'fill',
      text: 'CSV 模块中写入一行数据用 writer._____() 方法。',
      answer: 'writerow',
    },
  ],

  p4: [
    {
      id: 'p4-q1', chapterId: 'p4', type: 'choice',
      text: '个人博客项目中，文章和评论的关系是？',
      options: ['一对一', '一对多', '多对多', '没有关系'],
      answer: '一对多',
    },
    {
      id: 'p4-q2', chapterId: 'p4', type: 'choice',
      text: 'Flask 中保护路由需要登录才能访问的方式是？',
      options: ['session 检查 + 装饰器', '数据库索引', 'CSS 隐藏', 'JS 验证'],
      answer: 'session 检查 + 装饰器',
    },
    {
      id: 'p4-q3', chapterId: 'p4', type: 'fill',
      text: 'SQLite 中创建表用 CREATE _____ 语句。',
      answer: 'TABLE',
    },
  ],

  p5: [
    {
      id: 'p5-q1', chapterId: 'p5', type: 'choice',
      text: 'Pygame 中蛇的移动通常如何实现？',
      options: ['每帧移动一个格子的位置', '瞬间移到终点', '随机跳跃', '键盘每按一次移动一格'],
      answer: '每帧移动一个格子的位置',
    },
    {
      id: 'p5-q2', chapterId: 'p5', type: 'choice',
      text: '贪吃蛇吃到食物后，蛇身如何变化？',
      options: ['缩短', '增长一节', '不变', '随机变化'],
      answer: '增长一节',
    },
    {
      id: 'p5-q3', chapterId: 'p5', type: 'fill',
      text: '蛇头碰到自己的身体或墙壁，游戏触发 _____ 判定。',
      answer: '碰撞',
    },
  ],

  p6: [
    {
      id: 'p6-q1', chapterId: 'p6', type: 'choice',
      text: 'Django 中定义数据库表结构用？',
      options: ['models.py', 'views.py', 'admin.py', 'urls.py'],
      answer: 'models.py',
    },
    {
      id: 'p6-q2', chapterId: 'p6', type: 'choice',
      text: 'Django CBV 中显示列表的通用视图是？',
      options: ['DetailView', 'ListView', 'CreateView', 'TemplateView'],
      answer: 'ListView',
    },
    {
      id: 'p6-q3', chapterId: 'p6', type: 'fill',
      text: '生产环境中 Django 通常搭配 _____ 作为 WSGI 服务器。',
      answer: 'Gunicorn',
    },
  ],
  'ch9b': [
    {
      id: 'ch9b-q1', chapterId: 'ch9b', type: 'choice',
      text: 'Python 类型提示的主要作用是什么？',
      options: ['提高运行速度', '让代码更清晰、IDE 提示更准确', '强制变量类型', '减少内存占用'],
      answer: '让代码更清晰、IDE 提示更准确',
    },
    {
      id: 'ch9b-q2', chapterId: 'ch9b', type: 'choice',
      text: '以下哪个是 Optional[int] 的正确含义？',
      options: ['参数必须是整数', '参数可以是整数或 None', '参数可选（可以省略）', '参数必须是正数'],
      answer: '参数可以是整数或 None',
    },
    {
      id: 'ch9b-q3', chapterId: 'ch9b', type: 'fill',
      text: 'Python 类型提示中，Union[int, str] 的简写格式（Python 3.10+）是 int | _____',
      answer: 'str',
    },
    {
      id: 'ch9b-q4', chapterId: 'ch9b', type: 'code',
      text: '定义带类型提示的 add(a: int, b: int) -> int，输出 add(3, 4) 的结果。',
      starterCode: '# 在这里写代码\n',
      expectedOutput: '7',
      answer: '',
    },
  ],
  'ch12d': [
    {
      id: 'ch12d-q1', chapterId: 'ch12d', type: 'choice',
      text: '生成器函数中使用什么关键字来产生值？',
      options: ['return', 'yield', 'next', 'generate'],
      answer: 'yield',
    },
    {
      id: 'ch12d-q2', chapterId: 'ch12d', type: 'choice',
      text: '生成器表达式 vs 列表推导式，哪个更省内存？',
      options: ['列表推导式', '生成器表达式', '二者一样', '取决于数据量'],
      answer: '生成器表达式',
    },
    {
      id: 'ch12d-q3', chapterId: 'ch12d', type: 'fill',
      text: '迭代器结束时会抛出 _____ 异常。',
      answer: 'StopIteration',
    },
  ],
  'ch12e': [
    {
      id: 'ch12e-q1', chapterId: 'ch12e', type: 'choice',
      text: '装饰器中保留原函数元信息的装饰器是什么？',
      options: ['@functools.cache', '@functools.wraps', '@functools.lru_cache', '@staticmethod'],
      answer: '@functools.wraps',
    },
    {
      id: 'ch12e-q2', chapterId: 'ch12e', type: 'choice',
      text: '@A @B def func() 的装饰顺序是什么？',
      options: ['先 A 后 B', '先 B 后 A', '按字母顺序', '同时装饰'],
      answer: '先 B 后 A',
    },
    {
      id: 'ch12e-q3', chapterId: 'ch12e', type: 'fill',
      text: '装饰器中用于接收任意数量参数的变量是 *args 和 _____。',
      answer: '**kwargs',
    },
  ],
  'ch25a': [
    {
      id: 'ch25a-q1', chapterId: 'ch25a', type: 'choice',
      text: 'Python 中 GIL（全局解释器锁）的影响是什么？',
      options: ['让多线程能加速所有任务', '同一时刻只有一个线程执行 Python 字节码', '让 Python 运行速度比 C 快', '自动管理内存分配'],
      answer: '同一时刻只有一个线程执行 Python 字节码',
    },
    {
      id: 'ch25a-q2', chapterId: 'ch25a', type: 'choice',
      text: 'asyncio 中 await 关键字的作用是什么？',
      options: ['创建一个新的线程', '暂停当前协程，让出控制权给事件循环', '等待所有协程完成', '将协程转为同步执行'],
      answer: '暂停当前协程，让出控制权给事件循环',
    },
    {
      id: 'ch25a-q3', chapterId: 'ch25a', type: 'fill',
      text: 'Python 中用于创建线程池的类是 concurrent.futures._____',
      answer: 'ThreadPoolExecutor',
    },
  ],
  'ch27a': [
    {
      id: 'ch27a-q1', chapterId: 'ch27a', type: 'choice',
      text: '二分查找的时间复杂度是多少？',
      options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
      answer: 'O(log n)',
    },
    {
      id: 'ch27a-q2', chapterId: 'ch27a', type: 'choice',
      text: '快速排序的核心思想是什么？',
      options: ['每次都把最大数移到末尾', '选基准数，分左右两边递归排序', '将数组重复拆成两半再合并', '每次找最小数放到前面'],
      answer: '选基准数，分左右两边递归排序',
    },
    {
      id: 'ch27a-q3', chapterId: 'ch27a', type: 'fill',
      text: '快速排序的平均时间复杂度是 O(n _____)',
      answer: 'log n',
    },
  ],
};
