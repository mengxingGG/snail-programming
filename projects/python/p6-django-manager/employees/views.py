# views.py — Django CBV 视图
#
# 所属项目：p6-django-manager
#
# 功能说明：
# 使用 Django 基于类的视图（Class-Based Views）实现员工的 CRUD 操作。
# 使用通用视图减少样板代码。
#
# 你需要实现：
# 1. EmployeeListView 继承 ListView：
#    - model = Employee
#    - template_name = 'employees/employee_list.html'
#    - context_object_name = 'employees'
#    - paginate_by = 20
#    - ordering = ['-hire_date']
#    - 可添加搜索功能（处理 GET 参数 q）
# 2. EmployeeDetailView 继承 DetailView：
#    - model = Employee
#    - template_name = 'employees/employee_detail.html'
#    - context_object_name = 'employee'
# 3. EmployeeCreateView 继承 CreateView：
#    - model = Employee
#    - template_name = 'employees/employee_form.html'
#    - fields = 除 created_at/updated_at 外的所有字段
#    - success_url = reverse_lazy('employee_list')
# 4. EmployeeUpdateView 继承 UpdateView：
#    - 与 CreateView 类似，但更新已有记录
#
# 相关文件：
# - models.py：Employee, Department 模型
# - templates/employees/employee_list.html：列表模板
# - urls.py：URL 配置（需学生自行在 config/urls.py 中配置）
#
# 关键 API：
# - django.views.generic：ListView, DetailView, CreateView, UpdateView
# - django.urls.reverse_lazy：延迟 URL 解析

from django.views.generic import ListView, DetailView, CreateView, UpdateView
from django.urls import reverse_lazy
from .models import Employee, Department


class EmployeeListView(ListView):
    """员工列表视图：分页显示所有员工，支持搜索。"""
    
    # TODO: 配置 model, template_name, context_object_name, paginate_by, ordering
    pass


class EmployeeDetailView(DetailView):
    """员工详情视图。"""
    
    # TODO: 配置 model, template_name, context_object_name
    pass


class EmployeeCreateView(CreateView):
    """新建员工视图。"""
    
    # TODO: 配置 model, template_name, fields, success_url
    pass


class EmployeeUpdateView(UpdateView):
    """编辑员工视图。"""
    
    # TODO: 配置 model, template_name, fields, success_url
    pass
