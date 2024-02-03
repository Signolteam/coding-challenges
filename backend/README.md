# Tasks Management Portal - Backend

# Deployment
The back end for the portal is deployed using CDK (Typescript), see [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/work-with-cdk-typescript.html).

## One off setup
To prepare the AWS environment to use CDK deployment, a bootstrap process needs to be ran once.
-   `cdk bootstrap aws://ACCOUNT-NUMBER/REGION`

## Stacks
The deployment is split up between 3 different stacks, `MainStack`, `LambdaStack` and `ReactStack`.

### Deployment
To deploy the entire solution, run `cdk deploy --all --profile {{profile}}`.

Each stack referenced within the [bin/main](src/infrastructure/aws/bin/main.ts) file will be deployed.

To see a more detailed view of the deployment, log on to the AWS console and open the stacks from the Cloudformation area.

### MainStack
To individually deploy this stack, run `cdk deploy MainStack --profile {{profile}}`.

See [MainStack](src/infrastructure/aws/lib/main-stack.ts)

This stack handles the creation of:
* PostgreSQL RDS instance
* RDS Database Proxy
* VPC
* Network interfaces
* Security groups

### LambdaStack
To individually deploy this stack, run `cdk deploy LambdaStack --profile {{profile}}`.

See [LambdaStack](src/infrastructure/aws/lib/lambda-stack.ts)

This stack handles the creation of:
* Various lambda
* API Gateway
* S3 bucket - upload CSV files to
* Granting access to resources

### ReactStack
To individually deploy this stack, run `cdk deploy ReactStack --profile {{profile}}`.

See [ReactStack](src/infrastructure/aws/lib/react-stack.ts)

This stack handles the creation of:
* S3 Bucket - hosting the react APP in
* CloudFront Distribution - provide a domain to access the APP from S3

# Architecture
## Database
RDS PostgreSQL database runs within a VPC. The database password is stored in Secrets Manager.

## S3 Bucket
A S3 bucket is used to upload CSV files too.

## Lambdas
As the lambdas need access to the database, they sit within the same VPC as the database. Interface endpoints have been added to give the lambdas access to Secrets Manager and S3.

## API Gateway & Lambdas
API Gateway endpoints pointing to individual lambdas have been used to handle CRUD operations on `tasks` as well as being able to retrieve all `tasks` from the Postgresql database.

## CSV file upload & import Lambdas
1. A lambda is used to generate a signed S3 URL that can be used by the front end to upload a CSV file too. 
2. Once the file has been uploaded to S3, a lambda is automatically triggered. 
3. The lambda processes the CSV content and imports it into the Postgresql database.

## Diagram
![Tasks Management Portal architecture diagram](docs/output/tasks.svg 'Tasks Management Portal architecture diagram')

To make amendments to the diagram, use [C4Builder](https://adrianvlupu.github.io/C4-Builder/#/).
- Install: `npm i c4builder -g`

- Icons reference: https://github.com/awslabs/aws-icons-for-plantuml/blob/main/AWSSymbols.md

# Tests
## Run all UNIT & Integration tests
1. Start Docker
2. Run `npm run test`

## Run UNIT tests
Run `npm run test:unit`

## Run Integration tests
1. Start Docker
2. Run `npm run test:int`

### Debug Integration tests
1. Start Docker
2. Run `npm run pretest:int` - runs docker compose to setup local database
3. Debug tests as normal
4. Run `npm run posttest:int` - deletes docker container

** The SQL table gets created as part of docker compose by using an [initialization script](./tests/dataset/init.sql).

# Run Lambda's Locally
## Prerequisites
* [Docker](https://www.docker.com/)
* [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
* [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/work-with-cdk-typescript.html)

## Initial setup
1. Start Docker
2. Create local Postgresql DB
    - Start up `npm run local-dev`
    - Tear down `npm run local-dev:post`
3. Run `cdk synth`
    - This command needs running after any lambda changes
    - This is needed as the infrastructure of the lambdas has been configured via CDK
    - See [AWS Docs](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/

## Invoke lambdas via local HTTP requests
1. Start local web server
    - `sam local start-api --env-vars ./localsetup/env.json -t ./cdk.out/LambdaStack.template.json`
2. Make HTTP requests:
    - GET: http://127.0.0.1:3000/tasks - all tasks
    - GET: http://127.0.0.1:3000/tasks/{id} - get task by id
    - POST: http://127.0.0.1:3000/task - create task
    - PUT: http://127.0.0.1:3000/tasks/{id} - update task
    - DELETE: http://127.0.0.1:3000/tasks/{id} - delete task

    Event request body:
    ```JSON
    {
        "owner": "John Smith",
        "email": "test@test.co.uk",
        "company": "Google",
        "date": "25/01/2024",
        "description": "this is a test",
        "status": "IN_REVIEW"
    }
    ```

## Invoke individual lambdas using SAM
 To mimic the lambdas from being invoked via API Gateway, use the event files provided as follows:

### Create task
To create a `task`, change the `body` as required within this [events json file](./events/create-task.json).

`sam local invoke -e ./events/create-task.json --env-vars ./localsetup/env.json -t ./cdk.out/LambdaStack.template.json CreateTask`

### Update task
To update a `task`, change the path paramter `id` and `body` within this [events json file](./events/update-task.json).

`sam local invoke -e ./events/update-task.json --env-vars ./localsetup/env.json -t ./cdk.out/LambdaStack.template.json UpdateTask`

### Get task
To get a `task`, change the path paramter `id` within this [events json file](./events/get-task-by-id.json).

`sam local invoke -e ./events/get-task-by-id.json --env-vars ./localsetup/env.json -t ./cdk.out/LambdaStack.template.json GetTaskById`

### Get tasks
`sam local invoke --env-vars ./localsetup/env.json -t ./cdk.out/LambdaStack.template.json GetTasks`

### Delete task
To delete a `task`, update the path paramter `id` within this [events json file](./events/delete-task.json).

`sam local invoke -e ./events/delete-task.json --env-vars ./localsetup/env.json -t ./cdk.out/LambdaStack.template.json DeleteTask`
