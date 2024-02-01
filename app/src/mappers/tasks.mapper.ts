import { TaskRequest } from "../clients/tasks/models/task.request";
import { TaskResponse } from "../clients/tasks/models/task.response";
import { Task, TaskStatus } from "../models/Task.type";

export class TasksMapper {
    public mapResponse(response: TaskResponse): Task {
        return {
            id: response.id,
            owner: response.owner,
            email: response.email,
            company: response.company,
            description: response.description,
            date: response.date,
            status: TaskStatus[response.status],
        };
    }

    public mapTaskToRequest(task: Task): TaskRequest {
        return {
            owner: task.owner,
            email: task.email,
            company: task.company,
            description: task.description,
            date: task.date,
            status: task.status,
        };
    }
}
