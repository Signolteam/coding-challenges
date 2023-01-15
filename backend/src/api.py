import os

from fastapi import FastAPI
from mangum import Mangum

from src.api_v1 import v1
from src.models import create_db_schema

# When deployed on AWS without a custom domain, we need to add the 'stage' prefix to the path.
# This prefix is not needed when running locally (we can determine where we are using the env variable STAGE).
stage = os.environ.get('STAGE', None)
root_path = f"/{stage}" if stage else None
app = FastAPI(root_path=root_path)


@app.on_event("startup")
def on_startup():
    create_db_schema()


# Allow the API to evolve with new versions in the future
app.mount(f"/api/v1", v1)

# Support deployment to AWS
handler = Mangum(app)
