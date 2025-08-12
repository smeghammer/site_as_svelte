<script lang="ts">
    /** this gives us access to various properties: */
    import { page } from "$app/stores";
    $: current_route = $page.url.pathname
    /** and see https://svelte.dev/tutorial/classes re syntax below*/

    // see https://eternaldev.com/blog/5-ways-to-perform-for-loop-in-svelte-each-block
    const topnavRoutes = [
        {"route":"/","linktext":"Home"},
        {"route":"/maps","linktext":"My WADs"},
        {"route":"/snippets","linktext":"Snippets"},
        {"route":"/links","linktext":"Links"},
        {"route":"/dwbrowser","linktext":"ID Games"},
        {"route":"/howtos","linktext":"Howto's"},
        {"route":"/wad-archive","linktext":"WAD Archive"}
    ]   //to get from DB?
</script>
<div class="pure-g">
    <div class="pure-u-1 pure-u-md-1-8 pure-u-lg-2-24"></div>
    <div class="pure-u-1 pure-u-md-3-4 pure-u-lg-20-24 menubar">
        <div class="pure-menu pure-menu-horizontal centre" id="menubar">
            <ul class="pure-menu-list">
                {#each topnavRoutes as route}
                    {#if route.route === "/"}
                        <li class="pure-menu-item" class:homehilight={current_route===route.route}><a href="{route.route}" title="{route.linktext}">{route.linktext}</a></li>
                    {:else}
                        {#if route.route === current_route}
                            <li class="pure-menu-item" class:hilight={current_route.indexOf(route.route) !== -1}><span>{route.linktext}</span></li>
                        {:else}
                            <li class="pure-menu-item" class:hilight={current_route.indexOf(route.route) !== -1}><a href="{route.route}" title="{route.linktext}">{route.linktext}</a></li>
                        {/if}
                    {/if}
                {/each}
            </ul>
        </div>
    </div>
    <div class="pure-u-1 pure-u-md-1-8 pure-u-lg-2-24"></div>
</div>

<style>

/** MQ's moved back to CSS file */
div#menubar{
	white-space: normal;
}

div#menubar li {
    padding-left: 15px;
    /* font-size: medium; */
}
#menubar > ul > li.pure-menu-item.homehilight > a{
	text-decoration: underline;
}
#menubar > ul > li.pure-menu-item.hilight > a{
	color: #c00000;
	text-decoration: underline;
}
/** 'hilight' is actually a global style. is it best to leave in the main CSS? */
#menubar > ul > li.hilight {
    font-weight: bold;
}
</style>