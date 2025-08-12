<script lang="ts">
    // export let ssr = false;
    /** 
     * This uses the load data from the LAYOUT server.js because it is a component of the +layout.svelte page
     */
    import { linktextMapper } from "$lib/data/linktextMapper";  // now typed in .TS file
    import { page } from "$app/stores";

$: current_linktext = linktextMapper[$page.url.pathname];
</script>

<div class="pure-g">
    <div class="pure-u-1 pure-u-md-1-8 pure-u-lg-1-12"></div>
    <div class="pure-u-1 pure-u-md-3-4 pure-u-lg-5-6">
        {#if current_linktext}
            <h1 class="centre">[st]{current_linktext}</h1>
        {/if}
    </div>
    <div class="pure-u-1 pure-u-md-1-8 pure-u-lg-1-12"></div>
</div>