import Vue from "vue";
import Vant from "vant";
import "vant/lib/index.css";
import "mapbox-gl/src/css/mapbox-gl.css"
import { earthStore, EarthStore } from "./geovis/store/index.js";
import mobileStore from "./store/index.js"
import router from "./router/index.js"
import "./api/index";
import App from "./App.vue";
const agent = navigator.userAgent;
if (agent.includes('Windows')) {
// window 下平台
} else if (agent.includes('emss')) {
  //真机mate20
} else {
  //其他手机平台
}


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
new Vue({
  store: mobileStore,
  render: h => h(App),
  router
}).$mount("#app");