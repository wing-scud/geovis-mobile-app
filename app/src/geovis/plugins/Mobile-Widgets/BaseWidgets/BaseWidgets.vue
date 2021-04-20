<template>
  <div id="widgets">
    <div class="time-box">{{ formateTime }}</div>
    <div id="tools" :style="`bottom: ${mapBottom}px;`">
      <div class="tool-icon" @click="handleClick($event)" style="width: 33px; height: 33px; border-radius: 33px; position: relative; right: 2px">
        <img type="button" class="tool-img3" id="compass" src="./assets/指南针.png" :style="transform" />
      </div>
      <div class="tool-icon" @click="handleClick($event)">
        <img type="button" class="tool-img2" id="lower" src="./assets/lower.png" />
      </div>
      <div class="tool-icon" @click="handleClick($event)">
        <img type="button" class="tool-img2" id="higher" src="./assets/higher.png" />
      </div>
      <div class="tool-icon" @click="handleClick($event)">
        <span type="button" class="tool-img2" id="morphTo"> {{ scene }}</span>
      </div>
      <div class="tool-icon" @click="handleClick($event)">
        <img type="button" class="tool-img" id="reset" title="复位" src="./assets/ho.png" />
      </div>
    </div>
    <div id="infobox" v-text="lonlanheight" :style="`bottom: ${mapBottom}px;`"></div>
  </div>
</template>
<script>
import { earthStore } from "@/geovis/store";
export default {
  name: "Widgets",
  data() {
    return {
      pluginMap: earthStore.state.pluginMap,
      lonlanheight: `经度:110.00,纬度:30.00`,
      degree: 30,
      transform: "transform:rotate(0deg)",
      state: earthStore.state,
      earthState: earthStore.state,
      formateTime: "",
      timeInterval: undefined
    };
  },
  mounted() {
    this.initInfobox();
    this.initCompass();
    this.timeInterval = setInterval(() => {
      this.formateTime = this.formateDate(new Date());
    }, 100);
  },
  computed: {
    mapBottom() {
      return this.earthState.pluginMap["Timeline"]?.enabled ? 44 : 0;
    },
    scene: function() {
      const texts = ["3D球", "2D球", "2D图"];
      const modes = ["globe3", "globe2", "map"];
      //@ts-ignore
      return texts[modes.indexOf(this.state.mode)];
    },
    modeMap: function() {
      const modes = ["globe3", "globe2", "map"];
      const index = modes.indexOf(this.state.mode);
      return index < 2 ? "globe" : "map";
    }
  },
  methods: {
    formateDate(date) {
      const year = date.getFullYear();
      let month = date.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      let days = date.getDate();
      if (days < 10) {
        days = "0" + days;
      }
      let hours = date.getHours();
      if (hours < 10) {
        hours = "0" + hours;
      }
      let minutes = date.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      let seconds = date.getSeconds();
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return `${year}-${month}-${days}  ${hours}:${minutes}:${seconds}`;
    },
    handleClick(event) {
      const id = event.target.id;
      const earth = window.earth;
      const map = earthStore._map;
      switch (id) {
        case "compass":
          earth.camera.flyTo({
            destination: earth.camera.position
          });
          break;
        case "higher":
          if (this.modeMap === "globe") {
            earth.camera.zoom("out");
          } else {
            map.zoomOut();
          }
          break;
        case "lower":
          if (this.modeMap === "globe") {
            earth.camera.zoom("in");
          } else {
            map.zoomIn();
          }
          break;
        case "morphTo":
          this.changeMapMode();
          break;
        case "reset":
          if (this.modeMap === "globe") {
            earth.camera.flyHome(1);
          } else {
            map.setCenter([120, 30]);
            map.setZoom(0);
          }
          break;
        default:
          break;
      }
    },
    changeMapMode() {
      const modes = ["globe3", "globe2", "map"];
      let index = modes.indexOf(this.state.mode);
      if (index + 1 > 2) {
        index = -1;
      }
      const value = modes[index + 1];
      if (value === "globe2") {
        earth.scene.mode = GeoVis.SceneMode.SCENE2D;
      } else if (value === "globe3") {
        earth.scene.mode = GeoVis.SceneMode.SCENE3D;
      }
      this.state.mode = value;
    },
    initInfobox() {
      window.earth.on("mouseMove", e => {
        if (!e.lonlat) return;
        const [lon, lat, height] = e.lonlat;
        const level = earthStore.earth.camera.heightTozoom(earthStore.earth.camera.positionCartographic.height);
        this.lonlanheight = `经度:${lon.toFixed(3)},纬度:${lat.toFixed(4)}`;
      });
      const map = earthStore._map;
      map.on("mousemove", e => {
        if (!e.lngLat) return;
        const lon = e.lngLat.lng;
        const lat = e.lngLat.lat;
        this.lonlanheight = `经度:${lon.toFixed(3)},纬度:${lat.toFixed(4)}`;
      });
    },
    initCompass() {
      const earth = window.earth;
      earth.camera.percentageChanged = 0;
      earth.camera.changed.addEventListener(() => {
        const degree = 360 - earth.camera.heading * 57.29578;
        this.transform = `transform:rotate(${degree}deg)`;
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.timeInterval);
  }
};
</script>
<style scoped>
#tools {
  position: absolute;
  width: 30px;
  bottom: 0;
  right: 5px;
  z-index: 5;
}
.tool-icon {
  background: #263238 no-repeat center center;
  border-radius: 3px;
  display: block;
  height: 30px;
  width: 30px;
  line-height: 30px;
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
}
.tool-img {
  height: 20px;
  width: 20px;
  vertical-align: middle;
}
#infobox {
  position: absolute;
  bottom: 0;
  left: 0;
  color: #fff;
  font-size: 12px;
  font-family: cursive;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 100%;
  margin: 3px 0;
  padding: 0 auto;
  text-align: center;
}

.tool-img2 {
  height: 16px;
  width: 16px;
  vertical-align: middle;
}
.tool-img3 {
  height: 25px;
  width: 25px;
  vertical-align: middle;
}

#morphTo {
  font-size: 12px;
  color: white;
  user-select: none;
  font-family: yahei;
  text-align: center;
}
.time-box {
  position: absolute;
  top: 0;
  left: 50%;
  margin: 10px 0;
  color: white;
  font-size: 15px;
  transform: translateX(-50%);
}
</style>
