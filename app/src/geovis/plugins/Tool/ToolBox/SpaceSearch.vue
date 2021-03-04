<template>
  <table style="width:100%">
    <tr>
      <td>缓冲区半径(m)</td>
      <td><el-slider v-model="radius" :min="0" :max="10000"></el-slider></td>
      <td>{{ radius }}&nbsp; m</td>
    </tr>
    <tr>
      <template v-for="type in types">
        <td :key="type">
          <el-button @click="draw(type)">{{ type }} </el-button>
        </td>
      </template>
    </tr>
    <tr>
      <td></td>
      <td><el-button @click="clearBuffer">清除 </el-button></td>
      <td><el-button @click="bufferStart">开始检索 </el-button></td>
    </tr>
  </table>
</template>

<script lang="ts">
import Vue from "vue";
import { earthStore } from "@/geovis/store";
const turf = window["turf"];

const icons = [];

const Types = DrawHelper.Types;
const iconlist = ["博物馆.png", "大使馆.png", "百货商店.png", "学校.png", "银行.png", "营地.png", "路口.png", "美术馆.png"].map(str => "static/social/" + str);
const ConvertTool = Vue.extend({
  name: "ConvertTool",
  data() {
    return {
      results: [],
      coor: "",
      radius: 0,
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
      //@ts-ignore
      earthStore.drawHelper.startDrawingPolyline({
        type: Types.PROJ_POLYLINE
      });
      earthStore.drawHelper["on"]("created", function(e) {
        const primitive = e.entity;
        page._primitive = primitive;
      });
    },
    addPolygon() {
      const page = this;
      //@ts-ignore
      earthStore.drawHelper.startDrawingPolygon({
        type: Types.PROJ_POLYGON
      });
      //@ts-ignore
      earthStore.drawHelper.on("created", function(e) {
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
      this.createRandomIcons(buffer);
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
      this.createRandomIcons(buffer);
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
      this.createRandomIcons(buffer);
    },
    createRandomIcons(buffer) {
      const earth = earthStore.earth;
      //@ts-ignore
      earthStore.drawHelper.removeAll();
      const page = this;
      const bbox = turf.bbox(buffer);
      const points = turf.randomPoint(100, { bbox: bbox });
      const lonlats = [];
      points.features.map(feature => {
        if (turf.booleanContains(buffer, feature)) {
          lonlats.push(feature.geometry.coordinates);
        }
      });
      lonlats.map(lonlat => {
        debugger;
        const index = Math.random() * iconlist.length;
        const iconUrl = iconlist[Math.floor(index)];
        console.log(iconUrl);
        icons.push(
          new GeoVis.Billboard(lonlat, {
            image: iconUrl,
            width: 30,
            height: 30,
            //@ts-ignore
            disableDepthTestDistance: 1e5
          }).addTo(earth.features)
        );
      });
    },
    clearBuffer() {
      this.radius = 0;
      this._primitive = undefined;
      earth.features.removeAll();
      //@ts-ignore
      earthStore.drawHelper.removeAll();
    },
    xyzTolla(xyz) {
      const carto = GeoVis.Cartographic.fromCartesian(xyz);
      const lon = GeoVis.Math.toDegrees(carto.longitude);
      const lat = GeoVis.Math.toDegrees(carto.latitude);
      const lla = [lon, lat, 0];
      return lla;
    }
  }
});
export default ConvertTool;
</script>

<style lang="scss">
.mainPart {
  width: 100%;
  height: 100%;
  color: white;
  text-align: center;
}
.el-tabs__content {
  min-height: 200px;
}
.valueInput {
  display: inline-flex;
  flex-direction: row;
  width: 100%;
  text-align: center;
  align-items: center;
  margin-top: 5px;
}
.bar {
  height: 40px;
  margin-top: 5px;
}
.textbar {
  height: 25px;
  margin-top: 5px;
}
.valueInput .el-input-number__increase,
.el-input-number__decrease {
  border-left: 1px solid #1b1d1f;
}
.valueInput .el-input__inner {
  -webkit-appearance: none;
  background-color: #2b4058d1;
}
</style>
