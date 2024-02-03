import {
    APIGatewayProxyEvent,
    APIGatewayProxyEventHeaders,
    APIGatewayProxyEventPathParameters,
    APIGatewayProxyEventQueryStringParameters,
} from 'aws-lambda';

export class APIGatewayProxyEventMock {
    private data: APIGatewayProxyEvent = {
        httpMethod: 'GET',
        body: '',
        headers: {},
        isBase64Encoded: false,
        multiValueHeaders: {},
        multiValueQueryStringParameters: {},
        path: '/',
        pathParameters: null,
        queryStringParameters: null,
        requestContext: {
            accountId: '123456789012',
            apiId: '1234',
            authorizer: {},
            httpMethod: 'GET',
            identity: {
                accessKey: '',
                accountId: '',
                apiKey: '',
                apiKeyId: '',
                caller: '',
                clientCert: {
                    clientCertPem: '',
                    issuerDN: '',
                    serialNumber: '',
                    subjectDN: '',
                    validity: { notAfter: '', notBefore: '' },
                },
                cognitoAuthenticationProvider: '',
                cognitoAuthenticationType: '',
                cognitoIdentityId: '',
                cognitoIdentityPoolId: '',
                principalOrgId: '',
                sourceIp: '',
                user: '',
                userAgent: '',
                userArn: '',
            },
            path: '/',
            protocol: 'HTTP/1.1',
            requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
            requestTimeEpoch: 1428582896000,
            resourceId: '123456',
            resourcePath: '/',
            stage: 'dev',
        },
        resource: '',
        stageVariables: {},
    };

    public withHttpMethod(httpMethod: string) {
        this.data.httpMethod = httpMethod;
        this.data.requestContext.httpMethod = httpMethod;
        return this;
    }

    public withPath(path: string) {
        this.data.path = path;
        this.data.requestContext.path = path;
        this.data.requestContext.resourcePath = path;
        return this;
    }

    public withBody(body: string) {
        this.data.body = body;
        return this;
    }

    public withQueryString(queryStringParameters: APIGatewayProxyEventQueryStringParameters) {
        this.data.queryStringParameters = queryStringParameters;
        return this;
    }

    public withPathParameters(pathParams: APIGatewayProxyEventPathParameters) {
        this.data.pathParameters = pathParams;
        return this;
    }

    public withHeaders(headers: APIGatewayProxyEventHeaders) {
        this.data.headers = headers;
        return this;
    }

    public model() {
        return this.data;
    }
}
