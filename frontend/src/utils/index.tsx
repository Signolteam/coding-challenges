import axios from "axios";

export const fetchTaskList = async () => {
  const res = await axios.get("http://localhost:4000/alltasks");
  return res.data.data;
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

//get("/users") --> get all users, no restriction

//get("/users/search/:string") --> get user based on search on name

//get("/alltasks") --> get all tasks, no skip&take, no restrictions

//get("/tasks/count") --> get total count of tasks

//get("/tasks/:skip/:take") --> get tasks per page with skip & take

//get("/tasks/search") --> get tasks based on search param - date or string

//post("/task") --> create 1 task

//post("/tasks") --> create many

//put("/task") --> update task status

//delete("/task")
