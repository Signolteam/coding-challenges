import { FullTask } from '@/types';
import { getUser } from './Users';
import { getTask  } from './Tasks';
import { getCompany } from './Companies';

export const getFullTask = (id: string): FullTask => {
    const task = getTask(id);

    if (!task.createdByUserId) { 
        throw new Error('no such task');
    }

    const user = getUser(task.createdByUserId);
    const company = getCompany(user.companyId);

    return {
        ...task,
        ...user,
        ...company
    };
};