import getUserInfo from '../../Api/userInfo';
import getTodo from '../../Api/todo';
import { useEffect, useState } from 'react';
import './userInformation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Userinformation() {
    const [usersDetails, setuserDetails] = useState([]);
    const [todo, setTodo] = useState([]);
    const [searchedVal, setSearchedVal] = useState("");
    useEffect(() => {
        try {
            {/*fetching  users data*/}
            getUserInfo().then((data) => setuserDetails(data));   
        } catch (e) { }
    }, []);
    useEffect(() => {
        try {
            {/*fetching recent tasks details from Todos */}
            getTodo().then((data) => setTodo(data));
        } catch (e) { }
    }, []);

    return (

        <div>
            <div class="bg-white md:m-20">
                <div class="flow-root">
                    <label for="simple-search" class="sr-only">Search</label>
                    <div class="relative w-full float-left  md:w-80">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input type="text" onChange={(e) => setSearchedVal(e.target.value)} id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" />
                    </div>
                    <div class="float-right hidden md:table-cell">
                        <img className="signal-max-width" src={require('../../images/logo.PNG')} />
                    </div>
                </div>

                <div class="flex flex-col">
                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div class="overflow-hidden">
                                <table class="min-w-full">
                                    <thead class="bg-gray-50 border-b-2 border-gray-200">
                                        <tr class="">
                                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">NAME</th>
                                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">EMAIL</th>
                                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left hidden md:table-cell">PHONE</th>
                                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left hidden md:table-cell">ADDRESS</th>
                                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">COMPANY NAME</th>
                                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">RECENT TASKS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* filtering seach results if input value > 3 */}
                                        {usersDetails.filter((row) => searchedVal.length < 3 || row.name
                                            .toString()
                                            .toLowerCase()
                                            .includes(searchedVal.toString().toLowerCase())).sort((a, b) => a.id > b.id ? 1 : -1).map((val, key) => {
                                                return (
                                                    <tr key={key} class="">
                                                        <td class="text-sm font-light px-6 py-4 ">{val.name}</td>
                                                        <td class="text-sm text-gray-900 font-light px-6 py-4 ">{val.email}</td>
                                                        <td class="text-sm text-gray-900 font-light px-6 py-4 hidden md:table-cell">{val.phone}</td>
                                                        <td class="text-sm text-gray-900 font-light px-6 py-4 hidden md:table-cell">{`${val.address.street}, ${val.address.suite}, ${val.address.city}, ${val.address.zipcode}`}</td>
                                                        <td class="text-sm text-gray-900 font-light px-6 py-4"><a class="font-bold text-blue-500 hover:underline" href={`${"https:" + val.website}`}>{val.company.name}</a></td>
                                                        <td class="text-sm text-gray-900 font-light px-6 py-4">
                                                              {/*Based on the id, displaying the status of the last three tasks from todos*/}
                                                            {todo.filter(info => info.userId == val.id).slice(0, 3).map((value, key) => {
                                                                return <span>{value.completed ? <FontAwesomeIcon icon={faCheckSquare} className="taskcompleted-clr" /> : <FontAwesomeIcon icon={faXmark} className="taskincompleted-clr"  />}</span>;
                                                            })}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}