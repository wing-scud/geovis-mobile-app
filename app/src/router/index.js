import Vue from "vue";
import Home from "../view/Home.vue";
import Login from "../view/Login/Login.vue";
import Register from "../view/Login/Register.vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const routes = [
  { path: "/", redirect: { path: "/login" } },
  { path: "/index", component: Home, name: "home" },
  { path: "/login", component: Login, name: "login" },
  { path: "/register", component: Register, name: "register" }
];

const router = new VueRouter({ routes, mode: "hash" });
router.beforeEach((to, from, next) => {
  const isAuthenticated = true;
  if (to.name !== "login" && !isAuthenticated) next({ name: "login" });
  else next();
});
export default router;
