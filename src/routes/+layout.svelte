<script type="ts">
    import TopNav from "$lib/components/TopNav.svelte";
    import SecondaryNav from "$lib/components/SecondaryNav.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import PageTitle from "$lib/components/PageTitle.svelte";
    // get the current page data. check for wads or snippets and pass appropriate flag
    let type="mapsx"
    export let data;
    $: data;    // from layout.server.js
    //console.log("LAYOUT SERVER LOAD DATA: ",data);

    
</script>

<!-- title block -->
<PageTitle {data} />

<!-- top menu -->
<TopNav/>

<!-- conditional secondary nav. pass in the database data from the onload function -->
<SecondaryNav {data} />

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
