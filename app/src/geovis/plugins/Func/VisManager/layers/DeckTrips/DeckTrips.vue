<template>
  <div></div>
</template>
<script>
import Vue from "vue";

import { createDeckProvider, removeDeckProvider } from "../DeckProvider/DeckProvider";
// import { HeatmapLayer } from "@deck.gl/aggregation-layers";
const { HexagonLayer } = deck
import { earthStore } from "@/geovis/store";

const FlowLine = Vue.extend({
  name: "FlowLine",
  data() {
    return {
      _view: null
    };
  },
  methods: {},
  beforeMount() {
    this._lastSceneMode = earthStore.earth.scene.mode
    earthStore.earth.scene.mode = GeoVis.SceneMode.COLUMBUS_VIEW;
  },
  mounted() {
    const intensity = 1;
    const threshold = 0.03;
    const radiusPixels = 30;
    this._layers = [
      new HeatmapLayer({
        data:'./static/data/VisManager/uber-pickup-locations.json',
        id: "heatmp-layer",
        pickable: false,
        getPosition: d => [d[0], d[1]],
        getWeight: d => d[2],
        radiusPixels,
        intensity,
        threshold
      })
    ];
    this._deckInstance = createDeckProvider(earthStore.earth);
    this._deckInstance.setProps({layers: this._layers})
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
