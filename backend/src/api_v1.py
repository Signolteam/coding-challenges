from typing import List

from fastapi import FastAPI, HTTPException, Query, UploadFile
from sqlmodel import select

from src.database import create_session
from src.models import (
    Person, PersonRead, PersonCreate, PersonUpdate,
    Company, CompanyRead, CompanyCreate, CompanyUpdate,
    TaskStatus, TaskStatusRead, TaskStatusCreate, TaskStatusUpdate,
    Task, TaskRead, TaskCreate, TaskUpdate,
)
from src.upload import upload_csv

v1 = FastAPI(
    title="Signol Tech Test - Doron",
    description="API for a 'Task Management Panel' as part of Signol's tech test",
    version="1.0.0",
)


########################################################################################################################
# Company - CRUD
########################################################################################################################
@v1.get("/companies/", response_model=List[CompanyRead])
def read_companies(offset: int = 0, limit: int = Query(default=100, le=100)):
    with create_session() as session:
        companies = session.exec(select(Company).offset(offset).limit(limit)).all()
        return companies


@v1.post("/companies/", response_model=CompanyRead)
def create_company(company: CompanyCreate):
    with create_session() as session:
        db_company = Company.from_orm(company)
        session.add(db_company)
        session.commit()
        session.refresh(db_company)
        return db_company


@v1.get("/companies/{company_id}", response_model=CompanyRead)
def read_company(company_id: int):
    with create_session() as session:
        company = session.get(Company, company_id)
        if not company:
            raise HTTPException(status_code=404, detail="Company not found")
        return company


@v1.patch("/companies/{company_id}", response_model=CompanyRead)
def update_company(company_id: int, company: CompanyUpdate):
    with create_session() as session:
        db_company = session.get(Company, company_id)
        if not db_company:
            raise HTTPException(status_code=404, detail="Company not found")
        company_data = company.dict(exclude_unset=True)
        for key, value in company_data.items():
            setattr(db_company, key, value)
        session.add(db_company)
        session.commit()
        session.refresh(db_company)
        return db_company


@v1.delete("/companies/{company_id}")
def delete_company(company_id: int):
    with create_session() as session:
        company = session.get(Company, company_id)
        if not company:
            raise HTTPException(status_code=404, detail="Company not found")
        session.delete(company)
        session.commit()
        return {"ok": True}


########################################################################################################################
# Person - CRUD
########################################################################################################################
@v1.get("/people/", response_model=List[PersonRead])
def read_people(offset: int = 0, limit: int = Query(default=100, le=100)):
    with create_session() as session:
        people = session.exec(select(Person).offset(offset).limit(limit)).all()
        return people


@v1.post("/people/", response_model=PersonRead)
def create_person(person: PersonCreate):
    with create_session() as session:
        db_person = Person.from_orm(person)
        session.add(db_person)
        session.commit()
        session.refresh(db_person)
        return db_person


@v1.get("/people/{person_id}", response_model=PersonRead)
def read_person(person_id: int):
    with create_session() as session:
        person = session.get(Person, person_id)
        if not person:
            raise HTTPException(status_code=404, detail="Person not found")
        return person


@v1.patch("/people/{person_id}", response_model=PersonRead)
def update_person(person_id: int, person: PersonUpdate):
    with create_session() as session:
        db_person = session.get(Person, person_id)
        if not db_person:
            raise HTTPException(status_code=404, detail="Person not found")
        person_data = person.dict(exclude_unset=True)
        for key, value in person_data.items():
            setattr(db_person, key, value)
        session.add(db_person)
        session.commit()
        session.refresh(db_person)
        return db_person


@v1.delete("/people/{person_id}")
def delete_person(person_id: int):
    with create_session() as session:
        person = session.get(Person, person_id)
        if not person:
            raise HTTPException(status_code=404, detail="Person not found")
        session.delete(person)
        session.commit()
        return {"ok": True}


########################################################################################################################
# TaskStatus - CRUD
########################################################################################################################
@v1.get("/task_status/", response_model=List[TaskStatusRead])
def read_task_status(offset: int = 0, limit: int = Query(default=100, le=100)):
    with create_session() as session:
        task_status = session.exec(select(TaskStatus).offset(offset).limit(limit)).all()
        return task_status


@v1.post("/task_status/", response_model=TaskStatusRead)
def create_task_status(task_status: TaskStatusCreate):
    with create_session() as session:
        db_task_status = TaskStatus.from_orm(task_status)
        session.add(db_task_status)
        session.commit()
        session.refresh(db_task_status)
        return db_task_status


@v1.get("/task_status/{task_status_id}", response_model=TaskStatusRead)
def read_task_status(task_status_id: int):
    with create_session() as session:
        task_status = session.get(TaskStatus, task_status_id)
        if not task_status:
            raise HTTPException(status_code=404, detail="TaskStatus not found")
        return task_status


@v1.patch("/task_status/{task_status_id}", response_model=TaskStatusRead)
def update_task_status(task_status_id: int, task_status: TaskStatusUpdate):
    with create_session() as session:
        db_task_status = session.get(TaskStatus, task_status_id)
        if not db_task_status:
            raise HTTPException(status_code=404, detail="TaskStatus not found")
        task_status_data = task_status.dict(exclude_unset=True)
        for key, value in task_status_data.items():
            setattr(db_task_status, key, value)
        session.add(db_task_status)
        session.commit()
        session.refresh(db_task_status)
        return db_task_status


@v1.delete("/task_status/{task_status_id}")
def delete_task_status(task_status_id: int):
    with create_session() as session:
        task_status = session.get(TaskStatus, task_status_id)
        if not task_status:
            raise HTTPException(status_code=404, detail="TaskStatus not found")
        session.delete(task_status)
        session.commit()
        return {"ok": True}


########################################################################################################################
# Task - CRUD
########################################################################################################################
@v1.get("/tasks/", response_model=List[TaskRead])
def read_tasks(offset: int = 0, limit: int = Query(default=100, le=100)):
    with create_session() as session:
        tasks = session.exec(select(Task).offset(offset).limit(limit)).all()
        return tasks


@v1.post("/tasks/", response_model=TaskRead)
def create_task(task: TaskCreate):
    with create_session() as session:
        db_task = Task.from_orm(task)
        session.add(db_task)
        session.commit()
        session.refresh(db_task)
        return db_task


@v1.get("/tasks/{task_id}", response_model=TaskRead)
def read_task(task_id: int):
    with create_session() as session:
        task = session.get(Task, task_id)
        if not task:
            raise HTTPException(status_code=404, detail="Task not found")
        return task


@v1.patch("/tasks/{task_id}", response_model=TaskRead)
def update_task(task_id: int, task: TaskUpdate):
    with create_session() as session:
        db_task = session.get(Task, task_id)
        if not db_task:
            raise HTTPException(status_code=404, detail="Task not found")
        task_data = task.dict(exclude_unset=True)
        for key, value in task_data.items():
            setattr(db_task, key, value)
        session.add(db_task)
        session.commit()
        session.refresh(db_task)
        return db_task


@v1.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    with create_session() as session:
        task = session.get(Task, task_id)
        if not task:
            raise HTTPException(status_code=404, detail="Task not found")
        session.delete(task)
        session.commit()
        return {"ok": True}


########################################################################################################################
# Task - Upload CSV
########################################################################################################################
@v1.post("/tasks/upload/")
async def upload_tasks_from_csv_file(file: UploadFile):
    if file.content_type != "text/csv":
        raise HTTPException(status_code=400, detail="Only CSV files are supported for upload")

    count = upload_csv(file)

    return {"ok": True, "count": count}


@v1.delete("/empty_database", description="WARNING: Deletes all rows from all database tables. Use with caution.")
def empty_database():
    with create_session() as session:
        session.exec("DELETE FROM task")
        session.exec("DELETE FROM person")
        session.exec("DELETE FROM company")
        session.exec("DELETE FROM task_status")
        session.commit()

        return {"ok": True}
