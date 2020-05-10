let items = undefined;
let vid = null; // keep track of current video ID

function monitorNavigated() {
    // Check if on a video page
    let newVid = (new URL(location)).searchParams.get('v');
    if (!newVid || vid === newVid) return;

    // Find biased results
    if (!items)
        items = document.querySelector("#related #items");

    // Assure, we have video suggestions
    if (newVid && !items) return;

    items.insertAdjacentHTML('beforebegin', '<p>Let\'s do some exciting stuff.</p>');
}

document.addEventListener('yt-page-data-updated', monitorNavigated);
monitorNavigated(); // in case, this extension is loaded after first event