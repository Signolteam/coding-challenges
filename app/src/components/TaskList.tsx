import { Task, TaskStatus } from "../models/Task.type";
import "./TaskList.style.css";

type Props = {
    list: Task[];
    onDeleteTaskClickHandler: (data: Task) => void;
    onEditTaskClickHandler: (data: Task) => void;
    onUpdateStatusClickHandler: (data: Task) => void;
}

const TaskList = (props: Props) => {
    const { list, onDeleteTaskClickHandler, onEditTaskClickHandler, onUpdateStatusClickHandler } = props;

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>CREATED BY</th>
                        <th>EMAIL</th>
                        <th>COMPANY</th>
                        <th>TASK DATE</th>
                        <th>TASK DESCRIPTION</th>
                        <th>TASK STATUS</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((task) => {
                        return (
                            <tr key={ task.id }>
                                <td>{ task.owner }</td>
                                <td>{ task.email }</td>
                                <td>{ task.company }</td>
                                <td>{ task.date }</td>
                                <td>{ task.description }</td>
                                <td>
                                    { task.status === TaskStatus.IN_REVIEW && (
                                        <div>
                                            <input type="button" value="Approved" onClick={() => onUpdateStatusClickHandler({ ...task, status: TaskStatus.APPROVED })}/>
                                            <input type="button" value="Rejected" onClick={() => onUpdateStatusClickHandler({ ...task, status: TaskStatus.REJECTED })}/>
                                        </div>
                                    )}
                                    
                                   { task.status !== TaskStatus.IN_REVIEW && (
                                        task.status
                                   ) }
                                </td>
                                <td>
                                    <div>
                                        <input type="button" value="Edit" onClick={() => onEditTaskClickHandler(task)}/>
                                        <input type="button" value="Delete" onClick={() => onDeleteTaskClickHandler(task)}/>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>   
            </table>
        </div>
    )
}

export default TaskList;
