const { Client } = require("pg")
const dotenv = require("dotenv")
dotenv.config()

function getClient() {
    try {
        const client = new Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
        })
        client.connect()
            .then(() => console.log('connected the the database...'))
            .catch((err) => console.error('connection error', err.stack))
        return client;
    } catch (error) {
        console.log(error)
    }
}

async function executeQuery(query, client, returnRows = false) {
    return await client.query(query)
        .then((result) => {
            if (returnRows) return result.rows;
        })
        .catch((err) => {
            console.log('Failed Query:', query);
            console.error(err.stack);
        })
}

async function addTasks(tasks, client) {
    if (!tasks) return;
    const numTasks = tasks.length;
    for (const [i, task] of tasks.entries()) {
        const { task_owner, email, company_name, task_date, task_description, task_status } = task;
        const query =
            `with company_id as (
          insert into companies(company_name)
          values('${company_name}')
          RETURNING company_id
        ), employee_id as (
          insert into employees(employee_name, employee_email)
          values('${task_owner}', '${email}')
          RETURNING employee_id
        )
        insert into tasks(employee_id, company_id, task_date, task_description, task_status)
        values(
               (Select * from employee_id),
               (Select * from company_id), '${task_date}', '${task_description}', '${task_status}')
        RETURNING *;`
        await executeQuery(query, client);

        if (numTasks % 100 == 0) console.log('Inserted', i + '/' + numTasks, 'tasks');
    }

}

async function deleteTask(task, client) {
    const { task_owner, email, company_name, task_date, task_description, task_status } = task;
    const query = `DELETE FROM tasks WHERE task_owner = '${task_owner}'`;
    await executeQuery(query, client)
}

 async function updateTask(data, client) {
    const { id, approval } = data;
    const query = `UPDATE tasks SET task_status = '${approval.toUpperCase()}' WHERE task_id = '${id}';`
    await executeQuery(query, client);
}

async function readTasks(client) {
    const query = "SELECT task_id, e.employee_name as task_owner, e.employee_email as email, c.company_name, t.task_description, t.task_date, t.task_status\n" +
        "from tasks t, employees e, companies c\n" +
        "where t.employee_id = e.employee_id and c.company_id = t.company_id\n";
    return await executeQuery(query, client, true);
}

async function closeClient(client) {
    client.end();
}



module.exports = {
    getClient,
    readTasks,
    addTasks,
    deleteTask,
    updateTask,
    closeClient
}
