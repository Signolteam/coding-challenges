import PKG from "pg";

const createTaskQuery = (taskData) => {
  const { email, name, company, taskDate, taskDescription } = taskData;
  const status = "IN_REVIEW";
  return [
    {
      sqlQuery: ` INSERT INTO public.users ("name", "email", "company") 
        SELECT $1, $2, $3
        WHERE NOT EXISTS (
            SELECT 1 FROM public.users WHERE "email" LIKE $2
        );
      `,

      params: [name, email, company],
    },
    {
      sqlQuery: `INSERT INTO public.tasks ("taskDescription", "taskDate", "status", "createdBy") 
      VALUES ($2, $3, $4, (SELECT "id" FROM public.users WHERE "email" LIKE $1 LIMIT 1));`,
      params: [email, taskDescription, taskDate, status],
    },
  ];
};

export const putManyItemsHandler = async (event) => {
  if (event.httpMethod !== "POST") {
    throw new Error(
      `putManyItems only accept POST method, you tried: ${event.httpMethod}`
    );
  }

  const body = JSON.parse(event.body);
  const tasksArray = body.tasks;
  const bulkQueryArray = tasksArray.map((r) => {
    return createTaskQuery(r);
  });
  const flatArray = bulkQueryArray.flatMap((i) => i);

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

    const promises = flatArray.map(async (query, index) => {
      const response = await client.query(query.sqlQuery, query.params);
      return response;
    });

    const results = await Promise.all(promises);

    resBody = { status: "success", executed: results.length };

    client.end();
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify([
        "Error connecting to PostgreSQL database",
        error,
        body,
      ]),
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
