import Vue from "vue";
//修改为异步组件加载
import Map from "../view/Map/Index.vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    component: () => import("../view/Home.vue"),
    name: "index",
    redirect: "/map",
    children: [
      {
        path: "person",
        component: () => import("../view/Person/Index.vue"),
        name: "Person"
      },
      {
        name: "Map",
        path: "map",
        component: Map,
        children: [
          { path: "searchArea", component: () => import("../geovis/plugins/Mobile-Widgets/SearchArea/SearchArea.vue"), name: "SearchArea" },
          { path: "pathPlan", component: () => import("../geovis/plugins/Mobile-Widgets/PathPlan/PathPlan.vue"), name: "PathPlan" },
          { path: "plot", component: () => import("../geovis/plugins/Mobile-Widgets/Plot/Plot.vue"), name: "Plot" }
        ],
        meta: {
          keepAlive: true
        }
      },
      {
        path: "application",
        component: () => import("../view/Plugin/Index.vue"),
        name: "Application"
      }
    ],
    meta: {
      keepAlive: true
    }
  },
  { path: "/login", component: () => import("../view/Login/Login.vue"), name: "Login" },
  { path: "/register", component: () => import("../view/Login/Register.vue"), name: "Register" },
  {
    path: "/mapSetting",
    component: () => import("../view/Map/MapSetting.vue"),
    name: "MapSetting"
  },{
    path: "/star",
    component: () => import("../view/Star/Star.vue"),
    name: "Star"
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
