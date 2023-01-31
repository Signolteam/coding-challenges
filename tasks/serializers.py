from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        field = (
            'id',
            'description',
            'created_by',
            'email',
            'completed_by',
            'company',
            'status',
        )
