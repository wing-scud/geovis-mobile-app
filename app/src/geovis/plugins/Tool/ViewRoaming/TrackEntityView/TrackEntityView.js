class TrackEntityView {
  constructor(earth, clock) {
    this._earth = earth;
    this._primitive = undefined;
    this._position = undefined;
    this._data = undefined;
    this._clock = clock ? clock : earth.clock;
    this._samplePosition = undefined;
    this._listener = earth.scene.preRender.addEventListener(this._update);
    this._interval = undefined;
    this._orientationProperty = undefined;
    this._totalPath = undefined;
    this._passedPath = undefined;
    this._camera = this._earth.camera;
    this._totalPathEntity = undefined;
    this._passedPathEntity = undefined;
  }
  get primitive() {
    return this._primitive;
  }
  set totalPath(value) {
    //  value ? this._addTotalPath() : this._removeTotalPath();
    this._totalPath = value;
  }
  get totalPath() {
    return this._totalPath;
  }
  set passedPath(value) {
    this._passedPath = value;
  }
  get passedPath() {
    return this._passedPath;
  }
  _update = () => {
    if (this._clock.shouldAnimate) {
      const time = this._clock.currentTime;
      const sampleProperty = this._samplePosition;
      const orientationProperty = this._orientationProperty;
      const primitive = this._primitive;
      if (primitive && sampleProperty && orientationProperty) {
        const position = sampleProperty.getValue(time);
        const orientation = orientationProperty.getValue(time);
        if (position && orientation) {
          const hpr = GeoVis.HeadingPitchRoll.fromQuaternion(
            orientation,
            new GeoVis.HeadingPitchRoll()
          );
          this._position = position;
          const ma = GeoVis.Matrix3.fromHeadingPitchRoll(hpr);
          const transform = GeoVis.Matrix4.fromRotationTranslation(
            ma,
            position
          );
          this._position = position;
          primitive.modelMatrix = transform;
          this._camera.lookAt(position, new GeoVis.Cartesian3(0.0, 0.0, 10));
          this._camera.setView({
            orientation: {
              heading: hpr.heading - GeoVis.Math.toRadians(65),
              pitch: GeoVis.Math.toRadians(0),
              roll: 0
            }
          });
          this._primitive.show = false;
        }
      }
    }
  };
  start() {
    this._clock.shouldAnimate = true;
  }
  stop() {
    this._clock.shouldAnimate = false;
  }
  restart() {
    const interval = this._interval;
    const start = interval.start;
    this._clock.currentTime = GeoVis.JulianDate.clone(start);
  }
  clear() {
    this._primitive = undefined;
    this._position = undefined;
    this._data = undefined;
    this._samplePosition = undefined;
    this._interval = undefined;
    this._orientationProperty = undefined;
    this._earth.entities.remove(this._totalPathEntity);
    this._earth.entities.remove(this._passedPathEntity);
    this._totalPath = undefined;
    this._passedPath = undefined;
    this._totalPathEntity = undefined;
    this._passedPathEntity = undefined;
    this._earth.trackedEntity = undefined;
    this._camera.lookAtTransform(GeoVis.Matrix4.IDENTITY);
  }
  bindPrimitive(primitive, data) {
    this._primitive = primitive;
    const { sampledPosition, orientationProperty, interval } = data;
   // this.primitive.positionProperty = sampledPosition;
  //  this._earth.trackedEntity = this._primitive;
    this._samplePosition = sampledPosition;
    this._orientationProperty = orientationProperty;
    interval.stop.secondsOfDay = Math.floor(interval.stop.secondsOfDay);
    this._interval = interval;
    const start = interval.start;
    this._clock.currentTime = GeoVis.JulianDate.clone(start);
    console.log(interval);
  }
}
export default TrackEntityView;
