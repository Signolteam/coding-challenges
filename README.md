# coding-challenges

## Progress

- Backend (NodeJS)
  - [x] Use PostgreSQL database, with schema of minimum 2 tables
  - [x] API: Create Tasks
  - [x] API: Retrieve Tasks
  - [x] API: Update Task Status
  - [x] Automatic database seeding (5 rows)
  - [x] Local testing (via `npm run local`)
  - [x] Basic Unit tests (for util functions)
  - [ ] Integration tests (full lambda function)
  - [ ] End-to-end tests
  - [ ] Deploy as AWS Lambda function
  - [ ] Deploy with AWS API Gateway
  - [ ] Deploy with RDS PostgreSQL database
- Frontend (React)
  - [x] List: Fetch Tasks from API and output on-screen
  - [x] Create/Import: Select CSV and create tasks via API
  - [x] Approve+Reject: Update Task status via API
  - [x] Responsive: Useful UI on smaller screen sizes
  - [ ] Component-level tests
  - [ ] End-to-end tests
  - [ ] Deploy to S3

## Pre-requisites

1. Node.js, assuming v18

## Dev Setup

1.  Fork/Clone
2.  Set up backend (NodeJS Serverless):

    1.  `cd backend`
    2.  `yarn install`

3.  Set up frontend (React TypeScript):

    1.  `cd frontend`
    2.  `yarn install`
    3.  (Optional) To run locally, `yarn start`

## Deploy

1. Fork/Clone
2. Configure an AWS account with:
   1. IAM User Access Key and Secret
   2. RDS Database (PostgreSQL, v14 or v15)
   3. S3 Bucket with ACLs, Public Access, and Static Website all enabled
   4. API Gateway (TODO)
3. Connect to the RDS DB, and ensure there is a Database created
4. Add the secrets and deploy. There are two ways to do this, either:

   1. GitHub repository secrets + GitHub Actions deployment
      1. Add secrets to the GitHub repository's secrets, (settings/secrets/actions)
      2. Go to Actions and run both Deploy workflows
   2. `.env` file Local deployment

      1. Deploy frontend:

         1. `cd frontend`
         2. Create a `.env.production` file that looks like this:

            ```ini
            REACT_APP_TASKS_API_BASE_URL=http://localhost:3001/dev/
            ```

         3. `yarn build`
         4. Synchronize the build folder with the Static Website S3 bucket (This is easier via the GitHub Actions route)

         ```sh
         aws s3 sync ./build s3://mybucket
         ```

      2. Deploy backend:

         1. `cd backend`
         2. Create a `.env.production` file that looks like this:

            ```ini
            AWS_ACCESS_KEY_ID=
            AWS_SECRET_ACCESS_KEY=
            DB_HOST=
            DB_PORT=5432
            DB_USER=
            DB_PASSWORD=
            DB_DATABASE=
            ```

         3. `yarn deploy`

            ```sh

            yarn deploy
            ```
