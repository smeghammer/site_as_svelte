// see https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog#sveltekit-server-routes

/** I want to build a navigation based on the map data, to be placed under the main nav, if present. This will
 * expose JSON data, ideally with flag indicating SELF.
 * 
 * I may use this approach for the main topnaf if successful, because although that works well, it
 * does not adapt to display PARENT of self as highjlighted + a link.
 * 
 * https://developer.mozilla.org/en-US/docs/Web/API/Response
 * https://developer.mozilla.org/en-US/docs/Web/API/Response/json_static
 * 
 * Also, see https://kit.svelte.dev/docs/routing#server to allow me to pass in parameters
  */

import maps from "$lib/data/maps.json";

/** URL here is the API call URL, with optional params, extracted below */
export const GET = function({url}){
    //console.log(url.searchParams.get('type'));
    let out = {'message':'ok','data':[]}
    // it must return a Response():
    // const resp = Response.json({"nakatomi":"Welcome to the party, pal!"});
    //return new Response({"nakatomi":"Welcome to the party, pal!"});
    //console.log(maps)
    if(url.searchParams.get('type')){   // should be typed to an enum
        for(let map of maps){
            if(map.type === url.searchParams.get('type')){
                let link=true;
                let active = false;
                if(url.searchParams.get('slug') == map.slug) active = true;
                //console.log(map.title);
                out.data.push({"slug":map.slug,"active":active,"link":link,"nicename":map.title});
            }
        }

        // CARE! distinction between false and falsy!
        // if(0 === true) is ALWAYS false
        if(!out.data.length == true){
            // console.log('in else')
            out.message="no data";
        }
    }
    return Response.json(out);
}