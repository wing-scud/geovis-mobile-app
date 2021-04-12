import Vue from "vue";
//修改为异步组件加载
import VueRouter from "vue-router";
import mobileStore from "@/store/index.js";
Vue.use(VueRouter);
import { earthStore } from "../geovis/store/index.js";
import Map from "../view/Map/Index.vue";
const Home = () => import("../view/Home.vue");
const Person = () => import("../view/Person/Index.vue");
const SearchArea = () => import("../geovis/plugins/Mobile-Widgets/SearchArea/SearchArea.vue");
const PathPlan = () => import("../geovis/plugins/Mobile-Widgets/PathPlan/PathPlan.vue");
const Plot = () => import("../geovis/plugins/Mobile-Widgets/Plot/Plot.vue");
const Application = () => import("../view/Plugin/Index.vue");
const Login = () => import("../view/Login/Login.vue");
const Register = () => import("../view/Login/Register.vue");
const MapSetting = () => import("../view/Map/MapSetting.vue");
const Star = () => import("../view/Star/Star.vue");
const ServiceAddress = () => import("../view/Setting/ServiceAddress.vue");
const PersonInfor = () => import("../view/Person/PersonInfor.vue");
const EditPersonInfor = () => import("../view/Person/EditPersonInfor.vue");
const AccountAndSafe = () => import("../view/Person/AccountAndSafe.vue");
const DownloadManager = () => import("../view/Download/Index.vue");
const CameraTest = () => import("../view/Camera/index.vue");
const routes = [
  {
    path: "/",
    component: Home,
    name: "Index",
    redirect: "/camera",
    children: [
      {
        path: "person",
        component: Person,
        name: "Person",
        meta: {
          requireLogin: true
        }
      },
      {
        name: "Map",
        path: "map",
        component: Map,
        children: [
          { path: "searchArea", component: SearchArea, name: "SearchArea" },
          { path: "pathPlan", component: PathPlan, name: "PathPlan" },
          { path: "plot", component: Plot, name: "Plot" }
        ],
        meta: {
          keepAlive: true
        }
      },
      {
        path: "application",
        component: Application,
        name: "Application"
      }
    ],
    meta: {
      keepAlive: true
    }
  },
  { path: "/login", component: Login, name: "Login" },
  { path: "/register", component: Register, name: "Register" },
  {
    path: "/mapSetting",
    component: MapSetting,
    name: "MapSetting"
  },
  {
    path: "/star",
    component: Star,
    name: "Star",
    meta: {
      requireLogin: true
    }
  },
  {
    path: "/serviceAddress",
    component: ServiceAddress,
    name: "ServiceAddress",
    meta: {
      requireLogin: true
    }
  },
  {
    path: "editPersonInfor",
    component: EditPersonInfor,
    name: "EditPersonInfor",
    meta: {
      requireLogin: true
    }
  },
  {
    path: "accountAndSafe",
    component: AccountAndSafe,
    name: "AccountAndSafe",
    meta: {
      requireLogin: true
    }
  },
  {
    path: "personInfor",
    component: PersonInfor,
    name: "PersonInfor",
    meta: {
      requireLogin: true
    }
  },
  /**
   * tab标签切换选择下载和下载完内容
   */
  {
    path: "/downloadManager",
    component: DownloadManager,
    name: "DownloadManager"
  },  {
    path: "/camera",
    component: CameraTest,
    name: "CameraTest"
  }
];

const router = new VueRouter({ routes, mode: "hash" });
router.beforeEach((to, from, next) => {
  if (to.meta.requireLogin) {
    if (mobileStore.state.user.user) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else {
    next();
  }
});
//返回触发，不会再进行mounted ，需要手动传参（保存每次进入一个页面的所有参数，动态返回）
let back = false;
router.afterEach((to, from) => {
  if (to.name === from.name) {
    return;
  }
  const pluginMap = earthStore.state.pluginMap;
  if (back) {
    if (pluginMap[from.name]) {
      //如果没有触发关闭状态，主动关闭
      if (pluginMap[from.name].active) {
        pluginMap[from.name].active = false;
        console.log(`主动关闭${from.name}`);
      }
    }
    back = false;
  }
});
window.addEventListener(
  "popstate",
  function(e) {
    console.info("返回触发");
    e.preventDefault();
    back = true;
  },
  false
);
export default router;
