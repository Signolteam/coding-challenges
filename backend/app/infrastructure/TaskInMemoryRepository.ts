import { randomUUID } from "node:crypto";
import {
  UpdateTaskDTO,
  CreateTaskDTO,
  TaskOutputDTO,
} from "../model/dto/index";
import ITaskRepository from "./ITaskRepository";
import { TaskStates } from "../../../frontend/src/enum/TaskStates";
import { ErrorMessages } from "../exceptions";

export class TaskInMemoryRepository implements ITaskRepository {
  _tasks: TaskOutputDTO[] = [];

  public async createMany(createDTOs: Array<CreateTaskDTO>) {
    this._tasks.push(
      ...createDTOs.map((dto) => {
        return {
          task_id: randomUUID(),
          owner_id: randomUUID(),
          owner_full_name: dto.task_owner,
          owner_email: dto.email,
          owner_company_name: dto.company_name,
          task_date: dto.task_date,
          description: dto.task_description,
          status: dto.task_status ?? TaskStates.IN_REVIEW,
        };
      })
    );
  }

  public async getAll() {
    return this._tasks;
  }

  public async getById(id: string) {
    const found = this._tasks.find((t) => t.task_id === id);
    if (found) {
      return found;
    }
    throw Error(ErrorMessages.taskIdNotFound);
  }

  public async update(id: string, updateTaskDTO: UpdateTaskDTO) {
    const taskIndex = this._tasks.findIndex((t) => t.task_id === id);
    if (taskIndex === -1) {
      throw Error(ErrorMessages.taskIdNotFound);
    }
    const task = this._tasks[taskIndex];
    if (task.status !== TaskStates.IN_REVIEW) {
      throw Error(ErrorMessages.taskStatusCannotBeEdited);
    }
    this._tasks[taskIndex] = {
      ...task,
      status: updateTaskDTO.task_status,
    };
  }
}
