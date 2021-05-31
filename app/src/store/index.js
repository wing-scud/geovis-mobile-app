import Vuex from "vuex";
import Vue from "vue";
import starPlaces from "./modules/starPlaces.js";
import starRoutes from "./modules/starRoutes.js";
import user from "./modules/user.ts";
import gisInfos from "./modules/gisInfos.ts";
Vue.use(Vuex);
const mobileStore = new Vuex.Store({
  modules: {
    starPlaces: starPlaces,
    starRoutes: starRoutes,
    user: user,
    gisInfos:gisInfos
  }
});
// 离线模式下， 如何实现存储，再同步
export default mobileStore;