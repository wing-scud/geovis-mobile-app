<template>
  <div>
    <gv-sidebar :list="visState.list" @click="handleCLick" />
    <component v-bind:is="visState.appId"></component>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { visStore } from "./VisStore";
import "./layers/AppList";
const VisManager = Vue.extend({
  name: "VisManager",
  props: {
    pluginInfo: {
      type: Object as () => GVAPP.PluginInfo,
      required: true
    }
  },
  data() {
    return {
      visState: visStore.state
    };
  },
  mounted() {
    visStore.init();
  },
  beforeDestroy() {},
  methods: {
    handleCLick: visStore.toggleApp
  }
});
Vue.component("VisManager", VisManager);
export default VisManager;
</script>

<style lang="scss" >
// .box-card {
//   text-align: center;
//   background-color: #414141;
// }
// .side-item {
//   margin: 10px 0;
//   text-align: center;
// }
// .item-img {
//   border: 1px #0cb354f7 solid;
//   margin-top: 5px;
// }
// .item-title {
//   float: none !important;
// }
// .side-item :hover{

// }
</style>
