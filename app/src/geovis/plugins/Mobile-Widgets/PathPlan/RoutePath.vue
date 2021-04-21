<template>
  <div class="pathes">
    <div class="route-overview flex-box">
      <div class="overview-program" v-for="(i, index) in overviewPlans" :key="index" @click="choosePlan(index)">
        <span class="little-name">方案{{ index + 1 }} <br /></span>
        {{ i.time }}分钟 <br />
        {{ i.distance }}千米
      </div>
    </div>
    <div class="route-detail" v-if="mode === 'detail'" :style="{ height: computedHeight }">
      <div class="path" v-for="(item, index) of detailRouteText" :key="index">
        <span :class="item.icon" class="leaflet-routing-icon"> </span>
        <div class="text">{{ item.text }}</div>
        <div class="distance">
          {{ formatDistance(plans[choosedIndex].instructions[index].distance) }}
        </div>
      </div>
    </div>
    <van-row class="route-to" type="flex" align="center" justify="space-between">
      <van-col span="6" @click="displayRouteDetails"><van-icon name="description"></van-icon>{{ mode === "overview" ? "路线详情" : "显示地图" }}</van-col>
      <van-col span="8" offset="2"> <van-button class="custom-route-button" type="info">模拟导航</van-button></van-col>
      <van-col span="8"> <van-button class="custom-route-button" type="info">真实导航</van-button></van-col>
    </van-row>
  </div>
</template>
  <script lang="ts">
import Vue from "vue";
import { textFormat, parseMetersToKm, parseSecondsToMinutes } from "./util";
export default Vue.extend({
  name: "RouteDetail",
  props: {
    plans: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      choosedIndex: 0,
      routeDetailsState: false, //路线详情面板状态
      routeDetail: [],
      detailRouteText: [],
      mode: "overview",
    };
  },
  mounted() {
    this.getText();
  },
  computed: {
    overviewPlans() {
      return this.plans.map((plan) => {
        //@ts-ignore
        const summary = plan.summary;
        const distance = parseMetersToKm(summary.totalDistance);
        const time = parseSecondsToMinutes(summary.totalTime);
        return {
          distance,
          time,
        };
      });
    },
    computedHeight() {
      return window.innerHeight - 92 + "px";
    },
  },
  methods: {
    goBack() {
      //@ts-ignore
      this.$router.backward(-1);
    },
    formatDistance(value) {
      let distance = "";
      if (value / 1000 <= 0) {
        distance = parseInt(value) + "米";
      } else {
        distance = Math.ceil(value / 1000) + "千米";
      }
      return distance;
    },
    formatText(instruction) {
      let item = {
        text: "",
        icon: "",
      };
      item = textFormat(instruction);
      console.log("原生item", item);
      return item;
    },
    choosePlan(index) {
      this.choosedIndex = index;
      this.$emit("choosePlan", index);
      this.getText();
    },
    getText() {
      const index = this.choosedIndex;
      const plan = this.plans[index];
      for (let j = 0; j < plan.instructions.length; j++) {
        this.detailRouteText.push(this.formatText(plan.instructions[j]));
      }
    },
    displayRouteDetails() {
      this.mode = this.mode === "overview" ? "detail" : "overview";
    },
  },
});
</script>
  <style scoped>
.pathes {
  width: 100%;
  background-color: white;
}
.route-detail {
  width: 100%;
  overflow-y: auto;
  overflow-x: none;
}
.route-overview {
  /* position: absolute; */
  /* bottom: 0; */
  /* left: 0; */
  /* z-index: 4; */
  width: 100%;
  border-bottom: gray 1px solid;
  /* background-color: white; */
}
.flex-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
}
.overview-program {
  flex: 1;
  max-width: 100px;
  padding: 3px 5px;
  text-align: center;
}
.route-to {
  font-size: 14px;
  border-top: gray 1px solid;
}
.little-name {
  font-size: 12px;
}
.route-overview .van-cell__value {
  flex: 3;
}
.custom-route-button {
  height: 32px;
}
.route-input .van-tabs--line .van-tabs__wrap {
  height: 32px;
}
.suf {
  width: 40px;
  height: 40px;
  line-height: 40px;
  float: left;
  color: #fff;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
}

.suf {
  float: right;
}

.ljDc {
  cursor: pointer;
  font-size: 35px;
  margin-left: 10px;
}

.red {
  background-color: rgb(255, 0, 0);
}
.orange {
  background-color: rgb(255, 166, 0);
}
.yellow {
  background-color: rgb(255, 255, 0);
}
.green {
  background-color: rgb(0, 255, 42);
}
.blue {
  background-color: rgb(0, 153, 255);
}
.purple {
  background-color: rgb(183, 0, 255);
}
.grey {
  background-color: rgb(173, 173, 173);
}

/* .checked {
	border-color: #05eaff;
	color: #05eaff;
  } */

.tabs {
  width: 100%;
  height: 45px;
  padding: 0 0px;
  background-color: #273b46;
  border-bottom: 1px solid #3b5361;
  color: #5a6772;
  text-align: left;
  line-height: 45px;
  font-size: 16px;
  font-weight: 550;
}
.tab {
  display: inline-block;
  padding: 0 20px;
  cursor: pointer;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  color: #d6d6d6;
  border-bottom: 4px solid transparent;
  height: 45px;
}
.tab.currentTab,
.tab:hover {
  color: #fff;
  border-bottom: 3px solid #eee;
}
.contents {
  width: 100%;
  overflow: auto;
  padding: 5px 0;
  margin-bottom: 10px;
}
.items {
  cursor: pointer;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 0 30px;
  font-size: 16px;
  color: #fff;
  text-align: left;
  border-bottom: 1px solid #12252f;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.list {
  text-align: left;
  padding: 5px 10px;
}
.item {
  width: 60px;
  height: 40px;
  background-color: rgb(90, 103, 114);
  line-height: 40px;
  border: 1px solid #9ca8b5;
  color: white;
}
.item:hover {
  background-color: #5a6772;
}
.item.checked {
  background-color: #5a6772;
}

.leftVer {
  width: 440px !important;
  right: 0 !important;
  top: 124px !important;
}
#plugin_result {
  width: 100%;
  height: calc(100% - 50px);
  font-size: 2em;
  overflow-y: auto;
}

.title {
  height: 50px;
  line-height: 30px;
  font-size: 20px;
  margin: 5px 0;
  padding: 5px 10px;
  border-bottom: 1px solid white;
  font-weight: bold;
}

.text {
  margin-left: 15px;
  white-space: normal;
  word-wrap: break-word;
  float: left;
  word-break: break-all;
  width: 220px;
  min-height: 30px;
  line-height: 30px;
}
.distance {
  width: 80px;
  float: right;
}
i,
button span {
  pointer-events: none;
}
.leaflet-routing-icon {
  background-image: url(/static/images/osrm.directions.icons.color.svg);
  -webkit-background-size: 455px 20px;
  background-size: 455px 20px;
  background-repeat: no-repeat;
  margin: 0;
  content: "";
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}
.leaflet-routing-icon-continue {
  background-position: 2px 0px;
}
.leaflet-routing-icon-sharp-right {
  background-position: -24px 0px;
}
.leaflet-routing-icon-turn-right {
  background-position: -50px 0px;
}
.leaflet-routing-icon-bear-right {
  background-position: -74px 0px;
}
.leaflet-routing-icon-u-turn {
  background-position: -101px 0px;
}
.leaflet-routing-icon-sharp-left {
  background-position: -127px 0px;
}
.leaflet-routing-icon-turn-left {
  background-position: -150px 0px;
}
.leaflet-routing-icon-bear-left {
  background-position: -175px 0px;
}
.leaflet-routing-icon-depart {
  background-position: -202px 0px;
}
.leaflet-routing-icon-enter-roundabout {
  background-position: -227px 0px;
}
.leaflet-routing-icon-arrive {
  background-position: -253px 0px;
}
.leaflet-routing-icon-via {
  background-position: -278px 0px;
}
.leaflet-routing-icon-fork {
  background-position: -305px 0px;
}
.leaflet-routing-icon-ramp-right {
  background-position: -331px 0px;
}
.leaflet-routing-icon-ramp-left {
  background-position: -352px 0px;
}
.leaflet-routing-icon-merge-left {
  background-position: -376px 0px;
}
.leaflet-routing-icon-merge-right {
  background-position: -403px 0px;
}
.leaflet-routing-icon-end {
  background-position: -429px 0px;
}
.path {
  min-height: 30px;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: initial;
  background-color: unset;
  margin-bottom: 10px;
  padding-left: 20px;
  line-height: 30px;
}
.drawer {
  width: 430px;
  z-index: 1111;
  background: #1c2c35;
  transition: right 0.5s;
  height: calc(100% - 601px);
  overflow: auto;
}
.drawer.open {
  right: 0;
}
.drawer * {
  text-align: left;
  color: #fff;
}
.drawer[data-v-9a072664] {
  margin-top: 10px;
}
#plugin_result {
  overflow-y: auto;
  min-height: 200px;
  max-height: 300px;
}
</style>
  