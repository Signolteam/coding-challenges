import CreateTaskDTO from "./CreateTaskDTO";

export type RequestBodyCreateMany = {
  create: Array<CreateTaskDTO>;
};
