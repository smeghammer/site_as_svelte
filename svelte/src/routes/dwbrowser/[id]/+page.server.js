
/** this PERSISTS between calls AND between page loads */
let IDGamesBrowseHistory = {};

let IDGamesTitleMapper = {} //maybe...

/** load top-level IDGames data */
export async function load({params}){
   

    /** here I need to make an API call to the relevant endpoint to get the map summary data: */
    try{
        let id=0
        let title = "Not set";

        /** also collect title (todo - this will require changes to the route I think) */
        // if(params && params['title']){
        //     title = params['title']
        // }
        let currHistoryItem = {}
        if(params && params['id']){
            id=parseInt(params['id']);

            /** push to browse history if not there already: */
            if(!(IDGamesBrowseHistory[id])){
                currHistoryItem = {
                    "id":id
                    // ,"title":title   //todo
                }
            }
        }

        const response = await fetch(`https://www.doomworld.com/idgames/api/api.php?out=json&action=getcontents&id=${id}`,{method:'GET'});
        const responseData = await response.json()
        console.log("SERVER:",responseData)
        /** and get the child IDs from the data and push to the history (maybe only return this when ASKED FOR? - cos it's gonna get BIIIG!) */
        
        /** push to browse history if not there already: (will this be inconsistent with the above?)  */
        if(!(IDGamesBrowseHistory[id])){
            currHistoryItem['childs'] = responseData['content']['dir'];
            IDGamesBrowseHistory[id] =  currHistoryItem;
        }
        return({"data":responseData,"currentId":id,"currentTitle":title,"browse_history":IDGamesBrowseHistory})
    }
    catch(err){
        console.error(`Error in load function for /: ${err}`);
    }
}