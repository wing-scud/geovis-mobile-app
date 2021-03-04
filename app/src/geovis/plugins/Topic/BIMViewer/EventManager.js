
import * as THREE from "three";
import {earthStore} from "@geovis/store";
function EventManager(app) {
  let sceneWidth,
    sceneHeight,
    buildingView,
    labelsView,
    menuView,
    slider,
    // mouse picking
    mouse = new THREE.Vector2(),
    isMouseDown = false,
    roomOnDown = null,
    labelUnderMouse;
  function onMouseMove(e) {
    // local
    mouse.x = e.clientX;
    mouse.y = e.clientY; // header height is 50px

    //  mouse position in normalized device coordinates (-1 to +1) for both components
    mouse.x = (mouse.x / earthStore.earth.canvas.width) * 2 - 1;
    mouse.y = -(mouse.y / earthStore.earth.canvas.height) * 2 + 1;
    const target = e.target;
    if (target.className === "tag") {
      labelUnderMouse = target.parentElement.attributes["data-id"].value;
    }
    //

    if (isMouseDown) {
      // app.setOverLocation( null );
    } else {
      const roomUnderMouse = getRoomUnderMouse(mouse);
      app.setOverLocation(roomUnderMouse);
    }
  }

  function onMouseDown(e) {
    isMouseDown = true;

    roomOnDown = getRoomUnderMouse(mouse);
  }

  function onMouseUp(e) {
    isMouseDown = false;

    const roomOnUp = getRoomUnderMouse(mouse);

    if (roomOnUp === "whiteBuilding") {
      // goToExternalLink('whiteBuilding');
    } else if (roomOnUp === roomOnDown && roomOnUp !== null) {
      app.setActiveLocation(roomOnUp);
    }
    if (!roomOnUp) {
      app.setOverLocation(null);
    }
  }

  function getRoomUnderMouse(mouse) {
    if (!labelUnderMouse) {
      const intersectingRoom = app.buildingView.getIntersectingRoom(mouse);
      if (intersectingRoom) {
        return intersectingRoom.name;
      } else {
        return null;
      }
    } else {
      return labelUnderMouse;
    }
  }

  function addListeners() {
    earthStore.earth.container.addEventListener("mousemove", onMouseMove);
    earthStore.earth.container.addEventListener("mousedown", onMouseDown);
    earthStore.earth.container.addEventListener("mouseup", onMouseUp);
  }

  addListeners();
  function removeListeners() {
    earthStore.earth.container.removeEventListener("mousemove", onMouseMove);
    earthStore.earth.container.removeEventListener("mousedown", onMouseDown);
    earthStore.earth.container.removeEventListener("mouseup", onMouseUp);
  }
  this.destroy = removeListeners;
}

export default EventManager;
