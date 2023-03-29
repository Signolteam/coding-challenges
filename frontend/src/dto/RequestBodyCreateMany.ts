import CreateTaskDTO from "../../../backend/app/model/dto/CreateTaskDTO";

type RequestBodyCreateMany = {
  create: Array<CreateTaskDTO>;
};
export default RequestBodyCreateMany;
