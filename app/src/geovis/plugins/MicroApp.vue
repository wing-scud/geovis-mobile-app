<template>
  <div class="micro-app-root" ref="app"></div>
</template>
<script>
import Vue from "vue";

import { loadMicroApp } from "qiankun";
const appMap = {};
const firstLoaded = {};
const lastPosition = {};
const MicroApp = Vue.extend({
  name: "Template",
  props: {
    pluginInfo: {
      type: Object,
      required: true
    }
  },
  mounted() {
    const { id, entry } = this.pluginInfo;
    this.containerRef = this.$refs["app"];
    if (!appMap[id]) {
      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.top = 0;
      container.style.left = 0;
      // container.style.width="100%"
      // container.style.height="100%";
      document.body.appendChild(container);
      const option = this.pluginInfo.options||{}
      console.log(option,"option!!!!!!!!")
      appMap[id] = this.app = loadMicroApp(
        //appMap[id] =
        { name: id, entry: entry, container: container, props: { name: "qiankun" } },
        {
          sandbox: false,
          ...option
          // singular:
        }
      );
    } else {
      appMap[id].mount();
    }
  },
  beforeDestroy() {
    const { id, entry } = this.pluginInfo;
    appMap[id].unmount();
  }
});
Vue.component("gv-micro-app", MicroApp);
export default MicroApp;
</script>

<style scoped>
.micro-app-root {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
