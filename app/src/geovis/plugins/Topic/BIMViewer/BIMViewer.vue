<template>
  <div>
    <!-- 滑动条 -->
    <div class="slider">
      <el-slider
        v-if="state.statu==='FINISH'"
        v-model="state.opacity"
        @input="updateOpacity()"
        :min="0"
        :max="1"
        :step="0.01"
      ></el-slider>
    </div>

    <!-- 房间列表 -->
    <!-- <div class="navigation" :style="{left: left}">
      <ul class="menu-location" style="transform: translate3d(0px, -5.26485e-116px, 0px);">
        <li data-location="reception" v-for="location in state.locations" :key="location.slug"
        :class="active===location.slug||select===location.slut?'active':''"
        @mouseover="activeLocation(location)"
        @mouseout="inactiveLocation(location)"
        @click="selectLocation(location)"
        >
          <div class="folder">
            <span class="icon"></span>
            <span>{{location.name}}</span>
          </div>
        </li>
        
      </ul>
    </div> -->


    <!-- iframe  -->
    <iframe class="frame" v-if="state.room!==''" :src="`static/data/BIMViewer/roomview.html?kind=location&id=${state.room}`" >
    </iframe>
    <div class="btn-exit" v-if="state.room!==''" @click="state.room=''">退出</div>
  </div>
</template>

<script>
import { buildingApp } from "./BuildingApp";
import "./style.css";
export default {

  name: "App",
  props:{
    left:String
  },
  data() {
    return {
      state: buildingApp.state,
      active:"",
      select:""
    };
  },
  mounted() {
    buildingApp.init();
  },
  methods: {
    updateOpacity() {
      buildingApp.setOpacity();
    },
    activeLocation(location){
      this.active=location.slug
      buildingApp.setOverLocation(location.slug)
    },
    inactiveLocation(location){
      this.active=""
      buildingApp.setOverLocation("")
    },
    selectLocation(location){
      // debugger
      this.select = location.slug
      buildingApp.setActiveLocation(location.slug)
    }
  },
  destroyed() {
    buildingApp.uninit();
    document.getElementById("threeContainer").innerHTML = ""
  }
};
</script>

<style scoped>

.frame{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  height: 100%;
}
.slider {
  position: fixed;
  top: 60px;
  right: 100px;
  width: 220px;
  height: 35px;
}
 .btn-exit {
position: fixed;
    top: 80px;
    right: 20px;
    height: 40px;
    color: white;
    width: 77px;
    line-height: 40px;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.7);
    cursor: pointer;
    user-select: none;
} 
.btn-exit:before {
    line-height: 55px;
    width: 55px;
    font-size: 42px;
}

.navigation{
    position: fixed;
  left: 20px;
  top: 50%;
  transition: left ease-in-out 0.28s;
  user-select: none;
  transform: translateY(-50%);
  width: 220px;
  font-family: 'Oswald', sans-serif;
    text-transform: uppercase;
    font-size: 12px;
    color: white;
}
.navigation li {
    list-style: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
}

.navigation ul.menu-location > li > .folder {
    display: block;
    padding: 12px 13px;
    margin-bottom: 10px;
    text-align: left;
    background-color: rgba(0, 0, 0, 0.65);
    transition: background-color 200ms ease-out;
}

.navigation ul.menu-location > li > .folder .icon {
    display: inline-block;
    margin-right: 8px;
    width: 15px;
    height: 15px;
    line-height: 15px;
    text-align: center;
    font-family: 'Arial', 'Helvetica', sans-serif;
    font-size: 15px;
    font-family: 'icomoon' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.navigation .active{
  background: rgba(226,6,6,0.65);
}
</style>