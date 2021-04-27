<template>
  <div class="navgation">
    <div class="nav-text"></div>
    <!-- <div class="nav-manager"></div> -->
  </div>
</template>
  <script lang="ts">
import Vue from "vue";
import state,{ event } from "./store";
import mapboxManager from "./mapbox";
import { earthStore } from "@/geovis/store";
import mapLocation from "@/cordova/plugin/location";
export default Vue.extend({
  name: "Navigation",
  props: ["mode"],
  data() {
    return {
      navMode: this.mode, // simulation
      watchPosition: undefined,
      marker: undefined,
    };
  },
  watch: {
    mode() {
      this.navMode = this.mode;
    },
    navMode: {
      immediate: true,
      handler() {
        if (this.navMode === "live") {
          this.liveNav();
        } else {
          this.simulateNav();
        }
      },
    },
  },
  beforeDestroy() {
    if (this.marker) {
      mapboxManager.removeImageMarker("car");
    }
    if (this.watchPosition) {
      mapLocation.clearWatchLocation(this.watchPosition);
    }
    if (this.navMode === "live") {
      earthStore.map.setPitch(0);
    }
  },
  methods: {
    simulateNav() {
      //@ts-ignore
      const mapLocation = window.cordovaPlugin?.mapLocation;
      this.addMarker();
      const marker = this.marker;
    },
    async liveNav() {
      earthStore.map.setPitch(20);
      //@ts-ignore
      const mapLocation = window.cordovaPlugin?.mapLocation;
      this.addMarker();
      const marker = this.marker;
      this.watchPosition = mapLocation.testWatchPosition((position) => {
        const lnglat = [position.coords.longitude, position.coords.latitude];
        marker.setRotation(position.coords.heading);
        marker.setLngLat(lnglat);
        mapboxManager.setCamera(lnglat);
      });
      // event.$emit("change", true, "live");
    },
    async addMarker() {
      //@ts-ignore
      const mapLocation = window.cordovaPlugin?.mapLocation;
      const position = await mapLocation.getCurrentPosition();
      const lonlat = [position.coords.longitude, position.coords.latitude];
      mapboxManager.addImageMarker("car", "./static/images/car.png", lonlat);
      const marker = mapboxManager.markers.get("car");
      this.marker = marker;
    },
  },
});
</script>
  <style scoped>
.navgation {
}
.nav-manager {
  width: 100%;
}
.nav-text {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
  