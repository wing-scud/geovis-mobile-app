/* eslint-disabled */
import CompositeCoordinateSystem from "./CompositeCoordinateSystem";
import CompositeMapModel from "./CompositeMapModel";
import CompositeMapView from "./CompositeMapView";
echarts.registerCoordinateSystem("GLMap", CompositeCoordinateSystem);
echarts.registerAction(
  {
    type: "GLMapRoam",
    event: "GLMapRoam",
    update: "updateLayout"
  },
  function(payload, ecModel) {}
);

// return {
//   version: "1.0.0"
// };
