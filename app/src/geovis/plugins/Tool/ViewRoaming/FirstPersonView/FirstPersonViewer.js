/* eslint-disable */
const GeoVis = window.GeoVis;
const { Quaternion, Transforms, Cartesian3, Matrix4 } = GeoVis;

const DIRECTION_NONE = -1;

const DIRECTION_FORWARD = 0;
const DIRECTION_BACKWARD = 1;
const DIRECTION_LEFT = 2;
const DIRECTION_RIGHT = 3;
const DIRECTION_UP = 4;
const DIRECTION_DOWN = 5;
const EYE_FORWARD = 6; // 沿视线向前
const EYE_BACKWARD = 7; //沿视线向后
const MAX_PITCH_IN_DEGREE = 88;
const ROTATE_SPEED = -3;
let SHIFT_DOWN = false;
/** @type {Cartesian3} */
let rotateTarget = undefined;

function getHeadingPitchRoll(camera, target) {
  const transform = Transforms.eastNorthUpToFixedFrame(target);
  const inverse = Matrix4.inverseTransformation(transform, new Matrix4());

  const localCameraPos = Matrix4.multiplyByPoint(
    inverse,
    camera.positionWC,
    new Cartesian3()
  );
  const origin = new Cartesian3();
  const velocity = Cartesian3.subtract(
    localCameraPos,
    origin,
    new GeoVis.Cartesian3()
  );
  Cartesian3.normalize(velocity, velocity);
  const rotationMatrix3 = Transforms.rotationMatrixFromPositionVelocity(
    target,
    velocity,
    GeoVis.Ellipsoid.UNIT_SPHERE
  );
  const q = Quaternion.fromRotationMatrix(rotationMatrix3);
  const hpr = GeoVis.HeadingPitchRoll.fromQuaternion(q);
  return hpr;
}

function rotateCamera(camera, target, heading, pitch) {
  const transform = Transforms.eastNorthUpToFixedFrame(target);
  const inverse = Matrix4.inverseTransformation(transform, new Matrix4());
  const origin = new Cartesian3();
  const localCameraPos = Matrix4.multiplyByPoint(
    inverse,
    camera.positionWC,
    new Cartesian3()
  );
  const hpr = getHeadingPitchRoll(camera, target);
  const range = GeoVis.Cartesian3.distance(origin, localCameraPos);
  const headingPitchRange = new GeoVis.HeadingPitchRange(
    hpr["heading"] - Math.PI / 2 + heading,
    -hpr["pitch"] + pitch,
    range
  );
  camera.lookAtTransform(transform, headingPitchRange);
  camera.lookAtTransform(GeoVis.Matrix4.IDENTITY);
}

class GeoVisFirstPersonCameraController {
  /**
   *
   * @param {*} options
   */
  constructor(options) {
    this.state = {
      eyeHeight: options.eyeHeight || 1e3,
      walkingSpeed: options.walkingSpeed || 1.5,
      withTerrainOffset: options.withTerrainOffset || false
    };
    this._enabled = false;
    /** @type {GeoVis.Earth} */
    this._earth = options.earth;
    this._canvas = this._earth.canvas;
    this._camera = this._earth.camera;
    this._connectEventHandlers();
  }

  zoomTo = lonlat => {
    // if (!this._enabled) return;
    const earth = this._earth;
    lonlat = [...lonlat];
    const targetCarto = GeoVis.Cartographic.fromDegrees(...lonlat);
    return new Promise(resolve => {
      GeoVis.sampleTerrain(earth.scene.terrainProvider, 11, [targetCarto]).then(
        results => {
          const targetSampleTerrain =
            results[0].height || earth.globe.getHeight(targetCarto);
          const targetHeight = this.state.withTerrainOffset
            ? targetSampleTerrain + this.state.eyeHeight
            : this.state.eyeHeight;
          lonlat[2] = targetHeight;
          this._earth.camera.flyTo({
            duration: 1.5,
            destination: GeoVis.Cartesian3.fromDegrees(...lonlat),
            complete: () => resolve(),
            orientation: {
              heading: this._earth.camera.heading,
              pitch: (-Math.PI * 1) / 16
            }
          });
        }
      );
    });
  };
}

GeoVisFirstPersonCameraController.prototype._connectEventHandlers = function() {
  const canvas = this._earth.canvas;

  this._screenSpaceEventHandler = new GeoVis.ScreenSpaceEventHandler(
    this._canvas
  );

  this._screenSpaceEventHandler.setInputAction(
    this._onMouseLButtonClicked.bind(this),
    GeoVis.ScreenSpaceEventType.LEFT_DOWN
  );
  this._screenSpaceEventHandler.setInputAction(
    this._onMouseUp.bind(this),
    GeoVis.ScreenSpaceEventType.LEFT_UP
  );

  this._screenSpaceEventHandler.setInputAction(
    this._onMouseRDown.bind(this),
    GeoVis.ScreenSpaceEventType.RIGHT_DOWN
  );
  this._screenSpaceEventHandler.setInputAction(
    this._onMouseRUp.bind(this),
    GeoVis.ScreenSpaceEventType.RIGHT_UP
  );

  this._screenSpaceEventHandler.setInputAction(
    this._onMouseMove.bind(this),
    GeoVis.ScreenSpaceEventType.MOUSE_MOVE
  );
  // this._screenSpaceEventHandler.setInputAction(
  //   this._onMouseLButtonDoubleClicked.bind(this),
  //   GeoVis.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
  // );

  // needed to put focus on the canvas
  canvas.setAttribute("tabindex", "0");

  canvas.onclick = function() {
    canvas.focus();
  };

  canvas.addEventListener("keydown", this._onKeyDown.bind(this));
  canvas.addEventListener("keyup", this._onKeyUp.bind(this));

  this._disconectOnClockTick = this._earth.clock.onTick.addEventListener(
    GeoVisFirstPersonCameraController.prototype._onClockTick,
    this
  );
};

GeoVisFirstPersonCameraController.prototype._onMouseLButtonClicked = function(
  movement
) {
  this._looking = true;
  this._mousePosition = this._startMousePosition = Cartesian3.clone(
    movement.position
  );
};

GeoVisFirstPersonCameraController.prototype._onMouseLButtonDoubleClicked = function(
  movement
) {
  this._looking = true;
  this._mousePosition = this._startMousePosition = Cartesian3.clone(
    movement.position
  );
};

// 鼠标右键按下开始围绕目标点旋转
GeoVisFirstPersonCameraController.prototype._onMouseRDown = function(movement) {
  if (!this._enabled) return;
  const ray = this._earth.camera.getPickRay(movement.position);
  rotateTarget = this._earth.globe.pick(ray, this._earth.scene);
  if (rotateTarget) {
    const distance = GeoVis.Cartesian3.distance(
      rotateTarget,
      this._earth.camera.positionWC
    );
    const bs = new GeoVis.BoundingSphere(rotateTarget, distance);
    const hpr = getHeadingPitchRoll(this._earth.camera, rotateTarget);
    this._earth.camera.flyToBoundingSphere(bs, {
      duration: 0.6,
      offset: new GeoVis.HeadingPitchRange(
        hpr.heading - Math.PI / 2,
        Math.min(-Math.PI / 8, hpr.pitch),
        distance
      ),
      complete: () => {
        this._rotating = !!rotateTarget;
      }
    });

    this._mousePosition = this._startMousePosition = Cartesian3.clone(
      movement.position
    );
  }
};

// 鼠标右键释放停止旋转，并同步视高
GeoVisFirstPersonCameraController.prototype._onMouseRUp = function(position) {
  if (!this._enabled) return;
  rotateTarget = undefined;
  const carto = this._earth.camera.positionCartographic;
  this.state.eyeHeight = carto.height;
  this._rotating = false;
};

GeoVisFirstPersonCameraController.prototype._onMouseUp = function(position) {
  this._looking = false;
};

GeoVisFirstPersonCameraController.prototype._onMouseMove = function(movement) {
  this._mousePosition = movement.endPosition;
};

GeoVisFirstPersonCameraController.prototype._onKeyDown = function(event) {
  const keyCode = event.keyCode;

  this._direction = DIRECTION_NONE;

  switch (keyCode) {
    case "W".charCodeAt(0):
      this._direction = SHIFT_DOWN ? EYE_FORWARD : DIRECTION_FORWARD;
      return;
    case "S".charCodeAt(0):
      this._direction = SHIFT_DOWN ? EYE_BACKWARD : DIRECTION_BACKWARD;
      return;
    case "D".charCodeAt(0):
      this._direction = DIRECTION_RIGHT;
      return;
    case "A".charCodeAt(0):
      this._direction = DIRECTION_LEFT;
      return;
    case "Q".charCodeAt(0):
      this._direction = DIRECTION_UP;
      return;
    case "E".charCodeAt(0):
      this._direction = DIRECTION_DOWN;
      return;
    case 16:
      SHIFT_DOWN = true;
      return;
    case 90: // z
      return;
    default:
      return;
  }
};

GeoVisFirstPersonCameraController.prototype._onKeyUp = function(e) {
  this._direction = DIRECTION_NONE;
  if (e.keyCode === 16) {
    SHIFT_DOWN = false;
  }
};

GeoVisFirstPersonCameraController.prototype._changeHeadingPitch = function(dt) {
  const width = this._canvas.clientWidth;
  const height = this._canvas.clientHeight;

  const deltaX = -(this._mousePosition.x - this._startMousePosition.x) / width;
  const deltaY = (this._mousePosition.y - this._startMousePosition.y) / height;

  const currentHeadingInDegree = GeoVis.Math.toDegrees(this._camera.heading);
  const deltaHeadingInDegree = deltaX * ROTATE_SPEED;
  const newHeadingInDegree = currentHeadingInDegree + deltaHeadingInDegree;

  const currentPitchInDegree = GeoVis.Math.toDegrees(this._camera.pitch);
  const deltaPitchInDegree = deltaY * ROTATE_SPEED;
  let newPitchInDegree = currentPitchInDegree + deltaPitchInDegree;

  if (
    newPitchInDegree > MAX_PITCH_IN_DEGREE * 2 &&
    newPitchInDegree < 360 - MAX_PITCH_IN_DEGREE
  ) {
    newPitchInDegree = 360 - MAX_PITCH_IN_DEGREE;
  } else {
    if (
      newPitchInDegree > MAX_PITCH_IN_DEGREE &&
      newPitchInDegree < 360 - MAX_PITCH_IN_DEGREE
    ) {
      newPitchInDegree = MAX_PITCH_IN_DEGREE;
    }
  }

  this._camera.setView({
    orientation: {
      heading: GeoVis.Math.toRadians(newHeadingInDegree),
      pitch: GeoVis.Math.toRadians(newPitchInDegree),
      roll: this._camera.roll
    }
  });
};

const scratchCurrentDirection = new Cartesian3();
const scratchDeltaPosition = new Cartesian3();
const scratchNextPosition = new Cartesian3();
const scratchTerrainConsideredNextPosition = new Cartesian3();
const scratchNextCartographic = new GeoVis.Cartographic();

GeoVisFirstPersonCameraController.prototype._onClockTick = function(clock) {
  if (!this._enabled) return;

  const dt = clock._clockStep;

  if (this._rotating) {
    // 处理鼠标右键偏移量，旋转相机
    const width = this._canvas.clientWidth;
    const height = this._canvas.clientHeight;

    const deltaX = (this._mousePosition.x - this._startMousePosition.x) / width;
    const deltaY =
      (this._mousePosition.y - this._startMousePosition.y) / height;
    console.log(deltaX, deltaY);
    rotateCamera(this._earth.camera, rotateTarget, deltaX / 40, deltaY / 400);
    // this._startMousePosition = this._mousePosition;
  } else {
    if (this._looking) this._changeHeadingPitch(dt);
    if (this._direction === DIRECTION_NONE) return;

    const distance = this._walkingSpeed() * dt;
    const cameraHeight = this._camera.positionCartographic.height;
    const moveRate = this._walkingSpeed() * (5 + cameraHeight / 800.0);
    if (
      this._direction === DIRECTION_FORWARD ||
      this._direction === EYE_FORWARD
    )
      Cartesian3.multiplyByScalar(
        this._camera.direction,
        moveRate,
        scratchCurrentDirection
      );
    else if (
      this._direction === DIRECTION_BACKWARD ||
      this._direction === EYE_BACKWARD
    )
      Cartesian3.multiplyByScalar(
        this._camera.direction,
        -moveRate,
        scratchCurrentDirection
      );
    else if (this._direction === DIRECTION_LEFT)
      Cartesian3.multiplyByScalar(
        this._camera.right,
        -moveRate,
        scratchCurrentDirection
      );
    else if (this._direction === DIRECTION_RIGHT)
      Cartesian3.multiplyByScalar(
        this._camera.right,
        moveRate,
        scratchCurrentDirection
      );
    else if (this._direction === DIRECTION_UP)
      Cartesian3.multiplyByScalar(
        this._camera.up,
        moveRate,
        scratchCurrentDirection
      );
    else if (this._direction === DIRECTION_DOWN)
      Cartesian3.multiplyByScalar(
        this._camera.up,
        -moveRate,
        scratchCurrentDirection
      );

    Cartesian3.multiplyByScalar(
      scratchCurrentDirection,
      distance,
      scratchDeltaPosition
    );

    const currentCameraPosition = this._camera.position;

    Cartesian3.add(
      currentCameraPosition,
      scratchDeltaPosition,
      scratchNextPosition
    );

    const globe = this._earth.scene.globe;
    const ellipsoid = globe.ellipsoid;

    ellipsoid.cartesianToCartographic(
      scratchNextPosition,
      scratchNextCartographic
    );

    const height = globe.getHeight(scratchNextCartographic);

    if (height === undefined) {
      // console.warn("height is undefined!");
      return;
    }

    if (height < 0) {
      // console.warn(`height is negative!`);
    }
    const withTerrainOffset = this.state.withTerrainOffset;
    if (
      this._direction === DIRECTION_UP ||
      this._direction === DIRECTION_DOWN ||
      this._direction === EYE_BACKWARD ||
      this._direction === EYE_FORWARD
    ) {
      let viewHeight = (this.state.eyeHeight = withTerrainOffset
        ? scratchNextCartographic.height - height
        : scratchNextCartographic.height);
      if (!withTerrainOffset && viewHeight < height + 100) {
        viewHeight = this.state.eyeHeight = height + 100;
      }
      scratchNextCartographic.height = viewHeight;
    } else {
      let viewHeight = withTerrainOffset
        ? height + this.state.eyeHeight
        : this.state.eyeHeight;
      // this.state.eyeHeight =
      if (!withTerrainOffset && viewHeight < height + 100) {
        viewHeight = this.state.eyeHeight = height + 100;
      }
      scratchNextCartographic.height = viewHeight;
    }

    ellipsoid.cartographicToCartesian(
      scratchNextCartographic,
      scratchTerrainConsideredNextPosition
    );

    this._camera.setView({
      destination: scratchTerrainConsideredNextPosition,
      orientation: new GeoVis.HeadingPitchRoll(
        this._camera.heading,
        this._camera.pitch,
        this._camera.roll
      ),
      endTransform: GeoVis.Matrix4.IDENTITY
    });
  }
};

GeoVisFirstPersonCameraController.prototype._walkingSpeed = function() {
  return this.state.walkingSpeed;
};

GeoVisFirstPersonCameraController.prototype._enableDefaultScreenSpaceCameraController = function(
  enabled
) {
  const scene = this._earth.scene;

  scene.screenSpaceCameraController.enableRotate = enabled;
  scene.screenSpaceCameraController.enableTranslate = enabled;
  scene.screenSpaceCameraController.enableZoom = enabled;
  scene.screenSpaceCameraController.enableTilt = enabled;
  scene.screenSpaceCameraController.enableLook = enabled;
};

GeoVisFirstPersonCameraController.prototype.start = function(lonlat) {
  this.zoomTo(lonlat).then(() => {
    this._enabled = true;

    this._enableDefaultScreenSpaceCameraController(false);
  });
  // let currentCameraPosition = this._camera.position;

  // let cartographic = new GeoVis.Cartographic();

  // let globe = this._earth.scene.globe;

  // globe.ellipsoid.cartesianToCartographic(currentCameraPosition, cartographic);

  // let height = globe.getHeight(cartographic);

  // if (height === undefined) return false;

  // if (height < 0) {
  //   console.warn(`height is negative`);
  // }

  // cartographic.height = height + this.state.eyeHeight;

  // let newCameraPosition = new Cartesian3();

  // globe.ellipsoid.cartographicToCartesian(cartographic, newCameraPosition);

  // let currentCameraHeading = this._camera.heading;

  // this._heading = currentCameraHeading;

  // this._camera.flyTo({
  //   destination: newCameraPosition,
  //   orientation: {
  //     heading: currentCameraHeading,
  //     pitch: GeoVis.Math.toRadians(0),
  //     roll: 0.0
  //   }
  // });

  return true;
};

GeoVisFirstPersonCameraController.prototype.stop = function() {
  this._enabled = false;

  this._enableDefaultScreenSpaceCameraController(true);
};

export default GeoVisFirstPersonCameraController;
