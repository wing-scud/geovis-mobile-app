import Vue from "vue";
import Home from "../view/Home.vue";
import Login from "../view/Login/Login.vue";
import Register from "../view/Login/Register.vue";
import MapSetting from "../view/Map/MapSetting.vue";
import Map from "../view/Map/Index.vue";
import Application from "../view/Plugin/Index.vue";
import Person from "../view/Person/Index.vue";
import { PathQuery, Measure } from "../geovis/plugins/Mobile-Widgets/index.js";
import SearchArea from "../geovis/plugins/Tool/SearchArea/SearchArea.vue"
import VueRouter from "vue-router";
Vue.use(VueRouter);
const routes = [
  // {
  //   path: "/",
  //   redirect: "/login"
  // },
  {
    path: "/",
    // alias:"/",
    component: Home,
    name: "index",
    redirect: "/map/search",
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
        redirect: "/map/search",
        children: [
          { path: "search", component: SearchArea, name: "search" },
          { path: "pathQuery", component: PathQuery, name: "pathQuery" },
          // { path: "pathNavigation", component: PathNavigation, name: "pathNavigation" },
          { path: "measure", component: Measure, name: "measure" }
        ]
      },
      {
        path: "plugin",
        component: Application,
        name: "default"
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
router.beforeEach((to, from, next) => {
  const isAuthenticated = true;
  if (to.name !== "login" && !isAuthenticated) next({ name: "login" });
  else next();
});
export default router;
