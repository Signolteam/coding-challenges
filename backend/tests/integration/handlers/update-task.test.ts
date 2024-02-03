import { faker } from '@faker-js/faker';
import { APIGatewayProxyResult } from 'aws-lambda';
import { handler } from 'handlers/update-task';
import { APIGatewayProxyEventMock } from 'tests/mocks/api-gateway-proxy-event.mock';
import { ContextMock } from 'tests/mocks/context.mock';
import { TaskMock } from 'tests/mocks/task.mock';
import { createTask, getTaskById } from '../repositories/repository.helper';
import { TasksConnectionFactory } from 'repositories';

describe('Update Task Tests', () => {
    it.each(['owner', 'email', 'company', 'date', 'description', 'status'])('Missing properties', async (prop) => {
        // Arrange
        const task = new TaskMock().model();
        delete (task as any)[prop];

        const event = new APIGatewayProxyEventMock()
            .withHttpMethod('PUT')
            .withPath('./')
            .withPathParameters({ id: faker.datatype.uuid() })
            .withBody(JSON.stringify(task))
            .withHeaders({ 'Content-Type': 'application/json' })
            .model();

        const context = new ContextMock().model();

        // Ack
        const result: APIGatewayProxyResult = await handler(event as any, context);

        // Assert
        expect(result.statusCode).toBe(400);
        expect(result.body).toBe(`Validation #1: Code: invalid_type ~ Path: body.${prop} ~ Message: Required`);
    });

    it('Missing body', async () => {
        // Arrange
        const event = new APIGatewayProxyEventMock()
            .withHttpMethod('PUT')
            .withPath('./')
            .withPathParameters({ id: faker.datatype.uuid() })
            .withHeaders({ 'Content-Type': 'application/json' })
            .model();

        const context = new ContextMock().model();

        // Act
        const result: APIGatewayProxyResult = await handler(event as any, context);

        // Assert
        expect(result.statusCode).toBe(422);
    });

    it('Missing id', async () => {
        // Arrange
        const task = new TaskMock().model();

        const event = new APIGatewayProxyEventMock()
            .withHttpMethod('PUT')
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
        const task = new TaskMock().model();

        const event = new APIGatewayProxyEventMock()
            .withHttpMethod('PUT')
            .withPath('./')
            .withPathParameters({ id: faker.datatype.uuid() })
            .withBody(JSON.stringify(task))
            .withHeaders({ 'Content-Type': 'application/json' })
            .model();

        const context = new ContextMock().model();

        // Act
        const result: APIGatewayProxyResult = await handler(event as any, context);

        // Assert
        expect(result.statusCode).toBe(404);
    });

    it('Update task', async () => {
        // Arrange
        const task = new TaskMock().model();

        const tasksConnectionFactory = new TasksConnectionFactory();
        const client = await tasksConnectionFactory.create();
        await createTask(client, task);

        task.company = faker.company.name();

        const event = new APIGatewayProxyEventMock()
            .withHttpMethod('PUT')
            .withPath('./')
            .withPathParameters({ id: task.id })
            .withBody(JSON.stringify(task))
            .withHeaders({ 'Content-Type': 'application/json' })
            .model();

        const context = new ContextMock().model();

        // Act
        const result: APIGatewayProxyResult = await handler(event as any, context);

        // Assert
        expect(result.statusCode).toBe(200);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const taskResult = await getTaskById(client, task.id!);
        expect(taskResult).toEqual(task);
    });
});
