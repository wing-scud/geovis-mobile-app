<template>
  <div class="buffer-plugin">
    <van-row class="row">
      <van-col span="22"
        ><span class="text"> 缓冲区半径&nbsp;{{ radius }} m</span></van-col
      >
    </van-row>
    <van-row class="row-slider" type="flex" align="center">
      <van-col span="22" offset="1"> <van-slider v-model="radius" :min="1" :max="1000" @change="changeRadius"> </van-slider></van-col>
    </van-row>
    <van-row class="row">
      <van-col span="8"> <van-button plain hairline class="buffer-button" type="primary" @click="show = true"> 选择图形</van-button></van-col>
      <van-col span="8" offset="8"><van-button plain hairline class="buffer-button" type="primary" @click="finishDraw">结束绘制</van-button></van-col>
    </van-row>
    <van-action-sheet v-model="show" :actions="actions" @select="select" />
    <van-row class="row" gutter="20">
      <van-col span="6"><van-button plain hairline class="buffer-button" type="primary" @click="clearAll"> 清除</van-button></van-col>
      <van-col span="6"><van-button plain hairline class="buffer-button" type="primary" @click="getBuffer"> 缓冲区</van-button></van-col>
      <van-col span="6"><van-button plain hairline class="buffer-button" type="primary" @click="analyticsArea"> 检索</van-button></van-col>
      <van-col span="6"><van-button plain hairline class="buffer-button" type="primary" @click="goBack">退出</van-button></van-col>
    </van-row>
  </div>
</template>
<script lang="ts">
import { earthStore } from "@/geovis/store";
import Vue from "vue";
//@ts-ignore
import { draw, generateBuffer, getPrimitive, createRandomIcons, clearBuffer } from "./BufferAnalyticsTool";
const BufferAnalytics = Vue.extend({
  name: "BufferAnalytics",
  data() {
    return {
      radius: 100,
      type: "",
      _drawing: undefined,
      _primitive: undefined,
      buffer: undefined,
      show: false,
      actions: [
        {
          name: "点"
        },
        {
          name: "圆"
        },
        {
          name: "线"
        },
        {
          name: "多边形"
        }
      ]
    };
  },
  mounted() {
    earthStore.setMapFullScreen(true);
    earthStore.state.onlyMap = true;
  },
  beforeDestroy() {
    this.clearAll();
    earthStore.setMapFullScreen(false);
    earthStore.state.onlyMap = false;
  },
  methods: {
    finishDraw() {
      if (this._drawing) {
        this._drawing();
      }
    },
    clearAll() {
      if (this._drawing) {
        this._drawing();
      }
      clearBuffer();
      this.type = undefined;
      this.radius = 100;
      this._primitive = undefined;
      this.buffer = undefined;
      this.show = false;
    },
    changeRadius() {},
    select(item) {
      this.show = false;
      const type = item.name;
      this.type = type;
      this._drawing = draw(type);
      getPrimitive(type).then(primitive => {
        this._primitive = primitive;
      });
    },
    goBack() {
        this.clearAll();
    earthStore.setMapFullScreen(false);
    earthStore.state.onlyMap = false;
      //@ts-ignore
      this.$router.backward(-1);
    },
    getBuffer() {
      this.buffer = generateBuffer(this.type, this._primitive, this.radius);
    },
    analyticsArea() {
      createRandomIcons(this.buffer);
    }
  }
});
export default BufferAnalytics;
</script>

<style lang="scss" scoped>
.buffer-plugin {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background-color: white;
}
.row {
  padding: 5px 10px;
  height: 30px;
}
.text {
  line-height: 30px;
}
.row-slider {
  padding: 5px 10px;
  height: 10px;
}
.buffer-button {
  width: 100%;
  height: 30px;
}
.buffer-plugin .van-button--normal {
  padding: 0 0;
}
</style>
