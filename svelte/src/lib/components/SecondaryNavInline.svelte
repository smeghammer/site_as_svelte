<script lang="ts">
    import { page } from '$app/stores';
    let type:String|null = null;

    /** this is coming form the ROUTE and LAYOUT loaders!! */
    export let data;
    $: data;

    /** work out where we are */
    $: {
        if($page.url.pathname.indexOf('/maps') !== -1){
            type = "maps";
        }
        if($page.url.pathname.indexOf('/snippets') !== -1){
            type="snippets"
        }
    }
// https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog 
// here I interrogate the API to get the second level navigation data, and compose into a suitable markup format:
// maybe: https://stackoverflow.com/questions/72579031/how-to-fetch-data-inside-sveltekit-component-that-is-not-a-page
</script>
<div id="subnav_inline">

    <ul class="pure-menu-list">
        <!-- weird - we are getting a top level attribute of `data.data` - which holds the maps data. 
         I am not actually building this, so where TF is it coming from??? from the LAYOUT load function. -->
        {#if type!==null}
            <!-- to account for the changed data structure, get the correct data... -->
            {#each data.allmaps.data as entry}
                {#if entry.type === type}
                <li class="pure-menu-item">
                    {#if $page.url.pathname.indexOf(entry.slug) !== -1}
                        <span>{entry.title}</span>
                    {:else}
                        {#if $page.url.pathname.indexOf(type+"/") === -1}
                            <a href="{type}/{entry.slug}" title="{entry.title}">{entry.title}</a>
                        {:else if $page.url.pathname.indexOf(type+"/") !== -1}
                            <a href="{entry.slug}" title="{entry.title}">{entry.title}</a>
                        {/if}
                    {/if}
                </li>
                {/if}
            {/each}
        {/if}
    </ul>
</div>






