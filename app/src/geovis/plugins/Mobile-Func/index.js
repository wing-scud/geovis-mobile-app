import Vue from "vue";
Vue.component("RequestPermissions", () => import("./Permission/Permission.vue"));
Vue.component("CameraPlugin", () => import("./CameraAndPhotos/index.vue"));

