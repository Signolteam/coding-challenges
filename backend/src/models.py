from typing import Optional

from sqlmodel import Field, SQLModel, create_engine

from src.database import get_database_url

engine = create_engine(get_database_url(), echo=True)


def create_db_schema():
    SQLModel.metadata.create_all(engine)


class Hero(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    secret_name: str
    age: Optional[int] = None
