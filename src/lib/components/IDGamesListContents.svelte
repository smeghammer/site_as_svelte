<script lang="ts">
    export let data;
</script>
<!--
    a 'thing' looks like this:
{
    "id": 15372,
    "title": "HOKUTO NO DOOM - Level designer resource kit",
    "dir": "themes/",
    "filename": "hokuto.zip",
    "size": 3126262,
    "age": 1216357200,
    "date": "2008-07-18",
    "author": "Benoit Spacher (project manager)",
    "email": "iceman_57@hotmail.com",
    "description": "First adaptation ever of the \"Hokuto No Ken\" comic/TV animation in the DOOM engine. New textures, new items, new sprites, new weapons, new sounds, and new music. The project uses the most familiar \"Hokuto No Ken\" characters (also known as \"Fist of the North Star\" and \"Ken il Guerriero\") from TV episodes 1 to 22 (manga 1&2). (See end of file for detailed description).",
    "rating": 2.6667,
    "votes": 48,
    "url": "https://www.doomworld.com/idgames/themes/hokuto",
    "idgamesurl": "idgames://themes/hokuto.zip"
}
TODO: Make overlay to show the above details/description?
-->
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

