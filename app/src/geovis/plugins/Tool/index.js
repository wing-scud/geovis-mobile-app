import Vue from "vue";
// const FirstPersonView = () => import("./FirstPersonView");
// var SimpleMeasure = ()=>import("./SimpleMeasure")
const ShortestPath = () => import("./ShortestPath/ShortestPath");
const RoutePlan = () => import("./RoutePlan/RoutePlan");
const ViewRoaming = () => import("./ViewRoaming/Index");
const SceneEffects = () => import("./SceneEffects/SceneEffects");
const StreetView = () => import("./StreetView/index");

// var TerrainAna = ()=>import("./TerrainAna")
// Vue.component("FirstPersonView", FirstPersonView);
// Vue.component("SimpleMeasure", SimpleMeasure);
Vue.component("ShortestPath", ShortestPath);
Vue.component("RoutePlan", RoutePlan);
Vue.component("LayerSplit",  () => import("./LayerSplit/LayerSplit"));
Vue.component("ViewRoaming", ViewRoaming);
// Vue.component("TerrainAna", TerrainAna);
Vue.component("SceneEffects", SceneEffects);
Vue.component("StreetView", StreetView);

export const SearchArea = () => import("./SearchArea/SearchArea.vue");
Vue.component("SearchArea", SearchArea);

export const SceneCapture = () => import("./SceneCapture/SceneCapture.vue");
Vue.component("SceneCapture", SceneCapture);

// export const ConvertTool = () => import("./ConvertTool/ConvertTool.vue");
// Vue.component("ConvertTool", ConvertTool);

export const ToolBox = () => import("./ToolBox/ToolBox.vue");
Vue.component("ToolBox", ToolBox);

export {

};
