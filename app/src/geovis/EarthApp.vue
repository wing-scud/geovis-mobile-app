<template>
  <div id="geovis-app">
    <keep-alive include="Home">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// import
import PluginManager from "./components/PluginManager/index.vue";
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
      currentMutexPlugin: ""
    };
  },
  computed: {
    widgets() {
      const list = [];
      this.earthState.pluginTree.map(mainNode => {
        mainNode.items.map(item => {
          if (item.enabled && item.type === "widget") {
            list.push(item);
          }
        });
      });
      return list;
    },
    plugins() {
      const list = [];
      this.earthState.pluginTree.map(mainNode => {
        mainNode.items.map(item => {
          if (item.enabled && item.active && (item.type === "module" || item.type === "tool")) {
            list.push(item);
          }
        });
      });
      return list;
    },
    apps() {
      const list = [];
      this.earthState.pluginTree.map(mainNode => {
        mainNode.items.map(item => {
          if (item.enabled && item.type === "micro-app") {
            list.push(item);
          } else if (item.enabled && item.active && item.type === "micro-app-module") {
            list.push(item);
          }
        });
      });
      return list;
    },
    frames() {
      const list = [];
      this.earthState.pluginTree.map(mainNode => {
        mainNode.items.map(item => {
          if (item.enabled && item.type === "iframe") {
            list.push(item);
          }
        });
      });
      return list;
    }
  },
  methods: {}
});
</script>

<style scoped>
#geovis-app {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
