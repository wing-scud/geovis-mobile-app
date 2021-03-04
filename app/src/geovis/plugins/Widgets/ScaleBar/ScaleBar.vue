<template>
  <!-- 比例尺面板 -->
  <div class="scale-container" :style="`bottom: ${mapBottom}px;`">
    <div class="scale-label">{{ distanceLabel || "" }}</div>
    <div v-if="barWidth" class="scale-bar" :style="{ width: barWidth + 'px' }"></div>
  </div>
</template>

<script>
import { earthStore } from "@/geovis/store";
const geodesic = new GeoVis.EllipsoidGeodesic();
const distances = [1, 2, 3, 5, 10, 20, 30, 50, 100, 200, 300, 500, 1000, 2000, 3000, 5000, 10000, 20000, 30000, 50000, 100000, 200000, 300000, 500000, 1000000, 2000000, 3000000, 5000000, 10000000, 20000000, 30000000, 50000000];
export default {
  name: "ScaleBar",
  data() {
    return {
      distanceLabel: undefined,
      barWidth: undefined,
      earthState: earthStore.state
    };
  },
  mounted() {
    earthStore.earth.camera.on("change", this.updateScale);
    this.updateScale();
  },
  beforeDestroy() {
    earthStore.earth.camera.off("change", this.updateScale);
  },
  computed: {
    mapBottom() {
      return this.earthState.pluginMap["Timeline"]?.enabled ? 44 : 10;
    }
  },
  methods: {
    // 比例尺
    updateScale() {
      // Find the distance between two pixels at the bottom center of the screen.
      const scene = earthStore.earth.scene;
      const width = scene.canvas.clientWidth;
      const height = scene.canvas.clientHeight;

      const left = scene.camera.getPickRay(new GeoVis.Cartesian2((width / 2) | 0, height - 1));
      const right = scene.camera.getPickRay(new GeoVis.Cartesian2((1 + width / 2) | 0, height - 1));

      const globe = scene.globe;
      const leftPosition = globe.pick(left, scene);
      const rightPosition = globe.pick(right, scene);

      if (!GeoVis.defined(leftPosition) || !GeoVis.defined(rightPosition)) {
        this.barWidth = undefined;
        this.distanceLabel = undefined;
        return;
      }

      const leftCartographic = globe.ellipsoid.cartesianToCartographic(leftPosition);
      const rightCartographic = globe.ellipsoid.cartesianToCartographic(rightPosition);

      geodesic.setEndPoints(leftCartographic, rightCartographic);
      const pixelDistance = geodesic.surfaceDistance;

      // Find the first distance that makes the scale bar less than 100 pixels.
      const maxBarWidth = 100;
      let distance;
      for (let i = distances.length - 1; !GeoVis.defined(distance) && i >= 0; --i) {
        if (distances[i] / pixelDistance < maxBarWidth) {
          distance = distances[i];
        }
      }

      if (GeoVis.defined(distance)) {
        const label = distance >= 1000 ? (distance / 1000).toString() + " km" : distance.toString() + " m";
        this.barWidth = (distance / pixelDistance) | 0;
        this.distanceLabel = label;
      } else {
        this.barWidth = undefined;
        this.distanceLabel = undefined;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.template-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.scale-container {
  position: absolute;
  z-index: 1001;
  left: 60px;
  bottom: 44px;
  width: 120px;
  height: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
}
.scale-label {
  font-size: 12px;
  color: #fff;
  text-align: center;
}
.scale-bar {
  position: relative;
  padding-top: 10px;
}
.scale-bar::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 10px;
  border: 1px solid #fff;
  border-top: none;
  left: 0;
  bottom: 0;
}
</style>
