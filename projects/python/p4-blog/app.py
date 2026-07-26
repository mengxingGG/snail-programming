# app.py — Flask 博客应用主文件
#
# 所属项目：p4-blog
#
# 功能说明：
# 基于 Flask 的轻量级博客应用。使用 SQLite 存储用户和文章数据，
# 支持用户注册登录、文章的 CRUD 操作。模板使用 Jinja2 渲染。
#
# 你需要实现：
# 1. init_db() — 创建 SQLite 数据库和表（user, post）
# 2. get_db() — 获取数据库连接（使用 g 对象）
# 3. login_required 装饰器 — 检查 session 中是否有 user_id
# 4. register 路由 (GET/POST) — 用户注册
# 5. login 路由 (GET/POST) — 用户登录
# 6. logout 路由 — 清除 session
# 7. index 路由 — 首页文章列表
# 8. create 路由 (GET/POST) — 创建文章（需登录）
# 9. update 路由 (GET/POST /<id>/edit) — 编辑文章（仅作者）
# 10. delete 路由 (POST /<id>/delete) — 删除文章（仅作者）
# 11. view 路由 (GET /<id>) — 文章详情
#
# 相关文件：
# - templates/base.html：基础模板
# - templates/index.html：首页模板
# - README.md：项目说明
#
# 运行方式：
# python app.py
# 访问 http://localhost:5000
#
# 关键 API：
# - flask：Flask, render_template, request, redirect, url_for, flash, session, g
# - sqlite3：数据库操作
# - werkzeug.security：密码哈希

import sqlite3
from flask import Flask, render_template, request, redirect, url_for, flash, session, g

app = Flask(__name__)
app.secret_key = "change-me-to-a-random-secret-key"

DATABASE = "blog.db"


def init_db():
    """初始化数据库：创建 user 表和 post 表（如果不存在）。
    
    user 表:
        id INTEGER PRIMARY KEY AUTOINCREMENT
        username TEXT UNIQUE NOT NULL
        password TEXT NOT NULL
    
    post 表:
        id INTEGER PRIMARY KEY AUTOINCREMENT
        author_id INTEGER NOT NULL (外键 → user.id)
        title TEXT NOT NULL
        body TEXT NOT NULL
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    """
    # TODO: 执行 CREATE TABLE IF NOT EXISTS 语句
    pass


def get_db():
    """获取当前请求的数据库连接，存储在 Flask g 对象中。
    
    Returns:
        sqlite3.Connection: 数据库连接，设置 row_factory = sqlite3.Row
    """
    # TODO: 检查 g 中是否有 'db'，无则创建连接并赋值
    pass


def login_required(view):
    """装饰器：要求用户已登录才能访问被装饰的路由。
    
    未登录用户重定向到 /login 并显示警告消息。
    """
    # TODO: 实现装饰器，检查 session.get('user_id')
    pass


@app.route("/register", methods=["GET", "POST"])
def register():
    """用户注册：GET 显示表单，POST 处理注册。
    
    验证用户名唯一性，密码使用 werkzeug.security.generate_password_hash 哈希后存储。
    """
    # TODO: 实现注册逻辑
    pass


@app.route("/login", methods=["GET", "POST"])
def login():
    """用户登录：GET 显示表单，POST 验证凭据。
    
    验证成功后设置 session['user_id']，重定向到首页。
    """
    # TODO: 实现登录逻辑
    pass


@app.route("/logout")
def logout():
    """用户登出：清除 session，重定向到首页。"""
    # TODO: session.clear() 后重定向
    pass


@app.route("/")
def index():
    """首页：显示所有文章列表（按时间倒序）。
    
    查询所有 post，JOIN user 获取作者名。
    """
    # TODO: 查询文章列表 → render_template('index.html', posts=posts)
    pass


@app.route("/create", methods=["GET", "POST"])
@login_required
def create():
    """创建文章：GET 显示表单，POST 保存文章。
    
    关联当前登录用户为作者。
    """
    # TODO: 实现创建文章逻辑
    pass


@app.route("/<int:id>/edit", methods=["GET", "POST"])
@login_required
def edit(id):
    """编辑文章：GET 显示预填表单，POST 更新文章。
    
    仅文章作者可编辑。
    """
    # TODO: 实现编辑文章逻辑（含权限检查）
    pass


@app.route("/<int:id>/delete", methods=["POST"])
@login_required
def delete(id):
    """删除文章：仅文章作者可删除。"""
    # TODO: 实现删除文章逻辑（含权限检查）
    pass


@app.route("/<int:id>")
def view(id):
    """查看文章详情。"""
    # TODO: 查询单篇文章 → render_template 或重定向
    pass


# 初始化数据库（模块加载时执行）
with app.app_context():
    init_db()

if __name__ == "__main__":
    app.run(debug=True)
