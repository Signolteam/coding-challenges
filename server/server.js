var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var fs = require("fs");
const { getClient, closeClient, readTasks} = require('./client');
const {addTasks, deleteTask, updateTask} = require("./client");

const cors = require('cors');
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))

// parse application/json
app.use(bodyParser.json({limit: '50mb'}))

const client = getClient();

// read tasks
app.get('/', async (req, res) => {
    const rows = await readTasks(client);
    res.header("Access-Control-Allow-Origin", "*")
    res.send(rows);
});

// add new task
app.post('/addTasks', async (req, res) => {
    const tasks = req.body.data;
    await addTasks(tasks, client);
});

// delete task
app.delete('/deleteTask/:id', async (req, res) => await deleteTask(req.body, client));

// update task
app.put('/updateTask/:id', async (req, res) => await updateTask({ id: req.params.id, approval: req.body.approval }, client));

// launch server
var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port
    console.log(`App listening at http://${host}:${port}`)
})
