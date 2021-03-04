<template>
  <template-plugin :height="800" :pluginInfo="pluginInfo">
    <Ts></Ts>
  </template-plugin>
</template>

<script lang="ts">
import Vue from "vue";
import TemplatePlugin from "../../TemplatePlugin.vue";
import Ts from "./Ts.vue";
const MBTS = Vue.extend({
  name: "MBTS",
  props: {
    pluginInfo: Object as () => GVAPP.PluginInfo
  },
  components: {
    "template-plugin": TemplatePlugin,
    Ts
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
});
export default MBTS;
</script>
