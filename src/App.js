import axios from 'axios';
import { useEffect, useState } from 'react';
import { ReactComponent as SearchIcon } from './assets/icons/search.svg';
import TableRow from './components/TableRow';

const usersEndpoint = 'https://jsonplaceholder.typicode.com/users';
const todosEndpoint = 'https://jsonplaceholder.typicode.com/todos';

const App = () => {
	const [users, setUsers] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [todos, setTodos] = useState([]);

	const handleChange = (event) => {
		setSearchTerm(event.target.value);
	};

	useEffect(() => {
		const getUsers = async () => {
			console.log('fetching users...')
			const users = await axios.get(usersEndpoint);
			setUsers(users.data);
		};

		const getTodos = async () => {
			console.log('fetching todos...')
			const todos = await axios.get(todosEndpoint);
			setTodos(todos.data);
		};

		getUsers();
		getTodos();

		return () => {};
	}, []);

	if (!users) return null;

	console.log('Rendering...')
	return (
		<>
			<div className='m-10'>
				<label htmlFor='table-search' className='sr-only'>
					Search
				</label>
				<div className='relative mb-5'>
					<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
						<SearchIcon />
					</div>
					<input
						type='text'
						id='table-search'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5'
						placeholder='Search for users'
						onChange={handleChange}
						value={searchTerm}
					/>
				</div>
				<table className='table-auto border rounded-bl-md'>
					<thead className='bg-yellow-200'>
						<tr className='border-b'>
							<th className='p-4 text-left'>Name</th>
							<th className='p-4 text-left'>Email</th>
							<th className='p-4 text-left hidden lg:table-cell'>Phone</th>
							<th className='p-4 text-left hidden lg:table-cell'>Address</th>
							<th className='p-4 text-left'>Company Name</th>
							<th className='p-4 text-left'>Recent Tasks</th>
						</tr>
					</thead>
					<tbody>
						{searchTerm.length >= 3
							? users
									.filter((users) =>
										users.name.toLowerCase().includes(searchTerm.toLowerCase())
									)
									.map((user, index) => {
										console.log({user, index})
										return <TableRow user={user} key={index} todos={todos} />;
									})
							: users.map((user, index) => {
									return <TableRow user={user} key={index} todos={todos} />;
							  })}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default App;
