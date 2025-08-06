<script lang="ts">
    // see https://rodneylab.com/sveltekit-json-import/
    // import maps from "$lib/data/maps.json";
    import MapDetail from "$lib/components/MapDetail.svelte";
    import SecondaryNavInline from "$lib/components/SecondaryNavInline.svelte";
    // const displayType:string = "maps";

    let detail = {"title":"Not found","description":"",allImages:[]}

    /** this includes data from the layout server load function: */
    export let data;

    /** THIS data comes from the page server load function: */
    $: detail = data.currentwad.data[0];
    
    // https://www.makeuseof.com/sveltekit-routing-guide/
</script>

<div class="pure-u-1 pure-u-md-5-6 pure-u-lg-3-4">
    <!-- <SecondaryNavInline { data }></SecondaryNavInline> -->
    
    <MapDetail {detail}/>
</div>

