// import echarts from "echarts";
// import "echarts-gl";

/* eslint-disabled */
import "./extension/CompositeMap";

function EcahrtsProvider(earth, option) {
  //   this._id = id;
  this._mapContainer = earth;
  this._overlay = _createChartOverlay(this._mapContainer, option);
  this._overlay.setOption(option);
  this.updateHandler = this.updateHandler.bind(this);
  earth.scene.preRender.addEventListener(this.updateHandler);

  // var handler = (this.handler = new GeoVis.ScreenSpaceEventHandler(earth.canvas));
  // handler.setInputAction((movement) => {
  //   this.updateHandler();
  // }, GeoVis.ScreenSpaceEventType.MOUSE_MOVE);
  // handler.setInputAction((movement)=> {
  //   this.updateHandler();
  // }, GeoVis.ScreenSpaceEventType.WHEEL);
  // //GeoVis.ScreenSpaceEventType.WHEEL
  // //GeoVis.ScreenSpaceEventType.MOUSE_MOVE
  // earth.camera.moveStart.addEventListener(this.updateHandler);
  // earth.camera.moveEnd.addEventListener(this.updateHandler);
}

function _createChartOverlay(container, option) {
  var chartContainer = document.createElement("div");
  var scene = container.scene;
  scene.canvas.setAttribute("tabIndex", 0);
  chartContainer.style.position = "absolute";
  chartContainer.style.top = "0px";
  chartContainer.style.left = "0px";
  chartContainer.style.width = scene.canvas.width + "px";
  chartContainer.style.height = scene.canvas.height + "px";
  chartContainer.style.pointerEvents = "none";
  chartContainer.setAttribute("id", "echarts");
  chartContainer.setAttribute("class", "echartMap");
  container.container.appendChild(chartContainer);
  echarts.glMap = scene;
  return echarts.init(chartContainer);
}

EcahrtsProvider.prototype.updateOverlay = function(option) {
  if (this._overlay) {
    this._overlay.setOption(option);
  }
};

EcahrtsProvider.prototype.updateHandler = function(type, target) {
  this._overlay &&
    this._overlay._api.dispatchAction({
      type: "GLMapRoam"
    });
};

EcahrtsProvider.prototype.getMap = function() {
  return this._mapContainer;
};

EcahrtsProvider.prototype.getOverlay = function() {
  return this._overlay;
};

EcahrtsProvider.prototype.destroy = function() {
  // this._overlay.destroy();
  // this.handler.destroy();
  // earth.camera.moveStart.removeEventListener(this.updateHandler);
  // earth.camera.moveEnd.removeEventListener(this.updateHandler);

  earth.scene.preRender.removeEventListener(this.updateHandler);

  this._overlay && this._overlay.dispose();
  this._overlay = undefined;
 

};

// EcahrtsProvider.prototype.show = function() {
//   var container = document.getElementById(this._id);
//   container.style.visibility = "visible";
// };

// EcahrtsProvider.prototype.hide = function() {
//   var container = document.getElementById(this._id);
//   container.style.visibility = "hidden";
// };

export default EcahrtsProvider;
