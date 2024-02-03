export interface Task {
    id?: string;
    owner: string;
    email: string;
    company: string;
    date: string;
    description: string;
    status: TaskStatus;
}

export enum TaskStatus {
    IN_REVIEW = 'IN_REVIEW',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
}

export const dummyTaskList: Task[] = [
    {
        id:'1234-abc',
        owner: 'Scott Hughes',
        company: 'Google',
        date: '30/01/2024',
        email: 'scott@hughes.com',
        description: 'Scotts descript of task',
        status: TaskStatus.IN_REVIEW
    },
    {
        id:'5678-def',
        owner: 'Jo Smith',
        company: 'Google',
        date: '30/01/2024',
        email: 'jo@smith.com',
        description: 'Why is Joe working',
        status: TaskStatus.IN_REVIEW
    }
];
