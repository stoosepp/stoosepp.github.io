var jsPsychExtensionTouchCapture = (function (jspsych) {
  "use strict";

  var _package = {
    name: "@jspsych/extension-touch-capture",
    version: "1.1.0",
    description:
      "jsPsych extension for touch capture regardless of screen size",
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
      directory: "packages/extension-mouse-tracking",
    },
    author: "Stoo Sepp",
    license: "MIT",
    bugs: {
      url: "https://stoosepp.github.io/",
    },
    homepage: "https://www.stoosepp.com",
    peerDependencies: {
      jspsych: ">=7.0.0",
    },
    devDependencies: {
      "@jspsych/config": "^3.0.0",
      "@jspsych/test-utils": "^1.2.0",
    },
  };

  class TouchCaptureExtension {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }
    static info = {
      name: "touch-capture",
      version: _package.version,
      data: {
        touch_capture_data: {
          type: jspsych.ParameterType.COMPLEX,
          array: true,
          nested: {
            x: {
              type: jspsych.ParameterType.INT,
            },
            y: {
              type: jspsych.ParameterType.INT,
            },
            t: {
              type: jspsych.ParameterType.INT,
            },
            event: {
              type: jspsych.ParameterType.STRING,
            },
          },
        },
        target_dimensions: {
          type: jspsych.ParameterType.COMPLEX,
          nested: {
            x: {
              type: jspsych.ParameterType.INT,
            },
            y: {
              type: jspsych.ParameterType.INT,
            },
            width: {
              type: jspsych.ParameterType.INT,
            },
            height: {
              type: jspsych.ParameterType.INT,
            },
            top: {
              type: jspsych.ParameterType.INT,
            },
            bottom: {
              type: jspsych.ParameterType.INT,
            },
            left: {
              type: jspsych.ParameterType.INT,
            },
          },
        },
        browser_dimensions: {
          type: jspsych.ParameterType.COMPLEX,
          nested: {
            width: {
              type: jspsych.ParameterType.INT,
            },
            height: {
              type: jspsych.ParameterType.INT,
            },
          },
        },
        touch_capture_targets: {
          type: jspsych.ParameterType.COMPLEX,
          array: true,
          nested: {
            x: {
              type: jspsych.ParameterType.INT,
            },
            y: {
              type: jspsych.ParameterType.INT,
            },
            width: {
              type: jspsych.ParameterType.INT,
            },
            height: {
              type: jspsych.ParameterType.INT,
            },
            top: {
              type: jspsych.ParameterType.INT,
            },
            bottom: {
              type: jspsych.ParameterType.INT,
            },
            left: {
              type: jspsych.ParameterType.INT,
            },
            right: {
              type: jspsych.ParameterType.INT,
            },
          },
        },
      },
    };
    domObserver;
    currentTrialData;
    currentTrialTargets;
    currentTrialSelectors;
    currentTrialStartTime;
    minimumSampleTime;
    lastSampleTime;
    eventsToTrack;
    initialize = async ({ minimum_sample_time = 0 }) => {
      this.domObserver = new MutationObserver(this.mutationObserverCallback);
      this.minimumSampleTime = minimum_sample_time;
    };
    on_start = (params) => {
      params = params || {};
      this.currentTrialData = [];
      this.currentTrialTargets = /* @__PURE__ */ new Map();
      this.currentTrialSelectors = params.targets || [];
      this.lastSampleTime = null;
      this.eventsToTrack = params.events || ["touchstart","touchmove","touchend","touchcancel"];
      this.domObserver.observe(this.jsPsych.getDisplayElement(), {
        childList: true,
      });
    };
    on_load = () => {
      this.currentTrialStartTime = performance.now();
      if (this.eventsToTrack.includes("touchmove")) {
        window.addEventListener("touchmove", this.touchMoveEventHandler);
      }
      if (this.eventsToTrack.includes("touchstart")) {
        window.addEventListener("touchstart", this.touchStartEventHandler);
      }
      if (this.eventsToTrack.includes("touchend")) {
        window.addEventListener("touchend", this.touchEndEventHandler);
      }
      if (this.eventsToTrack.includes("touchcancel")) {
        window.addEventListener("touchcancel", this.touchEndEventHandler);
      }
    };
    on_finish = () => {
      this.domObserver.disconnect();
      if (this.eventsToTrack.includes("touchmove")) {
        window.removeEventListener("touchmove", this.touchMoveEventHandler);
      }
      if (this.eventsToTrack.includes("touchstart")) {
        window.removeEventListener("touchstart", this.touchStartEventHandler);
      }
      if (this.eventsToTrack.includes("touchend")) {
        window.removeEventListener("touchend", this.touchEndEventHandler);
      }

      //Testing Getting Mouse Tracking Target info
      const targetObject = Object.fromEntries(
        this.currentTrialTargets.entries()
      );

      let targetSelector = null; //ends up being '#target';
      let objectValue = null;

      Object.keys(targetObject).forEach((key) => {
        // Perform operations with key and object[key]
        targetSelector = key;
        objectValue = targetObject[key];
      });
      const x = objectValue.x;
      const y = objectValue.y;
      const width = objectValue.width;
      const height = objectValue.height;
      const top = objectValue.top;
      const bottom = objectValue.bottom;
      const right = objectValue.top;
      const left = objectValue.left;

      //RETURN VALUES TO TRIAL
      return {
        browser_dimensions: { innerWidth, innerHeight },
        target_dimensions: {
          targetSelector,
          x,
          y,
          width,
          height,
          top,
          bottom,
          left,
          right,
        },
        touch_capture_targets: Object.fromEntries(
          this.currentTrialTargets.entries()
        ),
        touch_capture_data: this.currentTrialData,
      };
    };

    //Start
    touchStartEventHandler = (touchEvent) => {
      const event_time = performance.now();
      const t = Math.round(event_time - this.currentTrialStartTime);

      //touchEvent.preventDefault();
      const touch = touchEvent.targetTouches[0];
      const x = touch.pageX;
      const y = touch.pageY;
      const normalisedX = x / window.innerWidth;
      const normalisedY = y / window.innerHeight;
      this.currentTrialData.push({
        x,
        y,
        normalisedX,
        normalisedY,
        t,
        event: "touchstart",
      });
    };

    //Move
    touchMoveEventHandler = (touchEvent) => {
      const event_time = performance.now();
      const t = Math.round(event_time - this.currentTrialStartTime);

      //touchEvent.preventDefault();
      const touch = touchEvent.targetTouches[0];
      const x = touch.pageX;
      const y = touch.pageY;
      const normalisedX = x / window.innerWidth;
      const normalisedY = y / window.innerHeight;
      this.currentTrialData.push({
        x,
        y,
        normalisedX,
        normalisedY,
        t,
        event: "touchmove",
      });
    };

    //End
    touchEndEventHandler = (touchEvent) => {
      const event_time = performance.now();
      const t = Math.round(event_time - this.currentTrialStartTime);

      //touchEvent.preventDefault();
      const touch = touchEvent.changedTouches[0];
      const x = touch.pageX;
      const y = touch.pageY;
      const normalisedX = x / window.innerWidth;
      const normalisedY = y / window.innerHeight;
      this.currentTrialData.push({
        x,
        y,
        normalisedX,
        normalisedY,
        t,
        event: "touchend",
      });
    };

    //Cancel
    touchCencelEventHandler = (touchEvent) => {
      const event_time = performance.now();
      const t = Math.round(event_time - this.currentTrialStartTime);

      //touchEvent.preventDefault();
      const touch = touchEvent.changedTouches[0];
      const x = touch.pageX;
      const y = touch.pageY;
      const normalisedX = x / window.innerWidth;
      const normalisedY = y / window.innerHeight;
      this.currentTrialData.push({
        x,
        y,
        normalisedX,
        normalisedY,
        t,
        event: "touchcancel",
      });
    };
   
    mutationObserverCallback = (mutationsList, observer) => {
      for (const selector of this.currentTrialSelectors) {
        if (!this.currentTrialTargets.has(selector)) {
          const target = this.jsPsych
            .getDisplayElement()
            .querySelector(selector);
          if (target) {
            this.currentTrialTargets.set(
              selector,
              target.getBoundingClientRect()
            );
          }
        }
      }
    };
  }

  return TouchCaptureExtension;
})(jsPsychModule);
