<script lang="ts">
    import { page } from "$app/stores"
    /** 
     * https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_stores
     * import my stores for BC and parent data, for READING in this component: 
     * NOTE: I'm using the shorthand version of stores syntax. (ref to get)
     * */

    // https://learn.svelte.dev/tutorial/writable-stores
    // import {IDGamesDownloadTree} from "$lib/components/stores"
    import {IDGamesDownloadKeyedList} from "$lib/components/stores"
    // import { onDestroy } from "svelte";
    //  $IDGamesDownloadTree = $IDGamesDownloadTree;    // ???????
   
    // export let data;
    // $: data = data;

    // let pathArray:any[] = []    //to improve
    // $: pathArray = pathArray
    /** this is my store data: */
    // console.log($IDGamesDownloadKeyedList)

// and the function to call from the markup (see https://stackoverflow.com/questions/68393239/svelte-change-variable-value-inside-html-block)

/**
 * for breadcrumb handling -
 *  - for all - generate an array from IDGamesDownloadKeyedList with CURRENT page as tip.
 *    work back up the object matching wheer parent = self
 *  - on load, get current slug (which is the data key)
*/
let finalBreadcrumbData:any[];
$:{
    console.log("am i called twice???")
    let browseData = []
    /** this is the current slug - i.e. where we actually are. This will have an entry in the browse data */
    let tip = $page.params['id']    // the dynamic route slug value (as a string)
    console.log("STARTING AT TIP: ",tip);
    // now find the corresponding key in the IDGamesDownloadKeyedList store:
    // this needs to be two-level...

    /** 
     * we need to initialise a variable to keep track of where we are as we dig out the path back to the
     * root level. Note that ID 0 is not stored, so we assume that is root level. NOTE: I still need to get 
     * the linktexts from the source component!!!
     * 
     * next, we iterate over the big data looking for the current value of currentParentId. Note that 
     * `entry` is teh object key and corresponds to the slugs visited. So we match that against the current 
     * tip:
     * 
     * TODO: The following block is probably redundant.
     * I don't necessarily need to do this here - all I am doing ATM is transforming ALL data - so BC isn't
     * really a breadcrumb, just the browse history data re-formatted:
     */
    for(const entry in $IDGamesDownloadKeyedList){
        let nextBrowseDatum = $IDGamesDownloadKeyedList[entry];
        nextBrowseDatum['id'] = parseInt(entry);
        browseData.push(nextBrowseDatum);
    }

    /** 
     * tha browse data i generate is consistent! so to get the true breadcrumb I need to:
     * 
     *  - start with tip (i.e. current slug ID value)
     *  - find matching entry for id=tip
     *  - get THIS entry's parent
     *  - find matching item where ID=parent above
     *  - repeat until ID=0
    */
    finalBreadcrumbData = [];
    let currentId = tip;
    /** iteate and retrive the IDs (all) */
    console.log("BROWSE DATA:", browseData);
    for(let a=0;a<browseData.length;a++){
        /** this doesn't work if the thing being compared is LAST? */
        // console.log(BC[a],parseInt(currentId));
        //appendToFinalData(BC[a]);
        /**
         * 
         * 
        */

        if(browseData[a].id === parseInt(currentId) && parseInt(currentId) >= 0){
            // console.log("IN PATH BUILD ROUTINE:",currentId,tip);
            finalBreadcrumbData.push(browseData[a]);
            currentId = browseData[a]['parent']
        }
    }
    // console.log(finalData);
    function appendToFinalData(bcEntry){
        for(let a=0;a<browseData.length;a++){
            if(checkNotStoredAlready(bcEntry.id) && bcEntry.parent === browseData[a].id){
                finalBreadcrumbData.push(browseData[a]);
            }
        }
    }
    function checkNotStoredAlready(id){
        for(let a=0;a<browseData.length;a++){
            if(id === browseData[a].id){
                return(false);
            }
        }
        return(true);
    }
    finalBreadcrumbData.reverse();
    // console.log(finalBreadcrumbData);
}

/** rather than having a reactive block called twice, does this only get called once??? */
function BCHandler(){
    // console.log("BREADCRUMB HANDLER CLICK EVENT:");

    // console.log();



}


//let finalData = finalData
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

<p>{$page.params['id']}</p>
<div class="pure-menu pure-menu-horizontal"><p>STORE</p>
    <ul class="pure-menu-list">
        {#if finalBreadcrumbData.length > 0}
        <li class="pure-menu-item">
            <a href="/dwbrowser/0" data-id="0" data-level="0" on:click={BCHandler}>Home</a>
            <!-- <a href="/dwbrowser/0" data-id="0" data-level="0">ID Games root</a> -->
        </li>
        {:else if finalBreadcrumbData === 1}
        <li class="pure-menu-item">
            ID Games root
        </li>
        {/if}
        <!-- iterate of the the calculated breadcrumb array -->
        {#each finalBreadcrumbData as entry}
            <li class="pure-menu-item">
                <a href="/dwbrowser/{entry.id}" data-id="{entry.id}" data-level="" on:click={BCHandler}>{entry.id}</a>
                <!-- <a href="/dwbrowser/{entry.id}" data-id="{entry.id}" data-level="" >{entry.id}</a> -->
            </li>
        {/each}
        
        <!-- this is iterating over the entire browse history data, so will be removed -->
        <!-- {#each Object.entries($IDGamesDownloadKeyedList) as id,i}
            <li class="pure-menu-item">
                {#if i+1 < Object.keys($IDGamesDownloadKeyedList).length } -->
                    <!-- <a href="/dwbrowser/{id}" data-id="{id}" data-level=level on:click={BCHandler}>{id}</a> -->
                    <!-- <a href="/dwbrowser/{id}" data-id="{id}" data-level=level>{id}</a>
                {:else}
                    <b>{id}</b>
                {/if}
            </li>
        {/each} -->
    </ul>    
</div>
