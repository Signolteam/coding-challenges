import { TaskStates } from "../enum/TaskStates";

/** This matches the data CSV */
export interface CreateTaskDTO {
  task_owner: string;
  email: string;
  company_name: string;
  task_date: Date;
  task_description: string;
  task_status: TaskStates;
}
