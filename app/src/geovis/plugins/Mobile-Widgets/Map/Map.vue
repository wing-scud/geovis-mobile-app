<template>
  <div>
    <div class="map-plugin-right"><Icon :icon="item.icon" length="35px" v-for="item in listFunc" :key="item['name']" :name="item['name']" circle @click="handleClick(item['name'])"></Icon></div>
    <Earth></Earth>
    <div class="left-bottom-weather">阴天 12°</div>
    <van-popup v-model="popShow" position="right" :style="{ width: '60%', height: '100%' }" :close-on-popstate="true" @close="closePopup"><Layer></Layer></van-popup>
  </div>
</template>
<script lang="ts">
/* eslint-disable */
import LocationWatch from "./store";
import Vue from "vue";
import { earthStore } from "@/geovis/store";
export default Vue.extend({
  name: "Map",
  props:['listFunc'],
  data() {
    return {
      popShow: false,
      route: false,
    };
  },
  mounted() {
    const earth = earthStore.earth;
    //@ts-ignore
    this.lockSelf = new LocationWatch(earth);
  },
  methods: {
    handleClick(name) {
      //@ts-ignore
      const lockSelf = this.lockSelf;
      switch (name) {
        case "消息":
          this.$router.push({ name: "messageCenter" });
          break;
        case "图层":
          this.popShow = true;
          break;
        case "锁定":
          lockSelf.locking = !lockSelf.locking;
          break;
        case "导航":
          this.$emit("changeComponent","Route")
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
  width: 30px;
  height: 100%;
  top: 150px;
  right: 10px;
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
.left-bottom-weather {
  position: absolute;
  bottom: 0;
  left: 5px;
  width: 80px;
  z-index: 3;
  height: 20px;
  color: white;
  font-size: 12px;
}
</style>
