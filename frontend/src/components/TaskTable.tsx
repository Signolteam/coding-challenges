import { TaskOutputDTO } from "../../../shared/dto/TaskOutputDTO";
import "./TaskTable.css";
import { TaskStates } from "../../../shared/enum/TaskStates";

function TaskTable() {
  const dataTasks: TaskOutputDTO[] = [
    {
      task_id: 0,
      day: new Date(),
      description: "aaaa",
      status: "APPROVED",
      owner_id: 0,
      owner_full_name: "Shameen",
      owner_company_name: "Co. & Co.",
      owner_email: "shameen@example.com",
    },
  ];
  const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
  });
  const statusToEmoji: Record<TaskStates, string> = {
    APPROVED: "☑️",
    IN_REVIEW: "",
    REJECTED: "❌",
  };
  return (
    <table className="TaskTable w-11/12 m-auto border">
      <tbody>
        {dataTasks.map((item, i) => {
          const actionArea =
            item.status === "IN_REVIEW" ? (
              <>(TODO: IN_REVIEW needs buttons)</>
            ) : (
              <>
                <span className="mr-1">{statusToEmoji[item.status]}</span>
                {item.status}
              </>
            );

          return (
            <tr key={i}>
              <td>{item.owner_full_name}</td>
              <td>{item.owner_email}</td>
              <td>{dateTimeFormatter.format(item.day)}</td>
              <td>{item.description}</td>
              <td>{item.owner_company_name}</td>
              <td>{actionArea}</td>
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
