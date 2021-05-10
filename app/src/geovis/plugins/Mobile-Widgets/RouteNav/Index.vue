<template>
  <div>
    <component :is="componentName" :mode="navMode"></component>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { event } from "./store";
import PathPlan from "./PathPlan.vue";
import Navagation from "./Navigation.vue";
import { earthStore } from "@/geovis/store";
import state from "./store";
import mapboxManager from "./mapbox";
export default Vue.extend({
  name: "RouteNav",
  components: {
    PathPlan,
    Navagation,
  },
  data() {
    return {
      componentName: "PathPlan", //Navagation
      navMode: "live",
    };
  },
  mounted() {
    this.init();
  },
  activated() {
    this.init();
  },
  deactivated() {
    this.destory();
  },
  destroyed() {
    this.destory();
  },
  methods: {
    init() {
      earthStore.state.mode = "map";
      earthStore.setMapFullScreen(true);
      earthStore.state.onlyMap = true;
      event.$on("change", (bool, mode) => {
        this.componentName = bool ? "Navagation" : "PathPlan";
        this.navMode = mode;
      });
    },
    goBack() {
      //@ts-ignore
      this.$router.backward(-1);
    },
    destory() {
      state.destory();
      mapboxManager.destory();
      earthStore.setMapFullScreen(false);
      earthStore.state.onlyMap = false;
      earthStore.state.mode = "globe3";
      earthStore.earth.scene.mode = GeoVis.SceneMode.SCENE3D;
    },
  },
});
</script>
<style scoped>
.route-title {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
