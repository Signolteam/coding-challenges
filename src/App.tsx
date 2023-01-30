// import *DevTools from 'mobx-react-devtools';
import TaskManagementTable from  '@/components/TaskManagentPanel/TaskManagementTable';
import TaskManagementHeader from  '@/components/TaskManagentPanel/TaskManagementHeader';

function App() {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <header className="max-w-7xl flex justify-end px-4 sm:px-6 lg:px-8 pt-4">
                <TaskManagementHeader />
            </header>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                <TaskManagementTable />
            </main>
            {/* <DevTools /> */}
        </div>
    );
}

export default App;
