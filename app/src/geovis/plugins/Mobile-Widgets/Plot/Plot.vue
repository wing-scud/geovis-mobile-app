<template>
  <div>
    <div class="editor">
      <div class="editor-types">
        <div class="editor-item"><van-icon name="arrow-left" size="35px" @click="goBack" /></div>
        <div class="editor-type">
          <div class="editor-item" v-for="item in types" :key="item.id">
            <MIcon :icon="item.icon" :actived="componentName === item.id" labelColor="white" length="35px" backgroundColor="white" :label="item.name" circle @click="changeComponent(item.id)"></MIcon>
          </div>
        </div>
        <div class="editor-item"><van-icon name="success" size="30px" @click="savePlot" /></div>
      </div>
      <div class="editor-options">
        <div class="editor--options-item" v-for="item in typeOptions" :key="item.id">
          <MIcon :icon="item.icon" :actived="option === item.name" length="35px" labelColor="white" backgroundColor="white" circle :label="item.name" @click="startDraw(item.name)"></MIcon>
        </div>
      </div>
    </div>
    <div class="property"></div>
    <div class="results-popup">
      <MIcon icon="icon-luxianchaxun" length="35px" backgroundColor="white" circle @click="popShow = true"></MIcon>
    </div>
    <van-popup v-model="popShow" transition-appear position="right" :style="{ width: '70%', height: '100%' }" :close-on-popstate="true" @close="closePopup">
      <table class="result-list">
        <tr class="flex-result">
          <th class="operator">类型</th>
          <th class="result">结果</th>
          <th class="result">时间</th>
        </tr>
        <van-swipe-cell v-for="(item, index) in results" :key="index">
          <tr class="flex-result">
            <td class="operator">{{ item.type }}</td>
            <td class="result">{{ item.value }}</td>
            <td class="time">{{ item.time }}</td>
          </tr>
          <template #right>
            <van-button square type="danger" text="删除" @click="deletePlotEntity(index)"/>
            <van-button square type="primary" text="编辑" />
          </template>
        </van-swipe-cell>
      </table>
    </van-popup>
    <van-dialog v-model="saveDialogShow" title="保存场景" show-cancel-button> <van-field v-model="sceneName" label="名称" placeholder="请输入名称" /> </van-dialog>
  </div>
</template>
<script>
const Types = DrawHelper.Types;
import { earthStore } from "@/geovis/store";
import { types, plot } from "./store.ts";
export default {
  name: "MeasureResult",
  data() {
    return {
      componentName: undefined,
      _drawhelper: undefined,
      types: types,
      totalOptions: {},
      option: undefined,
      typeOptions: [],
      popShow: false,
      results: plot.drawResults,
      saveDialogShow: false,
      sceneName:""
    };
  },
  mounted() {
    const earth = earthStore.earth;
    earthStore.setMapFullScreen(true);
    earthStore.state.onlyMap = true;
    types.forEach((item) => {
      this.totalOptions[item.id] = item.options;
    });
    this.componentName = "liangcei";
  },
  beforeDestroy() {
    earthStore.setMapFullScreen(false);
    earthStore.state.onlyMap = false;
  },
  watch: {
    componentName: function () {
      this.typeOptions = this.totalOptions[this.componentName];
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    savePlot() {
      this.saveDialogShow = true;
    },
    startDraw(option) {
      this.option = option;
      const type = option;
      switch (this.componentName) {
        case "liangcei":
          plot.startMeasure(option);
          break;
        case "tuwen":
          plot.startDrawMarker(type);
          break;
        case "line":
          plot.startDrawLine(type);
          break;
        case "polygon":
          plot.startDrawPolygon(type);
          break;
        case "other":
          plot.startDrawOther(type);
          break;
      }
    },
    changeComponent(name) {
      this.componentName = name;
    },
    closePopup() {},
    deletePlotEntity(index){
      plot.deleteResult(index)
    },
    handclick(type) {
      switch (type) {
        case "三角量测":
          this.triangleMeasure();
          break;
        case "距离量测":
          this.distanceMeasure();
          break;
        case "面积量测":
          this.areaMeasure();
          break;
        default:
          break;
      }
    },
  },
};
</script>
<style scoped>
.editor {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.property {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.results-popup {
  position: fixed;
  top: 40%;
  right: 0;
}
.editor-types {
  background-color: #1989fa;
  display: inline-flex;
  padding: 5px 5px;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.editor-item {
  display: flex;
  align-items: center;
  /* width: 50px; */
  height: 55px;
  margin: 0 5px;
}
.editor-type {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: flex-start;
}

.result-list {
  padding: 5px 5px;
  width: 100%;
}
.flex-result {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin: 5px 0;
  width: 100%;
}

.operator {
  flex-grow: 1;
  /* width: 100px; */
}
.result {
  flex-grow: 3;
}
.time {
  flex-grow: 2;
}
.delete {
  width: 15px;
  border: 1px solid white;
  border-radius: 2px;
}
.editor-options {
  /* background-color: #1989fa; */
  display: inline-flex;
  padding: 3px 5px;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 30px;
}
.editor--options-item {
  margin-right: 10px;
}
.van-swipe-cell__wrapper {
  flex: 1;
  display: flex;
  flex-direction: row;
}
</style>
