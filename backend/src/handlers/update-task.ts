import { APIGatewayProxyResult } from 'aws-lambda';
import {
    APIGatewayProxyEventExtendedPost,
    getPostHandler,
    logger,
    notFoundResult,
    successResult,
} from 'infrastructure/aws';
import { dateRegex } from 'src/helpers/regex';
import { TaskMapper } from 'mappers';
import { TaskRequest, TaskStatus } from 'models';
import { TasksConnectionFactory, TasksRepository } from 'repositories';
import { z } from 'zod';

const mapper = new TaskMapper();

/**
 * Update a task
 * @param event API Gateway Event
 * @returns Task
 */
async function updateTask(event: APIGatewayProxyEventExtendedPost<TaskRequest>): Promise<APIGatewayProxyResult> {
    const tasksConnectionFactory = new TasksConnectionFactory();
    const connection = await tasksConnectionFactory.create();
    const repository = new TasksRepository(connection);

    const id = event.pathParameters?.id;
    const request = event.body;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const existing = await repository.getTaskById(id!);

    if (!existing) return notFoundResult(`Task of Id '${id}' not found`);

    const task = mapper.mapRequestToTask(request);
    task.id = id;

    logger.info('Updating task');
    await repository.updateTask(task);
    logger.info('Updated task', { task });

    return successResult();
}

const inputSchema = z.object({
    pathParameters: z.object({
        id: z.string(),
    }),
    body: z.object({
        owner: z.string().max(250),
        email: z.string().max(250),
        company: z.string().max(250),
        date: z.string().regex(dateRegex()),
        description: z.string().max(1000),
        status: z.nativeEnum(TaskStatus),
    }),
});

export const handler = getPostHandler(inputSchema, updateTask);
