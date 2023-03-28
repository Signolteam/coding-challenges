Based on https://github.com/serverless/examples/tree/v3/aws-node-rest-api-typescript

# Usage

## Invoke the function locally

```bash
serverless invoke local --function X
```

where functionName is one of:

- `createTasks` (csv upload)
- `retrieveTasks`
- `updateTaskStatus`

## Deploy

### To Test It Locally

- Run `npm install` to install all the necessary dependencies.
- Run `npm run local` use serverless offline to test locally.

### Deploy on AWS

Choose one of:

- Run the GitHub Action
- `npm run deploy`

## Usage

send an HTTP request directly to the endpoint using a tool like curl

```
curl https://xxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/books
```
