from fastapi import FastAPI\

from src.models import create_db_schema

v1 = FastAPI(
    title="Signol Tech Test - Doron",
    description="API for a 'Task Management Panel' as part of Signol's tech test",
    version="1.0.0",
)


@v1.get("/hero")
def read_hero():
    create_db_schema()
    return {"message": "created all models (hero)"}
