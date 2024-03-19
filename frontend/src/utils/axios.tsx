import axios from "axios";
import { UpdateBody, csvItem } from "../types";

export const fetchTaskList = async () => {
  const res = await axios.get(
    "https://nyrslk37od.execute-api.eu-west-1.amazonaws.com/prod/getTasks"
  );
  return res.data;
};

export const fetchTaskPage = async (page: number, rowsPerPage: number) => {
  const skip = page * rowsPerPage;
  const take = rowsPerPage;
  const res = await axios.get(`http://localhost:4000/tasks/${skip}/${take}`);
  return res.data.data;
};

export const fetchTaskCount = async () => {
  const res = await axios.get("http://localhost:4000/tasks/count");
  return JSON.parse(res.data.data[0].count);
};

export const fetchTaskPerDate = async (start: string, end: string) => {
  const res = await axios.get(
    `http://localhost:4000/tasks/search/date/start/${start}/end/${end}`
  );
  return res.data;
};
//TODO: get("/tasks/search") --> get tasks based on search param - string compared to content in description
export const fetchTaskPerString = async (str: string) => {
  const res = await axios.get(
    `http://localhost:4000/tasks/search/description/${str}`
  );
  return res.data;
};

export const fetchUsers = async () => {
  const res = await axios.get("http://localhost:4000/users");
  return res.data.data;
};

//post("/task") --> create 1 task
export const createOneTask = async (body: csvItem) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const res = await axios.post(`http://localhost:4000/task`, body, config);
  return res.data;
};
//post("/tasks") --> create many
export const createTasks = async (body: csvItem[]) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const res = await axios.post(`http://localhost:4000/tasks`, body, config);
  return res.data;
};

export const updateStatus = async (body: UpdateBody) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const res = await axios.put(`http://localhost:4000/task`, body, config);
  return res.data;
};

//TODO: delete("/task")
