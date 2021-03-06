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
const RouteNav = () => import("../geovis/plugins/Mobile-Widgets/RouteNav/Index.vue");
const Plot = () => import("../geovis/plugins/Mobile-Widgets/Plot/Plot.vue");
const BufferAnalytics = () => import("../geovis/plugins/Mobile-Widgets/Tool/BufferAnalytics.vue");
const Application = () => import("../view/Plugin/Index.vue");
const Login = () => import("../view/Login/Login.vue");
const Register = () => import("../view/Login/Register.vue");
const MapSetting = () => import("../view/Map/MapSetting.vue");
const Star = () => import("../view/Star/Star.vue");
const ServiceAddress = () => import("../view/System/ServiceAddress.vue");
const About = () => import("../view/System/About.vue");
const Feedback = () => import("../view/System/Feedback.vue");
const Universal = () => import("../view/System/Universal.vue");
const PersonInfor = () => import("../view/Person/PersonInfor.vue");
const EditPersonInfor = () => import("../view/Person/EditPersonInfor.vue");
const AccountAndSafe = () => import("../view/Person/AccountAndSafe.vue");
const DownloadManager = () => import("../view/Download/Index.vue");
const ChatIndex = () => import("../view/Chat/Index.vue");
const News = () => import("../view/News/Index.vue");
const Test = () => import("../view/Test/index.vue");
const routes = [
  {
    path: "/",
    component: Home,
    name: "Index",
    redirect: "/map",
    // redirect: "/test",
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
          { path: "routeNav", component: RouteNav, name: "RouteNav" },
          { path: "plot", component: Plot, name: "Plot" },
          { path: "bufferAnalytics", component: BufferAnalytics, name: "BufferAnalytics" }
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
  },
  {
    path: "/test",
    component: Test,
    name: "Test"
  }, {
    path: "/about",
    component: About,
    name: "About"
  }, {
    path: "/feedback",
    component: Feedback,
    name: "Feedback"
  }, {
    path: "/universal",
    component: Universal,
    name: "Universal"
  }, {
    path: "/chatIndex",
    component: ChatIndex,
    name: "ChatIndex"
  }, {
    path: "/news",
    component: News,
    name: "News"
  }
];

const router = new VueRouter({ routes, mode: "hash" });
/* 路由前进回退机制 */
let back = false;
router.routerHistory = [];
router.beforeResolve((to, from, next) => {
  //链判断操作符
  let nextPath = to;
  if (to.meta?.requireLogin) {
    if (mobileStore.state.user.user) {
      // nextPath = to;
    } else {
      nextPath = { name: "Login" };
    }
  }
  back ? "" : router.routerHistory.push(to);
  next(nextPath === to ? undefined : nextPath);
});
router.backward = function (step) {
  const length = router.routerHistory.length;
  if (length <= step) {
    return;
  } else {
    back = true;
    const pastRoute = router.routerHistory[length - 2];
    router.routerHistory.pop();
    router.push(pastRoute);
  }
};
router.afterEach((to, from) => {
  console.log("afterEach");
  if (to.name === from.name) {
    return;
  }
  back = false;
  // const pluginMap = earthStore.state.pluginMap;
  // if (back) {
  //   if (pluginMap[from.name]) {
  //     //如果没有触发关闭状态，主动关闭
  //     if (pluginMap[from.name].active) {
  //       pluginMap[from.name].active = false;
  //       console.log(`主动关闭${from.name}`);
  //     }
  //   }
  // }
});
window.addEventListener(
  "popstate",
  function (e) {
    console.info("浏览器回退触发", e);
    e.preventDefault();
    // back = true;
  },
  false
);
document.addEventListener(
  "backbutton",
  e => {
    router.backward(-1);
    console.log("回退按钮", e);
  },
  false
);
export default router;
