<template>
  <div>
    <div class="route-input">
      <SearchInput v-model="startPointStr" @choosed="getAddress($event, 1)" label="起点" route> </SearchInput>
      <SearchInput v-model="PassingPointStr" v-if="passingPointSearchBool" @choosed="getAddress($event, 3)" @clickRightIcon="displayPassingPointSearch(false)" label="途径" route rightIcon="close"> </SearchInput>
      <SearchInput v-model="endPointStr" @choosed="getAddress($event, 2)" @clickRightIcon="searchLujing" label="终点" route rightIcon="share-o"> </SearchInput>
      <van-tabs v-model="transportation" @click="changeTransportation">
        <!-- driving -->
        <van-tab title="驾车" name="driving"> </van-tab>
        <van-tab title="自行车" name="bike"> </van-tab>
        <van-tab title="步行" name="foot"> </van-tab>
      </van-tabs>
    </div>
    <div class="route-extra">
      <van-popover v-model="moreState" placement="right" lazy-render>
        <van-grid square clickable :border="false" column-num="2" style="width: 135px">
          <van-grid-item v-for="item in moreItems" :key="item.id" :text="item.name" class="grid-margin" @click="handleClick(item['id'])">
            <template v-slot:icon>
              <MIcon :icon="item.icon" size="24px" length="32px" :circle="true"> </MIcon>
            </template>
          </van-grid-item>
        </van-grid>
        <template #reference>
          <MIcon icon="icon-gengduo" size="24px" length="32px" :circle="true" @click="displayMore"> </MIcon>
        </template>
      </van-popover>
    </div>
    <div class="route-path" v-if="plans.length > 0">
      <RoutePath :plans="plans" @choosePlan="choosePlan" @choosePath="1"></RoutePath>
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
import mapboxManager from "./store";
import RoutePath from "./RoutePath";
export default {
  name: "PathPlan",
  components: {
    SearchInput,
    RoutePath,
  },
  data() {
    return {
      startPointStr: "", //start input value
      startPoint: undefined, // start value
      endPointStr: "",
      endPoint: undefined,
      plans: [], //请求路线后,处理得到的路线数据
      choosedPlanIndex: 0, //选择的路线索引
      transportation: "driving", //交通方式
      geojsonRoutes: [], //路线转为geojson
      moreState: false, //导航选项状态
      PassingPointStr: "", // 途径点输入值
      passingPoints: [], //途径点集合
      passingPointSearchBool: false, // 途径点输入框显隐状态
      moreItems: [
        { id: "approachPoint", name: "途径点", icon: "icon-gengduo" },
        { id: "avoidArea", name: "规避区域", icon: "icon-gengduo" },
      ],
      lines: [], //路线id array
    };
  },
  mounted() {
    earthStore.state.mode = "map";
    earthStore.setMapFullScreen(true);
    earthStore.state.onlyMap = true;
  },
  beforeDestroy() {
    earthStore.setMapFullScreen(false);
    earthStore.state.onlyMap = false;
    earthStore.state.mode = "globe3";
    earthStore.earth.scene.mode = GeoVis.SceneMode.SCENE3D;
    this.clearAll();
  },
  computed: {},
  methods: {
    addPassingPoint() {},
    displayPassingPointSearch(bool) {
      this.passingPointSearchBool = bool;
      if (!bool) {
        this.passingPoints.map((point, index) => {
          mapboxManager.removeImageMarker("passing" + index + 1);
        });
        this.searchLujing();
      }
    },
    handleClick(id) {
      switch (id) {
        case "approachPoint":
          this.displayPassingPointSearch(true);
          break;
        case "avoidArea":
          break;
        default:
          break;
      }
      this.moreState = false;
    },
    displayMore() {
      this.moreState = !this.moreState;
    },
    changeTransportation() {
      this.searchLujing();
    },
    getAddress(address, type) {
      switch (type) {
        case 1:
          this.startPoint = address;
          mapboxManager.addImageMarker("start", "./static/images/start.png", address.location);
          break;
        case 2:
          this.endPoint = address;
          mapboxManager.addImageMarker("end", "./static/images/end.png", address.location);
          break;
        case 3:
          this.passingPoints.push(address);
          mapboxManager.addImageMarker("passing" + this.passingPoints.length, "./static/images/passing.png", address.location);
          break;
      }
    },
    async searchLujing() {
      this.clearAll();
      if (!this.startPoint || !this.endPoint) {
        return;
      }
      if (this.startPoint && this.endPoint) {
        let start = this.startPoint.location[0] + "," + this.startPoint.location[1];
        let end = this.endPoint.location[0] + "," + this.endPoint.location[1];
        console.log(this.transportation);
        const passingPointsCoords = this.passingPoints.map((point) => {
          return ";" + point.location[0] + "," + point.location[1];
        });
        console.log(passingPointsCoords);
        const url = "http://router.project-osrm.org" + "/route/v1/" + this.transportation + "/" + start + passingPointsCoords + ";" + end + "?steps=true&geometries=geojson"; //Config.LJIP
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
        let color;
        /* 绘制路线 --每条路线不同颜色，激活路线颜色深点 */
        for (let i = 0; i < this.plans.length; i++) {
          color = this.choosedPlanIndex === i ? "blue" : "#888";
          this.addGeoJsonRoute(i, color);
        }
        this.setCenter(0);
      }
    },
    addGeoJsonRoute(index, color) {
      const id = "route" + index;
      const source = this.geojsonRoutes[index];
      this.lines.push(mapboxManager.addGeojsonLine(source, id, color));
    },
    analysisJson(json) {
      let routes = [];
      if (json.code === "Ok") {
        for (let i = 0; i < json.routes.length; i++) {
          routes[i] = convertRoute(json.routes[i]);
        }
      } else {
        return "error";
      }
      return routes;
    },
    /**
     * index 表示路线索引
     */
    setCenter(index) {
      const center = turf.center(this.geojsonRoutes[index].data);
      const coor = turf.getCoord(center);
      mapboxManager.flyTo(coor);
    },
    /*路线的选择有两种方式，一种图上点击，一种文字点击，二者互相联系 */
    choosePlan(index) {
      this.choosedPlanIndex = index;
      this.setCenter(index);
      let color;
      const paths = this.plans;
      /* 绘制路线 --每条路线不同颜色，激活路线颜色深点 */
      for (let i = 0; i < paths.length; i++) {
        color = this.choosedPlanIndex === i ? "blue" : "#888";
        const id = this.lines[i];
        mapboxManager.setGeojsonLineColor(id, color);
      }
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
    clearAll() {
      // this.startPoint = undefined;
      // this.endPoint = undefined;
      // mapboxManager.clearAll();
      //fly to home
      // removeSource
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
.route-path {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 5;
  width: 100%;
}
.route-extra {
  position: absolute;
  top: 50%;
  left: 0;
}
</style>

<!-- CzSun拒绝维护使用2空格缩进的代码 -->
