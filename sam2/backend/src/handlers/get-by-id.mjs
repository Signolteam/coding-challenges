import PKG from "pg";

export const getByIdHandler = async (event) => {
  if (event.httpMethod !== "GET") {
    throw new Error(
      `getMethod only accept GET method, you tried: ${event.httpMethod}`
    );
  }

  const id = event.pathParameters.id;

  const clientOptions = {
    user: "postgres",
    password: "password",
    host: "signoldb-identifier.chmccoigw4nq.eu-west-1.rds.amazonaws.com",
    port: 5432,
    database: "signoldb",
  };

  let resBody = null;
  try {
    const client = new PKG.Pool(clientOptions);

    const sqlQuery = `SELECT * FROM tasks WHERE tasks.id = $1`;

    const params = [id];

    client.connect();

    const result = await client.query(sqlQuery, params);

    resBody = {
      status: "success",
      data: result.rows ? result.rows : null,
      result: !result.rows ? result : null,
    };

    client.end();
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*", //DO NOT USE THIS VALUE IN PRODUCTION - https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify(["Error connecting to PostgreSQL database", error]),
    };
  }

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*", //DO NOT USE THIS VALUE IN PRODUCTION - https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: JSON.stringify(resBody),
  };

  return response;
};
