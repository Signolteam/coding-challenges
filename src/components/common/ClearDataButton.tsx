import { clearTasks } from '@/state/Tasks';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';

// const getTasksAction = action(getTasks);
export default observer(() => {
    const clickHandler = async () => {
        await action(clearTasks)();
    }

    return (
        <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-30"
            onClick={clickHandler}>
            CLEAR DATA
        </button>
    );
})
