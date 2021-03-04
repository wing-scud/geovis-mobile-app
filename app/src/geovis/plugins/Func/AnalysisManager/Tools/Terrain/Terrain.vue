<template>
  <div id="Terrain" class="root">
    <div id="radioBtn">
      <input type="radio" name="dixing" id="no" @change="none" checked /><label for="no">无</label> <input type="radio" name="dixing" id="height" @change="heightMap" /><label for="height">高度</label>
      <input type="radio" name="dixing" id="podu" @change="slope" /><label for="podu">坡度</label> <input type="radio" name="dixing" id="poxiang" @change="aspect" /><label for="poxiang">坡向</label>
    </div>
    <div class="denggao">
      <span>等高线</span>
      <el-switch @change="enableContour" v-model="switchbtn" active-color="#87F2FA" inactive-color="#283238"> </el-switch>
    </div>
    <span id="viewshedHeading"> 间距：{{ distance }} </span>
    <el-slider v-model="distance" @change="contourSpacing" step.number="1" :min="minj" :max="maxj"> </el-slider>
    <span id="viewshedPitch"> 线宽： {{ lineWidth }} </span>
    <el-slider v-model="lineWidth" @change="contourWidth" step.number="1" :min="minx" :max="maxx"> </el-slider>
    <!-- <div class="savaResult">
      <el-button class="buttonBasic interval" @click="savaResults">
        保存结果
      </el-button >
    </div>
    <div class="results" v-for="(savedata, index) in saveData" :key="index" @click="reappear(savedata)">
      <input v-if="savedata.name" :value="savedata.name" readonly="true" />
      <gv-icon slot="suffix" class="close-btn" icon=" #icon-baseline-clear-px" width="24" height="24" @click="removeData(index)"></gv-icon>
      <gv-icon slot="suffix" class="close-btn" icon=" #icon-baseline-remove-px" width="24" height="24" @click="editData(savedata)"></gv-icon>
    </div> -->
  </div>
</template>
<script>
import { viewModel } from "./store";
const saveData = [];
export default {
  name: "Terrain",
  data() {
    return {
      minj: 0,
      maxj: 360,
      minx: 1,
      maxx: 4,
      switchbtn: false,
      distance: viewModel.state.viewModel.contourSpacing,
      lineWidth: viewModel.state.viewModel.contourWidth,
      stateView: viewModel.state.viewModel,
      saveData: saveData
    };
  },
  methods: {
    reappear(savedata) {
      this.distance = savedata.distance;
      this.lineWidth = savedata.lineWidth;
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
          distance: this.distance,
          lineWidth: this.lineWidth
        };
        saveData.push(data);
      });
    },
    enableContour() {
      this.stateView.enableContour = this.switchbtn;
      viewModel.updateMaterial();
    },
    contourSpacing(val) {
      this.stateView.contourSpacing = val;
      viewModel.updateMaterial();
    },
    contourWidth(val) {
      this.stateView.contourWidth = val;
      viewModel.updateMaterial();
    },
    none() {
      this.stateView.selectedShading = "none";
      viewModel.updateMaterial();
    },
    heightMap() {
      this.stateView.selectedShading = "heightMap";
      viewModel.updateMaterial();
    },
    slope() {
      this.stateView.selectedShading = "slope";
      viewModel.updateMaterial();
    },
    aspect() {
      this.stateView.selectedShading = "aspect";
      viewModel.updateMaterial();
    }
  },
  beforeDestroy() {
    if (this.switchbtn) {
      this.stateView.enableContour = false;
      this.switchbtn = false;
      viewModel.updateMaterial();
    }
    if (this.stateView.selectedShading !== "none") {
      this.stateView.selectedShading = "none";
      viewModel.updateMaterial();
    }
  }
};
</script>

<style src="./Terrain.css" scoped></style>
