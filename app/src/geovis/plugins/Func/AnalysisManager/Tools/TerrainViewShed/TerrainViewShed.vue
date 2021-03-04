<template>
  <div id="viewShed">
    <span id="viewshedHeading" class="span"> 海拔高度：{{ viewState.height.toFixed(2) }} </span>
    <el-slider v-model="viewState.height" @change="setViewshedHeight" :step="step" :min="viewState.minHeight" :max="viewState.maxHeight"> </el-slider>
    <el-button class="buttonBasic interval" @click="startViweShed"> 遮蔽分析 </el-button>
    <el-button class="buttonBasic interval" @click="reset"> 清除 </el-button>
  </div>
</template>
<script>
import { earthStore } from "@/geovis/store";
/* eslint-disable */
import { viewTool } from "./store.js";
let unsolveData = [];
export default {
  name: "TerrainViewShed",
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
    reset: viewTool.reset,
    setViewshedHeight: viewTool.setViewshedHeight
  }
};
</script>
<style src="./TerrainViewShed.css" scoped></style>
