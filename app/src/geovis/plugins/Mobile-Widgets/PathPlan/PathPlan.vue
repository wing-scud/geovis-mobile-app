<template>
  <div>
    <div class="route-input">
      <SearchInput v-model="startPointStr" @choosed="getAddress($event, 1)" label="起点" route> </SearchInput
      ><template v-for="(obj, index) in passingPoints">
        <SearchInput v-model="obj.name" @choosed="getAddress($event, 3, index)" @clickRightIcon="displayPassingPointSearch(false, index)" label="途径" route rightIcon="close" :key="index"> </SearchInput>
      </template>
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
      <RouteDetail :plans="plans" :index="choosedPlanIndex" @choosePlan="choosePlan" @choosePath="1"></RouteDetail>
    </div>
  </div>
</template>
 
<script>
// @ts-nocheck
/* eslint-disable */
import _ from "lodash";
import SearchInput from "../SearchArea/SearchInput.vue";
import convertRoute from "./util";
import { earthStore } from "@/geovis/store";
import mapboxManager from "./store";
import RouteDetail from "./RouteDetail";
const activedLineColor = "rgba(60,60,230,0.87)";
const unActivedLineColor = "rgba(86,86,86,1)";
export default {
  name: "PathPlan",
  components: {
    SearchInput,
    RouteDetail,
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
      passingPoints: [], //途径点集合
      moreItems: [
        { id: "approachPoint", name: "途径点", icon: "icon-gengduo" },
        { id: "avoidArea", name: "规避区域", icon: "icon-gengduo" },
      ],
      lines: [], //路线id array
      events: mapboxManager.events,
      debounceChoosePlan: undefined,
    };
  },
  mounted() {
    earthStore.state.mode = "map";
    earthStore.setMapFullScreen(true);
    earthStore.state.onlyMap = true;
    // 针对覆盖图层点击，会连续调用watch
    this.debounceChoosePlan = _.debounce(this.choosePlan, 500);
  },
  beforeDestroy() {
    earthStore.setMapFullScreen(false);
    earthStore.state.onlyMap = false;
    earthStore.state.mode = "globe3";
    earthStore.earth.scene.mode = GeoVis.SceneMode.SCENE3D;
    this.clearMapboxObjects();
  },
  watch: {
    "events.line": {
      deep: true,
      handler(val) {
        //change route
        const index = this.lines.indexOf(val);
        console.log("click", index);
        if (index !== this.choosedPlanIndex) {
          this.choosedPlanIndex = index;
          this.debounceChoosePlan(index);
        }
      },
    },
    /**
     * searchInput 要不要添加二维的marker
     * 添加，封装一个mapbox的全局控制，
     * 不添加，只在pathPlan添加mapbox做处理
     */
    "events.marker": {
      handler(val) {
        // id , lngLat
        //通过id去改变
        if (val.id === "start") {
        } else if (val.id === "end") {
        } else {
        }
      },
    },
  },
  computed: {},

  methods: {
    addPassingPoint() {},
    displayPassingPointSearch(bool, index) {
      if (bool) {
        this.passingPoints.push({
          name: "",
          point: {},
        });
      } else {
        mapboxManager.removeImageMarker("passing" + (index + 1));
        this.passingPoints.splice(index, 1);
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
    getAddress(address, type, index) {
      switch (type) {
        case 1:
          mapboxManager.removeImageMarker("start");
          this.startPoint = address;
          mapboxManager.addImageMarker("start", "./static/images/qidian.png", address.location);
          break;
        case 2:
          mapboxManager.removeImageMarker("end");
          this.endPoint = address;
          mapboxManager.addImageMarker("end", "./static/images/zhongdian.png", address.location);
          break;
        case 3:
          mapboxManager.removeImageMarker("passing" + index);
          this.passingPoints[index].point = address;
          mapboxManager.addImageMarker("passing" + index, "./static/images/jingguo.png", address.location);
          break;
      }
    },
    async searchLujing() {
      this.choosedPlanIndex = 0;
      this.clearMapboxLines();
      if (!this.startPoint || !this.endPoint) {
        return;
      }
      if (this.startPoint && this.endPoint) {
        let start = this.startPoint.location[0] + "," + this.startPoint.location[1];
        let end = this.endPoint.location[0] + "," + this.endPoint.location[1];
        console.log(this.transportation);
        let passingPointsCoords = "";
        this.passingPoints.map((obj) => {
          passingPointsCoords += ";" + obj.point.location[0] + "," + obj.point.location[1];
        });
        console.log(passingPointsCoords);
        const url = "http://router.project-osrm.org" + "/route/v1/" + this.transportation + "/" + start + passingPointsCoords + ";" + end + "?alternatives=3&steps=true&geometries=geojson"; //Config.LJIP
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
        const ids = this.plans.map((plan, index) => {
          return "route" + (index + 1);
        });
        this.lines = ids;
        const orders = this.orderArray(ids, this.choosedPlanIndex);
        /* 绘制路线 --每条路线不同颜色，激活路线颜色深点 */
        for (let i = 0; i < orders.length; i++) {
          const id = orders[i];
          const choosed = this.choosedPlanIndex === ids.indexOf(id);
          const source = this.geojsonRoutes[ids.indexOf(id)];
          color = choosed ? activedLineColor : unActivedLineColor;
          console.log(id, this.lines[i - 1]);
          mapboxManager.addGeojsonLine(source, id, color, this.lines[i - 1]);
        }
        this.setCenter(0);
      }
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
    /* 绘制路线 --每条路线不同颜色，激活路线颜色深点,并保证激活路线图层位于最上面 */
    choosePlan(index) {
      this.choosedPlanIndex = index;
      this.setCenter(index);
      let color;
      const orders = this.orderArray(this.lines, this.choosedPlanIndex);
      for (let i = 0; i < orders.length; i++) {
        const choosed = this.choosedPlanIndex === this.lines.indexOf(orders[i]);
        color = choosed ? activedLineColor : unActivedLineColor;
        const id = orders[i];
        mapboxManager.setGeojsonLineColor(id, color, orders[i - 1]);
      }
    },
    /**
     * 保证当前激活方案在最顶层，不被其他图层遮挡
     */
    orderArray(array, index) {
      const newArray = array.slice(0, index).concat(array.slice(index + 1, array.length));
      newArray.push(array[index]);
      return newArray;
    },
    clearMapboxLines() {
      this.lines.map((id) => {
        mapboxManager.removeLine(id);
      });
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
