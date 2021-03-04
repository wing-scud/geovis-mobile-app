<template>
  <div class="titleDiv" v-if="ppt.length > 0 && show">
    <h1>{{ ppt[index[0]].mainTitle }}</h1>
    <h2>{{ ppt[index[0]].processes[index[1]].title }}</h2>
  </div>
</template>

<script lang="ts">
import Viewport from "@/geovis/store/SceneManager/Viewport";
import { flyToViewport } from "@/geovis/util";
import Vue from "vue";
let lastIndex = [0, 0];
const GeoVisPPT = Vue.extend({
  name: "GeoVisPPT",
  data() {
    return {
      show: true,
      index: [0, 0],
      ppt: []
    };
  },
  mounted() {
    this.ppt = window["GeoVis_PPT_DATA"];
    this.setIndex(lastIndex);
    document.body.addEventListener("keydown", this.keyboardHandler);
  },
  destroyed() {
    lastIndex = this.index;
    document.body.removeEventListener("keydown", this.keyboardHandler);
  },
  methods: {
    keyboardHandler(e) {
      if (e.altKey) {
        switch (e.key) {
          case "ArrowLeft":
            this.back();
            break;
          case "ArrowRight":
            this.next();
            break;
          case "ArrowUp":
            this.reset();
            break;
          case "0":
            this.setIndex([0, 0]);
            break;
          case "1":
            this.setIndex([1, 0]);
            break;
          case "2":
            this.setIndex([2, 0]);
            break;
          case "ArrowDown":
            this.toggleShow();
        }
        e.preventDefault();
      }
    },
    back() {
      const index = [this.index[0], this.index[1] - 1];
      if (index[1] < 0 && index[0] === 0) {
        index[1] = 0;
      } else if (index[1] < 0 && index[0] > 0) {
        index[0] -= 1;
        index[1] = this.ppt[index[0]].processes.length - 1;
        if (index[0] < 0) {
          index[0] = 0;
        }
      }
      this.setIndex(index);
    },
    next() {
      const index = [this.index[0], this.index[1] + 1];
      if (index[1] >= this.ppt[index[0]].processes.length && index[0] >= this.ppt.length - 1) {
        index[1] = this.ppt[index[0]].processes.length - 1;
      } else if (index[1] >= this.ppt[index[0]].processes.length) {
        index[1] = 0;
        index[0] += 1;
        if (index[0] >= this.ppt.length) {
          index[0] = this.ppt.length - 1;
        }
      }
      this.setIndex(index);
    },
    reset() {
      this.setIndex([0, 0]);
    },
    toggleShow() {
      this.show = !this.show;
    },
    setIndex(index) {
      this.index = index;
      const process = this.ppt[index[0]].processes[index[1]];
      if (process.command) {
        process.command();
      }
      if (process.viewport) {
        const viewport: GVAPP.Viewport = process.viewport;
        flyToViewport(viewport);
      }
    }
  }
});

export default GeoVisPPT;
</script>

<style scoped>
.titleDiv {
  position: absolute;
  text-align: center;
  top: 30px;
  left: 25%;
  right: 25%;
  height: 120px;
  color: yellow;
  font-family: "微软雅黑";
  text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
  outline-color: blue;
  width: 50%;
  border-radius: 25px;
  background-color: rgba(128, 128, 255, 0.3);
  z-index: 2000;
}
.titleDiv h1 {
  font-size: 300%;
  -webkit-margin-after: 0.1em;
  -webkit-margin-before: 0;
}
.titleDiv h2 {
  font-size: 200%;
  -webkit-margin-before: 0.1em;
}
</style>
