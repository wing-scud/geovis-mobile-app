<template>
  <gv-panel class="capture-root" :height="-1" :width="600" :id="pluginInfo.id" :title="pluginInfo.name" ref="panel">
    <div class="input-select">
      <div class="titlediv">
        <el-form :inline="true" class="demo-form-inline">
          <span style="line-height:40px">请选择分辨率：</span>
          <el-form-item label="宽">
            <el-input class="res-input" v-model="resolution[0]" :max="4000" :min="10" placeholder="宽" :disabled="resolutionType !== '自定义'"></el-input>
          </el-form-item>
          <el-form-item label="高">
            <el-input class="res-input" v-model="resolution[1]" :max="4000" :min="10" placeholder="高" :disabled="resolutionType !== '自定义'"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select class="res-select" v-model="resolutionType" placeholder="请选择" @change="setResolution">
              <el-option v-for="resolution in resolutionList" :key="resolution" :label="resolution" :value="resolution"> </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="image-area">
      <div class="capture-block" v-if="captureState !== 'finished'" @click="startCapture">
        <span class="demonstration">{{ captureState === "waiting" ? "点击截图" : "加载中..." }}</span>
      </div>
      <el-image class="capture-image" v-if="captureState === 'finished'" :src="captureData" :preview-src-list="[captureData]"> </el-image>
      <div class="capture-button" v-if="captureState === 'finished'">
        <el-button @click="saveLocal" type="primary">保存</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
      <!-- <img class="capture-image" :src="captureData" v-if="captureState === 'finished'" /> -->
    </div>
    <div class="camera-btn-container">
      <!-- <a class="btn confirm" @click="screenShot">确定</a>
      <a class="btn cancel" @click="cameraClose">取消</a> -->
    </div>
    <div id="photo" v-if="canvasShow">
      <div id="canvasNode" ref="canvasNode"></div>
      <div class="camera-btn-container">
        <a class="btn confirm" id="download" href="#" @click="test">下载</a>
        <a class="btn cancel" @click="cancelDown">取消</a>
      </div>
    </div>
  </gv-panel>
</template>

<script>
import html2canvas from "html2canvas";
import { earthStore } from "@/geovis/store";
const GeoVis = window.GeoVis;
const resolutionMap = {
  "720P": [1280, 720],
  "1080P": [1920, 1080],
  "2K": [2560, 1440],
  "4K": [3840, 2160]
};

function dataURLtoBlob(dataurl) {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
export default {
  name: "Camera",
  props: ["pluginInfo"],
  data() {
    return {
      // fileList: undefined,
      imgSrc: "",
      titleName: "",
      captureData: "",
      captureText: "点击截图",
      captureState: "waiting", //wating loading finished
      resolution: [1920, 1080],
      resolutionType: "1080P",
      resolutionList: ["720P", "1080P", "2K", "4K", "自定义"],
      initSize: {
        width: 1366,
        height: 768
      },
      isShow: false,
      size: "1920*1080",
      canvasShow: false,
      width: "",
      height: ""
    };
  },
  mounted() {},
  methods: {
    setResolution() {
      const resolution = resolutionMap[this.resolutionType];
      if (resolution) {
        this.resolution = [...resolution];
      }
    },

    startCapture: async function() {
      if (this.captureState === "waiting") {
        this.captureState = "loading";
        await this.setContainerStage();
        await this.loadDataStage();
        await this.loadCanvasStage();
        this.captureState = "finished";
      }
    },
    setContainerStage: function() {
      const container = earthStore.earth.container;
      //先把初始的大小存下来
      this.initSize.width = container.style.width;
      this.initSize.height = container.style.height;
      const width = this.resolution[0] + "px";
      const height = this.resolution[1] + "px";
      container.style.width = width;
      container.style.height = height;
      earth.handleResize();
      earth.globe.maximumScreenSpaceError = 1.3;
    },

    loadDataStage() {
      // await sleep(200);
      return new Promise(resolve => {
        const inter = setInterval(() => {
          if (earth.globe._surface._lastTileLoadQueueLength === 0) {
            setTimeout(() => resolve(), 200);
            window.clearInterval(inter);
          }
        }, 200);
      });
    },
    loadCanvasStage: function() {
      const container = earthStore.earth.container;
      const download = document.getElementById("download");

      // container.appendChild
      return new Promise(resolve => {
        setTimeout(
          html2canvas(container).then(canvas => {
            //截图之后回到初始大小
            container.style.width = this.initSize.width;
            container.style.height = this.initSize.height;
            earth.handleResize();
            this.captureData = canvas.toDataURL({ format: "image/png" });
            resolve();
          }),
          0
        );
      });
    },
    saveLocal() {
      const link = document.createElement("a");
      const imgData = this.captureData;
      const strDataURI = imgData.substr(22, imgData.length);
      const blob = dataURLtoBlob(imgData);
      const objurl = URL.createObjectURL(blob);
      link.download = `geovis-${new Date().toISOString().split("T")[0]}.png`;
      link.href = objurl;
      link.click();
    },
    reset(){
      this.captureState = "waiting";
      this.captureData = "";
      
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .camera {
  width: 100px;
  height: 100px;
  background: transparent;
  position: fixed;
  right: 0;
  top: 20px;
}
.camera-menu {
  position: absolute;
  overflow: hidden;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  z-index: 2000;
  background: #d7880d;
}
#photo {
  position: absolute;
  overflow: hidden;
  padding: 1rem;
  top: 40%;
  left: 50%;
  width: 40%;
  transform: translate(-50%, -50%);
  z-index: 2010;
  background: aliceblue;
}
.input-select {
  text-align: center;
}
.input-item {
  vertical-align: middle;
}
.select-item {
  height: 2.55rem;
  vertical-align: middle;
  border: 0;
}
.camera-menu-item {
  line-height: 2.2rem;
  letter-spacing: 23px;
  cursor: pointer;
}
.camera-btn-container {
  position: absolute;
  background: #fff;
  bottom: 0rem;
  margin-left: -1.5rem;
  width: 100%;
  height: 2rem;
}
.btn {
  float: right;
  margin: 0 0.8rem;
  line-height: 2rem;
  border: none;
  padding: 0 0.5rem;
  cursor: pointer;
}
.setContainerSize {
  width: 1000px;
  height: 1000px;
}

.titlediv input {
  margin-left: 20px;
  width: 350px;
  height: 35px;
  border: 0;
  padding: 0 20px;
}
.uploadImg {
  width: 100%;
  padding: 10px 100px;
  text-align: left;
}

#fileUploadBtn {
  border: 0;
  border-radius: 5px;
  outline: 0;
  background: rgb(64, 158, 255);
  width: 90px;
  height: 30px;
  color: white;
}
#fileUpload {
  display: none;
}

 */

.titlediv {
  color: white;
  font-size: 18px;
  height: 50px;
  display: flex;
  justify-content: center;
}

.res-input,
.res-select {
  width: 100px;
}

.image-area {
}

.capture-block {
  height: 200px;
  text-align: center;
  line-height: 200px;
  background: #c0c4cc70;
  color: #eee;
  font-size: 22px;
  cursor: pointer;
}
.capture-image {
  width: 100%;
}

.capture-root{
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
</style>
