from .views import (
    TaskViewGeneric,
    upload_csv,
)
from django.urls import path

app_name = 'post'

urlpatterns =[
    path('', TaskViewGeneric.as_view(), name='task'),
    path('csv', upload_csv, name='csv'),
]
