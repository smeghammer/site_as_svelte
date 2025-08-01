<script lang="ts">
    import { enhance } from '$app/forms'; // Import the enhance action

    /** populated from load, but defaults for a new entry: */
    export let entryData = {
        "id" : 0,
        "type" : "",
        "title" : "",
        "download" : "",
        "description" : "",
        "imageUrl" : "",
        "allImagesText" : "", // because we are displaying a string
        "slug" : "",
        "IDGames_download" : ""
    };

    let title = "New";
    let endpoint = '?/new';
    if(entryData.id){
        title = "Edit";
        endpoint = '?/update';
    } 

    // for type dropdown
    let types:string[] = ['maps','snippets'];
    let sel:string = "";
</script>
<div class="pure-g form">
    <form action="{endpoint}" method="POST" use:enhance={() => {
        return async ({update}) => {
            await update({reset:false});
        };
    }}>
        <div class="pure-u-1"><h3>{title}</h3></div>
        
        <div class="pure-u-1-4"><p><label for="title" title="The title of the item">Title</label></p></div>
        <div class="pure-u-3-4">
        {#if entryData && entryData.id }
            <input type="hidden" id="id" name="id" value="{entryData.id}" />
        {/if}    
        <p><input type="text" name="title" id="title" value="{entryData.title}"></p></div>

        <div class="pure-u-1-4"><p><label for="type" title="Is this item for 'maps' or 'snippets'?">Type</label></p></div>
        <div class="pure-u-3-4"><p>
            <select id="type"name="type">
                {#each types as t}
                    {#if t===entryData.type} 
                    <option value="{t}" selected> {t} </option>
                    {:else}
                    <option value="{t}"> {t} </option>
                    {/if}
                {/each}
            </select>
        
        <div class="pure-u-1-4"><p><label for="description" title="A suitable description for this item">Description</label></p></div>
        <div class="pure-u-3-4"><p><textarea name="description" id="description">{entryData.description}</textarea></div>
        
        <div class="pure-u-1-4"><p><label for="imageUrl" title="The URL to the image used as the thumbnail">Main image</label></p></div>
        <div class="pure-u-3-4"><p><input type="text" id="imageUrl" name="imageUrl" value="{entryData.imageUrl}"></div>
        
        <div class="pure-u-1-4"><p><label for="IDGames_download" title="The URL of this item's download">Download link</label></p></div>
        <div class="pure-u-3-4"><p><input type="text" id="IDGames_download" name="IDGames_download" value="{entryData.IDGames_download}"></div>

        <div class="pure-u-1-4"><p><label for="slug" title="The path part used to identify this item. Must be unique for this type.">Slug</label></p></div>
        <div class="pure-u-3-4"><p><input type="text" name="slug" id="slug" value="{entryData.slug}"></div>
        
        <div class="pure-u-1-4"><p><label for="allImages" title="List of URLs to images (screenshots etc.) for this item.&#013;Each image URL must be on a separate line.">All images</label></p></div>
        <div class="pure-u-3-4"><p><textarea name="allImages" id="allImages" class="textentry">{entryData.allImagesText}</textarea></div>
        
        <div class="pure-u-1-4"><p>Save changes</p></div>
        <div class="pure-u-3-4"><p><input type="submit" value="{title}" /></p></div>
    </form>    
</div>