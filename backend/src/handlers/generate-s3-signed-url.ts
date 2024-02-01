import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { badRequestResult, getHandler, successResult } from 'infrastructure/aws';
import { z } from 'zod';
import { TasksConnectionFactory, TasksRepository } from 'repositories';
import { FileMetaStatus } from 'src/models';

const tasksConnectionFactory = new TasksConnectionFactory();

/**
 * Generate a S3 signed URL for uploading files
 * @param event API Gateway Event
 * @returns S3 signed URL
 */
async function generateS3Url(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const key = event.queryStringParameters?.filename;

    const connection = await tasksConnectionFactory.create();
    const repository = new TasksRepository(connection);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const fileMeta = await repository.getFileMetaByFile(key!);

    if (fileMeta && (fileMeta.status === FileMetaStatus.COMPLETE || fileMeta.status === FileMetaStatus.PROCESSING)) {
        return badRequestResult(`File '${key}' has already been actioned with status: ${fileMeta.status}.`);
    }

    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: key,
    };

    const s3Client = new S3Client({ region: 'eu-west-1' });
    const command = new PutObjectCommand(params);
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    return successResult({ url });
}

const inputSchema = z.object({
    queryStringParameters: z.object({
        filename: z.string(),
    }),
});

export const handler = getHandler(inputSchema, generateS3Url);
