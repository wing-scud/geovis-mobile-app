<template>
  <gv-panel :height="height" :width="width" :id="pluginInfo.id" :title="pluginInfo.name" ref="panel">
    <slot />
  </gv-panel>
</template>

<script lang="ts">
import Vue from "vue";

const firstLoaded = {};
const lastPosition = {};
const TemplatePlugin = Vue.extend({
  name: "Template",
  props: {
    pluginInfo: {
      type: Object as () => GVAPP.PluginInfo,
      required: true
    },
    width: {
      type: Number,
      default: () => 300
    },
    height: {
      type: Number,
      default: () => 600
    }
  },
  mounted() {
    if (!lastPosition[this.pluginInfo.id]) {
      this.$refs["panel"]["$el"]["style"].top = `${this.pluginInfo.index * 55 + 75}px`;
      this.$refs["panel"]["$el"]["style"].left = `80px`;
    } else {
      this.$refs["panel"]["$el"]["style"].top = lastPosition[this.pluginInfo.id].top;
      this.$refs["panel"]["$el"]["style"].left = lastPosition[this.pluginInfo.id].left;
    }
  },
  beforeDestroy() {
    lastPosition[this.pluginInfo.id] = {};
    lastPosition[this.pluginInfo.id].top = this.$refs["panel"]["$el"]["style"].top;
    lastPosition[this.pluginInfo.id].left = this.$refs["panel"]["$el"]["style"].left;
  }
});
Vue.component("TemplatePlugin", TemplatePlugin);
export default TemplatePlugin;
</script>
