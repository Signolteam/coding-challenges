const TableRow = ({ user, todos }) => {
	return (
		<tr className='border-b even:bg-zinc-100'>
			<td className='p-4'>{user.name}</td>
			<td className='p-4'>{user.email}</td>
			<td className='p-4 hidden lg:table-cell'>{user.phone}</td>
			<td className='p-4 hidden lg:table-cell'>
				{user.address.street}, {user.address.suite}, {user.address.city}
			</td>
			<td className='p-4'>
				{' '}
				<a href={`http://${user.website}`} target='_blank' rel='noreferrer'>
					{user.company.name}
				</a>
			</td>
			<td className='p-4'>
				<ul className='inline-flex'>
					{todos
						.filter((todos) =>
							todos.userId.toString().includes(user.id.toString())
						)
						.slice(-3)
						.map((todo, index) => {
							return (
								<li className='mr-2' key={index}>
									{todo.completed ? '✅' : '❌'}
								</li>
							);
						})}
				</ul>
			</td>
		</tr>
	);
};

export default TableRow;
