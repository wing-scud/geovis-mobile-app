


<template>
  <div></div>
</template>
<script lang="ts">
import Vue from "vue";
import MapVLayerProvider from "../MapVProvider/MapVLayerProvider";
import { citys } from "./data";
var mapv=window["mapv"];
var layer
const EchartsTimeLine = Vue.extend({
  name: "EchartsTimeLine",
  data() {
    return {
      _layer: null
    };
  },
 async mounted() {
  earth.camera.setView({
      //earth.camera.positionCartographic.latitude * 180/Math.PI
      destination: GeoVis.Cartesian3.fromDegrees(106, 27.559967765046867, 9999301.354056511)
    });
    var randomCount = 300;

    var data = [];

    // 构造数据
    while (randomCount--) {
      var cityCenter = mapv.utilCityCenter.getCenterByCityName(citys[Math.floor(Math.random() * citys.length)]);
      data.push({
        geometry: {
          type: "Point",
          coordinates: [cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4]
        },
        count: 30 * Math.random()
      });
    }

    var dataSet = new mapv.DataSet(data);

    var options = {
      fillStyle: "rgba(55, 50, 250, 0.8)",
      shadowColor: "rgba(255, 250, 50, 1)",
      shadowBlur: 20,
      max: 100,
      size: 50,
      label: {
        show: true,
        fillStyle: "white"
        // shadowColor: 'yellow',
        // font: '20px Arial',
        // shadowBlur: 10,
      },
      globalAlpha: 0.5,
      gradient: { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)" },
      draw: "honeycomb"
    };
    layer = new MapVLayerProvider(earth, dataSet, options,null);

  },
  beforeDestroy() {
    if (layer) {
      layer.destroy();
    }
  }
});
export default EchartsTimeLine;
</script>
<style scoped></style>
