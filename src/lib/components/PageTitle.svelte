<script lang="ts">
// import linktextMapper from "$lib/data/linktextMapper.json";
import { linktextMapper } from "$lib/data/linktextMapper";  // now typed in .TS file
import { page } from "$app/stores";


// import maps from "$lib/data/maps.json"; // I could get page titles from here for the snippets/maps
import {currentParent, currentTitle} from "$lib/components/stores"
console.log($currentParent, $currentTitle)
export let data; // navigation and page data
$: data;

/** so this needs to be reactive because a script block is not
 * reached unless a hard reload (ref?)
 * 
 * This issue of undefined is resolved either by making the if() block
 * below reactive and leaving the single render tag in th emarkup, or 
 * by adding the condition to the markup itself. 
 * set linktext to that hardcoded in the mapper JSON (TO IMPROVE) 
 *  - and see https://stackoverflow.com/questions/56833469/typescript-error-ts7053-element-implicitly-has-an-any-type
*/
$: current_linktext = linktextMapper[$page.url.pathname];

/** if we have a map or a snippet, use the title as defined in the data. TODO: Look into keying the raw 
 * data on linktext? because otherwise I need to loop and compate slug (and type?)... */
$: if($page.url.pathname.indexOf('/maps/')!== -1 || $page.url.pathname.indexOf('/snippets/')!== -1){
    // again, should key the data on slug!!
    current_linktext = undefined;   //to account for missing data
    
    /** using data from +layout.server.js load function: */
    for(let item of data.data){
        let check = new RegExp(item.slug+"$");
        if($page.url.pathname.match(check)){
            current_linktext = item.title;
        }
    }
}
//WTF? THIS does not log, but the below inline tag DOES???  
console.log("PARENT NAME FROM STORE: ",$currentParent)
// $: if($currentParent){
//     current_linktext = $currentParent;
// }

/** to convert to better JS!! */
let prune = function(val){
        let arr = val.split("/").reverse();

        let w = []
        for(let a=0;a<arr.length;a++){
            if(arr[a] !== ""){
                w.push(arr[a])
            }
        }
        return(w[0]);
    } 

/** catch cases where LT is not actually set: */
$: {
    if(current_linktext === undefined){
        current_linktext = prune($currentTitle);
    }
    if(current_linktext === undefined){
        current_linktext = "not set";
    }
}

/** TODO: Get LT from STORE for ID Games browser!! */
</script>

<div class="pure-g">
    <div class="pure-u-1 pure-u-md-1-8 pure-u-lg-1-12"></div>
    <div class="pure-u-1 pure-u-md-3-4 pure-u-lg-5-6">
        <!-- this needs some serious re-work. It's got out of hand... -->
        {#if current_linktext!=='not set'}
        <h1 class="centre">{current_linktext}</h1>
        {:else if current_linktext==='not set'}
        <h1 class="centre">{$currentParent}</h1>
        {:else}
        <h1 class="centre">Not found</h1>
        {/if}
    </div>
    <div class="pure-u-1 pure-u-md-1-8 pure-u-lg-1-12"></div>
</div>