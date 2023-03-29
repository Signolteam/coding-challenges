import { TaskStates } from "../enum/TaskStates";

/**
 * The data structure to output a Task (a Task with Owner details embedded)
 * @remarks Could be refactored to the Aggregate Root pattern, to better organize read+write
 */
export default interface TaskOutputDTO {
  task_id: string;
  owner_id: string;
  owner_full_name: string;
  owner_email: string;
  owner_company_name: string;
  day: Date;
  description: string;
  status: TaskStates;
}
