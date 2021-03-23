<template>
  <div>
    <!-- <keep-alive> -->
    <MapEntity></MapEntity>
    <!-- </keep-alive> -->
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Map",
  data() {
    return {
      component: ""
    };
  },
  methods: {},
  computed: {}
});
</script>
<style scoped>
.top-widget {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
}
</style>
