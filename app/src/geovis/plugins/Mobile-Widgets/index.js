import Vue from "vue";
Vue.component("Layer", () => import("./Layer/Layer.vue"));
Vue.component("MapEntity", () => import("./Map/MapEntity.vue"));
Vue.component("MobileBaseWidgets", () => import("./BaseWidgets/BaseWidgets.vue"));
Vue.component("WeatherInfor", () => import("./LiveWeather/WeatherInfor.vue"));
Vue.component("Location", () => import("./Location/Location.vue"));
Vue.component("TaskGroup", () => import("./TaskGroup/Index.vue"));
Vue.component("BriefAddress", () => import("./Address/BriefAddress.vue"));
