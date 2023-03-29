import { useState } from "react";
import CSVReader from "react-csv-reader";
import TaskTable from "./components/TaskTable";
import TasksApi from "./core/TasksApi";

function App() {
  const [loading, setLoading] = useState(false);

  function handleCsvFileLoaded(data: Array<any>) {
    setLoading(true);
    TasksApi.createTasks(data)
      .then((json) => {
        const responseData = json.data;
        const responseCode = responseData.code;

        if (responseCode !== 200) {
          alert(
            "Sorry, there was an Error: " +
              JSON.stringify(responseData, null, 2)
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }

  const elemLoading = (
    <>
      <span className="inline-block animate-spinX">⏳</span> Loading...
    </>
  );
  return (
    <div className="App">
      <header className="flex justify-around py-6 flex-col md:flex-row">
        <h1 className="text-6xl align-bottom">Tasks</h1>
        <div
          className="flex-shrink flex flex-col justify-around"
          title="Upload a CSV file with Headings: task_owner,email,company_name,task_date,task_description,task_status"
        >
          <div className="btn-signol bg-signol-magenta text-white btn-big vertical-align">
            {loading ? (
              elemLoading
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

      <main>{loading ? elemLoading : <TaskTable></TaskTable>}</main>
    </div>
  );
}

export default App;
