# from django.urls import path
# from . import views  # นำเข้า views.py

# urlpatterns = [
#     path('', views.api_home, name="api_home"),  # สร้าง API หลัก
# ]

from django.urls import path
from backend.api.views import signup, login_view, get_user_info, get_customers, add_machine, get_machines, add_usage, get_usages, add_maintenance, get_maintenances
from .views import get_machines, add_machine, get_user_info

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login_view, name='login'),
    path('customers/', get_customers, name='get_customers'),
    path("user-info/", get_user_info, name="user-info"),
    path('machines/', add_machine, name='add_machine'),
    path('machines/list/', get_machines, name='get_machines'),
    path('usage/', add_usage, name='add_usage'),
    path('usage/list/', get_usages, name='get_usages'),
    path('maintenance/', add_maintenance, name='add_maintenance'),
    path('maintenance/list/', get_maintenances, name='get_maintenances'),

]


