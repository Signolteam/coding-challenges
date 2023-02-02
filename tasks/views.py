from django.urls import reverse
from django.http import HttpResponseRedirect
from django.views import generic
from rest_framework import viewsets
from .serializers import TaskSerializer
from .models import Task


class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all().order_by('-status')
    

class TaskViewGeneric(generic.ListView):
    paginate_by = 25
    template_name = 'tasks/tasks.html'
    context_object_name = 'tasks'
    
    def get_queryset(self):
        return Task.objects.all().order_by('-status')


# TODO Raise messages instead of fail silently in all exceptions.
def upload_csv(request):
    if "GET" == request.method:
        return HttpResponseRedirect(reverse('tasks:task'))
    if "POST" == request.method:
        try:
            csv_file = request.FILES['upload-csv']
            if not csv_file.name.endswith('.csv'):
                return HttpResponseRedirect(reverse('tasks:task'))
            if csv_file.multiple_chunks():
                return HttpResponseRedirect(reverse('tasks:task'))
            file_data = csv_file.read().decode("utf-8")		

            lines = file_data.split("\n")
            for line in lines[1:]:
                fields = line.split(",")
                data_dict = {}
                data_dict['created_by'] = fields[0]
                data_dict['email'] = fields[1]
                data_dict['company'] = fields[2]
                data_dict['completed_by'] = fields[3]
                data_dict['description'] = fields[4]
                data_dict['status'] = fields[5]
                try:
                    Task.objects.create(**data_dict)			
                except Exception:
                    pass
            return HttpResponseRedirect(reverse('tasks:task'))
        except Exception:
            return HttpResponseRedirect(reverse('tasks:task'))
