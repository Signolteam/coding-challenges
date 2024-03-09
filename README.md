# Signol coding challenge

The project is a coding challenge to build and deploy a full stack app that allows a user to view and modify tasks.
The full stack comprises of:

- React/TypeScript
- Nodejs
- PostgresQL
- AWS

## Deployment with AWS

This app has been built and deployed using AWS (RDS, Lambda, APIGateway and S3 Bucket), using a SAM template as starting point and deploying to Lambda functions & API gateway through the SAM CLI, and the frontend part has been deployed to the S3 bucket.

The deployed app can be viewed [here](http://sam2-websitebucket-fjrjfopk9wed.s3-website-eu-west-1.amazonaws.com/).

## Local installation

The structure of the deployed app is contained in the sam2 folder. But prior to deployment, the base structure was thought through using the frontend and server apps sitting at root level of this repo. Should you want to install it locally and modify it, you can do so by cloning this repo at your prefered location: `git clone {repo url or ssh link}`.

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

Note that there might be slight differences in the functions between the sam2 repo and the other frontend/server repos, so it is best to use one group or the other (sam2/frontend + sam2/backend, or frontend + server).

## Structure of the project

Further details of the structure and design or style choices are explained in more details in the [backend readme](./sam2//backend/readme) and the [frontend readme](./sam2/frontend/readme).

## Current state vs target state

The goal was to deploy all parts of the app with AWS, using S3 bucket, API gateway, Lambda functions and RDS, and this was achieved.

Due to my limited knowledge of AWS when starting this project, I went through the development of various parts in this order:

- stack development: DB structure --> server connection to DB --> endpoints structure --> client connection to server --> client development --> UX refinement
- deployment: DB deployment to AWS RDS --> Server deployment to Lambda functions and API gateway --> Client deployment to S3 bucket

While there were challenges to deploy to AWS, I managed to perform all deployments but I didn't use serverless.

This was a very interesting project and it got me acquainted with AWS which was very useful.

## Further improvements and developments

Possible changes and extensions are:

- add tests all round (frontend and backend)
- investigate further functionalities for the app, so that it offers a bit more to the user
- investigate further the styling and design aspects. While it is mobile friendly, it is not 'slick' yet.
- add more validation thoughout (field checks to match certain formats etc)
- investigate further the deployment using the serverless package

## Learn More

You can send any questions at amelie.pira@gmail.com.
