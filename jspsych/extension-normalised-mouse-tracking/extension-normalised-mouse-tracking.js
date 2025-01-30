var jsPsychExtensionMouseTracking = (function (jspsych) {
  "use strict";

  var _package = {
    name: "@jspsych/extension-mouse-tracking",
    version: "1.1.0",
    description:
      "jsPsych extension for mouse tracking regardless of screen size",
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
    author: "Josh de Leeuw",
    license: "MIT",
    bugs: {
      url: "https://github.com/jspsych/jsPsych/issues",
    },
    homepage: "https://www.jspsych.org/latest/extensions/mouse-tracking",
    peerDependencies: {
      jspsych: ">=7.0.0",
    },
    devDependencies: {
      "@jspsych/config": "^3.0.0",
      "@jspsych/test-utils": "^1.2.0",
    },
  };

  class NormalisedMouseTrackingExtension {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }
    static info = {
      name: "normalised-mouse-tracking",
      version: _package.version,
      data: {
        mouse_tracking_data: {
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
        mouse_tracking_targets: {
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
      this.eventsToTrack = params.events || ["mousemove"];
      this.domObserver.observe(this.jsPsych.getDisplayElement(), {
        childList: true,
      });
    };
    on_load = () => {
      this.currentTrialStartTime = performance.now();
      if (this.eventsToTrack.includes("mousemove")) {
        window.addEventListener("mousemove", this.mouseMoveEventHandler);
      }
      if (this.eventsToTrack.includes("mousedown")) {
        window.addEventListener("mousedown", this.mouseDownEventHandler);
      }
      if (this.eventsToTrack.includes("mouseup")) {
        window.addEventListener("mouseup", this.mouseUpEventHandler);
      }
    };
    on_finish = () => {
      this.domObserver.disconnect();
      if (this.eventsToTrack.includes("mousemove")) {
        window.removeEventListener("mousemove", this.mouseMoveEventHandler);
      }
      if (this.eventsToTrack.includes("mousedown")) {
        window.removeEventListener("mousedown", this.mouseDownEventHandler);
      }
      if (this.eventsToTrack.includes("mouseup")) {
        window.removeEventListener("mouseup", this.mouseUpEventHandler);
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
        mouse_tracking_targets: Object.fromEntries(
          this.currentTrialTargets.entries()
        ),
        mouse_tracking_data: this.currentTrialData,
      };
    };

    mouseMoveEventHandler = ({ clientX: x, clientY: y }) => {
      const event_time = performance.now();
      const t = Math.round(event_time - this.currentTrialStartTime);
      if (
        this.lastSampleTime === null ||
        event_time - this.lastSampleTime >= this.minimumSampleTime
      ) {
        this.lastSampleTime = event_time;
        const normalisedX = x / window.innerWidth;
        const normalisedY = y / window.innerHeight;
        this.currentTrialData.push({
          x,
          y,
          normalisedX,
          normalisedY,
          t,
          event: "mousemove",
        });
      }
    };
    mouseUpEventHandler = ({ clientX: x, clientY: y }) => {
      const event_time = performance.now();
      const t = Math.round(event_time - this.currentTrialStartTime);
      const normalisedX = x / window.innerWidth;
      const normalisedY = y / window.innerHeight;
      this.currentTrialData.push({
        x,
        y,
        normalisedX,
        normalisedY,
        t,
        event: "mouseup",
      });
    };
    mouseDownEventHandler = ({ clientX: x, clientY: y }) => {
      const event_time = performance.now();
      const t = Math.round(event_time - this.currentTrialStartTime);
      const normalisedX = x / window.innerWidth;
      const normalisedY = y / window.innerHeight;
      this.currentTrialData.push({
        x,
        y,
        normalisedX,
        normalisedY,
        t,
        event: "mousedown",
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

  return NormalisedMouseTrackingExtension;
})(jsPsychModule);
