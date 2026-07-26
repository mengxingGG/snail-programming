// 🎨 Part 4: Web 开发 — Ch17 ~ Ch20（13节）
// 参考：Flask 官方文档、Flask Mega-Tutorial
// 规范：每节一个概念 | content ≤ 700字 | starterCode 3-15行 | expectedOutput 精确匹配

import type { Chapter, SectionValidation } from '../types/course';

const flaskRunValidation: SectionValidation = {
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
};

const flaskStructureValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'exact', value: '✅ Flask 应用结构示例已定义' },
    { type: 'exact', value: '  - 路由表：' },
    { type: 'exact', value: '    / → home()' },
    { type: 'exact', value: '    /about → about()' },
    { type: 'exact', value: '  - 启动命令：app.run(debug=True)' },
    { type: 'exact', value: '  - 访问地址：http://127.0.0.1:5000' },
    { type: 'exact', value: '💡 本节先理解 Flask 应用结构，真正启动服务放到后面的小节。' },
  ],
};

const flaskMinimalAppValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'exact', value: '✅ 最小 Flask 应用结构已定义' },
    { type: 'exact', value: '  - app = Flask(__name__)  —— 创建应用' },
    { type: 'exact', value: '  - @app.route("/")        —— 首页路由' },
    { type: 'exact', value: '  - @app.route("/hello")   —— 第二个路由' },
    { type: 'exact', value: '  - 启动：访问 http://127.0.0.1:5000' },
    { type: 'exact', value: '💡 Flask 应用需要在本地运行才能看到 Web 页面。当前仅展示代码结构。' },
  ],
};

const passwordHashPreviewValidation: SectionValidation = {
  mode: 'regex_pattern',
  outputRules: [
    { type: 'exact', value: '=== 注册 ===' },
    { type: 'exact', value: '用户 xiaoming 注册成功' },
    { type: 'regex', value: '^存储的密码哈希：[0-9a-f]{20}\\.\\.\\.（已脱敏）$' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '=== 登录 ===' },
    { type: 'exact', value: '✅ 登录成功！session 已设置' },
    { type: 'exact', value: "session['user'] = xiaoming" },
    { type: 'exact', value: '' },
    { type: 'exact', value: '=== 检查登录状态 ===' },
    { type: 'exact', value: '已登录用户：xiaoming' },
    { type: 'exact', value: '' },
    { type: 'exact', value: '=== 登出 ===' },
    { type: 'exact', value: 'session 已清除，当前用户：None' },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch17 — Flask 入门（4 节）
// ─────────────────────────────────────────────────────────────
const ch17: Chapter = {
  id: 'ch17',
  title: 'Flask 入门',
  description: '最小应用、路由、render_template',
  sections: [
    {
      id: '17.1',
      kind: 'demo',
      chapterId: 'ch17',
      title: 'Flask 是什么 — Python 最轻量的 Web 框架',
      content: `## Flask：小而美的 Python Web 框架

如果你要做一个网站，你有两种选择：

| 框架 | 比喻 | 特点 |
|------|------|------|
| Django | 豪华精装房 🏠 | 什么都给你装好了，开箱即用 |
| **Flask** | 乐高积木 🧱 | 只有最基础的零件，按需组装 |

---

### 为什么选 Flask？

\`\`\`
✅ 核心只有 5 个模块，源码不到 10000 行
✅ 学习曲线平缓 — 5 行代码就能启动服务
✅ 自由度高 — 按需选择数据库、模板引擎
✅ 生态强大 — 插件丰富，社区活跃
\`\`\`

---

### Flask 的核心理念

Flask 做两件事：
1. **路由**：把 URL 路径映射到 Python 函数
2. **请求/响应**：接收请求，返回响应

其他一切（数据库、表单、认证）都由你选插件来加。

这就是"微框架"的含义：**核心极小，但扩展能力极强**。`,
      starterCode: `# Flask 的核心是：路由表 + 请求/响应
# 本节只展示结构，不真的启动 Web 服务器

routes = {
    "/": "home()",
    "/about": "about()",
}

print("✅ Flask 应用结构示例已定义")
print("  - 路由表：")
for path, handler in routes.items():
    print(f"    {path} → {handler}")
print("  - 启动命令：app.run(debug=True)")
print("  - 访问地址：http://127.0.0.1:5000")
print("💡 本节先理解 Flask 应用结构，真正启动服务放到后面的小节。")`,
      expectedOutput: `✅ Flask 应用结构示例已定义
  - 路由表：
    / → home()
    /about → about()
  - 启动命令：app.run(debug=True)
  - 访问地址：http://127.0.0.1:5000
💡 本节先理解 Flask 应用结构，真正启动服务放到后面的小节。`,
      hint: 'Flask 的核心就是这么简单——一个路由表，把 URL 和函数关联起来。app.route() 是一个装饰器，后面会详细讲。',
      validation: flaskStructureValidation,
    },
    {
      id: '17.2',
      kind: 'demo',
      chapterId: 'ch17',
      title: '最小应用 — 5 行启动 Web 服务',
      content: `## 最小 Flask 应用：5 行代码启动网站

全世界最简单的 Web 服务器长什么样？看下面：

\`\`\`python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, Flask!"

app.run(debug=True)
\`\`\`

就这么几行，一个网站就跑起来了！

---

### 逐行解读

| 代码 | 含义 |
|------|------|
| \`from flask import Flask\` | 导入 Flask 类 |
| \`app = Flask(__name__)\` | 创建应用实例（\`__name__\` 告诉 Flask 当前模块名） |
| \`@app.route("/")\` | 装饰器：访问首页时调用这个函数 |
| \`def home():\` | 视图函数：处理请求，返回响应 |
| \`app.run(debug=True)\` | 启动开发服务器（debug 模式自动重载） |

---

### 运行之后

打开浏览器访问 \`http://127.0.0.1:5000\`，你会看到 "Hello, Flask!"。

当你修改代码时，debug 模式会自动重启服务器——**不用手动刷新**！`,
      starterCode: `# 最小 Flask 应用的组成：应用实例 + 路由 + 启动命令
app_name = "Flask(__name__)"
routes = [
    '@app.route("/")',
    '@app.route("/hello")',
]

print("✅ 最小 Flask 应用结构已定义")
print(f"  - app = {app_name}  —— 创建应用")
print(f"  - {routes[0]}        —— 首页路由")
print(f"  - {routes[1]}   —— 第二个路由")
print("  - 启动：访问 http://127.0.0.1:5000")
print("💡 Flask 应用需要在本地运行才能看到 Web 页面。当前仅展示代码结构。")`,
      expectedOutput: `✅ 最小 Flask 应用结构已定义
  - app = Flask(__name__)  —— 创建应用
  - @app.route("/")        —— 首页路由
  - @app.route("/hello")   —— 第二个路由
  - 启动：访问 http://127.0.0.1:5000
💡 Flask 应用需要在本地运行才能看到 Web 页面。当前仅展示代码结构。`,
      hint: 'if __name__ == "__main__": 确保只有直接运行这个文件时才启动服务器，被 import 时不启动。',
      validation: flaskMinimalAppValidation,
    },
    {
      id: '17.3',
      kind: 'demo',
      chapterId: 'ch17',
      title: '路由 — @app.route() 装饰器',
      content: `## 路由：Python 函数变身网页

**路由**就是"这个网址归哪个函数管"。

---

### 静态路由 vs 动态路由

\`\`\`python
@app.route("/")              # 首页（静态）
def home():
    return "首页"

@app.route("/articles")      # 文章列表（静态）
def article_list():
    return "文章列表"

@app.route("/articles/<id>") # 文章详情（动态！）
def article_detail(id):
    return f"文章 #{id}"
\`\`\`

---

### 动态路由的转换器

\`\`\`python
@app.route("/articles/<int:id>")   # 只匹配数字
@app.route("/users/<string:name>")  # 只匹配字符串（默认）
@app.route("/files/<path:filepath>") # 匹配含 / 的路径
\`\`\`

---

### 同一个函数可以绑定多个路由

\`\`\`python
@app.route("/")
@app.route("/index")
@app.route("/home")
def home():
    return "Welcome!"
\`\`\`

三个网址访问同一个页面，灵活！`,
      starterCode: `from flask import Flask

app = Flask(__name__)

# 静态路由
@app.route("/")
def index():
    return "首页 - 蜗牛编程"

# 动态路由：<name> 是变量
@app.route("/hello/<name>")
def hello(name):
    return f"你好，{name}！🐌"

# 带类型转换的动态路由
@app.route("/article/<int:article_id>")
def show_article(article_id):
    return f"你正在查看文章 #{article_id}"

if __name__ == "__main__":
    app.run(debug=True)`,
      expectedOutput: ` * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!`,
      hint: '试试访问 http://127.0.0.1:5000/hello/小明 和 http://127.0.0.1:5000/article/42，看看动态路由的效果！',
      validation: flaskRunValidation,
    },
    {
      id: '17.4',
      kind: 'demo',
      chapterId: 'ch17',
      title: '返回 HTML — render_template',
      content: `## render_template：返回真正的网页

到目前为止我们只返回了纯文本。真正的网站需要返回 **HTML 页面**。

---

### 两种返回 HTML 的方式

\`\`\`python
# ❌ 方式一：直接写 HTML 字符串（又丑又难维护）
@app.route("/")
def home():
    return "<h1>你好</h1><p>欢迎来到蜗牛编程</p>"

# ✅ 方式二：用 render_template 加载 HTML 文件
@app.route("/")
def home():
    return render_template("index.html", title="首页", name="小明")
\`\`\`

---

### 项目结构

\`\`\`
你的项目/
├── app.py              # Flask 应用
└── templates/          # HTML 模板文件夹（Flask 自动找这里）
    └── index.html      # 你的模板文件
\`\`\`

---

### 传数据到模板

\`\`\`python
# Python 端传变量
return render_template("index.html", title="首页", user="小明")

# HTML 端用 {{ }} 接收（Jinja2 语法，下一章会细讲）
# <h1>{{ title }}</h1>
# <p>你好，{{ user }}</p>
\`\`\`

Flask 自动在 \`templates/\` 文件夹里找模板文件，不需要写完整路径！`,
      starterCode: `from flask import Flask, render_template

app = Flask(__name__)

# 返回带变量的 HTML 页面
@app.route("/")
def home():
    return render_template("index.html", title="蜗牛编程", name="小明")

@app.route("/about")
def about():
    return render_template("about.html", version="1.0.0")

if __name__ == "__main__":
    app.run(debug=True)`,
      expectedOutput: ` * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!`,
      hint: '模板文件要放在 templates/ 文件夹里。创建 templates/index.html，里面用 <h1>{{ title }}</h1> 接收变量。',
      validation: flaskRunValidation,
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch18 — 模板与数据库（3 节）
// ─────────────────────────────────────────────────────────────
const ch18: Chapter = {
  id: 'ch18',
  title: '模板与数据库',
  description: 'Jinja2、Flask+SQLite、模板继承',
  sections: [
    {
      id: '18.1',
      kind: 'demo',
      chapterId: 'ch18',
      title: 'Jinja2 模板 — {{ }} 和 {% %}',
      content: `## Jinja2：HTML 里嵌入 Python

Flask 内置了 **Jinja2** 模板引擎。它让你在 HTML 里写 Python 表达式，但又不会把 HTML 弄脏。

---

### 两种标记

| 标记 | 用途 | 示例 |
|------|------|------|
| \`{{ 变量 }}\` | **输出**变量的值 | \`{{ user.name }}\` |
| \`{% 语句 %}\` | **执行**逻辑（if、for） | \`{% for item in items %}\` |

---

### 变量与过滤器

\`\`\`html
<h1>{{ title }}</h1>
<p>价格：{{ price | round(2) }}</p>         <!-- 过滤器 -->
<p>时间：{{ created_at | datetime }}</p>
\`\`\`

---

### 条件判断

\`\`\`html
{% if user %}
  <p>你好，{{ user }}！</p>
{% else %}
  <p>请先登录</p>
{% endif %}
\`\`\`

---

### 循环

\`\`\`html
<ul>
{% for article in articles %}
  <li>{{ article.title }} — {{ article.author }}</li>
{% endfor %}
</ul>
\`\`\`

---

Jinja2 的关键：\`{{ }}\` 给你看，\`{% %}\` 帮你做。记住这个就不会搞混！`,
      starterCode: `# 模拟 Jinja2 渲染引擎的核心逻辑
def render_template(template_str, **context):
    """极简 Jinja2：替换 {{ }} 和 {% %} 为 HTML"""
    import re

    # 先处理 if 语句
    def replace_if(match):
        cond = match.group(1).strip()
        body = match.group(2).strip()
        if cond in context and context[cond]:
            return body
        return ""

    template_str = re.sub(
        r'{% if (\\w+) %}(.*?){% endif %}',
        replace_if,
        template_str,
        flags=re.DOTALL
    )

    # 再处理 for 循环
    def replace_for(match):
        var = match.group(1)
        items_name = match.group(2)
        body = match.group(3)
        items = context.get(items_name, [])
        result = ""
        for item in items:
            line = body.replace("{{ " + var + ".title }}", item.get("title", ""))
            line = line.replace("{{ " + var + ".author }}", item.get("author", ""))
            result += line + "\\n"
        return result

    template_str = re.sub(
        r'{% for (\\w+) in (\\w+) %}(.*?){% endfor %}',
        replace_for,
        template_str,
        flags=re.DOTALL
    )

    # 最后替换 {{ }} 变量
    for key, val in context.items():
        if not isinstance(val, list):
            template_str = template_str.replace("{{ " + key + " }}", str(val))

    return template_str

template = """<h1>{{ title }}</h1>
{% if show_user %}
<p>你好，{{ username }}！</p>
{% endif %}
<ul>
{% for article in articles %}
  <li>{{ article.title }} — {{ article.author }}</li>
{% endfor %}
</ul>"""

html = render_template(
    template,
    title="蜗牛编程日报",
    show_user=True,
    username="小明",
    articles=[
        {"title": "Python 入门", "author": "张三"},
        {"title": "Flask 实战", "author": "李四"},
    ]
)
print(html)`,
      expectedOutput: `<h1>蜗牛编程日报</h1>

<p>你好，小明！</p>

<ul>

  <li>Python 入门 — 张三</li>

  <li>Flask 实战 — 李四</li>

</ul>`,
      hint: '真实的 Jinja2 比这个强大得多，还有模板继承、宏、过滤器等高级功能。但这个模拟帮你理解核心原理！',
    },
    {
      id: '18.2',
      kind: 'demo',
      chapterId: 'ch18',
      title: 'Flask + SQLite — 读写数据库',
      content: `## Flask + SQLite：数据持久化

网站不能只有页面，还得**存数据**。SQLite 是 Python 内置的轻量数据库——**零配置，开箱即用**。

---

### SQLite 三件套

\`\`\`python
import sqlite3

# 1. 连接数据库（不存在则自动创建）
conn = sqlite3.connect("app.db")

# 2. 创建游标，执行 SQL
cur = conn.cursor()
cur.execute("CREATE TABLE IF NOT EXISTS articles (id INTEGER PRIMARY KEY, title TEXT)")

# 3. 提交并关闭
conn.commit()
conn.close()
\`\`\`

---

### 在 Flask 中使用

\`\`\`python
import sqlite3
from flask import Flask, g

app = Flask(__name__)

def get_db():
    """获取数据库连接（每个请求复用）"""
    if 'db' not in g:
        g.db = sqlite3.connect("app.db")
        g.db.row_factory = sqlite3.Row  # 让结果可以用字典方式访问
    return g.db

@app.route("/articles")
def list_articles():
    db = get_db()
    articles = db.execute("SELECT * FROM articles").fetchall()
    return str([dict(row) for row in articles])
\`\`\`

\`g\` 是 Flask 的全局对象，每个请求独立——放数据库连接再合适不过。`,
      starterCode: `import sqlite3

# 模拟 Flask + SQLite 的完整数据流
# 1. 创建数据库和表
conn = sqlite3.connect(":memory:")  # 用内存数据库，不产生文件
conn.row_factory = sqlite3.Row
cur = conn.cursor()

cur.execute("""
    CREATE TABLE articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")

# 2. 插入数据
cur.execute(
    "INSERT INTO articles (title, content) VALUES (?, ?)",
    ("Python 入门指南", "从零开始学 Python...")
)
cur.execute(
    "INSERT INTO articles (title, content) VALUES (?, ?)",
    ("Flask Web 开发", "搭建你的第一个网站...")
)
conn.commit()

# 3. 查询所有文章
print("📋 所有文章：")
rows = cur.execute("SELECT id, title FROM articles").fetchall()
for row in rows:
    print(f"  [{row['id']}] {row['title']}")

# 4. 查询单篇文章
print("\\n📖 文章详情：")
article = cur.execute(
    "SELECT * FROM articles WHERE id = ?", (1,)
).fetchone()
print(f"  标题：{article['title']}")
print(f"  内容：{article['content']}")

conn.close()`,
      expectedOutput: `📋 所有文章：
  [1] Python 入门指南
  [2] Flask Web 开发

📖 文章详情：
  标题：Python 入门指南
  内容：从零开始学 Python...`,
      hint: '? 是参数化查询的占位符，防止 SQL 注入。永远不要用字符串拼接 SQL！',
    },
    {
      id: '18.3',
      kind: 'demo',
      chapterId: 'ch18',
      title: '模板继承 — base.html 复用布局',
      content: `## 模板继承：DRY 原则在 HTML 中的运用

一个网站的所有页面通常共享同一个外观（导航栏、页脚、侧边栏）。

如果每个 HTML 都复制一遍……改一个导航栏就要改几十个文件 😱

---

### Jinja2 的解决方案：模板继承

**父模板** \`base.html\`：定义公共骨架，挖好"坑"（block）

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}默认标题{% endblock %}</title>
</head>
<body>
    <nav>蜗牛编程 - 导航栏</nav>
    <main>
        {% block content %}
        <!-- 子模板的内容会填到这里 -->
        {% endblock %}
    </main>
    <footer>© 2024 蜗牛编程</footer>
</body>
</html>
\`\`\`

**子模板** \`index.html\`：只填自己的内容

\`\`\`html
{% extends "base.html" %}

{% block title %}首页 - 蜗牛编程{% endblock %}

{% block content %}
    <h1>欢迎来到蜗牛编程 🐌</h1>
    <p>今天开始学 Flask！</p>
{% endblock %}
\`\`\`

---

### 关键点

- \`{% extends "base.html" %}\` 必须在第一行
- \`{% block 名字 %}\` 挖坑，\`{% endblock %}\` 填坑
- 子模板只写不一样的地方——**改了 base.html，所有页面一起变**`,
      starterCode: `# 模拟 Jinja2 模板继承引擎
def render_with_layout(base_tpl, child_tpl):
    """极简模板继承：把子模板的内容填入父模板的 block"""
    import re

    # 从子模板中提取 block 内容
    blocks = {}
    for match in re.finditer(
        r'{% block (\\w+) %}(.*?){% endblock %}',
        child_tpl,
        re.DOTALL
    ):
        blocks[match.group(1)] = match.group(2).strip()

    # 把 block 内容填入父模板
    result = base_tpl
    for name, content in blocks.items():
        result = re.sub(
            r'{% block ' + name + r' %}.*?{% endblock %}',
            content,
            result,
            flags=re.DOTALL
        )

    return result

# 父模板：公共布局
base_html = """<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}默认{% endblock %}</title>
</head>
<body>
    <nav>🐌 蜗牛编程</nav>
    {% block content %}默认内容{% endblock %}
    <footer>© 2024</footer>
</body>
</html>"""

# 子模板：只写自己特有的内容
child_html = """{% block title %}Flask 入门课程{% endblock %}
{% block content %}
    <h1>模板继承</h1>
    <p>只写不同的部分就好！</p>
{% endblock %}"""

print(render_with_layout(base_html, child_html))`,
      expectedOutput: `<!DOCTYPE html>
<html>
<head>
    <title>Flask 入门课程</title>
</head>
<body>
    <nav>🐌 蜗牛编程</nav>
    <h1>模板继承</h1>
    <p>只写不同的部分就好！</p>
    <footer>© 2024</footer>
</body>
</html>`,
      hint: 'extends 必须写在子模板的第一行，父模板里可以定义任意多个 block。',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch19 — 表单与用户认证（3 节）
// ─────────────────────────────────────────────────────────────
const ch19: Chapter = {
  id: 'ch19',
  title: '表单与用户认证',
  description: 'GET/POST表单、session、Flash消息',
  sections: [
    {
      id: '19.1',
      kind: 'demo',
      chapterId: 'ch19',
      title: 'GET vs POST 表单',
      content: `## GET 和 POST：两种提交方式

表单是用户和服务器交互的主要方式。HTTP 提供了两种提交方法：

---

### GET：把数据放在 URL 里

\`\`\`
http://example.com/search?q=flask&page=1
                         ↑           ↑
                      参数=q       参数=page
\`\`\`

- 参数**暴露在网址里**（可收藏、可分享）
- 有**长度限制**
- 适合：**搜索、筛选、分页**

---

### POST：把数据放在请求体里

- 参数**不显示在网址里**
- 没有长度限制
- 适合：**登录、注册、提交内容**

---

### Flask 中获取表单数据

\`\`\`python
from flask import request

@app.route("/search")
def search():
    keyword = request.args.get("q")    # GET 参数
    return f"搜索：{keyword}"

@app.route("/login", methods=["POST"])
def login():
    username = request.form.get("username")  # POST 参数
    password = request.form.get("password")
    return f"登录：{username}"
\`\`\`

---

### 关键区别

| | GET | POST |
|------|-----|------|
| 数据位置 | URL 查询串 | 请求体 |
| 书签 | ✅ | ❌ |
| 安全 | 低（明文暴露） | 稍高（不显示） |
| Flask 读取 | \`request.args\` | \`request.form\` |`,
      starterCode: `# 模拟 Flask 处理 GET 和 POST 请求
class FakeRequest:
    def __init__(self, method, args=None, form=None):
        self.method = method
        self.args = args or {}
        self.form = form or {}

def handle_search(req):
    """GET 请求：搜索（数据在 URL）"""
    q = req.args.get("q", "")
    page = req.args.get("page", "1")
    return f"搜索关键词：{q}，第 {page} 页"

def handle_login(req):
    """POST 请求：登录（数据在请求体）"""
    username = req.form.get("username", "")
    password = req.form.get("password", "")
    if username == "admin" and password == "123456":
        return "✅ 登录成功！欢迎回来，admin"
    return "❌ 用户名或密码错误"

# 模拟 GET 搜索
req_get = FakeRequest("GET", args={"q": "Python 教程", "page": "2"})
print("GET /search：", handle_search(req_get))

# 模拟 POST 登录
req_post_ok = FakeRequest("POST", form={"username": "admin", "password": "123456"})
print("POST /login：", handle_login(req_post_ok))

req_post_fail = FakeRequest("POST", form={"username": "hacker", "password": "wrong"})
print("POST /login：", handle_login(req_post_fail))`,
      expectedOutput: `GET /search： 搜索关键词：Python 教程，第 2 页
POST /login： ✅ 登录成功！欢迎回来，admin
POST /login： ❌ 用户名或密码错误`,
      hint: 'GET 用 request.args，POST 用 request.form。记得在 @app.route 里加 methods=["POST"] 才能接收 POST 请求！',
    },
    {
      id: '19.2',
      kind: 'demo',
      chapterId: 'ch19',
      title: '注册登录 — session + 密码哈希',
      content: `## 用户认证：注册和登录

用户系统是绝大多数网站的标配。Flask 提供 \`session\` 来记住用户登录状态。

---

### Flask Session：记住你是谁

\`\`\`python
from flask import session

# 设置 session（登录时）
session["user_id"] = user_id
session["username"] = username

# 读取 session（判断是否登录）
if "user_id" in session:
    return f"已登录：{session['username']}"

# 清除 session（登出时）
session.clear()
\`\`\`

\`session\` 是加密的 cookie，存储在浏览器端。需要设置 \`app.secret_key\`。

---

### 密码哈希：绝不能明文存密码！

\`\`\`python
from werkzeug.security import generate_password_hash, check_password_hash

# 注册时：哈希后存数据库
hashed = generate_password_hash("mypassword123")
# 数据库里存的是：scrypt:32768:8:1$...（不可逆！）

# 登录时：验证用户输入的密码
is_correct = check_password_hash(hashed, "mypassword123")  # True
\`\`\`

---

### 为什么不能明文存密码？

如果数据库泄露，所有用户的密码直接暴露——很多人多个网站用同一个密码，后果不堪设想。

**哈希是单向的**：从哈希值无法反推出原始密码。即使数据库泄露，攻击者也拿不到密码原文。`,
      starterCode: `import hashlib

# 模拟 session（简化版）
session_store = {}

def set_session(key, value):
    session_store[key] = value

def get_session(key):
    return session_store.get(key)

def clear_session():
    session_store.clear()

# 模拟密码哈希（简化版，真实场景用 werkzeug.security）
def hash_password(password):
    """SHA-256 哈希（不可逆）"""
    return hashlib.sha256(password.encode()).hexdigest()

def check_password(stored_hash, password):
    return stored_hash == hash_password(password)

# 模拟用户数据库
users_db = {}

# --- 注册流程 ---
print("=== 注册 ===")
username = "xiaoming"
password = "myp@ss123"
users_db[username] = hash_password(password)
print(f"用户 {username} 注册成功")
print(f"存储的密码哈希：{users_db[username][:20]}...（已脱敏）")

# --- 登录流程 ---
print("\\n=== 登录 ===")
login_user = "xiaoming"
login_pass = "myp@ss123"

if login_user in users_db and check_password(users_db[login_user], login_pass):
    set_session("user", login_user)
    print(f"✅ 登录成功！session 已设置")
    print(f"   session['user'] = {get_session('user')}")
else:
    print("❌ 用户名或密码错误")

# --- 检查登录状态 ---
print("\\n=== 检查登录状态 ===")
current_user = get_session("user")
if current_user:
    print(f"已登录用户：{current_user}")
else:
    print("未登录")

# --- 登出 ---
print("\\n=== 登出 ===")
clear_session()
print(f"session 已清除，当前用户：{get_session('user')}")`,
      expectedOutput: `=== 注册 ===
用户 xiaoming 注册成功
存储的密码哈希：b1b3245cd8b6f7e3d0...（已脱敏）

=== 登录 ===
✅ 登录成功！session 已设置
   session['user'] = xiaoming

=== 检查登录状态 ===
已登录用户：xiaoming

=== 登出 ===
session 已清除，当前用户：None`,
      hint: '真实项目用 Flask-Login 插件管理登录状态，用 werkzeug.security 哈希密码——不要自己实现加密！',
      validation: passwordHashPreviewValidation,
    },
    {
      id: '19.3',
      kind: 'demo',
      chapterId: 'ch19',
      title: 'Flash 消息 — 给用户反馈',
      content: `## Flash 消息：一闪而过的提示

用户操作后需要知道结果——"注册成功"、"密码错误"、"文章已删除"……这些临时提示叫 **Flash 消息**。

---

### Flask 的 flash() 函数

\`\`\`python
from flask import flash, redirect, render_template

@app.route("/login", methods=["POST"])
def login():
    username = request.form.get("username")
    if not username:
        flash("请输入用户名！", "error")    # 错误提示
        return redirect("/login")
    flash(f"欢迎回来，{username}！", "success")  # 成功提示
    return redirect("/")
\`\`\`

---

### 模板中显示 Flash 消息

\`\`\`html
{% with messages = get_flashed_messages(with_categories=true) %}
  {% if messages %}
    {% for category, message in messages %}
      <div class="alert alert-{{ category }}">
        {{ message }}
      </div>
    {% endfor %}
  {% endif %}
{% endwith %}
\`\`\`

---

### Flash 的特点

| 特性 | 说明 |
|------|------|
| 一次性 | 显示一次后就消失 |
| 跨请求 | 配合 redirect 使用——消息"穿过"两次请求 |
| 分类 | 可标记 \`"error"\`、\`"success"\`、\`"info"\` |
| 存储 | 存在 session 里，所以需要 \`secret_key\` |`,
      starterCode: `# 模拟 Flask Flash 消息系统
flash_messages = []  # 模拟 Flask 内部的 flash 存储

def flash(message, category="info"):
    """添加一条闪现消息"""
    flash_messages.append({"category": category, "message": message})

def get_flashed_messages():
    """获取所有消息并清空"""
    global flash_messages
    msgs = flash_messages.copy()
    flash_messages = []
    return msgs

# --- 模拟登录流程 ---
print("=== 第一次请求：登录失败 ===")
flash("请输入用户名！", "error")
msgs = get_flashed_messages()
for m in msgs:
    print(f"[{m['category'].upper()}] {m['message']}")

print("\\n=== 第二次请求：登录成功 ===")
flash("欢迎回来，xiaoming！", "success")
msgs = get_flashed_messages()
for m in msgs:
    print(f"[{m['category'].upper()}] {m['message']}")

print("\\n=== 第三次请求：没有消息 ===")
msgs = get_flashed_messages()
if not msgs:
    print("（无 flash 消息——已经全部显示了）")`,
      expectedOutput: `=== 第一次请求：登录失败 ===
[ERROR] 请输入用户名！

=== 第二次请求：登录成功 ===
[SUCCESS] 欢迎回来，xiaoming！

=== 第三次请求：没有消息 ===
（无 flash 消息——已经全部显示了）`,
      hint: 'flash + redirect 是 Flask 的经典组合：操作完跳转到一个新页面，flash 消息在新页面显示一次后消失。',
    },
    {
      id: '19.4',
      kind: 'demo',
      chapterId: 'ch19',
      title: '文件上传',
      content: `## 📎 文件上传：让用户上传图片和附件

大多数网站都需要用户上传文件——头像、图片、文档等。Flask 提供了简单易用的文件上传支持。

### HTML 表单（前端）

\`\`\`html
<form method="POST" enctype="multipart/form-data">
    <input type="file" name="file">
    <input type="submit" value="上传">
</form>
\`\`\`

> ⚠️ 关键：\`enctype="multipart/form-data"\` 必须写！否则文件不会发送。

### Flask 后端处理

\`\`\`python
from flask import Flask, request, redirect, url_for
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return '没有文件', 400
    file = request.files['file']
    if file.filename == '':
        return '文件名为空', 400
    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return f'上传成功：{filename}'
\`\`\`

### secure_filename() 的作用

\`secure_filename()\` 会做三件事：
1. 去掉路径分隔符（防止 \`../../../etc/passwd\` 攻击）
2. 去掉非法字符
3. 保留中文文件名（Flask 2.3+）

\`\`\`python
from werkzeug.utils import secure_filename

print(secure_filename('../../../etc/passwd'))  # etc_passwd
print(secure_filename('我的简历.pdf'))           # 我的简历.pdf
\`\`\`

### 完整的文件上传应用

\`\`\`python
from flask import Flask, request, render_template, flash, redirect
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
app.secret_key = 'secret'
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'pdf', 'txt'}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return '.' in filename and \\
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files.get('file')
    if not file or file.filename == '':
        flash('请选择文件', 'error')
        return redirect('/')
    if not allowed_file(file.filename):
        flash('不支持的文件类型', 'error')
        return redirect('/')
    filename = secure_filename(file.filename)
    file.save(os.path.join(UPLOAD_FOLDER, filename))
    flash(f'上传成功：{filename}', 'success')
    return redirect('/')
\`\`\`

> 🎯 **安全三原则**：① 用 \`secure_filename()\` 防路径穿越；② 限制文件类型（白名单！）；③ 限制文件大小（Flask 默认无限制，需配置 \`MAX_CONTENT_LENGTH\`）。`,
      starterCode: `from flask import Flask, request, redirect
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
app.secret_key = 'dev-key'

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 2 * 1024 * 1024  # 限制 2MB

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'pdf', 'txt'}

# 确保上传目录存在
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return '.' in filename and \\
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return '未找到文件字段', 400
    file = request.files['file']
    if file.filename == '':
        return '未选择文件', 400
    if not allowed_file(file.filename):
        return f'不支持的文件类型：{file.filename.rsplit(".", 1)[1]}', 400

    filename = secure_filename(file.filename)
    save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(save_path)

    # 验证文件确实保存了
    file_size = os.path.getsize(save_path)
    print(f'✅ 上传成功！')
    print(f'   文件名: {filename}')
    print(f'   大小: {file_size} bytes')
    print(f'   保存到: {save_path}')

    # 清理测试文件
    os.remove(save_path)
    return f'上传成功: {filename}', 200

if __name__ == '__main__':
    app.run(debug=True)
`,
      expectedOutput: ` * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!
`,
      hint: '用 curl 测试上传：curl -F "file=@test.png" http://127.0.0.1:5000/upload。限制文件类型用白名单（只允许已知的安全类型），不要用黑名单。',
      validation: flaskRunValidation,
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch20 — REST API（3 节）
// ─────────────────────────────────────────────────────────────
const ch20: Chapter = {
  id: 'ch20',
  title: 'REST API',
  description: 'REST约定、jsonify、完整CRUD',
  sections: [
    {
      id: '20.1',
      kind: 'demo',
      chapterId: 'ch20',
      title: 'REST 是什么 — 一套 URL 约定',
      content: `## REST：一套设计 Web API 的约定

REST（Representational State Transfer）不是技术，而是一套**约定**——大家都按这个规则设计 API，前后端就能愉快地协作。

---

### REST 的核心思想

**把一切看作"资源"（Resource）**，每个资源有一个唯一的 URL。

| 操作 | HTTP 方法 | URL 模式 | 含义 |
|------|-----------|----------|------|
| 列表 | GET | /articles | 获取所有文章 |
| 详情 | GET | /articles/1 | 获取第 1 篇文章 |
| 创建 | POST | /articles | 新建一篇文章 |
| 更新 | PUT | /articles/1 | 修改第 1 篇文章 |
| 删除 | DELETE | /articles/1 | 删除第 1 篇文章 |

---

### 为什么用 REST？

\`\`\`
❌ 不用 REST：/getArticles、/createArticle、/deleteArticle?id=1…
   每个接口命名随意，前端得查文档才能用

✅ 用 REST：/articles + HTTP 方法
   一看 URL 就知道是什么资源，看方法就知道做什么操作
\`\`\`

---

### REST 的核心原则

1. **资源用名词复数**：\`/articles\` 而不是 \`/getArticles\`
2. **操作用 HTTP 方法**：GET/POST/PUT/DELETE
3. **无状态**：每个请求包含所有必要信息，服务器不记住客户端状态
4. **返回 JSON**：轻量、易读、跨语言`,
      starterCode: `# 模拟 REST API 路由分发
def rest_dispatcher(method, path, data=None):
    """极简 REST 路由：根据 HTTP 方法和路径分发"""
    # 模拟数据库
    articles = {
        1: {"id": 1, "title": "Python 入门", "author": "张三"},
        2: {"id": 2, "title": "Flask 实战", "author": "李四"},
    }

    # 解析路径
    parts = path.strip("/").split("/")

    if parts[0] == "articles":
        if len(parts) == 1:
            # /articles
            if method == "GET":
                return 200, list(articles.values())
            elif method == "POST":
                new_id = max(articles.keys()) + 1
                articles[new_id] = {"id": new_id, **data}
                return 201, articles[new_id]
        elif len(parts) == 2:
            # /articles/<id>
            article_id = int(parts[1])
            if article_id not in articles:
                return 404, {"error": "文章不存在"}
            if method == "GET":
                return 200, articles[article_id]
            elif method == "PUT":
                articles[article_id].update(data)
                return 200, articles[article_id]
            elif method == "DELETE":
                del articles[article_id]
                return 200, {"message": "已删除"}

    return 405, {"error": "不支持的方法"}


# 测试 REST API
def test(method, path, data=None):
    status, body = rest_dispatcher(method, path, data)
    print(f"{method:6} {path:15} → {status} {body}")

test("GET", "/articles")
test("GET", "/articles/1")
test("POST", "/articles", {"title": "新文章", "author": "王五"})
test("PUT", "/articles/2", {"title": "Flask 进阶"})
test("DELETE", "/articles/1")
test("GET", "/articles")`,
      expectedOutput: `GET    /articles       → 200 [{'id': 1, 'title': 'Python 入门', 'author': '张三'}, {'id': 2, 'title': 'Flask 实战', 'author': '李四'}]
GET    /articles/1     → 200 {'id': 1, 'title': 'Python 入门', 'author': '张三'}
POST   /articles       → 201 {'id': 3, 'title': '新文章', 'author': '王五'}
PUT    /articles/2     → 200 {'id': 2, 'title': 'Flask 进阶', 'author': '李四'}
DELETE /articles/1     → 200 {'message': '已删除'}
GET    /articles       → 200 [{'id': 2, 'title': 'Flask 进阶', 'author': '李四'}, {'id': 3, 'title': '新文章', 'author': '王五'}]`,
      hint: 'REST 的核心：同一个 URL /articles，用不同的 HTTP 方法区分操作——GET 查、POST 增、PUT 改、DELETE 删。',
    },
    {
      id: '20.2',
      kind: 'demo',
      chapterId: 'ch20',
      title: 'Flask 返回 JSON — jsonify',
      content: `## jsonify：Python 字典变 JSON

现代 Web 开发中，后端经常只负责**返回数据**（JSON），前端负责渲染页面。这种架构叫"前后端分离"。

---

### Flask 返回 JSON 的三种方式

\`\`\`python
from flask import jsonify

# 方式一：jsonify()（推荐！自动设置 Content-Type）
@app.route("/api/status")
def status():
    return jsonify({"status": "ok", "version": "1.0.0"})

# 方式二：返回字典 + jsonify
@app.route("/api/user")
def user():
    data = {"name": "小明", "age": 25}
    return jsonify(data)

# 方式三：jsonify + 列表
@app.route("/api/articles")
def articles():
    articles = [
        {"id": 1, "title": "Python 入门"},
        {"id": 2, "title": "Flask 实战"},
    ]
    return jsonify(articles)
\`\`\`

---

### jsonify 做了什么？

\`\`\`
普通 return "Hello"     → Content-Type: text/html
return jsonify({...})   → Content-Type: application/json
\`\`\`

浏览器看到 \`application/json\` 就知道：这是数据，不是页面。

---

### HTTP 状态码也要配上

\`\`\`python
@app.route("/api/articles", methods=["POST"])
def create():
    return jsonify({"id": 3, "title": "新文章"}), 201  # 状态码！
\`\`\``,
      starterCode: `import json

# 模拟 Flask 的 jsonify（核心就是 json.dumps + 设置 Content-Type）
def jsonify(data, status=200):
    """将 Python 对象转为 JSON 响应"""
    json_str = json.dumps(data, ensure_ascii=False, indent=2)
    return {
        "status": status,
        "content_type": "application/json",
        "body": json_str
    }

# 模拟几个 API 端点
print("=== GET /api/status ===")
resp = jsonify({"status": "ok", "version": "1.0.0"})
print(f"HTTP {resp['status']}")
print(f"Content-Type: {resp['content_type']}")
print(resp['body'])

print("\\n=== GET /api/articles ===")
articles = [
    {"id": 1, "title": "Python 入门指南", "author": "张三"},
    {"id": 2, "title": "Flask Web 开发", "author": "李四"},
]
resp = jsonify(articles)
print(f"HTTP {resp['status']}")
print(f"Content-Type: {resp['content_type']}")
print(resp['body'])

print("\\n=== POST /api/articles（创建成功）===")
resp = jsonify({"message": "创建成功", "id": 3}, status=201)
print(f"HTTP {resp['status']} Created")
print(resp['body'])`,
      expectedOutput: `=== GET /api/status ===
HTTP 200
Content-Type: application/json
{
  "status": "ok",
  "version": "1.0.0"
}

=== GET /api/articles ===
HTTP 200
Content-Type: application/json
[
  {
    "id": 1,
    "title": "Python 入门指南",
    "author": "张三"
  },
  {
    "id": 2,
    "title": "Flask Web 开发",
    "author": "李四"
  }
]

=== POST /api/articles（创建成功）===
HTTP 201 Created
{
  "message": "创建成功",
  "id": 3
}`,
      hint: 'jsonify 的核心就是 json.dumps + 设置正确的 Content-Type。ensure_ascii=False 让中文正常显示。',
    },
    {
      id: '20.3',
      kind: 'demo',
      chapterId: 'ch20',
      title: '完整的 CRUD API',
      content: `## CRUD：增删改查的完整实现

CRUD 是四个基本操作的首字母：
- **C**reate（创建）
- **R**ead（读取）
- **U**pdate（更新）
- **D**elete（删除）

---

### 完整 CRUD 路由表

\`\`\`python
# Read：获取列表
@app.route("/api/articles", methods=["GET"])
def list_articles():
    articles = db.execute("SELECT * FROM articles").fetchall()
    return jsonify([dict(row) for row in articles])

# Create：新建
@app.route("/api/articles", methods=["POST"])
def create_article():
    data = request.get_json()
    db.execute("INSERT INTO articles (title, content) VALUES (?, ?)",
               [data["title"], data["content"]])
    db.commit()
    return jsonify({"message": "创建成功"}), 201

# Read：获取单个
@app.route("/api/articles/<int:id>", methods=["GET"])
def get_article(id):
    article = db.execute("SELECT * FROM articles WHERE id = ?", [id]).fetchone()
    if not article:
        return jsonify({"error": "Not Found"}), 404
    return jsonify(dict(article))

# Update：更新
@app.route("/api/articles/<int:id>", methods=["PUT"])
def update_article(id):
    data = request.get_json()
    db.execute("UPDATE articles SET title = ?, content = ? WHERE id = ?",
               [data["title"], data["content"], id])
    db.commit()
    return jsonify({"message": "更新成功"})

# Delete：删除
@app.route("/api/articles/<int:id>", methods=["DELETE"])
def delete_article(id):
    db.execute("DELETE FROM articles WHERE id = ?", [id])
    db.commit()
    return jsonify({"message": "已删除"})
\`\`\`

---

### 关键模式

| 模式 | 说明 |
|------|------|
| 同 URL 不同方法 | \`/api/articles\` 用 GET 和 POST 区分查/增 |
| 路径参数 | \`<int:id>\` 指定操作哪个资源 |
| 状态码语义 | 200 成功、201 创建成功、404 找不到 |
| JSON 通信 | 请求用 \`request.get_json()\`，响应用 \`jsonify()\``,
      starterCode: `import json

# 完整的 CRUD API 模拟（内存数据库）
class ArticleDB:
    def __init__(self):
        self.articles = {}
        self.next_id = 1

    def list_all(self):
        return list(self.articles.values())

    def get_one(self, id):
        return self.articles.get(id)

    def create(self, data):
        article = {"id": self.next_id, "title": data["title"], "content": data.get("content", "")}
        self.articles[self.next_id] = article
        self.next_id += 1
        return article

    def update(self, id, data):
        if id not in self.articles:
            return None
        self.articles[id].update(data)
        return self.articles[id]

    def delete(self, id):
        if id in self.articles:
            del self.articles[id]
            return True
        return False

db = ArticleDB()

def api_response(data, status=200):
    return {"status": status, "data": data}

# --- 测试完整 CRUD 流程 ---
print("=== 1. CREATE：新建两篇文章 ===")
a1 = db.create({"title": "Python 入门", "content": "从零开始"})
print(f"  创建：{a1}")
a2 = db.create({"title": "Flask 实战", "content": "搭建 API"})
print(f"  创建：{a2}")

print("\\n=== 2. READ：获取列表 ===")
print(f"  所有文章：{json.dumps(db.list_all(), ensure_ascii=False)}")

print("\\n=== 3. READ：获取单篇 ===")
print(f"  ID=1：{db.get_one(1)}")

print("\\n=== 4. UPDATE：修改第 1 篇 ===")
updated = db.update(1, {"title": "Python 精通", "content": "从入门到进阶"})
print(f"  修改后：{updated}")

print("\\n=== 5. DELETE：删除第 2 篇 ===")
db.delete(2)
print(f"  删除后列表：{json.dumps(db.list_all(), ensure_ascii=False)}")

print("\\n=== 6. 错误处理 ===")
result = db.get_one(999)
print(f"  查询不存在的 ID：{result}")
result = db.delete(999)
print(f"  删除不存在的 ID：{result}")`,
      expectedOutput: `=== 1. CREATE：新建两篇文章 ===
  创建：{'id': 1, 'title': 'Python 入门', 'content': '从零开始'}
  创建：{'id': 2, 'title': 'Flask 实战', 'content': '搭建 API'}

=== 2. READ：获取列表 ===
  所有文章：[{"id": 1, "title": "Python 入门", "content": "从零开始"}, {"id": 2, "title": "Flask 实战", "content": "搭建 API"}]

=== 3. READ：获取单篇 ===
  ID=1：{'id': 1, 'title': 'Python 入门', 'content': '从零开始'}

=== 4. UPDATE：修改第 1 篇 ===
  修改后：{'id': 1, 'title': 'Python 精通', 'content': '从入门到进阶'}

=== 5. DELETE：删除第 2 篇 ===
  删除后列表：[{"id": 1, "title": "Python 精通", "content": "从入门到进阶"}]

=== 6. 错误处理 ===
  查询不存在的 ID：None
  删除不存在的 ID：False`,
      hint: '真实项目记得做输入验证——检查必填字段、限制内容长度、防止 SQL 注入。CRUD 写得越严谨，越不容易出 bug。',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  导出
// ─────────────────────────────────────────────────────────────
const p4: Chapter = {
  id: 'p4',
  title: '📝 实战项目：个人博客',
  description: '综合实战：Flask + SQLite + Jinja2 搭建完整的个人博客系统',
  sections: [
    {
      id: 'p4.1',
      kind: 'demo',
      chapterId: 'p4',
      title: '项目规划 + 数据库设计',
      content: `## 📐 博客项目：先规划，再动手

### 项目目标

搭建一个功能完整的个人博客，支持：
- 📄 文章列表 + 详情页
- ✍️ 创建 / 编辑 / 删除文章
- 💬 文章评论
- 🔐 登录保护（写文章需要登录）
- 🎨 美观的页面样式

### 技术栈

| 层面 | 技术 |
|------|------|
| 后端框架 | Flask |
| 模板引擎 | Jinja2 |
| 数据库 | SQLite |
| 用户认证 | Flask session + werkzeug 密码哈希 |
| 前端样式 | 内嵌 CSS |

### 数据库设计

两个核心表：**articles**（文章）和 **comments**（评论）

\`\`\`sql
-- 文章表
CREATE TABLE articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,           -- 文章标题
    content TEXT NOT NULL,         -- 文章内容（Markdown）
    author TEXT DEFAULT '匿名',    -- 作者
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 评论表
CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    article_id INTEGER NOT NULL,   -- 属于哪篇文章
    author TEXT DEFAULT '匿名',    -- 评论者
    content TEXT NOT NULL,         -- 评论内容
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles(id)
);
\`\`\`

### 用户表设计

\`\`\`sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL   -- 只存哈希，不存明文！
);
\`\`\`

### 初始化数据库脚本

\`\`\`python
import sqlite3

def init_db():
    conn = sqlite3.connect('blog.db')
    conn.executescript('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS articles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            author TEXT DEFAULT '匿名',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            article_id INTEGER NOT NULL,
            author TEXT DEFAULT '匿名',
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (article_id) REFERENCES articles(id)
        );
    ''')
    conn.commit()
    conn.close()
    print('✅ 数据库初始化完成')
\`\`\`

> 🎯 **设计原则**：① 表名用复数；② 主键统一用 \`id INTEGER PRIMARY KEY AUTOINCREMENT\`；③ 时间用 \`TIMESTAMP DEFAULT CURRENT_TIMESTAMP\`；④ 评论用外键关联文章。`,
      starterCode: `import sqlite3

# 初始化博客数据库
conn = sqlite3.connect('blog.db')
conn.row_factory = sqlite3.Row
cursor = conn.cursor()

# 创建文章表
cursor.execute('''
    CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        author TEXT DEFAULT '匿名',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
''')

# 创建评论表
cursor.execute('''
    CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        article_id INTEGER NOT NULL,
        author TEXT DEFAULT '匿名',
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (article_id) REFERENCES articles(id)
    )
''')

# 创建用户表
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL
    )
''')

conn.commit()

# 验证表结构
cursor.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
tables = [row['name'] for row in cursor.fetchall()]
print('📊 已创建的表:', ', '.join(tables))

# 查看字段
for table in tables:
    cursor.execute(f'PRAGMA table_info({table})')
    cols = [f"{row['name']}({row['type']})" for row in cursor.fetchall()]
    print(f'  {table}: {", ".join(cols)}')

conn.close()
`,
      expectedOutput: `📊 已创建的表: articles, comments, users
  articles: id(INTEGER), title(TEXT), content(TEXT), author(TEXT), created_at(TIMESTAMP)
  comments: id(INTEGER), article_id(INTEGER), author(TEXT), content(TEXT), created_at(TIMESTAMP)
  users: id(INTEGER), username(TEXT), password_hash(TEXT)
`,
      hint: 'SQLite 的 sqlite_master 表记录了所有表信息，PRAGMA table_info 查看字段详情。这些是调试数据库的利器。',
    },
    {
      id: 'p4.2',
      kind: 'demo',
      chapterId: 'p4',
      title: '后端 API + 模板页面',
      content: `## 🏗️ Flask 路由 + Jinja2 模板

数据库有了，开始写 Flask 应用。核心路由：

### 路由规划

| URL | 方法 | 功能 | 模板 |
|-----|------|------|------|
| \`/\` | GET | 文章列表（首页） | index.html |
| \`/article/<id>\` | GET | 文章详情 + 评论 | article.html |
| \`/article/new\` | GET/POST | 创建文章（需登录） | editor.html |
| \`/article/<id>/edit\` | GET/POST | 编辑文章 | editor.html |
| \`/article/<id>/delete\` | POST | 删除文章 | — |
| \`/login\` | GET/POST | 登录 | login.html |
| \`/logout\` | GET | 登出 | — |

### 文章列表路由

\`\`\`python
@app.route('/')
def index():
    db = get_db()
    articles = db.execute(
        'SELECT * FROM articles ORDER BY created_at DESC'
    ).fetchall()
    return render_template('index.html', articles=articles)
\`\`\`

### 文章详情 + 评论

\`\`\`python
@app.route('/article/<int:id>')
def article_detail(id):
    db = get_db()
    article = db.execute(
        'SELECT * FROM articles WHERE id = ?', (id,)
    ).fetchone()
    if not article:
        return '文章不存在', 404
    comments = db.execute(
        'SELECT * FROM comments WHERE article_id = ? ORDER BY created_at', (id,)
    ).fetchall()
    return render_template('article.html', article=article, comments=comments)
\`\`\`

### Jinja2 模板骨架

**index.html（文章列表）**：
\`\`\`html
{% extends "base.html" %}
{% block content %}
<h1>📝 博客文章</h1>
{% for article in articles %}
  <div class="article-card">
    <h2><a href="/article/{{ article.id }}">{{ article.title }}</a></h2>
    <p class="meta">{{ article.author }} · {{ article.created_at }}</p>
    <p>{{ article.content[:150] }}...</p>
  </div>
{% endfor %}
{% endblock %}
\`\`\`

**article.html（文章详情）**：
\`\`\`html
{% extends "base.html" %}
{% block content %}
<article>
  <h1>{{ article.title }}</h1>
  <p class="meta">{{ article.author }} · {{ article.created_at }}</p>
  <div class="content">{{ article.content }}</div>
</article>

<section class="comments">
  <h2>💬 评论 ({{ comments|length }})</h2>
  {% for comment in comments %}
    <div class="comment">
      <strong>{{ comment.author }}</strong>
      <p>{{ comment.content }}</p>
    </div>
  {% endfor %}
</section>
{% endblock %}
\`\`\`

> 🎯 **关键模式**：列表页查全部 → 详情页查单条+关联评论 → 编辑器用同一模板处理创建和编辑。`,
      starterCode: `import sqlite3

# 模拟 Flask 博客的核心数据操作
conn = sqlite3.connect(':memory:')
conn.row_factory = sqlite3.Row
db = conn.cursor()

# 建表
db.executescript('''
    CREATE TABLE articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        author TEXT DEFAULT '匿名',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        article_id INTEGER NOT NULL,
        author TEXT DEFAULT '匿名',
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (article_id) REFERENCES articles(id)
    );
''')

# 插入测试文章
articles_data = [
    ('Python 入门指南', '从零开始学 Python，涵盖基础语法...', '小明'),
    ('Flask Web 开发', '搭建你的第一个网站，从路由到部署...', '小红'),
    ('用 SQLite 存储数据', '爬虫数据持久化的最佳拍档...', '小明'),
]
db.executemany(
    'INSERT INTO articles (title, content, author) VALUES (?, ?, ?)',
    articles_data
)

# 插入测试评论
db.executemany(
    'INSERT INTO comments (article_id, author, content) VALUES (?, ?, ?)',
    [(1, '读者A', '写得太好了！'), (1, '读者B', '期待更新'),
     (2, '读者C', 'Flask 真好用'), (3, '读者A', 'SQLite 太方便了')]
)
conn.commit()

# ---- 模拟路由操作 ----
print('=== 📋 文章列表（首页） ===')
articles = db.execute(
    'SELECT id, title, author, created_at FROM articles ORDER BY id'
).fetchall()
for a in articles:
    print(f'  [{a["id"]}]《{a["title"]}》— {a["author"]}')

print(f'\\n=== 📖 文章详情（ID=1） ===')
article = db.execute('SELECT * FROM articles WHERE id = ?', (1,)).fetchone()
print(f'  标题: {article["title"]}')
print(f'  作者: {article["author"]}')
print(f'  内容: {article["content"][:40]}...')

print(f'\\n=== 💬 评论列表 ===')
comments = db.execute(
    'SELECT * FROM comments WHERE article_id = ? ORDER BY id', (1,)
).fetchall()
print(f'  共 {len(comments)} 条评论:')
for c in comments:
    print(f'    [{c["author"]}] {c["content"]}')

conn.close()
`,
      expectedOutput: `=== 📋 文章列表（首页） ===
  [1]《Python 入门指南》— 小明
  [2]《Flask Web 开发》— 小红
  [3]《用 SQLite 存储数据》— 小明

=== 📖 文章详情（ID=1） ===
  标题: Python 入门指南
  作者: 小明
  内容: 从零开始学 Python，涵盖基础语法......

=== 💬 评论列表 ===
  共 2 条评论:
    [读者A] 写得太好了！
    [读者B] 期待更新
`,
      hint: '在 Flask 中，用 g 对象存储数据库连接（每个请求一个），用 render_template 渲染 Jinja2 模板。模板放在 templates/ 文件夹。',
    },
    {
      id: 'p4.3',
      kind: 'demo',
      chapterId: 'p4',
      title: '完整功能：CRUD + 登录保护 + 评论 + 样式',
      content: `## 🎨 完整博客：CRUD + 登录 + 评论 + 美化

前面搭好了骨架，现在把所有功能串起来。

### 登录保护装饰器

\`\`\`python
from functools import wraps
from flask import session, redirect, flash

def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'user_id' not in session:
            flash('请先登录', 'error')
            return redirect('/login')
        return f(*args, **kwargs)
    return decorated

@app.route('/article/new', methods=['GET', 'POST'])
@login_required
def create_article():
    # 只有登录用户才能创建文章
    ...
\`\`\`

### 完整 CRUD 操作

\`\`\`python
# Create — 创建文章
@app.route('/article/new', methods=['GET', 'POST'])
@login_required
def create_article():
    if request.method == 'POST':
        db = get_db()
        db.execute(
            'INSERT INTO articles (title, content, author) VALUES (?, ?, ?)',
            (request.form['title'], request.form['content'],
             session.get('username', '匿名'))
        )
        db.commit()
        flash('文章发布成功！', 'success')
        return redirect('/')
    return render_template('editor.html')

# Update — 编辑文章
@app.route('/article/<int:id>/edit', methods=['GET', 'POST'])
@login_required
def edit_article(id):
    db = get_db()
    article = db.execute('SELECT * FROM articles WHERE id = ?', (id,)).fetchone()
    if request.method == 'POST':
        db.execute(
            'UPDATE articles SET title = ?, content = ? WHERE id = ?',
            (request.form['title'], request.form['content'], id)
        )
        db.commit()
        flash('文章已更新', 'success')
        return redirect(f'/article/{id}')
    return render_template('editor.html', article=article)

# Delete — 删除文章
@app.route('/article/<int:id>/delete', methods=['POST'])
@login_required
def delete_article(id):
    db = get_db()
    db.execute('DELETE FROM articles WHERE id = ?', (id,))
    db.execute('DELETE FROM comments WHERE article_id = ?', (id,))
    db.commit()
    flash('文章已删除', 'success')
    return redirect('/')
\`\`\`

### 添加评论功能

\`\`\`python
@app.route('/article/<int:id>/comment', methods=['POST'])
def add_comment(id):
    db = get_db()
    db.execute(
        'INSERT INTO comments (article_id, author, content) VALUES (?, ?, ?)',
        (id, request.form.get('author', '匿名'), request.form['content'])
    )
    db.commit()
    flash('评论发表成功！', 'success')
    return redirect(f'/article/{id}')
\`\`\`

### CSS 美化要点

\`\`\`css
/* 核心样式思路 */
body { max-width: 800px; margin: 0 auto; font-family: sans-serif; }
.article-card { border-bottom: 1px solid #eee; padding: 1rem 0; }
.comment { background: #f9f9f9; padding: 0.8rem; margin: 0.5rem 0; border-radius: 8px; }
.flash-success { background: #d4edda; color: #155724; padding: 0.8rem; }
.flash-error { background: #f8d7da; color: #721c24; padding: 0.8rem; }
\`\`\`

### 项目结构总览

\`\`\`
blog/
├── app.py              # Flask 应用主文件
├── blog.db             # SQLite 数据库文件
├── templates/
│   ├── base.html       # 父模板（导航栏 + 页脚 + CSS）
│   ├── index.html      # 首页文章列表
│   ├── article.html    # 文章详情 + 评论
│   ├── editor.html     # 创建/编辑文章表单
│   └── login.html      # 登录页面
└── uploads/            # 上传文件目录（可选）
\`\`\`

> 🎯 **项目总结**：从零到一，你完成了一个完整的全栈博客！核心知识点：Flask路由 + SQLite CRUD + Jinja2模板继承 + Session登录 + Flash消息 + CSS美化。这就是 Web 开发的基础全貌。`,
      starterCode: `import sqlite3
from hashlib import sha256

# 模拟博客完整功能（CRUD + 登录 + 评论）
conn = sqlite3.connect(':memory:')
conn.row_factory = sqlite3.Row
db = conn.cursor()

# 初始化
db.executescript('''
    CREATE TABLE articles (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, author TEXT DEFAULT '匿名');
    CREATE TABLE comments (id INTEGER PRIMARY KEY AUTOINCREMENT, article_id INTEGER, author TEXT DEFAULT '匿名', content TEXT);
    CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password_hash TEXT);
    INSERT INTO articles (title, content, author) VALUES ('我的第一篇文章', '欢迎来到我的博客！', '小明');
    INSERT INTO users (username, password_hash) VALUES ('admin', '');
''')

# 设置密码
db.execute('UPDATE users SET password_hash = ? WHERE username = ?',
           (sha256('123456'.encode()).hexdigest(), 'admin'))
conn.commit()

# ---- 辅助函数 ----
def check_login(username, password):
    row = db.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone()
    return row and row['password_hash'] == sha256(password.encode()).hexdigest()

def create_article(title, content, author):
    db.execute('INSERT INTO articles (title, content, author) VALUES (?, ?, ?)',
               (title, content, author))
    conn.commit()
    return db.lastrowid

def add_comment(article_id, author, content):
    db.execute('INSERT INTO comments (article_id, author, content) VALUES (?, ?, ?)',
               (article_id, author, content))
    conn.commit()

def delete_article(id):
    db.execute('DELETE FROM comments WHERE article_id = ?', (id,))
    db.execute('DELETE FROM articles WHERE id = ?', (id,))
    conn.commit()

# ---- 测试完整流程 ----
print('🔐 登录测试:')
print(f'  admin/123456: {"✅ 成功" if check_login("admin", "123456") else "❌ 失败"}')
print(f'  admin/wrong:  {"❌ 失败" if not check_login("admin", "wrong") else "✅ 成功"}')

print('\\n✍️  创建文章:')
new_id = create_article('Flask 入门', 'Flask 是 Python 的微框架...', 'admin')
print(f'  新文章 ID: {new_id}')

print('\\n💬 添加评论:')
add_comment(new_id, '读者A', '好文章！')
add_comment(new_id, '读者B', '学习了')
comments = db.execute('SELECT * FROM comments WHERE article_id = ?', (new_id,)).fetchall()
for c in comments:
    print(f'  [{c["author"]}] {c["content"]}')

print('\\n📋 所有文章:')
articles = db.execute('SELECT * FROM articles ORDER BY id').fetchall()
for a in articles:
    print(f'  [{a["id"]}]《{a["title"]}》— {a["author"]}')

print('\\n🗑️  删除第一篇文章...')
delete_article(1)
remaining = db.execute('SELECT COUNT(*) as c FROM articles').fetchone()['c']
print(f'  剩余文章数: {remaining}')

conn.close()
print('\\n✅ 博客核心功能演示完成！')
`,
      expectedOutput: `🔐 登录测试:
  admin/123456: ✅ 成功
  admin/wrong:  ❌ 失败

✍️  创建文章:
  新文章 ID: 2

💬 添加评论:
  [读者A] 好文章！
  [读者B] 学习了

📋 所有文章:
  [1]《我的第一篇文章》— 小明
  [2]《Flask 入门》— admin

🗑️  删除第一篇文章...
  剩余文章数: 1

✅ 博客核心功能演示完成！
`,
      hint: '完整项目建议：把 base.html 的 CSS 写得好看一点，加个富文本编辑器（如 SimpleMDE），再加个 RSS 订阅——你的博客就相当专业了！',
    },
  ],
};

export const part4Chapters: Chapter[] = [ch17, ch18, ch19, ch20, p4];
