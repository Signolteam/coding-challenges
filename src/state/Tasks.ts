import { observable } from 'mobx';
import { Task } from '@/types';

const taskStore = observable({} as Record<string, Task>);

export const getTask = (id: string) => taskStore[id] || {};

export const addUpdateTask = (task: Task) => {
    taskStore[task.taskId] = task;
};

export const addUpdateTasks = (tasks: Task[]) => {
    tasks.forEach(addUpdateTask);
};

export default taskStore;