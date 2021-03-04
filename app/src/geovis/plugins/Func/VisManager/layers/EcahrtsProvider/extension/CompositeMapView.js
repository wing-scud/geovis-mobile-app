// import echarts from "echarts";
const CompositeMapView = echarts.extendComponentView({
  type: "GLMap",
  init: function(ecModel, api) {
    // var glMap = echarts.glMap;

    // console.log("in~~~~")
    // // var handler = new GeoVis.ScreenSpaceEventHandler(glMap.canvas);
    // // handler.setInputAction(function(movement) {
    // //   moveHandler();
    // // }, GeoVis.ScreenSpaceEventType.MOUSE_MOVE);
    // // handler.setInputAction(function(movement) {
    // //   console.log("mouse wheel");
    // //   moveHandler();
    // // }, GeoVis.ScreenSpaceEventType.WHEEL);
    // // //GeoVis.ScreenSpaceEventType.WHEEL
    // // //GeoVis.ScreenSpaceEventType.MOUSE_MOVE
    // // glMap.camera.moveStart.addEventListener(moveHandler);
    // // glMap.camera.moveEnd.addEventListener(moveHandler);
    // earth.scene.preRender.addEventListener(moveHandler)
  },
  render: function(GLMapModel, ecModel, api) {}
});

export default CompositeMapView;
