<template>
  <div class="map-module">
    <div class="group-title" v-if="!state.fullScreen">
      <TaskGroup></TaskGroup>
    </div>
    <div class="content">
        <MapEntity></MapEntity>
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { earthStore } from "@/geovis/store";
export default Vue.extend({
  name: "Map",
  data() {
    return {
      state: earthStore.state,
    };
  },
  methods: {},
  computed: {},
});
</script>
<style scoped>
.map-module {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.group-title {
  width: 100%;
  height: 40px;
}
.content {
  width: 100%;
  flex-grow: 1;
  position: relative;
}
</style>
