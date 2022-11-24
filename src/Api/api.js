
export default async function getUserData(URL,options={},params={}){
    try{
        const paramString = new URLSearchParams(params);
        const response = await fetch(`${URL}?${paramString}`,options);
        if(response.ok){
            const responseData = await response.json();
            console.log(responseData);
            return responseData ? responseData :[];
        }
        else{
            const error = new Error("Something went wrong. Please try again");
            return error;
        }
    }
    catch(err){
        const error = new Error("Something went wrong. Please try again");
        return error;
    }
}




