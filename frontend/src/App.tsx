import React from "react";
import TaskTable from "./components/TaskTable";

function App() {
  function importUploadFile() {
    console.log("TODO: Prompt for file");
    console.log("TODO: Send file to API (or parse CSV here)");
    /* 
     * If we want to read it locally then send it up,
     * we could trigger a click event on a hidden `input[type=file]`?
     * Some code to read the file contents in-browser: (via https://stackoverflow.com/a/29395276)

      const fileInput = document.getElementById('csv')
      const readFile = () => {
        const reader = new FileReader()
        reader.onload = () => {
          document.getElementById('out').innerHTML = reader.result
        }
        // start reading the file. When it is done, calls the onload event defined above.
        reader.readAsBinaryString(fileInput.files[0])
      }
      fileInput.addEventListener('change', readFile)
    */
  }
  return (
    <div className="App">
      <header className="flex justify-around pt-2 mb-8">
        <div>
          <h1 className="text-6xl">Tasks</h1>
        </div>
        <div className="flex-shrink flex flex-col justify-around">
          <button
            type="button"
            className="btn-signol btn-big vertical-align"
            onClick={importUploadFile}
          >
            Import (Upload File)
          </button>
        </div>
      </header>

      <main>
        <TaskTable></TaskTable>
      </main>
    </div>
  );
}

export default App;
