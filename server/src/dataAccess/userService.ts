import { Client } from "pg";
import { singleQueryClient } from "../connection";
import { SearchParamBody } from "../types";

export const getUsers = async () => {
  const result = await singleQueryClient("SELECT * FROM users", null);
  return result;
};

export const getUsersWithSearchParam = async (body: SearchParamBody) => {
  //change query string to add case check?
  const str = body.searchString.toLowerCase();
  const result = await singleQueryClient(
    "SELECT * FROM users WHERE CONTAINS('name', $1",
    [str]
  );
  return result;
};
