<template>
  <div>
    <Earth></Earth>
    <div class="map-plugin-right">
      <MIcon :icon="item.icon" length="35px" v-for="item in listFunc" :key="item['name']" :name="item['name']" circle @click="handleClick(item['name'])"> </MIcon>
    </div>
    <WeatherInfor></WeatherInfor>
    <van-popup v-model="popShow" position="right" :style="{ width: '60%', height: '100%' }" :close-on-popstate="true" @close="closePopup"><Layer></Layer></van-popup>
    <MobileBaseWidgets></MobileBaseWidgets>
  </div>
</template>
<script lang="ts">
/* eslint-disable */
import Vue from "vue";
import { earthStore } from "@/geovis/store";
export default Vue.extend({
  name: "MapEntity",
  props: ["listFunc"],
  data() {
    return {
      popShow: false,
      route: false,
      state: earthStore.state,
    };
  },
  mounted() {},
  methods: {
    handleClick(name) {
      switch (name) {
        case "消息":
          this.$router.push({ name: "messageCenter" });
          break;
        case "图层":
          this.popShow = true;
          break;
        case "锁定":
          //开启与关闭Location插件
          //@ts-ignore
          document.getElementsByClassName("icon-suoding")[0].style.color = lockSelf.locking ? "#0c87f1" : "#333";
          break;
        case "路线查询":
          if (this.$route.path === "/map/pathPlan" && this.state.mode === "map") {
            this.$router.push({ name: "search" });
          } else if (this.$route.path === "/map/pathPlan" && (this.state.mode === "globe2" || this.state.mode === "globe3")) {
            this.state.mode = "map";
          } else {
            this.$router.push({ name: "pathPlan" });
          }
          break;
        default:
          break;
      }
    },
    closePopup() {},
  },
});
</script>
<style scoped>
.map-plugin-right {
  position: absolute;
  width: 40px;
  /* height: 100%; */
  top: 150px;
  right: 5px;
  z-index: 2;
  display: flex;
  flex-direction: column;
}
.icon {
  width: 30px;
  height: 30px;
  background-color: white;
  margin: 10px 0;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
}
.top-widget {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  /* height: 45px; */
}

</style>