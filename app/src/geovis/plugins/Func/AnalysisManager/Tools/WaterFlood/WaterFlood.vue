<template>
  <div>
    <span id="depth" class="span"> 当前水位高度: {{ state.currentDepth.toFixed(2) }} </span>
    <el-slider v-model="state.currentDepth" @Change="onChange" :step="step" :min="state.minDepth" :max="state.maxDepth"> </el-slider>
    <div class="divline">
      <span id="startDepth" class="span"> 最低水位：{{ state.minDepth }} </span>
      <div class="iconfont small" title="选择" @click="pickDepth('low')">&#xe697;</div>
    </div>
    <div class="divline">
      <span id="endDepth" class="span"> 最高水位：{{ state.maxDepth }} </span>
      <div class="small iconfont small" title="选择" @click="pickDepth('high')">&#xe697;</div>
    </div>
    <div class="buttonType">
      <el-button class="buttonBasic " @click="selectArea">
        选取
      </el-button>
      <el-button class="buttonBasic" @click="toggleAnimate">
        {{ state.playing ? "暂停" : "播放" }}
      </el-button>
      <el-button class="buttonBasic " @click="reset">
        清除
      </el-button>
      <!-- <el-button class="buttonBasic" @click="savaResults">
        保存
      </el-button> -->
    </div>
    <!-- <div class="results" v-for="(savedata, index) in saveData" :key="index" @click="reappear(savedata)">
      <input v-if="savedata.name" :value="savedata.name" readonly="true" />
      <gv-icon slot="suffix" class="close-btn" icon=" #icon-baseline-clear-px" width="24" height="24" @click="removeData(index)"></gv-icon>
      <gv-icon slot="suffix" class="close-btn" icon=" #icon-baseline-remove-px" width="24" height="24" @click="editData(savedata)"></gv-icon>
    </div> -->
  </div>
</template>
<script>
import { earthStore } from "@/geovis/store";
/* eslint-disable */
import { waterTool,updateWaterMask } from "./water";
import {saveData} from "./data";
let polygon;
 export default {
  name: "WaterFlood",
  data() {
    return {
      state: waterTool.state,
      currentDepth: 23,
      step: 0.01,
      saveData:saveData,
    };
  },
  methods: {
    reappear(savedata){
       this.state.currentDepth = savedata.currentDepth;
       this.state.minDepth = savedata.minDepth;
       this.state.maxDepth = savedata.maxDepth;
      updateWaterMask(savedata.positions,savedata.minDepth,savedata.currentDepth)
    },
    removeData(index){
          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.saveData.splice(index,1);
          this.$message({
            type: 'success',
            message: '删除成功!',
         })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });                
    },
    editData(savedata){
      this.$prompt("场景名称", '修改', {
          dangerouslyUseHTMLString: true,
          // callback:this.pushData
        }).then(({value})=>{
          savedata.name = value;
        })
    },
    savaResults(){
        this.$prompt("确认你的主题名称", '提示', {
          dangerouslyUseHTMLString: true,
          // callback:this.pushData
        }).then(({value})=>{
           const data = {
            "name":value,
            "currentDepth":this.state.currentDepth,
            "minDepth":this.state.minDepth,
            "maxDepth":this.state.maxDepth,
            "positions":waterTool.positions
      }
        saveData.push(data);
         })
    },
    onChange(value) {
      waterTool.setCurrentDepth(value);
    },
    pickDepth(type) {
      earth.once("click", e => {
        let carte = e.position;
        let carto = GeoVis.Cartographic.fromCartesian(carte);
        if (type === "low") {
          waterTool.setMinDepth(carto.height);
        } else {
          waterTool.setMaxDepth(carto.height);
        }
      });
    },
    toggleAnimate(){
      waterTool.toggleAnimate();
    },
    selectArea(){
        waterTool.selectArea();
    },
    reset(){
      waterTool.reset();
      if(polygon){
        polygon.removeFrom(earth.features);
        // polygon._features.removeAll();
        polygon = undefined;
      }
    },
  },
  beforeDestroy(){
    waterTool.reset();
  }
};
</script>

<style scoped>
.divline{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
