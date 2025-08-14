<script lang="ts">
    // see https://rodneylab.com/sveltekit-json-import/
    import MapDetail from "$lib/components/MapDetail.svelte";
    /** this includes data from the layout server load function: */
    export let data;
    
    let detail = {"title":"Not found","description":"",allImages:[],"download":null}
    
    $: detail = data.currentwad.data[0];
    
// https://www.makeuseof.com/sveltekit-routing-guide/
</script>

<div class="pure-u-1 pure-u-md-5-6 pure-u-lg-3-4">
    <MapDetail {detail}/>
</div>

