<script lang="ts">
    // see https://rodneylab.com/sveltekit-json-import/
    // import maps from "$lib/data/maps.json";
    // import Summaries from "$lib/components/Summaries.svelte";
    import Summary from "$lib/components/Summary.svelte";
    const displayType:string = "snippets";

    /** @type {import('./$types').PageData} */ //because we are using +page.js (rather than +page.server.js - would be PageServerData type otherwise?)
    export let data;    //inferred from load function of +page.js
    console.log("in +page.svelte")
    // console.log(data);

</script>

<div class="pure-u-1 pure-u-md-5-6   pure-u-lg-3-4">
    <h2>Snippets</h2>
    <p>I like to make stuff work.</p>
    <p> I very quickly saw the benefits and possibilities of <a href="https://zdoom.org/wiki/ACS" title="ACS scripting">ACS scripting</a> and the 
        various <a href="https://zdoom.org/wiki/Category:Line-ready_specials" title="Line specials">line specials</a>. I'd never used it before so I needed to learn. As such, I generated 
        quite a few test maps to practice various Doom'ey features.</p>
    <p>Here you will find links to various such test maps with notes on what I was trying to achieve. They are ordered lexically because that is the default folder order in Windows
        Explorer. So they are not at all in the order I did them. I might to properly order them into some sort of learning timeline at some point but - meh, life's too %^&amp;*ing short. 
    </p>
    <div id="snippetsummaries">
        <div class="pure-g">
            
            {#each data.data as map}
            <!-- now use a Summary component that renders a SINGLE entry: -->
            <Summary {map} {displayType}/>
            <!-- the difficulty becomes when the bask-end data is UPDATED as per the BTED code -->
            {/each}

        </div>
    </div>
</div>

