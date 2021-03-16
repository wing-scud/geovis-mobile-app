<template>
  <div ref="earthContainer" class="full">
  </div>
</template>

<script>
import { EarthStore } from "../geovis/EarthStore";

export default {
  name: "App",
  props: ["onReady","earthReady"],
  mounted() {
    EarthStore.init(this.$refs["earthContainer"]);
    this.$props.onReady();
  }
};
</script>

<style>
.full {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

#threeContainer {
  pointer-events: none;
}
 
</style>
