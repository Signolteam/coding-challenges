import React, { Component } from "react";
import axios from "axios";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
      activeItem: {
        owner: "",
        email: "",
        company_name: "",
        date: "",
        description: "",
        status: "IR"
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/tasks/")
      .then((res) => this.setState({ taskList: res.data }))
      .catch((err) => console.log(err));
  };

  handleStatusDisplay = (item) => {
    const task_status = item.status;
    const approve = 'AP';
    const rejected = 'RJ';

    if (task_status === approve) {
      return (
          <div class="alert alert-success" role="alert">
            Approved!
          </div>
      )
    }
    if (task_status === rejected) {
      return (
          <div class="alert alert-danger" role="alert">
            Rejected!
          </div>
      )
    }
  }
  handleApprove = (item) => {
    if (item.id) {
      item.status = 'AP';
      console.log(item.status)
      axios
        .put(`/api/tasks/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
  };

  handleReject = (item) => {
    if (item.id) {
      item.status = 'RJ';
      axios
        .put(`/api/tasks/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
  };

  handleStatus = (item) => {
    if (item.status === 'IR') {
      return (
        <td>
          <button className="btn btn-outline-success mr-2" onClick={() => this.handleApprove(item)}>
            Approve
          </button>
          <button className="btn btn-outline-danger" onClick={() => this.handleReject(item)} >
            Reject
          </button>
        </td>
      );
    } else {
      return this.handleStatusDisplay(item);
    }
  };

  renderItems = () => {
    const tasks = this.state.taskList;

    return tasks.map((item) => (
      <tr>
        <td>{item.owner}</td>
        <td>{item.email}</td>
        <td>{item.date}</td>
        <td>{item.description}</td>
        <td>{item.company_name}</td>
        {this.handleStatus(item)}
      </tr>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-black text-uppercase text-center my-4">Task app</h1>
        <div className="row">
          <div className="card p-3">
            <div className="mb-4">
              <button
                className="btn btn-primary"
              >
                Upload file
              </button>
            </div>
            <table>
              <tr className="task labels">
                <th className="text-uppercase">Created by</th>
                <th className="text-uppercase">Email</th>
                <th className="text-uppercase">Task Date</th>
                <th className="text-uppercase">Task Description</th>
                <th className="text-uppercase">Company name</th>
                <th className="text-uppercase">Task status</th>
              </tr>
              {this.renderItems()}
            </table>
          </div>
        </div>
      </main>
    );
  }
}

export default App;