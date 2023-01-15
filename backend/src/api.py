import os

from fastapi import FastAPI
from mangum import Mangum

stage = os.environ.get('STAGE', None)
openapi_prefix = f"/{stage}" if stage else "/"

app = FastAPI(title="Signol Tech Test", openapi_prefix=openapi_prefix)


@app.get("/")
def read_root():
    return {"Hello": "World"}


handler = Mangum(app)
