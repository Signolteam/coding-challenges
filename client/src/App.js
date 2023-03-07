import React, { Component } from 'react';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import CSVReader from 'react-csv-reader';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            columns: [
                {field: "task_id", label: "ID"},
                {field: "task_owner", label: "Task Owner"},
                {field: "email", label: "Email"},
                {field: "company_name", label: "Company Name"},
                {field: "task_description", label: "Task Description"},
                {field: "task_date", label: "Task Date"},
                {field: "task_status", label: "Task Status"},
            ],
            totalPages: 0,
            currentPage: 1,
            pageSize: 50
        } ;
    }

    async componentDidMount() {
        await this.getTasks();
    }

    componentDidUpdate() {
        this.renderTableData()
    }

    handleFiles = files => {
        var reader = new FileReader();
        reader.onload = function(e) {
            // Use reader.result
            alert(reader.result)
        }
        reader.readAsText(files[0]);
    }

    processCSVData(data) {
        const keys = data.shift();
        this.setState({ header: keys })
        return data.map(row => {
            const entry = {};
            keys.forEach((key, i) => entry[key] = row[i] ? row[i] : "");
            return entry;
        })
    }

    async addTasks(data) {
        data = this.processCSVData(data);
        await axios.post('http://localhost:8082/addTasks', { data })
            .then(function (response) {
            console.log(response);
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    async getTasks() {
        await axios.get('http://localhost:8082/')
            .then(res => {
                const tasks = res.data;
                const totalPages = tasks.length / this.state.pageSize;
                this.setState({ tasks, totalPages });
            })
    }

    renderTableHeader() {
        return this.state.columns.map((column, index) => {
            return <th style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}} key={index}>{column.label.toUpperCase()}</th>
        })
    }

    handleSelectionChange(e) {
        this.setState({ currentPage: e.target.value});
        console.log('Page number changed to ', e.target.value);
    }

    async handleApprovalChange(e, id) {
        const approval = e.target.value;
        console.log('Approval Changed to', approval);
        console.log('Handling approval change for id =', id);
        await axios.put('http://localhost:8082/updateTask/' + id, { approval });
    }

    renderTableData() {
        const taskStatusOptions = [
            { label:"Approved", value:"approved"},
            { label:"Rejected", value:"rejected"},
            { label:"In Review", value:"in_review"},
        ];
        const getDefaultValue = (task_status) => {
            console.log('Got', task_status);
            return taskStatusOptions.find(x => task_status.toLocaleString().toLowerCase() === x.value)
        };
        const { currentPage, pageSize } = this.state;
        const startingIndex = (currentPage - 1) * pageSize;
        const endingIndex = (startingIndex + pageSize) - 1 < this.state.tasks.length ? (startingIndex + pageSize) - 1 : this.state.tasks.length - 1;
        return this.state.tasks.slice(startingIndex, endingIndex).map((task, index) => {
            const { task_id, task_owner, email, task_status, company_name, task_date, task_description } = task;
            console.log(task_id, task_status);
            return (
                <tr style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}} key={task_id}>
                    <td>{task_id}</td>
                    <td>{task_owner}</td>
                    <td>{email}</td>
                    <td>{company_name}</td>
                    <td>{task_description}</td>
                    <td>{task_date}</td>
                    <td>
                        <select defaultValue={getDefaultValue(task_status)} name="approval" onChange={(e) => this.handleApprovalChange(e, task_id)} id="approval">
                            { taskStatusOptions.map(option => (<option value={option.value}>  {option.label}  </option>))}
                        </select>
                    </td>
                </tr>
            )
        })
    }

    renderPageDropdown() {
        const result = [];
        for (let i = 0; i <= this.state.totalPages; i++) {
            result.push((<option value={i}>  {i + 1}  </option>))
        }
        return result;
    }

    render() {
        const { tasks, columns, currentPage } = this.state;
        return (
            <div className='App'>
                <Typography variant="h3" style={{ margin: 20 }} gutterBottom>
                    Task Management
                </Typography>
                <div style = {{ margin: 20 }}>
                    <CSVReader style = {{ margin: 20 }} onFileLoaded={async (data, fileInfo, originalFile) => {
                    await this.addTasks(data);
                }} />
                </div>
                <div style = {{ margin: 20 }}>
                    <label htmlFor="page">Choose page no.:</label>
                    <select name="page" value={currentPage} onChange={(e) => this.handleSelectionChange(e)} id="cars">
                        {this.renderPageDropdown()}
                    </select>
                </div>
                <table style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
                    <tbody>
                        {this.renderTableHeader()}
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;
