import { useState } from "react";
import { Task } from "../models/Task.type";
import "./TaskForm.style.css";
import StatusDropdown from "./StatusDropDown";

type Props = {
    onBackBtnClickHandler: () => void;
    onUpdateBtnClickHandler: (data: Task) => void;
    data: Task;
}

const EditTask = (props: Props) => {
    const { data, onBackBtnClickHandler, onUpdateBtnClickHandler } = props;

    const [owner, setOwner] = useState(data.owner);
    const [email, setEmail] = useState(data.email);
    const [company, setCompany] = useState(data.company);
    const [date, setDate] = useState(data.date);
    const [description, setDescription] = useState(data.description);
    const [status, setStatus] = useState(data.status);

    const submitHandler = (e: any) => {
        e.preventDefault();

        const updatedTask: Task = {
            owner,
            email,
            company,
            date,
            description,
            status,
            id: data.id,
        }

        onUpdateBtnClickHandler(updatedTask);
        onBackBtnClickHandler();
    }

    return (
        <div className="form-container">
            <div>
                <h3>Edit Task</h3>
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
                    <input type="submit" value="Save Task" />
                </div>
            </form>
        </div>
    );
}

export default EditTask;
