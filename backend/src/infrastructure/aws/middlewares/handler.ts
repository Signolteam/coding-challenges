import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { injectLambdaContext } from '@aws-lambda-powertools/logger';
import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { captureLambdaHandler } from '@aws-lambda-powertools/tracer';
import { schemaValidator } from './schemaValidator';
import jsonBodyParser from '@middy/http-json-body-parser';
import { ZodSchema } from 'zod';
import { logger } from '../providers/logger-provider';
import { tracer } from '../providers/tracer-provider';
import { APIGatewayProxyEventExtendedPost } from '../models/apiGateway/extendedProxyEvent';

export function getHandler(
    schema: ZodSchema<any, any> | undefined,
    handler: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>,
) {
    return middy(handler)
        .use(captureLambdaHandler(tracer, { captureResponse: false }))
        .use(injectLambdaContext(logger, { clearState: true }))
        .use(schemaValidator(schema))
        .use(httpErrorHandler({ fallbackMessage: 'Unexpected error occurred' }));
}

export function getPostHandler<T>(
    schema: ZodSchema<any, any> | undefined,
    handler: (event: APIGatewayProxyEventExtendedPost<T>) => Promise<APIGatewayProxyResult>,
) {
    return middy(handler)
        .use(captureLambdaHandler(tracer, { captureResponse: false }))
        .use(injectLambdaContext(logger, { clearState: true }))
        .use(jsonBodyParser())
        .use(schemaValidator(schema))
        .use(httpErrorHandler({ fallbackMessage: 'Unexpected error occurred' }));
}
