import { faker } from '@faker-js/faker';
import { APIGatewayProxyResult } from 'aws-lambda';
import { handler } from 'handlers/delete-task';
import { APIGatewayProxyEventMock } from 'tests/mocks/api-gateway-proxy-event.mock';
import { ContextMock } from 'tests/mocks/context.mock';
import { TaskMock } from 'tests/mocks/task.mock';
import { createTask, getTaskById } from '../repositories/repository.helper';
import { TasksConnectionFactory } from 'repositories';

describe('Delete Task Tests', () => {
    it('Missing id', async () => {
        // Arrange
        const task = new TaskMock().model();

        const event = new APIGatewayProxyEventMock()
            .withHttpMethod('DELETE')
            .withPath('./')
            .withBody(JSON.stringify(task))
            .withHeaders({ 'Content-Type': 'application/json' })
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
            .withHttpMethod('DELETE')
            .withPath('./')
            .withPathParameters({ id: faker.datatype.uuid() })
            .withHeaders({ 'Content-Type': 'application/json' })
            .model();

        const context = new ContextMock().model();

        // Act
        const result: APIGatewayProxyResult = await handler(event as any, context);

        // Assert
        expect(result.statusCode).toBe(404);
    });

    it('Delete task', async () => {
        // Arrange
        const task = new TaskMock().model();

        const tasksConnectionFactory = new TasksConnectionFactory();
        const client = await tasksConnectionFactory.create();
        await createTask(client, task);

        const event = new APIGatewayProxyEventMock()
            .withHttpMethod('DELETE')
            .withPath('./')
            .withPathParameters({ id: task.id })
            .withHeaders({ 'Content-Type': 'application/json' })
            .model();

        const context = new ContextMock().model();

        // Act
        const result: APIGatewayProxyResult = await handler(event as any, context);

        // Assert
        expect(result.statusCode).toBe(200);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const taskResult = await getTaskById(client, task.id!);
        expect(taskResult).toBeUndefined();
    });
});
