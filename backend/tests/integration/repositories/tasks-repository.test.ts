/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { TasksRepository } from 'repositories';
import {
    clearTasksTable,
    createFileMeta,
    createTask,
    getFileMetaByFile,
    getTaskById,
    getTasks,
} from './repository.helper';
import { Pool } from 'pg';
import { TaskMock } from 'tests/mocks/task.mock';
import { faker } from '@faker-js/faker';
import { FileMetaMock } from 'tests/mocks/file-meta.mock';
import { FileMetaStatus } from 'src/models';

describe('Tasks Repository Tests', () => {
    let client: Pool;

    beforeAll(() => {
        client = new Pool({
            host: process.env.DB_ENDPOINT_ADDRESS,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
    });

    beforeEach(async () => {
        await clearTasksTable(client);
    });

    afterAll(async () => {
        await client.end();
    });

    it('Create task', async () => {
        // Arrange
        const task = new TaskMock().model();
        const sut = new TasksRepository(client);

        // Act
        await sut.createTask(task);

        // Assert
        const record = await getTaskById(client, task.id!);
        expect(record).toEqual(task);
    });

    it('Update task', async () => {
        // Arrange
        const task = new TaskMock().model();
        const sut = new TasksRepository(client);
        await createTask(client, task);
        task.company = faker.company.name();

        // Act
        await sut.updateTask(task);

        // Assert
        const record = await getTaskById(client, task.id!);
        expect(record).toEqual(task);
    });

    it('Get task', async () => {
        // Arrange
        const task = new TaskMock().model();
        const sut = new TasksRepository(client);
        await createTask(client, task);

        // Act
        const result = await sut.getTaskById(task.id!);

        // Assert
        expect(result).toEqual(task);
    });

    it('Get tasks', async () => {
        // Arrange
        const task = new TaskMock().model();
        const task2 = new TaskMock().model();
        const sut = new TasksRepository(client);
        await createTask(client, task);
        await createTask(client, task2);

        // Act
        const results = await sut.getTasks();

        // Assert
        expect(results?.length).toBe(2);
        expect(results).toEqual([task, task2]);
    });

    it('Delete task', async () => {
        // Arrange
        const task = new TaskMock().model();
        const sut = new TasksRepository(client);
        await createTask(client, task);

        // Act
        await sut.deleteTask(task.id!);

        // Assert
        const result = await getTaskById(client, task.id!);
        expect(result).toBeUndefined();
    });

    it('Create tasks', async () => {
        // Arrange
        const task = new TaskMock().model();
        const task2 = new TaskMock().model();
        const task3 = new TaskMock().model();
        const task4 = new TaskMock().model();
        const task5 = new TaskMock().model();

        const tasks = [task, task2, task3, task4, task5];
        const sut = new TasksRepository(client);

        // Act
        await sut.createTasks(tasks, 2);

        // Assert
        const results = await getTasks(client);
        expect(results?.length).toBe(tasks.length);
        expect(results).toEqual(tasks);
    });

    it('Create file meta', async () => {
        // Arrange
        const fileMeta = new FileMetaMock().model();
        const sut = new TasksRepository(client);

        // Act
        await sut.createFileMeta(fileMeta);

        // Assert
        const record = await getFileMetaByFile(client, fileMeta.file);
        expect(record).toEqual(fileMeta);
    });

    it('Update file meta', async () => {
        // Arrange
        const fileMeta = new FileMetaMock().model();
        const sut = new TasksRepository(client);
        await createFileMeta(client, fileMeta);
        fileMeta.status = FileMetaStatus.COMPLETE;

        // Act
        await sut.updateFileMeta(fileMeta);

        // Assert
        const record = await getFileMetaByFile(client, fileMeta.file);
        expect(record).toEqual(fileMeta);
    });

    it('Get file meta', async () => {
        // Arrange
        const fileMeta = new FileMetaMock().model();
        const sut = new TasksRepository(client);
        await createFileMeta(client, fileMeta);

        // Act
        const result = await sut.getFileMetaByFile(fileMeta.file);

        // Assert
        expect(result).toEqual(fileMeta);
    });
});
