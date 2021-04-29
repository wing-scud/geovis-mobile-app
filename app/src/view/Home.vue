<<<<<<< HEAD
<template>
  <div class="home">
    <div class="main-part">
      <!-- <keep-alive include="Map">
        <router-view></router-view>
      </keep-alive> -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <MTabbar v-model="active" :list="list" @change="handleChange" :height="50" id="bottomTabbar" v-if="!state.fullScreen"></MTabbar>
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
.main-part {
  flex-grow: 1;
  width: 100%;
  position: relative;
}
</style>
=======
<template>
  <div class="home">
    <div class="main-part">
      <keep-alive include="Map">
        <router-view></router-view>
      </keep-alive>
      <!-- <keep-alive >
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view> -->
    </div>
    <MTabbar v-model="active" :list="list" @change="handleChange" :height="50" id="bottomTabbar" v-if="!state.fullScreen"></MTabbar>
    <!-- <van-tabbar v-model="active"  :height="50" id="bottomTabbar" v-if="!state.fullScreen">
      <van-tabbar-item :icon="item.icon" v-for="(item,index0) in list" :key="index0" @change="handleChange">{{item.title}}</van-tabbar-item>
    </van-tabbar> -->
  </div>
</template>
<script lang="ts">
import { earthStore } from "@/geovis/store";
import Vue from "vue";
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar);
Vue.use(TabbarItem);

const NativeStorage = window["NativeStorage"];
export default Vue.extend({
  name: "Home",
  data() {
    return {
      active:0,
      state:earthStore.state,
      list: [
        { title: "地图", icon: "icon-ditu", name: "Map" },
        { title: "通讯", icon: "icon-tongxun", name: "ChatIndex" },
        { title: "应用", icon: "icon-yingyong", name: "Application" },
        { title: "个人", icon: "icon-geren", name: "Person" }
      ]
    };
  },
  mounted() {
  },
  beforeCreate() {
    const user = NativeStorage.getItem("user");
    if (user) {
      this.$store.commit("user/initUser", JSON.parse(user));
    }
  },
  methods: {
    handleChange(){}
  },
  watch: {
    active() {
      console.log("MTabbar ", this.active);
    }
  }
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
   box-shadow: $box-top-shadow;
}
 
</style>
>>>>>>> 6377b0e831057e4530a7cb9628fa9fe8ef2477a8
