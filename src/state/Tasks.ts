import { observable } from 'mobx';
import { Task, TaskStatus } from '@/types';

const taskStore = observable({} as Record<string, Task>);

export const getTask = (id: string) => taskStore[id] || {};

export const addUpdateTask = (task: Task) => {
    taskStore[task.taskId] = task;
};

export const addUpdateTasks = (tasks: Task[]) => {
    tasks.forEach(addUpdateTask);
};

export const updateTaskStatus = (taskId: Task['taskId'], status: TaskStatus) => {
    console.log('STORE: updating', taskId, status);
    if (taskId in taskStore) {
        console.log('found, updating');
        taskStore[taskId].status = status;
    }
    console.log('now', taskStore[taskId]);
};

export const clearTasks = () => {
    for (let key of Object.keys(taskStore)) {
        delete taskStore[key];
    }
};

export default taskStore;