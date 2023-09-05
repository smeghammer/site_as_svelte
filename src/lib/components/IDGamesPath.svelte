<script lang="ts">

    /** 
     * https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_stores
     * import my stores for BC and parent data, for READING in this component: */
    import {currentParent} from "$lib/components/stores"

    //export let pathArray
    export let data;
    $: data = data;
    console.log(data.currentId, data.data)


    let pathArray:any[] = []    //to improve
    $: pathArray = pathArray
    let level:number = 0
    $: {    // REACTIVE BLOCKS ARE KEY!!!!!
        // why is this running twice? it is running BEFORE and then AFTER $currentParent is changed
        console.log("[path comp] currentId: ",data.currentId)
        if($currentParent){ // it starts undefined
            /*** 
             * This is my data for building the BC:
             * hacky!! 
             * The problem is that this block runs TWICE for each click - once BEFORE the ID is changed to the new one, and
             * once AFTER it has been obtained from the click event. I only want the SECOND occurrence (i.e. the new item ID)
             * so I am checking for the existence of the ID here in the array before I append. This WORKS, but seems like a very
             * hacky way to do it. Ideally I want to know WHY it runs twice, and how to 'properly' suppress it.
             *  */ 
            let append = true;
            for(let x=0;x<pathArray.length;x++){
                if(pathArray[x].id === data.currentId)
                {
                    append = false;
                }
            }
            if(append){
                console.log(
                    $currentParent.split(/\//g)[$currentParent.split(/\//g).length-2]
                    )
                // pathArray.push({id:data.currentId,linktext:$currentParent});
                // I want just teh trailing string. The exact format of the name warrants this:
                level++;
                pathArray.push({
                    id: data.currentId, 
                    linktext: $currentParent.split(/\//g)[$currentParent.split(/\//g).length-2],
                    level: level
                });
            }
            console.log("END OF REACTIVE BLOCK: ",pathArray);
        }
        
        console.log(pathArray);
        console.log(pathArray[pathArray.length-1]);
        console.log(data.currentId);
        pathArray = pathArray;     // <-- THIS IS KEY HERE! NO, REALLY! This self-assignment ensures it is reactive. WTF??
        console.log("INSIDE: ",$currentParent) // <-- this is a STORE object if teh $ is NOT USED. The key is the reactive $ syntax again...
    }

    /** 
     * this needs to truncate the path array at the given depth. This is why I appended a data-depth attribute to the navigation
     * elements:  
     * */
    function BCHandler(){
        console.log("bc handler",this.getAttribute('data-id'),this.getAttribute('data-level')," clicked")
        //  pathArray = pathArray.slice(0, parseInt(this.getAttribute('data-level'))-1); // this doesn't work properly...
        // hmm... the order is correct (?) so I can stop on discovering a match:
        let newPathArray = [];
        for(let a=0;a<pathArray.length;a++){
            // if(pathArray[a].id){
            //     break;
            // }
            // collect path before the level
            if(pathArray[a].level < parseInt(this.getAttribute('data-level'))){
                newPathArray.push(pathArray[a]);
            }
            
        }
        console.log("BEFORE ASSIGNMENT: ",newPathArray, pathArray);
        pathArray = newPathArray;
        console.log("END OF FUNCTION CALL, AFTER ASSIGNMENT: ",newPathArray, pathArray);

    }

    // does it work outside the reactive block? YES
    console.log("OUTSIDE: ", $currentParent) // <-- this is a STORE object if the $ is NOT USED. The key is the reactive $ syntax again...

</script>
<!-- 
    this needs to account for hierarchy too - that only exists as a result of browsing around.
    a click on an exposed link to a dir ALWAYS will be a direct child, and s 
 -->
<h3>Breadcrumb</h3>
TEST: {$currentParent} <!-- TADA!! -->
<div class="pure-menu pure-menu-horizontal">
<ul class="pure-menu-list">

{#each pathArray as thing}

    <li class="pure-menu-item">
        <a href="/dwbrowser/{thing.id}" data-id="{thing.id}" data-level={thing.level} on:click={BCHandler}>{thing.level} - {thing.linktext}</a>
        {#if thing.level < pathArray.length}
        xx
        {:else}
        yy
        {/if}
        {thing.level} - {thing.linktext}
        <!-- <a href="/dwbrowser/{thing.id}">{thing.level} - {thing.linktext}</a> -->
    </li>


{/each}
</ul>    
</div>
<!-- <p>BUILD PATH to {$breadcrumb} - {data.currentId}</p> -->