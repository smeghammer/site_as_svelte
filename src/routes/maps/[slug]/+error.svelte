<script>
    // see also https://stackoverflow.com/questions/76037679/what-are-the-differences-between-throw-error-and-return-fail-in-sveltekit
// from https://learn.svelte.dev/tutorial/error-pages:

/** import the page store, so we have access to the current page data, including errors */
import {page} from "$app/stores"
console.log($page)
</script>

<div class="pure-u-1 pure-u-md-5-6 pure-u-lg-3-4">
    <h2>ERROR {$page.status}</h2>
    <h3>{$page.error?.message}</h3>
    <p>A problem ocurred at the server</p>
</div>

