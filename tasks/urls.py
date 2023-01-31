from .views import TaskViewGeneric
from django.urls import path

app_name = 'post'

urlpatterns =[
    path('', TaskViewGeneric.as_view(), name='tasks'),
]
