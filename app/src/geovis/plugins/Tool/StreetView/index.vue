<template>
  <div>
    <div id="streetViewContainer">
      <!-- <button class="btn" @click="screenChange">{{fullScreen?"半屏":"全屏"}}</button> -->
    </div>
  </div>
</template>

<script>
import { earthStore } from "@/geovis/store";
import StreetViewManager from "./StreetViewManager";
export default {
  name: "StreetView",
  mounted() {
    const earth = earthStore.earth;

    const instance = this;
    const container = document.getElementById("streetViewContainer");
    fetch("static/StreetView/panoids.json")
      .then(data => data.json())
      .then(json => {
        const data = [];
        json.map(item => {
          data.push({
            panoid: item.panoid,
            lonlat: [item.lon, item.lat],
            url: `static/StreetView/panoramas/${item.lat}_${item.lon}_${item.panoid}.jpg`
          });
        });
        instance._manager = new StreetViewManager(earth, data, container);
        instance._manager.displayCoors(instance.showText);
        instance.state = instance._manager.state;
      });
  },
  data() {
    return {
      showText: undefined,
      // fullScreen:false
      state: false
    };
  },
  methods: {
    showStreetView() {
      this._manager.displayCoors(this.showText);
      this.showText = !this.showText;
    }
    // screenChange(){
    //   this.fullScreen=!this.fullScreen;
    //   const container =  document.getElementById("streetViewContainer");
    //   if(this.fullScreen){
    //    container.style.width="80%";
    //   }else{
    //     container.style.width="50%"
    //   }
    // }
  },
  watch: {
    state: {
      deep: true,
      handler() {
        const container = document.getElementById("streetViewContainer");
        if (this.state.screenShow) {
          container.style.visibility = "visible";
        } else {
          container.style.visibility = "hidden";
        }
      }
    }
  },
  beforeDestroy() {
    this._manager.destory();
  }
};
</script>
<style scoped>
.bar {
  width: 100%;
  height: 30px;
  margin: 10px 0 15px 0;
  display: inline-flex;
  flex-direction: row;
  font-size: 15px;
  text-align: center;
  color: white;
  align-items: center;
}

.button {
  font-size: 12px;
  color: white;
  height: 30px;
  background-color: #256a8a;
}
#streetViewContainer {
  /* width: 100%;
  height: calc(100% - 105px);
  color:black */
  position: absolute;
  top: 0;
  left: 60px;
  width: 50%;
  height: 90%;
  background: black;
 visibility :hidden;
 }
.btn {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100px;
  height: 50px;
}
</style>
<style>
.fullScreen{
 position:absolute!important;
 top:0!important;
 right:0!important;
 width:100px !important;
 height:100px!important;
}
</style>
