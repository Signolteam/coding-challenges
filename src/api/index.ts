import { addUpdateCompanies } from '@/state/Companies';
import { addUpdateUsers } from '@/state/Users';
import { addUpdateTasks } from '@/state/Tasks';
import rawData, { RawTask, rawDataToResponse } from './mockTasks';

export const getTasks = async () => {
    const { users, companies, tasks } = rawDataToResponse(rawData as RawTask[]);

    addUpdateUsers(users);
    addUpdateCompanies(companies);
    addUpdateTasks(tasks);
};

