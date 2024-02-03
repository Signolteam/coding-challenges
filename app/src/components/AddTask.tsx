import "./TaskForm.style.css";
import { useState } from "react";
import { Task, TaskStatus } from "../models/Task.type";
import StatusDropdown from "./StatusDropDown";

type Props = {
    onBackBtnClickHandler: () => void;
    onSubmitClickHandler: (data: Task) => void;
}

const AddTask = (props: Props) => {
    const [owner, setOwner] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(TaskStatus.IN_REVIEW);

    const { onBackBtnClickHandler, onSubmitClickHandler } = props;

    const submitHandler = (e: any) => {
        e.preventDefault();

        const data: Task = {
            owner,
            email,
            company,
            date,
            description,
            status,
        }

        onSubmitClickHandler(data);
        onBackBtnClickHandler();
    }

    return (
        <div className="form-container">
            <div>
                <h3>Add Task</h3>
            </div>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Owner</label>
                    <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)}/>
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>Company</label>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)}/>
                </div>
                <div>
                    <label>Date</label>
                    <input type="text" value={date} onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div>
                    <label>Description</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} maxLength={1000}/>
                </div>
                <div>
                    <label>Status</label>
                    <StatusDropdown onValueChangedHandler={(e) => setStatus(e)} value={status}/>
                </div>
                <div>
                    <input type="button" value="Back" onClick={onBackBtnClickHandler} />
                    <input type="submit" value="Add Task" />
                </div>
            </form>
        </div>
    )
}

export default AddTask;
