import "dotenv/config";
import { Client } from "pg";

export const singleQueryClient = async (
  sqlQuery: string,
  params: any[] = [],
  success?: boolean
) => {
  const client = new Client({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: JSON.parse(process.env.PORT),
    database: process.env.DATABASE,
  });
  try {
    await client.connect();

    const result = await client.query(sqlQuery, params);

    client.end();
    return !!success ? "success" : result.rows ? result.rows : "success";
  } catch (error) {
    console.error("Error connecting to PostgreSQL database", error);
  }
};

export const multiQueryClient = async (
  multiQuery: any[],
  success?: boolean
) => {
  const client = new Client({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "signoldb",
  });
  try {
    await client.connect();

    const promises = multiQuery.map(async (query, index) => {
      await client.query(query.sqlQuery, query.params);
      return "success";
    });

    const results = await Promise.all(promises);

    client.end();
    return results.every((item) => item === "success")
      ? "success"
      : "success with some messages";
  } catch (error) {
    console.error("Error connecting to PostgreSQL database", error);
  }
};
