import getUserData from './api'

export default async function getTodo(){
    const URL ="https://jsonplaceholder.typicode.com/todos";
    return await getUserData(URL);
}