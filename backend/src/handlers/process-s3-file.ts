import { S3Event } from 'aws-lambda';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { logger } from 'infrastructure/aws';
import * as Papa from 'papaparse';
import { CSVTask, FileMetaStatus, TaskStatus } from 'models';
import { FileMetaMapper, TaskMapper } from 'mappers';
import { TasksConnectionFactory, TasksRepository } from 'repositories';

const s3Client = new S3Client();
const tasksConnectionFactory = new TasksConnectionFactory();
const mapper = new TaskMapper();
const fileMetaMapper = new FileMetaMapper();

/**
 * Read file from S3, convert and import it into database
 * @param event S3 event containing information about a newly created file
 */
export const handler = async (event: S3Event) => {
    const connection = await tasksConnectionFactory.create();
    const repository = new TasksRepository(connection);

    logger.info('Processing S3 file creation event', { event });

    for (const record of event.Records) {
        const file = record.s3.object.key;

        const existingFileMeta = await repository.getFileMetaByFile(file);

        if (
            existingFileMeta &&
            (existingFileMeta.status === FileMetaStatus.COMPLETE ||
                existingFileMeta.status === FileMetaStatus.PROCESSING)
        ) {
            logger.info('File has already been actioned.', { file, status: existingFileMeta.status });
            continue;
        }

        // Record meta of file as processing
        const fileMeta = fileMetaMapper.mapFileToFileMeta(file);

        if (existingFileMeta) {
            fileMeta.status = FileMetaStatus.PROCESSING;
            await repository.updateFileMeta(fileMeta);
        } else {
            await repository.createFileMeta(fileMeta);
        }

        // Get file as a stream from S3
        const data = await s3Client.send(
            new GetObjectCommand({
                Bucket: record.s3.bucket.name,
                Key: file,
            }),
        );

        // Read stream contents
        const bodyContents = await convertS3StreamToString(data.Body);

        if (!bodyContents) {
            logger.info('S3 file has no content, skipping');

            // Mark impport as failed
            fileMeta.status = FileMetaStatus.FAILED;
            await repository.updateFileMeta(fileMeta);
            continue;
        }

        // Parse csv content as CSVTasks
        const parsedTasks = Papa.parse<CSVTask>(bodyContents, { header: true, skipEmptyLines: true });
        const tasks = parsedTasks.data?.map((csvTask) => mapper.mapCSVToTask(csvTask));

        tasks.forEach((task) => {
            if (!task.status) task.status = TaskStatus.IN_REVIEW;
        });

        // Create tasks in database
        logger.info('Creating tasks', { count: tasks.length });

        try {
            await repository.createTasks(tasks);
            logger.info('Created tasks');

            // Mark import as complete
            fileMeta.status = FileMetaStatus.COMPLETE;
            await repository.updateFileMeta(fileMeta);
        } catch (err) {
            logger.error('Error process S3 file', {
                count: tasks.length,
                mappedTasks: tasks,
                parsedCSV: parsedTasks,
                csvContent: bodyContents,
                error: err as Error,
            });

            // Mark import as failed
            fileMeta.status = FileMetaStatus.FAILED;
            await repository.updateFileMeta(fileMeta);
        }
    }
};

/**
 * Converts S3 file stream to a string
 * @param stream S3 file stream
 * @returns File content as string
 */
function convertS3StreamToString(stream: any): Promise<string> {
    return new Promise((resolve, reject) => {
        const chunks: any[] = [];
        stream.on('data', (chunk: any) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
}
