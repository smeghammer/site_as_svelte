// e.g. https://kit.svelte.dev/docs/routing#page-page-js

import {error} from "@sveltejs/kit";

// for test 2. This is an array of objects
// import maps from "$lib/data/maps.json";

/** @type {import('./$types').PageLoad} */

/** test 4: an async SERVER function, emulating a longer-running DB call: This should be on +page.server.js really. See later tests. */
export async function load({params}){
    /** here I need to make an API call to the relevant emdpoint to get the map summary data: */
    try{
        // const response = await fetch("http://localhost:8001/api/wads",{method:'GET'});
        console.log("GETTING MAPS:");
        const response = await fetch("http://api:8000/api/wads",{method:'GET'});
        const responseData = await response.json()
        console.log(`RESPONSEDATA: ${responseData}`)
        return(responseData)
    }
    catch(err){
        console.error(`Error in load function for /: ${error}`);
    }
}
