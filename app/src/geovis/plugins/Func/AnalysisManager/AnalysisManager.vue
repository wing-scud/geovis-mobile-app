<template>
  <gv-panel :height="350" :pluginInfo="pluginInfo" class="analysisManager">
    <div class="module" v-for="(tools, key) in modules" :key="key">
      <div class="title">{{ key }}</div>
      <div class="toolsContainer">
        <div class="tool" v-for="tool in tools" :key="tool" @click="handleclick(tool)" :style="{ color: currentTool !== tool ? '' : '#0086b3' }">
          <div class="imageContainer">
            <span class="iconfont" v-html="getImageUrl(tool)"></span>
          </div>
          <div class="name">{{ tool }}</div>
        </div>
      </div>
    </div>
    <div class="component" v-if="toolControl">
      <div class="head">
        <span>
          {{ currentTool }}
        </span>
        <div class="pluginControl" @click="closeComponent">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <component :is="component" />
    </div>
  </gv-panel>
</template>
<script>
import TemplatePlugin from "../../TemplatePlugin.vue";
import { modules } from "./list";
import WaterFlood from "./Tools/WaterFlood/WaterFlood.vue";
import CutFill from "./Tools/CutFill/CutFill.vue";
import ViewShed from "./Tools/ViewShed/ViewShed.vue";
import TerrainViewShed from "./Tools/TerrainViewShed/TerrainViewShed.vue";
// import HighlyMap from "./Tools/HighlyMap/HighlyMap.vue";
import Flat from "./Tools/Flat/Flat.vue";
import Terrain from "./Tools/Terrain/Terrain.vue";
import ResetAnalysis from "./Tools/ResetAnalysis/ResetAnalysis.vue";
import MeasureResult from "./Tools/Measure/Measure";
import Buffer from "./Tools/Buffer/Buffer";
import { earthStore } from "@/geovis/store";
const Types = DrawHelper.Types;
export default {
  name: "AnalysisManager",
  components: {
    WaterFlood,
    TerrainViewShed,
    ViewShed,
    CutFill,
    Terrain,
    ResetAnalysis,
    MeasureResult,
    // HighlyMap,
    Flat,
    Buffer,
    "template-plugin": TemplatePlugin
  },
  props: ["pluginInfo"],
  data() {
    return {
      modules: modules,
      currentTool: undefined,
      component: undefined,
      toolControl: false,
      _drawhelper: undefined
    };
  },
  mounted() {
    const earth = earthStore.earth;
    this._drawhelper = earthStore.drawHelper;
  },
  methods: {
    getImageUrl(tool) {
      const unicodes = ["&#xe608;", "&#xe728;", "&#xe60c;", "&#xe6ee;", "&#xea30;", "&#xe60a;", "&#xe621;","&#xe607;"];
      const tools = ["水淹特效", "可视域", "挖填方", "坡度坡向", "重置分析", "量测", "缓冲区","压平"];
      const unicode = unicodes[tools.indexOf(tool)];
      return unicode;
    },
    handleclick(tool) {
      let component;
      let toolControl;
      switch (tool) {
        case "水淹特效":
          component = "WaterFlood";
          break;
        // case "高度图":
        //   component = "HighlyMap";
        //   break;
        case "可视域":
          component = "ViewShed";
          break;
        case "挖填方":
          component = "CutFill";
          break;
        case "坡度坡向":
          component = "Terrain";
          break;
        case "重置分析":
          component = "ResetAnalysis";
          break;
        case "量测":
          component = "MeasureResult";
          break;
        case "缓冲区":
          component = "Buffer";
          break;
        case "压平":
          component = "Flat";
          break;
        default:
          break;
      }
      if (this.currentTool === tool) {
        this.currentTool = undefined;
        this.toolControl = false;
        this.component = undefined;
      } else {
        this.currentTool = tool;
        this.toolControl = true;
        this.component = component;
      }
    },
    closeComponent() {
      this.currentTool = undefined;
      this.toolControl = false;
      this.component = undefined;
    }
  },
  watch: {},
  beforeDestroy() {
    this._drawhelper.removeAll();
  }
};
</script>
<style src="./analysis.scss" lang="scss" scoped></style>
<style src="./font/iconfont.css" lang="css"></style>
