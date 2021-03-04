<template>
  <div>
    <div class="layerChange" :key="map.id" v-for="map in maps">
      <el-switch @change="enableLayer(map)" v-model="map.enable" active-color="rgb(5,234,255)" inactive-color="rgb(47,65,80)"> </el-switch>
      <span class="words">{{ map.name }}</span>
      <div class="choose">
        <input type="radio"   :name="map.id"  :id="`${map.id}1`" @click="setDirection(map, -1)" :checked="map.splitDirection === -1" />
        <label class="labels" :name="map.id"  :for="`${map.id}1`">左侧</label>
        <input type="radio"   :name="map.id"  :id="`${map.id}2`" @click="setDirection(map, 0)" :checked="map.splitDirection === 0" />
        <label class="labels" :name="map.id"  :for="`${map.id}2`">两边</label>
        <input type="radio"   :name="map.id"  :id="`${map.id}3`" @click="setDirection(map, 1)" :checked="map.splitDirection === 1" />
        <label class="labels" :name="map.id"  :for="`${map.id}3`">右侧</label>
      </div>
    </div>
    <div class="colorChange">
      <img v-for="(img, index) in images" :key="index" :src="img.src" class="adjustIcon" @click="adjustColor(img.name)" />
    </div>
    <div class="adjustPanel">
      <div class="board" v-show="data.show" v-for="data in adjustData" :key="data.index">
        <span>{{ data.name }}</span>
        <el-slider v-model="data.value" :min="min" :max="max" :step="step" @change="changeColor()"></el-slider>
        <span class="result">{{ data.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { earthStore } from "@/geovis/store";
import { layerData } from "./data";
const mapobj = {};
export default {
  name: "tczs",
  data() {
    return {
      min: 0,
      max: 3.0,
      step: 0.1,
      adjustData: layerData.adjustData,
      dragStartX: 0,
      maps: layerData.maps,
      images: layerData.images
    };
  },
  mounted() {
    this._slider = document.getElementById("slider");
    this._slider.style.visibility = "visible";
    this._slider.addEventListener("mousedown", this.mouseDown, false);
    window.addEventListener("mouseup", this.mouseUp, false);
    this.updateSplitPosition(0.5);
  },
  methods: {
    setDirection(map, direction) {
      map.splitDirection = direction;
      map._layer && (map._layer.splitDirection = direction);
    },
    enableLayer(map) {
      if (map.enable) {
        map._layer = new GeoVis.TileLayer(map.address).addTo(earth.layers);
        map._layer.splitDirection = map.splitDirection;
      } else {
        earth.layers.remove(map._layer);
        map._layer = undefined;
      }
    },

    mouseUp() {
      window.removeEventListener("mousemove", this.sliderMove, true);
    },

    mouseDown(e) {
      //clientX表示鼠标click，mousemove时相对于窗口左边的坐标
      this.dragStartX = e.clientX - this._slider.offsetLeft; //offsetLeft表示相对于上一级的定位元素（除static外）的偏移量
      window.addEventListener("mousemove", this.sliderMove, true);
    },
    sliderMove(e) {
      const splitPosition = (e.clientX - this.dragStartX) / this._slider.parentElement.offsetWidth; //parentElement表示父级元素，offsetWidth表示对象的可见宽度
      this._slider.style.left = 100.0 * splitPosition + "%";
      this.updateSplitPosition(splitPosition);
    },
    updateSplitPosition(val) {
      earth.scene.imagerySplitPosition = val;
    },

    adjustColor(string) {
      this.adjustData.map(data => {
        if (data.nickname === string) {
          data.show = true;
        } else {
          data.show = false;
        }
      });
    },
    changeColor() {
      this.maps.map(val=>{
        if(val.enable&&val._layer){
         this.jisuan(val._layer)
        }
      })
    },
    jisuan(imglayer) {
      imglayer.brightness = this.adjustData[0].value;
      imglayer.contrast = this.adjustData[1].value;
      imglayer.hue = this.adjustData[2].value;
      imglayer.saturation = this.adjustData[3].value;
      imglayer.gamma = this.adjustData[4].value;
      imglayer.alpha = this.adjustData[5].value;
    }
  },

  destroyed() {
    document.getElementById("slider").style.visibility = "hidden";
    this._slider.removeEventListener("mousedown", this.mouseDown);
    window.removeEventListener("mouseup", this.mouseUp);
    this.maps.map(map => map._layer && map._layer.removeFrom(earthStore.earth.layers));
  }
};
</script>

<style scoped>
.layerChange {
  color: white;
  text-align: left;
  padding: 10px 5px;
}
.words {
  margin-left: 30px;
}
.choose {
  width: 100%;
  height: 40px;
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}
.choose input {
  display: none;
}
.labels {
  display: inline-block;
  width: 33.33%;
  height: 40px;
  border: 1px solid white;
  background-color: rgb(47, 65, 80);
  color: white;
  text-align: center;
  line-height: 40px;
}
input[type="radio"]:checked + .labels {
  background-color: aqua;
}
.selected {
  background-color: aqua;
}

.colorChange {
  width: 100%;

  margin-top: 10px;
  padding: 10px;
  text-align: left;
}
.adjustIcon {
  width: 28px;
  height: 28px;
  margin-right: 21px;
}
.board {
  width: 100%;
  height: 40px;
  background-color: rgb(47, 65, 80);
  color: white;
  padding: 0;
}
.board span,
.el-slider {
  width: 60%;
  height: 40px;
  line-height: 40px;
  display: inline-block;
  vertical-align: middle;
}
.board span {
  width: 25%;
  font-size: 14px;
}
.board span.result {
  width: 15%;
}
</style>
