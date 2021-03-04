import Vue from "vue";
import Router from "vue-router";
import GeoVis from "./GeoVis.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "/", component: GeoVis, },
    { path: "/move.html", component: GeoVis, },
    { path: "/ot.html", component: GeoVis, },
  ]
});
