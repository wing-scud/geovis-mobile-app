<template>
  <div>
    <div ref="earthContainer" class="fullScreen" id="earthContainer" />
    <div ref="mapContainer" class="fullScreen" id="mapContainer" v-show="state.mode === 'map'" />
    <!-- <div id="threeContainer" style="z-index:0" class="full"></div> -->
  </div>
</template>

<script>
import { earthStore } from "../store";

export default {
  name: "App",
  props: ["onReady"],
  data() {
    return {
      state: earthStore.state
    };
  },
  mounted() {
    this.state.pluginMap.b={active:false}
    earthStore.init(this.$refs["earthContainer"], this.$refs["mapContainer"]);
    this.state.pluginMap.a={active:false}
    console.log(this)
  },
  activated (){
    console.log('activated')
  },
  deactivated(){
    console.log('deactivated')
  },
  beforeDestoryed(){
    console.log('earth destory')
  }
};
</script>

<style scoped>

.fullScreen {
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

</style>
