//This analysis uses P5.js to draw
function setup() {
  console.log("P5 Setup called");
  bg = loadImage("Synapse2023PNG.png");
  setupPlayback();
  rectMode(CORNERS);
}
//initialize time variables
var initTime = new Date().getTime();
var timer_is_on = 0;
var t;

//time interval for data collection in ms
var dt = 10;

//Check out this Pen for heatmap - https://codepen.io/ysko909/pen/ExKLqYq
function draw() {
  //background(bg);
  // point(x, y);
  // stroke("purple"); // Change the color
  // strokeWeight(10);
  //console.log("drawing on canvas");
}
function loadFromLocalStorage(key) {
  let value = window.localStorage.getItem(key);
  //console.log(`${key}: ${value} `);
  return value;
}
window.addEventListener("load", (event) => {});

var xPosArray = []; // =
var yPosArray = [];
loadFromLocalStorage("yPos");
var timeStampArray = []; //
var divHeight = loadFromLocalStorage("height") / 1;
var divWidth = loadFromLocalStorage("width") / 1;
var mediaURL = loadFromLocalStorage("mediaURL");
var bgColor = loadFromLocalStorage("bgColor");
var playbackDuration = 0;
var currentTime = 0;

function setupPlayback() {
  console.log("Setting up Tracking Window");
  //Set Div for Canvas
  document
    .getElementById("canvas-div")
    .setAttribute("style", `width:${divWidth}px;height:${divHeight}px;`);

  //Create Canvas with P5
  let playbackCanvas = createCanvas(divWidth, divHeight);
  playbackCanvas.parent("canvas-div");
  playbackCanvas.style("z-index", "1");

  // let imageDiv = document.getElementById("tracked-media");
  // imageDiv.src = mediaURL;

  //Create BG Canvas
  let bgCanvas = createCanvas(divWidth, divHeight);
  background(bg);
  bgCanvas.parent("canvas-div");
  bgCanvas.style("z-index", "-1");
  bgCanvas.style("background-image", "url(Synapse2023PNG.png)");
  bgCanvas.style("background-size", `${divWidth}px ${divHeight}px`);

  const scrubber = document.getElementById("playback-scrubber");
  scrubber.style.width = divWidth;
  let timeStamp = loadFromLocalStorage("timeStamp");
  timeStampArray = parseArrayStrings(timeStamp);
  let xPos = loadFromLocalStorage("xPos");
  xPosArray = parseArrayStrings(xPos);
  let yPos = loadFromLocalStorage("yPos");
  yPosArray = parseArrayStrings(yPos);

  playbackDuration = timeStampArray.at(-1) / 1;
  console.log("playbackDuration is " + playbackDuration);
  scrubber.value = 100;
  drawAtIndex(timeStampArray.length);

  updateTimerLabel(playbackDuration);
}

function playButtonPressed() {
  console.log(`Current time is set to ${currentTime}`);
  let thisButton = document.getElementById("playpause-button");
  if (thisButton.innerHTML == "Play") {
    //Start Playback
    const scrubber = document.getElementById("playback-scrubber");
    if (currentTime == 0 && scrubber.value == 100) {
      scrubber.value = 0;
      //Check where scrubber is
      initialiseTimer();
    } else if (currentTime == 0 && scrubber.value !== 100) {
      currentTime = playbackDuration * (scrubber.value / 100);
      //Check where scrubber is
      initialiseTimer();
    } else {
      currentTime = playbackDuration * (scrubber.value / 100);
      console.log("Starting Playback again");

      timer_is_on = 1;
      runTimer();
    }

    thisButton.innerHTML = "Pause";
  } else {
    //Pause Playback
    timer_is_on = 0;
    thisButton.innerHTML = "Play";
  }
}

function drawAtIndex(toIndex) {
  //Show all and Lines
  clear();
  //background(bg);

  //Get size of playback div
  var analysisDiv = document.getElementById("canvas-div");

  // const xArray = parseArrayStrings(xPos);
  // const yArray = parseArrayStrings(yPos);
  // const timeStamps = parseArrayStrings(timeStamp);
  const coords = xPosArray.map((el, index) => [el, yPosArray[index]]);

  let arrayLengthToDraw = 0;
  if (toIndex) {
    arrayLengthToDraw = toIndex;
  } else {
    arrayLengthToDraw = coords.length;
  }

  //Draw All
  for (let i = 0; i < arrayLengthToDraw; i++) {
    let relativePoint = coords[i];
    let thisPoint = returnPointFromRelative(relativePoint, analysisDiv);
    //let thisPoint = coords[i];
    if (i != 0) {
      let previousRelativePoint = coords[i - 1];
      let previousPoint = returnPointFromRelative(
        previousRelativePoint,
        analysisDiv
      );
      //let previousPoint = coords[i - 1];
      drawLine(previousPoint, thisPoint, 2, "black");
    }
    drawPoint(thisPoint, 2, "black");
  }
}

function returnPointFromRelative(point, element) {
  let elementDivSize = element.getBoundingClientRect();
  let posInElementX = elementDivSize.width * point[0];
  let posInElementY = elementDivSize.height * point[1];
  let thisPoint = [posInElementX, posInElementY];
  return thisPoint;
}

function drawLine(startPoint, endPoint, strokeWidth, thisColor) {
  line(startPoint[0], startPoint[1], endPoint[0], endPoint[1]);
  stroke(thisColor); // Change the color
  strokeWeight(strokeWidth);
}

function drawPoint(thisPoint, strokeWidth, thisColor) {
  point(thisPoint[0], thisPoint[1]);
  stroke(thisColor); // Change the color
  strokeWeight(strokeWidth);
}

function parseArrayStrings(dataString) {
  let array = dataString.split(",").map(Number);
  return array;
}

function runTimer() {
  const timeInSec = (new Date().getTime() - initTime) / 1000;
  console.log("Timer fired: " + timeInSec);
  if (timer_is_on) {
    //const timeInSec = (new Date().getTime() - initTime) / 1000;
    currentTime = currentTime + 0.01; //This is frame rate essentially

    const scrubber = document.getElementById("playback-scrubber");
    scrubber.value = (currentTime / playbackDuration) * 100;
    scrubPlayback(scrubber.value);

    if (scrubber.value >= 100) {
      timer_is_on = 0;
      let thisButton = document.getElementById("playpause-button");
      thisButton.innerHTML = "Play";
      updateTimerLabel(playbackDuration);
    }
    t = setTimeout("runTimer()", dt);
  }
}
function updateTimerLabel(withTime) {
  const timeLabel = document.getElementById("current-time-label");
  timeLabel.innerHTML = `${withTime.toFixed(2)}s`;
}

function initialiseTimer() {
  if (!timer_is_on) {
    initTime = new Date().getTime();
    timer_is_on = 1;
    runTimer();
  }
}

function scrubPlayback(value) {
  //const timeValues = timeStamp; //document.getElementById("timeStamp").value;
  //const timesArray = parseArrayStrings(timeValues);
  const lastTime = timeStampArray.slice(-1);
  var timeFromScrubber = (value * lastTime) / 100;
  if (value == 0) {
    timeFromScrubber = 0;
  }
  updateTimerLabel(timeFromScrubber);
  for (let i = 0; i < timeStampArray.length; i++) {
    let thisTime = timeStampArray[i];
    if (i != 0) {
      let previousTime = timeStampArray[i - 1];
      if (timeFromScrubber <= thisTime && timeFromScrubber >= previousTime) {
        drawAtIndex(i);
        break;
      }
    }
  }
}
