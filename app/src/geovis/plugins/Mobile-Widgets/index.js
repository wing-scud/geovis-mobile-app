import Vue from "vue";

Vue.component("Tabbar", () => import("./Tabbar/Tabbar.vue"));
Vue.component("Icon", () => import("./Icon/Icon.vue"));
Vue.component("Layer", () => import("./Layer/Layer.vue"));
Vue.component("MapEntity", () => import("././Map/MapEntity.vue"));

import PathQuery from "./Map/PathQuery.vue";
// import MapEntity from "./Map/MapEntity.vue";
import Measure from "./Map/Measure.vue";
import Search from "./Map/Search.vue";
// Vue.component("Measure", () => import("./Map/Measure.vue"));
// Vue.component("PathQuery", () => import("./Map/PathQuery.vue"));
export { PathQuery, Measure, Search };
