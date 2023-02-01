# -*- coding: utf-8 -*-

# Tests are structured with the AAA approach (Arrange, Act, Assert)
 
from django.utils import timezone
from django.urls import reverse

import pytest

from tasks.models import Task
from tasks.serializers import TaskSerializer

from rest_framework.test import APIClient


pytestmark = pytest.mark.django_db


TASK_URL = reverse('task-list')
def detail_url(task_id):
    """Create and return a task detail URL."""
    return reverse('task-detail', args=[task_id])


@pytest.fixture
def client():
    return APIClient()


@pytest.fixture
def create_task(**params):
    """Create and return a sample task object."""
    defaults = {
        'description': 'This is an example description.',
        'created_by': 'John',
        'email': 'johndoe@example.com',
        'completed_by': timezone.now(),
        'company': 'ExampleCo',
        'status': '2'
    }
    defaults.update(params)

    return Task.objects.create(**defaults)



def test_tasks__get_list_view(client, create_task):
    tasks = Task.objects.all().order_by('-status')
    serializer = TaskSerializer(tasks, many=True)
    
    response = client.get(TASK_URL)
    
    assert response.status_code == 200
    assert response.data['results'] == serializer.data


def test_tasks__get_detail_view(client, create_task):
    url = detail_url(create_task.id)
    serializer = TaskSerializer(create_task)
    
    response = client.get(url)
    
    assert response.status_code == 200
    assert response.data == serializer.data
