import { useEffect, useState } from "react";
import "./Home.style.css";
import { Task } from "../models/Task.type";
import TaskList from "./TaskList";
import AddTask from "./AddTask";
import { PageEnum } from "../models/Page.enum";
import EditTask from "./EditTask";
import { TasksClient } from "../clients/tasks/client/tasks.client";
import { TasksMapper } from "../mappers/tasks.mapper";
import SingleFileUploader from "./SingleFileUploader";

const tasksMapper = new TasksMapper();
const tasksClient = new TasksClient();

const Home = () => {
    const [taskList, setTaskList] = useState(Array<Task>);
    const [shownPage, setShownPage] = useState(PageEnum.list);
    const [dataToEdit, setDataToEdit] = useState({} as Task);

    useEffect(() => {
        tasksClient.tasksApi.getTasks()
            .then(tasks => setTaskList(tasks.map(tasksMapper.mapResponse)))
     }, []);

    const onAddTaskClickHandler = () => {
        setShownPage(PageEnum.add);
    }

    const onUploadCSVClickHandler = () => {
        setShownPage(PageEnum.upload);
    }

    const showListPageClickHandler = () => {
        setShownPage(PageEnum.list);
    }

    const addTaskHandler = (data: Task) => {
        tasksClient.tasksApi.addTask(tasksMapper.mapTaskToRequest(data))
            .then(task => setTaskList([...taskList, tasksMapper.mapResponse(task)]));
    }

    const deleteTask = (data: Task) => {
        tasksClient.tasksApi.deleteTask(data.id!)
            .then(() => {
                const indexToDelete = taskList.indexOf(data);
                const tempList = [...taskList];
                tempList.splice(indexToDelete, 1);
                setTaskList(tempList);
            });
    }

    const editTask = (data: Task) => {
        setShownPage(PageEnum.edit);
        setDataToEdit(data);
    }

    const updateTask = (data: Task) => {
        tasksClient.tasksApi.updateTask(data.id!, tasksMapper.mapTaskToRequest(data))
            .then(() => {
                const filteredData = taskList.find(x => x.id === data.id)!;
                const indexOfRecord = taskList.indexOf(filteredData);
                const tempList = [...taskList];
                tempList[indexOfRecord] = data;
                setTaskList(tempList);
            });
    }

    return (
        <>
            <article className="article-header">
                <header>
                    <h1>Tasks Management</h1>
                </header>
            </article>

            <section className="section-content">
                {shownPage === PageEnum.list && (
                    <>
                        <div className="list-container-controls">
                            <input type="button" value="Upload CSV" onClick={onUploadCSVClickHandler} className="add-task-button"/>
                            <input type="button" value="Add Task" onClick={onAddTaskClickHandler} className="add-task-button"/>
                        </div>
                        <TaskList list={ taskList } onDeleteTaskClickHandler={deleteTask} onEditTaskClickHandler={editTask} onUpdateStatusClickHandler={updateTask}/>
                    </>
                )}

                {shownPage === PageEnum.add && <AddTask onBackBtnClickHandler={showListPageClickHandler} onSubmitClickHandler={addTaskHandler}/>}

                {shownPage === PageEnum.edit && <EditTask onBackBtnClickHandler={showListPageClickHandler} data={dataToEdit} onUpdateBtnClickHandler={updateTask}/>}

                {shownPage === PageEnum.upload && <SingleFileUploader onBackBtnClickHandler={showListPageClickHandler} />}
            </section>
        </>
    )
}

export default Home;
