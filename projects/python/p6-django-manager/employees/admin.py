# admin.py — Django Admin 注册与自定义
#
# 所属项目：p6-django-manager
#
# 功能说明：
# 将 Department 和 Employee 模型注册到 Django Admin 后台，
# 并自定义 Admin 界面（列表显示字段、搜索、过滤等）。
#
# 你需要实现：
# 1. DepartmentAdmin 继承 admin.ModelAdmin：
#    - list_display: ['name', 'created_at', 'employee_count']
#    - search_fields: ['name']
#    - employee_count 方法：返回该部门员工数
# 2. EmployeeAdmin 继承 admin.ModelAdmin：
#    - list_display: ['first_name', 'last_name', 'email', 'department', 'position', 'hire_date', 'is_active']
#    - list_filter: ['department', 'is_active', 'hire_date']
#    - search_fields: ['first_name', 'last_name', 'email']
#    - list_editable: ['is_active']
# 3. 使用 admin.site.register 注册模型和 Admin 类
#
# 相关文件：
# - models.py：被注册的模型
#
# 关键 API：
# - django.contrib.admin：ModelAdmin, register

from django.contrib import admin
from .models import Department, Employee


class DepartmentAdmin(admin.ModelAdmin):
    """部门 Admin 配置。"""
    
    # TODO: 配置 list_display, search_fields
    # TODO: 实现 employee_count 方法
    pass


class EmployeeAdmin(admin.ModelAdmin):
    """员工 Admin 配置。"""
    
    # TODO: 配置 list_display, list_filter, search_fields, list_editable
    pass


# TODO: 注册模型
# admin.site.register(Department, DepartmentAdmin)
# admin.site.register(Employee, EmployeeAdmin)
