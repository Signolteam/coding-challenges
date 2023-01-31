from django.shortcuts import render
from django.views import generic
from rest_framework import viewsets
from .serializers import TaskSerializer
from .models import Task


class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all().order_by('-status')
    

class TaskViewGeneric(generic.ListView):
    paginate_by = 25
    template_name = "tasks/tasks.html"
    context_object_name = "tasks"
    
    def get_queryset(self):
        return Task.objects.all().order_by('-status')
