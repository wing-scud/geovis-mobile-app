<template>
  <App />
</template>

<script>
import Vue from "vue";
//后加
import App from "./App.vue";
import router from "./components/Router";
// import { Workbox } from "workbox-window";
import VueCesiumController from "./components/VueCesiumController";
import { earthStore } from "@/geovis/store";
import CesiumEntityWrapper from "./modules/CesiumEntityWrapper";
// import store from "./store/index"
export default {
  components: {
    App,
  },
  router,
  beforeCreate() {
    earthStore.enablePlugin("Timeline", true);
    VueCesiumController.install();
  },
  mounted() {
      earth.clock.startTime = GeoVis.Date.fromDate(new Date("2020-10-10 08:30"));
      earth.clock.stopTime = GeoVis.Date.fromDate(new Date("2020-10-10 10:30")); //10.10
      earth.clock.clockRange = GeoVis.ClockRange.LOOP_STOP;
      earth.clock.currentTime = earth.clock.startTime;
    setTimeout(() => {
      // earth.clock.onTick.addEventListener(function() {
      //     console.log()
      // })
      earth.timeline.zoomTo(earth.timeline._clock.startTime, earth.timeline._clock.stopTime);
    },800);
    // Export Vue for debugger
    // window.app = app;

    /* global cc */
    //cc.sats.addFromTleUrl("data/tle/norad/active.txt", ["Active"]);
    
    cc.sats.addFromTleUrl("static/data/SatelliteVis/tle/norad/planet.txt", ["Planet"]);
    cc.sats.addFromTleUrl("static/data/SatelliteVis/tle/norad/starlink.txt", ["Starlink"]);
    cc.sats.addFromTleUrl("static/data/SatelliteVis/tle/norad/globalstar.txt", ["Globalstar"]); //删除了[-]
    cc.sats.addFromTleUrl("static/data/SatelliteVis/tle/norad/resource.txt", ["Resource"]);
    cc.sats.addFromTleUrl("static/data/SatelliteVis/tle/norad/science.txt", ["Science"]); //修改数据方向
    cc.sats.addFromTleUrl("static/data/SatelliteVis/tle/norad/stations.txt", ["Stations"]);
    cc.sats.addFromTleUrl("static/data/SatelliteVis/tle/norad/weather.txt", ["Weather"]);
    cc.sats.addFromTleUrl("static/data/SatelliteVis/tle/norad/tle-new.txt", ["New"]);
    cc.sats.addFromTleUrl("static/data/SatelliteVis/tle/norad/beidou.txt", ["北斗"]); //删除了括号
    cc.sats.addFromTleUrl("static/data/SatelliteVis/tle/norad/iridium-NEXT.txt", ["iridium"]); //此处开始是新增
    cc.sats.addFromTleUrl("static/data/SatelliteVis/tle/norad/gorizont.txt", ["gorizont"]); //删除了[-]
    cc.sats.addFromTleUrl("static/data/SatelliteVis/tle/norad/intelsat.txt", ["intelsat"]); //删除了()
    cc.sats.addFromTleUrl("static/data/SatelliteVis/tle/norad/molniya.txt", ["molniya"]);
    cc.sats.addFromTleUrl("static/data/SatelliteVis/tle/norad/orbcomm.txt", ["orbcomm"]); //删除了[-]
    cc.sats.addFromTleUrl("static/data/SatelliteVis/tle/norad/raduga.txt", ["raduga"]); //删除了[-]
    // cc.sats.addFromTleUrl("data/tle/ext/move.txt", ["MOVE"]);
    if (cc.sats.enabledTags.length === 0) {
      cc.sats.enableTag("MOVE");
    }
  },
  destroyed() {
    cc.destroy();
    earthStore.enablePlugin("Timeline", false);
    // CesiumEntityWrapper.disableComponent("轨道");
    // cc.sats.disableComponent("轨道");
    // var aa= new CesiumEntityWrapper();
    
   },
};
</script>
