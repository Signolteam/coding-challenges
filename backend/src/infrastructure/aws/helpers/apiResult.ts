import { APIGatewayProxyResult } from 'aws-lambda';

function createApiResult(statusCode: number, body?: unknown): APIGatewayProxyResult {
    let bodyResult = '';
    if (body) {
        bodyResult = JSON.stringify(body);
    }

    if (bodyResult && !bodyResult.includes('{') && !bodyResult.includes('}')) {
        bodyResult = body as string;
    }

    const response: APIGatewayProxyResult = {
        statusCode: statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: bodyResult,
    };
    return response;
}

export function createdResult(body?: unknown): APIGatewayProxyResult {
    return createApiResult(201, body);
}

export function successResult(body?: unknown): APIGatewayProxyResult {
    return createApiResult(200, body);
}

export function notFoundResult(message?: string): APIGatewayProxyResult {
    return createApiResult(404, message);
}

export function badRequestResult(message?: string): APIGatewayProxyResult {
    return createApiResult(400, message);
}

export function internalServerErrorResult(body?: unknown): APIGatewayProxyResult {
    return createApiResult(500, body);
}
