import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
// import ElementUI from "element-ui";
import store from "./store";
import Vant from "vant";
import "vant/lib/index.css";
// import "./assets/global.scss";
// import "../src/plugin/directives/directives.js"
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

import VueRouter from "vue-router";
// const cordovaTag = document.createElement("script");
// const cordovaPath = "cordova.js";
// console.log("ROUTE_BASE", process.env.ROUTE_BASE, cordovaPath);
// cordovaTag.setAttribute("src", process.env.ROUTE_BASE + cordovaPath);
// document.head.appendChild(cordovaTag);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Vant);
console.log("js");
Vue.config.productionTip = false;
new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
