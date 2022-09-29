function showWeeklyHours() {
  embed("weeklyhours/weeklyhours.html");
}
function showWordCount() {
  embed("wordcount/wordcount.html");
}
function random80sVideo() {
  embed("80smv/random80svideo.html");
}

function embed(thisURL) {
  container = document.getElementsByClassName("container")[0];
  container.innerHTML = `<iframe src="${thisURL}" width="100%" height="600" style="border:none;">
    </iframe>`;
}
