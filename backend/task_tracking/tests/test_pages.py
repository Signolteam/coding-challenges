from datetime import date

import pytest

from task_tracking.schemas import TaskSchema
from task_tracking.models import Task


@pytest.fixture(scope="function")
def task():
    return Task.objects.create(
        owner="user 1",
        email="user1@example.com",
        company_name="Company 1",
        description="example task",
        status="IR",
        date=date.today()
    )


@pytest.mark.django_db
def test_model_schema(task):
    schema = TaskSchema.from_django(task)
    assert schema.dict() == {
        "id": task.id,
        "owner": task.owner,
        "email": task.email,
        "company_name": task.company_name,
        "date": task.date,
        "description": task.description,
        "status": task.status,
    }
    assert schema.schema() == {
        "title": "TaskSchema",
        "description": "Task(id, owner, email, company_name, date, description, status)",
        "type": "object",
        "properties": {
            "id": {"title": "Id", "description": "id", "type": "integer"},
            "owner": {
                "title": "Owner",
                "description": "owner",
                "maxLength": 55,
                "type": "string",
            },
            "email": {
                "title": "Email",
                "description": "email",
                "maxLength": 254,
                "type": "string",
            },
            "company_name": {
                "title": "Company_Name",
                "description": "company_name",
                "maxLength": 55,
                "type": "string",
            },
            "date": {
                "title": "Date",
                "description": "date",
                "type": "string",
                "format": "date",
            },
            "description": {
                "title": "Description",
                'maxLength': 1000,
                "description": "description",
                "type": "string",
            },
            "status": {
                "default": "IR",
                "title": "Status",
                "description": "status",
                "maxLength": 2,
                "type": "string",
            },
        },
        "required": ["owner", "email", "company_name", "date", "description",],
    }