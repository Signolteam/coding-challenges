# Signol coding challenge

The project is a coding challenge to build and deploy a full stack app that allows a user to view and modify tasks.
The full stack comprises of:

- react/typescript
- nodejs
- postgresQL

## Local installation

This app can be installed locally, by cloning this repo at your prefered location: `git clone {repo url or ssh link}`.

Once cloned, in your terminal, you can proceed with these steps:

Frontend:

- `cd frontend`
- `npm install`
- `npm run start`

Backend:

- `cd backend`
- `npm install`
- add a .env file and populate with the following information:

For connection to the deployed postgresQL instance on AWS RDS:
USER="postgres"
PASSWORD="password"
HOST="signoldb-identifier.chmccoigw4nq.eu-west-1.rds.amazonaws.com"
PORT=5432
DATABASE="signoldb"

For connection to your local postgresQL instance
USER="postgres"
PASSWORD="password"
HOST="localhost"
PORT=5432
DATABASE="signoldb"

- if you've chosen the local postgresQL instance, you can use `npm run seed` to seed your db
- `npm run start`

## Structure of the project

Further details of the structure and design or style choices are explained in more details in the [backend readme]() and the [frontend readme]().

## Current state vs target state

The goal was to deploy all parts of the app with AWS, using S3 bucket, API gateway, Lambda functions and RDS.

Due to my limited knowledge of AWS when starting this project, I developed all parts in this order:

- DB structure --> server connection to DB --> endpoints structure --> client connection to server --> client development --> UX refinement
- DB deployment to AWS RDS --> Server deployment to Lambda functions (partial) --> Set up API gateway (partial) --> Client deployment to S3 bucket (not done)

While there were significant challenges for me to deploy to lambda functions, in the time given I didn't manage to deploy with serverless. However , I did achieve to set up
