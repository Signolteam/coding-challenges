import Ajv from 'ajv';
import type Task from '../models/Task';
import { taskArraySchema } from '../models/Task';
const ajv = new Ajv();


export function validateTaskArray(taskArray: Task[]) {
  const validate = ajv.compile(taskArraySchema);
  if (validate(taskArray)) return null;
  return validate.errors;
}
