<script lang="ts">
    export let detail;  //type this
    // $: detail = detail;

</script>

<h2>{detail.title}</h2>
<h3>
    {#if detail.IDGames_download}
        <a href="{detail.IDGames_download}" title="Download {detail.title}">Download</a>
    {/if}
</h3>
<p>{detail.description}</p>
{#each detail.allImages as image}
    <img src="{image}" alt="screenshots for {detail.title}"/>
{/each}
