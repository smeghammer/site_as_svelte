import {error} from "@sveltejs/kit";
// import maps from "$lib/data/maps.json";

/** @type {import('./$types').PageLoad} */

export async function load({params}){
    /** here I need to make an API call to the relevant emdpoint to get the map summary data: */
    try{
        const response = await fetch("http://localhost:8001/api/snippets",{method:'GET'});
        const responseData = await response.json()
        return(responseData)
    }
    catch(err){
        console.error(`Error in load function for /: ${error}`);
    }
}