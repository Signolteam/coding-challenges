# Signol task challenge backend

## Setup

With a stable release of node and npm, install serverless by running:

```
npm install -g serverless
```

```
serverless plugin install -n serverless-dotenv-plugin
```

Fill out the .env file with the secrets provided via email,
the database is not part of the serverless IAC so it will be easier to target
my live one than replicate it, please note I would never usually have a publicly available RDS instance,
this is purely for ease of inspection.

## Local deployment

To run locally you'll need python 3.10 (other versions probably will not work) and pip.
then run:

```
serverless offline
```

This will give you the full backend at http://localhost:3001

## AWS deployment

As long as you have `aws-cli` and have run `aws configure`, run:

```
serverless deploy
```

## Tests

There aren't many tests, but you can run them from the root ('coding-challenges')
directory with the following command:
```
python -m unittest task-backend.tests.tests
```
