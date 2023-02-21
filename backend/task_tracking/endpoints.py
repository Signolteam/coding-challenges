from typing import List

from fastapi import APIRouter

from task_tracking.models import Task
from task_tracking.schemas import TaskSchema, TaskCreateSchema, TaskUpdateSchema

router = APIRouter()


@router.post("/tasks", response_model=TaskSchema)
def create_task(task: TaskCreateSchema):
    task = Task.objects.create(**task.dict())

    return TaskSchema.from_django(task)


@router.get("/tasks", response_model=List[TaskSchema])
def list_tasks():
    return TaskSchema.from_django(Task.objects.all(), many=True)


@router.put("/tasks/{id}", response_model=TaskSchema)
def update_task(id: int, task_data: TaskUpdateSchema):
    task = Task.objects.get(id=id)

    # Update the task object with the new data
    for k, v in task_data.dict().items():
        setattr(task, k, v)
    task.save()

    return TaskSchema.from_django(task).dict()
