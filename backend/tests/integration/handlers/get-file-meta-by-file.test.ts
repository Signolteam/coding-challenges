import { faker } from '@faker-js/faker';
import { APIGatewayProxyResult } from 'aws-lambda';
import { handler } from 'handlers/get-file-meta-by-file';
import { APIGatewayProxyEventMock } from 'tests/mocks/api-gateway-proxy-event.mock';
import { ContextMock } from 'tests/mocks/context.mock';
import { TaskMock } from 'tests/mocks/task.mock';
import { createFileMeta } from '../repositories/repository.helper';
import { TasksConnectionFactory } from 'repositories';
import { FileMetaMock } from 'tests/mocks/file-meta.mock';
import { FileMeta } from 'src/models';

describe('Get File Meta By File Tests', () => {
    it('Missing file', async () => {
        // Arrange
        const task = new TaskMock().model();

        const event = new APIGatewayProxyEventMock()
            .withHttpMethod('GET')
            .withPath('./')
            .withBody(JSON.stringify(task))
            .model();

        const context = new ContextMock().model();

        // Act
        const result: APIGatewayProxyResult = await handler(event as any, context);

        // Assert
        expect(result.statusCode).toBe(400);
    });

    it('File meta not found', async () => {
        // Arrange
        const event = new APIGatewayProxyEventMock()
            .withHttpMethod('GET')
            .withPath('./')
            .withQueryString({ file: faker.datatype.uuid() })
            .model();

        const context = new ContextMock().model();

        // Act
        const result: APIGatewayProxyResult = await handler(event as any, context);

        // Assert
        expect(result.statusCode).toBe(404);
    });

    it('Get file meta', async () => {
        // Arrange
        const file = new FileMetaMock().model();

        const tasksConnectionFactory = new TasksConnectionFactory();
        const client = await tasksConnectionFactory.create();
        await createFileMeta(client, file);

        const event = new APIGatewayProxyEventMock()
            .withHttpMethod('GET')
            .withPath('./')
            .withQueryString({ file: file.file })
            .model();

        const context = new ContextMock().model();

        // Act
        const result: APIGatewayProxyResult = await handler(event as any, context);

        // Assert
        expect(result.statusCode).toBe(200);
        const fileResult = JSON.parse(result.body) as FileMeta;

        expect(fileResult.status).toBe(file.status);
        expect(fileResult.file).toBe(file.file);
        expect(fileResult.created).toBeDefined();
        expect(fileResult.id).toBe(file.id);
    });
});
