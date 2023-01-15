from sqlmodel import create_engine, Session


def get_database_url() -> str:
    import os
    host = os.environ["DB_HOST"]
    port = os.environ["DB_PORT"]
    database_name = os.environ["DB_DATABASE_NAME"]
    user = os.environ["DB_USER"]
    password = os.environ["DB_PASSWORD"]
    url = f"postgresql://{host}:{port}/{database_name}?user={user}&password={password}"
    return url


engine = create_engine(get_database_url())


def create_session():
    return Session(engine)
