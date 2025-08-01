<script lang="ts">

/** data that would be better off in a DB: */
    const repolist = [
        {'download':'https://github.com/smeghammer/hellbreach/blob/master/hellbrch.wad?raw=true',   'repo' : 'hellbreach',         'nicename':'Hellbreach',        'branch':'master','imagecount':12},
        {'download':'https://github.com/smeghammer/fuescher/blob/master/fuescher.wad?raw=true',   'repo' : 'fuescher',           'nicename':'Fuck You, Escher!', 'branch':'master','imagecount':30},
        {'download':'https://github.com/smeghammer/crushdepth/blob/master/crushdepth.wad?raw=true',   'repo' : 'crushdepth',         'nicename':'Crushdepth',        'branch':'master','imagecount':20,'pagekey':'0.0.10'},
        {'download':'https://github.com/smeghammer/belials_ruin/blob/master/belials_ruin.wad?raw=true',  'repo' : 'belials_ruin',       'nicename':'Belial\'s Ruin',    'branch':'master','imagecount':4},
        {'download':'https://github.com/smeghammer/islandfortress/blob/master/ifortress.wad?raw=true',   'repo' : 'islandfortress',     'nicename':'Island Fortress',   'branch':'master','imagecount':29},
        {'download':'https://github.com/smeghammer/rectilinia/blob/main/rectilinia.wad?raw=true',   'repo' : 'rectilinia',         'nicename':'Rectilinia',        'branch':'master','imagecount':38},
        {'download':'https://github.com/smeghammer/tubeworm/blob/master/tubeworm.wad?raw=true',   'repo' : 'tubeworm',           'nicename':'Tubeworm',          'branch':'master','imagecount':19},
        {'download':'https://github.com/smeghammer/departure/blob/master/compiled/departure.pk3?raw=true',   'repo' : 'departure',          'nicename':'Departure',         'branch':'master','imagecount':59},
        {'download':'https://github.com/smeghammer/CardinalSin/blob/master/compiled/cardinalsin.pk3?raw=true',  'repo' : 'CardinalSin',        'nicename':'Cardinal Sin',      'branch':'master','imagecount':27},
        {'download':'https://github.com/smeghammer/anitsotw/blob/master/compiled/anitsotw.pk3?raw=true',  'repo' : 'anitsotw',           'nicename':'A Nail in the Skin of the World',  'branch':'master','imagecount':22},
        {'download':'https://github.com/smeghammer/corporate-nightmare/blob/master/compiled/corp-nm.pk3?raw=true',   'repo' : 'corporate-nightmare','nicename':'Corporate Nightmare',  'branch':'master','imagecount':23}
    ];

    const imagebase = 'https://raw.githubusercontent.com/smeghammer/';
    const downloadbase = 'https://github.com/smeghammer/smeghammer.github.io/blob/master/';
    const repobase = 'https://github.com/smeghammer/';
    const thisrepo = null;
    const imagesuffix = '?raw=true';

    /* get random index of core repolist entry */
    function getRandomRepoIndex(){
        return Math.floor(Math.random() * repolist.length)
    };

    function getRandomImageIndex(repoindex){
        return Math.floor(Math.random() * repolist[repoindex].imagecount);
    };

    /*
     * need to build: 
     * https://raw.githubusercontent.com/smeghammer/CardinalSin/master/screenshots/10.png
     *
     * 'https://raw.githubusercontent.com/smeghammer' + reponame + '/' + branchname + '/screenshots/' + imagenum + '.png'
    * */
    function buildImageUrl(reponame,branch,imagenum){
        return(imagebase + reponame + '/' + branch + '/screenshots/' + imagenum + '.png');
    };
    let img_url;
    let currRepo;
    function showImages(){
        /* https://stackoverflow.com/questions/3646036/preloading-images-with-javascript **/
        let currRepoIndex = getRandomRepoIndex();
        currRepo = repolist[currRepoIndex];
        let currImageIndex = getRandomImageIndex(currRepoIndex);
        img_url = buildImageUrl(currRepo.repo, currRepo.branch,currImageIndex+1);
            
        setInterval(function(){
           currRepoIndex = getRandomRepoIndex();
           currRepo = repolist[currRepoIndex];
           currImageIndex = getRandomImageIndex(currRepoIndex);
           img_url = buildImageUrl(currRepo.repo, currRepo.branch,currImageIndex+1);
        },15000);
    }
    showImages();
</script>

<div id="splash">
    <a href="https://github.com/smeghammer/{currRepo.repo}/" title="Click to open repo '{currRepo.nicename}'" target="_blank">
        <img src="{img_url}" alt="Random Doom map image">
    </a>
</div>

<style>
#splash{
    background-color: #000;
    margin: 5px;
    margin-right: 8px;
}
#splash  img{
    border: 1px solid white;
}

@media screen and (min-width:48em){
       #splash{
        margin: 0px;
    }
}
</style>