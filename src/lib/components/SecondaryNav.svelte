<script lang="ts">
    import { page } from '$app/stores';
    // import maps from "$lib/data/maps.json";
    let type:String|null = null;

    // a prop that has inherited the data ultimately from the layout server-load
    // function:
    export let data;
    $: data;

    // console.log("SECONDARY NAV COMPONENT: ",data)
    // console.log("SECONDARY NAV CURR PATH: ",$page.url.pathname)
    /** work out where we are */
    $: {
        if($page.url.pathname.indexOf('/maps') !== -1){
            type = "maps";
        }
        else if($page.url.pathname.indexOf('/snippets') !== -1){
            type="snippets"
        }
        else{
            type=null;
        }
    }
    // let composed_url = "/"
// https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog 
// here I interrogate the API to get the second level navigation data, and compose into a suitable markup format:
// maybe: https://stackoverflow.com/questions/72579031/how-to-fetch-data-inside-sveltekit-component-that-is-not-a-page
</script>
<div id="subnav">
    <!-- <p>TODO: Call database from the secondary nav!!</p> -->
    <ul class="pure-menu-list">
        {#if type!==null}
            <!-- {#each maps as entry}
                {#if entry.type === type}
                    <li class="pure-menu-item"> -->
                        <!-- if we are on a map/snippet page, we don't want a link: -->
                        <!-- {#if $page.url.pathname.indexOf(entry.slug) !== -1} -->
                            <!-- render a text only -->
                            <!-- <span>{entry.title}</span>
                        {:else}
                            {#if $page.url.pathname.indexOf(type+"/") === -1}
                            <a href="{type}/{entry.slug}" title="{entry.title}">{entry.title}</a>

                            {:else if $page.url.pathname.indexOf(type+"/") !== -1} -->
                            <!-- because we are already including the type in the path -->
                            <!-- <a href="{entry.slug}" title="{entry.title}">{entry.title}</a>
                            {/if}
                        {/if}
                    </li>
                {/if}
            {/each} -->

<!-- test secondary nav database call. NOTE: This is actually testing ALL data. ATM this is fine as only a small amount of data
but would get inefficient for larger sites. Can I pass a query string back? or a URL path part? This could be done withing the +page.svelte 
components, but then I run into duplicated code issues.  -->
            {#each data.data as entry}
                {#if entry.type === type}
                <li class="pure-menu-item">
                    <!-- if we are on a map/snippet page, we don't want a link: -->
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






