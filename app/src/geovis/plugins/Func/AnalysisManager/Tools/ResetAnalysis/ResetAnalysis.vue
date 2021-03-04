<template>
  <div>
    <div class="bufferType interval">
      <el-button class="button" @click="firstArea"> 选取区域1 </el-button>
      <el-button class="button" @click="seconedArea"> 选取区域2 </el-button>
      <el-button class="button" @click="useIntersect"> 重置分析 </el-button>
    </div>
    <div class="interval option">
      <!-- <el-button class="button right" @click="savaResults">
        保存结果
      </el-button> -->
      <el-button class="button left" @click="reset">
        清除
      </el-button>
    </div>
    <!-- <div class="results interval" v-for="(savedata, index) in saveData" :key="index" @click="reappear(index)">
      <input v-if="savedata.name" :value="savedata.name" readonly="true" />
      <gv-icon slot="suffix" class="close-btn" icon=" #icon-baseline-clear-px" width="24" height="24" @click="removeData(index)"></gv-icon>
      <gv-icon slot="suffix" class="close-btn" icon=" #icon-baseline-remove-px" width="24" height="24" @click="editData(index)"></gv-icon>
    </div> -->
  </div>
</template>
<script>
import { earthStore } from "@/geovis/store";
const turf = window.turf;
export default {
  name: "ResetAnalysis",
  data() {
    return {
      saveData: [],
      _firstLonLat: undefined,
      _seconedLonLat: undefined,
      _intersectLonLat: undefined
    };
  },
  mounted() {
    this._results = [];
  },
  beforeDestroy() {
    this.reset();
  },
  methods: {
    reappear(index) {
      this.reset();
      const theme = this.saveData[index];
      this._firstLonLat = theme._firstLonLat;
      this._seconedLonLat = theme._seconedLonLat;
      this.createPolygon(GeoVis.Color.BLUE.withAlpha(0.4), this._firstLonLat);
      this.createPolygon(GeoVis.Color.BLUE.withAlpha(0.4), this._seconedLonLat);
      this._intersectLonLat = theme._intersectLonLat;
      this.createPolygon(GeoVis.Color.RED.withAlpha(0.7), this._intersectLonLat);
    },
    removeData(index) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.saveData.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editData(index) {
      this.$prompt("场景名称", "修改", {
        dangerouslyUseHTMLString: true
        // callback:this.pushData
      }).then(({ value }) => {
        this.savedata[index].name = value;
      });
    },
    savaResults() {
      this.$prompt("确认你的主题名称", "提示", {
        dangerouslyUseHTMLString: true
        // callback:this.pushData
      }).then(({ value }) => {
        const data = {
          name: value,
          _firstLonLat: this._firstLonLat,
          _seconedLonLat: this._seconedLonLat,
          _intersectLonLat: this._intersectLonLat
        };
        this.saveData.push(data);
      });
    },
    drawPolygon() {
      const lonlats = [];
      const instance = this;
      const drawHelper = earthStore.drawHelper;
      const Types = window["DrawHelper"].Types;
      drawHelper.startDrawingPolygon({
        id: Math.random() * 10,
        color: GeoVis.Color.fromCssString("#009688").withAlpha(0.3),
        type: Types.PROJ_POLYGON
      });
      return new Promise(resolve => {
        drawHelper.once("created", e => {
          const position = e.entity.positions;
          position.map(cartesian => {
            const pos = this.cartesianToLonlat(cartesian);
            lonlats.push(pos);
          });
          lonlats.push(lonlats[0]);
          instance.createPolygon(GeoVis.Color.BLUE.withAlpha(0.4), position);
          drawHelper.primitives.remove(e.entity);
          resolve(lonlats);
        });
      });
    },
    cartesianToLonlat(cartesian) {
      const ellipsoid = earth.scene.globe.ellipsoid;
      const cartographic = ellipsoid.cartesianToCartographic(cartesian);
      const lat = GeoVis.Math.toDegrees(cartographic.latitude);
      const lng = GeoVis.Math.toDegrees(cartographic.longitude);
      return [lng, lat];
    },
    async firstArea() {
      const lonlats = await this.drawPolygon();
      this._firstLonLat = lonlats;
    },
    async seconedArea() {
      const lonlats = await this.drawPolygon();
      this._seconedLonLat = lonlats;
    },
    useIntersect() {
      const poly1 = turf.polygon([this._firstLonLat]);
      const poly2 = turf.polygon([this._seconedLonLat]);
      const intersection = turf.intersect(poly1, poly2);
      this._intersectLonLat = intersection.geometry.coordinates[0];
      this.createPolygon(GeoVis.Color.RED.withAlpha(0.7), intersection.geometry.coordinates[0]);
    },
    reset() {
      this._results.map(poly => poly.removeFrom(earthStore.earth.features));
      this._results = [];
    },
    createPolygon(color, position) {
      const polygon = new GeoVis.Polygon(position, {
        fill: true,
        fillColor: color
      }).addTo(earth.features);
      this._results.push(polygon);
      return polygon;
    }
  }
};
</script>

<style lang="scss" scoped>
.right {
  float: right;
}
.interval {
  margin: 10px 0;
}
.bufferType {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-wrap: nowrap;
  justify-content: space-around;
}
.option {
  width: 100%;
  height: 50px;
}
.left {
  float: left;
}
.bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
}
.button {
  height: 40px;
  background-color: #313b44;
}

.results{
    width:288px;
    height:35px;
    line-height:35px;
    padding-left:20px;
    border:1px solid rgb(91,102,114);
    margin:10px 0;
    /* background:rgb(33,33,33) */ 
    overflow: hidden;
 }
 .results:hover,.results input:hover{
     cursor: pointer;
 }
 .results input{
     display:inline-block;
     width:220px;
     background:transparent;
     color:white;
     height:30px;
     border:0;
     outline:none;
  }
.close-btn {
    float: right;
    background:transparent;
    width: 34px;
    text-align:center;
    cursor: pointer;
    vertical-align: middle;
   }
</style>
