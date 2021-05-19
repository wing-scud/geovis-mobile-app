<template>
    <div />
</template>

<script lang="ts">
import { earthStore } from '@/geovis/store';
import Vue from "vue";

const FPS = Vue.extend({
  name: "FPS",
  mounted(){
      earthStore.earth.scene.debugShowFramesPerSecond = true;
  },
  destroyed(){
    earthStore.earth.scene.debugShowFramesPerSecond = false;
  }
});

export default FPS;
</script>

<style lang="scss">
.cesium-performanceDisplay-defaultContainer{
  position: absolute;
  top: 0;
  right: 10px;
  background: transparent;
  padding: 10px;
  z-index: 5;
  user-select: none;
  color: white;
}
</style>
