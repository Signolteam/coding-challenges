import Ajv from 'ajv';
import type Task from '../models/Task';
import { taskArraySchema } from '../models/Task';
const ajv = new Ajv();


export function validateTaskArray(taskArray: Task[]) {
  const validate = ajv.compile(taskArraySchema);
  if (validate(taskArray)) return null;
  console.log('Errors validating taskArray:', validate.errors);
  return validate.errors;
}
