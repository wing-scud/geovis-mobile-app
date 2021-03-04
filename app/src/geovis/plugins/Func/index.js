import Vue from "vue";

Vue.component("PlotManager", () => import("./PlotManager/PlotManager.vue"));
Vue.component("MBTS", () => import("./MBTS/MBTS.vue"));
Vue.component("AnalysisManager", () => import("./AnalysisManager/AnalysisManager.vue"));
Vue.component("SceneTree", () => import("./SceneTree/SceneTree.vue"));
Vue.component("TargetNetwork", () => import("./TargetNetwork/TargetNetwork.vue"));
Vue.component("TargetCluster", () => import("./TargetCluster/TargetCluster.vue"));
Vue.component("TimeLayer", () => import("./TimeLayer/TimeLayer.vue"));
Vue.component("ScenePlayer", () => import("./ScenePlayer/ScenePlayer.vue"));
Vue.component("TiffVis", () => import("./TiffVis/TiffVis.vue"));
Vue.component("SatellitePlu", () => import("./SatellitePlu/SatelliteVis.vue"));
Vue.component("VisManager", () => import("./VisManager/VisManager.vue"));

export { };
