import { BaseEntity } from "./BaseEntity";
import { TaskStates } from "../enum/TaskStates";

export interface Task extends BaseEntity {
  owner_id: string;
  status: TaskStates;
  day?: string;
  description?: string;
}
