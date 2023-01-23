export type Company = {
    companyId: string,
    name: string,
}

export type User = {
    userId: string,
    name: string,
    email: string,
    companyId: string
}

export type TaskStatus = 'APPROVED' | 'REJECTED' | 'IN_REVIEW';

export type Task = {
    taskId: string,
    description: string,
    status: TaskStatus,
    createdByUserId: string,
    date: Date
}

export type FullTask = Task & User & Company

export type TaskResponse = {
    tasks: Task[],
    users: User[],
    companies: Company[]
}