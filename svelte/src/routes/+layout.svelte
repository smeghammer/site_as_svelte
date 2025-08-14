<script type="ts">
/**
 * For issue #48 'named slots in layout':
 * 
 * https://github.com/sveltejs/kit/issues/627#issuecomment-1458539744 (SK author)
 * 
 * It's not possible with Svelte 4
 * 
 * But, this answer describes how ALL page data is available to the layout page - implying
 * that LOGIC on the layout should be restricted to rendering incoming data.
 * 
 * It ALSO describes how, with `+page.js` AS WELL AS `+page.server.js` at a given root, the 
 * return `load` data can include COMPONENTS as well. Specifically, the 
 * 
 * `<svelte:component this={$page.data.yourcomponentname}>`
 * 
 * This is worth investigating further...
 * 
 * I could - maybe - therefore return different topnav components from the route, and
 * render that here?
 * 
 * Other useful refs (maybe)
 * 
 *  - https://github.com/sveltejs/kit/issues/9775
 *  - https://svelte.dev/tutorial/kit/using-both-load-functions
*/
    import TopNav from "$lib/components/TopNav.svelte";
    import SecondaryNav from "$lib/components/SecondaryNav.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import PageTitle from "$lib/components/PageTitle.svelte";
    // get the current page data. check for wads or snippets and pass appropriate flag

    export let data;
    $: data;    // from layout.server.js

    // globally set store:
    import {currentTitle} from "$lib/components/stores"; //read-only here
    $currentTitle = "";
</script>

<!-- title block -->
 <!--
 It seems that although layout load data is available to the ROUTE (as well as the local route load data)
 route load data is NOT AVAILABLE to the LAYOUT page. There are various, not particularly clear, refs 
 I found about this. 
 
 Therefore, we cannot do the following unless we also have a +layout.server.js loading the expected data.
 i.e. the `data` below is ONLY the layout loaded data. This caused a LOT of confusion when trying to remove
 the dual loaded front-end data. I will update the returned data properties to make it clear form whence the
 data originates (layout or route).
 -->
<PageTitle {data} />

<!-- top menu -->
<TopNav/>

<!--
conditional secondary nav. pass in the database data from the onload function. 

UPDATE: This can probably be done with JUST the layout data load? 
Also, the logic of the return function is nasty - I need to separate out into different handlers to retrieve different data,
rather than have a single function with somewhat opaque argument logic.
-->
<SecondaryNav {data} />

<!-- contents -->
<div class="pure-g contents">
    <div class="pure-u-1 pure-u-md-1-8 pure-u-lg-1-12"></div>

    <!-- page content is injected here -->
    <slot></slot>
    
    <div class="pure-u-1 pure-u-md-1-8 pure-u-lg-1-12"></div>
</div>
<!-- inject footer -->
<div id="footer">
    <Footer />
</div>
