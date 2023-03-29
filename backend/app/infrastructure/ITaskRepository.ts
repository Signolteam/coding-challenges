import {
  UpdateTaskDTO,
  CreateTaskDTO,
  TaskOutputDTO,
} from "../model/dto/index";

export default interface ITaskRepository {
  /**
   * @returns Array of created `Task._id`s
   */
  createMany(createDTOs: Array<CreateTaskDTO>): Promise<void>;

  getAll(): Promise<Array<TaskOutputDTO>>;

  /**
   * @param id Task._id
   */
  getById(id: string): Promise<TaskOutputDTO>;

  /**
   * @param id Task._id
   * @param updateTaskDTO
   */
  update(id: string, updateTaskDTO: UpdateTaskDTO): Promise<void>;
}
