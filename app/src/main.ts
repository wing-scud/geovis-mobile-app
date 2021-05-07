import Vue from "vue";
import App from "./App.vue";
import Vant from "vant";
import "vant/lib/index.css";
import "mapbox-gl/src/css/mapbox-gl.css"
import { earthStore, EarthStore } from "./geovis/store/index.js";
import "./api/index";
import router from "./router/index.js"
// import "./cordova/index.js"
import mobileStore from "./store/index.js"
// 适配
Vue.use(Vant);
Vue.use({
  install: (plugin: any, options: any) => {
    plugin.prototype.$earthStore = earthStore;
  }
});
declare module "vue/types/vue" {
  interface Vue {
    $earthStore: EarthStore;
  }
}
Vue.config.productionTip = false;
new Vue({
  store: mobileStore,
  render: h => h(App),
  router
}).$mount("#app");
