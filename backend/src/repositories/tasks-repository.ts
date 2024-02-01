import { QueryResult, Pool } from 'pg';
import { logger } from 'infrastructure/aws';
import { Task, FileMeta } from 'models';

export enum TasksFields {
    Id = 'Id',
    Owner = 'Owner',
    Email = 'Email',
    Comapny = 'Company',
    Date = 'Date',
    Description = 'Description',
    Status = 'Status',
}

export enum FileMetaFields {
    Id = 'Id',
    File = 'File',
    Created = 'Created',
    Status = 'Status',
}

export enum Tables {
    Tasks = 'tasks',
    FileMeta = 'filemeta',
}

export class TasksRepository {
    constructor(private readonly client: Pool) {}

    /**
     * Ideally the creation of the db tables would be handled by migrations e.g. using flyway
     * and ran as part of the pipeline
     */
    public async createTables(): Promise<void> {
        const tasksTable = `CREATE TABLE IF NOT EXISTS ${Tables.Tasks} (
            ${TasksFields.Id} VARCHAR (36) PRIMARY KEY,
            ${TasksFields.Owner} VARCHAR (250) NOT NULL,
            ${TasksFields.Email} VARCHAR (250) NOT NULL,
            ${TasksFields.Comapny} VARCHAR (250) NOT NULL,
            ${TasksFields.Date} VARCHAR (30) NOT NULL,
            ${TasksFields.Description} VARCHAR(1000) NOT NULL,
            ${TasksFields.Status} VARCHAR (10) NOT NULL
          )`;

        await this.execute(tasksTable);

        const fileMetaTable = `CREATE TABLE IF NOT EXISTS ${Tables.FileMeta} (
            ${FileMetaFields.Id} VARCHAR (36) PRIMARY KEY,
            ${FileMetaFields.File} VARCHAR (250) NOT NULL,
            ${FileMetaFields.Created} TIMESTAMP NOT NULL,
            ${FileMetaFields.Status} VARCHAR (10) NOT NULL
          )`;

        await this.execute(fileMetaTable);

        const fileMetaIndex = `CREATE INDEX idx_filemeta_file ON ${Tables.FileMeta}(${FileMetaFields.File});`;
        await this.execute(fileMetaIndex);
    }

    /**
     * Creates tasks in batches
     * @param tasks Tasks to create
     */
    public async createTasks(tasks: Task[], batchSize = 1000): Promise<void> {
        const columns = [
            TasksFields.Id,
            TasksFields.Owner,
            TasksFields.Email,
            TasksFields.Comapny,
            TasksFields.Date,
            TasksFields.Description,
            TasksFields.Status,
        ];

        const colLength = columns.length;

        for (let i = 0; i < tasks.length; i += batchSize) {
            const chunk = tasks.slice(i, i + batchSize);
            const placeholders = chunk
                .map(
                    (_, index) =>
                        `($${index * colLength + 1}, $${index * colLength + 2}, $${index * colLength + 3}, $${
                            index * colLength + 4
                        }, $${index * colLength + 5}, $${index * colLength + 6}, $${index * colLength + 7})`,
                )
                .join(',');

            const insertQuery = `INSERT INTO ${Tables.Tasks} (${columns.join(',')}) VALUES ${placeholders}`;
            const values = chunk.flatMap((item) => [
                item.id,
                item.owner,
                item.email,
                item.company,
                item.date,
                item.description,
                item.status,
            ]);

            await this.execute(insertQuery, values);

            logger.info('Inserted batch', { batchNumber: i + 1 });
        }
    }

    /**
     * Gets all tasks
     */
    public async getTasks(): Promise<Task[]> {
        const columns = [
            TasksFields.Id,
            TasksFields.Owner,
            TasksFields.Email,
            TasksFields.Comapny,
            TasksFields.Date,
            TasksFields.Description,
            TasksFields.Status,
        ];

        const sql = `SELECT ${columns.join(',')} FROM ${Tables.Tasks}`;
        const results = await this.execute(sql);
        return results?.rows?.map((row) => row as Task) ?? [];
    }

    /**
     * Get a task by Id
     * @param id Id of task
     */
    public async getTaskById(id: string): Promise<Task | undefined> {
        const columns = [
            TasksFields.Id,
            TasksFields.Owner,
            TasksFields.Email,
            TasksFields.Comapny,
            TasksFields.Date,
            TasksFields.Description,
            TasksFields.Status,
        ];

        const sql = `SELECT ${columns.join(',')} FROM ${Tables.Tasks} WHERE ${TasksFields.Id} = $1`;

        const results = await this.execute(sql, [id]);

        if (results?.rows && results.rows.length > 0) {
            return results?.rows[0] as Task;
        }
    }

    /**
     * Create a task
     */
    public async createTask(task: Task): Promise<void> {
        const columns = [
            TasksFields.Id,
            TasksFields.Owner,
            TasksFields.Email,
            TasksFields.Comapny,
            TasksFields.Date,
            TasksFields.Description,
            TasksFields.Status,
        ];

        const insertQuery = `INSERT INTO ${Tables.Tasks} (${columns.join(',')}) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)`;

        const values = [task.id, task.owner, task.email, task.company, task.date, task.description, task.status];

        await this.execute(insertQuery, values);
    }

    /**
     * Update a task by Id
     * @param task Task to update
     */
    public async updateTask(task: Task): Promise<void> {
        const sql = `
        UPDATE ${Tables.Tasks} 
        SET 
            ${TasksFields.Owner} = $2,
            ${TasksFields.Email} = $3,
            ${TasksFields.Comapny} = $4,
            ${TasksFields.Date} = $5,
            ${TasksFields.Description} = $6,
            ${TasksFields.Status} = $7
        WHERE ${TasksFields.Id} = $1`;

        const values = [task.id, task.owner, task.email, task.company, task.date, task.description, task.status];

        await this.execute(sql, values);
    }

    /**
     * Delete a task by Id
     * @param id Id of task
     */
    public async deleteTask(id: string): Promise<void> {
        const sql = `DELETE FROM ${Tables.Tasks} WHERE ${TasksFields.Id} = $1`;
        await this.execute(sql, [id]);
    }

    /**
     * Create a file meta
     */
    public async createFileMeta(fileMeta: FileMeta): Promise<void> {
        const columns = [FileMetaFields.Id, FileMetaFields.File, FileMetaFields.Created, FileMetaFields.Status];

        const insertQuery = `INSERT INTO ${Tables.FileMeta} (${columns.join(',')}) 
            VALUES ($1, $2, $3, $4)`;

        const values = [fileMeta.id, fileMeta.file, fileMeta.created, fileMeta.status];

        await this.execute(insertQuery, values);
    }

    /**
     * Update a file meta by Id
     * @param fileMeta File meta to update
     */
    public async updateFileMeta(fileMeta: FileMeta): Promise<void> {
        const sql = `
        UPDATE ${Tables.FileMeta} 
        SET 
            ${FileMetaFields.File} = $2,
            ${FileMetaFields.Created} = $3,
            ${FileMetaFields.Status} = $4
        WHERE ${FileMetaFields.Id} = $1`;

        const values = [fileMeta.id, fileMeta.file, fileMeta.created, fileMeta.status];

        await this.execute(sql, values);
    }

    /**
     * Get a file meta by file
     * @param file File of file meta
     */
    public async getFileMetaByFile(file: string): Promise<FileMeta | undefined> {
        const columns = [FileMetaFields.Id, FileMetaFields.File, FileMetaFields.Created, FileMetaFields.Status];

        const sql = `SELECT ${columns.join(',')} FROM ${Tables.FileMeta} WHERE ${FileMetaFields.File} = $1`;

        const results = await this.execute(sql, [file]);

        if (results?.rows && results.rows.length > 0) {
            return results?.rows[0] as FileMeta;
        }
    }

    /**
     * Executes queries against the database
     * @param query Query to execute
     * @param values Query parameters
     * @returns Query results
     */
    private async execute(query: string, values?: any[]): Promise<QueryResult<any> | undefined> {
        return await this.client.query({ text: query, values });
    }
}
