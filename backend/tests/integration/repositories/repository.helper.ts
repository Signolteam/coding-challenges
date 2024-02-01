import { Pool } from 'pg';
import { FileMetaFields, Tables, TasksFields } from 'repositories';
import { FileMeta, Task } from 'models';

export async function clearTasksTable(client: Pool) {
    const sql = `TRUNCATE ${Tables.Tasks}`;
    await client.query({ text: sql });
}

export async function createTask(client: Pool, task: Task) {
    const columns = [
        TasksFields.Id,
        TasksFields.Owner,
        TasksFields.Email,
        TasksFields.Comapny,
        TasksFields.Date,
        TasksFields.Description,
        TasksFields.Status,
    ];

    const sql = `INSERT INTO ${Tables.Tasks} (${columns.join(',')}) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)`;

    const values = [task.id, task.owner, task.email, task.company, task.date, task.description, task.status];

    await client.query({ text: sql, values });
}

export async function getTaskById(client: Pool, id: string): Promise<Task | undefined> {
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

    const results = await client.query({ text: sql, values: [id] });

    if (results?.rows && results.rows.length > 0) {
        return results?.rows[0] as Task;
    }
}

export async function getTasks(client: Pool): Promise<Task[] | undefined> {
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

    const results = await client.query({ text: sql });

    if (results) {
        return results.rows?.map((row) => row as Task);
    }
}

export async function createFileMeta(client: Pool, fileMeta: FileMeta) {
    const columns = [FileMetaFields.Id, FileMetaFields.File, FileMetaFields.Created, FileMetaFields.Status];

    const sql = `INSERT INTO ${Tables.FileMeta} (${columns.join(',')}) VALUES ($1, $2, $3, $4)`;

    const values = [fileMeta.id, fileMeta.file, fileMeta.created, fileMeta.status];

    await client.query({ text: sql, values });
}

export async function getFileMetaByFile(client: Pool, file: string): Promise<FileMeta | undefined> {
    const columns = [FileMetaFields.Id, FileMetaFields.File, FileMetaFields.Created, FileMetaFields.Status];

    const sql = `SELECT ${columns.join(',')} FROM ${Tables.FileMeta} WHERE ${FileMetaFields.File} = $1`;

    const results = await client.query({ text: sql, values: [file] });

    if (results?.rows && results.rows.length > 0) {
        return results?.rows[0] as FileMeta;
    }
}
