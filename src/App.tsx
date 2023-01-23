import TaskManagementTable from  '@/components/TaskManagentPanel/TaskManagementTable';
import TaskManagementHeader from  '@/components/TaskManagentPanel/TaskManagementHeader';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <TaskManagementHeader />
            </header>
            <body>
                <TaskManagementTable />
            </body>
        </div>
    );
}

export default App;
