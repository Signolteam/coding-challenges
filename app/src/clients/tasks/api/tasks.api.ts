import { FileMeta } from "../models/file-meta";
import { TaskRequest } from "../models/task.request";
import { TaskResponse } from "../models/task.response";
import { ApiOptions } from "./api-options";

export class TasksApi {
    constructor(private options: ApiOptions) { }

    public async getTasks(): Promise<TaskResponse[]> {
        const url = `${this.options.baseUrl}/tasks`;

        const response = await fetch(url, {
            method: 'GET',
        });

        if (response.status === 404) {
            return [];
        }

        if (!response.ok) {
            return [];
        }

        const data = await response.json();

        return data as TaskResponse[];
    }

    public async addTask(task: TaskRequest): Promise<TaskResponse> {
        const url = `${this.options.baseUrl}/tasks`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });

        if (!response.ok) {
            console.error(await response.text());
            throw Error('Error creating task');
        }

        const data = await response.json();

        return data as TaskResponse;
    }

    public async updateTask(id: string, task: TaskRequest): Promise<void> {
        const url = `${this.options.baseUrl}/tasks/${id}`;

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });

        if (!response.ok) {
            console.error(await response.text());
            throw Error('Error updating task');
        }
    }

    public async deleteTask(id: string): Promise<void> {
        const url = `${this.options.baseUrl}/tasks/${id}`;

        const response = await fetch(url, {
            method: 'DELETE',
        });

        if (!response.ok) {
            console.error(await response.text());
            throw Error('Error deleting task');
        }
    }

    public async generateUploadUrl(file: string): Promise<string> {
        const url = `${this.options.baseUrl}/files/signed?filename=${file}`;

        console.log(`generate url: ${url}`);

        const response = await fetch(url, {
            method: 'GET',
        });

        if (!response.ok) {
            console.error(await response.text());
            throw Error('Error generating upload url');
        }

        const data = await response.json();

        return data.url;
    }

    public async getFileMeta(file :string): Promise<FileMeta | undefined> {
        const url = `${this.options.baseUrl}/files?file=${file}`;

        const response = await fetch(url, {
            method: 'GET',
        });
        
        if (!response.ok) {
            return;
        }

        const data = await response.json();

        return data as FileMeta;
    }
}