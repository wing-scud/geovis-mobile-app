<template>
  <div class="home">
    <keep-alive include="Map">
      <router-view></router-view>
    </keep-alive>
    <Tabbar v-model="active" :list="list" @change="handleChange" :height="50" v-if="tabbar"></Tabbar>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Home",
  data() {
    return {
      active: 0,
      list: [
        { name: "地图", icon: "icon-ditu" },
        { name: "应用", icon: "icon-daohangmoren" },
        { name: "个人", icon: "icon-geren" }
      ],
      routeComponent: "MapIndex",
      tabbar: true
    };
  },
  methods: {
    handleChange() {
      const path = ["/", "/default", "/person"];
      const componentPath = path[this.active];
      this.$router.push(componentPath)
    }
  }
});
</script>
<style src="../assets/iconfont/iconfont.css"></style>
<style src="../assets/Globe.css"></style>
