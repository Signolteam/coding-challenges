/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getHandler, logger, notFoundResult, successResult } from 'infrastructure/aws';
import { TasksConnectionFactory, TasksRepository } from 'repositories';
import { z } from 'zod';

const tasksConnectionFactory = new TasksConnectionFactory();

/**
 * Delete a task by Id
 * @param event API Gateway Event
 */
async function deleteTask(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const connection = await tasksConnectionFactory.create();
    const repository = new TasksRepository(connection);

    const id = event.pathParameters?.id;

    const existing = await repository.getTaskById(id!);

    if (!existing) return notFoundResult(`Task of Id '${id}' not found`);

    logger.info('Deleting task');
    await repository.deleteTask(id!);
    logger.info('Deleted task', { id });

    return successResult();
}

const inputSchema = z.object({
    pathParameters: z.object({
        id: z.string(),
    }),
});

export const handler = getHandler(inputSchema, deleteTask);
