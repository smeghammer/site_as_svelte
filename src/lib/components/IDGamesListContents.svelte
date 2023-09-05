<script lang="ts">
    export let data;
</script>

<!-- test -->
<h3>Contents</h3>
<!--
    'thing' looks like this:
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

TODO: Download link
-->

{#if data.data && data.data.content && data.data.content.file && data.data.content.file[0]}
    {#each data.data.content.file as thing}
    <p>{thing.title} </p>
    {/each}
{:else}
<p>No entries for this path {data.data.content.file}</p>
{/if}

