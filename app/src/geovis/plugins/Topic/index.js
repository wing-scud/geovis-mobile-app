import Vue from "vue";

// var BottomInfo = ()=>require("./BottomInfo")

Vue.component("TopicManager", () => import("./TopicManager/TopicManager.vue"));
Vue.component("BIMViewer", () => import("./BIMViewer/BIMViewer.vue"));
export {};
