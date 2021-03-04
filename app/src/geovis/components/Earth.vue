<template>
  <div>
    <div ref="earthContainer" class="full" id="container">
      <div id="slider"></div>
    </div>
    <div id="threeContainer" style="z-index:0" class="full"></div>
  </div>
</template>

<script>
import { earthStore } from "../store";

export default {
  name: "App",
  props: ["onReady"],
  mounted() {
    earthStore.init(this.$refs["earthContainer"]);
    // this.$props.onReady();
  }
};
</script>

<style>
.full {
  position: absolute !important;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

#threeContainer {
  pointer-events: none;
  background: transparent;
}
#slider {
  position: fixed;
  width: 4px;
  height: 100%;
  left: 50%;
  top: 0;
  background-color: white;
  z-index: 1111;
  visibility: hidden;
}
#slider:hover {
  cursor: ew-resize;
}
</style>
