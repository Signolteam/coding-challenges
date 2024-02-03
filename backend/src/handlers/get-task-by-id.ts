import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getHandler, logger, notFoundResult, successResult } from 'infrastructure/aws';
import { TasksConnectionFactory, TasksRepository } from 'repositories';
import { z } from 'zod';

const tasksConnectionFactory = new TasksConnectionFactory();

/**
 * Get a task by Id
 * @param event API Gateway Event
 * @returns Task
 */
async function getTaskById(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const connection = await tasksConnectionFactory.create();
    const repository = new TasksRepository(connection);

    const id = event.pathParameters?.id;

    logger.info('Getting task by Id', { id });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const task = await repository.getTaskById(id!);

    if (!task) return notFoundResult(`Task of Id '${id}' not found`);

    logger.debug('Task found', { task });
    return successResult(task);
}

const inputSchema = z.object({
    pathParameters: z.object({
        id: z.string(),
    }),
});

export const handler = getHandler(inputSchema, getTaskById);
