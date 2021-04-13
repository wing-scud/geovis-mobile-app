<template>
  <div></div>
</template>
<script lang="ts">
import Vue from "vue";
import { earthStore } from "@/geovis/store";
export default Vue.extend({
  name: "Location",
  data() {
    return {
      state: earthStore.state,
    };
  },
  mounted() {
    //@ts-ignore
    const mapLocation = window.cordovaPlugin.mapLocation;
    mapLocation.locking = true;
  },
  methods: {},
  beforeDestroy() {
    //@ts-ignore
    const mapLocation = window.cordovaPlugin.mapLocation;
    mapLocation.locking = false;
  },
  watch: {
    "state.mode": function (value) {
      //@ts-ignore
      const mapLocation = window.cordovaPlugin.mapLocation;
      //@ts-ignore
      if (mapLocation.locking) {
        mapLocation.locking = !mapLocation.locking;
        //@ts-ignore
        document.getElementsByClassName("icon-suoding")[0].style.color = location.locking ? "#0c87f1" : "#333";
      }
    },
  },
});
</script>
<style scoped></style>
