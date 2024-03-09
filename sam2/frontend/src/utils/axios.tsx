import axios from "axios";
import { UpdateBody, csvItem } from "../types";
import { Try } from "@mui/icons-material";

const baseUrl = `https://5byhs0fdig.execute-api.eu-west-1.amazonaws.com/Prod`;

export const fetchTaskList = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

export const fetchTaskPage = async (page: number, rowsPerPage: number) => {
  const skip = page * rowsPerPage;
  const take = rowsPerPage;
  const res = await axios.get(`${baseUrl}/tasks/${skip}/${take}`);
  return res.data.data;
};

export const fetchTaskCount = async () => {
  const res = await axios.get(`${baseUrl}/count`);
  return JSON.parse(res.data.data[0].count);
};

export const fetchTaskPerDate = async (start: string, end: string) => {
  const res = await axios.get(`${baseUrl}/date/start/${start}/end/${end}`);
  return res.data;
};
//TODO: get("/tasks/search") --> get tasks based on search param - string compared to content in description

export const fetchUsers = async () => {
  const res = await axios.get(`${baseUrl}/users`);
  return res.data.data;
};

//post("/task") --> create 1 task
export const createOneTask = async (body: csvItem) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const res = await axios.post(`${baseUrl}/`, body, config);
  return res.data;
};
//post("/tasks") --> create many
export const createTasks = async (body: csvItem[]) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const res = await axios.post(`${baseUrl}/manytasks`, { tasks: body }, config);
  return res.data;
};

export const updateStatus = async (body: UpdateBody) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(`${baseUrl}/`, body, config);
    return res.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

//TODO: delete("/task")
