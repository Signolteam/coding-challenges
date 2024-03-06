import "dotenv/config";
import { Client } from "pg";

export const clientOptions = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: JSON.parse(process.env.PORT),
  database: process.env.DATABASE,
};

export const singleQueryClient = async (
  sqlQuery: string,
  params: any[] = []
) => {
  const client = new Client(clientOptions);
  try {
    await client.connect();

    const result = await client.query(sqlQuery, params);

    client.end();
    return {
      status: "success",
      data: result.rows ? result.rows : null,
      result: !result.rows ? result : null,
    };
  } catch (error) {
    console.error("Error connecting to PostgreSQL database", error);
  }
};

export const multiQueryClient = async (multiQuery: any[]) => {
  const client = new Client(clientOptions);
  try {
    await client.connect();

    const promises = multiQuery.map(async (query, index) => {
      const response = await client.query(query.sqlQuery, query.params);
      return response;
    });

    const results = await Promise.all(promises);

    client.end();
    return { status: "success", executed: results.length };
  } catch (error) {
    console.error("Error connecting to PostgreSQL database", error);
  }
};
