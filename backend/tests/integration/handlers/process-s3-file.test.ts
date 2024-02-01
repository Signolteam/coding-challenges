import { S3Event } from 'aws-lambda';
import { handler } from 'handlers/process-s3-file';
import { TaskMock } from 'tests/mocks/task.mock';
import { clearTasksTable, createFileMeta, getFileMetaByFile, getTasks } from '../repositories/repository.helper';
import { faker } from '@faker-js/faker';
import { Readable } from 'stream';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { mockClient } from 'aws-sdk-client-mock';
import { sdkStreamMixin } from '@smithy/util-stream';
import { TasksConnectionFactory } from 'repositories';
import { FileMetaStatus, Task, TaskStatus } from 'models';
import { FileMetaMock } from 'tests/mocks/file-meta.mock';

const mockS3Client = mockClient(S3Client);

describe('Process S3 File Tests', () => {
    it('No tasks from CSV', async () => {
        // Arrange
        const file = faker.datatype.uuid();

        const s3Event = {
            Records: [
                {
                    s3: { bucket: { name: 'test' }, object: { key: file } },
                },
            ],
        } as unknown as S3Event;

        const mockedS3FileStream = new Readable();
        mockedS3FileStream.push(null);
        const stream = sdkStreamMixin(mockedS3FileStream);

        mockS3Client.on(GetObjectCommand).resolves({
            Body: stream,
        });

        const tasksConnectionFactory = new TasksConnectionFactory();
        const client = await tasksConnectionFactory.create();
        await clearTasksTable(client);

        // Act
        await handler(s3Event);

        // Assert
        const tasks = await getTasks(client);
        expect(tasks).toEqual([]);

        const fileMeta = await getFileMetaByFile(client, file);
        expect(fileMeta?.status).toBe(FileMetaStatus.FAILED);
    });

    it('File already been processed', async () => {
        // Arrange
        const file = faker.datatype.uuid();
        const fileMeta = new FileMetaMock().withFile(file).model();

        const s3Event = {
            Records: [
                {
                    s3: { bucket: { name: 'test' }, object: { key: file } },
                },
            ],
        } as unknown as S3Event;

        const tasksConnectionFactory = new TasksConnectionFactory();
        const client = await tasksConnectionFactory.create();
        await createFileMeta(client, fileMeta);

        // Act
        await handler(s3Event);

        // Assert
        const tasks = await getTasks(client);
        expect(tasks).toEqual([]);
    });

    it('Create tasks from CSV', async () => {
        // Arrange
        const task = new TaskMock().withId(expect.any(String)).model();
        const task2 = new TaskMock().withId(expect.any(String)).withStatus(TaskStatus.IN_REVIEW).model();

        const expected: Task[] = [task, task2];

        const heading = 'task_owner,email,company_name,task_date,task_description,task_status';
        const csvRecord = `${task.owner},${task.email},${task.company},${task.date},${task.description},${task.status}`;
        const csvRecord2 = `${task2.owner},${task2.email},${task2.company},${task2.date},${task2.description},''`;
        const csv = [heading, csvRecord, csvRecord2].join('\n');

        const file = faker.datatype.uuid();

        const s3Event = {
            Records: [
                {
                    s3: { bucket: { name: 'test' }, object: { key: file } },
                },
            ],
        } as unknown as S3Event;

        const mockedS3FileStream = new Readable();
        mockedS3FileStream.push(csv);
        mockedS3FileStream.push(null);
        const stream = sdkStreamMixin(mockedS3FileStream);

        mockS3Client.on(GetObjectCommand).resolves({
            Body: stream,
        });

        const tasksConnectionFactory = new TasksConnectionFactory();
        const client = await tasksConnectionFactory.create();
        await clearTasksTable(client);

        // Act
        await handler(s3Event);

        // Assert
        const tasks = await getTasks(client);
        expect(tasks).toEqual(expected);

        const fileMeta = await getFileMetaByFile(client, file);
        expect(fileMeta?.status).toBe(FileMetaStatus.COMPLETE);
    });
});
