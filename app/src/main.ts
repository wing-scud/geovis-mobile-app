import Vue from "vue";
import App from "./App.vue";
import Vant from "vant";
import "vant/lib/index.css";
import {earthStore, EarthStore} from "./geovis/store";
import router from "./router/index.js"
import "./cordova/cordova.js"
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

// Vue.component("Icon", Icon);
Vue.config.productionTip = false;
console.log("ts")
new Vue({
  render: h => h(App),
  router
}).$mount("#app");
if (!window['cordova']) {
  console.log('Not running in cordova.');
}
