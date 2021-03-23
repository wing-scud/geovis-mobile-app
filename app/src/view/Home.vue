<template>
  <div class="home">
    <!-- <keep-alive include="Map"> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
    <MTabbar v-model="active" :list="list" @change="handleChange" :height="50"></MTabbar>
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
    };
  },
  methods: {
    handleChange() {
      const path = ["/", "/application", "/person"];
      const componentPath = path[this.active];
      this.$router.push(componentPath);
    }
  }
});
</script>
<style src="../assets/iconfont/iconfont.css"></style>
<style src="../assets/Globe.css"></style>
