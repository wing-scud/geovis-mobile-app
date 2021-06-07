<template>
  <div id="trail-container">
    <van-nav-bar ref="nav-bar" title="轨迹记录" left-text="返回" left-arrow @click-left="goBack" @click-right="displayMap">
      <template v-slot:right>
        <div class="micon-container">
          <van-icon name="cross" v-if="mapShow" />
          <MIcon icon="icon-trail-map" length="16px" size="24px" v-else> </MIcon>
        </div>
      </template>
    </van-nav-bar>
    <div class="trail-content-detail" id="trail-content">
      <div class="trail-distance">
        <div class="trail-distance-number">
          {{ formateDistance(state.distance) }}
        </div>
        <div class="trail-unit">km</div>
      </div>
      <div class="trail-time">
        <div class="split-equal">
          <div>{{ state.startTime ? formateStartTime(state.startTime) : "无" }}</div>
          <div class="item-intro">开始时间</div>
        </div>
        <div class="split-equal">
          <div>{{ formateState(state.mode) }}</div>
          <div class="item-intro">状态</div>
        </div>
        <div class="split-equal">
          <div>{{ formateTime(state.trailTime) }}</div>
          <div class="item-intro">记录时间</div>
        </div>
      </div>
      <div class="trail-control" v-if="!mapShow">
        <div class="trail-control-content">
          <div class="split-equal trail-control-item" @click="reset">
            <MIcon icon="icon-reset" length="56px" color="black" size="32px" backgroundColor="white" circle></MIcon>
          </div>
          <div class="trail-control-item-big trail-control-item" @click="changeMode(state.mode === 3 ? 'suspend' : 'start')">
            <MIcon :icon="state.mode === 3 ? 'icon-suspend' : 'icon-start'" length="56px" size="32px" backgroundColor="orange" color="white" circle></MIcon>
          </div>
          <div class="split-equal trail-control-item" @click="changeMode('finish')">
            <MIcon icon="icon-finish" length="56px" size="32px" color="black" backgroundColor="white" circle></MIcon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { earthStore } from "@/geovis/store";
import { formateDate } from "@/util/utils";
import store from "./store";
export default Vue.extend({
  name: "TrailControl",
  data() {
    return {
      mapShow: false,
      state: store.state,
    };
  },
  methods: {
    goBack() {
      //@ts-ignore
      this.$router.backward(-1);
      store.destroy();
    },
    displayMap() {
      this.mapShow = !this.mapShow;
      const container = document.getElementById("trail-container");
      // container.style.zIndex = this.mapShow ? "10" : "1";
      const trailData = document.getElementById("trail-content");
      trailData.className = this.mapShow ? "trail-content-brief" : "trail-content-detail";
    },
    changeMode(value) {
      store.mode = value;
      if (value === "finish") {
        this.$emit("finish");
      }
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
    reset() {
      store.init();
    },
    formateStartTime(date) {
      return formateDate(date, "hh:mm:ss");
    },
    save() {},
  },
});
</script>
<style lang="scss" scoped>
#trail-container {
  color: white;
  position: relative;
}
.micon-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.trail-content-detail {
  position: fixed;
  top: $navbar-height;
  left: 0;
  width: 100%;
  height: calc(100% - 36px);
  background-color: $navbar-background;
  z-index: 2;
}
.trail-distance {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40%;
}
.trail-distance-number {
  font-size: 96px;
}
.trail-unit {
  font-size: 16px;
}
.trail-time,
.trail-control-content {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 10px 0;
  font-size: 16px;
  text-align: center;
}
.trail-control {
  display: flex;
  justify-content: center;
  height: calc(100% - 37px - 40%);
  flex-direction: column;
  align-items: center;
  width: 64%;
  margin: 0 auto;
}

.trail-control-content {
  height: 72px;
  width: 100%;
}
.split-equal {
  flex: 1;
}
.trail-control-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.trail-control-item-big {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 3;
}
.item-intro {
  font-size: 12px;
  color: gray;
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
