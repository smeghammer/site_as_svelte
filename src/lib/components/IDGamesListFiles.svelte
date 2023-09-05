<script lang="ts">
    /** import my stores for BC and parent data, for WRITING in this component: */
    // import {breadcrumb} from "$app/stores"
    // https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_stores
    // note the comments about shorthand import/usage
    import {currentParent} from "$lib/components/stores"
    /** this is data from ID Games API */
    export let data;
    $: data = data;

    export let parentTitle = "Root";
    $:parentTitle = parentTitle;
    /**  this is where we are coming FROM. We need to retail the name so I can populate the BC - the ID Games API doesn't have
     * data about SELF.
     * Here, I am using a sveltekit STORE (see ref above) and the value set here on click of the navigation item (from a data-attribute)
     * is set to a store variable which is read by another component (a sibling, the IDGamesPath.svelte breadcrumb module) on this page.
     * I am doing this because the IDGames API does not show info about SELF, only direct childs, of a given ID, so I need to retain the 
     * section name and ID from the parent API entity. The ID is OK becaise that is the parameter passed into the API call, but I need to 
     * also extract and retain the path string in order to display the breadcrumb properly.
     * 
     * Also, I need to ensure that the array is properly truncated on browsing BACK UP the tree. TODO:
    */
    $currentParent = "/";
//  this is called ONCE  -OK.
    function setParent(){
        /** 
         * because we may be navigating to the root of this section. 
         * */
        if(this.getAttribute("data-title")){
            console.log("data-title: ",this.getAttribute("data-title"));
            parentTitle = this.getAttribute("data-title");
            parentTitle = parentTitle
            $currentParent = this.getAttribute("data-title");
        }
    }
    
</script>

<!-- test -->
<h3>Directories {$currentParent}</h3>
<!-- <p>TODO: incorporate the proper tree builder!</p> -->
XX{parentTitle} YY{$currentParent} ZZ
{#if data.data && data.data.content && data.data.content.dir}  <!-- this condition may need to be tightened -->
<ul>
    {#each data.data.content.dir as thing}
        <li><a href="/dwbrowser/{thing.id}" data-title="{thing.name}" title="{thing.name}"
        data-parent="{parentTitle}" on:click={setParent}>{thing.name}</a></li>
    {/each}
</ul>
{:else}
<p>NO SUBDIRS here</p>
{/if}