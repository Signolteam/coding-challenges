import {JSONSchemaType} from 'ajv';

type Task = {
  id?: number,
  createdBy: string,
  companyName: string,
  description: string,
  email: string,
  date: string,
  status: 'IN_REVIEW' | 'APPROVED' | 'REJECTED',
};

export const taskSchema: JSONSchemaType<Task> = {
  type: 'object',
  properties: {
    id: {type: 'number', nullable: true},
    createdBy: {type: 'string'},
    companyName: {type: 'string'},
    description: {type: 'string'},
    email: {type: 'string'},
    date: {type: 'string'},
    status: {type: 'string', enum: ['IN_REVIEW', 'APPROVED', 'REJECTED']}
  },
  required: ['companyName', 'description', 'email', 'date', 'status'],
  additionalProperties: false
};

export const taskArraySchema: JSONSchemaType<Task[]> = {
  type: 'array',
  items: taskSchema,
}

export default Task;
