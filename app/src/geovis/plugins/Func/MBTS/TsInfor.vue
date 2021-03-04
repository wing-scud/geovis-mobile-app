<template>
  <div class="infor">
    <div class="head">
      <div class="title">
        {{ data.id }}
      </div>
      <div class="close" @click="closeDraw">
        <i class="el-icon-close"></i>
      </div>
    </div>
    <div class="image">
      <el-image :src="url" style="width: 100%; height: 100%"></el-image>
    </div>
    <div class="attributeBar">
      视角切换:
      <el-select class="divial" v-model="cameraModel" @change="changeCameraModel">
        <el-option v-for="item in cameraModels" :key="item" :label="item" :value="item"> </el-option>
      </el-select>
    </div>
    <div class="attributeBar">
      信息标牌:
      <el-switch class="divial" v-model="accompany" @change="showMarker"></el-switch>
    </div>
    <div class="name">属性</div>
    <div class="attributeBar">机型: {{ data.model.code }}</div>
    <div class="attributeBar">详情: {{ data.model.text }}</div>
    <div class="name">时刻表</div>
    <table class="flight" border="1">
      <tr v-if="data.airport">
        <td>
          <div class="place">
            {{ data.airport.origin }}
          </div>
        </td>
        <td>
          <i class="el-icon-right go"></i>
        </td>
        <td>
          <div class="place">
            {{ data.airport.destination }}
          </div>
        </td>
      </tr>
      <tr v-if="data.time.scheduled">
        <td><span>计划起飞: </span>{{ formatTime(data.time.scheduled.departure) }}</td>
        <td></td>
        <td><span>计划降落: </span>{{ formatTime(data.time.scheduled.arrival) }}</td>
      </tr>
      <tr v-if="data.time.real">
        <td><span>实际起飞: </span>{{ formatTime(data.time.real.departure) }}</td>
        <td></td>
        <td><span>实际降落: </span>{{ formatTime(data.time.real.arrival) }}</td>
      </tr>
    </table>

    <div class="name">飞机状态</div>
    <table class="flight" border="1">
      <tr>
        <td>经度:{{ flyState[0] }}</td>
        <td>高度:{{ flyState[2] }}</td>
        <td>纬度: {{ flyState[1] }}</td>
      </tr>
      <tr>
        <td><span>速度: </span>130</td>
        <td></td>
        <td><span>朝向: </span>{{ flyState[3] }}</td>
      </tr>
    </table>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import store from "./store";
export default Vue.extend({
  props: ["data", "flyState"],
  data() {
    return {
      url: require("../../../../assets/airplane.jpg"),
      track: false,
      cameraModel: "自由",
      cameraModels: ["自由", "伴随", "机头", "俯视", "侧翼"],
      accompany: true
    };
  },
  methods: {
    changeCameraModel() {
      const model = this.cameraModel;
      const cameraModelsCn = ["自由", "伴随", "机头", "俯视", "侧翼"];
      const cameraModelsEn = ["free", "track", "head", "trail", "side"];
      const index = cameraModelsCn.indexOf(model);
      store.tsManager.cameraModel = cameraModelsEn[index];
    },
    closeDraw() {
      this.$emit("closeDraw");
    },
    showMarker() {
      const state = this.accompany;
      const tsManager = store.tsManager;
      tsManager.showMarker(this.data.id, state);
    },
    formatTime(time) {
      if (time !== "暂无信息") {
        const date = new Date(time * 1000);
        const month = date.getMonth();
        const day = date.getDate();
        const hour = date.getHours();
        const hourString = hour < 10 ? "0" + hour : hour;
        const minutes = date.getMinutes();
        const minutesString = minutes < 10 ? "0" + minutes : minutes;
        const seconds = date.getSeconds();
        const secondsString = seconds < 10 ? "0" + seconds : seconds;
        return hourString + ":" + ":" + minutesString;
      } else {
        return time;
      }
    }
  },
  mounted() {
    const model = store.tsManager.cameraModel;
    const cameraModelsCn = ["自由", "伴随", "机头", "俯视", "侧翼"];
    const cameraModelsEn = ["free", "track", "head", "trail", "side"];
    const index = cameraModelsEn.indexOf(model);
    this.cameraModel = cameraModelsCn[index];
  },
  beforeDestroy() {
    this.$emit("closeDraw");
  }
});
</script>
<style scoped>
.divial {
  margin-left: 15px;
}
.operater {
  height: 30px;
  width: 100%;
  margin-top: 10px;
  margin-left: 10px;
  color: #409eff;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.loading {
  position: fixed;
  left: 40%;
  top: 40%;
  font-size: 30px;
  width: 300px;
  height: 300px;
  border-radius: 300px;
}
.modelImage {
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
}

.attributeBar {
  font-size: 14px;
  width: 100%;
  height: 30px;
  margin-top: 10px;
}
.attributeTitle {
  font-size: 18px;
  width: 100%;
  height: 30px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.slider {
  width: 60%;
  margin-left: 20px;
}
.infor {
  width: 350px;
  height: 100%;
  min-height: 600px;
  position: fixed;
  right: 0;
  top: 0;
  color: white;
  z-index: 3;
  padding: 0 10px;
  background-color: rgb(40, 50, 56);
}
.head {
  height: 60px;
  display: inline-flex;
  align-items: center;
}
.title {
  width: 150px;
  height: 100px;
  text-align: center;
  line-height: 100px;
}
.close {
  width: 24px;
  height: 24px;
  margin-left: 150px;
}
.image {
  width: 100%;
  height: 150px;
}
.name {
  width: 100%;
  height: 40px;
  font-size: 15px;
  color: white;
  line-height: 40px;
  text-align: center;
  background-color: #327db6;
}
.flight {
  height: 150px;
  width: 100%;
  font-size: 13px;
}
.go {
  width: 46px;
  font-size: 30px;
}
.place {
  width: 100px;
  font-size: 10px;
}
</style>
