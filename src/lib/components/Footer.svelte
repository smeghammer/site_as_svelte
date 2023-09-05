<script>
// https://stackoverflow.com/questions/71789244/where-to-put-images-with-sveltekit
import doomlogo from '$lib/images/doomlogo.png';
import smeghammer from '$lib/images/smeghammer.png';
</script>

<div class="pure-g footer">
    <div class="pure-u-1-3">
        <ul>
            <li>© 2023 smeghammer</li>
            <li><a target="_blank" href="https://github.com/smeghammer/" title="Smeghammer at Github">Github</a></li>
            <li><a target="_blank" href="https://imotorhead.com" title="They played rock and roll">Motörhead</a></li>
        </ul>
    </div>
    <div class="pure-u-1-3 imgcentre">
        <img src="{doomlogo}" class="centre" alt="DooM logo">
    </div>
    <div class="pure-u-1-3">
        <img src="{smeghammer}" alt="Snaggletooth">
    </div>
</div>