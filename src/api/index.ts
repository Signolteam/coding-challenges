import * as Companies from '@/state/Companies';
import * as Users from '@/state/Users';
import * as Tasks from '@/state/Tasks';
import rawData, { RawTask, rawDataToResponse } from './mockTasks';
import type { Task, TaskStatus } from '@/types';

export const getTasks = async () => {
    const { users, companies, tasks } = await rawDataToResponse(rawData as RawTask[]);

    Users.addUpdateUsers(users);
    Companies.addUpdateCompanies(companies);
    Tasks.addUpdateTasks(tasks);
};

export const updateTaskStatus = async (taskId: Task['taskId'], status: TaskStatus) => {
    console.log('API: updating', taskId, status);
    await new Promise((res) => {
        setTimeout(res, 500);
    });

    Tasks.updateTaskStatus(taskId, status);
};