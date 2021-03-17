<template>
  <div class="home">
    <keep-alive include="MapIndex">
      <component :is="routeComponent" @changeRouteComponent="change"></component>
    </keep-alive>
    <Tabbar v-model="active" :list="list" @change="handleChange" :height="50" v-if="tabbar"></Tabbar>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Index",
  data() {
    return {
      active: 0,
      list: [
        { name: "地图", icon: "icon-ditu" },
        { name: "默认", icon: "icon-daohangmoren" },
        { name: "个人", icon: "icon-geren" }
      ],
      routeComponent: "MapIndex",
      tabbar: true
    };
  },
  methods: {
    handleChange() {
      const path = ["MapIndex", "default", "personal"];
      const component = path[this.active];
      this.routeComponent = component;
    },
    /**
     * value：{
     * component:"",
     * tabbar:true
     * }
     */
    change($event, value) {
      this.routeComponent = value.component;
      this.tabbar = value.tabbar;
    }
  }
});
</script>
<style src="../../assets/iconfont/iconfont.css"></style>
<style src="../../assets/Globe.css"></style>
