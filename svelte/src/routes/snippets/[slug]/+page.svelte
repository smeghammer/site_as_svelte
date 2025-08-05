<script lang="ts">
    // see https://rodneylab.com/sveltekit-json-import/
    // import maps from "$lib/data/maps.json";
    import MapDetail from "$lib/components/MapDetail.svelte";
    import SecondaryNavInline from "$lib/components/SecondaryNavInline.svelte";
    
    const displayType:string = "maps";

    // import { page } from '$app/stores'
    let detail = {"title":"Not found","description":"",allImages:[]}
    let dl_link;
    // TODO: rework data to key on slug - that way I don't need to loop.
    // for(let a=0;a<maps.length;a++){
    //     if(maps[a].slug === $page.params.slug){
    //         detail = maps[a];
    //     }
    // }
// https://www.makeuseof.com/sveltekit-routing-guide/

export let data; // from layout load() function
// console.log("DATA: ",data.currentwad)
// console.log("DATA: ",data.allmaps)
// $: detail = data.data[0]
$: detail = data.currentwad.data[0];
</script>

<div class="pure-u-1 pure-u-md-5-6 pure-u-lg-3-4">

    <!-- TODO: Implement 'self' determination -->
    <!-- <SecondaryNavInline {data}></SecondaryNavInline> -->
    <SecondaryNavInline { data }></SecondaryNavInline>
    
    
    <MapDetail {detail}/>
 
</div>

