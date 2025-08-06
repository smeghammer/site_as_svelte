<script lang="ts">
    export let detail;  //type this
 
    /** extract the URL strings, and check them with the core JS URL() class */
    let processedImages = [];
    console.log(processedImages)
    $: {
        processedImages = [];
        for(let a=0;a<detail.allImages.length;a++){
            try{
                /** check if it is a URL */
                if(new URL(detail.allImages[a])){
                    processedImages.push(detail.allImages[a])
                }
            }
            catch(e){
                // not a valid URL
            }
        }
    }

$: processedImages = processedImages;
</script>

<h2>{detail.title}</h2>
<h3>
    {#if detail.IDGames_download}
        <a href="{detail.IDGames_download}" title="Download {detail.title}">Download</a>
    {/if}
</h3>
<p> {detail.description} </p>

<!-- TODO: do a hero image plus large thumbnails in a grid-->
{#if processedImages.length}
    {#each processedImages as image}
        <img src="{image}" alt="screenshots for {detail.title}"/>
    {/each}
{:else}
    <!-- [NO IMAGES FOUND - add default image here] -->
{/if}
