import path from "node:path";
import { Handler, Context } from "aws-lambda";
import dotenv from "dotenv";
const dotenvPath = path.join(__dirname, "../", `.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: dotenvPath,
});
console.log("*** coding-challenges-signol/backend ***");
console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);
console.log("process.env.ENV: ", process.env.ENV);
console.log("process.env.PGHOST: ", process.env.PGHOST);

import { TasksController } from "./controller/TasksController";
const tasksController = new TasksController();

function logContext(context: Context) {
  console.log("\n↳", context.functionName || context.invokedFunctionArn);
}

export const createMany: Handler = (event: any, context: Context) => {
  logContext(context);
  tasksController.createMany(event, context);
};

export const update: Handler = (event: any, context: Context) => {
  logContext(context);
  tasksController.update(event);
};

export const find: Handler = (context: Context) => {
  logContext(context);
  tasksController.find();
};

// export const findOne: Handler = (event: any) => tasksController.findOne(event);
