/**
 * VWindow Resize jsPsych Plugin
 * by Stoo Sepp 2025
 */
var jsPsychWindowResize = (function (jspsych) {
  "use strict";

  var _package = {
    name: "@jspsych/plugin-window-resize",
    version: "1.0.0",
    description:
      "jsPsych plugin that prompts the user to resize their browser window to a certain size.",
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

    author: "Stoo Sepp",
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

  const info = {
    name: "plugin-window-resize",
    description:
      "jsPsych plugin that prompts the user to resize their browser window to a certain size.",
    version: "1.0.0", // When working in a Javascript environment with no build, you will need to manually put set the version information. This is used for metadata purposes and publishing.
    parameters: {
      min_width: {
        type: jspsych.ParameterType.INT,
        default: 1200,
      },
      min_height: {
        type: jspsych.ParameterType.INT,
        default: 800,
      },
      imgURL: {
        type: jspsych.ParameterType.STRING,
      },
      message: {
        type: jspsych.ParameterType.STRING,
        default:
          "Please enlarge your browser window to at least {w}x{h} pixels to continue.",
      },
      button_label: {
        type: jspsych.ParameterType.STRING,
        default: "Continue",
      },
    },
    data: {
      /** Number of Correct Answers in total for the whole trial*/
      window_widthh: {
        type: jspsych.ParameterType.INT,
      },
      window_height: {
        type: jspsych.ParameterType.INT,
      },
      
      rt: {
        type: jspsych.ParameterType.INT,
      },
    },
  };

  class jsPsychWindowResize {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }

    trial(display_element, trial) {
      // Create warning message
      const msg = trial.message
        .replace("{w}", trial.min_width)
        .replace("{h}", trial.min_height);
      var fileName = trial.imgURL;
        if (window.devicePixelRatio >= 2){
          fileName = 'dummy@2x.png';
        }

      // HTML template
      function getHTML(currentWidth, currentHeight, canContinue) {
        return `
        <div style='z-index:-1; width:100vw; height;100vh; display:block; position:absolute; top:0;left:0; bottom:10px;'><img style='width:auto;height:100%; ${
          canContinue ? ''
          :'opacity:0.5;' 
          
        }' src='img/${fileName}' /></div>
        <div style="text-align:center; margin-top:200px;">
          <div style="color:#333;font-size:1.2em;margin-bottom:10px;">${msg}</div>
          <div style="color:#555;margin-bottom:20px;">
            Current window size: <strong>${currentWidth} x ${currentHeight}</strong>
          </div>
          <button class="jspsych-btn" ${
            canContinue
              ? ""
              : 'disabled style="opacity:0.5;cursor:not-allowed;"'
          }>
            ${trial.button_label}
          </button>
        </div>
      `;
      }

      function checkSize() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const canContinue = w >= trial.min_width && h >= trial.min_height;
        console.log(`Can continue? ${canContinue}`);
        display_element.innerHTML = getHTML(w, h, canContinue);

        // Add button listener if enabled
        if (canContinue) {
          display_element
            .querySelector(".jspsych-btn")
            .addEventListener("click", () => {
              window.removeEventListener("resize", checkSize);
              jsPsych.finishTrial({
                window_width: w,
                window_height: h,
              });
            });
        }
      }

      // Initial check and add listener
      console.log(
        "Max available size:",
        window.screen.availWidth,
        window.screen.availHeight
      );
      checkSize();
      window.addEventListener("resize", checkSize);
    }
  }
  jsPsychWindowResize.info = info;

  return jsPsychWindowResize;
})(jsPsychModule);
