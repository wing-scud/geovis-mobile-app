<template>
  <div class="list">
    <div class="buttonType">
      <el-button class="buttonBasic" @click="handclick('距离量测')">距离量测</el-button>
      <el-button class="buttonBasic" @click="handclick('面积量测')">面积量测</el-button>
      <el-button class="buttonBasic" @click="handclick('三角量测')">三角量测</el-button>
    </div>
    <div class="item">
      <span class="id">序号</span>
      <span class="result">结果</span>
      <div class="operator">操作</div>
    </div>
    <div class="item" v-for="(item, index) in result" :key="index">
      <span class="id">{{ index }}</span>
      <span class="result">{{ item.measure }}</span>
      <div class="operator">
        <i class="el-icon-close delete" @click="deleteMeasure(index)" title="删除"></i>
      </div>
    </div>
  </div>
</template>
<script>
const Types = DrawHelper.Types;
import { earthStore } from "@/geovis/store";
export default {
  name: "MeasureResult",
  data() {
    return {
      result: [],
      _drawhelper: undefined
    };
  },
  mounted() {
    const earth = earthStore.earth;
    this._drawhelper = earthStore.drawHelper;
    this._primitives = [];
  },
  beforeDestroy() {
    this._drawhelper.removeAll();
  },
  methods: {
    handclick(type) {
      switch (type) {
        case "三角量测":
          this.triangleMeasure();
          break;
        case "距离量测":
          this.distanceMeasure();
          break;
        case "面积量测":
          this.areaMeasure();
          break;
        default:
          break;
      }
    },
    triangleMeasure() {
      const angleOptions = {
        color: GeoVis.Color.WHITE.withAlpha(0.8),
        computed: true,
        width: 3,
        pickTileset: true
      };
      this._drawhelper.startDrawingAngle(angleOptions);
      this.addResult("trangle");
    },
    distanceMeasure() {
      const polyOptions = {
        color: GeoVis.Color.WHITE.withAlpha(0.5),
        width: 3
      };
      this._drawhelper.startDrawingPolyline({
        type: Types.PROJ_POLYLINE,
        computed: true,
        ...polyOptions
      });
      this.addResult("distance");
    },
    deleteMeasure(index) {
      this.result.splice(index, 1);
      this._primitives[index].deleted();
      this._primitives.splice(index, 1);
    },
    areaMeasure() {
      const polyOptions = {
        color: GeoVis.Color.WHITE.withAlpha(0.5),
        width: 3
      };
      this._drawhelper.startDrawingPolygon({
        type: Types.PROJ_POLYGON,
        computed: true,
        ...polyOptions
      });
      this.addResult("area");
    },
    addResult(type) {
      const instance = this;
      this._drawhelper.once("created", function(e) {
        const id = e.entity.id;
        const arrayTag = instance._drawhelper._measureTool.tags.get(id);
        let result;
        if (type === "trangle") {
          result = arrayTag[1].text;
        } else {
          result = arrayTag[arrayTag.length - 1].text;
        }
        instance.result.push({ measure: result, type: type });
        instance._primitives.push(e.entity);
      });
    }
  }
};
</script>
<style scoped>
.list {
  width: 100%;
  padding: 10px 10px;
}
.item {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin: 10px 0;
}
.id {
  width: 35px;
}
.type {
  flex-grow: 2;
}
.result {
  flex-grow: 3;
}
.delete {
  width: 15px;
  border: 1px solid white;
  border-radius: 2px;
}
</style>
