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
    top: 10px;
    right: 10px;
    background: rgb(38, 50, 56);
    padding: 10px;
    user-select: none;
    color: white;
}
</style>
