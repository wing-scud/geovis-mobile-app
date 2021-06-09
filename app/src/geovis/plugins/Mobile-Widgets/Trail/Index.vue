<template>
  <component :is="name" v-on:finish="change"></component>
</template>
  <script lang="ts">
import { earthStore } from "@/geovis/store";
import Vue from "vue";
import TrailControl from "./TrailControl.vue";
import TrailSave from "./TrailSave.vue";
export default Vue.extend({
  name: "TrailRecord",
  components: {
    TrailControl,
    TrailSave,
  },
  data() {
    return {
      name: "TrailControl",
    };
  },
  mounted() {
    this.init();
  },
  destroyed() {
    this.destroy();
  },
  methods: {
    change() {
      this.name = "TrailSave";
    },
    init() {
      earthStore.state.mode = "map";
      earthStore.setMapFullScreen(true);
      earthStore.state.onlyMap = true;
    },
    destroy() {
      earthStore.state.mode = "globe3";
      earthStore.setMapFullScreen(false);
      earthStore.state.onlyMap = false;
    },
  },
});
</script>
  <style scoped></style>
  