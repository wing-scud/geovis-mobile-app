<template>
  <div>
    <div class="gv-info-panel">
      <div slot="header" class="gv-info-item">
        <span>漫游</span>
        <el-switch v-model="enabled" @change="toggleEnabled" active-color="#409eff"></el-switch>
        <div class="gv-info-item">
          <span class="text item">双击选中漫游路线</span>
        </div>
      </div>
    </div>
    <div class="gv-info-tooltip" v-if="showTooltip">请双击选择漫游路线</div>
  </div>
</template>

<script>
import { earthStore } from "@/geovis/store";
import TrackEntityView from "./TrackEntityView";
export default {
  name: "TrackEntityView",
  components: {},
  data() {
    return {
      enabled: false,
      activeTab: "操作说明",
      center: [110, 30, 10000],
      showTooltip: false
    };
  },
  mounted() {
    this._trackEntityView = new TrackEntityView(earthStore.earth);
    window.trackEntityView = this._trackEntityView;
  },
  beforeDestroy() {
    this.clearEntity();
    this._trackEntityView.clear();
    this.showTooltip = false;
    earthStore.earth.off("doubleClick", this.pickEntity);
  },
  methods: {
    toggleEnabled() {
      if (!this.enabled) {
        this.clearEntity();
        this._trackEntityView.clear();
        this.showTooltip = false;
        earthStore.earth.off("doubleClick", this.pickEntity);
      } else {
        this.initEntity();
        this.showTooltip = true;
        earthStore.earth.on("doubleClick", this.pickEntity);
      }
    },
    pickEntity(e) {
      if (e.pickedObj && e.pickedObj instanceof GeoVis.Entity) {
        this.showTooltip = false;
        console.log(e.pickedObj);
        const data = {
          sampledPosition: e.pickedObj.position,
          orientationProperty: e.pickedObj.orientation,
          interval: e.pickedObj.availability.get(0)
        };
        const primitive = this._primitive;
        this._trackEntityView.bindPrimitive(primitive, data);
        this._trackEntityView.start();
      }
    },
    initEntity() {
      const center = this.center;
      this._path = [];
      const aircraftPosition = GeoVis.Cartesian3.fromDegrees(center[0], center[1], center[2]);
      const aircraft = GeoVis.Model.fromGltf({
        id: GeoVis.createGuid(),
        url: "../../../../../../static/data/model/Cesium_Air.glb",
        minimumPixelSize: 80,
        modelMatrix: GeoVis.Transforms.headingPitchRollToFixedFrame(aircraftPosition, new GeoVis.HeadingPitchRoll(GeoVis.Math.toRadians(-45), 0, 0))
      });
      aircraft.addTo(earthStore.earth.features);
      this._primitive = aircraft;
      this.initPathes();
      const heading = GeoVis.Math.toRadians(45.0);
      const pitch = GeoVis.Math.toRadians(-20.0);
      const range = 1000.0;
      earthStore.earth.camera.lookAt(GeoVis.Cartesian3.fromDegrees(center[0], center[1], center[2]), new GeoVis.HeadingPitchRange(heading, pitch, range));
    },
    initPathes() {
      this._paths = [];
      const center = this.center;
      const positions = [
        [center, [111, 31, 10000], [112, 33, 10000], [113, 34, 10000], [115, 35, 10000]],
        [center, [113, 30, 10000], [115, 30, 10000], [115, 32, 10000], [115, 35, 10000]],
        [center, [110, 32, 10000], [110, 35, 10000], [113, 35, 10000], [115, 35, 10000]]
      ];
      positions.map(coors => {
        const property = new GeoVis.SampledPositionProperty();
        const cartes = coors.map(coor => {
          return GeoVis.Cartesian3.fromDegrees(coor[0], coor[1], coor[2]);
        });
        let times = new Array(cartes.length).fill(GeoVis.JulianDate.now());
        times = times.map((time, index) => {
          const temp = GeoVis.JulianDate.addSeconds(time, index * 10, new GeoVis.JulianDate());
          return temp;
        });
        property.addSamples(times, cartes);
        const path = earthStore.earth.entities.add({
          availability: new GeoVis.TimeIntervalCollection([
            new GeoVis.TimeInterval({
              start: times[0],
              stop: times[times.length - 1]
            })
          ]),
          position: property,
          orientation: new GeoVis.VelocityOrientationProperty(property),
          path: {
            resolution: 1,
            material: new GeoVis.PolylineGlowMaterialProperty({
              glowPower: 0.1,
              color: GeoVis.Color.WHITE
            }),
            width: 10
          }
        });
        this._paths.push(path);
      });
    },
    clearEntity() {
      this._paths.map(path => {
        earthStore.earth.entities.remove(path);
      });
      earthStore.earth.features.remove(this._primitive);
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
