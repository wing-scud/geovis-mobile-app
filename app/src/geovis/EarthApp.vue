<template>
  <div id="geovis-app">
    <Earth />
    <!-- <transition-group name="fade"> -->
      <div id="geo-drawplugin" />
    <iframe class="frame" :src="app.entry" :key="'micro-app-' + app.id" v-for="(app, index) of frames" :earthStore="earthStore" :pluginInfo="{ ...app, index }"></iframe>
    <component :key="'plugin-' + plugin.id" v-for="(plugin, index) of plugins" v-bind:is="plugin.id" :earthStore="earthStore" :pluginInfo="{ ...plugin, index }"></component>
    <component :key="'widget-' + widget.id" v-for="(widget, index) of widgets" v-bind:is="widget.id" :earthStore="earthStore" :pluginInfo="{ ...widget, index }"></component>
    <!-- </transition-group> -->
    <gv-micro-app :key="'micro-app-' + app.id" v-for="(app, index) of apps" :earthStore="earthStore" :pluginInfo="{ ...app, index }"></gv-micro-app>
  <!-- <> -->
    <PluginManager />
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
  components: {
    PluginManager
    // Navigation
  },
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
