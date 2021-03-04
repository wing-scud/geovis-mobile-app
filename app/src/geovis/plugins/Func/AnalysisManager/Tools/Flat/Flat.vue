<template>
  <div>
    <div class="sliderContainer interval">
      <div>压平{{ Math.floor(flatAmount) }}&nbsp; m</div>
      <el-slider v-model="flatAmount" :min="0" :max="maxheight" :step="1" @change="updateFlatAmount"></el-slider>
    </div>
    <div class="buttonType">
      <el-button @click="addPolygon" class="buttonBasic">选择区域</el-button>
      <el-button @click="reset" class="buttonBasic">恢复</el-button>
    </div>
  </div>
</template>
<script>
import { earthStore } from "@/geovis/store";
const drawHelper = earthStore.drawHelper;
const Types = window.DrawHelper.Types;
export default {
  name: "Flat",
  data() {
    return {
      flatAmount: 0,
      height: 0,
      originFlatAmount: 0
    };
  },
  mounted() {},
  computed: {
    maxheight() {
      return this.height + 50;
    }
  },
  beforeDestroy() {
    // 自动销毁
    // this._tileset = undefined;
    this.reset();
  },
  methods: {
    choose3dTiles() {
      const earth = earthStore.earth;
      const instance = this;
      earth.once("click", e => {
        if (e.pickedObj && e.pickedObj instanceof GeoVis.GeoVis3DTileset) {
          const tileset = e.pickedObj;
          instance._tileset = tileset;
          tileset.flatMode = true;
          //正常来说应该是正的
          const transformCenter = GeoVis.Matrix4.getTranslation(tileset.root.transform, new GeoVis.Cartesian3());
          const transformCartographic = GeoVis.Cartographic.fromCartesian(transformCenter);
          const transformHeight = transformCartographic ? transformCartographic.height : 0;
          const boundingSphereHeight = GeoVis.Cartographic.fromCartesian(tileset.boundingSphere.center).height;
          const height = boundingSphereHeight - transformHeight;
          instance.originFlatAmount = tileset.flatAmount;
          // 存在负高度
          instance.height = Math.abs(height);
        } else {
          instance.$message.error("选择失败，重新点击选取按钮选取");
        }
      });
    },
    updateFlatAmount() {
      this._tileset.flatAmount = this.originFlatAmount - this.flatAmount;
    },
    addPolygon() {
      this.choose3dTiles();
      this._primitive && this._primitive.deleted();
      //@ts-ignore
      drawHelper.startDrawingPolygon({
        type: Types.SPACE_POLYGON
      });
      //@ts-ignore
      drawHelper.once("created", e => {
        if (!this._tileset) {
          this.$message.error("未选中倾斜摄影，请重新选取压平区域");
          return;
        } else {
          this._tileset.flatMode = true;
          const positions = e.entity.positions;
          this.createFlatPlane(positions);
          this._primitive = e.entity;
        }
      });
    },
    createFlatPlane(positions) {
      const clippingPlanes = this.updatePlane(positions);
      this.updateFlatAmount();
      this._tileset.clippingPlanes = clippingPlanes;
    },
    updatePlane(positions) {
      const tileset = this._tileset;
      const m = GeoVis.Transforms.eastNorthUpToFixedFrame(tileset.boundingSphere.center);
      const inverseM = GeoVis.Matrix4.inverse(m, new GeoVis.Matrix4());
      const points = positions.map(carte => GeoVis.Matrix4.multiplyByPoint(inverseM, carte, new GeoVis.Cartesian3()));
      const pointsLength = points.length;
      const clippingPlanes = [];
      for (let i = 0; i < pointsLength; ++i) {
        const nextIndex = (i + 1) % pointsLength;
        const p1 = positions[i];
        const p2 = positions[nextIndex];
        const p1Carto = GeoVis.Cartographic.fromCartesian(p1);
        p1Carto.height -= 10;
        const p1bottom = GeoVis.Cartographic.toCartesian(p1Carto);
        const p1Local = GeoVis.Matrix4.multiplyByPoint(inverseM, p1, new GeoVis.Cartesian3());
        const p2Local = GeoVis.Matrix4.multiplyByPoint(inverseM, p2, new GeoVis.Cartesian3());
        const p1bottomLocal = GeoVis.Matrix4.multiplyByPoint(inverseM, p1bottom, new GeoVis.Cartesian3());
        const v1 = GeoVis.Cartesian3.subtract(p2Local, p1bottomLocal, new GeoVis.Cartesian3());
        const v2 = GeoVis.Cartesian3.subtract(p1Local, p1bottomLocal, new GeoVis.Cartesian3());
        let normal = GeoVis.Cartesian3.cross(v1, v2, new GeoVis.Cartesian3());
        normal = GeoVis.Cartesian3.normalize(normal, normal);
        const plane = GeoVis.Plane.fromPointNormal(p1Local, normal);
        clippingPlanes.push(new GeoVis.ClippingPlane(normal, plane.distance));
      }
      // clippingPlanes= []
      clippingPlanes.push(new GeoVis.ClippingPlane(new GeoVis.Cartesian3(0.0, 0.0, -1.0), 68.8));
      return new GeoVis.ClippingPlaneCollection({
        planes: clippingPlanes,
        edgeWidth: 1.0
        // unionClippingRegions:true,
        // modelMatrix:tileset.modelMatrix
      });
    },
    reset() {
      if (this._tileset) {
        this._tileset.flatMode = false;
        this._tileset.flatAmount = this.originFlatAmount;
        this._tileset.clippingPlanes && this._tileset.clippingPlanes.removeAll();
      }
      this._primitive && (this._primitive.deleted(), (this._primitive = undefined));
    }
  }
};
</script>
<style scoped></style>
