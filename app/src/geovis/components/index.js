import Vue from "vue";
import Earth from "./Earth.vue";

Vue.component("Earth", Earth); //同步引入 ，此组件作为子组件先引入
Vue.component("MTabbar", () => import("./MTabbar/MTabbar.vue"));
Vue.component("MIcon", () => import("./MIcon/MIcon.vue"));
Vue.component("MIpInput", () => import("./IpInput/Index.vue"));
// --------------------PC Web导出----------------------------
// import GvPanel from "./Panel/index.vue";
// import GvIcon from "./Icon/index.vue";
// import SvgIcon from "./SvgIcon/Icon.vue";
// import SideBar from "./SideBar/SideBar.vue"
// Vue.component("gv-panel", GvPanel);
// Vue.component("gv-icon", GvIcon);
// Vue.component("gv-sidebar", SideBar);
// Vue.component("svg-icon", SvgIcon);

// -------------------移动端适配------------------------------
