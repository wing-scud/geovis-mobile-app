<template>
  <div></div>
</template>
<script lang="ts">
import Vue from "vue";
import MapVLayerProvider from "../MapVProvider/MapVLayerProvider";
import { citys } from "./data";
import EcahrtsProvider from "../EcahrtsProvider";
var mapV = window["mapv"]
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

    var options = {
      size: 13,
      gradient: { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)" },
      max: 60,
      animation: {
        type: "time",
        stepsRange: {
          start: 0,
          end: 100
        },
        trails: 10,
        duration: 4
      },
      draw: "heatmap"
    };
    this._layer = new MapVLayerProvider(earth, new mapV.DataSet(data), options,null);
  },
  beforeDestroy() {
        if (this._layer) {
      this._layer.destroy();
    }
  }
});
export default HeatMap;
</script>
<style scoped></style>
