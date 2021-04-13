import Vue from "vue";
Vue.component("RequestPermissions", () => import("./Permission/Permission.vue"));
Vue.component("CameraPlugin", () => import("./TestFunc/camera.vue"));
Vue.component("FilePlugin", () => import("./TestFunc/file.vue"));
