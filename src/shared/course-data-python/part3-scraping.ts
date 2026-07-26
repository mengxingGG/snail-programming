// 🕸️ Part 3: 爬虫与自动化 — Ch13 ~ Ch16（15节）
// 参考：Automate the Boring Stuff (3rd Ed), BeautifulSoup docs
import type { Chapter, SectionValidation } from '../types/course';

const requestsGetValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'exact', value: '状态码: 200' },
    { type: 'exact', value: '响应内容:' },
    { type: 'contains', value: '"args": {}' },
    { type: 'contains', value: '"headers": {' },
    { type: 'regex', value: '"User-Agent"\\s*:\\s*"python-requests/[0-9.]+"' },
    { type: 'contains', value: '"url": "https://httpbin.org/get"' },
  ],
};

const requestsUserAgentValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'exact', value: '请求的 URL: https://httpbin.org/get?page=1&size=10' },
    { type: 'exact', value: '服务器看到的 User-Agent:' },
    { type: 'regex', value: '^Mozilla/5\\.0 \\(Windows NT 10\\.0; Win64; x64\\) AppleWebKit/537\\.36 Chrome/\\d+\\.\\d+\\.\\d+\\.\\d+ Safari/537\\.36$' },
  ],
  expectedHint: `请求的 URL: https://httpbin.org/get?page=1&size=10
服务器看到的 User-Agent:
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36`,
};

const seleniumElementLookupValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'regex', value: '^页面标题: .+$' },
    { type: 'regex', value: '^输入框 placeholder: .+$' },
    { type: 'regex', value: '^按钮文字: .+$' },
  ],
  expectedHint: `页面标题: 某个非空标题
输入框 placeholder: 某个非空 placeholder
按钮文字: 某个非空按钮文字`,
};

const seleniumSubmitValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'exact', value: '提交后的 URL: https://httpbin.org/post' },
    { type: 'exact', value: '返回内容:' },
    { type: 'contains', value: '"form": {' },
    { type: 'contains', value: '"custname": "小明"' },
    { type: 'contains', value: '"custtel": "13800138000"' },
    { type: 'contains', value: '"size": "medium"' },
    { type: 'contains', value: '"topping": "bacon"' },
  ],
};

const headlessWaitValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'exact', value: '✅ 无头模式启动成功' },
    { type: 'prefix', value: '页面标题: ' },
    { type: 'exact', value: '最终 URL: https://httpbin.org/delay/2' },
    { type: 'regex', value: '^页面文本长度: \\d+ 字符$' },
    { type: 'exact', value: '浏览器已关闭（无头模式，全程无窗口弹出）' },
  ],
};

const priceHistoryValidation: SectionValidation = {
  mode: 'regex_pattern',
  outputRules: [
    { type: 'exact', value: '📋 机械键盘 K8 Pro 价格历史:' },
    { type: 'regex', value: '^2025-03-20 10:00:00 \\| ¥349\\.00$' },
    { type: 'regex', value: '^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2} \\| ¥329\\.00$' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '上次: ¥349.00 → 本次: ¥329.00' },
    { type: 'exact', value: '🎉 降了 ¥20.00！是时候入手了！' },
  ],
};

const priceMonitorValidation: SectionValidation = {
  mode: 'regex_pattern',
  outputRules: [
    { type: 'exact', value: '🛒 电商价格监控已启动' },
    { type: 'exact', value: '==================================================' },
    { type: 'exact', value: '' },
    { type: 'regex', value: '^\\[\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}\\] 第 1 次检查\\.\\.\\.$' },
    { type: 'exact', value: '商品: 机械键盘 K8 Pro' },
    { type: 'exact', value: '价格: ¥349.00' },
    { type: 'exact', value: '📝 初始记录' },
    { type: 'exact', value: '💤 等待 3 秒后下一次检查...' },
    { type: 'exact', value: '' },
    { type: 'regex', value: '^\\[\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}\\] 第 2 次检查\\.\\.\\.$' },
    { type: 'exact', value: '商品: 机械键盘 K8 Pro' },
    { type: 'exact', value: '价格: ¥329.00' },
    { type: 'exact', value: '🔔 降价提醒！¥349.00 → ¥329.00 (降 ¥20.00)' },
    { type: 'exact', value: '💤 等待 3 秒后下一次检查...' },
    { type: 'exact', value: '' },
    { type: 'regex', value: '^\\[\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}\\] 第 3 次检查\\.\\.\\.$' },
    { type: 'exact', value: '商品: 机械键盘 K8 Pro' },
    { type: 'exact', value: '价格: ¥329.00' },
    { type: 'exact', value: '➡️  价格持平' },
    { type: 'exact', value: '💤 等待 3 秒后下一次检查...' },
    { type: 'exact', value: '' },
    { type: 'regex', value: '^\\[\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}\\] 第 4 次检查\\.\\.\\.$' },
    { type: 'exact', value: '商品: 机械键盘 K8 Pro' },
    { type: 'exact', value: '价格: ¥299.00' },
    { type: 'exact', value: '🔔 降价提醒！¥329.00 → ¥299.00 (降 ¥30.00)' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '✅ 监控完成！共检查 4 次' },
  ],
};

const pandasCityAnalysisValidation: SectionValidation = {
  mode: 'regex_pattern',
  outputRules: [
    { type: 'exact', value: '🐼 城市数据分析报告' },
    { type: 'exact', value: '==================================================' },
    { type: 'regex', value: '^城市\\s+房价均价\\s+平均薪资\\s+Python岗位数\\s+房价收入比$' },
    { type: 'regex', value: '^杭州\\s+42000\\s+14000\\s+2200\\s+3\\.0$' },
    { type: 'regex', value: '^广州\\s+38000\\s+12000\\s+1800\\s+3\\.2$' },
    { type: 'regex', value: '^北京\\s+65000\\s+18000\\s+3500\\s+3\\.6$' },
    { type: 'regex', value: '^上海\\s+72000\\s+19500\\s+4200\\s+3\\.7$' },
    { type: 'regex', value: '^深圳\\s+68000\\s+17500\\s+3900\\s+3\\.9$' },
    { type: 'exact', value: '==================================================' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '📊 房价均价最高: 上海 (72,000元/㎡)' },
    { type: 'exact', value: '📊 Python岗位最多: 上海 (4,200个)' },
    { type: 'exact', value: '📊 平均房价均价: 57,000元/㎡' },
  ],
};

const ch13: Chapter = {
  id: 'ch13',
  title: 'HTTP 与 Requests',
  description: 'GET/POST、状态码、headers',
  sections: [
    {
      id: '13.1',
      kind: 'demo',
      chapterId: 'ch13',
      title: 'HTTP 是什么 — GET/POST 请求',
      content: `## 🌐 HTTP：互联网的通用语言

你每天在浏览器地址栏输入 \`https://www.baidu.com\` 按下回车的那一刻，浏览器做的第一件事就是发送一个 **HTTP 请求**。

### 什么是 HTTP？

**HTTP**（HyperText Transfer Protocol，超文本传输协议）是客户端（你的浏览器/爬虫）和服务器之间沟通的「普通话」。就像你跟朋友借东西要说 "请给我那个"，浏览器跟服务器要网页也要说 "GET / HTTP/1.1"。

### 最常见的两种请求

| 方法 | 比喻 | 用途 |
|------|------|------|
| **GET** | 🛒 逛超市只看不买 | 获取数据，打开网页 |
| **POST** | 📮 寄信/提交表单 | 提交数据，登录/注册 |

### GET 请求长什么样？

\`\`\`http
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0 ...
\`\`\`

服务器看到这个请求，就会把 \`index.html\` 的内容发回来。

### 请求-响应模型

\`\`\`
客户端 (你)          服务器 (网站)
   │                    │
   │──── GET 请求 ────→│
   │                    │
   │←── HTML 响应 ─────│
   │                    │
\`\`\`

> 💡 **通俗理解**：HTTP 就是你和网站之间的「快递协议」——你下单（Request），它发货（Response）。

### URL 的结构

\`\`\`
https://www.example.com:443/path/to/page?key=value&page=1#anchor
└─┬──┘  └──────┬──────┘ └┬─┘ └────┬────┘ └──────┬──────┘ └─┬─┘
 scheme      host       port   path       query      fragment
\`\`\`

在爬虫中，你最常打交道的就是 **host + path + query**。

> 🎯 **记住**：你写的爬虫本质上就是一个自动发送 HTTP 请求的程序，然后从返回的内容里提取你想要的数据。`,
      starterCode: `# HTTP 是什么：概念小节
# 你的浏览器每打开一个网页，都在悄悄发送 HTTP GET 请求
# 爬虫的本质：模拟浏览器发送请求，再解析返回的数据

print("🌐 HTTP 是爬虫的基础 —— 理解了它，就理解了爬虫的一半")
`,
      expectedOutput: `🌐 HTTP 是爬虫的基础 —— 理解了它，就理解了爬虫的一半`,
      hint: '把 HTTP 想象成快递系统：你是买家（客户端），网站是商家（服务器），请求就是下单，响应就是收货。',
    },
    {
      id: '13.2',
      kind: 'demo',
      chapterId: 'ch13',
      title: 'requests.get() — 获取网页内容',
      content: `## 📥 requests.get()：一行代码拿下网页

Python 自带的 \`urllib\` 也能发 HTTP 请求，但 **requests** 库才是公认的「人类友好」选择。安装它：

\`\`\`bash
pip install requests
\`\`\`

### 最简示例

\`\`\`python
import requests

response = requests.get('https://httpbin.org/get')
print(response.text)
\`\`\`

就这么简单！\`requests.get(url)\` 发送 GET 请求，返回一个 **Response 对象**。

### Response 对象的常用属性

| 属性 | 说明 | 类型 |
|------|------|------|
| \`response.text\` | 响应内容（字符串） | str |
| \`response.content\` | 响应内容（二进制） | bytes |
| \`response.status_code\` | 状态码 | int |
| \`response.headers\` | 响应头 | dict |
| \`response.url\` | 最终 URL（可能有重定向） | str |
| \`response.encoding\` | 编码 | str |
| \`response.json()\` | 把 JSON 响应转为 dict | dict |

### text vs content

\`\`\`python
# text：自动解码后的字符串（适合 HTML/文本）
html = response.text

# content：原始字节（适合图片/PDF/视频）
image_bytes = response.content
\`\`\`

> ⚠️ 如果网页返回乱码，试试设置 \`response.encoding = 'utf-8'\` 再读 \`response.text\`。

### 查看请求细节

\`\`\`python
r = requests.get('https://httpbin.org/get')
print(r.status_code)  # 200
print(r.url)          # https://httpbin.org/get
\`\`\`

> 🎯 **核心心法**：\`requests.get(url)\` 拿到 Response，\`.text\` 拿到内容，\`.status_code\` 判断成败。`,
      starterCode: `import requests

# 发送 GET 请求获取 httpbin 的测试接口
response = requests.get('https://httpbin.org/get')
print('状态码:', response.status_code)
print('响应内容:')
print(response.text)
`,
      expectedOutput: `状态码: 200
响应内容:
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate",
    "Host": "httpbin.org",
    "User-Agent": "python-requests/2.*",
    "X-Amzn-Trace-Id": "Root=1-*"
  },
  "origin": "*.*.*.*",
  "url": "https://httpbin.org/get"
}
`,
      hint: '如果 requests 没有安装，打开终端运行 pip install requests。httpbin.org 是一个专门用来测试 HTTP 的免费服务。',
      validation: requestsGetValidation,
    },
    {
      id: '13.3',
      kind: 'demo',
      chapterId: 'ch13',
      title: '状态码与响应头 — 判断是否成功',
      content: `## 🚦 状态码：服务器给你的「暗号」

每次 HTTP 请求，服务器都会返回一个三位数字的状态码。读懂它，你才知道请求到底发生了什么。

### 常见状态码一览

| 状态码 | 含义 | 像什么 |
|--------|------|--------|
| **200** | OK，成功！ | ✅ 正常收货 |
| **301** | 永久重定向 | 🏠 搬家了，新地址在 Location 里 |
| **302** | 临时重定向 | 🚧 临时绕路 |
| **304** | 未修改（缓存） | 📦 跟上次一样，不用再发 |
| **400** | 你的请求有问题 | ❌ 你写错地址了 |
| **403** | 禁止访问 | 🚫 你没权限 |
| **404** | 页面不存在 | 🤷 查无此人 |
| **500** | 服务器内部错误 | 💥 它崩了 |

### 用 requests 检查状态码

\`\`\`python
import requests

response = requests.get('https://httpbin.org/status/404')
print(response.status_code)  # 404

# 优雅地判断
if response.status_code == 200:
    print('✅ 请求成功')
elif response.status_code == 404:
    print('❌ 页面不存在')
else:
    print(f'⚠️ 意外状态码: {response.status_code}')
\`\`\`

### raise_for_status() — 让异常帮你把关

\`\`\`python
import requests

response = requests.get('https://httpbin.org/status/500')
try:
    response.raise_for_status()  # 状态码不是 200 就抛异常
except requests.HTTPError as e:
    print(f'请求失败: {e}')
\`\`\`

> 💡 \`raise_for_status()\` 是爬虫里最好用的安全网——4xx 或 5xx 自动抛异常，防止你拿到错误页面还蒙在鼓里。

### 响应头里藏着什么？

\`\`\`python
response = requests.get('https://httpbin.org/get')
print(response.headers)
# {'Content-Type': 'application/json',
#  'Content-Length': '234',
#  'Server': 'gunicorn/19.9.0',
#  'Date': '...', ...}

# 单个取值（不区分大小写）
content_type = response.headers['Content-Type']
# 或
content_type = response.headers.get('content-type')
\`\`\`

> 🎯 **经验之谈**：爬虫出问题，先看 \`status_code\`！200 = 继续往下解析，其它 = 排查网络/权限/反爬。`,
      starterCode: `import requests

# 测试不同状态码
urls = [
    'https://httpbin.org/get',       # 200 OK
    'https://httpbin.org/status/404',# 404 Not Found
]

for url in urls:
    r = requests.get(url)
    print(f'{url} → status: {r.status_code}')
`,
      expectedOutput: `https://httpbin.org/get → status: 200
https://httpbin.org/status/404 → status: 404
`,
      hint: 'httpbin.org/status/<code> 可以返回任意你指定的状态码，是练习 HTTP 的神器。',
    },
    {
      id: '13.4',
      kind: 'demo',
      chapterId: 'ch13',
      title: '带参数的请求 — headers/user-agent',
      content: `## 🎭 带参数的请求：伪装成「人」

服务器不是傻子。如果你用默认的 Python requests 去爬某些网站，它一眼就认出你是脚本，然后甩你一个 403。

### 为什么要设置 Headers？

每个 HTTP 请求都自带请求头（Headers），其中最关键的识别信息：

\`\`\`http
User-Agent: python-requests/2.31.0    ← 等于自报家门"我是爬虫！"
\`\`\`

### 最常用的请求头设置

\`\`\`python
import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                  'AppleWebKit/537.36 (KHTML, like Gecko) '
                  'Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml',
    'Accept-Language': 'zh-CN,zh;q=0.9',
}

response = requests.get('https://httpbin.org/headers', headers=headers)
print(response.json()['headers']['User-Agent'])
# Mozilla/5.0 (Windows NT 10.0; Win64; x64) ...
\`\`\`

### 带 URL 参数的 GET 请求

\`\`\`python
# 方法一：手动拼接（不推荐）
url = 'https://httpbin.org/get?name=张三&age=25'

# 方法二：用 params 参数（推荐 ✅）
params = {'name': '张三', 'age': 25}
response = requests.get('https://httpbin.org/get', params=params)
print(response.url)
# https://httpbin.org/get?name=%E5%BC%A0%E4%B8%89&age=25
\`\`\`

\`requests\` 帮你自动处理了中文的 URL 编码问题！

### POST 请求

\`\`\`python
# 提交表单数据
data = {'username': 'snail', 'password': '123456'}
response = requests.post(
    'https://httpbin.org/post',
    data=data,
    headers=headers
)
print(response.json()['form'])  # {'username': 'snail', 'password': '123456'}

# 提交 JSON 数据
import json
response = requests.post(
    'https://httpbin.org/post',
    json={'name': 'snail', 'score': 100}
)
\`\`\`

### 超时设置 — 防止永远等下去

\`\`\`python
# 不给超时，请求可能永远卡住
response = requests.get('https://httpbin.org/delay/10', timeout=5)
# 5 秒内不响应 → 抛出 requests.Timeout 异常
\`\`\`

> 🎯 **生存法则**：爬虫三件套——设 User-Agent、加 timeout、调用 raise_for_status()。做到这三点，你已经超越了 50% 的初学者。`,
      starterCode: `import requests

# 设置请求头和参数
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                  'AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
}

params = {'page': 1, 'size': 10}

response = requests.get(
    'https://httpbin.org/get',
    headers=headers,
    params=params,
    timeout=10,
)

print('请求的 URL:', response.url)
print('服务器看到的 User-Agent:')
print(response.json()['headers']['User-Agent'])
`,
      expectedOutput: `请求的 URL: https://httpbin.org/get?page=1&size=10
服务器看到的 User-Agent:
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36
`,
      hint: '如果你看到自己的 User-Agent 不再是 "python-requests/..."，说明伪装成功！真实爬虫必备技能。',
      validation: requestsUserAgentValidation,
    },
  ],
};

const ch14: Chapter = {
  id: 'ch14',
  title: '网页解析：BeautifulSoup',
  description: 'HTML结构、find/find_all、数据提取',
  sections: [
    {
      id: '14.1',
      kind: 'demo',
      chapterId: 'ch14',
      title: 'HTML 结构速览 — 标签/属性/选择器',
      content: `## 🏗️ HTML：网页的骨架

拿到网页源代码后，你需要从一大堆尖括号里找到想要的数据——这就是 HTML 解析。

### HTML 是什么？

**HTML**（HyperText Markup Language）用标签（Tag）来标记内容的「身份」：

\`\`\`html
<html>
  <head>
    <title>蜗牛编程 - 首页</title>
  </head>
  <body>
    <h1>欢迎来到蜗牛编程</h1>
    <p class="intro">Python 爬虫课程</p>
    <a href="/course">开始学习</a>
    <ul id="features">
      <li>实战驱动</li>
      <li>随时可学</li>
    </ul>
  </body>
</html>
\`\`\`

### 三个核心概念

#### 1. 标签（Tag）

\`<h1>欢迎来到蜗牛编程</h1>\`

- 开始标签：\`<h1>\`
- 内容：\`欢迎来到蜗牛编程\`
- 结束标签：\`</h1>\`
- 整个叫「元素」（Element）

#### 2. 属性（Attribute）

\`<a href="/course" class="link primary">开始学习</a>\`

- \`href="/course"\` — 链接目标
- \`class="link primary"\` — CSS 类（可多个）

#### 3. 层级关系

\`\`\`
html
├── head
│   └── title
└── body
    ├── h1
    ├── p
    ├── a
    └── ul
        ├── li
        └── li
\`\`\`

这叫做 **DOM 树**（Document Object Model Tree）。

### 你需要的定位方式

| 方式 | BeautifulSoup 方法 | 适用场景 |
|------|-------------------|----------|
| 按标签名 | \`soup.find('h1')\` | 找第一个 h1 |
| 按 class | \`soup.find(class_='intro')\` | 按 CSS 类定位 |
| 按 id | \`soup.find(id='features')\` | 唯一标识，最精准 |
| 按属性 | \`soup.find('a', href=True)\` | 找有 href 的 a 标签 |
| CSS 选择器 | \`soup.select('ul > li')\` | 复杂选择 |

> 🎯 **一句话总结**：HTML 是一棵树，BeautifulSoup 是你的导航仪——告诉你如何在树上找到那颗你想要的果子。`,
      starterCode: `# HTML 结构速览：概念小节
# 网页的本质是一棵标签树，每个标签有名字、属性、内容
# 爬虫的数据提取 = 在这棵树上找到目标标签 → 取出内容

print("🏗️ HTML 是一棵标签树，学会定位标签就学会了提取数据")
`,
      expectedOutput: `🏗️ HTML 是一棵标签树，学会定位标签就学会了提取数据`,
      hint: '在浏览器中按 F12 打开开发者工具，你能看到任何网页的 HTML 结构和 DOM 树，这是爬虫工程师的日常。',
    },
    {
      id: '14.2',
      kind: 'demo',
      chapterId: 'ch14',
      title: 'BeautifulSoup — 解析 HTML',
      content: `## 🍜 BeautifulSoup：把混乱的 HTML 变成"靓汤"

**BeautifulSoup 4**（简称 BS4）是 Python 最流行的 HTML 解析库。

\`\`\`bash
pip install beautifulsoup4
\`\`\`

### 三步走：拿 → 煮 → 捞

\`\`\`python
from bs4 import BeautifulSoup
import requests

# 1️⃣ 拿到网页
html = requests.get('https://example.com').text

# 2️⃣ 煮成「靓汤」
soup = BeautifulSoup(html, 'html.parser')
#                         ↑ 解析器：html.parser（Python 自带）

# 3️⃣ 捞数据
print(soup.title.text)  # 页面标题
\`\`\`

### 三种解析器

| 解析器 | 优点 | 缺点 |
|--------|------|------|
| \`html.parser\` | Python 自带，不用装 | 速度一般 |
| \`lxml\` | 超快，容错强 | 需要 pip install lxml |
| \`html5lib\` | 最像浏览器 | 最慢 |

> 💡 日常选择：先用 \`html.parser\`（零依赖），需要速度就换 \`lxml\`。

### 直接导航

\`\`\`python
html_doc = """
<html><head><title>蜗牛编程</title></head>
<body>
  <h1>Python 爬虫</h1>
  <p>第一章</p>
  <a href="https://snail.app">官网</a>
</body></html>
"""

soup = BeautifulSoup(html_doc, 'html.parser')

# 点号导航（只取第一个匹配）
print(soup.title)        # <title>蜗牛编程</title>
print(soup.title.text)   # 蜗牛编程
print(soup.h1.text)      # Python 爬虫
print(soup.a['href'])    # https://snail.app
\`\`\`

### prettify() — 让 HTML 可读

\`\`\`python
print(soup.prettify())
# 输出规整缩进的 HTML，方便调试
\`\`\`

> ⚠️ 点号导航（\`soup.h1\`）只能取**第一个**匹配元素。要取全部，用 \`find_all()\`。

> 🎯 **心法**：\`soup = BeautifulSoup(html, 'html.parser')\` 之后，这个 soup 对象就是你的人机交互界面——你在上面点啥它就给你找啥。`,
      starterCode: `from bs4 import BeautifulSoup

html_doc = """
<html>
  <head><title>蜗牛编程 | 学Python</title></head>
  <body>
    <h1>欢迎来到爬虫世界</h1>
    <p class="desc">从这里开始，掌控数据</p>
    <a href="https://snail.app/course" id="start">开始学习</a>
    <a href="https://snail.app/about">关于我们</a>
  </body>
</html>
"""

soup = BeautifulSoup(html_doc, 'html.parser')

# 导航提取
print('标题:', soup.title.text)
print('大标题:', soup.h1.text)
print('描述:', soup.p.text)
print('链接:', soup.a['href'])
`,
      expectedOutput: `标题: 蜗牛编程 | 学Python
大标题: 欢迎来到爬虫世界
描述: 从这里开始，掌控数据
链接: https://snail.app/course
`,
      hint: 'BeautifulSoup 的文档在 crummy.com/software/BeautifulSoup/bs4/doc/ —— 遇到问题查官方文档最快。',
    },
    {
      id: '14.3',
      kind: 'demo',
      chapterId: 'ch14',
      title: 'find/find_all — 精准定位元素',
      content: `## 🔍 find / find_all：你的精准搜索工具

用 \`soup.h1\` 只能拿第一个，真正厉害的是 \`find()\` 和 \`find_all()\`。

### find() vs find_all()

| 方法 | 返回 | 用途 |
|------|------|------|
| \`soup.find('a')\` | 第一个匹配的 Tag | 找唯一目标 |
| \`soup.find_all('a')\` | 所有匹配的 Tag 列表 | 找多个目标 |

\`\`\`python
# find — 返回单个
first_link = soup.find('a')
print(first_link['href'])

# find_all — 返回列表
all_links = soup.find_all('a')
for link in all_links:
    print(link['href'])
\`\`\`

### 按 class 查找

> ⚠️ 注意：\`class\` 是 Python 关键字，所以 BS4 用 \`class_\`（后面加一个下划线）

\`\`\`python
# 找 class="desc" 的元素
soup.find('p', class_='desc')

# 找 class 包含 "tag" 的元素
soup.find_all(class_='tag')

# 多 class 匹配
soup.find_all(class_='post featured')
\`\`\`

### 按 id 查找

\`\`\`python
soup.find(id='start')
# id 在 HTML 中是唯一的，所以 find 就够了
\`\`\`

### 按属性查找

\`\`\`python
# 找所有有 href 属性的 a 标签
soup.find_all('a', href=True)

# 找特定 href 值的链接
soup.find_all('a', href='/course')

# 找多个条件
soup.find_all('a', href=True, class_='nav-link')
\`\`\`

### 按文本内容查找

\`\`\`python
# 精确匹配
soup.find_all(string='开始学习')

# 包含关键词（用正则）
import re
soup.find_all(string=re.compile('学习'))
\`\`\`

### select() — CSS 选择器（高级武器）

\`\`\`python
# 像写 CSS 一样选择元素
soup.select('div.post')         # class="post" 的 div
soup.select('#start')           # id="start"
soup.select('a[href]')          # 有 href 属性的 a
soup.select('ul > li')          # ul 的直接子元素 li
soup.select('p.desc')           # class="desc" 的 p
\`\`\`

> 🎯 **选择策略**：有 id 用 \`find(id=...)\`（最快），有 class 用 \`find_all(class_=...)\`，复杂结构用 \`select()\`。`,
      starterCode: `from bs4 import BeautifulSoup

html_doc = """
<div class="book-list">
  <div class="book">
    <h3 class="title">Python 编程：从入门到实践</h3>
    <span class="price">¥89.00</span>
    <span class="author">Eric Matthes</span>
  </div>
  <div class="book">
    <h3 class="title">流畅的 Python</h3>
    <span class="price">¥139.00</span>
    <span class="author">Luciano Ramalho</span>
  </div>
  <div class="book">
    <h3 class="title">Python Cookbook</h3>
    <span class="price">¥108.00</span>
    <span class="author">David Beazley</span>
  </div>
</div>
"""

soup = BeautifulSoup(html_doc, 'html.parser')

# 找到所有书本
books = soup.find_all('div', class_='book')
for book in books:
    title = book.find('h3', class_='title').text
    price = book.find('span', class_='price').text
    print(f'{title} — {price}')
`,
      expectedOutput: `Python 编程：从入门到实践 — ¥89.00
流畅的 Python — ¥139.00
Python Cookbook — ¥108.00
`,
      hint: 'find_all() 返回的是一个 ResultSet（类似列表），可以遍历、切片、取长度。如果为空列表，说明你的查询条件没匹配到任何东西。',
    },
    {
      id: '14.4',
      kind: 'demo',
      chapterId: 'ch14',
      title: '提取数据 — 文字/链接/属性',
      content: `## 📦 提取数据：把网页内容变成 Python 数据

定位到元素只是第一步，提取其中的内容才是最终目的。

### 提取文本

\`\`\`python
tag = soup.find('h1')

# .text / .get_text() — 获取所有文本（包括子标签的）
print(tag.text)        # 蜗牛编程 - Python 爬虫

# .string — 仅当标签内只有文本时可用
print(tag.string)      # 如果标签内还有子标签，返回 None

# .get_text(strip=True) — 去掉首尾空白
print(tag.get_text(strip=True))
\`\`\`

> 💡 99% 的情况下用 \`.text\` 就够了。\`.string\` 只在标签内是纯文本时才靠谱。

### 提取属性

\`\`\`python
tag = soup.find('a')

# 字典方式（KeyError if not exist）
href = tag['href']

# get 方式（安全，不存在返回 None）
href = tag.get('href')
class_value = tag.get('class')  # 可能是列表！
\`\`\`

### 实战案例：提取一个新闻列表

\`\`\`python
from bs4 import BeautifulSoup

html = '''
<ul class="news-list">
  <li>
    <a href="/news/1">Python 3.13 发布</a>
    <span class="date">2025-01-15</span>
  </li>
  <li>
    <a href="/news/2">Django 5.1 新特性</a>
    <span class="date">2025-01-10</span>
  </li>
</ul>
'''

soup = BeautifulSoup(html, 'html.parser')
news = []

for li in soup.find_all('li'):
    a_tag = li.find('a')
    title = a_tag.text
    link = a_tag['href']
    date = li.find('span', class_='date').text
    news.append({'title': title, 'link': link, 'date': date})

print(news)
# [{'title': 'Python 3.13 发布', 'link': '/news/1', 'date': '2025-01-15'},
#  {'title': 'Django 5.1 新特性', 'link': '/news/2', 'date': '2025-01-10'}]
\`\`\`

### 常见陷阱与对策

| 陷阱 | 对策 |
|------|------|
| AttributeError: 'NoneType' has no attribute 'text' | 先判断 \`if tag:\` |
| KeyError: 'href' | 用 \`tag.get('href')\` |
| 文本有多余的 \\n 和空格 | 用 \`.get_text(strip=True)\` |

\`\`\`python
# 安全的提取模式
tag = soup.find('h2')
if tag:
    text = tag.get_text(strip=True)
else:
    text = ''
\`\`\`

> 🎯 **黄金法则**：先找到再提取，永远假设元素可能不存在，做好防御。爬虫不是网线一拔就完事的——网站结构随时可能变。`,
      starterCode: `from bs4 import BeautifulSoup

html_doc = """
<div class="products">
  <div class="product" data-id="1001">
    <img src="iphone.jpg" alt="iPhone 16">
    <h4>iPhone 16 Pro</h4>
    <span class="price">¥8999</span>
    <span class="rating">4.9分</span>
  </div>
  <div class="product" data-id="1002">
    <img src="macbook.jpg" alt="MacBook Air">
    <h4>MacBook Air M4</h4>
    <span class="price">¥10999</span>
    <span class="rating">4.8分</span>
  </div>
</div>
"""

soup = BeautifulSoup(html_doc, 'html.parser')

products = []
for item in soup.find_all('div', class_='product'):
    name = item.find('h4')
    price = item.find('span', class_='price')
    rating = item.find('span', class_='rating')
    img = item.find('img')

    products.append({
        'id': item.get('data-id'),
        'name': name.text if name else '未知',
        'price': price.text if price else 'N/A',
        'rating': rating.text if rating else '暂无',
        'image': img.get('alt') if img else '',
    })

for p in products:
    print(f"{p['name']} | {p['price']} | {p['rating']} | img: {p['image']}")
`,
      expectedOutput: `iPhone 16 Pro | ¥8999 | 4.9分 | img: iPhone 16
MacBook Air M4 | ¥10999 | 4.8分 | img: MacBook Air
`,
      hint: '养成好习惯：用 .get() 取属性，用 if tag: 判空。爬虫崩溃的第一大原因就是 NoneType 没有 .text 属性。',
    },
  ],
};

const ch15: Chapter = {
  id: 'ch15',
  title: '浏览器自动化：Selenium',
  description: '操控真实浏览器、点击/输入/等待',
  sections: [
    {
      id: '15.1',
      kind: 'demo',
      chapterId: 'ch15',
      title: 'Selenium 是什么 — 操控真实浏览器',
      content: `## 🤖 Selenium：让你的 Python 像人一样「用」浏览器

### 为什么需要 Selenium？

requests + BeautifulSoup 很好用——前提是服务器**直接返回 HTML**。但现代网站大量使用 JavaScript 动态渲染内容：

\`\`\`html
<!-- 你拿到的 HTML -->
<div id="app"></div>
<!-- 实际内容由 JS 在浏览器中渲染 -->
\`\`\`

用 requests 只能拿到空壳。这时候就需要 **Selenium**——它会启动一个真实浏览器，执行 JS，渲染页面，让你拿到最终的内容。

### Selenium 能做什么？

| 场景 | 说明 |
|------|------|
| 📄 动态渲染页面 | JS 生成的内容也能拿到 |
| 🖱️ 点击按钮/链接 | 模拟用户点击 |
| ⌨️ 输入文字 | 填表单、搜索框 |
| 📸 截图 | 保存页面截图 |
| ⏳ 等待加载 | 等到内容出现再操作 |

### 安装

\`\`\`bash
pip install selenium
\`\`\`

### WebDriver：浏览器的「遥控器」

Selenium 不是浏览器本身，它通过 **WebDriver** 来控制浏览器。就像遥控器控制电视：

\`\`\`
Python 代码 → Selenium → WebDriver → Chrome/Firefox/Edge
\`\`\`

你需要下载对应浏览器的 WebDriver（如 ChromeDriver），或者用 Selenium 4.6+ 自带的 \`webdriver_manager\` 自动管理：

\`\`\`bash
pip install webdriver-manager
\`\`\`

\`\`\`python
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# 自动下载匹配的 ChromeDriver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get('https://www.baidu.com')
print(driver.title)
driver.quit()
\`\`\`

### 无头模式（Headless）

不想看到浏览器窗口弹出来？用无头模式：

\`\`\`python
from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument('--headless')  # 后台运行，不显示窗口
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')

driver = webdriver.Chrome(options=options)
\`\`\`

> 🎯 **什么时候用 Selenium？** 当 requests 拿不到你想要的内容（JS 渲染），或者需要模拟点击/翻页/登录等复杂交互时。否则 requests 更快更省资源。`,
      starterCode: `# Selenium 概念小节
# Selenium 启动真实浏览器，执行 JavaScript，模拟人的操作
# 适用场景：JS 动态渲染、登录、翻页、截图
# 不适用场景：简单的静态页面（用 requests 更快）

print("🤖 Selenium = 浏览器的遥控器，让 Python 像真人一样操作网页")
`,
      expectedOutput: `🤖 Selenium = 浏览器的遥控器，让 Python 像真人一样操作网页`,
      hint: '第一次用 Selenium 需要下载 WebDriver。用 webdriver-manager 可以自动完成这一步，省心很多。',
    },
    {
      id: '15.2',
      kind: 'demo',
      chapterId: 'ch15',
      title: '打开网页 + 查找元素',
      content: `## 🌍 打开网页 + 查找元素

### 启动浏览器并打开网页

\`\`\`python
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get('https://httpbin.org')  # 打开网址

print(driver.title)   # 页面标题
print(driver.current_url)  # 当前 URL
\`\`\`

### Selenium 的 8 种定位方式

\`\`\`python
from selenium.webdriver.common.by import By

# 1. ID（最推荐，唯一且快）
element = driver.find_element(By.ID, 'username')

# 2. Name
element = driver.find_element(By.NAME, 'email')

# 3. Class Name
element = driver.find_element(By.CLASS_NAME, 'submit-btn')

# 4. Tag Name
element = driver.find_element(By.TAG_NAME, 'h1')

# 5. CSS Selector（灵活强大）
element = driver.find_element(By.CSS_SELECTOR, '#app > div.main')

# 6. XPath（万能的定位方式）
element = driver.find_element(By.XPATH, '//button[@type="submit"]')

# 7. Link Text（精确匹配链接文字）
element = driver.find_element(By.LINK_TEXT, '登录')

# 8. Partial Link Text（模糊匹配链接文字）
element = driver.find_element(By.PARTIAL_LINK_TEXT, '登')
\`\`\`

### find_element vs find_elements

| 方法 | 返回 | 找不到时 |
|------|------|---------|
| \`find_element()\` | 单个元素 | 抛出 NoSuchElementException |
| \`find_elements()\` | 列表（可能为空） | 返回空列表 |

### 实战：打开百度并获取搜索结果

\`\`\`python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Chrome()
driver.get('https://www.baidu.com')

# 找到搜索框，输入内容
search_box = driver.find_element(By.ID, 'kw')
search_box.send_keys('Python Selenium 教程' + Keys.ENTER)

time.sleep(2)  # 等搜索结果加载

# 获取所有搜索结果的标题
results = driver.find_elements(By.CSS_SELECTOR, '.result h3')
for result in results:
    print(result.text)

driver.quit()
\`\`\`

> ⚠️ 用 \`time.sleep()\` 只是权宜之计，下一节会讲更优雅的等待方式。

> 🎯 **定位选择优先级**：ID > CSS Selector > XPath > 其它。不到万不得已，不用 XPath（太脆弱）。`,
      starterCode: `from selenium import webdriver
from selenium.webdriver.common.by import By

# 启动浏览器并打开一个测试页面
driver = webdriver.Chrome()
driver.get('https://httpbin.org/forms/post')

# 查找表单元素
form_title = driver.find_element(By.TAG_NAME, 'h1')
print('页面标题:', form_title.text)

# 查找输入框
custname = driver.find_element(By.NAME, 'custname')
custname.send_keys('蜗牛编程学员')
print('输入框 placeholder:', custname.get_attribute('placeholder'))

# 查找提交按钮
submit_btn = driver.find_element(By.CSS_SELECTOR, 'button[type="submit"]')
print('按钮文字:', submit_btn.text)

driver.quit()
`,
      expectedOutput: `页面标题: HTML form
输入框 placeholder: e.g. John Smith
按钮文字: Submit order
`,
      hint: '如果 Selenium 找不到元素，先用浏览器的 F12 开发者工具确认元素确实存在，再检查你的选择器是否正确。',
      validation: seleniumElementLookupValidation,
    },
    {
      id: '15.3',
      kind: 'demo',
      chapterId: 'ch15',
      title: '点击/输入/等待 — 模拟真人操作',
      content: `## 🎮 模拟真人操作：点击、输入、等待

找到元素只是开始，交互才是精髓。

### 点击

\`\`\`python
# 找到按钮并点击
button = driver.find_element(By.ID, 'submit')
button.click()

# 或者找到链接并点击
link = driver.find_element(By.LINK_TEXT, '下一页')
link.click()
\`\`\`

### 输入

\`\`\`python
# 输入文字
input_box = driver.find_element(By.NAME, 'username')
input_box.send_keys('snail')

# 清空后输入
input_box.clear()
input_box.send_keys('new_name')

# 输入特殊按键
from selenium.webdriver.common.keys import Keys
input_box.send_keys('Python' + Keys.ENTER)       # 回车
input_box.send_keys(Keys.CONTROL + 'a')           # Ctrl+A
\`\`\`

### 智能等待（重点！）

\`time.sleep(3)\` 的问题是：快了没加载完，慢了浪费时间。Selenium 提供了两种智能等待：

#### 1. 隐式等待（Implicit Wait）

\`\`\`python
driver.implicitly_wait(10)  # 最多等 10 秒
# 全局生效：每次查找元素，找不到就等，找到了立刻继续
\`\`\`

#### 2. 显式等待（Explicit Wait）— 推荐 ✅

\`\`\`python
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# 等待某个元素出现
element = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, 'result'))
)

# 等待元素可点击
button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, '.load-more'))
)
button.click()

# 等待元素可见
element = WebDriverWait(driver, 10).until(
    EC.visibility_of_element_located((By.CLASS_NAME, 'post'))
)
\`\`\`

### 常用 Expected Conditions

| 条件 | 含义 |
|------|------|
| \`presence_of_element_located\` | 元素存在于 DOM（不一定可见） |
| \`visibility_of_element_located\` | 元素可见（宽高 > 0） |
| \`element_to_be_clickable\` | 元素可见且可点击 |
| \`text_to_be_present_in_element\` | 元素包含指定文本 |
| \`title_contains\` | 标题包含指定文本 |

### 完整的翻页爬取示例

\`\`\`python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get('https://quotes.toscrape.com/js/')

quotes = []
page = 1

while True:
    # 等待名言加载
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, 'quote'))
    )

    # 抓取当前页
    for quote_elem in driver.find_elements(By.CLASS_NAME, 'quote'):
        text = quote_elem.find_element(By.CLASS_NAME, 'text').text
        author = quote_elem.find_element(By.CLASS_NAME, 'author').text
        quotes.append({'text': text, 'author': author})

    print(f'已抓取第 {page} 页，共 {len(quotes)} 条名言')

    # 尝试点"下一页"
    try:
        next_btn = driver.find_element(By.CSS_SELECTOR, 'li.next > a')
        next_btn.click()
        page += 1
    except:
        print('没有下一页了！')
        break

driver.quit()
print(f'完成！共抓取 {len(quotes)} 条名言')
\`\`\`

### 其它常用操作

\`\`\`python
# 截图
driver.save_screenshot('page.png')

# 执行 JavaScript
driver.execute_script('window.scrollTo(0, document.body.scrollHeight);')

# 获取元素属性
value = element.get_attribute('value')

# 切换窗口
driver.switch_to.window(driver.window_handles[1])

# 下拉选择
from selenium.webdriver.support.ui import Select
select = Select(driver.find_element(By.NAME, 'category'))
select.select_by_visible_text('Python')
\`\`\`

> 🎯 **黄金法则**：永远用显式等待代替 \`time.sleep()\`。它让你的爬虫既快（不等多余的）又稳（不因加载慢而崩溃）。`,
      starterCode: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome()
driver.get('https://httpbin.org/forms/post')

# 找到输入框并填写
custname = driver.find_element(By.NAME, 'custname')
custname.clear()
custname.send_keys('小明')

# 填写电话
phone = driver.find_element(By.NAME, 'custtel')
phone.send_keys('13800138000')

# 选择 pizza 尺寸（中等）
medium = driver.find_element(
    By.CSS_SELECTOR, 'input[name="size"][value="medium"]'
)
medium.click()

# 勾选配料
bacon = driver.find_element(By.CSS_SELECTOR, 'input[name="topping"][value="bacon"]')
bacon.click()

# 点击提交
submit = driver.find_element(By.CSS_SELECTOR, 'button[type="submit"]')
submit.click()

# 等待结果页加载
WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.TAG_NAME, 'pre'))
)

print('提交后的 URL:', driver.current_url)
print('返回内容:')
print(driver.find_element(By.TAG_NAME, 'pre').text[:200])

driver.quit()
`,
      expectedOutput: `提交后的 URL: https://httpbin.org/post
返回内容:
{
  "args": {},
  "data": "",
  "files": {},
  "form": {
    "custname": "小明",
    "custtel": "13800138000",
    "size": "medium",
    "topping": "bacon"
  },
  "headers": {
    ...
`,
      hint: '显式等待的秘诀：想一想"我要等什么出现？"然后选用对应的 expected_conditions。最常用的是 presence_of_element_located。',
      validation: seleniumSubmitValidation,
    },
    {
      id: '15.4',
      kind: 'demo',
      chapterId: 'ch15',
      title: '无头模式 + 等待策略详解',
      content: `## 👻 无头模式 + 等待策略：爬虫的「隐身」与「耐心」

服务器上的爬虫不需要弹浏览器窗口——既浪费资源又容易出问题。**无头模式**（Headless）让浏览器在后台默默工作。

### 无头模式完整配置

\`\`\`python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument('--headless=new')  # Chrome 112+ 推荐
options.add_argument('--no-sandbox')     # Linux 服务器必备
options.add_argument('--disable-dev-shm-usage')  # 避免内存不足
options.add_argument('--window-size=1920,1080')  # 设窗口大小
options.add_argument('--disable-blink-features=AutomationControlled')  # 反检测
options.add_argument('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) ...')

driver = webdriver.Chrome(options=options)
driver.get('https://example.com')
print(driver.title)  # 正常获取，但没有窗口弹出
driver.quit()
\`\`\`

### 隐式等待 vs 显式等待

| 特性 | 隐式等待 | 显式等待 |
|------|----------|----------|
| 设置方式 | \`driver.implicitly_wait(n)\` | \`WebDriverWait(driver, n).until(...)\` |
| 作用范围 | 全局，整个 driver 生命周期 | 每次调用单独设置 |
| 等待条件 | 仅「元素存在于 DOM」 | 任意条件（可见、可点击、文本…） |
| 灵活性 | 低 | 高 ✅ |
| 推荐度 | ⭐⭐ | ⭐⭐⭐⭐⭐ |

> ⚠️ **不要混用！** 隐式等待和显式等待同时使用会产生不可预测的超时时间。选显式等待就对了。

### WebDriverWait 常用模式

\`\`\`python
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

wait = WebDriverWait(driver, 10, poll_frequency=0.5)  # 每 0.5 秒检查一次

# 模式1：等待元素出现（DOM 中存在即可，不一定可见）
el = wait.until(EC.presence_of_element_located((By.ID, 'content')))

# 模式2：等待元素可见（宽高 > 0，用户能看到）
el = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, 'result')))

# 模式3：等待元素可点击（可见 + 可交互）
btn = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '.submit-btn')))
btn.click()

# 模式4：等待元素消失（加载完成标志）
wait.until(EC.invisibility_of_element_located((By.CLASS_NAME, 'spinner')))

# 模式5：等待文本出现
wait.until(EC.text_to_be_present_in_element((By.ID, 'status'), '完成'))

# 模式6：自定义条件
wait.until(lambda d: d.execute_script('return document.readyState') == 'complete')
\`\`\`

### 实战：无头 + 显式等待爬取

\`\`\`python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

options = Options()
options.add_argument('--headless=new')
options.add_argument('--window-size=1920,1080')

driver = webdriver.Chrome(options=options)
driver.get('https://quotes.toscrape.com/js/')

# 等待名言加载完成
wait = WebDriverWait(driver, 10)
quotes = wait.until(
    EC.presence_of_all_elements_located((By.CLASS_NAME, 'quote'))
)

for quote in quotes:
    text = quote.find_element(By.CLASS_NAME, 'text').text
    author = quote.find_element(By.CLASS_NAME, 'author').text
    print(f'「{text}」—— {author}')

driver.quit()
\`\`\`

> 🎯 **最佳实践总结**：① 服务器上跑用 \`--headless=new\`；② 等待永远用显式等待；③ \`poll_frequency=0.5\` 减少 CPU 空转；④ 等待条件选最具体那个（可点击 > 可见 > 存在）。`,
      starterCode: `from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# 配置无头模式
options = Options()
options.add_argument('--headless=new')
options.add_argument('--window-size=1920,1080')

driver = webdriver.Chrome(options=options)
driver.get('https://httpbin.org/delay/2')  # 故意延迟 2 秒的测试页

# 显式等待：等 body 出现
wait = WebDriverWait(driver, 10, poll_frequency=0.5)
body = wait.until(EC.presence_of_element_located((By.TAG_NAME, 'body')))

print('✅ 无头模式启动成功')
print(f'页面标题: {driver.title}')
print(f'最终 URL: {driver.current_url}')
print(f'页面文本长度: {len(body.text)} 字符')

driver.quit()
print('浏览器已关闭（无头模式，全程无窗口弹出）')
`,
      expectedOutput: `✅ 无头模式启动成功
页面标题: httpbin.org
最终 URL: https://httpbin.org/delay/2
页面文本长度: * 字符
浏览器已关闭（无头模式，全程无窗口弹出）
`,
      hint: '--headless=new 是 Chrome 112+ 的新版无头模式，渲染行为更接近有头模式。旧版 --headless 已不推荐使用。',
      validation: headlessWaitValidation,
    },
  ],
};

const ch16: Chapter = {
  id: 'ch16',
  title: '数据存储',
  description: 'CSV、JSON、SQLite、pandas预览',
  sections: [
    {
      id: '16.1',
      kind: 'demo',
      chapterId: 'ch16',
      title: 'CSV — 表格数据最通用的格式',
      content: `## 📊 CSV：最朴素也最可靠的存储格式

爬到了数据，总不能只 print 一下就算了吧？**CSV**（Comma-Separated Values）是最简单也最通用的表格存储格式——Excel 能打开，数据库能导入，任何语言都能读写。

### CSV 长什么样？

\`\`\`csv
书名,作者,价格
Python编程：从入门到实践,Eric Matthes,89
流畅的Python,Luciano Ramalho,139
Python Cookbook,David Beazley,108
\`\`\`

### Python 内建 csv 模块

\`\`\`python
import csv

# 写入
with open('books.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow(['书名', '作者', '价格'])  # 写表头
    writer.writerow(['Python编程', 'Eric', 89])
    writer.writerow(['流畅的Python', 'Luciano', 139])

# 读取
with open('books.csv', 'r', encoding='utf-8-sig') as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)
\`\`\`

### DictWriter / DictReader — 更直观

\`\`\`python
import csv

# 写入字典
data = [
    {'name': '茶小卷', 'score': 95, 'level': 'A'},
    {'name': '小熊猫', 'score': 88, 'level': 'B'},
    {'name': '海獭', 'score': 76, 'level': 'C'},
]

with open('scores.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.DictWriter(f, fieldnames=['name', 'score', 'level'])
    writer.writeheader()
    writer.writerows(data)

# 读取为字典
with open('scores.csv', 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f"{row['name']}：{row['score']}分")
\`\`\`

### 注意事项

| 要点 | 说明 |
|------|------|
| \`newline=''\` | Windows 下必须加，否则会出现多余空行 |
| \`encoding='utf-8-sig'\` | 带 BOM 的 UTF-8，Excel 能正确显示中文 |
| DictWriter 的 fieldnames | 指定列的顺序和名称 |

> 💡 爬虫数据存储首选 CSV：简单、通用、人类可读、Excel 兼容。`,
      starterCode: `import csv

# 模拟爬到的数据
books = [
    {'title': 'Python编程：从入门到实践', 'author': 'Eric Matthes', 'price': '¥89'},
    {'title': '流畅的Python', 'author': 'Luciano Ramalho', 'price': '¥139'},
    {'title': 'Python Cookbook', 'author': 'David Beazley', 'price': '¥108'},
    {'title': 'Automate the Boring Stuff', 'author': 'Al Sweigart', 'price': '¥79'},
]

# 写入 CSV
with open('books.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.DictWriter(f, fieldnames=['title', 'author', 'price'])
    writer.writeheader()
    writer.writerows(books)

print('✅ 成功写入 books.csv')

# 读回来验证
with open('books.csv', 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f"《{row['title']}》— {row['author']} | {row['price']}")
`,
      expectedOutput: `✅ 成功写入 books.csv
《Python编程：从入门到实践》— Eric Matthes | ¥89
《流畅的Python》— Luciano Ramalho | ¥139
《Python Cookbook》— David Beazley | ¥108
《Automate the Boring Stuff》— Al Sweigart | ¥79
`,
      hint: '用 utf-8-sig 编码可以让 Excel 正确打开中文 CSV。如果用普通 utf-8，Excel 打开中文会乱码。',
    },
    {
      id: '16.2',
      kind: 'demo',
      chapterId: 'ch16',
      title: 'JSON — 和 API 打交道必备',
      content: `## 📦 JSON：数据交换的「世界语」

如果说 CSV 是表格的王，那 **JSON**（JavaScript Object Notation）就是 API 和结构化数据的王。

### JSON 长什么样？

\`\`\`json
{
  "name": "蜗牛编程",
  "students": 10000,
  "active": true,
  "courses": ["Python", "爬虫", "Web"],
  "founder": {
    "name": "茶小卷",
    "years": 5
  }
}
\`\`\`

### JSON ↔ Python 对照表

| JSON | Python |
|------|--------|
| \`{}\` | dict |
| \`[]\` | list |
| \`"string"\` | str |
| \`123\` / \`3.14\` | int / float |
| \`true\` / \`false\` | True / False |
| \`null\` | None |

### Python 内建 json 模块

\`\`\`python
import json

# Python → JSON（序列化）
data = {
    'name': '茶小卷',
    'skills': ['Python', '爬虫', '教学'],
    'level': 99,
}

json_str = json.dumps(data, ensure_ascii=False, indent=2)
print(json_str)

# 写入文件
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
\`\`\`

\`\`\`python
# JSON → Python（反序列化）
json_str = '{"name": "茶小卷", "skills": ["Python", "爬虫"]}'
data = json.loads(json_str)
print(data['name'])  # 茶小卷

# 从文件读取
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
\`\`\`

### dump vs dumps, load vs loads

| 函数 | 输入 | 输出 | 助记 |
|------|------|------|------|
| \`json.dumps(obj)\` | Python 对象 | JSON 字符串 | **s** = string |
| \`json.dump(obj, f)\` | Python 对象 → 文件 | 写入文件 | 无 s = 文件 |
| \`json.loads(s)\` | JSON 字符串 | Python 对象 | **s** = string |
| \`json.load(f)\` | 文件 → Python 对象 | Python 对象 | 无 s = 文件 |

### 关键参数

\`\`\`python
json.dumps(data,
    ensure_ascii=False,  # 不转义中文（重要！）
    indent=2,            # 缩进，让 JSON 可读
    sort_keys=True,      # 按 key 排序
    default=str,         # 遇到无法序列化的对象时转字符串
)
\`\`\`

> 🎯 **爬虫工作流**：API 返回 JSON → \`json.loads()\` → Python 字典 → 提取需要的数据 → 存 CSV 或数据库。`,
      starterCode: `import json

# 模拟从 API 获取的数据
api_response = {
    'status': 'success',
    'count': 3,
    'posts': [
        {
            'id': 1,
            'title': 'Python爬虫入门指南',
            'author': '茶小卷',
            'tags': ['Python', '爬虫', '入门'],
            'views': 1520,
        },
        {
            'id': 2,
            'title': 'BeautifulSoup实战：解析豆瓣',
            'author': '小熊猫',
            'tags': ['爬虫', 'BeautifulSoup', '实战'],
            'views': 3400,
        },
        {
            'id': 3,
            'title': 'Selenium自动化测试',
            'author': '海獭',
            'tags': ['Selenium', '自动化', '测试'],
            'views': 890,
        },
    ],
}

# 写入 JSON 文件
with open('posts.json', 'w', encoding='utf-8') as f:
    json.dump(api_response, f, ensure_ascii=False, indent=2)

print('✅ 已写入 posts.json')

# 读回来并提取标题
with open('posts.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"共 {data['count']} 篇文章：")
for post in data['posts']:
    tags = ', '.join(post['tags'])
    print(f"  [{post['id']}]《{post['title']}》by {post['author']} (👀 {post['views']})")
    print(f"      标签: {tags}")
`,
      expectedOutput: `✅ 已写入 posts.json
共 3 篇文章：
  [1]《Python爬虫入门指南》by 茶小卷 (👀 1520)
      标签: Python, 爬虫, 入门
  [2]《BeautifulSoup实战：解析豆瓣》by 小熊猫 (👀 3400)
      标签: 爬虫, BeautifulSoup, 实战
  [3]《Selenium自动化测试》by 海獭 (👀 890)
      标签: Selenium, 自动化, 测试
`,
      hint: '别忘了 ensure_ascii=False！否则所有中文都会被转成 \\\\uXXXX 格式，人类完全没法读。',
    },
    {
      id: '16.3',
      kind: 'demo',
      chapterId: 'ch16',
      title: 'SQLite — 轻量数据库入门',
      content: `## 🗄️ SQLite：口袋里的小型数据库

CSV 和 JSON 适合小数据。但当你有几万条数据、需要快速查询时，数据库才是正解。**SQLite** 是 Python 自带的轻量数据库——不需要安装服务器，数据就是一个文件。

### 为什么选 SQLite？

- ✅ Python 自带 \`sqlite3\` 模块，零配置
- ✅ 整个数据库就是一个 .db 文件
- ✅ 支持标准 SQL
- ✅ 适合单机/桌面/移动应用

### 基本用法

\`\`\`python
import sqlite3

# 连接（不存在就创建）
conn = sqlite3.connect('crawler.db')
cursor = conn.cursor()

# 创建表
cursor.execute('''
    CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        url TEXT UNIQUE,
        author TEXT,
        date TEXT
    )
''')

# 插入数据
cursor.execute(
    'INSERT INTO articles (title, url, author, date) VALUES (?, ?, ?, ?)',
    ('Python爬虫指南', 'https://example.com/1', '茶小卷', '2025-03-15')
)

# 批量插入
data = [
    ('BS4实战', 'https://example.com/2', '小熊猫', '2025-03-16'),
    ('Selenium入门', 'https://example.com/3', '海獭', '2025-03-17'),
]
cursor.executemany(
    'INSERT OR IGNORE INTO articles (title, url, author, date) VALUES (?, ?, ?, ?)',
    data
)

conn.commit()  # 别忘了提交！
\`\`\`

### 查询数据

\`\`\`python
# 查全部
cursor.execute('SELECT * FROM articles')
rows = cursor.fetchall()
for row in rows:
    print(row)

# 条件查询
cursor.execute(
    'SELECT title, author FROM articles WHERE author = ?',
    ('茶小卷',)
)
results = cursor.fetchall()

# 统计
cursor.execute('SELECT COUNT(*) FROM articles')
count = cursor.fetchone()[0]
print(f'共 {count} 篇文章')
\`\`\`

### 用 with 语句（推荐）

\`\`\`python
# 自动 commit，异常自动 rollback
with sqlite3.connect('crawler.db') as conn:
    conn.execute('INSERT INTO articles (title, url) VALUES (?, ?)',
                 ('新文章', 'https://example.com/4'))
# with 结束后自动提交
\`\`\`

### 连接 SQLite 和爬虫

\`\`\`python
import sqlite3
import requests
from bs4 import BeautifulSoup

conn = sqlite3.connect('news.db')
conn.execute('''
    CREATE TABLE IF NOT EXISTS news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        link TEXT UNIQUE,
        date TEXT
    )
''')

def crawl_and_store(start_url):
    response = requests.get(start_url, headers={'User-Agent': 'Mozilla/5.0'})
    soup = BeautifulSoup(response.text, 'html.parser')
    for item in soup.find_all('article'):
        title = item.find('h2').text if item.find('h2') else ''
        link = item.find('a')['href'] if item.find('a') else ''
        try:
            conn.execute(
                'INSERT INTO news (title, link) VALUES (?, ?)',
                (title, link)
            )
        except sqlite3.IntegrityError:
            pass  # 重复链接跳过
    conn.commit()
\`\`\`

> ⚠️ 三个最容易忘的：\`conn.commit()\`（提交）、\`conn.close()\`（关闭）、SQL 中的 \`?\` 占位符（防注入）。

> 🎯 **SQLite 之于爬虫**：它是爬虫数据持久化的最佳拍档。小项目一个 .db 文件走天下，比 MySQL 省心一万倍。`,
      starterCode: `import sqlite3

# 连接数据库（不存在则创建）
conn = sqlite3.connect(':memory:')  # 内存数据库，练习用
cursor = conn.cursor()

# 创建学生成绩表
cursor.execute('''
    CREATE TABLE scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        subject TEXT NOT NULL,
        score INTEGER
    )
''')

# 批量插入数据
students = [
    ('小明', 'Python', 92),
    ('小红', 'Python', 88),
    ('小明', '数学', 85),
    ('小红', '数学', 95),
    ('小刚', 'Python', 78),
    ('小刚', '数学', 82),
]
cursor.executemany(
    'INSERT INTO scores (name, subject, score) VALUES (?, ?, ?)',
    students
)
conn.commit()

# 查询：谁 Python 考了最高分？
cursor.execute(
    'SELECT name, score FROM scores WHERE subject = ? ORDER BY score DESC',
    ('Python',)
)
print('Python 成绩排名：')
for name, score in cursor.fetchall():
    print(f'  {name}: {score}分')

# 查询：每个人的平均分
cursor.execute('''
    SELECT name, ROUND(AVG(score), 1) as avg_score
    FROM scores
    GROUP BY name
    ORDER BY avg_score DESC
''')
print('\\n平均分排名：')
for name, avg in cursor.fetchall():
    print(f'  {name}: {avg}分')

conn.close()
`,
      expectedOutput: `Python 成绩排名：
  小明: 92分
  小红: 88分
  小刚: 78分

平均分排名：
  小红: 91.5分
  小明: 88.5分
  小刚: 80.0分
`,
      hint: '用 :memory: 创建的 SQLite 数据库只存在内存中，程序结束就消失——非常适合练习和测试。',
    },
    {
      id: '16.4',
      kind: 'demo',
      chapterId: 'ch16',
      title: 'pandas 预览 — 数据分析的瑞士军刀',
      content: `## 🐼 pandas 预览：数据分析的瑞士军刀

**pandas** 是 Python 数据分析的基石。你可以把它理解成"超级 Excel"——在代码里操作表格数据，而且比 Excel 快得多、强得多。

\`\`\`bash
pip install pandas
\`\`\`

### 核心数据结构：DataFrame

\`\`\`python
import pandas as pd

# DataFrame 就是一张表格
df = pd.DataFrame({
    '姓名': ['小明', '小红', '小刚'],
    'Python': [92, 88, 78],
    '数学': [85, 95, 82],
})
print(df)
\`\`\`

### 读取和写入

\`\`\`python
# 读取 CSV
df = pd.read_csv('books.csv')

# 读取 JSON
df = pd.read_json('posts.json')

# 读取 Excel
df = pd.read_excel('data.xlsx')

# 从 SQL 读取
import sqlite3
conn = sqlite3.connect('crawler.db')
df = pd.read_sql_query('SELECT * FROM articles', conn)

# 写入
df.to_csv('output.csv', index=False, encoding='utf-8-sig')
df.to_json('output.json', orient='records', force_ascii=False)
df.to_excel('output.xlsx', index=False)
\`\`\`

### 快速探索数据

\`\`\`python
df.head(10)       # 前 10 行
df.tail(5)        # 后 5 行
df.info()         # 列名、类型、非空数量
df.describe()     # 数值列的统计信息（均值、标准差等）
df.shape          # (行数, 列数)
df.columns        # 所有列名
\`\`\`

### 筛选和排序

\`\`\`python
# 筛选分数 > 85 的
df[df['Python'] > 85]

# 多条件
df[(df['Python'] > 80) & (df['数学'] > 85)]

# 排序
df.sort_values('Python', ascending=False)

# 选择某些列
df[['姓名', 'Python']]
\`\`\`

### 统计运算

\`\`\`python
df['Python'].mean()    # 平均值
df['Python'].max()     # 最大值
df['Python'].sum()     # 求和
df.groupby('班级')['Python'].mean()  # 按班级分组求平均
\`\`\`

### 爬虫 + pandas 实战流水线

\`\`\`python
import pandas as pd
import requests
from bs4 import BeautifulSoup

# 1. 爬数据（略）
# ...

# 2. 装进 DataFrame
data = [
    {'title': '文章A', 'views': 1200, 'author': '茶小卷'},
    {'title': '文章B', 'views': 3400, 'author': '小熊猫'},
    {'title': '文章C', 'views': 890, 'author': '海獭'},
]
df = pd.DataFrame(data)

# 3. 清洗
df = df.dropna()  # 去掉空行

# 4. 分析
print(df.describe())
print(f"最热文章: {df.loc[df['views'].idxmax(), 'title']}")

# 5. 导出
df.to_csv('result.csv', index=False, encoding='utf-8-sig')
\`\`\`

> 🎯 **pandas 的定位**：它不是数据库的替代品，而是数据分析的利器。爬虫拿到数据 → pandas 清洗分析 → 导出报表，一气呵成。

> 📚 pandas 内容极其丰富，本节只是入门预览。后续课程会有专门的 pandas + matplotlib 章节深入学习。`,
      starterCode: `import pandas as pd

# 模拟爬回来的数据
data = {
    '城市': ['北京', '上海', '广州', '深圳', '杭州'],
    '房价均价': [65000, 72000, 38000, 68000, 42000],
    '平均薪资': [18000, 19500, 12000, 17500, 14000],
    'Python岗位数': [3500, 4200, 1800, 3900, 2200],
}

df = pd.DataFrame(data)

# 添加一列：房价收入比（越低越好）
df['房价收入比'] = (df['房价均价'] / df['平均薪资']).round(1)

# 按房价收入比排序
df_sorted = df.sort_values('房价收入比')

print('🐼 城市数据分析报告')
print('=' * 50)
print(df_sorted.to_string(index=False))
print('=' * 50)

# 统计摘要
print(f"\\n📊 房价均价最高: {df.loc[df['房价均价'].idxmax(), '城市']}"
      f" ({df['房价均价'].max():,}元/㎡)")
print(f"📊 Python岗位最多: {df.loc[df['Python岗位数'].idxmax(), '城市']}"
      f" ({df['Python岗位数'].max():,}个)")
print(f"📊 平均房价均价: {df['房价均价'].mean():,.0f}元/㎡")
`,
      expectedOutput: `🐼 城市数据分析报告
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
📊 平均房价均价: 57,000元/㎡
`,
      hint: 'pandas 的 DataFrame 就像一个超级列表——可以筛选、排序、分组、统计，而且代码简洁得惊人。',
      validation: pandasCityAnalysisValidation,
    },
  ],
};

const p3: Chapter = {
  id: 'p3',
  title: '🛒 实战项目：电商价格监控',
  description: '综合实战：用爬虫监控商品价格，降价自动提醒',
  sections: [
    {
      id: 'p3.1',
      kind: 'demo',
      chapterId: 'p3',
      title: '需求分析 + 爬取商品页面',
      content: `## 🛒 项目目标：做一个电商价格监控器

你是否曾经盯着某件商品，等它降价再买？这个项目就是让 Python 替你盯着！

### 项目需求

\`\`\`
输入：商品页面的 URL
输出：
  1. 每次运行记录商品名和当前价格
  2. 与历史价格对比，发现降价时提醒
  3. 定时自动检查，无需人工干预
\`\`\`

### 技术栈

| 环节 | 工具 |
|------|------|
| 抓取页面 | requests + BeautifulSoup |
| 提取数据 | BeautifulSoup find / find_all |
| 数据存储 | CSV（csv.DictWriter） |
| 定时检查 | time.sleep 或 schedule 库 |

### 第一步：爬取商品页面

我们模拟一个电商商品页面来练习。真实场景中换成真实 URL 即可。

\`\`\`python
import requests
from bs4 import BeautifulSoup

# 模拟商品页面 HTML（真实场景用 requests.get(url)）
html = '''
<div class="product-detail">
  <h1 class="product-name">Python 编程：从入门到实践（第3版）</h1>
  <div class="price-box">
    <span class="current-price">¥89.00</span>
    <span class="original-price">¥119.00</span>
  </div>
  <span class="shop-name">蜗牛图书旗舰店</span>
</div>
'''

soup = BeautifulSoup(html, 'html.parser')

name = soup.find('h1', class_='product-name').text.strip()
current_price = soup.find('span', class_='current-price').text.strip()
original_price = soup.find('span', class_='original-price').text.strip()

print(f'商品: {name}')
print(f'现价: {current_price}')
print(f'原价: {original_price}')
\`\`\`

### 提取价格数字

\`\`\`python
# 把 "¥89.00" 变成浮点数 89.0
price_str = current_price.replace('¥', '').replace(',', '')
price_float = float(price_str)
print(f'价格数值: {price_float}')
\`\`\`

> 🎯 **关键思路**：把爬虫学到的 requests + BeautifulSoup 组合起来，定位到商品名和价格元素，提取文本并转换为可计算的数值。`,
      starterCode: `import requests
from bs4 import BeautifulSoup

# 模拟电商商品页面
html = '''
<div class="product-detail">
  <h1 class="product-name">机械键盘 K8 Pro</h1>
  <div class="price-box">
    <span class="current-price">¥349.00</span>
    <span class="original-price">¥499.00</span>
  </div>
  <span class="discount">限时7折</span>
</div>
'''

soup = BeautifulSoup(html, 'html.parser')

# 提取商品信息
name = soup.find('h1', class_='product-name').text.strip()
current_str = soup.find('span', class_='current-price').text.strip()
original_str = soup.find('span', class_='original-price').text.strip()
discount = soup.find('span', class_='discount').text.strip()

# 转换价格为浮点数
current_price = float(current_str.replace('¥', '').replace(',', ''))
original_price = float(original_str.replace('¥', '').replace(',', ''))

print(f'商品名称: {name}')
print(f'当前价格: ¥{current_price:.2f}')
print(f'原价:     ¥{original_price:.2f}')
print(f'优惠活动: {discount}')
print(f'节省金额: ¥{original_price - current_price:.2f}')
`,
      expectedOutput: `商品名称: 机械键盘 K8 Pro
当前价格: ¥349.00
原价:     ¥499.00
优惠活动: 限时7折
节省金额: ¥150.00
`,
      hint: '真实爬虫中，把 requests.get(url).text 替换掉模拟的 html 字符串即可。注意检查元素是否存在（if tag: 判空）。',
    },
    {
      id: 'p3.2',
      kind: 'demo',
      chapterId: 'p3',
      title: '价格比对 + 写入 CSV',
      content: `## 📊 历史价格记录 + 降价检测

抓到了价格，下一步是存起来，和上次的比一比。

### 设计 CSV 结构

\`\`\`csv
timestamp,product_name,price
2025-03-20 10:00:00,机械键盘 K8 Pro,349.00
2025-03-21 10:00:00,机械键盘 K8 Pro,329.00
\`\`\`

### 写入历史价格

\`\`\`python
import csv
from datetime import datetime

# 追加一条价格记录
def record_price(product_name, price, filename='price_history.csv'):
    import os
    file_exists = os.path.exists(filename)
    with open(filename, 'a', newline='', encoding='utf-8-sig') as f:
        writer = csv.writer(f)
        if not file_exists:
            writer.writerow(['timestamp', 'product_name', 'price'])
        writer.writerow([datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                         product_name, price])
\`\`\`

### 读取历史并检测降价

\`\`\`python
def check_price_drop(product_name, current_price, filename='price_history.csv'):
    import csv
    try:
        with open(filename, 'r', encoding='utf-8-sig') as f:
            reader = list(csv.DictReader(f))
        # 找到该商品的所有历史记录
        records = [r for r in reader if r['product_name'] == product_name]
        if records:
            last_price = float(records[-1]['price'])
            if current_price < last_price:
                drop = last_price - current_price
                print(f'🔔 降价提醒！{product_name}')
                print(f'   上次价格: ¥{last_price:.2f}')
                print(f'   当前价格: ¥{current_price:.2f}')
                print(f'   降价幅度: ¥{drop:.2f}')
                return True
            elif current_price > last_price:
                print(f'📈 价格上涨: ¥{last_price:.2f} → ¥{current_price:.2f}')
            else:
                print(f'➡️  价格不变: ¥{current_price:.2f}')
        else:
            print(f'📝 首次记录: {product_name} = ¥{current_price:.2f}')
    except FileNotFoundError:
        print(f'📝 首次记录: {product_name} = ¥{current_price:.2f}')
    return False
\`\`\`

> 🎯 **核心逻辑**：CSV 存历史 → 读最后一条 → 比价 → 降价了喊一声。简单但实用！`,
      starterCode: `import csv
import os
from datetime import datetime

# ---- 模拟：本次爬到的价格 ----
product_name = '机械键盘 K8 Pro'
current_price = 329.00  # 假装比上次便宜了

CSV_FILE = 'price_history.csv'

# ---- 1. 写入本次价格 ----
def record_price(name, price, filename):
    file_exists = os.path.exists(filename)
    with open(filename, 'a', newline='', encoding='utf-8-sig') as f:
        writer = csv.writer(f)
        if not file_exists:
            writer.writerow(['timestamp', 'product_name', 'price'])
        writer.writerow([
            datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            name,
            price
        ])

# 先写一条模拟的历史记录（假装昨天是 ¥349）
yesterday = '2025-03-20 10:00:00'
with open(CSV_FILE, 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow(['timestamp', 'product_name', 'price'])
    writer.writerow([yesterday, product_name, '349.00'])

# 记录今天的新价格
record_price(product_name, current_price, CSV_FILE)

# ---- 2. 读取并比对 ----
with open(CSV_FILE, 'r', encoding='utf-8-sig') as f:
    reader = list(csv.DictReader(f))

records = [r for r in reader if r['product_name'] == product_name]
print(f'📋 {product_name} 价格历史:')
for r in records:
    print(f'  {r["timestamp"]} | ¥{float(r["price"]):.2f}')

if len(records) >= 2:
    last = float(records[-2]['price'])
    curr = float(records[-1]['price'])
    print(f'\\n上次: ¥{last:.2f} → 本次: ¥{curr:.2f}')
    if curr < last:
        print(f'🎉 降了 ¥{last - curr:.2f}！是时候入手了！')
    elif curr > last:
        print(f'📈 涨了 ¥{curr - last:.2f}，再等等吧')
    else:
        print('➡️  价格没变')

os.remove(CSV_FILE)  # 清理测试文件
`,
      expectedOutput: `📋 机械键盘 K8 Pro 价格历史:
  2025-03-20 10:00:00 | ¥349.00
  2025-03-2* **:**:** | ¥329.00

上次: ¥349.00 → 本次: ¥329.00
🎉 降了 ¥20.00！是时候入手了！
`,
      hint: 'CSV 文件要一直保留（不要每次覆盖），用 append 模式 \'a\' 追加。检测降价只需对比最近两条记录的价格。',
      validation: priceHistoryValidation,
    },
    {
      id: 'p3.3',
      kind: 'demo',
      chapterId: 'p3',
      title: '定时检查 + 降价通知',
      content: `## ⏰ 定时检查：让爬虫自动「站岗」

前面的代码跑一次检查一次。真正的监控需要**自动定时执行**。

### 方案一：简单的 time.sleep 循环

\`\`\`python
import time

def monitor_loop(product_url, interval=3600):
    """每隔 interval 秒检查一次价格"""
    while True:
        print(f'\\n⏰ {datetime.now().strftime("%H:%M:%S")} — 检查价格...')
        name, price = fetch_price(product_url)
        record_price(name, price)
        check_price_drop(name, price)
        print(f'💤 等待 {interval // 60} 分钟后再次检查...')
        time.sleep(interval)
\`\`\`

### 方案二：用 schedule 库（更灵活）

\`\`\`bash
pip install schedule
\`\`\`

\`\`\`python
import schedule
import time

def job():
    print(f'[{datetime.now().strftime("%H:%M:%S")}] 执行价格检查...')
    name, price = fetch_price(url)
    record_price(name, price)
    check_price_drop(name, price)

# 每天早上 9 点和晚上 9 点检查
schedule.every().day.at("09:00").do(job)
schedule.every().day.at("21:00").do(job)

# 或者每隔 2 小时
schedule.every(2).hours.do(job)

while True:
    schedule.run_pending()
    time.sleep(60)
\`\`\`

### 降价通知的几种方式

| 方式 | 适用场景 | 实现难度 |
|------|----------|----------|
| 控制台 print | 个人使用、开发调试 | ⭐ |
| 写入日志文件 | 记录留存 | ⭐ |
| 发送邮件 | 及时通知 | ⭐⭐ |
| 微信/钉钉机器人 | 团队协作 | ⭐⭐ |
| 桌面弹窗通知 | 个人实时提醒 | ⭐ |

### 完整监控脚本骨架

\`\`\`python
# 价格监控完整流程
# 1. 爬取商品页 → 得到名称和价格
# 2. 追加写入 CSV
# 3. 读取历史 → 对比上一次价格
# 4. 如果降价 → 输出提醒
# 5. sleep 等待 → 回到第 1 步
\`\`\`

> 🎯 **部署建议**：写完脚本丢到云服务器上（甚至树莓派），用 \`nohup python monitor.py &\` 后台运行，24 小时帮你盯着价格。

> ⚠️ **爬虫礼仪**：检查间隔不要太短（建议 ≥ 1 小时），否则可能被封 IP。你是监控不是攻击。`,
      starterCode: `import time
from datetime import datetime

# 模拟价格数据（真实场景替换为爬虫函数）
price_history_sim = [349.00, 329.00, 329.00, 299.00]
check_count = 0

def fetch_price_sim():
    """模拟爬取价格（真实场景用 requests + BeautifulSoup）"""
    global check_count
    price = price_history_sim[check_count % len(price_history_sim)]
    check_count += 1
    return '机械键盘 K8 Pro', price

# ---- 定时监控主循环 ----
print('🛒 电商价格监控已启动')
print('=' * 50)

last_price = None

for i in range(4):  # 模拟 4 次检查（真实场景用 while True）
    now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print(f'\\n[{now}] 第 {i+1} 次检查...')

    name, price = fetch_price_sim()
    print(f'  商品: {name}')
    print(f'  价格: ¥{price:.2f}')

    if last_price is not None:
        if price < last_price:
            print(f'  🔔 降价提醒！¥{last_price:.2f} → ¥{price:.2f} (降 ¥{last_price - price:.2f})')
        elif price > last_price:
            print(f'  📈 价格上涨：¥{last_price:.2f} → ¥{price:.2f}')
        else:
            print(f'  ➡️  价格持平')
    else:
        print(f'  📝 初始记录')

    last_price = price

    if i < 3:  # 最后一次不等待
        print(f'  💤 等待 3 秒后下一次检查...')
        time.sleep(1)  # 演示时用 1 秒，真实场景用 3600

print(f'\\n✅ 监控完成！共检查 {check_count} 次')
`,
      expectedOutput: `🛒 电商价格监控已启动
==================================================

[2025-*] 第 1 次检查...
  商品: 机械键盘 K8 Pro
  价格: ¥349.00
  📝 初始记录
  💤 等待 3 秒后下一次检查...

[2025-*] 第 2 次检查...
  商品: 机械键盘 K8 Pro
  价格: ¥329.00
  🔔 降价提醒！¥349.00 → ¥329.00 (降 ¥20.00)
  💤 等待 3 秒后下一次检查...

[2025-*] 第 3 次检查...
  商品: 机械键盘 K8 Pro
  价格: ¥329.00
  ➡️  价格持平
  💤 等待 3 秒后下一次检查...

[2025-*] 第 4 次检查...
  商品: 机械键盘 K8 Pro
  价格: ¥299.00
  🔔 降价提醒！¥329.00 → ¥299.00 (降 ¥30.00)

✅ 监控完成！共检查 4 次
`,
      hint: '真实部署用 schedule 库代替 time.sleep，可以精确到每天几点执行。Windows 用户可以用 pythonw.exe 运行避免命令行窗口。',
      validation: priceMonitorValidation,
    },
  ],
};

export const part3Chapters: Chapter[] = [ch13, ch14, ch15, ch16, p3];
