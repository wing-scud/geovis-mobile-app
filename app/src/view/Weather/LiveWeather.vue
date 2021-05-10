<template>
  <div class="full" :style="{ backgroundImage: backgroundImage }">
    <van-nav-bar :title="city" left-text="返回" left-arrow @click-left="goBack" @click-right="goSearchPage">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <div class="live-weather-content">
      <div class="weather-day-brief">
        <div class="weather-temperature">
          {{ temperture }}
          <span class="temperature-unit"> °C </span>
        </div>
        <div class="weather-descripe">{{ descripe }}</div>
      </div>
      <div class="weather-toast">雷雨大风天气黄色预警：-----------</div>
      <div class="weather-basic">
        <div class=""></div>
        空气 良 51
      </div>
      <div class="weather-24-table">
   
      </div>
      <van-row class="weather-nearday" v-for="i in 3" :key="i">
        <van-col span="16">今天天气-阴转雷阵雨</van-col>
        <van-col span="8">32°/20°</van-col>
      </van-row>
    </div>
  </div>
</template>
  <script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "",
  data() {
    return {
      city: "",
      backgroundImage: "",
      temperture: "37",
      descripe: "阴",
    };
  },
  methods: {
    goBack() {
      //@ts-ignore
      this.$router.backward(-1);
    },
    goSearchPage() {
      this.$router.push({ name: "SearchCity" });
    },
  },
});
</script>
  <style lang="scss" scoped>
.live-weather-content {
  // position: relative;
  // top:0;
  // left:0;
  color: white;
  text-align: center;
}
.weather-day-brief {
}
.weather-temperature {
  position: relative;
  top: 0;
  left: 0;
  display: inline-block;
  // height: 120px;
  font-size: 128px;
}
.temperature-unit {
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  margin-left: 20px;
  margin-top: 15px;
  transform: translateX(100%);
  font-size: 18px;
}
.weather-descripe {
  font-size: 15px;
}

.weather-toast {
  margin: 20px auto 10px;
  height: 48px;
  width: 92%;
  background: gray;
  font-size: 16px;
  line-height: 48px;
}
.weather-basic {
  font-size: 12px;
}
.weather-nearday {
  height: 32px;
  line-height: 32px;
  margin: 6px 6px;
  font-size: 16px;
}
</style>
  