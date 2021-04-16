<template>
  <div class="home">
    <div class="main-title"><van-icon name="arrow-down" class="custon-arrow-title" />小组</div>
    <div class="main-part">
      <keep-alive include="Map">
        <router-view></router-view>
      </keep-alive>
    </div>
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
<style scoped>
.home {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.main-title {
  width: 100%;
  height: 32px;
  font-size: 16px;
  text-align: center;
  color: #000;
  background-color: #f7f3f3;
  line-height: 32px;
}
.custon-arrow-title {
  font-size: 8px;
}
.main-part {
  flex-grow: 1;
  width: 100%;
  position: relative;
}
</style>
