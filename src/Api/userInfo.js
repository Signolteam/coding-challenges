import getUserData from './api'

export default async function getUserInfo(){
    const URL= "https://jsonplaceholder.typicode.com/users";
    return await getUserData(URL);
}