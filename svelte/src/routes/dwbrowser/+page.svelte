<script lang="ts">
    import { currentParent } from "$lib/components/stores";
// The key is here I think.
// This needs to have a click handler that resets cuurent_title and/or $currentPaent
// This may have mileage. leaving here TODO:
function resetCurrentTitle(){
    console.log("BEFORE: ", $currentParent)
    $currentParent = "TESTY";
    console.log("AFTER: ", $currentParent)
}

</script>

<div class="pure-u-1 pure-u-md-5-6 pure-u-lg-3-4">
    <h2>ID Games browser</h2>
    <p>
        <a href="/dwbrowser/0" title="Root" on:click={resetCurrentTitle}>Browse</a>
    </p>
</div>

