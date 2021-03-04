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
      _scalarRec: undefined,
      vectorRec: undefined,
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
      if (this._scalarRec) {
        this._scalarRec.removeFrom(earth.features);
        this._scalarRec = undefined;
      }
      if (this.vectorRec) {
        this.vectorRec.removeFrom(earth.features);
        this.vectorRec = undefined;
        this.vectorFileName = undefined;
      }
      const image = await tiff.getImage();
      const width = image.getWidth();
      const height = image.getHeight();
      const projection = d3.geoMercator();
      const tiffData = await image.readRasters();
      const getFileDirectory = image.getFileDirectory();
      const tempData = new Array(image.getHeight());
      const bbox = image.getBoundingBox();
      const keys = image.getGeoKeys();
      const noData = image.getGDALNoData();
      const missingValue = Number(noData);
      const [min, max] = getMaxMin(tiffData[0], missingValue);
      const scaleWidth = 256;
      const canvasColor = await this.chooseColor();
      //Drawing the image
      const canvasRaster = d3
        .select("body")
        .append("canvas")
        .attr("width", width)
        .attr("height", height)
        .style("display", "none");
      const contextRaster = canvasRaster.node().getContext("2d");
      const imageData = contextRaster.createImageData(width, height);
      const data = imageData.data;
      let index = 0;
      for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
          let value = tiffData[0][j * width + i];
          if (value > max || value < min || isNaN(value) || value === missingValue) {
            value = max + 10;
          }
          const carte4 = GeoVis.Cartesian4.packFloat(value);
          data[index] = carte4.x;
          data[index + 1] = carte4.y;
          data[index + 2] = carte4.z;
          data[index + 3] = carte4.w;
          index += 4;
        }
      }
      contextRaster.putImageData(imageData, 0, 0);
      // canvasRaster.node().style.display = "block";
      // document.body.appendChild(canvasRaster.node());
      // canvasRaster.node().className = "canvasTiff";
      console.log(contextRaster);
      const material = this.createMaterial(canvasColor, contextRaster.canvas, max, min);
      const rec = new GeoVis.RectangleGeom(bbox, {
        async: false,
        material: material
      }).addTo(earth.features);
      instance._scalarRec = rec;
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
      canvas.width = 255;
      canvas.height = 1;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 1, 1, img.width - 1, img.height - 1, 0, 0, 255, 1);
      console.log(ctx.getImageData(0, 0, 255, 1));
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
      if (this.vectorRec) {
        this.vectorRec.removeFrom(earth.features);
        this.vectorRec = undefined;
      }
      if (this._scalarRec) {
        this._scalarRec.removeFrom(earth.features);
        this._scalarRec = undefined;
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
      this.vectorRec = rec;
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
      this.introduction = {
        name,
        describe,
        bbox,
        space
      };
    },
    clearLayer() {
      if (this.vectorRec) {
        this.vectorRec.removeFrom(earth.features);
        this.vectorRec = undefined;
        this.vectorFileName = undefined;
      }
      if (this._scalarRec) {
        this._scalarRec.removeFrom(earth.features);
        this._scalarRec = undefined;
        this.fileName = undefined;
      }
    },
    formatDepth() {
      const level = this.depth;
      return `深度:${levelMapDepth[level]}`;
    },
    createMaterial(colorCanvas, canvas, max, min) {
      const ms = this.getMs();
      const material = new GeoVis.Material({
        fabric: {
          type: "myImage",
          uniforms: {
            colorCanvas: colorCanvas,
            tiffCanvas: canvas,
            max: max,
            min: min
          },
          source: ms
        }
      });
      return material;
    },
    getMs() {
      return `
      czm_material czm_getMaterial(czm_materialInput materialInput)
            {
                czm_material material = czm_getDefaultMaterial(materialInput);
                vec2 st = materialInput.st;00324
                0.12310
                vec4 valueColor = texture2D(tiffCanvas,st);
                float value = czm_unpackFloat(valueColor);
                if(value>max ||value< min){
                     material.diffuse =vec3(value,0.0,0.0);
                  material.alpha = 0.72;
                }else{
                  material.diffuse =vec3( (value-min)/(max-min),0.0,0.0);//
                  material.alpha = 0.72;
                }
                // if((value-0.5)>max||(value+0.5)<min){
                // material.diffuse = vec3(1.0,1.0,1.0);
                // material.alpha = 0.7;
                // }else{
                //  float s = float((value-min)/(max-min));
                // //颜色图片min处为黑色
                // if(s>1.1 || s<-0.1){
                //   material.diffuse = vec3(0.0,0.0,0.0);
                //    material.alpha = 0.72;
                // }else{
                //   s=clamp(s,0.0,1.0);
                //   vec2 colorSt = vec2(s,1.0);
                //   vec4 colorImage = texture2D(colorCanvas,colorSt);
                //   material.diffuse = colorImage.rgb;
                //   material.alpha = 0.72;
                //   }
                // }
                return material;
            }
            `;
    }
  },
  beforeDestroy() {
    this._scalarRec && this._scalarRec.removeFrom(earthStore.earth.features);
    this.vectorRec && this.vectorRec.removeFrom(earthStore.earth.features);
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
.canvasTiff {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1111;
}
</style>
