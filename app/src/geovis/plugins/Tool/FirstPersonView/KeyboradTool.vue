<template>
  <div></div>
</template>

<script>
let startMousePosition;
let mousePosition;
const flags = {
  looking: false,
  moveForward: false,
  moveBackward: false,
  moveUp: false,
  moveDown: false,
  moveLeft: false,
  moveRight: false
};

// handler.setInputAction(function (movement) {
//     flags.looking = true;
//     mousePosition = startMousePosition = GeoVis.Cartesian3.clone(movement.position);
// }, GeoVis.ScreenSpaceEventType.LEFT_DOWN);

// handler.setInputAction(function (movement) {
//     mousePosition = movement.endPosition;
// }, GeoVis.ScreenSpaceEventType.MOUSE_MOVE);

// handler.setInputAction(function (position) {
//     flags.looking = false;
// }, GeoVis.ScreenSpaceEventType.LEFT_UP);

function getFlagForKeyCode(keyCode) {
  switch (keyCode) {
    case "W".charCodeAt(0):
      return "moveForward";
    case "S".charCodeAt(0):
      return "moveBackward";
    case "Q".charCodeAt(0):
      return "moveUp";
    case "E".charCodeAt(0):
      return "moveDown";
    case "D".charCodeAt(0):
      return "moveRight";
    case "A".charCodeAt(0):
      return "moveLeft";
    default:
      return undefined;
  }
}

document.addEventListener(
  "keydown",
  function(e) {
    const flagName = getFlagForKeyCode(e.keyCode);
    if (typeof flagName !== "undefined") {
      flags[flagName] = true;
    }
  },
  false
);

document.addEventListener(
  "keyup",
  function(e) {
    const flagName = getFlagForKeyCode(e.keyCode);
    if (typeof flagName !== "undefined") {
      flags[flagName] = false;
    }
  },
  false
);

export default {
  name: "CustomWidgets",
  data() {
    return {};
  },
  mounted() {
    this._canvas = earth.scene.canvas;
    this._handler = new GeoVis.ScreenSpaceEventHandler(this._canvas);
    this._ellipsoid = earth.scene.globe.ellipsoid;
    earth.clock.onTick.addEventListener(this.handleClock);
  },
  beforeDestroy() {
    earth.clock.onTick.removeEventListener(this.handleClock);
  },
  methods: {
    handleClock() {
      const camera = earth.camera;

      if (flags.looking) {
        const width = this._canvas.clientWidth;
        const height = this._canvas.clientHeight;

        // Coordinate (0.0, 0.0) will be where the mouse was clicked.
        const x = (mousePosition.x - startMousePosition.x) / width;
        const y = -(mousePosition.y - startMousePosition.y) / height;

        const lookFactor = 0.05;
        camera.lookRight(x * lookFactor);
        camera.lookUp(y * lookFactor);
      }

      // Change movement speed based on the distance of the camera to the surface of the ellipsoid.
      const cameraHeight = this._ellipsoid.cartesianToCartographic(
        earth.camera.position
      ).height;
      const moveRate = cameraHeight / 100.0;

      if (flags.moveForward) {
        camera.moveForward(moveRate);
      }
      if (flags.moveBackward) {
        camera.moveBackward(moveRate);
      }
      if (flags.moveUp) {
        camera.moveUp(moveRate);
      }
      if (flags.moveDown) {
        camera.moveDown(moveRate);
      }
      if (flags.moveLeft) {
        camera.moveLeft(moveRate);
      }
      if (flags.moveRight) {
        camera.moveRight(moveRate);
      }
    }
  }
};
</script>

<style></style>
