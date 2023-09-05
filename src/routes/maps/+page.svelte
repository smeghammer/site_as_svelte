<script lang="ts">
    // see https://rodneylab.com/sveltekit-json-import/
    // I am no longer using these because the data is loaded from the JSON data
    // via the +page.js file.
    // import maps from "$lib/data/maps.json";
    // import Summaries from "$lib/components/Summaries.svelte";
    import Summary from "$lib/components/Summary.svelte";
    
    /** 
     * IMPORTANT! A load function on +page.js or +page.server.js run by default, and return a 
     * default 'data' - hence no explicit import here 
     * 
     * NOTE: It seems that page.js takes precedence over page.server.js if both are present and expose the same action
     * */

    /** @type {import('./$types').PageData} */ //because we are using +page.js (rather than +page.server.js - would be PageServerData type otherwise?)
    export let data;    //inferred from load function of +page.js
    //console.log(data);
    const displayType:string = "maps";
</script>

<div class="pure-u-1 pure-u-md-5-6 pure-u-lg-3-4">
    <h2>My WADs</h2>
    <p>
        I started mapping again in April 2020, just after the whole COVID-19
        thing started and I was put on furlough from my work.
    </p>
    <p>Here you will find links to my completed maps, with screenshots.</p>

    <h3>Quick Summaries</h3>
    <div id="mapsummaries">
        <div class="pure-g">
            <!-- Summaries is an iterative component. May not be the best option -->
            <!-- <Summaries {maps} {displayType}/> -->

<!-- using data from the load function instead:  -->
{#each data.data as map}
    <!-- now use a Summary component that renders a SINGLE entry: -->
    <Summary {map} {displayType}/>

{/each}

        </div>
    </div>
</div>

