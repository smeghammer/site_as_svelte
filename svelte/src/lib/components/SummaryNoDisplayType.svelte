<script lang="ts">
/** 
 * This component expects the correct array of data - it is NOT filtering on displayType.
 * We are still using displayType to construct the URL of the map. This will likely change
 */

export let map;
export let displayType

</script>

<div class="pure-u-1 pure-u-md-2-3">
    <h3>
        <a title={map.title} href={displayType}/{map.slug}>{map.title}</a>
    </h3>
    <p> {map.description} </p>
</div>
<div class="pure-u-1 pure-u-md-1-3">
    <!-- TODO: Do detail links as SLUGS - that way, we are not dependent on existing routes
    https://stackoverflow.com/questions/65930303/sveltekit-how-do-i-do-slug-based-dynamic-routing
    https://kit.svelte.dev/docs/routing
    https://joyofcode.xyz/sveltekit-routing#dynamic-routes
    -->
    <a title={map.description} href={displayType}/{map.slug}>
        <img src={map.imageUrl} class="thumbnail" alt="thumbnail" />
    </a>
</div>
