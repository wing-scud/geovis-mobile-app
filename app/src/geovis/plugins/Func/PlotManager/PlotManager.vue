<template>
  <span> 
 
  </span>
</template>

<script lang="ts">
import Vue from "vue";

import { earthStore } from "@/geovis/store";
let plot;
const MBTS = Vue.extend({
  name: "SceneManager",
  props: {
    pluginInfo: Object as () => GVAPP.PluginInfo
  },
  components: {},
  data() {
    return {};
  },
  mounted() {
    if (!plot) {
      const el = document.getElementById("geo-drawplugin")
      plot =(window["plot"]= new window["Plot"](earthStore.drawHelper,el));
    }
    plot.activate();
    // TODO 插件加载
  },
  destroyed() {
    // window.drawHelper.muteHandler(true)
    plot.deactivate();
    // todo 插件卸载
  },
  computed: {},
  methods: {}
});

export default MBTS;
</script>

<style lang="scss">
.geo-titlebar {
  left: 60px;
  background: rgb(38, 50, 56);
}
.geo-leftmenu {
  position:absolute;
  z-index:1;
  left: 60px;
  background: rgb(38, 50, 56);
}
.geo-scenemenu{
  position:absolute;
  z-index:1;
   left: 60px;
  background: rgb(38, 50, 56);
}
.geo-rightmenu {
  background: rgb(38, 50, 56);
}
.MuiAppBar-colorDefault {
  background-color: rgb(53 72 82) !important;
}
</style>
