<script lang="ts">
import { page } from "$app/stores"
/** 
 * https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_stores
 * import my stores for BC and parent data, for READING in this component: 
 * NOTE: I'm using the shorthand version of stores syntax. (ref to get)
 * */

// https://learn.svelte.dev/tutorial/writable-stores
import {IDGamesDownloadKeyedList} from "$lib/components/stores"

/** this is data from ID Games API
 * See issue #2:
 * https://github.com/smeghammer/site_as_svelte/issues/2 
 */
 export let data;

/**
 * for breadcrumb handling -
 *  - for all - generate an array from IDGamesDownloadKeyedList with CURRENT page as tip.
 *    work back up the object matching wheer parent = self
 *  - on load, get current slug (which is the data key)
*/
let bc:any[];
$:{
    // console.log("am i called twice???")
    /** this is the current slug - i.e. where we actually are. This will have an entry in the browse data */
    let tip = $page.params['id']    // the dynamic route slug value (as a string)

    // now, from TIP, walk back up the data:
    let start_at = parseInt(tip);

    // make an array first (not efficient!!)
    let working = []
    for (let k in data.browse_history){
        working.push(data.browse_history[k])
    }
    
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
    bc = [];
    
    let counter = 0;
    while(start_at > 0 && counter < 50){    //TO TIDY
        // loop over browse history:
        for(let a=0;a<working.length;a++){
            // see if any of current item childs are start_at:
            if(working[a].childs){
                for(let b=0; b<working[a].childs.length;b++){
                    if(start_at === working[a].childs[b].id){
                        bc.push({'id':start_at,'item':prune(working[a].childs[b].name)})
                        start_at = working[a].id;
                    }
                }                
            }
        }  
        counter++;  
    }
    // finally, reverse it again:
    bc.reverse()
}

</script>
<!-- 
    This component displays links to the data directories found at this API endpoint for a given
    ID . See the 'data' prop originating from the +page.Server.js load function. This all operates as 
    it should - links are generated and browsing deeper works correctly. 
    
    this needs to account for hierarchy too - this only exists as a result of browsing around.
    a click on an exposed link to a dir ALWAYS will be a direct child, and so the code needs to 
    keep track of the hierarchy manually. This is proving problematic, partly because the remote
    API doesn't declare parent for a given data set, but mainly I think because I am trying to use
    sveltekit incorrectly? 
    
    Simplistically, I am building a horizontal path menu (a breadcrumb) based on the browsing history
    when using the output from the IDGamesListFiles.svelte component. This path is built up correctly
    based on a setParent() handler function.
 -->

<h3>Breadcrumb</h3>

<div class="pure-menu pure-menu-horizontal">
    <ul class="pure-menu-list" id="idg_bc">

        {#if bc.length > 0}
        <li class="pure-menu-item">
            <a href="/dwbrowser/0" data-id="0" data-level="0">ID Games root</a> &#187; 
        </li>
        {:else if bc.length === 0}
        <li class="pure-menu-item">
            ID Games root
        </li>
        {/if}
        <!-- iterate of the the calculated breadcrumb array -->
        {#each bc as entry,counter}
            {#if counter+1 < bc.length}
            <li class="pure-menu-item">
                <a href="/dwbrowser/{entry.id}" data-id="{entry.id}" data-level="">{entry.item}</a> &#187; &nbsp;
            </li>
            {:else}
            <li class="pure-menu-item">
                {entry.item}
            </li>
            {/if}
        {/each}
    </ul>    
</div>
