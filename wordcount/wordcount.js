var hoursDefault = 130;
window.addEventListener('load', (event) => {
    
var input = document.getElementById('percentageLabel');
if (input){
    input.addEventListener('input', function()
    {
      if (input.value > 0 && input.value <= 100) {
        // something
        input.style.backgroundColor = "white";
        console.log('input changed to: ', input.value);
        slider = document.getElementById("percentageValue");
        slider.value = input.value;
        updateValues();
      }
      else if (input.value.length == 0){ 
        console.log('Zero length');
        input.style.backgroundColor = "white";
        input.value = 0;
          slider = document.getElementById("percentageValue");
        slider.value = 0;
        updateValues();
      }
      else if (input.value == 0){
        input.style.backgroundColor = "white";
        document.getElementById("percentageValue");
        slider.value = 0;
        updateValues();
      }
      else{
        input.style.backgroundColor = "red";
      }
        
    });
}
  });





function showVal(value){
  percentageValue = document.getElementById("percentageLabel");
  percentageValue.value = value; 
  wordsDefault = getWordCount();
  
  hoursValue =  document.getElementById('hours');
  hours  = (value/100)*hoursDefault;
  hoursValue.textContent = hours.toFixed(0);
  
  wordsValue =  document.getElementById('words');
  words  = (value/100)*wordsDefault;
  wordsValue.textContent = words.toFixed(0);
}

function getWordCount(){
  wordsDefault = 0;
  unitLevel =  document.getElementById('unitlevel');
  if (unitLevel.value ==100){
    wordsDefault = 5000;
  }
  else if (unitLevel.value == 500){
    wordsDefault = 7500;
  }
  else{
    wordsDefault = 6000;
  }
  theSwitch = document.getElementById("switch");
  console.log('Switch is ' + theSwitch.checked);
  if (theSwitch.checked == true){
    wordsDefault = wordsDefault-1000;
  }
  return wordsDefault;
}

function updateValues(){
  //console.log('Updating');
    slider = document.getElementById("percentageValue");
    showVal(slider.value);
} 