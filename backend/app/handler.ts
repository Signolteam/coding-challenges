import { Handler, Context } from "aws-lambda";
import dotenv from "dotenv";
dotenv.config();

import { TasksController } from "./controller/TasksController";
const tasksController = new TasksController();

export const createMany: Handler = (event: any, context: Context) =>
  tasksController.createMany(event, context);

export const update: Handler = (event: any) => tasksController.update(event);

export const find: Handler = () => tasksController.find();

// export const findOne: Handler = (event: any) => tasksController.findOne(event);
