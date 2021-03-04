

export class CesiumTimelineHelper {
  constructor(viewer) {
    this.viewer = viewer;
  }

  get enabled() {
    return (typeof this.viewer.timeline !== "undefined");
  }

  clearTimeline() {
    if (!this.enabled) {
      return;
    }
    this.viewer.timeline._highlightRanges = [];
    this.viewer.timeline.updateFromClock();
    this.viewer.timeline.zoomTo(this.viewer.clock.startTime, this.viewer.clock.stopTime);
  }

  addHighlightRanges(ranges) {
    if (!this.enabled) {
      return;
    }
    for (const range of ranges) {
      const startJulian = new GeoVis.JulianDate.fromDate(new Date(range.start));
      const endJulian = new GeoVis.JulianDate.fromDate(new Date(range.end));
      const highlightRange = this.viewer.timeline.addHighlightRange(GeoVis.Color.BLUE, 100, 0);
      highlightRange.setRange(startJulian, endJulian);
      this.viewer.timeline.updateFromClock();
      this.viewer.timeline.zoomTo(this.viewer.clock.startTime, this.viewer.clock.stopTime);
    }
  }
}
