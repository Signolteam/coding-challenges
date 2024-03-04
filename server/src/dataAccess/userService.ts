import { Client } from "pg";
import { queryClient } from "../connection";

export const getUsers = async () => {
  //connect to dbclient

  const result = await queryClient("SELECT * FROM users");
  return result;
};
