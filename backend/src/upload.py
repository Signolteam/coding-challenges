import codecs
import csv
import datetime
from collections import OrderedDict

from fastapi import UploadFile, HTTPException
from sqlmodel import Session, select

from src.database import create_session
from src.models import Company, Person, TaskStatus, Task

# CSV file column headers
TASK_OWNER = 'task_owner'
EMAIL = 'email'
COMPANY_NAME = 'company_name'
TASK_DATE = 'task_date'
TASK_DESCRIPTION = 'task_description'
TASK_STATUS = 'task_status'


class Cache:
    session = None
    cached_task_status = {}
    cached_companies = {}
    cached_people = {}

    def __init__(self, session: Session, rows: list):
        self.session = session

        self.refresh_cache(session)

        for row in rows:
            if row[EMAIL] not in self.cached_people:
                person = Person()
                person.name = row[TASK_OWNER]
                person.email = row[EMAIL]
                self.session.add(person)
                self.cached_people[row[EMAIL]] = True
            if row[COMPANY_NAME] not in self.cached_companies:
                company = Company()
                company.name = row[COMPANY_NAME]
                self.session.add(company)
                self.cached_companies[row[COMPANY_NAME]] = True
            if row[TASK_STATUS] not in self.cached_task_status:
                task_status = TaskStatus()
                task_status.name = row[TASK_STATUS]
                self.session.add(task_status)
                self.cached_task_status[row[TASK_STATUS]] = True

        session.commit()

        self.refresh_cache(session)

    def refresh_cache(self, session: Session):
        self.cached_task_status = {}
        self.cached_companies = {}
        self.cached_people = {}
        all_task_status = session.exec(select(TaskStatus)).all()
        for task_status in all_task_status:
            self.cached_task_status[task_status.name] = task_status.id
        all_people = session.exec(select(Person)).all()
        for person in all_people:
            self.cached_people[person.email] = person.id
        all_companies = session.exec(select(Company)).all()
        for company in all_companies:
            self.cached_companies[company.name] = company.id

    def get_or_create_task_status(self, name: str) -> int:
        if name in self.cached_task_status:
            return self.cached_task_status[name]

        task_status = TaskStatus()
        task_status.name = name
        self.session.add(task_status)
        self.session.commit()
        self.session.refresh(task_status)
        self.cached_task_status[name] = task_status.id
        return task_status.id

    def get_or_create_company(self, name: str) -> int:

        if name in self.cached_companies:
            return self.cached_companies[name]

        company = Company()
        company.name = name
        self.session.add(company)
        self.session.commit()
        self.session.refresh(company)
        self.cached_companies[name] = company.id
        return company.id

    def get_or_create_person(self, name: str, email: str) -> int:
        if email in self.cached_people:
            return self.cached_people[email]

        person = Person()
        person.name = name
        person.email = email
        self.session.add(person)
        self.session.commit()
        self.session.refresh(person)
        self.cached_people[email] = person.id
        return person.id


def upload_csv(uploaded_file: UploadFile) -> int:
    with create_session() as session:
        try:
            reader = csv.DictReader(codecs.iterdecode(uploaded_file.file, 'utf-8'))

            # Make sure the format of the CSV headers is what we expect
            expected_field_names = [TASK_OWNER, EMAIL, COMPANY_NAME, TASK_DATE, TASK_DESCRIPTION, TASK_STATUS]
            if reader.fieldnames != expected_field_names:
                raise AssertionError(f"Expecting field names {expected_field_names} but got {reader.fieldnames}")

            # Read all rows, as this allows us to improve the subsequent database operations
            rows = list(reader)
            cache = Cache(session, rows)

            count = 0
            for row in rows:
                process_row(row, session, cache)
                count += 1

            session.commit()
            return count
        except ValueError as ex:
            raise HTTPException(status_code=400, detail=f"Error processing uploaded file: {ex}")
        finally:
            uploaded_file.file.close()


def process_row(row: OrderedDict, session: Session, cache: Cache):
    row_task_owner = row[TASK_OWNER]
    row_email = row[EMAIL]
    row_company_name = row[COMPANY_NAME]
    row_task_date = datetime.date.fromisoformat(row[TASK_DATE])
    row_task_description = row[TASK_DESCRIPTION]
    row_task_status = row[TASK_STATUS]

    status_id = cache.get_or_create_task_status(row_task_status)
    owner_id = cache.get_or_create_person(row_task_owner, row_email)
    company_id = cache.get_or_create_company(row_company_name)

    # Create task
    task = Task()
    task.owner_id = owner_id
    task.task_date = row_task_date
    task.description = row_task_description
    task.company_id = company_id
    task.status_id = status_id

    session.add(task)
