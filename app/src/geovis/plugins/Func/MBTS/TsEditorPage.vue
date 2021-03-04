<template>
  <div class="tsEditor">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="编辑目标" class="head">
        <div class="editItem big">
          <div class="itemHead">
            <span class="name">设置层级</span>
            <span class="value submit" @click="editDisplayDistance">确认</span>
            <span class="value"> 点-广告牌-模型</span>
          </div>
          <div class="editCompo">
            <el-slider v-model="displayValue" range :max="20" :min="1" :marks="marks" :step="1" class="slider" id="interval"></el-slider>
          </div>
        </div>
        <div class="box">
          <div class="headBox">
            <div class="symbolBox"><img src="@/assets/mb/点.png" /></div>
            <div class="titleBox">点设置</div>
            <div class="rumpHeadBox"><img src="@/assets/mb/标题 .png" class="rump" /></div>
          </div>
          <div class="editItem">
            <div class="itemHead">
              <span class="name"> 大小</span>
              <span class="value">{{ pointOptions.pixelSize }}</span>
            </div>
            <div class="editCompo">
              <el-slider v-model="pointOptions.pixelSize" :max="15" :min="8" :step="1" class="slider" @change="setPointPixelSize"></el-slider>
            </div>
          </div>
          <div class="editItemInline">
            <div class="itemInlineName">
              颜色
            </div>
            <div class="itemInlinCompoColor">
              <el-color-picker v-model="pointOptions.color" size="mini" @change="setPointColor"> </el-color-picker>
            </div>
            <div class="inlineValueColor">
              {{ pointOptions.color }}
            </div>
          </div>
        </div>
        <div class="box">
          <div class="headBox">
            <div class="symbolBox"><img src="@/assets/mb/广告牌.png" /></div>
            <div class="titleBox">广告牌设置</div>
            <div class="rumpHeadBox"><img src="@/assets/mb/标题 .png" class="rump" /></div>
          </div>
          <div class="editItemInline">
            <div class="itemInlineName">
              宽度
            </div>
            <div class="itemInlinCompoColor">
              <el-input-number v-model="billboardOptions.width" @change="setWidth"> </el-input-number>
            </div>
          </div>
          <div class="editItemInline">
            <div class="itemInlineName">
              高度
            </div>
            <div class="itemInlinCompoColor">
              <el-input-number v-model="billboardOptions.height" @change="setHeight"> </el-input-number>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="headBox">
            <div class="symbolBox"><img src="@/assets/mb/模型.png" /></div>
            <div class="titleBox">模型设置</div>
            <div class="rumpHeadBox"><img src="@/assets/mb/标题 .png" class="rump" /></div>
          </div>
          <div class="editItem">
            <div class="itemHead">
              <span class="name"> 大小</span>
              <span class="value">{{ modelOptions.scale }}</span>
            </div>
            <div class="editCompo">
              <el-slider v-model="modelOptions.scale" :max="15" :min="1" :step="1" class="slider" @change="setModelScale"></el-slider>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="编辑状态">
        <div class="editItemInline">
          <div class="itemInlineName">
            <span class="padding">状态</span>
          </div>
          <div class="itemInlinCompoColor">
            <el-button @click="changeState" class="button" size="mini"> {{ state ? "实时" : "历史" }}</el-button>
          </div>
          <div class="itemInlinCompoColor">
            <el-button @click="clearAll" class="button" size="mini"> 清除</el-button>
          </div>
        </div>
        <div class="box">
          <div class="headBox">
            <div class="symbolBox"><img src="@/assets/mb/路径.png" /></div>
            <div class="titleBox">历史状态编辑</div>
            <div class="rumpHeadBox"><img src="@/assets/mb/标题 .png" class="rump" /></div>
          </div>
          <div class="editItem">
            <div class="itemHead">
              <span class="name"> 路径线宽</span>
              <span class="value">{{ historyOptions.totalPathWidth }}</span>
            </div>
            <div class="editCompo">
              <el-slider v-model="historyOptions.totalPathWidth" :max="8" :min="1" :step="1" class="slider" @change="setHistoryWidth"></el-slider>
            </div>
          </div>
          <div class="editItemInline">
            <div class="itemInlineName">
              颜色
            </div>
            <div class="itemInlinCompoColor">
              <el-color-picker v-model="historyOptions.totalPathColor" size="mini" @change="setHistoryColor"> </el-color-picker>
            </div>
            <div class="inlineValueColor">
              {{ historyOptions.totalPathColor }}
            </div>
          </div>
          <div class="editItemInline">
            <div class="itemInlineName">
              平滑
            </div>
            <div class="itemInlinCompoColor">
              <el-switch v-model="historyOptions.smooth" @change="setHistorySmooth"></el-switch>
            </div>
          </div>
          <div class="editItem">
            <div class="itemHead">
              <span class="name"> 时间流速</span>
              <span class="value">{{ speed }}</span>
            </div>
            <div class="editCompo">
              <el-slider v-model="speed" :max="50" :min="-50" :step="1" @change="setSpeed"></el-slider>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="伴飞对象">
        <div class="box">
          <div class="headBox">
            <div class="symbolBox"><img src="@/assets/mb/标牌.png" /></div>
            <div class="titleBox attribute">标牌</div>
          </div>
          <div class="editItemInline">
            <div class="itemInlineName">
              状态
            </div>
            <div class="itemInlinCompoColor">
              <el-switch v-model="label" @change="setLabel"> </el-switch>
            </div>
          </div>
          <div class="editItem">
            <div class="itemHead">
              <span class="name"> 大小</span>
              <span class="value">{{ markOptions.scale }}</span>
            </div>
            <div class="editCompo">
              <el-slider v-model="markOptions.scale" :max="8" :min="1" :step="1" class="slider" @change="setMarkScale"></el-slider>
            </div>
          </div>
          <div class="editItemInline">
            <div class="itemInlineName">
              颜色
            </div>
            <div class="itemInlinCompoColor">
              <el-color-picker v-model="markOptions.fillColor" size="mini" @change="setMarkColor"> </el-color-picker>
            </div>
            <div class="inlineValueColor">
              {{ markOptions.fillColor }}
            </div>
          </div>
        </div>
        <div class="box">
          <div class="headBox">
            <div class="symbolBox"><img src="@/assets/mb/线条.png" /></div>
            <div class="titleBox">引线</div>
          </div>
          <div class="editItemInline">
            <div class="itemInlineName">
              状态
            </div>
            <div class="itemInlinCompoColor">
              <el-switch v-model="leadLine" @change="setLeadLine"> </el-switch>
            </div>
          </div>
          <div class="editItem">
            <div class="itemHead">
              <span class="name"> 线宽</span>
              <span class="value">{{ leadLineOptions.width }}</span>
            </div>
            <div class="editCompo">
              <el-slider v-model="leadLineOptions.width" :max="8" :step="1" :min="1" class="slider" @change="setLeadLineWidth"></el-slider>
            </div>
          </div>
          <div class="editItemInline">
            <div class="itemInlineName">
              颜色
            </div>
            <div class="itemInlinCompoColor">
              <el-color-picker v-model="leadLineOptions.color" size="mini" @change="setLeadLineColor"> </el-color-picker>
            </div>
            <div class="inlineValueColor">
              {{ leadLineOptions.color }}
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
//@ts-ignore
import store from "./store";
import { earthStore } from "@/geovis/store";
export default {
  name: "TsEditorComponent",
  props: ["type"],
  data() {
    return {
      activeNames: "",
      displayValue: store.tsManager.editor.displayRange, //于height相反，表示层级
      marks: {
        3: "1e7",
        6: "1e6",
        10: "5e4",
        12: "1e4",
        16: "1e3"
      },
      pointOptions: store.tsManager.editor.pointConfigure,
      billboardOptions: store.tsManager.editor.billboardConfigure,
      modelOptions: store.tsManager.editor.modelConfigure,
      leadLineOptions: store.tsManager.editor.leadLineConfigure,
      markOptions: store.tsManager.editor.markConfigure,
      historyOptions: store.tsManager.editor.historyConfigure,
      //@ts-ignore
      state: this.type,
      leadLine: false,
      label: false,
      speed: 1
    };
  },
  methods: {
    editDisplayDistance() {
      const earth = earthStore.earth;
      //@ts-ignore
      const displayValue = this.displayValue;
      const tsManager = store.tsManager;
      const editor = tsManager.editor;
      const originRange = editor.displayRange;
      editor.displayRange = [displayValue[0], displayValue[1]];
      if (originRange[0] !== displayValue[0]) {
        //point to bill
        tsManager.setBillboardToPoint();
      }
      if (originRange[1] !== displayValue[1]) {
        tsManager.setModelToBillboard();
      }
    },
    changeState() {
      //@ts-ignore
      this.state = !this.state;
      //@ts-ignore
      this.$emit("changeType", this.state);
    },
    setPointPixelSize() {
      const tsManager = store.tsManager;
      tsManager.setPointPixelSize();
    },
    setPointColor() {
      const tsManager = store.tsManager;
      tsManager.setPointColor();
    },
    setBillboardScale() {
      const tsManager = store.tsManager;
      tsManager.setBillboardScale();
    },
    setModelScale() {
      const tsManager = store.tsManager;
      tsManager.setModelScale();
    },
    setHistoryWidth() {
      const tsManager = store.tsManager;
      tsManager.setHistoryWidth();
    },
    setHistoryColor() {
      const tsManager = store.tsManager;
      tsManager.setHistoryColor();
    },
    setMarkColor() {
      const tsManager = store.tsManager;
      tsManager.setMarkColor();
    },
    setMarkScale() {
      const tsManager = store.tsManager;
      tsManager.setMarkScale();
    },
    setLeadLineWidth() {
      const tsManager = store.tsManager;
      tsManager.setLeadLineWidth();
    },
    setLeadLineColor() {
      const tsManager = store.tsManager;
      tsManager.setLeadLineColor();
    },
    setWidth() {
      const tsManager = store.tsManager;
      tsManager.setBillboardWidth();
    },
    setHeight() {
      const tsManager = store.tsManager;
      tsManager.setBillboardHeight();
    },
    setLeadLine() {
      const tsManager = store.tsManager;
      //@ts-ignore
      tsManager.setLeadLine(this.leadLine);
    },
    setLabel() {
      const tsManager = store.tsManager;
      //@ts-ignore
      tsManager.setLabel(this.label);
    },
    setHistorySmooth() {
      const tsManager = store.tsManager;
      tsManager.history.smooth = this.historyOptions.smooth;
    },
    setSpeed() {
      const tsManager = store.tsManager;
      tsManager.history.speed = this.speed;
    },
    clearAll() {
      this.$emit("clearAll");
    }
  },
  mounted() {},
  beforeDestroy() {}
};
</script>
<style scoped>
.head {
  background-color: gray;
  font-size: 20px;
  /* padding-right: 10px; */
}
.editItem {
  padding: 5px 0;
  width: 100%;
  height: 65px;
  font-size: 13px;
}
.itemHead {
  display: inline-block;
  width: 100%;
  height: 20px;
}
.name {
  font-size: 13px;
  float: left;
}
.value {
  float: right;
  min-width: 40px;
  text-align: center;
  background-color: rgb(41, 50, 60);
}
.editCompo {
  width: 90%;
  height: 35px;
  margin: 0 auto;
}
.slider {
  padding: 0px 0px;
}
.headBox {
  width: 100%;
  height: 24px;
  display: inline-block;
  border-top: #a4a3a39e 1px solid;
  border-bottom: #a4a3a39e 1px solid;
  padding-right: 10px;
}
.symbolBox {
  width: 24px;
  height: 24px;
  float: left;
  display: inline-flex;
  align-items: center;
}
.titleBox {
  font-size: 13px;
  float: left;
  height: 24px;
}
.rumpHeadBox {
  width: 37px;
  height: 100%;
  float: right;
}
.box {
  margin: 10px 0;
  background-color: rgba(33, 33, 35, 0.64);
  border-radius: 5px;
  padding: 0 5px;
}
.big {
  height: 80px;
}
.editItemInline {
  width: 100%;
  height: 30px;
  margin: 5px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.itemInlineName {
  font-size: 13px;
  height: 30px;
  width: 80px;
  margin-right: 20px;
  float: left;
  line-height: 30px;
}
.itemInlinCompoColor {
  height: 30px;
  /* width: 30px; */
  float: left;
  margin: 2px 5px;
}
.inlineValueColor {
  max-width: 120px;
  min-width: 60px;
  font-size: 14px;
  text-align: center;
  height: 30px;
  border-radius: 5px;
  background-color: rgb(41, 50, 60);
}
.submit {
  background-color: #2a8cfd;
  width: 50px;
  border-radius: 5px;
  height: 100%;
  text-align: center;
  margin-left: 10px;
}
.submit:hover {
  background-color: #2a8cfd70;
}
.attribute {
  background-color: rgb(71, 72, 77);
}
.button {
  color: white;
  background-color: #256a8a;
}
.button:hover {
  background-color: #256a8aa8;
}
.padding {
  padding-left: 5px;
}
.rump {
  height: 20px;
  margin: 2px 0;
}
</style>
<style>
.el-collapse-item__content {
  padding-left: 10px !important;
  padding-bottom: 5px;
  background-color: rgb(28, 29, 36) !important;
}
.el-collapse-item__header {
  color: #d6d3d3;
}
.el-input-number__decrease {
  border-right: transparent;
}
.el-input-number__increase {
  border-left: transparent;
}
.el-input__inner {
  border-bottom: 0 solid transparent !important;
}
#interval .el-slider__bar {
  background-color: transparent !important;
}
</style>
