<template>
  <template-plugin  :pluginInfo="pluginInfo" :width="300" title="图层管理" class="RoutePlan" @close="handleClose">
    <tczs />
  </template-plugin>
</template>

<script lang="ts">
import Vue from "vue";
import { earthStore } from "@/geovis/store";
import tczs from "./tczs.vue";
import TemplatePlugin from "../../TemplatePlugin.vue";
const RoutePlan = Vue.extend({
  name: "ImageLayer",
  props: {
    pluginInfo: Object as () => GVAPP.PluginInfo,
  },
  components: {
    tczs,
    "template-plugin": TemplatePlugin,
  },
  data() {
    return {
      earthState: earthStore.state
    };
  },
  computed: {},
  methods: {
    handleClose() {
      earthStore.togglePlugin(this.$props.info.id, false);
    }
  }
});

export default RoutePlan;
</script>

<style lang="scss">
.RoutePlan {
  min-height: 600px;
  max-height: 800px;
  .gv-page-content {
    overflow: hidden;
    padding: 0;
  }
}
</style>
