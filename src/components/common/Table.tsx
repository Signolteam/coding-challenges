import { useTable, TableOptions } from 'react-table';
import { observer } from 'mobx-react-lite';

export default observer(<T extends {}>({ columns, data }: TableOptions<T>) => {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })
    
    // Render the UI for your table
    return (
        <table
            className="min-w-full divide-y divide-gray-200"
            {...getTableProps()}>
        <thead className="bg-gray-50">
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th 
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                            {...column.getHeaderProps()}>{column.render('Header')}
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
            <tbody
                {...getTableBodyProps()}
                className="bg-white divide-y divide-gray-200">
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                 <td
                                    className="px-6 py-4"
                                    {...cell.getCellProps()}>{cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
})
