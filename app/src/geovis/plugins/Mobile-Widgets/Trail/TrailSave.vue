<template>
  <div id="trail-container">
    <van-nav-bar ref="nav-bar" title="轨迹记录" left-text="返回" left-arrow @click-left="goBack" right-text="保存" @click-right="displayDialog(true)"> </van-nav-bar>
    <van-dialog v-model="show" title="轨迹保存" show-cancel-button @confirm="submit" @cancel="displayDialog(false)">
      <van-field v-model="title" label="标题" />
      <van-field v-model="describe" label="描述" />
    </van-dialog>
    <div class="trail-info trail-content-brief">
      <div class="split-equal">
        <div>{{ formateStartTime(state.startTime) }}</div>
        <div class="item-intro">开始时间</div>
      </div>
      <div class="split-equal">
        <div>{{ formateTime(state.trailTime) }}</div>
        <div class="item-intro">记录时间</div>
      </div>
      <div class="split-equal">
        <div>{{ formateDistance(state.distance) }}</div>
        <div class="item-intro">距离(km)</div>
      </div>
    </div>
  </div>
</template>
  <script lang="ts">
import Vue from "vue";
import { earthStore } from "@/geovis/store";
import { formateDate } from "@/util/utils";
import store from "./store";
import { Toast } from "vant";
export default Vue.extend({
  name: "TrailSave",
  data() {
    return {
      state: store.state,
      show: false,
      title: "",
      describe: "",
    };
  },
  mounted() {
    this.init();
  },
  destroyed() {
    this.destroy();
  },
  methods: {
    displayDialog(bool) {
      this.show = bool;
      if (!bool) {
        this.title = "";
        this.describe = "";
      }
    },
    init() {
      earthStore.state.mode = "map";
      earthStore.setMapFullScreen(true);
      earthStore.state.onlyMap = true;
      store.mapShow = true;
    },
    goBack() {
      //@ts-ignore
      this.$router.backward(-1);
      this.destroy();
    },
    async submit() {
      const data = {
        startTime: store.state.startTime,
        trailTime: store.state.trailTime,
        distance: store.state.distance,
        geojson: store.geojson,
        title: this.title,
        describe: this.describe,
      };
      const result = await this.$store.dispatch("trails/add", data);
      result && Toast(result.message);
      this.displayDialog(false);
    },
    formateTime(time) {
      let string;
      const seconds = Math.floor(time % 60);
      if (seconds < 10) {
        string = "0" + seconds;
      } else {
        string = seconds;
      }
      const minutes = Math.floor((time % 3600) / 60);
      if (minutes < 10) {
        string = "0" + minutes + ":" + string;
      } else {
        string = minutes + ":" + string;
      }
      const hours = Math.floor(time / 3600);
      if (hours < 10) {
        string = "0" + hours + ":" + string;
      } else {
        string = hours + ":" + string;
      }
      return string;
    },
    formateState(state) {
      const array = ["未开始", "结束", "暂停", "进行中"];
      return array[state];
    },
    formateDistance(distance) {
      return distance.toFixed(2);
    },
    formateStartTime(date) {
      return formateDate(date, "hh:mm:ss");
    },
    destroy() {
      earthStore.state.mode = "globe3";
      earthStore.setMapFullScreen(false);
      earthStore.state.onlyMap = false;
      store.destroy();
    },
  },
});
</script>
  <style lang="scss" scoped>
#trail-container {
  color: white;
  position: relative;
}
.trail-info {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 10px;
  font-size: 16px;
  text-align: center;
}

.split-equal {
  flex: 1;
}
.item-intro {
  font-size: 14px;
  color: gray;
  margin: 8px 0;
}
.trail-content-brief {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: $navbar-background;
  z-index: 2;
}
</style>
  