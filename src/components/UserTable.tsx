import { useState } from 'react';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import { ReactComponent as CheckIcon } from '../assets/icons/check.svg';
import { ReactComponent as CrossIcon } from '../assets/icons/cross.svg';
import { User } from '../types/user'
import { Task } from '../types/Task'

type UserTableProps = {
    users: User[];
    todos: Task[];
}

interface UserTableRow extends User {
    todos: Task[];
}

export const UserTable = ({ users, todos }: UserTableProps) => {
    const [filter, setFilter] = useState<string>()
  
    const tableData = users.map((user) => {
      let row: UserTableRow
      let lastThreeUsersTasks = todos.filter((todo) => todo.userId === user.id).slice(-3)
      row = { ...user, todos: lastThreeUsersTasks }
      return row
    })
  
    const filteredTableData = tableData.filter((tableRow) => {
      if (!filter) {
        return true
      }
      if (tableRow.name.toLowerCase().includes(filter.toLowerCase())) {
        return true
      }
      return false
    })
  
    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
      event.currentTarget.value.length > 2 ? setFilter(event.currentTarget.value) : setFilter('')
    }
  
    return <div className="py-6 px-2 lg:px-0 text-left overflow-x-auto">
      <div className="relative mb-6 lg:w-1/4">
        <input className="w-full p-1" onChange={handleChange} type="text" placeholder="Search Users"></input>
        <SearchIcon className="absolute right-2 top-2"/>
      </div>    
      <table className='w-full text-sm text-gray-500 dark:text-gray-400'>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="py-3 px-6 dark:text-white">Name</th>
            <th className="py-3 px-6 dark:text-white">Email</th>
            <th className="py-3 px-6 dark:text-white hidden lg:table-cell">Phone</th>
            <th className="py-3 px-6 dark:text-white hidden lg:table-cell">Address</th>
            <th className="py-3 px-6 dark:text-white">Company</th>
            <th className="py-3 px-6 dark:text-white">Recent Tasks</th>
          </tr>
        </thead>
        <tbody>
          {filteredTableData.map((row, rowIndex) => <tr key={`tableRow${rowIndex}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="py-3 px-6">{row.name}</td>
            <td className="py-3 px-6">{row.email}</td>
            <td className="py-3 px-6 hidden lg:table-cell">{row.phone}</td>
            <td className="py-3 px-6 hidden lg:table-cell">{`${row.address.suite} ${row.address.street} ${row.address.city} ${row.address.zipcode}`}</td>
            <td className="py-3 px-6"><a href={`http://${row.website}`}>{row.company.name}</a></td>
            <td className="py-3 px-6">{ row.todos.map((task, taskIndex) => task.completed ? <CheckIcon key={`row${rowIndex}taskStatus${taskIndex}`} className="inline px-px" /> : <CrossIcon key={`row${rowIndex}taskStatus${taskIndex}`} className="inline px-px" />)}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
}