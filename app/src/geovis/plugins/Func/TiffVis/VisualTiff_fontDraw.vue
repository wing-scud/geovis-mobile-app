<template>
  <div>
    <span class="title">
      标量数据
    </span>
    <el-select v-model="colors" @change="changeColor" placeholder="请选择颜色表" class="select" id="colorInput">
      <el-option v-for="item in colorTables" :key="item.name" :label="item.name" :value="item.name">
        <div class="color">
          <img :src="colorPath(item.name)" class="colorImg" :id="item.name" />
          <span class="colorType">
            {{ item.name }}
          </span>
          <span class="colorType">
            {{ item.examples }}
          </span>
        </div>
      </el-option>
    </el-select>
    <el-select v-model="fileName" @change="chooseTiff" placeholder="请选择可视化数据" class="select">
      <el-option v-for="item in files" :key="item.name" :label="item.name" :value="item.file"> </el-option>
    </el-select>
    <!-- <span class="title little">
      全球海洋盐度按深度分布数据
    </span>
    <el-slider v-model="depth" :max="32" :min="0" :step="1" @input="chooseDepthTiff" :format-tooltip="formatDepth"></el-slider> -->
    <span class="title">
      矢量数据
    </span>
    <el-select v-model="vectorFileName" @change="vectorLoad" placeholder="请选择矢量数据" class="select">
      <el-option v-for="item in vectorFileNames" :key="item.name" :label="item.name" :value="item.file"> </el-option>
    </el-select>
    <el-button @click="clearLayer" class="button">清除</el-button>
    <span class="title">
      数据说明
    </span>
    <div v-if="introduction" class="introduction">
      <div class="introItem"><span class="introTitle">名称&nbsp;:&nbsp;</span>{{ introduction.name }}</div>
      <div class="introItem"><span class="introTitle">描述&nbsp;:&nbsp;</span>{{ introduction.describe }}</div>
      <div class="introItem"><span class="introTitle">时间&nbsp;:&nbsp;</span>{{ introduction.time }}</div>
      <div class="introItem"><span class="introTitle">空间分辨率&nbsp;:&nbsp;</span>{{ introduction.space }}</div>
      <div class="introItem"><span class="introTitle">范围&nbsp;:&nbsp;</span>{{ introduction.bbox }}</div>
    </div>
    <div v-else class="introduction">
      请选择数据
    </div>
  </div>
</template>

<script>
import { earthStore } from "@/geovis/store";
import { combine } from "@turf/turf";
import { getMaxMin, files, vectorFiles, colorTables, levelMapDepth } from "./visual";
const GeoTIFF = require("geotiff");
//const GeoTIFF = window["GeoTIFF"];
const d3 = window["d3"];
const L = window["L"];
const VectorFieldAnim = window["VectorFieldAnim"];
export default {
  name: "VisualTiff",
  async mounted() {},
  data() {
    return {
      depth: undefined,
      fileName: undefined,
      introduction: undefined,
      files: files,
      _layer: undefined,
      _rec: undefined,
      vectorFileNames: vectorFiles,
      vectorFileName: undefined,
      colorTables: colorTables,
      colors: undefined
    };
  },
  methods: {
    async chooseDepthTiff() {
      this.fileName = undefined;
      const depth = levelMapDepth[this.depth];
      const fileName = `salt.hr.annltm-salt--time_0-level_${depth}.tif`;
      const tiff = await this.fetchTiff("static/data/tiffvis/盐度-depth/" + fileName);
      const img = await tiff.getImage();
      const bbox = img.getBoundingBox();
      this.setIntoduction("salt.hr.annltm-salt--time_0-level_0", "normal", bbox);
      this.showTiff(tiff);
    },
    async chooseTiff() {
      this.depth = undefined;
      const fileName = this.fileName;
      const tiff = await this.fetchTiff("static/data/tiffvis/select/" + fileName + ".tif");
      const img = await tiff.getImage();
      const bbox = img.getBoundingBox();
      this.setIntoduction(fileName, "normal", bbox);
      this.showTiff(tiff);
    },
    async showTiff(tiff) {
      const earth = earthStore.earth;
      const instance = this;
      if (this._layer) {
        this._layer.removeFrom(earth.layers);
        this._layer = undefined;
      }
      if (this._rec) {
        this._rec.removeFrom(earth.features);
        this._rec = undefined;
        this.vectorFileName = undefined;
      }
      const image = await tiff.getImage();
      const width = image.getWidth();
      const height = image.getHeight();
      const tileWidth = image.getTileWidth();
      const tileHeight = image.getTileHeight();
      const projection = d3.geoMercator();
      const rasters = await image.readRasters();
      const tiffData = await image.readRasters();
      const getFileDirectory = image.getFileDirectory();
      const tempData = new Array(image.getHeight());
      const bbox = image.getBoundingBox();
      const metaData = image.getGDALMetadata();
      const keys = image.getGeoKeys();
      const noData = image.getGDALNoData();
      const missingValue = Number(noData);
      for (let j = 0; j < image.getHeight(); j++) {
        tempData[j] = new Array(image.getWidth());
        for (let i = 0; i < image.getWidth(); i++) {
          tempData[j][i] = rasters[0][i + j * image.getWidth()];
        }
      }
      const [min, max] = getMaxMin(tiffData[0], missingValue);
      const scaleWidth = 256;
      const canvasColor = await this.chooseColor();
      const canvasColorContent = canvasColor.getContext("2d");
      const csImageData = canvasColorContent.getImageData(0, 0, scaleWidth, 1).data;
      //Drawing the image
      const canvasRaster = d3
        .select("body")
        .append("canvas")
        .attr("width", width)
        .attr("height", height)
        .style("display", "none");
      const contextRaster = canvasRaster.node().getContext("2d");
      const id = contextRaster.createImageData(width, height);
      const data = id.data;
      let pos = 0;
      for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
          //点坐标
          const px = i;
          const py = j;
          if (Math.floor(px) >= 0 && Math.ceil(px) < image.getWidth() && Math.floor(py) >= 0 && Math.ceil(py) < image.getHeight()) {
            const value = tempData[py][px];
            const c = Math.round((scaleWidth - 1) * ((value - min) / (max - min)));
            let alpha = 180;
            if (value > max || value < min || isNaN(value) || value === missingValue) {
              alpha = 0;
            }
            if (c < 0 || c > scaleWidth - 1) {
              alpha = 0;
            }
            data[pos] = csImageData[c * 4];
            data[pos + 1] = csImageData[c * 4 + 1];
            data[pos + 2] = csImageData[c * 4 + 2];
            data[pos + 3] = alpha;
            pos = pos + 4;
          }
        }
      }
      contextRaster.putImageData(id, 0, 0);
      const bounds = GeoVis.Rectangle.fromDegrees(bbox[0], bbox[1], bbox[2], bbox[3]);
      const thisLayer = new GeoVis.SingleLayer(contextRaster.canvas, { rectangle: bounds }).addTo(earth.layers);
      instance._layer = thisLayer;
    },
    async fetchTiff(fileName) {
      const response = await fetch(fileName);
      const arrayBuffer = await response.arrayBuffer();
      const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
      return tiff;
    },
    async chooseColor() {
      const name = this.colors;
      if (!name) {
        this.$message.error("请选择颜色色表");
        return;
      }
      const img = document.getElementById(name);
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 1;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, 257, 1);
      return canvas;
    },
    colorPath(name) {
      return "./static/data/tiffvis/color/" + name + ".png";
    },
    changeColor() {
      if (this.fileName) {
        this.chooseTiff();
      } else if (this.depth) {
        this.chooseDepthTiff();
      }
      const input = document.getElementById("colorInput");
      input.style.width = "250px";
      input.style.height = "40px";
      input.style.backgroundSize = "100% 200%";
      input.style.backgroundImage = `url(${this.colorPath(this.colors)})`;
    },
    nameOfObjInObjs(obj, objs) {
      let result = undefined;
      let key;
      const keys = Array.from(Object.keys(obj));
      keys.length ? (key = keys[0]) : (key = "name");
      objs.map(value => {
        if (value[key] === obj[key]) {
          result = value;
        }
      });
      return result;
    },
    resolveVectorFileName(file) {
      let ufileName = "";
      let vfileName = "";
      let time = 0;
      switch (file) {
        case "ncep_global_e8c2_d882_c623":
          time = 1608465600; //1608465600 207480
          ufileName = `windVector/${this.vectorFileName}-ugrd10m--time_${time}`;
          vfileName = `windVector/${this.vectorFileName}-vgrd10m--time_${time}`;
          break;
        case "oscar_vel10004":
          time = 10004;
          ufileName = `vector/${this.vectorFileName}-u--time_${time}-depth_15`;
          vfileName = `vector/${this.vectorFileName}-v--time_${time}-depth_15`;
          break;
        case "world_oscar_vel_5d1993":
          time = 88;
          ufileName = `vector/${this.vectorFileName}-u--time_${time}-depth_15`;
          vfileName = `vector/${this.vectorFileName}-v--time_${time}-depth_15`;
          break;
        default:
          break;
      }
      return [ufileName, vfileName];
    },
    async vectorLoad() {
      const instance = this;
      const [ufileName, vfileName] = this.resolveVectorFileName(instance.vectorFileName);
      const uBuffer = await instance.fetchTiffBuffer(ufileName);
      const vBuffer = await instance.fetchTiffBuffer(vfileName);
      const uTiff = await GeoTIFF.fromArrayBuffer(uBuffer); // GeoTIFF.parse(uBuffer); //
      //this.showTiff(uTiff)
      const vTiff = await GeoTIFF.fromArrayBuffer(vBuffer); //GeoTIFF.parse(vBuffer); //
      const uImg = await uTiff.getImage();
      const bbox = uImg.getBoundingBox();
      const width = uImg.getWidth() * 8;
      const height = uImg.getHeight() * 8;
      this.setIntoduction(instance.vectorFileName, "vector", bbox);
      instance.getLeafletCanvas(uBuffer, vBuffer, bbox, width, height);
    },
    async fetchTiffBuffer(fileName) {
      const response = await fetch("static/data/tiffvis/" + fileName + ".tif");
      if (response.status === 200) {
        const arrayBuffer = await response.arrayBuffer();
        return arrayBuffer;
      } else {
        return "无文件";
      }
    },
    getLeafletCanvas(u, v, bbox, width, height) {
      const earth = earthStore.earth;
      this.depth = 0;
      if (this._rec) {
        this._rec.removeFrom(earth.features);
        this._rec = undefined;
      }
      if (this._layer) {
        this._layer.removeFrom(earth.layers);
        this._layer = undefined;
        this.fileName = undefined;
      }
      const vf = L.VectorField.fromGeoTIFFs(u, v);
      const range = vf.range;
      const currentLayer = new VectorFieldAnim({
        earth,
        field: vf,
        width: width,
        height: height,
        color: "white",
        pathNum: 10000,
        maxAge: 400,
        velocityScale: 1 / 2,
        lonMin: bbox[0],
        latMin: bbox[1],
        lonMax: bbox[2],
        latMax: bbox[3]
      });
      const material = new GeoVis.Material({
        fabric: {
          type: "Image",
          uniforms: {
            image: currentLayer.canvas
          }
        }
      });
      const rec = new GeoVis.RectangleGeom(bbox, {
        async: true,
        material
      }).addTo(earth.features);
      this._rec = rec;
    },
    setIntoduction(fileName, type, bbox) {
      let detail;
      if (type === "normal") {
        detail = this.nameOfObjInObjs({ file: fileName }, this.files);
      } else {
        detail = this.nameOfObjInObjs({ file: fileName }, this.vectorFileNames);
      }
      const name = detail.name;
      const describe = detail.describe ? detail.describe : "暂无介绍";
      const space = detail.space ? detail.space : "无";
      const time = detail.time ? detail.time : "无";
      this.introduction = {
        name,
        describe,
        bbox,
        space,
        time
      };
    },
    clearLayer() {
      if (this._rec) {
        this._rec.removeFrom(earth.features);
        this._rec = undefined;
        this.vectorFileName = undefined;
      }
      if (this._layer) {
        this._layer.removeFrom(earth.layers);
        this._layer = undefined;
        this.fileName = undefined;
      }
    },
    formatDepth() {
      const level = this.depth;
      return `深度:${levelMapDepth[level]}`;
    }
  },
  beforeDestroy() {
    this._layer && this._layer.removeFrom(earthStore.earth.layers);
    this._rec && this._rec.removeFrom(earthStore.earth.features);
  },
  computed: {
    colorsInto() {
      return this.nameOfObjInObjs({ name: this.colors }, this.colorTables);
    }
  }
};
</script>

<style scoped>
.bar {
  width: 100%;
  height: 30px;
  margin: 10px 0 15px 0;
  display: inline-flex;
  flex-direction: row;
  font-size: 15px;
  text-align: center;
  color: white;
  align-items: center;
}

.button {
  font-size: 15px;
  color: white;
  background-color: #256a8a;
}

#huabu {
  width: 200px;
  height: 250px;
}

.color {
  width: 100%;
  height: 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.colorType {
  margin: 0 0 0 10px;
  color: white;
  font-size: 13px;
}

.colorImg {
  width: 100px;
  height: 18px;
}

.colorsShow {
  width: 256px;
  height: 18px;
}

.introduction {
  color: white;
  width: 100%;
  height: 100px;
}
.title {
  color: white;
  font-size: 18px;
  display: block;
  margin-bottom: 10px;
  margin-top: 10px;
}
.select {
  background-size: 100%;
  width: 250px;
  height: 40px;
  margin-bottom: 10px;
  border-bottom: 1px solid white;
  /* border: solid #4d5158 1px; */
}
.introItem {
  margin: 8px 0;
}
.introTitle {
  font-size: 12px;
}
.button:hover {
  background-color: #256a8aa8;
}
.little {
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 5px;
}
</style>
<style>
.el-input__inner {
  border-bottom: 0 solid transparent !important;
}
</style>
