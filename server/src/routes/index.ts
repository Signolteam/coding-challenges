import express from "express";
import { getUsers } from "../dataAccess/userService";
import {
  createBulkTasks,
  createTask,
  deleteTask,
  getAllTasks,
  getTasksWithSkipTake,
  updateTask,
} from "../dataAccess/taskService";

const router = express.Router();

router.get("/users", async (req, res) => {
  const usersData = await getUsers();
  res.send(usersData);
});

router.get("/alltasks", async (req, res) => {
  const tasksData = await getAllTasks();
  res.send(tasksData);
});

router.get("/tasksskiptake", async (req, res) => {
  const tasksData = await getTasksWithSkipTake(req.body);
  res.send(tasksData);
});

router.get("/taskssearch", async (req, res) => {
  const tasksData = await getTasksWithSkipTake(req.body);
  res.send(tasksData);
});

router.post("/task", async (req, res) => {
  const tasksData = await createTask(req.body);
  res.send(tasksData);
});

router.post("/tasks", async (req, res) => {
  const tasksData = await createBulkTasks(req.body);
  res.send(tasksData);
});

router.put("/task", async (req, res) => {
  const tasksData = await updateTask(req.body);
  res.send(tasksData);
});

router.delete("/task", async (req, res) => {
  const tasksData = await deleteTask(req.body);
  res.send(tasksData);
});

export default router;
