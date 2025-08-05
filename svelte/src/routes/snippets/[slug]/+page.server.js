// e.g. https://kit.svelte.dev/docs/routing#page-page-js
import {error} from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */


// Call back-end Mongo database API. I need to get the slug into here:
export async function load({params}){
    try{
        // const response = await fetch("http://localhost:8001/api/snippet/"+params['slug'],{method:'GET'});
        let combinedData = {}
        const snippetresponse = await fetch("http://api:8000/api/snippet/"+params['slug'],{method:'GET'});
        const snippetresponseData = await snippetresponse.json()

        const allsnippets = await fetch("http://api:8000/api/snippets/", {method: "GET"});
        const allsnippetsData = await allsnippets.json();
        
        combinedData = {"currentwad": snippetresponseData, "allmaps": allsnippetsData}
        // return(responseData)
        return(combinedData)
    }
    catch(err){
        console.error(`Error in load function for /: ${error}`);
    }
}