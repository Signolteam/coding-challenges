import { Client } from "pg";

const client = new Client({
  user: "postgres",
  password: "password",
  host: "localhost",
  port: 5432,
  database: "signoldb",
});

export const queryClient = async (sqlQuery: string) => {
  try {
    await client.connect();
  } catch (error) {
    console.error("Error connecting to PostgreSQL database", error);
  }

  const result = await client.query(sqlQuery);
  client.end();
  return result.rows;
};
