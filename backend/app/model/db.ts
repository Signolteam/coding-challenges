import { Client } from "pg";

async function _getTableRowCountFast(
  client: Client,
  tableName: string
): Promise<number> {
  const getCountTasks = await client.query(
    "SELECT reltuples AS estimate FROM pg_class where relname = $1;",
    [tableName]
  );
  if (getCountTasks.rowCount == 0) {
    return 0;
  }
  return parseInt(getCountTasks.rows[0]["estimate"]);
}

async function _seedDataIfNeeded(client: Client): Promise<void> {
  const numTasks = await _getTableRowCountFast(client, "tasks");
  if (numTasks == 0) {
    //TODO: Seed data
  }
}

export async function getDB(): Promise<Client> {
  const client = new Client({
    host: process.env.DB_HOST,
    port: 5334,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
  await client.connect();
  await _seedDataIfNeeded(client);
  return client;
}

async function _seedDatabase(client: Client) {
  client.query(`CREATE TYPE task_states AS ENUM('APPROVED', 'IN_REVIEW', 'REJECTED');
  CREATE TABLE users (
    _id serial PRIMARY KEY,
    _created_date datetime NOT NULL DEFAULT now(),
    full_name varchar NOT NULL,
    email varchar NOT NULL,
    company_name varchar NOT NULL
  );
  CREATE TABLE tasks (
    _id serial PRIMARY KEY,
    _created_date datetime NOT NULL DEFAULT now(),
    owner_id INT NOT NULL,
    status task_states DEFAULT 'IN_REVIEW',
    task_date TIMESTAMP NULL,
    description varchar(1000) NULL,
    FOREIGN KEY (owner_id) REFERENCES users (_id),
  );`);

  //TODO: Read from tasks.csv
}
