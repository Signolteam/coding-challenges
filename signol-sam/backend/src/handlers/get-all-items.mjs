// Create clients and set shared const values outside of the handler.
import { Client } from "pg";
import "dotenv/config";

export const clientOptions = {
  user: "postgres",
  password: "password",
  host: "signoldb-identifier.chmccoigw4nq.eu-west-1.rds.amazonaws.com",
  port: 5432,
  database: "signoldb",
};
/**
 *
 * A simple example includes a HTTP get method to get all items from a DynamoDB table.
 */
export const getAllItemsHandler = async (event) => {
  let resultBody;
  try {
    if (event.httpMethod !== "GET") {
      throw new Error(
        `getAllItems only accept GET method, you tried: ${event.httpMethod}`
      );
    }
    // All log statements are written to CloudWatch
    console.info("received:", event);

    const client = new Client(clientOptions);

    const sqlQuery = `SELECT * FROM tasks
        JOIN users u
        ON "createdBy" = u.id 
        ORDER BY "taskDate", tasks.id`;

    const params = [];

    await client.connect();

    const result = await client.query(sqlQuery, params);

    client.end();
    resultBody = {
      status: "success",
      data: result.rows ? result.rows : null,
      result: !result.rows ? result : null,
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*", //DO NOT USE THIS VALUE IN PRODUCTION - https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({ message: error }),
    };
  }

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*", //DO NOT USE THIS VALUE IN PRODUCTION - https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: resultBody,
  };

  return response;
};
