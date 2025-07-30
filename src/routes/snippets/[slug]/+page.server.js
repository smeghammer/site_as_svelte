// e.g. https://kit.svelte.dev/docs/routing#page-page-js

import {error} from "@sveltejs/kit";

// for test 2. This is an array of objects
// import maps from "$lib/data/maps.json";

/** @type {import('./$types').PageLoad} */



/** test 4: an async SERVER function, emulating a longer-running DB call: This should be on +page.server.js really. See later tests. */
//export async function load({params}){
//    try{
//        return({'data':maps,"source":"+page.server.js"});   //maps here is the JSON page data emulating a DB call
//    }
//    catch(err){
        // so how do I catch this thrown error in error page?
//        console.log("error: "+err.toString());
//        throw(error(404),err.toString());
//    }
//} 

// Call mack-end Mongo database API. I need to get the slug into here:
export async function load({params}){
    try{
        const response = await fetch("http://localhost:8001/api/snippet/"+params['slug'],{method:'GET'});
        const responseData = await response.json()
        return(responseData)
    }
    catch(err){
        console.error(`Error in load function for /: ${error}`);
    }
}