<script type="ts">
    import TopNav from "$lib/components/TopNav.svelte";
    import SecondaryNav from "$lib/components/SecondaryNav.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import PageTitle from "$lib/components/PageTitle.svelte";
    // get the current page data. check for wads or snippets and pass appropriate flag
    let type="mapsx"
    export let data;
    $: data;    // from layout.server.js
    // console.log("LAYOUT SERVER LOAD DATA:");
    // console.log(data);  // this should be ALL DATA

    // globally set store:
    import {currentTitle} from "$lib/components/stores"; //read-only here
    $currentTitle = "";

</script>

<!-- title block -->
<PageTitle {data} />

<!-- top menu -->
<TopNav/>

<!-- conditional secondary nav. pass in the database data from the onload function. 
 
Doesnt work properly.

UPDATE> This can probably be done with JUST the layout data load? The logic of the 
return function is nasty - I need to separate out into different handlers to retrieve different data,
rather than have a single function with somewhat opaque argument logic.
-->
<!-- <SecondaryNav {data} /> -->

<!-- COMPONENT VAR TEST: -->

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
