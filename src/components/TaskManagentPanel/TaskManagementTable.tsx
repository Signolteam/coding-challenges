import { getFullTask } from '@/state';
import taskStore from '@/state/Tasks';
import { observer } from 'mobx-react-lite';

export default observer(() => {
    const tasks = Object.values(taskStore);
    const fullTasks = tasks.map((task) => getFullTask(task.taskId));

    return (
        <pre>
            {JSON.stringify(fullTasks, null, 2)}
        </pre>
    );
});