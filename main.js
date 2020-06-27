let items = undefined;
let vid = null; // keep track of current video ID


function monitorNavigated() {
    // Check if on a video page
    let newVid = (new URL(location)).searchParams.get('v');
    if (!newVid || vid === newVid) return;

    // Find biased results
    if (!items) {
        items = document.querySelector("#related #items");
        items.insertAdjacentHTML('beforebegin', '<div id="upnext" class="style-scope ytd-compact-autoplay-renderer" style="padding-bottom:12px;">Filtered Recommandations</div> <button id="updatebutton">Update </button>');
        
        // button because it does not always work
        document.querySelector('#updatebutton').addEventListener("click", main);
    }

    // Assure, we have video suggestions
    if (newVid && !items) return;

    main();
    // create an observer to detect HTML change in recommanded videos
    // does not work yet : clashes with videos ordering
    var observer = new MutationObserver(function(mutations) {
        //console.log("changed !");
        //main();
    });
    // configuration of the observer:
    var config = { attributes: true, childList: true, characterData: true };
    // pass in the target node, as well as the observer options
    observer.observe(items, config);
}

document.addEventListener('yt-page-data-updated', monitorNavigated);
document.addEventListener('yt-next-continuation-data-updated', monitorNavigated);

monitorNavigated();

function main() {
    function onError(error) {
        console.log(`Error: ${error}`);
    }
    
    function vhide(item) {
        if (item.hide) {
            // console.log("Hiding videos..", items.childNodes.length);
            var b = true; // not item hidden
            for(s of items.childNodes) {
                if(s.getElementsByClassName("ytd-thumbnail-overlay-resume-playback-renderer").length > 0) {
                    s.style.display="none";
                    b = false;
                }
            }
            if(b) { setTimeOut(main, 5000);} // start again if no video is hidden
        }
    }

    function vsort() {

        toSort = Array.prototype.slice.call(items.childNodes, 0);
        toSort.sort(function (a, b) {
        return a.querySelector("#text.ytd-channel-name").innerText > b.querySelector("#text.ytd-channel-name").innerText;
    });
    items.innerHTML="";
    for(var i = 0, l = toSort.length; i < l; i++) {
        items.appendChild(toSort[i]);
    }
    }

    browser.storage.sync.get("hide").then(vhide, onError);
    browser.storage.sync.get("hide").then(vsort, onError);
}

main();

// button because it does not always work
document.querySelector('#updatebutton').addEventListener("click", main);