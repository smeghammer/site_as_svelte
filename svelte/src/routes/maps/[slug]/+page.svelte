<script lang="ts">
    // see https://rodneylab.com/sveltekit-json-import/
    import MapDetail from "$lib/components/MapDetail.svelte";
    import SecondaryNavInline from "$lib/components/SecondaryNavInline.svelte";
    const displayType:string = "maps";

    // import { page } from '$app/stores'
    let detail = {"title":"Not found","description":"",allImages:[],"download":null}

    export let data;
    // console.log("DATA: ",data)
    // export let alldata
    // $: detail = data.data[0]
    $: detail = data.currentwad.data[0];

// https://www.makeuseof.com/sveltekit-routing-guide/
</script>

<div class="pure-u-1 pure-u-md-5-6 pure-u-lg-3-4">

    <!-- TODO: Implement 'self' determination -->
    <!-- <SecondaryNavInline {data}></SecondaryNavInline> -->
    <SecondaryNavInline { data }></SecondaryNavInline>

    <!-- {console.log(detail)} -->
    <!-- this also needs to inherit data from the root layout load function -->
    <MapDetail {detail}/>

</div>

