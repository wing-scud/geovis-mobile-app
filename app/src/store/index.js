import Vuex from "vuex";
import Vue from "vue"
import starPlaces from "./modules/starPlaces.js";
import starRoutes from "./modules/starRoutes.js";
Vue.use(Vuex)
const mobileStore = new Vuex.Store({
  modules: {
    starPlaces: starPlaces,
    starRoutes: starRoutes
  }
});
export default mobileStore;
