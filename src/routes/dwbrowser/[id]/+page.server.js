/** load top-level IDGames data */
export async function load({params}){
    /** here I need to make an API call to the relevant endpoint to get the map summary data: */
    try{
        let id=0
        let title = "Not set";
        if(params && params['id']){
            id=parseInt(params['id']);
        }

        // console.log("https://www.doomworld.com/idgames/api/api.php?out=json&action=getcontents&id=" + id)
        const response = await fetch(`https://www.doomworld.com/idgames/api/api.php?out=json&action=getcontents&id=${id}`,{method:'GET'});
        //+params['slug']
        const responseData = await response.json()
        
        return({"data":responseData,"currentId":id,"currentTitle":title})
    }
    catch(err){
        // console.error(`Error in load function for /: ${err}`);
    }
}