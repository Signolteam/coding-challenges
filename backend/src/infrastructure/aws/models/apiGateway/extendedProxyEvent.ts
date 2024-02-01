import { APIGatewayProxyEvent } from 'aws-lambda';

export interface APIGatewayProxyEventExtendedPost<T> extends Omit<APIGatewayProxyEvent, 'body'> {
    body: T;
}
