<script lang="ts">
// https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_stores
// note the comments about shorthand import/usage
import {currentParent} from "$lib/components/stores"
import {currentTitle} from "$lib/components/stores"

// https://learn.svelte.dev/tutorial/writable-stores
// see https://dev.to/jdgamble555/the-unwritten-svelte-stores-guide-47la
// This explicitly talks about the store object methods set() and get() methods as well as the subscribe() method.
// So HERE, I can build a variable and then SET the store tro that value. I Should them be able to GET the value in
// the bc component. 
import { IDGamesDownloadKeyedList } from "$lib/components/stores"

// build this, and then use it as a value for the store, using the SET() method
// https://dev.to/jdgamble555/the-unwritten-svelte-stores-guide-47la
// This needs to include the IDGames ROOT LEVEL! I'm sure it did before?

/** this is data from ID Games API */
/** 
 * See issue #2:
 * https://github.com/smeghammer/site_as_svelte/issues/2 
 */
export let data;

/** 
 * there is a 'feature' of this data such that a SINGLE directory entry is actually
 * represented with as an object, rather than an array of length 1 containing that object.
 * so I need to refactor in that case, so the processing code works as intended: 
 *
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
*/

export let parentTitle = "Root";
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
function setParent(){
    /** 
     * because we may be navigating to the root of this section from elsewhere. 
     * */
    if(this.getAttribute("data-title")){
        parentTitle = this.getAttribute("data-title");
        parentTitle = parentTitle
        $currentParent = this.getAttribute("data-title");
        // $currentTitle = this.getAttribute("data-title")     /** a STORE! */
        currentTitle.set(this.getAttribute("data-title"))
    }
}

function getSelfLinktext(pathStr){
    if(pathStr.lastIndexOf('/') === pathStr.length - 1){
        return(pathStr.split('/')[pathStr.split('/').length-2]);
    }
    else{
        return(pathStr.split('/')[pathStr.split('/').length-1]);
    }
    
}

</script>
<h3>Directories </h3>
{#if data.data && data.data.content && data.data.content.dir && Array.isArray(data.data.content.dir)}  <!-- this condition may need to be tightened - I think it is currently excluding single-entry results-->
<ul id="files_tree">
    {#each data.data.content.dir as thing}
        <li><a href="/dwbrowser/{thing.id}" data-title="{thing.name}" data-id="{thing.id}" title="{thing.name}" data-parentid="{data.currentId}"
        data-parent="{parentTitle}" on:click={setParent}>
        { getSelfLinktext(thing.name) }
        </a></li>
    {/each}
</ul>
{:else if data.data && data.data.content && data.data.content.dir && !Array.isArray(data.data.content.dir)}
<ul id="files_tree">
    <li>
        <a href="/dwbrowser/{data.data.content.dir.id}" data-title="{data.data.content.dir.name}"  data-id="{data.data.content.dir.id}" title="{data.data.content.dir.name}"
        data-parent="{parentTitle}"  data-parentid="{data.currentId}" on:click={setParent}>
            { getSelfLinktext(data.data.content.dir.name) }
        </a>
    </li>
</ul>
{:else}
<p>No sub-directories here!</p>
{/if}