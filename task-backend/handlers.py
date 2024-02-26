import json
import psycopg2
import os
from datetime import datetime

print("attempting to create db connection");
print(f"checking env: host={os.environ.get('POSTGRES_HOST')}")
connection = psycopg2.connect(user=os.environ.get('POSTGRES_USER'),
                          password=os.environ.get('POSTGRES_PASS'),
                          host=os.environ.get('POSTGRES_HOST'),
                          database=os.environ.get('POSTGRES_DB'))

def cleanup(connection, cursor):
    connection.commit()
    if cursor is not None:
        cursor.close()

def serialize_task(task):
    serialized_task = {
      "id": task[0],
      "createdBy": task[1],
      "companyName": task[2],
      "description": task[3],
      "email": task[4],
      "date": str(task[5]),
      "status": task[6]
    }
    return serialized_task

def with_request_tracking(request_handler):
    def wrapper(event, context):
        try:
            cursor = connection.cursor()
            query = '''INSERT INTO requests
                    (source, timestamp, action) VALUES (%s, %s, %s);'''
            cursor.execute(query,
                (event['requestContext']['http']['sourceIp'],
                 datetime.fromtimestamp(
                     event['requestContext']['timeEpoch'] / 1000.0),
                 event['routeKey']))
        except Exception as e:
            print(f"Request tracking failed with:\n{repr(e)}")
        finally:
            cleanup(connection, cursor)
        return request_handler(event, context)
    return wrapper

def with_error_handling(request_handler):
    def wrapper(event, context):
        try:
            return request_handler(event, context)
        except psycopg2.errors.StringDataRightTruncation:
            response = {
                "statusCode": 400,
                "body": {"message": "String field exceeded maximum length."}
            }
            print(response);
            return json.dumps(response)
        except Exception as e:
            response = {
                "statusCode": 500,
                "body": {"message": f"Server error: {repr(e)}"}
            }
            print(response);
            return json.dumps(response)
    return wrapper

@with_error_handling
@with_request_tracking
def fetch_all(event, context):
    try:
        print(f"Attempting fetch_all...")
        cursor = connection.cursor()
        query = '''SELECT
            id, created_by, company_name, description, email, date, status
            FROM tasks
            ORDER BY date DESC, id DESC;'''
        cursor.execute(query)
        results = cursor.fetchall()
        response = {
            "statusCode": 200,
            "body": json.dumps([serialize_task(task) for task in results])
        }
        print(f"fetch_all succeeded")
        return response
    finally :
        cleanup(connection, cursor)

@with_error_handling
@with_request_tracking
def update(event, context):
    try:
        task_id = event['pathParameters']['id']
        task = json.loads(event['body'])
        print(f"Attempting to update task {task_id} with {task}");
        cursor = connection.cursor()
        query = '''UPDATE tasks
            SET (created_by, company_name, description, email, date, status)
            = (%s,%s,%s,%s,%s,%s) WHERE id = %s'''
        cursor.execute(query,
                       (task['createdBy'], task['companyName'],
                        task['description'], task['email'],
                        task['date'], task['status'], task_id))
        print(f"Successfully updated {task_id} with {task}");
        response = {"statusCode": 200}
        return response
    finally :
        cleanup(connection, cursor)

@with_error_handling
@with_request_tracking
def create_many(event, context):
    try:
        body = json.loads(event['body'])
        cursor = connection.cursor()
        insert_data = [(task['createdBy'], task['companyName'],
                        task['description'], task['email'],
                        task['date'], task['status']) for task in body]
        records_list_template = ','.join(['%s'] * len(insert_data))
        query = '''INSERT INTO tasks
                (created_by, company_name, description, email, date, status)
                VALUES {}'''.format(records_list_template)
        cursor.execute(query, insert_data)
        response = {"statusCode": 200}
        return response
    finally :
        cleanup(connection, cursor)
