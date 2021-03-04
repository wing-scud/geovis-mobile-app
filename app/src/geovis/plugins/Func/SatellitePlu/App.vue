<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// Font awesome setup 
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faLayerGroup, faGlobeAfrica, faMobileAlt, faHammer, faEye, faRedo, faInfo, faBell } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
library.add(faLayerGroup, faGlobeAfrica, faMobileAlt, faHammer, faEye, faRedo, faInfo, faBell, faGithub);
dom.watch();
// import "buefy/dist/buefy.css";
import "./css/main.css";

// import  "./move.js";
// import "./ot.js";
import router from "./components/Router";
export default {
// components:{
//    "router-view":router
// }
};
</script>
