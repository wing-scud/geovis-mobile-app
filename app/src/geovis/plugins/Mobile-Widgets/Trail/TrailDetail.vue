<template>
  <div id="trail-container">
    <van-nav-bar ref="nav-bar" title="轨迹内容" left-text="返回" left-arrow @click-left="goBack" right-text="设置" @click-right="showSetting"> </van-nav-bar>
    <van-popup v-model="show">
      <div class="setting">
        <div class="setting-title">常规</div>
        <div class="setting-item">
          播放速度: {{ speed }}
          <van-slider class="setting-slider" v-model="speed" :min="1" :max="100" @change="changeSpeed"> </van-slider>
        </div>
        <div class="setting-title">跟踪模式</div>
        <div class="setting-item">
          偏航: {{ cameraState.heading }}
          <van-slider class="setting-slider" v-model="cameraState.heading" :min="0" :max="360" @change="changeSpeed"> </van-slider>
        </div>
        <div class="setting-item">
          俯仰: {{ cameraState.pitch }}
          <van-slider class="setting-slider" v-model="cameraState.pitch" :min="0" :max="30" @change="changeSpeed"> </van-slider>
        </div>
        <div class="setting-item">
          高度: {{ cameraState.altitude }}
          <van-slider class="setting-slider" v-model="cameraState.altitude" :min="1" :max="1000" @change="changeSpeed"> </van-slider>
        </div>
      </div>
    </van-popup>
    <div class="trail-info trail-content-brief">
      <div class="split-equal">
        <div>{{ formateStartTime(trail.startTime) }}</div>
        <div class="item-intro">开始时间</div>
      </div>
      <div class="split-equal">
        <div>{{ trail.trailTime }}秒</div>
        <div class="item-intro">记录时间</div>
      </div>
      <div class="split-equal">
        <div>{{ trail.distance }}km</div>
        <div class="item-intro">距离(km)</div>
      </div>
    </div>
    <div class="trail-control">
      <div class="control-buttons">
        <van-button @click="play()"> {{ state.play ? "结束" : "播放" }}</van-button>
        <van-button @click="suspend()"> 暂停 </van-button>
        <van-button @click="modeSet()" :color="state.mode ? 'red' : '#2a355d'"> 跟踪 </van-button>
      </div>
      <div class="time-setting">
        时间: {{ time }}
        <van-slider class="time-slider" v-model="time" :min="0" :max="trail.trailTime" @drag-start="stopPlay" @input="changeTime" @drag-end="startPlay"> </van-slider>
      </div>
    </div>
  </div>
</template>
  <script lang="ts">
import Vue from "vue";
import { earthStore } from "@/geovis/store";
import { formateDate } from "@/util/utils";
import TrailPlayer from "./TrailPlayer";
import * as _ from "lodash";
import { Toast } from "vant";
export default Vue.extend({
  name: "TrailDetail",
  data() {
    return {
      trail: {
        startTime: null,
        trailTime: 0,
        distance: 0,
      },
      _player: undefined,
      show: false,
      state: null,
      time: 0,
      speed: 1,
      throttleUpdateTime: null,
      cameraState: null,
    };
  },
  created() {
    this.init();
  },
  destroyed() {
    this.destroy();
  },
  watch: {
    "state.time": function () {
      //加个节流
      this.throttleUpdateTime();
    },
  },
  methods: {
    async init() {
      const filePlugin = window["plugin"].file;
      const id = this.$route.params.id;
      const trail = this.$store.getters["trails/getById"](id);
      const geojsonFileInfo = trail.geojsonFile;
      const geojsonFile = await filePlugin.readFile(geojsonFileInfo.fullPath);
      const geojson = JSON.parse(await geojsonFile.text());
      trail.geojson = geojson;
      this.trail = trail;
      this._player = new TrailPlayer(trail);
      this.cameraState = this._player.cameraState;
      this.state = this._player.state;
      earthStore.state.mode = "map";
      earthStore.setMapFullScreen(true);
      earthStore.state.onlyMap = true;
      this.throttleUpdateTime = _.throttle(this.updateTime, 100);
    },
    play() {
      this._player.play = !this._player._state.play;
    },
    stopPlay() {
      this._player._state.play = false;
    },
    startPlay() {
      this._player._state.play = true;
    },
    changeSpeed() {
      this._player.state.speed = this.speed;
    },
    updateTime() {
      this.time = Math.floor(this.state.time * this.state.speed);
    },
    suspend() {
      this._player._state.play = false;
    },
    modeSet() {
      this._player.mode = !this._player.mode;
    },
    showSetting() {
      this.show = true;
    },
    formateStartTime(date) {
      return date && formateDate(new Date(date), "yyyy-MMM-dd hh:mm:ss");
    },
    changeTime() {
      this._player.changeTime(this.time);
    },
    goBack() {
      //@ts-ignore
      this.$router.backward();
    },
    destroy() {
      earthStore.state.mode = "globe3";
      earthStore.setMapFullScreen(false);
      earthStore.state.onlyMap = false;
      this._player.destroy();
    },
  },
});
</script>
  <style lang="scss" scoped>
#trail-container {
  color: white;
}
.trail-info {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 10px;
  font-size: 16px;
  text-align: center;
  color: white;
  align-items: flex-end;
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
  top: $navbar-height;
  left: 0;
  width: 100%;
  background-color: $navbar-background;
  z-index: 2;
}
.trail-control {
  position: fixed;
  bottom: 0;
  left: 0;
  width: calc(100% - 24px);
  background-color: $navbar-background;
  height: 120px;
  padding: 8px 12px;
  z-index: 2;
}
.setting {
  width: 80vw;
  height: 224px;
  background-color: $navbar-background;
  padding: 16px 8px;
}
.control-buttons {
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.time-setting {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 24px;
}
.time-slider {
  flex: 1;
  margin: 0 12px;
}
.van-slider {
  height: 3px;
}
.setting-speed {
  margin: 8px 8px;
}
.setting-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  margin: 12px 0;
}
.setting-slider {
  flex: 1;
  margin: 0 12px 0 16px;
}
.setting-title {
  color: rgb(96, 102, 101);
  font-size: 14px;
}
</style>
  