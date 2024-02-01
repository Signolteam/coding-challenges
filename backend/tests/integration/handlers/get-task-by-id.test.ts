import { faker } from '@faker-js/faker';
import { APIGatewayProxyResult } from 'aws-lambda';
import { handler } from 'handlers/get-task-by-id';
import { APIGatewayProxyEventMock } from 'tests/mocks/api-gateway-proxy-event.mock';
import { ContextMock } from 'tests/mocks/context.mock';
import { TaskMock } from 'tests/mocks/task.mock';
import { createTask } from '../repositories/repository.helper';
import { TasksConnectionFactory } from 'repositories';

describe('Get Task By Id Tests', () => {
    it('Missing id', async () => {
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

    it('Task not found', async () => {
        // Arrange
        const event = new APIGatewayProxyEventMock()
            .withHttpMethod('GET')
            .withPath('./')
            .withPathParameters({ id: faker.datatype.uuid() })
            .model();

        const context = new ContextMock().model();

        // Act
        const result: APIGatewayProxyResult = await handler(event as any, context);

        // Assert
        expect(result.statusCode).toBe(404);
    });

    it('Get Task', async () => {
        // Arrange
        const task = new TaskMock().model();

        const tasksConnectionFactory = new TasksConnectionFactory();
        const client = await tasksConnectionFactory.create();
        await createTask(client, task);

        const event = new APIGatewayProxyEventMock()
            .withHttpMethod('GET')
            .withPath('./')
            .withPathParameters({ id: task.id })
            .model();

        const context = new ContextMock().model();

        // Act
        const result: APIGatewayProxyResult = await handler(event as any, context);

        // Assert
        expect(result.statusCode).toBe(200);
        const taskResult = JSON.parse(result.body);
        expect(taskResult).toEqual(task);
    });
});
