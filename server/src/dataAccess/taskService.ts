import { multiQueryClient, singleQueryClient } from "../connection";
import { SearchParamBody, SkipTakeBody } from "../types";

export const getAllTasks = async () => {
  const result = await singleQueryClient(
    `SELECT * FROM tasks
    JOIN users u
    ON "createdBy" = u.id 
    ORDER BY "taskDate", tasks.id`
  );
  return result;
};

export const getTasksCount = async () => {
  const result = await singleQueryClient("SELECT COUNT(id) FROM tasks");
  return result;
};

export const getTasksWithSkipTake = async (body: SkipTakeBody) => {
  const { skip, take } = body;
  const result = await singleQueryClient(
    `SELECT tasks.*, u.name, u.email, u.company FROM tasks JOIN users u
    ON "createdBy" = u.id  ORDER BY "taskDate", tasks.id OFFSET $1 rows FETCH NEXT $2 rows ONLY`,
    [skip, take]
  );
  return result;
};

export const getTasksWithParam = async (body: SearchParamBody) => {
  const type = body.searchType;
  switch (type) {
    case "description":
      return await singleQueryClient(
        `SELECT tasks.*, u.name, u.email, u.company FROM tasks JOIN users u
        ON "createdBy" = u.id WHERE LOWER("taskDescription") LIKE '%' || LOWER($1) || '%' ORDER BY "taskDate", tasks.id;`,
        [body.searchString]
      );
    case "date":
      return await singleQueryClient(
        `SELECT tasks.*, u.name, u.email, u.company FROM tasks JOIN users u
        ON "createdBy" = u.id WHERE "taskDate" BETWEEN $1 AND $2 ORDER BY "taskDate", tasks.id;`,
        [body.searchStartDate, body.searchEndDate]
      );
    default:
      break;
  }
};

export const createTaskQuery = (taskData: any) => {
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

export const createTask = async (body: any) => {
  const multiQuery = createTaskQuery(body);

  const result = await multiQueryClient(multiQuery);
  return result;
};

export const createBulkTasks = async (body: any[]) => {
  const bulkQueryArray = body.map((r) => {
    return createTaskQuery(r);
  });

  const bulkArray = bulkQueryArray.flatMap((i) => i);

  const result = await multiQueryClient(bulkArray);
  return result;
};

export const updateTask = async (body: any) => {
  const updateQuery = `UPDATE public.tasks
  SET "status" = $1
  WHERE "id" = $2;`;
  const params = [body.status, body.id];
  const result = await singleQueryClient(updateQuery, params);
  return result;
};

export const deleteTask = async (body: any) => {
  const deleteQuery = `DELETE FROM public.tasks WHERE "id" = $1;`;
  const params = [body.id];
  const result = await singleQueryClient(deleteQuery, params);
  return result;
};
