import { Client } from "pg";

let DB: Client;
export async function getDB(): Promise<Client> {
  if (DB && DB instanceof Client) {
    await DB.connect();
    return DB;
  }
  const config = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: process.env.DB_SSL == "1",
  };
  DB = new Client(config);
  console.debug("[DB] Connecting...");
  await DB.connect();
  console.debug("[DB] Connected");
  await _seedDataIfNeeded(DB);
  return DB;
}

async function _seedDataIfNeeded(client: Client): Promise<void> {
  const numTasks = await _getTableRowCountFast(client, "tasks");
  if (numTasks == 0) {
    await _seedDatabase(client);
  }
}

async function _getTableRowCountFast(
  client: Client,
  tableName: string
): Promise<number> {
  const getCountTasks = await client.query(
    "SELECT reltuples AS estimate FROM pg_class where relname = $1;",
    [tableName]
  );
  if (getCountTasks.rowCount == 0) {
    console.debug("_getTableRowCountFast: table doesn't exist");
    return 0;
  }
  return parseInt(getCountTasks.rows[0]["estimate"]);
}

async function _seedDatabase(client: Client) {
  console.debug("Seeding...");
  client.query(`
  DO $$
  BEGIN
    -- Drop everything
    DROP TABLE IF EXISTS tasks;
    DROP TABLE IF EXISTS users;
    DROP TYPE IF EXISTS task_states;

    -- Create Types (Enum)
    CREATE TYPE task_states AS ENUM('APPROVED', 'IN_REVIEW', 'REJECTED');

    -- Create Tables
    CREATE TABLE users (
      _id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      _created_date TIMESTAMP NOT NULL DEFAULT now(),
      full_name VARCHAR NOT NULL,
      email VARCHAR NULL,
      company_name VARCHAR NULL
    );
    CREATE TABLE tasks (
      _id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      _created_date TIMESTAMP NOT NULL DEFAULT now(),
      owner_id UUID NOT NULL,
      status task_states DEFAULT 'IN_REVIEW',
      task_date DATE NULL,
      description VARCHAR(1000) NULL,
      FOREIGN KEY (owner_id) REFERENCES users (_id)
    );

    -- Insert initial data
    INSERT INTO users (_id, full_name, email, company_name)
    VALUES
      ('00000000-0000-0000-0000-000000000001', 'Carson Landman', 'clandman0@example.com', 'Roodel'),
      ('00000000-0000-0000-0000-000000000002', 'Sigfried Cusick','scusick1@example.com','Fadeo'),
      ('00000000-0000-0000-0000-000000000003', 'Anthiathia Hanwell', 'ahanwell2@example.com', 'MyBuzz'),
      ('00000000-0000-0000-0000-000000000004', 'Leroi Olanda', 'lolanda3@example.edu', 'Wordtune'),
      ('00000000-0000-0000-0000-000000000005', 'Blayne Spinke', 'bspinke4@example.com', 'Skinder');
    INSERT INTO tasks(owner_id, task_date, description, status)
    VALUES
      ('00000000-0000-0000-0000-000000000001', '2022-07-17','lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit','IN_REVIEW'),
      ('00000000-0000-0000-0000-000000000002', '2022-09-05','non quam nec dui luctus rutrum nulla tellus in sagittis dui vel','REJECTED'),
      ('00000000-0000-0000-0000-000000000003', '2022-05-06','ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend','APPROVED'),
      ('00000000-0000-0000-0000-000000000004', '2022-09-04','eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum','APPROVED'),
      ('00000000-0000-0000-0000-000000000005', '2022-01-24','mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget','REJECTED');
  END$$;
  `);
}
