<template>
  <div class="mainPart">
    <div class="sliderContainer interval">
      <div>缓冲区半径&nbsp;&nbsp;&nbsp;{{ radius }}&nbsp; m</div>
      <el-slider v-model="radius" :min="0" :max="1000"></el-slider>
    </div>
    <div class="buttonType interval">
      <template v-for="type in types">
        <el-button @click="draw(type)" :key="type" class="buttonBasic">{{ type }} </el-button>
      </template>
    </div>
    <div class="bottom">
      <el-button @click="clearBuffer" class="left buttonBasic">清除 </el-button>
      <el-button @click="bufferStart" class="right buttonBasic">生成缓冲区 </el-button>
    </div>
  </div>
</template>

<script>
import { earthStore } from "@/geovis/store";
const turf = window["turf"];
const icons = [];
const Types = DrawHelper.Types;
export default {
  name: "Buffer",
  data() {
    return {
      coor: "",
      radius: 100,
      _primitive: undefined,
      types: ["画点", "画线", "画多边形"]
    };
  },
  mounted() {
    const earth = earthStore.earth;
  },
  computed: {},
  methods: {
    bufferStart() {
      if (this._primitive instanceof GeoVis.Point) {
        this.addPointBuffer();
      } else if (this._primitive.type === 4) {
        this.addPolygonBuffer();
      } else if (this._primitive.type === 7) {
        this.addPolylineBuffer();
      }
    },
    draw(type) {
      switch (type) {
        case "画点":
          this.addPoint();
          break;
        case "画线":
          this.addLine();
          break;
        case "画多边形":
          this.addPolygon();
          break;
      }
    },
    addPoint() {
      const page = this;
      earth.once("click", function(e) {
        const position = e.lonlat;
        const point = new GeoVis.Point(position, {
          pixelSize: 15
        }).addTo(earth.features);
        page._primitive = point;
        // earth.off('click')
      });
    },
    addLine() {
      const page = this;
      const drawHelper = earthStore.drawHelper;
      //@ts-ignore
      drawHelper.startDrawingPolyline({
        type: Types.PROJ_POLYLINE
      });
      drawHelper["on"]("created", function(e) {
        const primitive = e.entity;
        page._primitive = primitive;
      });
    },
    addPolygon() {
      const page = this;
      const drawHelper = earthStore.drawHelper;
      //@ts-ignore
      drawHelper.startDrawingPolygon({
        type: Types.PROJ_POLYGON
      });
      //@ts-ignore
      drawHelper.on("created", function(e) {
        const primitive = e.entity;
        page._primitive = primitive;
      });
    },
    addPointBuffer() {
      //@ts-ignore
      const coor = GeoVis.Util.cartesianToLonlat(this._primitive.position);
      const turfPoint = turf.point(coor);
      const options = {
        units: "meters"
      };
      const buffer = turf.buffer(turfPoint, this.radius, options);
      const bufferCoors = buffer.geometry.coordinates;
      const circle = new GeoVis.Polygon(bufferCoors[0], {
        fill: true,
        fillColor: GeoVis.Color.fromCssString("#4AFD2A").withAlpha(0.5) // 填充颜色
      }).addTo(earth.features);
    },
    addPolylineBuffer() {
      let coors = this._primitive.positions;
      coors = coors.map(function(element) {
        //@ts-ignore
        return GeoVis.Util.cartesianToLonlat(element);
      });
      const turfPolyline = turf.lineString(coors);
      const options = {
        units: "meters"
      };
      const buffer = turf.buffer(turfPolyline, this.radius, options);
      const bufferCoors = buffer.geometry.coordinates;
      const polygon = new GeoVis.Polygon(bufferCoors[0], {
        fill: true,
        height: 0,
        fillColor: GeoVis.Color.fromCssString("#4AFD2A").withAlpha(0.5) // 填充颜色
      }).addTo(earth.features);
    },
    addPolygonBuffer() {
      let coors = this._primitive.positions;
      coors.push(coors[0]);
      coors = coors.map(function(element) {
        //@ts-ignore
        return GeoVis.Util.cartesianToLonlat(element);
      });
      const turfPolygon = turf.polygon([coors]);
      const options = {
        units: "meters"
      };
      const buffer = turf.buffer(turfPolygon, this.radius, options);
      const bufferCoors = buffer.geometry.coordinates;
      const polygon = new GeoVis.Polygon(bufferCoors[0], {
        fill: true,
        height: 0,
        fillColor: GeoVis.Color.fromCssString("#4AFD2A").withAlpha(1) // 填充颜色
      }).addTo(earth.features);
    },
    clearBuffer() {
      this.radius = 10;
      this._primitive = undefined;
      earth.features.removeAll();
      //@ts-ignore
      earthStore.drawHelper.removeAll();
    }
  },
  beforeDestroy() {
    this.clearBuffer();
  }
};
</script>

<style scoped>
.mainPart {
  width: 100%;
  height: 150px;
  color: white;
}
.bottom {
  position: absolute;
  bottom: 0;
  left: 10px;
  width: calc(100% - 20px);
  height: 50px;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-wrap: nowrap;
  justify-content: space-around;
}

.sliderContainer {
  height: 60px;
}

</style>
