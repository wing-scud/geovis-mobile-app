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
        { name: "地图", icon: "icon-ditu" },
        { name: "新闻", icon: "icon-yingyong" },
        { name: "应用", icon: "icon-yingyong" },
        { name: "个人", icon: "icon-geren" }
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
    handleChange(active) {
      const path = ["/", "/application", "/application", "/person"];
      const componentPath = path[active];
      this.$router.push(componentPath);
    }
  }
});
</script>
