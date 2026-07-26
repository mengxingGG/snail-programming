# p4-blog — Flask 博客应用

## 功能列表
- 用户注册 / 登录 / 登出（session-based）
- 发布博客文章（登录后）
- 浏览所有文章（首页列表）
- 查看文章详情
- 文章作者可编辑/删除自己的文章

## 学习目标
- Flask 路由与视图函数
- Jinja2 模板继承与渲染
- SQLite 数据库操作（sqlite3）
- Session 认证与装饰器
- Flask 消息闪现（flash）

## 依赖
```bash
pip install flask
```

## 项目结构
```
p4-blog/
├── README.md           ← 你在这里
├── app.py              ← Flask 应用主文件
└── templates/
    ├── base.html       ← 基础模板（导航、flash 消息）
    └── index.html      ← 首页（文章列表）
```

## 如何运行
```bash
python app.py
```
浏览器访问 http://localhost:5000
