<script lang="ts">
    import { enhance } from '$app/forms'; // Import the enhance action

    //obtain this from the corresponding load function in +page.server.js (todo)
    export let data;
    $: data;    //refresh it
    // THIS IS KEY HERE: see https://vercel.com/guides/using-sveltekit-form-actions#accessing-the-returned-value-of-the-form-action
    export let form;
    console.log("form: ",form)
    $: entryId = null;  //  <-- this being reactive is key. it changes on switching the dropdown. See the bind: directive below!!
    let entryData;
    $: if(entryId){
        // console.log("GET DATA");
        for(let a=0;a<data.data.length;a++){
            if(data.data[a].id === parseInt(entryId)){
                entryData = data.data[a];
                /** also wnt to update the image array data to be a newline separated TSV */
                let txt = "";   //do as anonymous function!!
                for (let x=0;x<data.data[a].allImages.length;x++){
                    txt+=data.data[a].allImages[x]+"\n";
                }
                entryData.allImagesText = txt;
            }
        }
        // console.log(entryData);
    }
    
</script>
<div class="pure-u-1 pure-u-md-3-4 pure-u-lg-5-6">
    <h2>Admin</h2>
    <div class="pure-g">
        <div class="pure-u-1-4">
            <!-- TODO: the difficulty becomes when the back-end data is UPDATED as per the BTED code (the dropdown entries should update,
            the form has your client-side entered data already) -->
            <!-- <form method="POST" action="?/listdata"> -->
            <!-- <form method="POST" action="?/XXXlistdata" use:enhance> -->
                <!-- https://www.koderhq.com/tutorial/svelte/two-way-databinding/ -->
                <label for="entry">Entry: {entryId}</label>
                <select name="entry" id="entry" bind:value={entryId}>
                    <option value="0">Add new entry...</option>
                {#each data.data as datum}
                    <option value={datum.id}>{datum.title}</option>
                {/each}
                </select>
                <!-- <input type="submit" value="ok" name="ok"> -->
            <!-- </form> -->
        </div>
        <div class="pure-u-3-4"></div>

        <div class="pure-u-1">
            <!-- present data for selected entry: 
            TODO: To be a component!!
        
        also: https://stackoverflow.com/questions/74938552/how-to-not-reset-the-form-on-submit-with-useenhance-in-svelte
        - this is a callback on success, that will suppress the client-side action of clearing the form fields:
    -->
            {#if entryId}
            <div class="pure-g form">
                <form action="?/update" method="POST" use:enhance={() => {
                    return async ({update}) => {
                        await update({reset:false});
                    };
                }}>
                    <div class="pure-u-1"><h3>Edit</h3></div>
                    <div class="pure-u-1-4"><p><label for="title" title="The title of the item">Title</label></p></div>
                    <div class="pure-u-3-4"><p><input type="text" name="title" id="title" value="{entryData.title}"></p></div>
                    <div class="pure-u-1-4"><p><label for="type" title="Is this item for 'maps' or 'snippets'?">Type</label></p></div>
                    <div class="pure-u-3-4"><p><input type="text" name="type" id="type" value="{entryData.type}"></p></div><!-- radio buttons? -->
                    <div class="pure-u-1-4"><p><label for="description" title="A suitable description for this item">Description</label></p></div>
                    <div class="pure-u-3-4"><p><textarea name="description" id="description">{entryData.description}</textarea></div>
                    <div class="pure-u-1-4"><p><label for="imageUrl" title="The URL to the image used as the thumbnail">Main image</label></p></div>
                    <div class="pure-u-3-4"><p><input type="text" id="imageUrl" name="imageUrl" value="{entryData.imageUrl}"></div>
                    <div class="pure-u-1-4"><p><label for="slug" title="The path part used to identify this item. Must be unique for this type.">Slug</label></p></div>
                    <div class="pure-u-3-4"><p><input type="text" name="slug" id="slug" value="{entryData.slug}"></div>
                    <div class="pure-u-1-4"><p><label for="allImages" title="List of URLs to images (screenshots etc.) for this item.&#013;Each image URL must be on a separate line.">All images</label></p></div>
                    <div class="pure-u-3-4"><p><textarea name="allImages" id="allImages" class="textentry">{entryData.allImagesText}</textarea></div>
                    <div class="pure-u-1-4"><p>Save changes</p></div>
                    <div class="pure-u-3-4"><p><input type="submit" value="Update" /></p></div>
                </form>    
            </div>
            {:else}
            <div class="pure-g form">
                <div class="pure-u-1"><h3>New</h3></div>

                
            </div>
            {/if}

        </div>
    </div>

</div>

