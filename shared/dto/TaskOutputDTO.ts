import { TaskStates } from "../enum/TaskStates";

/**
 * The data structure to output a Task (a Task with Owner details embedded)
 * @remarks Could be swapped to an Aggregate Root
 */
export interface TaskOutputDTO {
  task_id: number;
  owner_id: number;
  owner_full_name: string;
  owner_email: string;
  owner_company_name: string;
  day: Date;
  description: string;
  status: TaskStates;
}
