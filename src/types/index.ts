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
    date: string
}

export type FullTask = {
    task: Task,
    user: User,
    company: Company
}

export type TaskResponse = {
    tasks: Task[],
    users: User[],
    companies: Company[]
}

export type LOADING_STATE = 'LOADING' | 'LOADED';