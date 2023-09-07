<script lang="ts">
    /** 
     * https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_stores
     * import my stores for BC and parent data, for READING in this component: */
    import {currentParent} from "$lib/components/stores"

    // https://learn.svelte.dev/tutorial/writable-stores
    import {IDGamesDownloadTree} from "$lib/components/stores"
    import {IDGamesDownloadKeyedList} from "$lib/components/stores"
    
    $IDGamesDownloadTree = $IDGamesDownloadTree;    // ???????

    $IDGamesDownloadKeyedList = $IDGamesDownloadKeyedList   // ?????WTF???
    let BCData = []

    // SUBSCRIBE to the store thing:
    IDGamesDownloadKeyedList.subscribe( (value) => {
        BCData = value} 
    ) //this is the result of the methods on the components that SET the store?

    //export let pathArray
    export let data;
    $: data = data;
    // console.log(data.currentId, data.data)

    let pathArray:any[] = []    //to improve
    $: pathArray = pathArray
    // let level:number = 0
    // $: {    // REACTIVE BLOCKS ARE KEY!!!!!
    //     // why is this running twice? it is running BEFORE and then AFTER $currentParent is changed
    //     console.log("[path comp] currentId: ",data.currentId)
    //     if($currentParent){ // it starts undefined
    //         /*** 
    //          * This is my data for building the BC:
    //          * hacky!! 
    //          * The problem is that this block runs TWICE for each click - once BEFORE the ID is changed to the new one, and
    //          * once AFTER it has been obtained from the click event. I only want the SECOND occurrence (i.e. the new item ID)
    //          * so I am checking for the existence of the ID here in the array before I append. This WORKS, but seems like a very
    //          * hacky way to do it. Ideally I want to know WHY it runs twice, and how to 'properly' suppress it.
    //          *  */ 
    //         let append = true;
    //         // let prior_counter = 0
    //         for(let x=0;x<pathArray.length;x++){
    //             if(pathArray[x].id === data.currentId){
    //                 append = false;
    //             }
    //             /** 
    //              * The other issue is that on browsing back down the breadcrumb, I cannot reset the BC array as I need to (remove all 
    //              * higher ones, reset tip to linktext only). There is a mismatch somewhere between the building of the pathArray and 
    //              * the subsequent truncation of it here. It appears that teh reactivity needed(?) to ensure the functionality works is
    //              * somehow also building the array BEFORE it gets in this function! 
    //              * 
    //              * So, can I post-process here to REMOVE any items that are not sequential?? It seems not, because the BC array has ALREADY 
    //              * been appended to with the updated route based on the navigation.*/
    //             // console.log(pathArray[x].level, prior_counter)
    //             // if(pathArray[x].level !== prior_counter+1){
    //             //     console.log("level not sequential");
    //             //     append = false;
    //             // }
    //             // prior_counter++;
    //         }
    //         if(append){
    //             console.log($currentParent.split(/\//g)[$currentParent.split(/\//g).length-2])
    //             /**  I want just the trailing string. The exact format of the name warrants this: */
    //             level++;
    //             pathArray.push({
    //                 id: data.currentId, 
    //                 linktext: $currentParent.split(/\//g)[$currentParent.split(/\//g).length-2],
    //                 level: level
    //             });
    //         }
    //         console.log("END OF REACTIVE BLOCK: ",pathArray);
    //     }
        
        console.log($IDGamesDownloadKeyedList)
        // console.log(pathArray);
        // console.log(pathArray.length);
        // console.log(pathArray[pathArray.length-1]);
        // console.log(data.currentId);
        // pathArray = pathArray;     // <-- THIS IS KEY HERE! NO, REALLY! This self-assignment ensures it is reactive. WTF??
        // console.log("INSIDE: ",$currentParent) // <-- this is a STORE object if teh $ is NOT USED. The key is the reactive $ syntax again...
        // if(pathArray.length > 1){
        //     console.log(pathArray[pathArray.length-1].level,pathArray[pathArray.length-2].level);
        //     // again, hacky:
        //     if(pathArray && (pathArray[pathArray.length-1].level > pathArray[pathArray.length-2].level + 1)){
        //         console.log('popping...')
        //         pathArray.pop()
        //         // I won't need this - I will just need the ID and walk back up my tree...
        //     }
        // }
    // }

    /** 
     * this needs to truncate the path array at the given depth. This is why I appended a data-depth attribute to the navigation
     * elements:  
     * However, it is not working as expected. See comments in the reactive block above. It appears that the reactive block above is 
     * running BEFORE this function is called
     * */
    function BCHandler(){
        console.log("bc handler",this.getAttribute('data-id'),this.getAttribute('data-level')," clicked")
        //  pathArray = pathArray.slice(0, parseInt(this.getAttribute('data-level'))-1); // this doesn't work properly...
        
        // let newPathArray = [];
        // let current_level = parseInt(this.getAttribute('data-level'));
        // for(let a=0;a<pathArray.length;a++){
        //     // hmm... the order is correct (?) so I can stop on discovering a match? Also doesn't work as expected.:
        //     // if(pathArray[a].id){
        //     //     break;
        //     // }
        //     /** collect path BEFORE the specified level: */
        //     //if(pathArray[a].level < parseInt(this.getAttribute('data-level'))){
        //     if(pathArray[a].level < current_level){
        //         newPathArray.push(pathArray[a]);
        //     }
        //     console.log("BEFORE ASSIGNMENT: ",newPathArray, pathArray);
        //     pathArray = newPathArray;
        //     console.log("END OF FUNCTION CALL, AFTER ASSIGNMENT: ",newPathArray, pathArray);
        // }
        
        /** the issue is here. 
         * On being called, this function correctly processes the array according to the code logic, 
         * 
         * BUT:
         * 
         * the pathArray has ALREADY BEEN APPENDED TO by the reactive block above. So we end up with
         * a truncated path that has an orphaned tip. This screws it up...
         * 
         * A possible solution is to pass a URL parameter??? But does this remain 'sveltekitty'? Also doesn't work.
         *  */
    }

    // does it work outside the reactive block? YES
    console.log("OUTSIDE: ", $currentParent) // <-- this is a STORE object if the $ is NOT USED. The key is the reactive $ syntax again...

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
    
    The BCHandler is correctly called, BUT the manipulation of the 'pathArray' array is not happening as  
    I am expecting. 

    Simplistically, I am building a horizontal path menu (a breadcrumb) based on the browsing history
    when using the output from the IDGamesListFiles.svelte component. This path is built up correctly
    based on a setParent() handler function.
     
 -->
<h3>Breadcrumb</h3>
<!-- TEST: {$currentParent} TADA!! -->
<!-- <div class="pure-menu pure-menu-horizontal">
    <ul class="pure-menu-list">
        {#each pathArray as thing}
            <li class="pure-menu-item">
                {#if thing.level < pathArray.length}
                    <a href="/dwbrowser/{thing.id}" data-id="{thing.id}" data-level={thing.level} on:click={BCHandler}>{thing.level} - {thing.linktext||"Home"}</a>
                {:else}
                    {thing.level} - {thing.linktext||"Home"}
                {/if}
            </li>
        {/each}
    </ul>    
</div> -->

<!-- <div class="pure-menu pure-menu-horizontal"><p>STORE</p>
    <ul class="pure-menu-list">
        {#each IDGamesDownloadKeyedList as thing}
            <li class="pure-menu-item">
                {#if thing.level < IDGamesDownloadKeyedList.length}
                    <a href="/dwbrowser/{thing.id}" data-id="{thing.id}" data-level={thing.level} on:click={BCHandler}>{thing.level} - {thing.linktext||"Home"}</a>
                {:else}
                    {thing.level} - {thing.linktext||"Home"}
                {/if}
            </li>
        {/each}
    </ul>    
</div> -->

{console.log(IDGamesDownloadKeyedList)}