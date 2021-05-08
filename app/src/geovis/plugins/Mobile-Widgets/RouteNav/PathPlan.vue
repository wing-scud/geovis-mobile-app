<template>
  <div>
    <div class="route-top">
      <van-nav-bar title="导航" left-text="返回" left-arrow @click-left="goBack" />
      <div class="route-input">
        <SearchInput v-model="start.input" @choosed="getAddress($event, 1)" label="起" route> </SearchInput
        ><template v-for="(point, index) in passingPoints">
          <SearchInput v-model="point.input" @choosed="getAddress($event, 3, index)" @clickRightIcon="displayPassingPointSearch(false, index)" label="经" route rightIcon="close" :key="index"> </SearchInput>
        </template>
        <SearchInput v-model="end.input" @choosed="getAddress($event, 2)" @clickRightIcon="searchLujing" label="终" route rightIcon="share-o"> </SearchInput>
        <!-- <SearchInput v-model="end.input" @choosed="getAddress($event, 2)" @clickRightIcon="searchLujing" label="终" route > </SearchInput> -->
        <div class="search-buttons">
            <button class="route-delete">清除路线</button>
            <img src="static/images/箭头.png" />
            <!-- <MIcon :icon="plugin.icon" size="24px" length="30px"></MIcon> -->
        </div>
      </div>
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
    <div class="route-path">
      <van-tabs v-model="transportation" @click="changeTransportation">
        <!-- driving -->
        <van-tab title="驾车" name="driving"> </van-tab>
        <van-tab title="自行车" name="bike"> </van-tab>
        <van-tab title="步行" name="foot"> </van-tab>
      </van-tabs>
      <template v-if="size > 0">
        <RouteDetail></RouteDetail>
      </template>
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
import mapboxManager from "./mapbox";
import RouteDetail from "./RouteDetail";
import state from "./store.ts";
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
      start: state.point.start,
      end: state.point.end,
      choosedId: state.choosedId, //选择的路线索引
      transportation: state.transportation, //交通方式
      routes: state.routes,
      passingPoints: state.point.passings, //途径点集合
      events: mapboxManager.events,
      moreState: false, //导航选项状态
      moreItems: [
        { id: "approachPoint", name: "途径点", icon: "icon-gengduo" },
        { id: "avoidArea", name: "规避区域", icon: "icon-gengduo" },
      ],
      debounceChoosePlan: undefined,
      routesChange: state.routesChange,
      size: 0,
    };
  },
  mounted() {
    // 针对覆盖图层点击，会连续调用watch
    // earthStore.state.mode = "map";
    // earthStore.setMapFullScreen(true);
    // earthStore.state.onlyMap = true;
    this.debounceChoosePlan = _.debounce(this.choosePlan, 500);
    this.searchLujing.call(this);
  },
  beforeDestroy() {
    // earthStore.setMapFullScreen(false);
    // earthStore.state.onlyMap = false;
    // earthStore.state.mode = "globe3";
    // earthStore.earth.scene.mode = GeoVis.SceneMode.SCENE3D;
    // this.clearMapboxObjects();
  },
  /**
   * 在变更 (不是替换) 对象或数组时，旧值将与新值相同
   * 因为它们的引用指向同一个对象/数组。
   * Vue 不会保留变更之前值的副本。
   * 下面假设监听event，即出现状况
   */
  watch: {
    "routesChange.state"() {
      this.size = this.routes.size;
    },
    choosedId: {
      deep: true,
      handler(val) {
        this.debounceChoosePlan(val.id);
      },
    },
    /**
     * searchInput 要不要添加二维的marker
     * 添加，封装一个mapbox的全局控制，
     * 不添加，只在pathPlan添加mapbox做处理
     */
  },
  methods: {
    goBack() {
      //@ts-ignore
      this.$router.backward(-1);
    },
    addPassingPoint() {},
    displayPassingPointSearch(bool, index) {
      if (bool) {
        this.passingPoints.push({
          input: "",
          point: undefined,
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
          this.start.point = address;
          mapboxManager.addImageMarker("start", "./static/images/qidian.png", address.location);
          break;
        case 2:
          mapboxManager.removeImageMarker("end");
          this.end.point = address;
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
      this.choosedId.id = "路线1";
      this.clearMapboxLines();
      this.routes.clear();
      if (!this.start.point || !this.end.point) {
        return;
      }
      let start = this.start.point.location[0] + "," + this.start.point.location[1];
      let end = this.end.point.location[0] + "," + this.end.point.location[1];
      let passingPointsCoords = "";
      this.passingPoints.map((obj) => {
        if (obj.point) {
          passingPointsCoords += ";" + obj.point.location[0] + "," + obj.point.location[1];
        }
      });
      console.log(passingPointsCoords);
      const url = "http://router.project-osrm.org" + "/route/v1/" + this.transportation + "/" + start + passingPointsCoords + ";" + end + "?alternatives=3&steps=true&geometries=geojson"; //Config.LJIP
      let geojsonRoutes;
      const plans = await fetch(url)
        .then((res) => res.json())
        .then((data) => {
          geojsonRoutes = data.routes.map((route) => {
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
      const ids = plans.map((plan, index) => {
        const id = "路线" + (index + 1);
        this.routes.set(id, {
          geojson: geojsonRoutes[index],
          plan: plan,
          text: [],
        });
        return id;
      });
      const orders = this.orderArray(ids, this.choosedId.id);
      /* 绘制路线 --每条路线不同颜色，激活路线颜色深点 */
      for (let i = 0; i < orders.length; i++) {
        const id = orders[i];
        const choosed = this.choosedId.id === id;
        const source = this.routes.get(id).geojson;
        color = choosed ? activedLineColor : unActivedLineColor;
        mapboxManager.addGeojsonLine(source, id, color, orders[i - 1]);
      }
      this.setCenter(this.choosedId.id);
      this.routesChange.state = !this.routesChange.state;
      this.$forceUpdate();
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
    setCenter(id) {
      const geojson = this.routes.get(id).geojson.data;
      const center = turf.center(geojson);
      const coor = turf.getCoord(center);
      mapboxManager.flyTo(coor);
    },
    /* 绘制路线 --每条路线不同颜色，激活路线颜色深点,并保证激活路线图层位于最上面 */
    choosePlan(id) {
      this.setCenter(id);
      let color;
      const orders = this.orderArray(Array.from(this.routes.keys()), id);
      for (let i = 0; i < orders.length; i++) {
        const choosed = this.choosedId.id === orders[i];
        color = choosed ? activedLineColor : unActivedLineColor;
        mapboxManager.setGeojsonLineColor(orders[i], color, orders[i - 1]);
      }
    },
    /**
     * 保证当前激活方案在最顶层，不被其他图层遮挡
     */
    orderArray(array, id) {
      const index = array.indexOf(id);
      const newArray = array.slice(0, index).concat(array.slice(index + 1, array.length));
      newArray.push(array[index]);
      return newArray;
    },
    clearMapboxLines() {
      this.routes.forEach((route, id) => {
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
  
  <style lang="scss" scoped>
.route-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
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

.route-input {
  // padding: 10px;
  background: #0a1024;
  border-radius: 5px;
  margin: 5px;
}
.search-buttons{
  width:100%;
  height:20px;
  display: flex;
  justify-content:space-between;
  margin:5px 0 10px 0;
  img{
    width:32px;
    height:32px;
  }
}
.route-delete{
  width:70px;
  height:28px;
  background:$highlight;
  border:0;
  font-size:14px;
  color:white;
  border-radius:5px;
}
// .search-component{
//   padding: 5px 0!important;
// }
</style>
<style lang="scss" >
.route-input .van-field__label {
  width: 30px;
  margin-right: 0;
  color: #646566;
  text-align: center;
  word-wrap: break-word;
}
.route-top{
  .van-nav-bar {
  background: $navbar-background !important;
}
.van-nav-bar__title {
  color: white;
}
.van-nav-bar__text {
  color: #01d7d1;
}
.van-icon-arrow-left:before {
  color: #01d7d1;
}
.van-cell{
  background:$light-blue;
  line-height:30px;
  padding:10px 10px 10px 0;
}
.van-field__control{
  background:$lighter-blue;
  border-radius:5px;
  color:$lightgray-word;
}
.van-cell__value--alone{
  color:$lightgray-word;
}
[class*=van-hairline]:after{
  border:$split-line
}
.route-input .van-field__label{
  color:$lightgray-word;
}
.van-field__control{
  padding-left:10px;
}
.route-input .van-field__label{
  width:27px;
}
}
.search-component{
   .van-cell {
    margin: 0 auto;
}
}



</style>
      
  <!-- CzSun拒绝维护使用2空格缩进的代码 -->
  