<script lang="ts">
    import IdGamesListContents from "$lib/components/IDGamesListContents.svelte";
    import IDGamesListFiles from "$lib/components/IDGamesListFiles.svelte";
    import IDGamesPath from "$lib/components/IDGamesPath.svelte";
    export let data;
    $: data = data; //because we will pass additional args on browsing
    console.log(data)

    /** test of https://stackoverflow.com/questions/66698656/access-variable-in-a-component-updated-by-a-different-component-in-svelte 
     * to allow sharing vars between sibling components
     */
    // export let fish;   


    /** 
     * - when we first load, we are on level 1
     * - the BC is a small array, with each entry having a depth
     * - the LINKS are all to the depth BELOW the current parent.
     * - So all entries below ID=0 are > level 1  
     * 
     */


    // export let pathArray:number[] = [] // because components will need this 
    // $: pathArray  = pathArray;
    // $: {    // REACTIVE BLOCKS ARE KEY!!!!!
    //     console.log("[page] currentId: ",data.currentId)
    //     pathArray.push(data.currentId);
    //     console.log(pathArray);
    //     console.log(pathArray[pathArray.length-1]);
    //     console.log(data.currentId);
    // }

</script>

<div class="pure-u-1 pure-u-md-3-4 pure-u-lg-5-6">
    <h2>ID Games (slug)</h2>


    <p>PATH ARRAY</p>
    <!-- the path component needs to render links with incremental depth attribute values, so going BACK will reset -->
    <IDGamesPath {data} />
    
    <!-- increment the depth on eack click. Requires that the currently rendered links have an appropriate attribute value set. -->
    <IDGamesListFiles {data }  />

    <!-- 
    here, we sometimes get a list, and sometimes get entries. Sometimes we also get BOTH (e.g. id=44) 
    so I need a render LIST (the /dir/ path) component for further browsing, AND i need a THING renderer for the - er -
    things (the /file/ path )...

    TODO: Ideally, I want to build the URL slug(s) as a variable length path and use that as my depth - it also looks better
     - see https://stackoverflow.com/questions/71711016/can-i-make-custom-nested-slugs-in-sveltekit??
    -->

    <IdGamesListContents {data}  />



</div>

