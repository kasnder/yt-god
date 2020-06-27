function saveOptions(e) {
    e.preventDefault();
    chrome.storage.sync.set({
        hide: document.querySelector("#hide").checked,
        sort: document.querySelector("#sort").checked,
        long: document.querySelector("#long").checked
    });
    document.querySelector("#saved").innerText = "saved";
}

function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector("#hide").checked =
            (result.hide === undefined) ? true : result.hide;

        document.querySelector("#sort").checked =
            (result.sort === undefined) ? false : result.sort;

        document.querySelector("#long").checked =
            (result.long === undefined) ? true : result.long;
    }

    chrome.storage.sync.get(['hide', 'sort', 'long'], setCurrentChoice);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);