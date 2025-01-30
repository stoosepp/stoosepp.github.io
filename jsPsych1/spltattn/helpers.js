//
// HELPER FILE TO MANAGE COMMON TASKS
//
// Maybe look at creating classes for Participant and Trial Data to more easily manage them?
// https://stackoverflow.com/questions/48211891/import-functions-from-another-js-file-javascript
//

function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

function createParticipantID(length) {
  var participantID = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    participantID += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  return participantID;
} // this function creates a random subject code using the characters listed above

function setCondition(condNum) {
  // add the variables onto the end of the URL that appears in the browser when you open the file
  // e.g., file:///C:/my_experiment.html?id=1&sess=2&diff=3
  var tempCond = 0;
  
  if (condNum == 0){
    tempCond =  "Control";
  }
  else if (condNum == 1){
    tempCond =  "Arrow Cursor";
  }
  else if (condNum == 2){
    tempCond=  "Hand Cursor";
  }
  else {
    condNum =  "Control";
  }
  return tempCond;
};

function countdown(startMinute, delay) {
  document.getElementsByClassName("jspsych-btn")[0].style.display = "none";

  var wait_time = startMinute * 60 * 1000; // in milliseconds
  var start_time = performance.now();
  var interval = setInterval(function () {
    var time_left = wait_time - (performance.now() - start_time);
    time_left = Math.round(time_left/1000)*1000;
    var minutes = Math.floor(time_left / 1000 / 60);
    var seconds = Math.floor((time_left - minutes * 1000 * 60) / 1000);
    var seconds_str = seconds.toString().padStart(2, "0");
    document.querySelector("#clock").innerHTML = minutes + ":" + seconds_str;
    //console.log(time_left + " left.");
    if (time_left > 0) {
      document.querySelector("#clock").innerHTML = minutes + ":" + seconds_str;
        //clearInterval(interval);
    }
    else {
      //console.log(`Timer done`);
      document.getElementsByClassName("jspsych-btn")[0].style.display =
        "inline";
      clearInterval(interval);
    }
  }, delay);
}

function saveTrialtoOSF() {
  var savedtoOSF = false;

  //Logic for connecting to OSF and sending trial data there.
  console.log(`Saved to OSF`);
  return savedtoOSF;
}


function buildTest(testName, timeline) {
  
  let finalQuestionArray = [];
  const questionArray = eval(testName);
  console.log(
    `Building ${testName}, which has ${questionArray.length} questions.`
  );
  for (var i = 0; i < questionArray.length; i++) {
    const question = questionArray[i];
    eval(`var ${testName}Q${i + 1} = {
        type:${question.type},
        data: { question_name: '${testName}Q${i + 1}', correct_answer: '',score: 0 },
        questions:[{
            prompt: ${JSON.stringify(question.questions.prompt)},
            name: ${JSON.stringify(question.questions.name)},
            options: ${JSON.stringify(question.questions.options)},
            required: ${question.questions.required},
        }
     ],
     on_finish: function (data) {
     const userAnswer = data.response['Q0'];
     const correctAnswer = question.questions.options[question.answer_index];
     console.log('Correct answer is ' + correctAnswer);
     data.correct_answer = correctAnswer;
     if (userAnswer == correctAnswer){
     console.log(userAnswer + ' is right.');
     data.score = 1;
     
     }
     else{
    console.log(userAnswer + ' is wrong.');
  data.score = 0;
     }
    
     }
    }`);

    timeline.push(eval(`${testName}Q${i + 1}`));
  }
}



