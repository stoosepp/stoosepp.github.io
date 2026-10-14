const testtest = [
  {
    type: "jsPsychSurveyMultiChoice",
    questions: 
      {
        prompt: "Which of these foods do you like?",
        options: ["Zuchini", "Potatoes", "Carrots", "Donuts", "Eggplant"],
        required: true,
        horizontal: false,
        button_label: "Next >",
      },
    
    answer: "Donuts",
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: 
      {
        prompt: "Which of these animals do you like?",
        options: ["Pig", "Cow", "Sheep", "Chicken", "Spider"],
        required: true,
        horizontal: false,
        button_label: "Next >",
      },
    
    answer: "Pig",
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt: "",
      options: ["", 
        "", 
        "", 
        ""],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index:99999,
  },
];
