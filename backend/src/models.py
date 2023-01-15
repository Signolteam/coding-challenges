from datetime import date
from typing import Optional, List

from sqlmodel import Field, SQLModel, Relationship

from src.database import engine


def create_db_schema():
    SQLModel.metadata.create_all(engine)


class ModelTableMixin(SQLModel):
    id: Optional[int] = Field(default=None, primary_key=True)


class ModelReadMixin(SQLModel):
    id: int


########################################################################################################################
# Company
########################################################################################################################
class CompanyBase(SQLModel):
    name: str = Field(index=True, unique=True)
    tasks: List["Task"] = Relationship(back_populates="company")


class Company(CompanyBase, ModelTableMixin, table=True):
    pass


class CompanyCreate(CompanyBase):
    pass


class CompanyRead(CompanyBase, ModelReadMixin):
    pass


class CompanyUpdate(SQLModel):
    name: Optional[str] = None


########################################################################################################################
# Person
########################################################################################################################
class PersonBase(SQLModel):
    name: str
    email: str = Field(index=True, unique=True)
    tasks: List["Task"] = Relationship(back_populates="created_by")


class Person(PersonBase, ModelTableMixin, table=True):
    pass


class PersonCreate(PersonBase):
    pass


class PersonRead(ModelReadMixin, PersonBase):
    pass


class PersonUpdate(SQLModel):
    name: Optional[str] = None
    email: Optional[str] = None


########################################################################################################################
# TaskStatus
########################################################################################################################
class TaskStatusBase(SQLModel):
    __tablename__ = "task_status"
    name: str = Field(index=True, unique=True)


class TaskStatus(TaskStatusBase, ModelTableMixin, table=True):
    pass


class TaskStatusCreate(TaskStatusBase):
    pass


class TaskStatusRead(ModelReadMixin, TaskStatusBase):
    pass


class TaskStatusUpdate(SQLModel):
    name: Optional[str] = None


########################################################################################################################
# Task
########################################################################################################################
class TaskBase(SQLModel):
    owner_id: int = Field(foreign_key="person.id")
    owner: Person = Relationship(back_populates="tasks")
    task_date: date
    description: str = Field(max_length=1000)
    company_id: int = Field(foreign_key="company.id")
    company: Company = Relationship(back_populates="tasks")
    status_id: int = Field(foreign_key="task_status.id")
    status: TaskStatus = Relationship(back_populates="tasks")


class Task(TaskBase, ModelTableMixin, table=True):
    pass


class TaskCreate(TaskBase):
    pass


class TaskRead(ModelReadMixin, TaskBase):
    pass


class TaskUpdate(SQLModel):
    task_date: Optional[date] = None
    description: Optional[str] = None
    company_id: Optional[int] = None
    status_id: Optional[int] = None
