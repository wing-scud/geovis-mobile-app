<template>
  <div id="widgets">
    <div id="tools" :style="`bottom: ${mapBottom}px;`">
      <div class="tool-icon" @click="handleClick($event)" style="width:33px;height:33px;border-radius:33px;position: relative;right: 2px;">
        <img type="button" class="tool-img3" id="compass" src="./assets/指南针.png" :style="transform" />
      </div>
      <div class="tool-icon" @click="handleClick($event)">
        <img type="button" class="tool-img2" id="lower" src="./assets/lower.png" />
      </div>
      <div class="tool-icon" @click="handleClick($event)">
        <img type="button" class="tool-img2" id="higher" src="./assets/higher.png" />
      </div>
      <div class="tool-icon" @click="handleClick($event)">
        <span type="button" class="tool-img2 " id="morphTo"> {{ dimension }}</span>
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
      lonlanheight: "",
      degree: 30,
      transform: "transform:rotate(0deg)",
      morphto: true,
      dimension: "3D",
      earthState: earthStore.state
    };
  },
  mounted() {
    this.initInfobox();
    this.initCompass();
  },
  computed: {
    mapBottom() {
      return this.earthState.pluginMap["Timeline"]?.enabled ? 44 : 10;
    }
  },
  methods: {
    handleClick(event) {
      const id = event.target.id;
      const earth = window.earth;
      switch (id) {
        case "compass":
          earth.camera.flyTo({
            destination: earth.camera.position
          });
          break;
        case "higher":
          earth.camera.zoom("out");
          break;
        case "lower":
          earth.camera.zoom("in");
          break;
        case "morphTo":
          if (this.morphto) {
            this.dimension = "2D";
            earth.scene.mode = GeoVis.SceneMode.SCENE2D;
          } else {
            this.dimension = "3D";
            earth.scene.mode = GeoVis.SceneMode.SCENE3D;
          }
          this.morphto = !this.morphto;
          break;
        case "reset":
          earth.camera.flyHome(1);
          break;
        default:
          break;
      }
    },
    initInfobox() {
      window.earth.on("mouseMove", e => {
        if (!e.lonlat) return;
        const [lon, lat, height] = e.lonlat;
        const level = earthStore.earth.camera.heightTozoom(earthStore.earth.camera.positionCartographic.height);
        this.lonlanheight = `经度: ${lon.toFixed(4)}, 纬度: ${lat.toFixed(4)}, 高度: ${height.toFixed(2)}, 层级: ${level.toFixed(2)}`;
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
  }
};
</script>
<style scoped>
#tools {
  position: fixed;
  width: 30px;
  bottom: 10px;
  right: 10px;
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
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 16px;
  font-family: cursive;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
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
  font-size: 14px;
  color: white;
  user-select: none;
  font-family: yahei;
}
</style>
