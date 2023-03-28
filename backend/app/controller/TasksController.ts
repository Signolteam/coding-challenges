import { Context } from "aws-lambda";
import { MessageUtil } from "../utils/message";
import { TasksService } from "../service/TasksService";

export class TasksController extends TasksService {
  /**
   * Create book
   * @param {*} event
   */
  async create(event: any, context?: Context) {
    console.log("functionName", context.functionName);

    try {
      const result = await this.create();

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Update a book by id
   * @param event
   */
  async update(event: any) {
    const id: number = Number(event.pathParameters.id);
    const body: object = JSON.parse(event.body);

    try {
      const result = await this.updateTasks(id, body);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Find book list
   */
  async find() {
    try {
      const result = await this.findTasks();

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Query book by id
   * @param event
   */
  async findOne(event: any, context: Context) {
    // The amount of memory allocated for the function
    console.log("memoryLimitInMB: ", context.memoryLimitInMB);

    const id: number = Number(event.pathParameters.id);

    try {
      const result = await this.findOneTaskById(id);

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Delete book by id
   * @param event
   */
  async deleteOne(event: any) {
    const id: number = event.pathParameters.id;

    try {
      const result = await this.deleteOneTaskById(id);

      if (result.deletedCount === 0) {
        return MessageUtil.error(
          1010,
          "The data was not found! May have been deleted!"
        );
      }

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }
}
