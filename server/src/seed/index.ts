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

// SQL queries for table creation and sample data insertion
const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS public.users (
    "Name" text COLLATE pg_catalog."default" NOT NULL,
    "Id" SERIAL PRIMARY KEY,
    "Email" text COLLATE pg_catalog."default" NOT NULL
  )
`;

const createTasksTableQuery = `
  CREATE TABLE IF NOT EXISTS public.tasks (
    "Id" SERIAL PRIMARY KEY,
    "CreatedBy" integer NOT NULL,
    "TaskDate" date NOT NULL,
    "TaskDescription" text COLLATE pg_catalog."default",
    "Company" text COLLATE pg_catalog."default" NOT NULL,
    "Status" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "tasks_CreatedBy_fkey" FOREIGN KEY ("CreatedBy")
      REFERENCES public.users ("Id") MATCH SIMPLE
      ON UPDATE NO ACTION
      ON DELETE NO ACTION
  )
`;

const sampleUserDataQuery = `
  INSERT INTO public.users ("Name", "Email") VALUES
  ('John Doe', 'john@example.com'),
  ('Jane Smith', 'jane@example.com')
`;

const sampleUserData = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

const sampleTasksDataQuery = `
  INSERT INTO public.tasks ("CreatedBy", "TaskDate", "TaskDescription", "Company", "Status") VALUES
  (${"1"}, ${new Date(
  "2024-03-04"
)} , 'Sample task 1 description', 'Sample Company A', 'in review'),
  (${"2"}, ${new Date(
  "2024-03-05"
)}, 'Sample task 2 description', 'Sample Company B', 'approved'),
  (${"2"}, ${new Date(
  "2024-03-10"
)}', 'Sample task 2 description', 'Sample Company B', 'approved')
`;
const sampleTasksData = [
  {
    createdBy: null,
    taskDate: new Date("2024-03-04"),
    taskDescription: "Sample task 1 description",
    company: "Sample Company A",
    status: "in review",
  },
  {
    createdBy: null,
    taskDate: new Date("2024-03-05"),
    taskDescription: "Sample task 2 description",
    company: "Sample Company B",
    status: "approved",
  },
  {
    createdBy: null,
    taskDate: new Date("2024-03-10"),
    taskDescription: "Sample task 2 description",
    company: "Sample Company B",
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
        INSERT INTO public.users ( "Name", "Email")
        VALUES ($1, $2)
        RETURNING "Id"
      `,
        [userData.name, userData.email]
      );

      insertedUsers.push(result.rows[0].Id);
    }

    // Remove previous data
    await client.query(`DELETE FROM tasks`);

    // Insert sample tasks data using retrieved user IDs
    for (let i = 0; i < sampleTasksData.length; i++) {
      const taskData = sampleTasksData[i];
      const createdBy = insertedUsers[i % 2];
      await client.query(
        `
          INSERT INTO public.tasks ("CreatedBy", "TaskDate", "TaskDescription", "Company", "Status")
          VALUES ($1, $2, $3, $4, $5)
        `,
        [
          createdBy,
          taskData.taskDate,
          taskData.taskDescription,
          taskData.company,
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
