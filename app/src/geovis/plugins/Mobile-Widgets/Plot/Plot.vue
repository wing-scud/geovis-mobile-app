<template>
  <div>
    <div class="editor">
      <div class="editor-types">
        <div class="editor-item"><van-icon name="arrow-left" size="35px" @click="goBack" /></div>
        <div class="editor-type">
          <div class="editor-item" v-for="item in types" :key="item.id">
            <MIcon :icon="item.icon" :actived="componentName === item.id" size="24px" length="32px" backgroundColor="white" circle @click="changeComponent(item.id)"></MIcon>
          </div>
        </div>
        <div class="editor-item"><van-icon name="success" size="30px" @click="openSaveDialog" /></div>
      </div>
      <div class="editor-options">
        <div class="editor--options-item" v-for="item in typeOptions" :key="item.id">
          <MIcon :icon="item.icon" :actived="option === item.name" size="24px" length="32px" labelColor="white" backgroundColor="white" circle :label="item.name" @click="startDraw(item.name)"></MIcon>
        </div>
      </div>
    </div>
    <div class="property">
      <!-- 属性 结束 撤销 重绘 -->
      <MIcon icon="icon-chexiao" size="24px" length="32px" backgroundColor="transparent" @click="operatorHandler('backout')"> </MIcon>
      <MIcon icon="icon-bianji" size="24px" length="32px" backgroundColor="translucent" @click="operatorHandler('edit')"> </MIcon>
      <!-- <MIcon icon="icon-default" length="45px" size="45px" backgroundColor="transparent" circle> </MIcon> -->
      <MIcon icon="icon-qingchu" size="24px" length="32px" backgroundColor="transparent" @click="operatorHandler('redraw')"> </MIcon>
      <MIcon icon="icon-jieshu" size="24px" length="32px" backgroundColor="transparent" @click="operatorHandler('stop')"> </MIcon>
    </div>
    <div class="results-popup">
      <MIcon icon="icon-ziyuan" length="35px" backgroundColor="white" circle @click="popShow = true"></MIcon>
    </div>
    <van-popup v-model="popShow" transition-appear position="right" :style="{ width: '70%', height: '100%' }" :close-on-popstate="true" @close="closePopup">
      <table class="result-list">
        <tr class="flex-result">
          <th class="operator">类型</th>
          <th class="result">结果/时间</th>
          <!-- <th class="result">时间</th> -->
        </tr>
        <van-swipe-cell v-for="(item, index) in results" :key="index">
          <tr class="flex-result">
            <td class="operator">{{ item.type }}</td>
            <!-- sup元素会导致 行高显示不正常-->
            <td class="result" :style="{ lineHeight: item.unit && item.unit.includes('平方') ? '40px' : '' }">
              {{ item.value }}
              <template v-if="item.unit">
                <span v-text="formatUnit(item.unit)"> </span>
                <sup v-if="item.unit.includes('平方')">2</sup>
              </template>
            </td>
            <!-- <td class="time">{{ item.time }}</td> -->
          </tr>
          <template #right>
            <van-button square type="danger" text="删除" @click="deletePlotEntity(index)" />
            <van-button square type="primary" text="编辑" />
          </template>
        </van-swipe-cell>
      </table>
    </van-popup>
    <van-dialog v-model="saveDialogShow" title="保存场景" show-cancel-button @confirm="confirmSavePlot"> <van-field v-model="sceneName" label="名称" placeholder="请输入名称" /> </van-dialog>
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
      sceneName: "",
    };
  },
  mounted() {
    /**
     *  初始化
     * 根据路由传来的保存的场景路径，反序列化场景
     */
    const earth = earthStore.earth;
    earthStore.setMapFullScreen(true);
    earthStore.state.onlyMap = true;
    types.forEach((item) => {
      this.totalOptions[item.id] = item.options;
    });
    this.componentName = "liangcei";
  },
  beforeDestroy() {
    earthStore.drawHelper.removeAll();
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
      //@ts-ignore
      this.$router.backward(-1);
    },
    openSaveDialog() {
      this.saveDialogShow = true;
    },
    confirmSavePlot() {
      plot.save(this.sceneName);
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
    deletePlotEntity(index) {
      plot.deleteResult(index);
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
    operatorHandler(type) {
      switch (type) {
        case "edit":
          //进入属性编辑或全局样式配置
          break;
        case "stop":
          plot.finishDrawing();
          break;
        case "backout":
          // 撤销上一步操作
          break;
        case "redraw":
          //清除当前场景内所有的实体
          // 删除所有的标绘数据
          plot.removeAll();
          break;
      }
    },
    formatUnit(unit) {
      return unit.includes("千米") ? "km" : "m";
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
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  align-items: center;
  background-color: white;
  height: 35px;
}
.results-popup {
  position: fixed;
  top: 40%;
  right: 0;
}
.editor-types {
  background-color: #3faef7c9;
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.editor-item {
  display: flex;
  align-items: center;
  /* width: 50px; */
  height: 45px;
  padding: 0 5px;
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
.measure-value {
  line-height: 40px;
}
.flex-result {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  text-align: center;
  margin: 5px 0;
  width: 100%;
  border-bottom: 1px solid #bbbbb9;
}

.operator {
  width: 80px;
  /* flex-grow: 1; */
}
.result {
  flex-grow: 1;
  text-overflow: ellipsis;
  /* white-space: nowrap; */
  overflow: hidden;
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
