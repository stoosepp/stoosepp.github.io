export function refreshVideo() {
  const videoIDs = [
    "OJWJE0x7T4Q",
    "jV11Xbc914",
    "0aqLwHP4y6Q",
    "PIb6AZdTr-A",
    "-0bYWnP3jH4",
  ];
  var randomVideoID = videoIDs[Math.floor(Math.random() * videoIDs.length)];

  var buttonSpan = document.getElementById("button");
  document.getElementsByClassName("embed-container")[0].innerHTML =
    '<iframe src="https://www.youtube.com/embed/' +
    randomVideoID +
    '"title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
