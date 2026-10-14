Qualtrics.SurveyEngine.addOnload(function () {
  /*Place your JavaScript here to run when the page loads*/


  /* Change 2: Hiding the Next button */
  // Retrieve Qualtrics object and save in qthis
  var qthis = this;
  qthis.hideNextButton();

  /* Change 3: Defining and load required resources */
  var jslib_url = "https://stoosepp.github.io/jsPsych/";

  // the below urls must be accessible with your browser
  var requiredResources = [
    jslib_url + "jspsych.js",
    jslib_url + "plugins/plugin-browser-check.js",
    jslib_url + "plugins/plugin-preload.js",
    jslib_url + "plugins/plugin-call-function.js",
    jslib_url + "plugins/plugin-fullscreen.js",
    jslib_url + "plugins/plugin-html-button-response.js",
    jslib_url + "plugins/plugin-instructions.js",
    jslib_url + "plugins/plugin-survey-multi-choice.js",
    jslib_url + "plugins/plugin-survey-multi-select.js",
    jslib_url + "plugins/plugin-survey-text.js",
    jslib_url + "plugins/plugin-survey-likert.js",
    //Custom Stuff
    jslib_url + "plugin-vpt/plugin-vpt.js",
    jslib_url + "extension-normalised-mouse-tracking/extension-normalised-mouse-tracking.js",
    jslib_url + "spltattn/constants.js",
    jslib_url + "spltattn/helpers.js",
    jslib_url + "spltattn/posttest.js",
    jslib_url + "spltattn/pretest.js",
  ];

  function loadScript(idx) {
    console.log("Loading ", requiredResources[idx]);
    jQuery.getScript(requiredResources[idx], function () {
      if (idx + 1 < requiredResources.length) {
        loadScript(idx + 1);
      } else {
        initExp();//This loads all the jsPsych code into your survey question
      }
    });
  }

  if (
    window.Qualtrics &&
    (!window.frameElement || window.frameElement.id !== "mobile-preview-view")
  ) {
    loadScript(0);
  }

  /* Change 4: Appending the display_stage Div using jQuery */
  jQuery("<div id = 'display_stage_background'></div>").appendTo("body");
  jQuery("<div id = 'display_stage'></div>").appendTo("body");

  //Remove text
 $("#placeholder-text").remove();


  /* Change 5: Wrapping jsPsych.init() in a function */
  function initExp() {
  
    //Set up local variables
    var iconSize = "32";
    var imageToStudy = "21012025Split.png";

    var imageToShow = "";
    var cursorToShow = "";
    var os = "";
    var should_be_in_fullscreen = false;

    var passedPracticeGrids = false;
    var lastScore;
    var totalTrials;

    //////////////////////////////////////////////////////
    //Intitalise Experiment
    const jsPsych = initJsPsych({
		display_element: 'display_stage',
      //experiment_width: 1000,
      //show_progress_bar:true,
      on_interaction_data_update: function (data) {
        //MUST RESPOND TO EXITING FULL SCREEN. Taken from https://github.com/jspsych/jsPsych/discussions/1364
        if (data.event == "fullscreenexit" && should_be_in_fullscreen) {
          console.log("exited fullscreen");
          // hide the contents of the current trial
          jsPsych.getDisplayElement().style.display = "none";
          // add a div that contains a message and button to re-enter fullscreen
          jsPsych
            .getDisplayElement()
            .insertAdjacentHTML(
              "beforebegin",
              '<div id="message-div" style="margin: auto; width: 100%; text-align: center;">' +
                "<p>Please remain in fullscreen mode during the task.</p>" +
                "<p>When you click the button below, you will enter fullscreen mode and the task will resume.</p>" +
                '<button id="jspsych-fullscreen-btn" class="jspsych-btn">Continue</button></div>'
            );
          // call the request fullscreen function when the button is clicked
          document
            .querySelector("#jspsych-fullscreen-btn")
            .addEventListener("click", function () {
              var element = document.documentElement;
              if (element.requestFullscreen) {
                element.requestFullscreen();
              } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
              } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
              } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
              }
            });
        }
        if (data.event == "fullscreenenter") {
          console.log("entered fullscreen");
          // when entering fullscreen, check to see if the participant is re-entering fullscreen,
          // i.e. the 'please enter fullscreen' message is on the page
          var msg_div = document.querySelector("#message-div");
          if (msg_div !== null) {
            // remove the message
            msg_div.remove();
            // show the contents of the current trial again
            jsPsych.getDisplayElement().style.display = "block";
          }
        }
      },
      extensions: [
        {
          type: jsPsychExtensionNormalisedMouseTracking,
          params: { minimum_sample_time: 0 },
        },
      ],
      on_finish: function () {
       // console.log("Experiment is DONE!");
        //Wrap up Qualtrics stuff
        jQuery("#display_stage").remove();
        jQuery("#display_stage_background").remove();
        var all_data = jsPsych.data.get();

        Qualtrics.SurveyEngine.setEmbeddedData("jsPsychData", all_data.json());

        // simulate click on Qualtrics "next" button, making use of the Qualtrics JS API
        qthis.clickNextButton();
        
        //jsPsych.data.displayData("json");
        //Send users to URL
        //window.location = "https://app.prolific.co/submissions/complete?cc=136BDB5F"
      },
    });

    //////////////////////////////////////////////////////
    //Make Participant ID and add to Experiment's dataset
    subj_code = createParticipantID(12); // generate the actual code (12 strings)
    console.log(subj_code); // give it back to the console
    jsPsych.data.addProperties({ subj_code: subj_code }); // add the code to the data

    //Set condition based on URL Parameter
    const condNum = 2;//jsPsych.data.getURLVariable("condNum");
    var condition = setCondition(condNum);
    console.log("Condition is ${condition}");

    //Create Timeline array to add pages (or 'trials') to
    var timeline = [];

    //////////////////////////////////////////////////////
    //This loads all your assets
    var preload_assets = {
      type: jsPsychPreload,
      images: [
        jslib_url + "spltattn/img/arrowiconblack" + iconSize + ".png",
        jslib_url + "spltattn/img/handicon" + iconSize + ".png",
        jslib_url + "spltattn/img/arrowicon" + iconSize + ".png",
        jslib_url + "spltattn/img/stoosmall.jpg",
        jslib_url + "spltattn/img/unelogo.png",
        jslib_url + "spltattn/img/neurondiagram.png",
      ],
    };

    //////////////////////////////////////////////////////
    //Get Browser Details
    var browser_check = {
      type: jsPsychBrowserCheck,
      inclusion_function: (data) => {
        return data.browser == "chrome" && data.mobile === false;
      },
      exclusion_message: (data) => {
        if (data.mobile) {
          return "<p>You must use a desktop/laptop computer to participate in this experiment.</p>";
        } else if (data.browser !== "chrome" || data.browser !== "firefox") {
          return "<p>You must use Chrome or Firefox as your browser to complete this experiment.</p>";
        }
      },
    };
 //////////////////////////////////////////////////////
    //Info Sheet
    var info_sheet = {
      type: jsPsychHtmlButtonResponse,
      stimulus: TEMPLATE_CONTENT.info_sheet,
      choices: ["I'd like to partipate"],
    };

    //////////////////////////////////////////////////////
    //Enter Full Screen Mode
    var enter_fullscreen = {
      type: jsPsychFullscreen,
      message: "<p> To ensure the experiment is run correctly, it needs to run in full screen mode in your browser.</p> <p><strong>Please avoid pressing the 'esc' key while in full-screen mode as the experiment may be disrupted.</strong></p><p> Click the button below to continue. </p>",
      button_label: "Enter Full Screen",
      fullscreen_mode: true,
      on_start: function () {
        should_be_in_fullscreen = true; // once this trial starts, the participant should be in fullscreen
      },
    };

    //////////////////////////////////////////////////////
    //Implied Consent
    var implied_consent_questionnaire = {
      type: jsPsychHtmlButtonResponse,
      stimulus: TEMPLATE_CONTENT.implied_consent_questionnaire,
      choices: ["I agree. Take me to the experiment."],
    };
    ////////////////
    //Demographics
    var gender = {
      type: jsPsychSurveyMultiChoice,
      questions: [
        {
          prompt: "<p>What is your gender? (select all that apply)</p>",
          name: "selectedselectedGender",
          options: ["Female", "Male", "Non-binary / gender diverse"],
          required: true,
        },
      ],
      on_finish: function (data) {
        (condition = data.response.selectedCondition), console.log(condition);
      },
    };

    var age = {
      type: jsPsychSurveyMultiChoice,
      questions: [
        {
          prompt: "<p>What is your age?</p>",
          name: "selectedselectedGender",
          options: ["16-24", "25-34", "35-49", "Over 50", "Prefer not to say"],
          required: true,
        },
      ],
      on_finish: function (data) {
        (condition = data.response.selectedCondition), console.log(condition);
      },
    };

   

    //////////////////////////////////////////////////////
    //This loads instructions page 1
    var practiceVPTInstructions = {
      type: jsPsychHtmlButtonResponse,
      stimulus: "<p>In this part of the experiment you'll play a matching game. You will be presented with a grid of white boxes with some black boxes filled in.</p><p> Each grid will be shown for 3 seconds, then will go blank. Using your mouse or trackpad, it's your job to click the squares in the grid to copy the grid pattern you just saw by clicking on the blank squares to change their colour.</p><p> Let's practice. The first grid will appear as soon as you click the 'Next' button. When you're ready to go, click Next.</p>",
      choices: ["Next."],
    };

    //////////////////////////////////////////////////////
    //This loads practice Trial
    var practiceVPT = {
      type: jsPsychVPT,
      version: "chupouw",
      practice: true,
      on_finish: function (data) {
        if (data.vpt_chupouw_score == 1) {
          passedPracticeGrids = true;
          console.log("Participant Passed Practice");
        }
        lastScore = Number(data.vpt_total_score);
        totalTrials = Number(data.vpt_total_trials);
        console.log("Chupouw score was ${data.vpt_chupouw_score}");
        console.log("Della Sala score was ${data.vpt_dellasala_score}");
        console.log("Total ${data.vpt_total_score} ${lastScore}");
      },
    };

    //This loads instructions page 1
    var tryAgain = {
      type: jsPsychInstructions,
      allow_backward: false,
      pages: [
        "Unfortunately you didn't pass both practice grids. Click Next to try again.",
      ],
      show_clickable_nav: true,
    };

    var loop = {
      timeline: [tryAgain, practiceVPTInstructions, practiceVPT],
      loop_function: function () {
        if ((passedPracticeGrids = false)) {
          return true;
        } else {
          return false;
        }
      },
    };

    var if_node = {
      timeline: [loop],
      conditional_function: function () {
        if (passedPracticeGrids == false) {
          return true;
        } else {
          return false;
        }
      },
    };

    //////////////////////////////////////////////////////
    //This loads the congraduations page
    var fullVPTInstructions = {
      type: jsPsychInstructions,
      allow_backward: false,
      pages: function () {
        return [
          "Well done. You Scored ${lastScore}/${totalTrials}. Now it's time to play the real game, which should take about 5-10 minutes. When you're ready, click the 'Begin' button.",
        ];
      },
      show_clickable_nav: true,
      button_label_next: "Begin",
    };

    //////////////////////////////////////////////////////
    //This loads the full task
    var fullVPTTask = {
      type: jsPsychVPT,
      version: "chupouw",
      practice: false,
      button_size: 100,
      on_finish: function (data) {
        if (data.chupouw_score == 1) {
          passedPracticeGrids = true;
          console.log("Participant Passed Practice");
        }
        lastScore = Number(data.vpt_total_score);
        totalTrials = Number(data.vpt_total_trials);
        console.log("Chupouw score was ${data.chupouw_score}");
        console.log("Della Sala score was ${data.dellasala_score}");
      },
    };

    //////////////////////////////////////////////////////
    //This loads instructions page 1
    var postVPTInstructions = {
      type: jsPsychInstructions,
      allow_backward: false,
      pages: function () {
        return [
          "Thanks for trying this memory game. Your final score was ${lastScore}/${totalTrials}. ",
        ];
      },
      show_clickable_nav: true,
      button_label_next: "Finish",
    };

    //////////////////////////////////////////////////////
    //Pre-Test
    var build_pretest = {
      type: jsPsychCallFunction,
      func: function () {
        buildTest("pretest", timeline);
      },
    };


    //////////////////////////////////////////////////////
    // Background information
    var background_information = {
      type: jsPsychInstructions,
      pages: [TEMPLATE_CONTENT.instructionsp1, TEMPLATE_CONTENT.instructionsp2],
      show_clickable_nav: true,
    };

    //////////////////////////////////////////////////////
    // feedback screen showing the condition that has been selected (used in demo mode)
    var set_condition = {
      type: jsPsychHtmlButtonResponse,
      stimulus: function () {
        var conditionInstructions = "";
        switch (condition) {
          case "Control":
            conditionInstructions = "";
            break;
          case "Arrow Cursor":
            conditionInstructions = "<p>Your mouse cursor will take the form of an arrow. If you need to, feel free to use your cursor to guide your attention to help you study.</p>";
            break;
          case "Hand Cursor":
            conditionInstructions = "<p>Your mouse cursor will take the form of a hand icon. If you need to, feel free to use your cursor to guide your attention to help you study.</p>";
            break;
          default:
          // code block
        }

        return "<p>Now it's time to start studying. On the next screen you'll be presented with a diagram that explains how the biochemistry of how a synapse works. This diagram will show how an  signal (nerve impulse) is converted into a chemical signal and back again. This diagram is purposefully difficult to learn from, so do your best to learn all that you can about changes in ion flow and electrical processes.</p> " + conditionInstructions +
        "<p>You will be able to study this diagram for a total of 12 minutes. A timer will appear in the bottom-left hand corner of the screen.  When you're ready to start, click the 'Begin' button below.</p>";
      },
      choices: ["Begin"],
    };

    //////////////////////////////////////////////////////
    /* Change the cursor based on condition DO THIS DIRECTLY BEFORE STIMULUS IS SHOWN */
    var set_cursor = {
      type: jsPsychCallFunction,
      func: function () {
        var href = window.location.href;
        var dir = href.substring(0, href.lastIndexOf("/")) + "/";
        switch (condition) {
          case "Control":
            document.body.style.cursor = "none";
            break;
          case "Arrow Cursor":
            if (os == "Windows") {
              document.body.style.cursor = "url('" + jslib_url + "spltattn/img/arrowicon" + iconSize + ".png'),pointer";// "url('${dir}/img/arrowicon${iconSize}.png'), pointer";
            } else {
              document.body.style.cursor = "url('" + jslib_url + "spltattn/img/arrowiconblack" + iconSize + ".png'),pointer";//"url('${dir}/img/arrowiconblack${iconSize}.png'), pointer";
            }
            break;
          case "Hand Cursor":
            document.body.style.cursor = "url('${dir}/img/handicon${iconSize}.png'), pointer";
            break;
          default:
          // code block
        }
      },
    };

    //////////////////////////////////////////////////////
    //Image Study 1
    const imageDisplayDuration = 1; //Duration to show image in minutes
    var stimulus_with_countown = {
      type: jsPsychHtmlButtonResponse,
      stimulus: function () {
        return "<div class='stimulus-image' id='mouse-target' style='height:" + window.innerHeight + "px;'></div><div id='clock'>" + imageDisplayDuration + ":00</div>";
      },
      choices: ["Continue"],
      trial_duration: imageDisplayDuration * 60 * 1000 + 1,
      on_load: function () {
        //Set image countatiner stuff
        document.getElementsByClassName(
          "stimulus-image"
        )[0].style.backgroundImage = "url('img/" + imageToStudy  + "')";
       // console.log("Browser height is ${window.innerHeight}");
        document.getElementsByClassName("stimulus-image")[0].style.height =
          window.innerHeight;
        document.getElementsByClassName("jspsych-content")[0].style.width =
          "100%";
        document.getElementsByClassName("jspsych-content")[0].style.maxWidth =
          "100%";
        document.getElementsByClassName(
          "jspsych-content-wrapper"
        )[0].style.overflow = "hidden";

        countdown(imageDisplayDuration, 1000);
      },
      extensions: [
        {
          type: jsPsychExtensionNormalisedMouseTracking,
          params: { targets: ["#mouse-target"] },
        },
      ],
      data: {
        task: "draw",
      },
      on_finish: function (data) {
        document.getElementsByClassName("jspsych-content")[0].style.maxWidth =
          "80%";
        document.getElementsByClassName(
          "jspsych-content-wrapper"
        )[0].style.overflow = "scroll";
        document.body.style.cursor = "default";
      },
    };

    //////////////////////////////////////////////////////
    var paas_scale = {
      type: jsPsychSurveyLikert,
      questions: [
        {
          required: true,
          horizontal: true,
          prompt:
            "How much mental effort you are investing in studying these materials?",
          labels: [
            "Very Very Low Mental Effort",
            "",
            "Low Mental Effort",
            "",
            "Neither Low nor High Mental Effort",
            "",
            "High Mental Effort",
            "",
            "Very Very High Mental Effort",
          ],
        },
      ],
    };

    //////////////////////////////////////////////////////
    const likert_labels = [
      "Strongly Disagree",
      "",
      "Disagree",
      "",
      "Neither Agree nor Disagree",
      "",
      "Agree",
      "",
      "Strongly Agree",
    ];
    var klepsch_ICL_scale = {
      type: jsPsychSurveyLikert,
      questions: [
        {
          required: true,
          horizontal: true,
          prompt:
            "For this task, many things needed to be kept in mind simultaneously.",
          labels: likert_labels,
        },
        {
          required: true,
          horizontal: true,
          prompt: "This task was very complex.",
          labels: likert_labels,
        },
      ],
    };
    var klepsch_GCL_scale = {
      type: jsPsychSurveyLikert,
      questions: [
        {
          required: true,
          horizontal: true,
          prompt: "For this task, I had to highly engage myself.",
          labels: likert_labels,
        },
        {
          required: true,
          horizontal: true,
          prompt: "This task was very complex.",
          labels: likert_labels,
        },
      ],
    };
    var klepsch_ECL_scale = {
      type: jsPsychSurveyLikert,
      questions: [
        {
          required: true,
          horizontal: true,
          prompt:
            "During this task, it was exhausting to find the important information.",
          labels: likert_labels,
        },
        {
          required: true,
          horizontal: true,
          prompt: "The design of this task was very inconvenient for learning.",
          labels: likert_labels,
        },
        {
          required: true,
          horizontal: true,
          prompt:
            "During this task, it was difficult to recognize and link the crucial information.",
          labels: likert_labels,
        },
      ],
    };
    //////////////////////////////////////////////////////
    //Post-Test
    var build_posttestRecall = {
      type: jsPsychCallFunction,
      func: function () {
        buildTest("posttestRecall", timeline);
      },
    };
    //Post-Test
    var build_posttestTransfer = {
      type: jsPsychCallFunction,
      func: function () {
        buildTest("posttestTransfer", timeline);
      },
    };

    //////////////////////////////////////////////////////
    //This loads instructions page 1
    var posttest_instructions = {
      type: jsPsychHtmlButtonResponse,
      stimulus: "<p>Thank you for your efforts in completing this test. You're almost done with this experiment.</p>",
      choices: ["Next."],
    };

    /////////////////////////////////////// giving subjects the chance to report any technical issues
    var tech_issues = {
      type: jsPsychSurveyText,
      name: "Tech_issue_query",
      questions: [
        {
          prompt:
            "In the text field below you can report any errors that you came across during the study (e.g., technical issues, layout problems, spelling errors, errors in program logic and flow, etc.).",
          rows: 10,
          columns: 100,
          required: false,
          name: "Tech_issue_report",
        },
      ],
      on_finish: function (data) {
        jsPsych.data.addProperties({
          tech_issues: data.response.Tech_issue_report,
        });
        //console.log(data.response.Tech_issue_report);
      },
    };

    //Add Elements to Timline ========================================================================================
    timeline.push(preload_assets);
    timeline.push(browser_check);
    timeline.push(info_sheet);
    timeline.push(implied_consent_questionnaire);
    timeline.push(gender);
    timeline.push(age);
    timeline.push(enter_fullscreen);
    timeline.push(practiceVPTInstructions);
    timeline.push(practiceVPT);
    timeline.push(if_node);
    timeline.push(fullVPTInstructions);
    timeline.push(fullVPTTask);
    timeline.push(postVPTInstructions);
    timeline.push(build_pretest);
    timeline.push(background_information);
    timeline.push(set_condition);
    timeline.push(set_cursor);
    timeline.push(stimulus_with_countown);
    timeline.push(paas_scale);
    timeline.push(klepsch_ICL_scale);
    timeline.push(klepsch_GCL_scale);
    timeline.push(klepsch_ECL_scale);
    timeline.push(posttest_instructions);
    timeline.push(build_posttestRecall);
    timeline.push(build_posttestTransfer);
    timeline.push(tech_issues);
	  //console.log("Timeline has ${timeline.length} elements");

    //Run the Experiment ========================================================================================
    jsPsych.run(timeline);
      /* Change 6: Amending the onfinish part of your JSPsych.init function above, include this:
/*
jQuery("#display_stage").remove();
        jQuery("#display_stage_background").remove();
        var all_data = jsPsych.data.get();

        Qualtrics.SurveyEngine.setEmbeddedData("jsPsychData", all_data.json());

        // simulate click on Qualtrics "next" button, making use of the Qualtrics JS API
        qthis.clickNextButton();
        */
  }
});



Qualtrics.SurveyEngine.addOnReady(function () {
  /*Place your JavaScript here to run when the page is fully displayed*/
});

Qualtrics.SurveyEngine.addOnUnload(function () {
  /*Place your JavaScript here to run when the page is unloaded*/
});