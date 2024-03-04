import express from "express";
import { getUsers } from "../dataAccess/userService";
import { getTasks } from "../dataAccess/taskService";

const router = express.Router();

router.get("/users", async (req, res) => {
  const usersData = await getUsers();
  res.send(usersData);
  //   res.send("Users");
});

router.get("/tasks", async (req, res) => {
  const tasksData = await getTasks();
  res.send(tasksData);
});

export default router;
