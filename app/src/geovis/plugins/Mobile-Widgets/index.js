import Vue from "vue";

Vue.component("Tabbar", () => import("./Tabbar/Tabbar.vue"));
Vue.component("Icon", () => import("./Icon/Icon.vue"));
Vue.component("Layer", () => import("./Layer/Layer.vue"));
Vue.component("SearchInput", () => import("./SearchInput/SearchInput.vue"));
Vue.component("Map", () => import("./Map/Map.vue"));
Vue.component("MapIndex", () => import("./Map/MapIndex.vue"));
Vue.component("Route", () => import("./Map/Route.vue"));
export {};
