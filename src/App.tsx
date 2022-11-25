import React, { useEffect, useState } from 'react';
import { UserTable } from './components/UserTable';
import { User } from './types/user'
import { Task } from './types/Task'
import './App.css';


function App() {
  const [todos, setTodos] = useState<Task[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState({}) //TODO: handle errors and display suitable messages to the user

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users') //TODO: move to global settings/environment variables
    .then(response => response.json())
    .then(response => setUsers(response))
    .catch(error => setError(error))
  
    fetch('https://jsonplaceholder.typicode.com/todos') //TODO: move to global settings/environment variables
    .then(response => response.json())
    .then(response => setTodos(response))
    .catch(error => setError(error))
  }, [])

  return (
    <div className="App bg-gray-30 dark:bg-gray-600 min-h-screen">
      <div className="md:max-w-7xl mx-auto">
        {users.length > 0 && todos.length > 0 ? <UserTable todos={todos} users={users} /> : <div>Loading...</div>}
      </div>
    </div>
  );
}

export default App;
