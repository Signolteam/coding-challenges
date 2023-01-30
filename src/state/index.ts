import { FullTask } from '@/types';
import { getUser, clearUsers } from './Users';
import { getTask, clearTasks  } from './Tasks';
import { getCompany, clearCompanies } from './Companies';

export const getFullTask = (id: string): FullTask => {
    const task = getTask(id);

    if (!task.createdByUserId) { 
        throw new Error('no such task');
    }

    const user = getUser(task.createdByUserId);
    const company = getCompany(user.companyId);

    return {
        task,
        user,
        company
    };
};

export const clearAllTasks = () => {
    clearCompanies();
    clearUsers();
    clearTasks();
};
