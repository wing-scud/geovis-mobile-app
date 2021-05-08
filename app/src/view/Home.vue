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
  </div>
</template>
<script lang="ts">
import { earthStore } from "@/geovis/store";
import { Toast } from "vant";
import Vue from "vue";

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
  async beforeCreate() {
    const database = window["plugin"].database;
    const user = await database.userTable.getItem("user");
    if (user && user.rememberMe) {
      const result = await this.$store.dispatch("user/login", { username: user.name, password: user.password, rememberMe: user.rememberMe });
      if (result) {
        this.$router.push({ name: "Index" });
      } else {
        Toast("login error");
      }
    } else {
      console.log("需要登录");
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
  background: $navbar-background;
}
.bottom-tabbar {
  background: $navbar-background;
}
</style>
<style lang="scss">
.home {
  .van-tabbar-item--active {
    background: $navbar-background;
    color: $highlight !important;
  }
  .van-tabbar-item {
    color: $lightgray-word;
  }
}
</style>