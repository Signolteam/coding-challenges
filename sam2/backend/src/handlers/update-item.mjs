import PKG from "pg";

export const updateItemHandler = async (event) => {
  if (event.httpMethod !== "PUT") {
    throw new Error(
      `putItem only accepts PUT method, you tried: ${event.httpMethod} method.`
    );
  }

  const body = JSON.parse(event.body);

  const updateQuery = `UPDATE public.tasks
  SET "status" = $1
  WHERE "id" = $2;`;
  const params = [body.status, body.id];

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

    client.connect();

    const result = await client.query(updateQuery, params);

    resBody = {
      status: "success",
      data: result.rows ? result.rows : null,
      result: !result.rows ? result : null,
    };

    client.end();
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify(["Error connecting to PostgreSQL database", error]),
    };
  }

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: JSON.stringify(resBody),
  };

  return response;
};
