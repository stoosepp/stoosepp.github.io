function getResolution() {
  let resolution = document.getElementById("screenres");
  resolution.innerHTML =
    "Your screen resolution is: " + screen.width + "x" + screen.height;
}
var elem = document.getElementById("image-div");
//Fullscreen stuff
window.addEventListener("load", (event) => {
  console.log(elem.width);
});

var elem = document.getElementsByClassName("tracking")[0];
/* When the openFullscreen() function is executed, open the video in fullscreen.
Note that we must include prefixes for different browsers, as they don't support the requestFullscreen property yet */
function openFullScreen() {
  console.log(elem);
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}
