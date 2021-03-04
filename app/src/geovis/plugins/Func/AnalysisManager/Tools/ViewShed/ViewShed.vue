<template>
  <div id="viewShed">
    <span id="viewshedHeading" class="span"> 方位角：{{ viewState.heading.toFixed(2) }} </span>
    <el-slider v-model="viewState.heading" @change="headingChange" :step="step" :min="min" :max="max"> </el-slider>
    <span id="viewshedPitch" class="span"> 俯仰角： {{ viewState.pitch.toFixed(2) }} </span>
    <el-slider v-model="viewState.pitch" @change="pitchChange" :step="step" :min="min" :max="max"> </el-slider>
    <div class="buttonType">
      <el-button ghost class="buttonBasic interval" @click="addVisibility"> 通视分析 </el-button>
      <el-button ghost class="buttonBasic interval" @click="startViweShed"> 可视域分析 </el-button>
      <el-button ghost class="buttonBasic interval" @click="reset"> 清除 </el-button>
    </div>
    <!-- <el-button class="buttonBasic interval" @click="savaResults">
      保存结果
    </el-button>
    <div class="results" v-for="(name, index) in saveData" :key="index" @click="reappear(index)">
      <input v-if="name" :value="name" readonly="true" />
      <gv-icon slot="suffix" class="close-btn" icon=" #icon-baseline-clear-px" width="24" height="24" @click="removeData(index)"></gv-icon>
      <gv-icon slot="suffix" class="close-btn" icon=" #icon-baseline-remove-px" width="24" height="24" @click="editData(index)"></gv-icon>
    </div> -->
  </div>
</template>
<script>
import { earthStore } from "@/geovis/store";
/* eslint-disable */
import { viewTool } from "./store.js";
let unsolveData = [];
export default {
  name: "ViewShed",
  data() {
    return {
      min: -180,
      max: 180,
      step: 0.01,
      viewState: viewTool.state,
      change: false
    };
  },
  mounted() {
    this.options = {
      visibility: {
        color: GeoVis.Color.AZURE.withAlpha(0.5),
        width: 3,
        type: window.DrawHelper.Types.VISIBILITY
      }
    };
  },
  beforeDestroy() {
    viewTool.reset();
    earthStore.drawHelper.removeAll();
  },
  computed: {
    saveData: function() {
        this.change;//用于保存数据时自动触发saveData函数,请不要删除;
        let array = [];
        unsolveData.map(data => {
          array.push(data.name);
        });
        return array;
    }
  },
  methods: {
    reappear(index) {
      viewTool.reset(unsolveData[index]);
    },
    removeData(index) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
         unsolveData.splice(index, 1);
         this.change = !this.change;
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editData(index) {
      this.$prompt("场景名称", "修改", {
        dangerouslyUseHTMLString: true
      }).then(({ value }) => {
        unsolveData[index].name = value;
        this.change = !this.change;
      });
    },
    savaResults() {
      this.$prompt("确认你的主题名称", "提示", {
        dangerouslyUseHTMLString: true
      }).then(({ value }) => {
        const data = viewTool.save();
        data.name = value;
        unsolveData.push(data);
        this.change = !this.change;
      });
    },
    addVisibility() {
      earthStore.drawHelper.startDrawingVisibility(this.options.visibility);
    },
    headingChange(value) {
      viewTool.setViewshedHeading(value);
    },
    pitchChange(value) {
      viewTool.setViewshedPitch(value);
    },
    startViweShed: viewTool.startViweShed,
    reset: function(){
      viewTool.reset();
      earthStore.drawHelper.removeAll();
    }
  }
};
</script>
<style src="./ViewShed.css" scoped></style>
