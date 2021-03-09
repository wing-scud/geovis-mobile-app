<template>
  <div class="home">
    <div class="content">
      <component :is="component"></component>
      <RequestPermissions></RequestPermissions>
    </div>
    <Tabbar v-model="active" :list="list" @change="handleChange" :height="50"></Tabbar>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Map from "./Map/Index.vue";
export default Vue.extend({
  name: "Home",
  components: {
    Map
  },
  data() {
    return {
      active: 0,
      list: [
        { name: "地图", icon: "icon-ditu" },
        { name: "默认", icon: "icon-daohangmoren" },
        { name: "个人", icon: "icon-geren" }
      ],
      component: "Map"
    };
  },
  methods: {
    handleChange() {
      const components = ["Map", "mo-ren", "zhu-ye"];
      this.component = components[this.active];
    }
  }
});
</script>
<style src="../assets/iconfont/iconfont.css"></style>
<style src="../assets/Globe.css"></style>
