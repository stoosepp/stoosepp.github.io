var touchData = [];
var canvas = null;
var ctx = null;

// Draw a point on the canvas
function drawPoint(x, y, color) {
    const canvasX = x * canvas.width;
    const canvasY = y * canvas.height;
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 10, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }
  
  // Draw a line connecting two points
  function drawLine(x1, y1, x2, y2, color = "blue") {
    const canvasX1 = x1 * canvas.width;
    const canvasY1 = y1 * canvas.height;
    const canvasX2 = x2 * canvas.width;
    const canvasY2 = y2 * canvas.height;
    ctx.beginPath();
    ctx.moveTo(canvasX1, canvasY1);
    ctx.lineTo(canvasX2, canvasY2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  
  function displayTouchData(touchData) {
    canvas = document.getElementById("touch-canvas");
    ctx = canvas.getContext("2d");
    fix_dpi();
    for (let i = 0; i < touchData.length; i++){
      const touch = touchData[i];
      const { x, y } = touch.normalisedPoint;
      if (touch.touchType === "start") {
        drawPoint(x, y,"green");
      } else if (touch.touchType === "move") {
          const previousPoint = touchData[i-1].normalisedPoint;
        drawLine(previousPoint.x, previousPoint.y, x, y);
      } else if (i == touchData.length - 1) {
          console.log('drawing end point');
        drawPoint(x, y, "red");
      }
    }
  }
  
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  
  function fix_dpi() {
  
      //get DPI
  let dpi = window.devicePixelRatio;
      //get CSS height
      //the + prefix casts it to an integer
      //the slice method gets rid of "px"
      let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
      //get CSS width
      let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
      //scale the canvas
      canvas.setAttribute('height', style_height * dpi);
      canvas.setAttribute('width', style_width * dpi);
      }
  


  function displayTouchData() {
      
    //set time for end of touch capture
    
    const duration = endTimeStamp - startTimeStamp;
    const durationString = millisToMinutesAndSeconds(duration);
    console.log(`Touch Capture Duration: ${durationString}`);
    console.log(`TouchData contains ${touchData.length} elements`);
  console.log(touchData);
    //Display Touch Data
    displayTouchData(touchData);
  }