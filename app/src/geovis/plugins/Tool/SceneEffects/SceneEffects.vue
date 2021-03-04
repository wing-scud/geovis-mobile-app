<template>
  <gv-panel :width="300" title="场景特效" class="sceneEffects" :pluginInfo="pluginInfo">
    <e-ffects/>
  </gv-panel>
</template>

<script lang="ts">
import Vue from "vue";
import effects from "./effects.vue";

const RoutePlan = Vue.extend({
  name: "SceneEffects",
   props: {
    pluginInfo: Object as () => GVAPP.PluginInfo
  },
  components: {
    "e-ffects":effects,
  },
  data() {
    return {};
  },
  computed: {}
});

export default RoutePlan;
</script>

<style lang="scss">
.sceneEffects {
  width: 300px !important;
  min-height: 600px;
  max-height: 800px;
  right:80px;
  top:200px;
  .gv-page-content {
    overflow: auto;
    padding: 0;
  }
}
</style>
