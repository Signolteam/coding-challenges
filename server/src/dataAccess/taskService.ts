import { multiQueryClient, singleQueryClient } from "../connection";
import { SearchParamBody, SkipTakeBody } from "../types";

export const getAllTasks = async () => {
  //update query with join
  //SELECT * FROM tasks JOIN users ON tasks.createdBy = users.id;
  const result = await singleQueryClient("SELECT * FROM tasks");
  return result;
};

export const getTasksCount = async () => {
  //change query string
  //SELECT COUNT(id) FROM tasks;
  const result = await singleQueryClient("SELECT * FROM tasks");
  return result;
};

export const getTasksWithSkipTake = async (body: SkipTakeBody) => {
  //change query string
  // select * from tasks order by "taskDate" asc
  // offset 10 rows
  // FETCH NEXT 10 rows only;
  const result = await singleQueryClient("SELECT * FROM tasks");
  return result;
};

export const getTasksWithSearchParam = async (body: SearchParamBody) => {
  //change query string
  // SELECT * FROM tasks WHERE CONTAINS(email, '${string}');
  const result = await singleQueryClient("SELECT * FROM tasks");
  return result;
};

export const createTaskQuery = (taskData: any) => {
  const { email, name, company, taskDate, taskDescription, status } = taskData;

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
  const result = await singleQueryClient(updateQuery, params, true);
  return result;
};

export const deleteTask = async (body: any) => {
  const deleteQuery = `DELETE FROM public.tasks WHERE "id" = $1;`;
  const params = [body.id];
  const result = await singleQueryClient(deleteQuery, params, true);
  return result;
};
