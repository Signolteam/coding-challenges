/* eslint-disable @typescript-eslint/no-empty-function */
import { Context } from 'aws-lambda';

export class ContextMock {
    private data: Context = {
        callbackWaitsForEmptyEventLoop: false,
        functionName: 'Function',
        functionVersion: '1',
        invokedFunctionArn: 'arn::function',
        memoryLimitInMB: '2024',
        awsRequestId: 'aws',
        logGroupName: 'log',
        logStreamName: 'stream',
        getRemainingTimeInMillis: () => 600000,
        done: () => {},
        fail: () => {},
        succeed: () => {},
    };

    public model() {
        return this.data;
    }
}
