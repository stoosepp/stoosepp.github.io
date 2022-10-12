function showWeeklyHours() {
  embed("weeklyhours/weeklyhours.html");
}
function showWordCount() {
  embed("wordcount/wordcount.html");
}
function autoVids() {
  embed("autovideos/index.html");
}
function zoomMessages() {
  embed("whatson/index.html");
}

function embed(thisURL) {
  container = document.getElementsByClassName("container")[0];
  container.innerHTML = `<iframe src="${thisURL}" width="100%" height="600" style="border:none;">
    </iframe>`;
}
