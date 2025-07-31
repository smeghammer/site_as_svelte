export async function load({params}){
    try{
        const response = await fetch("http://localhost:8001/api/all",{method:'GET'});
        const responseData = await response.json()
        return(responseData)
    }
    catch(err){
        console.error(`Error in load function for /: ${err}`);
        //return([]);
    }
}