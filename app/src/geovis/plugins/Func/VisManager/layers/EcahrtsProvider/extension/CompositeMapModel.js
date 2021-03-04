// import echarts from "echarts";
const CompositeMapModel = echarts.extendComponentModel({
  type: "GLMap",

  getBMap: function() {
    // __bmap is injected when creating BMapCoordSys
    return this.__GLMap;
  },

  defaultOption: {
    roam: false
  }
});
export default CompositeMapModel;
