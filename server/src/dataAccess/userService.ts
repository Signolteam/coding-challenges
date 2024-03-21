import { singleQueryClient } from "../connection";
import { SearchParamBody } from "../types";

export const getUsers = async () => {
  const result = await singleQueryClient("SELECT * FROM users", null);
  return result;
};

export const getUsersWithParam = async (string: string) => {
  const searchString = string.trim().toLowerCase();
  const result = await singleQueryClient(
    `SELECT * FROM users WHERE LOWER("name") LIKE '%' || LOWER($1) || '%';`,
    [searchString]
  );
  return result;
};
