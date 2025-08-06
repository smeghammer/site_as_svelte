<script lang="ts">
    import { page } from '$app/stores';
    // import maps from "$lib/data/maps.json";
    let type:String|null = null;

    // a prop that has inherited the data ultimately from the layout server-load
    // function:
    export let data;
    $: data;


    /** work out where we are */
    $: {
        /** initialise `type` to not show nav if not on given route: */
        type = null;
        
        /** handle `/maps` route */
        if($page.url.pathname.indexOf('/maps') !== -1){
            type = "maps";
        }
        
        /** handle `/snippets` route */
        if($page.url.pathname.indexOf('/snippets') !== -1){
            type="snippets"
        }
    }
// https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog 
// here I interrogate the API to get the second level navigation data, and compose into a suitable markup format:
// maybe: https://stackoverflow.com/questions/72579031/how-to-fetch-data-inside-sveltekit-component-that-is-not-a-page
</script>

<!-- This now WORKS because the back-end API, called by the +layout.server.js, is   -->
<div id="subnav">
    <ul class="pure-menu-list">
        {#if type!==null}
        <!-- 
        test secondary nav database call. NOTE: This is actually testing ALL data. ATM this is fine as only a small amount of data
        but would get inefficient for larger sites. Can I pass a query string back? or a URL path part? This could be done withing the +page.svelte 
        components, but then I run into duplicated code issues. 
        The inline secondary vav component may be a better solution because it separates out the type of return data, so we only get `map`s or 
        `snippet`s, not both  -->
            {#each data.data as entry}
                {#if entry.type === type}
                <li class="pure-menu-item">
                    {#if $page.url.pathname.indexOf(entry.slug) !== -1}
                        <!-- render a text only -->
                        <span>{entry.title}</span>
                    {:else}
                        {#if $page.url.pathname.indexOf(type+"/") === -1}
                            <a href="{type}/{entry.slug}" title="{entry.title}">{entry.title}</a>
                        {:else if $page.url.pathname.indexOf(type+"/") !== -1}
                            <!-- because we are already including the type in the path -->
                            <a href="{entry.slug}" title="{entry.title}">{entry.title}</a>
                        {/if}
                    {/if}
                </li>
                {/if}
            {/each}
        {/if}
    </ul>
</div>
