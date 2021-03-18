/* eslint-disable no-undef */
let marker,polygon;
const lonlatReg = /^(-?\d+)(\.\d+)?,(-?\d+)(\.\d+)?$/   // 匹配 {float},{float} 格式字符串
const util = {
  goHome: function() {
    earth.camera.flyHome();
    util.clearPolygon();
    return "home";
  },
  zoomOut: function() {
    earth.camera.zoom("out");
    return "out";
  },
  zoomIn: function() {
    earth.camera.zoom("in");
    return "in";
  },
  clear: function() {
    if (marker) {
      marker.removeFrom(earth.features);
      console.log("marker清除");
      marker = 0;
    }
     if (polygon) {
      polygon.removeFrom(earth.features);
      console.log("polygon清除");
      polygon = 0; //为了在用户点击home时不报错
    } 
    // window.marker = 0;
    // window.polygon = 0; //为了在用户点击home时不报错
  },
  polygonpointsToVector2: function(polygonpoints) {
    //二维数组转化为vector2
    const vectorPoints = polygonpoints.forEach((item, index) => {
      item.x = item[0];
      item.y = item[1];
    });
    return vectorPoints;
  },
  setLine: function(polygonpoints, styleObj) {
    
    const fillColor = GeoVis.Color.fromCssString(styleObj.fillColor); //填充色
    const outlineColor = GeoVis.Color.fromCssString(styleObj.outlineColor); //边框色
    const lineStyle = {
      //线
      // onTerrain:true,//是否贴地渲染
      visible: styleObj.isVisible || true,
      outline: styleObj.isOutline || true,
      outlineColor: outlineColor,
      fill: styleObj.isFill || false,
      fillColor: fillColor,
      extrudedHeight: styleObj.extrudedHeight || 0,
      outlineWidth: styleObj.outlineWidth || 2
    };
    polygon = new GeoVis.Polygon(polygonpoints, lineStyle).addTo(earth.features);
    return polygon;
  },
  setMarker: function(location, name) {
    util.clear();
    marker = new GeoVis.Marker(location).addTo(earth.features); //描点
    if (name) {
      marker.bindPopup("<b>" + name + "</b>", {
        maxWidth: 120
      });
      marker.showPopup();
    }
    return marker;
  },
  getData: async function(queryUrl) {
    const res = await fetch(queryUrl);
    const json = await res.json();
    return json;
  },
  isLonlatString(str){
    return lonlatReg.test(str)
  }
};
export default util;
