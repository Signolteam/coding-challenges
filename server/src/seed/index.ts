import "dotenv/config";
import { Client } from "pg";
import csv from "csv-parser";
import fs from "fs";
import path from "path";
import { createTaskQuery } from "../dataAccess/taskService";
import { clientOptions } from "../connection";

const client = new Client(clientOptions);

const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS public.users (
    "name" text COLLATE pg_catalog."default" NOT NULL,
    "id" SERIAL PRIMARY KEY,
    "email" text COLLATE pg_catalog."default" NOT NULL,
    "company" text COLLATE pg_catalog."default" NOT NULL
  )
`;

const createTasksTableQuery = `
  CREATE TABLE IF NOT EXISTS public.tasks (
    "id" SERIAL PRIMARY KEY,
    "createdBy" integer NOT NULL,
    "taskDate" date NOT NULL,
    "taskDescription" text COLLATE pg_catalog."default",
    "status" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "tasks_createdBy_fkey" FOREIGN KEY ("createdBy")
      REFERENCES public.users ("id") MATCH SIMPLE
      ON UPDATE NO ACTION
      ON DELETE NO ACTION
  )
`;

// Function to execute SQL queries
async function executeQueries() {
  try {
    await client.connect();

    // Create users table if not exists
    await client.query(createUsersTableQuery);

    // Create tasks table if not exists
    await client.query(createTasksTableQuery);

    // Remove previous data
    await client.query(`DELETE FROM tasks`);
    // Remove data from users table
    await client.query(`DELETE FROM users`);

    //retrieve data from csv file for seeds
    const filePath = path.join(__dirname, "tasks.csv");
    const promise = new Promise<any[]>((res, rej) => {
      const csvResults = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => {
          csvResults.push({
            name: data.task_owner,
            email: data.email,
            company: data.company_name,
            taskDate: data.task_date,
            taskDescription: data.task_description,
            status: data.task_status,
          });
        })
        .on("end", () => res(csvResults));
    });
    const fullResult = await promise;

    try {
      //create multiQuery array
      const multiQueryArray = fullResult.map((r) => {
        return createTaskQuery(r);
      });
      const flatArray = multiQueryArray.flatMap((i) => i);

      //use multiQuery array for insertion in DB
      const promises = flatArray.map(async (query, index) => {
        await client.query(query.sqlQuery, query.params);
        return "success";
      });
      const results = await Promise.all(promises);
    } catch (error) {
      console.log("in catch");
    }

    console.log("Tables created and sample data inserted successfully!");
  } catch (error) {
    console.error("Error executing queries:", error);
  } finally {
    await client.end();
  }
}

// Execute the queries
executeQueries();
