<template>
  <div class="aerialView" :style="`bottom: ${mapBottom}px;`">
    <div class="map" :style="`width:${mapWidth}px;height:${mapHeight}px;`">
      <img class="location" src="./assets/location.png" :style="`left:${locationLeft}px;bottom:${locationBottom}px;width:${locationWidth}px;height:${locationHeight}px`" />
    </div>
  </div>
</template>

<script>
import { earthStore } from "@/geovis/store";
// import EarthStore from '@/geovis/store';
export default {
  name: "AerialView",
  props: {
    earthStore: {
      type: Object,
      default: () => {
        return { state: {} };
      }
    }
  },
  data() {
    return {
      mapWidth: 300,
      mapHeight: 150,
      locationWidth: 30,
      locationHeight: 30,
      locationBottom: 0,
      locationLeft: 0,
      earthReady: false
    };
  },
  watch: {},
  computed: {
    mapBottom() {
      return earthStore.state.pluginMap["Timeline"]?.enabled ? 44 : 10;
    }
  },
  mounted() {
    earth.camera.changed.addEventListener(this.updatePostion);
  },
  destroyed() {
    earth.camera.changed.removeEventListener(this.updatePostion);
  },
  methods: {
    updatePostion() {
      const lon = (earth.camera.positionCartographic.longitude + Math.PI) / (Math.PI * 2);
      const lat = (earth.camera.positionCartographic.latitude + Math.PI / 2) / Math.PI;
      this.locationLeft = this.mapWidth * lon - this.locationWidth / 2;
      this.locationBottom = this.mapHeight * lat - this.locationHeight / 2;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.aerialView {
  position: absolute;
  right: 50px;
  bottom: 10px;
}
.map {
  position: relative;
  background-repeat: round;
  background-image: url("./assets/earth.jpg");
  /* ; */
}
.location {
  position: absolute;
  width: 40px;
  height: x 40px;
}
</style>
