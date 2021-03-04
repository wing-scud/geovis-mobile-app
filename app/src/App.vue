<template>
  <div id="app">
    <EarthApp />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EarthApp from "./geovis/EarthApp.vue";
@Component({
  name: "App",
  components: {
    EarthApp
  }
})
export default class extends Vue {}
</script>

<style scoped>
#app {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}



</style>
