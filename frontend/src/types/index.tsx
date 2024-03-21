export type csvItem = {
  id?: string;
  name: string;
  email: string;
  company: string;
  taskDate: string;
  taskDescription: string;
  status: string;
};

export type Task = {
  id: string;
  name: string;
  email: string;
  company: string;
  taskDate: string;
  taskDescription: string;
  status: string;
};

export type TaskFormState = {
  name?: string;
  email?: string;
  company?: string;
  taskDate?: any;
  taskDescription?: string;
};

export type UpdateBody = {
  id: string;
  status: string;
};

export type User = {
  id?: string;
  name: string;
  email: string;
};
