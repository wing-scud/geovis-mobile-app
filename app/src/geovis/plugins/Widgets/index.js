import Vue from "vue";

// var BottomInfo = ()=>require("./BottomInfo")

Vue.component("AerialView", () => import("./AerialView/AerialView.vue"));
Vue.component("GeoVisPPT", () => import("./GeoVisPPT/GeoVisPPT.vue"));
Vue.component("BaseWidgets", () => import("./BaseWidgets/Widgets.vue"));
Vue.component("LayerManager", () => import("./LayerManager/LayerManager.vue"));
Vue.component("Navigator",  () => import("./Navigator/Navigator.vue"));
Vue.component("TitleBar", () => import("./TitleBar/TitleBar.vue"));
Vue.component("Timeline", () => import("./Timeline/Timeline.vue"));
Vue.component("ScaleBar", () => import("./ScaleBar/ScaleBar.vue"));
Vue.component("FPS", () => import("./FPS/FPS.vue"));

export {};
