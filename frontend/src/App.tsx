import { useState } from "react";
import CSVReader from "react-csv-reader";
import TaskTable from "./components/TaskTable";
import TasksApi from "./core/TasksApi";

function App() {
  const [loading, setLoading] = useState(false);

  function handleCsvFileLoaded(data: Array<any>) {
    setLoading(true);
    TasksApi.createTasks(data)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }

  return (
    <div className="App">
      <header className="flex justify-around pt-2 mb-8">
        <div>
          <h1 className="text-6xl">Tasks</h1>
        </div>
        <div
          className="flex-shrink flex flex-col justify-around"
          title="Upload a CSV file with Headings: task_owner,email,company_name,task_date,task_description,task_status"
        >
          <div className="btn-signol bg-signol-cyan text-black btn-big vertical-align">
            {loading ? (
              <>
                <span className="inline-block animate-spinX">⏳</span>{" "}
                Loading...
              </>
            ) : (
              <CSVReader
                cssClass=""
                label="Import CSV (Upload File)"
                onFileLoaded={handleCsvFileLoaded}
                parserOptions={{ header: true }}
              ></CSVReader>
            )}
          </div>
        </div>
      </header>

      <main>
        <TaskTable></TaskTable>
      </main>
    </div>
  );
}

export default App;
