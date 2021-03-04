<template>
  <div class="addData styleDivLimit">
    <div v-for="(format, index) in states.dataStyle.format" :key="index">
      <!--点击1，显示导入的数据面板-->
      <div class="dataStyle" @click="visualShow">
        <div class="leftbar"></div>
        <span>{{ format }}</span>
        <img src="../image/all/眼睛.png" />
        <img src="../image/all/垃圾桶.png" />
      </div>
      <!--点击1，显示导入的数据面板-->
      <div v-show="visualBoardShow">
        <!--基础开始-->
        <div class="styleTitle">
          <span>基础</span>
          <img src="../image/all/dot.png" />
        </div>
        <!--点击3，显示热力图网格图-->
        <div class="visualName" @click="showNameBoard">
          <div>
            <img :src="states.visualImageSrc" />
          </div>
          <span>{{ states.visualImageName }}</span>
        </div>
        <!--点击3，显示热力图网格图-->
        <div class="visualBoard" v-show="visualNameShow">
          <div v-for="(data, index) in visualData" :key="index" class="visual_content">
            <div @click="visualImage(data)">
              <img :src="data.src" />
            </div>
            <span>{{ data.title }}</span>
          </div>
        </div>
        <!--lon,lat ,height选项-->
        <div v-for="(vals, rank) in currentVisData.aimPos" :key="rank">
          <div class="dataFormats">
            <span>{{ vals.title }}</span>
            <!--点击5，显示数据格式fields-->
            <div class="dataFormatDiv">
              <div @click="ChangeFormat(vals)">
                string
              </div>
              <span>{{ vals.value }}</span>
            </div>
          </div>
          <!--点击5，显示数据格式fields-->
          <div v-show="vals.show" class="formatBoard">
            <div class="dataFormatDiv dataFormatDiv2" v-for="(data, index) in states.dataStyle.keys" :key="index">
              <div @click="changeDataFormat(data, index, vals)">
                string
              </div>
              <span>{{ data }}</span>
            </div>
          </div>
        </div>
        <!--lon,lat ,height选项结束-->
        <!--基础结束-->
        <!--样式开始-->
        <div class="styleTitle">
          <span>样式</span>
          <img src="../image/all/dot.png" />
        </div>
        <div v-for="(values, index) in currentVisData.values" :key="index">
          <div class="colorChoose" v-show='values.type == "color" '>
            <img src="../image/all/color.png" @click="changeColor(values)" />
            <span @change="visStyleChange">{{values.key}}</span>
            <div id="triangle"></div>
          </div>
          <div class="palette" v-show="values.board"></div>
          <!--线条宽度开始-->
          <div v-show='values.type == "number"'>
            <div class="styleTitle strokeStyle">
              <span>{{values.name}}</span>
              <div >{{ values.value }}</div>
            </div>
            <el-slider class="widthBar" v-model="values.value" @change="visStyleChange" ></el-slider>
          </div>
        </div>
        <!--线条宽度结束-->
        <!--样式结束-->
      </div>
    </div>
  </div>
</template>
<script>
import { visualData } from "../model/data/data.js";
import visManager from "../model/VisManager.js";

export default {
  name: "VisualStyle",
  data() {
    return {
      visualBoardShow: false,
      visualNameShow: false,
     currentVisData:[],
      visualData: visualData,
      states: visManager.state,
    };
  },
  methods: {
    visStyleChange(){
  const visualName = [this.states.visualImageName];
      const aim=this.currentVisData.aimPos;
      visManager.createLayer(visualName, aim[0].index, aim[1].index);
    },
    visualShow() {
      this.visualBoardShow = !this.visualBoardShow;
    },
    showNameBoard() {
      this.visualNameShow = !this.visualNameShow;
    },
    visualImage(data) {
      this.showNameBoard();
      visManager.visualImage(data);
    },
    ChangeFormat(vals) {
      vals.show = !vals.show;
    },
    changeDataFormat(data, index, vals) {
      vals.value = data;
      vals.index = index;
      this.ChangeFormat(vals);
      this.visStyleChange();
      // const visualName = [this.states.visualImageName];
      // const aim=this.currentVisData.aimPos;
      // visManager.createLayer(visualName, aim[0].index, aim[1].index);
    },
    changeColor(values) {
      values.board = !values.board;
      document.getElementById("triangle").style.borderColor = "transparent yellow yellow transparent";
    },
    initCurrentVis(){
    const name = this.states.visualImageName;
    visualData.map(val=>{
      if(val.title == name){
          this.currentVisData = val;
      }
    })
    }
  },
  watch: {
    "states.dataStyle": function(newName, oldName) {
      this.initCurrentVis();
      this.currentVisData.aimPos[0].value = newName.keys[0];
      this.currentVisData.aimPos[1].value = newName.keys[1];
    },
    "states.visualImageName":function(newName, oldName){
       this.initCurrentVis();
      this.currentVisData.aimP
    }

  }
};
</script>
<style lang="scss" src="./style.scss"></style>