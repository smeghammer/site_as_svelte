<script lang="ts">
    export let detail;  //type this
    // $: detail = detail;
    // console.log("in MapDetail:")
    // console.log(detail);

    /** extract the URL strings, and check them with the core JS URL() class */
    $: processedImages = [];
    $: for(let a=0;a<detail.allImages.length;a++){
        try{
            if(new URL(detail.allImages[a])){
                processedImages.push(detail.allImages[a])
            }
        }
        catch(e){
            // not a valid URL
            // console.log("caught invalid URL:")
            // console.log(e)
        }
    }
//     console.log("PROCESSED IMAGES:")
// console.log(processedImages)
processedImages = processedImages;
</script>

<h2>TITLE:{detail.title}</h2>
<h3>
    {#if detail.IDGames_download}
        IDGAMES DOWNLOAD: <a href="{detail.IDGames_download}" title="Download {detail.title}">Download</a>
    {/if}
</h3>
<p>DESCR:{detail.description}</p>
{#each detail.allImages as image}
    {#if processedImages.length}
        IMG: <img src="{image}" alt="screenshots for {detail.title}"/>
    {:else}
        NO IMAGES FOUND!
    {/if}
{/each}

{#if processedImages.length}
    {#each processedImages as image}
        PROESSED IMG: <img src="{image}" alt="screenshots for {detail.title}"/>
    {/each}
{:else}
    [NO IMAGES FOUND - add default image here]
{/if}