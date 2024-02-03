import { APIGatewayProxyResult } from 'aws-lambda';
import { getHandler, logger, successResult } from 'infrastructure/aws';
import { TasksConnectionFactory, TasksRepository } from 'repositories';

const tasksConnectionFactory = new TasksConnectionFactory();

/**
 * Get all tasks
 * @returns Tasks
 */
async function getTasks(): Promise<APIGatewayProxyResult> {
    const connection = await tasksConnectionFactory.create();
    const repository = new TasksRepository(connection);

    logger.info('Getting tasks');
    const tasks = await repository.getTasks();
    logger.debug('Returning tasks', { count: tasks?.length });
    return successResult(tasks);
}

export const handler = getHandler(undefined, getTasks);
