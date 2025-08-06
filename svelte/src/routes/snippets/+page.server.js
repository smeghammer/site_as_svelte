import {error} from "@sveltejs/kit";
// /** @type {import('./$types').PageLoad} */

export async function load({params}){
    /** here I need to make an API call to the relevant emdpoint to get the map summary data: */
    try{
        // const response = await fetch("http://localhost:8001/api/snippet/"+params['slug'],{method:'GET'});
        const snippetresponse = await fetch("http://api:8000/api/snippet/"+params['slug'],{method:'GET'});
        const snippetresponseData = await snippetresponse.json()
        const allsnippets = await fetch("http://api:8000/api/snippets/", {method: "GET"});
        const allsnippetsData = await allsnippets.json();
        
        let combinedData = {"currentwad": snippetresponseData, "allmaps": allsnippetsData}
        return(combinedData)
    }
    catch(err){
        console.error(`Error in load function for /: ${error}`);
    }
}