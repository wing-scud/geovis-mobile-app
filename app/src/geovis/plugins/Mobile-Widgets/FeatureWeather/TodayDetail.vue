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
    <div class="sun-intro">
      <span class="sun-item">
        日出8:00
      </span>
      <span class="sun-item">
        日落17:00
      </span>
    </div>
      <div class="weather-basic">
        <div class="basic-item" v-for="i in 4" :key="i">
          <div>2级</div>
          <div class="basic-item-intro">北风</div>
        </div>
      </div>
      <div class="weather-24-table">
        <tr class="time-detail">
          <th v-for="time in getTypeArray(timeDetails, 'time')" :key="time">
            <div class="detail-item">{{ time }}</div>
          </th>
        </tr>
        <tr class="temperature-detail">
          <td v-for="temperature in getTypeArray(timeDetails, 'temperature')" :key="temperature">{{ temperature }}</td>
        </tr>
        <tr class="weather-detail">
          <td v-for="weather in getTypeArray(timeDetails, 'weather')" :key="weather">{{ weather }}</td>
        </tr>
        <tr class="wind-detail">
          <td v-for="wind in getTypeArray(timeDetails, 'wind')" :key="wind">{{ wind }}</td>
        </tr>
        <tr class="air-detail">
          <td class="air-detail-item" v-for="air in getTypeArray(timeDetails, 'air')" :key="air">{{ air }}</td>
        </tr>
      </div>
      <van-row class="weather-nearday" v-for="i in 3" :key="i">
        <van-col span="16">今天天气-阴转雷阵雨</van-col>
        <van-col span="8">32°/20°</van-col>
      </van-row>
      <div class="look-15-weather">
        查看近15日天气
      </div>
    </div>
  </div>
</template>
  <script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "TodayDetail",
  data() {
    return {
      city: "",
      backgroundImage: "",
      temperture: "37",
      descripe: "阴",
      timeDetails: [
        {
          time: "8:00",
          temperature: "22°",
          weather: "阴",
          wind: "东2级",
          air: "优",
        },
        {
          time: "8:00",
          temperature: "22°",
          weather: "阴",
          wind: "东2级",
          air: "优",
        },
        {
          time: "8:00",
          temperature: "22°",
          weather: "阴",
          wind: "东2级",
          air: "优",
        },
        {
          time: "8:00",
          temperature: "22°",
          weather: "阴",
          wind: "东2级",
          air: "优",
        },
        {
          time: "8:00",
          temperature: "22°",
          weather: "阴",
          wind: "东2级",
          air: "优",
        },
        {
          time: "8:00",
          temperature: "22°",
          weather: "阴",
          wind: "东2级",
          air: "优",
        },
        {
          time: "8:00",
          temperature: "22°",
          weather: "阴",
          wind: "东2级",
          air: "优",
        },
        {
          time: "8:00",
          temperature: "22°",
          weather: "阴",
          wind: "东2级",
          air: "优",
        },
        {
          time: "8:00",
          temperature: "22°",
          weather: "阴",
          wind: "东2级",
          air: "优",
        },
        {
          time: "8:00",
          temperature: "22°",
          weather: "阴",
          wind: "东2级",
          air: "优",
        },
        {
          time: "8:00",
          temperature: "22°",
          weather: "阴",
          wind: "东2级",
          air: "优",
        },
        {
          time: "8:00",
          temperature: "22°",
          weather: "阴",
          wind: "东2级",
          air: "优",
        },
        {
          time: "8:00",
          temperature: "22°",
          weather: "阴",
          wind: "东2级",
          air: "优",
        },
      ],
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
    getTypeArray(arrayObject, type) {
      return arrayObject.map((item) => item[type]);
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
.sun-intro{
  padding:5px 0;
}
.sun-item{
  display: inline-block;
  width:120px;
  height:24px;
  font-size: 16px;
}
.weather-basic {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin:10px 0;
  font-size: 16px;
}
.basic-item {
  flex: 1;
}
.basic-item-intro {
  font-size: 12px;
  color: gray;
}
.weather-24-table {
  margin: 10px 0;
  padding: 5px 0;
  width: 100%;
  overflow-x: scroll;
  text-align: center;
  border-collapse: separate;
  border-spacing: 10px 10px;
}
.time-detail {
  width: 100%;
  font-size: 12px;
}
.temperature-detail {
  font-size: 15px;
}
.air-detail {
  height: 16px;
  font-size: 12px;
}
.detail-item {
  width: 48px;
  height: 100%;
  text-align: center;
}
.wind-detail {
  font-size: 12px;
}
.air-detail-item {
  border-radius: 8px;
  background: gray;
}

.weather-nearday {
  height: 32px;
  line-height: 32px;
  padding: 8px 6px;
  font-size: 16px;
}
.look-15-weather{
  position: absolute;
  bottom: 5px;
  left:0;
  width:calc(100% - 48px);
  height: 32px;
  margin:0 12px;
  padding:8px 12px;
  border-radius: 12px;
  line-height: 32px;
  font-size: 18px;
  background: gray;
  text-align: center;
}
</style>
  