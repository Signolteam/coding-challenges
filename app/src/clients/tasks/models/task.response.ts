import { TaskStatus } from "./task-status";

export interface TaskResponse {
    id: string;
    owner: string;
    email: string;
    company: string;
    date: string;
    description: string;
    status: TaskStatus;
}
