#!/bin/bash
set -e
echo "Deploying backend to AWS..."
sls deploy --stage staging
echo "Finished deploying"