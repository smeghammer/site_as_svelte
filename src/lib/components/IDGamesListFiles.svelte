<script lang="ts">
// https://linguinecode.com/post/how-to-access-sveltekit-dynamic-params-from-router
import { page } from '$app/stores';

// see https://kit.svelte.dev/docs/load#rerunning-load-functions-manual-invalidation
import { invalidate, invalidateAll } from '$app/navigation';

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
// This needs to include the IDGames ROOT LEVEL! I'm sure it did before?
let browseHistoryData = {}

/** this is data from ID Games API */
export let data;
console.log("DATA AT TOP",data)


// initialise the history data at root:
if(!browseHistoryData["0"]){
    console.log("initial populateion of browseHistoryData:")
    browseHistoryData["0"] = { "id":data.currentId,"parent":-1,  "dir":data.data.content.dir, "file":data.data.content.file};
}
console.log(browseHistoryData["0"]);

// $: data = data;
// now SET this value to the store variable:
IDGamesDownloadKeyedList.set(browseHistoryData); // not needed because it's initialised as this value.

/** 
 * there is a 'feature' of this data such that a SINGLE directory entry is actually
 * represented with as an object, rather than an array of length 1 containing that object.
 * so I need to refactor in that case, so the processing code works as intended: 
 *
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
console.log(Array.isArray(data.data.content.dir))
*/

export let parentTitle = "Root";
// $:parentTitle = parentTitle;
parentTitle = parentTitle;
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
// BUT: this is using STALE DATA!!!!! I need to run this AFTER the data is returned
function setParent(){
    invalidateAll();        //TEST
    console.log("DATA IN CLICK HANDLER",data);
    /** 
     * because we may be navigating to the root of this section from elsewhere. 
     * */
    if(this.getAttribute("data-title")){
        parentTitle = this.getAttribute("data-title");
        parentTitle = parentTitle
        $currentParent = this.getAttribute("data-title");
        $currentTitle = this.getAttribute("data-title")

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



</script>

<!-- test -->
{console.log("DATA IN RENDER BLOCK",data)}

<h3>Directories {$currentParent}</h3>
{#if data.data && data.data.content && data.data.content.dir && Array.isArray(data.data.content.dir)}  <!-- this condition may need to be tightened - I think it is currently excluding single-entry results-->
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