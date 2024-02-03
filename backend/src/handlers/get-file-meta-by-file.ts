import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getHandler, logger, notFoundResult, successResult } from 'infrastructure/aws';
import { TasksConnectionFactory, TasksRepository } from 'repositories';
import { z } from 'zod';

const tasksConnectionFactory = new TasksConnectionFactory();

/**
 * Get a file meta by Id
 * @param event API Gateway Event
 * @returns File meta
 */
async function getFileMetaByFile(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const connection = await tasksConnectionFactory.create();
    const repository = new TasksRepository(connection);

    const file = event.queryStringParameters?.file;

    logger.info('Getting file meta by file', { file });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const fileMeta = await repository.getFileMetaByFile(file!);

    if (!fileMeta) return notFoundResult(`File meta of file '${file}' not found`);

    logger.debug('File meta found', { fileMeta });
    return successResult(fileMeta);
}

const inputSchema = z.object({
    queryStringParameters: z.object({
        file: z.string(),
    }),
});

export const handler = getHandler(inputSchema, getFileMetaByFile);
