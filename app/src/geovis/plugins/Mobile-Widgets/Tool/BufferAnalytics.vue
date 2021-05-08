<template>
  <!-- <div class="buffer-plugin">
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
  </div> -->
  <div class="buffer-plugin">
    <van-nav-bar title="缓冲区" left-text="返回" left-arrow @click-left="goBack" />
    <MIcon icon="icon-baocun" size="24px" length="32px" @click="goBack" class="buffer-save"> </MIcon>
    <div class="buffer-container">
      <van-tabs type="card">
        <van-tab title="选择图形">
          <div class="shape-list">
            <MIcon :icon="item.icon" v-for="(item, index) in actions" :key="index" size="24px" length="32px" @click="select(item)"> </MIcon>
          </div>
        </van-tab>
        <van-tab title="半径">
          <div class="buffer-radius">
            <span class="text"> 缓冲区半径</span>
            <span class="text"> {{ radius }} m</span>
          </div>
          <van-slider v-model="radius" :min="1" :max="1000" @change="changeRadius"> </van-slider>
        </van-tab>
      </van-tabs>
      <div class="buffer-tools">
        <div class="buffer-tool" @click="analyticsArea">
          <MIcon icon="icon-jiansuo" size="24px" length="32px" class="buffer-icon"></MIcon>
          <div class="buffer-name">检索</div>
        </div>

        <div class="buffer-tool" @click="getBuffer">
          <MIcon icon="icon-huanchongqufenxi" size="24px" length="32px" class="buffer-icon"></MIcon>
          <div class="buffer-name">缓冲区</div>
        </div>
        <div class="buffer-tool" @click="finishDraw">
          <MIcon icon="icon-wancheng" size="24px" length="32px" class="buffer-icon"></MIcon>
          <div class="buffer-name">结束绘制</div>
        </div>
        <div class="buffer-tool" @click="clearAll">
          <MIcon icon="icon-qingchu" size="24px" length="32px" class="buffer-icon"></MIcon>
          <div class="buffer-name">清除</div>
        </div>
      </div>
    </div>
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
      show: true,
      actions: [
        {
          name: "点",
          icon: "icon-dian",
        },
        {
          name: "圆",
          icon: "icon-yuan",
        },
        {
          name: "线",
          icon: "icon-xian",
        },
        {
          name: "多边形",
          icon: "icon-duobianxing",
        },
      ],
    };
  },
  activated() {
    earthStore.setMapFullScreen(true);
    earthStore.state.onlyMap = true;
  },
  // mounted() {
  //   earthStore.setMapFullScreen(true);
  //   earthStore.state.onlyMap = true;
  // },
  deactivated() {
    this.clearAll();
    earthStore.setMapFullScreen(false);
    earthStore.state.onlyMap = false;
  },
  // beforeDestroy() {
  //   this.clearAll();
  //   earthStore.setMapFullScreen(false);
  //   earthStore.state.onlyMap = false;
  // },
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
      getPrimitive(type).then((primitive) => {
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
    },
  },
});
export default BufferAnalytics;
</script>
<style scoped lang="scss">
.buffer-save {
  position: fixed;
  top: 8px;
  right: 10px;
  z-index: 999;
}
.buffer-container {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.shape-list {
  width: 100%;
  height: 48px;
  line-height: 48px;
  display: flex;
  justify-content: space-around;
}
.buffer-radius {
  width: 90%;
  height: 24px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  margin: 5px auto;
  color: $darkblue-word;
  font-size: 14px;
}
.buffer-tools {
  width: 100%;
  height: 48px;
  line-height: 42px;
  display: flex;
  justify-content: space-around;
  background: $navbar-background;
}
.buffer-icon {
  height: 17px;
}
.buffer-tool {
  text-align: center;
}
.buffer-name {
  color: white;
  font-size: 12px;
  margin: auto;
}
</style>
<style lang="scss"  >
.buffer-plugin {
  .van-nav-bar {
    background: $navbar-background;
  }
  .van-tab__text-wrapper,
  .van-tabs {
    //  position:fixed;
    //  bottom:0;
    background: $navbar-background;
    width: 100%;
  }
  .van-tabs--card > .van-tabs__wrap {
    height: 48px;
  }
  .van-tabs__nav--card {
    margin: 0;
    height: 48px;
  }
  .van-tabs__nav--card .van-tab.van-tab--active {
    color: $highlight;
    background: transparent;
    border-bottom: 2px solid $highlight;
  }
  .van-tabs__nav {
    background: $navbar-background;
    border: $split-line;
  }
  .van-tabs__nav--card .van-tab {
    color: white;
    border-right: 0;
  }
  .van-tabs__content {
    height: 48px;
    line-height: 48px;
    border-bottom: $split-line;
    overflow: hidden;
  }
  .van-popup--bottom.van-popup--round {
    border-radius: 0;
  }
  .van-slider {
    width: 90%;
    margin: 5px auto;
  }
  .van-slider__button {
    width: 16px;
    height: 16px;
  }
  .van-nav-bar__title,
  .van-nav-bar__text,
  .van-nav-bar .van-icon {
    color: white;
  }
  //  .van-action-sheet__content{
  //    display: flex;
  //    justify-content: space-around;
  //  }
  //  .van-action-sheet{
  //    color:white;
  //  }
  //  .van-action-sheet__cancel, .van-action-sheet__item{
  //    background:$navbar-background;
  //  }
  //  .van-popup--bottom{
  //    position:absolute;
  //  }
}
// .buffer-plugin {
//   position: fixed;
//   left: 0;
//   top: 0;
//   width: 100%;
//   background-color: white;
// }
// .row {
//   padding: 5px 10px;
//   height: 30px;
// }
// .text {
//   line-height: 30px;
// }
// .row-slider {
//   padding: 5px 10px;
//   height: 10px;
// }
// .buffer-button {
//   width: 100%;
//   height: 30px;
// }
// .buffer-plugin .van-button--normal {
//   padding: 0 0;
// }
</style>
