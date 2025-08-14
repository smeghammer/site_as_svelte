export async function load({params}){
    try{
        const response = await fetch("http://api:8000/api/all",{method:'GET'});
        const layoutData = await response.json()
        return({"layoutData":layoutData})    // this is everything...
    }
    catch(err){
        console.error(`Error in load function for /: ${err}`);
    }
}