import { observable } from 'mobx';
import { User } from '@/types';

const userStore = observable({} as Record<string, User>);

export const getUser = (id: string) => userStore[id] || {};

export const addUpdateUser = (user: User) => {
    userStore[user.userId] = user;
};

export const addUpdateUsers = (users: User[]) => {
    users.forEach(addUpdateUser);
};

export const clearUsers = () => {
    for (let key of Object.keys(userStore)) {
        delete userStore[key];
    }
};

export default userStore;