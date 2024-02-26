import './index.scss';
import TaskTable from './components/tasktable/TaskTable';
import TaskAPI from './utils/TaskAPI';
import type Task from './models/Task';
import { useEffect, useState, useCallback } from 'react';
import TaskCSVReader from './components/taskcsvreader/TaskCSVReader';

function App() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [loadingCSV, setLoadingCSV] = useState<boolean>(false);
  const fetchTasks = useCallback(async () => {
    const tasks = await TaskAPI.fetchTasks();
    setTasks(tasks);
  }, [setTasks]);

  useEffect(() => {
    fetchTasks();
    return () => {
      // Abort signal handling would go here
    }
  },[fetchTasks]);


  return (
    <div className="body">
      <div className="task-card">
        <header className="task-card-header">
          {errorMessage && <span className="error-message">{errorMessage}</span>}
          <TaskCSVReader
            loadingCSV={loadingCSV}
            setLoadingCSV={setLoadingCSV}
            setErrorMessage={setErrorMessage}
            fetchTasks={fetchTasks}
          />
        </header>
        <div className="task-table-wrapper">
          <TaskTable tasks={tasks} fetchTasks={fetchTasks}/>
        </div>
      </div>
    </div>
  );
}

export default App;
