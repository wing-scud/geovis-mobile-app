/* eslint-disable @typescript-eslint/no-unused-vars */
const DOWN = 0;
const UP = 1;
const LEFT = 2;
const RIGHT = 3;
const SPEEDUP = 4;
const SPEEDDOWN = 5;
const START = 6;
const AHEAD = 7;
const BACK = 8;
const MOVEING = 9;
class ThirdPersonViewer {
  constructor(earth) {
    this._earth = earth;
    this._canvas = earth._canvas;
    this._camera = earth.camera;
    this._radians = GeoVis.Math.toRadians(1);
    this._orientation = new GeoVis.HeadingPitchRoll();
    this._speed = 0;
    this._path = false;
    this._pathEntity = undefined;
    this._primitive = undefined;
    this._direction = START;
    this._position = undefined;
    this._samplePosition = new GeoVis.SampledPositionProperty();
    this._earth.clock.shouldAnimate = true;
    this._earth.scene.preRender.addEventListener(this._update);
  }
  get primitive() {
    return this._primitive;
  }
  set primitive(primitive) {
    this.clear();
    this._primitive = primitive;
    this._direction = START;
    const position = GeoVis.Matrix4.multiplyByPoint(
      this._primitive.modelMatrix,
      GeoVis.Cartesian3.UNIT_X,
      new GeoVis.Cartesian3()
    );
    this.primitive.position = position;
    this._position = position;
    // const time = new GeoVis.JulianDate();
    // GeoVis.JulianDate.addSeconds(GeoVis.JulianDate.now(), -0.001, time);
    // this._samplePosition.addSample(time, position);
    this._earth.trackedEntity = primitive;
  }
  get path() {
    return this._path;
  }
  set path(value) {
    this._path = value;
    value ? this._addPath() : this._removePath();
  }
  get state() {
    return this._state;
  }
  get speed() {
    return this._speed;
  }
  set speed(value) {
    this._speed = value;
  }
  initEventListener() {
    const canvas = this._canvas;
    canvas.setAttribute("tabindex", "0");
    canvas.focus();
    canvas.onkeydown = this._keyDown;
    canvas.onkeyup = this._keyUp;
  }
  removeEventListener() {
    const canvas = this._canvas;
    canvas.removeEventListener("keydown", this._keyDown);
    canvas.removeEventListener("keyup", this._keyUp);
    canvas.removeAttribute("tabindex");
  }
  open() {
    this.initEventListener();
  }
  close() {
    this.clear();
    this.removeEventListener();
  }
  _keyDown = event => {
    const keyCode = event.keyCode;
    switch (keyCode) {
      case "W".charCodeAt(0):
        this._direction = AHEAD;
        break;
      case "S".charCodeAt(0):
        this._direction = BACK;
        break;
      case "D".charCodeAt(0):
        this._direction = RIGHT;
        break;
      case "A".charCodeAt(0):
        this._direction = LEFT;
        break;
      case "Q".charCodeAt(0):
        this._direction = UP;
        break;
      case "E".charCodeAt(0):
        this._direction = DOWN;
        break;
      case "Z".charCodeAt(0):
        this._direction = SPEEDUP;
        break;
      case "X".charCodeAt(0):
        this._direction = SPEEDDOWN;
        break;
      default:
        this._direction = MOVEING;
        break;
    }
  };
  _keyUp = event => {
    console.log("keyup");
    this._direction = MOVEING;
  };
  _update = () => {
    const primitive = this._primitive;
    if (primitive) {
      const radians = this._radians;
      const direction = this._direction;
      let speed = 0;
      switch (direction) {
        case SPEEDUP:
          if (this._speed < 0) {
            speed = this._speed - 10;
          } else {
            speed = this._speed + 10;
          }
          this._speed = this._limitSpeed(speed, this._speed);
          break;
        case SPEEDDOWN:
          if (this._speed < 0) {
            speed = this._speed + 10;
          } else {
            speed = this._speed - 10;
          }
          this._speed = this._limitSpeed(speed, this._speed);
          break;
        case RIGHT:
          this._orientation.heading = this._limitRadians(
            this._orientation.heading + radians
          );
          break;
        case LEFT:
          this._orientation.heading = this._limitRadians(
            this._orientation.heading - radians
          );
          break;
        case UP:
          this._orientation.pitch = this._limitRadians(
            this._orientation.pitch + radians
          );
          break;
        case DOWN:
          this._orientation.pitch = this._limitRadians(
            this._orientation.pitch - radians
          );
          break;
        case START:
          this._speed = 10;
          break;
        case AHEAD:
          this._speed = Math.abs(this._speed);
          break;
        case BACK:
          this._speed = -Math.abs(this._speed) ;
          break;
        default:
          break;
      }
      const modelMatrix = primitive.modelMatrix;
      speed = this._speed;
      const speedVector = new GeoVis.Cartesian3();
      GeoVis.Cartesian3.multiplyByScalar(
        GeoVis.Cartesian3.UNIT_X,
        speed / 10,
        speedVector
      );
      const position = new GeoVis.Cartesian3();
      GeoVis.Matrix4.multiplyByPoint(modelMatrix, speedVector, position);
      this._position = position;
      const time = new GeoVis.JulianDate();
      GeoVis.JulianDate.addSeconds(GeoVis.JulianDate.now(), -0.001, time);
      this._samplePosition.addSample(time, position);
      primitive.position = position;
      primitive.modelMatrix = GeoVis.Transforms.headingPitchRollToFixedFrame(
        position,
        this._orientation
      );
    }
  };
  _limitRadians(value) {
    value = value > GeoVis.Math.TWO_PI ? value - GeoVis.Math.TWO_PI : value;
    value = value < -GeoVis.Math.TWO_PI ? value + GeoVis.Math.TWO_PI : value;
    console.log(GeoVis.Math.toDegrees(value));
    return value;
  }
  _limitSpeed(value, origin) {
    if (value < 0 && origin > 0) {
      value = 10;
    } else if (value > 0 && origin < 0) {
      value = -10;
    }
    return value;
  }
  clear() {
    if (this._path) {
      this._earth.entities.remove(this._pathEntity);
      this._pathEntity = undefined;
      this._path = false;
    }
    if (this._earth.trackedEntity) {
      this._earth.trackedEntity = undefined;
    }
    this._samplePosition = new GeoVis.SampledPositionProperty();
    this._speed = 0;
    this._orientation = new GeoVis.HeadingPitchRoll();
    this._radians = GeoVis.Math.toRadians(1);
  }
  _addPath() {
    this._earth.scene.preRender.addEventListener(() => {
      const time = this._earth.clock.currentTime;
      const position = this._samplePosition.getValue(time);
      GeoVis.JulianDate.addSeconds(time, -0.01, time);
      const deltaPosition = this._samplePosition.getValue(time);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      const polyline = addPolyline([deltaPosition, position]).addTo(
        this._earth.features
      );
    });
    // this._pathEntity = this._earth.entities.add({
    //   id: GeoVis.createGuid(),
    //   position: this._samplePosition,
    //   path: {
    //     show: true,
    //     leadTime: 0,
    //     trailTime: 60,
    //     width: 8,
    //     resolution: 1,
    //     material: new GeoVis.PolylineGlowMaterialProperty({
    //       glowPower: 0.3,
    //       taperPower: 0.3,
    //       color: GeoVis.Color.PALEGOLDENROD
    //     })
    //   }
    // });
  }
  _removePath() {
    if (this._path) {
      this._earth.entities.remove(this._pathEntity);
      this._pathEntity = undefined;
      this._path = false;
    }
  }
}
function addPolyline(positions) {
  const polyline = new GeoVis.Polyline(positions, {
    width: 4
  });
  return polyline;
}
export default ThirdPersonViewer;
