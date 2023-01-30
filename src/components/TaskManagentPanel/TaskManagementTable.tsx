import { formatDate } from '@/utils/formatters';
import { getFullTask } from '@/state';
import taskStore from '@/state/Tasks';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { Column } from 'react-table'
import Table from '@/components/common/Table';
import { FullTask } from '@/types';
import FormattedCell from '@/components/common/FormattedCell';
import TaskStatusCell from './TaskStatusCell';

export default observer(() => {
    const tasks = Object.values(taskStore);
    const fullTasks = tasks.map((task) => getFullTask(task.taskId));

    const columns = useMemo<Column<FullTask>[]>(() => [
        { Header: 'Created By', accessor: (d) => d.user.name },
        { Header: 'Email', accessor: (d) => d.user.email },
        { Header: 'Task Date', accessor: (d) => d.task.date, Cell: FormattedCell(formatDate) },
        { Header: 'Task Description', accessor: (d) => d.task.description },
        { Header: 'Company Name', accessor: (d) => d.company.name },
        { Header: 'Task Status', accessor: (d) => d.task.status, Cell: TaskStatusCell,  }
    ], []);


    return <Table columns={columns} data={fullTasks}/>;
});
