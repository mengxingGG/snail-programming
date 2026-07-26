# p6-django-manager — Django 员工管理系统

## 功能列表
- 查看员工列表（分页）
- 查看员工详情
- 添加新员工
- 编辑员工信息
- Django Admin 后台管理

## 学习目标
- Django 项目结构（models, views, templates, admin）
- Django ORM（模型定义、查询）
- 基于类的视图（ListView, DetailView, CreateView, UpdateView）
- Django Admin 自定义
- Django 模板系统

## 项目结构
```
p6-django-manager/
├── README.md                           ← 你在这里
├── manage.py                           ← Django 管理脚本
├── employees/
│   ├── models.py                       ← Department + Employee 模型
│   ├── admin.py                        ← Admin 注册
│   └── views.py                        ← 视图（CBV）
└── templates/
    └── employees/
        └── employee_list.html           ← 员工列表模板
```

注意：此项目需要先通过 `django-admin startproject` 创建完整 Django 项目，
然后将这些文件放入对应位置。本目录仅包含核心业务代码的 stub 文件。

## 如何运行
```bash
# 1. 创建 Django 项目
django-admin startproject config .
# 2. 创建 employees app
python manage.py startapp employees
# 3. 将本目录的文件覆盖到对应位置
# 4. 迁移数据库
python manage.py makemigrations
python manage.py migrate
# 5. 创建超级用户
python manage.py createsuperuser
# 6. 启动开发服务器
python manage.py runserver
```
