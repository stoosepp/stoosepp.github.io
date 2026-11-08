class CompactMouseTracking extends jsPsychExtensionMouseTracking {
  constructor(jsPsych) {
    super(jsPsych);

    const trackMove = this.mouseMoveEventHandler;
    this.mouseMoveEventHandler = event => {
      this.recordViewport();
      const previousLength = this.currentTrialData.length;
      trackMove(event);
      if (this.currentTrialData.length > previousLength) {
        const sample = this.currentTrialData[previousLength];
        this.currentTrialData[previousLength] = [sample.t, sample.x, sample.y];
      }
    };

    const load = this.on_load;
    this.on_load = () => {
      load();
      this.viewportChanges = [];
      this.recordViewport();
      window.addEventListener("resize", this.recordViewport);
    };

    const finish = this.on_finish;
    this.on_finish = () => {
      this.recordViewport();
      window.removeEventListener("resize", this.recordViewport);
      return {
        ...finish(),
        mouse_tracking_columns: ["t", "x", "y"],
        browser_dimensions: { innerWidth: window.innerWidth, innerHeight: window.innerHeight },
        viewport_changes: this.viewportChanges,
      };
    };
  }

  recordViewport = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const previous = this.viewportChanges[this.viewportChanges.length - 1];
    if (!previous || previous.width !== width || previous.height !== height) {
      this.viewportChanges.push({
        t: Math.round(performance.now() - this.currentTrialStartTime),
        width,
        height,
      });
    }
  };
}
