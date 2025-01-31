/**
 * Visual Pattern Task jsPsych Plugin
 * by Stoo Sepp 2025
 */
var jsPsychVPT = (function (jspsych) {
  "use strict";

  var _package = {
    name: "@jspsych/plugin-vpt",
    version: "1.0.0",
    description:
      "jsPsych plugin showing Visual Pattern Task for measure of visuospatial working memory capacity based upon Della Salla et al., 1997.",
    type: "module",
    main: "dist/index.cjs",
    exports: {
      import: "./dist/index.js",
      require: "./dist/index.cjs",
    },
    typings: "dist/index.d.ts",
    unpkg: "dist/index.browser.min.js",
    files: ["src", "dist"],
    source: "src/index.ts",
    scripts: {
      test: "jest",
      "test:watch": "npm test -- --watch",
      tsc: "tsc",
      build: "rollup --config",
      "build:watch": "npm run build -- --watch",
    },
    repository: {
      type: "git",
      url: "git+https://github.com/jspsych/jsPsych.git",
      directory: "packages/plugin-same-different-html",
    },
    author: "Josh de Leeuw",
    license: "MIT",
    bugs: {
      url: "https://github.com/jspsych/jsPsych/issues",
    },
    homepage: "https://stoosepp.github.io/",
    peerDependencies: {
      jspsych: ">=7.1.0",
    },
    devDependencies: {
      "@jspsych/config": "^3.0.0",
      "@jspsych/test-utils": "^1.2.0",
    },
  };

  function setupGridContainer(display_element) {
    //console.log(`Adding CSS`);
    var new_html = "";
    new_html += `
    <style>

    .jspsych-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
  .jspsych-content-wrapper[status='pre-stimulus'],  .jspsych-content-wrapper[status='stimulus']{
    cursor:none;
  }
    
  .grid-container {
  display: grid;
  margin-top:60px;
  }
  
  .grid-container[status='pre-stimulus']{
    display:none;
  }

.grid-container[status='stimulus']{
    display:grid;
    z-index:-1;
   
}

.grid-container[status='stimulus'] > .grid-tile{
    cursor:none;
   
}
    .grid-column{
    display:grid;
    }

  .grid-tile {
    border: 1px solid black;
    background-color: white;
    cursor: pointer;
    box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  }
    .grid-tile[status="blank"]{
    background-color: white;
    }
    .grid-tile[status="fill"]{
    background-color:black;
    }
    .grid-tile[status='hidden']{
    display:none;
    }
    .grid-tile[status='stimulus']{
    cursor:none;
    }


   .vpt-button-bar{
    height:60px;
    margin-top:20px;
    }
  
    .fixation-point[status='pre-stimulus']{
    visibility:visible;
    }


    .fixation-point[status='stimulus'],   .fixation-point[status='response'], .vpt-button-bar[status='stimulus'],.vpt-button-bar[status='pre-stimulus']{
    visibility:hidden;
     cursor:none;
    }

    </style>`;

    //Add Grid Container

    new_html += '<div id="grid" class="grid-container" status="pre-stimulus">';

    new_html += "</div>";
    new_html += '<div class="fixation-point" style="font-size:60px;">+</div>';
    // Add buttons.
    new_html +=
      '<div class="vpt-button-bar" status="stimulus" id="button-bar">';
    new_html +=
      '<button class="jspsych-btn" type="button" id="clear" action="clear">Clear</button>';
    new_html +=
      '<button class="jspsych-btn" type="button" id="submit" action="submit">Submit</button>';
    new_html += "</div>";
    // new_html +=
    new_html += "</div>";

    //SETS THE DISPLAY ELEMENT WITH NEW HTML CONTENT
    display_element.innerHTML = new_html;
  }

  function populateGridArray(practice, version) {
    var gridArray = new Array();
    //console.log("Populating Grid Array for " + version);
    const grid = {
      level: 0,
      trial: 0,
    };
    var current_grid = Object.create(grid);
    var last_grid = Object.create(grid);

    if (practice == true) {
      current_grid.level = 1;
      current_grid.trial = 1;
      last_grid.level = 2;
      last_grid.trial = 1;
    } else {
      //Deal with version choice here
      if (version == "chupouw") {
        current_grid.level = 5;
        current_grid.trial = 1;
        last_grid.level = 11;
        last_grid.trial = 5;
      }
    }
    //Add the initial Grid
    const initalGrid = Object.create(grid);
    initalGrid.level = current_grid.level;
    initalGrid.trial = current_grid.trial;
    gridArray.push(initalGrid);
    //console.log("grid array currently looks like this " + JSON.stringify(gridArray));
    //Add Remaining Grids
    while (
      current_grid.level < last_grid.level &&
      current_grid.trial <= last_grid.trial
    ) {
      if (practice) {
        //console.log("Practice");
        current_grid.level++;
        current_grid.trial = 1;
      } else {
        if (version == "chupouw") {
          current_grid.trial++;
          if (current_grid.trial > 5) {
            current_grid.trial = 1;
            current_grid.level++;
          }
        }
      }
      const newGrid = Object.create(grid);
      newGrid.level = current_grid.level;
      newGrid.trial = current_grid.trial;
      gridArray.push(newGrid);
    }
    return gridArray;
  }

  function showStimulus(
    display_element,
    duration,
    gridArray,
    index,
    buttonSize
  ) {
    //console.log(index);
    /*jsPsych.pluginAPI.*/const stimulusTimout = setTimeout(() => {
      //After 1second show Stimulus
      toggleElementsWithStatus(display_element, "stimulus");
      buildGrid(gridArray[index].level, gridArray[index].trial, buttonSize);
      //After 3 Seconds show blank grid
     /* jsPsych.pluginAPI.*/setTimeout(() => {
        toggleElementsWithStatus(display_element, "response");
        //After the Trial Duration has passed.
        //console.log("Clear Grid Fired");
        const filledTiles = display_element.querySelectorAll("[status='fill']");
        filledTiles.forEach((filledTile) => {
          filledTile.setAttribute("status", "blank");
        });
      }, duration * 1000); //Show fixation for
    }, 1000);
    
  }
  //Creates each Grid Tile
  function createTile(
    row,
    col,
    cellID,
    isHidden = false,
    isHighlighted = false,
    buttonSize
  ) {
    const tile = document.createElement("div");
    tile.className = "grid-tile";
    tile.id = cellID;
    tile.setAttribute("data-choice", cellID);
    tile.style.width = buttonSize + "px";
    tile.style.height = buttonSize + "px";
    if (isHighlighted) {
      tile.setAttribute("status", "fill");
    } else {
      tile.setAttribute("status", "blank");
    }
    if (isHidden) {
      tile.setAttribute("status", "hidden");
    }

    //Toggles the Tiles on and off
    tile.addEventListener("click", function (e) {
      if (tile.getAttribute("status") == "blank") {
        tile.setAttribute("status", "fill");
      } else {
        tile.setAttribute("status", "blank");
      }
    });
    return tile;
  }

  //Builds Grid from Grid Buttons
  function buildGrid(gridLevel, gridTrial, buttonSize) {
    //console.log(`Build Grid Fired. Level:${gridLevel} Trial:${gridTrial}`);
    //Get row and col values from the constants above.
    const rows = eval("VPTTrials.level" + gridLevel + ".rows");
    const cols = eval("VPTTrials.level" + gridLevel + ".cols");
    const filledTilesbyID = eval(
      "VPTTrials.level" + gridLevel + ".trial" + gridTrial
    );
    //console.log(`Rows:${rows}, Columns:${cols} and filled Tiles:${filledTilesbyID}`);

    //set Rows and Columns for gridContainer
    var gridContainer = document.getElementById("grid");
    //Setup button size and
    //console.log("Button size is " + buttonSize + "px square.");
    gridContainer.style.width = cols * buttonSize + "px";
    gridContainer.style.height = rows * buttonSize + "px";

    gridContainer.style.gridTemplateColumns =
      "repeat(" + String(cols) + "," + String(buttonSize - 1) + "px)";

    var cellID = 0;
    for (let col = 0; col < cols; col++) {
      //Add column element
      const columnElement = document.createElement("div");
      columnElement.className = "grid-column";
      columnElement.style.gridTemplateRows =
        "repeat(" + String(rows) + "," + String(buttonSize - 1) + "px)";

      //columnElement.style.gridTemplateRows = `repeat(${rows},${this.trial.button_size - 1}px)`;

      //

      for (let row = 0; row < rows; row++) {
        // const rowElement = document.createElement("div");
        // rowElement.className = "row";
        // rowElement.style.height = `${trial.button_size}px`;
        const isHighlighted = filledTilesbyID.some(
          (highlightedID) => highlightedID === cellID
        );

        const noButtonsArray = eval(`VPTTrials.level${gridLevel}.nobuttons`);
        const isHidden = noButtonsArray.includes(cellID);

        // Create a new GridButton instance
        const gridButton = createTile(
          row,
          col,
          cellID,
          isHidden,
          isHighlighted,
          buttonSize
        );

        columnElement.appendChild(gridButton);
        //columnElement.appendChild(rowElement);
        // Append the button to the container
        cellID++;
      }
      gridContainer.appendChild(columnElement);
    }
    ////console.log(`There are ${buttonsArray.length} buttons in this grid.`)
  }


  function toggleElementsWithStatus(display_element, status) {
    //console.log("Toggle Elements fired.");
    document
      .querySelector(".jspsych-content-wrapper")
      .setAttribute("status", status);
    display_element
      .querySelector(".grid-container")
      .setAttribute("status", status);
    display_element
      .querySelector(".fixation-point")
      .setAttribute("status", status);
    display_element
      .querySelector(".vpt-button-bar")
      .setAttribute("status", status);
  }

  //Respond to Button Proses
  function clearButtonPushed(display_element) {
    //console.log("Clear Button clicked");
    const filledTiles = display_element.querySelectorAll("[status='fill']");
    filledTiles.forEach((filledTile) => {
      filledTile.setAttribute("status", "blank");
    });
  }

  function submitButtonPushed(display_element, trial, gridArray, index) {
    toggleElementsWithStatus(display_element, "pre-stimulus");
   display_element.querySelector('.grid-container').innerHTML = '';
    //Show Stimulus if within bounds of gridArray
   showStimulus(
      display_element,
      trial.stimulous_duration,
      gridArray,
      index,
      trial.button_size
    );
  }
  function end_trial(display_element, trial) {
    // kill any remaining setTimeout handlers
   /* jsPsych.pluginAPI./clearAllTimeouts();*/

    //Set Scores
    var trial_data = {
      vpt_total_trials: trial.vpt_total_trials,
      vpt_total_score: trial.vpt_total_score,
      vpt_chupouw_score: trial.vpt_total_score / trial.vpt_total_trials, // Grabs the score defined in the info const. Score is the proportion of correct trials for all trials
      vpt_dellasala_score: trial.vpt_dellasala_score, // Grabs the score defined in the info const. Score is the highest number of correctly filled boxes in the most complex grid.
    };
    //console.log(trial_data);
    // clear the display
    display_element.innerHTML = "";
    // end trial
    jsPsych.finishTrial(trial_data);
  }

  const VPTTrials = {
    level1: {
      rows: 2,
      cols: 2,
      nobuttons: [],
      trial1: [1, 2],
    },
    level2: {
      rows: 2,
      cols: 3,
      nobuttons: [],
      trial1: [3, 4, 5],
    },
    level5: {
      rows: 3,
      cols: 4,
      //buttons: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      nobuttons: [10, 11],
      trial1: [0, 2, 5, 7, 8],
      trial2: [1, 2, 6, 7, 9],
      trial3: [1, 3, 4, 5, 6],
      trial4: [0, 3, 7, 8, 9],
      trial5: [1, 5, 6, 7, 8],
    },
    level6: {
      rows: 3,
      cols: 4,
      //buttons: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      nobuttons: [],
      trial1: [0, 1, 3, 6, 8, 9],
      trial2: [1, 2, 3, 4, 9, 10],
      trial3: [0, 1, 3, 4, 5, 10],
      trial4: [2, 4, 5, 6, 9, 10],
      trial5: [0, 5, 6, 9, 10, 11],
    },
    level7: {
      rows: 4,
      cols: 4,
      //buttons: [0, 1, 2, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15],
      nobuttons: [3, 7],
      trial1: [0, 1, 5, 8, 9, 13, 14],
      trial2: [0, 1, 2, 4, 11, 12, 15],
      trial3: [0, 1, 2, 5, 6, 8, 11],
      trial4: [6, 8, 9, 10, 11, 12, 13],
      trial5: [0, 1, 4, 11, 12, 13, 15],
    },
    level8: {
      rows: 4,
      cols: 4,
      //buttons: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      nobuttons: [],
      trial1: [0, 1, 5, 7, 11, 12, 14, 15],
      trial2: [0, 2, 3, 9, 11, 13, 14, 15],
      trial3: [1, 2, 4, 7, 8, 12, 13, 14],
      trial4: [2, 3, 6, 9, 12, 13, 14, 15],
      trial5: [0, 1, 2, 4, 7, 8, 11, 14],
    },
    level9: {
      rows: 4,
      cols: 5,
      //buttons: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      nobuttons: [0, 1],
      trial1: [4, 5, 6, 8, 11, 14, 16, 17, 18],
      trial2: [3, 4, 11, 13, 15, 16, 17, 18, 19],
      trial3: [4, 5, 6, 9, 10, 14, 15, 16, 18],
      trial4: [3, 5, 8, 9, 11, 15, 16, 18, 19],
      trial5: [3, 4, 5, 7, 8, 11, 12, 17, 19],
    },
    level10: {
      rows: 4,
      cols: 5,
      // buttons: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,],
      nobuttons: [],
      trial1: [1, 2, 7, 8, 11, 13, 15, 17, 18, 19],
      trial2: [0, 1, 3, 5, 8, 11, 12, 13, 15, 19],
      trial3: [3, 4, 5, 6, 7, 10, 12, 17, 18, 19],
      trial4: [0, 5, 6, 7, 10, 11, 12, 14, 15, 19],
      trial5: [1, 4, 9, 10, 11, 12, 14, 15, 18, 19],
    },
    level11: {
      rows: 5,
      cols: 5,
      // buttons: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19, 21, 22, 23,24,],
      nobuttons: [10, 15, 20],
      trial1: [1, 2, 3, 4, 6, 9, 11, 12, 19, 21, 24],
      trial2: [2, 3, 4, 5, 7, 11, 13, 14, 16, 21, 22],
      trial3: [3, 4, 5, 6, 11, 14, 17, 18, 21, 22, 23],
      trial4: [0, 3, 4, 5, 6, 7, 12, 16, 17, 21, 22],
      trial5: [3, 6, 7, 11, 13, 14, 16, 19, 22, 23, 24],
    },
    level12: {
      rows: 5,
      cols: 5,
      // buttons: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24,],
      nobuttons: [20],
      trial1: [1, 2, 4, 9, 11, 14, 15, 16, 17, 22, 23, 24],
      trial2: [1, 2, 4, 7, 11, 13, 14, 16, 19, 21, 23, 24],
      trial3: [3, 5, 6, 10, 11, 12, 15, 17, 19, 22, 23, 24],
      trial4: [0, 1, 3, 4, 7, 9, 12, 13, 15, 16, 21, 23],
      trial5: [3, 4, 6, 7, 8, 11, 12, 13, 14, 16, 18, 24],
    },
    level13: {
      rows: 5,
      cols: 6,
      // buttons: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,   21, 22, 23, 24, 25,],
      nobuttons: [26, 27, 28, 29],
      trial1: [0, 1, 4, 5, 8, 12, 15, 16, 17, 18, 21, 22, 23],
      trial2: [1, 2, 3, 4, 5, 8, 11, 17, 18, 20, 21, 22, 25],
      trial3: [3, 6, 7, 9, 11, 13, 14, 16, 19, 21, 23, 24, 25],
      trial4: [0, 1, 3, 4, 5, 6, 7, 11, 13, 14, 18, 23, 25],
      trial5: [0, 3, 4, 5, 6, 8, 11, 13, 14, 16, 19, 22, 24],
    },
  };

  const info = {
    name: "visual-pattern-task",
    description:
      "Visual Pattern Task for measure visuospatial working memory capacity based upon Della Salla et al., 1997.",
    version: "1.0.0", // When working in a Javascript environment with no build, you will need to manually put set the version information. This is used for metadata purposes and publishing.
    parameters: {
      version: {
        type: jspsych.ParameterType.STRING,
        pretty_name: `The trial version of VPT you want to implement. Options are practice, chupouw and dellasala`,
        default: "chupouw",
        description: `There are a few implementations of the VPT to choose from, this plugin uses the computer-based method from  Chu et al., 2013; Pouw et al., 2016 
		Chu et al., 2013; Pouw et al., 2016.
		This is a computer-based version adapted from Della Sala et al., 1997. This is comprised of 2 easy practice grids and, then 5 trials for each level of complexity ranging from 7 black blocks to 11 black blocks. The scoring convention in these papers was the proportion of correct trials for all trials, which will be generated as vpt_chupouw_score.

		Della Sala et al., 1997
		Use the original task from Della Sala et al., 1997. Couldn't find this original source, so it's based upon descriptions in Della Sala et al., 1999. This is comprised of 2 easy practice grids and, then 3 trials for each level from a matrix of 2x2 all the way up to 5x6, with half the boxes in each grid filled each time. Participants are given 3 sections to look at each grid, then they are reset for the participant to fill in and match. The final score is the number of filled cells in the most complex pattern recalled, which will be generated as vpt_dellasala_score.
	`,
      },
      practice: {
        type: jspsych.ParameterType.BOOL,
        default: true,
        pretty_name: `Run the participant through 2 practice grids`,
        description: `This shows just 2 grids for the particicipant to try, it will make sure they get them both right before moving on to the fully trial.`,
      },
      stimulous_duration: {
        type: jspsych.ParameterType.INT,
        pretty_name:
          "The default time each grid is displayed is 3. Feel free to change it.",
        default: 3,
      },
      button_size: {
        type: jspsych.ParameterType.INT,
        pretty_name: `The size of each grid item's sides in px`,
        default: 64,
      },
    },
    data: {
      /** Number of Correct Answers in total for the whole trial*/
      vpt_total_score: {
        type: jspsych.ParameterType.INT,
      },
      /** The total number of trials run */
      vpt_total_trials: {
        type: jspsych.ParameterType.INT,
      },
      /** Score outlined in Chu et al., 2013; Pouw et al., 2016 as the proportion of correct trial reponses for all trials. */
      vpt_chupouw_score: {
        type: jspsych.ParameterType.FLOAT,
      },
      /** Score outlined in Sala et al. 1997 as the highest number of correctly filled boxes in the most complex grid. */
      vpt_dellasala_score: {
        type: jspsych.ParameterType.INT,
      },
      grid_data: {
        type: jspsych.ParameterType.COMPLEX,
        array: true,
        nested: {
          grid_level: {
            type: jspsych.ParameterType.INT,
          },
          grid_trial: {
            type: jspsych.ParameterType.INT,
          },
          grid_rt: {
            type: jspsych.ParameterType.INT,
          },
        },
      },
      rt: {
        type: jspsych.ParameterType.INT,
      },
    },
  };

  /**
   * **Visual Pattern Task Plugin**
   *
   * This runs the Visual Pattern Task developed by Della Sala et al. in 1997. There are variations outlined in this file for you to run different versions.
   *
   * @author Stoosepp
   * @see {@link http://www.stoosepp.com}
   */

  class jsPsychVPT {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }

    //Handle Logic of Plugin in trial function
    /*
1. Setup Grid Container in display_element
2. Create Array of Grid objects
3 Run Grids
-Show 
-Respond to Clicks
3 End Trial

 */
    trial(display_element, trial) {
      //Setup Local Variables
      trial.vpt_total_score = 0;
      trial.vpt_total_trials = 0;
      var current_grid_index = 0;
      var correctTileIDs = [];

      //1. Setup Grid Container
      setupGridContainer(display_element);
      display_element
        .querySelector("#clear")
        .addEventListener("click", clear, { once: false });
      display_element
        .querySelector("#submit")
        .addEventListener("click", submit, { once: false });

      //2. Create Array of Grids
      var gridArray = populateGridArray(trial.practice, trial.version);
      //console.log("grid " + JSON.stringify(gridArray));

      //3. Run First Grid
      
      showStimulus(
        display_element,
        trial.stimulous_duration,
        gridArray,
        current_grid_index,
        trial.button_size
      );
      function clear() {
        clearButtonPushed(display_element);
      }
      function submit() {
        //Check Answer
        correctTileIDs = eval(
          "VPTTrials.level" +
            String(gridArray[current_grid_index].level) +
            ".trial" +
            String(gridArray[current_grid_index].trial)
        );
        var correct = true;
        const filledTiles = display_element.querySelectorAll("[status='fill']");
        if (correctTileIDs.length == filledTiles.length) {
          //the same amount of highlighted buttons are in each array so check each.
          filledTiles.forEach((highlightedButton) => {
            if (correctTileIDs.includes(Number(highlightedButton.id)) == false) {
              correct = false;
            }
            //console.log(correct);
          });
        } else {
          correct = false;
        }
        if (correct == true){
          trial.vpt_total_score++;
        }
        //console.log("Is correct? " + correct + 'Total score is ' + trial.vpt_total_score);
        current_grid_index++;
        trial.vpt_total_trials++;
        if (current_grid_index > gridArray.length - 1) {
          end_trial(display_element, trial);
        } else {
          submitButtonPushed(
            display_element,
            trial,
            gridArray,
            current_grid_index
          );
        }
      }
    }
  }
  jsPsychVPT.info = info;

  return jsPsychVPT;
})(jsPsychModule);
