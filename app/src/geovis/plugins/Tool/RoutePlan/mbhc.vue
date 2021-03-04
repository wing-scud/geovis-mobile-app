<template>
  <div>
    <div class="searchContainer black-box">  
      <div class="search short" >
        <div class="pre">
          起
        </div>
        <input
          class="cz-input"
          v-model="startPointStr"
          @keydown.enter="searchLujing(true)"
          @keydown.up="prevDmResult"
          @keydown.down="nextDmResult"
          @input="getDM(1)"
          @blur="setDefaultStartPoint"
        />
        <div class="suf" @click="pickPoint(0)">
          <i class="el-icon-location-outline" v-show="lujingLocation != 0" />
          <i class="el-icon-location" v-show="lujingLocation == 0" />
        </div>
      </div>
      <div class="search short"  >
        <!-- use -->
        <div class="pre">
          终
        </div>
        <input
          class="cz-input"
          v-model="endPointStr"
          @keydown.enter="searchLujing(true)"
          @keydown.up="prevDmResult"
          @keydown.down="nextDmResult"
          @input="getDM(2)"
          @blur="setDefaultEndPoint"
        />

        <div class="suf" @click="pickPoint(1)">
          <i class="el-icon-location-outline" v-show="lujingLocation != 1" />
          <i class="el-icon-location" v-show="lujingLocation == 1" />
        </div>
      </div>
      <div class="navBtn"  >
      
        <img
          title="点击检索"
          src="/images/images/gf/daohang.png"
          alt=""
          @click="searchLujing(true)"
        />
        <span
          class="el-icon-download ljDc"
          @click="JsonOutLj"
          title="点击导出"
        />
      </div>
    </div>
    <div  v-show="searchBox">
    <div class="results" v-if="plans.length"  >
      <div class="contents">
        <div class="list">
          <button
            :class="{ item: true, checked: plan.name == item.name }"
            v-for="(item, index) in plans"
            :key="index"
            @click="choosePlan(index)"
          >
            {{ luxian(index) }}
          </button>
        </div>
      </div>
    </div>
    <div :class="{ drawer: true, open: resultPlan }">
      <div class="title">{{ plan.name }}</div>
      <div id="plugin_result">
        <div class="path" v-for="(item, index) of texts" :key="index">
          <span :class="item.icon" class="leaflet-routing-icon"> </span>
          <div class="text">{{ item.text }}</div>
          <div class="distance">
            {{ formatDistance(plan.instructions[index].distance) }}
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
 
<script>
// @ts-nocheck
/* eslint-disable */
import { mapGetters } from "vuex";
import convertRoute from "./util";
import { mode, textFormat } from "./util";

export default {
  data() {
    return {
      keyword: "",
      drawingMode: -1,
     
      tab: 0,
      lon: "",
      lat: "",
      inLocation: "",
      geoSearchResult: [],

      searchBody: {},

      checkedColor: "red",

      lonlats: [], // 当前绘制路线的坐标数组
      points: [], // 绘制的点的数组
      polylines: [], // 绘制的线的数组
      Xuxian:[],
      startPointStr: "",
      startPoint: [],
      endPointStr: "",
      endPoint: [],
      lujingLocation: -1,
      dmResults: [],
      dropdownType: 0,
      currentDmIndex: -1,
      plans: [],
      plan: {},
      resultPlan: false,
      texts: [],
      pageSize: 5, // TODO: 配置文件,
      startBillboard:0,
      endBillboard:0,
      searchBox:false
    };
  },
 
  beforeDestroy() {
    this.clearAll();
    // this.$store.commit("checkTarget", undefined);
    // this.$store.commit("setTempTarget", undefined);
    // setTimeout(() => {
    //   this.$store.commit("setTargets", []);
    // }, 100);
  },
  methods: {
    luxian(index) {
      return `路线${index + 1}`;
    },
    getDM(type) {
      if (this.abortController) {
        this.abortController.abort();
      }
      this.abortController = new AbortController();
      this.dropdownType = type;
      const keyword = type == 1 ? this.startPointStr : this.endPointStr;
      fetch(
        `http://192.168.20.249:8086/search?q=${
          // Config.dmip
          keyword
        }&format=json&polygon=1&addressdetails=1`,
        {
          signal: this.abortController.signal
        }
      )
        .then(res => res.json())
        .then(json => {
          this.abortController = undefined;
          if (this.dmResults.length) this.dmResults = [];
          for (const item of json) {
            this.dmResults.push({
              name: item.display_name,
              boundingBox: item.boundingbox,
              lonlat: [Number(item.lon), Number(item.lat)]
            });
          }
          if (!this.dmResults.length) return;
          if (this.dropdownType == 1) {
            this.startPoint = this.dmResults[0].lonlat.slice();
          } else {
            this.endPoint = this.dmResults[0].lonlat.slice();
          }
        });
    },
    setDefaultStartPoint() {
      if (this.dmResults.length) {
        this.startPoint = this.dmResults[this.currentDmIndex].lonlat;
        this.startPointStr = this.dmResults[this.currentDmIndex].name;
      } else {
        this.startPoint = [];
        this.startPointStr = "";
      }
      this.dmResults = [];
      this.currentDmIndex = -1;
    },
    setDefaultEndPoint() {
      if (this.dmResults.length) {
        this.endPoint = this.dmResults[this.currentDmIndex].lonlat;
        this.endPointStr = this.dmResults[this.currentDmIndex].name;
      } else {
        this.endPoint = [];
        this.endPointStr = "";
      }
      this.dmResults = [];
      this.currentDmIndex = -1;
    },
    nextDmResult() {
      this.currentDmIndex++;
      if (this.currentDmIndex == this.dmResults.length) {
        this.currentDmIndex = 0;
      }
    },
    prevDmResult() {
      this.currentDmIndex--;
      if (this.currentDmIndex < 0) {
        this.currentDmIndex = this.dmResults.length - 1;
      }
    },
    async searchLujing(flag) {
      if (this.dmResults.length && flag) {
        if (this.dropdownType == 1) {
          this.setDefaultStartPoint();
        } else {
          this.setDefaultEndPoint();
        }
      }
      this.clearAll();
      if (this.startPoint.length && this.endPoint.length) {
        let start = this.startPoint[0] + "," + this.startPoint[1];
        let end = this.endPoint[0] + "," + this.endPoint[1];
        const url =
          "http://192.168.20.249:5005" +
          "/route/v1/driving/" +
          start +
          ";" +
          end +
          "?steps=true"; //Config.LJIP
        this.plans = await fetch(url).then(res => res.json()).then(data => this.analysisJson(data));
        
        const paths = this.plans;
        this.over = false;
        let linePositions = [];
        for (let i = 0; i < paths.length; i++) {
          for (let j = 0; j < paths[i].coordinates.length - 1; j++) {
            //osrm 是纬度，经度
            start = [paths[i].coordinates[j][1], paths[i].coordinates[j][0], 0];
            end = [
              paths[i].coordinates[j + 1][1],
              paths[i].coordinates[j + 1][0],
              0
            ];
            linePositions = linePositions.concat([start, end]);
          }
        }
        console.log('我是整个路线',linePositions);
        // this.addXuxian(linePositions);
        var len = linePositions.length-1;
        this.addXuxian(linePositions,0,this.startPoint);
        this.addXuxian(linePositions,len,this.endPoint);
        this.polylines = this.polylines || [];
        this.polylines.push(this.drawLine(linePositions));
        this.addStartPoint();
        this.addEndPoint();
        this.$nextTick(() => {
          let x = (this.startPoint[0] + this.endPoint[0]) / 2;
          let y = (this.startPoint[1] + this.endPoint[1]) / 2;
          let cart = GeoVis.Cartesian3.fromDegrees(x, y, 0);
          let d = GeoVis.Cartesian3.distance(
            GeoVis.Cartesian3.fromDegrees(...this.startPoint),
            GeoVis.Cartesian3.fromDegrees(...this.endPoint)
          );
          let r = d / 2;
          let bs = new GeoVis.BoundingSphere(cart, r * 1.1);
          earth.camera.flyToBoundingSphere(bs);
        });
      }
       this.choosePlan(0);
    },
    addXuxian(linePositions,index,point){
      let route = linePositions[index];
      var position = [ new GeoVis.Cartesian3.fromDegrees(Number(point[0]), Number(point[1]), 0),
       new GeoVis.Cartesian3.fromDegrees(route[0],route[1],0)]

        var xuxian = new GeoVis.Polyline(position, {
            width: 4,
            material: new GeoVis.Material({
                fabric: {
                    type: 'PolylineDash',
                    uniforms: {
                        color: new GeoVis.Color(0.0 / 255.0, 135.0 / 255.0, 244.0 / 255.0, 1.0),
                        speed: -0.1
                    }
                }
            }),
            followSurface: true
        }).addTo(earth.features)

        this.Xuxian.push(xuxian);
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
    drawLine(position) {
      var colors1 = [GeoVis.Color.fromCssString("#5298ff")];
      return new GeoVis.Polyline(position, {
        colors: colors1,
        vertexColor: true,
        followSurface: true,
        width: 4.0
      }).addTo(earth.features);
    },
    addBillboard(coordinate, image, id) {
     
      var billboard =  new GeoVis.Billboard(coordinate, {
        id: id,
        image: image,
        horizontalOrigin: GeoVis.HorizontalOrigin.CENTER,
        verticalOrigin: GeoVis.VerticalOrigin.CENTER,
        pixelOffset: new GeoVis.Cartesian3(0,-20),
        width: 40,
        height: 40
      }).addTo(earth.features);
      if(id=="start"){
         console.log("我是起点：",coordinate)
        this.startBillboard = 1;
      }else if(id=="end"){
        console.log("我是终点：",coordinate)
        this.endBillboard = 1;
      }
      return   billboard; 
    
    },
    choosePlan(index) {
      this.searchBox = true;
      console.log(this.plans[index]);
      this.plan = this.plans[index];
      this.plan.name = `路线${index + 1}`;
      this.resultPlan = !this.resultPlan;
      for (var j = 0; j < this.plan.instructions.length; j++)
        this.texts[j] = this.formatText(this.plan.instructions[j]);
      console.log(this.texts[j]);
      if (!this.polylines.length) return;
      for (let polyline of this.polylines) {
        polyline.colors = [GeoVis.Color.fromCssString("#5298ff")];
      }
      this.polylines[index].colors = [GeoVis.Color.fromCssString("#ee0000")];
    },
    formatText(instruction) {
      var item = {
        text: "",
        icon: ""
      };
      item = textFormat(instruction);
      console.log("原生item", item);
      return item;
    },
    clearAll() {
      if (this.billboards && this.billboards.length) {
        for (let billboard of this.billboards) {
          billboard.removeFrom(earth.features);
        }
        this.billboards = [];
      }
      if (this.polylines && this.polylines.length) {
        for (let polyline of this.polylines) {
          polyline.removeFrom(earth.features);
        }
        this.polylines = [];
      }
      if (this.Xuxian && this.Xuxian.length) {
        for (let xuxian of this.Xuxian) {
          xuxian.removeFrom(earth.features);
        }
        this.Xuxian = [];
      }

      this.resultPlan = false;
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
    pickPoint(n) {
      if(!n&&this.startBillboard){
         earth.features.get("start").removeFrom(earth.features);
         this.startBillboard = 0;
       }
       if( n==1 && this.endBillboard){
         earth.features.get("end").removeFrom(earth.features);
         this.endBillboard = 0;
       }
      this.lujingLocation = n;
      earth.off("click", this.getPoint);
      if (n > -1) {
        earth.once("click", this.getPoint);
      }
    },
    getPoint(e) {
      fetch(
        "http://192.168.20.249:8086" +
          `/reverse.php?format=json&lat=${e.lonlat[1]}&lon=${e.lonlat[0]}&zoom=8`
      ) //Config.DMIP
        .then(res => res.json())
        .then(json => {
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
    addStartPoint(){
      this.billboards = this.billboards || [];
        this.billboards.push(
          this.addBillboard(
            [Number(this.startPoint[0]), Number(this.startPoint[1]), 0],
            require("./start.png"),
            "start"
          )
        );
        this.startBillboard = 1;
    },
    addEndPoint(){
      this.billboards = this.billboards || [];
    this.billboards.push(
          this.addBillboard(
            [Number(this.endPoint[0]), Number(this.endPoint[1]), 0],
            require("./end.png"),
            "end"
          )
        );
    },
    JsonOutLj() {
      let text = JSON.stringify(this.plans);
      if ("download" in document.createElement("a")) {
        this.webDownLoad(text, "路经导出.json");
      }
    },
    webDownLoad: function(content, filename) {
      let link = document.createElement("a");
      link.download = filename;
      link.style.display = "none";
      let blob = new Blob([content]);
      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
/*	.black-box {
		border: 1px solid #000;
 		background-color: #1c2c35;
	}  */
.search {
  width: 410px;
  height: 40px;
  border: 1px solid #9ca8b5;
  border-radius: 2px;
  background-color: #2f4150;
}
.search.short {
  width: 370px;
  margin-top: 15px;
  margin-left:10px;
}
.search .cz-input {
  width: calc(100% - 80px);
  height: 40px;
  line-height: 40px;
  float: left;
  color: #fff;
  font-size: 16px;
  border: none;
  background: transparent;
}
.pre,
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
  margin-left:10px;
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
.list{
  text-align:left;
  padding:5px 10px;
}
.item{
   width: 60px;
   height:40px;
   background-color:rgb(90,103,114);
   line-height:40px;
   border:1px solid #9ca8b5;
   color:white;
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
  background-image: url(/images/images/gf/osrm.directions.icons.color.svg);
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

.searchContainer {
  margin-top: 20px;
  width: 440px;
  z-index: 4;
}
.navBtn {
  position: absolute;
  right: 5px;
  top: 60px;
  width: 55px;
  height: 125px;
  color: white;
  font-size: 30px;
  color: #05eaff;
  padding: 10px 0;
}
.navBtn img {
  width: 25px;
  height: 25px;
  margin: 15px;
  cursor: pointer;
}
.results {
  margin-top: 15px;
  width: 440px;
  background-color: #1c2c35;
  z-index: 3;
  box-shadow: 0 0 2px #000;
}
.path {
  min-height: 30px;
  font-size: 14px;
  position: flex;
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
.drawer[data-v-9a072664]{
  margin-top:10px;
}
#plugin_result {
  overflow-y: auto;
  min-height: 200px;
  max-height: 300px;
 
}
</style>

<!-- CzSun拒绝维护使用2空格缩进的代码 -->
