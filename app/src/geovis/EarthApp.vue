<template>
  <div id="geovis-app">
    <keep-alive include="Home">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import "./plugins";
import "./common/icons/iconfont";
import { earthStore } from "./store";
import "./components";
import "./util";
export default Vue.extend({
  name: "EarthApp",
  components: {},
  data() {
    return {
      earthStore: earthStore,
      earthState: earthStore.state,
      currentMutexPlugin: "",
    };
  },
  methods: {},
});
</script>

<style scoped lang="scss">
#geovis-app {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $navbar-background;
}
.frame {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: medium none;
}
</style>
