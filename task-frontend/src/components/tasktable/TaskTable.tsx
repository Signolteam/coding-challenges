import './index.scss';
import type Task from '../../models/Task';
import TaskAPI from '../../utils/TaskAPI';

type Props = {
  tasks: Task[] | null,
  fetchTasks: () => void,
};
type TaskStatusProps = {
  task: Task,
};
function TaskTable({tasks, fetchTasks}: Props) {
  const TaskStatus = ({task}: TaskStatusProps) => {
    const approveTask = async () => {
      await TaskAPI.updateTask({...task, status: 'APPROVED'});
      fetchTasks();
    };
    const rejectTask = async () => {
      await TaskAPI.updateTask({...task, status: 'REJECTED'});
      fetchTasks();
    };
    return (
    <span className="status-container">
      {
      (task.status === 'IN_REVIEW') ? <>
        <span className="status-approve button" onClick={approveTask}>Approve</span>
        <span className="status-reject button" onClick={rejectTask}>Reject</span>
      </>
      : <span>{task.status}</span>
      }
    </span>
    );
  };
  const tableRowFormat = (task: Task) => (
    <tr key={task.id?.toString()}>
      <td>{task.createdBy}</td>
      <td>{task.email}</td>
      <td className="date-container">{task.date}</td>
      <td>{task.description}</td>
      <td>{task.companyName}</td>
      <td><TaskStatus task={task} /></td>
    </tr>
  );
  return (
        <div className="task-table-wrapper">
          <table>
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
            <tbody>
              {tasks?.map(tableRowFormat)}
            </tbody>
          </table>
          {tasks?.length === 0 && <div className="no-tasks-message">
            No tasks found, upload a CSV to get started!
          </div>}
            {!tasks && <div className="spinner tasks-loading" />}
        </div>
  );
}

export default TaskTable;
