from django.contrib import admin
from .models import Task

class TaskAdmin(admin.ModelAdmin):
    list_display = (
        'created_by',
        'completed_by',
        'company',
        'status',
    )

admin.site.register(Task, TaskAdmin)
