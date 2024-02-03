import { APIGatewayProxyResult } from 'aws-lambda';
import { handler } from 'handlers/get-tasks';
import { APIGatewayProxyEventMock } from 'tests/mocks/api-gateway-proxy-event.mock';
import { ContextMock } from 'tests/mocks/context.mock';
import { TaskMock } from 'tests/mocks/task.mock';
import { clearTasksTable, createTask } from '../repositories/repository.helper';
import { TasksConnectionFactory } from 'repositories';

describe('Get Tasks Tests', () => {
    it('No tasks found', async () => {
        // Arrange
        const tasksConnectionFactory = new TasksConnectionFactory();
        const client = await tasksConnectionFactory.create();
        await clearTasksTable(client);

        const event = new APIGatewayProxyEventMock().withHttpMethod('GET').withPath('./').model();

        const context = new ContextMock().model();

        // Act
        const result: APIGatewayProxyResult = await handler(event as any, context);

        // Assert
        expect(result.statusCode).toBe(200);
        expect(result.body).toEqual([]);
    });

    it('Get Tasks', async () => {
        // Arrange
        const task = new TaskMock().model();
        const task2 = new TaskMock().model();
        const task3 = new TaskMock().model();

        const tasksConnectionFactory = new TasksConnectionFactory();
        const client = await tasksConnectionFactory.create();
        await clearTasksTable(client);
        await createTask(client, task);
        await createTask(client, task2);
        await createTask(client, task3);

        const event = new APIGatewayProxyEventMock().withHttpMethod('GET').withPath('./').model();

        const context = new ContextMock().model();

        // Act
        const result: APIGatewayProxyResult = await handler(event as any, context);

        // Assert
        expect(result.statusCode).toBe(200);
        const tasksResult = JSON.parse(result.body);
        expect(tasksResult?.length).toBe(3);
        expect(tasksResult).toEqual([task, task2, task3]);
    });
});
