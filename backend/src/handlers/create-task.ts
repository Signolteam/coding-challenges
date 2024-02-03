import { APIGatewayProxyResult } from 'aws-lambda';
import { randomUUID } from 'crypto';
import { APIGatewayProxyEventExtendedPost, createdResult, getPostHandler, logger } from 'infrastructure/aws';
import { dateRegex } from 'src/helpers/regex';
import { TaskMapper } from 'mappers';
import { TaskRequest, TaskStatus } from 'models';
import { TasksConnectionFactory, TasksRepository } from 'repositories';
import { z } from 'zod';

const tasksConnectionFactory = new TasksConnectionFactory();
const mapper = new TaskMapper();

/**
 * Create a task
 * @param event API Gateway Event
 * @returns Task
 */
async function createTask(event: APIGatewayProxyEventExtendedPost<TaskRequest>): Promise<APIGatewayProxyResult> {
    const connection = await tasksConnectionFactory.create();
    const repository = new TasksRepository(connection);

    const request = event.body;

    const task = mapper.mapRequestToTask(request);
    task.id = randomUUID();

    logger.info('Creating task');
    await repository.createTask(task);
    logger.info('Created task', { task });

    return createdResult(task);
}

const inputSchema = z.object({
    body: z.object({
        owner: z.string().max(250),
        email: z.string().max(250),
        company: z.string().max(250),
        date: z.string().regex(dateRegex()),
        description: z.string().max(1000),
        status: z.nativeEnum(TaskStatus),
    }),
});

export const handler = getPostHandler(inputSchema, createTask);
