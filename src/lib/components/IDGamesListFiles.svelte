<script lang="ts">
    // https://linguinecode.com/post/how-to-access-sveltekit-dynamic-params-from-router
    import { page } from '$app/stores';

    /** import my stores for BC and parent data, for WRITING in this component: */
    // import {breadcrumb} from "$app/stores"
    // https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_stores
    // note the comments about shorthand import/usage
    import {currentParent} from "$lib/components/stores"
    import {currentTitle} from "$lib/components/stores"

    // TEST:
    import {IDGamesDownloadTree} from "$lib/components/stores" // IDGamesDownloadKeyedList
    // import { createEventDispatcher } from "svelte";
    // https://learn.svelte.dev/tutorial/writable-stores

    // see https://dev.to/jdgamble555/the-unwritten-svelte-stores-guide-47la
    // This explicitly talks about the store object methods set() and get() methods as well as the subscribe() method.
    // So HERE, I can build a variable and then SET the store tro that value. I Should them be able to GET the value in
    // the bc component. 
    import { IDGamesDownloadKeyedList } from "$lib/components/stores"

    // build this, and then use it as a value for the store, using the SET() method
    // https://dev.to/jdgamble555/the-unwritten-svelte-stores-guide-47la
    let browseHistoryData = {}

    /** this is data from ID Games API */
    export let data;
    $: data = data;
    // $: {
    //     recurse(0, $IDGamesDownloadTree, {"id":data.currentId, "title":$currentTitle, "dir":data.data.content.dir});
    // }
    // console.log(data)
    // console.log($IDGamesDownloadTree)
    // Hmmmm.... this definitely runs twice...
    // and can I do this (https://learn.svelte.dev/tutorial/writable-stores) here - on load rather than a called function?
    // $: {
    //     console.log(data);
    //     if(!browseHistoryData[data.currentId]){
    //         let parent = parseInt($page.params['id']);
    //         if(data.currentId === 0){
    //             parent = -1
    //         }
    //         browseHistoryData[data.currentId] = { "parent":parent,"dir":data.data.content.dir, "file":data.data.content.file}
    //     }
    //     else{
    //         console.log(data.currentId," already stored");
    //     }


    //     // console.log(data.currentId);
    //     // if(!IDGamesDownloadKeyedList[data.currentId]){
    //     //     let parent = parseInt($page.params['id']);
    //     //     if(data.currentId === 0){
    //     //         parent = -1
    //     //     }
    //     //     IDGamesDownloadKeyedList[data.currentId] = { "parent":parent,"dir":data.data.content.dir, "file":data.data.content.file}
    //     // }
    //     // else{
    //     //     console.log(data.currentId," already stored");
    //     // }
    // }
    // console.log($IDGamesDownloadKeyedList)
    // now SET this value to the store variable:
    IDGamesDownloadKeyedList.set(browseHistoryData);
    console.log($IDGamesDownloadKeyedList,browseHistoryData)

    /** 
     * there is a 'feature' of this data such that a SINGLE directory entry is actually
     * represented with as an object, rather than an array of length 1 containing that object.
     * so I need to refactor in that case, so the processing code works as intended: 
     *
    console.log(data);
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
    console.log(Array.isArray(data.data.content.dir))
    */
    // if(!Array.isArray(data.data.content.dir)){
    //     data.data.content.dir = [data.data.content.dir]
    // }
    // rather than manipulate the data, handle the edge case in the template.

    // console.log(data);

    export let parentTitle = "Root";
    $:parentTitle = parentTitle;
    /**  this is where we are coming FROM. We need to retain the name so I can populate the BC - the ID Games API doesn't have
     * data about SELF.
     * Here, I am using a sveltekit STORE (see ref above) and the value set here on click of the navigation item (from a data-attribute)
     * is set to a store variable which is read by another component (a sibling, the IDGamesPath.svelte breadcrumb module) on this page.
     * I am doing this because the IDGames API does not show info about SELF, only direct childs, of a given ID, so I need to retain the 
     * section name and ID from the parent API entity. The ID is OK becaise that is the parameter passed into the API call, but I need to 
     * also extract and retain the path string in order to display the breadcrumb properly.
     * 
     * Also, I need to ensure that the array is properly truncated on browsing BACK UP the tree. 
     * 
     * See notes on IDGamesPath.svelte. This is proving problematic.:
    */
    $currentParent = "/";
//  this is called ONCE  -OK.
    function setParent(){
        /** 
         * because we may be navigating to the root of this section from elsewhere. 
         * */
        if(this.getAttribute("data-title")){
            // console.log("data-title: ",this.getAttribute("data-title"));
            parentTitle = this.getAttribute("data-title");
            parentTitle = parentTitle
            $currentParent = this.getAttribute("data-title");

            // and set the currentTitle
            $currentTitle = this.getAttribute("data-title")

            // I should be able to build the store object here?
            // console.log($IDGamesDownloadTree)
            // test:
            // $IDGamesDownloadTree.dir.push( parseInt(this.getAttribute("data-id")) )
            // I think I might need to get the data from the DOM...
            // parentId is the key to identify where tis should be attached:
            // let childData = getChildData()
            // recurse(parseInt(this.getAttribute("data-parentid")), $IDGamesDownloadTree, {"id":parseInt(this.getAttribute("data-id")),"title":$currentTitle,"dir":getChildData()}); // TODO: get data from DOM?
            console.log(data);
            // recurse(parseInt(this.getAttribute("data-parentid")), $IDGamesDownloadTree, {"id":data.currentId, "title":$currentTitle, "dir":data.data.content.dir});
            // recurse(0, parseInt(this.getAttribute("data-parentid")), {"id":data.currentId, "title":$currentTitle, "dir":data.data.content.dir});
            // TEST
            console.log("IN setParent HANDLER",data, data.data.content.dir);
            // if(!IDGamesDownloadKeyedList[this.getAttribute("data-id")]){
            //     IDGamesDownloadKeyedList[this.getAttribute("data-id")] = { "dir":data.data.content.dir, "file":data.data.content.file} // <-- WTF IS `data` NOT REACTIVE HERE???
            // }
            // else{
            //     console.log("already stored");
            // }

            // and now set the variable as per the load handler:
            // this WORKS!!, but I still need to truncate the path in the BC component.
            if(!browseHistoryData[this.getAttribute("data-id")]){
                browseHistoryData[this.getAttribute("data-id")] = { "parent":data.currentId,"dir":data.data.content.dir, "file":data.data.content.file} // <-- WTF IS `data` NOT REACTIVE HERE???
            }
            else{
                console.log("already stored");
            }
            // then set the store variable:
            IDGamesDownloadKeyedList.set(browseHistoryData);
            console.log($IDGamesDownloadKeyedList,browseHistoryData)
        }
    }

    /** retrieve the current data from the DOM, as built by the UI rendering: */
    // const getChildData = function(){
    //     let currentDOMData = document.querySelectorAll("#files_tree > li > a");
    //     let childData = []
    //     for(const DOMElem of currentDOMData){
    //         // console.log(DOMElem)
    //         childData.push({
    //             "id":parseInt(DOMElem.getAttribute("data-id")),     // needs a type guard here...
    //             "title":DOMElem.getAttribute("data-title"),
    //             "dir":[],
    //             "files":[]
    //         })
    //     }
    //     return(childData);
    // }

    /** 
     * need: {parent_id:n, parent_name:s, child_data:[{id:n, name:s}]}
     * may not need parent_name?
     * 
     * this will need to be recursive, unless I implement a flat version. TO INVESTIGATE
     */
    // const appendToTree = function(attachAtId, append_data){
        // // first, I need to get the folder data from the DOM - I don't want to make another API call:
        // let currentDOMData = document.querySelectorAll("#files_tree > li > a");
        // let childData = []
        // for(const DOMElem of currentDOMData){
        //     // console.log(DOMElem)
        //     childData.push({
        //         "id":parseInt(DOMElem.getAttribute("data-id")),     // needs a type guard here...
        //         "title":DOMElem.getAttribute("data-title"),
        //         "dir":[],
        //         "files":[]
        //     })
        // }
        // append_data.dir = childData;

        // I also need to account for cases where the data is an OBJECT rather than an array of objects
        // see also https://stackoverflow.com/questions/2549320/looping-through-an-object-tree-recursively (I forget!!)

        // // do I have access to currently obtained data?
        // // this is actually the PRIOR data. So a server/client mismatch thing here...
        // console.log("CURRENT ID GAMES DATA", data);
        // this:
        // {"id":0,"name":"/", "parent_id":-1, "child_ids":[], "file":[]});
        /** 
        {
            "id": 0,       // this is the node ID
            "name":"bla"   // actually is a path string
            "dir": [       // more of these 
                { "id": 1, "name":"bla", "dir": [], "file": [] },
                { "id": 2, "name":"bla", "dir": [], "file": [] },
                { "id": 3, "name":"bla", "dir": [], "file": [] },
                ...
            ],
            "file": []
        }
        */ 
        // call recursive func
    // recurse(attachAtId, $IDGamesDownloadTree);

    
    // `currentHierarchyData` is a ref to $IDGamesDownloadTree
    function recurse(attachAtId,currentHierarchyData,append_data){
        console.log("Trying to attach ", append_data," to node ID ", attachAtId)

        // check if we are actually on the item to which we should append data:
        console.log(currentHierarchyData.id,attachAtId)
        //for(let a=0;a<currentHierarchyData.dir.length;a++){ // this needs to account for array vs object, and null/empty TODO:
            if(currentHierarchyData.id === attachAtId){
                console.log("FOUND: ",currentHierarchyData);
                //if(!Array.isArray(newdata.dir)){ // assume empty if not an array
                    currentHierarchyData["dir"] = append_data.dir;  // this may need to be altered
                //}
                // newdata.dir.push( append_data );  //need to ensure new_data is correctly structured
            }
            else{
                for(let a=0;a<currentHierarchyData.dir.length;a++){ // this needs to account for array vs object, and null/empty TODO:
                    console.log("recursing into ", currentHierarchyData.dir[a])
                    recurse(attachAtId, currentHierarchyData.dir[a],append_data)
                }
            }
       // }
        
        //}

        // if(Array.isArray(newdata.dir)){
        //     console.log(newdata.dir)
        //     for(let a=0;a< newdata.dir.length;a++){
        //         // if we find a match between submitted ID (parent ID) and a tree node ID (see above), append and exit
        //         if(newdata.parentId === newdata.dir[a])
        //         // otherwise iterate further:
        //         recurse(newdata.dir[a]);
        //     }
        // }
    }
    //}
    
</script>

<!-- test -->
<h3>Directories {$currentParent}</h3>
<!-- <p>TODO: incorporate the proper tree builder! Maybe.</p> -->
<!-- XX{parentTitle} YY{$currentParent} ZZ -->
{#if data.data && data.data.content && data.data.content.dir && Array.isArray(data.data.content.dir)}  <!-- this condition may need to be tightened -->
<ul id="files_tree">
    {#each data.data.content.dir as thing}
        <li><a href="/dwbrowser/{thing.id}" data-title="{thing.name}" data-id="{thing.id}" title="{thing.name}" data-parentid="{data.currentId}"
        data-parent="{parentTitle}" on:click={setParent}>{thing.name}</a></li>
    {/each}
</ul>
{:else if data.data && data.data.content && data.data.content.dir && !Array.isArray(data.data.content.dir)}
<ul id="files_tree">
    <li>
        <a href="/dwbrowser/{data.data.content.dir.id}" data-title="{data.data.content.dir.name}"  data-id="{data.data.content.dir.id}" title="{data.data.content.dir.name}"
        data-parent="{parentTitle}"  data-parentid="{data.currentId}" on:click={setParent}>{data.data.content.dir.name}</a>
    </li>
</ul>
{:else}
<p>No sub-directories here!</p>
{/if}