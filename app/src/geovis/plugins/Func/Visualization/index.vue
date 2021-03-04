<template>
  <div class="root">
    <VisualMenu />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VisualMenu from "./components/VisualMenu.vue";
const Visualization = Vue.extend({
  name: "Visualization",
  components:{
      VisualMenu
  },
  props: {
    pluginInfo: {
      type: Object as () => GVAPP.PluginInfo,
      required: true
    }
  },
  data() {
    return {};
  },
  mounted() {},
  beforeDestroy() {},
  methods: {}
});
Vue.component("Visualization", Visualization);
export default Visualization;
</script>
<style lang="scss" scoped>
</style>
