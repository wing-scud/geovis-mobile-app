import Vue from "vue";

Vue.component("Tabbar", () => import("./Tabbar/Tabbar.vue"));
Vue.component("Icon", () => import("./Icon/Icon.vue"));
Vue.component("Layer", () => import("./Layer/Layer.vue"));
Vue.component("MapEntity", () => import("././Map/MapEntity.vue"));
Vue.component("MobileBaseWidgets", () => import("././BaseWidgets/BaseWidgets.vue"));
import PathQuery from "./Map/PathQuery.vue";
import Measure from "./Map/Measure.vue";
import SearchArea from "./SearchArea/SearchArea.vue";
export { PathQuery, Measure, SearchArea };
