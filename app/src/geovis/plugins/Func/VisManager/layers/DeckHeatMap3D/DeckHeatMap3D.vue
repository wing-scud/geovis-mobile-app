<template>
  <div></div>
</template>
<script>
import Vue from "vue";

import { createDeckProvider, removeDeckProvider } from "../DeckProvider/DeckProvider";
// import { HexagonLayer } from "@deck.gl/aggregation-layers";
const { HexagonLayer } = deck
import { earthStore } from "@/geovis/store";
//@ts-check
const FlowLine = Vue.extend({
  name: "DeckHeatMap3D",
  data() {
    return {
      _view: null
    };
  },
  methods: {},
  beforeMount() {
    this._lastSceneMode = earthStore.earth.scene.mode;
    earthStore.earth.scene.mode = GeoVis.SceneMode.COLUMBUS_VIEW;
  },
  async mounted() {
    const radius = 1500;
    const upperPercentile = 100;
    const coverage = 1;
    const material = {
      ambient: 0.64,
      diffuse: 0.6,
      shininess: 32,
      specularColor: [51, 51, 51]
    };
    const colorRange = [
      [1, 152, 189],
      [73, 227, 206],
      [216, 254, 181],
      [254, 237, 177],
      [254, 173, 84],
      [209, 55, 78]
    ];
    const heatdata = await fetch("./static/data/VisManager/heatmap-data.csv").then(res=>res.text()).then(text=>{
       return text.split("\n").map(row=>{
        return row.split(",").map(str=>Number(str))
      })
    })  
    this._layers = [
      new HexagonLayer({
        id: "heatmap",
        colorRange,
        coverage,
        data:heatdata,
        elevationRange: [0, 3000],
        elevationScale: heatdata && heatdata.length ? 50 : 0,
        extruded: true,
        getPosition: d => d,
        pickable: true,
        radius,
        upperPercentile,
        material,
      })
    ];
    this._deckInstance = createDeckProvider(earthStore.earth);
    this._deckInstance.setProps({ layers: this._layers });
  },
  destroyed() {
    removeDeckProvider(earthStore.earth, this._deckInstance);
    earthStore.earth.scene.mode = this._lastSceneMode;
  },
  methods() {}
});
export default FlowLine;
</script>
<style scoped></style>
