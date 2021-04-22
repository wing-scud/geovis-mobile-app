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
export default Vue.extend({
  name: "RouteNav",
  components: {
    PathPlan,
    Navagation,
  },
  data() {
    return {
      componentName: "PathPlan", //Navagation
      navMode:"live"
    };
  },
  mounted() {
    event.$on("change", (bool,mode) => {
      this.componentName = bool ? "Navagation" : "PathPlan";
      this.navMode = mode
    });
    earthStore.state.mode = "map";
    earthStore.setMapFullScreen(true);
    earthStore.state.onlyMap = true;
  },
  beforeDestroy() {
    earthStore.setMapFullScreen(false);
    earthStore.state.onlyMap = false;
    earthStore.state.mode = "globe3";
    earthStore.earth.scene.mode = GeoVis.SceneMode.SCENE3D;
    // this.clearMapboxObjects();
  },
  methods: {
    goBack() {
      //@ts-ignore
      this.$router.backward(-1);
    },
  },
});
</script>
<style scoped>
  .route-title{
    position: absolute;
    top:0;
    left:0;
    width: 100%;;
  }
</style>
