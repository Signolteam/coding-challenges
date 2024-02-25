import axios from 'axios';
import type Task from '../models/Task'

const baseURL = process.env.REACT_APP_BACKEND_HOST


export default class TaskAPI {
  static #containsErrors(response: any) {
    /* There are 3 levels in which a request can fail:
     * 1) HTTP, generally between us and API Gateway.
     * 2) Lambda itself, ie uncaught exceptions, timeouts etc.
     * 3) An actual error response from the API.
     *
     * by default all 3 of these manifest slightly differently,
     * with only the HTTP layer resulting in a true HTTP error response,
     * which causes axios to throw.
     * The others both come through at the request level as status: 200,
     * and are managed here.
     */

    if (response.data.errorMessage) {
      console.error('Lambda error:', { response });
      return true
    }
    if (response.data?.statusCode && response.data.statusCode !== 200) {
      console.error('Error response from API:', { response });
      return true;
    }
    return false;
  }

  static async fetchTasks() : Promise<Task[] | null> {
    try {
      const resp = await axios.get(`${baseURL}/tasks`);
      return this.#containsErrors(resp) ? null : resp.data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static async createTasks(tasks: Task[]) : Promise<boolean> {
    try {
      const resp = await axios.post(`${baseURL}/tasks`, tasks);
      return this.#containsErrors(resp) ? false : true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  static async updateTask(task: Task) : Promise<boolean> {
    try {
      const resp = await axios.put(`${baseURL}/tasks/${task.id}`, task);
      return this.#containsErrors(resp) ? false : true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
