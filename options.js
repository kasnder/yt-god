function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    hide: document.querySelector("#hide").checked
  });
  document.querySelector("#saved").innerText = "saved";
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#hide").checked = result.hide || true;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.sync.get("hide");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);