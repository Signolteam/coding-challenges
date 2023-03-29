import { useEffect, useState } from "react";

import { TaskOutputDTO } from "../dto";
import { TaskStates } from "../enum/TaskStates";
import TasksApi from "../core/TasksApi";

import "./TaskTable.css";

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
});
const statusToEmoji = {
  APPROVED: "☑️",
  IN_REVIEW: "",
  REJECTED: "❌",
} satisfies Record<TaskStates, string>;

function TaskTable() {
  const [data, setData] = useState<Array<TaskOutputDTO>>([]);
  useEffect(() => {
    reloadTaskList();
  }, []);

  /** Fetches all Tasks via API */
  function reloadTaskList() {
    TasksApi.getAllTasks().then((json) => {
      setData(json.data.data);
    });
  }

  /** Updates a Task's status (from IN_REVIEW to either APPROVED or REJECTED) */
  function setTaskStatus(task: TaskOutputDTO, targetState: TaskStates) {
    TasksApi.setTaskStatus(task.task_id, targetState).then(() => {
      reloadTaskList();
    });
  }

  return (
    <table className="TaskTable w-11/12 m-auto border">
      <tbody>
        {data.map((item) => {
          //First build up the Actions area (TODO: Move to another component)
          const emoji = statusToEmoji[item.status];
          const actionArea =
            item.status === TaskStates.IN_REVIEW ? (
              <>
                <button
                  type="button"
                  className="btn-signol bg-signol-green"
                  onClick={() => setTaskStatus(item, TaskStates.APPROVED)}
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="btn-signol bg-signol-magenta ml-2"
                  onClick={() => setTaskStatus(item, TaskStates.REJECTED)}
                >
                  Reject
                </button>
              </>
            ) : (
              <>
                <span className="mr-1">{emoji}</span>
                {item.status}
              </>
            );

          return (
            <tr key={item.task_id} data-id={item.task_id}>
              <td className="created_by">{item.owner_full_name}</td>
              <td className="email">{item.owner_email}</td>
              <td className="task_date">
                {dateTimeFormatter.format(item.day)}
              </td>
              <td className="description" title={item.description}>
                {item.description}
              </td>
              <td className="owner_company_name">{item.owner_company_name}</td>
              <td className="actions">{actionArea}</td>
            </tr>
          );
        })}
      </tbody>
      <thead>
        <tr>
          <th>Created By</th>
          <th>Email</th>
          <th>Task Date</th>
          <th>Task Description</th>
          <th>Company Name</th>
          <th>Task Status</th>
        </tr>
      </thead>
    </table>
  );
}

export default TaskTable;
