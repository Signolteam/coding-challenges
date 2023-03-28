import { Client } from "pg";
import { getDB } from "../model";

const _DB = await getDB();

export class TasksService {
  /**
   * Create task
   * @param params
   */
  protected async create(file: any): Promise<object> {
    try {
      //TODO: Parse csv + run inserts
      const result = await this.tasks.create({
        name: params.name,
        id: params.id,
      });

      return result;
    } catch (err) {
      console.error(err);

      throw err;
    }
  }

  protected async getAll() {
    //TODO: Paging?
    return await _DB.query(
      `SELECT
        tasks.*,
        tasks._id AS task_id,
        users.full_name AS owner_full_name,
        users.email AS owner_email,
        users.company_name AS owner_company_name,
      FROM tasks
      LEFT JOIN users ON tasks.owner_id=users._id;`
    );
  }

  /**
   * Query task by id
   * @param id
   */
  protected async getById(id: number) {
    return await _DB.query(
      `SELECT
        tasks.*,
        tasks._id AS task_id,
        users.full_name AS owner_full_name,
        users.email AS owner_email,
        users.company_name AS owner_company_name,
      FROM tasks
      LEFT JOIN users ON tasks.owner_id=users._id
      WHERE tasks._id = $1;`,
      [id]
    );
  }
}
