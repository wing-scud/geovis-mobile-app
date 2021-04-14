<template>
  <van-row class="mapbox-path-control" gutter="20">
    <van-col span="6"><van-button plain hairline class="pathplan-button" type="primary" @click="goBack"> 返回</van-button></van-col>
    <van-col span="6"
      ><van-button plain hairline class="pathplan-button" type="primary" @click="displauPanel"> 面板{{ panelBool ? "关" : "开" }}</van-button></van-col
    >
    <van-col span="6"><van-button plain hairline class="pathplan-button" type="primary" @click="addWayPoints"> 途径点</van-button></van-col>
    <van-col span="6"><van-button plain hairline class="pathplan-button" type="primary" @click="savePath">保存</van-button></van-col>
  </van-row>
</template>
<script lang="ts">
import { earthStore } from "@/geovis/store";
import mapboxgl from "mapbox-gl";
import { Toast } from "vant";
const MapboxDirections = window["MapboxDirections"];
import Vue from "vue";
export default Vue.extend({
  name: "PathPlan",
  data() {
    return {
      panelBool: true,
      markers: []
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
          instance.addWayPointMarker(point);
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
    earthStore.state.mode = "globe3";
    earthStore.earth.scene.mode = GeoVis.SceneMode.SCENE3D;
    this.markers.map(marker => marker.remove());
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
      this.markers.map(marker => marker.remove());
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
      this.markers.push(marker);
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
      //@ts-ignore
      this.$router.backward(-1);
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
  z-index: 6;
}
.pathplan-button {
  width: 100%;
  height: 40px;
}
.pathplan-plugin .van-button--normal {
  padding: 0 0;
}
</style>
