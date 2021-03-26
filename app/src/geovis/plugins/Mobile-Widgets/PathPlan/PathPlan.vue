<template>
  <div class="mapbox-path-control">
    <van-button plain type="info" @click="goBack">返回</van-button>
    <van-button plain type="info" @click="displauPanel">路线面板{{ panelBool ? "关" : "开" }}</van-button>
    <van-button plain type="info" @click="addWayPoints">添加途径点</van-button>
    <!-- <van-button plain type="info">添加规避区域</van-button> -->
    <van-button plain type="info" @click="savePath">保存</van-button>
  </div>
</template>
<script lang="ts">
import { earthStore } from "@/geovis/store";
import mapboxgl from "mapbox-gl";
import { Toast } from "vant";
const MapboxDirections = window["MapboxDirections"];
import Vue from "vue";
export default Vue.extend({
  name: "PathQuery",
  data() {
    return {
      panelBool: true
    };
  },
  mounted() {
    earthStore.state.mode = "map";
    const instance = this;
    earthStore.setMapFullScreen(true);
    earthStore.state.onlyMap = true;
    const addPathQuery = function() {
      const map = earthStore.map;
      const pathQuery = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        language: "zh",
        interactive: false,
        controls: {
          inputs: true
          //instructions:true
        }
      });
      //@ts-ignore
      instance._control = pathQuery;
      if (instance.$route.params && instance.$route.params.origin) {
        //导航
        const params = instance.$route.params;
        pathQuery.setOrigin(params.origin);
        pathQuery.setDestination(params.destination);
        if (instance.$route.params.waypoints.length > 0) {
          //默认只有一个途径点
          const point = instance.$route.params.waypoints[0];
          const index = 0;
          instance.addWayPointMarker(point)
          pathQuery.addWaypoint(index, point);
        }
        //设置input输入框也为起始点
      }
      map.addControl(pathQuery, "top-left");
    };
    if (earthStore.map) {
      addPathQuery();
    } else {
      setTimeout(() => {
        addPathQuery();
      }, 1000);
    }
  },
  beforeDestroy() {
    const map = earthStore.map;
    //@ts-ignore
    this._control.removeRoutes();
    //@ts-ignore
    map.removeControl(this._control);
    earthStore.setMapFullScreen(false);
    earthStore.state.onlyMap = false;
  },
  methods: {
    displauPanel() {
      this.panelBool = !this.panelBool;
      //@ts-ignore
      const control = this._control;
      const pathContainer = document.getElementsByClassName("directions-control-instructions")[0];
      //@ts-ignore
      pathContainer.style.display = this.panelBool ? "block" : "none";
    },
    addWayPoints() {
      const map = earthStore.map;
      //@ts-ignore
      const control = this._control;
      map.once("click", e => {
        const lnglat = e.lngLat;
        const position = [lnglat.lng, lnglat.lat];
        this.addWayPointMarker(position);
      });
    },
    addWayPointMarker(position) {
      const index = this.getNextPoint();
      const map = earthStore.map;
      //@ts-ignore
      const control = this._control;
      const textContainer = document.createElement("div");

      //如果没有起始点，则设置为起始点
      textContainer.className = "pathQueryPoint";
      textContainer.innerText = `途径点${index}`;
      const marker = new mapboxgl.Marker({
        color: "#FFFFFF",
        element: textContainer,
        draggable: true
      });
      //@ts-ignore
      marker.setLngLat(position);
      marker.addTo(map);
      control.addWaypoint(index, position);
      marker.on("drag", e => {
        const target = e.target;
        const position = [target.getLngLat().lng, target.getLngLat().lat];
        const text = target.getElement().innerText;
        const index = Number(text.match(/\d+\d*/)[0]);
        this.editWayPoint(index, position);
      });
    },
    editWayPoint(index, position) {
      //@ts-ignore
      const control = this._control;
      control.setWaypoint(index, position);
    },
    getNextPoint() {
      //@ts-ignore
      const control = this._control;
      const wayPoints = control.getWaypoints();
      const length = wayPoints.length;
      return length;
    },
    unflodStaredRoute(id) {
      // const state =this.$store.state.starRoutes;
      // const routeIndex = state.routes.findIndex(path => path.id === id);
      // const route = state.routes[routeIndex];
      // const origin = route.origin.geometry.coordinates;
      // const destination = route.destination.geometry.coordinates;
      // const waypoints = route.waypoints;
    },
    savePath() {
      //@ts-ignore
      const control = this._control;
      const id = Math.random();
      const path = {
        origin: control.getOrigin(),
        destination: control.getDestination(),
        waypoints: control.getWaypoints(),
        id: id
      };
      const starRoutes = this.$store.state.starRoutes;
      const starRoutesBool = starRoutes.routes.findIndex(path => path.id === id);
      if (starRoutesBool !== -1) {
        Toast("已经收藏过了");
      } else {
        Toast("收藏成功");
        this.$store.commit("starRoutes/addRoute", path);
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  }
});
</script>
<style scoped>
.mapbox-path-control {
  position: fixed;
  bottom: 0px;
  width: 100%;
  left: 0;
  margin: 0 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  z-index: 6;
}
</style>
