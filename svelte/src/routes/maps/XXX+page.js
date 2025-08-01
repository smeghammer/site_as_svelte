// e.g. https://kit.svelte.dev/docs/routing#page-page-js

import {error} from "@sveltejs/kit";

// for test 2. This is an array of objects
import maps from "$lib/data/maps.json";

/** @type {import('./$types').PageLoad} */

/** 
 * Export a load function - this is executed automatically on page LOAD.
 * The return value becomes available to the page as 'load'.
 * {params} are values following the [slug] part of the path.
 * 
 * This MUST return an object not a string!
*/

/** test 1. A simple sync return of a simple object: */
// export function load({params}){
//     return({"value":"A page.js-returned string"});
// }

/** test 2: synch return of the more complex JSON data 
 * ALSO, the object CANNOT be an array!, so I need to return a top level wrapper:
*/
// export function load({params}){
//     return({'data':maps});   //maps here is the JSON page data emulating a DB call
// }

/** test 3: an async function, emulating a longer-running DB call: This should be on +page.server.js really. See later tests. */
// export async function load({params}){
//     try{
//         return({'data':maps,"source":"+page.js"});   //maps here is the JSON page data emulating a DB call
//     }
//     catch(e){
//         throw(error(404))
//     }
// }