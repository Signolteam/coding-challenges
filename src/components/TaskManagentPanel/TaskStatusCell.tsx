import type { Cell } from 'react-table';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import type { TaskStatus, FullTask, LOADING_STATE } from '@/types'
import { updateTaskStatus } from '@/api';

export default observer(({ value, cell }: { value: TaskStatus, cell: Cell<FullTask> }) => {
    if (value === 'APPROVED') {
        return <span>✅ APPROVED</span>
    }
    
    if (value === 'REJECTED') {
        return <span>❌ REJECTED</span>
    }

    const { taskId } = cell.row.original.task;
    const handleClick = async (newStatus: TaskStatus) => {
        setLoadingState('LOADING');
        await action(updateTaskStatus)(taskId, newStatus);
        setLoadingState('LOADED');

    }

    const [loadingState, setLoadingState] = useState<LOADING_STATE>('LOADED');

    return <div className='flex gap-8'>
        <button
            className='bg-white hover:bg-green-400 text-green-400 hover:text-white font-bold py-2 px-4 rounded border-green-400 border-2 disabled:opacity-30'
            onClick={() => handleClick('APPROVED')}

            disabled={loadingState === 'LOADING'}>
            APPROVE
        </button>
        <button
            className='bg-white hover:bg-red-400 text-red-400 hover:text-white font-bold py-2 px-4 rounded border-red-400 border-2 disabled:opacity-30'
            onClick={() => handleClick('REJECTED')}
            disabled={loadingState === 'LOADING'}>
            REJECT
        </button>
    </div>;
});