import { Context } from "aws-lambda";
import { MessageUtil } from "../utils/MessageUtil";
import { TaskRepository } from "../infrastructure/TaskRepository";
import ITaskRepository from "../infrastructure/ITaskRepository";
import { ValidateCreateTaskDTO } from "../model/dto/CreateTaskDTO";
import UpdateTaskDTO, {
  ValidateUpdateTaskDTO,
} from "../model/dto/UpdateTaskDTO";
import isUUID from "../utils/isUUID";
import { RequestBodyCreateMany } from "../model/dto/RequestBodyCreateMany";

export class TasksController {
  taskRepository: ITaskRepository;
  constructor(taskRepository: ITaskRepository = new TaskRepository()) {
    //TODO: Dependency Injection so we can test
    this.taskRepository = taskRepository;
  }

  /**
   * Create a Task
   * @param {*} event
   */
  async createMany(event: any, context?: Context) {
    console.log("functionName", context?.functionName);
    const body: RequestBodyCreateMany = JSON.parse(event.body);
    const createDTOs = body.create;

    //Validation
    createDTOs.forEach((dto, index) => {
      const validationErrors = ValidateCreateTaskDTO(dto);
      if (validationErrors.length > 0) {
        return MessageUtil.error(
          400,
          `Error at row ${index}: ${validationErrors.join("\n")}`
        );
      }
    });

    return await this.taskRepository
      .createMany(createDTOs)
      .then(() =>
        MessageUtil.success({ message: `${createDTOs.length} Tasks Created` })
      )
      .catch((err: any) => MessageUtil.error(err.code, err.message));
  }

  /**
   * Update a task (status only)
   * @param event
   */
  async update(event: any) {
    const id: string = event.pathParameters.id;
    if (!isUUID(id)) {
      return MessageUtil.error(400, "Invalid UUID");
    }

    const body: UpdateTaskDTO = JSON.parse(event.body);
    const validationErrors = ValidateUpdateTaskDTO(body);
    if (validationErrors.length > 0) {
      return MessageUtil.error(
        400,
        "Invalid Body: " + validationErrors.join("\n")
      );
    }

    return await this.taskRepository
      .update(id, body)
      .then(() => MessageUtil.success({ message: "Task Updated" }))
      .catch((err: any) => MessageUtil.error(err.code, err.message));
  }

  /**
   * Get all Tasks
   */
  async find() {
    return await this.taskRepository
      .getAll()
      .then((result) => MessageUtil.success(result))
      .catch((err: any) => MessageUtil.error(err.code, err.message));
  }

  /**
   * Get single Task by ID
   * @param event
   */
  // async findOne(event: any) {
  //   const id: string = event.pathParameters.id;

  //   //Validation
  //   if (!isUUID(id)) {
  //     return MessageUtil.error(400, "Invalid UUID");
  //   }

  //   return await this.taskRepository
  //     .getById(id)
  //     .then((result) => MessageUtil.success(result))
  //     .catch((err: any) => MessageUtil.error(err.code, err.message));
  // }
}
