import axios from "axios";

import UrlBuilder from "../util/UrlBuilder";
import { TaskStates } from "../enum/TaskStates";
import RequestBodyCreateMany from "../dto/RequestBodyCreateMany";
import { CreateTaskDTO, UpdateTaskDTO } from "../dto";

/** Wrapper around HTTP requests to the Tasks API */
export default class TasksApi {
  static async getAllTasks() {
    const url = UrlBuilder.tasks.getAll();
    return axios.get(url);
  }

  static async createTasks(createTaskDTOs: Array<CreateTaskDTO>) {
    const url = UrlBuilder.tasks.postCreate();
    const requestBody: RequestBodyCreateMany = {
      create: createTaskDTOs,
    };
    return axios.post(url, requestBody);
  }

  static async setTaskStatus(task_id: string, targetState: TaskStates) {
    const url = UrlBuilder.tasks.putUpdate(task_id);
    const requestBody: UpdateTaskDTO = {
      task_status: targetState,
    };
    return axios.put(url, requestBody);
  }
}
