# coding-challenges

## Pre-requisites

1. Node.js, assuming v18

## Dev Setup

1.  Fork/Clone
2.  Set up backend (NodeJS Serverless):

    1.  `cd backend`
    2.  Create file `backend/.env` that looks like:
        ```ini
        AWS_ACCESS_KEY_ID=
        AWS_SECRET_ACCESS_KEY=
        DB_HOST=localhost
        DB_USER=postgres
        DB_PASSWORD=
        DB_DATABASE=postgres
        ```
    3.  `yarn install`

3.  Set up frontend (React TypeScript):

    1.  `cd frontend`
    2.  Create file `frontend/.env` that looks like:
        ```sh
        TASKS_API_BASE_URL=
        ```
    3.  `yarn install`
    4.  (Optional) To run locally, `yarn start`

## Deploy

1. Fork/Clone
2. Configure an AWS account with:
   1. IAM User Access Key and Secret
   2. RDS Database (PostgreSQL)
   3. S3 Bucket with ACLs, Public Access, and Static Website all enabled
   4. API Gateway (TODO)
3. Add the secrets and deploy. There are two ways to do this, either:
   1. GitHub repository secrets + GitHub Actions deployment
      1. Add secrets to the GitHub repository's secrets, (settings/secrets/actions)
      2. Go to Actions and run both Deploy workflows
   2. `.env` file and Local deployment
      1. Add secrets to the [`.env`](./.env) file
      2. Deploy frontend:
         ```sh
         cd frontend
         yarn build
         (TODO: Synchronize this build folder with the root of the S3 bucket)
         cd ..
         ```
      3. Deploy backend:
         ```sh
         cd backend
         cp ../.env .env
         yarn deploy
         ```
