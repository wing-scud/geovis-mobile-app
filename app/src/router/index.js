import Vue from "vue";
import Index from "../view/Map/Index.vue"
import Login from "../view/Login/Login.vue";
import Register from "../view/Login/Register.vue";
import MapSetting from "../view/Map/MapSetting.vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const routes = [
  { path: "/", redirect: { path: "/login" } },
  {
    path: "/index",
    component: Index,
    name: "index"
  },
  { path: "/login", component: Login, name: "login" },
  { path: "/register", component: Register, name: "register" },

  {
    path: "/mapsetting",
    component: MapSetting,
    name: "mapsetting"
  }
];

const router = new VueRouter({ routes, mode: "hash" });
router.beforeEach((to, from, next) => {
  const isAuthenticated = true;
  if (to.name !== "login" && !isAuthenticated) next({ name: "login" });
  else next();
});
export default router;
