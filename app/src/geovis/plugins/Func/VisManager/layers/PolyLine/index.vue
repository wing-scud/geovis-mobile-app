<template>
  <div></div>
</template>
<script>
import Vue from "vue";
var mapv=window["mapv"];
import MapVLayerProvider from "../MapVProvider/MapVLayerProvider";
import { AssertionError } from "assert";
let layer1;
let layer2;
const EchartsTimeLine = Vue.extend({
  name: "EchartsTimeLine",
  data() {
    return {
      view: null
    };
  },
 async mounted() {
    earth.camera.setView({
      //earth.camera.positionCartographic.latitude * 180/Math.PI
      destination: GeoVis.Cartesian3.fromDegrees(114.091828, 30.44369, 61258.32689690787)
    });
    $.ajax({
      url: "./data/AppManager/wuhan-car",
      success: function(rs) {
        const data = [];
        const timeData = [];
        rs = rs.split("\n");
        console.log(rs.length);
        const projection = new GeoVis.WebMercatorProjection();
        let maxLength = 0;
        for (let i = 0; i < rs.length; i++) {
          const item = rs[i].split(",");
          const coordinates = [];
          if (item.length > maxLength) {
            maxLength = item.length;
          }

          for (let j = 0; j < item.length; j += 2) {
            const mapCoor = [parseFloat(item[j]), parseFloat(item[j + 1])];
            const cartographic = projection.unproject(new GeoVis.Cartesian3(...mapCoor));
            const lonlat = [(cartographic.longitude * 180) / Math.PI, (cartographic.latitude * 180) / Math.PI];
            coordinates.push(lonlat);
            timeData.push({
              geometry: {
                type: "Point",
                coordinates: lonlat
              },
              count: 1,
              time: j
            });
          }
          data.push({
            geometry: {
              type: "LineString",
              coordinates: coordinates
            }
          });
        }
        let dataSet = new mapv.DataSet(data);

        let options = {
          strokeStyle: "rgba(53,57,255,0.5)",
          coordType: "bd09mc",
          // globalCompositeOperation: 'lighter',
          shadowColor: "rgba(53,57,255,0.2)",
          shadowBlur: 3,
          lineWidth: 3.0,
          draw: "simple"
        };

        layer1 = new MapVLayerProvider(earth, dataSet, options,null);

        dataSet = new mapv.DataSet(timeData);

        let options2 = {
          fillStyle: "rgba(255, 250, 250, 0.2)",
          coordType: "bd09mc",
          globalCompositeOperation: "lighter",
          size: 1.5,
          animation: {
            stepsRange: {
              start: 0,
              end: 100
            },
            trails: 3,
            duration: 5
          },
          draw: "simple"
        };

        layer2 = new MapVLayerProvider(earth, dataSet, options2,null);
  }
  })
  },
  beforeDestroy() {
    if (layer1) {
      layer1.destroy();
    }
    if (layer2) {
      layer2.destroy();
    }
  }
});
export default EchartsTimeLine;
</script>
<style scoped></style>
