<template>
  <div id="mapbox-path"></div>
</template>
<script lang="ts">
import { earthStore } from "@/geovis/store";
import mapboxgl from "mapbox-gl";
const MapboxDirections = window["MapboxDirections"];
import Vue from "vue";
export default Vue.extend({
  name: "PathQuery",
  data() {
    return {};
  },
  methods: {},
  mounted() {
    earthStore.state.mode = "map";
    const instance = this;
    const addPathQuery = function() {
      const map = earthStore.map;
      const pathQuery = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        // profile:{

        // }
      });
      // document.getElementById('mapbox-path').appendChild(pathQuery.container)
      //@ts-ignore
      instance._control = pathQuery;
      if (instance.$route.params&&instance.$route.params.start) {
        //导航
        const params = instance.$route.params;
        pathQuery.setOrigin(params.start );
        pathQuery.setDestination(params.end);
      }
      map.addControl(pathQuery, "top-left");
      // pathQuery.container=document.getElementById('mapbox-path')
      // const detailedPathSummary = document.getElementsByClassName('mapbox-directions-route-summary')[0];
      // detailedPathSummary.appendChild()
      // options.controls 对象？
      // options.controls.inputs 布尔值隐藏或显示输入控件。（可选，默认true）
      // options.controls.instructions 布尔值隐藏或显示指令控件。（可选，默认true）
      // options.controls.profileSwitcher
      // reverse
    };
    if (earthStore.map) {
      addPathQuery();
    } else {
      setTimeout(() => {
        addPathQuery();
      }, 1000);
    }
  },
  beforeDestroy() {
    const map = earthStore.map;
    //@ts-ignore
    this._control.removeRoutes();
    //@ts-ignore
    map.removeControl(this._control);
  }
});
</script>
<style scoped>
.mapbox-path {
  position: fixed;
  top: 5px;
  left: 0;
  margin: 0 5px;
}
</style>
