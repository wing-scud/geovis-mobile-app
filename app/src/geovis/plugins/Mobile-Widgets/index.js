import Vue from "vue";
Vue.component("Layer", () => import("./Layer/Layer.vue"));
Vue.component("MapEntity", () => import("./Map/MapEntity.vue"));
Vue.component("MobileBaseWidgets", () => import("./BaseWidgets/BaseWidgets.vue"));
Vue.component("WeatherInfor", () => import("./FeatureWeather/WeatherInfor.vue"));
Vue.component("Location", () => import("./Location/Location.vue"));
Vue.component("TaskGroup", () => import("./TaskGroup/Index.vue"));
Vue.component("BriefAddress", () => import("./Address/BriefAddress.vue"));
Vue.component("TodayDetail", () => import("./FeatureWeather/TodayDetail.vue"));
Vue.component("FPS", () => import("./FPS/FPS.vue"));
Vue.component("EditInfo", () => import("./InfoCollection/EditInfo.vue"));
Vue.component("InfoList", () => import("./InfoCollection/InfoList.vue"));
Vue.component("InfoDetail", () => import("./InfoCollection/InfoDetail.vue"));

