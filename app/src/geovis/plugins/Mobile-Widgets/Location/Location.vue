<template>
  <div></div>
</template>
<script lang="ts">
import Vue from "vue";
import { earthStore } from "@/geovis/store";
import { Toast } from "vant";
const mapLocation = window['plugin'].mapLocation;
export default Vue.extend({
  name: "Location",
  data() {
    return {
      state: earthStore.state,
      watchId: undefined,
    };
  },
  mounted() {
    this.watchId = mapLocation.watchLocation((position) => {
      this.flyTo(position);
      Toast("持续定位");
    });
  },
  methods: {
    flyTo(position) {
      const modes = ["globe3", "globe2", "map"];
      const index = modes.indexOf(earthStore.mode);
      const mode = index < 2 ? "globe" : "map";
      const earth = earthStore.earth;
      const map = earthStore._map;
      //@ts-ignore
      if (position && position.coords) {
        const coords = position.coords;
        const heading = coords.heading ? GeoVis.Math.toRadians(coords.heading) : 0;
        if (mode === "globe") {
          earth.camera.flyTo({
            //高度太低，会穿透地球
            duration: 0,
            destination: GeoVis.Cartesian3.fromDegrees(coords.longitude, coords.latitude, coords.altitude > 200 ? coords.altitude : 200),
            orientation: {
              heading: heading,
              pitch: GeoVis.Math.toRadians(-90),
              roll: 0,
            },
          });
        } else {
          map.setCenter([position.coords.longitude, position.coords.latitude]);
          map.setZoom(16);
        }
      } else {
        Toast("位置获取失败");
      }
    },
  },
  beforeDestroy() {
    if (this.watchId) {
      mapLocation.clearWatchLocation(this.watchId);
    }
  },
  watch: {
    "state.mode": function (value) {
      //@ts-ignore
      if (mapLocation.locking) {
        //@ts-ignore
        mapLocation.locking = !mapLocation.locking;
        //@ts-ignore
        document.getElementsByClassName("icon-suoding")[0].style.color = location.locking ? "#0c87f1" : "#333";
      }
    },
  },
});
</script>
<style scoped></style>
