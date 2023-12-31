// e.g. https://kit.svelte.dev/docs/routing#page-page-js

import {error} from "@sveltejs/kit";

// for test 2. This is an array of objects
// import maps from "$lib/data/maps.json";

/** @type {import('./$types').PageLoad} */



// Call back-end Mongo database API. I need to get the slug into here:
export async function load({params}){
    try{
        const response = await fetch("http://localhost:8000/api/wad/"+params['slug'],{method:'GET'});
        const responseData = await response.json()
        return(responseData)
    }
    catch(err){
        console.error(`Error in load function for /: ${error}`);
    }
}

