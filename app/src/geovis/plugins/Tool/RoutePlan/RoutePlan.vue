<template>
  <gv-panel :width="420" class="RoutePlan" :pluginInfo="pluginInfo" :title="'路径规划'">
    <mbhc />
  </gv-panel>
</template>

<script lang="ts">
import Vue from "vue";
import { earthStore } from "@/geovis/store";
import mbhc from "./mbhc.vue";

// import TemplatePlugin from "../../TemplatePlugin.vue";

const RoutePlan = Vue.extend({
  name: "RoutePlan",
  props: {
    pluginInfo: Object as () => GVAPP.PluginInfo
  },
  components: {
    // "template-plugin": TemplatePlugin,
    mbhc
  },
  data() {
    return {
      earthState: earthStore.state
    };
  },
  computed: {}
});

export default RoutePlan;
</script>

<style lang="scss">
.RoutePlan {
  min-height: 600px;
  max-height: 800px;
  top: 200px;
  right: 80px;
  .gv-page-content {
    overflow: hidden;
    padding: 0;
  }
}
</style>
