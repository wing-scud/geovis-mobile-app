<template>
  <div></div>
</template>
<script lang="ts">
import Vue from "vue";
import { getOption } from "./data";
import EcahrtsProvider from "../EcahrtsProvider";

const EchartsTimeLine = Vue.extend({
  name: "EchartsTimeLine",
  data() {
    return {
      _view: null
    };
  },
 async mounted() {
     var option = await getOption();
    this._view = new EcahrtsProvider(earth, option);
  },
  beforeDestroy() {
    this._view.destroy();
  }
});
export default EchartsTimeLine;
</script>
<style scoped></style>
