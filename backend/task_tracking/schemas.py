from djantic import ModelSchema

from task_tracking.models import Task


class TaskCreateSchema(ModelSchema):
    class Config:
        model = Task
        include = [
            "owner",
            "email",
            "date",
            "company_name",
            "description",
            "status",
        ]


class TaskUpdateSchema(ModelSchema):
    class Config:
        model = Task
        include = ["status"]


class TaskSchema(ModelSchema):
    class Config:
        model = Task
