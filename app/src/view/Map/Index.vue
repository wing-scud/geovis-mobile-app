<template>
  <div>
    <div class="map-plugin-right">
      <Icon :icon="item.icon" length="25px" v-for="item in listFunc" :key="item['name']" :name="item['name']" circle @click="handleClick(item['name'])"></Icon>
    </div>
    <Earth></Earth>
    <van-popup v-model="popShow" position="right" :style="{ width: '60%', height: '100%' }" :close-on-popstate="true" @close="closePopup">
      <Layer></Layer>
    </van-popup>
  </div>
</template>
<script lang="ts">
import { Toast } from 'vant';
import LocationWatch from "./store";
import Vue from "vue";
import { earthStore } from "@/geovis/store";
export default Vue.extend({
  name: "Map",
  data() {
    return {
      listFunc: [
        { name: "消息", icon: "icon-xiaoxi " },
        { name: "图层", icon: "icon-tuceng " },
        { name: "锁定", icon: "icon-suoding " },
        { name: "导航", icon: "icon-luxian " }
      ],
      popShow: false
    };
  },
  mounted() {
    const earth = earthStore.earth;
    //@ts-ignore
    this._store = new LocationWatch(earth);
  },
  methods: {
    handleClick(name) {
      //@ts-ignore
      const store = this._store;
      switch (name) {
        case "消息":
          this.$router.push({ name: "messageCenter" });
          break;
        case "图层":
          this.popShow = true;
          break;
        case "锁定":
          store.locking = !store.locking;
          break;
        case "导航":
          this.$router.push({ name: "route" });
          break;
        default:
          break;
      }
    },
    closePopup() {}
  }
});
</script>
<style scoped>
.map-plugin-right {
  position: fixed;
  width: 30px;
  height: 100%;
  top: 0;
  right: 10px;
  z-index: 100;
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
</style>
