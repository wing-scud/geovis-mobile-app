<template>
  <div></div>
</template>
<script >
import Vue from "vue";
import MapVLayerProvider from "../MapVProvider/MapVLayerProvider";
import { citys } from "./data";
var mapV = mapv;
var _layer;
const HeatMap = Vue.extend({
  name: "HeatMap",
  data() {
    return {
      _layer: null
    };
  },
  methods: {
  },
  mounted() {
      earth.camera.setView({
      //earth.camera.positionCartographic.latitude * 180/Math.PI
      destination: GeoVis.Cartesian3.fromDegrees(106, 27.559967765046867, 9999301.354056511)
    });
    var randomCount = 1000,
      data = [];
    while (randomCount--) {
      var cityCenter = mapV.utilCityCenter.getCenterByCityName(citys[Math.floor(Math.random() * citys.length)]);
      data.push({
        geometry: {
          type: "Point",
          coordinates: [cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4]
        },
        count: 30 * Math.random(),
        time: 100 * Math.random()
      });
    }

    var dataSet = new mapV.DataSet(data);
    var options = {
      fillStyle: "rgba(55, 50, 250, 0.2)",
      globalCompositeOperation: "lighter",
      size: 15,
      animation: {
        type: "time",
        stepsRange: {
          start: 0,
          end: 100
        },
        trails: 10,
        duration: 5
      },
      draw: "simple"
    };
    _layer = new MapVLayerProvider(earth, dataSet, options,null);
    },
  beforeDestroy() {
    if (_layer) {
      _layer.destroy();
    }
  }
});
export default HeatMap;
</script>
<style scoped></style>
