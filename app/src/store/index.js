import Vuex from "vuex";
import Vue from "vue";
import starPlaces from "./modules/starPlaces.js";
import starRoutes from "./modules/starRoutes.js";
import user from "./modules/user.ts";
Vue.use(Vuex);
const mobileStore = new Vuex.Store({
  modules: {
    starPlaces: starPlaces,
    starRoutes: starRoutes,
    user: user
  }
});
export default mobileStore;
