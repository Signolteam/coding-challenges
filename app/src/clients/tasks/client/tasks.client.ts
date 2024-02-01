import { ApiOptions } from "../api/api-options";
import { TasksApi } from "../api/tasks.api";

export class TasksClient {
    public tasksApi: TasksApi;

    constructor() {
        const apiOptions: ApiOptions = {
            baseUrl: process.env.REACT_APP_TASKS_API_URL as string,
        };

        this.tasksApi = new TasksApi(apiOptions);
    }
}
