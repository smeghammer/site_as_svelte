<script lang="ts">
    // see https://rodneylab.com/sveltekit-json-import/
    // import Summary from "$lib/components/Summary.svelte";
    // import SecondaryNavInline from "$lib/components/SecondaryNavInline.svelte";
    // import SummaryNoDisplayType from "$lib/components/SummaryNoDisplayType.svelte";

    /** 
     * IMPORTANT! A load function on +page.js or +page.server.js run by default, and return a 
     * default 'data' - hence no explicit import here 
     * 
     * NOTE: It seems that page.js takes precedence over page.server.js if both are present and expose the same action
     * */

    // /** @type {import('./$types').PageData} */ //because we are using +page.js (rather than +page.server.js - would be PageServerData type otherwise?)
    // export let data;    //inferred from load function of +page.js
    // const displayType:string = "maps";
</script>

<div class="pure-u-1 pure-u-md-5-6 pure-u-lg-3-4">

    <!-- <SecondaryNavInline {data}></SecondaryNavInline> -->

    <h2>ID Games browser</h2>
    <p>
        <a href="/dwbrowser/0" alt="Root">Browse</a>
    </p>

    <!-- <h3>Quick Summaries</h3>
    <div id="mapsummaries">
        <div class="pure-g"> -->

            <!-- using data from the load function instead:  -->
            <!-- {#each data.data as map} -->
                <!-- now use a Summary component that renders a SINGLE entry: -->
                <!-- <Summary {map} {displayType}/>
            {/each} -->


            <!-- or, using ROUTE data: -->
            <!-- {#each data.allmaps.data as map}
            <SummaryNoDisplayType {map} {displayType} />
            {/each} -->
        <!-- </div>
    </div> -->
</div>

