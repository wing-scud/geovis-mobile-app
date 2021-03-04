<template>
  <div>
    <div class="layerChange" :key="map.id" v-for="map in maps">
      <el-switch
        @change="enableTC(map)"
        v-model="map.enable"
        active-color="rgb(5,234,255)"
        inactive-color="rgb(47,65,80)"
      >
      </el-switch>
      <span class="words">{{ map.name }}</span>
      <div class="choose">
        <input
          type="radio"
          :name="map.id"
          :id="`${map.id}1`"
          @click="left(map)"
        /><label class="labels" :for="`${map.id}1`">左侧</label>
        <input
          type="radio"
          :name="map.id"
          :id="`${map.id}2`"
          @click="allSide(map)"
          checked
        /><label class="labels" :for="`${map.id}2`">两边</label>
        <input
          type="radio"
          :name="map.id"
          :id="`${map.id}3`"
          @click="right(map)"
        /><label class="labels" :for="`${map.id}3`">右侧</label>
      </div>
    </div>
    <div class="colorChange">
      <img
        src="../../../../../public/images/images/adjust/alpha.png"
        class="adjustIcon"
        @click="adjustColor('alpha')"
      />
      <img
        src="../../../../../public/images/images/adjust/gamma.png"
        class="adjustIcon"
        @click="adjustColor('gamma')"
      />
      <img
        src="../../../../../public/images/images/adjust/brightness.png"
        class="adjustIcon"
        @click="adjustColor('brightness')"
      />
      <img
        src="../../../../../public/images/images/adjust/contrast.png"
        class="adjustIcon"
        @click="adjustColor('contrast')"
      />
      <img
        src="../../../../../public/images/images/adjust/hue.png"
        class="adjustIcon"
        @click="adjustColor('hue')"
      />
      <img
        src="../../../../../public/images/images/adjust/saturation.png"
        class="adjustIcon"
        @click="adjustColor('saturation')"
      />
    </div>
    <div class="adjustPanel">
      <div
        class="board"
        v-show="data.show"
        v-for="data in adjustData"
        :key="data.index"
      >
        <span>{{ data.name }}</span>
        <el-slider
          v-model="data.value"
          :min="min"
          :max="max"
          :step="step"
          @change="changeColor(data)"
        ></el-slider>
        <span class="result">{{ data.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tczs",
  data() {
    return {
      black: undefined,
      google: undefined,
      maps: [
        {
          name: "纯黑底图",
          id: "black",
          enable: false,
          address: "http://192.168.13.32/tiles/dark/{z}/{x}/{y}.png",
          layer: undefined
        },
        {
          name: "谷歌底图",
          id: "google",
          enable: false,
          address: "http://192.168.13.32/tiles/googlemap/{z}/{x}/{y}.png",
          layer: undefined
        }
      ]
    };
  },
  methods: {
    left(map){
      if(map.enable){
         
      }
    },
    enableTC(map) {
      if (map.id == "black") {
        this.black.visible = map.enable;
      }
      if (map.id == "google") {
        this.google.visible = map.enable;
      }
    }
  },
  mounted() {
    document.getElementById("slider").style.visibility = "visible";
    this.black = new GeoVis.TileLayer("http://192.168.13.32/tiles/dark/{z}/{x}/{y}.png").addTo(earth.layers);
    this.google = new GeoVis.TileLayer("http://192.168.13.32/tiles/geoq/{z}/{x}/{y}.png").addTo(earth.layers);
    this.black.visible = false;
    this.google.visible = false;
    mapArr.push(this.black);
    mapArr.push(this.google)
  },
  destroyed() {
    document.getElementById("slider").style.visibility = "hidden";
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
