from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TaskSerializer
from .models import Task


class Task(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    
    
    
