<template>
  <div class="home">
    <div class="main-part">
      <keep-alive include="Map">
        <router-view></router-view>
      </keep-alive>
      <!-- <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view> -->
    </div>
    <van-tabbar v-model="active" id="bottomTabbar" v-if="!state.fullScreen" class="bottom-tabbar" @change="handleChange" :fixed="true" route active-color="#0372f1e0" replace>
    <van-tabbar-item push :to="{ name: item.name }" v-for="item in list" :key="item['title']">
      <span class="tabbar-name">{{ item["title"] }} </span>
      <template #icon>
        <div :class="[item['icon'], 'iconfont']"></div>
      </template>
    </van-tabbar-item>
  </van-tabbar>
    <!-- <MTabbar v-model="active" :list="list" @change="handleChange" :height="50" id="bottomTabbar" v-if="!state.fullScreen"></MTabbar> -->
  </div>
</template>
<script lang="ts">
import { earthStore } from "@/geovis/store";
import Vue from "vue";
const NativeStorage = window["NativeStorage"];
export default Vue.extend({
  name: "Home",
  data() {
    return {
      active: 0,
      state: earthStore.state,
      list: [
        { title: "地图", icon: "icon-ditu", name: "Map" },
        { title: "通讯", icon: "icon-tongxun", name: "ChatIndex" },
        { title: "应用", icon: "icon-yingyong", name: "Application" },
        { title: "个人", icon: "icon-geren", name: "Person" },
      ],
    };
  },
  mounted() {},
  beforeCreate() {
    const NativeStorage = window['NativeStorage'];
    const user = NativeStorage.getItem("user");
    if (user) {
      this.$store.commit("user/initUser", JSON.parse(user));
    }
  },
  methods: {
    handleChange() {},
  },
  watch: {
    active() {
      console.log("MTabbar ", this.active);
    },
  },
});
</script>
<style scoped lang="scss">
.home {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.main-part {
  flex-grow: 1;
  width: 100%;
  position: relative;
}
.bottom-tabbar{
  background:$navbar-background;
}
.van-tabbar-item--active{
    background:$navbar-background;
    color:$highlight!important;
}
.van-tabbar-item{
  color:$lightgray-word;
}
</style>
