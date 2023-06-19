window.addEventListener("load", (event) => {
  let result = document.getElementById("deviceAlert");
  let instruction = document.getElementById("interactionType");
  const isTouchDevice = () => {
    try {
      document.createEvent("TouchEvent");
      result.innerHTML = `touch-based device, like a touch-enabled laptop, tablet or smartphone.`;
      instruction.innerHTML = `Touch`;
    } catch (error) {
      result.innerHTML = `mouse-based device, like a desktop or laptop computer.`;
      instruction.innerHTML = `Mouse`;
    }
  };
  isTouchDevice();
});

//initialize arrays
var delayedXPos = new Array();
var delayedYPos = new Array();
var delayedTime = new Array();

var xPos = new Array();
var yPos = new Array();

//initialize time variables
var initTime = new Date().getTime();
var timer_is_on = 0;
var t;

//time interval for data collection in ms
//10 ms = 1/100 of a second
//100ms = 1/10 of a second
var dt = 50;

//flag signaling whether getMousePosition has been called
mp_called = 0;

//function that determines action when mouse moves
//18 May 2023 - This gets ABSOLUTE position in the div. Given we're switching to full screen, we need relative positions
/*
function getMousePosition(mp) {
  var divPos = getPosition(document.getElementsByClassName("tracking")[0]);
  xPos.push(mp.pageX - divPos[0]);
  yPos.push(mp.pageY - divPos[1]);
  mp_called = 1;
  return true;
}
*/

//Relative positions
function getMousePosition(mp) {
  mp_called = 0;
  //Get the position from the div (which is fullscreen)
  var trackingDiv = document.getElementsByClassName("tracking")[0];

  //Get size of the tracking div
  let trackingDivSize = trackingDiv.getBoundingClientRect();

  //Get position of mouse position within that div
  let divPos = getPosition(document.getElementsByClassName("tracking")[0]);

  let divPosX = mp.pageX - divPos[0];
  let divPosY = mp.pageY - divPos[1];
  //console.log("DivPos (" + divPosX + "," + divPosY + ")");
  console.log("ScreenPos (" + mp.pageX + "," + mp.pageY + ")");

  //set relative position based on size of div
  let relativeX = divPosX / trackingDivSize.width;
  let relativeY = divPosY / trackingDivSize.height;
  //console.log("Relative (" + relativeX + "," + relativeY + ")");

  if (relativeX >= 0 && relativeX <= 1 && relativeY >= 0 && relativeY <= 1) {
    let previousX = xPos[xPos.length - 1];
    let previousY = yPos[yPos.length - 1];
    if (previousX != relativeX && previousY != relativeY) {
      xPos.push(relativeX);
      yPos.push(relativeY);
      mp_called = 1;
    }
  }

  //add each coordinate within DIV to the array
  // xPos.push(divPosX);
  // yPos.push(divPosY);
  //mp_called = 1;
  return true;
}

function timedCount() {
  if (mp_called == 1) {
    delayedXPos.push(xPos[xPos.length - 1]);
    delayedYPos.push(yPos[yPos.length - 1]);
    //If there is a value from the delayedXPos (meaning if the cursor is in the div...
    if (delayedXPos) {
      const timeInSec = (new Date().getTime() - initTime) / 1000;
      delayedTime.push(timeInSec);
      log(`${xPos[xPos.length - 1]},${xPos[yPos.length - 1]},${timeInSec}`);
    }
  }
  t = setTimeout("timedCount()", dt);
}

function doTimer() {
  console.log("Tracking Mouse Movements");
  //document.onmousemove = getMousePosition; //set document to record mouse position
  //var trackingDiv = document.getElementsByClassName("tracking")[0]; //only record when mouse enters div

  //trackingDiv.addEventListener("mousemove", getMousePosition);

  document.addEventListener("mousemove", getMousePosition);
  if (!timer_is_on) {
    initTime = new Date().getTime();
    timer_is_on = 1;
    timedCount();
  }
  let startButton = document.getElementById("start-button");
  let stopButton = document.getElementById("stop-button");
  toggleHidden(startButton);
  toggleHidden(stopButton);
}

function stopTimer() {
  var trackingDiv = document.getElementsByClassName("tracking")[0];

  trackingDiv.removeEventListener("mousemove", getMousePosition);

  //document.removeEventListener("mousemove", getMousePosition);
  timer_is_on = 0;
  mp_called = 0;
  timedCount();
  let startButton = document.getElementById("start-button");
  let stopButton = document.getElementById("stop-button");
  let resultsButton = document.getElementById("results-button");
  toggleHidden(startButton);
  toggleHidden(stopButton);
  toggleHidden(resultsButton);
}

function toggleHidden(el) {
  el.classList.toggle("hidden");
}

function getPosition(obj) {
  var topValue = 0,
    leftValue = 0;

  while (obj) {
    leftValue += obj.offsetLeft;
    topValue += obj.offsetTop;
    obj = obj.offsetParent;
  }
  return [leftValue, topValue];
}

function log(msg) {
  const container = document.getElementById("log");
  container.textContent = `${msg} \n${container.textContent}`;
}
//start collecting data after page loads
//console.log("timer running");
//document.onload = doTimer();
function clearlocalStorage() {
  const container = document.getElementById("log");
  container.textContent = "";
  log("Local storage cleared");
  window.localStorage.clear();
}
function viewResults() {
  let trackingDiv = document.getElementsByClassName("tracking")[0];
  let mediaURL = document.getElementById("tracked-media").getAttribute("src");
  let bgColor = window
    .getComputedStyle(trackingDiv, null)
    .getPropertyValue("background-color");
  let width = window
    .getComputedStyle(trackingDiv, null)
    .getPropertyValue("width");
  let height = window
    .getComputedStyle(trackingDiv, null)
    .getPropertyValue("height");
  window.localStorage.setItem("height", height.replace("px", "") / 1);
  window.localStorage.setItem("width", width.replace("px", "") / 1);
  window.localStorage.setItem("mediaURL", mediaURL);
  window.localStorage.setItem("bgColor", bgColor);
  window.localStorage.setItem("timeStamp", delayedTime);
  window.localStorage.setItem("xPos", delayedXPos);
  window.localStorage.setItem("yPos", delayedYPos);
  window.location.href = "viewresults.html";
}
