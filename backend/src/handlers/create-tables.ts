import { APIGatewayProxyResult } from 'aws-lambda';
import { getHandler } from 'infrastructure/aws';
import { TasksConnectionFactory, TasksRepository } from 'repositories';

const tasksConnectionFactory = new TasksConnectionFactory();

/**
 * For demo setup only
 */
async function setupTables(): Promise<APIGatewayProxyResult> {
    const connection = await tasksConnectionFactory.create();
    const repository = new TasksRepository(connection);

    await repository.createTables();

    return {
        body: 'Tables created',
        statusCode: 201,
    };
}

export const handler = getHandler(undefined, setupTables);
