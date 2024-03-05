import { Client } from "pg";
import { singleQueryClient } from "../connection";

export const getUsers = async () => {
  const result = await singleQueryClient("SELECT * FROM users", null);
  return result;
};
