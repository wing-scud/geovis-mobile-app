<template>
  <div class="home">
    <keep-alive include="Map">
      <router-view></router-view>
    </keep-alive>
    <MTabbar v-model="active" :list="list" @change="handleChange" :height="50" id="bottomTabbar"></MTabbar>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
const NativeStorage = window["NativeStorage"];
export default Vue.extend({
  name: "Home",
  data() {
    return {
      active: 0,
      list: [
        { title: "地图", icon: "icon-ditu", name: "Map" },
        { title: "新闻", icon: "icon-yingyong", name: "News" },
        { title: "应用", icon: "icon-yingyong", name: "Application" },
        { title: "个人", icon: "icon-geren", name: "Person" }
      ]
    };
  },
  beforeCreate() {
    const user = NativeStorage.getItem("user");
    if (user) {
      this.$store.commit("user/initUser", JSON.parse(user));
    }
  },
  methods: {
    handleChange() {}
  },
  watch: {
    active() {
      console.log("MTabbar ", this.active);
    }
  }
});
</script>
