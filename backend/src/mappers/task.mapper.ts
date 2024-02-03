import { randomUUID } from 'crypto';
import { CSVTask, Task, TaskRequest, TaskStatus } from 'models';

export class TaskMapper {
    public mapCSVToTask(csv: CSVTask): Task {
        return {
            id: randomUUID(),
            owner: csv.task_owner,
            email: csv.email,
            company: csv.company_name,
            date: csv.task_date,
            description: csv.task_description,
            status: TaskStatus[csv.task_status as keyof typeof TaskStatus],
        };
    }

    public mapRequestToTask(request: TaskRequest): Task {
        return {
            owner: request.owner,
            email: request.email,
            company: request.company,
            date: request.date,
            description: request.description,
            status: TaskStatus[request.status as keyof typeof TaskStatus],
        };
    }
}
