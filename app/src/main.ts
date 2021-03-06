import Vue from "vue";
import App from "./App.vue";
import Vant from "vant";
import "vant/lib/index.css";
import "mapbox-gl/src/css/mapbox-gl.css"
import { earthStore, EarthStore } from "./geovis/store/index.js";
import router from "./router/index.js"
import "./cordova/index.js"
import mobileStore from "./store/index.js"

/*
------------pc适配-------------------
import "./assets/global.scss";
import "dat.gui/build/dat.gui.js";
import "dat.gui/build/dat.gui.css";
import ElementUI from "element-ui";

Vue.use(ElementUI);
*/
/*
 ------------移动端适配--------------

*/
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
if (navigator.userAgent) {
  window['NativeStorage'] || (window.localStorage.__proto__.remove = (key) =>{
    window.localStorage.removeItem(key);
  })
}
window['NativeStorage'] = window['NativeStorage'] || window['localStorage']
console.log('deviceready,init app');
new Vue({
  store: mobileStore,
  render: h => h(App),
  router
}).$mount("#app");
