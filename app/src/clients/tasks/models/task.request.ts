import { TaskStatus } from "./task-status";

export interface TaskRequest {
    owner: string;
    email: string;
    company: string;
    date: string;
    description: string;
    status: TaskStatus;
}
