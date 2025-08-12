
/** this PERSISTS between calls AND between page loads */
let IDGamesBrowseHistory = {};

let IDGamesTitleMapper = {} //maybe...

// let historyCounter = 0


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
                    // ,
                    // "historyCounter":historyCounter++,
                    // ,"title":title   //todo
                }
            }
        }
        /** 
         * This gets the JSON node identified by `id`
         * What we need to do - rather than arse about with a history - is to build,
         * sever-side, the nested JSON array on eth hierarchy as we browse around.
         * This is how I did it on the original Smeghammer site, but client-side: 
         * */
        const response = await fetch(`https://www.doomworld.com/idgames/api/api.php?out=json&action=getcontents&id=${id}`,{method:'GET'});
        const responseData = await response.json()
        /** and get the child IDs from the data and push to the history (maybe only return this when ASKED FOR? - cos it's gonna get BIIIG!) */
        
        /** push to browse history if not there already: (will this be inconsistent with the above?)  */
        if(!(IDGamesBrowseHistory[id])){
            currHistoryItem['childs'] = responseData['content']['dir'];
            IDGamesBrowseHistory[id] =  currHistoryItem;
        }
        
        return({
            "data":responseData,
            "currentId":id,
            "currentTitle":title,
            "browse_history":IDGamesBrowseHistory,
            "routeIdentifier":{"src":"idgames", "id":id}
        })
    }
    catch(err){
        console.error(`Error in load function for /: ${err}`);
    }
}