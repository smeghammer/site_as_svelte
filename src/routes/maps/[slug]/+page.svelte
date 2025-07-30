<script lang="ts">
    // see https://rodneylab.com/sveltekit-json-import/
    import MapDetail from "$lib/components/MapDetail.svelte";
    const displayType:string = "maps";

    // import { page } from '$app/stores'
    let detail = {"title":"Not found","description":"",allImages:[],"download":null}

    export let data;
    //console.log("DATA: ",data)
    $: detail = data.data[0]
// https://www.makeuseof.com/sveltekit-routing-guide/
</script>

<div class="pure-u-1 pure-u-md-5-6 pure-u-lg-3-4">
    
    <!-- this also needs to inherit data from the root layout load function -->
    <MapDetail {detail}/>

</div>

