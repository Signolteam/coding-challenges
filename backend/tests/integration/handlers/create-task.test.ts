import { APIGatewayProxyResult } from 'aws-lambda';
import { handler } from 'handlers/create-task';
import { APIGatewayProxyEventMock } from 'tests/mocks/api-gateway-proxy-event.mock';
import { ContextMock } from 'tests/mocks/context.mock';
import { TaskMock } from 'tests/mocks/task.mock';

describe('Create Task Tests', () => {
    it.each(['owner', 'email', 'company', 'date', 'description', 'status'])('Missing properties', async (prop) => {
        // Arrange
        const task = new TaskMock().model();
        delete (task as any)[prop];

        const event = new APIGatewayProxyEventMock()
            .withHttpMethod('POST')
            .withPath('./')
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
            .withHttpMethod('POST')
            .withPath('./')
            .withHeaders({ 'Content-Type': 'application/json' })
            .model();

        const context = new ContextMock().model();

        // Act
        const result: APIGatewayProxyResult = await handler(event as any, context);

        // Assert
        expect(result.statusCode).toBe(422);
    });

    it('Create task', async () => {
        // Arrange
        const task = new TaskMock().withId(expect.any(String)).model();

        const event = new APIGatewayProxyEventMock()
            .withHttpMethod('POST')
            .withPath('./')
            .withBody(JSON.stringify(task))
            .withHeaders({ 'Content-Type': 'application/json' })
            .model();

        const context = new ContextMock().model();

        // Act
        const result: APIGatewayProxyResult = await handler(event as any, context);

        // Assert
        const taskResult = JSON.parse(result.body);
        expect(result.statusCode).toBe(201);
        expect(taskResult).toEqual(task);
    });
});
