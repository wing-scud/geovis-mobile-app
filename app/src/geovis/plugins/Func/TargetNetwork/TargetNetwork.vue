<template>
  <div class="button">
    <el-switch class="switch" v-model="showRadar" @change="toggleRadar()" active-color="#177DDC" inactive-color="#5B5B5B">雷达包络 </el-switch>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { netStore } from "./store";

import { openNewWindow } from "../../../util";
import { data } from "./data";
import { earthStore } from "@/geovis/store";

const TargetNetwork = Vue.extend({
  name: "Template",
  props: {
    pluginInfo: {
      type: Object as () => GVAPP.PluginInfo,
      required: true
    }
  },
  data() {
    return {
      showRadar: false,
      _radarList: undefined
    };
  },
  mounted() {
    this._radarList = [];
    netStore.init(this.pluginInfo.data);
    openNewWindow("static/data/Network/rightScreen/NetworkTopology/networktopology.html");
  },
  beforeDestroy() {
    this.clearRadar();
    netStore.uninit();
  },
  methods: {
    toggleRadar() {
      if (this.showRadar) {
        this.addRadar();
      } else {
        this.clearRadar();
      }
    },
    clearRadar() {
      this._radarList.map(radar => {
        radar.removeFrom(earthStore.earth.features);
      });
      this._radarList = [];
    },
    addRadar() {
      const color = new GeoVis.Color(239 / 255, 67 / 255, 105 / 255);
      const outlineColor = color.brighten(0.5, new GeoVis.Color());
      data.points.radar.lonlats.map(lonlat => {
        if (Math.random() > 0.5) return;
        //@ts-ignore
        const radar = new GeoVis.Radar(lonlat, {
          radius: 2e5,
          stackPartitions: 7, //纵向切分
          slicePartitions: 16, //横向切分
          fill: true,
          fillColor: color.withAlpha(0.35),
          outline: true,
          async: true,
          outlineColor: outlineColor //GeoVis.Color.multiplyByScalar(color, 1.5, new GeoVis.Color())
        }).addTo(earth.features);
        this._radarList.push(radar);
      });
    }
  }
});
export default TargetNetwork;
</script>

<style scoped>
.button {
  position: absolute;
  right: 20px;
  top: 60px;
}
</style>
