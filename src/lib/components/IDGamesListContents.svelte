<script lang="ts">
    export let data;
</script>

<h3>Downloads</h3>
{#if data.data && data.data.content && data.data.content.file && Array.isArray(data.data.content.file)}
    <ul>
        {#each data.data.content.file as thing}
            <li><a href="{thing.url}" title="{thing.title}" target="_blank">{thing.title}</a></li> 
        {/each}
    </ul>
{:else if data.data && data.data.content && data.data.content.file && !Array.isArray(data.data.content.file)}
    <ul>
        <li>
            <a href="{data.data.content.file.url}" title="{data.data.content.file.title}" target="_blank">{
                data.data.content.file.title}
            </a>
        </li> 
    </ul>
{:else}
<p>No downloads in this sub-directory!</p>
{/if}

