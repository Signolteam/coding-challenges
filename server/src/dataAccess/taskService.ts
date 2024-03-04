import { Client } from "pg";
import { queryClient } from "../connection";

export const getTasks = async () => {
  //connect to dbclient

  const result = await queryClient("SELECT * FROM tasks");
  return result;
};
