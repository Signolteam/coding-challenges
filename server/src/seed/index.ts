const { Client } = require("pg");

// PostgreSQL connection details
const client = new Client({
  user: "postgres",
  password: "password",
  host: "localhost",
  port: 5432,
  database: "signoldb",
});

const databaseName = "signoldb";

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

const sampleUserData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    company: "Sample Company A",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    company: "Sample Company B",
  },
];

const sampleTasksData = [
  {
    createdBy: null,
    taskDate: new Date("2024-03-04"),
    taskDescription: "Sample task 1 description",
    status: "in_review",
  },
  {
    createdBy: null,
    taskDate: new Date("2024-03-05"),
    taskDescription: "Sample task 2 description",
    status: "approved",
  },
  {
    createdBy: null,
    taskDate: new Date("2024-03-10"),
    taskDescription: "Sample task 2 description",
    status: "rejected",
  },
];

// Function to execute SQL queries
async function executeQueries() {
  try {
    await client.connect();

    // Create users table if not exists
    await client.query(createUsersTableQuery);

    // Create tasks table if not exists
    await client.query(createTasksTableQuery);

    // Remove data from users table
    await client.query(`DELETE FROM users`);

    // Insert sample user data if not exists and retrieve their IDs
    const insertedUsers = [];
    for (const userData of sampleUserData) {
      const result = await client.query(
        `
        INSERT INTO public.users ( "name", "email", "company")
        VALUES ($1, $2, $3)
        RETURNING "id"
      `,
        [userData.name, userData.email, userData.company]
      );

      insertedUsers.push(result.rows[0].id);
    }

    // Remove previous data
    await client.query(`DELETE FROM tasks`);

    // Insert sample tasks data using retrieved user IDs
    for (let i = 0; i < sampleTasksData.length; i++) {
      const taskData = sampleTasksData[i];
      const createdBy = insertedUsers[i % 2];
      await client.query(
        `
          INSERT INTO public.tasks ("createdBy", "taskDate", "taskDescription", "status")
          VALUES ($1, $2, $3, $4)
        `,
        [
          createdBy,
          taskData.taskDate,
          taskData.taskDescription,
          taskData.status,
        ]
      );
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
