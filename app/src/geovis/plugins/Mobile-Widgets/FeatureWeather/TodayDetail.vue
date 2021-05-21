<template>
  <div class="full">
    <van-nav-bar :title="city" left-text="返回" left-arrow @click-left="goBack" @click-right="goSearchPage">
      <template v-slot:right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <div class="live-weather-content">
      <div class="weather-day-brief">
        <div class="weather-temperature">
          {{ dayDetail.temp }}
          <span class="temperature-unit"> °C </span>
        </div>
        <div class="weather-descripe">{{ dayDetail.weather }}</div>
      </div>
      <div class="weather-toast">{{ dayDetail.describe }}</div>
      <div class="sun-intro">
        <span class="sun-item"> 日出{{ dayDetail.sunrise }} </span>
        <span class="sun-item"> 日落{{ dayDetail.sunset }} </span>
      </div>
      <div class="weather-basic">
        <div class="basic-item">
          <div>{{ dayDetail.windDir }}</div>
          <div class="basic-item-intro">风向</div>
        </div>
        <div class="basic-item">
          <div>{{ dayDetail.humidity }}</div>
          <div class="basic-item-intro">湿度</div>
        </div>
        <div class="basic-item">
          <div>{{ dayDetail.pressure }}</div>
          <div class="basic-item-intro">气压</div>
        </div>
        <div class="basic-item">
          <div>{{ dayDetail.windPower }}</div>
          <div class="basic-item-intro">风力</div>
        </div>
      </div>
      <div class="weather-24-table">
        <tr class="time-detail">
          <th v-for="(time, index) in getTypeArray(timeDetails, 'time')" :key="index">
            <div class="detail-item">{{ time }}</div>
          </th>
        </tr>
        <tr class="temperature-detail">
          <td v-for="(temperature, index) in getTypeArray(timeDetails, 'temperature')" :key="index">{{ temperature }}</td>
        </tr>
        <tr class="weather-detail">
          <td v-for="(weather, index) in getTypeArray(timeDetails, 'weather')" :key="index">{{ weather }}</td>
        </tr>
        <tr class="wind-detail">
          <td v-for="(wind, index) in getTypeArray(timeDetails, 'wind')" :key="index">{{ wind }}</td>
        </tr>
        <tr class="air-detail">
          <td class="air-detail-item" v-for="(air, index) in getTypeArray(timeDetails, 'air')" :key="index">{{ air }}</td>
        </tr>
      </div>
      <van-row class="weather-nearday" v-for="day in nearDays" :key="day.date">
        <van-col span="16" class="near-week">{{ day.week }}·{{ day.weather }}</van-col>
        <van-col span="8" class="near-weather">{{ day.minTemp }}/{{ day.maxTemp }} °C</van-col>
      </van-row>
      <div class="look-15-weather">查看近15日天气</div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import manager from "./store";
export default Vue.extend({
  name: "TodayDetail",
  data() {
    return {
      city: "苏州",
      dayDetail: {},
      timeDetails: [
        {
          id: "1",
          time: "8:00",
          temperature: "22°",
          weather: "阴",
          wind: "东2级",
          air: "优",
        },
        { id: "2", time: "8:00", temperature: "22°", weather: "阴", wind: "东2级", air: "优" },
        {
          id: "3",
          time: "8:00",
          temperature: "22°",
          weather: "阴",
          wind: "东2级",
          air: "优",
        },
        {
          id: "4",
          time: "8:00",
          temperature: "22°",
          weather: "阴",
          wind: "东2级",
          air: "优",
        },
        {
          id: "5",
          time: "8:00",
          temperature: "22°",
          weather: "阴",
          wind: "东2级",
          air: "优",
        },
        {
          id: "6",
          time: "8:00",
          temperature: "22°",
          weather: "阴",
          wind: "东2级",
          air: "优",
        },
        {
          id: "7",
          time: "8:00",
          temperature: "22°",
          weather: "阴",
          wind: "东2级",
          air: "优",
        },
        {
          id: "8",
          time: "8:00",
          temperature: "22°",
          weather: "阴",
          wind: "东2级",
          air: "优",
        },
        { id: "9", time: "8:00", temperature: "22°", weather: "阴", wind: "东2级", air: "优" },
        { id: "10", time: "8:00", temperature: "22°", weather: "阴", wind: "东2级", air: "优" },
        { id: "11", time: "8:00", temperature: "22°", weather: "阴", wind: "东2级", air: "优" },
        { id: "12", time: "8:00", temperature: "22°", weather: "阴", wind: "东2级", air: "优" },
        { id: "13", time: "8:00", temperature: "22°", weather: "阴", wind: "东2级", air: "优" },
      ],
      nearDays: [],
    };
  },
  async mounted() {
    this.dayDetail = await manager.getTodayDetail();
    const fifteenData = await manager.getFifteenWeather();
    this.nearDays = this.getNearData(fifteenData.slice(0, 3));
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
    getNearData(array) {
      const dayDescribe = ["今天", "明天", "后天"];
      return array.map((item, index) => {
        item.week = dayDescribe[index];
        return item;
      });
    },
  },
});
</script>
<style lang="scss" scoped>
.live-weather-content {
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
.sun-intro {
  padding: 5px 0;
}
.sun-item {
  display: inline-block;
  width: 120px;
  height: 24px;
  font-size: 16px;
}
.weather-basic {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 10px 0;
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
  padding: 8px 24px;
  font-size: 16px;
  // text-align: left;
}
.near-week {
  text-align: left;
}
.near-weather {
  text-align: right;
}
.look-15-weather {
  position: absolute;
  bottom: 5px;
  left: 0;
  width: calc(100% - 48px);
  height: 32px;
  margin: 0 12px;
  padding: 8px 12px;
  border-radius: 12px;
  line-height: 32px;
  font-size: 18px;
  background: gray;
  text-align: center;
}
</style>
  