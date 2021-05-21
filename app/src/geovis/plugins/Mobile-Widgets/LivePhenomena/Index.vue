<template>
  <div>
    <van-nav-bar title="关于" left-text="返回" left-arrow @click-left="goBack" />
    <div class="actived-list">
      <MIcon :icon="item.icon" v-for="item in activedList" :key="item.name" size="24px" length="32px" :label="item.name" customClass="icon-weather" :circle="true" @click="changeMode(item.id, item.type)"></MIcon>
    </div>
    <div class="liveweather-timeline">
      <van-slider v-model="time" :min="minTime" :max="maxTime" active-color="blue" step="3" inactive-color="blue" bar-height="4px" @input="changeTime">
        <template #button>
          <div class="custom-button" v-html="pointTime"></div>
        </template>
      </van-slider>
    </div>
  </div>
</template>
  <script lang="ts">
import Vue from "vue";
import { earthStore } from "@/geovis/store";
import manager, { list } from "./store";
export default Vue.extend({
  name: "LiveWeather",
  data() {
    return {
      // 按小时为单位
      current: undefined,
      time: 1,
      timeLength: 72,
      minTime: 1,
      maxTime: 72,
      activedList: list,
    };
  },
  mounted() {
    this.init();
  },
  activated() {
    this.init();
  },
  deactivated() {
    this.destory();
  },
  destroyed() {
    this.destory();
  },
  computed: {
    pointTime: function () {
      //@ts-ignore
      const date = this.formatSecondsToDate(this.current + this.time*3600);
      //@ts-ignore
      const string = this.formatDate(date.getTime(), "MM-dd <br> hh:mm");
      return string;
    },
    activedListShowed() {
      return [];
    },
  },
  methods: {
    changeMode(id) {
      manager.mode = id;
    },
    goBack() {
      //@ts-ignore
      this.$router.backward(-1);
    },
    init() {
      earthStore.state.mode = "map";
      earthStore.setMapFullScreen(true);
      earthStore.state.onlyMap = true;
      this.current = this.formatDateToSeconds(new Date("2021-05-22 12:00Z"));
      const date = this.formatSecondsToDate(this.current + this.time * 3600);
      manager.seconds = this.formatDateToSeconds(date);
    },
    destory() {
      manager.destory();
      earthStore.state.mode = "globe3";
      earthStore.setMapFullScreen(false);
      earthStore.state.onlyMap = false;
    },
    formatSecondsToDate(seconds: number) {
      return new Date(seconds * 1000);
    },
    formatDateToSeconds(date: Date) {
      return Math.floor(date.getTime() / 1000);
    },
    formatDate(secs, format) {
      // console.log("日期", format(1505729264599, "yyyy-MM-dd hh:mm:ss"));
      const t = new Date(secs);
      const date = {
        "M+": t.getMonth() + 1,
        "d+": t.getDate(),
        "h+": t.getHours(),
        "m+": t.getMinutes(),
        "s+": t.getSeconds(),
        "q+": Math.floor((t.getMonth() + 3) / 3),
        "S+": t.getMilliseconds(),
      };
      if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length));
      }

      for (const k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
      }
      return format;
    },
    changeTime() {
      manager.seconds = this.current + this.time * 3600;
    },
  },
});
</script>
  <style scoped>
.liveweather-timeline {
  position: absolute;
  bottom: 12px;
  left: 18px;
  right: 18px;
  z-index: 5;
  height: 12px;
}
.actived-list {
  position: absolute;
  top: 48px;
  right: 18px;
  z-index: 5;
}
.custom-button {
  display: inline-block;
  border-radius: 24%;
  width: 36px;
  height: 36px;
  line-height: 18px;
  font-size: 12px;
  color: white;
  background: red;
  text-align: center;
}

.icon-weather {
  margin-top: 10px !important;
}
</style>
  