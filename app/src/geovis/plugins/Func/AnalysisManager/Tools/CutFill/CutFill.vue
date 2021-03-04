<template>
  <div id="cutfill">
    <span id="result">当前高度:{{ state.cutFillHeight }}米</span>
    <el-slider v-model="state.cutFillHeight" @change="onChange" step.number="0.01" :min="state.cutFillMinHeight" :max="state.cutFillMaxHeight != 0 ? state.cutFillMaxHeight : 100"> </el-slider>
    <div class="buttonType">
      <el-button class="buttonBasic interval" @click="addPolygons">
        选择范围
      </el-button>
      <el-button class="buttonBasic interval" @click="startAnaly()">
        开始分析
      </el-button>
      <el-button class="buttonBasic interval" @click="destroy()">
        清除
      </el-button>
    </div>
    <div class="table">
      <el-table :data="datas" class="tableName" :span="24" border>
        <el-table-column prop="name" label="计算属性" width="120"> </el-table-column>
        <el-table-column prop="result" label="计算结果" width="180"> </el-table-column>
      </el-table>
    </div>
    <!-- <el-button class="buttonBasic interval" @click="savaResults">
      保存结果
    </el-button>
    <div class="results" v-for="(savedata, index) in saveData" :key="index" @click="reappear(savedata)">
      <input v-if="savedata.name" :value="savedata.name" readonly="true" />
      <gv-icon slot="suffix" class="close-btn" icon=" #icon-baseline-clear-px" width="24" height="24" @click="removeData(index)"></gv-icon>
      <gv-icon slot="suffix" class="close-btn" icon=" #icon-baseline-remove-px" width="24" height="24" @click="editData(savedata)"></gv-icon>
    </div> -->
  </div>
</template>
<script>
import { earthStore } from "@/geovis/store";
import { cutFillTool } from "./store.js";
const saveData = [];
let positions;
export default {
  name: "CutFill",
  data() {
    return {
      step: 0.01,
      state: cutFillTool.state,
      saveData: saveData
    };
  },
  watch: {
    state() {
      const val = cutFillTool.state.cutFillHeight;
      const min = cutFillTool.state.cutFillMinHeight;
      const max = cutFillTool.state.cutFillMaxHeight;
      if (val < min) {
        cutFillTool.state.cutFillMinHeight = cutFillTool.state.cutFillHeight;
      } else if (val > max) {
        cutFillTool.state.cutFillMaxHeight = cutFillTool.state.cutFillHeight;
      }
    }
  },
  computed: {
    datas() {
      return [
        {
          key: "1",
          name: "最高点",
          result: `${this.state.maxHeight.toFixed(2)}米`
        },
        {
          key: "2",
          name: "最低点",
          result: `${this.state.minHeight.toFixed(2)}米`
        },
        {
          key: "3",
          name: "填方体积",
          result: `${this.state.fillVolume.toFixed(2)}立方米`
        },
        {
          key: "4",
          name: "挖方体积",
          result: `${this.state.cutVolume.toFixed(2)}立方米`
        },
        {
          key: "5",
          name: "填方面积",
          result: `${this.state.fillArea.toFixed(2)}平方米`
        },
        {
          key: "6",
          name: "填方面积",
          result: `${this.state.cutArea.toFixed(2)}平方米`
        }
      ];
    }
  },
  methods: {
    reappear(savedata) {
      this.state.cutFillHeight = savedata.cutFillHeight;
      positions = savedata.positions;
      const cutFill = true;
      cutFillTool.destroy();
      cutFillTool.computeCutFill(positions, savedata.cutFillHeight);
    },
    removeData(index) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.saveData.splice(index, 1);
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
    editData(savedata) {
      this.$prompt("场景名称", "修改", {
        dangerouslyUseHTMLString: true
        // callback:this.pushData
      }).then(({ value }) => {
        savedata.name = value;
      });
    },
    savaResults() {
      this.$prompt("确认你的主题名称", "提示", {
        dangerouslyUseHTMLString: true
        // callback:this.pushData
      }).then(({ value }) => {
        const data = {
          name: value,
          cutFillHeight: this.state.cutFillHeight,
          positions: positions
        };
        saveData.push(data);
      });
    },
    addPolygons() {
      const drawHelper = earthStore.drawHelper;
      const Types = window["DrawHelper"].Types;
      // drawHelper.startDrawingCutFill({
      //   color: GeoVis.Color.fromCssString("#009688").withAlpha(0.3),
      //   type: Types.CUTFILL
      // });
      drawHelper.startDrawingPolygon({
        color: GeoVis.Color.fromCssString("#009688").withAlpha(0.3),
        type: Types.SPACE_POLYGON
      });
      drawHelper.once("created", e => {
        positions = e.entity.positions;
        cutFillTool.init(e.entity.positions);
        drawHelper.primitives.remove(e.entity);
      });
    },
    startAnaly: cutFillTool.startAnaly,
    destroy: cutFillTool.destroy,
    onChange(value) {
      cutFillTool.setCutFillHeight(value);
    }
  },
  mounted() {
    const earth = window.earth;
  },
  beforeDestroy() {
    cutFillTool.destroy();
  }
};
</script>
<style scoped>
</style>
