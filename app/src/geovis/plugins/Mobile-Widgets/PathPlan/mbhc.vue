<template>
  <div>
    <div class="route-input">
      <SearchInput v-model="startPointStr" @choosed="getAddress($event, 1)" label="起点" route> </SearchInput>
      <SearchInput v-model="endPointStr" @choosed="getAddress($event, 2)" @clickRightIcon="searchLujing" label="终点" route rightIcon="share-o"> </SearchInput>
      <van-tabs v-model="transportation" @click="changeTransportation">
        <!-- driving -->
        <van-tab title="驾车" name="car"> </van-tab>
        <van-tab title="自行车" name="bike"> </van-tab>
        <van-tab title="步行" name="foot"> </van-tab>
      </van-tabs>
    </div>
    <div class="route-overview" v-if="plans.length>0">
      <div class="flex-box">
        <div class="overview-program" v-for="(i, index) in overviewPlans" :key="index">
          <span class="little-name">方案{{ index + 1 }} <br /></span>
          {{ i.time }}分钟 <br />
          {{ i.distance }}千米
        </div>
      </div>
      <van-row class="route-to" type="flex" align="center" justify="space-between">
        <van-col span="6"><van-icon name="description"></van-icon>路线详情</van-col>
        <van-col span="8" offset="2"> <van-button class="custom-route-button" type="info">模拟导航</van-button></van-col>
        <van-col span="8"> <van-button class="custom-route-button" type="info">真实导航</van-button></van-col>
      </van-row>
    </div>
  </div>
</template>
 
<script>
// @ts-nocheck
/* eslint-disable */
import SearchInput from "../SearchArea/SearchInput.vue";
import { mapGetters } from "vuex";
import convertRoute from "./util";
import { mode, textFormat, parseMetersToKm, parseSecondsToMinutes } from "./util";
import { earthStore } from "@/geovis/store";

export default {
  name: "PathPlan",
  components: {
    SearchInput,
  },
  data() {
    return {
      startPointStr: "",
      startPoint:undefined,
      endPointStr: "",
      endPoint: undefined,
      plans: [],
      choosePlanIndex: 0,
      transportation: "car",
      geojsonRoutes: [],
    };
  },
  mounted() {
    earthStore.state.mode = "map";
    earthStore.setMapFullScreen(true);
    earthStore.state.onlyMap = true;
  },
  beforeDestroy() {
    this.clearAll();
  },
  computed: {
    overviewPlans() {
      return this.plans.map((plan) => {
        const summary = plan.summary;
        const distance = parseMetersToKm(summary.totalDistance);
        const time = parseSecondsToMinutes(summary.totalTime);
        return {
          distance,
          time,
        };
      });
    },
  },
  methods: {
    changeTransportation() {
      this.searchLujing();
    },
    getAddress(address, type) {
      console.log(address);
      type === 1 ? (this.startPoint = address) : (this.endPoint = address);
    },
    async searchLujing() {
      if(!this.startPoint || !this.endPoint){
        return ;
      }
      this.clearAll();
      if (this.startPoint && this.endPoint) {
        let start = this.startPoint.location[0] + "," + this.startPoint.location[1];
        let end = this.endPoint.location[0] + "," + this.endPoint.location[1];
        const url = "http://router.project-osrm.org/" + "/route/v1/" + this.transportation + "/" + start + ";" + end + "?steps=true&geometries=geojson"; //Config.LJIP
        this.plans = await fetch(url)
          .then((res) => res.json())
          .then((data) => {
            this.geojsonRoutes = data.routes.map((route) => {
              return {
                type: "geojson",
                data: {
                  type: "Feature",
                  properties: {},
                  geometry: route.geometry,
                },
              };
            });
            return this.analysisJson(data);
          });
        const paths = this.plans;
        this.over = false;
        console.log("paths", paths);
        let color;
        /* 绘制路线 --每条路线不同颜色，激活路线颜色深点 */
        for (let i = 0; i < paths.length; i++) {
          color = this.choosePlanIndex === i ? "blue" : "#888";
          this.addGeoJsonRoute(i, color);
        }
      }
      this.choosePlan(0);
    },
    addGeoJsonRoute(index, color) {
      const map = earthStore.map;
      const id = "route" + index;
      const route = map.addSource(id, this.geojsonRoutes[index]);
      map.addLayer({
        id: id,
        type: "line",
        source: id,
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": color,
          "line-width": 8,
        },
      });
    },
    analysisJson(json) {
      var routes = [];
      if (json.code === "Ok") {
        for (var i = 0; i < json.routes.length; i++) {
          routes[i] = convertRoute(json.routes[i]);
        }
      } else {
        return "error";
      }
      return routes;
    },
    setCenter(index) {
      const map = earthStore.map;
      var center = turf.center(this.geojsonRoutes[index].data);
      const coor = turf.getCoord(center);
      console.log(coor);
      map.flyTo({
        center: coor,
        zoom: 9,
        speed: 1.2,
        curve: 1,
      });
    },
    /*路线的选择有两种方式，一种图上点击，一种文字点击，二者互相联系 */
    choosePlan(index) {
      this.choosePlanIndex = index;
      this.setCenter(index);
      /*选中路线颜色加深 */
    },
    clearAll() {
      this.startPoint=undefined;
      this.endPoint=undefined;
      //fly to home 
      // removeSource 
    },
    pickPoint(n) {},
    getPoint(e) {
      fetch("https://nominatim.openstreetmap.org" + `/reverse.php?format=json&lat=${e.lonlat[1]}&lon=${e.lonlat[0]}&zoom=8`) //Config.DMIP
        .then((res) => res.json())
        .then((json) => {
          if (json.error) {
            console.error(json.error);
            this.$error(json.error);
          } else {
            if (!this.lujingLocation) {
              this.startPoint = e.lonlat.slice();
              this.startPointStr = json.display_name;
              this.addStartPoint();
            } else {
              this.endPoint = e.lonlat.slice();
              this.endPointStr = json.display_name;
              this.addEndPoint();
            }
            this.pickPoint(-1);
          }
        });
    },
    addStartPoint() {
      this.billboards = this.billboards || [];
      this.billboards.push(this.addBillboard([Number(this.startPoint[0]), Number(this.startPoint[1]), 0], require("./start.png"), "start"));
      this.startBillboard = 1;
    },
    addEndPoint() {
      this.billboards = this.billboards || [];
      this.billboards.push(this.addBillboard([Number(this.endPoint[0]), Number(this.endPoint[1]), 0], require("./end.png"), "end"));
    },
    JsonOutLj() {
      let text = JSON.stringify(this.plans);
      if ("download" in document.createElement("a")) {
        this.webDownLoad(text, "路经导出.json");
      }
    },
    webDownLoad: function (content, filename) {
      let link = document.createElement("a");
      link.download = filename;
      link.style.display = "none";
      let blob = new Blob([content]);
      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>

<style>
.route-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.route-input .van-field__label {
  width: 30px;
  margin-right: 0;
  color: #646566;
  text-align: center;
  word-wrap: break-word;
}
.route-overview {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 4;
  width: 100%;
  background-color: white;
}
.overview-program {
  flex: 1;
  max-width: 100px;
  padding: 3px 5px;
  text-align: center;
}
.flex-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
}
.route-extra{
  position :absolute;
  top:50%;
  left:0;
}
.route-to{
  font-size: 14px;
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
</style>

<!-- CzSun拒绝维护使用2空格缩进的代码 -->
