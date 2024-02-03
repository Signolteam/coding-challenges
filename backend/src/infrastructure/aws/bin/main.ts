#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MainStack } from '../lib/main-stack';
import { LambdaStack } from '../lib/lambda-stack';
import { ReactStack } from '../lib/react-stack';

const app = new cdk.App();
const region = 'eu-west-1';

const mainStack = new MainStack(app, 'MainStack', {
    env: {
        region,
    },
});

new LambdaStack(app, 'LambdaStack', {
    env: {
        region,
    },
    dbInstance: mainStack.dbInstance,
    dbProxy: mainStack.dbProxy,
    accessRDSSecurityGroup: mainStack.accessRDSSecurityGroup,
    vpc: mainStack.vpc,
    databaseName: mainStack.databaseName,
    databasePort: mainStack.databasePort,
    databaseUsername: mainStack.databaseUsername,
});

new ReactStack(app, 'ReactStack', {
    env: {
        region,
    },
});
