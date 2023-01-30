import { getTasks } from '@/api';
import { LOADING_STATE } from '@/types';
import { useState } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';

// const getTasksAction = action(getTasks);
export default observer(() => {
    const [loadingState, setLoadingState] = useState<LOADING_STATE>('LOADED');
    const clickHandler = async () => {
        setLoadingState('LOADING');
        await action(getTasks)();
        setLoadingState('LOADED');
    }

    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-30"
            onClick={clickHandler}
            disabled={loadingState === 'LOADING'}>
            MOCK UPLOAD FILE
        </button>
    );
})
