import Vue from "vue";
import Home from "../view/Home.vue";
import Login from "../view/Login/Login.vue";
import Register from "../view/Login/Register.vue";
import MapSetting from "../view/Map/MapSetting.vue";
import Map from "../view/Map/Index.vue";
import Application from "../view/Plugin/Index.vue";
import Person from "../view/Person/Index.vue";
import { PathPlan, Measure, SearchArea } from "../geovis/plugins/Mobile-Widgets/index.js";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    // alias:"/",
    component: Home,
    name: "index",
    redirect: "/map",
    children: [
      {
        path: "person",
        component: Person,
        name: "person"
      },
      {
        name: "map",
        path: "map",
        component: Map,
        children: [
          { path: "search", component: SearchArea, name: "search" },
          { path: "pathPlan", component: PathPlan, name: "pathPlan" },
          { path: "measure", component: Measure, name: "measure" }
        ]
      },
      {
        path: "application",
        component: Application,
        name: "application"
      }
    ],
    meta: {
      keepAlive: true
    }
  },
  { path: "/login", component: Login, name: "login" },
  { path: "/register", component: Register, name: "register" },
  {
    path: "/mapsetting",
    component: MapSetting,
    name: "mapsetting"
  }
  // {
  //   path: "/measureManage",
  //   component: MeasureManage,
  //   name: "measureManage"
  // },
  // {
  //   path: "/navigationChoose",
  //   component: NavigationChoose,
  //   name: "navigationChoose"
  // },
  // {
  //   path: "/address",
  //   component: Address,
  //   name: "address"
  // },
  /**
   * tab标签切换选择下载和下载完内容
   */
  // {
  //   path: "/downloadManager",
  //   component: downloadManager,
  //   name: "downloadManager"
  // },
];

const router = new VueRouter({ routes, mode: "hash" });
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = true;
//   if (to.name !== "login" && !isAuthenticated) next({ name: "login" });
//   else next();
// });
export default router;
