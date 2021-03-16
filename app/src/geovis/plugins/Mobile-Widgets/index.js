import Vue from "vue";

Vue.component("Tabbar", () => import("./Tabbar/Tabbar.vue"));
Vue.component("Icon", () => import("./Icon/Icon.vue"));
Vue.component("Layer", () => import("./Layer/Layer.vue"));
Vue.component("SearchInput", () => import("./SearchInput/SearchInput.vue"));
export {};
