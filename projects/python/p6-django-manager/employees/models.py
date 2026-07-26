# models.py — Department + Employee 数据模型
#
# 所属项目：p6-django-manager
#
# 功能说明：
# 定义部门（Department）和员工（Employee）两个 Django 模型。
# 部门与员工是一对多关系：一个部门可以有多个员工。
#
# 你需要实现：
# 1. Department 模型：
#    - name: CharField(max_length=100, unique=True)
#    - created_at: DateTimeField(auto_now_add=True)
#    - __str__ 方法返回部门名称
# 2. Employee 模型：
#    - first_name: CharField(max_length=50)
#    - last_name: CharField(max_length=50)
#    - email: EmailField(unique=True)
#    - phone: CharField(max_length=20, blank=True)
#    - department: ForeignKey(Department, on_delete=models.CASCADE, related_name='employees')
#    - position: CharField(max_length=100) — 职位
#    - salary: DecimalField(max_digits=10, decimal_places=2)
#    - hire_date: DateField()
#    - is_active: BooleanField(default=True)
#    - created_at: DateTimeField(auto_now_add=True)
#    - updated_at: DateTimeField(auto_now=True)
#    - __str__ 方法返回全名
#    - Meta: ordering = ['-hire_date']
#
# 相关文件：
# - admin.py：Admin 注册
# - views.py：视图使用这些模型
# - templates/：模板渲染这些模型数据
#
# 关键 API：
# - django.db.models：Model, CharField, ForeignKey, etc.

from django.db import models


class Department(models.Model):
    """部门模型。"""
    
    # TODO: 定义字段 name, created_at
    # TODO: 定义 __str__ 方法
    
    pass


class Employee(models.Model):
    """员工模型，关联到 Department。"""
    
    # TODO: 定义所有字段
    # TODO: 定义 __str__ 方法（返回全名）
    # TODO: 定义 Meta 类（排序）
    
    pass
