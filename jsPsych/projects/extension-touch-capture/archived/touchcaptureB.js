var touchData = [];
var targetElement = null;
var canvas = null;
var ctx = null;
var startTimeStamp = 0;
var endTimeStamp = 0;

class TouchInstance {
  constructor(normalisedPoint, touchType) {
    this.normalisedPoint = normalisedPoint;
    this.touchType = touchType;
    this.timeStamp = Date.now();
  }
}

function startCapture(divCaptureID) {
  console.log(`Setting Up Touch Capture for did with id: ${divCaptureID}`);

  //set time for start of touch capture
  startTimeStamp = Date.now();

  //Add Listeners for touch events
  targetElement = document.getElementById(divCaptureID);

  targetElement.addEventListener("touchstart", handleTouchStart, {
    passive: true,
  });
  targetElement.addEventListener("touchmove", handleTouchMove, {
    passive: true,
  });
  targetElement.addEventListener("touchend", handleTouchEnd, { passive: true });
  targetElement.addEventListener("touchcancel", handleTouchCancel, { passive: true });

  //Deal with Buttons
  const buttons = document.querySelectorAll("button");
  for (const button of buttons) {
    console.log(button.innerHTML);
   
    if (button.attributes["hidden"] == "T") {
      button.removeAttribute("hidden");
    
  }
  else{
    button.setAttribute("hidden", "true");
  }
}
}
function saveData(){
  endTimeStamp = Date.now();
  //This will remove listeners
  var new_element = targetElement.cloneNode(true);
  targetElement.parentNode.replaceChild(new_element, targetElement);
  console.log(`Captured ${touchData.length} touch events.`)

}

// Normalize touch coordinates
function normalizeTouch(touch, element) {
  const rect = element.getBoundingClientRect();
  const relativeX = (touch.pageX - rect.left) / rect.width;
  const relativeY = (touch.pageY - rect.top) / rect.height;
  return { x: relativeX, y: relativeY };
}

// Handle touch events
let previousPoint = null;

function handleTouchStart(event) {
  for (const touch of event.touches) {
    const normalized = normalizeTouch(touch, targetElement);
    //if (previousPoint) {
    //drawLine(previousPoint.x, previousPoint.y, normalized.x, normalized.y);
    // }
    //drawPoint(normalized.x, normalized.y);
    touchData.push(new TouchInstance(normalized, "start"));
    previousPoint = normalized; // Update the previous point
  }
}

function handleTouchMove(event) {
  for (const touch of event.touches) {
    const normalized = normalizeTouch(touch, targetElement);
    // if (previousPoint) {
    //   drawLine(previousPoint.x, previousPoint.y, normalized.x, normalized.y);
    // }
    // drawPoint(normalized.x, normalized.y);
    touchData.push(new TouchInstance(normalized, "move"));
    previousPoint = normalized; // Update the previous point
  }
}

function handleTouchEnd(event) {
  //previousPoint = null; // Reset on touch end
  console.log(event);
  for (const touch of event.touches) {
    console.log(touch);
    const normalized = normalizeTouch(touch, targetElement);

    touchData.push(new TouchInstance(normalized, "end"));
    previousPoint = null; // Update the previous point
  }
}

function handleTouchCancel(event) {
  //previousPoint = null; // Reset on touch end
  console.log(event);
  for (const touch of event.touches) {
    console.log(touch);
    const normalized = normalizeTouch(touch, targetElement);

    touchData.push(new TouchInstance(normalized, "cancel"));
    previousPoint = null; // Update the previous point
  }
}


//Resize canvas to match its container
function resizeCanvas() {
  const rect = targetElement.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
}
// resizeCanvas();
window.addEventListener('resize', resizeCanvas);
