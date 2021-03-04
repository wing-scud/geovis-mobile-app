<template>
  <div>
    <!-- 中间信息框 -->
    <div class="gv-info-panel">
      <div slot="header" class="gv-info-item">
        <span>第三人称视角</span>
        <el-switch v-model="enabled" @change="toggleEnabled" active-color="#409eff"></el-switch>
      </div>
      <div class="gv-info-item">
        <div class="text-item">加速:Z,减速:X;调整朝向---左:S,右:D</div>
        <div class="text-item">调整仰角:上:Q,下:E;后退:S,前进:W</div>
      </div>
    </div>
    <!-- 中间提示框 -->
    <div class="gv-info-tooltip" v-if="showTooltip">请双击选择模型</div>
  </div>
</template>

<script>
import { earthStore } from "@/geovis/store";
import ThirdPersonViewer from "./ThirdPersonViewer";
export default {
  name: "ThirdPersonView",
  components: {},
  data() {
    return {
      enabled: false,
      showTooltip: false,
      activeTab: "操作说明"
    };
  },
  mounted() {
    this._thirdPersonViewer = new ThirdPersonViewer(earthStore.earth);
    window.thirdPersonViewer = this._thirdPersonViewer;
  },
  beforeDestroy() {
    this.clearEntities();
    this._thirdPersonViewer.close();
    this.showTooltip = false;
    earthStore.earth.off("doubleClick", this.pickEntity);
  },
  methods: {
    toggleEnabled() {
      if (!this.enabled) {
        this.clearEntities();
        this._thirdPersonViewer.close();
        this.showTooltip = false;
        earthStore.earth.off("doubleClick", this.pickEntity);
      } else {
        this.initEntities();
        this.showTooltip = true;
        earthStore.earth.on("doubleClick", this.pickEntity);
      }
    },
    pickEntity(e) {
      if (e.pickedObj) {
        console.log(e.pickedObj);
        this.showTooltip = false;
        this._thirdPersonViewer.primitive = e.pickedObj;
        this._thirdPersonViewer.open();
      }
    },
    initEntities() {
      const center = [110, 30, 0];
      this._entities = [];
      const positions = [];
      const aircraftPosition = GeoVis.Cartesian3.fromDegrees(center[0] - 0.02, center[1] - 0.02, center[2] + 3000);
      positions.push(aircraftPosition);
      const aircraft = GeoVis.Model.fromGltf({
        id: GeoVis.createGuid(),
        url: "../../../../../../static/data/model/Cesium_Air.glb",
        minimumPixelSize: 80,
        modelMatrix: GeoVis.Transforms.eastNorthUpToFixedFrame(aircraftPosition)
      });
      aircraft.addTo(earthStore.earth.features);
      this._entities.push(aircraft);
      const shipPosition = GeoVis.Cartesian3.fromDegrees(center[0] - 0.02, center[1] + 0.02, center[2] + 0);
      positions.push(aircraftPosition);
      const ship = GeoVis.Model.fromGltf({
        id: GeoVis.createGuid(),
        url: "../../../../../../static/data/model/ship.glb",
        minimumPixelSize: 80,
        modelMatrix: GeoVis.Transforms.eastNorthUpToFixedFrame(shipPosition)
      });
      ship.addTo(earthStore.earth.features);
      this._entities.push(ship);
      const carPosition = GeoVis.Cartesian3.fromDegrees(center[0] + 0.02, center[1] + 0, center[2] + 0);
      positions.push(aircraftPosition);
      const car = GeoVis.Model.fromGltf({
        id: GeoVis.createGuid(),
        url: "../../../../../../static/data/model/milkcar.glb",
        minimumPixelSize: 80,
        modelMatrix: GeoVis.Transforms.eastNorthUpToFixedFrame(carPosition)
      });
      car.addTo(earthStore.earth.features);
      this._entities.push(car);
      //设置视角恰好看见所有的模型
      const heading = GeoVis.Math.toRadians(90.0);
      const pitch = GeoVis.Math.toRadians(-20.0);
      const range = 10000.0;
      const boundingsphere = GeoVis.BoundingSphere.fromPoints(positions, new GeoVis.BoundingSphere());
      earthStore.earth.camera.flyToBoundingSphere(boundingsphere, {
        offset: new GeoVis.HeadingPitchRange(heading, pitch, range),
        duartion: 0
      });
    },
    clearEntities() {
      this._entities.length >= 0 &&
        this._entities.map(entity => {
          earthStore.earth.features.remove(entity);
        });
      this._entities = [];
    }
  }
};
</script>

<style scoped>
.gv-info-panel {
  position: absolute;
  flex-wrap: wrap;
  display: flex;
  top: 65px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 300px;
  height: 80px;
  background-color: rgba(38, 50, 56, 0.6);
  overflow: hidden;
  color: white;
  font-size: 12px;
  text-align: cenetr;
  border-radius: 10px;
}

.gv-info-item {
  width: 100%;
  padding: 6px 5px 0px 5px;
}
.gv-targets-panel {
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  transform: (0, -50%);
  right: 20px;
  width: 300px;
  height: 400px;
  background-color: rgb(38, 50, 56);
  overflow: hidden;
  color: white;
  font-size: 14px;
  text-align: left;
  border: none;
}

.gv-targets-panel .header {
  font-size: 14px;
}

.gv-info-tooltip {
  border-radius: 8px;
  background-color: #8f8f8f9c;
  color: white;
  position: absolute;
  transform: translate(-50%, 0);
  top: 160px;
  left: 50%;
  width: 200px;
  height: 28px;
}

.gv-target-list {
  width: 100%;
}
</style>
