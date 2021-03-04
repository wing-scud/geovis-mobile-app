<template>
  <div id="heihtRamp" class="root"></div>
</template>
<script>
import { highlyTool } from "./store";
export default {
  name: "HighlyMap",
  mounted() {
    highlyTool.init();
    document.getElementById("heihtRamp").appendChild(highlyTool.gui.domElement);
    highlyTool.destroy();
  }
};
</script>
<style src="./HighlyMap.css" scoped></style>
